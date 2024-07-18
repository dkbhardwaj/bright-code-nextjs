import React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import {
  bannercontent,
  listWithSocialIcon,
  imagewithlist,
  overview,
  contentWithImage,
  overview2,
  introwithcards,
  overview3,
  contentWithImage2,
  contentWithImage3,
  overview4,
  colThreeCards,
  contactform,
} from "../../dataAlgoliaImplementation/data";

const ContactForm = dynamic(() => import("../../components/contactForm"));
const Banner = dynamic(() => import("../../components/Banner"));
const ListWithSocialicon = dynamic(
  () => import("../../components/ListWithSocialicon")
);
const ImageWithList = dynamic(() => import("../../components/ImageWithList"));
const Overview = dynamic(() => import("../../components/overview"));
const ContentWithImageColTwo = dynamic(
  () => import("../../components/ContentWithImageColTwo")
);
const IntroWithCards = dynamic(() => import("../../components/IntroWithCards"));
const ColThreeCards = dynamic(() => import("../../components/ColThreeCards"));

const AlgoliaImplementation: React.FC = () => {
  return (
    <>
      <Banner data={bannercontent} />
      <ListWithSocialicon data={listWithSocialIcon} />

      <Overview data={overview} />
      <ImageWithList data={imagewithlist} />
      <Overview data={overview2} />
      <ContentWithImageColTwo data={contentWithImage} />
      <Overview data={overview3} />
      <ContentWithImageColTwo data={contentWithImage2} />
      <ContentWithImageColTwo data={contentWithImage3} />
      <Overview data={overview4} />

      {/* <IntroWithCards data={introwithcards} /> */}

      {/* <ColThreeCards data={colThreeCards} /> */}

      <ContactForm data={contactform} />
    </>
  );
};
export default AlgoliaImplementation;
