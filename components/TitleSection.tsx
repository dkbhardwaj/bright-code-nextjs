import React from "react";
import Link from "next/link";

/**
 * Props contract for TitleSection component
 */
interface TitleSectionProps {
  badgeText?: string;
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  badgeText,
  title,
  description,
  buttonText,
  buttonLink = "#",
}) => {
  return (
    <section className="title-section padding-large">
      <div className="container">
        <div className="wrap max-w-[928px] mx-auto text-center">
          {/* Badge */}
          {badgeText && <span className="announcemnet-badge">{badgeText}</span>}

          {/* Title */}
          <h3 className="lg-up:text-[40px] font-[600] max-w-[515px] mx-auto">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="md-up:text-[16px] text-[#8d97ad] mt-[20px]">
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
