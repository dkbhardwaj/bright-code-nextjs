import React from "react";

const Overview: React.FC = () => {
  return (
    <>
      <section className="overview pt-16 pb-20 md:pt-8 md:pb-12 bg-extraLightGray overflow-x-hidden ">
        <div className="container">
          <div className="w-full z-1 relative">
            <div
              className="content w-full text-center relative"
              data-aos="fade-right"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h6 className="title text-[#8000FF] uppercase font-normal mb-3 md:mb-1">
                Harmony of Minds
              </h6>
              <h2 className="font-medium text-black mb-[38px]  md:mb-4">
                Collaboration and Expertise
              </h2>
            </div>
            <div
              className="content w-full text-center relative"
              data-aos="fade-left"
              data-aos-delay="500"
              data-aos-duration="1000"
            >
              <h5 className="text-black font-light">
                In the fast-paced world of digital solutions, strategic
                collaboration is the cornerstone of lasting success. We act as
                the strategic ally that design agencies can rely on for seamless
                project execution. We understand the nuances of the industry,
                stay ahead of technological trends, and align our services with
                the evolving needs of design agencies. Our agency-to-agency
                model is built on collaboration and expertise. With us by your
                side, you’re not just gaining a development partner; you’re
                forging a strategic alliance geared towards mutual growth and
                client satisfaction.
              </h5>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Overview;
