import React from "react";
import ColTwoCard from "../components/ColTwoCard";
import TitleSection from "../components/TitleSection";

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

  return (
    <>
      <div className="h-[400px] bg-purple"></div>
      <div className={darkMode ? "darkMode" : ""}>
        <ColTwoCard {...cardData} />
        <ColTwoCard {...cardData2} />
        <TitleSection {...titleSectionData} />
      </div>
    </>
  );
};

export default Demo;
