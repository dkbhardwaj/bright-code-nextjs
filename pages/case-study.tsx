import React from 'react';
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
import { TwitterShareButton } from 'next-share';
import { LinkedinShareButton } from 'next-share';
import { FacebookShareButton } from 'next-share';


const CaseStudy: React.FC = () => {
  const router = useRouter();
  const baseUrl =  typeof window !== 'undefined' ? window.location.href : '';
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
    {/* Banner Start */}
    <section
        className={`banner banner_third relative overflow-x-hidden bg-darkBlue level-two flex items-center text-white pt-28 pb-10 min-h-[752px] bg-[url('/case-study/banner-bg-img.png')] bg-center bg-cover bg-no-repeat desktop:min-h-[630px]  tablet:min-h-[560px] tablet:pt-24 md:min-h-[552px]  md:pt-24  md:items-center `}
      >
        <div className="container">
          <div className="w-full max-w-[490px] relative z-[5] text-left" 
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="400">
            <h6 className=' text-white mb-2 '>CASE STUDY</h6>
            <h1
              className="header-h1 lg-up:text-[45px] lg-up:leading-[60px] text-white mb-[30px]  lg:mb-5 "
            >
              Taking the Lead on Climate Change Risk
            </h1>
            <p className=' lg-up:text-[18px] font-medium text-[#ababab] lg-up:leading-[30px] '>How a major global insurance company used innovative climate change solutions from Moody’s RMS to measure the impact of physical climate risk on its book of business and get ahead of the curve on climate disclosure reporting.</p>
          </div>
        </div>
      </section>
      {/* Banner End */}

      {/* List With Social Icon Start */}
      <section className=' list-with-social-icon relative w-full py-[106px] lg:py-20 md:!py-12 '>
        <div className="container">
          <div className="list-with-icon-content relative w-full flex flex-wrap md:block ">
            <div className="list-content w-[calc(100%-265px)] md:w-full md:mb-5 ">
              <ul className=' relative w-full flex pr-5 xl:block md:pr-0 '>
                <li className=' relative w-full max-w-[262px] text-[20px] leading-[28px] font-medium text-black pl-[46px] before:content-[""] before:absolute before:top-0 before:left-0 before:w-[30px] before:h-[30px] before:rounded-[50%] before:bg-[url("/case-study/check-icon-2.svg")] before:bg-no-repeat before:bg-cover xl:max-w-full xl:mb-4 lg:text-[18px] lg:before:w-[25px] lg:before:h-[25px] sm:!text-[16px] sm:!before:w-[20px] sm:!before:h-[20px] sm:pl-[34px] sm:before:top-[2px] '>Better Climate Governance</li>
                <li className=' relative w-full max-w-[262px] text-[20px] leading-[28px] font-medium text-black pl-[46px] before:content-[""] before:absolute before:top-0 before:left-0 before:w-[30px] before:h-[30px] before:rounded-[50%] before:bg-[url("/case-study/check-icon-2.svg")] before:bg-no-repeat before:bg-cover xl:max-w-full xl:mb-4 lg:text-[18px] lg:before:w-[25px] lg:before:h-[25px] sm:!text-[16px] sm:!before:w-[20px] sm:!before:h-[20px] sm:pl-[34px] sm:before:top-[2px] '>Satisfied Investor And Stakeholder Concerns</li>
                <li className=' relative w-full max-w-[262px] text-[20px] leading-[28px] font-medium text-black pl-[46px] before:content-[""] before:absolute before:top-0 before:left-0 before:w-[30px] before:h-[30px] before:rounded-[50%] before:bg-[url("/case-study/check-icon-2.svg")] before:bg-no-repeat before:bg-cover xl:max-w-full lg:text-[18px] lg:before:w-[25px] lg:before:h-[25px] sm:!text-[16px] sm:!before:w-[20px] sm:!before:h-[20px] sm:pl-[34px] sm:before:top-[2px] '>Equipped to Meet Climate-Related Disclosure Requirements</li>
              </ul>
            </div>
            <div className="social-icon-content relative w-full max-w-[265px] h-fit rounded-[20px] bg-[#f6eeff] py-[28px] px-[36px] flex items-center justify-between md:py-[22px] md:px-[30px] ">
              <span className=' text-[15px] font-normal leading-[21px] text-black '>Share To:</span>
              <div className="social-icon flex flex-wrap ml-2 ">
                <div className="icon relative max-w-[26px] h-[26px] ml-[8px] ">
                  <TwitterShareButton
                    url={link}
                  >
                    <Image src="/case-study/twitter-black-icon.svg" width={50} height={50} className=' w-full h-full object-contain ' alt="icon" />
                  </TwitterShareButton>
                </div>
                <div className="icon relative max-w-[26px] h-[26px] ml-[8px] ">
                  <LinkedinShareButton url={link}>
                    <Image src="/case-study/linkedin-black-icon.svg"width={50} height={50} className=' w-full h-full object-contain '  alt="icon" />
                  </LinkedinShareButton>
                </div>
                <div className="icon relative max-w-[26px] h-[26px] ml-[8px] ">
                  <FacebookShareButton
                    url={link}
                  >
                    <Image src="/case-study/facebook-black-icon.svg"width={50} height={50} className=' w-full h-full object-contain '  alt="icon" />
                  </FacebookShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
       {/* List With Social Icon End */}

      {/* Image With List Start */}
      <section className=' image-with-list relative w-full overflow-hidden '>
        <div className="container">
          <div className="image-with-list-content flex justify-end pt-[74px] pb-[100px] md:featured md:justify-start lg:pt-14 lg:pb-20 md:!py-12 ">
            <div className="list-content relative w-full max-w-[526px] z-[5] md:max-w-[100%] ">
              <h2 className=' lg-up:text-[45px] mb-[42px] lg:mb-[36px] md:!mb-6 '>Key Takeaways</h2>
              <ul className=' list-none relative w-full block pl-[25px] '>
                <li className=' font-light leading-[28px] '>Better climate governance</li>
                <li className=' font-light leading-[28px] '>Insurer is well-positioned to meet climate-related disclosure requirements</li>
                <li className=' font-light leading-[28px] '>Insurer demonstrated leadership and satisfied investor and stakeholder concerns</li>
                <li className=' font-light leading-[28px] '>Project expanded to encompass different perils and regions</li>
                <li className=' font-light leading-[28px] '>Factors unrelated to climate changes, for example increases in exposure, are likely to be a more meaningful driver of near-term risk</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Image With List End */}


      {/*  Intro Start */}
      <section
        className={`intro relative w-full pt-32 pb-8 xl:pt-24 xl:pb-6 md:!pt-14 lg:!pb-0 overflow-hidden `}
        id="white-label-development"
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-duration="800"
      >
        <div className="container">
          <div className="w-full z-1 relative">
            <div
              className="content w-full text-center relative"
            >
              <h6 className="title text-[#8000FF] uppercase font-normal mb-3 md:mb-1">
                The Challenge
              </h6>
              <h2 className="font-medium text-black ">
                Climate Change Disclosure and Governance
              </h2>
            </div>
          </div>
        </div>
      </section>
      {/*  Intro End */}

      {/* Riverflow 1 Start */}
      <section className="contentWithImage overflow-hidden">
        <div className="container">
          <div className="w-mainRow -ml-2.5 py-16 flex items-center z-1 relative md:flex-wrap md:w-full md:ml-0  md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pr-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-right"
              data-aos-delay="300"
              data-aos-duration="500"
            >
              <p className=" text-black">
                A major global insurer was under growing pressure from shareholders to understand how climate change was impacting its underwriting portfolios, both now and into the future under multiple climate change scenarios up to the end of the century. The aim was to use the information for longer-term business planning to prepare and adjust its property catastrophe underwriting.
              </p>
              <p className="mt-5  text-black">
                The insurer was also aware of growing regulatory pressure, including disclosure frameworks such as TCFD (Task Force on Climate-Related Financial Disclosure), which are currently voluntary but are already influencing climate change regulatory disclosures. The company wanted to provide metrics around its physical climate risk exposure as part of a wider push to take the lead on responsibilities around ESG, sustainability risk, and climate transition.
              </p>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full  h-[458px] tablet:h-[280px] sm:h-[260px]  relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos="fade-left"
                data-aos-delay="300"
                data-aos-duration="500"
              >
                <Image
                  src="/home/col-two-img1.png"
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

      {/*  Intro Start */}
      <section
        className={`intro relative w-full pt-20 pb-16 lg:pt-14 md:!pt-9 md:pb-8 overflow-hidden `}
        id="white-label-development"
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-duration="800"
      >
        <div className="container">
          <div className="w-full z-1 relative">
            <div
              className="content w-full text-center relative"
            >
              <h6 className="title text-[#8000FF] uppercase font-normal mb-3 md:mb-1">
                The Solution 
              </h6>
              <h2 className="font-medium text-black ">
                Climate Risk Expertise and Flexible Analytics from Moody’s RMS
              </h2>
            </div>
          </div>
        </div>
      </section>
      {/*  Intro End */}

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
                    src="/what-we-do/col-two2-img1.png"
                    width={400}
                    height={300}
                    alt="Agency to agency services"
                  />
                </div>
                <div className="textWrap py-9 px-5 md:py-5 sm:px-0 ">
                  <p className=' text-black line-clamp-[10] overflow-hidden text-overflow-ellipsis '>The insurer was already using Moody’s RMS catastrophe models across its business, which were embedded into its underwriting and corporate management process. However, “bending its EP curve” would not deliver the insights needed to capture future climate change risk and drive strategic decision-making. While the insurer was an industry leader in understanding and quantifying.</p>
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
                    src="/what-we-do/col-two2-img3.png"
                    width={400}
                    height={300}
                    alt="Client Centric development"
                  />
                </div>
                <div className="textWrap py-9 px-5 md:py-5 sm:px-0 ">
                  <p className=' text-black line-clamp-[10] overflow-hidden text-overflow-ellipsis '>The project kicked off looking at North American Hurricane and Australian Cyclone, assessing three specific time horizons: 2030, 2050 and 2100. Moody’s RMS analysts worked with the carrier’s internal catastrophe modeling and exposure management team, analyzing a Representative Concentration Pathway (RCP) scenario for future greenhouse gas concentrations awrad...</p>
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
                    src="/why-choose-us/col-two-img2.png"
                    width={400}
                    height={300}
                    alt="Empowering designers"
                  />
                </div>
                <div className="textWrap py-9 px-5 md:py-5 sm:px-0 ">
                  <p className=' text-black line-clamp-[10] overflow-hidden text-overflow-ellipsis '>The company felt Moody’s RMS was best positioned to interpret scientific consensus around climate change and its likely impact on physical risk from natural perils. Working with Moody’s RMS also offered stakeholders an "external seal of approval," enabling the organization to demonstrate that it had worked with industry-leading analysts and taken concrete steps to build a clear view of how climate change...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Three Card Section End*/}

      {/*  Intro Start */}
      <section
        className={`intro relative w-full pb-4 md:pb-0 overflow-hidden `}
        id="white-label-development"
        data-aos="fade-up"
        data-aos-delay="700"
        data-aos-duration="1000"
      >
        <div className="container">
          <div className="w-full z-1 relative">
            <div
              className="content w-full text-center relative"
            >
              <h6 className="title text-[#8000FF] uppercase font-normal mb-3 md:mb-1">
              The Outcome
              </h6>
              <h2 className="font-medium text-black ">Clarity Around Climate Change and its Impact on the Portfolio
              </h2>
            </div>
          </div>
        </div>
      </section>
      {/*  Intro End */}

      {/* Riverflow 2 Start */}
      <section className="contentWithImage overflow-hidden">
        <div className="container">
          <div className="w-mainRow -ml-2.5 py-16 flex items-center z-1 relative md:flex-wrap md:w-full md:ml-0  md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pr-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-right"
              data-aos-delay="400"
              data-aos-duration="500"
            >
              <p className=" text-black">
              The new insights were critical to increasing confidence with shareholders and supporting business planning. The ability to effectively communicate climate change risk using traditional industry loss metrics, such as average annual loss, helped the insurer’s senior leadership team gain instant credibility with shareholders. Furthermore, with both a near- and long-term view of climate risk, they were able to plan more effectively for the uncertainty that climate change brings to their book of business.
              </p>
              <p className="mt-5  text-black">
              Equipped with insights based on multiple climate change scenarios, the insurer is building new capabilities to operationalize climate change science to meet the new and emerging business and regulatory challenges. Next steps include licensing the new Moody’s RMS climate change models for European Windstorm, North Atlantic Hurricane, and European Flood risk. With these new models that embed into their view of risk, the company can now easily incorporate climate change insights across different time horizons into their existing workflows.
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

      {/* Intro with Content Start */}
      <section className=' intro relative w-full pt-32 lg:pt-20 md:pt-6 '>
        <div className="container">
          <div className="intro_content">
            <h2 className=' text-[45px]  mb-[50px] lg:mb-[36px] md:!mb-6  desktop:text-[36px] tablet:text-[33px] md:text-[30px] '><span className=' text_gradient2 text-[45px]  desktop:text-[36px] tablet:text-[33px] md:text-[30px] '>The Solution -</span> Climate Risk Expertise and Flexible Analytics from Moody’s RMS</h2>
            <p className=' text-black mb-[45px] lg:mb-[30px] md:!mb-5'>The insurer was already using Moody’s RMS catastrophe models across its business, which were embedded into its underwriting and corporate management process. However, “bending its EP curve” would not deliver the insights needed to capture future climate change risk and drive strategic decision-making. While the insurer was an industry leader in understanding and quantifying.</p>
            <p className=' text-black mb-[45px] lg:mb-[30px] md:!mb-5'>The project kicked off looking at North American Hurricane and Australian Cyclone, assessing three specific time horizons: 2030, 2050 and 2100. Moody’s RMS analysts worked with the carrier’s internal catastrophe modeling and exposure management team, analyzing a Representative Concentration Pathway (RCP) scenario for future greenhouse gas concentrations awrad...</p>
            <p className=' text-black '>The company felt Moody’s RMS was best positioned to interpret scientific consensus around climate change and its likely impact on physical risk from natural perils. Working with Moody’s RMS also offered stakeholders an "external seal of approval," enabling the organization to demonstrate that it had worked with industry-leading analysts and taken concrete steps to build a clear view of how climate change...</p>
          </div>
        </div>
      </section>
      {/* Intro with Content End */}

     
      {/* Three Card Section Start*/}
      <section className="introWithCards relative w-full overflow-hidden py-32 md:pt-20 md:pb-14">
        <div className="container">
          <div className=" featured pt-20 pb-14 lg:pt-16 md:!pt-14 md:pb-12 "> 
            <div
            className="content w-full text-center relative mb-[90px] lg:mb-16 md:!mb-12 "
          >
            <h2 className="font-medium text-black ">Related Information
            </h2>
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
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
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
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
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
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                  </span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>
      {/* Three Card Section End*/}
     
    
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
                  <li className=" relative w-fit flex items-center px-5 py-2 border-[1px] border-solid border-white rounded-[9px]  mb-5 sm:mb-3 md:mx-auto ">
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
                  <li className=" relative w-fit flex items-center  px-5 py-2 border-[1px] border-solid border-white rounded-[9px] ml-4  mb-5 sm:mb-3 md:mx-auto ">
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
                      href={"https://twitter.com/brightcodeio"}
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
                        "https://www.linkedin.com/company/bright-codeio/"
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
  )
};
export default CaseStudy;
