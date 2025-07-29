"use client";

import React, { useState, useRef, useEffect } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import "./whyNursingSection.css";

const whyNurse1 = "/assets/icons/nurse/whyNurse1.svg";
const whyNurse2 = "/assets/icons/nurse/whyNurse2.svg";
const whyNurse3 = "/assets/icons/nurse/whyNurse3.svg";
const whyNurse4 = "/assets/icons/nurse/whyNurse4.svg";
const whyNurse5 = "/assets/icons/nurse/whyNurse5.svg";
const whyNurse6 = "/assets/icons/nurse/whyNurse6.svg";
const whyNurse7 = "/assets/icons/nurse/whyNurse7.svg";
const whyNurse8 = "/assets/icons/nurse/whyNurse8.svg";

const WhyNurseCardData = [
  {
    title: "High Demand in Healthcare",
    desc: "Free German Courses, Online & In-Person Training & Flexible Learning Schedules all in One Place",
    img: whyNurse1,
    color: "#FFFBFB",
  },
  {
    title: "Advanced Medical Technology",
    desc: "Working with cutting-edge medical equipment and innovative practices enhances professional development",
    img: whyNurse2,
    color: "#FFFBF3",
  },
  {
    title: "Career Growth & Specialization",
    desc: "Healthcare careers offer continuous opportunities for growth, specialization, and upward mobility in various fields.",
    img: whyNurse3,
    color: "#F8FAFF",
  },
  {
    title: "Competitive Salary & Benefits",
    desc: "Healthcare professionals enjoy attractive salary packages and comprehensive benefits, ensuring financial stability",
    img: whyNurse4,
    color: "#F9F7FF",
  },
  {
    title: "Work-Life Balance",
    desc: "Enjoy a healthy work-life balance in regions, making it easier to maintain both career and personal well-being",
    img: whyNurse5,
    color: "#F8FAFF",
  },
  {
    title: "Language Support for Integration",
    desc: "Language programs make it easier for healthcare professionals to integrate into new communities",
    img: whyNurse6,
    color: "#FFF9FD",
  },
  {
    title: "Healthcare Worker Rights",
    desc: "Healthcare systems prioritize the wellbeing and rights of their workers, ensuring a supportive and secure",
    img: whyNurse7,
    color: "#FFFBF3",
  },
  {
    title: "Vibrant & Cultural Cities",
    desc: "Experience life in vibrant cities with rich cultural experiences, stunning architecture, and a diverse, welcoming atmosphere.",
    img: whyNurse8,
    color: "#FFFBFB",
  },
];

const WhyNursingSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [maxHeight, setMaxHeight] = useState("500px"); // Default max height
  const cardsRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(0); // Initialize with 0 instead of window.innerWidth

  // Check if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true and get initial screen width
    setIsMounted(true);
    setScreenWidth(window.innerWidth);

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (cardsRef.current) {
      setMaxHeight(showAll ? `${cardsRef.current.scrollHeight}px` : "500px");
    }
  }, [showAll]);

  // Don't render complex logic until mounted (avoids SSR mismatch)
  if (!isMounted) {
    return (
      <section className="">
        <Container>
          <Row className="d-flex align-items-start justify-content-center text-md-center mb-lg-5 mb-3">
            <div className="heading-small-medium text-content-primary">
              Why Nursing in Germany?
            </div>
            <div className="paragraph-small-medium text-content-secondary">
              Explore the Benefits of a Rewarding Nursing Career in Germany
            </div>
          </Row>
          <div className="why-nurse-cards-container row-equal-height">
            <Row>
              {WhyNurseCardData.map((card, index) => (
                <Col
                  key={index}
                  className="px-3 mb-4"
                  lg={3}
                  md={6}
                  sm={12}
                  xs={12}
                >
                  <Card
                    className="why-nurse-card border-0 h-100"
                    style={{ backgroundColor: card.color }}
                  >
                    <div className="p-lg-3 p-2 text-start">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="why-nurse-card-img"
                      />
                    </div>
                    <Card.Body className="d-flex flex-column py-0">
                      <div className="subheading-small-medium text-content-secondary mb-1">
                        {card.title}
                      </div>
                      <div className="paragraph-small-medium text-content-secondary">
                        {card.desc}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="">
      <Container>
        <Row className="d-flex align-items-start justify-content-center text-md-center mb-lg-5 mb-3">
          <div className="heading-small-medium text-content-primary">
            Why Nursing in Germany?
          </div>
          <div className="paragraph-small-medium text-content-secondary">
            Explore the Benefits of a Rewarding Nursing Career in Germany
          </div>
        </Row>
        <div
          ref={cardsRef}
          className={`why-nurse-cards-container row-equal-height ${
            showAll ? "expanded" : ""
          }`}
          style={{
            maxHeight: screenWidth < 768 ? maxHeight : "none",
            transition:
              screenWidth < 768 ? "max-height 0.4s ease-in-out" : "none",
            overflow: screenWidth < 768 ? "hidden" : "visible",
          }}
        >
          <Row>
            {WhyNurseCardData.map((card, index) => (
              <Col
                key={index}
                className="px-3 mb-4"
                lg={3}
                md={6}
                sm={12}
                xs={12}
              >
                <Card
                  className={`why-nurse-card border-0 h-100 ${
                    showAll || screenWidth >= 768
                      ? "visible"
                      : index < 3
                      ? "visible"
                      : "hidden"
                  }`}
                  style={{ backgroundColor: card.color }}
                >
                  <div className="p-lg-3 p-2 text-start">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="why-nurse-card-img"
                    />
                  </div>
                  <Card.Body className="d-flex flex-column py-0">
                    <div className="subheading-small-medium text-content-secondary mb-1">
                      {card.title}
                    </div>
                    <div className="paragraph-small-medium text-content-secondary">
                      {card.desc}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Toggle Button */}
        <div className="text-center d-block d-md-none mt-1">
          <button
            className="btn-secondary-outline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                Close <ChevronUp className="ms-1" />
              </>
            ) : (
              <>
                View All <ChevronDown className="ms-1" />
              </>
            )}
          </button>
        </div>
      </Container>
    </section>
  );
};

export default WhyNursingSection;
