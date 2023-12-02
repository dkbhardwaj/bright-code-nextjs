import type { ReactElement, ReactNode } from "react";
import { Metadata } from "next";
import Head from "next/head";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
// import Layout from "../components/layout";
import "../app/globals.css";
import "../styles/global.css";
import "../styles/buttons.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const defaultTitle = "Bright Code";
  return (
    <>
      <Head>
        <title>{defaultTitle}</title>
      </Head>
      {/* <Layout> */}
        <main>
          <Component {...pageProps} />
        </main>
      {/* </Layout> */}
    </>
  );
}
