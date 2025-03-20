import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { JSDOM } from "jsdom";

const visited = new Set<string>();
const externalLinks = new Set<string>();

async function fetchPages(url: string, baseUrl: string) {
  if (visited.has(url)) return;
  visited.add(url);

  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }, // Helps avoid bot detection
    });

    const dom = new JSDOM(data);
    const document = dom.window.document;

    // Extract and resolve links
    const links = Array.from(document.querySelectorAll("a"))
      .map((a) => a.getAttribute("href"))
      .filter((href): href is string => !!href) // Remove null/undefined hrefs
      .map((href) => new URL(href, baseUrl).href); // Resolve relative links

    for (const link of links) {
      if (link.startsWith(baseUrl)) {
        await fetchPages(link, baseUrl); // Internal link → Crawl further
      } else {
        externalLinks.add(link); // External link → Store but don't crawl
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching ${url}:`, error.message);
    } else {
      console.error(`Error fetching ${url}:`, error);
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { url } = req.query;
  if (!url || typeof url !== "string" || !/^https?:\/\//.test(url)) {
    return res
      .status(400)
      .json({ error: "Invalid URL. Include http:// or https://" });
  }

  visited.clear();
  externalLinks.clear();

  try {
    await fetchPages(url, url);
    res.status(200).json({
      internalLinks: Array.from(visited),
      externalLinks: Array.from(externalLinks),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to crawl site" });
  }
}
