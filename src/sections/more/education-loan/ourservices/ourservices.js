import React from "react";
import {
  Container,
  Col,
  Row,
  Card,
  CardTitle,
  CardText,
  CardBody,
} from "react-bootstrap";
const eduourserviceImg = "/assets/images/education-loan/ourservice1.png";
const eduourserviceIcon1 =
  "/assets/images/education-loan/ourserviceicon/eduourserviceIcon1.svg";
const eduourserviceIcon2 =
  "/assets/images/education-loan/ourserviceicon/eduourserviceIcon2.svg";
const eduourserviceIcon3 =
  "/assets/images/education-loan/ourserviceicon/eduourserviceIcon3.svg";
const eduourserviceIcon4 =
  "/assets/images/education-loan/ourserviceicon/eduourserviceIcon4.svg";
const eduourserviceIcon5 =
  "/assets/images/education-loan/ourserviceicon/eduourserviceIcon5.svg";
import "./ourservices.css";

const cardData = [
  {
    icon: eduourserviceIcon1,
    title: "Personalized Loan Counseling",
    text: "One-on-one sessions to explain loan options, interest rates, repayment terms, and eligibility criteria.",
    alt: "Personalized Loan Counseling",
  },
  {
    icon: eduourserviceIcon2,
    title: "Documentation Guidance",
    text: "Assistance with gathering and preparing all necessary paperwork for a complete and accurate loan application.",
    alt: "Documentation Guidance",
  },
  {
    icon: eduourserviceIcon3,
    title: "Loan Application Processing",
    text: "Help in filling out and submitting applications to multiple banks and financial institutions to secure the best offers.",
    alt: "Loan Application Processing",
  },
  {
    icon: eduourserviceIcon4,
    title: "Liaison with Financial Institutions",
    text: "We act as your advocate, negotiating with banks and lenders to improve your chances of loan approval.",
    alt: "Liaison with Financial Institutions",
  },
  {
    icon: eduourserviceIcon5,
    title: "Loan Disbursement Coordination",
    text: "Ensuring funds are disbursed in accordance with your university's fee schedule and financial needs.",
    alt: "Loan Disbursement Coordination",
  },
];

const EduLoanOurServices = () => {
  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center">
        <Row className="w-100 d-flex justify-content-center align-items-center">
          <Col
            lg={7}
            md={6}
            sm={12}
            xs={12}
            className="d-flex flex-column justify-content-center align-items-stretch"
          >
            <Row className="" style={{ marginBottom: "24px" }}>
              <div className="heading-big-medium text-content-primary">
                Our Services
              </div>
              <div className="subheading-small-medium text-content-secondary">
                We offer a comprehensive range of loan services. Below are some
                of the options available to you.
              </div>
            </Row>
            <Row>
              {cardData.slice(0, 4).map((card, index) => (
                <Col lg={6} sm={12} xs={12} key={index} className=" mb-3">
                  <Card className="edu-ourservice-cards">
                    <img
                      src={card.icon}
                      alt={card.alt}
                      width="50"
                      height="50"
                    />
                    <CardTitle className="subheading-small-medium text-content-secondary">
                      {card.title}
                    </CardTitle>
                    <CardText className="paragraph-big-medium text-content-secondary">
                      {card.text}
                    </CardText>
                  </Card>
                </Col>
              ))}
            </Row>
            <Col lg={12}>
              {cardData.slice(4, 5).map((card, index) => (
                <Card key={index} className="edu-ourservice-cards">
                  <img src={card.icon} alt={card.alt} width="50" height="50" />
                  <CardTitle className="subheading-small-medium text-content-secondary">
                    {card.title}
                  </CardTitle>
                  <CardText className="paragraph-big-medium text-content-secondary">
                    {card.text}
                  </CardText>
                </Card>
              ))}
            </Col>
          </Col>
          <Col
            lg={5}
            md={6}
            className="d-flex justify-content-center align-items-center d-none d-md-block overflow-hidden  p-0"
          >
            <img
              src={eduourserviceImg}
              alt="Language Training Image"
              className="image-fluid edu-ourservice-image"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EduLoanOurServices;
