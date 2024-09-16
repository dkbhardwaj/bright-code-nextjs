"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
} from "next-share";

interface ListWithSocialIconData {
  data: {
    markdown: string;
    sectionPadding:any;
  };
}

const ListWithSocialicon: React.FC<ListWithSocialIconData> = ({ data }) => {
  const { markdown, sectionPadding } = data;

  const router = useRouter();
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL;

  const link = `${baseUrl}${router.asPath}`;
  const padding = (data?.sectionPadding?.fields?.padding)?.join(" ")

  return (
    <section className={`list-with-social-icon relative w-full ${padding} `}>
      <div className="container">
        <div className="list-with-icon-content relative w-full flex flex-wrap md:block ">
          {markdown && (
            <div className="list-content w-[calc(100%-265px)] md:w-full md:mb-5 " dangerouslySetInnerHTML={{ __html: markdown }}/>
          )}
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
  );
};
export default ListWithSocialicon;
