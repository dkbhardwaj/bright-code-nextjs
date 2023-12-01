import React from "react";

const Overview: React.FC = () => {
  return (
    <section className="contentWithImage pt-32 pb-4">
      <div className="container">
        <div className="w-mainRow -ml-2.5 flex z-1 relative">
          <div className="content w-halfWidth mx-2.5 pl-10">
            <span className="title">CUSTOMER EXPERIENCE</span>
            <h2 className="text-darkGray mt-2">Invested in your success</h2>
          </div>
          <div className="content w-halfWidth mx-2.5 mt-10">
            <p className="text-gray">
              When you partner with us, you activate an entire team of
              experts, working alongside you to reach your goals faster. Unlock
              resources, support and programs that empower your team to keep
              learning, optimizing and realizing even more value over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
