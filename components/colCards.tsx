import React, { useState, useEffect } from "react";

interface Card {
  cardTitle: string;
  cardBlurb: string;
  cardsImage: string;
}

interface BladeItem {
  title: string;
  blurb: string;
  subtitle?: string;
  cards: {
    col: number;
    items: Array<Card>;
  };
}

interface Blade {
  bladeTitle: string;
  level: string;
  bladeItems: Array<BladeItem>;
  bgColor: string;
  imgPath: string;
  textAlignment: string;
  ctaLink: string;
  ctaText: string;
  ctaClass: string;
}

interface ColCardsProps {
  data: Blade[];
}

const ColCards: React.FC<ColCardsProps> = ({ data }) => {
  // console.log(data.bladeItems[0].cards[0].tems);

  const [col4, setCol4] = useState(false);

  // useEffect(() => {
  //   if (col === 4) {
  //     setCol4(true);
  //   }
  // }, [col]);

  return (
    <section className="introWithCards py-20">
      <div className="container">
        <div className="w-mainRow -ml-2.5 flex flex-wrap">
          {/* {data.bladeItems[0].cards[0].items.map((data, index) => (
            <div
              key={index}
              className={`${col4 ? "w-colFour" : "w-threeCard"} mx-2.5 mb-5`}
            > */}
          <div className="card bg-white shadow-slate-100 shadow-lg">
            <div className="imageWrap">
              {/* <img src={data.cards[0].cardImage} alt="image" /> */}
            </div>
            <div className="textWrap p-4">
              {/* <h5 className="text-darkGray">{data.cards[0].cardTitle}</h5> */}
              <span className="text-gray mt-2 inline-block">
                {/* {data.cards[0].cardBlurb} */}
              </span>
            </div>
          </div>
          {/* </div>
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default ColCards;
