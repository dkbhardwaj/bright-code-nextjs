import React from "react";
import Image from "next/image";
import Link from "next/link";

interface contentWithImageProps {
  data: {
    subTitleHidden: boolean;
    subtitle: string;
    titleHidden: boolean;
    title: string;
    titleSpan: string;
    paragraph: string;
    paragraph2: string;
    paragraph3: string;
    hiddenbutton: boolean;
    btnUrl: string;
    btnText: string;
    imageUrl: string;
    rowReverse: boolean;
    featuredClass: boolean;
    animatContent: string;
    animatImage: string;
    paddinglargebottom: boolean;
    paddingmedium: boolean;
  };
}

const ContentWithImageColTwo: React.FC<contentWithImageProps> = ({ data }) => {
  const {
    subTitleHidden,
    subtitle,
    titleHidden,
    title,
    titleSpan,
    paragraph,
    paragraph2,
    paragraph3,
    hiddenbutton,
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
    <>
      <section
        className={`${
          paddinglargebottom === true ? "padding-large-bottom" : ""
        } ${
          paddingmedium === true ? "padding-medium" : ""
        } contentWithImage overflow-hidden`}
      >
        <div className="container">
          <div
            className={`${rowReverse === true ? "flex-row-reverse" : ""} ${
              featuredClass === true ? "featured" : ""
            } w-mainRow -ml-2.5 py-16 flex  items-center z-1 relative md:flex-wrap md:w-full md:ml-0 md:py-12`}
          >
            <div
              className={` content w-halfWidth mx-2.5 text-spaceBlack md:pl-0 md:w-full md:mx-0 md:mb-10 `}
              data-aos={animatContent}
              data-aos-delay="400"
              data-aos-duration="500"
            >
              <h6
                className={`${
                  subTitleHidden === true ? "hidden" : ""
                } text-[#8000FF] uppercase font-normal`}
              >
                {subtitle}
              </h6>
              <h2
                className={` ${
                  titleHidden === true ? "hidden " : ""
                } font-medium xl-up:text-[45px] text-black mb-[30px] md:mb-[15px] `}
              >
                {title}
              </h2>
              <h3>
                <span className="text_gradient text-[35px] leading-[46px] tablet:text-[30px] tablet:leading-[42px] md:text-[27px] md:leading-[40px]">
                  {titleSpan}
                </span>
              </h3>
              <p className="mt-5 text-black">{paragraph}</p>
              <p className="mt-5  text-black">{paragraph2}</p>
              <p className="mt-5  text-black">{paragraph3}</p>
              <Link
                href={btnUrl}
                className={` ${
                  hiddenbutton === true ? "!hidden" : ""
                } mt-5 bgWhiteBtn gradient-btn mx-auto`}
              >
                <span>{btnText}</span>
              </Link>
            </div>
            <div className="content imageWrap-outer w-halfWidth mx-2.5 md:w-full md:mx-0">
              <div
                className="imageWrap w-full h-[458px] tablet:h-[280px] sm:h-[260px] relative overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient2 before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]"
                data-aos={animatImage}
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <Image
                  src={imageUrl}
                  alt="img"
                  width={600}
                  height={500}
                  className=" w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ContentWithImageColTwo;
