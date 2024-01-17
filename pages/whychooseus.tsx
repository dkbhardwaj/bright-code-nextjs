import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";
// import type { Metadata } from "next";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Head from "next/head";
import { useEffect } from "react";
import { NextSeo } from "next-seo";

export const metadata: Metadata = {
  title: "Elevate Your Vision: Bright Code's Unique Agency-to-Agency Model",
  description:
    "Discover why Bright Code is the preferred choice for design agencies. Our agency-to-agency model thrives on collaboration, expertise, and the art of crafting excellence. Explore our specialized expertise, empowering designers, client-centric approach, and our commitment to redefining web development for mutual growth and client satisfaction. ",
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

const WhyChooseUs: React.FC = () => {
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
        className={`banner banner-second banner_DarkOverlay banner_bg_img banner-with-img bg-darkBlue level-two text-white md:items-baseline`}
        data-aos="fade-in"
        data-aos-delay="500"
        data-aos-duration="1000"
      >
        <div className="container">
          <div className="left_img absolute bottom-0 left-[calc(65%-204px)] w-full max-w-[390px] h-[362px] z-[2] md:w-[330px] md:max-w-full md:h-[304px] md:left-[calc(42%-212px)]">
            <Image
              src="/why-choose-us/banner-left-img.png"
              width={400}
              height={400}
              alt="left-img"
              className=" w-full h-full object-cover"
            />
          </div>
          <div className="right_img absolute bottom-0 left-[65.58%] w-full max-w-[350px] h-[350px] z-[1]  md:w-[304px] md:max-w-full md:h-[304px] md:left-[42%] ">
            <Image
              src="/why-choose-us/banner-right-img.png"
              width={400}
              height={400}
              alt="right-img"
              className=" w-full h-full object-cover"
            />
          </div>
          <div className="banner-contenr text-left">
            <h1>Why choose us?</h1>
            <Link
              href="/contact"
              className=" mt-[42px] gradient-btn mx-auto lg:mt-5"
            >
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </section>
      {/* Banner End */}

      {/* Collaboration Riverflow Start */}
      <section className="contentWithImage py-16 md:py-5">
        <div className="container">
          <div className="content-outer w-mainRow -ml-2.5 flex flex-row-reverse items-center z-1 relative md:flex-wrap md:w-full md:ml-0">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack  md:w-full md:mx-0 md:mb-10"
              data-aos="fade-left"
              data-aos-delay="400"
              data-aos-duration="500"
            >
              <h6 className="text-[#8000FF] uppercase font-normal">
                SYNERGY OF COLLABORATION
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black">
                Agency to Agency
              </h2>
              <p className=" text-black">
                Our agency thrives on the synergy of collaboration. We step into
                the role of your dedicated development partner, filling a
                crucial gap in their service offerings.
              </p>
              <p className=" text-black">
                While design agencies excel in crafting visually stunning
                concepts, the seamless execution of these visions requires the
                technical prowess of a dedicated development team.
              </p>
              <p className=" text-black">
                Bright Code becomes the bridge that connects these two realms,
                ensuring that the synergy between creativity and technical
                implementation is not just maintained but elevated.
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
                  src="/why-choose-us/col-two-img1.png"
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
      {/* Collaboration Riverflow End */}

      {/* Collaboration and Expertise Intro Start */}
      <section className="overview pt-16 pb-20 md:pt-8 md:pb-12 bg-extraLightGray overflow-x-hidden ">
        <div className="container">
          <div className="w-full z-1 relative">
            <div
              className="content w-full text-center relative"
              data-aos="fade-right"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="title text-[#8000FF] uppercase font-normal mb-3 md:mb-1">
                Harmony of Minds
              </h6>
              <h2 className="font-medium text-black mb-[38px]  md:mb-4">
                Collaboration and Expertise
              </h2>
            </div>
            <div
              className="content w-full text-center relative"
              data-aos="fade-left"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h5 className="text-black font-light">
                In the fast-paced world of digital solutions, strategic
                collaboration is the cornerstone of lasting success. We act as
                the strategic ally that design agencies can rely on for seamless
                project execution. We understand the nuances of the industry,
                stay ahead of technological trends, and align our services with
                the evolving needs of design agencies. Our agency-to-agency
                model is built on collaboration and expertise. With us by your
                side, you’re not just gaining a development partner; you’re
                forging a strategic alliance geared towards mutual growth and
                client satisfaction.
              </h5>
            </div>
          </div>
        </div>
      </section>
      {/* Collaboration and Expertise Intro End */}

      {/* Riverflow 1 Start */}
      <section className="contentWithImage overflow-hidden">
        <div className="container">
          <div className="w-mainRow -ml-2.5 py-16 flex items-center z-1 relative md:flex-wrap md:w-full md:ml-0 md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pr-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-right"
              data-aos-delay="400"
              data-aos-duration="500"
            >
              <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">
                Crafting Excellence
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                Specialized Expertise
              </h2>
              <p className="mt-5 text-black">
                We bring a wealth of expertise to the table. Our team is
                composed of Engineering Managers, Product Owners and Drupal
                specialists, ensuring that we are not just a development team
                but a high-caliber one with a deep understanding of the
                platform.
              </p>
              <p className="mt-5 text-black">
                Our specialized knowledge allows us to execute intricate designs
                flawlessly, creating web solutions that are as beautiful as they
                are functional.
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full  h-[458px] tablet:h-[280px] sm:h-[260px]  relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-left"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image
                  src="/why-choose-us/col-two-img2.png"
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
          <div className="w-mainRow -ml-2.5 py-16 flex flex-row-reverse items-center z-1 relative md:flex-wrap md:w-full md:ml-0 featured md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pl-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-left"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">
                UNLEASHING DESIGN POTENTIAL
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                Empowering Designers
              </h2>
              <p className="mt-5 text-black">
                Our mission is to empower designers, allowing them to focus on
                their creativity without the weight of development concerns. We
                understand that a design&#39;s potential can only be fully
                realized when paired with a capable development team.
              </p>
              <p className="mt-5 text-black">
                We give designers the freedom to dream big and create
                exceptional designs, confident that you&#39;re there to bring
                those visions to life.
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full  h-[458px] tablet:h-[280px] sm:h-[260px]  relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-right"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image
                  src="/why-choose-us/col-two-img3.png"
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
          <div className="w-mainRow -ml-2.5 py-16 flex items-center z-1 relative md:flex-wrap md:w-full md:ml-0 md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack  md:pr-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-right"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">
                CUSTOMER-FOCUSED PHILOSOPHY
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                Client-Centric Approach
              </h2>
              <p className="mt-5 text-black">
                In everything you do, the final client is your ultimate
                consideration. Our commitment to exceeding the expectations is
                unwavering. We ensure that the websites we develop not only meet
                but exceed the end-users needs.
              </p>
              <p className="mt-5 text-black">
                Our client-centric approach guarantees that the final clients
                are not just satisfied; they are thrilled with the end results.
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full  h-[458px] tablet:h-[280px] sm:h-[260px]  relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-left"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image
                  src="/why-choose-us/col-two-img4.png"
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
      <section className="contentWithImage overflow-hidden pb-32 md:pb-16 ">
        <div className="container">
          <div className="w-mainRow -ml-2.5 py-16 flex flex-row-reverse items-center z-1 relative md:flex-wrap md:w-full md:ml-0 featured md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pl-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-left"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">
                ELEVATING THE PARADIGM OF WEB DEVELOPMENT
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                Redefining Web Development
              </h2>
              <p className="mt-5 text-black">
                Our agency&#39;s agency-to-agency model redefines web
                development. We go beyond the role of a service provider; We are
                your partner in realizing your creative aspirations.
              </p>
              <p className="mt-5 text-black">
                Our mission is clear: to empower designers and thrill clients.
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full  h-[458px] tablet:h-[280px] sm:h-[260px]  relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-right"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image
                  src="/why-choose-us/col-two-img5.png"
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
                Fill in the form and our experts will reach out to you.
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
                      className="g-recaptcha my-4 mx-[10px]"
                      data-sitekey="6LfR00opAAAAAC9ut3OSMHiIQ6gJZoBiT9VPRFlE"
                    ></div>
                    <input
                      type="hidden"
                      id="g-recaptcha-response"
                      name="g-recaptcha-response"
                    ></input>

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

        <section className=" relative w-full pt-28 md:pt-14 ">
          <div className="container px-5 mx-auto">
            <div className="intro_with_image relative flex flex-wrap items-center md:block ">
              <div className="content relative w-[calc(100%-200px)] pr-28 md:pr-0 md:text-center md:w-full md:mb-5 ">
                <h2 className="font-medium xl-up:text-[45px] text-white mb-6">
                  How Can We Help With Your Next Project?
                </h2>
                <p className=" text-white ">
                  Get in touch with Shiv for a free consultation. He is based in Los Angeles CA.
                </p>
              </div>
              <div className="image_wrap relative w-full max-w-[200px] h-[200px] rounded-[50%] overflow-hidden border-[1px] border-white border-solid md:mx-auto ">
                <Image src="/why-choose-us/shiv-headshot.jpg" width={220} height={220} alt="img" className=" w-full h-full object-cover " />
              </div>
            </div>
          </div>
        </section>

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
                    <span className="font-semibold">+ ‪805-215-0549</span>
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

export default WhyChooseUs;
