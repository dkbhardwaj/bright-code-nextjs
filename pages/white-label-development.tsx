"use client";
import React, { Suspense } from "react";
import Sticky from "../components/stickyNav";
// import ContactForm from "../components/contactForm";
import { useState } from "react";
import { NextSeo } from "next-seo";
// import Overview from "../components/overview";
// import BannerSecond from "../components/BannerSecond";
// import ContentWithImageColTwo from "../components/ContentWithImageColTwo";
import dynamic from "next/dynamic";
import {
  bannersecond,
  overview,
  contentWithImage,
  contentWithImage2,
  contentWithImage3,
  contentWithImage4,
  contactform,
} from "../dataWhiteLabelDevelopment/data";

export const metadata: Metadata = {
  title: "White Label Drupal Development | Bright Code",
  description:
    " Discover Bright Code's White Label Web Development services, providing seamless solutions for agencies seeking reliable and confidential development support. Elevate your brand with our expert-driven, collaborative approach to web development",
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

const stickyData = [
  {
    id: "1",
    title: "White Label Development",
    url: "white-label-development",
  },
  {
    id: "2",
    title: "Dedicated Development Team",
    url: "dedicated-team",
  },
  {
    id: "3",
    title: "CMS Implementation",
    url: "cms-implementation",
  },
  {
    id: "4",
    title: "CMS Maintenance",
    url: "cms-support",
  },
];

const ContactForm = dynamic(() => import("../components/contactForm"));
const Overview = dynamic(() => import("../components/overview"));
const BannerSecond = dynamic(() => import("../components/BannerSecond"));
const ContentWithImageColTwo = dynamic(
  () => import("../components/ContentWithImageColTwo")
);

const WhiteLabelDevelopment: React.FC = () => {
  const [clickedId, setClickedId] = useState<string | null>(null);

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

      {/* <Sticky ribbonVisible={true} data={stickyData} /> */}
      <Sticky
        ribbonVisible={true}
        data={stickyData}
        clickedId={clickedId}
        setClickedId={setClickedId}
      />

      <Suspense fallback={<div>Loading...</div>}>
        <Overview data={overview} />

        <ContentWithImageColTwo data={contentWithImage} />

        <ContentWithImageColTwo data={contentWithImage2} />

        <ContentWithImageColTwo data={contentWithImage3} />

        <ContentWithImageColTwo data={contentWithImage4} />

        <ContactForm data={contactform} />
      </Suspense>
    </>
  );
};

export default WhiteLabelDevelopment;
