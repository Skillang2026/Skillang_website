import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../../../app/page.module.css";

const britishCounsil = "/assets/images/lang-test/britishCounsil.svg";
const duo = "/assets/images/lang-test/duo.svg";
const pear = "/assets/images/lang-test/pearosn.svg";

const LangTestPartners = () => {
  return (
    <div className="text-center ">
      <Container className="">
        <Row>
          <div className="heading-big-medium mb-5 pb-4 header-wrapper">
            Our Language & Test Prep Programs
          </div>
        </Row>
        <Row>
          <div className="d-flex gap-lg-5 gap-2 flex-wrap justify-content-center">
            <img src={britishCounsil} alt=" " />
            <img src={duo} alt=" " />
            <img src={pear} alt=" " />
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LangTestPartners;
