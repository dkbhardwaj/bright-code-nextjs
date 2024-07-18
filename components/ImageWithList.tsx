import React from "react";

interface ImageWithListData {
  data: {
    title: string;
    listItem: {
      id: number;
      listContent: string;
    }[];
  };
}

const ImageWithList: React.FC<ImageWithListData> = ({ data }) => {
  const { title, listItem } = data;
  return (
    <section className=" image-with-list relative w-full overflow-hidden ">
      <div className="container">
        <div className="image-with-list-content flex justify-end pt-[74px] pb-[100px] md:featured md:justify-start lg:pt-14 lg:pb-20 md:!py-12 ">
          <div className="list-content relative w-full max-w-[526px] z-[5] md:max-w-[100%] ">
            {title && (
              <h2 className=" lg-up:text-[45px] mb-[42px] lg:mb-[36px] md:!mb-6 ">
                {title}
              </h2>
            )}
            {listItem && (
              <ul className=" list-none relative w-full block pl-[25px] ">
                {listItem.map((item, index) => (
                  <li
                    className=" font-light leading-[28px] "
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item.listContent }}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ImageWithList;
