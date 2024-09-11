import React from "react";
import Image from "next/image";


const FooterMap: React.FC = () => {
  return (
    <section className="relative map  py-20 md:pb-0 md:pt-14">
      <div className="container px-5 mx-auto">
        <div className=" relative w-sectionGradient  h-[453px] left-[-74px] flex flex-wrap bg-white rounded-[55px] overflow-hidden xl:rounded-[30px] xl:w-full xl:left-auto tablet:h-[380px] md:!w-[calc(100%+40px)] md:!left-[-20px] phablet:h-[320px] md:!rounded-none sm:flex-col sm:h-auto ">
          <div className="map-area  relative w-[50%] h-full sm:w-full sm:h-[300px] ">
            <iframe
              src={'https://maps.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.5999680504724!2d-118.4755961742846!3d34.028477873166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bbfdc805103f%3A0xe2b048c364c959d1!2sSpaces%20-%20Water%20Garden!5e0!3m2!1sen!2sin!4v1703144756322!5m2!1sen!2sin'}
              width="600"
              height="460"
              loading="lazy"
              className="w-full h-full object-cover "
              title="FooterMap"
            ></iframe>
          </div>
          <div className="mapImageWrap relative w-[50%] h-full sm:w-full sm:max-h-[300px] ">
            <div className="imageWrap relative w-full h-full ">
              <Image
                src={'/santa-monica.webp'}
                width={900}
                height={500}
                alt="map_img"
                loading="lazy"
                className=" w-full h-full object-cover "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FooterMap;
