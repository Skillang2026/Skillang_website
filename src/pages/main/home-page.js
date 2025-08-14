import React from "react";
import GlobalOprtunity from "../../sections/main/home/global-opp/global-opportunity";
import WorkAbroadOpportunity from "../../sections/main/home/work-abroad/work-abroad-opportunity";
import StudyAbroadJourney from "../../sections/resuable/study-abroad-journey/study-abroad-journey";
import UniPartner from "../../sections/resuable/uni-partner/uni-partner";
import InternshipSection from "../../sections/main/home/internship/internship";
import TestPrep from "../../sections/main/home/test-prep/test-prep";
import LoanSection from "../../sections/main/home/loan/loan-section";
import HomeHeader2 from "../../sections/main/home/header/home-header-2";
import PartnerWithUsSection from "../../sections/resuable/partner-with-us/partnerWithUs";
import WorkAbroadJourneyTimeline from "../../sections/main/home/work-abroad-timeline/work-abroad-timeline.js";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <div className="homepage-section-spacing">
        <HomeHeader2 />
      </div>
      <div className="homepage-section-spacing">
        <GlobalOprtunity />
      </div>
      <div className="homepage-section-spacing">
        <WorkAbroadOpportunity />
      </div>
      <div className="homepage-section-spacing">
        <WorkAbroadJourneyTimeline />
      </div>
      <div className="homepage-section-spacing">
        <StudyAbroadJourney />
      </div>
      <div className="homepage-section-spacing">
        <UniPartner />
      </div>
      <div className="homepage-section-spacing">
        <InternshipSection />
      </div>
      <div className="homepage-section-spacing">
        <TestPrep />
      </div>
      <div className="homepage-section-spacing">
        <LoanSection />
      </div>
      <div className="homepage-section-spacing">
        <PartnerWithUsSection />
      </div>
    </div>
  );
};

export default HomePage;
