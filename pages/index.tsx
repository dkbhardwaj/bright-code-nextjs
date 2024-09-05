"use client";
import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import {
  heroBanner,
  intro,
  intro2,
  contentWithImage,
  contentWithImage2,
  contentWithImage3,
  contentWithImage4,
  intro3,
  colFourCard,
  contactForm,
  footerMap,
} from "../data/homepage/data";

function onChange(token: string | null) {
  console.log("Captcha token:", token);
}
export const metadata: Metadata = {
  title: "Expert Web Development for Companies & Agencies | Bright Code IO",
  description:
    "Partner with Bright Code IO for expert web development tailored to companies and agencies. We specialize in seamless integration, custom code development, and CMS optimization to help you exceed your digital goals.",
  openGraph: {
    images: [
      {
        url: "/agency_agency-1.png",
        alt: "Alt text for your image",
      },
    ],
    siteName: "Bright Code",
  },
};

interface OGImage {
  url: string;
  alt: string;
}

interface OpenGraph {
  images: OGImage[];
  siteName: string;
}

interface Metadata {
  title: string;
  description: string;
  openGraph?: OpenGraph;
}

const HeroBanner = dynamic(() => import("../components/Herobanner"));
const ContactFormSecond = dynamic(
  () => import("../components/ContactFormSecond")
);
const FooterMap = dynamic(() => import("../components/FooterMap"));

const Introduction = dynamic(() => import("../components/Introduction"));
const ContentWithImageColTwo = dynamic(
  () => import("../components/ContentWithImageColTwo")
);
const ColFourCards = dynamic(() => import("../components/ColFourCards"));

const Home: React.FC = () => {
  return (
    <>
      <NextSeo
        title={String(metadata.title)}
        description={String(metadata.description)}
        openGraph={
          metadata.openGraph
            ? {
                title: String(metadata.title),
                description: metadata.description || "",
                images: metadata.openGraph.images || [],
                siteName: metadata.openGraph.siteName || "",
              }
            : undefined
        }
      />
      <HeroBanner data={heroBanner} />

      <Introduction data={intro} />

      <Introduction data={intro2} />

      <ContentWithImageColTwo data={contentWithImage} />

      <ContentWithImageColTwo data={contentWithImage2} />

      <ContentWithImageColTwo data={contentWithImage3} />

      <ContentWithImageColTwo data={contentWithImage4} />

      <div className="section_bgImage bg-darkBlue">
        <Introduction data={intro3} />

        <ColFourCards data={colFourCard} />

        <ContactFormSecond data={contactForm} />

        <FooterMap data={footerMap} />
      </div>
    </>
  );
};

export default Home;
