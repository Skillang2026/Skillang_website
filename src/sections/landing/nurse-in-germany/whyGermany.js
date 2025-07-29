import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardText,
} from "react-bootstrap";
const whyGer1 = "/assets/images/landing/whyGer1.svg";
const whyGer2 = "/assets/images/landing/whyGer2.svg";
const whyGer3 = "/assets/images/landing/whyGer3.svg";
const whyGer4 = "/assets/images/landing/whyGer4.svg";
const whyGer5 = "/assets/images/landing/whyGer5.svg";
const whyGer6 = "/assets/images/landing/whyGer6.svg";
const whyGer7 = "/assets/images/landing/whyGer7.svg";
import "./whyGermany.css";

const WhyGermany = () => {
  const whyGer = [
    { img: whyGer1, text: "High Demand" },
    { img: whyGer2, text: "Work-Life Balance" },
    { img: whyGer3, text: "Career Growth" },
    { img: whyGer5, text: "PR Possibilities" },
    { img: whyGer4, text: "Free Child Education" },
    { img: whyGer6, text: "Public Healthcare Benefits" },
    { img: whyGer7, text: "Contribution to German Pension System" },
  ];

  return (
    <div className=" px-2">
      <Container className="">
        <Row className="">
          {/* First Column: "Why Choose Germany?" */}
          <Col
            md={4}
            lg={6}
            className="why-germany-bg text-white d-flex align-items-start justify-content-center py-4 text-center mb-4"
          >
            <h1 className="text-white heading-small-medium">
              Why Choose Germany?
            </h1>
          </Col>

          {/* Second Column: Cards Layout */}
          <Col md={8} lg={6}>
            <Row>
              {whyGer.map((service, index) => (
                <Col
                  key={index}
                  xs={
                    index === whyGer.length - 1 && whyGer.length % 2 !== 0
                      ? 12
                      : 6
                  } // Full width for last odd item
                  className="mb-3 px-1"
                >
                  <Card
                    className="why-us-ger-card flex-row"
                    style={{ width: "100%" }}
                  >
                    <CardImg
                      variant="top"
                      src={service.img}
                      alt={`Reason ${index + 1}`}
                      style={{ width: "48px", height: "48px" }}
                    />
                    <CardBody className="why-ger-body p-0">
                      <CardText className="paragraph-small-medium text-content-secondary">
                        <div className="paragraph-small-medium text-content-secondary why-ger-text text-start">
                          {service.text}
                        </div>
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WhyGermany;
