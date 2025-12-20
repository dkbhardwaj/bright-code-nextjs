import React from "react";
import Link from "next/link";
import Image from "next/image";

// 1. Define the shape of the data
interface CtaProps {
  data: {
    bgImage: string;
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    buttonClass?: string; // Optional, incase you want to change color later
  };
}

export default function Cta({ data }: CtaProps) {
  // Destructure for cleaner usage
  const { bgImage, title, description, buttonText, buttonUrl, buttonClass } =
    data;

  return (
    <section className="cta padding-small">
      <div className="container">
        <div className="wrap relative rounded-[32px] py-[100px] lg:py-[60px] overflow-hidden">
          <div className="bg-image absolute w-full h-full top-0 left-0 z-0">
            <Image
              src={bgImage}
              alt="CTA Background"
              fill
              className="object-cover"
            />
          </div>
          <div className="content relative z-10 text-center max-w-[1000px] mx-auto px-4">
            <h3 className="text-white lg-up:text-[40px]">{title}</h3>
            <p className="text-white lg-up:text-[16px] mt-[20px] max-w-[524px] mx-auto">
              {description}
            </p>
            <Link
              href={buttonUrl}
              // Defaults to 'blue no-arrow' if no class is passed
              className={`mt-[20px] text-white no-arrow ${buttonClass}"`}
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
