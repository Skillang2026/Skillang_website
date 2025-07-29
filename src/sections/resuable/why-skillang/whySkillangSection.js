import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "react-bootstrap";
import "./whySkillangSection.css";
import ReusableWhyComponent from "../../../utils/why-skillang-comp/whySkillangComp";

const whySkill1 =
  "https://cms.skillang.com/uploads/why_Skillang_a2a03fb683.jpg";
const whySkill2 =
  "https://cms.skillang.com/uploads/why_Skillang2_9000c78852.jpg";
const whySkill3 =
  "https://cms.skillang.com/uploads/why_Skillang3_6a6be41623.jpg";

const WhySkillangSection = () => {
  const whySkillangCardData = [
    {
      img: whySkill1,
      title: "Expert Guidance",
      text: "Our expert team specializes in international healthcare recruitment, guiding in every step.",
    },
    {
      img: whySkill2,
      title: "Ethical Recruitment",
      text: "We uphold ethical recruitment standards, ensuring transparency and integrity in all operations.",
    },
    {
      img: whySkill3,
      title: "High Success Rate",
      text: "We have a proven track record of placing healthcare professionals in top global institutions.",
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
