"use client";

import MainFormComp from "@/components/forms/MainForm";
import React from "react";

const NurseMainHeader = () => {
  return (
    <MainFormComp
      headerImage="https://cms.skillang.com/uploads/nurse_Header_Img_1b260fe32f.jpg"
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
