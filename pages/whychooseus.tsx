import React from "react";
import { NextSeo } from "next-seo";
// import BannerSecond from "../components/BannerSecond";
// import ContentWithImageColTwo from "../components/ContentWithImageColTwo";
// import Overview from "../components/overview";
// import ContactForm from "../components/contactForm";
import dynamic from "next/dynamic";
import {
  bannersecond,
  contentWithImage,
  overview,
  contentWithImage2,
  contentWithImage3,
  contentWithImage4,
  contentWithImage5,
  contactform,
} from "../dataWhychooseus/data";

export const metadata: Metadata = {
  title: " Why Choose Bright Code IO for Your Drupal Development Needs",
  description:
    "Discover why agencies and marketing directors trust Bright Code IO for top-tier Drupal development. Our commitment to excellence, collaboration, and client-centric approach sets us apart.",
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

const BannerSecond = dynamic(() => import("../components/BannerSecond"));
const ContentWithImageColTwo = dynamic(
  () => import("../components/ContentWithImageColTwo")
);
const Overview = dynamic(() => import("../components/overview"));
const ContactForm = dynamic(() => import("../components/contactForm"));

const WhyChooseUs: React.FC = () => {
  return (
    <>
      <NextSeo
        title={String(metadata.title)}
        description={String(metadata.description)}
        openGraph={
          metadata.openGraph
            ? {
                title: String(metadata.title),
                description: metadata.description || "", // Make sure it's not undefined
                images: metadata.openGraph.images || [], // Make sure it's not undefined
                siteName: metadata.openGraph.siteName || "", // Make sure it's not undefined
              }
            : undefined
        }
      />

      <BannerSecond data={bannersecond} />

      <ContentWithImageColTwo data={contentWithImage} />

      <Overview data={overview} />

      <ContentWithImageColTwo data={contentWithImage2} />

      <ContentWithImageColTwo data={contentWithImage3} />

      <ContentWithImageColTwo data={contentWithImage4} />

      <ContentWithImageColTwo data={contentWithImage5} />

      <div className="section_bgImage bg-darkBlue smallBgImage">
        <ContactForm data={contactform} />
      </div>
    </>
  );
};

export default WhyChooseUs;
