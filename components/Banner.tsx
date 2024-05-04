import React from "react";
import Image from "next/image";

interface bannerData {
  data: {
    subTitle: string;
    mainTitle: string;
    description: string;
  };
}

const Banner: React.FC<bannerData> = ({ data }) => {
  const { subTitle, mainTitle, description } = data;
  return (
    <>
      <section
        className={`banner banner_third relative overflow-x-hidden bg-darkBlue level-two flex items-center text-white pt-28 pb-10 min-h-[752px]  desktop:min-h-[630px]  tablet:min-h-[560px] tablet:pt-24 md:min-h-[552px]  md:pt-24  md:items-center `}
      >
        <div className="bannerBgImage absolute top-0 left-0 w-full h-full  ">
          <Image
            src="/case-study/banner-bg-img.png"
            width={2500}
            height={1200}
            alt="bg-img"
            className=" w-full h-full object-cover object-center "
          />
        </div>
        <div className="container">
          <div
            className="w-full max-w-[490px] relative z-[5] text-left"
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-duration="400"
          >
            {subTitle && <h6 className=" text-white mb-2 ">{subTitle}</h6>}
            {mainTitle && (
              <h1 className="header-h1 lg-up:text-[45px] lg-up:leading-[60px] text-white mb-[30px]  lg:mb-5 ">
                {mainTitle}
              </h1>
            )}
            {description && (
              <p
                className=" lg-up:text-[18px] font-medium text-[#ababab] lg-up:leading-[30px] "
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default Banner;