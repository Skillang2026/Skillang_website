// components/CountryPage.js
"use client";

import React, { useEffect } from "react";
import { useCountryData } from "@/hooks/useCountryData";
// import CountryWiseHeaderComp from "../sections/main/study-abroad-country-wise/header";
import StudyAbroadCountryOverview from "@/sections/main/study-abroad-country-wise/overview/overview";
import NavSecondary from "@/sections/main/study-abroad-country-wise/nav/nav-secondary";
import EducationAbroadCountry from "@/sections/main/study-abroad-country-wise/education/education";
import AdmissionAbroadCountry from "@/sections/main/study-abroad-country-wise/admission/admission";
import ScholarshipWithModal from "@/sections/main/study-abroad-country-wise/scholarship/scholarship";
import WorkOppsAbroadComp from "@/sections/main/study-abroad-country-wise/work-opportunity-broad/workOppsAbroad";
import CountryWiseHeaderComp from "@/sections/main/study-abroad-country-wise/header";

const CountryPage = ({ country = "uk" }) => {
  const { countryData, loading, error, fetchCountryData } = useCountryData();

  useEffect(() => {
    fetchCountryData(country);
  }, [country, fetchCountryData]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Country Data</h4>
          <p>{error}</p>
          <button
            className="btn btn-outline-danger"
            onClick={() => fetchCountryData(country)}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!countryData || !countryData[country]) {
    // console.log("No country data available:", {
    //   countryData,
    //   country,
    //   availableCountries: countryData ? Object.keys(countryData) : "None",
    // });

    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Country Not Found</h4>
          <p>The requested country data could not be found for: {country}</p>
          {countryData && (
            <p>
              <small>
                Available countries: {Object.keys(countryData).join(", ")}
              </small>
            </p>
          )}
          <button
            className="btn btn-outline-warning"
            onClick={() => fetchCountryData(country)}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // console.log("Rendering CountryPage with data for:", country);

  return (
    <div>
      <CountryWiseHeaderComp country={country} countryData={countryData} />
      <NavSecondary />
      <section id="overview" className="country-page-spacing">
        <StudyAbroadCountryOverview
          country={country}
          countryData={countryData}
        />
      </section>
      <section id="education" className="country-page-spacing">
        <EducationAbroadCountry country={country} countryData={countryData} />
      </section>
      <section id="admission-requirements" className="country-page-spacing">
        <AdmissionAbroadCountry country={country} countryData={countryData} />
      </section>
      <section id="available-scholarships" className="country-page-spacing">
        <ScholarshipWithModal country={country} countryData={countryData} />
      </section>
      <section id="work-opportunities" className="country-page-spacing">
        <WorkOppsAbroadComp country={country} countryData={countryData} />
      </section>
    </div>
  );
};

export default CountryPage;
