"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, ListGroup } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa";
import "./TopScholarship.css";
import { useCountryData } from "@/hooks/useCountryData";
import ViewOneScholarshipModal from "@/sections/resuable/forms/view-scholarships/viewOneScholarships.js";

const TopScholarshipComp = () => {
  const [activeCountry, setActiveCountry] = useState("");
  const [availableCountries, setAvailableCountries] = useState([]);
  const [scholarshipData, setScholarshipData] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  // Use the existing country data hook
  const {
    fetchCountryData,
    fetchAllCountries,
    allCountries,
    countryData,
    loading: hookLoading,
    error,
  } = useCountryData();

  // Fetch all available countries on component mount
  useEffect(() => {
    const loadAvailableCountries = async () => {
      setInitialLoading(true);
      try {
        await fetchAllCountries();
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    loadAvailableCountries();
  }, []);

  // Process all countries data when it's loaded
  useEffect(() => {
    if (allCountries && allCountries.length > 0) {
      // Transform countries data for our needs
      const countries = allCountries
        .filter((country) => country.isActive) // Only active countries
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)) // Sort by display order
        .map((country) => ({
          name: country.shortForm?.trim() || country.fullForm,
          slug: country.slug,
          fullName: country.fullForm,
          displayOrder: country.displayOrder || 999,
        }));

      setAvailableCountries(countries);

      // Set first country as active if none selected
      if (!activeCountry && countries.length > 0) {
        setActiveCountry(countries[0].name);
        // Fetch initial country data
        fetchScholarshipForCountry(countries[0].slug, countries[0].name);
      }
    }
  }, [allCountries]);

  // Fetch scholarship data for a specific country
  const fetchScholarshipForCountry = async (countrySlug, countryName) => {
    if (scholarshipData[countryName]) {
      // Already have data for this country
      return;
    }

    setLoading(true);
    try {
      await fetchCountryData(countrySlug);
    } catch (error) {
      console.error(`Error fetching scholarships for ${countryName}:`, error);
    } finally {
      setLoading(false);
    }
  };

  // Update scholarship data when countryData changes
  useEffect(() => {
    if (countryData) {
      const countrySlug = Object.keys(countryData)[0];
      const data = countryData[countrySlug];

      if (data && data.scholarships) {
        const countryObj = availableCountries.find(
          (c) => c.slug === countrySlug
        );
        if (countryObj) {
          setScholarshipData((prev) => ({
            ...prev,
            [countryObj.name]: data.scholarships.map((scholarship) => ({
              name: scholarship.name,
              link: scholarship.applyLink || "#",
              id: scholarship.id,
              benefits: scholarship.benefits,
              deadline: scholarship.deadline,
              eligibility: scholarship.eligibility,
            })),
          }));
        }
      }
    }
  }, [countryData, availableCountries]);

  // Handle country tab change
  const handleCountryChange = async (countryName) => {
    setActiveCountry(countryName);
    const country = availableCountries.find((c) => c.name === countryName);
    if (country) {
      await fetchScholarshipForCountry(country.slug, countryName);
    }
  };

  // Handle scholarship click - opens individual scholarship modal
  const handleScholarshipClick = (scholarship) => {
    // Ensure the scholarship has the required structure for the modal
    const processedScholarship = {
      ...scholarship,
      eligibility: scholarship.eligibility || [], // Ensure eligibility is an array
      benefits: scholarship.benefits || "Benefits information not available",
      deadline: scholarship.deadline || "Deadline information not available",
      applyLink: scholarship.link || "#",
    };

    // console.log("Setting selected scholarship:", processedScholarship);
    setSelectedScholarship(processedScholarship);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedScholarship(null);
  };
  // Get current scholarships for active country
  const currentScholarships = scholarshipData[activeCountry] || [];

  // Split scholarships into two columns
  const leftColumnScholarships = currentScholarships.slice(
    0,
    Math.ceil(currentScholarships.length / 2)
  );
  const rightColumnScholarships = currentScholarships.slice(
    Math.ceil(currentScholarships.length / 2)
  );

  // Show initial loading state
  if (initialLoading) {
    return (
      <Container className="">
        <Container>
          <div className="heading-big-medium mb-5 pb-5">Top Scholarships</div>
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading countries...</span>
            </div>
            <p className="mt-2 text-muted">Loading available countries...</p>
          </div>
        </Container>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <div className="heading-big-medium mb-5 pb-5">Top Scholarships</div>

        {/* Country selection tabs */}
        {availableCountries.length > 0 && (
          <Nav
            variant="pills"
            className="flex-row flex-nowrap mb-4 overflow-auto"
            style={{ gap: "10px" }}
          >
            {availableCountries.map((country) => (
              <Nav.Item key={country.slug}>
                <Nav.Link
                  className={`rounded-pill px-3 py-2 ${
                    activeCountry === country.name
                      ? "bg-dark text-white"
                      : "bg-light text-dark"
                  }`}
                  onClick={() => handleCountryChange(country.name)}
                  style={{
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    border: "1px solid #dee2e6",
                  }}
                  title={country.fullName} // Show full name on hover
                >
                  {country.name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        )}

        {/* Loading indicator */}
        {(loading || hookLoading) && (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading scholarships...</span>
            </div>
            <p className="mt-2 text-muted">
              Loading {activeCountry} scholarships...
            </p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="alert alert-warning mb-4" role="alert">
            <h6>Unable to load scholarships</h6>
            <p className="mb-0">
              We're having trouble fetching scholarship data for {activeCountry}
              . Please try again or contact support if the issue persists.
            </p>
          </div>
        )}

        {/* No countries available */}
        {!initialLoading && availableCountries.length === 0 && (
          <div className="text-center py-5">
            <h5 className="text-muted">No Countries Available</h5>
            <p className="text-muted">
              Unable to load country data. Please try refreshing the page.
            </p>
          </div>
        )}

        {/* Scholarship listings with click functionality */}
        {!loading && !hookLoading && currentScholarships.length > 0 && (
          <>
            <Row>
              <Col md={6}>
                <ListGroup variant="flush">
                  {leftColumnScholarships.map((scholarship, index) => (
                    <div
                      key={`left-${scholarship.id || index}`}
                      className="top-scholars-list mb-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleScholarshipClick(scholarship)}
                    >
                      <span>{scholarship.name}</span>
                      <FaChevronRight color="#6c757d" />
                    </div>
                  ))}
                </ListGroup>
              </Col>

              <Col md={6}>
                <ListGroup variant="flush">
                  {rightColumnScholarships.map((scholarship, index) => (
                    <div
                      key={`right-${scholarship.id || index}`}
                      className="top-scholars-list mb-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleScholarshipClick(scholarship)}
                    >
                      <span className="paragraph-big-medium text-content-secondary">
                        {scholarship.name}
                      </span>
                      <FaChevronRight color="#6c757d" />
                    </div>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </>
        )}

        {/* No scholarships message */}
        {!loading &&
          !hookLoading &&
          activeCountry &&
          currentScholarships.length === 0 &&
          !error && (
            <div className="text-center py-5">
              <h5 className="text-muted">No Scholarships Available</h5>
              <p className="text-muted">
                We don't have scholarship data for {activeCountry} at the
                moment. Please check other countries or try again later.
              </p>
            </div>
          )}
      </Container>

      <ViewOneScholarshipModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        selectedScholarship={selectedScholarship}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </>
  );
};

export default TopScholarshipComp;
