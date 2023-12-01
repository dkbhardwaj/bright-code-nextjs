import React from "react";
import Nav from "../components/navigation";
import Banner from "../components/heroBanner";
import Intro from "../components/intro";
import IntroWithCards from "../components/colCards";
import ContentWithImage from "../components/contentWithImage";
import ContentWithImageTwo from "../components/contentWithImageTwo";

const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <Intro page={"header"} />
    </>
  );
};

export default Home;
