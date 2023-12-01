import React from "react";

const ContentWithImage: React.FC = () => {
  return (
    <section className="contentWithImage py-32 overflow-hidden bg-opalGreen">
      <div className="container">
        <div className="w-mainRow -ml-2.5 flex flex-row-reverse items-center z-1 relative">
          <div className="content w-halfWidth mx-2.5 text-white pl-10">
            <h3>Pro Version coming soon</h3>
            <p className="mt-4">
              We will add Pro Version with tons of great features and multiple
              category demos which is ready to use...
            </p>
            <div className="btnWrap mt-8">
              <a href="#" className="black-btn">
                Coming Soon
              </a>
            </div>
          </div>
          <div className="content w-halfWidth mx-2.5">
            <div className="imageWrap overflow-hidden rounded-lg shadow-lg w-full max-h-[350px] h-full">
              <img src="/girl.jpg" alt="girl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentWithImage;
