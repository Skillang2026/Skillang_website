"use client";

import React, { useState, useEffect, useRef } from "react";
import "./GetStart.css";
import GetStartedTimeline from "@/utils/timeline/GetStartedTimeline";

const educationLoanSteps = [
  {
    title: "Schedule a Consultation",
    description:
      "Reach out via our website or contact form to set up your free consultation.",
  },
  {
    title: "Assessment of Needs",
    description:
      "Discuss your financial situation, study plans, and budget requirements.",
  },
  {
    title: "Explore Loan Options",
    description:
      "We compare different loan options to find the best fit for you.",
  },
  {
    title: "Application & Approval",
    description:
      "Assistance with the complete application process for a successful outcome.",
  },
  {
    title: "Disbursement & Beyond",
    description:
      "Coordination with your institution to ensure timely fund disbursement and ongoing financial support.",
  },
];

const GetStart = () => {
  return (
    <div>
      <GetStartedTimeline
        title="Getting Started"
        subtitle="Secure your loan through a streamlined five-step process."
        steps={educationLoanSteps}
      />
    </div>
  );
};

export default GetStart;
