import React from 'react';
import BannerThird from '../components/BannerThird';
import { bannerThird } from '../data/privacyPolicy';
import PrivacyPolicyContent from '../components/PrivacyPolicyContent';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <BannerThird data={bannerThird} />
      <PrivacyPolicyContent />
    </>
  );
};
export default PrivacyPolicy;
