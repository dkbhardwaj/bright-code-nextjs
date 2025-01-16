import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import pLimit from "p-limit";
import pRetry from "p-retry";

// Limit for concurrent requests to avoid overloading servers
const limit = pLimit(3); // Set concurrency limit to 3
const cache = new Map<string, any>(); // In-memory cache for results

// Function to fetch the file size of an image with retry logic
async function getFileSize(url: string): Promise<number | null> {
  try {
    const response = await pRetry(
      async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 5-second timeout
        try {
          const res = await fetch(url, {
            method: "HEAD",
            signal: controller.signal,
          });
          clearTimeout(timeout);
          return res;
        } catch (error) {
          clearTimeout(timeout);
          throw error;
        }
      },
      { retries: 3 }
    );

    const contentLength = response.headers.get("Content-Length");
    return contentLength ? parseInt(contentLength, 10) : null;
  } catch (error) {
    console.error(`Error fetching file size for ${url}:`, error);
    return null;
  }
}

// Function to check the status of a link with retry logic
async function checkLinkStatus(link: string): Promise<number> {
  try {
    const response = await pRetry(
      async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 5-second timeout
        try {
          const res = await fetch(link, {
            method: "HEAD",
            signal: controller.signal,
          });
          clearTimeout(timeout);
          return res;
        } catch (error) {
          clearTimeout(timeout);
          throw error;
        }
      },
      { retries: 3 }
    );

    return response.status;
  } catch (error) {
    console.error(`Error checking status for ${link}:`, error);
    return 400; // Assume Bad Request if fetch fails
  }
}

// Function to analyze a single page
async function analyzeSinglePage(url: string) {
  // Check cache first
  if (cache.has(url)) {
    return cache.get(url);
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const images: {
      src: string;
      alt: string;
      width: number | null;
      height: number | null;
      fileSize: number | null;
    }[] = [];
    const links: { url: string; status: number }[] = [];
    const issueTypes: { [key: string]: number } = {
      "404 Not Found": 0,
      "400 Bad Request": 0,
    };
    const linkTypes: { [key: string]: number } = {
      "<img src>": 0,
      "<a href>": 0,
    };
    const hosts = new Set<string>();

    const imgElements = Array.from(document.querySelectorAll("img"));
    const anchorElements = Array.from(document.querySelectorAll("a"));

    // Helper function to process images
    const processImage = async (img: HTMLImageElement) => {
      const src = img.getAttribute("src");
      const alt = img.getAttribute("alt") || "No alt attribute";
      const width = img.getAttribute("width")
        ? parseInt(img.getAttribute("width") as string, 10)
        : null;
      const height = img.getAttribute("height")
        ? parseInt(img.getAttribute("height") as string, 10)
        : null;

      if (src) {
        const absoluteUrl = new URL(src, url).href;
        const fileSize = await getFileSize(absoluteUrl);
        images.push({ src: absoluteUrl, alt, width, height, fileSize });
        linkTypes["<img src>"]++;
        hosts.add(new URL(absoluteUrl).hostname);
      }
    };

    // Helper function to process links
    const processLink = async (a: HTMLAnchorElement) => {
      const href = a.getAttribute("href");
      if (href) {
        const absoluteUrl = new URL(href, url).href;
        const status = await checkLinkStatus(absoluteUrl);

        if (status === 404) {
          issueTypes["404 Not Found"]++;
        } else if (status === 400) {
          issueTypes["400 Bad Request"]++;
        }

        links.push({ url: absoluteUrl, status });
        linkTypes["<a href>"]++;
        hosts.add(new URL(absoluteUrl).hostname);
      }
    };

    // Process images and links concurrently with limited concurrency
    await Promise.all([
      ...imgElements.map((img) => limit(() => processImage(img))),
      ...anchorElements.map((a) => limit(() => processLink(a))),
    ]);

    const result = {
      images,
      links,
      totalLinks: links.length,
      hosts: Array.from(hosts),
      issueTypes,
      linkTypes,
      startUrl: url,
    };

    // Store result in cache
    cache.set(url, result);

    return result;
  } catch (err) {
    console.error("Error analyzing single page:", err);
    throw new Error("Failed to analyze the page.");
  }
}

// API Handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL provided." });
  }

  try {
    const pageData = await analyzeSinglePage(url);
    return res.status(200).json(pageData);
  } catch (err) {
    console.error("API handler error:", err);
    return res.status(504).json({
      error: "The target website took too long to respond or failed.",
    });
  }
}
