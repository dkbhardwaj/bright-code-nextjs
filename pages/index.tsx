import React from "react";
import Banner from "../components/banner";
import Intro from "../components/intro";
import IntroWithCards from "../components/colCards";
import ContentWithImage from "../components/contentWithImage";
import ContentWithImageTwo from "../components/contentWithImageTwo";
import Sticky from "../components/stickyNav";
import Overview from "../components/overview";
import ColThreeGrid from "../components/colThreeGrid";
import ContactForm from "../components/contactFom";

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
      <ColThreeGrid />
      <IntroWithCards col={4} content={"team"} />
      <ContentWithImage />
      <Intro content={"work"} />
      <ContentWithImageTwo />
      <ContactForm />
    </>
  );
};

export default Home;
