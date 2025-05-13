import React from "react";
import Button from "../Button";

export default function VideoWithContent({ videoUrl, title, cta }) {
  return (
    <>
      <div className="relative flex flex-wrap items-center w-[calc(100%+20px)] ml-[-10px] ">
        <div className="w-[calc(50%-20px)] mx-[10px]">
          {videoUrl && (
            <div className="left_img relative w-full  z-[1]">
              <video
                className="relative"
                src={`https:${videoUrl}`}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "auto" }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
        <div className="relative pl-[10px] w-[calc(50%-20px)] mx-[10px] z-[1]">
          {title && <h1 className=" header-h1 text-white ">{title}</h1>}

          {cta && <Button ctaData={cta} classes={"mt-14 mx-auto md:mt-6"} />}
        </div>
      </div>
    </>
  );
}
