"use client";

import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./nav-study-landing.css";
import ConsultationModal from "../../sections/resuable/forms/calendly/LeadFormCalendly";

const NavStudyLanding = ({ formRef, formMounted }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef(null);
  const navPositionRef = useRef(null);
  const primaryNavHeight = 70; // Adjust this to match your primary navbar height
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // Handle sticky nav behavior and visibility based on scroll position
  useEffect(() => {
    // Skip effect if form isn't mounted yet
    if (!formMounted) return;

    // Safer initialization for navbar position
    const initializeNavPosition = () => {
      try {
        if (navRef.current) {
          navPositionRef.current =
            navRef.current.getBoundingClientRect().top + window.scrollY;
        }
      } catch (error) {
        console.error("Error initializing nav position:", error);
      }
    };

    // Initialize with a delay to ensure DOM is fully loaded
    const initTimer = setTimeout(initializeNavPosition, 500);

    // Add scroll event listener to handle sticky behavior and visibility
    const handleScroll = () => {
      try {
        // Try to initialize navbar position if not set yet
        if (!navPositionRef.current && navRef.current) {
          try {
            navPositionRef.current =
              navRef.current.getBoundingClientRect().top + window.scrollY;
          } catch (error) {
            // Silent fail, will try again on next scroll
          }
        }

        // Check form visibility - with extensive error handling
        let formIsVisible = false;
        try {
          if (formRef && formRef.current) {
            const formRect = formRef.current.getBoundingClientRect();
            // Consider form as visible only when a significant portion is in view
            formIsVisible =
              formRect.top < window.innerHeight - 100 && // Form top is in view with small buffer
              formRect.bottom > 150; // Form bottom is in view with small buffer
          }
        } catch (error) {
          console.error("Error checking form visibility:", error);
          // Default to false if there's an error
          formIsVisible = false;
        }

        // Show navbar as soon as the form disappears from view
        setIsVisible(!formIsVisible);

        // Sticky behavior - only apply if nav is already visible
        if (navPositionRef.current && !formIsVisible) {
          const shouldBeSticky =
            window.scrollY > navPositionRef.current - primaryNavHeight;

          if (shouldBeSticky !== isSticky) {
            setIsSticky(shouldBeSticky);
          }
        }
      } catch (error) {
        console.error("Error in scroll handler:", error);
        // Don't update state if there's an error
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Call once to set initial state
    handleScroll();

    // Cleanup
    return () => {
      clearTimeout(initTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky, formRef, formMounted]);

  // Early return if component should not be visible
  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div
        ref={navRef}
        className={`study-sec-nav-bg ${isSticky ? "sticky-active" : ""}`}
      >
        <div className="subheading-big-medium">
          Start Your Study Abroad Journey
        </div>
        <button className="btn btn-primary" onClick={handleShow}>
          Book Free Consultation
        </button>
      </div>
      {isSticky && <div className="nav-placeholder"></div>}
      <ConsultationModal
        show={showModal}
        handleClose={handleClose}
        showCalendly={false}
        lookingFor={"Landing Study Page"}
      />
    </>
  );
};

export default NavStudyLanding;
