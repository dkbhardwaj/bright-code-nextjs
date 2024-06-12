import React from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

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
    btntext: string;
    btnUrl: string;
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
    btntext,
    btnUrl,
  } = data;

  const router = useRouter();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

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
              } ${
                paragraphContent ? "mb-0" : "mb-[38px] md:mb-[20px]"
              } font-medium text-black `}
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
                } ${
                  paragraphContent ? "mb-0" : "mb-[38px] md:mb-[20px]"
                } font-medium text-black `}
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
          {btntext && (
            <Link href={btnUrl} className=" mt-7 gradient-btn mx-auto">
              <span>{btntext}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
export default Introduction;
