import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';

async function launchChrome() {
  const browser = await puppeteer.launch({
    headless: true,  
    args: ['--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222'],  // Disable sandboxing for serverless environments
  });

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

    const { lhr } = await lighthouse(url, {
      port: new URL(wsEndpoint).port, 
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
