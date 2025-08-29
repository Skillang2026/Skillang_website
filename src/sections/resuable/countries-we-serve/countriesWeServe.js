import React from "react";
import {
  Container,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Row,
} from "react-bootstrap";
import "./countriesWeServe.css";

const australiaImage =
  "/assets/images/work-abroad/australia-abroad-consultants.png";
const canadaImage = "/assets/images/work-abroad/canada-abroad-consultants.png";
const franceImage = "/assets/images/work-abroad/france-abroad-consultants.png";
const germanyImage =
  "/assets/images/work-abroad/germany-job-abroad-consultants.png";
const irelandImage =
  "/assets/images/work-abroad/ireland-abroad-consultants.png";
const ukImage = "/assets/images/work-abroad/uk-job-abroad-consultants.png";
const usaImage = "/assets/images/work-abroad/usa-abroad-consultants.png";

const countries = [
  {
    name: "Germany",
    description:
      "A thriving economy with jobs in Nursing, IT, and Engineering. Enjoy a balanced work-life and competitive pay.",
    image: germanyImage,
    imgAlt: "Germany Job Abroad Consultants",
  },
  {
    name: "United Kingdom",
    description:
      "A global leader in healthcare, finance, and tech, offering competitive salaries and access to top-notch education.",
    image: ukImage,
    imgAlt: "Uk Job Abroad Consultants",
  },
  {
    name: "United States of America",
    description:
      "A land of opportunity with high-paying jobs in healthcare, IT, and business, known for innovation and career growth.",
    image: usaImage,
    imgAlt: "USA Job Abroad Consultants",
  },
  {
    name: "Australia",
    description:
      "A robust economy with jobs in healthcare, IT, and engineering, offering high wages and solid worker protections.",
    image: australiaImage,
    imgAlt: "Australia Job Abroad Consultants",
  },
  {
    name: "Canada",
    description:
      "A diverse job market in nursing, IT, and trades, offering high salaries and a welcoming environment.",
    image: canadaImage,
    imgAlt: "Canada Job Abroad Consultants",
  },
  {
    name: "Ireland",
    description:
      "A booming economy with demand in healthcare, pharma, and tech, featuring high wages and a friendly culture.",
    image: irelandImage,
    imgAlt: "Ireland Job Abroad Consultants",
  },
  {
    name: "France",
    description:
      "A hub for healthcare, hospitality, and tech, known for its rich culture and excellent work-life balance.",
    image: franceImage,
    imgAlt: "France Job Abroad Consultants",
  },
];

const CountriesWeServe = () => {
  return (
    <Container className="">
      <Row className="d-flex flex-column align-items-center justify-content-center">
        <div className="text-center mb-4 demand-header-wrapper d-flex flex-column align-items-center justify-content-center">
          <div className="heading-big-medium text-content-primary ">
            Countries We Serve
          </div>
          <div className="paragraph-small-regular text-content-secondary text-center">
            Each destination offers unique opportunities and challenges. We
            provide tailored guidance on job markets, salary expectations,
            cultural norms, and legal requirements for working abroad.
          </div>
        </div>
      </Row>

      <div className="countrys-list">
        {countries.map((country, index) => (
          <Card key={index} className="countrys-card">
            <div className="country-image-container">
              <CardImg
                src={country.image}
                className="country-image"
                alt={`${country.imgAlt}`}
              />
            </div>
            <CardBody className="country-card-heading p-0 ps-md-3 d-flex flex-column align-items-start justify-content-center">
              <CardTitle className="subheading-small-medium text-content-primary mb-2">
                {country.name}
              </CardTitle>
              <CardText className="paragraph-small-regular text-content-secondary country-card-content m-0">
                {country.description}
              </CardText>
            </CardBody>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default CountriesWeServe;
