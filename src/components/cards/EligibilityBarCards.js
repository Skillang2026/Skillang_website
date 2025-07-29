import React from "react";
import { Container, Row, Col, Card, CardImg, CardBody } from "react-bootstrap";
import "./eligibilityBarCards.css"; // Renamed to be more generic

const EligibilityBarCardsComponent = ({
  title,
  subheading,
  eligibilityData,
  className = "",
}) => {
  return (
    <div className={`${className}`}>
      <Container>
        <Row className="mt-lg-0 mb-5 text-lg-center">
          <h1 className="heading-big-medium text-content-primary text-lg-center mb-2">
            {title}
          </h1>
          <div className="paragraph-big-medium text-content-secondary">
            {subheading}
          </div>
        </Row>
        <Row>
          {eligibilityData.map((item, index) => (
            <Col key={index} lg={3} md={3} sm={12} xs={12} className="mb-4">
              <Card className="eligibility-bar-card">
                <CardImg
                  src={item.img}
                  alt={`Eligibility ${index + 1}`}
                  className="eligibility-bar-card-img"
                />
                <CardBody className="p-0 mt-3">
                  <div className="eligibility-card-text paragraph-small-medium text-content-secondary">
                    {item.text}
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default EligibilityBarCardsComponent;
