import { useState } from "react";
import URLInput from "../../components/wheregoesComp/UrlInput";
import Result from "../../components/wheregoesComp/Result";
import { NextSeo } from "next-seo";
import { fetchEntryBySlug } from "../../lib/contentful/pageData";

export default function Home({ entry, fullUrl }) {

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
            <URLInput setResults={setResults} />
          </div>
        </div>
        {console.log(results)}
      </section>
      {results && (
        <section className="py-[60px]">
          <div className="container">
            <Result data={results} />
          </div>
        </section>
      )}
    </>
  );
}



export async function getServerSideProps(context) {
  let preview = false;
  const { req } = context;
  const protocol = req.headers.referer ? req.headers.referer.split(":")[0] : "http";
  const fullUrl = `${protocol}://${req.headers.host}${req.url}`;
  let slug = req.url.split("?")[0].replace("/", "");

  const entry = await fetchEntryBySlug(slug, "basicPage", preview);
  console.log(entry);
  return { props: { entry, fullUrl } };
}