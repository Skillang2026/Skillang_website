import React from "react";
import GetStartedTimeline from "../../../../utils/timeline/GetStartedTimeline";

const scholarshipSteps = [
  {
    title: "Schedule a Consultation",
    description:
      "Reach out via our website or contact form to set up your free consultation.",
  },
  {
    title: "Information Gathering",
    description:
      "Provide detailed information about your academic and professional background, and your targeted programs.",
  },
  {
    title: "Drafting Process",
    description:
      "Our expert team crafts the first draft of your SOP or resume and sends it to you for review.",
  },
  {
    title: "Revisions and Finalization",
    description:
      "We refine the document based on your feedback until it perfectly represents your profile.",
  },
  {
    title: "Delivery",
    description:
      "Receive your professionally crafted SOP and resume, ready for submission.",
  },
];

const SOPStepsTimelineComp = () => {
  return (
    <div>
      <GetStartedTimeline
        title="Getting Started"
        subtitle="Secure your SOP through a streamlined five-step process."
        steps={scholarshipSteps}
      />
    </div>
  );
};

export default SOPStepsTimelineComp;
