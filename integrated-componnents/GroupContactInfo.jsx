import React from 'react'
import PageBuilder from './PageBuilder'
import FooterMap from './FooterMap'

export default function GroupContactInfo({data}) {

    let sectionPadding = data.sectionPadding?.fields?.padding
  return (
    <div className={`section_bgImage bg-darkBlue ${sectionPadding}`}>
        {data?.title && (
            <div className="relative w-full mx-auto text-center z-[2] mb-[50px] md:mb-[20px]">
            <h2 className="large text-white mb-0 font-medium text-black ">{data?.title}</h2>
        </div>
        )}
        
        <PageBuilder pageComponents={data?.sections} />
        {data.imageWithMap &&
           ( <FooterMap />)
        }
    </div>
  )
}
