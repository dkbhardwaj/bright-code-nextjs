import puppeteer from 'puppeteer'; // This will ensure Puppeteer is installed with Chromium for local
import lighthouse from 'lighthouse';
import chrome from 'chrome-aws-lambda';  // For serverless environments like Vercel

async function launchChrome() {
  const isLocal = process.env.NODE_ENV !== 'production'; // Check if it's local or production

  let executablePath;
  let args;

  // Handling local environment
  if (isLocal) {
    console.log("Running in local environment");
    executablePath = puppeteer.executablePath();  // This will point to the local Chrome binary
    args = ['--no-sandbox', '--disable-setuid-sandbox'];  // Optional flags for local
  } else {
    console.log("Running in serverless (Vercel) environment");
    executablePath = await chrome.executablePath;  // For serverless environments like Vercel
    args = chrome.args;  // Arguments for serverless environments
  }

  console.log("Executable Path: ", executablePath);  // Log the executable path for debugging

  if (!executablePath) {
    throw new Error('Chromium executable path is undefined.');
  }

  // Launch the browser with the correct executable path and arguments
  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args,
    defaultViewport: chrome.defaultViewport, // For Vercel (serverless)
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
    });

    const performanceScore = lhr.categories.performance.score * 100;
    const accessibilityScore = lhr.categories.accessibility.score * 100;
    const seoScore = lhr.categories.seo.score * 100;
    const bestPracticeScore = lhr.categories['best-practices'].score * 100;

    await browser.close(); // Close the browser once done

    res.status(200).json({
      performance: performanceScore,
      accessibility: accessibilityScore,
      seo: seoScore,
      bestPractice: bestPracticeScore,
    });
  } catch (error) {
    console.error('Error running Lighthouse:', error);
    res.status(500).json({ error: 'Failed to run Lighthouse audit', details: error.message });
  }
}
