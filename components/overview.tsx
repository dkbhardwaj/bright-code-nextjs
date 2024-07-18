import React from "react";

interface OverviewProps {
  data: {
    textLeft: boolean;
    subtitle: string;
    title: string;
    titleSpan: string;
    titleWithSpan: string;
    bgExtraLightGray: boolean;
    bgWhite: boolean;
    maxWidthH5: boolean;
    noPaddingBottom: boolean;
    paddingLargeTop: boolean;
    paragraphText: {
      id: number;
      paragraph: string;
    }[];
  };
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  const {
    textLeft,
    subtitle,
    title,
    titleSpan,
    titleWithSpan,
    paragraphText,
    bgExtraLightGray,
    bgWhite,
    maxWidthH5,
    noPaddingBottom,
    paddingLargeTop,
  } = data;

  const sectionClasses = [
    bgExtraLightGray && "bg-extraLightGray",
    bgWhite && "bg-white",
    noPaddingBottom && "no-padding-bottom",
    paddingLargeTop && "padding-large-top",
    "overview py-20 md:py-12 overflow-x-hidden",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClasses}>
      <div className="container">
        <div className="w-full z-1 relative">
          <div
            className={` ${
              textLeft ? " !text-left" : ""
            } content w-full text-center relative`}
            data-aos="fade-right"
            data-aos-delay="400"
            data-aos-duration="600"
          >
            {subtitle && (
              <h6
                className={` title text-[#8000FF] uppercase font-normal mb-3 md:mb-1`}
              >
                {subtitle}
              </h6>
            )}
            {title && (
              <h2 className={` font-medium text-black mb-[38px]  md:mb-4`}>
                {titleSpan && (
                  <span className="text_gradient text-[50px] leading-[65px] desktop:text-[36px] desktop:leading-[60px] tablet:text-[33px] tablet:leading-[55px] md:text-[30px] md:leading-[50px] ">
                    {titleSpan}
                  </span>
                )}
                {title}
              </h2>
            )}
            {titleSpan && (
              <h2
                className={`  text-[45px]  mb-[50px] lg:mb-[36px] md:!mb-6  desktop:text-[36px] tablet:text-[33px] md:text-[30px]`}
              >
                <span className=" text_gradient2 text-[45px]  desktop:text-[36px] tablet:text-[33px] md:text-[30px] ">
                  {titleSpan}
                </span>
                {titleWithSpan}
              </h2>
            )}
          </div>
          <div
            className={` ${
              textLeft ? " !text-left" : ""
            } content w-full text-center relative`}
            data-aos="fade-left"
            data-aos-delay="400"
            data-aos-duration="600"
          >
            {paragraphText &&
              paragraphText.map((item, index) => (
                <h5
                  key={index}
                  className={` ${
                    maxWidthH5 ? "w-full max-w-[960px]  mx-auto" : ""
                  } text-black font-light mt-5  `}
                  dangerouslySetInnerHTML={{ __html: item.paragraph }}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Overview;
