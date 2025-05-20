import React from "react";
import Link from "next/link";
import { classifyStr } from "../lib/utils/string"
// import { Entry, EntrySkeletonType } from "contentful";
import Button from "./Button"


interface IntroductionProps {
  data: {
    eyebrowText: string;
    title: string;
    gradientText: string;
    titleLarge: boolean;
    nopaddingbottom: boolean;
    titleWhite: boolean;
    paddingmediumbottom: boolean;
    description: string[];
    cta: JSON;
    leftAlign: Boolean;
    sectionPadding: any;
    bgColor: string;
    colorStyling: string;
  };
 

}

type TwConfigKeys = 'white' | 'gray';


const Introduction: React.FC<IntroductionProps> = ({ data }) => {

  const {
    eyebrowText,
    title,
    gradientText,
    titleLarge,
    titleWhite,
    bgColor,
    description,
    cta,
    leftAlign,
    sectionPadding,
    colorStyling
  } = data;

   
  const padding = (data?.sectionPadding?.fields?.padding)?.join(" ")
  const twConfig: Record<TwConfigKeys, string> = {
    white: 'bg-white',
    gray: 'bg-extraLightGray',
  };
  
  const bgColorClass = bgColor ? twConfig[classifyStr(bgColor) as TwConfigKeys] : '';
  
  return (
    <section
      className={`introduction ${padding}  text-center overflow-x-hidden ${bgColorClass} ${colorStyling && colorStyling.toLowerCase()}`}
      id="why-choose-us"
    >
      <div className="container">
        <div className={`w-full mx-auto ${leftAlign && 'text-left' }`}>
          <div  data-aos="fade-right"
              data-aos-delay="400"
              data-aos-duration="600"
            >
                {eyebrowText && (
                  <h6 className="eyebrow text-[#8000FF] uppercase font-normal mb-3 md:mb-1">
                    {eyebrowText}
                  </h6>
                )}
                {gradientText && (
                  
                    <span className="text_gradient block text-[42px] leading-[65px] desktop:text-[36px] desktop:leading-[60px] tablet:text-[33px] tablet:leading-[55px] md:text-[30px] md:leading-[50px] ">
                      {gradientText}
                    </span>
                )}
                
                {title && (
                    <h2
                      className={`${titleLarge ? "large" : ""} ${
                        titleWhite ? "text-white" : ""
                      } ${
                        description ? "mb-0" : "mb-[38px] md:mb-[20px]"
                      } text-black font-[600]`}

                      dangerouslySetInnerHTML={{ __html: title }}
                     />
                  )
                }

          </div>
          <div  data-aos="fade-left"
              data-aos-delay="400"
              data-aos-duration="600"
            >
            {description &&
              <div
                className={`!text-black w-full max-w-[960px] !text-black mt-5 ${!leftAlign && 'mx-auto'}`}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            }
              {cta && (
                <Button ctaData={cta} classes={'cursor-pointer mt-7 mx-auto'} />
              )}
            </div>
          
        </div>
      </div>
    </section>
  );
};
export default Introduction;

