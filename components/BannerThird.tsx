import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ThemeImage {
  light: string;
  dark: string;
}

interface BannerThirdData {
  data: {
    theme?: "light" | "dark";
    bannerBgImg:
    | string
    | ThemeImage
    | {
      bg?: ThemeImage;
      leftIcons?: ThemeImage;
      rightImg?: ThemeImage;
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

  const isDark = theme === "dark";
  type ThemeImage = { light: string; dark: string };

  const resolveImage = (
    img?: string | ThemeImage
  ) => {
    if (!img) return "";

    if (typeof img === "string") return img;

    if ("light" in img && "dark" in img) {
      return isDark ? img.dark : img.light;
    }

    return "";
  };


  const bgImage =
    typeof bannerBgImg === "string"
      ? resolveImage(bannerBgImg)
      : typeof bannerBgImg === "object" && "bg" in bannerBgImg
        ? resolveImage(bannerBgImg.bg)
        : resolveImage(bannerBgImg as ThemeImage);


  const leftIcons =
    typeof bannerBgImg === "object" && "leftIcons" in bannerBgImg
      ? resolveImage(bannerBgImg.leftIcons)
      : "";

  const rightImage =
    typeof bannerBgImg === "object" && "rightImg" in bannerBgImg
      ? resolveImage(bannerBgImg.rightImg)
      : "";

  return (
    <section
      className={`banner-third relative min-h-[750px] lg:min-h-[600px] flex items-center overflow-hidden padding-medium ${isDark ? "darkMode" : ""
        }`}
    >
      {/* Background */}

      {bgImage && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={bgImage}
            fill
            priority
            alt="Banner background"
            className="object-cover"
          />
        </div>
      )}

      {/* Left Icons */}
      {leftIcons && (
        <div
          className="
      absolute left-[-2px] bottom-0 z-0
      hidden lg-up:block
      w-[420px] h-[300px]
      desktop:w-[600px] desktop:h-[420px]
      xl-up:w-[854px] xl-up:h-[622px]
    "
        >
          <Image
            src={leftIcons}
            fill
            className="object-contain"
            alt="Decorative icons"
          />
        </div>
      )}


      {/* Right Image */}
      {rightImage && (
        <div
          className="
      absolute right-[10%] bottom-[20px] z-0
      hidden md-up:block
      w-[220px] h-[240px]
      tablet:w-[300px] tablet:h-[340px]
      desktop:w-[420px] desktop:h-[460px]
      xl-up:w-[523px] xl-up:h-[566px]
    "
        >
          <Image
            src={rightImage}
            fill
            className="object-contain"
            alt="Hero visual"
          />
        </div>
      )}



      {/* Content */}
      <div className="container relative z-10">
        <div className="w-full lg-up:max-w-[700px] lg:pt-[100px]">
        {(preTitle || highlightedText || postTitle) && (
            <h1
              className={`lg-up:text-[56px] ${
                isDark ? "text-white" : "text-[#000D20]"
              }`}
            >
              {preTitle && <>{preTitle} </>}

              {highlightedText && (
                <span
                  className={`text-[#0044FF] font-[600]`}
                >
                  {highlightedText}
                </span>
              )}

              {postTitle && <> {postTitle}</>}
            </h1>
          )}

          {paragraphContent.map((item) => (
            <p
              key={item.id}
              className={`mt-[10px] ${isDark ? "text-[#D1D1D6]" : "text-[#333333]"
                }`}
            >
              {item.paragraph}
            </p>
          ))}

          {buttons?.length > 0 && (
            <div className="flex gap-4 mt-[42px] lg:mt-5 flex-wrap">
              {buttons.map((button) => (
                <Link
                  key={button.id}
                  href={button.url}
                  className={button.className}
                >
                  {button.text}
                </Link>
              ))}
            </div>
          )}

          <span
            className={`block mt-4 text-[14px] ${isDark ? "text-[#D1D1D6]" : "text-[#333333]"
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

