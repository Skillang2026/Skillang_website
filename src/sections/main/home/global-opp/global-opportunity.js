"use client";

import React from "react";
import { Container, Row } from "react-bootstrap";
import "./global-opportunity.css";
import { useRouter } from "next/navigation"; // Next.js navigation
import { useToast } from "@/hooks/useToast";

const GlobalOpportunity = () => {
  const router = useRouter(); // Next.js router
  const { showToast } = useToast(); // ADD THIS HOOK

  const handleLearnMore = () => {
    router.push("/work-abroad"); // Next.js navigation
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ADD THIS TEST FUNCTION
  const handleTestToast = () => {
    showToast(
      "success",
      "Test Success!",
      "This is a test notification to verify Sonner is working properly"
    );
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-lg-1">
      <Container className="d-flex align-items-center justify-content-center text-center">
        <Row className="d-flex align-items-center justify-content-center global-opp-text-wrap">
          <div className="heading-big-medium d-none d-md-block">
            Unlock 🔑 the Global 🌐 Opportunities
          </div>
          <h1 className="heading-big-medium d-block d-md-none">
            Unlock the Global Opportunities
          </h1>
          <p className="paragraph-big-medium text-content-secondary mb-3">
            Explore the world through our comprehensive study abroad, work
            abroad, language and test preparation services. Tailored guidance to
            help you succeed in your dream career abroad!
          </p>

          {/* UPDATE THIS SECTION - Add both buttons */}
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="btn-primary-outline" onClick={handleLearnMore}>
              Learn More
            </button>
            {/* ADD THIS TEST BUTTON */}
            {/* <button className="btn btn-warning" onClick={handleTestToast}>
              Test Toast
            </button> */}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default GlobalOpportunity;
