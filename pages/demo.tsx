import React, { useState } from "react";
import ColTwoCard from "../components/ColTwoCard";
import TitleSection from "../components/TitleSection";
import ThreeColumns from "../components/ThreeColumns";
import GridCards from "@/components/GridCards";
import BannerThird from "@/components/BannerThird";
import Timeline from "@/components/Timeline";
import Cta from "@/components/Cta";
import ContactSection from "@/components/ContactSection";
import CalendlyCalendar from "@/components/CalendlyCalendar";

const Demo: React.FC = () => {
  const bannerData = {
    theme: "dark" as "dark",
    bannerBgImg: {
      light: "/what-we-do/banner_third.png",
      dark: "/what-we-do/banner_third_dark.png",
    },
    preTitle: "Protect your",
    highlightedText: "Reputation",
    postTitle: "Not just your Website.",
    paragraphContent: [
      {
        id: 1,
        paragraph: "Your clients hire you for vision.",
      },
      {
        id: 2,
        paragraph: "You hire us so the dev never lets that vision down.",
      },
    ],
    buttons: [
      {
        id: 1,
        url: "#",
        text: "Book a 30-minute call",
        className: "rounded-btn blue", // primary style
      },
      {
        id: 2,
        url: "#",
        text: "We protect agencies",
        className: "rounded-btn gray", // e.g., outlined style
      },
    ],
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
    theme: "light", // Blade-specific theme
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
    theme: "dark", // Blade-specific theme
  };
  const titleSectionData = {
    badgeText: "Bright-Code does",
    title: "We Build Digital Presence for Future of Businesses",
    description:
      "Bright Code works seamlessly with your team to help you envision and create your clients’ digital presence. Whether it’s building something from the ground up or developing and QA-ing existing architecture, we create sophisticated websites and content management systems that meet the enterprise needs of large businesses and institutions.",
    alignment: "center",
    buttonText: "Learn more",
    buttonLink: "/services",
  } as const;
  
  const titleSectionData2 = {
    badgeText: "About Bright Code",
    title: "Who we are here to help",
    description:
      "Bright Code works seamlessly with your team to help you envision and create your clients’ digital presence. Whether it’s building something from the ground up or developing and QA-ing existing architecture, we create sophisticated websites and content management systems.",
    alignment: "center",
    buttonText: "",
    buttonLink: "",
  } as const;
  
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
        image: {
          light: "/what-we-do-blades/channels.png",
          dark: "/what-we-do-blades/channels-dark.png",
        },
        imageAlt: "Channels",
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
        imageAlt: "Team",
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
        imageAlt: "Tools",
        cardTitle: "Teams with too much on their Plate",
        cardDetail:
          "We have over a decade of experience using leading technologies to provide support.",
        link: "#",
        linkText: "Learn more",
      },
    ],
    btntext: "Learn more",
    btnUrl: "#",
  } as const;
  
  const titleSectionData3 = {
    badgeText: "Bright Code Work",
    title: "What we actually build",
    description:
      "Under the hood, we are a web development studio focused on CMS heavy, business critical sites.",
    alignment: "left",
    buttonText: "",
    buttonLink: "",
  } as const;
  const gridCardsData = {
    paddingLarge: true,
    featuredClass: false,
    title: "",
    bgTransparent: false,
    gridCards: [
      {
        id: 1,
        image: {
          light: "/what-we-do-blades/websites.png",
          dark: "/what-we-do-blades/websites-dark.png",
        },
        imageAlt: "websites",
        cardTitle: "White label Website Builds",
        cardDetail:
          "We have over a decade of experience using leading technologies to provide support.",
        link: "#",
        linkText: "Learn more",
        bigCard: false,
      },
      {
        id: 2,
        image: {
          light: "/what-we-do-blades/infrastructure.png",
          dark: "/what-we-do-blades/infrastructure-dark.png",
        },
        imageAlt: "Infrastructure",
        cardTitle: "Legacy Rescue and Refractor",
        cardDetail:
          "We have over a decade of experience using leading technologies to provide support.",
        link: "#",
        linkText: "Learn more",
        bigCard: false,
      },
      {
        id: 3,
        image: {
          light: "/what-we-do-blades/care-optimization.png",
          dark: "/what-we-do-blades/care-optimization-dark.png",
        },
        imageAlt: "Care and Optimization",
        cardTitle: "Care and Optimization Plans",
        cardDetail:
          "We have over a decade of experience using leading technologies to provide support.",
        link: "#",
        linkText: "Learn more",
        bigCard: false,
      },
      {
        id: 4,
        image: {
          light: "/what-we-do-blades/scalable-team.png",
          dark: "/what-we-do-blades/scalable-team-dark.png",
        },
        imageAlt: "Scalable team",
        cardTitle: "Embedded Dev Squads",
        cardDetail:
          "We have over a decade of experience using leading technologies to provide support.",
        link: "#",
        linkText: "Learn more",
        bigCard: false,
      },
    ],
    btntext: "Learn more",
    btnUrl: "#",
  };
  const ctaData = {
    bgImage: "/what-we-do-blades/cta_image.png",
    title: "Sophisticated web solutions for smart agencies.",
    description:
      "Bright Code works seamlessly with your team to help you envision and create your clients’ digital presence.",
    buttonText: "Contact us",
    buttonUrl: "/contact-us",
    buttonClass: "rounded-btn blue no-arrow", // You can change this to "rounded-btn gray" etc.
  };
  const contactForm = {
    introWithPettern: {
      darkThemePettern: "/squres-pettern-dark.svg",
      lightThemePettern: "/squres-pettern.svg",
      title: "Manage Customers across the Lifetime of the product cycle",
      blurb:
        "Bright Code works seamlessly with your team to help you envision and create your clients’ digital presence. Whether it’s building something from the ground up or enhancing existing architecture, we create sophisticated websites and content management systems.",
      ctaTxt: "Learn more",
    },
  
    cards: [
      {
        icon: "/clock.svg",
        alt: "Customer history",
        title: "Customer History",
        blurb: "Analyze customer behavior across product lines",
      },
      {
        icon: "/uis_graph-bar.svg",
        alt: "Actionable insights",
        title: "Actionable Insights",
        blurb: "Gain meaningful insights from customer data",
      },
      {
        icon: "/patterns.svg",
        alt: "Identify patterns",
        title: "Identify Patterns",
        blurb: "Discover trends and usage patterns efficiently",
      },
      {
        icon: "/analysis.svg",
        alt: "Predictive analysis",
        title: "Predictive Analysis",
        blurb: "Predict outcomes using historical customer data",
      },
    ],
  };
  
  const contactUsCalender = {
    introWithPettern: {
      darkThemePettern: "/squres-pettern-dark.svg",
      lightThemePettern: "/squres-pettern.svg",
      title: "Manage Customers across the Lifetime of the product cycle",
      blurb:
        "Bright Code works seamlessly with your team to help you envision and create your clients’ digital presence. Schedule time with our team to explore how we can help.",
      ctaTxt: "Learn more",
    },
  
    cards: [
      {
        icon: "/clock.svg",
        alt: "Customer history",
        title: "Customer History",
        blurb: "Analyze customer behavior across product lines",
      },
      {
        icon: "/uis_graph-bar.svg",
        alt: "Actionable insights",
        title: "Actionable Insights",
        blurb: "Turn data into actionable business insights",
      },
      {
        icon: "/patterns.svg",
        alt: "Identify patterns",
        title: "Identify Patterns",
        blurb: "Understand trends across customer journeys",
      },
      {
        icon: "/analysis.svg",
        alt: "Predictive analysis",
        title: "Predictive Analysis",
        blurb: "Forecast future outcomes with confidence",
      },
    ],
  };
  const ContactForm = () => {
    return (
      <form className="contactForm">
        <div className="row">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
  
        <div className="row">
          <input type="email" placeholder="Your mail" />
          <input type="text" placeholder="Country" />
        </div>
  
        <textarea placeholder="Message" />
  
        <button type="submit">Contact us</button>
      </form>
    );
  };
  
  
  return (
    <>
      <div >
        <BannerThird data={bannerData} />
        <Timeline />
        <ColTwoCard {...cardData} theme="light" />
        <ColTwoCard {...cardData2} theme="light" />
        <TitleSection {...titleSectionData} theme="light" />
        <TitleSection {...titleSectionData2}  theme="light"/>
        <ThreeColumns data={colThreeCardsData} theme="light"  />
        <TitleSection {...titleSectionData3} theme="light"/>
        <ContactSection data={contactForm} theme="light" rightSlot={<ContactForm />} />
<ContactSection data={contactForm} theme="dark" rightSlot={<ContactForm />} />

<ContactSection
  data={contactUsCalender}
  theme="dark"
  rightSlot={<CalendlyCalendar theme="dark" />}
/>

<ContactSection
  data={contactUsCalender}
  theme="light"
  rightSlot={<CalendlyCalendar theme="light" />}
/>



        <GridCards data={gridCardsData} theme="light"/>
        <Cta data={ctaData} />
      </div>
    </>
  );
};

export default Demo;
