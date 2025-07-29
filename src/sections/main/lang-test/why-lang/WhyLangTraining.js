import React from "react";
import {
  Container,
  Col,
  Row,
  Card,
  CardImg,
  Image,
  CardTitle,
  CardText,
  CardBody,
} from "react-bootstrap";
import "./WhyLangTraining.css";

const whyLearnIcon1 = "/assets/icons/lang-test/collab.svg";
const whyLearnIcon2 = "/assets/icons/lang-test/admission.svg";
const whyLearnIcon3 = "/assets/icons/lang-test/communicate.svg";

const whyLearnImg =
  "https://cms.skillang.com/uploads/L_Why_Learn_Img_ea0793b3ad.jpg";

const cardData = [
  {
    icon: whyLearnIcon1,
    title: "Career & Culture Ready",
    text: "Improve job prospects and integrate seamlessly into a new cultural environment",
    alt: "Career & Culture Ready",
  },
  {
    icon: whyLearnIcon2,
    title: "Admission & Visa Success",
    text: "Meet university language requirements and boost your visa approval chances",
    alt: "Admission & Visa Success",
  },
  {
    icon: whyLearnIcon3,
    title: "Fluent Communication",
    text: "Develop strong language skills for academic success and daily interactions abroad",
    alt: "Fluent Communication",
  },
];

const WhyLangTraining = () => {
  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center">
        <Row className="w-100 d-flex justify-content-center align-items-center">
          <Col
            lg={6}
            md={6}
            sm={12}
            xs={12}
            className="d-flex flex-column justify-content-center align-items-stretch"
          >
            <Row className="" style={{ marginBottom: "24px" }}>
              <div className="heading-big-medium text-content-primary">
                Why Language Training Matters?
              </div>
            </Row>
            <Row>
              {cardData.slice(0, 2).map((card, index) => (
                <Col lg={6} sm={12} xs={12} key={index} className=" mb-3">
                  <Card className="why-lang-training-cards">
                    <img
                      src={card.icon}
                      alt={card.alt}
                      width="50"
                      height="50"
                    />
                    <CardTitle className="subheading-small-medium text-content-secondary">
                      {card.title}
                    </CardTitle>
                    <CardText className="paragraph-big-medium text-content-secondary">
                      {card.text}
                    </CardText>
                  </Card>
                </Col>
              ))}
            </Row>
            <Col lg={12}>
              {cardData.slice(2, 3).map((card, index) => (
                <Card key={index} className="why-lang-training-cards">
                  <img src={card.icon} alt={card.alt} width="50" height="50" />
                  <CardTitle className="subheading-small-medium text-content-secondary">
                    {card.title}
                  </CardTitle>
                  <CardText className="paragraph-big-medium text-content-secondary">
                    {card.text}
                  </CardText>
                </Card>
              ))}
            </Col>
          </Col>
          <Col
            lg={6}
            md={6}
            className="d-flex justify-content-center align-items-center d-none d-md-block overflow-hidden  p-0"
          >
            <Image
              src={whyLearnImg}
              alt="Language Training Image"
              className="image-fluid why-lang-training-image"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WhyLangTraining;
