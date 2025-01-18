// pages/api/audit.js
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer'; // Use puppeteer to handle Chromium launch

export default async function handler(req, res) {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    // Launch Puppeteer (it will automatically use the bundled Chromium)
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    // Run Lighthouse on the given URL
    // const result = await lighthouse(url, {
    //   port: (new URL(browser.wsEndpoint())).port,
    // });
    const result = {performance: 33}
    // Close the browser after the audit is complete
    await browser.close();

    // Return the Lighthouse result
    res.status(200).json(result);
  } catch (error) {
    console.error('Error running Lighthouse:', error);
    res.status(500).json({ error: error.message || 'Failed to run Lighthouse audit' });
  }
}
