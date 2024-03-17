"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, ValidationError } from "@formspree/react";
import Sticky from "../components/stickyNav";
import ContactForm from "../components/contactForm";
import { useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
// import type { Metadata } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { NextSeo } from "next-seo";

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

const WhiteLabelDevelopment: React.FC = () => {
  const [clickedId, setClickedId] = useState<string | null>(null);
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
      {/* Banner Start */}
      <section
        className={`banner banner-second banner_DarkOverlay banner_bg_img bg-darkBlue level-two text-white `}
        data-aos="fade-in"
        data-aos-delay="500"
        data-aos-duration="1000"
      >
        <div className="container">
          <div className="w-full text-center relative z-10">
            <h1>Agency to Agency</h1>
          </div>
        </div>
      </section>
      {/* Banner End */}
      {/* <Sticky ribbonVisible={true} data={stickyData} /> */}
      <Sticky
        ribbonVisible={true}
        data={stickyData}
        clickedId={clickedId}
        setClickedId={setClickedId}
      />

      {/* White Label Development Intro Start */}
      <section
        className={`intro py-20 md:py-14 overflow-x-hidden `}
        id="white-label-development"
        data-aos="fade-up"
        data-aos-delay="700"
        data-aos-duration="1000"
      >
        <div className="container">
          <div className="w-full z-1 relative">
            <div
              className="content w-full text-center relative"
              data-aos="fade-right"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="title text-[#8000FF] uppercase font-normal mb-3 md:mb-1">
                Unlocking Excellence.
              </h6>
              <h2 className="font-medium text-black mb-[38px] md:mb-[20px] ">
                Agency to Agency Development.
              </h2>
            </div>
            <div
              className="content w-full text-center relative"
              data-aos="fade-left"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h5 className="text-black font-light  w-full max-w-[960px] mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut ante dolor. Nunc lobortis nunc sem, tincidunt condimentum odio fermentum mollis. In gravida augue vitae mauris semper, at condimentum lacus ullamcorper. Nullam sodales quam ut blandit accumsan.
              </h5>
            </div>
          </div>
        </div>
      </section>
      {/* White Label Development Intro End */}

      {/* Riverflow 1 Start */}
      <section className="contentWithImage overflow-hidden">
        <div className="container">
          <div className="w-mainRow -ml-2.5 py-16 flex items-center z-1 relative md:flex-wrap md:w-full md:ml-0 featured md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pr-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-right"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">
               Eyebrow goes here
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
              White Label Development
              </h2>
              <p className="mt-5 text-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut ante dolor. Nunc lobortis nunc sem, tincidunt condimentum odio fermentum mollis. In gravida augue vitae mauris semper, at condimentum lacus ullamcorper. Nullam sodales quam ut blandit accumsan.
              </p>
              <p className="mt-5 text-black">
              Suspendisse fermentum nunc vitae suscipit vehicula. Nunc lacus mi, tempus eget nisi in, imperdiet iaculis tellus. 
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-left"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image
                  src="/what-we-do/col-two-img1.png"
                  alt="girl"
                  width={600}
                  height={500}
                  className=" w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Riverflow 1 End */}

      {/* Riverflow 2 Start */}
      <section className="contentWithImage overflow-hidden">
        <div className="container">
          <div className="w-mainRow -ml-2.5 py-16 flex flex-row-reverse items-center z-1 relative md:flex-wrap md:w-full md:ml-0 md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pl-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-left"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">
              Eyebrow goes here
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                Dedicated Development Team
              </h2>
              <p className="mt-5 text-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut ante dolor. Nunc lobortis nunc sem, tincidunt condimentum odio fermentum mollis. In gravida augue vitae mauris semper, at condimentum lacus ullamcorper. Nullam sodales quam ut blandit accumsan.
              </p>
              <p className="mt-5 text-black">
              Suspendisse fermentum nunc vitae suscipit vehicula. Nunc lacus mi, tempus eget nisi in, imperdiet iaculis tellus. 
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-right"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image
                  src="/what-we-do/col-two-img2.png"
                  alt="girl"
                  width={600}
                  height={500}
                  className=" w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Riverflow 2 End */}

      {/* Riverflow 3 Start */}
      <section className="contentWithImage overflow-hidden">
        <div className="container">
          <div className="w-mainRow -ml-2.5 py-16 flex items-center z-1 relative md:flex-wrap md:w-full md:ml-0 featured md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pr-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-right"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">
              Eyebrow goes here
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                CMS Implementation
              </h2>
              <p className="mt-5 text-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut ante dolor. Nunc lobortis nunc sem, tincidunt condimentum odio fermentum mollis. In gravida augue vitae mauris semper, at condimentum lacus ullamcorper. Nullam sodales quam ut blandit accumsan.
              </p>
              <p className="mt-5 text-black">
              Suspendisse fermentum nunc vitae suscipit vehicula. Nunc lacus mi, tempus eget nisi in, imperdiet iaculis tellus. 
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-left"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image
                  src="/what-we-do/col-two-img3.png"
                  alt="girl"
                  width={600}
                  height={500}
                  className=" w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Riverflow 3 End */}

      {/* Riverflow 4 Start */}
      <section className="contentWithImage overflow-hidden pb-16 md:pb-8">
        <div className="container">
          <div className="w-mainRow -ml-2.5 py-16 flex flex-row-reverse items-center z-1 relative md:flex-wrap md:w-full md:ml-0 md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pl-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-left"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">
                Eyebrow goes here
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
              CMS Maintenance
              </h2>
              <p className="mt-5 text-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut ante dolor. Nunc lobortis nunc sem, tincidunt condimentum odio fermentum mollis. In gravida augue vitae mauris semper, at condimentum lacus ullamcorper. Nullam sodales quam ut blandit accumsan.
              </p>
              <p className="mt-5 text-black">
              Suspendisse fermentum nunc vitae suscipit vehicula. Nunc lacus mi, tempus eget nisi in, imperdiet iaculis tellus. 
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-right"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image
                  src="/what-we-do/col-two-img4.png"
                  alt="girl"
                  width={600}
                  height={500}
                  className=" w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Riverflow 4 End */}
     
        <ContactForm/>
    </>
  );
};

export default WhiteLabelDevelopment;
