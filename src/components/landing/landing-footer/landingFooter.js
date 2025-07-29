import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
const nurseImg = "/assets/images/landing/nurse-img.png";
const logo = "/assets/images/logos/logo-3.svg";

const LandingFooter = () => {
  return (
    <footer className="m-lg-5 m-2 py-3">
      <Container
        fluid
        className="footer-bg rounded-4 p-0 px-4 my-4"
        id="footer-card-1"
      >
        <Row className="align-items-center">
          <Col md={6} className="d-none d-md-block">
            <Image fluid src={nurseImg} alt="nurse Image" />
          </Col>
          <Col
            md={6}
            sm={12}
            xs={12}
            className="justify-content-start align-items-start text-start pe-5"
          >
            <h1 className="heading-small-medium my-4">
              Gateway to Global Nursing Career
            </h1>
            <div>
              <img src={logo} alt="Logo" className="mb-3 footer-logo" />
            </div>
            <p>© 2025 All Rights Reserved, Skillang</p>
          </Col>
          <Col
            sm={12}
            xs={12}
            className="d-block d-md-none ms-auto d-flex justify-content-end align-items-end"
            style={{ overflow: "hidden" }}
          >
            <Image
              src={nurseImg}
              alt="nurse Image"
              style={{ height: "250px" }}
            />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default LandingFooter;
