"use client";

import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./UniContact.css";
import ConsultationModal from "../forms/calendly/LeadFormCalendly";

const UniContactComp = ({
  heading,
  description,
  buttonText,
  // onButtonClick = () => {},
  leftColSize = 8,
  rightColSize = 4,
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  // Default onClick handler if none provided
  const handleButtonClick = () => {
    handleShow();
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
  };
  return (
    <div className="university-choice-section">
      <Row className="align-items-center">
        <Col md={leftColSize}>
          <div className="heading-small-medium text-content-navy-900">
            {heading}
          </div>
          <div className="paragraph-big-medium py-3 text-content-navy-800">
            {description}
          </div>
        </Col>
        <Col
          md={rightColSize}
          className={`d-flex ${
            rightColSize === 12
              ? "justify-content-start"
              : "justify-content-end"
          }`}
        >
          <button className="btn-primary" onClick={handleButtonClick}>
            {buttonText}
          </button>
        </Col>
      </Row>
      <ConsultationModal
        show={showModal}
        handleClose={handleClose}
        showCalendly={false}
        lookingFor={"Contact Uni"}
      />
    </div>
  );
};

export default UniContactComp;
