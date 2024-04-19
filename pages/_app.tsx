import type { ReactElement, ReactNode } from "react";
import { Metadata } from "next";
import Head from "next/head";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import "../app/globals.css";
import "../styles/global.scss";
import "../styles/buttons.scss";
import "../styles/banners.scss";
import { useEffect, useState } from "react";
import { initAOS } from "../api/aos.js";
import { NextSeo } from "next-seo";
// import { GTMHeadScript } from "../components/Gscripts";
import { useRouter } from "next/router";
import ScrollToTopButton from "../components/ScrollToTopButton";

export const metadata: Metadata = {
  title: "Bright Code",
  description: "Drupal CMS Agency",
};

declare global {
  interface Window {
    dataLayer: any[]; // Define the dataLayer property
  }
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  useEffect(() => {
    var anchors = document.querySelectorAll("a");
    anchors.forEach((element) => {
      if (!element.host.includes("master.d2ex0xpyl1a0p4.amplifyapp")) {
        //element.setAttribute("target", "_blank");
      }
    });
  });
  useEffect(() => {
    initAOS(); // Initialize AOS when the app mounts on the client side
  }, []);
  
  const gtagScript = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-J5EMG95WSZ"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-J5EMG95WSZ');
    </script>`;
  const gtagManagerScript = `<script type=“text/javascript”>
    ( function( w, d, s, l, i ) {
      w[l] = w[l] || [];
      w[l].push( {‘gtm.start’: new Date().getTime(), event: ‘gtm.js’} );
      var f = d.getElementsByTagName( s )[0],
        j = d.createElement( s ), dl = l != ‘dataLayer’ ? ‘&l=’ + l : ‘’;
      j.async = true;
      j.src = ‘https://www.googletagmanager.com/gtm.js?id=’ + i + dl;
      f.parentNode.insertBefore( j, f );
    } )( window, document, ‘script’, ‘dataLayer’, ‘GTM-KVK3JT9’ );

  </script>`;
  const googleTagScript = `<!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11070673099"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-11070673099');
  </script>`;

  useEffect(() => {
    let head = document.getElementsByTagName("head")[0];
    head.innerHTML += gtagScript;
    head.innerHTML += gtagManagerScript;
    head.innerHTML += googleTagScript;
  }, []);

  const router = useRouter();
  // const [currentUrl, setCanonicalUrl] = useState("");
  // useEffect(() => {
  //   setCanonicalUrl(window.location.origin + router.asPath);
  // }, [router.asPath]);

  let currentUrl = "https://www.bright-code.io/" + router.asPath;

  return (
    <>
      {/* <Head>
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" /> */}

      {/* <link rel="canonical" href={canonicalUrl} key="canonical" /> */}
      {/* <GTMHeadScript />
      </Head> */}
      <NextSeo
        title={String(metadata.title)}
        description={String(metadata.description)}
        canonical={currentUrl}
      />
      <Layout>
        <main>
          <Component {...pageProps} />
        </main>
        <ScrollToTopButton />
      </Layout>
    </>
  );
}
