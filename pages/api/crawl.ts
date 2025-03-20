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
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const dom = new JSDOM(data);
    const document = dom.window.document;

    const links = Array.from(document.querySelectorAll("a"))
      .map((a) => a.getAttribute("href"))
      .filter((href): href is string => !!href)
      .map((href) => new URL(href, baseUrl).href);

    for (const link of links) {
      if (link.startsWith(baseUrl)) {
        await fetchPages(link, baseUrl);
      } else {
        externalLinks.add(link);
      }
    }
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
  }
}

async function checkBrokenLinks(links: string[]) {
  const brokenLinks: string[] = [];
  const workingLinks: string[] = [];

  await Promise.all(
    links.map(async (link) => {
      try {
        const response = await axios.get(link, {
          headers: { "User-Agent": "Mozilla/5.0" },
          validateStatus: () => true, // Capture all responses
        });

        if (response.status === 404) {
          brokenLinks.push(link);
        } else {
          workingLinks.push(link);
        }
      } catch (error) {
        brokenLinks.push(link); // Assume broken if request fails
      }
    })
  );

  return { brokenLinks, workingLinks };
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
    const allLinks = [...visited, ...externalLinks];
    const { brokenLinks, workingLinks } = await checkBrokenLinks(allLinks);

    res.status(200).json({ workingLinks, brokenLinks });
  } catch (error) {
    res.status(500).json({ error: "Failed to crawl site" });
  }
}
