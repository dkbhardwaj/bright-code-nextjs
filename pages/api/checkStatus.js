// pages/api/checkLinks.js
// import fetch from 'node-fetch';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.query;
  // console.log(url);
  const timeoutMs = 120000; // 60 seconds
  const timer = setTimeout(() => {
    res.status(500).json({ error: 'Timeout error: Function execution exceeded maximum time limit' });
  }, timeoutMs);
  try {
    clearTimeout(timer);
    const response = await fetch(url);
    console.log(response);
    const html = await response.text();
    const linkStatus = await checkLinkStatus(html, url);
    res.status(200).json({ linkStatus });
  } catch (error) {
    clearTimeout(timer);
    console.error('Error fetching website:', error);
    res.status(500).json({ error: 'Error fetching website' });
  }
}

async function checkLinkStatus(html, baseUrl) {
  const $ = cheerio.load(html);
  const links = $('a');
  const linkStatus = {};
  let countError = 0;

  for (let i = 0; i < links.length; i++) {
    const link = $(links[i]).attr('href');
    console.log(link);
    if (link) {
      const absoluteLink = new URL(link, baseUrl).href;
      try {
        const response = await fetch(absoluteLink, { method: 'HEAD' });
        linkStatus[absoluteLink] = response.ok ? 'OK' : 'Not Found';
      } catch (error) {
        linkStatus[absoluteLink] = 'Error';
      }
    }
  }
  console.log(linkStatus);
  return linkStatus;
}
