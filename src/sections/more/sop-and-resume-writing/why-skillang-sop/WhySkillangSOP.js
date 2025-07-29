import React from "react";
import ReusableWhyComponent from "../../../../utils/why-skillang-comp/whySkillangComp";
const whySopSkillang1 = "/assets/images/SOP/K8s Operator.png";
const whySopSkillang2 = "/assets/images/SOP/K8s Operator-1.png";
const whySopSkillang3 = "/assets/images/SOP/K8s Operator-2.png";
const whySopSkillang4 = "/assets/images/SOP/K8s Operator-3.png";

const WhySkillangSOPComp = () => {
  const cardData = [
    {
      title: "Expert Writers",
      text: "Benefit from experienced financial advisors who simplify the education loan process.",
      img: whySopSkillang1,
    },
    {
      title: "High Success Rate",
      text: "Join countless clients who have secured admission to prestigious institutions worldwide.",
      img: whySopSkillang2,
    },
    {
      title: "Personalized Approach",
      text: "Every document is uniquely tailored to reflect your individual profile and aspirations.",
      img: whySopSkillang3,
    },

    {
      title: "Timely Delivery",
      text: "We honor your deadlines, delivering quality documents well in advance.",
      img: whySopSkillang4,
    },
  ];
  return (
    <div>
      <ReusableWhyComponent
        title="Why Choose Skillang?"
        subtitle="Discover What Makes Skillang Your Best Path to Success"
        backgroundColor="lang-why-skill-bg"
        cardData={cardData}
      />
    </div>
  );
};

export default WhySkillangSOPComp;
