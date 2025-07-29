import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import EduRankingComp from "./eduRanking";
import EduOurPartnerUni from "./eduOurPartnerUni";
import UniContactComp from "../../../resuable/uni-contact/UniContact";
import EduTopProgramsComponent from "./eduTopPrograms";

const EducationAbroadCountry = ({ country = "uk", countryData }) => {
  // Debug logs to match your pattern
  // console.log("Education component received:", {
  //   country,
  //   hasCountryData: !!countryData,
  //   countryDataKeys: countryData ? Object.keys(countryData) : "No data",
  // });

  // Safety check - if no countryData prop provided, show loading
  if (!countryData) {
    return (
      <section className="d-flex flex-column align-items-center justify-content-center">
        <Container>
          <Row className="mb-4">
            <Col>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "200px" }}
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">
                    Loading education data...
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
    // console.log(
    //   `No education data for country ${country}. Available:`,
    //   Object.keys(countryData)
    // );
    return (
      <section className="d-flex flex-column align-items-center justify-content-center">
        <Container>
          <Row className="mb-4">
            <Col>
              <div className="alert alert-warning m-3">
                <h4>Education data not found</h4>
                <p>Could not find education data for country: {country}</p>
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

  // console.log("Education: Using data successfully for", country);

  return (
    <section className="d-flex flex-column align-items-center justify-content-center">
      <Container>
        <Row className="mb-4">
          <div className="heading-big-medium">Education</div>
        </Row>
        <div className="country-subsection-spacing">
          <EduRankingComp country={country} countryData={countryData} />
        </div>
        <div className="country-subsection-spacing">
          {/* Pass both country and countryData following your pattern */}
          <EduOurPartnerUni country={country} countryData={countryData} />
        </div>
        <div className="country-subsection-spacing">
          <UniContactComp
            heading="Find a University of Your Choice"
            description="Get in touch with our Program Advisors & get your queries clarified."
            buttonText="Connect with Us"
          />
        </div>
        <div className="country-subsection-spacing">
          <EduTopProgramsComponent
            country={country}
            countryData={countryData}
          />
        </div>
      </Container>
    </section>
  );
};

export default EducationAbroadCountry;
