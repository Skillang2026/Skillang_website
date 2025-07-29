"use client";

import React, { useState, useCallback } from "react";
import { Container, Image, Row } from "react-bootstrap";
import "./ImageMainHeader.css";
import ConsultationModal from "../../sections/resuable/forms/calendly/LeadFormCalendly";

const ImageHeaderComponent = ({
  imageSrc,
  imageAlt = "header-image",
  title,
  subheading,
  buttonText = "Talk to an Expert",
}) => {
  const [showModal, setShowModal] = useState(false);

  // Use useCallback to ensure stable function references
  const handleClose = useCallback(() => setShowModal(false), []);
  const handleShow = useCallback(() => setShowModal(true), []);

  // Default onClick handler if none provided
  const handleButtonClick = useCallback(() => {
    handleShow();
  }, [handleShow]);

  return (
    <header className="d-flex align-items-start justify-content-center text-center study-aborad-country-header">
      <div className="circle-blur"></div>
      <Container className="">
        <Row>
          <Image src={imageSrc} alt={imageAlt} className="country-wise-img" />
        </Row>
        <Row>
          <h1 className="heading-big-medium mt-3">{title}</h1>
        </Row>
        <Row className="d-flex align-items-center justify-content-center my-2">
          <div className="paragraph-big-medium study-aborad-country-text-wrapper">
            {subheading}
          </div>
        </Row>
        <Row className="mt-4">
          <div>
            <button className="btn-primary" onClick={handleButtonClick}>
              {buttonText}
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
    </header>
  );
};

export default ImageHeaderComponent;
