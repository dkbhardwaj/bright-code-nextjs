import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button"
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
    title: string;
    ctaLink: any;
  };
}

const Herobanner: React.FC<HeroBannerData> = ({ data }) => {

  const { backgroundImage, foregroundImage, title, ctaLink } = data;
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
      <div className="container">
        {foregroundImage?.fields?.file?.url && (
          <div className="left_img absolute bottom-0 right-[60%] w-full max-w-[526px] h-[506px] z-[1] desktop:max-w-[450px] desktop:h-[450px]  tablet:max-w-[400px] tablet:h-[400px] xl:right-auto tablet:left-0 md:h-[310px] md:max-w-[325px]  md:left-[50%] md:translate-x-[-50%] ">
            <Image
              src={`https:${foregroundImage?.fields?.file?.url}`}
              alt="left-img"
              className=" w-full h-full object-cover"
              priority
              layout="fill" 
              objectFit="cover"
              quality={80}
            />
          </div>
        )}
        <div className="w-full max-w-[750px] ml-auto relative z-[2] text-left xl:max-w-full desktop:w-[calc(100%-450px)] tablet:w-[calc(100%-400px)] md:text-center md:mx-auto ">
          {title && <h1 className="header-h1 text-white ">{title}</h1>}

          {ctaLink && (
            <Button ctaData={ctaLink} classes={'mt-14 mx-auto md:mt-6'} />
          )}
        </div>
      </div>
    </section>
  );
};
export default Herobanner;
