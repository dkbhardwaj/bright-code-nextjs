import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { JSDOM } from "jsdom";
import pLimit from "p-limit";

const limit = pLimit(10); // Limit concurrent requests

const jobState: {
  [jobId: string]: {
    baseUrl: string;
    visited: Set<string>;
    externalLinks: Set<string>;
    allLinks?: string[];
    brokenLinks?: string[];
    workingLinks?: string[];
    status: "pending" | "crawling" | "checking" | "done";
  };
} = {};

async function fetchPages(url: string, baseUrl: string, jobId: string, depth = 0, maxDepth = 3) {
  const state = jobState[jobId];
  if (state.visited.has(url) || depth > maxDepth) return;
  state.visited.add(url);

  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 3000, // Faster response time
    });

    const dom = new JSDOM(data);
    const document = dom.window.document;
    const links = Array.from(document.querySelectorAll("a"))
      .map((a) => a.getAttribute("href"))
      .filter((href): href is string => !!href)
      .map((href) => new URL(href, baseUrl).href) // Convert to absolute URL

    const internalLinks = links.filter((link) => link.startsWith(baseUrl));
    const externalLinks = links.filter((link) => !link.startsWith(baseUrl));

    externalLinks.forEach((link) => state.externalLinks.add(link));

    const promises = internalLinks.map((link) =>
      limit(() => fetchPages(link, baseUrl, jobId, depth + 1, maxDepth))
    );

    await Promise.all(promises);
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
  }
}

async function checkBrokenLinks(links: string[]) {
  const brokenLinks: string[] = [];
  const workingLinks: string[] = [];

  const requests = links.map((link) =>
    limit(async () => {
      try {
        const response = await axios.get(link, {
          headers: { "User-Agent": "Mozilla/5.0" },
          timeout: 3000,
          validateStatus: () => true,
        });

        if (response.status === 404) {
          brokenLinks.push(link);
        } else {
          workingLinks.push(link);
        }
      } catch (error) {
        brokenLinks.push(link);
      }
    })
  );

  await Promise.all(requests);
  return { brokenLinks, workingLinks };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { url } = req.body;
    if (!url || typeof url !== "string" || !/^https?:\/\//.test(url)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    const jobId = Date.now().toString();
    jobState[jobId] = {
      baseUrl: url,
      visited: new Set<string>(),
      externalLinks: new Set<string>(),
      status: "crawling",
    };

    setTimeout(async () => {
      await fetchPages(url, url, jobId, 0, 3);
      jobState[jobId].allLinks = [
        ...jobState[jobId].visited,
        ...jobState[jobId].externalLinks,
      ];
      jobState[jobId].status = "checking";

      const { brokenLinks, workingLinks } = await checkBrokenLinks(jobState[jobId].allLinks!);
      jobState[jobId].brokenLinks = brokenLinks;
      jobState[jobId].workingLinks = workingLinks;
      jobState[jobId].status = "done";
    }, 0);

    return res.status(202).json({ jobId, status: "processing" });
  }

  if (req.method === "GET") {
    const { jobId } = req.query;
    if (!jobId || typeof jobId !== "string" || !jobState[jobId]) {
      return res.status(404).json({ error: "Job not found" });
    }

    return res.status(200).json({
      jobId,
      status: jobState[jobId].status,
      brokenLinks: jobState[jobId].brokenLinks || [],
      workingLinks: jobState[jobId].workingLinks || [],
    });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
