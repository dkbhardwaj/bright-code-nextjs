import React, { Suspense } from "react";
import { useEffect } from "react";
import { NextSeo } from "next-seo";
// import BannerSecond from "../components/BannerSecond";
// import ContactFormSecond from "../components/ContactFormSecond";
// import FooterMap from "../components/FooterMap";
import dynamic from "next/dynamic";
import { bannersecond, contactForm, footerMap } from "../dataContact/data";

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

const BannerSecond = dynamic(() => import("../components/BannerSecond"));
const ContactFormSecond = dynamic(
  () => import("../components/ContactFormSecond")
);
const FooterMap = dynamic(() => import("../components/FooterMap"));

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

      <BannerSecond data={bannersecond} />

      <div className="section_bgImage bg-darkBlue">
        <Suspense fallback={<div>Loading...</div>}>
          <ContactFormSecond data={contactForm} />

          <FooterMap data={footerMap} />
        </Suspense>
      </div>
    </>
  );
};

export default Contact;
