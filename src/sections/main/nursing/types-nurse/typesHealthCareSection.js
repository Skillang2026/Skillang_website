import React from "react";
import { CardTitle, Container, Col, Card, Row } from "react-bootstrap";
import "./typesHealthCareSection.css";

const ntype1 = "https://cms.skillang.com/uploads/n_Type1_92f3840669.jpg";
const ntype2 = "https://cms.skillang.com/uploads/n_Type2_cb90a45f32.jpg";
const ntype3 = "https://cms.skillang.com/uploads/n_Type3_ab88679daa.jpg";
const ntype4 = "https://cms.skillang.com/uploads/n_Type4_18a3bff56d.jpg";
const ntype5 = "https://cms.skillang.com/uploads/n_Type5_734afb3ede.jpg";
const ntype6 = "https://cms.skillang.com/uploads/n_Type6_70a7960d99.jpg";

const nurseTypes = [
  { title: "Hospital  (public and private)", img: ntype1 },
  { title: "Nursing Homes", img: ntype2 },
  { title: "Home Care  Services", img: ntype3 },
  { title: "Rehab Centers", img: ntype4 },
  { title: "Clinics & Specialized Medical Centres", img: ntype5 },
  { title: "Research & Academic Institutions", img: ntype6 },
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
                  alt="."
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
