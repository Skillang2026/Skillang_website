"use client";

import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ConsultationModal from "../../../resuable/forms/calendly/LeadFormCalendly";
import "./GerOppsCardconnect.css"; // Assuming you have a CSS file for styles

const GerOppCardConnectComp = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  // Default onClick handler if none provided
  const handleButtonClick = () => {
    handleShow();
  };
  return (
    <div>
      <Container>
        <div className="university-choice-section">
          <div className="heading-small-medium text-content-navy-900">
            Ready to start your journey?
          </div>
          <div className="paragraph-big-medium py-3 text-content-navy-800">
            Apply today and move closer to your career goals in Germany!
          </div>
          <div className="d-flex gap-2">
            <button className="btn-secondary" onClick={handleButtonClick}>
              Book a Free Consultation
            </button>
            <button className="btn-primary" onClick={handleButtonClick}>
              Start Application
            </button>
          </div>
        </div>
      </Container>
      <ConsultationModal
        show={showModal}
        handleClose={handleClose}
        showCalendly={false}
        lookingFor={"Ger Opp card connect"}
      />
      ;
    </div>
  );
};

export default GerOppCardConnectComp;
