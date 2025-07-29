import React from "react";
import LandingNavBar from "../../components/landing/landing-nav/landing-nav";
import NurseForm from "../../sections/landing/nurse-in-germany/nurseForm";
import WhyUsNurse from "../../sections/landing/nurse-in-germany/whyUsNurse";
import NurseEligibility from "../../sections/resuable/nurse-eligibility/nurseEligibility";
import WhyGermany from "../../sections/landing/nurse-in-germany/whyGermany";
import NurseStats from "../../sections/resuable/nurse-stats/nurseStats";
import LandingFooter from "../../components/landing/landing-footer/landingFooter";

const LandingNursePage = () => {
  return (
    <div>
      <LandingNavBar />
      <div className="section-spacin mb-5 pb-5 pb-md-0">
        <NurseForm />
      </div>
      <div className="section-spacig mb-5 pb-5 pb-md-0 mb-md-0">
        <WhyUsNurse />
      </div>
      <div className="section-spacing">
        <NurseEligibility />
      </div>
      <div className="section-spacing">
        <WhyGermany />
      </div>
      <div className="section-spacing">
        <NurseStats />
      </div>
      <LandingFooter />
    </div>
  );
};

export default LandingNursePage;
