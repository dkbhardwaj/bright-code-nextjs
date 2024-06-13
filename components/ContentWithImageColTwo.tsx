import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ContentWithImageProps {
  data: {
    subtitle: string;
    title: string;
    titleSpan: string;
    btnUrl: string;
    btnText: string;
    imageUrl: string;
    rowReverse: boolean;
    featuredClass: boolean;
    animatContent: string;
    animatImage: string;
    paddinglargebottom: boolean;
    paddingmedium: boolean;
    paragraphText: {
      id: number;
      paragraph: string;
    }[];
  };
}

const ContentWithImageColTwo: React.FC<ContentWithImageProps> = ({ data }) => {
  const {
    subtitle,
    title,
    titleSpan,
    paragraphText,
    btnUrl,
    btnText,
    imageUrl,
    rowReverse,
    featuredClass,
    animatContent,
    animatImage,
    paddinglargebottom,
    paddingmedium,
  } = data;
  return (
    <section
      className={`${paddinglargebottom ? "padding-large-bottom" : ""} ${
        paddingmedium ? "padding-medium" : ""
      } contentWithImage overflow-hidden`}
    >
      <div className="container">
        <div
          className={`${rowReverse ? "flex-row-reverse" : ""} ${
            featuredClass ? "featured" : ""
          } w-mainRow -ml-2.5 py-16 flex  items-center z-1 relative md:flex-wrap md:w-full md:ml-0 md:py-12`}
        >
          <div
            className={` content w-halfWidth mx-2.5 text-spaceBlack md:pl-0 md:w-full md:mx-0 md:mb-10 `}
            data-aos={animatContent}
            data-aos-delay="400"
            data-aos-duration="500"
          >
            {subtitle && (
              <h6 className={` text-[#8000FF] uppercase font-normal`}>
                {subtitle}
              </h6>
            )}
            {title && (
              <h2
                className={` font-medium xl-up:text-[45px] text-black mb-[30px] md:mb-[15px] `}
              >
                {title}
              </h2>
            )}

            <h3>
              {titleSpan && (
                <span className="text_gradient text-[35px] leading-[46px] tablet:text-[30px] tablet:leading-[42px] md:text-[27px] md:leading-[40px]">
                  {titleSpan}
                </span>
              )}
            </h3>
            {paragraphText &&
              paragraphText.map((item, index) => (
                <p
                  className="mt-5 text-black"
                  key={index}
                  dangerouslySetInnerHTML={{ __html: item.paragraph }}
                />
              ))}
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
                src={imageUrl}
                alt="img"
                // width={600}
                // height={500}
             priority
             layout="fill"
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
