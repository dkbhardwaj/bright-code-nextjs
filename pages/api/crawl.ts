import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

let jobResults: Record<string, { status: string; brokenLinks: string[]; workingLinks: string[] }> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("📌 API Request:", req.method, req.query, req.body);

  if (req.method === "POST") {
    const { url } = req.body;
    if (!url) {
      console.error("❌ Error: No URL provided");
      return res.status(400).json({ error: "URL is required" });
    }

    const jobId = Date.now().toString();
    console.log(`🚀 Starting crawl for ${url} (Job ID: ${jobId})`);

    jobResults[jobId] = { status: "processing", brokenLinks: [], workingLinks: [] };

    crawlSite(url, jobId)
      .then(() => console.log(`✅ Crawl finished for ${url} (Job ID: ${jobId})`))
      .catch((err) => console.error(`❌ Crawl failed:`, err));

    return res.status(202).json({ jobId });
  }

  if (req.method === "GET") {
    const { jobId } = req.query;
    console.log(`🔄 Checking status for Job ID: ${jobId}`);

    if (!jobId || typeof jobId !== "string") {
      console.error("❌ Invalid Job ID");
      return res.status(400).json({ error: "Invalid job ID" });
    }

    const result = jobResults[jobId];
    if (!result) {
      console.warn(`⚠️ Job ID ${jobId} not found`);
      return res.status(404).json({ error: "Job not found" });
    }

    console.log(`📡 Job ID ${jobId} status:`, result);
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
