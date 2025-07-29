import React from "react";
import {
  Container,
  Row,
  Col,
  CardTitle,
  CardText,
  Card,
} from "react-bootstrap";
import "./WhySkillangPrep.css";

const LwhySkill1 =
  "https://cms.skillang.com/uploads/Lwhy_Skill1_a2db1f31c6.jpg";
const LwhySkill2 =
  "https://cms.skillang.com/uploads/Lwhy_Skill2_78da29ebb8.jpg";
const LwhySkill3 =
  "https://cms.skillang.com/uploads/Lwhy_Skill3_8a71aaf9ee.jpg";
const LwhySkill4 =
  "https://cms.skillang.com/uploads/Lwhy_Skill4_c763c40e39.jpg";

const cardData = [
  {
    title: "Free German Language Training",
    text: "Specially designed for nursing aspirants to help you succeed in Germany",
    img: LwhySkill1,
    id: "LSkill1",
  },
  {
    title: "Personalized Coaching",
    text: "Learn from certified trainers with tailored guidance to match your learning pace",
    img: LwhySkill2,
  },
  {
    title: "Flexible Learning Options",
    text: "Choose from online or in-person classes that fit your schedule",
    img: LwhySkill3,
  },
  {
    title: "Mock Tests & Performance Analysis",
    text: "Practice with full-length tests and get detailed feedback to improve",
    img: LwhySkill4,
  },
];

const WhySkillangPrep = () => {
  return (
    <div className="lang-why-skill-bg">
      <Container className="">
        <Row className="mb-5">
          <div className="heading-big-medium text-content-primaryInverse">
            Why Choose Skillang for Language & Test Prep?
          </div>
          <div className="paragraph-big-medium text-content-secondaryInverse">
            Discover What Makes Skillang Your Best Path to Success
          </div>
        </Row>
        <Row>
          {cardData.map((card, index) => (
            <Col key={index} lg={3} sm={12} xs={12} className="mb-3">
              <Card className="lang-why-skill-card" id={card.id}>
                <img
                  src={card.img}
                  alt={card.title}
                  style={{ borderRadius: "12px" }}
                />
                <CardTitle className="subheading-small-medium text-content-primaryInverse">
                  {card.title}
                </CardTitle>
                <CardText className="paragraph-small-medium text-content-tertiaryInverse">
                  {card.text}
                </CardText>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default WhySkillangPrep;
