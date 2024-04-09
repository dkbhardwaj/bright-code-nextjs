import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";
// import type { Metadata } from "next";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Head from "next/head";
import { useEffect } from "react";
import { NextSeo } from "next-seo";
import BannerSecond from "../components/BannerSecond";
import ContentWithImageColTwo from "../components/ContentWithImageColTwo";
import Overview from "../components/overview";
import ContactForm from "../components/contactForm";
import {
  contentWithImage,
  overview,
  contentWithImage2,
  contentWithImage3,
  contentWithImage4,
  contentWithImage5,
  contactform,
} from "../dataWhychooseus/data";

export const metadata: Metadata = {
  title: "Elevate Your Vision: Bright Code's Unique Agency-to-Agency Model",
  description:
    "Discover why Bright Code is the preferred choice for design agencies. Our agency-to-agency model thrives on collaboration, expertise, and the art of crafting excellence. Explore our specialized expertise, empowering designers, client-centric approach, and our commitment to redefining web development for mutual growth and client satisfaction. ",
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

      <BannerSecond />

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
