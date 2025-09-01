import React from "react";
import HorizontalCheckTimelineComp from "../../../../utils/timeline/GetStartedTimeline";

const scholarshipSteps = [
  {
    title: "Initial Consultation",
    description:
      "Contact us to discuss your educational goals, financial needs, and academic background.",
  },
  {
    title: "Profile Creation",
    description:
      "We build a detailed profile that highlights your strengths, achievements, and financial situation.",
  },
  {
    title: "Scholarship Matching",
    description:
      "Based on your profile, we identify and recommend suitable scholarships.",
  },
  {
    title: "Application Submission",
    description:
      "We assist with every step of the application process, ensuring accuracy and timeliness.",
  },
  {
    title: "Follow-up & Support",
    description:
      "Ongoing support throughout the decision process until you receive your scholarship.",
  },
];

const ScholarshipTimeline = () => {
  return (
    <div>
      <HorizontalCheckTimelineComp
        title="Getting Started"
        subtitle="Secure your loan through a streamlined five-step process."
        steps={scholarshipSteps}
      />
    </div>
  );
};

export default ScholarshipTimeline;
