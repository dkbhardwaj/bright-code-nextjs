import React from "react";

interface Blade {
  bladeTitle: string;
  level: string;
  bladeItems: Array<{ title: string; blurb: string }>;
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

const Intro: React.FC<IntroProps> = ({ data }) => {
  return (
    <section className={`intro py-20 text-center ${data.bgColor === "gray" ? "bg-lightGray" : ""}`}>
      <div className="container">
        <div className="w-full max-w-[600px] mx-auto">
          {/* Render the heading */}
          {data.bladeItems[0].title && <h2 className="text-darkGray">{data.bladeItems[0].title}</h2>}
          
          {/* Render the paragraph */}
          {data.bladeItems[0].blurb && <p className="text-gray mt-5">{data.bladeItems[0].blurb}</p>}
        </div>
      </div>
    </section>
  );
};

export default Intro;
