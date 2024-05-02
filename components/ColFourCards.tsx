import React from "react";
import Image from "next/image";

interface colFourCardData {
  data: {
    colFour: {
      id: number;
      iconUrl: string;
      title: string;
      paragraph: string;
    }[];
  };
}

const ColFourCards: React.FC<colFourCardData> = ({ data }) => {
  return (
    <section className="colFourCards pb-24 overflow-hidden md:pb-14">
      <div className="container">
        <div className="w-mainRow -ml-2.5 flex flex-wrap items-center z-1 relative md:w-full md:ml-0">
          {data?.colFour.map((item) => (
            <div
              className="col_four w-colFour mx-2.5 mb-10 text-spaceBlack xl:w-halfWidth md:!w-full md:mx-0 md:px-0 text-center"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="500"
              key={item.id}
            >
              <div className="icon-wrap mx-auto max-w-[41px] h-[41px] before:content-[''] relative mt-[15px] mb-9 before:absolute before:left-[-15px] before:top-[-15px] before:w-iconBeforeW before:h-iconBeforeH before:bg-[#ffffff2b] before:rounded-[15px] before:transition-colors before:duration-500 hover:before:bg-purplePink">
                <Image
                  src={item.iconUrl}
                  alt="icon"
                  width={45}
                  height={45}
                  loading="lazy"
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
              <h5 className="text-white">{item.title}</h5>
              <p
                className="mt-4 text-[15px] text-lightGray leading-[26px] "
                dangerouslySetInnerHTML={{ __html: item.paragraph }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ColFourCards;
