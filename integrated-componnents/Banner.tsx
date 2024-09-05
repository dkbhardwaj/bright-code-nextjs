import React from "react";
import Image from "next/image";

interface BannerData {
  data: {
    subTitle: string;
    title: string;
    mainTitleSpan: string;
    description: string;
    eyebrowText: string;
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
  const { subTitle, title, backgroundImage, description,eyebrowText } = data;
  
  return (
    <section
      className={`banner banner_overlayImg relative overflow-x-hidden bg-darkBlue flex items-center text-white pt-28 pb-10 min-h-[752px]  desktop:min-h-[630px]  tablet:min-h-[560px] tablet:pt-24 md:min-h-[552px]  md:pt-24  md:items-center `}
    >
      <div className="bannerBgImage absolute top-0 left-0 w-full h-full  ">
        <Image
          src={`https:${backgroundImage?.fields?.file?.url}`}
          width={2500}
          height={1200}
          alt="bg-img"
          className=" w-full h-full object-cover object-center "
          loading="lazy"
        />
      </div>
      <div className="container">
        <div
          className="w-full relative z-[5] text-left"
          data-aos="fade-left"
          data-aos-delay="200"
          data-aos-duration="400"
        >
          {eyebrowText && <h6 className=" text-white mb-2 ">{eyebrowText}</h6>}
          {title && (
            <>
            <h1 className="header-h1 lg-up:text-[45px] lg-up:leading-[60px] text-white ">
              {title}
            </h1>
             <span className="h3 text-white inline-block mb-[30px] mt-[10px] ">{subTitle}</span>
            </>
          )}
          {description && (
            <p
              className=" lg-up:text-[18px] font-medium text-[#ababab] lg-up:leading-[30px] "
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
      </div>
    </section>
  );
};
export default Banner;