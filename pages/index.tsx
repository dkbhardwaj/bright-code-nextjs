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
import { log } from "console";
import HeroBanner from "../components/Herobanner";
import Introduction from "../components/Introduction";
import ColThreeCards from "../components/ColThreeCards";
import ContentWithImageColTwo from "../components/ContentWithImageColTwo";
import {
  intro,
  intro2,
  contentWithImage,
  contentWithImage2,
  contentWithImage3,
  contentWithImage4,
  intro3,
} from "../data/homepage/data";

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
  const [cross, setCross] = useState(false);

  // console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

  const handleReload = () => {
    window.location.reload();
  };

  const ClearForm = () => {
    const inputs = document.querySelectorAll(".contactForm form input");
    const textArea = document.querySelector(
      ".contactForm form textarea"
    ) as HTMLInputElement;
    textArea.value = "";
    for (let i = 0; i < inputs.length; i++) {
      const element = inputs[i] as HTMLInputElement;
      element.value = "";
    }
  };

  if (state.succeeded) {
    if (formsuccess === false) {
      setformsuccess(true);
      ClearForm();
    }
  }

  const HideThankyouBox = () => {
    if (formsuccess === true) {
      setCross(true);
    }
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
                description: metadata.description || "",
                images: metadata.openGraph.images || [],
                siteName: metadata.openGraph.siteName || "",
              }
            : undefined
        }
      />
      <HeroBanner />

      <Introduction data={intro} />

      <ColThreeCards />

      <Introduction data={intro2} />

      <ContentWithImageColTwo data={contentWithImage} />

      <ContentWithImageColTwo data={contentWithImage2} />

      <ContentWithImageColTwo data={contentWithImage3} />

      <ContentWithImageColTwo data={contentWithImage4} />

      <div className="section_bgImage bg-darkBlue">
        {/* Our Values Intro Start */}

        <Introduction data={intro3} />

        {/* <section
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
        </section> */}
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
      </div>

      {/* {formsuccess === true ? <h1>form submitted</h1> : ""} */}
      {formsuccess === true && cross == false ? (
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
                <div className="btnWrap" onClick={HideThankyouBox}>
                  <Link href="/" className="gradient-btn">
                    <span>Home</span>
                  </Link>
                </div>
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
