"use client";

import React, { useState, useEffect, useRef } from "react";
import useCountryData from "@/hooks/useCountryData";
import "./partner_uni.css";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

const partner = "/assets/images/reusable/partnereduni.png";

const PartneredUni = () => {
  // Reference for the tab container for scrolling
  const tabContainerRef = useRef(null);

  // Use the country data hook
  const {
    universitiesData,
    allCountries,
    loading: dataLoading,
    error: dataError,
    fetchMultipleCountriesUniversities,
    fetchAllCountries,
  } = useCountryData();

  // State for managing tab data
  const [tabs, setTabs] = useState([]);

  // Store university logos per tab
  const [tabData, setTabData] = useState({});

  // State to track active tab
  const [activeTab, setActiveTab] = useState("All");

  // Loading state
  const [loading, setLoading] = useState(true);

  // Initial data loading state
  const [initialLoading, setInitialLoading] = useState(true);

  // Error state
  const [error, setError] = useState(null);

  // Pagination state - one object per tab to maintain pagination state when switching tabs
  const [paginationState, setPaginationState] = useState({});

  // Responsive logos per page based on screen size
  const [logosPerPage, setLogosPerPage] = useState(21);

  // Countries to fetch data for - will be populated from API
  const [countriesToFetch, setCountriesToFetch] = useState([]);

  // Update logos per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      // If mobile (less than 768px) show 9 logos per page (3x3)
      if (window.innerWidth < 768) {
        setLogosPerPage(9);
      } else {
        // Desktop shows 21 logos (7x3)
        setLogosPerPage(21);
      }
    };

    // Set initial value
    handleResize();

    // Listen for window resize
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to fetch and process university data from CMS
  const fetchAllUniversityData = async () => {
    try {
      setInitialLoading(true);
      setError(null);

      // First fetch all available countries
      await fetchAllCountries();
    } catch (err) {
      console.error("Error fetching university data:", err);
      setError("Data not available");
    } finally {
      setInitialLoading(false);
      setLoading(false);
    }
  };

  // Effect to load initial data
  useEffect(() => {
    fetchAllUniversityData();
  }, []);
  useEffect(() => {
    if (universitiesData && Object.keys(universitiesData).length > 0) {
      try {
        // Group universities by country and extract logos
        const groupedByCountry = {};
        const allLogos = [];

        Object.entries(universitiesData).forEach(
          ([countrySlug, countryData]) => {
            if (countryData.education?.partnerUniversities) {
              const countryLogos = countryData.education.partnerUniversities
                .filter((uni) => uni.collegeLogo) // Only universities with logos
                .map((uni) => ({
                  id: uni.id,
                  logo: uni.collegeLogo,
                  name: uni.name,
                  alternativeText: `${uni.name} logo`,
                }));

              if (countryLogos.length > 0) {
                // Use the slug directly as display name
                const displayName = countrySlug;
                groupedByCountry[displayName] = countryLogos;
                allLogos.push(...countryLogos);
              }
            }
          }
        );

        // Create "All" tab data
        const completeTabData = {
          All: allLogos,
          ...groupedByCountry,
        };

        // Create tabs array with counts
        const countries = Object.keys(groupedByCountry);
        const tabsArray = [
          { name: "All", count: allLogos.length },
          ...countries.map((country) => ({
            name: country,
            count: groupedByCountry[country].length,
          })),
        ];

        // Initialize pagination state for all tabs
        const initialPaginationState = {};
        tabsArray.forEach((tab) => {
          initialPaginationState[tab.name] = { currentPage: 1 };
        });

        // Update state
        setTabs(tabsArray);
        setTabData(completeTabData);
        setPaginationState(initialPaginationState);

        // Set first tab as active if not already set
        if (tabsArray.length > 0 && !activeTab) {
          setActiveTab("All");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error processing university data:", err);
        setError("Failed to process university data");
        setLoading(false);
      }
    }
  }, [universitiesData]);

  // Effect to fetch countries when allCountries changes
  useEffect(() => {
    if (allCountries && allCountries.length > 0) {
      // Extract slugs from available countries
      const availableSlugs = allCountries
        .map((country) => country.slug)
        .filter(Boolean);
      setCountriesToFetch(availableSlugs);

      // Now fetch university data for these countries
      if (availableSlugs.length > 0) {
        fetchMultipleCountriesUniversities(availableSlugs);
      }
    }
  }, [allCountries, fetchMultipleCountriesUniversities]);

  // Function to handle tab change and scroll into view
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);

    // Find the index of the clicked tab
    const tabIndex = tabs.findIndex((tab) => tab.name === tabName);

    // Scroll the tab into view on mobile
    if (window.innerWidth < 768 && tabContainerRef.current) {
      const tabButtons =
        tabContainerRef.current.querySelectorAll(".tab-button");
      if (tabButtons[tabIndex]) {
        // Calculate position to center the tab
        const containerWidth = tabContainerRef.current.offsetWidth;
        const tabWidth = tabButtons[tabIndex].offsetWidth;
        const tabLeft = tabButtons[tabIndex].offsetLeft;

        // Smooth scroll to position
        tabContainerRef.current.scrollTo({
          left: tabLeft - containerWidth / 2 + tabWidth / 2,
          behavior: "smooth",
        });
      }
    }
  };

  // Get current logos for the active tab
  const currentTabLogos = tabData[activeTab] || [];

  // Get current page of logos
  const currentPage = paginationState[activeTab]?.currentPage || 1;
  const indexOfLastLogo = currentPage * logosPerPage;
  const indexOfFirstLogo = indexOfLastLogo - logosPerPage;
  const currentLogos = currentTabLogos.slice(indexOfFirstLogo, indexOfLastLogo);

  // Pagination controls
  const totalPages = Math.ceil(currentTabLogos.length / logosPerPage);

  const nextPage = (e) => {
    e.preventDefault(); // Prevent default to avoid page reload

    if (currentPage < totalPages) {
      setPaginationState((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          currentPage: currentPage + 1,
        },
      }));
    }
  };

  const prevPage = (e) => {
    e.preventDefault(); // Prevent default to avoid page reload

    if (currentPage > 1) {
      setPaginationState((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          currentPage: currentPage - 1,
        },
      }));
    }
  };

  // Create responsive grid based on screen size
  const renderLogoGrid = () => {
    // If no logos to display
    if (currentLogos.length === 0) {
      return (
        <div className="university-logo-grid">
          <div className="col-12 text-center py-5">
            <p className="text-muted">
              {error || dataError
                ? "Data not available"
                : activeTab === "All"
                ? "No university partners available"
                : `No universities found for ${activeTab}`}
            </p>
            {(error || dataError) && (
              <button
                className="btn btn-primary mt-2"
                onClick={fetchAllUniversityData}
              >
                Retry
              </button>
            )}
          </div>
        </div>
      );
    }

    // Create grid items based on responsive layout
    return (
      <div className="university-logo-grid">
        {currentLogos.map((logo, index) => (
          <div key={logo.id || `logo-${index}`} className="logo-cell">
            <div className="logo-container">
              <img
                src={logo.logo}
                alt={logo.alternativeText || "University logo"}
                className="img-fluid"
                onError={(e) => {
                  // Fallback to default image if logo fails to load
                  e.target.src = partner;
                }}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render initial loading state
  if (initialLoading || dataLoading) {
    return (
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "white" }}
      >
        <div className="container text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">
              Loading university partners...
            </span>
          </div>
          <p className="mt-2 text-muted">Loading university partners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-4">
          <div className="heading-big-medium">Our University Partners</div>
          <div className="subheading-small-regular text-content-secondary">
            Collaborating with Top Institutions to Bring You World-Class
            Education Opportunities.
          </div>
        </div>

        {/* Error Alert */}
        {(error || dataError) && (
          <div className="alert alert-warning text-center mb-4" role="alert">
            <small>{error || dataError}</small>
          </div>
        )}

        {/* Navigation Tabs - Scrollable on both mobile and desktop */}
        <div className="tab-nav-container" ref={tabContainerRef}>
          <div className="d-flex justify-content-start position-relative">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className="btn mx-1 mb-0 border-0 tab-button"
                onClick={() => handleTabChange(tab.name)}
                style={{
                  borderRadius: 0,
                  color: activeTab === tab.name ? "#ff5d32" : "#6c757d",
                  fontWeight: activeTab === tab.name ? "bold" : "normal",
                  padding: "0.5rem 0.25rem",
                  position: "relative",
                }}
              >
                {tab.name} {tab.count > 0 ? `(${tab.count})` : ""}
                {activeTab === tab.name && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: "0",
                      width: "100%",
                      height: "3px",
                      backgroundColor: "#ff5d32",
                      borderRadius: "2px",
                      zIndex: 2,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* University Logos Grid */}
        {renderLogoGrid()}

        {/* Pagination Controls - Only show if there's more than one page */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <button
              className="pagination-button"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </button>
            <button
              className="pagination-button"
              onClick={nextPage}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartneredUni;
