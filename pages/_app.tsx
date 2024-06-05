import type { ReactElement, ReactNode } from "react";
import { Metadata } from "next";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "../app/globals.css";
import "../styles/global.scss";
import "../styles/buttons.scss";
import "../styles/banners.scss";
import { useEffect } from "react";
import { initAOS } from "../api/aos.js";






export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
 


  return (
    <>
     
      
        <main>
         <h1>Homepage</h1>
        </main>
    
    </>
  );
}
