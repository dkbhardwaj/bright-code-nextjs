import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import pLimit from "p-limit";

const limit = pLimit(5); // Limit concurrent requests to avoid overloading servers

// Function to fetch the file size of an image
async function getFileSize(url: string): Promise<number | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5-second timeout

    const response = await fetch(url, { method: "HEAD", signal: controller.signal });
    clearTimeout(timeout);

    const contentLength = response.headers.get("Content-Length");
    return contentLength ? parseInt(contentLength, 10) : null;
  } catch (error) {
    console.error(`Error fetching file size for ${url}:`, error);
    return null;
  }
}

// Function to check the status of a link
async function checkLinkStatus(link: string): Promise<number> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5-second timeout

    const response = await fetch(link, { method: "HEAD", signal: controller.signal });
    clearTimeout(timeout);

    return response.status;
  } catch {
    return 400; // Assume Bad Request if fetch fails
  }
}

// Function to analyze a single page
async function analyzeSinglePage(url: string) {
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
      const width = img.getAttribute("width") ? parseInt(img.getAttribute("width") as string, 10) : null;
      const height = img.getAttribute("height") ? parseInt(img.getAttribute("height") as string, 10) : null;

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

    return {
      images,
      links,
      totalLinks: links.length,
      hosts: Array.from(hosts),
      issueTypes,
      linkTypes,
      startUrl: url,
    };
  } catch (err) {
    console.error("Error analyzing single page:", err);
    throw new Error("Failed to analyze the page.");
  }
}

// API Handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL provided." });
  }

  try {
    const pageData = await analyzeSinglePage(url);
    return res.status(200).json(pageData);
  } catch (err) {
    console.error("API handler error:", err);
    return res.status(500).json({ error: "Failed to analyze the site." });
  }
}
