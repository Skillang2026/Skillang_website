import React from "react";
import PartnerWithUsHeader from "../../sections/more/partner-with-us/Header/PartnerWithUsHeader";
import PartnerTypeSection from "../../sections/more/partner-with-us/PartnerType/PartnerTypeComp";
import WhySkiilangPartnerSection from "../../sections/more/partner-with-us/WhySkillangPartner/WhySkiilangPartnerSection";

const PartnerWithUsPage = () => {
  return (
    <>
      <div className="section-spacin mb-5 pb-5">
        <PartnerWithUsHeader />
      </div>
      <div className="section-spacing">
        <PartnerTypeSection />
      </div>
      <div className="section-spacing">
        <WhySkiilangPartnerSection />
      </div>
    </>
  );
};

export default PartnerWithUsPage;
