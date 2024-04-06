import React from "react";
import Image from "next/image";
import Link from "next/link";

const BannerSecond: React.FC = () => {
  return (
    <>
      <section
        className={`banner banner-second banner_DarkOverlay banner_bg_img banner-with-img bg-darkBlue level-two text-white md:items-baseline`}
        data-aos="fade-in"
        data-aos-delay="500"
        data-aos-duration="1000"
      >
        <div className="container">
          <div className="left_img absolute bottom-0 left-[calc(65%-204px)] w-full max-w-[390px] h-[362px] z-[2] md:w-[330px] md:max-w-full md:h-[304px] md:left-[calc(42%-212px)]">
            <Image
              src="/why-choose-us/banner-left-img.png"
              width={400}
              height={400}
              loading="lazy"
              alt="left-img"
              className=" w-full h-full object-cover"
            />
          </div>
          <div className="right_img absolute bottom-0 left-[65.58%] w-full max-w-[350px] h-[350px] z-[1]  md:w-[304px] md:max-w-full md:h-[304px] md:left-[42%] ">
            <Image
              src="/why-choose-us/banner-right-img.png"
              width={400}
              height={400}
              loading="lazy"
              alt="right-img"
              className=" w-full h-full object-cover"
            />
          </div>
          <div className="banner-contenr text-left">
            <h1>Why choose us?</h1>
            <Link
              href="/contact"
              className=" mt-[42px] gradient-btn mx-auto lg:mt-5"
            >
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
export default BannerSecond;
