import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface BannerSecondData {
  data: {
    description:any;
    eyebrowText:string;
    backgroundImg: {
      fields:{
        file:{
          url: string;
          fileName: string;
        }
      }
    };
    foregroundImg: {
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
    backgroundImg,
    foregroundImg,
    title,
    sectionPadding,
    cta,
    description,
    eyebrowText
  } = data;



  const hasnotImages = !foregroundImg ;
  const padding = sectionPadding?.fields?.padding
  return (
    <section
      className={`relative banner-second banner_DarkOverlay banner-second_bg_img text-white md:items-baseline ${padding} ${
        hasnotImages ? "" : "banner-with-img"
      } ${!backgroundImg &&  "bg-darkBlue"}`}
      data-aos="fade-in"
      data-aos-delay="500"
      data-aos-duration="1000"
    >
      <div className="bannerBgImage absolute top-0 left-0 w-full h-full z-[-1]  ">
              {backgroundImg?.fields?.file?.url && 
                  <Image
                  src={`https:${backgroundImg?.fields?.file?.url}`}
                  width={2500}
                  height={1200}
                  alt="bg-img"
                  className=" w-full h-full object-cover object-top "
                  loading="lazy"
                />
              }
              
        </div>
      <div className="container">
     
            {foregroundImg?.fields?.file?.url ? (
               <>
                  <div className="right_img absolute bottom-0 left-[45%] w-full max-w-[655px] h-[413px] z-[1] xl:w-[490px] xl:max-w-full xl:h-[310px] md:left-[14%] xs:left-0 ">
                    <Image
                     src={`https:${foregroundImg?.fields?.file?.url}`}
                      width={700}
                      height={500}
                      loading="lazy"
                      alt="right-img"
                      className=" w-full h-full object-cover"
                    />
                  </div>
                  <div className="banner-content text-left">
                  {eyebrowText && <h6 className=" text-white mb-2 ">{eyebrowText}</h6>}
                  {title && <h1 className=" text-white ">{title}</h1>}
                  {cta && (
                        <Button ctaData={cta} classes={'mt-14 mx-auto md:mt-6'} />
                      )}
                  </div>
                </>
            ) : (
                <>
                  <div className="w-full text-center relative z-10">
                  {eyebrowText && <h6 className=" text-white mb-2 ">{eyebrowText}</h6>}
                  {title && <h1 className={`text-white ${backgroundImg &&  ""}`}>{title}</h1>}
                  {description && (
                      <div  className="text-white mt-5 opacity-[0.6]">{documentToReactComponents(description)}</div>
                    )}

                      {cta && (
                        <Button ctaData={cta} classes={'mt-14 mx-auto md:mt-6'} />
                      )}
                    </div>
                </>

            )}
        
      </div>
    </section>
  );
};
export default BannerSecond;
