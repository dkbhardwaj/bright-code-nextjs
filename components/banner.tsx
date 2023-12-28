// Banner.jsx
import React from "react";

// Assuming a structure for the blade objects
interface Blade {
  bladeTitle: string;
  level: string;
  bladeItems: Array<{ title: string; blurb: string }>;
  bgColor: string;
  imgPath: string;
  textAlignment: string;
  ctaLink: string;
  ctaText: string;
  ctaClass: string;
}

// Define a type for the props of the Banner component
interface BannerProps {
  data: Blade;
}

const Banner: React.FC<BannerProps> = ({ data }) => {
  // console.log(data?.bladeItems[0]?.title);

  return (
    <section
      className={`banner ${
        data.bgColor ? `bg-${data.bgColor}` : ""
      } ${
        data.level ? `level-${data.level}` : ""
      } text-white min-h-[530px] py-12`}
    >
      <div className="container">
        <div className="w-mainRow -ml-2.5 flex items-center">
          <div
            className={`${
              data.textAlignment ? `text-${data.textAlignment}` : ""
            } ${data.level === "two" ? `w-full` : "w-halfWidth"} ${
              !data.level ? `mx-2.5` : ""
            }`}
          >
            <div className="content">
              {data.bladeItems[0].title && (
                <h1>{data?.bladeItems[0]?.title}</h1>
              )}
              {data.bladeItems[0].blurb && <p>{data?.bladeItems[0]?.blurb}</p>}
              {data.bladeItems[0].title && (
                <div className="btnWrap mt-8 inline-block">
                  <a href={data.ctaLink} className={data.ctaClass}>
                    {data.ctaText}
                  </a>
                </div>
              )}
            </div>
          </div>
          {data.imgPath && (
            <div className="w-halfWidth mx-2.5">
              <div className="imgwrap">
                <img src={data.imgPath} alt="banner_img" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
