import React from "react";
import Image from "next/image";

interface FooterMapData {
  data: {
    iframeUrl: string;
    mapImageUrl: string;
  };
}

const FooterMap: React.FC<FooterMapData> = ({ data }) => {
  const { iframeUrl, mapImageUrl } = data;
  return (
    <section className="relative map  py-20 md:pb-0 md:pt-14">
      <div className="container px-5 mx-auto">
        <div className=" relative w-sectionGradient  h-[453px] left-[-74px] flex flex-wrap bg-white rounded-[55px] overflow-hidden xl:rounded-[30px] xl:w-full xl:left-auto tablet:h-[380px] md:!w-[calc(100%+40px)] md:!left-[-20px] phablet:h-[320px] md:!rounded-none sm:flex-col sm:h-auto ">
          <div className="map-area  relative w-[50%] h-full sm:w-full sm:h-[300px] ">
            <iframe
              src={iframeUrl}
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
                src={mapImageUrl}
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
