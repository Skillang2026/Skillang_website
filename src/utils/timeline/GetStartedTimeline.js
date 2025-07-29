"use client";

import React, { useState, useEffect, useRef } from "react";
import "./GetStartedTimeline.css";
import { Container } from "react-bootstrap";

const GetStartedTimeline = ({
  title = "Getting Started",
  subtitle = "",
  steps = [],
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSteps, setAnimatedSteps] = useState(new Set());
  const componentRef = useRef(null);

  // Intersection Observer for visibility detection
  useEffect(() => {
    if (!componentRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(componentRef.current);
    return () => observer.disconnect();
  }, []);

  // Simplified animation trigger for mobile
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setAnimatedSteps(
        new Set(Array.from({ length: steps.length }, (_, i) => i))
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [isVisible, steps.length]);

  return (
    <Container className="">
      <div
        className={`timeline-container ${isVisible ? "animate-in" : ""}`}
        ref={componentRef}
        style={{ "--step-count": steps.length }}
      >
        {/* Header */}
        <div className="timeline-header">
          <h1 className="heading-big-medium text-content-primary">{title}</h1>
          <div className="paragraph-big-medium text-content-secondary">
            {subtitle}
          </div>
        </div>

        {/* Timeline Steps */}
        <div className="timeline-steps-wrapper">
          {/* Desktop connecting line background */}
          <div className="timeline-line-bg"></div>
          {/* Desktop progress line */}
          <div className="timeline-line-progress"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`timeline-step ${index === 0 ? "active" : ""} ${
                animatedSteps.has(index) ? "animate-step" : ""
              }`}
              style={{ "--step-index": index }}
            >
              <div className="step-indicator">
                <div className="caption-bold">Step {index + 1}</div>
                <div className="step-circle">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>

              <div className="step-content">
                <h3 className="paragraph-big-medium">{step.title}</h3>
                <p className="paragraph-small-regular">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile timeline */}
        <div className="mobile-timeline">
          {/* Mobile connecting line */}
          <div className="mobile-line-bg"></div>
          <div className="mobile-line-progress"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`mobile-step ${
                animatedSteps.has(index) ? "animate-step" : ""
              }`}
              style={{ "--step-index": index }}
            >
              <div className="mobile-step-circle">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <div className="mobile-step-content">
                <h3 className="mobile-step-title">{step.title}</h3>
                <p className="mobile-step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default GetStartedTimeline;
