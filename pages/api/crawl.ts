import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { JSDOM } from "jsdom";

// In-memory storage for job states (use a DB in production)
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

// Function to crawl pages asynchronously
async function fetchPages(url: string, baseUrl: string, jobId: string) {
  const state = jobState[jobId];
  if (state.visited.has(url)) return;
  state.visited.add(url);

  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 5000,
    });

    const dom = new JSDOM(data);
    const document = dom.window.document;

    const links = Array.from(document.querySelectorAll("a"))
      .map((a) => a.getAttribute("href"))
      .filter((href): href is string => !!href)
      .map((href) => new URL(href, baseUrl).href);

    for (const link of links) {
      if (link.startsWith(baseUrl)) {
        await fetchPages(link, baseUrl, jobId);
      } else {
        state.externalLinks.add(link);
      }
    }
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
  }
}

// Function to check for broken links
async function checkBrokenLinks(links: string[], batchSize: number = 5) {
  const brokenLinks: string[] = [];
  const workingLinks: string[] = [];

  for (let i = 0; i < links.length; i += batchSize) {
    const batch = links.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (link) => {
        try {
          const response = await axios.get(link, {
            headers: { "User-Agent": "Mozilla/5.0" },
            timeout: 5000,
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
  }

  return { brokenLinks, workingLinks };
}

// API handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Start a new crawl job
    const { url } = req.body;
    if (!url || typeof url !== "string" || !/^https?:\/\//.test(url)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    const jobId = Date.now().toString(); // Generate unique job ID
    jobState[jobId] = {
      baseUrl: url,
      visited: new Set<string>(),
      externalLinks: new Set<string>(),
      status: "crawling",
    };

    // Start crawling in the background
    setTimeout(async () => {
      await fetchPages(url, url, jobId);
      jobState[jobId].allLinks = [
        ...jobState[jobId].visited,
        ...jobState[jobId].externalLinks,
      ];
      jobState[jobId].status = "checking";

      const { brokenLinks, workingLinks } = await checkBrokenLinks(
        jobState[jobId].allLinks!,
        5
      );
      jobState[jobId].brokenLinks = brokenLinks;
      jobState[jobId].workingLinks = workingLinks;
      jobState[jobId].status = "done";
    }, 0);

    return res.status(202).json({ jobId, status: "processing" });
  }

  if (req.method === "GET") {
    // Get job status
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
