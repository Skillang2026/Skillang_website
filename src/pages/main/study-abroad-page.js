import React from "react";
import StudyAbroadHeader from "../../sections/main/study-abroad/study_header";
import WhyStudyAbroad from "../../sections/main/study-abroad/whystudyabroad";
import AbroadDestination from "../../sections/main/study-abroad/abroad_destination";
import IndemandCourse from "../../sections/main/study-abroad/indemand-courses/indemand_course";
import StudyAbroad from "../../sections/resuable/study-abroad-journey/study-abroad-journey";
import CountriesWeServe from "../../sections/resuable/countries-we-serve/countriesWeServe";
import UniPartner from "../../sections/resuable/uni-partner/uni-partner";

const StudyAbroadPage = () => {
  return (
    <>
      <div className="section-spacing">
        <StudyAbroadHeader />
      </div>
      <div className="section-spacing">
        <WhyStudyAbroad />
      </div>
      <div className="section-spacing">
        <AbroadDestination />
      </div>
      <div className="section-spacing">
        <IndemandCourse />
      </div>
      <div className="section-spacing">
        <StudyAbroad />
      </div>
      <div className="section-spacing">
        <CountriesWeServe />
      </div>
      <div className="section-spacing">
        <UniPartner />
      </div>
    </>
  );
};

export default StudyAbroadPage;
