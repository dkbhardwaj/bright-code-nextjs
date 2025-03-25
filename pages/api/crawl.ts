import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

let jobResults: Record<string, { status: string; brokenLinks: string[]; workingLinks: string[] }> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
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

      if (!jobResults[jobId]) {
        console.warn(`⚠️ Job ID ${jobId} not found`);
        return res.status(404).json({ error: "Job not found" });
      }

      console.log(`📡 Returning job status for ${jobId}:`, jobResults[jobId]);
      return res.status(200).json(jobResults[jobId]);
    }

    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error("🔥 Unexpected error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



async function crawlSite(url: string, jobId: string) {
  try {
    console.log(`🚀 Crawling started for ${url} (Job ID: ${jobId})`);

    // Simulating the crawling process (Replace with your actual logic)
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(`✅ Crawling completed for ${url}`);

    // Update jobResults
    jobResults[jobId] = {
      status: "completed",
      brokenLinks: ["https://example.com/broken1", "https://example.com/broken2"],
      workingLinks: ["https://example.com/working1", "https://example.com/working2"],
    };

    console.log(`📡 Job Result Updated:`, jobResults[jobId]);
  } catch (err) {
    console.error(`❌ Error in crawlSite() for ${url}:`, err);
    jobResults[jobId] = { status: "error", brokenLinks: [], workingLinks: [] };
  }
}

