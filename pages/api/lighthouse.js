import { launch } from 'chrome-aws-lambda';
import lighthouse from 'lighthouse';

async function launchBrowser() {
  const browser = await launch({
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--remote-debugging-port=9222'],
  });
  return browser;
}

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const browser = await launchBrowser();
    const remoteDebuggingPort = 3002;

    const { lhr } = await lighthouse(url, {
      port: remoteDebuggingPort, // Pass the port for remote debugging
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'seo'],
    });

    const performanceScore = lhr.categories.performance.score * 100;
    const accessibilityScore = lhr.categories.accessibility.score * 100;
    const seoScore = lhr.categories.seo.score * 100;

    await browser.close();

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
