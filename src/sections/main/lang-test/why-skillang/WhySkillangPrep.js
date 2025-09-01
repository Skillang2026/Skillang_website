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

const LwhySkill1 = "/assets/images/lang-test/free-german-language-training.jpg";
const LwhySkill2 =
  "/assets/images/lang-test/german-language-personalized-coaching.jpg";
const LwhySkill3 =
  "/assets/images/lang-test/german-language-flexible-learning-options.jpg";
const LwhySkill4 =
  "/assets/images/lang-test/german-language-mock-tests-performance-analysis.jpg";

const cardData = [
  {
    title: "Free German Language Training",
    text: "Specially designed for nursing aspirants to help you succeed in Germany",
    img: LwhySkill1,
    imgAlt: "Free German Language Training",
    id: "LSkill1",
  },
  {
    title: "Personalized Coaching",
    text: "Learn from certified trainers with tailored guidance to match your learning pace",
    img: LwhySkill2,
    imgAlt: "German Language Personalized Coaching",
    id: "LSkill2",
  },
  {
    title: "Flexible Learning Options",
    text: "Choose from online or in-person classes that fit your schedule",
    img: LwhySkill3,
    imgAlt: "German Language Flexible Learning Options",
    id: "LSkill3",
  },
  {
    title: "Mock Tests & Performance Analysis",
    text: "Practice with full-length tests and get detailed feedback to improve",
    img: LwhySkill4,
    imgAlt: "German Language Mock Tests & Performance Analysis",
    id: "LSkill4",
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
                  alt={card.imgAlt}
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
