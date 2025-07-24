import type { ReactElement, ReactNode } from "react";
import { Metadata } from "next";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import "../app/globals.css";
import "../styles/global.scss";
import "../styles/buttons.scss";
import "../styles/banners.scss";
import { useEffect } from "react";
import { initAOS } from "../api/aos.js";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { Poppins } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
// import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400", "700", "900", "600"],
  display: "swap",
});


declare global {
  interface Window {
    dataLayer: any[];
  }
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export async function GET() {
  return new Response("Cache Control example", {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=1",
      "CDN-Cache-Control": "public, s-maxage=60",
      "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
    },
  });
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    var anchors = document.querySelectorAll("a");
    anchors.forEach((element) => {
      if (!element.host.includes("bright-code.io")) {
        element.setAttribute("target", "_blank");
      }
    });
  });
  useEffect(() => {
    initAOS();
  }, []);


  return (
    <>
    <Head>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Bright Code",
              "url": "https://www.bright-code.io/",
              "logo": "https://www.bright-code.io/brightcode_logo.png",
              "sameAs": [
                "https://www.linkedin.com/company/bright-codeio/"
              ],
              "contactPoint": [{
                "@type": "ContactPoint",
                "telephone": "+1-805-215-0549",
                "contactType": "customer service",
                "areaServed": "US",
                "availableLanguage": "English"
              }],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "2450 Colorado Ave, Suite 100E",
                "addressLocality": "Santa Monica",
                "addressRegion": "CA",
                "postalCode": "90404",
                "addressCountry": "US"
              }
            })
          }}
        />
    </Head>
      {/* <ContentfulLivePreviewProvider 
        locale="en-US"
        enableInspectorMode={pageProps.preview}
        enableLiveUpdates={pageProps.preview}
      > */}
        <Layout navigationData={pageProps.navigationData}>
          <main className={poppins.className}>
            <Component {...pageProps} />
          </main>
          <ScrollToTopButton />
        </Layout>
      {/* </ContentfulLivePreviewProvider> */}
    </>
  );
}

