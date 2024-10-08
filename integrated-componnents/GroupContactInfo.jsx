import React from 'react'
import PageBuilder from './PageBuilder'
import FooterMap from './FooterMap'

export default function GroupContactInfo({data}) {

  const padding = (data?.sectionPadding?.fields?.padding)?.join(" ")

  return (
    <div className={`section_bgImage bg-darkBlue ${padding}`}>
        {data?.title && (
            <div className="relative w-full mx-auto text-center z-[2] mb-[50px] md:mb-[20px]">
            <h2 className="large text-white mb-0 font-medium text-black ">{data?.title}</h2>
        </div>
        )}
        
        <PageBuilder pageComponents={data?.sections} caseStudy={false} />
        {data.imageWithMap &&
           ( <FooterMap />)
        }
    </div>
  )
}
