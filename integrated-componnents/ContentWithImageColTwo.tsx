import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ContentWithImageProps {
  data: {
    subTitle: string;
    title: string;
    eyebrowText: string;
    btnUrl: string;
    btnText: string;
    foregroundImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    imageOnLeft: boolean;
    featuredClass: boolean;
    animatContent: string;
    animatImage: string;
    paddinglargebottom: boolean;
    paddingmedium: boolean;
    markdown: string;
    sectionPadding: string;
  };
}

const ContentWithImageColTwo: React.FC<ContentWithImageProps> = ({ data }) => {
  const {
    subTitle,
    title,
    eyebrowText,
    markdown,
    btnUrl,
    btnText,
    foregroundImage,
    imageOnLeft,
    featuredClass,
    animatContent,
    animatImage,
    sectionPadding,
  } = data;
  return (
    <section
      className={`${sectionPadding} contentWithImage overflow-hidden`}
    >
      <div className="container">
        <div
          className={`${imageOnLeft ? "flex-row-reverse featured py-16 md:py-12" : ""} ${
            featuredClass ? "featured" : ""
          } w-mainRow -ml-2.5  flex  items-center z-1 relative md:flex-wrap md:w-full md:ml-0 `}
        >
          <div
            className={`content w-halfWidth mx-2.5 text-spaceBlack md:pl-0 md:w-full md:mx-0 md:mb-10 `}
            data-aos={animatContent}
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
              className="leading-[28px] !text-black "
              dangerouslySetInnerHTML={{ __html: markdown }}
              />
              // <ul className=" list-none relative w-full block ">
              //   {listItem.map((item, index) => (
              //     <li
              //       className=" font-light leading-[28px] "
              //       key={index}
              //       dangerouslySetInnerHTML={{ __html: item.listContent }}
              //     />
              //   ))}
              // </ul>
            )}
            {/* {paragraphText &&
              paragraphText.map((item, index) => (
                <p
                  className="mt-5 text-black"
                  key={index}
                  dangerouslySetInnerHTML={{ __html: item.paragraph }}
                />
              ))} */}
            {btnText && (
              <Link
                href={btnUrl}
                className={` mt-5 bgWhiteBtn gradient-btn mx-auto`}
              >
                <span>{btnText}</span>
              </Link>
            )}
          </div>
          <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
            <div
              className="imageWrap w-full h-[400px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
              data-aos={animatImage}
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
                className=" w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContentWithImageColTwo;
