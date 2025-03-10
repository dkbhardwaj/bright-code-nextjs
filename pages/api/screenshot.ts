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
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&screenshot=true`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (
      !data.lighthouseResult ||
      !data.lighthouseResult.audits["final-screenshot"]
    ) {
      throw new Error("No screenshot found in response");
    }

    const screenshotBase64 =
      data.lighthouseResult.audits["final-screenshot"].details.data;

    // Convert Base64 to an image
    const imageBuffer = Buffer.from(
      screenshotBase64.replace(/^data:image\/jpeg;base64,/, ""),
      "base64"
    );

    res.setHeader("Content-Type", "image/jpeg");
    res.end(imageBuffer);
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
