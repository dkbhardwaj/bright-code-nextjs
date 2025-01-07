import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

// Function to analyze a single page
async function analyzeSinglePage(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const images: string[] = [];
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

    // Extract images and links (similar to your existing code)
    const imgElements = document.querySelectorAll("img");
    imgElements.forEach((img) => {
      const src = img.getAttribute("src");
      if (src) {
        const absoluteUrl = new URL(src, url).href;
        images.push(absoluteUrl);
        linkTypes["<img src>"]++;
        hosts.add(new URL(absoluteUrl).hostname);
      }
    });

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
  // You would need to implement logic to recursively fetch and analyze all pages of the site.
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
