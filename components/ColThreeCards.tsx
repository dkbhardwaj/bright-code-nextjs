import React from "react";
import Image from "next/image";
import Link from "next/link";

const ColThreeCards: React.FC = () => {
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
                    src="/home/col-three-img1.png"
                    width={400}
                    height={300}
                    alt="Agency to agency services"
                  />
                </div>
                <div className="textWrap py-9 px-5 text-center md:p-5">
                  <h4 className="text-black">Collaborative</h4>
                  <span className="text-gray font-light mt-[30px] line-clamp-4 text-ellipsis text-[15px] leading-[26px] md:text-[14px] md:leading-[22px] md:mt-4 ">
                    Our agency thrives on the synergy of collaboration. We step
                    into the role of your dedicated development partner, filling
                    a crucial gap in your service offerings.
                  </span>
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
                    src="/home/col-three-img2.png"
                    width={400}
                    height={300}
                    alt="Client Centric development"
                  />
                </div>
                <div className="textWrap py-9 px-5 text-center md:p-5">
                  <h4 className="text-black">Client-Centric</h4>
                  <span className="text-gray font-light mt-[30px] line-clamp-4 text-ellipsis  text-[15px] leading-[26px] md:text-[14px] md:leading-[22px] md:mt-4 ">
                    We know that clients are your ultimate consideration. We
                    ensure that the websites we develop not only meet but exceed
                    the end-users needs.
                  </span>
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
                    src="/home/col-three-img3.png"
                    width={400}
                    height={300}
                    alt="Empowering designers"
                  />
                </div>
                <div className="textWrap py-9 px-5 text-center md:p-5">
                  <h4 className="text-black">Empowering</h4>
                  <span className="text-gray font-light mt-[30px] line-clamp-4 text-ellipsis  text-[15px] leading-[26px] md:text-[14px] md:leading-[22px] md:mt-4 ">
                    Our mission is to empower designers. We understand that a
                    design's potential can only be fully realized when paired
                    with a capable development team.
                  </span>
                </div>
              </div>
            </div>

            <Link href="/whychooseus" className=" mt-7 gradient-btn mx-auto">
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
export default ColThreeCards;
