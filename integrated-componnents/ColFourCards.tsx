import React from "react";
import Image from "next/image";

interface ColFourCardData {
  data: {
      id: number;
      iconWithTextBlock: {
        fields:{
          cardImage:{
            fields:{
              file:{
                url:string;
              }
            }
          }
          heading:string;
        }
      }[];
      sectionPadding:any;
  };
}

const ColFourCards: React.FC<ColFourCardData> = ({ data }) => {

  const padding = (data?.sectionPadding?.fields?.padding)?.join(" ")
  
  return (
    <section className={`colFourCards ${padding} overflow-hidden md:pb-14`}>
      <div className="container">
        <div className="w-mainRow -ml-2.5 flex flex-wrap items-center z-1 relative md:w-full md:ml-0">
          {data?.iconWithTextBlock.map((item,index) => (
            <div
              className="col_four w-colFour mx-[0.5rem] mb-10 text-spaceBlack xl:w-halfWidth md:!w-full md:mx-0 md:px-0 text-center"
              data-aos="fade-up"
              data-aos-delay={400}
              data-aos-duration={500}
              key={index}
            >
              {item.fields?.cardImage?.fields?.file?.url && (
                <div className="icon-wrap mx-auto max-w-[41px] h-[41px] before:content-[''] relative mt-[15px] mb-9 before:absolute before:left-[-15px] before:top-[-15px] before:w-iconBeforeW before:h-iconBeforeH before:bg-[#ffffff2b] before:rounded-[15px] before:transition-colors before:duration-500 hover:before:bg-purplePink">
                  <Image
                    src={`https:${item.fields?.cardImage?.fields?.file?.url}`}
                    alt="icon"
                    width={45}
                    height={45}
                    loading="lazy"
                    className="w-full h-full object-contain relative z-10"
                  />
                </div>
              )}
              {item.fields?.heading && <h5 className="text-white">{item.fields?.heading}</h5>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ColFourCards;
