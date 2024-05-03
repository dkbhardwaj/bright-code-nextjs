import React from "react";
import BannerThird from "../components/BannerThird";
import { bannerThird } from "../dataPrivacyPolicy/data";
import PrivacyPolicyContent from "../components/PrivacyPolicyContent";

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <BannerThird data={bannerThird} />
      <PrivacyPolicyContent />
    </>
  );
};
export default PrivacyPolicy;
