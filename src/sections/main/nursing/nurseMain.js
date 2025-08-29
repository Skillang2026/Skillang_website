"use client";

import MainFormComp from "@/components/forms/MainForm";
import React from "react";

const headBg =
  "/assets/images/nursing/abroad-nursing-job-consultants-in-chennai.jpg";

const NurseMainHeader = () => {
  return (
    <MainFormComp
      headerImage={headBg}
      imageAlt="Abroad Nursing Job Consultants In Chennai"
      formType="nurse"
      showLookingForField={false}
      showExperienceField={true}
      defaultExperience="Student"
      defaultOrigin="Nurse Page Form"
      defaultLookingFor="Study Abroad"
      experienceOptions={[
        "Student",
        "0-1 Years",
        "1-3 Years",
        "3-5 Years",
        "5+ Years",
      ]}
    />
  );
};

export default NurseMainHeader;
