"use client";

import React, { useState, useEffect, useRef } from "react";
import "./GetStart.css";

const GetStart = () => {
  // Animation state
  const [animationStage, setAnimationStage] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  // Set up Intersection Observer to detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Check if component is intersecting (visible)
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Once we've detected visibility, we can disconnect the observer
          observer.disconnect();
        }
      },
      {
        // Component is considered visible when 20% of it is in viewport
        threshold: 0.2,
      }
    );

    // Start observing our component
    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    // Cleanup function
    return () => {
      if (componentRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Trigger animation when component becomes visible - only for mobile
  useEffect(() => {
    // Only start animation when component is visible
    if (!isVisible) return;

    // Check if we're on mobile view
    const isMobile = window.innerWidth <= 992;

    if (isMobile) {
      // Animation sequence with each stage
      const timeline = [
        { stage: 0, delay: 500 }, // First circle turns green
        { stage: 1, delay: 300 }, // First content darkens
        { stage: 2, delay: 600 }, // First line connects and turns green
        { stage: 3, delay: 500 }, // Second circle turns green
        { stage: 4, delay: 300 }, // Second content darkens
        { stage: 5, delay: 600 }, // Second line connects and turns green
        { stage: 6, delay: 500 }, // Third circle turns green
        { stage: 7, delay: 300 }, // Third content darkens
        { stage: 8, delay: 600 }, // Third line connects and turns green
        { stage: 9, delay: 500 }, // Fourth circle turns green
        { stage: 10, delay: 300 }, // Fourth content darkens
        { stage: 11, delay: 600 }, // Fourth line connects and turns green
        { stage: 12, delay: 500 }, // Fifth circle turns green
        { stage: 13, delay: 300 }, // Fifth content darkens
      ];

      let timeoutIds = [];

      // Schedule each animation stage
      let cumulativeDelay = 0;
      timeline.forEach((item) => {
        cumulativeDelay += item.delay;
        const timeoutId = setTimeout(() => {
          setAnimationStage(item.stage);
        }, cumulativeDelay);
        timeoutIds.push(timeoutId);
      });

      // Cleanup function
      return () => {
        timeoutIds.forEach((id) => clearTimeout(id));
      };
    }
  }, [isVisible]); // Dependency on isVisible ensures animation starts when component becomes visible

  return (
    <div className="getting-started-container" ref={componentRef}>
      <div className="header-section">
        <div className="heading-big-medium text-content-primary">
          Getting Started
        </div>
        <p className="paragraph-big-regular text-content-secondary">
          Secure your loan through a streamlined five-step process.
        </p>
      </div>

      <div className="progress-steps-container">
        {/* Desktop view with improved grid layout */}
        <div className="desktop-view">
          <div className="step-progress-bar">
            {/* Step 1 */}
            <div className="step-item active">
              <div className="step-label">Step 1</div>
              <div className="step-circle active">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="step-title">Schedule a Consultation</h3>
              <p className="step-description">
                Reach out via our website or contact form to set up your free
                consultation.
              </p>
            </div>

            {/* Step 2 */}
            <div className="step-item">
              <div className="step-label">Step 2</div>
              <div className="step-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#dfe1e6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="step-title">Assessment of Needs</h3>
              <p className="step-description">
                Discuss your financial situation, study plans, and budget
                requirements.
              </p>
            </div>

            {/* Step 3 */}
            <div className="step-item">
              <div className="step-label">Step 3</div>
              <div className="step-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#dfe1e6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="step-title">Explore Loan Options</h3>
              <p className="step-description">
                We compare different loan options to find the best fit for you.
              </p>
            </div>

            {/* Step 4 */}
            <div className="step-item">
              <div className="step-label">Step 4</div>
              <div className="step-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#dfe1e6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="step-title">Application & Approval</h3>
              <p className="step-description">
                Assistance with the complete application process for a
                successful outcome.
              </p>
            </div>

            {/* Step 5 */}
            <div className="step-item">
              <div className="step-label">Step 5</div>
              <div className="step-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#dfe1e6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="step-title">Disbursement & Beyond</h3>
              <p className="step-description">
                Coordination with your institution to ensure timely fund
                disbursement and ongoing financial support.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile view with animation */}
        <div className="mobile-view">
          <div className="header-title">
            <div className="heading-big-medium">Getting Started</div>
            <p className="subheading-text">
              Secure your loan through a streamlined five-step process.
            </p>
          </div>
          <div className="mobile-timeline-container">
            <div className="mobile-step-item">
              <div
                className={`mobile-step-circle ${
                  animationStage >= 0 ? "animated-circle" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={animationStage >= 0 ? "white" : "#dfe1e6"}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={animationStage >= 0 ? "animated-checkmark" : ""}
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="mobile-step-content">
                <h3
                  className={`mobile-step-title ${
                    animationStage >= 1 ? "animated-text" : ""
                  }`}
                >
                  Schedule a Consultation
                </h3>
              </div>
            </div>
            <div
              className={`mobile-progress-line line1 ${
                animationStage >= 2 ? "animated-line" : ""
              }`}
            ></div>

            <div className="mobile-step-item">
              <div
                className={`mobile-step-circle ${
                  animationStage >= 3 ? "animated-circle" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={animationStage >= 3 ? "white" : "#dfe1e6"}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={animationStage >= 3 ? "animated-checkmark" : ""}
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="mobile-step-content">
                <h3
                  className={`mobile-step-title ${
                    animationStage >= 4 ? "animated-text" : ""
                  }`}
                >
                  Assessment of Needs
                </h3>
              </div>
            </div>
            <div
              className={`mobile-progress-line line2 ${
                animationStage >= 5 ? "animated-line" : ""
              }`}
            ></div>

            <div className="mobile-step-item">
              <div
                className={`mobile-step-circle ${
                  animationStage >= 6 ? "animated-circle" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={animationStage >= 6 ? "white" : "#dfe1e6"}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={animationStage >= 6 ? "animated-checkmark" : ""}
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="mobile-step-content">
                <h3
                  className={`mobile-step-title ${
                    animationStage >= 7 ? "animated-text" : ""
                  }`}
                >
                  Explore Loan Options
                </h3>
              </div>
            </div>
            <div
              className={`mobile-progress-line line3 ${
                animationStage >= 8 ? "animated-line" : ""
              }`}
            ></div>

            <div className="mobile-step-item">
              <div
                className={`mobile-step-circle ${
                  animationStage >= 9 ? "animated-circle" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={animationStage >= 9 ? "white" : "#dfe1e6"}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={animationStage >= 9 ? "animated-checkmark" : ""}
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="mobile-step-content">
                <h3
                  className={`mobile-step-title ${
                    animationStage >= 10 ? "animated-text" : ""
                  }`}
                >
                  Application & Approval
                </h3>
              </div>
            </div>
            <div
              className={`mobile-progress-line line4 ${
                animationStage >= 11 ? "animated-line" : ""
              }`}
            ></div>

            <div className="mobile-step-item">
              <div
                className={`mobile-step-circle ${
                  animationStage >= 12 ? "animated-circle" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={animationStage >= 12 ? "white" : "#dfe1e6"}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={animationStage >= 12 ? "animated-checkmark" : ""}
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="mobile-step-content">
                <h3
                  className={`mobile-step-title ${
                    animationStage >= 13 ? "animated-text" : ""
                  }`}
                >
                  Disbursement & Beyond
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStart;
