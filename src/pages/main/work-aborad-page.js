import React from "react";
import WorkAbroadHeader from "../../sections/main/work-abroad/header";
import WhyChooseSkillang from "../../sections/resuable/why-skillang/whySkillangSection";
import CountriesWeServe from "../../sections/resuable/countries-we-serve/countriesWeServe";
import SkillShortage from "../../sections/main/work-abroad/skillShortage";
import ServiceOfferCountryWise from "../../sections/main/work-abroad/serviceOfferCountryWise";
import AbroudJourney from "../../sections/main/work-abroad/abroud_journey";
import PartnerWithUsSection from "../../sections/resuable/partner-with-us/partnerWithUs";

const WorkAboradPage = () => {
  return (
    <>
      <div className="section-spacing">
        <WorkAbroadHeader />
      </div>
      <div className="section-spacing">
        <CountriesWeServe />
      </div>
      <div className="section-spacing">
        <SkillShortage />
      </div>
      <div className="section-spacing">
        <WhyChooseSkillang />
      </div>
      <div className="section-spacing">
        <ServiceOfferCountryWise />
      </div>
      <div className="section-spacing">
        <AbroudJourney />
      </div>
      <div className="section-spacing">
        <PartnerWithUsSection />
      </div>
    </>
  );
};

export default WorkAboradPage;
