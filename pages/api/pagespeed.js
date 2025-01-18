export default async function handler(req, res) {
    const { url } = req.query;
  
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
  
    try {
      const apiKey = process.env.PAGESPEED_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'API key is missing' });
      }
  
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${apiKey}`;
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error('Failed to fetch data from Google API');
      }
  
      const data = await response.json();
  
      if (data.error) {
        return res.status(400).json({ error: data.error.message });
      }
      
      // Extracting scores for performance, accessibility, and SEO
      const performanceScore = data.lighthouseResult?.categories?.performance?.score * 100;
      const accessibilityScore = data.lighthouseResult?.categories?.accessibility?.score;
      const seoScore = data.lighthouseResult?.categories?.seo?.score;
  
      // Returning the scores to the frontend
      res.status(200).json({
        performance: performanceScore,
        accessibility: accessibilityScore,
        seo: seoScore,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch PageSpeed data' });
    }
  }
  