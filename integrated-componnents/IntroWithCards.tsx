import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {fetchCardsData} from "../lib/contentful/getCardsData"


interface Card {
  sys: {
    id: string;
  };
  fields: {
    cardImage?: {
      fields: {
        file: {
          url: string;
          fileName: string;
        };
      };
    };
    description?: string;
    heading?: string;
  };
}



interface IntroWithCardsData {
  data: {
    sectionPadding: any;
    heading: string;
    title: string;
    cards: Card[];
    background:boolean;
  };
}

const IntroWithCards: React.FC<IntroWithCardsData> = ({ data }) => {
  const { cards, title, sectionPadding, background, heading } = data;
  
  const [cardsData , setCardsData] = useState<Card[]>();
  
  useEffect(()=>{
   
    async function getdata(){
      try {
        let x = await fetchCardsData(cards);
        setCardsData(x)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if(cardsData == undefined){
      getdata();
    }
  })

  const padding = (data?.sectionPadding?.fields?.padding)?.join(" ")
  
  return (
    <section className={`introWithCards ${padding}`}>
      <div className="container">
        <div className={`w-mainRow -ml-2.5 flex flex-wrap sm:w-full sm:ml-0 ${background && "featured pt-20 pb-14 lg:pt-16 md:!pt-14 md:pb-12"}`}>
          {title && 
          <div className="content w-full text-center relative mb-[90px] lg:mb-16 md:!mb-12 ">
          <h2 className="font-medium text-black ">{title}</h2>
          </div>
          }
          {cardsData != undefined && cardsData?.map((card) => (
            <div
              className={`w-threeCard mx-2.5 mb-5 tablet:w-halfWidth phablet:w-halfWidth sm:w-full sm:mx-0`}
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="400"
              key={card.sys.id}
            >
              <div className={`card w-full ${!background && "bg-white"}`}>
                {card.fields?.cardImage?.fields?.file?.url && (
                  <div className="relative imageWrap group h-[260px] tablet:h-[220px] phablet:h-[220px] sm:h-[200px] overflow-hidden rounded-[30px] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-transparent before:border-bordergradient before:border-[7px] before:z-10 before:border-solid before:rounded-[30px]">
                    <Link className="redirect" href={`#`}>
                      .
                    </Link>
                    <Image
                      className="object-cover transition-transform duration-300 group-hover:scale-105  h-full w-full"
                      src={`https:${card.fields?.cardImage?.fields?.file?.url}`}
                      width={400}
                      height={300}
                      loading="lazy"
                      alt={card.fields?.cardImage?.fields?.file?.fileName}
                    />
                  </div>
                )}
                <div className={`textWrap py-9 px-5 md:py-5 sm:px-0 ${background && "text-center"} `}>

                  {card?.fields?.heading && (<h4 className="text-black mb-[30px] md:mb-4">{card?.fields?.heading}</h4>)}
                  {card.fields?.description && (
                    <p
                      className="text-black line-clamp-[10] overflow-hidden text-overflow-ellipsis"
                      dangerouslySetInnerHTML={{ __html: card.fields?.description }}
                    />
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
