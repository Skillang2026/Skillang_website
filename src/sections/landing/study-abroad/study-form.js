"use client";

import React, { useEffect } from "react";
import {
  Container,
  Col,
  Button,
  Row,
  Form,
  Image,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import useFormHandler from "../../../hooks/useFormHandler";
import FormRadioButton from "../../../components/buttons/from-radio-buttons/FormRadioButton";
import "./study-form.css";

const studyImage1 = "/assets/images/landing/study-1.png"; // Replace with your image path
const successSound = "/assets/sounds/success.mp3";
const errorSound = "/assets/sounds/rejected.mp3";

const ToastMessage = ({ showToast, onClose, toastVariant, status }) => {
  useEffect(() => {
    if (showToast) {
      const sound = new Audio(
        toastVariant === "success" ? successSound : errorSound
      );
      sound.play();
    }
  }, [showToast, toastVariant]);

  return (
    <Toast
      show={showToast}
      onClose={onClose}
      autohide
      delay={3000}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        minWidth: "300px",
      }}
    >
      <Toast.Header closeButton className={`bg-${toastVariant} text-white`}>
        <strong className="me-auto">🔔 Skillang</strong>
      </Toast.Header>
      <Toast.Body>{status}</Toast.Body>
    </Toast>
  );
};

const StudyForm = () => {
  const {
    formData,
    otp,
    otpVisible,
    showToast,
    toastVariant,
    status,
    resendDisabled,
    countdown,
    isOtpVerified,
    isOtpSent,
    validated,
    handleInputChange,
    handleOptionSelect,
    handleSubmit,
    handleOtpChange,
    handleVerifyOtp,
    handleResendOtp,
    setOtp,
    setShowToast,
  } = useFormHandler();

  useEffect(() => {
    // Set default values when component mounts
    handleOptionSelect("lookingFor", "Study Aborad");
    handleOptionSelect("origin", "Study Abroad Landing Page Form");
  }, []);

  // Handler for experience/study level selection
  const handleExperienceSelect = (option) => {
    handleOptionSelect("experience", option);
  };

  // Handler for country selection
  const handleCountrySelect = (option) => {
    handleOptionSelect("country", option);
  };
  return (
    <div className="d-flex justify-content-center align-items-start ">
      <Container className="d-flex justify-content-center align-items-start ">
        <Row className=" justify-content-center align-items-center ">
          <Col
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="nurse-landing-card">
              <Row className=" d-flex justify-content-center align-items-center ">
                <Col
                  md={6}
                  lg={6}
                  sm={12}
                  xs={12}
                  className="justify-content-start align-items-center "
                >
                  <div className="nurse-img-carousel">
                    <Image
                      fluid
                      src={studyImage1}
                      alt="Study Abroad"
                      style={{ minHeight: "45vh", objectFit: "cover" }}
                    />
                    {/* <div className="carousel-caption">
                      <p>One-to-One Visa Assistance</p>
                    </div> */}
                  </div>
                </Col>
                {/* Right Side - Form */}
                <Col md={6} lg={6} sm={12} xs={12} className=" ">
                  <div className="subheading-big-medium text-content-primary mt-2 m-0 p-0 my-lg-2 text-center">
                    Start Your Study Abroad Journey
                  </div>
                  <div className="mb-3 paragraph-small-medium text-content-secondary py-2 text-center">
                    Tell Us About Yourself!
                  </div>
                  <Form validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        minLength={3}
                        maxLength={40}
                      />
                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                      <Col lg={6} className="mb-3">
                        <Form.Group>
                          <Form.Control
                            type="tel"
                            placeholder="Mobile"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            pattern="[0-9]{10}"
                          />
                          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col lg={6} className="mb-3">
                        <Form.Group>
                          <Form.Control
                            type="text"
                            placeholder="Pin code"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            required
                            pattern="[0-9]{6}"
                          />
                          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Looking For Selection - Using FormRadioButton component */}
                    <FormRadioButton
                      label="Looking For?"
                      options={["Bachelors", "Masters"]}
                      name="experience"
                      value={formData.experience}
                      onChange={(value) => handleExperienceSelect(value)}
                      controlId="formStudyLevel"
                    />

                    {/* Country Selection - Using FormRadioButton component */}
                    <FormRadioButton
                      label="Country"
                      options={["USA", "UK", "Germany", "Australia", "Europe"]}
                      name="country"
                      value={formData.country}
                      onChange={(value) => handleCountrySelect(value)}
                      controlId="formCountry"
                    />

                    {otpVisible && (
                      <Row className="mb-3">
                        <Col lg={8}>
                          <Form.Group controlId="otp">
                            <Form.Control
                              type="text"
                              name="otp"
                              value={otp}
                              placeholder="Enter OTP - Sent in mail"
                              onChange={handleOtpChange}
                              disabled={!otpVisible}
                            />
                          </Form.Group>

                          <div
                            className={`text-start ${
                              resendDisabled
                                ? "resend-disabled"
                                : "resend-enabled"
                            }`}
                            onClick={
                              !resendDisabled ? handleResendOtp : undefined
                            }
                          >
                            🔔 Resend OTP{" "}
                            {resendDisabled ? `(${countdown}s)` : ""}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <button
                            className="btn-secondary w-100"
                            type="button"
                            onClick={handleVerifyOtp}
                          >
                            Verify OTP
                          </button>
                        </Col>
                      </Row>
                    )}

                    {/* Book Free Consultation Button */}
                    <Button
                      variant="primary"
                      className="w-100 mt-3"
                      type="submit"
                    >
                      Book a Free Consultation
                    </Button>

                    {/* Terms and Privacy Policy */}
                    <div
                      className="mt-2 text-muted text-center"
                      style={{ fontSize: "12px" }}
                    >
                      By submitting this form, you agree to the{" "}
                      <a href="#" className="text-decoration-none">
                        Terms of Use
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-decoration-none">
                        Privacy Policy
                      </a>
                      .
                    </div>
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-end" className="p-3">
        <ToastMessage
          showToast={showToast}
          onClose={() => setShowToast(false)}
          toastVariant={toastVariant}
          status={status}
        />
      </ToastContainer>
    </div>
  );
};

export default StudyForm;
