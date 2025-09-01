import React from "react";
import ReusableWhyComponent from "../../../utils/why-skillang-comp/whySkillangComp";

const whySkill1 = "/assets/images/reusable/expert-guidance-for-nursing.jpg";
const whySkill2 = "/assets/images/reusable/ethical-recruitment-nursing.jpg";
const whySkill3 = "/assets/images/reusable/high-success-rate-of-nursing.jpg";

const WhySkillangSection = () => {
  const whySkillangCardData = [
    {
      img: whySkill1,
      title: "Expert Guidance",
      text: "Our expert team specializes in international healthcare recruitment, guiding in every step.",
      imgAlt: "Expert Guidance For Nursing",
    },
    {
      img: whySkill2,
      title: "Ethical Recruitment",
      text: "We uphold ethical recruitment standards, ensuring transparency and integrity in all operations.",
      imgAlt: "Ethical Recruitment For Nursing",
    },
    {
      img: whySkill3,
      title: "High Success Rate",
      text: "We have a proven track record of placing healthcare professionals in top global institutions.",
      imgAlt: "High Success Rate For Nursing",
    },
  ];
  return (
    <ReusableWhyComponent
      title="Why Choose "
      subtitle="Discover What Makes Skillang Your Best Path to Success"
      backgroundColor="lang-why-skill-bg"
      highlightText="Skillang?"
      showHighlight={true}
      showBadge={true}
      columns="3"
      cardData={whySkillangCardData}
    />
  );
};

export default WhySkillangSection;
