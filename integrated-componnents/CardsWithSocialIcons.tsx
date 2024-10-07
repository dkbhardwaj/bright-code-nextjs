"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
} from "next-share";

interface CardsWithSocialIcons {
  data: {
    markdown: string;
    sectionPadding:any;
    card:any;
    viewSocialIcons:boolean;
  };
}


const CardsWithSocialIcons: React.FC<CardsWithSocialIcons> = ({ data }) => {
  const { markdown, sectionPadding, card, viewSocialIcons} = data;
  console.log(data)
  const router = useRouter();
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL;

  const link = `${baseUrl}${router.asPath}`;
  const padding = (data?.sectionPadding?.fields?.padding)?.join(" ")
  const cards =  data?.card

  return (
    <section className={`cards-with-social-icon relative w-full ${padding} `}>
      <div className="container">
        <div className={`list-with-icon-content relative w-full ${viewSocialIcons ? "flex flex-wrap" : "block"}`}>
          <div className={`${viewSocialIcons ?"w-[calc(100%-285px)] mr-[20px]" : "w-full max-w-[1050px] mx-auto justify-center" } md:w-full md:mr-0 flex flex-wrap items-center`}>
            <div className="flex flex-wrap w-[calc(100%+20px)] ml-[-10px] justify-center">
              {cards.map((card: { fields: { cardImage: { fields: { file: { url: any; }; }; }; description: string, heading: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; }, index: any)=>{
                return(
                  <div className={`${viewSocialIcons ?"w-[calc(33.33%-20px)] mx-[10px]" : "w-[calc(30%-38px)] mx-[19px]" } tablet:w-[calc(100%-20px)] tablet:mx-[20px] tablet:mb-[20px] md:w-full md:mb-[20px] flex flex-wrap   border-[1px] border-brightGray rounded-[20px] p-[20px]`}>
                    <div className={`${viewSocialIcons ? "w-[20px]": "w-[22px]"} mr-[13px] block`}>
                      <Image
                        src={`https:${card?.fields?.cardImage?.fields?.file?.url}`}
                        alt="icon"
                        width={22}
                        height={22}
                        objectPosition="contain"
                        quality={100}
                      />
                    </div>
                    <div className={`${viewSocialIcons ? "w-[calc(100%-33px)]": "w-[calc(100%-35px)]"} mt-[-5px]`}>
                      <h5 className="font-[600] pr-[12px]">{card?.fields?.heading}</h5>
                      <p className="text-black text-[14px]">{card?.fields?.description}</p>
                    </div>
                </div>
                )
              })}
            </div>
          </div>
          {viewSocialIcons && 
            (<div className={`social-icon-content relative w-full max-w-[265px] h-fit rounded-[20px] bg-[#f6eeff] py-[28px] px-[36px] flex items-center justify-between md:py-[22px] md:px-[30px] tablet:sticky tablet:top-0 `}>
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
            </div>)
          }
          
        </div>
      </div>
    </section>
  );
};
export default CardsWithSocialIcons;
