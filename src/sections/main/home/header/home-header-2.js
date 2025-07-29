"use client";

import React from "react";
import MainFormComp from "@/components/forms/MainForm";

const HomeHeader2 = () => {
  return (
    <MainFormComp
      headerImage="https://cms.skillang.com/uploads/header_bg1_1b4c8fe074.jpg"
      imageAlt="Best Abroad Consultancy In Chennai"
      formType="home"
      // Enable dynamic fields based on selection
      dynamicFields={true}
      // Always show the main looking for field
      showLookingForField={true}
      // These will be controlled dynamically
      showExperienceField={false}
      showCountryField={false}
      showStudyLevelField={false}
      // Default values
      defaultOrigin="Home Page Form"
      defaultExperience="-"
      defaultCounty="-"
      // Custom options for home form
      lookingForOptions={[
        "Nursing",
        "Study Abroad",
        "Work Abroad",
        "Test & Language Prep",
      ]}
      experienceOptions={["0-2 yrs", "2-5 Yrs", "5+ Yrs"]}
      studyLevelOptions={["Bachelors", "Masters"]}
      countryOptions={["USA", "UK", "Germany", "Australia", "Europe"]}
      // Custom labels
      lookingForLabel="Looking For ?"
      experienceLabel="Experience"
      studyLevelLabel="Looking for ?"
      countryLabel="Country"
      // Custom styling for home
      title="Let's Connect to Explore More!"
      subtitle="Looking for Work Abroad, Study Abroad, Language & Test preparation?"
      // Add suppressHydrationWarning wrapper
      containerClass=""
      headerClass="d-flex align-items-start justify-content-center"
    />
  );
};

export default HomeHeader2;
