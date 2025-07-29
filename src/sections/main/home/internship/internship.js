"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import "./internship.css";

// Import desktop images
const intern1 = "https://cms.skillang.com/uploads/intern_1_9b7f4aa9b7.jpg";
const intern2 = "https://cms.skillang.com/uploads/intern_2_47226cd931.jpg";
const intern3 = "https://cms.skillang.com/uploads/intern_3_5ec013ac6d.jpg";
const intern4 = "https://cms.skillang.com/uploads/intern_4_7351ac6f62.jpg";
const intern5 = "https://cms.skillang.com/uploads/intern_5_e8905e8149.jpg";
const intern6 = "https://cms.skillang.com/uploads/intern_6_34b605b73e.jpg";
const intern7 = "https://cms.skillang.com/uploads/intern_7_aad21314c5.jpg";
const intern8 = "https://cms.skillang.com/uploads/intern_8_64e2ba8297.jpg";

// const mobile images
const intern1Mobile =
  "https://cms.skillang.com/uploads/intenr_mobile_1_4e1ad30e1d.jpg";
const intern2Mobile =
  "https://cms.skillang.com/uploads/intenr_mobile_2_444bbaa234.jpg";
const intern3Mobile =
  "https://cms.skillang.com/uploads/intenr_mobile_3_4a0e370a2d.jpg";
const intern4Mobile =
  "https://cms.skillang.com/uploads/intenr_mobile_4_7193261df2.jpg";
const intern5Mobile =
  "https://cms.skillang.com/uploads/intenr_mobile_5_850187fca9.jpg";
const intern6Mobile =
  "https://cms.skillang.com/uploads/intenr_mobile_6_c79306abe6.jpg";
const intern7Mobile =
  "https://cms.skillang.com/uploads/intenr_mobile_7_47a4efb1e5.jpg";
const intern8Mobile =
  "https://cms.skillang.com/uploads/intenr_mobile_8_4634962685.jpg";

const internCardData = [
  {
    title: "Job Oriented free study",
    img: intern1,
    mobileImg: intern1Mobile,
    id: "intern-mobile-card-half",
    desc: "No or minimal fee charged for the Ausbildung program in Germany.",
    colSpan: 4,
    mobileColSpan: 6, //  width on mobile
  },
  {
    title: "No Block Account needed",
    img: intern2,
    mobileImg: intern2Mobile,
    id: "intern-mobile-card-half",
    desc: "There is no block account required to show the fund backup",
    colSpan: 4,
    mobileColSpan: 6,
  },
  {
    title: "Earn while you Learn",
    img: intern3,
    mobileImg: intern3Mobile,
    id: "intern-mobile-card-full",
    desc: "Students earn and gain industry experience through paid internships.",
    colSpan: 4,
    mobileColSpan: 12,
  },
  {
    title: "Post Study Visa & Placement Assistance",
    img: intern4,
    mobileImg: intern4Mobile,
    id: "intern-mobile-card-half",
    desc: "1.5 years stay-back for post-study work. Placement assistance for job opportunity",
    colSpan: 6,
    mobileColSpan: 6,
  },
  {
    title: "Diverse Industry Options",
    id: "intern-mobile-card-half",
    img: intern5,
    mobileImg: intern5Mobile,

    desc: "Diverse industry options available. Over 300+ formal training programs offered",
    colSpan: 6,
    mobileColSpan: 6,
  },
  {
    title: "Language Training",
    img: intern6,
    mobileImg: intern6Mobile,
    id: "intern-mobile-card-full",
    desc: "Our language training programs provide expert coaching in German Language",
    colSpan: 4,
    mobileColSpan: 12,
  },
  {
    title: "Eligibility",
    img: intern7,
    mobileImg: intern7Mobile,
    id: "intern-mobile-card-half",
    desc: "German Language proficiency: A2 level. 12th passed with above 50%. Age limit: Below 37 years.",
    colSpan: 4,
    mobileColSpan: 6,
  },
  {
    title: "PR Possibility",
    img: intern8,
    mobileImg: intern8Mobile,
    id: "intern-mobile-card-half",
    desc: "Our Employability program boosts PR chances in Germany.",
    colSpan: 4,
    mobileColSpan: 6,
  },
];

const InternshipSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [maxHeight, setMaxHeight] = useState("500px"); // Default max height
  const cardsRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(0); // Initialize with 0

  useEffect(() => {
    // Set initial screen width after component mounts
    setScreenWidth(window.innerWidth);

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (cardsRef.current) {
      setMaxHeight(showAll ? `${cardsRef.current.scrollHeight}px` : "500px");
    }
  }, [showAll]);

  return (
    <section className="d-flex flex-column align-items-center justify-content-center ">
      <Container className="d-flex flex-column align-items-center justify-content-center gap-4">
        <Row className=" text-center intern-heading-wrapper">
          <div className="heading-big-medium">
            Ausbildung (Internship) Program in Germany
          </div>
          <div className="paragraph-big-medium text-content-secondary">
            Gain hands-on experience and build a successful career in Germany
            with the Ausbildung Internship Program.
          </div>
        </Row>
        <div
          ref={cardsRef}
          className={`service-offering-cards-container row-equal-height ${
            showAll ? "expanded" : ""
          }`}
          style={{
            maxHeight: screenWidth < 768 ? maxHeight : "none",
            transition:
              screenWidth < 768 ? "max-height 0.4s ease-in-out" : "none",
            overflow: screenWidth < 768 ? "hidden" : "visible",
          }}
        >
          <Row className="internship-slider-wrapper p-0 m-0">
            {internCardData.map((card, index) => (
              <Col
                key={index}
                lg={card.colSpan}
                md={6}
                sm={card.mobileColSpan}
                xs={card.mobileColSpan} // Use mobile-specific column size
                className="intern-card-wrapper bg-primar p-2 p-lg-3"
              >
                <Card
                  className="intern-card d-flex flex-row"
                  id={card.id}
                  style={{
                    backgroundImage: `url(${
                      screenWidth < 768 ? card.mobileImg : card.img
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <CardBody className="d-flex flex-column justify-content-start align-items-start p-0">
                    <div className="intern-card-text-wrapper">
                      <CardTitle>
                        <div className="subheading-small-medium text-content-secondary">
                          {card.title}
                        </div>
                      </CardTitle>
                      <div className="caption-medium text-content-tertiary">
                        {card.desc}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Toggle Button */}
        <div className="text-center d-block d-md-none mt-1">
          <button
            className="btn-secondary-outline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                Close <ChevronUp className="ms-1" />
              </>
            ) : (
              <>
                View All <ChevronDown className="ms-1" />
              </>
            )}
          </button>
        </div>
      </Container>
    </section>
  );
};

export default InternshipSection;
