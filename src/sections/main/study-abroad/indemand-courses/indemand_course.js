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
  "/assets/images/study-abroad/study-abroad-in-business-administration.png";
const engineeringImage =
  "/assets/images/study-abroad/study-abroad-in-engineering.jpg";
const computerScienceImage =
  "/assets/images/study-abroad/study-abroad-in-computer-science.jpg";
const medicineImg = "/assets/images/study-abroad/study-abroad-in-medicine.jpg";
const itImg =
  "/assets/images/study-abroad/study-abroad-in-information-technology.jpg";
const bioTechImg =
  "/assets/images/study-abroad/study-abroad-in-biotechnology.jpg";

const courseData = [
  {
    title: "Business Administration",
    paths: "Marketing, Finance, HR, Business Analytics",
    image: businessAdminImage,
    imgAlt: "Study Abroad in Business Administration",
  },
  {
    title: "Engineering",
    paths: "Mechanical, Civil, Electrical, Aerospace",
    image: engineeringImage,
    imgAlt: "Study Abroad in Engineering",
  },
  {
    title: "Computer Science",
    paths: "Software Development, AI, Cybersecurity",
    image: computerScienceImage,
    imgAlt: "Study Abroad in Computer Science",
  },
  {
    title: "Medicine",
    paths: "Doctors, Surgeons, Medical Researchers",
    image: medicineImg,
    imgAlt: "Study Abroad in Medicine",
  },
  {
    title: "Information Technology",
    paths: "Cloud, Data Science, Network Security",
    image: itImg,
    imgAlt: "Study Abroad in Information Technology",
  },
  {
    title: "Biotechnology",
    paths: "Biomedical, Pharma, Genetic Research",
    image: bioTechImg,
    imgAlt: "Study Abroad in Biotechnology",
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
                  className="card-image-wrapper course-image "
                  src={course.image}
                  alt={course.title}
                />

                <CardBody className="course-details px-2 d-flex flex-column justify-content-between gap-3">
                  <div className="subheading-small-medium text-content-primaryInverse">
                    {course.title}
                  </div>
                  <div className="">
                    <div className="career-paths mb-1">Career Paths</div>
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
