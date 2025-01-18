// pages/api/audit.js
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    // Launch Puppeteer to control Chrome
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Run Lighthouse audit
    const result = await lighthouse(url, {
      port: (new URL(browser.wsEndpoint())).port,
    });

    // Close the browser after audit
    await browser.close();

    // Return Lighthouse result
    res.status(200).json(result.lhr);
  } catch (error) {
    console.error('Error running Lighthouse:', error);
    res.status(500).json({ error: 'Failed to run Lighthouse audit' });
  }
}
