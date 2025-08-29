import React from "react";
import ReusableWhyComponent from "../../../../utils/why-skillang-comp/whySkillangComp";
const whyGerOpp1 =
  "/assets/images/german-opp-card/opportunity-card-germany-apply-online.jpg";
const whyGerOpp2 =
  "/assets/images/german-opp-card/opportunity-card-in-germany.jpg";
const whyGerOpp3 =
  "/assets/images/german-opp-card/apply-for-germany-opportunity-card.jpg";

const WhyChooseOpportunityCardComp = () => {
  const cardData = [
    {
      title: "Fast-Track to Employment",
      text: "Get access to Germany's top industries.",
      img: whyGerOpp1,
      imgAlt: "Opportunity Card Germany Apply Online",
    },
    {
      title: "Work & Live in Germany",
      text: "High quality of life, world-class infrastructure.",
      img: whyGerOpp2,
      imgAlt: "Opportunity Card in Germany",
    },
    {
      title: "Pathway to Residency",
      text: "Open the door to long-term stay.",
      img: whyGerOpp3,
      imgAlt: "Apply for Germany Opportunity Card",
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
