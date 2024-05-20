import React, { Suspense } from "react";
// import BannerSecond from "../components/BannerSecond";
// import PrivacyPolicyContent from "../components/PrivacyPolicyContent";
import dynamic from "next/dynamic";
import { bannersecond, textContent } from "../dataPrivacyPolicy/data";

const BannerSecond = dynamic(() => import("../components/BannerSecond"));
const PrivacyPolicyContent = dynamic(
  () => import("../components/PrivacyPolicyContent")
);

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <BannerSecond data={bannersecond} />

      <Suspense fallback={<div></div>}>
        <PrivacyPolicyContent data={textContent} />
      </Suspense>
    </>
  );
};
export default PrivacyPolicy;
