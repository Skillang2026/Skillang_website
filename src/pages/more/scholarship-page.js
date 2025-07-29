import React from "react";
import ScholarshipHeader from "../../sections/more/scholarships/Header/ScholarshipHeader";
import TypesOfScholarship from "../../sections/more/scholarships/types-scholarship/TypesOfScholarship";
import LangContactUs from "../../sections/main/lang-test/lang-connect/LangContactUs";
import WhySkillangEdu from "../../sections/more/education-loan/whyskillangEdu/WhySkillangEdu";
import ScholarshipTimeline from "../../sections/more/scholarships/steps-timeline/ScholarshipTimeline";
import PartneredUni from "../../sections/resuable/partnered-uni/partnered_uni";
import TopScholarshipComp from "../../sections/more/scholarships/topScolarships/TopScholarship";

const ScholarshipPage = () => {
  return (
    <>
      <div className="mb-5">
        <ScholarshipHeader />
      </div>
      <div className="section-spacing">
        <TypesOfScholarship />
      </div>
      <div className="section-spacing">
        <TopScholarshipComp />
      </div>
      <div className="section-spacing">
        <WhySkillangEdu />
      </div>
      <div className="section-spacing">
        <ScholarshipTimeline />
      </div>
      <div className="section-spacing">
        <LangContactUs />
      </div>
      {/* <div className="section-spacing">
        <PartneredUni />
      </div> */}
    </>
  );
};

export default ScholarshipPage;
