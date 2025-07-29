"use client";

import React, { useState } from "react";
import "./morePaheHeader.css";
import { Container, Row } from "react-bootstrap";
import ConsultationModal from "../forms/calendly/LeadFormCalendly";

const MorePageHeader = ({
  desktopBgImage,
  mobileBgImage,
  title,
  description,
  buttonText,
  buttonOnClick,
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  // Default onClick handler if none provided
  const handleButtonClick =
    buttonOnClick ||
    (() => {
      handleShow();
      // window.scrollTo({
      //   top: 0,
      //   behavior: "smooth",
      // });
    });

  return (
    <div
      className="d-flex align-items-start  justify-content-center reusable-header-card"
      style={{
        "--desktop-more-page-bg-image": `url(${desktopBgImage})`,
        "--mobile-more-page-bg-image": mobileBgImage
          ? `url(${mobileBgImage})`
          : `url(${desktopBgImage})`,
      }}
    >
      <Container className="text-center justify-content-center">
        <Row className="justify-content-center">
          <div className="header-wrapper">
            <h1 className="heading-big-medium">{title || "Default Title"}</h1>
            <div className="paragraph-big-medium text-content-secondary">
              {description || "Default description text goes here."}
            </div>
            <button className="btn-primary mt-4" onClick={handleButtonClick}>
              {buttonText || "Call to Action"}
            </button>
          </div>
        </Row>
      </Container>
      <ConsultationModal
        show={showModal}
        handleClose={handleClose}
        showCalendly={false}
        lookingFor={title}
      />
    </div>
  );
};

export default MorePageHeader;
