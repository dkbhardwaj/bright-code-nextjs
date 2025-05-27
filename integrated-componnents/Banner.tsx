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
    backgroundVideo: {
      fields:{
        file:{
          url: string;
          fileName:string
        }
      }
    };
  };
}

const Banner: React.FC<BannerData> = ({ data }) => {
  const { subTitle, title, backgroundImage, description,eyebrowText,alignTextCenter, backgroundVideo} = data;
  //banner_overlayImg
    console.log(data)
  return (
    <section
      className={`banner ${backgroundVideo?.fields?.file?.url ? "" : "banner_overlayImg"}  relative overflow-x-hidden bg-darkBlue flex items-center text-white pt-28 pb-10 min-h-[535px] md:min-h-[440px]  md:pt-24  md:items-center `}
    >
     
        {backgroundImage?.fields?.file?.url && 
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
        }

{backgroundVideo && ( <div className="absolute left-0 right-0 bottom-0 h-full bg-black opacity-[0.6] z-[2]"></div>)}
      {backgroundVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="banner-video object-cover absolute left-0 top-0 w-full h-full "
          width={1000}
          height={964}
          poster="/home/video-poster.png"
        >
          <source
            src={`https:${backgroundVideo?.fields?.file?.url}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}
        
     
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
            <div  className="banner-desc lg-up:text-[18px] text-white font-medium text-[#ababab] lg-up:leading-[30px] ">{documentToReactComponents(description)}</div>
          )}
          
        </div>
      </div>
    </section>
  );
};
export default Banner;
