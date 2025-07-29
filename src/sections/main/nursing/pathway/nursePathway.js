import React from "react";
import { Container, Col, Row } from "react-bootstrap";

import "./nursePathway.css";

const NursePathwaySection = () => {
  return (
    <div className="d-flex align-items-start justify-content-start nurse-path-card bg-primar">
      <Container className="text-center bg-whit">
        <Row className="bg-primar">
          <Col lg={1}></Col>
          <Col lg={10}>
            <div className="mb-md-5 mb-2 heading-big-medium">
              Start your Pathway to a 🌐 Global Healthcare Career
            </div>
            <div className="paragraph-big-medium text-content-secondary">
              Free German Courses, Online & In-Person Training & Flexible
              Learning Schedules all in One Place
            </div>
            {/* <button className='btn-primary-outline'
             onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}>Learn More</button> */}
          </Col>
          <Col lg={1}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default NursePathwaySection;
