import type { NextApiRequest, NextApiResponse } from "next";
import { load } from "cheerio";

async function collectPages(
  url: string,
  baseUrl: string,
  visited: Set<string>,
  pages: Set<string>,
  maxPages: number
) {
  if (visited.size >= maxPages || visited.has(url)) return;
  visited.add(url);

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LinkFetcher/1.0)" },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return;
    pages.add(url);

    const html = await response.text();
    const $ = load(html);

    $("a").each((i, element) => {
      const href = $(element).attr("href");
      if (!href) return;
      const absoluteUrl = href.startsWith("http")
        ? href
        : new URL(href, baseUrl).href;
      if (absoluteUrl.startsWith(baseUrl) && !visited.has(absoluteUrl)) {
        collectPages(absoluteUrl, baseUrl, visited, pages, maxPages);
      }
    });
  } catch (error) {
    console.error(`Error crawling ${url}:`, error);
  }
}

async function extractLinksFromPage(
  url: string,
  baseUrl: string
): Promise<{ internal: string[]; external: string[] }> {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LinkFetcher/1.0)" },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return { internal: [], external: [] };

    const html = await response.text();
    const $ = load(html);
    const internalLinks: string[] = [];
    const externalLinks: string[] = [];

    $("a").each((i, element) => {
      const href = $(element).attr("href");
      if (href) {
        const absoluteUrl = href.startsWith("http")
          ? href
          : new URL(href, baseUrl).href;
        if (absoluteUrl.startsWith(baseUrl)) {
          internalLinks.push(absoluteUrl);
        } else {
          externalLinks.push(absoluteUrl);
        }
      }
    });

    return {
      internal: [...new Set(internalLinks)],
      external: [...new Set(externalLinks)],
    };
  } catch (error) {
    console.error(`Error extracting links from ${url}:`, error);
    return { internal: [], external: [] };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Please provide a valid URL" });
  }

  const baseUrl = new URL(url).origin;
  const visited = new Set<string>();
  const pages = new Set<string>();

  await collectPages(url, baseUrl, visited, pages, 10);
  const totalPages = pages.size;

  const allLinks: { internal: string[]; external: string[] } = {
    internal: [],
    external: [],
  };
  for (const pageUrl of pages) {
    const { internal, external } = await extractLinksFromPage(pageUrl, baseUrl);
    allLinks.internal.push(...internal);
    allLinks.external.push(...external);
  }

  allLinks.internal = [...new Set(allLinks.internal)];
  allLinks.external = [...new Set(allLinks.external)];

  res.status(200).json({ links: allLinks, totalPages });
}
