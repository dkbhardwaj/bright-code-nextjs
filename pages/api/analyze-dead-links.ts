// pages/api/check-links.ts
import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio"; // Use * as cheerio for better type support

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: "Invalid URL provided" });
  }

  try {
    // Fetch the initial page
    const response = await fetch(url, { redirect: "follow" });
    if (!response.ok) {
      return res.status(400).json({ error: "Unable to fetch the website" });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract all links
    const links: string[] = [];
    $("a[href]").each((index: number, element) => {
      const href = $(element).attr("href");
      if (href) {
        const absoluteUrl = new URL(href, url).href; // Resolve relative URLs
        if (!links.includes(absoluteUrl)) {
          links.push(absoluteUrl);
        }
      }
    });

    // Check status of each link
    const brokenLinks: string[] = [];
    const linkChecks = links.map(async (link) => {
      try {
        const linkResponse = await fetch(link, {
          method: "GET",
          redirect: "manual",
        });
        if (linkResponse.status === 404) {
          brokenLinks.push(link);
        } else if (linkResponse.redirected) {
          console.log(`Redirect detected: ${link} → ${linkResponse.url}`);
        }
      } catch (err) {
        console.error(`Error fetching ${link}:`, err);
        brokenLinks.push(link);
      }
    });

    await Promise.all(linkChecks);

    res.status(200).json({ brokenLinks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}
