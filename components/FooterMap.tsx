import React from "react";

interface FooterMapData {
  data: {
    iframeUrl: string;
  };
}

const FooterMap: React.FC<FooterMapData> = ({ data }) => {
  const { iframeUrl } = data;
  return (
    <section className="relative map  py-20 md:pb-0 md:pt-14">
      <div className="container px-5 mx-auto">
        <div className="map-area w-sectionGradient relative left-[-74px] h-[453px] rounded-[55px] overflow-hidden xl:w-full xl:left-auto xl:rounded-[30px] md:h-[320px] md:!rounded-none md:!w-[calc(100%+40px)] md:!left-[-20px] ">
          <iframe
            src={iframeUrl}
            width="600"
            height="460"
            loading="lazy"
            className="w-full h-full"
            title="FooterMap"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
export default FooterMap;
