import React from "react";
import Image from "next/image";
import Link from "next/link";
interface HeroBannerData {
  data: {
    bannerRightImg: string;
    bannerLeftImg: string;
    mainTitle: string;
    buttonUrl: string;
    buttonText: string;
  };
}

const Herobanner: React.FC<HeroBannerData> = ({ data }) => {
  const { bannerRightImg, bannerLeftImg, mainTitle, buttonUrl, buttonText } =
    data;
  return (
    <section
      className={`banner-with-img banner_overlay relative bg-[url("/banner-bg-img.svg")] bg-no-repeat bg-cover  overflow-x-hidden bg-darkBlue flex items-end text-white z-[1] pt-28 pb-24 min-h-[752px] desktop:min-h-[630px]  tablet:min-h-[560px] tablet:pt-24 tablet:pb-14 md:min-h-[552px]  md:pt-24 md:pb-12 md:items-center `}
    >
      {bannerRightImg && (
        <div className="right_img absolute bottom-0 left-[62%] w-full max-w-[538px] h-[536px] z-[1] desktop:max-w-[450px] desktop:h-[450px]  tablet:max-w-[400px] tablet:h-[400px] xl:left-[65%] md:h-[310px] md:max-w-[325px] md:!left-auto md:right-[calc(35%-200px)] ">
          <Image
            src={bannerRightImg}
            width={550}
            height={550}
            // loading="lazy"
            loading="eager"
            alt="right-img"
            className=" w-full h-full object-cover"
          />
        </div>
      )}
      {bannerLeftImg && (
        <div className="left_img absolute bottom-0 right-[61%] w-full max-w-[526px] h-[506px] z-[1] desktop:max-w-[450px] desktop:h-[450px]  tablet:max-w-[400px] tablet:h-[400px] xl:right-[65%] md:h-[310px] md:max-w-[325px] md:!right-[35%] ">
          <Image
            src={bannerLeftImg}
            width={550}
            height={550}
            // loading="lazy"
            loading="eager"
            alt="left-img"
            className=" w-full h-full object-cover"
          />
        </div>
      )}
      <div className="container">
        <div className="w-full max-w-[574px] mx-auto relative z-[2] text-center">
          {mainTitle && (
            <h1
              className="header-h1 text-white "
              // data-aos="fade-left"
              // data-aos-delay="400"
              // data-aos-duration="500"
            >
              {mainTitle}
            </h1>
          )}
          {buttonText && (
            <Link
              href={buttonUrl}
              className=" mt-14 gradient-btn mx-auto md:mt-6"
              // data-aos="fade-right"
              // data-aos-delay="300"
              // data-aos-duration="300"
            >
              <span>{buttonText}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
export default Herobanner;
