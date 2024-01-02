import React from "react";
import Link from "next/link";

const ContentWithImage: React.FC = () => {
  return (
    <section className="contentWithImage py-20 overflow-hidden bg-lightGray">
      <div className="container">
        <div className="w-mainRow -ml-2.5 flex items-center z-1 relative">
          <div className="content w-halfWidth mx-2.5 text-spaceBlack pr-10">
            <h3>Pro Version coming soon</h3>
            <p className="mt-4">
              We will add Pro Version with tons of great features and multiple
              category demos which is ready to use...
            </p>
            <div className="btnWrap mt-8">
              <Link href="#" className="pink-btn">
                Coming Soon
              </Link>
            </div>
          </div>
          <div className="content w-halfWidth mx-2.5">
            <div className="imageWrap overflow-hidden rounded-lg w-full max-h-[350px] h-full">
              <img src="/riverflowone.png" alt="girl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentWithImage;
