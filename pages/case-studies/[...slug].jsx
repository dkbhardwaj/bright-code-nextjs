import React from 'react'
import {fetchEntryBySlug} from "../../lib/contentful/pageData"
import { NextSeo } from 'next-seo';


import PageBuilder from '../../integrated-componnents/PageBuilder'


export default function CaseStudies({entry,slug}) {
  let seoData = entry?.fields?.seoData?.fields
  
  return (
    <>
    <NextSeo
        title={seoData?.SEOTitle}
        description={seoData?.SEODescription}
        openGraph={{ type: 'case study detail',title: `${seoData?.SEOTitle}`,
          description: `${seoData?.SEODescription}`,
          images: [ 
          {
          url: `${(seoData?.ogImage?.fields?.file?.url) ? `https:${seoData?.ogImage?.fields?.file?.url}`: `/banner-bg-img.png`}`,
          width: 1200, height: 600, alt: "case studies",
          }
          ],
          twitter: {
            cardType: 'summary_large_image',
            site: '@brightcode',
            },
        }}
        twitter={{
          cardType: 'summary_large_image',
          title: `${seoData?.SEOTitle}`,
          description: `${seoData?.SEODescription}`,
          handle: '@brightcode',
          site: '@brightcode',
        }}
      />

     
      <PageBuilder pageComponents={entry?.fields?.section} />
    </>
  )
}


export async function getServerSideProps(context) {
 
  let slug = `${context.query.slug}`
  let preview = context.query?.secret == "preview" ? true : false
 
  const entry = await fetchEntryBySlug(slug, "caseStudies", preview);
 
  return { props: { entry,slug } };
}
