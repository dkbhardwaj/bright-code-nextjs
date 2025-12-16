import React, { useState } from "react";
import ColTwoCard from "../components/ColTwoCard";
import TitleSection from "../components/TitleSection";
import ThreeColumns from "../components/ThreeColumns";
import { link } from "fs";

const Demo: React.FC = () => {
  // const darkMode = false;
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };
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
  darkMode,
  threeCards: [
    {
      id: 1,
      cardDelay: "0.1s",
      cardDuration: "0.6s",
      image: {
        light: "/what-we-do-blades/channels.png",
        dark: "/what-we-do-blades/channels-dark.png",
      },
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
      image: {
        light: "/what-we-do-blades/team.png",
        dark: "/what-we-do-blades/team-dark.png",
      },
      imageAlt: "card_2",
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
      image: {
        light: "/what-we-do-blades/tools.png",
        dark: "/what-we-do-blades/tools-dark.png",
      },
      imageAlt: "card_3",
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
    {/* Theme Switch */}
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        className="px-4 mt-[140px] py-2 rounded-full text-sm font-medium border transition
                   bg-white text-black dark:bg-black dark:text-white"
      >
        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>
    </div>

    <div className={darkMode ? "darkMode" : ""}>
      <div className="h-[400px] bg-purple"></div>

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
