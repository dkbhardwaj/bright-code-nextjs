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
  title:
    "Proactive Drupal Maintenance for Optimal Website Performance | Bright Code",
  description:
    "Discover Bright Code's proactive Drupal Maintenance services, ensuring optimal website performance. Our expert team provides comprehensive maintenance, including core updates, module management, and security scans to safeguard your Drupal-based platform. ",
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

const CmsSupport: React.FC = () => {
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [state, handleSubmit] = useForm("maygryee");
  const [captcha, setcaptcha] = useState<string | null>();
  const [formsuccess, setformsuccess] = useState(false);

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
      title: "CMS Maintenance",
      url: "cms-support",
    },
    {
      id: "2",
      title: "White Label Development",
      url: "white-label-development",
    },
    {
      id: "3",
      title: "Dedicated Development Team",
      url: "dedicated-team",
    },
    {
      id: "4",
      title: "CMS Implementation",
      url: "cms-implementation",
    },
  ];

  const stickyData = winWidth > 991 ? desktopStickyData : mobileStickyData;

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href="https://www.bright-code.io/cms-support"
          key="canonical"
        />
      </Head>
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
        className={`banner banner-second banner_DarkOverlay banner_bg_img bg-darkBlue level-two text-white`}
        data-aos="fade-in"
        data-aos-delay="500"
        data-aos-duration="1000"
      >
        <div className="container">
          <div className="w-full text-center relative z-10">
            <h1>What we do?</h1>
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

      {/* CMS Implementation Intro Start */}
      <section
        className={`intro py-20 md:py-14 overflow-x-hidden`}
        id="white-label-development"
        data-aos="fade-up"
        data-aos-delay="700"
        data-aos-duration="1000"
      >
        <div className="container">
          <div className="w-full z-1 relative text-center">
            <h6 className="text-[#8000FF] uppercase font-normal mb-3 md:mb-1">
              Empowering Your Content
            </h6>
            <h2 className="font-medium text-black mb-[38px] md:mb-[20px] ">
              Drupal Maintenance
            </h2>
            <h5 className="text-black font-light w-full max-w-[960px] mx-auto">
              Through our comprehensive Drupal Maintenance service, we provide
              you with the assurance that your Drupal Content Management System
              (CMS) is not only kept current and secure but also finely tuned
              for optimal performance and a seamless user experience. Our
              proactive approach is designed to identify and address potential
              issues before they become problems, safeguarding the ongoing
              success of your digital presence in the long run.
            </h5>
          </div>
        </div>
      </section>
      {/*  CMS Implementation Intro End */}

      {/* Riverflow 1 Start */}
      <section className="contentWithImage overflow-hidden">
        <div className="container">
          <div className="w-mainRow -ml-2.5  py-16 flex items-center z-1 relative md:flex-wrap md:w-full md:ml-0  featured md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pr-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-right"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">
                The Importance of CMS Maintenance
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                What is Drupal Maintenance?
              </h2>
              <p className="mt-5 text-black">
                Drupal Maintenance refers to the ongoing process of managing and
                optimizing the Content Management System (CMS) to ensure its
                smooth operation, security, and performance. Drupal Maintenance
                is crucial for the sustained health and effectiveness of a
                website. It helps prevent security vulnerabilities, ensures
                optimal performance, and contributes to a positive user
                experience, ultimately supporting the long-term success of a
                digital presence.
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-left"
                data-aos-delay="500"
                data-aos-duration="1000"
              >
                <Image
                  src="/what-we-do/col-two4-img1.png"
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
                Core Drupal Maintenance
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                Security and Stability
              </h2>
              <p className="mt-5 text-black">
                Core Drupal Maintenance involves the essential upkeep of the
                Drupal Content Management System (CMS). This includes regularly
                updating the Drupal core to leverage the latest features,
                enhancements, and crucial security patches. Additionally, our
                team manages and updates Drupal modules, ensuring that the
                website's functionalities remain robust and any potential
                security vulnerabilities are promptly addressed.
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-right"
                data-aos-delay="500"
                data-aos-duration="1000"
              >
                <Image
                  src="/what-we-do/col-two4-img2.png"
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
          <div className="w-mainRow -ml-2.5 py-16 flex items-center z-1 relative md:flex-wrap md:w-full md:ml-0  featured md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pr-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-right"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">
                Security and Performance Optimization
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                CMS Maintenance Expertise
              </h2>
              <p className="mt-5 text-black">
                Security and Performance Optimization for Drupal is about
                safeguarding the integrity and efficiency of the digital
                platform. We conduct regular security scans and audits tailored
                specifically to Drupal, identifying and mitigating potential
                risks to fortify the system. Simultaneously, our team focuses on
                optimizing Drupal's performance through strategies such as
                database optimization, efficient caching mechanisms, and
                thorough code reviews.
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-left"
                data-aos-delay="500"
                data-aos-duration="1000"
              >
                <Image
                  src="/what-we-do/col-two4-img3.png"
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
                User and Access Management
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                Access Control and User Governance
              </h2>
              <p className="mt-5 text-black">
                User and Access Management in Drupal involves a meticulous
                review of user access within the CMS. We ensure precise
                permissions aligned with roles, promptly revoking access for
                inactive users to enhance security. Our team also provides
                Drupal-specific security training, empowering your team for
                secure CMS navigation. This approach ensures a robust and secure
                Drupal-based digital platform.
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-right"
                data-aos-delay="500"
                data-aos-duration="1000"
              >
                <Image
                  src="/what-we-do/col-two4-img4.png"
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

      {/* Riverflow 5 Start */}
      <section className="contentWithImage overflow-hidden pb-16 md:pb-8">
        <div className="container">
          <div className="w-mainRow -ml-2.5 py-16 flex items-center z-1 relative md:flex-wrap md:w-full md:ml-0  featured md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pr-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-right"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">
                Emergency Support and Content Management
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                Support and Content
              </h2>
              <p className="mt-5 text-black">
                Support and Content Management in Drupal encompass a proactive
                approach to address critical issues promptly and ensure
                effective content oversight. Our team provides emergency support
                tailored to Drupal-related challenges, minimizing downtime and
                potential damage. Simultaneously, we handle Drupal content with
                regular reviews and updates, aligning it with business goals and
                user expectations.
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-left"
                data-aos-delay="500"
                data-aos-duration="1000"
              >
                <Image
                  src="/what-we-do/col-two4-img3.png"
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
      {/* Riverflow 5 End */}

      <ContactForm/>
    </>
  );
};

export default CmsSupport;
