import React from "react";

interface overviewProps {
  data: {
    subTitleHidden: boolean;
    subtitle: string;
    titleHidden: boolean;
    title: string;
    paragraph: string;
    paragraph2: string;
    bgExtraLightGray: boolean;
    bgWhite: boolean;
    maxWidthH5: boolean;
  };
}

const Overview: React.FC<overviewProps> = ({ data }) => {
  const {
    subTitleHidden,
    subtitle,
    titleHidden,
    title,
    paragraph,
    paragraph2,
    bgExtraLightGray,
    bgWhite,
    maxWidthH5,
  } = data;
  return (
    <>
      <section
        className={`${bgExtraLightGray === true ? "bg-extraLightGray" : ""} ${
          bgWhite === true ? "bg-white" : ""
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
              <h6
                className={`${
                  subTitleHidden === true ? "hidden" : ""
                } title text-[#8000FF] uppercase font-normal mb-3 md:mb-1`}
              >
                {subtitle}
              </h6>
              <h2
                className={`${
                  titleHidden === true ? "hidden " : ""
                } font-medium text-black mb-[38px]  md:mb-4`}
              >
                {title}
              </h2>
            </div>
            <div
              className="content w-full text-center relative"
              data-aos="fade-left"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h5
                className={` ${
                  maxWidthH5 === true ? "w-full max-w-[960px]  mx-auto" : ""
                } text-black font-light  `}
              >
                {paragraph}
              </h5>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Overview;
