import { getClient } from "../../lib/contentful/client";

export async function GET() {
  const currentClient = getClient(false);
  let urls = [
    {
      loc: 'https://www.bright-code.io/',
      lastmod: '2024-04-14',
      priority: '1.00'
    },
  ];


  try {
    const response = await currentClient.getEntries({
      content_type: "basicPage",
      limit: 100, 
    });
    console.log(response);
    if (response.items.length > 0) {
      const dynamicUrls = response.items.map(item => ({
        loc: `https://www.bright-code.io/${item.fields.slug || item.fields.alias}`,
        lastmod: item.sys.updatedAt.split('T')[0],
        priority: '0.80'
      }));
      urls = urls.concat(dynamicUrls);
    }
    //case study pages
    const caseStudyRes = await currentClient.getEntries({
        content_type: "caseStudies",
        limit: 100 
      });
      console.log(caseStudyRes.items)
      if (caseStudyRes.items.length > 0) {
        const dynamicUrlsCS = caseStudyRes.items.map(item => ({
          loc: `https://www.bright-code.io/case-studies/${item.fields.slug || item.fields.alias}`,
          lastmod: item.sys.updatedAt.split('T')[0],
          priority: '0.80'
        }));
        urls = urls.concat(dynamicUrlsCS);
      }
  } catch (error) {
    console.error(error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        url => `<url>
      <loc>${url.loc}</loc>
      <lastmod>${url.lastmod}</lastmod>
      <priority>${url.priority}</priority>
    </url>`
      )
      .join('\n')}
    </urlset>`;

      return new Response(xml, {
        headers: {
          'Content-Type': 'application/xml',
        },
  });
}