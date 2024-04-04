import React from "react";

interface overviewProps {
  data: {
    subtitle: string;
    title: string;
    paragraph: string;
    paragraph2: string;
    bgExtraLightGray: boolean;
    bgWhite: boolean;
    maxWidthH5: boolean;
    noPaddingBottom: boolean;
    paddingLargeTop: boolean;
  };
}

const Overview: React.FC<overviewProps> = ({ data }) => {
  const {
    subtitle,
    title,
    paragraph,
    paragraph2,
    bgExtraLightGray,
    bgWhite,
    maxWidthH5,
    noPaddingBottom,
    paddingLargeTop,
  } = data;
  return (
    <>
      <section
        className={`${bgExtraLightGray === true ? "bg-extraLightGray" : ""} ${
          bgWhite === true ? "bg-white" : ""
        } ${noPaddingBottom === true ? "no-padding-bottom" : ""}  ${
          paddingLargeTop === true ? "padding-large-top" : ""
        } overview  py-20 md:py-12 overflow-x-hidden `}
      >
        <div className="container">
          <div className="w-full z-1 relative">
            <div
              className="content w-full text-center relative"
              data-aos="fade-right"
              data-aos-delay="500"
              data-aos-duration="1000"
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
                  {title}
                </h2>
              )}
            </div>
            <div
              className="content w-full text-center relative"
              data-aos="fade-left"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              {paragraph && (
                <h5
                  className={` ${
                    maxWidthH5 === true ? "w-full max-w-[960px]  mx-auto" : ""
                  } text-black font-light  `}
                >
                  {paragraph}
                </h5>
              )}
              {paragraph2 && (
                <h5
                  className={` ${
                    maxWidthH5 === true ? "w-full max-w-[960px]  mx-auto" : ""
                  } text-black font-light mt-5 md:mt-3  `}
                >
                  {paragraph2}
                </h5>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Overview;
