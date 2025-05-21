'use client'
import Image from "next/image"
import React from "react"

interface CardItem {
    data: {
        title: string;
        sectionPadding: any;
        card:{
            fields :{
                memberImage:{
                    fields:{
                        file:{
                            url:string;
                        }
                        title:string;
                    }
                },
                subTitle:string;
                title:string;
            };
        };
      };
}

const TeamGrid: React.FC<CardItem> = ({ data }) => {

    const {
        title,
        sectionPadding,
        card
      } = data;

      const padding = (data?.sectionPadding?.fields?.padding)?.join(" ")

    return (
        <section className={`team-grid relative ${padding} no-padding-bottom z-[1]`}>
            <div className="container">
                {/* <div className="intro mb-[4rem]">
                </div> */}
                <div className="wrapper flex w-[calc(100%+2rem)] justify-center flex-wrap ml-[-1rem]">
                    {card.map((item, index) => (
                        <div className="group sm:max-w-[33rem] w-[calc(33.33%-2rem)] sm:!w-full lg:w-[calc(50%-3rem)] mx-[1rem] mb-[2.5rem]" key={index}>
                            <div className="img-wrap grayscale group-hover:grayscale-0 md:grayscale-0 duration-300 sm:max-w-[33rem] h-[25rem] mb-[1.5rem]">
                                <Image
                                    src={`https:${item.fields.memberImage.fields.file.url}`}
                                    width={1000}
                                    height={1000}
                                    quality={85}
                                    className="w-full h-full object-cover"
                                    alt={`${item.fields.memberImage.fields.title}'s portrait`}
                                />
                            </div>
                            <h4 className="subtitle text-black !font-bold mb-[0.4rem]">{item.fields.title}</h4>
                            <p className="small text-black font-normals">{item.fields.subTitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TeamGrid;
