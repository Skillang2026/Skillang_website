import React from "react";
import { Container, Row, Col, Card, CardBody } from "react-bootstrap";
import "../study-abroad/whystudyabroad.css";

const globalIcon = "/assets/icons/study-abroad/globalexpose.svg";
const educationIcon = "/assets/icons/study-abroad/topquality.svg";
const networkingIcon = "/assets/icons/study-abroad/network.svg";
const careerIcon = "/assets/icons/study-abroad/careerboost.svg";

const whystudyabroad =
  "https://cms.skillang.com/uploads/whystudyabroad_00275f4de2.png";

const WhyStudyAbroad = () => {
  return (
    <Container className="">
      <Row className="align-items-center">
        <Col md={7} className="">
          <div className="heading-big-medium">Why Study Abroad?</div>
          <p className="paragraph-big-medium text-content-secondary mt-1">
            Free German Courses, Online & In-Person Training & Flexible Learning
            Schedules all in One Place
          </p>
          <Row className="benefits">
            {[
              {
                icon: globalIcon,
                title: "Global Exposure",
                description:
                  "Experience new cultures, languages, and perspectives",
              },
              {
                icon: educationIcon,
                title: "Top-Quality Education",
                description:
                  "Learn from world-renowned universities with innovative teaching methods",
              },
              {
                icon: networkingIcon,
                title: "Networking & Growth",
                description:
                  "Build connections with industry leaders and peers worldwide",
              },
              {
                icon: careerIcon,
                title: "Career Boost",
                description:
                  "Gain a degree that opens doors to global job markets",
              },
            ].map((benefit, index) => (
              <Col md={6} key={index} className="mb-3 ">
                <Card className="why-study-abroad-cards">
                  <CardBody className="py-0">
                    <img
                      src={benefit.icon}
                      alt={benefit.title}
                      className="icon"
                    />
                    <h3>{benefit.title}</h3>
                    <p className="caption-regular text-content-secondary mt-1">
                      {benefit.description}
                    </p>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={5} className="">
          <div className="image-container">
            <img
              src={whystudyabroad}
              alt="Why Study Abroad"
              className="why-study-abroad-right-icon responsive-img"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WhyStudyAbroad;
