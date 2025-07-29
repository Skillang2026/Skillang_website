import React from "react";
import EligibilityBarCardsComponent from "../../../../components/cards/EligibilityBarCards";
const eli1 = "../../../../assets/icons/german-opp-card/GerOppCardEli1.svg";
const eli2 = "../../../../assets/icons/german-opp-card/GerOppCardEli2.svg";
const eli3 = "../../../../assets/icons/german-opp-card/GerOppCardEli3.svg";
const eli4 = "../../../../assets/icons/german-opp-card/GerOppCardEli4.svg";

const GerOppCardEligibilityData = [
  {
    img: eli1,
    text: "A university degree or equivalent qualification",
  },
  {
    img: eli2,
    text: "Relevant experience in a specific field",
  },
  { img: eli3, text: "German or English proficiency recommended" },
  {
    img: eli4,
    text: "Show that you can support yourself in Germany",
  },
];

const GerOppCardEligibilityComp = () => {
  return (
    <div>
      <EligibilityBarCardsComponent
        title="Eligibility"
        subheading="To work in Germany, you need"
        eligibilityData={GerOppCardEligibilityData}
        className="german-opportunity-card-eligibility" // Optional custom class
      />
    </div>
  );
};

export default GerOppCardEligibilityComp;
