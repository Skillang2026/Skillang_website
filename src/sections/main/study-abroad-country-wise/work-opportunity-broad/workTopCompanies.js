"use client";

import React, { useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";

const WorkTopCompanies = ({ country = "uk", countryData }) => {
  const [showAll, setShowAll] = useState(false);

  // Safety check - if no countryData prop provided
  if (!countryData) {
    return (
      <div className="d-none d-md-block">
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading companies daata...</span>
          </div>
        </div>
      </div>
    );
  }

  // Safety check - if country data doesn't exist
  if (!countryData[country]) {
    // console.log(
    //   `No companies data for country ${country}. Available:`,
    //   Object.keys(countryData)
    // );
    return (
      <div className="d-none d-md-block">
        <div className="alert alert-warning">
          Companies data not available for {country}
        </div>
      </div>
    );
  }

  const data = countryData[country];

  // Safety check for workAbroadOpps structure
  if (!data.workAbroadOpps || !data.workAbroadOpps.topCompaniesData) {
    // console.log(
    //   "WorkTopCompanies: Missing workAbroadOpps or topCompaniesData for",
    //   country
    // );
    // console.log("Available data fields:", Object.keys(data));
    return (
      <div className="d-none d-md-block">
        <div className="alert alert-info">
          Top Companies data not available for {data.fullForm || country}
        </div>
      </div>
    );
  }

  const companiesData = data.workAbroadOpps.topCompaniesData;

  // Safety check to ensure it's an array
  if (!Array.isArray(companiesData)) {
    // console.log(
    //   "WorkTopCompanies: topCompaniesData is not an array:",
    //   companiesData
    // );
    return (
      <div className="d-none d-md-block">
        <div className="alert alert-warning">Invalid companies data format</div>
      </div>
    );
  }

  // Safety check for empty array
  if (companiesData.length === 0) {
    return (
      <div className="d-none d-md-block">
        <div className="alert alert-info">
          No companies data available for {data.fullForm || country}
        </div>
      </div>
    );
  }

  // console.log(
  //   "WorkTopCompanies: Using companies data successfully for",
  //   country
  // );
  // console.log("Companies data structure:", companiesData[0]);

  const displayedCompanies = showAll
    ? companiesData
    : companiesData.slice(0, 3);

  return (
    <div className="d-none d-md-block">
      <div className="mb-4 subheading-big-medium">
        Top Companies in the {data.fullForm || country.toUpperCase()}
      </div>

      <div className="table-responsive">
        <table className="edu-ranking-table caption-bold text-content-secondary">
          <thead className="bg-light">
            <tr>
              <th className="py-3 px-4" style={{ width: "20%" }}>
                City/County
              </th>
              <th className="py-3 px-4" style={{ width: "30%" }}>
                Industry
              </th>
              <th className="py-3 px-4" style={{ width: "50%" }}>
                Top Companies Nearby
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedCompanies.map((cityData) => {
              // Safety check for cityData structure
              if (!cityData.industries || !Array.isArray(cityData.industries)) {
                console.warn("Invalid cityData structure:", cityData);
                return null;
              }

              return cityData.industries.map((industry, industryIndex) => (
                <tr key={`${cityData.id}-${industryIndex}`}>
                  {industryIndex === 0 ? (
                    <td
                      className="py-3 px-4 align-middle"
                      rowSpan={cityData.industries.length}
                    >
                      <strong>{cityData.city}</strong>
                    </td>
                  ) : null}
                  <td className="py-3 px-4 text-muted">{industry.name}</td>
                  <td className="py-3 px-4">{industry.companies}</td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>

      {companiesData.length > 3 && (
        <div className="text-center mt-3">
          <button
            className="btn-secondary-outline d-flex align-items-center mx-auto"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                Close all <ChevronUp className="ms-2" />
              </>
            ) : (
              <>
                View all <ChevronDown className="ms-2" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkTopCompanies;
