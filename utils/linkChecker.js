import axios from "axios";
import * as cheerio from "cheerio";
import { URL } from "url";

const config = {
  maxPages: 500,
  sameDomainOnly: false,
  checkExternalLinks: true,
  externalLinkDomains: [
    "facebook.com",
    "twitter.com",
    "linkedin.com",
    "instagram.com",
    "youtube.com",
  ],
  timeout: 10000,
  maxRedirects: 10,
  userAgent:
    "Mozilla/5.0 (compatible; LinkChecker/1.0; +http://yourdomain.com)",
  includeResources: true,
};

const state = {
  visitedUrls: new Set(),
  allLinks: new Map(),
  pagesToCrawl: [],
  crawlInProgress: false,
  stats: {
    pagesVisited: 0,
    linksChecked: 0,
    brokenLinks: 0,
  },
  totalPages: 1, // Track total pages (initially 1 for the base URL)
};

function normalizeUrl(url) {
  try {
    const urlObj = new URL(url);
    urlObj.protocol = "https:";
    urlObj.pathname = urlObj.pathname.replace(/\/+$/, "");
    urlObj.search = "";
    return urlObj.href;
  } catch (e) {
    return url;
  }
}

export async function checkLinksOnPage(baseUrl, options, streamData) {
  try {
    if (!state.crawlInProgress) {
      state.visitedUrls.clear();
      state.allLinks.clear();
      state.pagesToCrawl = [];
      state.crawlInProgress = true;
      state.stats = { pagesVisited: 0, linksChecked: 0, brokenLinks: 0 };
      state.totalPages = 1;
      Object.assign(config, options);
      streamData({ totalPages: state.totalPages }); // Initial totalPages
    }

    const baseUrlObj = new URL(baseUrl);
    baseUrl = baseUrlObj.href;
    const domain = baseUrlObj.hostname;

    if (state.visitedUrls.has(baseUrl)) return;
    state.visitedUrls.add(baseUrl);
    state.stats.pagesVisited++;

    // Stream initial page update
    streamData({
      pageUpdate: { pageUrl: baseUrl, pageProgress: 0, pageStatus: "Crawling" },
      overallProgress: Math.min(
        100,
        (state.stats.pagesVisited / state.totalPages) * 100
      ),
    });

    const response = await axios.get(baseUrl, {
      validateStatus: () => true,
      timeout: config.timeout,
      maxRedirects: config.maxRedirects,
      headers: { "User-Agent": config.userAgent },
    });

    const $ = cheerio.load(response.data);
    const pageLinks = [];

    const selectors = [
      "a[href]",
      "script[src]",
      "iframe[src]",
      "audio[src]",
      "embed[src]",
      "object[data]",
    ];

    selectors.forEach((selector) => {
      $(selector).each((i, elem) => {
        const attr =
          $(elem).attr("href") || $(elem).attr("src") || $(elem).attr("data");
        if (!attr) return;

        if (attr.startsWith("#") || attr.startsWith("javascript:")) return;

        try {
          const absoluteUrl = new URL(attr, baseUrl).href;
          const urlObj = new URL(absoluteUrl);

          if (!["http:", "https:"].includes(urlObj.protocol)) return;

          const isExternal = urlObj.hostname !== domain;
          const isSocialMedia = config.externalLinkDomains.some((domain) =>
            urlObj.hostname.includes(domain)
          );

          if (isExternal && !config.checkExternalLinks && !isSocialMedia)
            return;

          const linkData = {
            url: absoluteUrl,
            sourceUrl: baseUrl,
            element: selector,
            text: $(elem).text().trim(),
            attribute: attr.startsWith("http") ? "absolute" : "relative",
            isExternal,
            isSocialMedia,
          };

          if (!state.allLinks.has(absoluteUrl)) {
            state.allLinks.set(absoluteUrl, linkData);
            pageLinks.push(linkData);

            if (
              !isExternal &&
              !state.visitedUrls.has(absoluteUrl) &&
              state.pagesToCrawl.length < config.maxPages &&
              isHtmlPage(absoluteUrl)
            ) {
              state.pagesToCrawl.push(absoluteUrl);
              state.totalPages = Math.max(
                state.totalPages,
                state.visitedUrls.size + state.pagesToCrawl.length
              );
              streamData({ totalPages: state.totalPages }); // Update totalPages
            }
          }
        } catch (e) {}
      });
    });

    await checkLinkStatuses(pageLinks, baseUrl, streamData);

    if (state.pagesToCrawl.length > 0) {
      const nextUrl = state.pagesToCrawl.shift();
      await checkLinksOnPage(nextUrl, options, streamData);
    } else {
      state.crawlInProgress = false;
      streamData({
        complete: true,
        stats: state.stats,
        overallProgress: 100,
      });
    }
  } catch (error) {
    console.error(`Error processing ${baseUrl}:`, error.message);
    streamData({
      pageUpdate: { pageUrl: baseUrl, pageProgress: 0, pageStatus: "Failed" },
      error: `Failed to process ${baseUrl}: ${error.message}`,
      stats: state.stats,
      overallProgress: Math.min(
        100,
        (state.stats.pagesVisited / state.totalPages) * 100
      ),
    });
    state.crawlInProgress = false;
  }
}

function isHtmlPage(url) {
  return !url.match(
    /\.(pdf|jpg|jpeg|png|gif|svg|css|js|zip|rar|exe|dmg|mp3|mp4|avi|mov|webp|ico|woff|woff2|ttf|eot|json|xml|csv|txt)$/i
  );
}

async function checkLinkStatuses(links, pageUrl, streamData) {
  const batchSize = 5;
  let processed = 0;
  const total = links.length;

  for (let i = 0; i < links.length; i += batchSize) {
    const batch = links.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map((link) => checkSingleLink(link))
    );

    results.forEach((result) => {
      state.stats.linksChecked++;
      if (result.isBroken) state.stats.brokenLinks++;
      state.allLinks.set(result.url, result);
      streamData({ result });
    });

    processed += batch.length;
    const pageProgress = Math.min(100, Math.round((processed / total) * 100));
    streamData({
      pageUpdate: {
        pageUrl,
        pageProgress,
        pageStatus: pageProgress === 100 ? "Completed" : "Crawling",
      },
      overallProgress: Math.min(
        100,
        (state.stats.pagesVisited / state.totalPages) * 100
      ),
    });
  }
}

async function checkSingleLink(link) {
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
    if (isSocialMedia) {
      return {
        ...link,
        status: 200,
        statusText: "OK",
        isBroken: false,
        finalUrl: link.url,
        skipped: true,
      };
    }

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
