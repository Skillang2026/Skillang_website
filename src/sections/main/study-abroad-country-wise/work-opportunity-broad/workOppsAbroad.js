import React from "react";
import { Container, Row } from "react-bootstrap";
import WorkVisaRoute from "./workVisaRoute";
import WorkTopCompanies from "./workTopCompanies";
import UniContactComp from "../../../resuable/uni-contact/UniContact";

const WorkOppsAbroadComp = ({ country = "uk", countryData }) => {
  return (
    <section className="d-flex flex-column align-items-center justify-content-center ">
      <Container>
        <Row>
          <div className="heading-big-medium">Work Abroad Opportunity</div>
        </Row>
        <div className="country-subsection-spacing ">
          <WorkVisaRoute country={country} countryData={countryData} />
        </div>

        <div className="country-subsection-spacing">
          <UniContactComp
            heading="Get a Two-Year Post Work Visa"
            description="Explore your opportunities to work abroad after graduation."
            buttonText="Connect with Us"
            // onButtonClick={() => console.log("Connect button clicked")}
          />
        </div>
        <div className="country-subsection-spacin">
          <WorkTopCompanies country={country} countryData={countryData} />
        </div>
      </Container>
    </section>
  );
};

export default WorkOppsAbroadComp;
