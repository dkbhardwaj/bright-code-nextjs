import React from "react";
import BannerThird from "../components/BannerThird";
import PrivacyPolicyContent from "../components/PrivacyPolicyContent";
import { bannerThird, textContent } from "../dataPrivacyPolicy/data";

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <BannerThird data={bannerThird} />
      <PrivacyPolicyContent data={textContent} />
    </>
  );
};
export default PrivacyPolicy;
