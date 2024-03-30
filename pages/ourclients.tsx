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
import ContactForm from "../components/contactForm";

export const metadata: Metadata = {
  title: "Collaborative Excellence: Bright Code Agency-to-Agency Approach",
  description:
    "Discover Bright Code's collaborative excellence in agency-to-agency partnerships. As your dedicated development partner, we bridge the realms of design and technical implementation, ensuring seamless execution for remarkable digital solutions. Learn about our client-centric approach, professionalism in partnership, and expertise without compromise. ",
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

const Ourclient: React.FC = () => {
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
      <Head>
        <link
          rel="canonical"
          href="https://www.bright-code.io/ourclients"
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
        className={`banner banner-second banner-with-img banner_DarkOverlay banner_bg_img banner-with-img bg-darkBlue level-two text-white  md:items-baseline`}
        data-aos="fade-in"
        data-aos-delay="500"
        data-aos-duration="1000"
      >
        <div className="container">
          <div className="right_img absolute bottom-0 left-[45%] w-full max-w-[655px] h-[413px] z-[1] xl:w-[490px] xl:max-w-full xl:h-[310px] md:left-[14%] xs:left-0 ">
            <Image
              src="/our-clients/banner-img.png"
              width={700}
              height={500}
              alt="right-img"
              className=" w-full h-full object-cover"
            />
          </div>
          <div className="banner-contenr text-left">
            <h1>Our clients</h1>
            <Link
              href="/contact"
              className=" mt-[42px] gradient-btn mx-auto  lg:mt-5"
            >
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Banner End */}
      {/* Collaboration Riverflow Start */}
      <section className="contentWithImage relative py-16 overflow-hidden md:py-8">
        <div className="container">
          <div className="w-mainRow -ml-2.5 py-16 flex flex-row-reverse items-center z-1 relative md:flex-wrap md:w-full md:ml-0 md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pl-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-left"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">
                Collaboration
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                Agency to Agency
              </h2>
              <p className="mt-5 text-black">
                Our agency thrives on the synergy of collaboration. We step into
                the role of your dedicated development partner, filling a
                crucial gap in their service offerings.
              </p>
              <p className="mt-5 text-black">
                While design agencies excel in crafting visually stunning
                concepts, the seamless execution of these visions requires the
                technical prowess of a dedicated development team.
              </p>
              <p className="mt-5 text-black">
                Bright Code becomes the bridge that connects these two realms,
                ensuring that the synergy between creativity and technical
                implementation is not just maintained but elevated.
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
                  src="/our-clients/col-two-img1.png"
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
      {/* Collaboration Riverflow End */}

      {/* Collaboration and Expertise Intro Start */}
      <section className="overview py-24  bg-extraLightGray md:py-16  overflow-x-hidden">
        <div className="container">
          <div className="w-full z-1 relative">
            <div
              className="content w-full text-center relative"
              data-aos="fade-right"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="title text-[#8000FF] uppercase font-normal mb-3 md:mb-1">
                Our Commitment to Trust and Confidentiality
              </h6>
              <h2 className="font-medium text-black mb-[38px]  md:mb-4">
                How we work
              </h2>
            </div>
            <div
              className="content w-full text-center relative"
              data-aos="fade-left"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h5 className="text-black font-light">
                At Bright Code, our fundamental mission is to empower our
                clients to deliver remarkable digital solutions and exceed the
                expectations of their end clients. We believe in the power of
                collaboration, and our role as a trusted partner reflects our
                commitment to our clients and their needs.
              </h5>
              <h5 className="mt-5 text-black font-light  md:mt-3">
                You may have noticed that we do not showcase our clients or
                their projects on our website. This choice is intentional and
                reflects our unwavering dedication to two key principles: trust
                and confidentiality.
              </h5>
            </div>
          </div>
        </div>
      </section>
      {/* Collaboration and Expertise Intro End */}
      {/* Riverflow 1 Start */}
      <section className="contentWithImage overflow-hidden">
        <div className="container">
          <div className="w-mainRow -ml-2.5  py-16 flex items-center z-1 relative md:flex-wrap md:w-full md:ml-0 md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pr-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-right"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">
                ETHICAL EXCELLENCE IN AGENCY COLLABORATION
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                Professionalism in Partnership
              </h2>
              <p className="mt-5 text-black">
                We understand that our clients, often marketing, design and
                development agencies themselves, rely on us to act
                professionally and discreetly as we join forces to bring their
                projects to life.
              </p>
              <p className="mt-5 text-black">
                Maintaining the highest ethical standards is of utmost
                importance to us.
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
                  src="/our-clients/col-two-img2.png"
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
          <div className="w-mainRow -ml-2.5 py-16 flex flex-row-reverse items-center z-1 relative md:flex-wrap md:w-full md:ml-0  featured md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pl-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-left"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">
                About Us
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                Client-Centric Approach
              </h2>
              <p className="mt-5 text-black">
                Our client-centric approach means that our focus is, and always
                will be, on making our clients happy. We respect their need to
                safeguard their client relationships and branding
                confidentiality.
              </p>
              <p className="mt-5 text-black">
                By not advertising their projects on our website, we honor their
                trust and uphold our end of the partnership.
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
                  src="/our-clients/col-two-img3.png"
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
      <section className="contentWithImage pb-16 overflow-hidden md:pb-8">
        <div className="container">
          <div className="w-mainRow -ml-2.5  py-16 flex items-center z-1 relative md:flex-wrap md:w-full md:ml-0 md:py-12">
            <div
              className="content w-halfWidth mx-2.5 text-spaceBlack md:pr-0 md:w-full md:mx-0 md:mb-10"
              data-aos="fade-right"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="text-[#8000FF] uppercase font-normal mb-4 md:mb-1">
                About Us
              </h6>
              <h2 className="font-medium xl-up:text-[45px] text-black mb-6">
                Highlighting Expertise Without Compromise
              </h2>
              <p className="mt-5 text-black">
                Although we do not showcase specific client names or project
                details, we remain committed to highlighting our expertise and
                the value we bring to the table. While client names and project
                specifics remain confidential, we embrace the opportunity for
                one-on-one discussions—online or in person.
              </p>
              <p className="mt-5 text-black">
                In these discussions, we unfold the layers of our expertise,
                showcasing the intricacies of our problem-solving approach and
                the value we bring to each partnership.
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
                  src="/our-clients/col-two-img4.png"
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
      
      <ContactForm/>
    </>
  );
};

export default Ourclient;
