import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ColTwoCardProps {
  reverse: boolean;

  image?: {
    light: string;
    dark: string;
  };
  imageSrc?: string; // fallback (optional)

  imageAlt: string;
  badgeText: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  theme?: "light" | "dark";
}


const ColTwoCard: React.FC<ColTwoCardProps> = ({
  reverse,
  image,
  imageSrc,
  imageAlt,
  badgeText,
  title,
  description,
  buttonText,
  buttonLink,
  theme = "light",
}) => {
  // 🔥 Pick correct image based on theme
  const resolvedImage =
    image?.[theme] || imageSrc || "";

  return (
    <section
      className={`colTwoCard padding-large ${
        theme === "dark" ? "darkMode" : ""
      }`}
    >
      <div className="container">
        <div
          className={`w-full flex flex-wrap items-center ${
            reverse ? "flex-row-reverse" : ""
          }`}
        >
          {/* Image Column */}
          <div className="w-halfWidth lg:w-full mx-[10px]">
            <div className="w-full max-w-[541px] lg:mb-[20px] lg:mx-auto">
              <Image
                src={resolvedImage}
                width={2500}
                height={1200}
                alt={imageAlt}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="w-halfWidth lg:w-full mx-[10px]">
            <div className="max-w-[641px] lg:max-w-none lg:mt-8 lg:text-center">
              <span className="announcemnet-badge">{badgeText}</span>

              <h3 className="lg-up:text-[40px] font-[600]">
                {title}
              </h3>

              <p className="md-up:text-[16px] mt-[20px]">
                {description}
              </p>

              <Link href={buttonLink} className="gradient-btn-blue mt-[20px]">
                {buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColTwoCard;
