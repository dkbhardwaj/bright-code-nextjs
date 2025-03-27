import axios from 'axios';
import * as cheerio from 'cheerio';
import { URL, parse } from 'url';

export async function checkLinksOnPage(baseUrl, options, streamData) {
  try {
    // Normalize the base URL
    const baseUrlObj = new URL(baseUrl);
    baseUrl = baseUrlObj.href;

    // Fetch the base page
    const response = await axios.get(baseUrl, {
      validateStatus: () => true, // Don't throw on 404
    });

    const $ = cheerio.load(response.data);
    const links = [];
    const checkedLinks = new Set();
    const results = [];

    // Extract all links from the page
    $('a').each((i, elem) => {
      const href = $(elem).attr('href');
      if (href && !href.startsWith('#')) {
        links.push(href);
      }
    });

    const totalLinks = links.length;
    let processedLinks = 0;

    // Check each link
    for (const link of links) {
      try {
        let absoluteUrl;
        
        // Skip if already checked
        if (checkedLinks.has(link)) continue;
        checkedLinks.add(link);

        // Handle relative URLs
        if (link.startsWith('http')) {
          absoluteUrl = link;
        } else {
          absoluteUrl = new URL(link, baseUrl).href;
        }

        // Skip mailto: and tel: links
        if (absoluteUrl.startsWith('mailto:') || absoluteUrl.startsWith('tel:')) {
          processedLinks++;
          streamData({ progress: Math.round((processedLinks / totalLinks) * 100) });
          continue;
        }

        // Check the link
        const linkResponse = await axios.get(absoluteUrl, {
          validateStatus: () => true,
          maxRedirects: 5,
        });

        const status = linkResponse.status;
        const isBroken = status >= 400 || status < 200;

        results.push({
          url: absoluteUrl,
          status,
          isBroken,
          sourceUrl: baseUrl,
          text: $(`a[href="${link}"]`).text().trim(),
        });

        streamData({
          result: {
            url: absoluteUrl,
            status,
            isBroken,
            sourceUrl: baseUrl,
            text: $(`a[href="${link}"]`).text().trim(),
          }
        });

      } catch (error) {
        results.push({
          url: link,
          status: error.response?.status || 0,
          isBroken: true,
          sourceUrl: baseUrl,
          text: $(`a[href="${link}"]`).text().trim(),
          error: error.message,
        });

        streamData({
          result: {
            url: link,
            status: error.response?.status || 0,
            isBroken: true,
            sourceUrl: baseUrl,
            text: $(`a[href="${link}"]`).text().trim(),
            error: error.message,
          }
        });
      }

      processedLinks++;
      streamData({ progress: Math.round((processedLinks / totalLinks) * 100) });
    }

    return results;
  } catch (error) {
    console.error('Error checking links:', error);
    throw error;
  }
}