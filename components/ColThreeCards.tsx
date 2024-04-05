import React from "react";
import Image from "next/image";
import Link from "next/link";

interface colThreeCardsProps {
  data: {
    paddingLarge: boolean;
    featuredClass: boolean;
    title: string;
    bgTransparent: boolean;
    imageUrl1: string;
    imageAlt1: string;
    cardTitle1: string;
    cardParagraph1: string;
    imageUrl2: string;
    imageAlt2: string;
    cardTitle2: string;
    cardParagraph2: string;
    imageUrl3: string;
    imageAlt3: string;
    cardTitle3: string;
    cardParagraph3: string;
    btntext: string;
    btnUrl: string;
  };
}

const ColThreeCards: React.FC<colThreeCardsProps> = ({ data }) => {
  const {
    paddingLarge,
    featuredClass,
    title,
    bgTransparent,
    imageUrl1,
    imageAlt1,
    cardTitle1,
    cardParagraph1,
    imageUrl2,
    imageAlt2,
    cardTitle2,
    cardParagraph2,
    imageUrl3,
    imageAlt3,
    cardTitle3,
    cardParagraph3,
    btntext,
    btnUrl,
  } = data;
  return (
    <>
      <section
        className={`${
          paddingLarge === true ? "padding-large" : ""
        } colThree_cards`}
      >
        <div className="container">
          <div
            className={` ${
              featuredClass === true
                ? "featured pt-20 pb-14 lg:pt-16 md:!pt-14 md:pb-12"
                : ""
            } relative w-full `}
          >
            {title && (
              <div className="content w-full text-center relative mb-[90px] lg:mb-16 md:!mb-12 ">
                <h2 className="font-medium text-black ">{title}</h2>
              </div>
            )}
            <div className="w-mainRow -ml-2.5 flex flex-wrap sm:w-full sm:ml-0">
              <div
                className={`w-threeCard mx-2.5 mb-5 tablet:w-halfWidth phablet:w-halfWidth sm:w-full sm:mx-0`}
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-duration="400"
              >
                <div
                  className={` ${
                    bgTransparent === true ? " !bg-transparent" : ""
                  } card bg-white h-full rounded-[30px]`}
                >
                  <div className="relative imageWrap group h-[260px] tablet:h-[220px] phablet:h-[220px] sm:h-[200px] overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]">
                    <Image
                      className="object-cover transition-transform duration-300 group-hover:scale-105  h-full w-full"
                      src={imageUrl1}
                      width={400}
                      height={300}
                      alt={imageAlt1}
                    />
                  </div>
                  <div className="textWrap py-9 px-5 text-center md:p-5">
                    <h4 className="text-black">{cardTitle1}</h4>
                    <span className="text-gray font-light mt-[30px] line-clamp-4 text-ellipsis text-[15px] leading-[26px] md:text-[14px] md:leading-[22px] md:mt-4 ">
                      {cardParagraph1}
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
                <div
                  className={` ${
                    bgTransparent === true ? " !bg-transparent" : ""
                  } card bg-white h-full rounded-[30px]`}
                >
                  <div className="relative imageWrap group h-[260px] tablet:h-[220px] phablet:h-[220px] sm:h-[200px] overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]">
                    <Image
                      className="object-cover transition-transform duration-300 group-hover:scale-105 h-full w-full"
                      src={imageUrl2}
                      width={400}
                      height={300}
                      alt={imageAlt2}
                    />
                  </div>
                  <div className="textWrap py-9 px-5 text-center md:p-5">
                    <h4 className="text-black">{cardTitle2}</h4>
                    <span className="text-gray font-light mt-[30px] line-clamp-4 text-ellipsis  text-[15px] leading-[26px] md:text-[14px] md:leading-[22px] md:mt-4 ">
                      {cardParagraph2}
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
                <div
                  className={` ${
                    bgTransparent === true ? " !bg-transparent" : ""
                  } card bg-white h-full rounded-[30px]`}
                >
                  <div className="relative imageWrap group h-[260px] tablet:h-[220px] phablet:h-[220px] sm:h-[200px] overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]">
                    <Image
                      className="object-cover transition-transform duration-300 group-hover:scale-105 h-full w-full"
                      src={imageUrl3}
                      width={400}
                      height={300}
                      alt={imageAlt3}
                    />
                  </div>
                  <div className="textWrap py-9 px-5 text-center md:p-5">
                    <h4 className="text-black">{cardTitle3}</h4>
                    <span className="text-gray font-light mt-[30px] line-clamp-4 text-ellipsis  text-[15px] leading-[26px] md:text-[14px] md:leading-[22px] md:mt-4 ">
                      {cardParagraph3}
                    </span>
                  </div>
                </div>
              </div>

              {btntext && (
                <Link href={btnUrl} className=" mt-7 gradient-btn mx-auto">
                  <span>{btntext}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ColThreeCards;
