import { chromium } from 'playwright';
import lighthouse from 'lighthouse';
import { URL } from 'url';

async function launchBrowser() {
  // Launch the browser in headless mode with the remote debugging port
  const browser = await chromium.launch({
    headless: true, // Launch in headless mode
    args: [
      '--no-sandbox',
      '--disable-gpu',
      '--remote-debugging-port=9222', // Enable remote debugging on port 9222
    ],
  });

  return browser;
}

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Launch the browser
    const browser = await launchBrowser();

    // Get the remote debugging port (9222 by default) to pass to Lighthouse
    const remoteDebuggingPort = 9222;

    // Run Lighthouse audit
    const { lhr } = await lighthouse(url, {
      port: remoteDebuggingPort, // Pass the port for remote debugging
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'seo'], // Only audit these categories
    });

    // Extract scores from Lighthouse results
    const performanceScore = lhr.categories.performance.score * 100;
    const accessibilityScore = lhr.categories.accessibility.score * 100;
    const seoScore = lhr.categories.seo.score * 100;

    // Close the browser after Lighthouse finishes
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
