import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    // <footer className="footer bg-darkBlue py-20">
    //   <div className="container">
    //     <div className="w-full text-white flex justify-between md:flex-col md:items-center">
    //       <div className="w-54">
    //         <div className={`logo relative max-w-[207px] h-[57px]`}>
    //           <Link href="/" className="redirect">
    //             .
    //           </Link>
    //           <Image src="/brightcode_logo.png" width={300} height={100} alt="logo" className=" w-full h-full object-contain" />
    //         </div>
            
    //       </div>
    //       <div className="textWrap relative md:mt-8">
    //         <ul className=" relative flex flex-wrap sm:block">
    //           <li className=" relative flex items-center px-3 py-2 border-[1px] border-solid border-white rounded-[9px] ml-3 sm:ml-0 sm:mb-3">
    //             <Link href="mailto:contact@bright-code.io tbd" className="redirect">.</Link>
    //             <div className="icon-img max-w-[21px] h-[21px] mr-3">
    //               <Image src="/mail-icon-white.svg" width={25} height={25} alt="img"  className=" w-full h-full object-contain"/>
    //             </div>
    //             <span className="font-semibold">contact@bright-code.io</span>
    //           </li>
    //           <li className=" relative flex items-center  px-3 py-2 border-[1px] border-solid border-white rounded-[9px] ml-3  sm:ml-0">
    //             <div className="icon-img max-w-[21px] h-[21px] mr-3">
    //               <Image src="/phone-icon-white.svg" width={25} height={25} alt="img"  className=" w-full h-full object-contain" />
    //             </div>
    //             <span className="font-semibold">+ ‪(805) 215-0549‬</span>
    //           </li>
    //         </ul>
    //       </div>
    //       <div className="hidden socialWrap mt-5 md:flex md:justify-center">
    //           <div className="icon relative max-w-[33px] h-[33px]">
    //             <Link
    //               href={"https://twitter.com/brightcodeio"}
    //               className="redirect"
    //             >
    //               .
    //             </Link>
    //             <Image src="/twitter-white.svg" width={40} height={40} alt="icon" className=" w-full h-full object-contain"/>
    //             {/* <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               x="0px"
    //               y="0px"
    //               width="30"
    //               height="30"
    //               viewBox="0 0 50 50"
    //               style={{ fill: "#FFFFFF" }}
    //             >
    //               <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
    //             </svg> */}

    //           </div>
    //           <div className="icon relative ml-2  max-w-[33px] h-[33px]">
    //           <Link
    //               href={"https://www.linkedin.com/company/bright-codeio/"}
    //               className="redirect"
    //             >
    //               .
    //             </Link>
    //             <Image src="/linkedin-white.svg" width={40} height={40} alt="icon" className=" w-full h-full object-contain"/>
    //             {/* <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               x="0px"
    //               y="0px"
    //               width="30"
    //               height="30"
    //               viewBox="0 0 50 50"
    //               style={{ fill: "#FFFFFF" }}
    //             >
    //               <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
    //             </svg> */}
    //           </div>
    //         </div>
    //     </div>
    //     <div className=" relative w-full flex flex-wrap justify-between mt-20 md:mt-10">
    //       <div className="copyright w-fit mr-5 md:text-center md:w-full ">
    //       <p className="text-white">© 2024 Bright Code Solution</p>
    //       </div>
    //       <div className="socialWrap flex md:justify-center md:hidden">
    //           <div className="icon relative max-w-[33px] h-[33px] ">
    //             <Link
    //               href={"https://twitter.com/BrightcodeIO"}
    //               className="redirect"
    //             >
    //               .
    //             </Link>
    //             <Image src="/twitter-white.svg" width={40} height={40} alt="icon" className=" w-full h-full object-contain"/>
    //             {/* <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               x="0px"
    //               y="0px"
    //               width="30"
    //               height="30"
    //               viewBox="0 0 50 50"
    //               style={{ fill: "#FFFFFF" }}
    //             >
    //               <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
    //             </svg> */}
    //           </div>
    //           <div className="icon relative ml-3  max-w-[33px] h-[33px]">
    //           <Link
    //               href={"https://www.linkedin.com/company/bright-codeio/"}
    //               className="redirect"
    //             >
    //               .
    //             </Link>
    //             <Image src="/linkedin-white.svg" width={40} height={40} alt="icon" className=" w-full h-full object-contain"/>
    //             {/* <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               x="0px"
    //               y="0px"
    //               width="30"
    //               height="30"
    //               viewBox="0 0 50 50"
    //               style={{ fill: "#FFFFFF" }}
    //             >
    //               <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
    //             </svg> */}
    //           </div>
    //         </div>
    //     </div>
    //   </div>
    // </footer>
    <footer className="footer py-[90px] bg-darkBlue bg-[url('/footer-bg-image.png')] bg-no-repeat bg-cover md:py-16 ">
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
  );
};

export default Footer;
