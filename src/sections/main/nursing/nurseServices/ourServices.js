"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardText,
  CardTitle,
  Container,
  Image,
  Col,
  Row,
  Button,
} from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import "./ourServices.css";

const nurseService =
  "https://cms.skillang.com/uploads/nurse_Service_c315ee7cb7.jpg";

const services = [
  {
    title: "Screening Process",
    text: "Screening and checking the eligibility that matches the requirements.",
  },
  {
    title: "Career Guidance",
    text: "Providing professional career counseling for international placements.",
  },
  {
    title: "Visa Assistance",
    text: "Helping with visa applications and necessary documentation.",
  },
  {
    title: "Language Preparation",
    text: "Offering language courses to meet job requirements.",
  },
  {
    title: "Relocation Support",
    text: "Assisting with accommodation, cultural adaptation, and settling in.",
  },
  {
    title: "Job Placement",
    text: "We connect you with reputable healthcare facilities across Germany",
  },
  {
    title: "Cultural Integration",
    text: "Assistance in adjusting to life and work in Germany",
  },
  {
    title: "Ongoing Career Support",
    text: "Continuous guidance to help you succeed long-term",
  },
];

const OurServices = () => {
  const [showAll, setShowAll] = useState(false);
  const [maxHeight, setMaxHeight] = useState("300px");
  const [screenWidth, setScreenWidth] = useState(1024); // Default to desktop to prevent flash
  const servicesRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Monitor screen width - FIXED: Only run on client side
  useEffect(() => {
    // Set initial screen width
    setScreenWidth(window.innerWidth);

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update max height based on content
  useEffect(() => {
    if (servicesRef.current) {
      setMaxHeight(showAll ? `${servicesRef.current.scrollHeight}px` : "300px");
    }
  }, [showAll]);

  // Auto-scrolling effect for desktop/tablet screens
  useEffect(() => {
    // Skip if on mobile
    if (screenWidth <= 768) return;

    const scrollContainer = scrollContainerRef.current;
    let animationFrameId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const autoScroll = () => {
      if (scrollContainer) {
        scrollPosition += scrollSpeed;

        // Reset position when we've scrolled through all content
        if (
          scrollPosition >=
          scrollContainer.scrollHeight - scrollContainer.clientHeight
        ) {
          scrollPosition = 0;
        }

        scrollContainer.scrollTop = scrollPosition;
        animationFrameId = requestAnimationFrame(autoScroll);
      }
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(autoScroll);

    // Pause scrolling when user hovers
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollContainer) {
        scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
        scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [screenWidth]);

  return (
    <Container className="">
      <Row className="bg-primar">
        <Col md={8}>
          <Image
            fluid
            src={nurseService}
            alt="nurse"
            className="nurse-service-img"
          />
          <div className="my-3">
            <div className="heading-big-medium mb-1 text-content-primary">
              Our Services
            </div>
            <div className="paragraph-big-medium text-content-tertiary">
              We offer tailored support for your study and work abroad journey,
              including career guidance, visa assistance, documentation help,
              language prep, job placement, and relocation aid. Our expert
              mentorship helps turn your international dreams into reality.
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div
            ref={scrollContainerRef}
            className={
              screenWidth > 768
                ? "services-scrollable-container"
                : "services-container"
            }
          >
            <div
              ref={servicesRef}
              className={`services-content ${showAll ? "expanded" : ""}`}
              style={{
                maxHeight: screenWidth <= 768 ? maxHeight : "none",
                transition:
                  screenWidth <= 768 ? "max-height 0.4s ease-in-out" : "none",
                overflow: screenWidth <= 768 ? "hidden" : "visible",
              }}
            >
              {services.map((service, index) => (
                <Card key={index} className="mb-4 nurse-serv-card">
                  <CardTitle className="subheading-small-medium">
                    {service.title}
                  </CardTitle>
                  <CardText className="paragraph-small-medium text-content-secondary">
                    {service.text}
                  </CardText>
                </Card>
              ))}
            </div>
          </div>
          {/* Toggle Button - Only visible on mobile */}
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
        </Col>
      </Row>
    </Container>
  );
};

export default OurServices;
