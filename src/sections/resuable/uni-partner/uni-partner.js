"use client";

import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ScrollEle from "./scroll";
import "./uni-partner.css";
import ConsultationModal from "../forms/calendly/LeadFormCalendly";

const UniPartner = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <Container className="">
        <Row>
          <Col
            lg={8}
            md={8}
            sm={12}
            xs={12}
            className="d-flex align-items-center justify-content-center mb-4"
          >
            <div className="scroll-wrapper d-flex align-items-center justify-content-center uni-partner-bg w-100 h-100">
              <ScrollEle />
            </div>
          </Col>
          <Col
            lg={4}
            md={4}
            sm={12}
            xs={12}
            className="d-flex flex-column align-items-start justify-content-start text-center text-lg-start"
          >
            <div className="heading-big-medium  w-100">
              Our Partnered Universities
            </div>
            <div className="paragraph-big-medium text-content-secondary">
              Collaborating with Top Institutions to Bring You World-Class
              Education Opportunities.
            </div>
            <Row className="w-100 m-0 p-0 py-4">
              <Col lg={6} sm={6} xs={6} className="p-0 pe-1">
                <div className="num-cards">
                  <div className="num-cards-title">850+</div>
                  <div className="num-cards-subtitle">Universities</div>
                </div>
              </Col>
              <Col lg={6} sm={6} xs={6} className="p-0 ps-2">
                <div className="num-cards">
                  <div className="num-cards-title">30+</div>
                  <div className="num-cards-subtitle">Countries</div>
                </div>
              </Col>
              <div className="text-center text-lg-start mt-3 ps-0">
                <button
                  className="btn-primary text-center"
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Book a Free Consultation
                </button>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Consultation Modal */}
      <ConsultationModal
        show={showModal}
        handleClose={handleClose}
        showCalendly={false}
        lookingFor={"Partner Universities"}
      />
    </div>
  );
};

export default UniPartner;
