import React from "react";
import BannerSecond from "../components/BannerSecond";
import PrivacyPolicyContent from "../components/PrivacyPolicyContent";
import { bannersecond, textContent } from "../dataPrivacyPolicy/data";

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <BannerSecond data={bannersecond} />
      <PrivacyPolicyContent data={textContent} />
    </>
  );
};
export default PrivacyPolicy;
