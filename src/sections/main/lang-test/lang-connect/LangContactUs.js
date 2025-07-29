"use client";

import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./LangContactUs.css";
import ConsultationModal from "../../../resuable/forms/calendly/LeadFormCalendly";

const LPartnerImg =
  "https://cms.skillang.com/uploads/Partner_Img_8040b41d1b.png";

const LangContactUs = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return (
    <div>
      <Container className="lang-conteact-us-bg">
        <Row>
          <Col lg={6} md={6} sm={12} xs={12} className="d-none d-md-block">
            <img src={LPartnerImg} />
          </Col>
          <Col
            lg={6}
            md={6}
            sm={12}
            xs={12}
            className="d-flex flex-column align-items-start justify-content-center"
          >
            <div className="lang-contact-us-title-content">
              <div>
                <div
                  className="heading-big-medium"
                  style={{ color: "#023655" }}
                >
                  Still have queries? Let’s Connect
                </div>
                <div
                  className="paragraph-big-medium  "
                  style={{ color: "#044971" }}
                >
                  Get in touch with our Program Advisors & get your queries
                  clarified.
                </div>
              </div>

              <div>
                <button
                  className="btn-primary"
                  onClick={() => {
                    // window.scrollTo({ top: 0, behavior: "smooth" });
                    handleShow();
                  }}
                >
                  Connect with us
                </button>
              </div>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12} className="d-block d-md-none">
            <img src={LPartnerImg} className="img-fluid" />
          </Col>
        </Row>
      </Container>
      <ConsultationModal
        show={showModal}
        handleClose={handleClose}
        showCalendly={true}
        lookingFor={"Contact us back"}
      />
    </div>
  );
};

export default LangContactUs;
