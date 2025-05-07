import axios from "axios";
import * as cheerio from "cheerio";
import { URL } from "url";

// Enhanced configuration
const config = {
  maxPages: 500, // Increased from 50
  sameDomainOnly: false,
  checkExternalLinks: true,
  externalLinkDomains: [
    // List of social media domains to check
    "facebook.com",
    "twitter.com",
    "linkedin.com",
    "instagram.com",
    "youtube.com",
    // Add other social media domains as needed
  ],
  timeout: 10000,
  maxRedirects: 10,
  userAgent:
    "Mozilla/5.0 (compatible; LinkChecker/1.0; +http://yourdomain.com)",
  includeResources: true, // Check images, scripts, etc.
};

// Global state
const state = {
  visitedUrls: new Set(),
  allLinks: new Map(), // Using Map for better performance
  pagesToCrawl: [],
  crawlInProgress: false,
  stats: {
    pagesVisited: 0,
    linksChecked: 0,
    brokenLinks: 0,
  },
};

function normalizeUrl(url) {
  try {
    const urlObj = new URL(url);
    // Force HTTPS and remove trailing slashes
    urlObj.protocol = "https:";
    urlObj.pathname = urlObj.pathname.replace(/\/+$/, "");
    urlObj.search = ""; // Remove query parameters if you want
    return urlObj.href;
  } catch (e) {
    return url; // Return original if invalid URL
  }
}

export async function checkLinksOnPage(baseUrl, options, streamData) {
  try {
    // Initialize crawl
    if (!state.crawlInProgress) {
      state.visitedUrls.clear();
      state.allLinks.clear();
      state.pagesToCrawl = [];
      state.crawlInProgress = true;
      state.stats = { pagesVisited: 0, linksChecked: 0, brokenLinks: 0 };
      Object.assign(config, options);
    }

    // Normalize URL
    const baseUrlObj = new URL(baseUrl);
    baseUrl = baseUrlObj.href;
    const domain = baseUrlObj.hostname;

    // Skip if already visited
    if (state.visitedUrls.has(baseUrl)) return;
    state.visitedUrls.add(baseUrl);
    state.stats.pagesVisited++;

    // Fetch page with enhanced options
    const response = await axios.get(baseUrl, {
      validateStatus: () => true,
      timeout: config.timeout,
      maxRedirects: config.maxRedirects,
      headers: {
        "User-Agent": config.userAgent,
      },
    });

    // Parse content
    const $ = cheerio.load(response.data);
    const pageLinks = [];

    // Extract ALL types of links
    const selectors = [
      "a[href]", // Standard links
      "script[src]", // JavaScript
      "iframe[src]", // Iframes
      "audio[src]", // Audio
      "embed[src]", // Embeds
      "object[data]", // Objects
    ];

    // Process all selectors
    // Process all selectors
    selectors.forEach((selector) => {
      $(selector).each((i, elem) => {
        const attr =
          $(elem).attr("href") ||
          $(elem).attr("src") ||
          $(elem).attr("data") ||
          $(elem).attr("action");
        if (!attr) return;

        try {
          // Skip fragments and javascript
          if (attr.startsWith("#") || attr.startsWith("javascript:")) return;

          // Create absolute URL
          const absoluteUrl = new URL(attr, baseUrl).href;
          const urlObj = new URL(absoluteUrl);

          // Skip non-HTTP protocols
          if (!["http:", "https:"].includes(urlObj.protocol)) return;

          // Check if we should include this external link
          const isExternal = urlObj.hostname !== domain;
          const isSocialMedia = config.externalLinkDomains.some((domain) =>
            urlObj.hostname.includes(domain)
          );

          // Skip external links if not configured to check them
          if (isExternal && !config.checkExternalLinks && !isSocialMedia)
            return;

          // Prepare link data
          const linkData = {
            url: absoluteUrl,
            sourceUrl: baseUrl,
            element: selector,
            text: $(elem).text().trim(),
            attribute: attr.startsWith("http") ? "absolute" : "relative",
            isExternal,
            isSocialMedia,
          };

          // Add to queue if new
          if (!state.allLinks.has(absoluteUrl)) {
            state.allLinks.set(absoluteUrl, linkData);
            pageLinks.push(linkData);

            // Only add internal pages to crawl queue
            if (
              !isExternal &&
              !state.visitedUrls.has(absoluteUrl) &&
              state.pagesToCrawl.length < config.maxPages &&
              isHtmlPage(absoluteUrl)
            ) {
              state.pagesToCrawl.push(absoluteUrl);
            }
          }
        } catch (e) {
          // Skip invalid URLs
        }
      });
    });
    // Check all found links
    await checkLinkStatuses(pageLinks, streamData);

    // Continue crawling
    if (state.pagesToCrawl.length > 0) {
      const nextUrl = state.pagesToCrawl.shift(); // Using BFS instead of DFS
      await checkLinksOnPage(nextUrl, options, streamData);
    } else {
      // Crawl complete
      state.crawlInProgress = false;
      streamData({
        complete: true,
        stats: state.stats,
      });
    }
  } catch (error) {
    console.error(`Error processing ${baseUrl}:`, error.message);
    streamData({
      error: `Failed to process ${baseUrl}: ${error.message}`,
      stats: state.stats,
    });
    state.crawlInProgress = false;
  }
}

// Helper to identify HTML pages
function isHtmlPage(url) {
  return !url.match(
    /\.(pdf|jpg|jpeg|png|gif|svg|css|js|zip|rar|exe|dmg|mp3|mp4|avi|mov|webp|ico|woff|woff2|ttf|eot|json|xml|csv|txt)$/i
  );
}

async function checkLinkStatuses(links, streamData) {
  const batchSize = 5; // Reduced batch size for smoother progress
  let processed = 0;
  const total = links.length;

  for (let i = 0; i < links.length; i += batchSize) {
    const batch = links.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map((link) => checkSingleLink(link))
    );

    // Update state and send progress
    results.forEach((result) => {
      state.stats.linksChecked++;
      if (result.isBroken) state.stats.brokenLinks++;
      state.allLinks.set(result.url, result);
      streamData({ result });
    });

    processed += batch.length;
    const currentProgress = Math.min(98, Math.round((processed / total) * 100));
    streamData({
      progress: currentProgress,
      stats: state.stats,
    });
  }

  // Ensure we reach 100% at the end
  streamData({
    progress: 100,
    stats: state.stats,
    complete: true,
  });
}

async function checkSingleLink(link) {
  // Skip checking for certain social media links that might block HEAD requests
  const socialMediaUrls = [
    "facebook.com",
    "twitter.com",
    "linkedin.com",
    "instagram.com",
    "youtube.com",
  ];

  const isSocialMedia = socialMediaUrls.some((domain) =>
    link.url.includes(domain)
  );

  try {
    // For social media, we'll just verify the URL is valid
    if (isSocialMedia) {
      return {
        ...link,
        status: 200, // Assume valid unless URL is malformed
        statusText: "OK",
        isBroken: false,
        finalUrl: link.url,
        skipped: true, // Mark as skipped actual checking
      };
    }

    // For other external links, use HEAD request first to be efficient
    if (link.isExternal) {
      try {
        const response = await axios.head(link.url, {
          validateStatus: () => true,
          timeout: config.timeout,
          maxRedirects: config.maxRedirects,
        });

        return {
          ...link,
          status: response.status,
          statusText: response.statusText,
          isBroken: response.status >= 400 || response.status < 200,
          finalUrl: response.request?.res?.responseUrl || link.url,
        };
      } catch (headError) {
        // If HEAD fails, try with GET
        const response = await axios.get(link.url, {
          validateStatus: () => true,
          timeout: config.timeout,
          maxRedirects: config.maxRedirects,
        });

        return {
          ...link,
          status: response.status,
          statusText: response.statusText,
          isBroken: response.status >= 400 || response.status < 200,
          finalUrl: response.request?.res?.responseUrl || link.url,
        };
      }
    }

    // Internal links - use normal GET request
    const response = await axios.get(link.url, {
      validateStatus: () => true,
      timeout: config.timeout,
      maxRedirects: config.maxRedirects,
    });

    return {
      ...link,
      status: response.status,
      statusText: response.statusText,
      isBroken: response.status >= 400 || response.status < 200,
      finalUrl: response.request?.res?.responseUrl || link.url,
    };
  } catch (error) {
    return {
      ...link,
      status: error.response?.status || 0,
      statusText: error.response?.statusText || "Connection Failed",
      isBroken: true,
      error: error.message,
      finalUrl: error.response?.request?.res?.responseUrl || link.url,
    };
  }
}
