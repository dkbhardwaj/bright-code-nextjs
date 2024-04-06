import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { TwitterShareButton } from "next-share";
import { LinkedinShareButton } from "next-share";
import { FacebookShareButton } from "next-share";

const ListWithSocialicon: React.FC = () => {
  const router = useRouter();
  const baseUrl = typeof window !== "undefined" ? window.location.href : "";
  console.log(baseUrl);

  const link = encodeURI(`${baseUrl}${router.asPath}`);
  console.log(link);

  return (
    <>
      <section className=" list-with-social-icon relative w-full py-[106px] lg:py-20 md:!py-12 ">
        <div className="container">
          <div className="list-with-icon-content relative w-full flex flex-wrap md:block ">
            <div className="list-content w-[calc(100%-265px)] md:w-full md:mb-5 ">
              <ul className=" relative w-full flex pr-5 xl:block md:pr-0 ">
                <li className=' relative w-full max-w-[262px] text-[20px] leading-[28px] font-medium text-black pl-[46px] before:content-[""] before:absolute before:top-0 before:left-0 before:w-[30px] before:h-[30px] before:rounded-[50%] before:bg-[url("/case-study/check-icon-2.svg")] before:bg-no-repeat before:bg-cover xl:max-w-full xl:mb-4 lg:text-[18px] lg:before:w-[25px] lg:before:h-[25px] sm:!text-[16px] sm:!before:w-[20px] sm:!before:h-[20px] sm:pl-[34px] sm:before:top-[2px] '>
                  Better Climate Governance
                </li>
                <li className=' relative w-full max-w-[262px] text-[20px] leading-[28px] font-medium text-black pl-[46px] before:content-[""] before:absolute before:top-0 before:left-0 before:w-[30px] before:h-[30px] before:rounded-[50%] before:bg-[url("/case-study/check-icon-2.svg")] before:bg-no-repeat before:bg-cover xl:max-w-full xl:mb-4 lg:text-[18px] lg:before:w-[25px] lg:before:h-[25px] sm:!text-[16px] sm:!before:w-[20px] sm:!before:h-[20px] sm:pl-[34px] sm:before:top-[2px] '>
                  Satisfied Investor And Stakeholder Concerns
                </li>
                <li className=' relative w-full max-w-[262px] text-[20px] leading-[28px] font-medium text-black pl-[46px] before:content-[""] before:absolute before:top-0 before:left-0 before:w-[30px] before:h-[30px] before:rounded-[50%] before:bg-[url("/case-study/check-icon-2.svg")] before:bg-no-repeat before:bg-cover xl:max-w-full lg:text-[18px] lg:before:w-[25px] lg:before:h-[25px] sm:!text-[16px] sm:!before:w-[20px] sm:!before:h-[20px] sm:pl-[34px] sm:before:top-[2px] '>
                  Equipped to Meet Climate-Related Disclosure Requirements
                </li>
              </ul>
            </div>
            <div className="social-icon-content relative w-full max-w-[265px] h-fit rounded-[20px] bg-[#f6eeff] py-[28px] px-[36px] flex items-center justify-between md:py-[22px] md:px-[30px] ">
              <span className=" text-[15px] font-normal leading-[21px] text-black ">
                Share To:
              </span>
              <div className="social-icon flex flex-wrap ml-2 ">
                <div className="icon relative max-w-[26px] h-[26px] ml-[8px] ">
                  <TwitterShareButton url={link}>
                    <Image
                      src="/case-study/twitter-black-icon.svg"
                      width={50}
                      height={50}
                      loading="lazy"
                      className=" w-full h-full object-contain "
                      alt="icon"
                    />
                  </TwitterShareButton>
                </div>
                <div className="icon relative max-w-[26px] h-[26px] ml-[8px] ">
                  <LinkedinShareButton url={link}>
                    <Image
                      src="/case-study/linkedin-black-icon.svg"
                      width={50}
                      height={50}
                      loading="lazy"
                      className=" w-full h-full object-contain "
                      alt="icon"
                    />
                  </LinkedinShareButton>
                </div>
                <div className="icon relative max-w-[26px] h-[26px] ml-[8px] ">
                  <FacebookShareButton url={link}>
                    <Image
                      src="/case-study/facebook-black-icon.svg"
                      width={50}
                      height={50}
                      loading="lazy"
                      className=" w-full h-full object-contain "
                      alt="icon"
                    />
                  </FacebookShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ListWithSocialicon;
