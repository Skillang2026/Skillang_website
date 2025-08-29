"use client";
import MainFormComp from "@/components/forms/MainForm";
import React, { useEffect } from "react";

const headerbg = "/assets/images/study-abroad/study-abroad-consultants.png";

const StudyAbroadHeader = () => {
  return (
    <MainFormComp
      headerImage={headerbg}
      imageAlt="Study Abroad Consultants In Chennai"
      formType="study-abroad"
      showLookingForField={true}
      showCountryField={true}
      defaultOrigin="Study Abroad Header Page Form"
      lookingForOptions={["Bachelors", "Masters"]}
      countryOptions={["USA", "UK", "Germany", "Australia", "Europe"]}
      containerClass="bg-dar"
    />
  );
};

export default StudyAbroadHeader;
