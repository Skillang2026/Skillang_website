"use client";

import React from "react";
import {
  CardTitle,
  Container,
  Card,
  Row,
  Col,
  CardBody,
  CardText,
  CardImg,
} from "react-bootstrap";
import "./work-abroad-opportunity.css";
import { useRouter } from "next/navigation";

const work4 = "/assets/icons/home/electrical.svg";
const work5 = "/assets/icons/home/plumbing.svg";
const work6 = "/assets/icons/home/vpaintin.svg";
const work7 = "/assets/icons/home/automobile.svg";
const work8 = "/assets/icons/home/mechanical.svg";
const work9 = "/assets/icons/home/welding.svg";

const primCardData = [
  {
    title: "Nursing & Healthcare",
    img: "https://cms.skillang.com/uploads/work_Abroad_Card1_27f26318d0.jpg",
    color: "#FCEBC3",
    btnType: "btn-secondary",
    colSize: 6,
    desc: "We specialize in placing skilled nurses and healthcare professionals abroad. We make the process seamless for both candidates and employers.",
    id: "wac1",
    link: "/nursing",
  },
  {
    title: "Hospitality Management",
    img: "https://cms.skillang.com/uploads/work_Abroad_Card2_4c86752600.jpg",
    color: "#FFFFFF",
    btnType: "btn-secondary-outline",
    colSize: 3,
    desc: "We connect world-class talent with leading hotels, resorts, and restaurants abroad. From chefs to managers and all other positions.",
    id: "wac2",
    link: "/work-abroad",
  },
  {
    title: "Information Technology",
    img: "https://cms.skillang.com/uploads/work_Abroad_Card3_dc7b25ef0e.jpg",
    color: "#FFFFFF",
    btnType: "btn-secondary-outline",
    colSize: 3,
    desc: "We connect skilled IT professionals with leading global companies. From software engineers to tech specialists.",
    id: "wac3",
    link: "/work-abroad",
  },
];

const WorkAbroadOpportunity = () => {
  const router = useRouter();

  const secCardData = [
    { img: work4, text: "Electrical" },
    { img: work5, text: "Plumbing" },
    { img: work6, text: "Vehicle Painting" },
    { img: work7, text: "Automobile" },
    { img: work8, text: "Mechanical" },
    { img: work9, text: "Heavy Welding" },
  ];

  const handleNavigation = (link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="d-flex flex-column align-items-center justify-content-center">
      <Container className="d-flex flex-column align-items-center justify-content-center bg-primar ">
        <div className="work-abroad-bg-card align-items-center justify-content-center mb-5">
          <Row className="mb-2 m-0">
            <div className="heading-big-medium text-content-primary text-center">
              Work Abroad Opportunities
            </div>
          </Row>
          <Row className="gy-3">
            {primCardData.map((card, index) => (
              <Col key={index} lg={card.colSize} md={6} sm={12} xs={12}>
                <Card
                  className="prim-card d-flex border-0 mb-2"
                  id={card.id}
                  style={{ backgroundColor: card.color }}
                >
                  <Card.Img
                    variant="top"
                    className="work-card-img"
                    src={card.img}
                    alt="Card image"
                  />
                  <CardBody className="d-flex flex-column justify-content-between p-2">
                    <div className="card-header-sectio flex-column">
                      <CardTitle className="subheading-small-medium">
                        {card.title}
                      </CardTitle>
                      <CardText className="paragraph-small-regular">
                        {card.desc}
                      </CardText>
                    </div>
                    <div className="w-sm-100">
                      <button
                        className={`${card.btnType} w-sm-100`}
                        onClick={() => handleNavigation(card.link)}
                      >
                        Know more
                      </button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div className="w-100">
          <Row className="bg-primar w-100 mx-0">
            <Col
              lg={8}
              md={4}
              className="work-abroad-left-bg flex-column text-white d-flex align-items-end justify-content-start text-start p-0"
            >
              <div className="work-ops-textwrap bg-primar">
                <h2 className="text-white heading-small-medium">
                  Diverse Range of Opportunities
                </h2>
                <p className="text-white paragraph-small-medium my-3">
                  We help you choose from large range of employment
                  opportunities
                </p>
                <div>
                  <button
                    className="btn-primary"
                    onClick={() => handleNavigation("/work-abroad")}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </Col>
            <Col lg={4} md={8} className="pe-0">
              <div className="work-abroad-right-bg ">
                <Row className="">
                  {secCardData.map((service, index) => (
                    <Col key={index} className="mb-3 " lg={6} sm={6} xs={6}>
                      <Card className="work-abroad-card flex-column">
                        <CardImg
                          variant="top"
                          src={service.img}
                          alt={`${service.text} icon`}
                          className="work-abroad-card-img"
                        />
                        <CardBody className="p-0">
                          <div className="paragraph-small-medium text-content-secondary work-abroad-card-text">
                            {service.text}
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default WorkAbroadOpportunity;
