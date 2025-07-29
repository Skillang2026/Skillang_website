import React from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  CardTitle,
  CardText,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "react-bootstrap";
import "./permResidentSection.css";

const nurseResi = "https://cms.skillang.com/uploads/resi_6b8aafb9b3.jpg";

const benefits = [
  {
    title: "Path to Permanent Residency",
    text: "Nurses in Germany can apply for permanent residency after working for about five years, meeting language and integration requirements.",
  },
  {
    title: "Free Child Education",
    text: "Germany offers free public education for children of international workers up to age 18, ensuring quality schooling.",
  },
  {
    title: "Healthcare Benefits",
    text: "Nurses are covered by public health insurance, providing free access to medical services.",
  },
  {
    title: "Family Reunification Visa",
    text: "Nurses can bring their immediate family, including spouses and children, through a family reunification visa.",
  },
  {
    title: "Citizenship",
    text: "After several years in Germany, nurses can apply for citizenship, gaining voting rights and EU-wide benefits. The German passport ranks among the world’s most powerful.",
  },
];

const PermResidentSection = () => {
  return (
    <div className="bg-dark ">
      <Container>
        <Row className="py-4">
          <Col lg={6} className="d-block d-md-none">
            <Image
              fluid
              src={nurseResi}
              alt="Permanent Residency"
              style={{ borderRadius: "12px" }}
            />
          </Col>
          <Col lg={5} sm={12} xs={12}>
            <div className="heading-big-medium text-content-primaryInverse">
              Permanent Residency and Citizenship Pathways
            </div>
          </Col>
          <Col lg={7} className="d-none d-md-block">
            <Image
              fluid
              src={nurseResi}
              alt="Permanent Residency"
              className="w-100 h-auto"
              style={{ borderRadius: "24px" }}
            />
          </Col>
        </Row>

        {/* Mobile View - Accordion */}
        <div className="d-block d-md-none pb-2">
          <Accordion defaultActiveKey="1" className="custom-accordion">
            {benefits.map((benefit, index) => (
              <AccordionItem
                eventKey={index.toString()}
                key={index}
                className="dark-accordion-item"
              >
                <AccordionHeader className="subheading-small-medium text-content-primaryInverse">
                  {benefit.title}
                </AccordionHeader>
                <AccordionBody className="paragraph-small-regular text-content-grey-400">
                  {benefit.text}
                </AccordionBody>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Desktop View - Cards */}
        <Row className="row-equal-height d-none d-md-flex">
          {benefits.map((benefit, index) => (
            <Col key={index} lg={index < 3 ? 4 : 6} className="mb-4">
              <Card className="nurse-perm-card">
                <CardTitle className="subheading-small-medium text-content-primaryInverse">
                  {benefit.title}
                </CardTitle>
                <CardText className="paragraph-small-regular text-content-grey-400">
                  {benefit.text}
                </CardText>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PermResidentSection;
