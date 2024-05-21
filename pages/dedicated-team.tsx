"use client";
import React from "react";
import Sticky from "../components/stickyNav";
// import ContactForm from "../components/contactForm";
import { useState } from "react";
import { useEffect } from "react";
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
} from "../dataDedicatedTeam/data";

export const metadata: Metadata = {
  title: "Empower Your Projects with Dedicated Development Teams | Bright Code",
  description:
    "Bright Code offers Dedicated Development Teams, ensuring your projects receive specialized expertise and a committed partnership. Discover the advantages of having a dedicated team of Drupal specialists to elevate the success of your web initiatives.",
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

interface StickyItem {
  id: string;
  title: string;
  url: string;
}

const ContactForm = dynamic(() => import("../components/contactForm"));
const Overview = dynamic(() => import("../components/overview"));
const BannerSecond = dynamic(() => import("../components/BannerSecond"));
const ContentWithImageColTwo = dynamic(
  () => import("../components/ContentWithImageColTwo")
);

const DedicatedTeam: React.FC = () => {
  const [clickedId, setClickedId] = useState<string | null>(null);

  const [winWidth, setWinWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setWinWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const desktopStickyData: StickyItem[] = [
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

  const mobileStickyData: StickyItem[] = [
    {
      id: "1",
      title: "Dedicated Development Team",
      url: "dedicated-team",
    },
    {
      id: "2",
      title: "White Label Development",
      url: "white-label-development",
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

  const stickyData = winWidth > 991 ? desktopStickyData : mobileStickyData;

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

      <Overview data={overview} />

      <ContentWithImageColTwo data={contentWithImage} />

      <ContentWithImageColTwo data={contentWithImage2} />

      <ContentWithImageColTwo data={contentWithImage3} />

      <ContentWithImageColTwo data={contentWithImage4} />

      <ContactForm data={contactform} />
    </>
  );
};

export default DedicatedTeam;
