import Link from 'next/link'
import React from 'react'
import { classifyStr } from "../lib/utils/string"

export default function Button({classes, ctaData }) {

    const twConfig = {
        "gradient-btn": 'gradient-btn',
        "gray-btn": 'gradient-btn bgWhiteBtn',
        "transparent-btn": 'gradient-btn border-btn',
      }


    const handleScroll = () => {
        const targetElement = document.getElementById("get-in-touch");
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(
            null,
            document.title,
            window.location.pathname
          );
        }
      };

  return (
    <div    onClick={handleScroll}
            >
              <Link  className={`${classes} ${twConfig[classifyStr(ctaData?.fields?.ctaClass)]}`} href={ctaData?.fields?.ctaLink}><span>{ctaData?.fields?.ctaText}</span></Link>
            </div>
  )
}
