"use client";

import React, { useEffect } from "react";
import { Container, Row, Col, Card, CardImg } from "react-bootstrap";
import "../study-abroad/abroad_destination.css";

// Import flags
const australiaFlag = "/assets/images/work-abroad/countryflags/australia.png";
const canadaFlag = "/assets/images/work-abroad/countryflags/canada.png";
const franceFlag = "/assets/images/work-abroad/countryflags/france.svg";
const germanyFlag = "/assets/images/work-abroad/countryflags/germany.png";
const irelandFlag = "/assets/images/work-abroad/countryflags/ireland.svg";
const ukFlag = "/assets/images/work-abroad/countryflags/uk.png";
const usaFlag = "/assets/images/work-abroad/countryflags/usa.png";
const finlandFlag = "/assets/images/work-abroad/countryflags/finland.svg";
const austriaFlag = "/assets/images/work-abroad/countryflags/austria.svg";

const AbroadDestinations = ({ isLanding = false }) => {
  const destinations = [
    { name: "UK", flag: ukFlag },
    { name: "Germany", flag: germanyFlag },
    { name: "USA", flag: usaFlag },
    { name: "Australia", flag: australiaFlag },
    { name: "Canada", flag: canadaFlag },
    { name: "Ireland", flag: irelandFlag },
    { name: "France", flag: franceFlag },
    { name: "Finland", flag: finlandFlag },
    { name: "Austria", flag: austriaFlag },
  ];

  useEffect(() => {
    if (!isLanding) {
      const scrollers = document.querySelectorAll(".scroller");

      // If a user hasn't opted in for reduced motion, then we add the animation
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
      }

      function addAnimation() {
        scrollers.forEach((scroller) => {
          scroller.setAttribute("data-animated", true);

          const scrollerInner = scroller.querySelector(".scroller__inner");
          const scrollerContent = Array.from(scrollerInner.children);

          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
          });
        });
      }
    }
  }, [isLanding]);

  // Create a function to render destination items
  const renderDestinationItem = (destination, index) => (
    <div key={index} className="study-abroad-destination-card me-4">
      <img
        src={destination.flag}
        alt={`${destination.name} flag`}
        className="destination-flag"
      />
      <span className="destination-name subheading-small-medium mb-1">
        {destination.name}
      </span>
    </div>
  );

  return (
    <div className=" container d-flex flex-column align-items-center justify-content-center">
      <div className=" abroad-header-wrapper">
        <h1 className="heading-big-medium">
          Popular Study Abroad Destinations
        </h1>
        <p className="paragraph-big-medium text-content-secondary">
          Explore top countries offering world-class education, cultural
          diversity, and global career opportunities
        </p>
      </div>

      {isLanding ? (
        <Row
          xs={2}
          sm={3}
          md={4}
          lg={5}
          className="g-2 d-flex justify-content-center"
        >
          {destinations.map((destination, index) => (
            <Col key={index} className="">
              <Card className="study-abroad-destination-card">
                <CardImg
                  src={destination.flag}
                  alt={`${destination.name} flag`}
                  className="card-img-top destination-flag"
                />
                <Card.Body className="text-center">
                  <Card.Title className="subheading-big-medium">
                    {destination.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="scroller w-100" data-direction="left" data-speed="slow">
          <div className="scroller__inner">
            {destinations.map((destination, index) =>
              renderDestinationItem(destination, index)
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AbroadDestinations;
