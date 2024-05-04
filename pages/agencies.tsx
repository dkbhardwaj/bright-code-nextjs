import React from 'react';
import { NextSeo } from 'next-seo';
import ContactForm from '../components/contactForm';
import BannerFourth from '../components/BannerFourth';
import Introduction from '../components/Introduction';
import Overview from '../components/overview';
import ContentWithImageColTwo from '../components/ContentWithImageColTwo';
import {
  intro,
  bannerfourth,
  contentWithImage,
  overview,
  contentWithImage2,
  contentWithImage3,
  contentWithImage4,
  contactform,
} from '../data/agencies';

export const metadata: Metadata = {
  title: 'Collaborative Excellence: Bright Code Agency-to-Agency Approach',
  description:
    "Discover Bright Code's collaborative excellence in agency-to-agency partnerships. As your dedicated development partner, we bridge the realms of design and technical implementation, ensuring seamless execution for remarkable digital solutions. Learn about our client-centric approach, professionalism in partnership, and expertise without compromise. ",
  openGraph: {
    images: [
      {
        url: '/agency_agency-1.png',
        alt: 'Alt text for your image',
      },
    ],
    siteName: 'Bright Code',
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
                description: metadata.description || '', // Make sure it's not undefined
                images: metadata.openGraph.images || [], // Make sure it's not undefined
                siteName: metadata.openGraph.siteName || '', // Make sure it's not undefined
              }
            : undefined
        }
      />

      <BannerFourth data={bannerfourth} />

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
