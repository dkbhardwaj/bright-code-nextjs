import React from 'react'
import PageBuilder from './PageBuilder'
import FooterMap from './FooterMap'
import Image from 'next/image'

export default function GroupContactInfo({data}) {

  const padding = (data?.sectionPadding?.fields?.padding)?.join(" ")

  let bgImg = data?.backgroundImage?.fields?.file?.url

  return (
    <div className={`relative md:overflow-hidden ${bgImg ? "section_overlay_dark" : "section_bgImage bg-darkBlue"} ${padding}`}>
      {bgImg && (
              <div className="absolute top-0 left-0 w-full h-full ">
                <Image
                  src={`https:${bgImg}`}
                  alt="bg-img"
                  className="w-full h-full object-cover object-center"
                  priority
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
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
