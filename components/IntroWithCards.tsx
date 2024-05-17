import React from "react";
import Image from "next/image";
import Link from "next/link";

interface IntroWithCardsData {
  data: {
    colThreeCard: {
      id: number;
      cardDelay: string;
      cardDuration: string;
      cardImage: string;
      imgAlt: string;
      cardContent: string;
    }[];
  };
}

const IntroWithCards: React.FC<IntroWithCardsData> = ({ data }) => {
  return (
    <section className="introWithCards">
      <div className="container">
        <div className="w-mainRow -ml-2.5 flex flex-wrap sm:w-full sm:ml-0">
          {data?.colThreeCard.map((colThree) => (
            <div
              className={`w-threeCard mx-2.5 mb-5 tablet:w-halfWidth phablet:w-halfWidth sm:w-full sm:mx-0`}
              data-aos="fade-up"
              data-aos-delay={colThree.cardDelay}
              data-aos-duration={colThree.cardDuration}
              key={colThree.id}
            >
              <div className="card bg-white w-full ">
                {colThree.cardImage && (
                  <div className="relative imageWrap group h-[260px] tablet:h-[220px] phablet:h-[220px] sm:h-[200px] overflow-hidden rounded-[30px]  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]">
                    <Link className="redirect" href={`#`}>
                      .
                    </Link>
                    <Image
                      className="object-cover transition-transform duration-300 group-hover:scale-105  h-full w-full"
                      src={colThree.cardImage}
                      width={400}
                      height={300}
                      loading="lazy"
                      alt={colThree.imgAlt}
                    />
                  </div>
                )}
                <div className="textWrap py-9 px-5 md:py-5 sm:px-0 ">
                  {colThree.cardContent && (
                    <p className=" text-black line-clamp-[10] overflow-hidden text-overflow-ellipsis ">
                      {colThree.cardContent}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default IntroWithCards;
