import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import pLimit from "p-limit";
import { URL } from "url";
import pRetry from "p-retry";

// Limit for concurrent requests
const limit = pLimit(3); // Limit concurrency to 3
const cache = new Map<string, any>(); // In-memory cache for results
const visited = new Set<string>(); // To avoid visiting the same page multiple times

// Function to fetch images from a page
async function fetchImagesFromPage(url: string): Promise<any[]> {
            console.log("crawling [page]...");
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
    }[] = [];

    const imgElements = Array.from(document.querySelectorAll("img"));

    // Helper function to process images
    imgElements.forEach((img: HTMLImageElement) => {
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
        images.push({ src: absoluteUrl, alt, width, height });
      }
    });

    return images;
  } catch (error) {
    console.error(`Error fetching images from ${url}:`, error);
    return [];
  }
}

// Function to fetch all page URLs from a given base URL (crawling the site)
// Function to fetch all page URLs from a given base URL (crawling the site)
// Function to fetch all page URLs from a given base URL (crawling the site)
// Function to fetch all page URLs from a given base URL (crawling the site)
async function crawlSite(baseUrl: string, depth: number = 3): Promise<string[]> {
            console.log("crawling site...");
  const urls: string[] = [];
  const pagesToVisit: string[] = [baseUrl];

  while (pagesToVisit.length > 0 && depth > 0) {
    const currentUrl = pagesToVisit.pop()!;
    if (visited.has(currentUrl)) continue;

    visited.add(currentUrl);
    try {
      const response = await fetch(currentUrl);
      const html = await response.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;

      // Collect all anchor elements to discover additional pages
      const links = Array.from(document.querySelectorAll("a[href]"))
        .map((a: Element) => (a as HTMLAnchorElement).getAttribute("href")) // Cast to HTMLAnchorElement
        .filter((href): href is string => href != null && !href.startsWith("#") && !href.startsWith("mailto:"))
        .map((href) => new URL(href, currentUrl).href);

      // Add new links to the pagesToVisit stack
      pagesToVisit.push(...links);

      // Add the current URL to the list
      urls.push(currentUrl);
    } catch (error) {
      console.error(`Error fetching ${currentUrl}:`, error);
    }

    depth--;
  }

  return urls;
}




// API Handler to analyze a single page or crawl the whole site and fetch images
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, scope } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL provided." });
  }

  if (!scope || (scope !== "page" && scope !== "site")) {
    return res.status(400).json({ error: "Invalid scope provided. Use 'page' or 'site'." });
  }

  try {
      if (scope === "site") {
        console.log('crawling site...');
        
      // Crawl the site and gather all page URLs
      const pageUrls = await crawlSite(url);

      // Fetch images from all pages concurrently with limited concurrency
      const allImages: any[] = [];

      for (const pageUrl of pageUrls) {
        const pageImages = await limit(() => fetchImagesFromPage(pageUrl));
        allImages.push(...pageImages);
      }

      return res.status(200).json({ images: allImages, pages: pageUrls });
      } else if (scope === "page") {
                 console.log("crawling page...");
      // Analyze a single page for images
      const images = await fetchImagesFromPage(url);
      return res.status(200).json({ images, startUrl: url });
    }
  } catch (err) {
    console.error("API handler error:", err);
    return res.status(504).json({
      error: "The target website took too long to respond or failed.",
    });
  }
}