// sections/main/study-abroad-country-wise/header/index.js
import React from "react";
import ImageHeaderComponent from "../../../components/common-headers/ImageMainHeader";

const CountryWiseHeaderComp = ({ country, countryData }) => {
  // Debug logs
  // console.log("Header component received:", {
  //   country,
  //   hasCountryData: !!countryData,
  //   countryDataKeys: countryData ? Object.keys(countryData) : "No data",
  // });

  // Safety check - if no countryData prop provided, show loading
  if (!countryData) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading header...</span>
        </div>
      </div>
    );
  }

  // Safety check - if country data doesn't exist for this country
  if (!countryData[country]) {
    // console.log(
    //   `No data for country ${country}. Available:`,
    //   Object.keys(countryData)
    // );
    return (
      <div className="alert alert-warning m-3">
        <h4>Country data not found</h4>
        <p>Could not find data for country: {country}</p>
        <p>Available: {Object.keys(countryData).join(", ")}</p>
      </div>
    );
  }

  // Get the data for this specific country
  const data = countryData[country];

  // Additional safety check for required fields
  if (!data.title || !data.description) {
    // console.log("Header: Missing required fields:", data);
    return (
      <div className="alert alert-warning m-3">
        <h4>Incomplete country data</h4>
        <p>Missing required fields for: {country}</p>
      </div>
    );
  }

  // console.log("Header: Using data successfully for", country);

  return (
    <ImageHeaderComponent
      className=""
      imageSrc={data.headerImage || "/default-header-image.jpg"}
      imageAlt={`country-wise-header-${country}`}
      title={data.title}
      subheading={data.description}
      buttonText="Talk to an Expert"
    />
  );
};

export default CountryWiseHeaderComp;
