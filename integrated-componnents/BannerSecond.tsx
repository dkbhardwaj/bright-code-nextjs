import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button"

interface BannerSecondData {
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
    title:string;
    cta:any;
    sectionPadding:{
      fields:{
        padding:string;
      }
    }
  };
}

const BannerSecond: React.FC<BannerSecondData> = ({ data }) => {
  const {
    backgroundImage,
    foregroundImage,
    title,
    sectionPadding,
    cta
  } = data;

  const hasImages = foregroundImage ;
  const hasnotImages = !foregroundImage ;
  const padding = sectionPadding?.fields?.padding
  return (
    <section
      className={` banner-second banner_DarkOverlay banner_bg_img  bg-darkBlue text-white md:items-baseline ${padding} ${
        hasnotImages ? "" : "banner-with-img"
      }`}
      data-aos="fade-in"
      data-aos-delay="500"
      data-aos-duration="1000"
    >
      <div className="container">
     
          <>
            {foregroundImage && (
              <div className="left_img absolute bottom-0 left-[calc(65%-204px)] w-full max-w-[390px] h-[362px] z-[2] md:w-[330px] md:max-w-full md:h-[304px] md:left-[calc(42%-212px)]">
                <Image
                  src={`https:${foregroundImage?.fields?.file?.url}`}
                  width={400}
                  height={400}
                  loading="lazy"
                  alt="left-img"
                  className=" w-full h-full object-cover"
                />
              </div>
            )}
            {/* {bannerRightImg && (
              <div className="right_img absolute bottom-0 left-[65.58%] w-full max-w-[350px] h-[350px] z-[1]  md:w-[304px] md:max-w-full md:h-[304px] md:left-[42%] ">
                <Image
                  src={bannerRightImg}
                  width={400}
                  height={400}
                  loading="lazy"
                  alt="right-img"
                  className=" w-full h-full object-cover"
                />
              </div>
            )} */}
            <div className="relative banner-content text-left z-[2]">
              {title && <h1 className=" text-white ">{title}</h1>}
              {cta && (
                <Button ctaData={cta} classes={'mt-14 mx-auto md:mt-6'} />
               )}
            </div>
          </>
        
      </div>
    </section>
  );
};
export default BannerSecond;
