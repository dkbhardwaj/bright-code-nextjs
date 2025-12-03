"use client";
import { useState, useRef, useEffect } from "react";
import Summary from "../../components/Summary";
import { NextSeo } from "next-seo";
import { fetchEntryBySlug } from "../../lib/contentful/pageData";
import PageBuilder from "../../integrated-componnents/PageBuilder";
import {client} from "../../lib/contentful/client"
import { useRouter } from "next/router";

export default function Home({ entry, fullUrl, section }) {
  let seoData = entry?.fields?.seoData?.fields;
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [originalUrl, setOriginalUrl] = useState(false);
  const [autoChecked, setAutoChecked] = useState(false);

  const inputRef = useRef(null);
  const router = useRouter(); 

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    if (autoChecked) return;

    const q = router.query.q;

    if (typeof q === "string" && q.trim()) {
      setUrl(q);
      handleSubmit(null, q);
      setAutoChecked(true);
    }
  }, [router.isReady, router.query.q, autoChecked]);

  const normalizeUrl = (inputUrl) => {
    if (!/^https?:\/\//i.test(inputUrl)) {
      return {
        original: `https://www.${inputUrl}`,
        normalized: `http://www.${inputUrl}`,
      };
    }

    return {
      original: inputUrl,
      normalized: inputUrl,
    };
  };

 const handleSubmit = async (e, incomingUrl) => {
    if (e) e.preventDefault();

    setError(null);
    setHeaders(null);
    setLoading(true);

    const value = incomingUrl ?? url; 

    if (!value.trim()) {
      setError("Please enter a valid URL.");
      setLoading(false);
      return;
    }

    const { original, normalized } = normalizeUrl(value);
    setOriginalUrl(original);

    try {
      const response = await fetch(
        `/api/headers?url=${encodeURIComponent(normalized)}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      // console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setHeaders(data);

        router.push(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              q: original,
            },
          },
          undefined,
          { shallow: true }
        );
      }
    } catch (err) {
      setError("Error fetching headers");
    } finally {
      setLoading(false);
    }
  };


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

      <section className="md:!pb-[40px] banner-second banner_DarkOverlay banner_bg_img banner-with-img bg-darkBlue text-white md:items-baseline">
        <div className="container">
          <div className="w-full text-center relative z-10">
            <h1 className="text-white">Test Your Security Headers</h1>
            <p className="mb-8">
              Enter a URL to see if your site is secure with the correct HTTP
              headers.
            </p>
            <div className="max-w-md mx-auto">
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  className="text-black w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-indigo-500 text-base !text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter website URL"
                  required
                  ref={inputRef}
                />
                <button
                  className="w-full cursor-pointer gradient-btn py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                  type="submit"
                  disabled={loading || !url.trim()}
                >
                  {loading ? "Checking..." : "Check Headers"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <section>
          <div className="container">
            <p>{error}</p>
          </div>
        </section>
      )}

      {headers ? (
        <>
          <Summary site={originalUrl} headers={headers} error={error} />
        </>
      ) : (
        <PageBuilder pageComponents={section} caseStudy={false} />
      )}
    </>
  );
}

export async function getStaticProps() {
  try {
    const slug = "tools/security-header";
    const entry = await fetchEntryBySlug(slug, "basicPage", false);
    const section = entry.fields?.section;

    const navRes = await client.getEntries({
      content_type: "navigation",
      "fields.navName": "Main Nav",
      include: 3,
    });
    const navigationData = navRes.items[0]?.fields ?? null;

    return {
      props: {
        entry,
        fullUrl: `https://www.bright-code.io/tools/${slug}`,
        section,
        navigationData,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);

    return {
      notFound: true,
    };
  }
}
