import React from "react";
import { useRouter } from "next/router";

import ContactForm from "../components/contactForm";
import Banner from "../components/Banner";
import ListWithSocialicon from "../components/ListWithSocialicon";
import ImageWithList from "../components/ImageWithList";
import Overview from "../components/overview";
import ContentWithImageColTwo from "../components/ContentWithImageColTwo";
import IntroWithCards from "../components/IntroWithCards";
import ColThreeCards from "../components/ColThreeCards";
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
  overview4,
  colThreeCards,
  contactform,
} from "../dataCaseStudy/data";

const CaseStudy: React.FC = () => {
  const router = useRouter();
  const baseUrl = typeof window !== "undefined" ? window.location.href : "";
  console.log(baseUrl);

  const link = encodeURI(`${baseUrl}${router.asPath}`);
  console.log(link);

  return (
    <>
      <Banner data={bannercontent} />

      <ListWithSocialicon data={listWithSocialIcon} />

      <ImageWithList data={imagewithlist} />

      <Overview data={overview} />

      <ContentWithImageColTwo data={contentWithImage} />

      <Overview data={overview2} />

      <IntroWithCards data={introwithcards} />

      <Overview data={overview3} />

      <ContentWithImageColTwo data={contentWithImage2} />

      <Overview data={overview4} />

      <ColThreeCards data={colThreeCards} />

      <ContactForm data={contactform} />
    </>
  );
};
export default CaseStudy;
