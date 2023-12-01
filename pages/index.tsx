import React from "react";
import Nav from '../components/navigation'
import Banner from "../components/heroBanner";
import Intro from '../components/intro'
import IntroWithCards from '../components/colCards'
import ContentWithImage from '../components/contentWithImage'
import ContentWithImageTwo from '../components/contentWithImageTwo'

export default function Home() {
  return (
    <>
      <Nav />
      <Banner />
      <Intro page={'header'} />
      {/* <Intro page={'banner'} />
      <Intro page={'portfolio'} bg={'lightGray'} />*/}
      <IntroWithCards content={'cards'} />
      <Intro page={'team'} bg={'lightGray'} />
      <IntroWithCards col={4} content={'team'} />
      <ContentWithImage />
      <Intro page={'work'} />
      <ContentWithImageTwo />
    </>
  );
}
