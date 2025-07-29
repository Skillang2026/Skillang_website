"use client";

import React, { useState } from "react";
import { Container, Row, Col, Card, CardImg } from "react-bootstrap";
import PartnerWithUsPopUpModal from "../../../resuable/forms/three-partner/partnerWithUsPopUp";
import "@/sections/main/nursing/why-nursing-ger/whyNursingSection.css";

const partWithUsIcon1 = "/assets/icons/partner-with-us/instiIcon.svg";
const partWithUsIcon2 = "/assets/icons/partner-with-us/companyIcon.svg";
const partWithUsIcon3 = "/assets/icons/partner-with-us/recuriterIcon.svg";

const PartnerTypeSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState("Institution"); // Default type

  const handleClose = () => setShowModal(false);

  // Updated to accept a type parameter
  const handleShow = (type) => {
    setSelectedType(type);
    setShowModal(true);
  };

  const partnerTypes = [
    {
      icon: partWithUsIcon1,
      title: "Join as an Institutional Partner",
      description:
        "Partner with us to provide your students access to life-changing international education and training programs.",
      type: "Institution",
    },
    {
      icon: partWithUsIcon2,
      title: "Join as a Corporate Partner",
      description:
        "Partner with us to provide your students access to life-changing international education and training programs.",
      type: "Company",
    },
    {
      icon: partWithUsIcon3,
      title: "Join as a Channel Partner",
      description:
        "Promote our services in your region and become a trusted local face of international opportunities.",
      type: "Recruiter",
    },
  ];

  return (
    <div>
      <Container>
        <Row className="text-center">
          <div className="heading-big-medium">Join Us from Anywhere!</div>
          <p className="paragraph-big-medium text-content-secondary">
            Embark on your new journey with one of the leading study abroad
            franchises.
          </p>
        </Row>
        <Row>
          {partnerTypes.map((partner, index) => (
            <Col key={index} md={4} sm={12} xs={12} className="mb-3">
              <Card className="why-nurse-card">
                <CardImg
                  variant="top"
                  src={partner.icon}
                  className="why-nurse-card-img"
                  alt={`partner wish us icon ${index + 1}`}
                />
                <Card.Body className="px-1">
                  <Card.Title className="subheading-small-medium">
                    {partner.title}
                  </Card.Title>
                  <Card.Text className="paragraph-big-medium text-content-secondary">
                    {partner.description}
                  </Card.Text>
                  <button
                    className="btn-primary"
                    onClick={() => handleShow(partner.type)}
                  >
                    Know More
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <PartnerWithUsPopUpModal
        show={showModal}
        handleClose={handleClose}
        defaultType={selectedType}
      />
    </div>
  );
};

export default PartnerTypeSection;
