import React, { Suspense } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// import ContactForm from "../components/contactForm";
// import Banner from "../components/Banner";
// import ListWithSocialicon from "../components/ListWithSocialicon";
// import ImageWithList from "../components/ImageWithList";
// import Overview from "../components/overview";
// import ContentWithImageColTwo from "../components/ContentWithImageColTwo";
// import IntroWithCards from "../components/IntroWithCards";
// import ColThreeCards from "../components/ColThreeCards";
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

const Banner = dynamic(() => import("../components/Banner"));
const ListWithSocialicon = dynamic(
  () => import("../components/ListWithSocialicon"),
  { suspense: true }
);
const ImageWithList = dynamic(() => import("../components/ImageWithList"), {
  suspense: true,
});
const Overview = dynamic(() => import("../components/overview"), {
  suspense: true,
});
const ContentWithImageColTwo = dynamic(
  () => import("../components/ContentWithImageColTwo"),
  { suspense: true }
);
const IntroWithCards = dynamic(() => import("../components/IntroWithCards"), {
  suspense: true,
});
const ColThreeCards = dynamic(() => import("../components/ColThreeCards"), {
  suspense: true,
});
const ContactForm = dynamic(() => import("../components/contactForm"), {
  suspense: true,
});

const CaseStudy: React.FC = () => {
  return (
    <>
      <Banner data={bannercontent} />

      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </>
  );
};
export default CaseStudy;
