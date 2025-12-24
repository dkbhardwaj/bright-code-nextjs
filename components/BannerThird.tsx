import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BannerThirdData {
  data: {
    theme?: "light" | "dark";
    bannerBgImg:
      | string
      | {
          light: string;
          dark: string;
        };
    preTitle: string;
    highlightedText: string;
    postTitle: string;
    paragraphContent: {
      id: number;
      paragraph: string;
    }[];
    buttons: {
      id: number;
      url: string;
      text: string;
      className?: string;
    }[];
  };
}

const BannerThird: React.FC<BannerThirdData> = ({ data }) => {
  const {
    theme = "light",
    bannerBgImg,
    preTitle,
    highlightedText,
    postTitle,
    paragraphContent,
    buttons,
  } = data;

  const isDark = theme === "light";

  // ✅ resolve correct background image
  const bgImage =
    typeof bannerBgImg === "string"
      ? bannerBgImg
      : isDark
      ? bannerBgImg.dark
      : bannerBgImg.light;

  return (
    <section className="banner-third relative min-h-[750px] lg:min-h-[600px] flex items-center overflow-hidden padding-medium">
      {bgImage && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={bgImage} // ✅ use resolved image
            fill
            loading="lazy"
            alt="Banner background"
            className="object-cover"
          />
        </div>
      )}

      <div className="container">
        <div className="w-full lg-up:max-w-[675px] relative z-10 lg:pt-[100px]">
          {(preTitle || highlightedText || postTitle) && (
            <h1
              className={`lg-up:text-[56px] ${
                isDark ? "text-white" : "text-[#000D20]"
              }`}
            >
              {preTitle && <>{preTitle} </>}

              {highlightedText && (
                <span
                  className={`${
                    isDark ? "text-[#60A5FA]" : "text-[#0044FF]"
                  }`}
                >
                  {highlightedText}
                </span>
              )}

              {postTitle && <> {postTitle}</>}
            </h1>
          )}

          {paragraphContent?.length > 0 &&
            paragraphContent.map((item) => (
              <p
                key={item.id}
                className={`mt-[10px] ${
                  isDark ? "text-[#D1D1D6]" : "text-[#333333]"
                }`}
                dangerouslySetInnerHTML={{ __html: item.paragraph }}
              />
            ))}

          {buttons?.length > 0 && (
            <div className="flex gap-4 mt-[42px] lg:mt-5 flex-wrap">
              {buttons.map((button) => (
                <Link
                  key={button.id}
                  href={button.url}
                  className={
                    button.className ||
                    (isDark ? "gradient-btn-dark" : "gradient-btn")
                  }
                >
                  {button.text}
                </Link>
              ))}
            </div>
          )}

          <span
            className={`block mt-4 text-[12px] font-[400] ${
              isDark ? "text-[#D1D1D6]" : "text-[#333333]"
            }`}
          >
            White-label web development for agencies and marketing teams who
            refuse “good enough.”
          </span>
        </div>
      </div>
    </section>
  );
};

export default BannerThird;
