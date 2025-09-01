"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Form,
  Overlay,
  Popover,
} from "react-bootstrap";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import useCountryData from "@/hooks/useCountryData";
import "./countryWiseUniversity.css";

const CountryWiseUniversity = () => {
  // Initialize the hook with multiple countries
  const {
    universitiesData,
    loading: dataLoading,
    error: dataError,
    fetchMultipleCountriesUniversities,
    getAllUniversitiesFromCountries,
  } = useCountryData();

  // State for managing which dropdown is currently open
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Refs for controlling the dropdown positions - ONLY COUNTRY REF
  const countryRef = useRef(null);

  // State for selected filters (before search) - SIMPLIFIED
  const [selectedFilters, setSelectedFilters] = useState({
    countries: ["usa", "uk", "germany"], // Use lowercase slugs
  });

  // State for applied filters (after search button click)
  const [appliedFilters, setAppliedFilters] = useState({
    countries: ["usa", "uk", "germany"],
  });

  // State for filtered universities
  const [filteredUniversities, setFilteredUniversities] = useState([]);

  // Loading state for filtering
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  // Filter options - SIMPLIFIED
  const filterOptions = {
    country: ["usa", "uk", "germany", "canada", "australia", "france"], // Use lowercase slugs
  };

  // Handle selection in multi-select filters (countries only)
  const handleMultiFilterSelect = (category, value) => {
    const currentValues = selectedFilters[category];
    let newValues;

    if (currentValues.includes(value)) {
      newValues = currentValues.filter((item) => item !== value);
    } else {
      newValues = [...currentValues, value];
    }

    setSelectedFilters({
      ...selectedFilters,
      [category]: newValues,
    });
  };

  // Handle removing a filter pill - SIMPLIFIED
  const removeFilter = (category, value) => {
    if (category === "countries") {
      const updatedFilters = {
        ...selectedFilters,
        [category]: selectedFilters[category].filter((item) => item !== value),
      };
      setSelectedFilters(updatedFilters);
    }
  };

  // Reset all filters - SIMPLIFIED
  const resetFilters = () => {
    setSelectedFilters({
      countries: [],
    });
  };

  // Apply filters when Search button is clicked
  const applyFilters = async () => {
    setIsFilterLoading(true);

    try {
      // Fetch data for selected countries
      if (selectedFilters.countries.length > 0) {
        await fetchMultipleCountriesUniversities(selectedFilters.countries);
      }

      setAppliedFilters({ ...selectedFilters });

      // Get all universities from loaded countries
      const allUniversities = getAllUniversitiesFromCountries();

      // Filter by selected countries
      let results = allUniversities;
      if (selectedFilters.countries.length > 0) {
        results = allUniversities.filter((uni) =>
          selectedFilters.countries.includes(uni.country.toLowerCase())
        );
      }

      setFilteredUniversities(results);
    } catch (error) {
      console.error("Error applying filters:", error);
      setFilteredUniversities([]);
    } finally {
      setIsFilterLoading(false);
    }
  };

  // Initialize filtered universities on component mount
  useEffect(() => {
    applyFilters();
  }, []);

  // Update filtered universities when data changes
  useEffect(() => {
    if (universitiesData && Object.keys(universitiesData).length > 0) {
      const allUniversities = getAllUniversitiesFromCountries();
      setFilteredUniversities(allUniversities);
    }
  }, [universitiesData, getAllUniversitiesFromCountries]);

  // Close dropdown when clicking outside - SIMPLIFIED
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideClick = !countryRef.current?.contains(event.target);

      if (activeDropdown && isOutsideClick) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  // Function to render filter pills - SIMPLIFIED
  const renderFilterPills = () => (
    <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
      {selectedFilters.countries.map((country) => (
        <Badge
          key={country}
          bg="dark"
          className="py-2 px-3 rounded-pill d-flex align-items-center"
          onClick={() => removeFilter("countries", country)}
          style={{ cursor: "pointer" }}
        >
          {country.toUpperCase()} <span className="ms-2 fw-bold">&times;</span>
        </Badge>
      ))}

      {selectedFilters.countries.length > 0 && (
        <Button
          variant="outline-danger"
          className="rounded-pill border-0 ms-2 d-flex align-items-center"
          onClick={resetFilters}
          style={{ color: "#ff6b35" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="me-1"
          >
            <path
              d="M5 12H19M12 5V19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Reset Filters
        </Button>
      )}
    </div>
  );

  // Function to render filter buttons and dropdowns - SIMPLIFIED
  const renderFilterDropdowns = () => (
    <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
      {/* Degree Filter - DISABLED */}
      {/* <div className="position-relative">
        <Button
          variant="outline-secondary"
          className="rounded-pill d-flex align-items-center"
          style={{ fontSize: "14px", fontWeight: "normal", opacity: 0.5 }}
          disabled
        >
          Degree <span className="ms-2">▼</span>
        </Button>
      </div> */}

      {/* Stream Filter - DISABLED */}
      {/* <div className="position-relative">
        <Button
          variant="outline-secondary"
          className="rounded-pill d-flex align-items-center"
          style={{ fontSize: "14px", fontWeight: "normal", opacity: 0.5 }}
          disabled
        >
          Stream <span className="ms-2">▼</span>
        </Button>
      </div> */}

      {/* Country Filter - ONLY ACTIVE FILTER */}
      <div className="position-relative">
        <Button
          ref={countryRef}
          variant="outline-secondary"
          className="rounded-pill d-flex align-items-center"
          style={{ fontSize: "14px", fontWeight: "normal" }}
          onClick={() =>
            setActiveDropdown(activeDropdown === "country" ? null : "country")
          }
        >
          Country <span className="ms-2">▼</span>
        </Button>
        <Overlay
          target={countryRef.current}
          show={activeDropdown === "country"}
          placement="bottom-start"
          rootClose
          onHide={() => setActiveDropdown(null)}
        >
          <Popover style={{ minWidth: "200px" }}>
            <Popover.Body>
              {filterOptions.country.map((option) => (
                <Form.Check
                  key={option}
                  type="checkbox"
                  id={`country-${option}`}
                  label={option.toUpperCase()}
                  checked={selectedFilters.countries.includes(option)}
                  onChange={() => handleMultiFilterSelect("countries", option)}
                  className="mb-2"
                />
              ))}
            </Popover.Body>
          </Popover>
        </Overlay>
      </div>

      {/* Fee Filter - DISABLED */}
      {/* <div className="position-relative">
        <Button
          variant="outline-secondary"
          className="rounded-pill d-flex align-items-center"
          style={{ fontSize: "14px", fontWeight: "normal", opacity: 0.5 }}
          disabled
        >
          Fee <span className="ms-2">▼</span>
        </Button>
      </div> */}

      {/* Exam Accepted Filter - DISABLED */}
      {/* <div className="position-relative">
        <Button
          variant="outline-secondary"
          className="rounded-pill d-flex align-items-center"
          style={{ fontSize: "14px", fontWeight: "normal", opacity: 0.5 }}
          disabled
        >
          Exam Accepted <span className="ms-2">▼</span>
        </Button>
      </div> */}

      {/* Course Duration Filter - DISABLED */}
      {/* <div className="position-relative">
        <Button
          variant="outline-secondary"
          className="rounded-pill d-flex align-items-center"
          style={{ fontSize: "14px", fontWeight: "normal", opacity: 0.5 }}
          disabled
        >
          Course Duration <span className="ms-2">▼</span>
        </Button>
      </div> */}

      {/* Search Button with Loading State */}
      <Button
        variant="primary"
        className="rounded-pill"
        onClick={applyFilters}
        disabled={isFilterLoading || dataLoading}
      >
        {isFilterLoading || dataLoading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Searching...
          </>
        ) : (
          <>
            <FaSearch className="me-2" /> Search
          </>
        )}
      </Button>
    </div>
  );

  // Show error state if there's an error
  if (dataError) {
    return (
      <Container className="py-4">
        <div className="alert alert-danger">
          <h4>Error Loading Universities</h4>
          <p>{dataError}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Filters Section */}
      <div className="mb-4">
        {renderFilterDropdowns()}
        {renderFilterPills()}
        <p
          className="text-muted"
          style={{ fontSize: "14px", marginLeft: "5px" }}
        >
          {filteredUniversities.length} Results Found
        </p>
      </div>

      {/* University Listings with Loading State */}
      {isFilterLoading || dataLoading ? (
        <div className="text-center py-5">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="mt-3">Fetching Universities...</h4>
          <p className="text-muted">
            Please wait while we find the best matches for you
          </p>
        </div>
      ) : filteredUniversities.length > 0 ? (
        filteredUniversities.map((university) => (
          <Card key={university.id} className="mb-4 country-wise-uni-card">
            <Row className="g-0 h-100">
              <Col sm={12} xs={12} md={4}>
                <img
                  src={university.image}
                  alt={university.name}
                  className="indi-uni-card-image"
                />
              </Col>
              <Col sm={12} xs={12} md={6}>
                <Card.Body className="p-md-4 p-2">
                  <div className="d-flex justify-content-between align-items-start">
                    <Card.Title className="subheading-big-medium">
                      {university.name}
                    </Card.Title>
                  </div>

                  <div className="d-flex flex-md-row flex-column text-content-secondary gap-2">
                    <div>
                      <FaMapMarkerAlt className=" me-2" />
                      <span className="paragraph-small-medium me-4">
                        {university.location}
                      </span>
                    </div>

                    <div className="d-flex align-items-center">
                      <Badge className="display-badge-default-pill caption-medium text-content-secondary me-3">
                        {university.type}
                      </Badge>

                      <div className="d-flex align-items-center display-badge-default-pill">
                        <img
                          src="assets/icons/study-abroad-country-wise/qsRankIcon.svg"
                          alt="QS Rank"
                          width={12}
                          height={12}
                        />
                        <span className="me-1 caption-medium text-content-secondary ">
                          QS Rank: {university.ranking}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Row className="mt-2 d-none d-md-flex">
                    <Col md={6}>
                      <p className="text-secondary mb-1">Course Offered</p>
                      <p className="fw-bold mb-0">
                        {university.courses} courses
                      </p>
                    </Col>
                    <Col md={6}>
                      <p className="text-secondary mb-1">Avg Living Cost</p>
                      <p className="fw-bold mb-0">{university.livingCost}</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
              <Col sm={12} xs={12} md={2}>
                <div className="d-flex w-100 p-2 justify-content-start justify-content-md-center align-items-start h-100 gap-2 flex-md-column pb-2">
                  <Button variant="primary" className="w-100">
                    Check Eligibility
                  </Button>
                  {/*<Button variant="secondary-outline">Shortlist</Button> */}
                </div>
              </Col>
            </Row>
          </Card>
        ))
      ) : (
        <div className="text-center py-5">
          <h4>No universities found matching your criteria</h4>
          <p className="text-muted">
            Try adjusting your filters and search again
          </p>
        </div>
      )}
    </Container>
  );
};

export default CountryWiseUniversity;
