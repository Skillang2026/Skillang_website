import React from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "react-bootstrap";
import "./skillShartage.css";

const SkillShortage = () => {
  const industries = [
    {
      title: "Nursing & Healthcare",
      description:
        "High demand for nurses, healthcare assistants, and medical professionals globally.",
    },
    {
      title: "Information Technology",
      description:
        "There is a high demand for skilled IT Professionals globally. The professional experts in AI, ML, Cyber Security, Data Analysts, Software development engineers are in high demand.",
    },
    {
      title: "Hospitality Management",
      description:
        "Opportunities in hotel management, catering, and customer service roles worldwide.",
    },
    {
      title: "Blue Collared Job Abroad",
      description:
        "Jobs in construction, factory work, and skilled trades with attractive benefits.",
    },
  ];

  return (
    <div className="skillshortage-bg position-relative">
      <Container className="p-0">
        {" "}
        {/* Removed padding from container */}
        <div className="skillshortage-container">
          <Row className="w-100 m-0">
            {/* Left Side (Title & Description) */}
            <Col
              lg={6}
              className="d-flex flex-column justify-content-center left-content mb-4 mb-lg-0"
            >
              <div className="mb-3 heading-big-medium text-content-primaryInverse">
                Industries with Skill Shortages
              </div>
              <div className="paragraph-small-regular text-content-grey-500">
                We focus on sectors with a high demand for skilled
                professionals, increasing your chances of securing employment
                and a work visa. Here are some primary industries we serve.
              </div>
            </Col>

            {/* Right Side (Accordion List) */}
            <Col lg={6} className="d-flex flex-column right-content">
              <Accordion
                defaultActiveKey="0"
                className="custom-accordion w-100"
              >
                {industries.map((industry, index) => (
                  <AccordionItem
                    key={index}
                    eventKey={index.toString()}
                    className="dark-accordion-item"
                  >
                    <AccordionHeader className="caption-bold text-content-primaryInverse">
                      {industry.title}
                    </AccordionHeader>
                    <AccordionBody className="paragraph-small-regular text-content-tertiaryInverse">
                      {industry.description}
                    </AccordionBody>
                  </AccordionItem>
                ))}
              </Accordion>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SkillShortage;
