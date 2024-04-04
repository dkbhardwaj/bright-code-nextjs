import React from "react";

const ImageWithList: React.FC = () => {
  return (
    <>
      <section className=" image-with-list relative w-full overflow-hidden ">
        <div className="container">
          <div className="image-with-list-content flex justify-end pt-[74px] pb-[100px] md:featured md:justify-start lg:pt-14 lg:pb-20 md:!py-12 ">
            <div className="list-content relative w-full max-w-[526px] z-[5] md:max-w-[100%] ">
              <h2 className=" lg-up:text-[45px] mb-[42px] lg:mb-[36px] md:!mb-6 ">
                Key Takeaways
              </h2>
              <ul className=" list-none relative w-full block pl-[25px] ">
                <li className=" font-light leading-[28px] ">
                  Better climate governance
                </li>
                <li className=" font-light leading-[28px] ">
                  Insurer is well-positioned to meet climate-related disclosure
                  requirements
                </li>
                <li className=" font-light leading-[28px] ">
                  Insurer demonstrated leadership and satisfied investor and
                  stakeholder concerns
                </li>
                <li className=" font-light leading-[28px] ">
                  Project expanded to encompass different perils and regions
                </li>
                <li className=" font-light leading-[28px] ">
                  Factors unrelated to climate changes, for example increases in
                  exposure, are likely to be a more meaningful driver of
                  near-term risk
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ImageWithList;
