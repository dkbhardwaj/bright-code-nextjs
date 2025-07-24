import React from 'react'
import {fetchEntryBySlug} from "../../lib/contentful/pageData"
import { NextSeo } from 'next-seo';
import {client} from "../../lib/contentful/client"


import PageBuilder from '../../integrated-componnents/PageBuilder'
import CaseStudyLayout from './caseStudyLayout';



export default function CaseStudies({entry,fullUrl}) {
  let seoData = entry?.fields?.seoData?.fields
  
  return (
    <>
    <CaseStudyLayout>
     <NextSeo
        title={seoData?.SEOTitle}
        description={seoData?.SEODescription}
        canonical={fullUrl}
        openGraph={{
          type: 'case-studies',
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
          image: seoData?.ogImage?.fields?.file?.url || `/banner-bg-img.png`,
        }}
      />

     
      <PageBuilder pageComponents={entry?.fields?.section} caseStudy={true} />
      </CaseStudyLayout>
    </>
  )
}


export async function getServerSideProps(context) {
 
  let slug = `${context.query.slug}`
  let preview = context.query?.secret == "preview" ? true : false
  const { req } = context;
      const protocol = req.headers.referer ? req.headers.referer.split(':')[0] : 'https';
      const fullUrl = `${protocol}://${req.headers.host}${req.url}`;
  const entry = await fetchEntryBySlug(slug, "caseStudies", preview);

   const navRes = await client.getEntries({
        content_type: "navigation",
        "fields.navName": "Main Nav",
    });
    const navigationData = navRes.items[0]?.fields ?? null;
 
  return { props: { entry,fullUrl, navigationData } };
}
