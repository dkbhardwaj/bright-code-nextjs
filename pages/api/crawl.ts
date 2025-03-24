import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { JSDOM } from "jsdom";

// In-memory storage (for simplicity; consider a DB for production)
const crawlState: {
  [jobId: string]: {
    baseUrl: string;
    visited: Set<string>;
    externalLinks: Set<string>;
    allLinks?: string[];
    brokenLinks?: string[];
    workingLinks?: string[];
    status: "crawling" | "checking" | "done";
  };
} = {};

async function fetchPages(url: string, baseUrl: string, jobId: string) {
  const state = crawlState[jobId];
  if (state.visited.has(url)) return;
  state.visited.add(url);

  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 5000, // Add timeout to prevent hanging
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

async function checkBrokenLinks(links: string[], batchSize: number = 10) {
  const brokenLinks: string[] = [];
  const workingLinks: string[] = [];

  for (let i = 0; i < links.length; i += batchSize) {
    const batch = links.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (link) => {
        try {
          const response = await axios.get(link, {
            headers: { "User-Agent": "Mozilla/5.0" },
            timeout: 5000, // Prevent long hangs
            validateStatus: () => true,
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
  }

  return { brokenLinks, workingLinks };
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { url, jobId: jobIdParam } = req.query;

  // Ensure jobId is a single string
  const jobId = Array.isArray(jobIdParam) ? jobIdParam[0] : jobIdParam;

  // Start a new crawl
  if (url && typeof url === "string" && /^https?:\/\//.test(url)) {
    const newJobId = typeof jobId === "string" ? jobId : Date.now().toString(); // Unique job ID
    if (!crawlState[newJobId]) {
      crawlState[newJobId] = {
        baseUrl: url,
        visited: new Set<string>(),
        externalLinks: new Set<string>(),
        status: "crawling",
      };
    }

    const state = crawlState[newJobId];

    if (state.status === "crawling") {
      await fetchPages(url, url, newJobId);
      state.allLinks = [...state.visited, ...state.externalLinks];
      state.status = "checking";
      return res.status(200).json({
        jobId: newJobId,
        status: "crawling",
        message: "Crawling complete, checking links next",
      });
    }
  }

  // Check status or continue processing
  if (jobId && typeof jobId === "string" && crawlState[jobId]) {
    const state = crawlState[jobId];

    if (state.status === "checking" && state.allLinks) {
      const { brokenLinks, workingLinks } = await checkBrokenLinks(
        state.allLinks,
        10 // Process 10 links at a time
      );
      state.brokenLinks = brokenLinks;
      state.workingLinks = workingLinks;
      state.status = "done";

      // Clean up after completion
      const result = {
        jobId,
        status: "done",
        workingLinks: state.workingLinks,
        brokenLinks: state.brokenLinks,
      };
      delete crawlState[jobId];
      return res.status(200).json(result);
    }

    if (state.status === "done") {
      return res.status(200).json({
        jobId,
        status: "done",
        workingLinks: state.workingLinks,
        brokenLinks: state.brokenLinks,
      });
    }
  }

  return res.status(400).json({ error: "Invalid request or job ID" });
}