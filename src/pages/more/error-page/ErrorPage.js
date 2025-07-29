"use client"; // Add this at the top

import React from "react";
import { Container } from "react-bootstrap";
import "./ErrorPage.css";

const errorImg = "/assets/images/error-img.jpg";

const ErrorPage = () => {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center error-page-bg">
      <Container className=" d-flex flex-column justify-content-center align-items-center ">
        <div className="error-page-circle"></div>
        <img src={errorImg} alt="Error" className="img-fluid" />
        <button className="btn btn-primary mt-3" onClick={handleGoHome}>
          Back to Home
        </button>
      </Container>
    </div>
  );
};

export default ErrorPage;
