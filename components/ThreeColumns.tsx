import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ThreeColumnCard {
  id: number;
  cardDelay?: string;
  cardDuration?: string;

  image: {
    light: string;
    dark: string;
  };

  imageAlt: string;
  cardTitle: string;
  cardDetail: string;
  link: string;
  linkText: string;
}


interface ThreeColumnsData {
  paddingLarge?: boolean;
  featuredClass?: boolean;
  title?: string;
  bgTransparent?: boolean;
  threeCards: readonly ThreeColumnCard[];
  btntext?: string;
  btnUrl?: string;
}


type BladeTheme = "light" | "dark";

interface ThreeColumnsProps {
  data: ThreeColumnsData;
  theme?: BladeTheme; 
}


const ThreeColumns: React.FC<ThreeColumnsProps> = ({
  data,
  theme = "light",
}) => {
  const { threeCards, btntext, btnUrl } = data;

  return (
    <section
      className={`ThreeColumns padding-medium ${
        theme === "dark" ? "darkMode" : ""
      }`}
    >
      <div className="container">
        <div className="w-[calc(100%+24px)] ml-[-12px] flex flex-wrap justify-center">
          {threeCards.map((card) => (
            <div
              key={card.id}
              className="colThree relative w-[calc(33.3%-24px)] tablet:w-[calc(50%-24px)] phablet:w-[calc(100%-24px)] sm:w-[calc(100%-24px)] mx-[12px] mb-[24px]"
            >
              <Link
                href={card.link}
                className="redirect rounded-[24px] overflow-hidden"
              >
                {card.linkText}
              </Link>

              <div className="card flex flex-col justify-between bg-white text-center rounded-[24px] overflow-hidden py-[40px] border border-[#E5E5EA] h-full">
                <div className="wrapper">
                  {/* Images */}
                  {card.image && (
                    <div className="imageWrap max-w-[350px] h-[200px] mx-auto mb-[25px]">
                      <Image
                        src={card.image.light}
                        width={400}
                        height={300}
                        alt={card.imageAlt}
                        className="light-image w-full h-full object-contain"
                      />

                      <Image
                        src={card.image.dark}
                        width={400}
                        height={300}
                        alt={card.imageAlt}
                        className="dark-image w-full h-full object-contain"
                      />
                    </div>
                  )}


                 <div className="content px-[30px]">
                   {/* Title */}
                   <h4 className="font-[600] text-[20px] md:text-[16px]">
                    {card.cardTitle}
                  </h4>

                  {/* Description */}
                  <p className="text-[16px] md:text-[12px] mt-[5px] text-[#6b7280]">
                    {card.cardDetail}
                  </p>
                 </div>
                </div>

                {/* CTA */}
                {card.linkText && card.link && (
                  <div className="btn-wrap">
                    <Link
                      href={card.link}
                      className="blue-link inline-block text-[#0044FF] text-[12px] mt-[10px]"
                    >
                      {card.linkText}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        {btntext && btnUrl && (
          <div className="text-center mt-[40px]">
            <Link href={btnUrl} className="gradient-btn-blue">
              {btntext}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ThreeColumns;
