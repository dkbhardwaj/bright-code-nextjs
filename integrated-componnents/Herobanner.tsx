import React from "react";
import Image from "next/image";


import ImageWithContent from "./HeroBannerMiniComp/ImageWithContent";
import VideoWithContent from "./HeroBannerMiniComp/VideoWithContent";

interface HeroBannerData {
  data: {
    backgroundImage: {
      fields:{
        file:{
          url: string;
          fileName: string;
        }
      }
    };
    foregroundImage: {
      fields:{
        file:{
          url: string;
          fileName:string
        }
      }
    };
    foregroundVideo: {
      fields:{
        file:{
          url: string;
          fileName:string
        }
      }
    };
    title: string;
    ctaLink: any;
  };
}

const Herobanner: React.FC<HeroBannerData> = ({ data }) => {

  const { backgroundImage, foregroundImage, foregroundVideo, title, ctaLink } = data;
  return (
    <section
      className={`banner-with-img banner_overlay relative  overflow-x-hidden bg-darkBlue flex items-end text-white z-[1] pt-28 pb-24 min-h-[752px] desktop:min-h-[630px]  tablet:min-h-[560px] tablet:pt-24 tablet:pb-14 md:min-h-[552px]  md:pt-24 md:pb-12 md:items-center `}
    >
      {backgroundImage && (
        <div className="bg_image absolute top-0 left-0 w-full h-full ">
          <Image
            src={`https:${backgroundImage?.fields?.file?.url}`}
            alt="bg-img"
            className="w-full h-full object-cover object-center"
            priority
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      {foregroundVideo && ( <div className="absolute left-0 right-0 bottom-0 h-full bg-black opacity-[0.5] z-[2]"></div>)}
      {foregroundVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="banner-video object-cover absolute left-0 top-0 w-full h-full "
          width={1000}
          height={964}
        >
          <source
            src={`https:${foregroundVideo?.fields?.file?.url}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="container">
      <ImageWithContent imgUrl={foregroundImage?.fields?.file?.url} title={title} cta={ctaLink} />

  
      </div>
    </section>
  );
};
export default Herobanner;
