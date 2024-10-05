import React from "react";
import Image from "next/image";

interface ImageWithListData {
  data: {
    title: string;
    markdown: string;
    backgroundImage: any;
  };
}

const ImageWithList: React.FC<ImageWithListData> = ({ data }) => {
  const { title, markdown, backgroundImage } = data;
  const bgImage  = backgroundImage ? `https:${backgroundImage?.fields?.file?.url}` : "/case-study/man-img.png"
  
  return (
    <section className=" image-with-list relative w-full overflow-hidden ">
      <div className="container">
        <div
          className="relative flex justify-end pt-[74px] pb-[100px] md:featured md:justify-start lg:pt-14 lg:pb-20 md:!py-12 "
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-duration="500"
        >
          <div className="image-with-list-content">
              <Image
                src={`${bgImage}`}
                width={2500}
                height={1200}
                alt="bg-img"
                className=" w-full h-full object-cover object-center "
                loading="lazy"
              />
          </div>
          <div className="list-content relative w-full max-w-[526px] z-[5] md:max-w-[100%] ">
            {title && (
              <h2 className=" lg-up:text-[45px] mb-[42px] lg:mb-[36px] md:!mb-6 ">
                {title}
              </h2>
            )}
            {markdown && (
              <div className="relative pl-[25px]" dangerouslySetInnerHTML={{ __html: markdown }}/>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ImageWithList;
