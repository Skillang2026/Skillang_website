"use client";

import MainFormComp from "@/components/forms/MainForm";
import React from "react";

const headerbg = "/assets/images/lang-test/german-language-course.jpg";

const LangTestHeader = () => {
  return (
    <MainFormComp
      headerImage={headerbg}
      imageAlt="German Language Course"
      formType="language-test"
      showLookingForField={true}
      showExperienceField={false}
      defaultOrigin="Lang & Test Prep Page Form"
      lookingForOptions={[
        "IELTS",
        "TOEFL",
        "GRE",
        "GMAT",
        "PTE",
        "German language",
        "Others",
      ]}
    />
  );
};

export default LangTestHeader;
