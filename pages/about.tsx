import React from "react";
import Banner from "../components/heroBanner";
import Intro from "../components/intro";

const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <Intro content={"about"} />
    </>
  );
};

export default Home;
