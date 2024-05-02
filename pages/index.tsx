"use client";
import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Introduction from "../components/Introduction";
import ColThreeCards from "../components/ColThreeCards";
import ContentWithImageColTwo from "../components/ContentWithImageColTwo";
import ColFourCards from "../components/ColFourCards";
import {
  intro,
  colThreeCards,
  intro2,
  contentWithImage,
  contentWithImage2,
  contentWithImage3,
  contentWithImage4,
  intro3,
  contactForm,
  footerMap,
} from "../data/homepage/data";

function onChange(token: string | null) {
  console.log("Captcha token:", token);
}
export const metadata: Metadata = {
  title: "Agency-to-Agency Drupal Development Partner | Bright Code",
  description:
    "Empower your design agency with our collaborative and client-centric Drupal development services. Bright Code is your dedicated partner, filling the crucial gap in your service offerings. Thrive on the synergy of collaboration, exceed end-users' needs, and unleash the full potential of your designs.",
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
      <HeroBanner />

      <Introduction data={intro} />

      <ColThreeCards data={colThreeCards} />

      <Introduction data={intro2} />

      <ContentWithImageColTwo data={contentWithImage} />

      <ContentWithImageColTwo data={contentWithImage2} />

      <ContentWithImageColTwo data={contentWithImage3} />

      <ContentWithImageColTwo data={contentWithImage4} />

      <div className="section_bgImage bg-darkBlue">
        <Introduction data={intro3} />

        <ColFourCards />

        <ContactFormSecond data={contactForm} />

        <FooterMap data={footerMap} />
      </div>
    </>
  );
};

export default Home;
