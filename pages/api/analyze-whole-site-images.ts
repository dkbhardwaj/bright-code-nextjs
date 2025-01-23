import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import pLimit from "p-limit";
import { URL } from "url";

// Concurrency limit for page processing
const limit = pLimit(10);
const visited = new Set<string>(); // To track visited pages

// Fetch images from a single page
async function fetchImagesFromPage(pageUrl: string): Promise<any[]> {
  try {
    console.log(`Fetching images from: ${pageUrl}`);
    const response = await fetch(pageUrl);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const images = Array.from(document.querySelectorAll("img")).map((img) => {
      const src = img.getAttribute("src");
      if (!src) return null;

      return {
        src: new URL(src, pageUrl).href, // Convert relative URLs to absolute
        alt: img.getAttribute("alt") || "No alt attribute",
        width: img.getAttribute("width")
          ? parseInt(img.getAttribute("width")!, 10)
          : null,
        height: img.getAttribute("height")
          ? parseInt(img.getAttribute("height")!, 10)
          : null,
      };
    });

    // Filter out null values
    return images.filter((img) => img !== null);
  } catch (error) {
    console.error(`Error fetching images from ${pageUrl}:`, error);
    return [];
  }
}

// Crawl the site to discover all pages
async function crawlSite(baseUrl: string, maxDepth: number): Promise<string[]> {
  const pagesToVisit = [baseUrl];
  const discoveredPages: string[] = [];

  while (pagesToVisit.length > 0 && maxDepth > 0) {
    const currentLevel = [...pagesToVisit];
    pagesToVisit.length = 0; // Clear current queue

    for (const pageUrl of currentLevel) {
      if (visited.has(pageUrl)) continue; // Skip already visited pages
      visited.add(pageUrl);

      try {
        console.log(`Crawling: ${pageUrl}`);
        const response = await fetch(pageUrl);
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // Extract valid links
        const links = Array.from(document.querySelectorAll("a[href]"))
          .map((a) => a.getAttribute("href"))
          .filter(
            (href): href is string =>
              typeof href === "string" &&
              !href.startsWith("#") &&
              !href.startsWith("mailto:") &&
              !/\.(pdf|jpg|png|zip)$/i.test(href) // Exclude non-HTML links
          )
          .map((href) => new URL(href, pageUrl).href);

        // Add newly discovered links to the queue
        pagesToVisit.push(...links.filter((link) => !visited.has(link)));
        discoveredPages.push(pageUrl);
      } catch (error) {
        console.error(`Error crawling page ${pageUrl}:`, error);
      }
    }

    maxDepth--;
  }

  return discoveredPages;
}

// API handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, depth = "3", limit: concurrencyLimit = "10" } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL provided." });
  }

  const maxDepth = parseInt(depth as string, 10) || 3;
  const concurrency = parseInt(concurrencyLimit as string, 10) || 10;
  const limiter = pLimit(concurrency);

  try {
    console.log(`Starting site-wide crawl for ${url}`);

    // Discover all pages on the site
    const pageUrls = await crawlSite(url, maxDepth);

    // Fetch images from all discovered pages concurrently
    const allImages = new Map<string, any>();
    await Promise.all(
      pageUrls.map((pageUrl) =>
        limiter(async () => {
          const images = await fetchImagesFromPage(pageUrl);
          images.forEach((image) => allImages.set(image.src, image));
        })
      )
    );

    res.status(200).json({
      images: Array.from(allImages.values()), // Deduplicated images
      pages: pageUrls,
      totalImages: allImages.size,
      totalPages: pageUrls.length,
    });
  } catch (error) {
    console.error("Error during site-wide image fetch:", error);
    res.status(500).json({ error: "Failed to process the request." });
  }
}
