"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./scholarship.css";
import { ChevronRight } from "react-bootstrap-icons";

import ViewOneScholarshipModal from "../../../resuable/forms/view-scholarships/viewOneScholarships";
import ViewAllScholarshipPopUp from "../../../resuable/forms/view-scholarships/viewAllScholarship";

const EduScholarleftimg =
  "/assets/images/study-abroad-county-wise/scholarLeft.png";

const ScholarshipAbroadCountry = ({ country = "uk", countryData }) => {
  // Add state for modal and mobile detection
  const [showModal, setShowModal] = useState(false);
  const [showAllModal, setShowAllModal] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection useEffect
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value after component mounts
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Safety check - if no countryData prop provided, show loading
  if (!countryData) {
    return (
      <section className="d-flex justify-content-end edu-scholarship-bg">
        <Container>
          <Row className="align-items-center mt-5">
            <Col lg={12}>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "200px" }}
              >
                <div className="spinner-border text-white" role="status">
                  <span className="visually-hidden">
                    Loading scholarship data...
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  // Safety check - if country data doesn't exist for this country
  if (!countryData[country]) {
    return (
      <section className="d-flex justify-content-end edu-scholarship-bg">
        <Container>
          <Row className="align-items-center mt-5">
            <Col lg={12}>
              <div className="alert alert-warning m-3">
                <h4>Scholarship data not found</h4>
                <p>Could not find scholarship data for country: {country}</p>
                <p>Available: {Object.keys(countryData).join(", ")}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  // Get the data for this specific country
  const data = countryData[country];

  // Get scholarships from API data or fall back to sample data
  let scholarships = [];

  // Option 1: Try to get from countryData first
  if (data.scholarships && Array.isArray(data.scholarships)) {
    scholarships = data.scholarships;
  }
  // Option 2: Try to get from education.scholarships
  else if (
    data.education &&
    data.education.scholarships &&
    Array.isArray(data.education.scholarships)
  ) {
    scholarships = data.education.scholarships;
  }
  // Option 3: Fall back to sample data (temporary)
  else {
    console.warn(
      "ScholarshipAbroadCountry: No API scholarships found, using sample data for",
      country
    );
  }

  // Function to handle scholarship click
  const handleScholarshipClick = (scholarship) => {
    // Ensure the scholarship has the required structure for the modal
    const processedScholarship = {
      ...scholarship,
      eligibility: scholarship.eligibility || [], // Ensure eligibility is an array
      benefits: scholarship.benefits || "Benefits information not available",
      deadline: scholarship.deadline || "Deadline information not available",
      applyLink: scholarship.applyLink || "#",
    };

    setSelectedScholarship(processedScholarship);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to open "View All" modal
  const handleViewAllClick = () => {
    setShowAllModal(true);
  };

  // Function to close "View All" modal
  const handleCloseAllModal = () => {
    setShowAllModal(false);
  };

  // Determine how many scholarships to show based on screen size
  const displayedScholarships = isMobile
    ? scholarships
    : scholarships.slice(0, 4);

  return (
    <>
      <section className="d-flex justify-content-end edu-scholarship-bg">
        <Container>
          <Row className="align-items-center mt-5">
            <Col lg={6} md={12}>
              <div className="scholarship-content">
                <div className="heading-big-medium text-white mb-3">
                  Top Scholarships Available to Study in{" "}
                  {data?.fullForm || country.toUpperCase()}
                </div>
                <p className="text-white mb-4">
                  Discover diverse financial aid options that make your{" "}
                  {data?.shortForm || country.toUpperCase()} education dream
                  more accessible and affordable.
                </p>

                <div className="scholarship-list">
                  {displayedScholarships.map((scholarship) => (
                    <div
                      key={scholarship.id}
                      className="scholarship-item"
                      style={{ cursor: "pointer" }}
                    >
                      <a
                        href={scholarship.link}
                        className="d-flex justify-content-between align-items-center text-white text-decoration-none"
                        onClick={(e) => {
                          e.preventDefault();
                          handleScholarshipClick(scholarship);
                        }}
                      >
                        <span>{scholarship.name}</span>
                        <span>
                          <ChevronRight />
                        </span>
                      </a>
                    </div>
                  ))}
                </div>

                {/* Only show "View All" button on desktop when there are more than 4 scholarships */}
                {!isMobile && scholarships.length > 4 && (
                  <button
                    className="mt-md-4 mt-3 btn btn-primary"
                    onClick={handleViewAllClick}
                  >
                    View all Scholarships ({scholarships.length})
                  </button>
                )}
              </div>
            </Col>

            <Col lg={6} className="d-none d-md-block">
              <div className="scholarship-image h-75 d-flex align-items-center justify-content-center">
                <img
                  src={EduScholarleftimg}
                  alt="Graduate student with degree"
                  className="img-fluid h-75"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Scholarship Details Modal */}
      <ViewOneScholarshipModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        selectedScholarship={selectedScholarship}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      {/* View All Scholarships Modal */}
      <ViewAllScholarshipPopUp
        showAllModal={showAllModal}
        handleCloseAllModal={handleCloseAllModal}
        scholarships={scholarships}
        handleScholarshipClick={handleScholarshipClick}
        country={country}
      />
    </>
  );
};

export default ScholarshipAbroadCountry;
