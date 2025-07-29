"use client";

import React, { useState, useEffect } from "react";
import { Row, Col, Accordion } from "react-bootstrap";

const WorkVisaRoute = ({ country, countryData }) => {
  const data = countryData[country];
  const [activeKey, setActiveKey] = useState("0");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Breakpoint for mobile devices
    };

    // Set initial value after component mounts
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data || !data.workAbroadOpps || !data.workAbroadOpps.visaRoutes) {
    return <div>Work Visa Routes data not available</div>;
  }

  const visaRoutes = data.workAbroadOpps.visaRoutes;

  // Handle accordion toggle
  const handleAccordionToggle = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  // Table view for desktop
  const TableView = () => (
    <div className="table-responsive">
      <table className="edu-ranking-table caption-bold text-content-secondary">
        <thead className="bg-light">
          <tr>
            <th className="py-3 px-4" style={{ width: "30%" }}>
              Route
            </th>
            <th className="py-3 px-4" style={{ width: "70%" }}>
              Information & Requirements
            </th>
          </tr>
        </thead>
        <tbody>
          {visaRoutes.map((route) => (
            <tr key={route.id}>
              <td className="py-3 px-4">
                <div className="d-flex align-items-center">
                  <div
                    className="route-icon d-flex align-items-center justify-content-center rounded-circle me-3"
                    style={{
                      width: "35px",
                      height: "35px",
                      backgroundColor: "#EBF2FF",
                      color: "#1966FA",
                    }}
                  >
                    {route.icon}
                  </div>
                  <span>{route.route}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <ul className="list-unstyled mb-0">
                  {route.requirements.map((requirement, index) => (
                    <li key={index} className="mb-2">
                      <div className="d-flex">
                        <span className="me-2">•</span>
                        <span>{requirement}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Accordion view for mobile
  const AccordionView = () => (
    <Accordion defaultActiveKey="0" activeKey={activeKey} className="">
      {visaRoutes.map((route, index) => (
        <Accordion.Item key={index} eventKey={String(index)}>
          <Accordion.Header
            onClick={() => handleAccordionToggle(String(index))}
            className="d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center w-100">
              <div
                className="route-icon d-flex align-items-center justify-content-center rounded-circle me-3"
                style={{
                  width: "35px",
                  height: "35px",
                  backgroundColor: "#EBF2FF",
                  color: "#1966FA",
                }}
              >
                {route.icon}
              </div>
              <strong className="caption-bold">{route.route}</strong>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <div className="caption-medium text-content-primary mb-2">
                Information & Requirements
              </div>
              <ul className="mb-0 paragraph-small-regular text-content-secondary">
                {route.requirements.map((requirement, idx) => (
                  <li key={idx} className="mb-2">
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );

  return (
    <>
      <Row className="mb-4">
        <Col>
          <div className="subheading-big-medium text-content-secondary">
            Work Visa Route to {country.toUpperCase()}
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          {/* Conditionally render table or accordion based on screen size */}
          <div className="d-none d-md-block">
            <TableView />
          </div>

          <div className="d-block d-md-none">
            <AccordionView />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default WorkVisaRoute;
