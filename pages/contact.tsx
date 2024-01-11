import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";
import Sticky from "../components/stickyNav";
// import type { Metadata } from "next";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Head from "next/head";
import { useEffect } from "react";
import { NextSeo } from "next-seo";

export const metadata: Metadata = {
  title:
    "Connect with Bright Code: Your Partner in Exceptional Web Development",
  description:
    "Ready to start a collaborative journey with Bright Code? Contact us to explore our agency-to-agency model, specialized expertise, and commitment to empowering designers and thrilling clients. Reach out today for a strategic alliance that elevates your web development aspirations.",
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

const Contact: React.FC = () => {
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
            <h1>Contact Us</h1>
          </div>
        </div>
      </section>
      {/* Banner End */}
      <div className="section_bgImage bg-darkBlue">
        {/* Contact Form Start */}
        <section
          className="contactForm text-gray-600 body-font relative   pt-16 "
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
                    you to get in touch with us directly. We value direct,
                    one-on-one discussions where we can understand your unique
                    needs and explore the potential for collaboration.
                  </h4>
                  <br />
                  <h5 className="text-white font-light">
                    At Bright Code, we stand by our commitment to
                    professionalism, trust, and confidentiality. We believe in
                    the power of collaboration, and by working as a partner, we
                    can empower you to shine in the spotlight.
                  </h5>
                  <br />
                  <h5 className="text-white font-light">
                    Your success is our success, and we look forward to the
                    possibility of working together to delight your clients and
                    achieve remarkable results.
                  </h5>

                  <br />
                  <h4 className="text-white text-[23px] md:text-[20px] xl-up:leading-10">
                    Thank you for considering Bright Code as your trusted
                    partner.
                  </h4>
                </div>
                <div
                  className="w-halfWidth mx-2.5 bg-transparent rounded-lg pl-[52px] lg:pl-4  md:!p-0 relative z-10 md:w-full  md:mx-0 "
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
                  2450 Colorado Ave, Santa Monica, CA 90404, United States
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
              <div className="textWrap relative w-full max-w-[475px] md:mt-8   md:mx-auto">
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
                    <span className="font-semibold">+ ‪(925) 315-5061‬</span>
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

export default Contact;
