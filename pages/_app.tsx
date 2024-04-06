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
import { GTMHeadScript } from "../components/Gscripts";
import { useRouter } from "next/router";

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
  const gtagScript = `<script type=‘text/javascript’ src=‘https://www.googletagmanager.com/gtag/js?id=UA-254354410-1’ id=‘google_gtagjs-js’ async></script>
  <script type=‘text/javascript’ id=‘google_gtagjs-js-after’>
  window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}
  gtag(‘set’, ‘linker’, {“domains”:[“www.bright-code.io”]} );
  gtag(“js”, new Date());
  gtag(“set”, “developer_id.dZTNiMT”, true);
  gtag(“config”, “UA-254354410-1”, {“anonymize_ip”:true});
  gtag(“config”, “G-0J63B1FNF9");
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

  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => {
    // Show the button when scrolling down, hide when at the top
    setIsVisible(window.scrollY > 200);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const router = useRouter();
  // let [currentUrl, setCanonicalUrl] = useState("");
  // useEffect(() => {
  //   setCanonicalUrl(window.location.origin + router.asPath);
  // }, [router.asPath]);

  let currentUrl = "https://www.bright-code.io/" + router.asPath;

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
        {/* <link
          rel="stylesheet"
          id="google-fonts-1-css"
          href="https://fonts.googleapis.com/css?family=Roboto%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CRoboto+Slab%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CPoppins%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7COpen+Sans%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CLato%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CRoboto+Condensed%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic&amp;display=auto&amp;ver=6.0.1"
          type="text/css"
          media="all"
        ></link> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>

        {/* <link rel="canonical" href={canonicalUrl} key="canonical" /> */}
        <GTMHeadScript />
      </Head>
      <NextSeo
        title={String(metadata.title)}
        description={String(metadata.description)}
        canonical={currentUrl}
      />
      <Layout>
        <main>
          <Component {...pageProps} />
        </main>
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-4 bg-blue-500 bg-bgBluePurple rounded-full shadow-lg transition-opacity duration-300 z-50 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="block relative top-[3px] w-4 h-4 border-t-2 border-r-2 border-white transform rotate-[-45deg]"></span>
        </button>
      </Layout>
    </>
  );
}
