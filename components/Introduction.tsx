import React from "react";

interface IntroductionProps {
  data: {
    subtitle: string;
    title: string;
    titleSpan: string;
    paragraph: string;
    titleLarge: boolean;
    nopaddingbottom: boolean;
    titleWhite: boolean;
    paddingmediumbottom: boolean;
  };
}

const Introduction: React.FC<IntroductionProps> = ({ data }) => {
  const {
    subtitle,
    title,
    titleSpan,
    paragraph,
    titleLarge,
    nopaddingbottom,
    titleWhite,
    paddingmediumbottom,
  } = data;

  return (
    <section
      className={`${nopaddingbottom ? "no-padding-bottom" : ""} ${
        paddingmediumbottom ? "padding-medium-bottom" : ""
      } intro padding-large-top padding-medium-bottom  text-center overflow-x-hidden`}
      id="why-choose-us"
    >
      <div className="container">
        <div className="w-full mx-auto">
          {subtitle && (
            <h6 className="text-[#8000FF] uppercase font-normal mb-3 md:mb-1">
              {subtitle}
            </h6>
          )}
          <h2
            className={`${titleLarge ? "large" : ""} ${
              titleWhite ? "text-white" : ""
            } font-medium text-black mb-[38px] md:mb-[20px]`}
          >
            {title} <br />
            {titleSpan && (
              <span className="text_gradient text-[50px] leading-[65px] desktop:text-[36px] desktop:leading-[60px] tablet:text-[33px] tablet:leading-[55px] md:text-[30px] md:leading-[50px] ">
                {titleSpan}
              </span>
            )}
          </h2>
          {paragraph && (
            <h5 className="text-black w-full max-w-[960px] mx-auto">
              {paragraph}
            </h5>
          )}
        </div>
      </div>
    </section>
  );
};
export default Introduction;
