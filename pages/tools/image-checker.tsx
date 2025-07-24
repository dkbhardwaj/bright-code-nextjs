
import { NextSeo } from "next-seo";
import { fetchEntryBySlug } from "../../lib/contentful/pageData";
import PageBuilder from "../../integrated-componnents/PageBuilder";
import ImgChecker from "./sub-comp/img-checker";
import {client} from "../../lib/contentful/client"


export default function Home({ entry, fullUrl }: { entry: any; fullUrl: any;}) {
  // console.log(entry)
   let seoData = entry?.fields?.seoData?.fields;
 

  return (
    <>
    <NextSeo
            title={seoData?.SEOTitle}
            description={seoData?.SEODescription}
            canonical={fullUrl}
            openGraph={{
              type: "website",
              siteName: "Bright-code",
              url: `${fullUrl}`,
              title: seoData?.SEOTitle,
              description: seoData?.SEODescription,
              images: [
                {
                  url: seoData?.ogImage?.fields?.file?.url || `/banner-bg-img.png`,
                  width: 800,
                  height: 600,
                  alt: "case studies",
                },
              ],
            }}
            twitter={{
              site: "@GetSift",
              cardType: "summary_large_image",
            }}
          />
        <ImgChecker />
    </>
  );
}


export async function getStaticProps() {
  try {
    const slug = "tools/image-checker";
    const entry = await fetchEntryBySlug(slug, "basicPage", false);
    // const section = entry.fields?.section;

    const navRes = await client.getEntries({
        content_type: "navigation",
        "fields.navName": "Main Nav",
    });
      const navigationData = navRes.items[0]?.fields ?? null;

    return {
      props: {
        entry,
        fullUrl: `https://www.bright-code.io/tools/${slug}`,
        navigationData,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);

    return {
      notFound: true, // let Next.js serve a 404 page
    };
  }
}
