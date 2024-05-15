import React from "react";

interface BannerThirdProps {
  data: {
    title: string;
  };
}

const BannerThird: React.FC<BannerThirdProps> = ({ data }) => {
  const { title } = data;
  return (
    <section
      className={` banner-second banner_DarkOverlay banner_bg_img bg-darkBlue text-white `}
      data-aos="fade-in"
      data-aos-delay="500"
      data-aos-duration="1000"
    >
      <div className="container">
        <div className="w-full text-center relative z-10">
          {title && <h1 className=" text-white ">{title}</h1>}
        </div>
      </div>
    </section>
  );
};
export default BannerThird;
