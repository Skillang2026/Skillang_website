import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./nurseStats.css";

const walletIcon = "/assets/icons/wallet-money.svg";

const NurseStats = () => {
  return (
    <div className=" d-flex align-items-center justify-content-center">
      <Container className="d-flex justify-content-center align-items-center nurseStatsbg">
        <Row className="w-100">
          <Col lg={5} sm={12} xs={12} className="d-flex flex-column ">
            <div className="compSal d-flex flex-row">
              <img src={walletIcon} alt="wallet" className="image-fluid" />
              <div className="text-primary-inverse caption-medium">
                Competitive Salaries
              </div>
            </div>
            <div className="subheading-small-medium text-content-secondary">
              Before Recognition
            </div>
            <div className=" align-items-end">
              <div className="subheading-big-medium text-content-secondary me-1">
                €2,200 - €2,950 PM
              </div>
              <div className="text-content-secondary">+ Benefits per month</div>
            </div>
          </Col>
          <Col
            lg={5}
            sm={12}
            xs={12}
            className="d-flex flex-column align-items-start justify-content-end mt-4"
          >
            <div className="subheading-small-medium text-content-secondary">
              After Recognition
            </div>
            <div style={{ color: "#4F8AFB" }} className=" align-items-end">
              <div className="subheading-big-medium">€3,200 - €3,490 PM</div>
              <div>+ Benefits per month</div>
            </div>
          </Col>
          <Col lg={2}></Col>
          <div className="caption-regular mt-4 text-content-secondary">
            * Salaries may vary depending on region, experience, and
            specialization.
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default NurseStats;
