import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer-core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer | { error: string }>
) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Please provide a valid URL" });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.CHROME_EXECUTABLE_PATH || "/usr/bin/chromium",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });
    const screenshot = await page.screenshot({ type: "png" });

    await browser.close();

    res.setHeader("Content-Type", "image/png");
    res.send(Buffer.from(screenshot as Uint8Array)); // Convert Uint8Array to Buffer
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to take screenshot" });
  }
}
