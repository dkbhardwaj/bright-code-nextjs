import React from "react";
import Image from "next/image";
import Link from "next/link";

const IntroWithCards: React.FC = () => {
  return (
    <>
      <section className="introWithCards">
        <div className="container">
          <div className="w-mainRow -ml-2.5 flex flex-wrap sm:w-full sm:ml-0">
            <div
              className={`w-threeCard mx-2.5 mb-5 tablet:w-halfWidth phablet:w-halfWidth sm:w-full sm:mx-0`}
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="400"
            >
              <div className="card bg-white h-full ">
                <div className="relative imageWrap group h-[260px] tablet:h-[220px] phablet:h-[220px] sm:h-[200px] overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]">
                  <Link className="redirect" href={`#`}>
                    .
                  </Link>
                  <Image
                    className="object-cover transition-transform duration-300 group-hover:scale-105  h-full w-full"
                    src="/what-we-do/col-two2-img1.png"
                    width={400}
                    height={300}
                    alt="Agency to agency services"
                  />
                </div>
                <div className="textWrap py-9 px-5 md:py-5 sm:px-0 ">
                  <p className=" text-black line-clamp-[10] overflow-hidden text-overflow-ellipsis ">
                    The insurer was already using Moody’s RMS catastrophe models
                    across its business, which were embedded into its
                    underwriting and corporate management process. However,
                    “bending its EP curve” would not deliver the insights needed
                    to capture future climate change risk and drive strategic
                    decision-making. While the insurer was an industry leader in
                    understanding and quantifying.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`w-threeCard mx-2.5 mb-5 tablet:w-halfWidth phablet:w-halfWidth sm:w-full sm:mx-0`}
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-duration="500"
            >
              <div className="card bg-white h-full">
                <div className="relative imageWrap group h-[260px] tablet:h-[220px] phablet:h-[220px] sm:h-[200px] overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]">
                  <Link className="redirect" href={`#`}>
                    .
                  </Link>
                  <Image
                    className="object-cover transition-transform duration-300 group-hover:scale-105 h-full w-full"
                    src="/what-we-do/col-two2-img3.png"
                    width={400}
                    height={300}
                    alt="Client Centric development"
                  />
                </div>
                <div className="textWrap py-9 px-5 md:py-5 sm:px-0 ">
                  <p className=" text-black line-clamp-[10] overflow-hidden text-overflow-ellipsis ">
                    The project kicked off looking at North American Hurricane
                    and Australian Cyclone, assessing three specific time
                    horizons: 2030, 2050 and 2100. Moody’s RMS analysts worked
                    with the carrier’s internal catastrophe modeling and
                    exposure management team, analyzing a Representative
                    Concentration Pathway (RCP) scenario for future greenhouse
                    gas concentrations awrad...
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`w-threeCard mx-2.5 mb-5 tablet:w-halfWidth phablet:w-halfWidth sm:w-full sm:mx-0 sm:mb-0`}
              data-aos="fade-up"
              data-aos-delay="600"
              data-aos-duration="600"
            >
              <div className="card bg-white h-full">
                <div className="relative imageWrap group h-[260px] tablet:h-[220px] phablet:h-[220px] sm:h-[200px] overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]">
                  <Link className="redirect" href={`#`}>
                    .
                  </Link>
                  <Image
                    className="object-cover transition-transform duration-300 group-hover:scale-105 h-full w-full"
                    src="/why-choose-us/col-two-img2.png"
                    width={400}
                    height={300}
                    alt="Empowering designers"
                  />
                </div>
                <div className="textWrap py-9 px-5 md:py-5 sm:px-0 ">
                  <p className=" text-black line-clamp-[10] overflow-hidden text-overflow-ellipsis ">
                    The company felt Moody’s RMS was best positioned to
                    interpret scientific consensus around climate change and its
                    likely impact on physical risk from natural perils. Working
                    with Moody’s RMS also offered stakeholders an "external seal
                    of approval," enabling the organization to demonstrate that
                    it had worked with industry-leading analysts and taken
                    concrete steps to build a clear view of how climate
                    change...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default IntroWithCards;
