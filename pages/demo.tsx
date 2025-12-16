import React from "react";
import ColTwoCard from "../components/ColTwoCard";
import TitleSection from "../components/TitleSection";
import ThreeColumns from "../components/ThreeColumns";
import { link } from "fs";

const Demo: React.FC = () => {
  const darkMode = false;
  const cardData = {
    reverse: false,
    imageSrc: "/what-we-do-blades/Illustration.png",
    imageAlt: "Digital transformation banner",
    badgeText: "Bright-Code does",
    title: "We Build Digital Presence for Future of Businesses",
    description:
      "Bright Code works seamlessly with your team to help you envision and create your clients’ digital presence. Whether it’s building something from the ground up or developing and QA-ing existing architecture, we create sophisticated websites and content management systems that meet the enterprise needs of large businesses and institutions.",
    buttonText: "Learn more",
    buttonLink: "/services",
  };
  const cardData2 = {
    reverse: true,
    imageSrc: "/what-we-do-blades/Illustration.png",
    imageAlt: "Digital transformation banner",
    badgeText: "Bright-Code does",
    title: "We Build Digital Presence for Future of Businesses",
    description:
      "Bright Code works seamlessly with your team to help you envision and create your clients’ digital presence. Whether it’s building something from the ground up or developing and QA-ing existing architecture, we create sophisticated websites and content management systems that meet the enterprise needs of large businesses and institutions.",
    buttonText: "Learn more",
    buttonLink: "/services",
  };
  const titleSectionData = {
    badgeText: "Bright-Code does",
    title: "We Build Digital Presence for Future of Businesses",
    description:
      "Bright Code works seamlessly with your team to help you envision and create your clients’ digital presence. Whether it’s building something from the ground up or developing and QA-ing existing architecture, we create sophisticated websites and content management systems that meet the enterprise needs of large businesses and institutions.",
    buttonText: "Learn more",
    buttonLink: "/services",
  };
  const titleSectionData2 = {
    badgeText: "About Bright Code",
    title: "Who we are here to help",
    description:
      "Bright Code works seamlessly with your team to help you envision and create your clients’ digital presence. Whether it’s building something from the ground up or developing and QA-ing existing architecture, we create sophisticated websites and content management systems.",
    buttonText: "",
    buttonLink: "",
  };

const colThreeCardsData = {
  paddingLarge: true,
  featuredClass: false,
  title: "Our Services",
  bgTransparent: false,
  threeCards: [
    {
      id: 1,
      cardDelay: "0.1s",
      cardDuration: "0.6s",
      imageUrl: "/what-we-do-blades/channels.png",
      imageAlt: "card_1",
      cardTitle: "Creative and Brand Agencies",
      cardDetail:
        "We have over a decade of experience using leading technologies to provide support.",
      link: "#",
      linkText: "Learn more",
    },
    {
      id: 2,
      cardDelay: "0.1s",
      cardDuration: "0.6s",
      imageUrl: "/what-we-do-blades/team.png",
      imageAlt: "card_1",
      cardTitle: "Marketing and Digital Teams",
      cardDetail:
        "We have over a decade of experience using leading technologies to provide support.",
      link: "#",
      linkText: "Learn more",
    },
    {
      id: 3,
      cardDelay: "0.1s",
      cardDuration: "0.6s",
      imageUrl: "/what-we-do-blades/tools.png",
      imageAlt: "card_1",
      cardTitle: "Teams with too much on their Plate",
      cardDetail:
        "We have over a decade of experience using leading technologies to provide support.",
      link: "#",
      linkText: "Learn more",
    },
  ],
  btntext: "Learn more",
  btnUrl: "#",
};


  return (
    <>
      <div className="h-[400px] bg-purple"></div>
      <div className={darkMode ? "darkMode" : ""}>
        <ColTwoCard {...cardData} />
        <ColTwoCard {...cardData2} />
        <TitleSection {...titleSectionData} />
        <TitleSection {...titleSectionData2} />
        <ThreeColumns data={colThreeCardsData} />
      </div>
    </>
  );
};

export default Demo;
