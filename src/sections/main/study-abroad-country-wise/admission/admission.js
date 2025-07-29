import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdmiRequirementComp from "./admiReq";
import AdmiEntranceComp from "./admiEntrance";
import UniContactComp from "../../../resuable/uni-contact/UniContact";

const AdmissionAbroadCountry = ({ country = "uk", countryData }) => {
  // Debug logs following your pattern
  // console.log("AdmissionAbroadCountry component received:", {
  //   country,
  //   hasCountryData: !!countryData,
  //   countryDataKeys: countryData ? Object.keys(countryData) : "No data",
  // });

  // Safety check - if no countryData prop provided, show loading
  if (!countryData) {
    return (
      <section className="d-flex flex-column align-items-center justify-content-center">
        <Container>
          <Row>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "200px" }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">
                  Loading admission data...
                </span>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    );
  }

  // Safety check - if country data doesn't exist for this country
  if (!countryData[country]) {
    // console.log(
    //   `No admission data for country ${country}. Available:`,
    //   Object.keys(countryData)
    // );
    return (
      <section className="d-flex flex-column align-items-center justify-content-center">
        <Container>
          <Row>
            <Col>
              <div className="alert alert-warning m-3">
                <h4>Admission data not found</h4>
                <p>Could not find admission data for country: {country}</p>
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

  // Additional safety check for required fields
  if (!data.fullForm) {
    // console.log("AdmissionAbroadCountry: Missing fullForm field for", country);
    return (
      <section className="d-flex flex-column align-items-center justify-content-center">
        <Container>
          <Row>
            <Col>
              <div className="alert alert-warning m-3">
                <h4>Admission data incomplete</h4>
                <p>Missing country information for: {country}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  // console.log("AdmissionAbroadCountry: Using data successfully for", country);

  return (
    <section className="d-flex flex-column align-items-center justify-content-center">
      <Container>
        <Row>
          <Col>
            <h1 className="heading-big-medium mb-5">
              Admissions in {data.fullForm}
            </h1>
          </Col>
        </Row>
        <div className="country-subsection-spacing">
          <AdmiRequirementComp country={country} countryData={countryData} />
        </div>
        <div className="country-subsection-spacing">
          <AdmiEntranceComp country={country} countryData={countryData} />
        </div>
        <UniContactComp
          heading="Speak Confidently, Succeed Globally!"
          description="Master German & English | 🎯 Ace IELTS & More | 🚀 Book a Free Demo Today!"
          buttonText="Connect with Us"
          // onButtonClick={() => console.log("Connect button clicked")}
        />
      </Container>
    </section>
  );
};

export default AdmissionAbroadCountry;
