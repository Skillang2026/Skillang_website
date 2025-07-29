import React from "react";
import {
  Card,
  Row,
  Col,
  Container,
  CardImg,
  CardBody,
  CardText,
} from "react-bootstrap";
import whynurse1 from "../../../assets/images/landing/whyus1.svg";
import whynurse2 from "../../../assets/images/landing/whyus2.svg";
import whynurse3 from "../../../assets/images/landing/whyus3.svg";
import whynurse4 from "../../../assets/images/landing/whyus4.svg";
import whynurse5 from "../../../assets/images/landing/whyus5.svg";
import whynurse6 from "../../../assets/images/landing/whyus6.svg";
import whynurse7 from "../../../assets/images/landing/whyus7.svg";
import whynurse8 from "../../../assets/images/landing/whyus8.svg";
import whynurse9 from "../../../assets/images/landing/whyus9.svg";
import "./whyUsNurse.css"; // Import the CSS file

const WhyUsNurse = () => {
  const services = [
    { img: whynurse8, text: "Free German Language Training" },
    { img: whynurse1, text: "Personalized Consultation" },
    { img: whynurse2, text: "Documentation Support" },
    { img: whynurse3, text: "Interview Preparation" },
    { img: whynurse4, text: "Job Placement" },
    { img: whynurse5, text: "Certification Support" },
    { img: whynurse6, text: "Visa Assistance" },
    { img: whynurse7, text: "Cultural Integration" },
    { img: whynurse9, text: "Relocation assistance" },
  ];

  return (
    <>
      <section className="justify-conent-center align-items-start d-flex d-none d-md-block">
        <div className="why-us-nurse-bg mx-lg-5 mx-2 justify-conent-center align-items-center d-flex flex-column ">
          <h1 className="text-center heading-small-medium text-white py-lg-4 mb-4">
            Why Choose Us?
          </h1>
          <Container>
            <div className="why-us-container px-1">
              {services.map((service, index) => (
                <Card key={index} className="why-us-card flex-row ">
                  <CardImg variant="top" src={service.img} />
                  <CardBody className="d-flex align-items-center  justify-conent-center">
                    <CardText className="">{service.text}</CardText>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Container>
        </div>
      </section>

      <div className="justify-content-center align-items-start d-flex d-block d-md-none">
        <div className="why-us-nurse-bg mx-lg-5 mx-2 justify-content-center align-items-center d-flex flex-column">
          <div className="text-center heading-small-medium text-white py-lg-4 mb-4">
            Why Choose Us?
          </div>
          <Container className="why-us-container">
            <Row>
              {services.map((service, index) => (
                <Col
                  key={index}
                  xs={index === 0 ? 12 : 6} // Last card full width
                  md="auto"
                  className="d-flex justify-content-center align-items-center px-1"
                >
                  <Card className="why-us-card flex-row mb-2">
                    <CardImg variant="top" src={service.img} />
                    <CardBody className="d-flex align-items-center justify-content-center">
                      <CardText className="text-start why-us-text">
                        {service.text}
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default WhyUsNurse;
