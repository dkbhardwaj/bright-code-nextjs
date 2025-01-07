import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

interface CrawlResult {
  images: string[];
  links: string[];
  hosts: Set<string>;
  issueTypes: { [key: string]: number };
  linkTypes: { [key: string]: number };
}

const crawlSite = async (url: string, visited: Set<string>, results: CrawlResult, baseUrl: string) => {
    if (visited.has(url)) return;
  
    visited.add(url);
  
    try {
      const response = await fetch(url);
      const html = await response.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;
  
      // Add the host to the hosts set
      const host = new URL(url).hostname;
      results.hosts.add(host);
  
      // Extract and classify links
      const anchorElements = document.querySelectorAll("a[href]");
      anchorElements.forEach((a) => {
        const href = a.getAttribute("href");
        if (href) {
          const absoluteUrl = new URL(href, baseUrl).href;
          if (!visited.has(absoluteUrl) && absoluteUrl.startsWith(baseUrl)) {
            results.links.push(absoluteUrl);
            results.linkTypes["<a href>"] = (results.linkTypes["<a href>"] || 0) + 1;
          }
        }
      });
  
      // Extract images
      const imgElements = document.querySelectorAll("img[src]");
      imgElements.forEach((img) => {
        const src = img.getAttribute("src");
        if (src) {
          const absoluteUrl = new URL(src, baseUrl).href;
          results.images.push(absoluteUrl);
          results.linkTypes["<img src>"] = (results.linkTypes["<img src>"] || 0) + 1;
        }
      });
  
      // Extract other links (CSS, Scripts, etc.)
      const cssLinks = document.querySelectorAll("link[rel=stylesheet]");
      cssLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href) {
          const absoluteUrl = new URL(href, baseUrl).href;
          results.links.push(absoluteUrl);
          results.linkTypes["<link rel=stylesheet>"] = (results.linkTypes["<link rel=stylesheet>"] || 0) + 1;
        }
      });
  
      const scriptElements = document.querySelectorAll("script[src]");
      scriptElements.forEach((script) => {
        const src = script.getAttribute("src");
        if (src) {
          const absoluteUrl = new URL(src, baseUrl).href;
          results.links.push(absoluteUrl);
          results.linkTypes["<script src>"] = (results.linkTypes["<script src>"] || 0) + 1;
        }
      });
  
      // Recursively crawl links (use Promise.all to ensure all recursive crawls are completed before returning)
      const linkPromises = Array.from(new Set(results.links)).map(async (link) => {
        if (!visited.has(link)) {
          await crawlSite(link, visited, results, baseUrl);
        }
      });
  
      // Wait for all the recursive calls to finish
      await Promise.all(linkPromises);
    } catch (error) {
      console.error(`Error crawling URL ${url}:`, error);
      results.issueTypes["404 Not Found"] = (results.issueTypes["404 Not Found"] || 0) + 1;
    }
  };
  
  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { url } = req.query;
  
    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "Invalid URL provided." });
    }
  
    const visited = new Set<string>();
    const results: CrawlResult = {
      images: [],
      links: [],
      hosts: new Set(),
      issueTypes: {},
      linkTypes: {
        "<a href>": 0,
        "<img src>": 0,
        "<link rel=stylesheet>": 0,
        "<script src>": 0,
      },
    };
  
    try {
      const baseUrl = new URL(url).origin;
      await crawlSite(url, visited, results, baseUrl);
  
      res.status(200).json({
        images: results.images,
        totalLinks: results.links.length,
        totalLinksWithIssues: results.issueTypes["404 Not Found"] || 0,
        hosts: Array.from(results.hosts),
        issueTypes: results.issueTypes,
        linkTypes: results.linkTypes,
        startUrl: url,
      });
    } catch (error) {
      console.error("Error analyzing site:", error);
      res.status(500).json({ error: "Failed to analyze the website." });
    }
  }
  