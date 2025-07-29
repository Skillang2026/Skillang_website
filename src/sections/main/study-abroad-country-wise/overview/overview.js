import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from "react-bootstrap";
import "./overview.css";

const StudyAbroadCountryOverview = ({ country = "uk", countryData }) => {
  const data = countryData[country];
  if (!data || !data.overview) {
    return <div>Country Overview data not available</div>;
  }

  const { overview } = data;

  // Split the reasons into chunks for display in columns
  const leftReasons = overview.reasons.slice(
    0,
    Math.ceil(overview.reasons.length / 2)
  );
  const rightReasons = overview.reasons.slice(
    Math.ceil(overview.reasons.length / 2)
  );

  return (
    <section className="d-flex flex-column align-items-center justify-content-center z-4">
      <Container>
        <Row className="mb-4">
          <Col>
            <div className="heading-big-medium">Overview</div>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <Row className="mb-4">
              <div className="subheading-big-medium">
                Why Study in {data.fullForm}?
              </div>
            </Row>
            <div className="mb-4 text-content-tertiary">
              {overview.description}
            </div>

            <div className="mb-3 text-content-tertiary">
              Here are some compelling reasons to consider the {data.shortForm}{" "}
              as your study abroad destination:
            </div>

            <Row>
              <Col lg={6}>
                <ul className="ps-3">
                  {leftReasons.map((reason, index) => (
                    <li key={index} className="mb-2 text-content-tertiary">
                      {reason}
                    </li>
                  ))}
                </ul>
              </Col>

              <Col lg={6}>
                <ul className="ps-3">
                  {rightReasons.map((reason, index) => (
                    <li key={index} className="mb-2 text-content-tertiary">
                      {reason}
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Col>

          <Col lg={6} className="">
            <Card className="facts-card">
              <CardHeader className="bg-white border-0">
                <div className="text-center subheading-big-medium text-content-secondary">
                  Quick Facts
                </div>
              </CardHeader>
              <CardBody className="w-100">
                <Row className="g-2">
                  {overview.facts.map((fact, index) => (
                    <Col md={6} sm={6} xs={6} key={index} className="p-0">
                      <div className="fact-indi-card h-100">
                        <div className="fact-icon-container">
                          <img
                            src={fact.icon}
                            alt={fact.label}
                            className="fact-icon"
                          />
                        </div>
                        <div className="fact-content">
                          <div className="caption-bold text-content-tertiary mb-1 fact-label">
                            {fact.label}
                          </div>
                          <div className="subheading-small-medium text-content-secondary fact-value">
                            {fact.hasSplit ? (
                              <>
                                {fact.value.split(fact.splitChar)[0]}
                                <span className="caption-bold text-content-tertiary">
                                  {fact.splitChar === "/" ? "/" : "("}
                                  {fact.value.split(fact.splitChar)[1]}
                                </span>
                              </>
                            ) : (
                              fact.value
                            )}
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default StudyAbroadCountryOverview;
