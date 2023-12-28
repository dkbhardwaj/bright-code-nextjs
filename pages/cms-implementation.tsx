'use client';
import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import { useForm, ValidationError } from "@formspree/react";
import ReCAPTCHA from "react-google-recaptcha";
import type { Metadata } from 'next';
import Head from 'next/head';
import Sticky from '../components/stickyNav';
import { useState } from 'react';

export const metadata: Metadata = {
  title: 'Homepage',
};

const Whatwedo: React.FC = () => {
  const [state, handleSubmit] = useForm("maygryee");
  const [captcha, setcaptcha] = useState<string | null>();
  if (state.succeeded) {
    return (
      <div className="thankYouBox flex items-center justify-center py-20">
        <div>
          <div className="flex flex-col items-center space-y-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-green-600 w-28 h-28"
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
            <h1 className="text-4xl font-bold">Thank You !</h1>
            <p>Thank you for your interest!</p>
            <div className="btnWrap">
              <Link href="/" className="pink-btn">
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{String(metadata.title)}</title>
      </Head>
      {/* Banner Start */}
      <section
        className={`banner banner-second banner_DarkOverlay banner_bg_img bg-darkBlue level-two text-white`}
        data-aos="fade-in"
        data-aos-delay="500"
        data-aos-duration="1000">
        <div className="container">
          <div className="w-full text-center relative z-10">
            <h1>What we do?</h1>
            <h2 className={`text-mediumGray`}>(and do well)</h2>
          </div>
        </div>
      </section>
      {/* Banner End */}
      <Sticky ribbonVisible={true} />

      {/* CMS Implementation Intro Start */}
      <section
        className={`intro py-20 md:py-14`}
        id="white-label-development"
        data-aos="fade-up"
        data-aos-delay="700"
        data-aos-duration="1000">
        <div className="container">
          <div className="w-full z-1 relative text-center">
            <h6 className="text-[#8000FF] uppercase font-normal mb-3 md:mb-1">Empowering Your Content</h6>
            <h2 className="font-medium text-black mb-[38px] md:mb-[20px] ">CMS Implementation
              </h2>
            <h5 className="text-black font-light w-full max-w-[960px] mx-auto">
            In the ever-evolving digital landscape, your content is the cornerstone of your online presence. At Bright
              Code, we understand the significance of efficient Content Management System (CMS) Implementation in
              ensuring your brand's message is delivered seamlessly to your audience.
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
              data-aos-duration="1000">
                <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">Masters of what we do</h6>
              <h2  className="font-medium xl-up:text-[45px] text-black mb-6" >What is CMS Implementation?</h2>
              <p className="mt-5 text-black">
              CMS Implementation is the art of transforming your vision into a dynamic, user-friendly digital
                platform. At Bright Code, we specialize in taking your content management needs and translating them
                into a robust, tailor-made solution. We make the process of managing your digital content effortless, so
                you can focus on what truly matters – your message.
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-left"
                data-aos-delay="500"
                data-aos-duration="1000" >
                <Image src="/what-we-do/col-two3-img1.png" alt="girl" width={600} height={500} className=" w-full h-full object-cover" />
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
              data-aos-duration="1000">
                <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">Masters of what we do</h6>
              <h2  className="font-medium xl-up:text-[45px] text-black mb-6" >Empowering Your Brand, Your Way</h2>
              <p className="mt-5 text-black">
              Our CMS Implementation services are designed to empower your brand's digital voice. We don't just offer
                off-the-shelf solutions; we craft customized CMS platforms that perfectly align with your brand's unique
                identity and objectives. Whether you're a design agency or a CEO looking to enhance your online
                presence, we collaborate closely with you to ensure the system we implement is a seamless fit.
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-right"
                data-aos-delay="500"
                data-aos-duration="1000"
              >
                <Image src="/what-we-do/col-two3-img2.png" alt="girl" width={600} height={500} className=" w-full h-full object-cover" />
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
              data-aos-duration="1000">
              <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">Masters of what we do</h6>
              <h2  className="font-medium xl-up:text-[45px] text-black mb-6" >Exceeding Expectations, Every Time</h2>
              <p className="mt-5 text-black">
              We don't stop at just delivering a CMS; we aim to exceed your expectations. With Bright Code, you can
                trust that your CMS will be not only user-friendly but also capable of managing your content
                efficiently. Our technical expertise combines with your content strategies, creating a synergy that
                enables you to achieve unparalleled results.
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-left"
                data-aos-delay="500"
                data-aos-duration="1000">
                <Image src="/what-we-do/col-two3-img3.png" alt="girl" width={600} height={500} className=" w-full h-full object-cover" />
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
              data-aos-duration="1000">
                <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">Masters of what we do</h6>
              <h2  className="font-medium xl-up:text-[45px] text-black mb-6" >The Power of Collaboration</h2>
              <p className="mt-5 text-black">
              Collaboration is at the heart of what we do. By partnering with Bright Code, you gain access to a team
                of experts who are fully aligned with your content management objectives. Our collaborative culture and
                commitment to professionalism ensure that your CMS is implemented seamlessly and efficiently.
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-right"
                data-aos-delay="500"
                data-aos-duration="1000">
                <Image src="/what-we-do/col-two3-img4.png" alt="girl" width={600} height={500} className=" w-full h-full object-cover" />
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
          <div className={`relative w-full py-16  bgPurpleGradient  md:py-12`}>
          <div className=" relative w-full max-w-[960px] mx-auto mb-16 text-center">
            <h6 className="text-white title mb-[38px] md:mb-[18px] ">GET IN TOUCH</h6>
            <h2 className="text-white mb-[38px] md:mb-[18px] ">Let&#39;s talk about your project</h2>
            <h4 className="text-white text-[23px] md:text-[20px] leading-[35px] ">
                You are welcome to fill in the form, and our web experts will
                reach out to you during business hours to discuss your project.
            </h4>
          </div>
          <div className="relative w-full">
          <div
              className="relative z-10"
              data-aos="fade-in"
              data-aos-delay="400"
              data-aos-duration="400"
            >
              <form onSubmit={handleSubmit} className=" relative w-mainRow ml-[-10px] flex flex-wrap md:w-full md:ml-0">
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

                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                  onChange={setcaptcha}
                  className="mb-5 mx-[10px]  md:mx-0"
                />
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
              <Image src="/brightcode_logo.png" width={300} height={100} alt="logo" className=" w-full h-full object-contain" />
            </div>
            
          </div>
          <div className="textWrap relative md:mt-8">
            <ul className=" relative flex flex-wrap sm:block">
              <li className=" relative flex items-center px-5 py-2 border-[1px] border-solid border-white rounded-[9px] ml-4 sm:ml-0 sm:mb-3">
                <Link href="mailto:contact@bright-code.io" className="redirect">.</Link>
                <div className="icon-img max-w-[21px] h-[21px] mr-5">
                  <Image src="/mail-icon-white.svg" width={25} height={25} alt="img"  className=" w-full h-full object-contain"/>
                </div>
                <span className="font-semibold">contact@bright-code.io</span>
              </li>
              <li className=" relative flex items-center  px-5 py-2 border-[1px] border-solid border-white rounded-[9px] ml-4  sm:ml-0">
                <div className="icon-img max-w-[21px] h-[21px] mr-5">
                  <Image src="/phone-icon-white.svg" width={25} height={25} alt="img"  className=" w-full h-full object-contain" />
                </div>
                <span className="font-semibold">+ ‪(925) 315-5061‬</span>
              </li>
            </ul>
          </div>
          <div className="hidden socialWrap mt-8 md:flex md:justify-center">
              <div className="icon relative max-w-[33px] h-[33px]">
                <Link
                  href={"https://www.linkedin.com/in/bright-code-71120724a/"}
                  className="redirect"
                >
                  .
                </Link>
                <Image src="/twitter-white.svg" width={40} height={40} alt="icon" className=" w-full h-full object-contain"/>
              </div>
              <div className="icon relative ml-2  max-w-[33px] h-[33px]">
              <Link
                  href={"https://www.linkedin.com/in/bright-code-71120724a/"}
                  className="redirect"
                >
                  .
                </Link>
                <Image src="/linkedin-white.svg" width={40} height={40} alt="icon" className=" w-full h-full object-contain"/>
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
                  href={"https://www.linkedin.com/company/bright-codeio/"}
                  className="redirect"
                >
                  .
                </Link>
                <Image src="/twitter-white.svg" width={40} height={40} alt="icon" className=" w-full h-full object-contain"/>
              </div>
              <div className="icon relative ml-3  max-w-[33px] h-[33px]">
              <Link
                  href={"https://www.linkedin.com/in/bright-code-71120724a/"}
                  className="redirect"
                >
                  .
                </Link>
                <Image src="/linkedin-white.svg" width={40} height={40} alt="icon" className=" w-full h-full object-contain"/>
              </div>
            </div>
        </div>
      </div>
      </footer>
      {/* Footer End */}

       </div>
    </>
  );
};

export default Whatwedo;
