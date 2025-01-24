// pages/api/pagespeed.js
import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;
  const apiKey = process.env.PAGESPEED_API_KEY; // Store the API key in an environment variable

  if (!url) {
    return res.status(400).json({ error: "URL query parameter is required." });
  }

  try {
    // Make a request to Google's PageSpeed Insights API
    const response = await axios.get(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${apiKey}&category=performance&category=accessibility&category=best-practices&category=seo`,
      {
        timeout: 60000, // Timeout set to 60 seconds
      }
    );
    const performanceScore = response.data.lighthouseResult.categories.performance.score * 100;
    const accessibilityScore = response.data.lighthouseResult.categories.accessibility.score * 100;
    const seoScore = response.data.lighthouseResult.categories.seo.score * 100;
    const bestPracticeScore = response.data.lighthouseResult.categories['best-practices'].score * 100;

    console.log(response.data.lighthouseResult)
    // res.status(200).json(response.data);
    res.status(200).json({
        performance: performanceScore,
        accessibility: accessibilityScore,
        seo: seoScore,
        bestPractice: bestPracticeScore,
      });
  } catch (error) {
    console.error("Error fetching data from PageSpeed API:", error);
    res.status(500).json({ error: "Error fetching data from the PageSpeed API." });
  }
}


