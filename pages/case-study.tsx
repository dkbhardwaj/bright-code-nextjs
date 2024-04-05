import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
// import type { Metadata } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { TwitterShareButton } from "next-share";
import { LinkedinShareButton } from "next-share";
import { FacebookShareButton } from "next-share";

import ContactForm from "../components/contactForm";
import Banner from "../components/Banner";
import ListWithSocialicon from "../components/ListWithSocialicon";
import ImageWithList from "../components/ImageWithList";
import Overview from "../components/overview";
import ContentWithImageColTwo from "../components/ContentWithImageColTwo";
import IntroWithCards from "../components/IntroWithCards";
import ColThreeCards from "../components/ColThreeCards";
import {
  overview,
  contentWithImage,
  overview2,
  overview3,
  contentWithImage2,
  overview4,
  colThreeCards,
} from "../dataCaseStudy/data";

const CaseStudy: React.FC = () => {
  const router = useRouter();
  const baseUrl = typeof window !== "undefined" ? window.location.href : "";
  console.log(baseUrl);

  const link = encodeURI(`${baseUrl}${router.asPath}`);
  console.log(link);

  const [state, handleSubmit] = useForm("maygryee");
  const [captcha, setcaptcha] = useState<string | null>();
  const [formsuccess, setformsuccess] = useState(false);

  const ClearForm = () => {
    const inputs = document.querySelectorAll(".contactForm form input");
    for (let i = 0; i < inputs.length; i++) {
      const element = inputs[i] as HTMLInputElement;
      element.value = "";
    }
  };

  if (state.succeeded) {
    if (!formsuccess) {
      setformsuccess(true);
      ClearForm();
    }
  }

  const HideThankyouBox = () => {
    setformsuccess(false);
  };
  return (
    <>
      <Banner />

      <ListWithSocialicon />

      <ImageWithList />

      <Overview data={overview} />

      <ContentWithImageColTwo data={contentWithImage} />

      <Overview data={overview2} />

      <IntroWithCards />

      <Overview data={overview3} />

      <ContentWithImageColTwo data={contentWithImage2} />

      <Overview data={overview4} />

      <ColThreeCards data={colThreeCards} />

      <ContactForm />
    </>
  );
};
export default CaseStudy;
