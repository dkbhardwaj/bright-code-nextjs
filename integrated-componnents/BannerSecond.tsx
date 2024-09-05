import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BannerSecondData {
  data: {
    bannerLeftImg: string;
    bannerRightImg: string;
    bannerOneImg: string;
    mainTitle: string;
    buttonUrl: string;
    buttonText: string;
    paragraphContent: {
      id: number;
      paragraph: string;
    }[];
  };
}

const BannerSecond: React.FC<BannerSecondData> = ({ data }) => {
  const {
    bannerLeftImg,
    bannerRightImg,
    bannerOneImg,
    mainTitle,
    paragraphContent,
    buttonUrl,
    buttonText,
  } = data;

  const hasImages = bannerLeftImg || bannerRightImg;
  const hasnotImages = !bannerLeftImg && !bannerRightImg && !bannerOneImg;

  return (
    <section
      className={` banner-second banner_DarkOverlay banner_bg_img  bg-darkBlue text-white md:items-baseline ${
        hasnotImages ? "" : "banner-with-img"
      }`}
      data-aos="fade-in"
      data-aos-delay="500"
      data-aos-duration="1000"
    >
      <div className="container">
        {hasImages ? (
          <>
            {bannerLeftImg && (
              <div className="left_img absolute bottom-0 left-[calc(65%-204px)] w-full max-w-[390px] h-[362px] z-[2] md:w-[330px] md:max-w-full md:h-[304px] md:left-[calc(42%-212px)]">
                <Image
                  src={bannerLeftImg}
                  width={400}
                  height={400}
                  loading="lazy"
                  alt="left-img"
                  className=" w-full h-full object-cover"
                />
              </div>
            )}
            {bannerRightImg && (
              <div className="right_img absolute bottom-0 left-[65.58%] w-full max-w-[350px] h-[350px] z-[1]  md:w-[304px] md:max-w-full md:h-[304px] md:left-[42%] ">
                <Image
                  src={bannerRightImg}
                  width={400}
                  height={400}
                  loading="lazy"
                  alt="right-img"
                  className=" w-full h-full object-cover"
                />
              </div>
            )}
            <div className="banner-content text-left">
              {mainTitle && <h1 className=" text-white ">{mainTitle}</h1>}
              {buttonText && (
                <Link
                  href={buttonUrl}
                  className=" mt-[42px] gradient-btn mx-auto lg:mt-5"
                >
                  <span>{buttonText}</span>
                </Link>
              )}
            </div>
          </>
        ) : bannerOneImg ? (
          <>
            <div className="right_img absolute bottom-0 left-[45%] w-full max-w-[655px] h-[413px] z-[1] xl:w-[490px] xl:max-w-full xl:h-[310px] md:left-[14%] xs:left-0 ">
              <Image
                src={bannerOneImg}
                width={700}
                height={500}
                loading="lazy"
                alt="right-img"
                className=" w-full h-full object-cover"
              />
            </div>
            <div className="banner-content text-left">
              {mainTitle && <h1 className=" text-white ">{mainTitle}</h1>}
              {buttonText && (
                <Link
                  href={buttonUrl}
                  className=" mt-[42px] gradient-btn mx-auto lg:mt-5"
                >
                  <span>{buttonText}</span>
                </Link>
              )}
            </div>
          </>
        ) : (
          <div className="w-full text-center relative z-10">
            {mainTitle && <h1 className="text-white">{mainTitle}</h1>}
            {paragraphContent &&
              paragraphContent.map((text, index) => (
                <p
                  key={index}
                  className="text-white opacity-[0.6] mt-5 "
                  dangerouslySetInnerHTML={{ __html: text.paragraph }}
                />
              ))}
            {buttonText && (
              <Link
                href={buttonUrl}
                className=" mt-[42px] gradient-btn mx-auto lg:mt-5"
              >
                <span>{buttonText}</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
export default BannerSecond;
