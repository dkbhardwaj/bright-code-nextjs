import React from "react";
import Link from "next/link";

/**
 * Props contract for TitleSection component
 */
interface TitleSectionProps {
  badgeText?: string;
  title: string;
  alignment: "left" | "center";
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  theme?: "light" | "dark";
}

const TitleSection: React.FC<TitleSectionProps> = ({
  badgeText,
  title,
  description,
  alignment,
  buttonText,
  buttonLink = "#",
  theme = "light",
}) => {
  return (
    <section
      className={`title-section padding-large ${
        theme === "dark" ? "darkMode" : ""
      }`}
    >

      <div className="container">
        <div className={`wrap mx-auto ${alignment == "left" ? "text-left max-w-[480px] ml-0 mr-auto" : "text-center max-w-[928px]"} `}>
          {/* Badge */}
          {badgeText && <span className="announcemnet-badge">{badgeText}</span>}

          {/* Title */}
          <h3 className={`lg-up:text-[40px] font-[600] ${alignment == "left" ? "" : " mx-auto"}`}>
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className={`md-up:text-[16px] text-[#8d97ad] mt-[20px] ${alignment == "left" ? "" : " mx-auto"}`}>
              {description}
            </p>
          )}

          {/* Button */}
          {buttonText && (
            <Link
              href={buttonLink}
              className="gradient-btn-blue mt-[20px] inline-block"
            >
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default TitleSection;
