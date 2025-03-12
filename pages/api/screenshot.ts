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
    const API_KEY = "7U60j2GJ_i0oHQ"; // Replace with your API Key
    const apiUrl = `https://api.screenshotone.com/take?access_key=${API_KEY}&url=${encodeURIComponent(
      url
    )}&format=png&full_page=true`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Screenshot API failed: ${response.statusText}`);
    }

    const imageBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "image/png");
    res.end(Buffer.from(imageBuffer));
  } catch (error) {
    console.error("Screenshot Error:", error);
    res
      .status(500)
      .json({
        error: `Failed to capture screenshot: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
  }
}
