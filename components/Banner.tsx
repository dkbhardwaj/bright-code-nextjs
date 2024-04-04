import React from "react";

const Banner: React.FC = () => {
  return (
    <>
      <section
        className={`banner banner_third relative overflow-x-hidden bg-darkBlue level-two flex items-center text-white pt-28 pb-10 min-h-[752px] bg-[url('/case-study/banner-bg-img.png')] bg-center bg-cover bg-no-repeat desktop:min-h-[630px]  tablet:min-h-[560px] tablet:pt-24 md:min-h-[552px]  md:pt-24  md:items-center `}
      >
        <div className="container">
          <div
            className="w-full max-w-[490px] relative z-[5] text-left"
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-duration="400"
          >
            <h6 className=" text-white mb-2 ">CASE STUDY</h6>
            <h1 className="header-h1 lg-up:text-[45px] lg-up:leading-[60px] text-white mb-[30px]  lg:mb-5 ">
              Taking the Lead on Climate Change Risk
            </h1>
            <p className=" lg-up:text-[18px] font-medium text-[#ababab] lg-up:leading-[30px] ">
              How a major global insurance company used innovative climate
              change solutions from Moody’s RMS to measure the impact of
              physical climate risk on its book of business and get ahead of the
              curve on climate disclosure reporting.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
export default Banner;
