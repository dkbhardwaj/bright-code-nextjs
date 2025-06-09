'use client';
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TeamMemberCard {
    fields: {
        memberImage: {
            fields: {
                file: {
                    url: string;
                };
                title: string;
            };
        };
        subTitle: string;
        title: string;
        linkedinUrl: string;
    };
}

interface CardItem {
    data: {
        title: string;
        sectionPadding: {
            fields: {
                padding: string[];
            };
        };
        card: TeamMemberCard[];
    };
}

const TeamGrid: React.FC<CardItem> = ({ data }) => {
    const {
        title,
        sectionPadding,
        card
    } = data;

    const padding = sectionPadding?.fields?.padding?.join(" ") || "";

    return (
        <section className={`team-grid relative ${padding} no-padding-bottom z-[1]`}>
            <div className="container"data-aos="fade-in"
              data-aos-delay="400"
              data-aos-duration="600">
                <div className="wrapper flex w-[calc(100%+2rem)] justify-center flex-wrap ml-[-1rem]">
                    {card.map((item, index) => (
                        <div
                            className="group sm:max-w-[33rem] w-[calc(25%-2rem)] sm:!w-full lg:w-[calc(50%-2rem)] mx-[1rem] mb-[2.5rem]"
                            key={index}
                        >
                            <div className="img-wrap grayscale sm:max-w-[400px] sm:mx-auto group-hover:grayscale-0 md:grayscale-0 duration-300 sm:max-w-[33rem] h-[350px] mb-[1.5rem]">
                                <Image
                                    src={`https:${item.fields.memberImage.fields.file.url}`}
                                    width={1000}
                                    height={1000}
                                    quality={85}
                                    className="w-full h-full object-cover object-top"
                                    alt={`${item.fields.memberImage.fields.title}'s portrait`}
                                />
                            </div>
                            <div className="sm:flex sm:flex-wrap sm:justify-center">
                            
                            <h4 className="sm:w-full text-purplePink text-black sm:text-center !font-bold">
                                {item.fields.title}
                            </h4>
                            <p className="sm:w-full small text-black sm:text-center font-normals">
                                {item.fields.subTitle}
                            </p>
                            {item?.fields?.linkedinUrl && (
                                <div className="profile-icon inline-block duration-300 relative mt-[10px]  max-w-[33px] h-[33px]">
                                <Link
                                href={item?.fields?.linkedinUrl}
                                className="redirect"
                                target="_blank"
                                >
                                .
                                </Link>
                                <svg className="" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_98_121)">
                                <path className="fill-black duration-300" d="M16.5 0C7.38869 0 0 7.38869 0 16.5C0 25.6113 7.38869 33 16.5 33C25.6113 33 33 25.6113 33 16.5C33 7.38869 25.6113 0 16.5 0ZM11.7053 24.9434H7.68679V12.8536H11.7053V24.9434ZM9.69617 11.2028H9.66998C8.3215 11.2028 7.44937 10.2745 7.44937 9.11433C7.44937 7.92799 8.34819 7.02539 9.72285 7.02539C11.0975 7.02539 11.9435 7.92799 11.9697 9.11433C11.9697 10.2745 11.0975 11.2028 9.69617 11.2028ZM26.1952 24.9434H22.1772V18.4756C22.1772 16.8502 21.5953 15.7417 20.1413 15.7417C19.0313 15.7417 18.3701 16.4894 18.0796 17.2113C17.9734 17.4696 17.9474 17.8306 17.9474 18.1919V24.9434H13.9292C13.9292 24.9434 13.9818 13.9878 13.9292 12.8536H17.9474V14.5654C18.4814 13.7416 19.4369 12.5699 21.5689 12.5699C24.2127 12.5699 26.1952 14.2978 26.1952 18.0111V24.9434Z" />
                                </g>
                                <defs>
                                <clipPath id="clip0_98_121">
                                <rect width="33" height="33" fill="black"/>
                                </clipPath>
                                </defs>
                                </svg>

                            </div>
                            )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamGrid;
