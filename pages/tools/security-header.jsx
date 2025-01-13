"use client";
import { useState, useRef, useEffect } from "react";
import Summary from "../../components/Summary";
import { NextSeo } from "next-seo";

export default function Home() {
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

    const inputRef = useRef(null);
  
    useEffect(() => {
      inputRef.current?.focus();  // Focus input when component mounts
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
        title={`Security Header Analyzer - Check Your Website’s Security Headers`}
        description={`Analyze your website’s security headers with our easy-to-use tool. Check for HTTP security headers like HSTS, CSP, and more to ensure your site is protected against common web vulnerabilities.`}
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
