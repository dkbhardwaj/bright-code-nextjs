"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";
import Sticky from "../components/stickyNav";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
// import type { Metadata } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { NextSeo } from "next-seo";
function onChange(token: string | null) {
  console.log("Captcha token:", token);
}
export const metadata: Metadata = {
  title: "Agency-to-Agency Drupal Development Partner | Bright Code",
  description:
    "Empower your design agency with our collaborative and client-centric Drupal development services. Bright Code is your dedicated partner, filling the crucial gap in your service offerings. Thrive on the synergy of collaboration, exceed end-users' needs, and unleash the full potential of your designs.",
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

const Home: React.FC = () => {
  const [state, handleSubmit] = useForm("maygryee");
  // const [captcha, setcaptcha] = useState<string | null>();
  const [formsuccess, setformsuccess] = useState(false);
  console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

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
        className={`banner  banner-with-img banner_overlay banner-homepage relative overflow-x-hidden bg-darkBlue level-two flex items-end text-white pt-28 pb-24 min-h-[752px] desktop:min-h-[630px]  tablet:min-h-[560px] tablet:pt-24 tablet:pb-14 md:min-h-[552px]  md:pt-24 md:pb-12 md:items-center `}
      >
        <div className="right_img absolute bottom-0 left-[62%] w-full max-w-[538px] h-[536px] z-[1] desktop:max-w-[450px] desktop:h-[450px]  tablet:max-w-[400px] tablet:h-[400px] xl:left-[65%] md:h-[310px] md:max-w-[325px] md:!left-auto md:right-[calc(35%-200px)] ">
          <Image
            src="/home/banner-right-img.png"
            width={550}
            height={550}
            alt="right-img"
            className=" w-full h-full object-cover"
          />
        </div>
        <div className="left_img absolute bottom-0 right-[61%] w-full max-w-[526px] h-[506px] z-[1] desktop:max-w-[450px] desktop:h-[450px]  tablet:max-w-[400px] tablet:h-[400px] xl:right-[65%] md:h-[310px] md:max-w-[325px] md:!right-[35%] ">
          <Image
            src="/home/banner-left-img.png"
            width={550}
            height={550}
            alt="left-img"
            className=" w-full h-full object-cover"
          />
        </div>
        <div className="container">
          <div className="w-full max-w-[574px] mx-auto relative z-[2] text-center">
            <h1
              className="header-h1"
              data-aos="fade-left"
              data-aos-delay="400"
              data-aos-duration="500"
            >
              Empowering Designers, Thrilling Clients.
            </h1>
            <Link
              href="/whychooseus"
              className=" mt-14 gradient-btn mx-auto md:mt-6"
              data-aos="fade-right"
              data-aos-delay="300"
              data-aos-duration="300"
            >
              <span>Get Started</span>
            </Link>
          </div>
        </div>
      </section>
      {/* Banner End */}

      {/* Why Choose Us Intro Start */}
      <section
        className={`intro pb-24 pt-[132px] text-center tablet:pt-24 md:py-12 overflow-x-hidden`}
        id="why-choose-us"
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="400"
      >
        <div className="container">
          <div className="w-full mx-auto">
            <h6 className="text-[#8000FF] uppercase font-normal mb-3 md:mb-1">
              Why Choose us?
            </h6>
            <h2 className="font-medium text-black mb-[38px] md:mb-[20px] ">
              Our agency-to-agency model is built on <br />
              <span className="text_gradient text-[50px] leading-[65px] desktop:text-[36px] desktop:leading-[60px] tablet:text-[33px] tablet:leading-[55px] md:text-[30px] md:leading-[50px] ">
                collaboration and expertise.
              </span>
            </h2>
            <h5 className="text-black w-full max-w-[960px] mx-auto">
              As a specialized development agency, our core purpose is to
              empower design agencies to deliver exceptional web solutions to
              their clients.
            </h5>
          </div>
        </div>
      </section>
      {/* Why Choose Us Intro End */}

      {/* Three Card Section Start*/}
      <section className="introWithCards pb-20 md:pb-10">
        <div className="container">
          <div className="w-mainRow -ml-2.5 flex flex-wrap sm:w-full sm:ml-0">
            <div
              className={`w-threeCard mx-2.5 mb-5 tablet:w-halfWidth phablet:w-halfWidth sm:w-full sm:mx-0`}
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="400"
            >
              <div className="card bg-white h-full ">
                <div className="relative imageWrap group h-[260px] tablet:h-[220px] phablet:h-[220px] sm:h-[200px] overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]">
                  <Link className="redirect" href={`#`}>
                    .
                  </Link>
                  <Image
                    className="object-cover transition-transform duration-300 group-hover:scale-105  h-full w-full"
                    src="/home/col-three-img1.png"
                    width={400}
                    height={300}
                    alt="Agency to agency services"
                  />
                </div>
                <div className="textWrap py-9 px-5 text-center md:p-5">
                  <h4 className="text-black">Collaborative</h4>
                  <span className="text-gray font-light mt-[30px] line-clamp-4 text-ellipsis text-[15px] leading-[26px] md:text-[14px] md:leading-[22px] md:mt-4 ">
                    Our agency thrives on the synergy of collaboration. We step
                    into the role of your dedicated development partner, filling
                    a crucial gap in your service offerings.
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`w-threeCard mx-2.5 mb-5 tablet:w-halfWidth phablet:w-halfWidth sm:w-full sm:mx-0`}
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-duration="500"
            >
              <div className="card bg-white h-full">
                <div className="relative imageWrap group h-[260px] tablet:h-[220px] phablet:h-[220px] sm:h-[200px] overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]">
                  <Link className="redirect" href={`#`}>
                    .
                  </Link>
                  <Image
                    className="object-cover transition-transform duration-300 group-hover:scale-105 h-full w-full"
                    src="/home/col-three-img2.png"
                    width={400}
                    height={300}
                    alt="Client Centric development"
                  />
                </div>
                <div className="textWrap py-9 px-5 text-center md:p-5">
                  <h4 className="text-black">Client-Centric</h4>
                  <span className="text-gray font-light mt-[30px] line-clamp-4 text-ellipsis  text-[15px] leading-[26px] md:text-[14px] md:leading-[22px] md:mt-4 ">
                    We know that clients are your ultimate consideration. We
                    ensure that the websites we develop not only meet but exceed
                    the end-users needs.
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`w-threeCard mx-2.5 mb-5 tablet:w-halfWidth phablet:w-halfWidth sm:w-full sm:mx-0 sm:mb-0`}
              data-aos="fade-up"
              data-aos-delay="600"
              data-aos-duration="600"
            >
              <div className="card bg-white h-full">
                <div className="relative imageWrap group h-[260px] tablet:h-[220px] phablet:h-[220px] sm:h-[200px] overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]">
                  <Link className="redirect" href={`#`}>
                    .
                  </Link>
                  <Image
                    className="object-cover transition-transform duration-300 group-hover:scale-105 h-full w-full"
                    src="/home/col-three-img3.png"
                    width={400}
                    height={300}
                    alt="Empowering designers"
                  />
                </div>
                <div className="textWrap py-9 px-5 text-center md:p-5">
                  <h4 className="text-black">Empowering</h4>
                  <span className="text-gray font-light mt-[30px] line-clamp-4 text-ellipsis  text-[15px] leading-[26px] md:text-[14px] md:leading-[22px] md:mt-4 ">
                    Our mission is to empower designers. We understand that a
                    design's potential can only be fully realized when paired
                    with a capable development team.
                  </span>
                </div>
              </div>
            </div>

            <Link href="/whychooseus" className=" mt-7 gradient-btn mx-auto">
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </section>
      {/* Three Card Section End*/}

      {/* What we do Intro Start */}
      <section
        className={`intro pt-[86px] pb-[50px] text-center tablet:py-9 md:pt-5 md:pb-0 overflow-x-hidden `}
        id="what-we-do"
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="500"
      >
        <div className="container">
          <div className="w-full max-w-[600px] mx-auto">
            <h2 className="text-black text-[65px] font-semibold desktop:text-[42px] tablet:text-[36px] md:text-[32px]">
              What we do
            </h2>
          </div>
        </div>
      </section>
      {/* What we do Intro End */}

      {/* Riverflow 1 Start */}
      <section className="contentWithImage overflow-hidden">
        <div className="container">
          <div className="w-mainRow -ml-2.5 py-16 flex flex-row-reverse items-center z-1 relative md:flex-wrap md:w-full md:ml-0 md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pl-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-left"
              data-aos-delay="400"
              data-aos-duration="500"
            >
              <h3>
                <span className="text_gradient text-[35px] leading-[46px] tablet:text-[30px] tablet:leading-[42px] md:text-[27px] md:leading-[40px]">
                  White Label Development
                </span>
              </h3>
              <p className="mt-5 text-black">
                In the world of web development, the invisible hand of expertise
                often guides the most remarkable creations. At Bright Code, we
                take pride in our role as the silent architects of digital
                success, delivering excellence through White Label Development.
              </p>
              <p className="mt-5  text-black">
                We offer development services under your brand, acting as your
                dedicated development team while remaining behind the scenes.
              </p>
              {/* <div className="btnWrap mt-5">
                <Link href="/white-label-development" className="black-btn">
                  Learn More
                </Link>
              </div> */}
              <Link
                href="/white-label-development"
                className=" mt-5 bgWhiteBtn gradient-btn mx-auto"
              >
                <span>Learn More</span>
              </Link>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-right"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image
                  src="/home/col-two-img1.png"
                  alt="White Label Developments"
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
          <div className="w-mainRow -ml-2.5 py-16 flex items-center z-1 relative md:flex-wrap md:w-full md:ml-0 featured  md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pr-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-right"
              data-aos-delay="400"
              data-aos-duration="500"
            >
              <h3>
                <span className="text_gradient text-[35px] leading-[46px] tablet:text-[30px] tablet:leading-[42px] md:text-[27px] md:leading-[40px]">
                  Dedicated Development Teams
                </span>
              </h3>
              <p className="mt-5  text-black">
                In the dynamic landscape of web development, the true mark of
                excellence is achieved through collaboration and a dedicated
                focus on your unique goals. At Bright Code, we're proud to be
                your partners in this journey, offering Dedicated Development
                Teams that bring your digital dreams to life.
              </p>
              <p className="mt-5  text-black">
                We provide specialized, dedicated development teams to
                collaborate with your agency, ensuring tailored solutions for
                your unique project requirements.
              </p>
              {/* <div className="btnWrap mt-5">
                <Link href="/dedicated-team" className="black-btn">
                  Learn More
                </Link>
              </div> */}
              <Link
                href="/dedicated-team"
                className=" mt-5 bgWhiteBtn gradient-btn mx-auto"
              >
                <span>Learn More</span>
              </Link>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full  h-[458px] tablet:h-[280px] sm:h-[260px]  relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-left"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image
                  src="/home/col-two-img2.png"
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
          <div className="w-mainRow -ml-2.5 py-16 flex flex-row-reverse items-center z-1 relative md:flex-wrap md:w-full md:ml-0  md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pl-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-left"
              data-aos-delay="400"
              data-aos-duration="500"
            >
              <h3>
                <span className="text_gradient text-[35px] leading-[46px] tablet:text-[30px] tablet:leading-[42px] md:text-[27px] md:leading-[40px]">
                  CMS Implementation
                </span>
              </h3>
              <p className="mt-5  text-black">
                In the ever-evolving digital landscape, your content is the
                cornerstone of your online presence. At Bright Code, we
                understand the significance of efficient Content Management
                System (CMS) Implementation in ensuring your brand's message is
                delivered seamlessly to your audience.
              </p>
              <p className="mt-5 text-black">
                We implement customized CMS solutions to streamline content
                management, enhance user experiences, and align with your
                clients' brand objectives.
              </p>
              {/* <div className="btnWrap mt-5">
                <Link href="/cms-implementation" className="black-btn">
                  Learn More
                </Link>
              </div> */}
              <Link
                href="/cms-implementation"
                className=" mt-5 bgWhiteBtn gradient-btn mx-auto"
              >
                <span>Learn More</span>
              </Link>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full  h-[458px] tablet:h-[280px] sm:h-[260px]  relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-right"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image
                  src="/home/col-two-img3.png"
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
      <section className="contentWithImage pb-[112px]  md:pb-16 overflow-hidden">
        <div className="container">
          <div className="w-mainRow -ml-2.5 py-16 flex items-center z-1 relative md:flex-wrap md:w-full md:ml-0 featured md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pr-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-right"
              data-aos-delay="400"
              data-aos-duration="500"
            >
              <h3>
                <span className="text_gradient text-[35px] leading-[46px] tablet:text-[30px] tablet:leading-[42px] md:text-[27px] md:leading-[40px]">
                  CMS Support & maintenance
                </span>
              </h3>
              <p className="mt-5 text-black">
                Monthly CMS Maintenance is crucial for the sustained health,
                security, and optimal performance of a website. This ensures
                that the website is fortified with the latest security patches,
                protecting it from potential threats and unauthorized access.
                Monthly CMS Maintenance is an investment in the long-term
                sustainability, security, and performance of your website.
              </p>
              <p className="mt-5 text-black">
                It's a proactive strategy that not only prevents potential
                issues but also ensures that the website continues to deliver an
                excellent experience to users while meeting the highest
                standards of security and compliance.
              </p>
              {/* <div className="btnWrap mt-5">
                <Link href="/cms-support" className="black-btn">
                  Learn More
                </Link>
              </div> */}
              <Link
                href="/cms-support"
                className=" mt-5 bgWhiteBtn gradient-btn mx-auto"
              >
                <span>Learn More</span>
              </Link>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-left"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image
                  src="/home/col-two-img4.png"
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
      <div className="section_bgImage bg-darkBlue">
        {/* Our Values Intro Start */}
        <section
          className={`intro pb-[132px] pt-[140px] md:pt-16  md:pb-14 text-center overflow-x-hidden `}
          id="our-values"
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-duration="500"
        >
          <div className="container">
            <div className="w-full max-w-[600px] mx-auto">
              <h2 className="text-white  text-[65px] font-semibold  desktop:text-[42px] tablet:text-[36px] md:text-[32px]">
                Our values
              </h2>
            </div>
          </div>
        </section>
        {/* Our Values Intro End */}

        {/* Column Two Section Start */}
        <section className="colFourCards pb-24 overflow-hidden md:pb-14  ">
          <div className="container">
            <div className="w-mainRow -ml-2.5 flex flex-wrap items-center z-1 relative md:w-full md:ml-0">
              <div
                className="content w-colFour mx-2.5 mb-10 text-spaceBlack xl:w-halfWidth md:!w-full md:mx-0 md:px-0 text-center"
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <div className="icon-wrap mx-auto max-w-[41px] h-[41px] before:content-[''] relative mt-[15px] mb-9 before:absolute before:left-[-15px] before:top-[-15px] before:w-iconBeforeW before:h-iconBeforeH before:bg-[#ffffff2b] before:rounded-[15px] before:transition-colors before:duration-500 hover:before:bg-purplePink">
                  <Image
                    src="/icon-star.svg"
                    alt="icon"
                    width={45}
                    height={45}
                    className="w-full h-full object-contain relative z-10"
                  />
                </div>
                <h5 className="text-white">Expertise</h5>
                <p className="mt-4 text-[15px] text-lightGray leading-[26px] ">
                  Our unwavering commitment to expertise signifies the depth of
                  knowledge and skill we bring to every project.
                </p>
              </div>
              <div
                className="content w-colFour mx-2.5 mb-10 text-spaceBlack xl:w-halfWidth md:!w-full md:mx-0 md:px-0 text-center"
                data-aos="fade-up"
                data-aos-delay="500"
                data-aos-duration="500"
              >
                <div className="icon-wrap mx-auto max-w-[41px] h-[41px] before:content-[''] relative mt-[15px] mb-9 before:absolute before:left-[-15px] before:top-[-15px] before:w-iconBeforeW before:h-iconBeforeH before:bg-[#ffffff2b] before:rounded-[15px] before:transition-colors before:duration-500 hover:before:bg-purplePink">
                  <Image
                    src="/icon-partnership.svg"
                    alt="icon"
                    width={45}
                    height={45}
                    className="w-full h-full object-contain relative z-10"
                  />
                </div>
                <h5 className="text-white">Collaborative approach</h5>
                <p className="mt-4 text-[15px] text-lightGray leading-[26px]">
                  Collaboration is in our DNA. We believe that the best
                  solutions emerge when diverse minds come together.
                </p>
              </div>
              <div
                className="content w-colFour mx-2.5 mb-10 text-spaceBlack xl:w-halfWidth md:!w-full md:mx-0 md:px-0 text-center"
                data-aos="fade-up"
                data-aos-delay="500"
                data-aos-duration="500"
              >
                <div className="icon-wrap mx-auto max-w-[41px] h-[41px] before:content-[''] relative mt-[15px] mb-9 before:absolute before:left-[-15px] before:top-[-15px] before:w-iconBeforeW before:h-iconBeforeH before:bg-[#ffffff2b] before:rounded-[15px] before:transition-colors before:duration-500 hover:before:bg-purplePink">
                  <Image
                    src="/icon-certificate.svg"
                    alt="icon"
                    width={45}
                    height={45}
                    className="w-full h-full object-contain relative z-10"
                  />
                </div>
                <h5 className="text-white">Commitment to excellence</h5>
                <p className="mt-4 text-[15px] text-lightGray leading-[26px]">
                  Excellence is not just a principle; it's the essence of Bright
                  Code. We infuse it into the interactions with our clients.
                </p>
              </div>
              <div
                className="content w-colFour mx-2.5 mb-10  text-spaceBlack xl:w-halfWidth md:!w-full md:mx-0 md:px-0 text-center"
                data-aos="fade-up"
                data-aos-delay="500"
                data-aos-duration="500"
              >
                <div className="icon-wrap mx-auto max-w-[41px] h-[41px] before:content-[''] relative mt-[15px] mb-9 before:absolute before:left-[-15px] before:top-[-15px] before:w-iconBeforeW before:h-iconBeforeH before:bg-[#ffffff2b] before:rounded-[15px] before:transition-colors before:duration-500 hover:before:bg-purplePink">
                  <Image
                    src="/icon-idea.svg"
                    alt="icon"
                    width={45}
                    height={45}
                    className="w-full h-full object-contain relative z-10"
                  />
                </div>
                <h5 className="text-white">Innovation</h5>
                <p className="mt-4 text-[15px] text-lightGray leading-[26px]">
                  We embrace a culture of continuous improvement, staing ahead
                  of technological advancements.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Column Two Section Start */}

        {/* Contact Form Start */}
        <section
          className="contactForm text-gray-600 body-font relative"
          id="get-in-touch"
        >
          <div className="container px-5 mx-auto">
            <div
              className={`relative w-full py-[68px] bgPurpleGradient md:py-12`}
            >
              <div className=" relative w-full mb-16 text-center  md:mb-8">
                <h6 className="text-white title mb-8 md:mb-2">GET IN TOUCH</h6>
                <h2 className="text-white mb-5">Let&#39;s talk!</h2>
              </div>
              <div className="w-mainRow -ml-2.5 flex md:flex-wrap md:w-full md:ml-0">
                <div className="w-halfWidth mx-2.5 md:w-full md:mx-0 md:mb-10">
                  <h4 className="text-white text-[23px] md:text-[20px] xl-up:leading-10 ">
                    If you are interested in learning more about Bright Code and
                    how we can work together to achieve your goals, we encourage
                    you to get in touch with us directly.
                  </h4>
                  <br />
                  <h5 className="text-white font-light">
                    We value direct, one-on-one discussions where we can
                    understand your unique needs and explore the potential for
                    collaboration.
                  </h5>

                  <br />
                  <h4 className="text-white text-[23px] md:text-[20px] xl-up:leading-10">
                    Thank you for considering Bright Code as your trusted
                    partner.
                  </h4>
                </div>
                <div
                  className="w-halfWidth mx-2.5 bg-transparent rounded-lg pl-[52px] lg:pl-4  md:!p-0 relative z-10 md:w-full md:mx-0 "
                  data-aos="fade-left"
                  data-aos-delay="400"
                  data-aos-duration="500"
                >
                  <form onSubmit={handleSubmit}>
                    <div className="relative mb-5">
                      <label
                        htmlFor="fullName"
                        className="leading-6 text-[17px] text-white font-normal"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required={true}
                        className={`w-full relative mt-2 py-[13px] px-3 bg-white rounded-[9px] border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out`}
                      />
                    </div>
                    <div className="relative mb-5">
                      <label
                        htmlFor="email"
                        className="leading-6 text-[17px] text-white font-normal"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required={true}
                        className="w-full relative mt-2 py-[13px] bg-white rounded-[9px] border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                    <div className="relative mb-5">
                      <label
                        htmlFor="subject"
                        className="leading-6 text-[17px] text-white font-normal"
                      >
                        Subject
                      </label>
                      <input
                        type="subject"
                        id="subject"
                        name="subject"
                        // value={values.subject}
                        required={true}
                        className="w-full relative mt-2 py-[13px] bg-white rounded-[9px] border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                    />
                    <div className="relative mb-5">
                      <label
                        htmlFor="message"
                        className="leading-6 text-[17px] text-white font-normal"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        // value={values.message}
                        className="w-full relative mt-2 py-[13px] bg-white rounded-[9px] border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-[106px] text-base outline-none text-gray-700 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                      ></textarea>
                    </div>
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                    />
                    <GoogleReCaptchaProvider
                      reCaptchaKey="6LfR00opAAAAAC9ut3OSMHiIQ6gJZoBiT9VPRFlE"
                      language="english"
                      scriptProps={{
                        async: false,
                        defer: false,
                        appendTo: "head",
                        nonce: undefined,
                      }}
                      container={{
                        element: "g-recaptcha", // replace with your actual ID
                        parameters: {
                          badge: "inline",
                          theme: "dark",
                        },
                      }}
                    >
                      <React.Fragment></React.Fragment>
                    </GoogleReCaptchaProvider>

                    <div
                      id="g-recaptcha"
                      className="g-recaptcha my-4"
                      data-sitekey="6LfR00opAAAAAC9ut3OSMHiIQ6gJZoBiT9VPRFlE"
                    ></div>
                    <input
                      type="hidden"
                      id="g-recaptcha-response"
                      name="g-recaptcha-response"
                    ></input>

                    <button
                      type="submit"
                      className="gradient-btn mx-auto max-w-full"
                      disabled={state.submitting}
                    >
                      <span>Submit</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Contact Form End */}

        {/* Map Start */}
        <section className="relative map  py-20 md:pb-0 md:pt-14">
          <div className="container px-5 mx-auto">
            <div className="map-area w-sectionGradient relative left-[-74px] h-[453px] rounded-[55px] overflow-hidden xl:w-full xl:left-auto xl:rounded-[30px] md:h-[320px] md:!rounded-none md:!w-[calc(100%+40px)] md:!left-[-20px] ">
              <iframe
                src="https://maps.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.5999680504724!2d-118.4755961742846!3d34.028477873166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bbfdc805103f%3A0xe2b048c364c959d1!2sSpaces%20-%20Water%20Garden!5e0!3m2!1sen!2sin!4v1703144756322!5m2!1sen!2sin"
                width="600"
                height="460"
                loading="lazy"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </section>
        {/* Map End */}

        {/* Footer Start */}
        <footer className="footer py-[90px] md:py-16 ">
          <div className="container">
            <div className="w-full text-white flex justify-between md:flex-col md:items-center">
              <div className=" relative w-full max-w-[250px] pr-4 md:max-w-full ">
                <div
                  className={`logo relative max-w-[207px] h-[57px] md:mx-auto `}
                >
                  <Link href="/" className="redirect">
                    .
                  </Link>
                  <Image
                    src="/brightcode_logo.png"
                    width={300}
                    height={100}
                    alt="logo"
                    className=" w-full h-full object-contain"
                  />
                </div>
                <p className=" text-[14px] text-white mt-2 md:text-center">
                2450 Colorado Ave, Suite 100E, Santa Monica, CA 90404, United States
                </p>
              </div>
              <div className="footer-link relative w-full max-w-[190px] pr-4  md:text-center  md:max-w-full md:mt-5 ">
                <h6 className=" font-medium mb-4">About</h6>
                <ul>
                  <li className=" relative mb-2 ">
                    <a
                      href="/whychooseus"
                      className=" text-[14px] text-white hover:text-mediumGray transition-colors duration-300 ease-in-out "
                    >
                      Why Choose us
                    </a>
                  </li>
                  <li className=" relative mb-2 ">
                    <a
                      href="/white-label-development"
                      className=" text-[14px] text-white hover:text-mediumGray transition-colors duration-300 ease-in-out "
                    >
                      What we do
                    </a>
                  </li>
                  <li className=" relative mb-2 ">
                    <a
                      href="/ourclients"
                      className=" text-[14px] text-white hover:text-mediumGray transition-colors duration-300 ease-in-out "
                    >
                      Our clients
                    </a>
                  </li>
                  <li className=" relative mb-2 ">
                    <a
                      href="/cms-support"
                      className=" text-[14px] text-white hover:text-mediumGray transition-colors duration-300 ease-in-out "
                    >
                      CMS Maintenance
                    </a>
                  </li>
                  {/* <li className=" relative mb-2 "><a href="/" className=" text-[14px] text-white hover:text-mediumGray transition-colors duration-300 ease-in-out ">Affiliate program</a></li> */}
                  <li className=" relative mb-2 ">
                    <a
                      href="/contact"
                      className=" text-[14px] text-white hover:text-mediumGray transition-colors duration-300 ease-in-out "
                    >
                      Contact us
                    </a>
                  </li>
                </ul>
              </div>
              <div className="textWrap relative w-full max-w-[400px] md:mt-8   md:mx-auto">
                <ul className=" relative flex flex-wrap justify-end sm:block">
                  <li className=" relative w-fit flex items-center px-5 py-2 border-[1px] border-solid border-white rounded-[9px]  mb-5 sm:mb-3 sm:mx-auto ">
                    <Link
                      href="mailto:contact@bright-code.io"
                      className="redirect"
                    >
                      .
                    </Link>
                    <div className="icon-img max-w-[21px] h-[21px] mr-5">
                      <Image
                        src="/mail-icon-white.svg"
                        width={25}
                        height={25}
                        alt="img"
                        className=" w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-semibold">
                      contact@bright-code.io
                    </span>
                  </li>
                  <li className=" relative w-fit flex items-center  px-5 py-2 border-[1px] border-solid border-white rounded-[9px] ml-4  mb-5 sm:mb-3 sm:mx-auto ">
                    <div className="icon-img max-w-[21px] h-[21px] mr-5">
                      <Image
                        src="/phone-icon-white.svg"
                        width={25}
                        height={25}
                        alt="img"
                        className=" w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-semibold">+ ‪805-215-0549‬</span>
                  </li>
                </ul>
                {/* <form action="/" className=" relative w-full">
                <div className="signUp-wrap relative w-full flex overflow-hidden">
                  <div className="wrap w-[calc(100%-124px)] ">
                    <label
                      htmlFor="email"
                      className="leading-6 text-0 text-white font-normal hidden "
                    >
                      .
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full relative py-[10px] px-3 bg-transparent border-[1px] border-solid border-white border-r-0 rounded-bl-[9px] rounded-tl-[9px] text-[16px] outline-none text-gray-700 leading-6"
                      placeholder="Type your email"
                    />
                  </div>
                  <div className="wrap w-full max-w-[124px] ">
                    <button type="submit" className=" submit-btn w-full ">
                      Subscribe
                    </button>
                  </div>
                </div>
              </form> */}

                <div className="socialWrap relative w-full flex justify-end mt-12 md:justify-center md:hidden">
                  <div className="icon relative max-w-[33px] h-[33px] ">
                    <Link
                      href={"https://www.linkedin.com/company/bright-codeio/"}
                      className="redirect"
                    >
                      .
                    </Link>
                    <Image
                      src="/twitter-white.svg"
                      width={40}
                      height={40}
                      alt="icon"
                      className=" w-full h-full object-contain"
                    />
                  </div>
                  <div className="icon relative ml-3  max-w-[33px] h-[33px]">
                    <Link
                      href={
                        "https://www.linkedin.com/in/bright-code-71120724a/"
                      }
                      className="redirect"
                    >
                      .
                    </Link>
                    <Image
                      src="/linkedin-white.svg"
                      width={40}
                      height={40}
                      alt="icon"
                      className=" w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="hidden socialWrap mt-8 md:flex md:justify-center">
                <div className="icon relative max-w-[33px] h-[33px]">
                  <Link
                    href={"https://www.linkedin.com/in/bright-code-71120724a/"}
                    className="redirect"
                  >
                    .
                  </Link>
                  <Image
                    src="/twitter-white.svg"
                    width={40}
                    height={40}
                    alt="icon"
                    className=" w-full h-full object-contain"
                  />
                </div>
                <div className="icon relative ml-2  max-w-[33px] h-[33px]">
                  <Link
                    href={"https://www.linkedin.com/in/bright-code-71120724a/"}
                    className="redirect"
                  >
                    .
                  </Link>
                  <Image
                    src="/linkedin-white.svg"
                    width={40}
                    height={40}
                    alt="icon"
                    className=" w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
            <div className=" relative w-full mt-16 flex justify-between items-center flex-wrap md:mt-10">
              <div className="copyright w-full text-center ">
                <p className="text-white">© 2024 Bright Code Solution</p>
              </div>
            </div>
          </div>
        </footer>
        {/* Footer End */}
      </div>

      {/* {formsuccess === true ? <h1>form submitted</h1> : ""} */}
      {formsuccess === true ? (
        <section className="thank_you_overlay fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000b5] flex justify-center items-center z-[60] ">
          <div className="container">
            <div className="thankU_overlay relative bg-white rounded-md min-h-[600px] p-10 flex justify-center items-center z-20 ">
              <div
                className="close_icon max-w-[34px] h-[34px] absolute top-5 right-5 cursor-pointer "
                onClick={HideThankyouBox}
              >
                <Image
                  src="/icon-close.svg"
                  width={40}
                  height={40}
                  className=" w-full h-full object-contain "
                  alt="close"
                />
              </div>
              <div className="thankYouBox text-center">
                <div className="thankU_check_icon mx-auto max-w-[112px] h-[112px] mb-4 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-green-700 w-full h-full object-contain "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold mb-4 text-black ">
                  Thank You !
                </h1>
                <p className=" mb-4 text-black ">
                  Thank you for your interest!
                </p>
                <div className="btnWrap">
                  <Link href="/" className="gradient-btn">
                    <span>Home</span>
                  </Link>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
