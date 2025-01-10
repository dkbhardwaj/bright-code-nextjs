import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

// Function to fetch the file size of an image
async function getFileSize(url: string): Promise<number | null> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentLength = response.headers.get("Content-Length");
    return contentLength ? parseInt(contentLength, 10) : null;
  } catch (error) {
    console.error(`Error fetching file size for ${url}:`, error);
    return null;
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
    const links: string[] = [];
    const issueTypes: { [key: string]: number } = {
      "404 Not Found": 0,
      "400 Bad Request": 0,
    };
    const linkTypes: { [key: string]: number } = {
      "<img src>": 0,
      "<a href>": 0,
      "CSS URL()": 0,
      "Social meta tag": 0,
      "<script src>": 0,
      "<frame src>": 0,
      "<link rel=stylesheet>": 0,
    };
    const hosts = new Set<string>();

    // Extract images and their properties
    const imgElements = document.querySelectorAll("img");
    for (const img of imgElements) {
      const src = img.getAttribute("src");
      const alt = img.getAttribute("alt") || "No alt attribute";
      const width = img.getAttribute("width") ? parseInt(img.getAttribute("width") as string, 10) : null;
      const height = img.getAttribute("height") ? parseInt(img.getAttribute("height") as string, 10) : null;

      if (src) {
        const absoluteUrl = new URL(src, url).href;

        // Fetch the file size
        const fileSize = await getFileSize(absoluteUrl);

        images.push({ src: absoluteUrl, alt, width, height, fileSize });
        linkTypes["<img src>"]++;
        hosts.add(new URL(absoluteUrl).hostname);
      }
    }

    // Extract links
    const anchorElements = document.querySelectorAll("a");
    anchorElements.forEach((a) => {
      const href = a.getAttribute("href");
      if (href) {
        const absoluteUrl = new URL(href, url).href;
        links.push(absoluteUrl);
        linkTypes["<a href>"]++;
        hosts.add(new URL(absoluteUrl).hostname);
      }
    });

    return {
      images,
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

// Function to crawl and analyze the entire site
async function crawlAndAnalyzeSite(url: string) {
  // Placeholder for site crawling logic
  return {
    message: "Entire site analysis is not implemented yet.",
    startUrl: url,
  };
}

// Main API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url, entireSite } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL provided." });
  }

  try {
    if (entireSite === "true") {
      // Crawl and analyze the entire site
      const siteData = await crawlAndAnalyzeSite(url);
      return res.status(200).json(siteData);
    } else {
      // Analyze a single page
      const pageData = await analyzeSinglePage(url);
      return res.status(200).json(pageData);
    }
  } catch (err) {
    console.error("API handler error:", err);
    res.status(500).json({ error: "Failed to analyze the site." });
  }
}
