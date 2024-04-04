import React from "react";
import Image from "next/image";
import Link from "next/link";

const BannerFourth: React.FC = () => {
  return (
    <>
      <section
        className={`banner banner-second banner-with-img banner_DarkOverlay banner_bg_img banner-with-img bg-darkBlue level-two text-white  md:items-baseline`}
        data-aos="fade-in"
        data-aos-delay="500"
        data-aos-duration="1000"
      >
        <div className="container">
          <div className="right_img absolute bottom-0 left-[45%] w-full max-w-[655px] h-[413px] z-[1] xl:w-[490px] xl:max-w-full xl:h-[310px] md:left-[14%] xs:left-0 ">
            <Image
              src="/our-clients/banner-img.png"
              width={700}
              height={500}
              alt="right-img"
              className=" w-full h-full object-cover"
            />
          </div>
          <div className="banner-contenr text-left">
            <h1>Our clients</h1>
            <Link
              href="/contact"
              className=" mt-[42px] gradient-btn mx-auto  lg:mt-5"
            >
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
export default BannerFourth;
