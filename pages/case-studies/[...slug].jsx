import React from 'react'
import {fetchEntryBySlug} from "../../lib/contentful/pageData"
// import { useRouter } fr om "next/router";
import PageBuilder from '../../integrated-componnents/PageBuilder'

export default function CaseStudies({entry,slug}) {
  

  
  return (
    <>
      <PageBuilder pageComponents={entry} />
    </>
  )
}


export async function getServerSideProps(context) {
 
  let slug = `/${context.query.slug}`
  // // Fetch data from external API
  const entry = await fetchEntryBySlug(slug, "caseStudies");

  return { props: { entry,slug } };
}
