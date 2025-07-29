"use client";

import React, { useRef, useEffect, useState } from "react";
import LandingNavBar from "../../components/landing/landing-nav/landing-nav";
import StudyForm from "../../sections/landing/study-abroad/study-form";
import WhyStudyAbroad from "../../sections/main/study-abroad/whystudyabroad";
import StudyAbroad from "../../sections/resuable/study-abroad-journey/study-abroad-journey";
import LangContactUs from "../../sections/main/lang-test/lang-connect/LangContactUs";
import AbroadDestinations from "../../sections/main/study-abroad/abroad_destination";
import NavStudyLanding from "../../components/nav/nav-study-landing";

const LandingStudyAbroadPage = () => {
  // Create reference for the form section
  const studyFormRef = useRef(null);

  // Alternative approach - use state to control visibility
  const [formMounted, setFormMounted] = useState(false);

  // Log when component mounts to check if refs are working
  useEffect(() => {
    // Ensure the form ref is initialized after component mount
    const checkRef = () => {
      if (studyFormRef.current) {
        // console.log("Form ref initialized successfully");
        setFormMounted(true);
      } else {
        // console.log("Form ref not yet available, retrying...");
        // Try again in 100ms
        setTimeout(checkRef, 100);
      }
    };

    // Start checking
    checkRef();

    // Clean up any pending timeouts
    return () => {
      setFormMounted(false);
    };
  }, []);

  return (
    <div>
      <LandingNavBar />
      {/* Pass only the form ref to NavStudyLanding */}
      <NavStudyLanding formRef={studyFormRef} formMounted={formMounted} />

      <div className="section-spacing" ref={studyFormRef}>
        <StudyForm />
      </div>
      <div className="section-spacing">
        <WhyStudyAbroad />
      </div>
      <div className="section-spacing">
        <AbroadDestinations isLanding={true} />
      </div>
      <div className="section-spacing">
        <StudyAbroad showAll={false} />
      </div>
      <div className="section-spacing">
        <LangContactUs />
      </div>
    </div>
  );
};

export default LandingStudyAbroadPage;
