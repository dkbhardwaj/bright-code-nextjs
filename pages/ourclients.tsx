import React from "react";
import { NextSeo } from "next-seo";
// import ContactForm from "../components/contactForm";
// import BannerSecond from "../components/BannerSecond";
// import Overview from "../components/overview";
// import ContentWithImageColTwo from "../components/ContentWithImageColTwo";
import dynamic from "next/dynamic";
import {
  bannersecond,
  intro,
  contentWithImage,
  overview,
  contentWithImage2,
  contentWithImage3,
  contentWithImage4,
  contactform,
} from "../dataOurclients/data";

export const metadata: Metadata = {
  title: "Collaborative Excellence: Bright Code Agency-to-Agency Approach",
  description:
    "Discover Bright Code's collaborative excellence in agency-to-agency partnerships. As your dedicated development partner, we bridge the realms of design and technical implementation, ensuring seamless execution for remarkable digital solutions. Learn about our client-centric approach, professionalism in partnership, and expertise without compromise. ",
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

const ContactForm = dynamic(() => import("../components/contactForm"));
const BannerSecond = dynamic(() => import("../components/BannerSecond"));
const Introduction = dynamic(() => import("../components/Introduction"));
const Overview = dynamic(() => import("../components/overview"));
const ContentWithImageColTwo = dynamic(
  () => import("../components/ContentWithImageColTwo")
);

const Ourclient: React.FC = () => {
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

      <Introduction data={intro} />

      <ContentWithImageColTwo data={contentWithImage} />

      <Overview data={overview} />

      <ContentWithImageColTwo data={contentWithImage2} />

      <ContentWithImageColTwo data={contentWithImage3} />

      <ContentWithImageColTwo data={contentWithImage4} />

      <ContactForm data={contactform} />
    </>
  );
};

export default Ourclient;
