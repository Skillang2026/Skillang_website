"use client";

import React, { useState, useRef, useEffect } from "react";
import { Container, Col, Row, Card, CardBody } from "react-bootstrap";
import "./ServiceOfferCountryWise.css";
import { MdFlight } from "react-icons/md";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";

const resumeIcon = "/assets/images/work-abroad/icons/resumr.png";
const jobMatchIcon = "/assets/images/work-abroad/icons/job_match.png";
const interviewIcon =
  "/assets/images/work-abroad/icons/interview_preparation.png";
const visaIcon = "/assets/images/work-abroad/icons/visa_assistance.png";

const ukFlag = "/assets/images/work-abroad/countryflags/uk.png";
const germanyFlag = "/assets/images/work-abroad/countryflags/germany.png";
const usaFlag = "/assets/images/work-abroad/countryflags/usa.png";
const australiaFlag = "/assets/images/work-abroad/countryflags/australia.png";
const canadaFlag = "/assets/images/work-abroad/countryflags/canada.png";

import ConsultationModal from "../../resuable/forms/calendly/LeadFormCalendly";

const serviceOfferings = [
  {
    title: "Resume & CV Optimization",
    description:
      "Experts craft compelling CVs tailored to meet your target job market standards.",
    icon: resumeIcon,
    position: "top-center",
  },
  {
    title: "Job Matching",
    description:
      "Find job opportunities that align with your skills and experience.",
    icon: jobMatchIcon,
    position: "bottom-left",
  },
  {
    title: "Interview Preparation",
    description:
      "Get expert guidance and practice sessions to ace your interviews.",
    icon: interviewIcon,
    position: "bottom-right",
  },
  {
    title: "Visa Assistance",
    description: "Navigate visa applications with ease and expert support.",
    icon: visaIcon,
    position: "top-right",
  },
];

const countryGuidance = [
  {
    country: "UK",
    details:
      "Guidance on the Tier 2 Visa, which is for skilled workers. We help you through the sponsorship and points-based assessment process.",
    flag: ukFlag,
  },
  {
    country: "Germany",
    details:
      "The Blue Card is an EU work permit for highly skilled non-EU citizens in fields like Nursing, IT, and Hospitality.",
    flag: germanyFlag,
  },
  {
    country: "USA",
    details:
      "Assistance with H-1B visas, which are issued for specialty occupations in fields like IT and healthcare.",
    flag: usaFlag,
  },
  {
    country: "Australia",
    details:
      "Help with the Skilled Worker visa, detailing the points test and the importance of being on the Skilled Occupations List.",
    flag: australiaFlag,
  },
  {
    country: "Canada",
    details:
      "Support with the Federal Skilled Worker Program and Provincial Nominee Programs, which target skilled workers.",
    flag: canadaFlag,
  },
];

const ServiceOfferCountryWise = () => {
  const [showAll, setShowAll] = useState(false);
  const [maxHeight, setMaxHeight] = useState("400px"); // Default max height
  const cardsRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(0); // Initialize with 0
  const [hoveredService, setHoveredService] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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
    <div className="d-flex justify-content-center  align-items-center bg-primar">
      {/* Service Offerings Section */}
      <div className="service-bg d-flex flex-column justify-content-start align-items-center">
        <Container className=" d-flex flex-column justify-content-start align-items-center">
          <Row className="justify-content-end mb-4 d-flex flex-column align-items-center ">
            <Col className="text-center d-flex justify-content-start align-items-center flex flex-column ">
              <div className="section-title heading-big-medium">
                Service Offerings
              </div>
              <div className="paragraph-big-medium text-content-secondary mb-5">
                Our comprehensive services are designed to streamline the
                process of <br />
                securing a job and work visa in your chosen country.
              </div>
            </Col>
          </Row>

          <Row className="service-wave-layout justify-content-center">
            {serviceOfferings.map((service, index) => (
              <Col
                md={3}
                key={index}
                className={`service-item ${service.position}`}
                onMouseEnter={() => setHoveredService(service.title)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  className="service-icon"
                />
                <div className="service-name-pill caption-bold">
                  {service.title}
                </div>
                {hoveredService === service.title && (
                  <div className="service-description-popup">
                    <div className="paragraph-small-medium text-content-secondary">
                      {service.description}
                    </div>
                  </div>
                )}
              </Col>
            ))}
          </Row>
        </Container>

        {/* Country Guidance Section */}
        <Container className="py-5">
          <Row className="justify-content-center mb-3 ">
            <Col md={8} className="text-center">
              <div className="d-flex justify-content-center mx-auto align-items-center mb-2">
                <div className="tag-button text-center justify-content-center alignt-items-center caption-bold  ">
                  <MdFlight className="me-2 tag-icon image-fluid" />
                  {/* <img src={airplane} alt="Airplane" className="tag-icon image-fluid" /> */}
                  Skill Shortage Visas
                </div>
              </div>
              <div className="heading-big-medium visadiscrip">
                Work Visa Guidance
                <br />
                Country-wise
              </div>
              <div className="paragraph-big-medium text-content-secondary visadiscrip">
                Our comprehensive services are designed to streamline the
                process of securing a job and work visa in your chosen country.
              </div>
            </Col>
          </Row>

          {/* Country Cards */}
          <div
            ref={cardsRef}
            className={`service-offering-cards-container row-equal-height ${
              showAll ? "expanded" : ""
            }`}
            style={{
              maxHeight: screenWidth < 768 ? maxHeight : "none",
              transition:
                screenWidth < 768 ? "max-height 0.4s ease-in-out" : "none",
              overflow: screenWidth < 768 ? "hidden" : "visible",
            }}
          >
            <Row className="justify-content-center ">
              {countryGuidance.map((country, index) => (
                <Col md={4} sm={12} xs={12} key={index} className="mb-lg-4">
                  <div className="country-card ">
                    <div className="country-header">
                      <div className="country-name subheading-small-medium">
                        {country.country}
                      </div>
                      <img
                        src={country.flag}
                        alt={country.country}
                        className="country-flag"
                      />
                    </div>
                    <div className="country-text paragraph-small-regular">
                      {country.details}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <div className="d-flex justify-content-center mx-auto align-items-center mt-2 visadiscrip">
            <button
              className="btn-primary"
              onClick={() => {
                // window.scrollTo({ top: 0, behavior: "smooth" });
                handleShow();
              }}
            >
              Book Free Consultation
            </button>
          </div>

          {/* Toggle Button */}
          <div className="text-center d-block d-md-none mt-5">
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
      <ConsultationModal
        show={showModal}
        handleClose={handleClose}
        lookingFor={"service"}
      />
    </div>
  );
};

export default ServiceOfferCountryWise;
