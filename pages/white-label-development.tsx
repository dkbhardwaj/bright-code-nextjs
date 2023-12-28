'use client';
import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import { useForm, ValidationError } from "@formspree/react";
import type { Metadata } from 'next';
import Head from 'next/head';
import Sticky from '../components/stickyNav';
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

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
        className={`banner banner-second banner_DarkOverlay banner_bg_img bg-darkBlue level-two text-white `}
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

      {/* White Label Development Intro Start */}
      <section
        className={`intro py-20 md:py-14`}
        id="white-label-development"
        data-aos="fade-up"
        data-aos-delay="700"
        data-aos-duration="1000">
        <div className="container">
          <div className="w-full z-1 relative">
            <div
              className="content w-full text-center relative"
              data-aos="fade-right"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="title text-[#8000FF] uppercase font-normal mb-3 md:mb-1">Unlocking Excellence.</h6>
              <h2  className="font-medium text-black mb-[38px] md:mb-[20px] " >White Label Development.</h2>
            </div>
            <div
              className="content w-full text-center relative"
              data-aos="fade-left"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h5 className="text-black font-light  w-full max-w-[960px] mx-auto">
              In the world of web development, the invisible hand of expertise often guides the most remarkable
              creations. At Bright Code, we take pride in our role as the silent architects of digital success,
              delivering excellence through White Label Development.
              </h5>
              <h5 className="mt-5 text-black  w-full max-w-[960px] mx-auto md:mt-3">
              Here is what White Label Development means, for us.
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
              data-aos-duration="1000">
                <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">Masters of what we do</h6>
              <h2  className="font-medium xl-up:text-[45px] text-black mb-6" >Empowering Your Brand, Your Way</h2>
              <p className="mt-5 text-black">
                Our White Label Development services are designed to empower your brand. We act as your dedicated
                development team, working hand-in-hand to meticulously craft web solutions that align perfectly with
                your design vision.
              </p>
              <p className="mt-5 text-black">The end result is a website that exemplifies your commitment to excellence.</p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-left"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image src="/what-we-do/col-two-img1.png" alt="girl" width={600} height={500} className=" w-full h-full object-cover" />
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
                <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">Surpassing Milestones</h6>
              <h2  className="font-medium xl-up:text-[45px] text-black mb-6" >Exceeding Expectations, Every Time</h2>
              <p className="mt-5 text-black">
                We go beyond the typical development approach. At Bright Code, we&#39;re committed to elevating your
                reputation and ensuring exceptional client satisfaction. By partnering with us, you guarantee that your
                clients receive not just good websites, but exceptional ones.
              </p>
              <p className="mt-5 text-black">
                Our expertise in web development, combined with your creative design prowess, creates a synergy that
                consistently surpasses expectations.
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-right"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image src="/what-we-do/col-two-img2.png" alt="girl" width={600} height={500} className=" w-full h-full object-cover" />
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
              data-aos-duration="1000">
                <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">Harmonizing Success</h6>
              <h2  className="font-medium xl-up:text-[45px] text-black mb-6" >The Power of Collaboration</h2>
              <p className="mt-5 text-black">
                Collaboration is at the core of what we do. By choosing us for your web development needs, you open
                doors to a world of possibilities.
              </p>
              <p className="mt-5 text-black">
                Our collaborative culture and commitment to professionalism ensure that your clients receive the best of
                both worlds: your design excellence and our technical expertise.
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-left"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image src="/what-we-do/col-two-img3.png" alt="girl" width={600} height={500} className=" w-full h-full object-cover" />
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
              <h2  className="font-medium xl-up:text-[45px] text-black mb-6" >Your Success, Our Priority</h2>
              <p className="mt-5 text-black">
                At Bright Code, we are more than just a development agency; we are your trusted partner for success.
                White Label Development is a canvas where your brand shines. Delight your clients, exceed their
                expectations, and elevate your agency&#39;s reputation with Bright Code as your collaborative partner in
                digital excellence.
              </p>
              <p className="mt-5 text-black">
                Experience the power of White Label Development with Bright Code. Your success is our success, and
                together, we&#39;ll excel in the world of web solutions.
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-right"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image src="/what-we-do/col-two-img4.png" alt="girl" width={600} height={500} className=" w-full h-full object-cover" />
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