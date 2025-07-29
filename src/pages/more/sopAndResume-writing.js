import React from "react";
import LangContactUs from "../../sections/main/lang-test/lang-connect/LangContactUs";
import PartneredUni from "../../sections/resuable/partnered-uni/partnered_uni";
import SOPHeaderComp from "../../sections/more/sop-and-resume-writing/Header/SOPHeader";
import SOPStepsTimelineComp from "../../sections/more/sop-and-resume-writing/steps-timeline/sopSteps";
import WhySkillangSOPComp from "../../sections/more/sop-and-resume-writing/why-skillang-sop/WhySkillangSOP";
import SOPOverviewComp from "../../sections/more/sop-and-resume-writing/overview/overview";

const SOPAndResumeWritingPage = () => {
  return (
    <>
      <div className="section-spacing">
        <SOPHeaderComp />
      </div>
      <div className="section-spacing">
        <SOPOverviewComp />
      </div>
      <div className="section-spacing">
        <WhySkillangSOPComp />
      </div>
      <div className="section-spacing">
        <SOPStepsTimelineComp />
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

export default SOPAndResumeWritingPage;
