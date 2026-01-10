import React from "react";
import Link from "next/link";
import Image from "next/image";

type Theme = "light" | "dark";

interface CtaProps {
  theme?: Theme;
  data: {
    bgImage: string;
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    buttonClass?: string;
  };
}

export default function Cta({ data, theme = "light" }: CtaProps) {
  const { bgImage, title, description, buttonText, buttonUrl, buttonClass } =
    data;

  const isDark = theme === "dark";

  return (
    <section
      className={`cta padding-small ${
        isDark ? "bg-[#000D20]" : ""
      }`}
    >
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
              className={`mt-[20px] inline-block text-white no-arrow ${
                buttonClass ?? ""
              }`}
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
