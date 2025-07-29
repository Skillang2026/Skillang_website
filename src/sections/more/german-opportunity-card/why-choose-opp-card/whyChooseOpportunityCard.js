import React from "react";
import ReusableWhyComponent from "../../../../utils/why-skillang-comp/whySkillangComp";
const whyGerOpp1 = "/assets/images/german-opp-card/K8s Operator.jpg";
const whyGerOpp2 = "/assets/images/german-opp-card/K8s Operator-1.jpg";
const whyGerOpp3 = "/assets/images/german-opp-card/K8s Operator-2.jpg";

const WhyChooseOpportunityCardComp = () => {
  const cardData = [
    {
      title: "Fast-Track to Employment",
      text: "Get access to Germany’s top industries.",
      img: whyGerOpp1,
    },
    {
      title: "Work & Live in Germany",
      text: "High quality of life, world-class infrastructure.",
      img: whyGerOpp2,
    },
    {
      title: "Pathway to Residency",
      text: "Open the door to long-term stay.",
      img: whyGerOpp3,
    },
  ];
  return (
    <div>
      <ReusableWhyComponent
        title="Why Choose the Opportunity Card Visa?"
        subtitle="Discover What Makes Skillang Your Best Path to Success"
        columns={3}
        // backgroundColor="lang-why-skill-bg"
        cardData={cardData}
      />
    </div>
  );
};

export default WhyChooseOpportunityCardComp;
