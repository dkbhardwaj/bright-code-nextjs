import React from "react";
import Image from "next/image";
import Link from "next/link";

interface bannerfourthData {
  data: {
    bannerImg: string;
    mainTitle: string;
    buttonUrl: string;
    buttonText: string;
  };
}

const BannerFourth: React.FC<bannerfourthData> = ({ data }) => {
  const { bannerImg, mainTitle, buttonUrl, buttonText } = data;
  return (
    <>
      <section
        className={`banner banner-second banner-with-img banner_DarkOverlay banner_bg_img banner-with-img bg-darkBlue level-two text-white  md:items-baseline`}
        data-aos="fade-in"
        data-aos-delay="500"
        data-aos-duration="1000"
      >
        <div className="container">
          {bannerImg && (
            <div className="right_img absolute bottom-0 left-[45%] w-full max-w-[655px] h-[413px] z-[1] xl:w-[490px] xl:max-w-full xl:h-[310px] md:left-[14%] xs:left-0 ">
              <Image
                src={bannerImg}
                width={700}
                height={500}
                loading="lazy"
                alt="right-img"
                className=" w-full h-full object-cover"
              />
            </div>
          )}
          <div className="banner-contenr text-left">
            {mainTitle && <h1>{mainTitle}</h1>}
            {buttonText && (
              <Link
                href={buttonUrl}
                className=" mt-[42px] gradient-btn mx-auto  lg:mt-5"
              >
                <span>{buttonText}</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default BannerFourth;
