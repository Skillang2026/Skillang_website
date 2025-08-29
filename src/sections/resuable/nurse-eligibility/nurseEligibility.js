import React from "react";

const eli1 = "/assets/images/landing/nurse-eli1.svg";
const eli2 = "/assets/images/landing/nurse-eli2.svg";
const eli3 = "/assets/images/landing/nurse-eli3.svg";
const eli4 = "/assets/images/landing/nurse-eli4.svg";
//
// import "./nurseEligibility.css";
import EligibilityBarCardsComponent from "../../../components/cards/EligibilityBarCards";

const nurseEligibilityData = [
  {
    img: eli1,
    text: "A recognized 3 years nursing diploma or Bachelor degree in nursing",
  },
  {
    img: eli2,
    text: "German Language proficiency: B1&B2 level. 12th passed with above 50%. Age limit: Below 35 years.",
  },
  { img: eli3, text: "A valid nursing license from your home country. " },
  {
    img: eli4,
    text: "A certificate of professional qualification recognition, which we help you to facilitate.",
  },
];

const NurseEligibility = () => {
  return (
    <div className="px-lg-5 px-2">
      <EligibilityBarCardsComponent
        title="Eligibility"
        subheading="To work as a nurse in Germany, you need"
        eligibilityData={nurseEligibilityData}
        className="nurse-eligibility-section" // Optional custom class
      />
    </div>
  );
};

export default NurseEligibility;
