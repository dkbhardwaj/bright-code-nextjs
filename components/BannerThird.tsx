import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BannerThirdData {
  data: {
    bannerBgImg: string;
    preTitle: string;
    highlightedText: string;
    postTitle: string;
    buttonUrl?: string; // kept for backward compatibility if needed
    buttonText?: string;
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
    bannerBgImg,
    preTitle,
    highlightedText,
    postTitle,
    paragraphContent,
    buttons,
  } = data;

  return (
    <section className="banner-third min-h-[750px] lg:min-h-[600px] flex items-center overflow-hidden padding-medium">
      {bannerBgImg && (
        <div className="absolute w-full h-full top-0 left-0 -z-10">
          <Image
            src={bannerBgImg}
            fill // better than fixed width/height for full coverage
            loading="lazy"
            alt="Banner background"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="container">
        <div className="w-full lg-up:max-w-[675px] relative z-10 lg:pt-[100px]">
          {(preTitle || highlightedText || postTitle) && (
            <h1 className="text-[#000D20] lg-up:text-[56px]">
              {preTitle && <>{preTitle} </>}
              {highlightedText && (
                <span className="text-[#0044FF]">
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
                className="mt-[10px] text-[#333333]"
                dangerouslySetInnerHTML={{ __html: item.paragraph }}
              />
            ))}

          {buttons && buttons.length > 0 && (
            <div className="flex gap-4 mt-[42px] lg:mt-5 flex-wrap">
              {buttons.map((button) => (
                <Link
                  key={button.id}
                  href={button.url}
                  className={button.className || "gradient-btn"}
                >
                  {button.text}
                </Link>
              ))}
            </div>
          )}
          <span className="text-[12px] font-[400] text-[#333333] ">White-label web development for agencies and marketing teams who refuse “good enough.</span>
        </div>
      </div>
    </section>
  );
};

export default BannerThird;
