import lighthouse from 'lighthouse';
 const currentUrl = `${window.location.origin}`


// Import puppeteer for local development

let puppeteer;

// if (process.env.NODE_ENV === 'development') {
if (!currentUrl.includes("localhost")) {
  puppeteer = require('puppeteer');
}


async function launchChrome() {
    let { url1 } = req.query;
//   if (process.env.NODE_ENV === 'development') {
  if (!url1.includes("localhost")) {
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--headless', '--disable-gpu'],
    });
    const page = await browser.newPage();
    const port = page.browser().wsEndpoint().split(':')[2]; 
    return { browser, port };
  } else {
    const { default: chromeLauncher } = await import('chrome-aws-lambda');
    const chrome = await chromeLauncher.launch({
      headless: true,
      executablePath: await chromeLauncher.executablePath,
      args: chromeLauncher.args,
    });
    return chrome;
  }
}

export default async function handler(req, res) {
  const { url } = req.query;
    console.log(url)
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const chrome = await launchChrome();

    // Run Lighthouse audit
    const { lhr } = await lighthouse(url, {
      port: chrome.port, 
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'seo'], // Only run these categories
    });

    const performanceScore = lhr.categories.performance.score * 100;
    const accessibilityScore = lhr.categories.accessibility.score * 100;
    const seoScore = lhr.categories.seo.score * 100;

    // Close Chrome after the audit (if using Puppeteer)
    // if (process.env.NODE_ENV === 'development') {
    if (!url.includes("localhost")) {
      await chrome.browser.close();
    } else {
      await chrome.kill();
    }

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
