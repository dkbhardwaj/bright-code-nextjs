import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

let jobResults: Record<string, { status: string; brokenLinks: string[]; workingLinks: string[] }> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const jobId = Date.now().toString();
    jobResults[jobId] = { status: "processing", brokenLinks: [], workingLinks: [] };

    crawlSite(url, jobId);
    return res.status(202).json({ jobId });
  }

  if (req.method === "GET") {
    const { jobId } = req.query;
    if (!jobId || typeof jobId !== "string") return res.status(400).json({ error: "Invalid job ID" });

    const result = jobResults[jobId];
    if (!result) return res.status(404).json({ error: "Job not found" });

    return res.status(200).json(result);
  }

  res.setHeader("Allow", ["POST", "GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

async function crawlSite(url: string, jobId: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
  await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });

  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("a"))
      .map((a) => a.href)
      .filter((href) => href.startsWith("http"));
  });

  console.log(`Found ${links.length} links on ${url}`);

  let brokenLinks: string[] = [];
  let workingLinks: string[] = [];

  for (const link of links) {
    try {
      const response = await fetch(link, { method: "HEAD" });
      if (response.status >= 400) {
        brokenLinks.push(link);
      } else {
        workingLinks.push(link);
      }
    } catch (error) {
      brokenLinks.push(link);
    }
  }

  await browser.close();

  jobResults[jobId] = { status: "done", brokenLinks, workingLinks };
}
