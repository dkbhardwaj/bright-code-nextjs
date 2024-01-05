"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, ValidationError } from "@formspree/react";
import ReCAPTCHA from "react-google-recaptcha";
import Sticky from "../components/stickyNav";
import { useState } from "react";
// import type { Metadata } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { NextSeo } from "next-seo";

export const metadata: Metadata = {
  title: "Empower Your Projects with Dedicated Development Teams | Bright Code",
  description:
    "Bright Code offers Dedicated Development Teams, ensuring your projects receive specialized expertise and a committed partnership. Discover the advantages of having a dedicated team of Drupal specialists to elevate the success of your web initiatives.",
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
    title: "Dedicated Development Team",
    url: "dedicated-team",
  },
  {
    id: "2",
    title: "White Label Development",
    url: "white-label-development",
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

const DedicatedTeam: React.FC = () => {
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
        className={`banner banner-second banner_DarkOverlay banner_bg_img bg-darkBlue level-two text-white`}
        data-aos="fade-in"
        data-aos-delay="500"
        data-aos-duration="1000"
      >
        <div className="container">
          <div className="w-full text-center relative z-10">
            <h1>What we do?</h1>
            <h2 className={`text-mediumGray`}>(and do well)</h2>
          </div>
        </div>
      </section>
      {/* Banner End */}
      <Sticky ribbonVisible={true} data={stickyData} />

      {/* Dedicated Development Team Intro Start */}
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
              Elevate Your Digital Vision.
            </h6>
            <h2 className="font-medium text-black mb-[38px] md:mb-[20px] ">
              Dedicated Dev Team
            </h2>
            <h5 className="text-black font-light w-full max-w-[960px] mx-auto">
              In the dynamic landscape of web development, the true mark of
              excellence is achieved through collaboration and a dedicated focus
              on your unique goals. At Bright Code, we're proud to be your
              partners in this journey, offering Dedicated Development Teams
              that bring your digital dreams to life.
            </h5>
          </div>
        </div>
      </section>
      {/* Dedicated Development Team Intro End */}

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
                TAILORED EXCELLENCE: DEDICATED DEV TEAMS
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                What are Dedicated Development Teams?
              </h2>
              <p className="mt-5 text-black">
                Our Dedicated Development Teams are the embodiment of unwavering
                commitment and expertise. We tailor our teams to match your
                specific needs, seamlessly integrating with your agency to
                become your in-house development arm. This collaborative
                approach ensures a harmonious blend of our technical proficiency
                and your creative vision.
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
                  src="/what-we-do/col-two2-img1.png"
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
                ELEVATING YOUR DIGITAL VISION
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                Empowering Your Vision, Your Way
              </h2>
              <p className="mt-5 text-black">
                Our Dedicated Development Teams are designed to empower your
                digital vision without compromise. We operate as an extension of
                your in-house team, diligently working together to transform
                your concepts into polished, high-performing web solutions. The
                result is a digital masterpiece that reflects your brand's
                unique identity and your dedication to excellence.
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
                  src="/what-we-do/col-two2-img2.png"
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
                UNLEASHING POTENTIAL
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                Exceeding Expectations, Every Time
              </h2>
              <p className="mt-5 text-black">
                We don't simply deliver development solutions; we consistently
                surpass expectations. Our expertise, combined with your
                creativity, fosters a synergy that elevates the quality of your
                projects. With Bright Code's Dedicated Development Teams, you
                can be confident that your clients will receive exceptional
                results.
              </p>
              <p className="mt-5 text-black">
                Our collaborative culture and commitment to professionalism
                ensure that your clients receive the best of both worlds: your
                design excellence and our technical expertise.
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
                  src="/what-we-do/col-two2-img3.png"
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
                EMPOWERING SUCCESS THROUGH PARTNERSHIP
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                The Power of Collaboration
              </h2>
              <p className="mt-5 text-black">
                Collaboration is the foundation of our approach. By partnering
                with Bright Code, you gain access to a pool of experts who are
                fully aligned with your objectives. Our collaborative culture
                and commitment to professionalism ensure that your projects are
                executed with precision and excellence.
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
                  src="/what-we-do/col-two2-img4.png"
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
      <div className="section_bgImage bg-darkBlue smallBgImage">
        {/* Contact Form Start */}
        <section
          className="contactForm text-gray-600 body-font relative pt-24 md:pt-16"
          id="get-in-touch"
        >
          <div className="container px-5 mx-auto">
            <div
              className={`relative w-full py-16  bgPurpleGradient  md:py-12`}
            >
              <div className=" relative w-full max-w-[960px] mx-auto mb-16 text-center">
                <h6 className="text-white title mb-[38px] md:mb-[18px] ">
                  GET IN TOUCH
                </h6>
                <h2 className="text-white mb-[38px] md:mb-[18px] ">
                  Let&#39;s talk about your project
                </h2>
                <h4 className="text-white text-[23px] md:text-[20px] leading-[35px] ">
                  You are welcome to fill in the form, and our web experts will
                  reach out to you during business hours to discuss your
                  project.
                </h4>
              </div>
              <div className="relative w-full">
                <div
                  className="relative z-10"
                  data-aos="fade-in"
                  data-aos-delay="400"
                  data-aos-duration="400"
                >
                  <form
                    onSubmit={handleSubmit}
                    className=" relative w-mainRow ml-[-10px] flex flex-wrap md:w-full md:ml-0"
                  >
                    <div className="relative mb-[22px] w-threeCard mx-[10px] md:w-full md:mx-0">
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
                        className={`w-full relative mt-2 py-[14px] px-3 bg-white rounded-[9px] border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out`}
                      />
                    </div>
                    <div className="relative mb-[22px] w-threeCard mx-[10px] md:w-full md:mx-0">
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
                        className="w-full relative mt-2 py-[14px] bg-white rounded-[9px] border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                    <div className="relative mb-[22px] w-threeCard mx-[10px] md:w-full md:mx-0">
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
                        className="w-full relative mt-2 py-[14px] bg-white rounded-[9px] border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                    />
                    <div className="relative mb-[22px] w-full mx-[10px] md:mx-0">
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
                        className="w-full relative mt-2 py-[14px] bg-white rounded-[9px] border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-[106px] text-base outline-none text-gray-700 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                      ></textarea>
                    </div>
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                    />

                    {/* <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                  onChange={setcaptcha}
                  className="mb-5 mx-[10px]  md:mx-0"
                /> */}
                    <button
                      type="submit"
                      className="gradient-btn max-w-full  mx-[10px] mb-[22px] md:mx-0"
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

        {/* Footer Start */}
        <footer className="footer py-[90px] md:py-16 ">
          <div className="container">
            <div className="w-full text-white flex justify-between md:flex-col md:items-center">
              <div className="w-54">
                <div className={`logo relative max-w-[207px] h-[57px]`}>
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
              </div>
              <div className="textWrap relative md:mt-8">
                <ul className=" relative flex flex-wrap sm:block">
                  <li className=" relative flex items-center px-5 py-2 border-[1px] border-solid border-white rounded-[9px] ml-4 sm:ml-0 sm:mb-3">
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
                  <li className=" relative flex items-center  px-5 py-2 border-[1px] border-solid border-white rounded-[9px] ml-4  sm:ml-0">
                    <div className="icon-img max-w-[21px] h-[21px] mr-5">
                      <Image
                        src="/phone-icon-white.svg"
                        width={25}
                        height={25}
                        alt="img"
                        className=" w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-semibold">+ ‪(805) 215-0549‬</span>
                  </li>
                </ul>
              </div>
              <div className="hidden socialWrap mt-8 md:flex md:justify-center">
                <div className="icon relative max-w-[33px] h-[33px]">
                  <Link
                    href={"https://twitter.com/BrightcodeIO"}
                    className="redirect"
                    target="_blank"
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
                    href={"https://www.linkedin.com/company/bright-codeio/"}
                    className="redirect"
                    target="_blank"
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
            <div className=" relative w-full flex flex-wrap justify-between mt-14 md:mt-10">
              <div className="copyright w-fit mr-5 md:text-center md:w-full ">
                <p className="text-white">© 2024 Bright Code Solution</p>
              </div>
              <div className="socialWrap flex md:justify-center md:hidden">
                <div className="icon relative max-w-[33px] h-[33px] ">
                  <Link
                    href={"https://twitter.com/BrightcodeIO"}
                    className="redirect"
                    target="_blank"
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
                    href={"https://www.linkedin.com/company/bright-codeio/"}
                    className="redirect"
                    target="_blank"
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

export default DedicatedTeam;
