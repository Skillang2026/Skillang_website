"use client";

import React, { useState, useEffect, useRef } from "react";
import "./indemand_course.css";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "react-bootstrap-icons";
import { Container, Card, CardBody, CardImg } from "react-bootstrap";
import { useRouter, usePathname } from "next/navigation"; // Next.js navigation

const businessAdminImage =
  "https://cms.skillang.com/uploads/indemandcardcontent_e4d75790a5.png";
const engineeringImage =
  "https://cms.skillang.com/uploads/Engineering_4ab3e651a7.jpg";
const computerScienceImage =
  "https://cms.skillang.com/uploads/compsci_95ca348643.jpg";
const medicineImg = "https://cms.skillang.com/uploads/medicine_77103029da.jpg";
const itImg = "https://cms.skillang.com/uploads/it_32ebb44bab.jpg";
const bioTechImg = "https://cms.skillang.com/uploads/biotech_dc8e72d98e.jpg";
const backgroundImage =
  "https://cms.skillang.com/uploads/demandcoursebg_17fe271827.png";

const courseData = [
  {
    title: "Business Administration",
    paths: "Marketing, Finance, HR",
    image: businessAdminImage,
  },
  {
    title: "Engineering",
    paths: "Mechanical, Civil, Electrical, Aerospace",
    image: engineeringImage,
  },
  {
    title: "Computer Science",
    paths: "Software Dev, AI, Cybersecurity",
    image: computerScienceImage,
  },
  {
    title: "Medicine",
    paths: "Doctors, Surgeons, Medical Researchers",
    image: medicineImg,
  },
  {
    title: "Information Technology",
    paths: "Cloud, Data Science, Network Security",
    image: itImg,
  },
  {
    title: "Biotechnology",
    paths: "Biomedical, Pharma, Genetic Research",
    image: bioTechImg,
  },
];

const IndemandCourse = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const cardsRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(0); // Initialize as 0 for SSR

  // Next.js navigation hooks
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path) => {
    if (pathname !== path) {
      router.push(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle screen width on client side only
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    // Set initial screen width
    setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (cardsRef.current) {
      const newHeight = showAll ? `${cardsRef.current.scrollHeight}px` : "auto";
      cardsRef.current.style.maxHeight = newHeight;
    }
  }, [showAll]);

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % 2);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + 2) % 2);
  };

  // Determine how many cards to display based on screen width and showAll state
  const getDisplayedCourses = () => {
    const isMobile = screenWidth < 768;

    if (isMobile) {
      return showAll ? courseData : courseData.slice(0, 2);
    } else {
      return courseData.slice(currentPage * 3, (currentPage + 1) * 3);
    }
  };

  const displayedCourses = getDisplayedCourses();

  return (
    <div className="in-demand-courses-container ">
      <div className="d-flex justify-content-center align-items-center flex-column container">
        <div className="text-center demand-header-wrapper">
          <div className="heading-big-medium">
            In-Demand Courses & Career Paths
          </div>
          <div className="paragraph-bg-medium py-3">
            Each destination offers unique opportunities and challenges. We
            provide tailored guidance on job markets, salary expectations,
            cultural norms, and legal requirements for working abroad.
          </div>
          <button
            className="btn-primary mb-4"
            onClick={() => handleNavigation("/universities")} // Updated path
          >
            Know More
          </button>
        </div>
        <div className="courses-section">
          <div
            className="courses-grid"
            ref={cardsRef}
            style={{
              overflow: "hidden",
              transition: "max-height 0.5s ease-in-out",
            }}
          >
            {displayedCourses.map((course, index) => (
              <Card key={index} className="course-card">
                <CardImg
                  className="card-image-wrapper course-image"
                  src={course.image}
                  alt={course.title}
                />

                <CardBody className="course-details d-flex flex-column justify-content-between">
                  <div className="subheading-small-medium text-content-primaryInverse">
                    {course.title}
                  </div>
                  <div>
                    <div className="career-paths">Career Paths</div>
                    <div className="career-specializations text-content-grey-500">
                      {course.paths}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="d-none d-md-block">
            <div className="pagination-controls">
              <button
                className="pagination-button prev"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
              >
                <ChevronLeft />
              </button>
              <button
                className="pagination-button next"
                onClick={handleNextPage}
                disabled={currentPage === 1}
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className="text-center d-block d-md-none mt-3">
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
        </div>
      </div>
    </div>
  );
};

export default IndemandCourse;
