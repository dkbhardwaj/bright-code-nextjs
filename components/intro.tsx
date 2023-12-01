import React from "react";

interface IntroProps {
  page: "header" | "banner" | "work" | "portfolio" | "team";
  bg?: "lightGray";
}

interface IntroData {
  title: string;
  blurb: string;
}

const Intro: React.FC<IntroProps> = (props) => {
  const header: IntroData = {
    title: "Header/Navigation",
    blurb:
      "Here you can check Demos we created you can easily use it. Its quite easy to Create your own dream website & dashboard in No-time.",
  };

  const banner: IntroData = {
    title: "Banners",
    blurb:
      "Here you can check Demos we created based on WrapKit. Its quite easy to Create your own dream website & dashboard in No-time..",
  };
  const work: IntroData = {
    title: "Our Recent work with three columns",
    blurb:
      "You can relay on our amazing features list and also our customer services will be a great experience for you without doubt and in no-time.",
  };
  const portfolio: IntroData = {
    title: "Portfolio",
    blurb:
      "Here you can check Demos we created based on WrapKit. Its quite easy to Create your own dream website & dashboard in No-time.",
  };
  const team: IntroData = {
    title: "Team",
    blurb:
      "Here you can check Demos we created based on WrapKit. Its quite easy to Create your own dream website & dashboard in No-time.",
  };

  var data: IntroData | undefined;

  if (props.page === "header") {
    data = header;
  } else if (props.page === "banner") {
    data = banner;
  } else if (props.page === "work") {
    data = work;
  } else if (props.page === "portfolio") {
    data = portfolio;
  } else if (props.page === "team") {
    data = team;
  }

  return (
    <section
      className={`intro py-32 text-center ${
        props.bg === "lightGray" ? "bg-lightGray" : ""
      }`}
    >
      <div className="container">
        <div className="w-full max-w-[600px] mx-auto">
          <h2 className="text-darkGray">{data?.title || ""}</h2>
          <p className="text-gray mt-5">{data?.blurb || ""}</p>
        </div>
      </div>
    </section>
  );
};

export default Intro;
