"use client";

import React, { useState, useRef, useEffect } from "react";
import { Container, Col, Row, Card, CardBody } from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import "./nursePosi.css";

const nursingPositions = [
  {
    title: "General Nurses",
    text: "Providing essential patient care in hospitals and clinics.",
  },
  {
    title: "ICU Nurses",
    text: "Expert care in specific medical fields like ICU, pediatrics, or oncology.",
  },
  {
    title: "Pediatric Nurses",
    text: "Advanced practice nurses with diagnostic and treatment responsibilities.",
  },
  {
    title: "Care Manager",
    text: "Overseeing patient care plans and ensuring quality healthcare services.",
  },
  {
    title: "Nurse Educators",
    text: "Training and mentoring future nursing professionals.",
  },
  {
    title: "Home Care Nurses",
    text: "Delivering personalized medical care to patients at home.",
  },
];

const NursingPosition = () => {
  const [showAll, setShowAll] = useState(false);
  const [maxHeight, setMaxHeight] = useState("500px");
  const cardsRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(0); // Initialize with 0

  useEffect(() => {
    // Set initial screen width after component mounts
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

  return (
    <div className="">
      <Container>
        <Row className="text-md-center">
          <div className="heading-big-medium text-content-primary mb-1">
            Available Nursing Positions in Germany
          </div>
          <div className="paragraph-big-medium text-content-secondary mb-md-4">
            Position availability depends on regional healthcare needs
          </div>
        </Row>

        {/* Cards Section */}
        <div
          ref={cardsRef}
          className="nurse-cards-container row-equal-height m-0"
          style={{
            maxHeight: screenWidth < 768 ? maxHeight : "none",
            transition:
              screenWidth < 768 ? "max-height 0.4s ease-in-out" : "none",
            overflow: screenWidth < 768 ? "hidden" : "visible",
          }}
        >
          <Row>
            {nursingPositions.map((position, index) => (
              <Col
                key={index}
                className="px-3 mb-4"
                lg={4}
                md={6}
                sm={12}
                xs={12}
              >
                <Card
                  className={`nurse-posi-card h-100 ${
                    showAll || screenWidth >= 768
                      ? "visible"
                      : index < 3
                      ? "visible"
                      : "hidden"
                  }`}
                >
                  <div className="tab-circle"></div>
                  <CardBody className="d-flex flex-column">
                    <div className="subheading-small-medium text-content-secondary mb-1">
                      {position.title}
                    </div>
                    <div className="paragraph-small-medium text-content-secondary">
                      {position.text}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* View All / Close Button */}
        <div className="text-center d-block d-md-none m-0">
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
    </div>
  );
};

export default NursingPosition;
