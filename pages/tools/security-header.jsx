"use client";
import { useState, useRef, useEffect } from "react";
import Summary from "../../components/Summary";
import { NextSeo } from "next-seo";
import {fetchEntryBySlug} from "../../lib/contentful/pageData"

export default function Home({entry, fullUrl}) {
  console.log(entry)
  let seoData = entry?.fields?.seoData?.fields

  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

    const inputRef = useRef(null);
  
    useEffect(() => {
      inputRef.current?.focus();
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setHeaders(null);
    setLoading(true);

    try {
      const response = await fetch(
        `/api/headers?url=${encodeURIComponent(url)}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setHeaders(data);
        // console.log(data);
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
          type: 'website',
          siteName: 'Bright-code',
          url: `${fullUrl}`,
          title: seoData?.SEOTitle,
          description: seoData?.SEODescription,
          images: [
            {
              url: seoData?.ogImage?.fields?.file?.url || `/banner-bg-img.png`,
              width: 800,
              height: 600,
              alt: 'case studies',
            }
          ],
        }}
        twitter={{
          site: '@GetSift',
          cardType: 'summary_large_image',
          image: seoData?.ogImage?.fields?.file?.url || `/banner-bg-img.png`,
        }}
      />

    <section
      className={` md:!pb-[40px] banner-second banner_DarkOverlay banner_bg_img banner-with-img bg-darkBlue text-white md:items-baseline`}
      
    >
      <div className="container">
      <div className="w-full text-center relative z-10">
            <h1 className="text-white">Test Your Security Headers</h1>
            <p className=" mb-8">
            Enter a URL to see if your site is secure with the correct HTTP
            headers.
          </p>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit}>
              <input
                className="text-black w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-indigo-500 text-base !text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL"
                required
                ref={inputRef}
              />

              <button
                className="w-full cursor-pointer gradient-btn py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                type="submit"
                disabled={loading || !url}
              >
                {loading ? "Checking..." : "Check Headers"}
              </button>
            </form>
          </div>
          </div>
      </div>
    </section>
          {
             error && <section><div className="container"><p>{error}</p></div></section>
          }
          {headers && (
            <>
              <Summary site={url} headers={headers} error= {error} />
            </>
          )}
      
    </>
  
  );
}


export async function getServerSideProps(context) {
  let preview = false;
  const { req } = context;
  const protocol = req.headers.referer ? req.headers.referer.split(':')[0] : 'http';
      const fullUrl = `${protocol}://${req.headers.host}${req.url}`;
  let slug = (req.url.split('?')[0]).replace("/","")

  const entry = await fetchEntryBySlug(slug, "basicPage", preview);
  console.log(entry)
  return { props: { entry, fullUrl} };
}