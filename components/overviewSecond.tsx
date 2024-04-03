import React from "react";

interface BladeItem {
  title: string;
  blurb: string;
  subtitle?: string;
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

// Define a type for the props of the Intro component
interface IntroProps {
  data: Blade;
}

const Overview: React.FC<IntroProps> = ({ data }) => {
  return (
    <section className="overview pt-32 pb-20">
      <div className="container">
        <div className="w-mainRow -ml-2.5 flex z-1 relative">
          <div className="content w-halfWidth mx-2.5 pr-10">
            <span className="title">{data.bladeItems[0].subtitle}</span>
            <h2 className="text-darkGray mt-2">{data.bladeItems[0].title}</h2>
          </div>
          <div className="content w-halfWidth mx-2.5 mt-10">
            <p className="text-gray">{data.bladeItems[0].blurb}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
