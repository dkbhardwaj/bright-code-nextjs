
import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";


import {fetchEntryBySlug} from "../lib/contentful/pageData"
// import { NextSeo } from 'next-seo';

import PageBuilder from '../integrated-componnents/PageBuilder'


interface HomeProps {
  entry: any; // Replace `any` with the actual type of `entry` if known
  slug: string;
} 

const Home: React.FC<HomeProps> = ({entry,slug}) => {
  // console.log(entry)

  return(
    <>
    <PageBuilder pageComponents={entry?.fields?.section} />
    </>
  )
};

export default Home;


export async function getServerSideProps() {
 
  let slug = `homepage`
  const entry = await fetchEntryBySlug(slug, "basicPage");
 
  return { props: { entry,slug } };
}
// return (
//   <>
//     <NextSeo
//       title={String(metadata.title)}
//       description={String(metadata.description)}
//       openGraph={
//         metadata.openGraph
//           ? {
//               title: String(metadata.title),
//               description: metadata.description || "",
//               images: metadata.openGraph.images || [],
//               siteName: metadata.openGraph.siteName || "",
//             }
//           : undefined
//       }
//     />
//     <HeroBanner data={heroBanner} />

//     <Introduction data={intro} />

//     <Introduction data={intro2} />

//     <ContentWithImageColTwo data={contentWithImage} />

//     <ContentWithImageColTwo data={contentWithImage2} />

//     <ContentWithImageColTwo data={contentWithImage3} />

//     <ContentWithImageColTwo data={contentWithImage4} />

//     <div className="section_bgImage bg-darkBlue">
//       <Introduction data={intro3} />

//       <ColFourCards data={colFourCard} />

//       <ContactFormSecond data={contactForm} />

//       <FooterMap data={footerMap} />
//     </div>
//   </>
// );