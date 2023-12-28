import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, ValidationError } from '@formspree/react';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm('maygryee');
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
              stroke-width="1">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-4xl font-bold">Thank You !</h1>
            <p>Thank you for your interest!</p>
            <div className="btnWrap">
              <Link
                href="/"
                className="pink-btn">
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
      {/* Banner Start */}
      <section
        className={`banner banner-second banner_DarkOverlay banner_bg_img bg-darkBlue level-two text-white`}
        data-aos="fade-in"
        data-aos-delay="500"
        data-aos-duration="1000">
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
          <div className={`relative w-full py-[68px] bgPurpleGradient md:py-12`}>
          <div className=" relative w-full mb-16 text-center  md:mb-8">
            <h6 className="text-white title mb-8 md:mb-2">GET IN TOUCH</h6>
            <h2 className="text-white mb-5">Let&#39;s talk!</h2>
          </div>
          <div className="w-mainRow -ml-2.5 flex md:flex-wrap md:w-full md:ml-0">
            <div className="w-halfWidth mx-2.5 md:w-full md:mx-0 md:mb-10">
              <h4 className="text-white text-[23px] md:text-[20px] xl-up:leading-10 ">
              If you are interested in learning more about Bright Code and how we can work together to achieve your goals, we encourage you to get in touch with us directly. We value direct, one-on-one discussions where we can understand your unique needs and explore the potential for collaboration. 
              </h4>
              <br />
              <h5 className="text-white font-light">
              At Bright Code, we stand by our commitment to professionalism, trust, and confidentiality. We believe in the power of collaboration, and by working as a partner, we can empower you to shine in the spotlight.
              </h5>
              <br />
              <h5 className="text-white font-light">
              Your success is our success, and we look forward to the possibility of working together to delight your clients and achieve remarkable results.
              </h5>

              <br />
              <h4 className="text-white text-[23px] md:text-[20px] xl-up:leading-10">
              Thank you for considering Bright Code as your trusted partner.
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

                {/* <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                  onChange={setcaptcha}
                  className="mb-5"
                /> */}
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

export default Contact;
