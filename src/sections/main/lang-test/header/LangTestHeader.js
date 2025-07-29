"use client";

import MainFormComp from "@/components/forms/MainForm";
import React from "react";

const headerbg = "https://cms.skillang.com/uploads/Lheader_bg_ccf6a9bd27.jpg";

const LangTestHeader = () => {
  return (
    <MainFormComp
      headerImage="https://cms.skillang.com/uploads/Lheader_bg_ccf6a9bd27.jpg"
      imageAlt="German Language Course Chennai"
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
