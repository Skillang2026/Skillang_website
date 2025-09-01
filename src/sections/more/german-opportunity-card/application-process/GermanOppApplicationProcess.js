import React from "react";
import GetStartedTimeline from "../../../../utils/timeline/GetStartedTimeline";

const scholarshipSteps = [
  {
    title: "Check Eligibility",
    description: "Verify that you meet the requirements",
  },
  {
    title: "Gather Documents",
    description:
      "Passport, certificates, proof of funds, language test results",
  },
  {
    title: "Submit Application",
    description: "Apply through the German consulate or embassy",
  },
  {
    title: "Move to Germany",
    description: "Search for jobs within six months",
  },
];

const GermanOppApplicationProcessComp = () => {
  return (
    <div>
      <GetStartedTimeline
        title="Application Process"
        // subtitle="Secure your SOP through a streamlined five-step process."
        steps={scholarshipSteps}
      />
    </div>
  );
};

export default GermanOppApplicationProcessComp;
