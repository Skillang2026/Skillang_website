import React from "react";
import "./LandingCountryWeServe.css";
import { Container, Row, Col } from "react-bootstrap";
const ukFlag = "/assets/images/work-abroad/countryflags/uk.png";
const germanyFlag = "/assets/images/work-abroad/countryflags/germany.png";
const usaFlag = "/assets/images/work-abroad/countryflags/usa.png";
const australiaFlag = "/assets/images/work-abroad/countryflags/australia.png";
const canadaFlag = "/assets/images/work-abroad/countryflags/canada.png";
const irelandFlag = "/assets/images/work-abroad/countryflags/ireland.svg";
const franceFlag = "/assets/images/work-abroad/countryflags/france.svg";

const countryGuidance = [
  {
    country: "UK",
    details:
      "A global leader in healthcare, finance, and tech, offering competitive salaries and access to top-notch education",
    flag: ukFlag,
    id: "landing-card-1",
  },
  {
    country: "Germany",
    details:
      "A thriving economy with jobs in Nursing, IT, and Engineering. Enjoy a balanced work-life and competitive pay",
    flag: germanyFlag,
  },
  {
    country: "USA",
    details:
      "A land of opportunity with high-paying jobs in healthcare, IT, and business, known for innovation and career growth",
    flag: usaFlag,
  },
  {
    country: "Australia",
    details:
      "A robust economy with jobs in healthcare, IT, and engineering, offering high wages and solid worker protections",
    flag: australiaFlag,
  },
  {
    country: "Canada",
    details:
      "A diverse job market in nursing, IT, and trades, offering high salaries and a welcoming environment",
    flag: canadaFlag,
  },
  {
    country: "Ireland",
    details:
      "A booming economy with demand in healthcare, pharma, and tech, featuring high wages and a friendly culture",
    flag: irelandFlag,
  },
  {
    country: "France",
    details:
      "A hub for healthcare, hospitality, and tech, known for its rich culture and excellent work-life balance",
    flag: franceFlag,
  },
];

const LandingCountryWeServeComp = () => {
  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center flex-column">
        <Row className="d-flex justify-content-center align-items-center">
          <div className="header-wrapper text-center mb-5">
            <h1 className="heading-big-medium">Countries We Serve</h1>
            <p className="paragraph-big-medium text-content-secondary">
              Each destination offers unique opportunities and challenges. We
              provide tailored guidance on job markets, salary expectations,
              cultural norms, and legal requirements for working abroad.
            </p>
          </div>
        </Row>
        <Row className="d-flex justify-content-center align-items-center">
          {countryGuidance.map((country, index) => (
            <Col md={4} sm={12} xs={12} key={index} className="mb-lg-4">
              <div className="landing-country-card " id={country.id}>
                <div className="country-header">
                  <div className="country-name subheading-small-medium">
                    {country.country}
                  </div>
                  <img
                    src={country.flag}
                    alt={country.country}
                    className="country-flag"
                  />
                </div>
                <div className="country-text paragraph-small-regular">
                  {country.details}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default LandingCountryWeServeComp;
