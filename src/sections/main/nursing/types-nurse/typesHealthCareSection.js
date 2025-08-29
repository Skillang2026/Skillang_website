import React from "react";
import { CardTitle, Container, Col, Card, Row } from "react-bootstrap";
import "./typesHealthCareSection.css";

const ntype1 =
  "/assets/images/nursing/types-of-healthcare-facilities-hiring-nurses.jpg";
const ntype2 = "/assets/images/nursing/nursing-homes.jpg";
const ntype3 = "/assets/images/nursing/home-care-services.jpg";
const ntype4 = "/assets/images/nursing/rehab-centers.jpg";
const ntype5 = "/assets/images/nursing/clinics-specialized-medical-centres.jpg";
const ntype6 = "/assets/images/nursing/research-academic-institutions.jpg";

const nurseTypes = [
  {
    title: "Hospital  (public and private)",
    img: ntype1,
    imgAlt: "Types Of Healthcare Facilities Hiring Nurses",
  },
  { title: "Nursing Homes", img: ntype2, imgAlt: "Nursing Homes" },
  { title: "Home Care  Services", img: ntype3, imgAlt: "Home Care Services" },
  { title: "Rehab Centers", img: ntype4, imgAlt: "Rehab Centers" },
  {
    title: "Clinics & Specialized Medical Centres",
    img: ntype5,
    imgAlt: "Clinics & Specialized Medical Centres",
  },
  {
    title: "Research & Academic Institutions",
    img: ntype6,
    imgAlt: "Research & Academic Institutions",
  },
];

const TypesHealthCareSection = () => {
  return (
    <div>
      <Container className="">
        <Row>
          <div>
            <div className="heading-big-medium text-md-center px-2">
              Types of Healthcare Facilities Hiring Nurses
            </div>
          </div>
          {nurseTypes.map((challenge, index) => (
            <Col key={index} lg={4} sm={12} xs={12} className="mt-4">
              <Card className="nurse-types-card">
                <img
                  src={challenge.img}
                  alt={challenge.imgAlt}
                  className="nurse-types-card-img mb-3"
                />
                <CardTitle className="subheading-small-medium text-start">
                  {challenge.title}
                </CardTitle>
                {/* <CardText>{challenge.text}</CardText> */}
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default TypesHealthCareSection;
