import React from "react";

const ColThreeGrid: React.FC = () => {
  return (
    <section className="ColThreeGrid py-20">
      <div className="container">
        <div className="w-mainRow flex">
          <div className="w-threeCard mx-2.5">
            <div className="icon-wrap max-w-[40px] mb-5">
              <img src="/Icon_patient_safety.webp" alt="Icon_patient_safety" />
            </div>
            <h4 className="mb-2 text-spaceBlack">Increasing patient safety</h4>
            <p className="text-gray">
              We&#39;ve improved our network-wide Quality Index Score for
              electronic prescriptions more than 200% since 2016.3
            </p>
          </div>
          <div className="w-threeCard mx-2.5">
            <div className="icon-wrap max-w-[40px] mb-5">
              <img src="/Icon_quality_care.webp" alt="Icon_patient_safety" />
            </div>
            <h4 className="mb-2 text-spaceBlack">Increasing patient safety</h4>
            <p className="text-gray">
              We&#39;ve improved our network-wide Quality Index Score for
              electronic prescriptions more than 200% since 2016.3
            </p>
          </div>
          <div className="w-threeCard mx-2.5">
            <div className="icon-wrap max-w-[40px] mb-5">
              <img src="/Icon_lowering_costs.webp" alt="Icon_patient_safety" />
            </div>
            <h4 className="mb-2 text-spaceBlack">Increasing patient safety</h4>
            <p className="text-gray">
              We&#39;ve improved our network-wide Quality Index Score for
              electronic prescriptions more than 200% since 2016.3
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColThreeGrid;
