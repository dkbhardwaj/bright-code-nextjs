
import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";


import {fetchEntryBySlug} from "../lib/contentful/pageData"
import PageBuilder from '../integrated-componnents/PageBuilder'


interface HomeProps {
  entry: any; 
  slug: string;
  fullUrl: string;
} 

const Home: React.FC<HomeProps> = ({entry,fullUrl}) => {

  let seoData = entry?.fields?.seoData?.fields
 
  return(
    <>
     <NextSeo
        title={seoData?.SEOTitle}
        description={seoData?.SEODescription}
        canonical={fullUrl}
        openGraph={{
          type: 'website',
          siteName: 'Bright-code',
          url: `${fullUrl}`,
          title: seoData?.SEOTitle,
          description: seoData?.SEODescription,
          images: [
            {
              url: seoData?.ogImage?.fields?.file?.url || `/banner-bg-img.png`,
              width: 800,
              height: 600,
              alt: 'case studies',
            }
          ],
        }}
        twitter={{
          site: '@GetSift',
          cardType: 'summary_large_image',
          // image: seoData?.ogImage?.fields?.file?.url || `/banner-bg-img.png`,
        }}
      />
     <PageBuilder pageComponents={entry?.fields?.section} caseStudy={false}/>
    </>
  )
};

export default Home;


export async function getServerSideProps(context: { req: any; }) {
 
  let slug = `homepage`
  const { req } = context;
  const protocol = req.headers.referer ? req.headers.referer.split(':')[0] : 'http';
  const fullUrl = `${protocol}://${req.headers.host}${req.url}`;
  const entry = await fetchEntryBySlug(slug, "basicPage");
 
  return { props: { entry,fullUrl } };
}
