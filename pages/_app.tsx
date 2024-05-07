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

export const metadata: Metadata = {
  title: "Bright Code",
  description: "Drupal CMS Agency",
};

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

  const router = useRouter();
  let currentUrl = "https://www.bright-code.io/" + router.asPath;

  return (
    <>
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
