import React from "react";
import Head from "next/head";
import { useEffect } from "react";
import { NextSeo } from "next-seo";
import BannerThird from "../components/BannerThird";
import ContactFormSecond from "../components/ContactFormSecond";
import FooterMap from "../components/FooterMap";
import { bannerThird, contactForm } from "../dataContact/data";

export const metadata: Metadata = {
  title:
    "Connect with Bright Code: Your Partner in Exceptional Web Development",
  description:
    "Ready to start a collaborative journey with Bright Code? Contact us to explore our agency-to-agency model, specialized expertise, and commitment to empowering designers and thrilling clients. Reach out today for a strategic alliance that elevates your web development aspirations.",
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

const conversionScript = `<!-- Event snippet for Contact us page conversion page -->
<script>
  gtag('event', 'conversion', {'send_to': 'AW-11070673099/hO0bCPPQhpAZEMuh9J4p'});
</script>`;

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

const Contact: React.FC = () => {
  useEffect(() => {
    let head = document.getElementsByTagName("head")[0];
    head.innerHTML += conversionScript;
  }, []);

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

      <BannerThird data={bannerThird} />

      <div className="section_bgImage bg-darkBlue">
        <ContactFormSecond data={contactForm} />

        <FooterMap />
      </div>
    </>
  );
};

export default Contact;
