import React from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
const WhyOppCardImp =
  "/assets/images/german-opp-card/WhatGermanOppCardVisaImg.jpg";
import "./WhyIsGermanOppCard.css";

const WhatIsGermanOppCardComp = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col sm={12} xs={12} md={6}>
            <div className="heading-big-medium">
              What is the Opportunity Card Visa?
            </div>
            <div className="paragraph-big-medium text-content-secondary">
              <ul>
                <li>
                  The Opportunity Card Visa is a simplified immigration pathway
                  for skilled professionals to enter Germany and explore job
                  opportunities.
                </li>
                <li>
                  Allows job seekers to enter and work for up to 6 months while
                  looking for full-time employment.
                </li>
              </ul>
            </div>
          </Col>
          <Col sm={12} xs={12} md={6}>
            <Image
              src={WhyOppCardImp}
              className="WhyGerOppCardImp"
              alt="WhyOppCardImp"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WhatIsGermanOppCardComp;
