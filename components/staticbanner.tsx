import React from "react";
import Link from "next/link";

const HeroBanner: React.FC = () => {
  return (
    <section className={`banner bg-purple text-white min-h-[530px] py-12`}>
      <div className="container">
        <div className="w-mainRow -ml-2.5 flex items-center">
          <div className="w-halfWidth mx-2.5">
            <div className="content">
              <h1>Empowering Your Digital Success </h1>
              {/* <h4 className={`max-w-[350px] mt-2`}>
                Free Reactstrap UI Kit with Lots of Ready to Use Sections
              </h4> */}
              <div className="btnWrap mt-8 inline-block">
                <Link href="#" className="blue-btn">
                  Download Free
                </Link>
              </div>
              {/* <div className="btnWrap mt-8 ml-5 inline-block">
                <Link href="#" className="transparent-btn">
                  Download Free
                </Link>
              </div> */}
            </div>
          </div>
          <div className="w-halfWidth mx-2.5">
            <div className="imgwrap">
              <img src="/banner-img.png" alt="banner_img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
