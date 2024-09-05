import React from "react";
import Link from "next/link";
// import {getDataById} from "../lib/contentful/getDataById"
// import { Entry, EntrySkeletonType } from "contentful";


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
    btntext: string;
    leftAlign: Boolean;
    sectionPadding: string;
  };
 

}


const Introduction: React.FC<IntroductionProps> = ({ data }) => {
 
  const {
    eyebrowText,
    title,
    gradientText,
    titleLarge,
    nopaddingbottom,
    titleWhite,
    paddingmediumbottom,
    description,
    btntext,
    leftAlign,
    sectionPadding
  } = data;

  


  const handleScroll = () => {
    const targetElement = document.getElementById("get-in-touch");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(
        null,
        document.title,
        window.location.pathname
      );
    }
  };
  

  
  return (
    <section
      className={`${nopaddingbottom ? "no-padding-bottom" : ""} ${
        paddingmediumbottom ? "padding-medium-bottom" : ""
      }  intro  ${sectionPadding}  text-center overflow-x-hidden`}
      id="why-choose-us"
    >
      <div className="container">
        <div className={`w-full mx-auto ${leftAlign && 'text-left' }`}>
          {eyebrowText && (
            <h6 className="text-[#8000FF] uppercase font-normal mb-3 md:mb-1">
              {eyebrowText}
            </h6>
          )}
          {gradientText ? (
            <h2
              className={`${titleLarge ? "large" : ""} ${
                titleWhite ? "text-white" : ""
              } ${
                description ? "mb-0" : "mb-[38px] md:mb-[20px]"
              } font-medium text-black `}
            >
              <span className="text_gradient block text-[50px] leading-[65px] desktop:text-[36px] desktop:leading-[60px] tablet:text-[33px] tablet:leading-[55px] md:text-[30px] md:leading-[50px] ">
                {gradientText}
              </span>
              {title}
            </h2>
          ) : (
            title && (
              <h2
                className={`${titleLarge ? "large" : ""} ${
                  titleWhite ? "text-white" : ""
                } ${
                  description ? "mb-0" : "mb-[38px] md:mb-[20px]"
                } font-medium text-black `}
              >
                {title}
              </h2>
            )
          )}
          {description &&
            // description.map((text, index) => (
              <h5
                className={`text-black w-full max-w-[960px]  mt-5 ${!leftAlign && 'mx-auto'}`}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            // ))
            }
          {btntext && (
            <div
              className=" cursor-pointer mt-7 gradient-btn mx-auto"
              onClick={handleScroll}
            >
              <span>{btntext}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default Introduction;

