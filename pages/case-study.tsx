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
import {
  overview,
  contentWithImage,
  overview2,
  overview3,
  contentWithImage2,
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

      {/* Intro with Content Start */}
      <section className=" intro relative w-full pt-32 lg:pt-20 md:pt-6 ">
        <div className="container">
          <div className="intro_content">
            <h2 className=" text-[45px]  mb-[50px] lg:mb-[36px] md:!mb-6  desktop:text-[36px] tablet:text-[33px] md:text-[30px] ">
              <span className=" text_gradient2 text-[45px]  desktop:text-[36px] tablet:text-[33px] md:text-[30px] ">
                The Solution -
              </span>{" "}
              Climate Risk Expertise and Flexible Analytics from Moody’s RMS
            </h2>
            <p className=" text-black mb-[45px] lg:mb-[30px] md:!mb-5">
              The insurer was already using Moody’s RMS catastrophe models
              across its business, which were embedded into its underwriting and
              corporate management process. However, “bending its EP curve”
              would not deliver the insights needed to capture future climate
              change risk and drive strategic decision-making. While the insurer
              was an industry leader in understanding and quantifying.
            </p>
            <p className=" text-black mb-[45px] lg:mb-[30px] md:!mb-5">
              The project kicked off looking at North American Hurricane and
              Australian Cyclone, assessing three specific time horizons: 2030,
              2050 and 2100. Moody’s RMS analysts worked with the carrier’s
              internal catastrophe modeling and exposure management team,
              analyzing a Representative Concentration Pathway (RCP) scenario
              for future greenhouse gas concentrations awrad...
            </p>
            <p className=" text-black ">
              The company felt Moody’s RMS was best positioned to interpret
              scientific consensus around climate change and its likely impact
              on physical risk from natural perils. Working with Moody’s RMS
              also offered stakeholders an "external seal of approval," enabling
              the organization to demonstrate that it had worked with
              industry-leading analysts and taken concrete steps to build a
              clear view of how climate change...
            </p>
          </div>
        </div>
      </section>
      {/* Intro with Content End */}

      {/* Three Card Section Start*/}
      <section className="introWithCards relative w-full overflow-hidden py-32 md:pt-20 md:pb-14">
        <div className="container">
          <div className=" featured pt-20 pb-14 lg:pt-16 md:!pt-14 md:pb-12 ">
            <div className="content w-full text-center relative mb-[90px] lg:mb-16 md:!mb-12 ">
              <h2 className="font-medium text-black ">Related Information</h2>
            </div>
            <div className="w-mainRow -ml-2.5 flex flex-wrap sm:w-full sm:ml-0">
              <div
                className={`w-threeCard mx-2.5 mb-5 tablet:w-halfWidth phablet:w-halfWidth sm:w-full sm:mx-0`}
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-duration="400"
              >
                <div className="card h-full ">
                  <div className="relative imageWrap group h-[260px] tablet:h-[220px] phablet:h-[220px] sm:h-[200px] overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]">
                    <Link className="redirect" href={`#`}>
                      .
                    </Link>
                    <Image
                      className="object-cover transition-transform duration-300 group-hover:scale-105  h-full w-full"
                      src="/case-study/card-img-1.png"
                      width={400}
                      height={300}
                      alt="Agency to agency services"
                    />
                  </div>
                  <div className="textWrap py-9 px-5 text-center md:p-5">
                    <h4 className="text-black">Climate Change</h4>
                    <span className="text-gray font-light mt-[30px] line-clamp-4 text-ellipsis text-[15px] leading-[26px] md:text-[14px] md:leading-[22px] md:mt-4 ">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium
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
                <div className="card h-full">
                  <div className="relative imageWrap group h-[260px] tablet:h-[220px] phablet:h-[220px] sm:h-[200px] overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]">
                    <Link className="redirect" href={`#`}>
                      .
                    </Link>
                    <Image
                      className="object-cover transition-transform duration-300 group-hover:scale-105 h-full w-full"
                      src="/case-study/card-img-2.png"
                      width={400}
                      height={300}
                      alt="Client Centric development"
                    />
                  </div>
                  <div className="textWrap py-9 px-5 text-center md:p-5">
                    <h4 className="text-black">Climate Change Models</h4>
                    <span className="text-gray font-light mt-[30px] line-clamp-4 text-ellipsis  text-[15px] leading-[26px] md:text-[14px] md:leading-[22px] md:mt-4 ">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium
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
                <div className="card h-full">
                  <div className="relative imageWrap group h-[260px] tablet:h-[220px] phablet:h-[220px] sm:h-[200px] overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]">
                    <Link className="redirect" href={`#`}>
                      .
                    </Link>
                    <Image
                      className="object-cover transition-transform duration-300 group-hover:scale-105 h-full w-full"
                      src="/case-study/card-img-3.png"
                      width={400}
                      height={300}
                      alt="Empowering designers"
                    />
                  </div>
                  <div className="textWrap py-9 px-5 text-center md:p-5">
                    <h4 className="text-black">Access Risk and Strategy</h4>
                    <span className="text-gray font-light mt-[30px] line-clamp-4 text-ellipsis  text-[15px] leading-[26px] md:text-[14px] md:leading-[22px] md:mt-4 ">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Three Card Section End*/}

      <ContactForm />
    </>
  );
};
export default CaseStudy;
