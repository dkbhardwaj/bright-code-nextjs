import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';

async function launchChrome() {
  // Launch Puppeteer (Chromium)
  const browser = await puppeteer.launch({
    headless: true,  // Run in headless mode
    args: ['--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222'],  // Disable sandboxing for serverless environments
  });

  // Use Puppeteer to create a new page and get the WebSocket URL
  const page = await browser.newPage();
  const wsEndpoint = browser.wsEndpoint();
  return { browser, wsEndpoint };
}

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const { browser, wsEndpoint } = await launchChrome();

    // Run Lighthouse audit
    const { lhr } = await lighthouse(url, {
      port: new URL(wsEndpoint).port,  // Pass WebSocket endpoint to Lighthouse
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'seo'], // Only audit these categories
    });

    // Extract scores from Lighthouse results
    const performanceScore = lhr.categories.performance.score * 100;
    const accessibilityScore = lhr.categories.accessibility.score * 100;
    const seoScore = lhr.categories.seo.score * 100;

    // Close the Puppeteer browser
    await browser.close();

    // Send the results back to the client
    res.status(200).json({
      performance: performanceScore,
      accessibility: accessibilityScore,
      seo: seoScore,
    });
  } catch (error) {
    console.error('Error running Lighthouse:', error);
    res.status(500).json({ error: 'Failed to run Lighthouse audit', details: error.message });
  }
}