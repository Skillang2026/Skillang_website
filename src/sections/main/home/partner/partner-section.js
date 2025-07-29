"use client";

import React from "react";
import "../home-page.css";

import "./partner.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import partnerImg from "../../../assets/images/home/partner-img.png";

const PartnerSection = () => {
  return (
    <div className=" d-flex justify-content-center align-items-center my-5 partner-div mx-auto">
      <Container className="d-flex text-center justify-content-center align-items-center">
        <Row className="d-flex justify-content-center align-items-center px-4 partner-bg ">
          <Col md={6} className="d-none d-md-block">
            {" "}
            {/* Hidden on small screens */}
            <Image fluid src={partnerImg} alt="Partner Image" />
          </Col>
          <Col
            md={6}
            className="justify-content-start align-items-start text-start"
          >
            <h1 className="p-lg-2 pt-4 partner-heading ">
              Boost your professional journey with Skillang{" "}
            </h1>
            <p className="pb-lg-2 ps-lg-2">
              Tailored Support for International Education, Employment
              Opportunities, and Language Preparation.
            </p>
            <button
              className="py-lg-2 btn-secondary"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Contact Now
            </button>
          </Col>
          <Col sm={6} xs={6} className="d-block d-md-none ">
            <Image
              src={partnerImg}
              alt="Partner Image"
              style={{ height: "200px", width: "100%" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PartnerSection;
