import React from "react";
import Image from "next/image";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface BannerData {
  data: {
    subTitle: string;
    title: string;
    mainTitleSpan: string;
    description: any;
    eyebrowText: string;
    alignTextCenter: boolean;
    backgroundImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

const Banner: React.FC<BannerData> = ({ data }) => {
  const { subTitle, title, backgroundImage, description,eyebrowText,alignTextCenter } = data;
  //banner_overlayImg
  
  return (
    <section
      className={`banner banner_overlayImg relative overflow-x-hidden bg-darkBlue flex items-center text-white pt-28 pb-10 min-h-[752px]  desktop:min-h-[630px]  tablet:min-h-[560px] tablet:pt-24 md:min-h-[552px]  md:pt-24  md:items-center `}
    >
      <div className="bannerBgImage absolute top-0 left-0 w-full h-full  ">
        {backgroundImage?.fields?.file?.url && 
            <Image
            src={`https:${backgroundImage?.fields?.file?.url}`}
            width={2500}
            height={1200}
            alt="bg-img"
            className=" w-full h-full object-cover object-center "
            loading="lazy"
          />
        }
        
      </div>
      <div className="container">
        <div
          className={`content relative z-[10] w-full relative z-[5] ${alignTextCenter ? "text-center" : "text-left"}`}
          data-aos="fade-left"
          data-aos-delay="200"
          data-aos-duration="400"
        >
          {eyebrowText && <h6 className="eyebrow text-white mb-2 ">{eyebrowText}</h6>}
          {title && (
            <>
            <h1 className="relative z-[2] header-h1 lg-up:text-[45px] lg-up:leading-[60px] text-white ">
              {title}
            </h1>
             <span className="sub-title h3 text-white inline-block mb-[30px] mt-[16px] ">{subTitle}</span>
            </>
          )}
          {description && (
            <div  className=" lg-up:text-[18px] font-medium text-[#ababab] lg-up:leading-[30px] ">{documentToReactComponents(description)}</div>
          )}
          
        </div>
      </div>
    </section>
  );
};
export default Banner;
