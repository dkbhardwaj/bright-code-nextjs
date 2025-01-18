import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import pLimit from "p-limit";
import pRetry from "p-retry";

// Limit for concurrent requests
const limit = pLimit(3); // Limit concurrency to 3
const cache = new Map<string, any>(); // In-memory cache for results

// Global timeout for the entire analysis process (in milliseconds)
const ANALYSIS_TIMEOUT = 60000; // 60 seconds

// Function to fetch the file size of an image
async function getFileSize(url: string): Promise<number | null> {
  try {
    const response = await pRetry(
      async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10-second timeout
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

// Function to analyze images on a single page
async function analyzeImages(url: string) {
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

    const imgElements = Array.from(document.querySelectorAll("img"));

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
      }
    };

    // Process images concurrently with limited concurrency
    await Promise.all(imgElements.map((img) => limit(() => processImage(img))));

    const result = {
      images,
      totalImages: images.length,
      startUrl: url,
    };

    // Store result in cache
    cache.set(url, result);

    return result;
  } catch (err) {
    console.error("Error analyzing images:", err);
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
    const imageData = await analyzeImages(url);
    clearTimeout(timeout);
    return res.status(200).json(imageData);
  } catch (err) {
    clearTimeout(timeout);
    console.error("API handler error:", err);
    return res.status(504).json({
      error: "The target website took too long to respond or failed.",
    });
  }
}
