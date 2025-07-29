"use client";

import React, { useState, useEffect, useRef } from "react";
import "./partner_uni.css";
const partner = "/assets/images/reusable/partnereduni.png";

const PartneredUni = () => {
  // Reference for the tab container for scrolling
  const tabContainerRef = useRef(null);

  // State for managing tab data - will be populated from Strapi
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

  // Strapi configuration
  const STRAPI_URL = "https://cms.skillang.com";

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

  // Function to fetch all university data from Strapi on initial load
  const fetchAllUniversityData = async () => {
    try {
      setInitialLoading(true);
      setError(null);

      // console.log("🚀 Starting to fetch data from Strapi...");
      // console.log("📍 Strapi URL:", STRAPI_URL);

      // Fetch all files from Strapi media library
      const response = await fetch(
        `${STRAPI_URL}/api/upload/files?pagination[pageSize]=1000`
      );

      // console.log("📡 Response status:", response.status);
      // console.log("📡 Response ok:", response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("📦 Total files received from Strapi:", data.length);
      // console.log("📦 Sample of first 3 files:", data.slice(0, 3));

      // Let's see what the file structure looks like
      data.forEach((file, index) => {
        if (index < 5) {
          // Log first 5 files for inspection
          // console.log(`File ${index + 1}:`, {
          //   id: file.id,
          //   name: file.name,
          //   folderPath: file.folderPath,
          //   folder: file.folder, // Alternative property
          //   path: file.path, // Alternative property
          //   url: file.url,
          //   alternativeText: file.alternativeText,
          //   // Let's see all properties
          //   allProperties: Object.keys(file),
          // });
        }
      });

      // Filter files that are in university-partners folder
      // First, let's try folderPath
      let universityFiles = data.filter(
        (file) =>
          file.folderPath && file.folderPath.includes("university-partners")
      );

      // If no files found with folderPath, try alternative approaches
      if (universityFiles.length === 0) {
        // console.log(
        //   "⚠️ No files found with folderPath, trying alternative approaches..."
        // );

        // Try filtering by file name patterns (e.g., files starting with university or partner)
        universityFiles = data.filter(
          (file) =>
            file.name &&
            (file.name.toLowerCase().includes("uni") ||
              file.name.toLowerCase().includes("partner") ||
              file.name.toLowerCase().includes("college") ||
              file.name.toLowerCase().includes("university"))
        );
        // console.log("🔍 Files found by name pattern:", universityFiles.length);

        // If still no files, let's check if there's a folder property
        if (universityFiles.length === 0) {
          universityFiles = data.filter(
            (file) =>
              file.folder &&
              (file.folder.name === "university-partners" ||
                file.folder.path === "university-partners")
          );
          // console.log(
          //   "🔍 Files found by folder property:",
          //   universityFiles.length
          // );
        }

        // Last resort: check all university-related files regardless of folder
        if (universityFiles.length === 0) {
          // console.log(
          //   '🔍 All available files with "uni" or "partner" in name:'
          // );
          data.forEach((file, index) => {
            if (
              file.name &&
              (file.name.toLowerCase().includes("uni") ||
                file.name.toLowerCase().includes("partner"))
            ) {
              // console.log(`Match ${index + 1}:`, file.name, file);
              universityFiles.push(file);
            }
          });
        }
      }

      // console.log(
      //   "🎓 Files in university-partners folder:",
      //   universityFiles.length
      // );
      // console.log("🎓 University files details:", universityFiles);

      // Group files by country (folder name)
      const groupedByCountry = universityFiles.reduce((acc, file) => {
        // console.log(
        //   "🔍 Processing file:",
        //   file.name,
        //   "with folderPath:",
        //   file.folderPath
        // );

        let country = null;

        // Method 1: Extract from folderPath
        if (file.folderPath) {
          const pathParts = file.folderPath
            .split("/")
            .filter((part) => part.length > 0);
          // console.log("📂 Path parts:", pathParts);

          const countryIndex = pathParts.indexOf("university-partners") + 1;
          // console.log("🌍 Country index:", countryIndex);

          country = pathParts[countryIndex];
          // console.log("🌍 Extracted country from folderPath:", country);
        }

        // Method 2: Extract from folder object
        if (!country && file.folder) {
          if (file.folder.name && file.folder.name !== "university-partners") {
            country = file.folder.name;
            // console.log("🌍 Extracted country from folder.name:", country);
          } else if (file.folder.parent && file.folder.parent.name) {
            country = file.folder.parent.name;
            // console.log(
            //   "🌍 Extracted country from folder.parent.name:",
            //   country
            // );
          }
        }

        // Method 3: Extract from file name pattern (fallback)
        if (!country) {
          const fileName = file.name.toLowerCase();

          // Look for country patterns in filename
          const countryPatterns = {
            usa: "USA",
            us: "USA",
            uk: "UK",
            canada: "Canada",
            australia: "Australia",
            newzealand: "NewZealand",
            nz: "NewZealand",
            singapore: "Singapore",
            germany: "Germany",
            switzerland: "Switzerland",
            ireland: "Ireland",
            france: "France",
          };

          for (const [pattern, countryName] of Object.entries(
            countryPatterns
          )) {
            if (fileName.includes(pattern)) {
              country = countryName;
              // console.log(
              //   "🌍 Extracted country from filename pattern:",
              //   country
              // );
              break;
            }
          }
        }

        // Method 4: Default fallback - assign to "International" or based on file position
        if (!country) {
          country = "International";
          // console.log("🌍 Using fallback country:", country);
        }

        if (country) {
          // Clean up country name (remove spaces, handle special cases)
          const originalCountry = country;
          country = country.replace(/\s+/g, ""); // Remove spaces
          // console.log(
          //   "🧹 Cleaned country name:",
          //   originalCountry,
          //   "→",
          //   country
          // );

          // Map folder names to display names if needed
          const countryMapping = {
            NewZealand: "NewZealand",
            UnitedStates: "USA",
            UnitedKingdom: "UK",
            US: "USA",
            International: "International",
          };

          const displayCountry = countryMapping[country] || country;
          // console.log("🏷️ Final display country:", displayCountry);

          if (!acc[displayCountry]) {
            acc[displayCountry] = [];
            // console.log("✨ Created new country group:", displayCountry);
          }

          acc[displayCountry].push({
            id: file.id,
            logo: `${STRAPI_URL}${file.url}`,
            name: file.name,
            alternativeText: file.alternativeText || "University logo",
            caption: file.caption,
          });

          // console.log(
          //   "➕ Added file to",
          //   displayCountry,
          //   "Total in group:",
          //   acc[displayCountry].length
          // );
        } else {
          // console.log("⚠️ No country found for file:", file.name);
        }

        return acc;
      }, {});

      // console.log("🗂️ Final grouped data:", groupedByCountry);
      // console.log("🗂️ Countries found:", Object.keys(groupedByCountry));

      // Create "All" tab data
      const allUniversities = Object.values(groupedByCountry).flat();
      // console.log("🌐 All universities count:", allUniversities.length);

      const completeTabData = {
        All: allUniversities,
        ...groupedByCountry,
      };
      // console.log("📊 Complete tab data:", completeTabData);

      // Create tabs array with counts
      const countries = Object.keys(groupedByCountry);
      // console.log("🏁 Countries for tabs:", countries);

      const tabsArray = [
        { name: "All", count: allUniversities.length },
        ...countries.map((country) => ({
          name: country,
          count: groupedByCountry[country].length,
        })),
      ];
      // console.log("📋 Final tabs array:", tabsArray);

      // Initialize pagination state for all tabs
      const initialPaginationState = {};
      tabsArray.forEach((tab) => {
        initialPaginationState[tab.name] = { currentPage: 1 };
      });
      // console.log("📄 Pagination state initialized:", initialPaginationState);

      // Update state
      setTabs(tabsArray);
      setTabData(completeTabData);
      setPaginationState(initialPaginationState);

      // console.log("✅ State updated successfully");
      // console.log("✅ Active tab will be set to:", activeTab || "All");

      // Set first tab as active if not already set
      if (tabsArray.length > 0 && !activeTab) {
        setActiveTab("All");
        // console.log('✅ Active tab set to "All"');
      }
    } catch (err) {
      console.error("❌ Error fetching university data:", err);
      console.error("❌ Error details:", {
        message: err.message,
        name: err.name,
        stack: err.stack,
      });

      setError("Failed to load university partners. Please try again later.");

      // Fallback to dummy data if API fails
      // console.log("🔄 Falling back to dummy data...");
      const fallbackTabs = [
        { name: "All", count: 0 },
        { name: "USA", count: 0 },
        { name: "UK", count: 0 },
        { name: "Canada", count: 0 },
        { name: "Australia", count: 0 },
        { name: "Ireland", count: 0 },
        { name: "NewZealand", count: 0 },
        { name: "Singapore", count: 0 },
        { name: "Switzerland", count: 0 },
        { name: "Asia", count: 0 },
        { name: "Europe", count: 0 },
      ];

      setTabs(fallbackTabs);
      setTabData({ All: [] });

      const fallbackPaginationState = {};
      fallbackTabs.forEach((tab) => {
        fallbackPaginationState[tab.name] = { currentPage: 1 };
      });
      setPaginationState(fallbackPaginationState);
    } finally {
      // console.log("🏁 Fetch process completed");
      setInitialLoading(false);
      setLoading(false);
    }
  };

  // Effect to load initial data
  useEffect(() => {
    fetchAllUniversityData();
  }, []);

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
  // console.log("🎯 Current tab:", activeTab);
  // console.log("🎯 Current tab logos:", currentTabLogos);
  // console.log("🎯 Current tab logos count:", currentTabLogos.length);

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
              {error
                ? "Unable to load university partners"
                : activeTab === "All"
                ? "No university partners available"
                : `No universities found for ${activeTab}`}
            </p>
            {error && (
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
              {logo.caption && (
                <div className="logo-caption">
                  <small>{logo.caption}</small>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render initial loading state
  if (initialLoading) {
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
        {error && (
          <div className="alert alert-warning text-center mb-4" role="alert">
            <small>{error}</small>
          </div>
        )}

        {/* Debug Panel - Remove this in production */}
        {process.env.NODE_ENV === "development" && (
          <div className="alert alert-info mb-4" role="alert">
            <h6>🐛 Debug Info:</h6>
            <small>
              <strong>Tabs:</strong> {JSON.stringify(tabs)}
              <br />
              <strong>Active Tab:</strong> {activeTab}
              <br />
              <strong>Tab Data Keys:</strong> {Object.keys(tabData).join(", ")}
              <br />
              <strong>Current Tab Logos:</strong> {currentTabLogos.length}
              <br />
              <strong>Strapi URL:</strong> {STRAPI_URL}
            </small>
          </div>
        )}

        {/* Navigation Tabs - Scrollable on mobile */}
        <div className="tab-nav-container" ref={tabContainerRef}>
          <div className="d-flex justify-content-start justify-content-md-center position-relative">
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
              <span>&lt;</span>
            </button>
            <button
              className="pagination-button"
              onClick={nextPage}
              disabled={currentPage >= totalPages}
            >
              <span>&gt;</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartneredUni;
