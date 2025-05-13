import React from 'react'
import Link from "next/link";
import Button from "../Button"
import Image from "next/image";

export default function ImageWithContent({imgUrl,title,cta}) {
  return (
    <>
      {imgUrl && (
          <div className="left_img absolute bottom-0 right-[60%] w-full max-w-[526px] h-[506px] z-[3] desktop:max-w-[450px] desktop:h-[450px]  tablet:max-w-[400px] tablet:h-[400px] xl:right-auto tablet:left-0 md:h-[310px] md:max-w-[325px]  md:left-[50%] md:translate-x-[-50%] ">
            <Image
              src={`https:${imgUrl}`}
              alt="left-img"
              className=" w-full h-full object-cover"
              priority
              layout="fill" 
              objectFit="cover"
              quality={80}
            />
          </div>
        )}
        
        <div className={`w-full max-w-[750px] ${imgUrl ? "ml-auto tablet:w-[calc(100%-400px)] xl:max-w-full  desktop:w-[calc(100%-450px)]" : "mr-auto xl:max-w-[700px]  desktop:w-[calc(100%-300px)]" }  relative z-[2] text-left   md:text-center md:mx-auto `}>
          {title && <h1 className="header-h1 text-white ">{title}</h1>}

          {cta && (
            <Button ctaData={cta} classes={'mt-14 mx-auto md:mt-6 '} />
          )}
        </div>
    </>
  )
}
