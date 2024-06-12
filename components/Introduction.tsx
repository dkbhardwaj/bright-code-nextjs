import React from "react";

interface IntroductionProps {
  data: {
    subtitle: string;
    title: string;
    titleSpan: string;
    titleLarge: boolean;
    nopaddingbottom: boolean;
    titleWhite: boolean;
    paddingmediumbottom: boolean;
    paragraphContent: {
      id: number;
      paragraph: string;
    }[];
  };
}

const Introduction: React.FC<IntroductionProps> = ({ data }) => {
  const {
    subtitle,
    title,
    titleSpan,
    titleLarge,
    nopaddingbottom,
    titleWhite,
    paddingmediumbottom,
    paragraphContent,
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
          {titleSpan ? (
            <h2
              className={`${titleLarge ? "large" : ""} ${
                titleWhite ? "text-white" : ""
              } font-medium text-black mb-[38px] md:mb-[20px]`}
            >
              {title}
              <span className="text_gradient block text-[50px] leading-[65px] desktop:text-[36px] desktop:leading-[60px] tablet:text-[33px] tablet:leading-[55px] md:text-[30px] md:leading-[50px] ">
                {titleSpan}
              </span>
            </h2>
          ) : (
            title && (
              <h2
                className={`${titleLarge ? "large" : ""} ${
                  titleWhite ? "text-white" : ""
                } font-medium text-black mb-[38px] md:mb-[20px]`}
              >
                {title}
              </h2>
            )
          )}
          {paragraphContent &&
            paragraphContent.map((text, index) => (
              <h5
                key={index}
                className="text-black w-full max-w-[960px] mx-auto mt-5 "
                dangerouslySetInnerHTML={{ __html: text.paragraph }}
              />
            ))}
        </div>
      </div>
    </section>
  );
};
export default Introduction;
