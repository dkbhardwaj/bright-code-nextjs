
import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";


import {fetchEntryBySlug} from "../lib/contentful/pageData"
import PageBuilder from '../integrated-componnents/PageBuilder'


interface HomeProps {
  entry: any; 
  slug: string;
} 

const Home: React.FC<HomeProps> = ({entry}) => {

  let seoData = entry?.fields?.seoData?.fields
 
  return(
    <>
     <NextSeo
       title={seoData?.SEOTitle}
       description={seoData?.SEODescription}
      openGraph={
          {
              title:seoData?.SEOTitle,
              description: seoData?.SEODescription || "",
              images: [ 
                {
                url: `${(seoData?.ogImage?.fields?.file?.url) ? ``: `https:${seoData?.ogImage?.fields?.file?.url}`}`,
                width: 1200, height: 600, alt: "Homepage",
                }
                ],
              siteName: 'Bright-code',
            }
      }
     />
     <PageBuilder pageComponents={entry?.fields?.section} />
    </>
  )
};

export default Home;


export async function getServerSideProps() {
 
  let slug = `homepage`
  const entry = await fetchEntryBySlug(slug, "basicPage");
 
  return { props: { entry } };
}
