import { useState } from "react";
import URLInput from "../../components/wheregoesComp/UrlInput";
import Result from "../../components/wheregoesComp/Result";
import { NextSeo } from "next-seo";
import { fetchEntryBySlug } from "../../lib/contentful/pageData";
import PageBuilder from "../../integrated-componnents/PageBuilder";

export default function Home({ entry, fullUrl, section }) {
  let seoData = entry?.fields?.seoData?.fields;

  const [results, setResults] = useState(null);

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
          image: seoData?.ogImage?.fields?.file?.url || `/banner-bg-img.png`,
        }}
      />
      <section
        className={` md:!pb-[40px] banner-second banner_DarkOverlay banner_bg_img banner-with-img bg-darkBlue text-white md:items-baseline`}
      >
        <div className="container">
          <div className="w-full text-center relative z-10">
            <h1 className="text-white mb-[20px]">Track URL Redirects</h1>
            <p className="mb-8">
              Enter a URL to see its redirect status and identify potential
              issues with site navigation.
            </p>
            <URLInput setResults={setResults} />
          </div>
        </div>
        {console.log(results)}
      </section>
      {results ? (
        <section className="py-[60px]">
          <div className="container">
            <Result data={results} />
          </div>
        </section>
      ) : (
        <PageBuilder pageComponents={section} caseStudy={false} />
      )}
    </>
  );
}

export async function getStaticProps() {
  try {
    const slug = "tools/link-tracker";
    const entry = await fetchEntryBySlug(slug, "basicPage", false);
    const section = entry.fields?.section;

    return {
      props: {
        entry,
        fullUrl: `https://www.bright-code.io/tools/${slug}`,
        section,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);

    // fallback props in case entry not found
    return {
      notFound: true, // let Next.js serve a 404 page
    };
  }
}
