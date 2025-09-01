"use client";

import React, { useState, useEffect, useRef } from "react";
import "./abroud_journey.css";
const lineImage = "/assets/images/work-abroad/journey/line.png";

const AbroudJourney = () => {
  // Define more granular animation states
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

    // Check if we're on mobile view - safely access window
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

    if (isMobile) {
      // Animation sequence with more granular stages
      const timeline = [
        { stage: 0, delay: 500 }, // First circle turns green
        { stage: 1, delay: 500 }, // First content darkens
        { stage: 2, delay: 600 }, // First line connects and turns green
        { stage: 3, delay: 500 }, // Second circle turns green
        { stage: 4, delay: 500 }, // Second content darkens
        { stage: 5, delay: 600 }, // Second line connects and turns green
        { stage: 6, delay: 500 }, // Third circle turns green
        { stage: 7, delay: 500 }, // Third content darkens
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
    <div className="work-abroad-container" ref={componentRef}>
      <div className="work-abroad-wrapper ">
        <div className="text-center">
          <div className="heading-big-medium">Work Abroad Journey</div>
          <div className="paragraph-big-medium text-content-secondary">
            Start your work abroad journey in 3 simple steps
          </div>
        </div>
        <div className="journey-content bg-primar">
          {/* Desktop View - Keep as is */}
          <div className="journey-progress desktop-only">
            <img src={lineImage} alt="Progress Line" className="img-fluid" />
          </div>

          {/* Mobile View - With improved sequence animation */}
          <div className="mobile-journey mobile-only">
            <div className="mobile-timeline">
              {/* First step */}
              <div className="mobile-step-container">
                <div
                  className={`mobile-step-icon ${
                    animationStage >= 0 ? "completed" : "pending"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="12"
                      fill={animationStage >= 0 ? "#00C170" : "#EEEEEE"}
                      className={animationStage >= 0 ? "animated-circle" : ""}
                    />
                    <path
                      d="M7 12L10 15L17 8"
                      stroke={animationStage >= 0 ? "white" : "#CCCCCC"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={
                        animationStage >= 0 ? "animated-checkmark" : ""
                      }
                    />
                  </svg>
                </div>
                <div className="mobile-step-text">
                  <h3
                    className={
                      animationStage >= 1 ? "active-step" : "pending-step"
                    }
                    style={{ color: animationStage >= 1 ? "#00C170" : "#666" }}
                  >
                    Language & Test Prep
                  </h3>
                </div>
              </div>

              {/* First Connector Line */}
              <div
                className={`mobile-connector-line ${
                  animationStage >= 2 ? "animated-line" : ""
                }`}
              ></div>

              {/* Second step */}
              <div className="mobile-step-container">
                <div
                  className={`mobile-step-icon ${
                    animationStage >= 3 ? "completed" : "pending"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="12"
                      fill={animationStage >= 3 ? "#00C170" : "#EEEEEE"}
                      className={animationStage >= 3 ? "animated-circle" : ""}
                    />
                    <path
                      d="M7 12L10 15L17 8"
                      stroke={animationStage >= 3 ? "white" : "#CCCCCC"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={
                        animationStage >= 3 ? "animated-checkmark" : ""
                      }
                    />
                  </svg>
                </div>
                <div className="mobile-step-text">
                  <h3
                    className={
                      animationStage >= 4 ? "active-step" : "pending-step"
                    }
                    style={{ color: animationStage >= 4 ? "#00C170" : "#666" }}
                  >
                    CV Making, Application
                    <br />& Interview Support
                  </h3>
                </div>
              </div>

              {/* Second Connector line */}
              <div
                className={`mobile-connector-line ${
                  animationStage >= 5 ? "animated-line" : ""
                }`}
              ></div>

              {/* Third step */}
              <div className="mobile-step-container">
                <div
                  className={`mobile-step-icon ${
                    animationStage >= 6 ? "completed" : "pending"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="12"
                      fill={animationStage >= 6 ? "#00C170" : "#EEEEEE"}
                      className={animationStage >= 6 ? "animated-circle" : ""}
                    />
                    <path
                      d="M7 12L10 15L17 8"
                      stroke={animationStage >= 6 ? "white" : "#CCCCCC"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={
                        animationStage >= 6 ? "animated-checkmark" : ""
                      }
                    />
                  </svg>
                </div>
                <div className="mobile-step-text">
                  <h3
                    className={
                      animationStage >= 7 ? "active-step" : "pending-step"
                    }
                    style={{ color: animationStage >= 7 ? "#00C170" : "#666" }}
                  >
                    Visa & Relocation Support
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbroudJourney;
