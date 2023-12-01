import React from "react";
import Banner from "../components/heroBanner";
import Intro from "../components/intro";
import IntroWithCards from "../components/colCards";
import ContentWithImage from "../components/contentWithImage";
import ContentWithImageTwo from "../components/contentWithImageTwo";
import Sticky from "../components/stickyNav";
import Overview from "../components/overview";

const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <Sticky />
      <Overview />
      {/* <Intro content={"header"} /> */}
      {/* <Intro content={'banner'} />
      <Intro content={'portfolio'} bg={'lightGray'} />*/}
      <IntroWithCards content={"cards"} />
      <Intro content={"team"} bg={"lightGray"} />
      <IntroWithCards col={4} content={"team"} />
      <ContentWithImage />
      <Intro content={"work"} />
      <ContentWithImageTwo />
    </>
  );
};

export default Home;
