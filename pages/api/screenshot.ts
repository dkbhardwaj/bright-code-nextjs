import puppeteer from "puppeteer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing or invalid URL" });
  }

  try {
    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // Capture Screenshot
    const screenshot = await page.screenshot({
      encoding: "base64",
      fullPage: false,
    });

    await browser.close();

    res.setHeader("Content-Type", "image/png");
    res.send(Buffer.from(screenshot, "base64"));
  } catch (error) {
    console.error("Screenshot Error:", error);
    res.status(500).json({ error: "Failed to capture screenshot" });
  }
}
