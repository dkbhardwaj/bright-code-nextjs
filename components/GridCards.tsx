import React from "react";
import Image from "next/image";
import Link from "next/link";

/* =========================
   Types
========================= */

export interface GridCard {
    id: number;
    cardDelay?: string;
    cardDuration?: string;
    bigCard: boolean;
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

export interface GridCardsData {
    paddingLarge?: boolean;
    featuredClass?: boolean;
    title?: string;
    bgTransparent?: boolean;
    gridCards: readonly GridCard[];
    btntext?: string;
    btnUrl?: string;
  }  

  export interface GridCardsProps {
    data: GridCardsData;
    theme?: "light" | "dark";
  }
  

/* =========================
   Component
========================= */

const GridCards: React.FC<GridCardsProps> = ({
    data,
    theme = "light",
  }) => {
    const { title, gridCards, btntext, btnUrl } = data;
  
    return (
      <section
        className={`GridCards padding-medium ${
          theme === "dark" ? "darkMode" : ""
        }`}
      >
  
            <div className="container">

                {/* Section Title */}
                {title && (
                    <h3 className="mb-[32px] text-[28px] font-[600]">
                        {title}
                    </h3>
                )}

                {/* Grid */}
                <div className="
                            grid
                            grid-cols-1
                            tablet:grid-cols-10
                            lg-up:grid-cols-12
                            gap-[24px]
                            ">

                    {gridCards.map((card, index) => {
                        const rowIndex = Math.floor(index / 2);
                        const isFirstInRow = index % 2 === 0;

                        // Row 1: BIG | SMALL
                        // Row 2: SMALL | BIG
                        const isBig =
                            rowIndex % 2 === 0
                                ? isFirstInRow
                                : !isFirstInRow;

                        return (
                            <div
                                key={card.id}
                                className={`
                                            col-span-1 col-four
                                            ${isBig
                                        ? "tablet:col-span-6 lg-up:col-span-8"
                                        : "tablet:col-span-4 lg-up:col-span-4"
                                    }
                                    `}
                            >

                                <div className="card h-full rounded-[24px] border border-[#E5E5EA] bg-white pb-[40px] flex flex-col justify-between overflow-hidden relative ">
                                <Link
                                    href={card.link}
                                    className="redirect rounded-[24px] overflow-hidden"
                                >
                                    {card.linkText}
                                </Link> 
                                    {/* Image */}
                                    <div className="imageWrap mb-[24px] h-[220px]">
                                        <Image
                                            src={card.image.light}
                                            alt={card.imageAlt}
                                            width={500}
                                            height={300}
                                            className="light-image w-full h-full object-cover"
                                        />
                                        <Image
                                            src={card.image.dark}
                                            alt={card.imageAlt}
                                            width={500}
                                            height={300}
                                            className="dark-image w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="content px-[30px]">
                                        <h4 className="font-[600] text-[20px] md:text-[16px] ">
                                            {card.cardTitle}
                                        </h4>
                                        <p className="text-[16px] md:text-[12px] mt-[5px] text-[#6b7280]">
                                            {card.cardDetail}
                                        </p>
                                    </div>

                                    {/* CTA */}
                                    {card.linkText && card.link && (
                                        <div className="btn-wrap px-[30px]">
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
                        );
                    })}
                </div>



                {/* Bottom Button */}
                {btntext && btnUrl && (
                    <div className="text-center mt-[48px]">
                        <Link href={btnUrl} className="gradient-btn-blue">
                            {btntext}
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default GridCards;
