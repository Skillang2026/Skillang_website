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
import "./countryWiseUniversity.css";

const uniList1 = "/assets/images/study-abroad-county-wise/uni-list.jpg";

const CountryWiseUniversity = () => {
  // State for managing which dropdown is currently open
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Refs for controlling the dropdown positions
  const degreeRef = useRef(null);
  const streamRef = useRef(null);
  const countryRef = useRef(null);
  const feeRef = useRef(null);
  const examRef = useRef(null);
  const durationRef = useRef(null);

  // State for selected filters (before search)
  const [selectedFilters, setSelectedFilters] = useState({
    degree: "Masters",
    countries: ["USA", "UK", "Germany"],
    fee: "<10 Lakhs",
    exam: "IELTS",
    duration: "2-3 Years",
  });

  // State for applied filters (after search button click)
  const [appliedFilters, setAppliedFilters] = useState({
    degree: "Masters",
    countries: ["USA", "UK", "Germany"],
    fee: "<10 Lakhs",
    exam: "IELTS",
    duration: "2-3 Years",
  });

  // State for filtered universities
  const [filteredUniversities, setFilteredUniversities] = useState([]);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Filter options
  const filterOptions = {
    degree: ["Bachelors", "Masters", "PhD"],
    stream: ["Engineering", "Business", "Computer Science", "Arts", "Medicine"],
    country: ["USA", "UK", "Germany", "Canada", "Australia", "France", "India"],
    fee: ["<10 Lakhs", "10-15 Lakhs", ">15 Lakhs"],
    exam: ["IELTS", "TOEFL", "GRE", "GMAT", "SAT", "PTE"],
    duration: ["1-2 Years", "2-3 Years", "3+ Years"],
  };

  // List of all universities
  const [allUniversities] = useState([
    {
      id: 1,
      name: "Arizona State University Tempe Campus",
      image: uniList1,
      location: "Tempe, AZ, United States",
      type: "Government",
      ranking: "#55",
      courses: 23,
      livingCost: "INR 11,23,000",
      country: "USA",
      fee: "<10 Lakhs",
      exams: ["IELTS", "TOEFL"],
      duration: "2-3 Years",
      degree: "Masters",
    },
    {
      id: 2,
      name: "Drexel University",
      image: uniList1,
      location: "Philadelphia, United States",
      type: "Private",
      ranking: "#55",
      courses: 23,
      livingCost: "INR 11,23,000",
      country: "USA",
      fee: "10-15 Lakhs",
      exams: ["IELTS", "TOEFL", "GRE"],
      duration: "2-3 Years",
      degree: "Masters",
    },
    {
      id: 3,
      name: "University of Manchester",
      image: uniList1,
      location: "Manchester, United Kingdom",
      type: "Public",
      ranking: "#28",
      courses: 35,
      livingCost: "INR 14,75,000",
      country: "UK",
      fee: ">15 Lakhs",
      exams: ["IELTS"],
      duration: "1-2 Years",
      degree: "Masters",
    },
    {
      id: 4,
      name: "Technical University of Munich",
      image: uniList1,
      location: "Munich, Germany",
      type: "Public",
      ranking: "#41",
      courses: 28,
      livingCost: "INR 10,50,000",
      country: "Germany",
      fee: "<10 Lakhs",
      exams: ["IELTS", "TestDaF"],
      duration: "2-3 Years",
      degree: "Masters",
    },
    {
      id: 5,
      name: "University of Toronto",
      image: uniList1,
      location: "Toronto, Canada",
      type: "Public",
      ranking: "#25",
      courses: 42,
      livingCost: "INR 16,50,000",
      country: "Canada",
      fee: ">15 Lakhs",
      exams: ["IELTS", "TOEFL"],
      duration: "2-3 Years",
      degree: "PhD",
    },
    {
      id: 6,
      name: "University of Melbourne",
      image: uniList1,
      location: "Melbourne, Australia",
      type: "Public",
      ranking: "#33",
      courses: 38,
      livingCost: "INR 15,25,000",
      country: "Australia",
      fee: ">15 Lakhs",
      exams: ["IELTS", "PTE"],
      duration: "2-3 Years",
      degree: "Bachelors",
    },
  ]);

  // Handle selection of a single filter value
  const handleSingleFilterSelect = (category, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [category]: value,
    });
    setActiveDropdown(null);
  };

  // Handle selection in multi-select filters (countries)
  const handleMultiFilterSelect = (category, value) => {
    const currentValues = selectedFilters[category];
    let newValues;

    if (currentValues.includes(value)) {
      // Remove if already selected
      newValues = currentValues.filter((item) => item !== value);
    } else {
      // Add if not already selected
      newValues = [...currentValues, value];
    }

    setSelectedFilters({
      ...selectedFilters,
      [category]: newValues,
    });
  };

  // Handle removing a filter pill
  const removeFilter = (category, value) => {
    if (category === "countries") {
      // For multi-select filters
      const updatedFilters = {
        ...selectedFilters,
        [category]: selectedFilters[category].filter((item) => item !== value),
      };
      setSelectedFilters(updatedFilters);
    } else {
      // For single-select filters
      const updatedFilters = {
        ...selectedFilters,
        [category]: "",
      };
      setSelectedFilters(updatedFilters);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    const emptyFilters = {
      degree: "",
      countries: [],
      fee: "",
      exam: "",
      duration: "",
    };
    setSelectedFilters(emptyFilters);
  };

  // Apply filters when Search button is clicked
  const applyFilters = () => {
    // Set loading state to true
    setIsLoading(true);

    // Simulate an API call with setTimeout
    setTimeout(() => {
      setAppliedFilters({ ...selectedFilters });

      let results = [...allUniversities];

      // Filter by degree
      if (selectedFilters.degree) {
        results = results.filter(
          (uni) => uni.degree === selectedFilters.degree
        );
      }

      // Filter by countries
      if (selectedFilters.countries.length > 0) {
        results = results.filter((uni) =>
          selectedFilters.countries.includes(uni.country)
        );
      }

      // Filter by fee
      if (selectedFilters.fee) {
        results = results.filter((uni) => uni.fee === selectedFilters.fee);
      }

      // Filter by exam
      if (selectedFilters.exam) {
        results = results.filter((uni) =>
          uni.exams.includes(selectedFilters.exam)
        );
      }

      // Filter by duration
      if (selectedFilters.duration) {
        results = results.filter(
          (uni) => uni.duration === selectedFilters.duration
        );
      }

      setFilteredUniversities(results);

      // Set loading state back to false
      setIsLoading(false);
    }, 1500); // Simulating a network delay of 1.5 seconds
  };

  // Initialize filtered universities on component mount
  useEffect(() => {
    applyFilters();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideClick =
        !degreeRef.current?.contains(event.target) &&
        !streamRef.current?.contains(event.target) &&
        !countryRef.current?.contains(event.target) &&
        !feeRef.current?.contains(event.target) &&
        !examRef.current?.contains(event.target) &&
        !durationRef.current?.contains(event.target);

      if (activeDropdown && isOutsideClick) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  // Function to render filter pills
  const renderFilterPills = () => (
    <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
      {selectedFilters.degree && (
        <Badge
          bg="dark"
          className="py-2 px-3 rounded-pill d-flex align-items-center"
          onClick={() => removeFilter("degree")}
          style={{ cursor: "pointer" }}
        >
          {selectedFilters.degree} <span className="ms-2 fw-bold">&times;</span>
        </Badge>
      )}

      {selectedFilters.countries.map((country) => (
        <Badge
          key={country}
          bg="dark"
          className="py-2 px-3 rounded-pill d-flex align-items-center"
          onClick={() => removeFilter("countries", country)}
          style={{ cursor: "pointer" }}
        >
          {country} <span className="ms-2 fw-bold">&times;</span>
        </Badge>
      ))}

      {selectedFilters.fee && (
        <Badge
          bg="dark"
          className="py-2 px-3 rounded-pill d-flex align-items-center"
          onClick={() => removeFilter("fee")}
          style={{ cursor: "pointer" }}
        >
          {selectedFilters.fee} <span className="ms-2 fw-bold">&times;</span>
        </Badge>
      )}

      {selectedFilters.exam && (
        <Badge
          bg="dark"
          className="py-2 px-3 rounded-pill d-flex align-items-center"
          onClick={() => removeFilter("exam")}
          style={{ cursor: "pointer" }}
        >
          {selectedFilters.exam} <span className="ms-2 fw-bold">&times;</span>
        </Badge>
      )}

      {selectedFilters.duration && (
        <Badge
          bg="dark"
          className="py-2 px-3 rounded-pill d-flex align-items-center"
          onClick={() => removeFilter("duration")}
          style={{ cursor: "pointer" }}
        >
          {selectedFilters.duration}{" "}
          <span className="ms-2 fw-bold">&times;</span>
        </Badge>
      )}

      {(selectedFilters.degree ||
        selectedFilters.countries.length > 0 ||
        selectedFilters.fee ||
        selectedFilters.exam ||
        selectedFilters.duration) && (
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

  // Function to render filter buttons and dropdowns
  const renderFilterDropdowns = () => (
    <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
      {/* Degree Filter */}
      <div className="position-relative">
        <Button
          ref={degreeRef}
          variant="outline-secondary"
          className="rounded-pill d-flex align-items-center"
          style={{ fontSize: "14px", fontWeight: "normal" }}
          onClick={() =>
            setActiveDropdown(activeDropdown === "degree" ? null : "degree")
          }
        >
          Degree <span className="ms-2">▼</span>
        </Button>
        <Overlay
          target={degreeRef.current}
          show={activeDropdown === "degree"}
          placement="bottom-start"
          rootClose
          onHide={() => setActiveDropdown(null)}
        >
          <Popover style={{ minWidth: "200px" }}>
            <Popover.Body>
              {filterOptions.degree.map((option) => (
                <div
                  key={option}
                  className="py-1 px-2 hover-bg-light"
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedFilters.degree === option
                        ? "#f8f9fa"
                        : "transparent",
                  }}
                  onClick={() => handleSingleFilterSelect("degree", option)}
                >
                  {option}
                  {selectedFilters.degree === option && (
                    <span className="float-end text-primary">✓</span>
                  )}
                </div>
              ))}
            </Popover.Body>
          </Popover>
        </Overlay>
      </div>

      {/* Stream Filter */}
      <div className="position-relative">
        <Button
          ref={streamRef}
          variant="outline-secondary"
          className="rounded-pill d-flex align-items-center"
          style={{ fontSize: "14px", fontWeight: "normal" }}
          onClick={() =>
            setActiveDropdown(activeDropdown === "stream" ? null : "stream")
          }
        >
          Stream <span className="ms-2">▼</span>
        </Button>
        <Overlay
          target={streamRef.current}
          show={activeDropdown === "stream"}
          placement="bottom-start"
          rootClose
          onHide={() => setActiveDropdown(null)}
        >
          <Popover style={{ minWidth: "200px" }}>
            <Popover.Body>
              {filterOptions.stream.map((option) => (
                <div
                  key={option}
                  className="py-1 px-2 hover-bg-light"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSingleFilterSelect("stream", option)}
                >
                  {option}
                </div>
              ))}
            </Popover.Body>
          </Popover>
        </Overlay>
      </div>

      {/* Country Filter */}
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
                  label={option}
                  checked={selectedFilters.countries.includes(option)}
                  onChange={() => handleMultiFilterSelect("countries", option)}
                  className="mb-2"
                />
              ))}
            </Popover.Body>
          </Popover>
        </Overlay>
      </div>

      {/* Fee Filter */}
      <div className="position-relative">
        <Button
          ref={feeRef}
          variant="outline-secondary"
          className="rounded-pill d-flex align-items-center"
          style={{ fontSize: "14px", fontWeight: "normal" }}
          onClick={() =>
            setActiveDropdown(activeDropdown === "fee" ? null : "fee")
          }
        >
          Fee <span className="ms-2">▼</span>
        </Button>
        <Overlay
          target={feeRef.current}
          show={activeDropdown === "fee"}
          placement="bottom-start"
          rootClose
          onHide={() => setActiveDropdown(null)}
        >
          <Popover style={{ minWidth: "200px" }}>
            <Popover.Body>
              {filterOptions.fee.map((option) => (
                <div
                  key={option}
                  className="py-1 px-2 hover-bg-light"
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedFilters.fee === option
                        ? "#f8f9fa"
                        : "transparent",
                  }}
                  onClick={() => handleSingleFilterSelect("fee", option)}
                >
                  {option}
                  {selectedFilters.fee === option && (
                    <span className="float-end text-primary">✓</span>
                  )}
                </div>
              ))}
            </Popover.Body>
          </Popover>
        </Overlay>
      </div>

      {/* Exam Accepted Filter */}
      <div className="position-relative">
        <Button
          ref={examRef}
          variant="outline-secondary"
          className="rounded-pill d-flex align-items-center"
          style={{ fontSize: "14px", fontWeight: "normal" }}
          onClick={() =>
            setActiveDropdown(activeDropdown === "exam" ? null : "exam")
          }
        >
          Exam Accepted <span className="ms-2">▼</span>
        </Button>
        <Overlay
          target={examRef.current}
          show={activeDropdown === "exam"}
          placement="bottom-start"
          rootClose
          onHide={() => setActiveDropdown(null)}
        >
          <Popover style={{ minWidth: "200px" }}>
            <Popover.Body>
              {filterOptions.exam.map((option) => (
                <div
                  key={option}
                  className="py-1 px-2 hover-bg-light"
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedFilters.exam === option
                        ? "#f8f9fa"
                        : "transparent",
                  }}
                  onClick={() => handleSingleFilterSelect("exam", option)}
                >
                  {option}
                  {selectedFilters.exam === option && (
                    <span className="float-end text-primary">✓</span>
                  )}
                </div>
              ))}
            </Popover.Body>
          </Popover>
        </Overlay>
      </div>

      {/* Course Duration Filter */}
      <div className="position-relative">
        <Button
          ref={durationRef}
          variant="outline-secondary"
          className="rounded-pill d-flex align-items-center"
          style={{ fontSize: "14px", fontWeight: "normal" }}
          onClick={() =>
            setActiveDropdown(activeDropdown === "duration" ? null : "duration")
          }
        >
          Course Duration <span className="ms-2">▼</span>
        </Button>
        <Overlay
          target={durationRef.current}
          show={activeDropdown === "duration"}
          placement="bottom-start"
          rootClose
          onHide={() => setActiveDropdown(null)}
        >
          <Popover style={{ minWidth: "200px" }}>
            <Popover.Body>
              {filterOptions.duration.map((option) => (
                <div
                  key={option}
                  className="py-1 px-2 hover-bg-light"
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedFilters.duration === option
                        ? "#f8f9fa"
                        : "transparent",
                  }}
                  onClick={() => handleSingleFilterSelect("duration", option)}
                >
                  {option}
                  {selectedFilters.duration === option && (
                    <span className="float-end text-primary">✓</span>
                  )}
                </div>
              ))}
            </Popover.Body>
          </Popover>
        </Overlay>
      </div>

      {/* Search Button with Loading State */}
      <Button
        variant="primary"
        className="rounded-pill"
        onClick={applyFilters}
        disabled={isLoading}
      >
        {isLoading ? (
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
      {isLoading ? (
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
          <Card
            key={university.id}
            className="mb-4 country-wise-uni-card overflow-hidden"
          >
            <Row className="g-0">
              <Col md={4}>
                <img
                  src={university.image}
                  alt={university.name}
                  className="img-fluid h-100 w-100 object-fit-cover "
                  // style={{ maxHeight: "200px" }}
                />
              </Col>
              <Col md={6}>
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <Card.Title as="h4">{university.name}</Card.Title>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <FaMapMarkerAlt className="text-secondary me-2" />
                    <span className="text-secondary me-4">
                      {university.location}
                    </span>

                    <Badge className=" display-badge-default-pill me-3">
                      {university.type}
                    </Badge>

                    <div className="d-flex align-items-center display-badge-default-pill">
                      <div
                        className="bg-success rounded-circle p-1 me-1"
                        style={{ width: "10px", height: "10px" }}
                      ></div>
                      <span className="me-1">QS Rank:</span>
                      <span>{university.ranking}</span>
                    </div>
                  </div>

                  <Row className="mt-4">
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
              <Col
                md={2}
                className="d-flex justify-content-center align-items-start gap-2 flex-column"
              >
                <Button variant="primary">Check Eligibility</Button>
                <Button variant="secondary-outline">Download Brochure</Button>
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
