"use client";

import React from "react";
import {
  Card,
  CardText,
  CardTitle,
  Container,
  Image,
  Col,
  Row,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "react-bootstrap";
import "./ourServices.css";

const nurseService =
  "https://cms.skillang.com/uploads/nurse_Service_c315ee7cb7.jpg";

const services = [
  {
    title: "Screening Process",
    text: "We screen and verify your eligibility to ensure it meets the required requirement  criteria that matches job openings",
  },
  {
    title: "Language Preparation",
    text: "We offer German language training from A1 to B2 levels, available both online and offline through our language experts",
  },
  {
    title: "Interview Preparation",
    text: "Our expert team guide you to prepare and crack the interview",
  },
  {
    title: "Job Placement",
    text: "We connect you with reputable hospitals across Germany through our recruitment partners",
  },
  {
    title: "Visa Assistance",
    text: "End to end documentation verification support and visa application assistance. Guidance through every step of the visa application process.",
  },
  {
    title: "Cultural Integration",
    text: "We assist you in adapting smoothly to living and working in Germany.",
  },
  {
    title: "Relocation Services",
    text: "Complete support for your move, including accommodation and family arrangements.",
  },
  {
    title: "Ongoing Career Support",
    text: "Continuous guidance to help you succeed long-term.",
  },
];

const OurServices = () => {
  return (
    <div className="nursing-our-services-bg py-3">
      <Container>
        <Row className="py-4">
          {/* Mobile Image */}
          <Col lg={6} className="d-block d-md-none mb-3">
            <Image
              fluid
              src={nurseService}
              alt="nurse"
              className="nurse-service-img"
            />
          </Col>

          {/* Header Section */}
          <Col lg={5} sm={12} xs={12}>
            <div className="heading-big-medium mb-1 text-content-navyBlue-900">
              Our Services
            </div>
            <div className="paragraph-big-medium text-content-navyBlue-800">
              We offer tailored support for your nursing career abroad,
              including career guidance, visa assistance, documentation help,
              language prep, job placement, and relocation aid. Our expert
              mentorship helps turn your international dreams into reality.
            </div>
          </Col>

          {/* Desktop Image */}
          <Col lg={7} className="d-none d-md-block">
            <Image
              fluid
              src={nurseService}
              alt="nurse"
              className="nurse-service-img"
            />
          </Col>
        </Row>

        {/* Mobile View - Accordion */}
        <div className="d-block d-md-none pb-2">
          <Accordion defaultActiveKey="0" className="our-services-accordion">
            {services.map((service, index) => (
              <AccordionItem
                eventKey={index.toString()}
                key={index}
                className="our-services-accordion-item mb-1"
              >
                <AccordionHeader className="subheading-small-medium text-white">
                  {service.title}
                </AccordionHeader>
                <AccordionBody className="paragraph-small-medium text-content-tertiaryInverse">
                  {service.text}
                </AccordionBody>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Desktop/Tablet View - Cards Grid */}
        <Row className="pb-4 d-none d-md-flex">
          {services.map((service, index) => (
            <Col key={index} lg={3} md={6} className="mb-4">
              <Card className="our-services-card h-100">
                <CardTitle className="subheading-small-medium text-white">
                  {service.title}
                </CardTitle>
                <CardText className="paragraph-small-medium text-content-tertiaryInverse">
                  {service.text}
                </CardText>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default OurServices;
