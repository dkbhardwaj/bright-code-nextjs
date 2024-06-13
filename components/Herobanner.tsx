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
      className={`banner-with-img banner_overlay relative  overflow-x-hidden bg-darkBlue flex items-end text-white z-[1] pt-28 pb-24 min-h-[752px] desktop:min-h-[630px]  tablet:min-h-[560px] tablet:pt-24 tablet:pb-14 md:min-h-[552px]  md:pt-24 md:pb-12 md:items-center `}
    >
      <div className="bg_image absolute top-0 left-0 w-full h-full ">
        <Image
          src="/banner-bg-img.svg"
          width={2500}
          height={900}
          alt="bg-img"
          className=" w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>
      <div className="container">
        {bannerLeftImg && (
          <div className="left_img absolute bottom-0 right-[60%] w-full max-w-[526px] h-[506px] z-[1] desktop:max-w-[450px] desktop:h-[450px]  tablet:max-w-[400px] tablet:h-[400px] xl:right-auto tablet:left-0 md:h-[310px] md:max-w-[325px]  md:left-[50%] md:translate-x-[-50%] ">
            <Image
              src={bannerLeftImg}
              // width={550}
              // height={550}
              // loading="lazy"
              alt="left-img"
              className=" w-full h-full object-cover"
              priority
              layout="fill" // Fills container while maintaining aspect ratio
              objectFit="cover"
              quality={80}
            />
          </div>
        )}
        <div className="w-full max-w-[750px] ml-auto relative z-[2] text-left xl:max-w-full desktop:w-[calc(100%-450px)] tablet:w-[calc(100%-400px)] md:text-center md:mx-auto ">
          {mainTitle && <h1 className="header-h1 text-white ">{mainTitle}</h1>}
          {buttonText && (
            <Link
              href={buttonUrl}
              className=" mt-14 gradient-btn mx-auto md:mt-6"
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
