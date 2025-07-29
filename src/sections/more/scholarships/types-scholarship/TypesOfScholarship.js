import React from "react";
const scholar1 = "/assets/icons/scholarships/card-tick.svg";
const scholar2 = "/assets/icons/scholarships/document-text.svg";
const scholar3 = "/assets/icons/scholarships/card-tick.svg";
const scholar4 = "/assets/icons/scholarships/paperclip-2.svg";
import { Col, Container, Row } from "react-bootstrap";
import BlueIconCard from "../../../../utils/cards/blueIconCards";

const typesOOfScholarshipData = [
  {
    img: scholar1,
    title: "Merit-based Scholarships",
    text: "Awarded for academic, artistic, athletic, or extracurricular excellence.",
  },
  {
    img: scholar2,
    title: "Need-based Scholarships",
    text: "Designed for students who can demonstrate financial need.",
  },
  {
    img: scholar3,
    title: "Country-specific Scholarships",
    text: "Scholarships available for students from specific countries with varying eligibility criteria.",
  },
  {
    img: scholar4,
    title: "Program-specific Scholarships",
    text: "Offered by individual universities or academic programs based on your field of study and merit.",
  },
  {
    img: scholar1,
    title: "Government-funded Scholarships",
    text: "Provided by government bodies from your home country or the host country.",
  },
  {
    img: scholar2,
    title: "Private Organization Scholarships",
    text: "Funded by private businesses, NGOs, or foundations, often targeting specific groups or fields of study.",
  },
];

const TypesOfScholarship = () => {
  return (
    <div>
      <Container>
        <Row>
          <div className="heading-big-medium mb-5 pb-5">
            Types of Scholarships Available
          </div>
        </Row>
        <Row>
          {typesOOfScholarshipData.map((item, index) => (
            <Col key={index} lg={3} md={3} sm={12} xs={12} className="mb-4">
              <BlueIconCard
                img={item.img}
                title={item.title}
                text={item.text}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default TypesOfScholarship;
