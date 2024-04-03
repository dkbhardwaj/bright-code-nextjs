import React from "react";

const BannerThird: React.FC = () => {
  return (
    <>
      <section
        className={`banner banner-second banner_DarkOverlay banner_bg_img bg-darkBlue level-two text-white `}
        data-aos="fade-in"
        data-aos-delay="500"
        data-aos-duration="1000"
      >
        <div className="container">
          <div className="w-full text-center relative z-10">
            <h1>What we do?</h1>
          </div>
        </div>
      </section>
    </>
  );
};
export default BannerThird;
