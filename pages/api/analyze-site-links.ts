import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import pLimit from "p-limit";
import pRetry from "p-retry";

// Limit for concurrent requests
const limit = pLimit(10); // Increase concurrency to 10
const cache = new Map<string, any>(); // In-memory cache

// Global timeout for the entire analysis process (in milliseconds)
const ANALYSIS_TIMEOUT = 60000; // 60 seconds

// Function to check the status of a link
async function checkLinkStatus(link: string): Promise<number> {
  try {
    const response = await pRetry(
      async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10-second timeout
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
  if (cache.has(url)) return cache.get(url);

  try {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const links: { url: string; status: number }[] = [];
    const anchorElements = Array.from(document.querySelectorAll("a")).slice(0, 100); // Limit to 100 links

    const processLink = async (a: HTMLAnchorElement) => {
      const href = a.getAttribute("href");
      if (href) {
        const absoluteUrl = new URL(href, url).href;
        const status = await checkLinkStatus(absoluteUrl);
        links.push({ url: absoluteUrl, status });
      }
    };

    // Process in batches
    const BATCH_SIZE = 20;
    for (let i = 0; i < anchorElements.length; i += BATCH_SIZE) {
      const batch = anchorElements.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map((a) => limit(() => processLink(a))));
    }

    const result = { links, totalLinks: links.length, startUrl: url };
    cache.set(url, result); // Cache the result
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

  // Global timeout for the analysis process
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ANALYSIS_TIMEOUT);

  try {
    const pageData = await analyzeSinglePage(url);
    clearTimeout(timeout);
    return res.status(200).json(pageData);
  } catch (err) {
    clearTimeout(timeout);
    console.error("API handler error:", err);
    return res.status(504).json({
      error: "The target website took too long to respond or failed.",
    });
  }
}
