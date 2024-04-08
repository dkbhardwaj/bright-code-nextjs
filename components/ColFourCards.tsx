import React from "react";
import Image from "next/image";
import Link from "next/link";

const ColFourCards: React.FC = () => {
  return (
    <>
      <section className="colFourCards pb-24 overflow-hidden md:pb-14  ">
        <div className="container">
          <div className="w-mainRow -ml-2.5 flex flex-wrap items-center z-1 relative md:w-full md:ml-0">
            <div
              className="content w-colFour mx-2.5 mb-10 text-spaceBlack xl:w-halfWidth md:!w-full md:mx-0 md:px-0 text-center"
              // data-aos="fade-up"
              // data-aos-delay="400"
              // data-aos-duration="500"
            >
              <div className="icon-wrap mx-auto max-w-[41px] h-[41px] before:content-[''] relative mt-[15px] mb-9 before:absolute before:left-[-15px] before:top-[-15px] before:w-iconBeforeW before:h-iconBeforeH before:bg-[#ffffff2b] before:rounded-[15px] before:transition-colors before:duration-500 hover:before:bg-purplePink">
                <Image
                  src="/icon-star.svg"
                  alt="icon"
                  width={45}
                  height={45}
                  loading="lazy"
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
              <h5 className="text-white">Expertise</h5>
              <p className="mt-4 text-[15px] text-lightGray leading-[26px] ">
                Our unwavering commitment to expertise signifies the depth of
                knowledge and skill we bring to every project.
              </p>
            </div>
            <div
              className="content w-colFour mx-2.5 mb-10 text-spaceBlack xl:w-halfWidth md:!w-full md:mx-0 md:px-0 text-center"
              // data-aos="fade-up"
              // data-aos-delay="500"
              // data-aos-duration="500"
            >
              <div className="icon-wrap mx-auto max-w-[41px] h-[41px] before:content-[''] relative mt-[15px] mb-9 before:absolute before:left-[-15px] before:top-[-15px] before:w-iconBeforeW before:h-iconBeforeH before:bg-[#ffffff2b] before:rounded-[15px] before:transition-colors before:duration-500 hover:before:bg-purplePink">
                <Image
                  src="/icon-partnership.svg"
                  alt="icon"
                  width={45}
                  height={45}
                  loading="lazy"
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
              <h5 className="text-white">Collaborative approach</h5>
              <p className="mt-4 text-[15px] text-lightGray leading-[26px]">
                Collaboration is in our DNA. We believe that the best solutions
                emerge when diverse minds come together.
              </p>
            </div>
            <div
              className="content w-colFour mx-2.5 mb-10 text-spaceBlack xl:w-halfWidth md:!w-full md:mx-0 md:px-0 text-center"
              // data-aos="fade-up"
              // data-aos-delay="500"
              // data-aos-duration="500"
            >
              <div className="icon-wrap mx-auto max-w-[41px] h-[41px] before:content-[''] relative mt-[15px] mb-9 before:absolute before:left-[-15px] before:top-[-15px] before:w-iconBeforeW before:h-iconBeforeH before:bg-[#ffffff2b] before:rounded-[15px] before:transition-colors before:duration-500 hover:before:bg-purplePink">
                <Image
                  src="/icon-certificate.svg"
                  alt="icon"
                  width={45}
                  height={45}
                  loading="lazy"
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
              <h5 className="text-white">Commitment to excellence</h5>
              <p className="mt-4 text-[15px] text-lightGray leading-[26px]">
                Excellence is not just a principle; it's the essence of Bright
                Code. We infuse it into the interactions with our clients.
              </p>
            </div>
            <div
              className="content w-colFour mx-2.5 mb-10  text-spaceBlack xl:w-halfWidth md:!w-full md:mx-0 md:px-0 text-center"
              // data-aos="fade-up"
              // data-aos-delay="500"
              // data-aos-duration="500"
            >
              <div className="icon-wrap mx-auto max-w-[41px] h-[41px] before:content-[''] relative mt-[15px] mb-9 before:absolute before:left-[-15px] before:top-[-15px] before:w-iconBeforeW before:h-iconBeforeH before:bg-[#ffffff2b] before:rounded-[15px] before:transition-colors before:duration-500 hover:before:bg-purplePink">
                <Image
                  src="/icon-idea.svg"
                  alt="icon"
                  width={45}
                  height={45}
                  loading="lazy"
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
              <h5 className="text-white">Innovation</h5>
              <p className="mt-4 text-[15px] text-lightGray leading-[26px]">
                We embrace a culture of continuous improvement, staing ahead of
                technological advancements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ColFourCards;
