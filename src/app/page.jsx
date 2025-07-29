import React from "react";
import GlobalOprtunity from "@/sections/main/home/global-opp/global-opportunity";
import WorkAbroadOpportunity from "@/sections/main/home/work-abroad/work-abroad-opportunity";
import StudyAbroadJourney from "@/sections/resuable/study-abroad-journey/study-abroad-journey";
import UniPartner from "@/sections/resuable/uni-partner/uni-partner";
import InternshipSection from "@/sections/main/home/internship/internship";
import TestPrep from "@/sections/main/home/test-prep/test-prep";
import LoanSection from "@/sections/main/home/loan/loan-section";
import HomeHeader2 from "@/sections/main/home/header/home-header-2";
import PartnerWithUsSection from "@/sections/resuable/partner-with-us/partnerWithUs";
import WorkAbroadJourneyTimeline from "@/sections/main/home/work-abroad-timeline/work-abroad-timeline.js";

// Next.js Metadata (replaces React head)
export const metadata = {
  title: "Abroad Consultancy in Chennai | Skillang",
  description:
    "Looking for the best abroad consultancy in Chennai? We provide expert guidance for overseas education, work, and German language, IELTS coaching.",
  keywords:
    "abroad consultancy, Best abroad consultancy in Chennai, overseas consultancy, best overseas consultancy, Chennai best consultancy for abroad, Skillang, career abroad, study abroad, work abroad, language preparation",
  alternates: {
    canonical: "https://www.skillang.com",
  },
  openGraph: {
    title: "Abroad Consultancy in Chennai | Skillang",
    description:
      "Skillang offers comprehensive study abroad, work abroad, and language test preparation services for global opportunities.",
    url: "https://www.skillang.com",
    siteName: "Skillang",
    images: [
      {
        url: "assets/images/logos/logo.png",
        width: 1200,
        height: 630,
        alt: "Skillang - Global Career & Education Hub",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abroad Consultancy in Chennai | Skillang",
    description:
      "Expert guidance for overseas education, work, and language preparation.",
    images: ["/logo.png"],
  },
};

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
      {/* <div><CardComponent /></div> */}
    </div>
  );
};

export default HomePage;
