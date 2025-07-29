"use client";

import MainFormComp from "@/components/forms/MainForm";
import React from "react";

const headerbg =
  "https://cms.skillang.com/uploads/work_Abroad_Main_Bg_ea965b705b.jpg";

const WorkAbroadHeader = () => {
  return (
    <MainFormComp
      headerImage={headerbg}
      imageAlt="Job Abroad Consultants In Chennai"
      formType="work-abroad"
      showLookingForField={false}
      showExperienceField={true}
      showCountryField={false}
      showStudyLevelField={false}
      // Pre-set form data
      defaultLookingFor="Work Abroad"
      defaultOrigin="Work Abroad Page Form"
      defaultCounty="-"
      // Experience options for work abroad
      experienceOptions={[
        "Student",
        "0-1 Years",
        "1-3 Years",
        "3-5 Years",
        "5+ Years",
      ]}
      // Custom labels
      experienceLabel="Experience"
      // Layout styling
      containerClass="bg-dar"
      headerClass="d-flex align-items-start justify-content-center bg-primar"
      // Button styling
      buttonText="Book your free consultation"
    />
  );
};

export default WorkAbroadHeader;
