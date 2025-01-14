import { useState } from "react";
import URLInput from "../../components/wheregoesComp/UrlInput";
import Result from "../../components/wheregoesComp/Result";
import { NextSeo } from "next-seo";

export default function Home() {
  const [results, setResults] = useState(null);

  //https://ydnt.com/
  return (
    <>
    <NextSeo
        title={`Link Tracker - Secure Link Tracing | Bright Code`}
        description={`Navigate your digital journey with Bright Code’s Link Tracker. Trace link redirections, ensure URL safety, and discover the final destination of any link with ease. Uncover the path your URLs take before you click.`}
        
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
