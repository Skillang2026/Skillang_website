import React from "react";
import {
  Card,
  Container,
  Col,
  Row,
  CardBody,
  CardTitle,
  CardText,
} from "react-bootstrap";
import "./nurseChallengeSection.css";

const nurseChallenge1 =
  "/assets/images/nursing/nursing-career-overseas-guidance.jpg";
const nurseChallenge2 =
  "/assets/images/nursing/nursing-job-consultants-for-abroad.jpg";
const nurseChallenge3 = "/assets/images/nursing/nurses-abroad-job-support.jpg";

const nurseCallenges = [
  {
    title: "Licensing Challenges",
    text: "We assist with the recognition of your qualifications.",
    img: nurseChallenge1,
    imgAlt: "Nursing Career Overseas Guidance",
  },
  {
    title: "Language Barriers",
    text: "We offer language courses and support for professional language certification.",
    img: nurseChallenge2,
    imgAlt: "Nursing Job Consultants For Abroad",
  },
  {
    title: "Cultural Adjustment",
    text: "Our team provides cultural coaching and ongoing support for life and work in Germany.",
    img: nurseChallenge3,
    imgAlt: "Nurses Abroad Job Support",
  },
];

const NurseChallengeSection = () => {
  return (
    <div className="">
      <Container>
        <Row className="text-md-center">
          <div className="heading-big-medium mb-2">
            Challenges for International Nurses
          </div>
          <div className="paragraph-big-regular mb-4">
            Following are the challenges faced by international nurses & how we
            help them overcome these challenges
          </div>
        </Row>
      </Container>
      <Container className="py-4">
        <Row className="row-equal-height">
          {nurseCallenges.map((card, index) => (
            <Col lg={4} key={index}>
              <Card className="int-challenge-card">
                <img src={card.img} alt={card.imgAlt} />
                <CardBody className="p-0">
                  <CardTitle className="mb-2 subheading-small-medium">
                    {card.title}
                  </CardTitle>
                  <CardText className="paragraph-small-medium text-content-secondary">
                    {card.text}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default NurseChallengeSection;
