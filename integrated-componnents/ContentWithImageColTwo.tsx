import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button"

interface ContentWithImageProps {
  data: {
    subTitle: string;
    title: string;
    eyebrowText: string;
    cta: JSON;
    foregroundImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    imageOnLeft: boolean;
    paddinglargebottom: boolean;
    paddingmedium: boolean;
    markdown: string;
    sectionPadding: any;
    bgPink: Boolean;
    listStyling: string;
    sideText: string;
    sideImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

const ContentWithImageColTwo: React.FC<ContentWithImageProps> = ({ data }) => {
  const {
    subTitle,
    title,
    eyebrowText,
    markdown,
    cta,
    foregroundImage,
    imageOnLeft,
    sectionPadding,
    bgPink,
    listStyling,
    sideImage,
    sideText,
  } = data;

  const padding = (data?.sectionPadding?.fields?.padding)?.join(" ")


  return (
    <section
      className={`contentWithImage ${padding ? padding : ""} overflow-hidden`}
    >
      <div className="container">
        <div
          className={`${imageOnLeft ? "flex-row-reverse" : ""} ${
            bgPink ? "featured py-16 md:py-12" : ""
          } w-mainRow -ml-2.5  flex  items-center z-1 relative md:flex-wrap md:w-full md:ml-0 `}
        >
          <div
            className={`content w-halfWidth mx-2.5 text-spaceBlack md:pl-0 md:w-full md:mx-0 md:mb-10 `}
            data-aos={imageOnLeft ? "fade-left" : "fade-right"}
            data-aos-delay="400"
            data-aos-duration="500"
          >
            {eyebrowText && (
              <h6 className={`text-[#8000FF] uppercase font-normal`}>
                {eyebrowText}
              </h6>
            )}
            {title && (
              <h2
                className={`font-medium xl-up:text-[45px] text-black mb-[20px] md:mb-[10px] `}
              >
                {title}
              </h2>
            )}
            {subTitle && (
            <h3 className="mb-[20px] md:mb-[10px]">
              
                <span className="text_gradient text-[35px] leading-[46px] tablet:text-[30px] tablet:leading-[42px] md:text-[27px] md:leading-[40px]">
                  {subTitle}
                </span>
              
            </h3>
            )}
            {markdown && (
              <div
              className={`markdown leading-[28px] !text-black ${listStyling == "Purple" ? "purple-tick" : listStyling == "Blue" ?"blue-tick" : ""}`}
              dangerouslySetInnerHTML={{ __html: markdown }}
              />
            )}
              {cta && (
                <Button ctaData={cta} classes={'mt-5 mx-auto'} />
              )}
          </div>
          <div className=" imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
            
              {foregroundImage?.fields?.file?.url && 
                <div
                className="imageWrap w-full h-[400px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos={imageOnLeft ? "fade-right" : "fade-left"}
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image
                  src={`https:${foregroundImage?.fields?.file?.url}`}
                  alt="img"
                  // width={600}
                  // height={500}
                  priority
                  fill
                  style={{ objectFit: "cover" }}
                  className=" w-full h-full object-cover object-left"
                />
                 </div>
              }
              {
                (sideText || sideImage) && (
                  <div className={`${listStyling == "Blue" ? "bg-[#0075FF12]" : "bg-[#8000FF12]"} 
                   side-text px-[50px] py-[47px] md:p-[30px] rounded-[55px]

                  `}>
                    {sideImage && (
                      <div className="mb-[28px]">
                        <Image
                          src={`https:${sideImage?.fields?.file?.url}`}
                          alt="img"
                          width={183}
                          height={43}
                          priority
                          //  fill
                          style={{ objectFit: "contain" }}
                          className=" w-[183px] h-[43px] md:w-[150px] md:h-[35px] object-contain "
                        />
                      </div>
                    )}
                     <h4 className="lg-up:text-[25px] font-[600]">{sideText}</h4>
                  </div>
                )
              }
           
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContentWithImageColTwo;
