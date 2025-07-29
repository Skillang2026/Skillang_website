"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Form,
  Image,
  ToastContainer,
  Spinner,
} from "react-bootstrap";
import "./MainForm.css";
import useFormHandler from "../../hooks/useFormHandler";
import FormRadioButton from "../buttons/from-radio-buttons/FormRadioButton";
import ToastMessage from "@/utils/toast";

const MainFormComp = ({
  // Image and layout props
  headerImage,
  imageAlt = "Skillang Form",

  // Form configuration props
  formType = "default", // "language-test", "nurse", "study-abroad", "work-abroad", "home", or "default"
  showLookingForField = true,
  showExperienceField = false,
  showCountryField = false,
  showStudyLevelField = false,

  // Dynamic field configuration (for home form)
  dynamicFields = false, // Enable dynamic field showing/hiding based on lookingFor selection

  lookingForOptions = [
    "IELTS",
    "TOEFL",
    "GRE",
    "GMAT",
    "PTE",
    "German language",
    "Others",
  ],
  experienceOptions = [
    "Student",
    "0-1 Years",
    "1-3 Years",
    "3-5 Years",
    "5+ Years",
  ],
  countryOptions = ["USA", "UK", "Germany", "Australia", "Europe"],
  studyLevelOptions = ["Bachelors", "Masters"],

  // Default form values
  defaultExperience = "-",
  defaultCounty = "-",
  defaultOrigin = "Form Submission",
  defaultLookingFor = "",

  // Text customization
  title = "Let's Connect to Explore More!",
  subtitle = "Looking for Work Abroad, Study Abroad, Language & Test preparation?",
  buttonText = "Book your free consultation",
  lookingForLabel = "Looking For ?",
  experienceLabel = "Select Experience",
  countryLabel = "Country",
  studyLevelLabel = "Looking for ?", // For study level in home form

  // Layout props
  imageColSize = { lg: 7, md: 5, sm: 12, xs: 12 },
  formColSize = { lg: 4, md: 6, sm: 12, xs: 12 },
  showSpacer = true,

  // Custom CSS classes
  containerClass = "",
  headerClass = "d-flex align-items-start justify-content-center",
}) => {
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
    handleExperienceSelect,
    handleOtpChange,
    handleVerifyOtp,
    handleResendOtp,
    setOtp,
    setShowToast,
  } = useFormHandler();

  // Local loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Dynamic field state (for home form type)
  const [displayExperience, setDisplayExperience] = useState(false);
  const [displayStudyLevel, setDisplayStudyLevel] = useState(false);
  const [displayCountry, setDisplayCountry] = useState(false);

  // Set default values based on form type
  useEffect(() => {
    handleOptionSelect("experience", defaultExperience);
    handleOptionSelect("county", defaultCounty);
    handleOptionSelect("origin", defaultOrigin);

    // Set default looking for value if provided
    if (defaultLookingFor) {
      handleOptionSelect("lookingFor", defaultLookingFor);
    }
  }, [defaultExperience, defaultCounty, defaultOrigin, defaultLookingFor]);

  // Dynamic field logic for home form
  useEffect(() => {
    if (dynamicFields) {
      const isNursingOrWorkAbroad =
        formData.lookingFor === "Nursing" ||
        formData.lookingFor === "Work Abroad";
      const isStudyAbroad = formData.lookingFor === "Study Abroad";

      setDisplayExperience(isNursingOrWorkAbroad);
      setDisplayStudyLevel(isStudyAbroad);
      setDisplayCountry(isStudyAbroad);
    }
  }, [formData.lookingFor, dynamicFields]);

  // Handler for the looking-for selection
  const handleLookingForSelect = (option) => {
    handleOptionSelect("lookingFor", option);
  };

  // Handler for the country selection
  const handleCountrySelect = (option) => {
    handleOptionSelect("country", option);
  };

  // Handler for the study level selection
  const handleStudyLevelSelect = (option) => {
    handleOptionSelect("studyLevel", option);
  };

  // Determine which fields to show
  const shouldShowExperience = dynamicFields
    ? displayExperience
    : showExperienceField;
  const shouldShowCountry = dynamicFields ? displayCountry : showCountryField;
  const shouldShowStudyLevel = dynamicFields
    ? displayStudyLevel
    : showStudyLevelField;

  // Handle form submission with loading
  const handleFormSubmit = async (event) => {
    setIsSubmitting(true);
    try {
      await handleSubmit(event);
    } finally {
      // Reset loading after form resets or completes
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000); // Keep loading for 2 seconds to show completion
    }
  };

  // Handle OTP verification with loading
  const handleOtpVerification = async () => {
    setIsVerifyingOtp(true);
    try {
      await handleVerifyOtp();
    } finally {
      // Reset loading after verification completes
      setTimeout(() => {
        setIsVerifyingOtp(false);
      }, 1500);
    }
  };

  return (
    <header className={headerClass}>
      <Container className={containerClass}>
        <Row>
          {/* Image Column */}
          <Col
            lg={imageColSize.lg}
            md={imageColSize.md}
            sm={imageColSize.sm}
            xs={imageColSize.xs}
            className="d-flex flex-column align-items-start justify-content-center"
          >
            {headerImage && (
              <Image src={headerImage} fluid className="w-100" alt={imageAlt} />
            )}
          </Col>

          {/* Spacer Column */}
          {showSpacer && <Col lg={1} className="d-none d-md-block"></Col>}

          {/* Form Column */}
          <Col
            lg={formColSize.lg}
            md={formColSize.md}
            sm={formColSize.sm}
            xs={formColSize.xs}
            className="d-flex align-items-start justify-content-center"
          >
            <Container className="d-flex align-items-center justify-content-center flex-column">
              <div className="form-container m-0">
                {/* Form Title */}
                <div
                  className="d-none d-md-block subheading-small-medium text-center"
                  style={{ marginBottom: "8px" }}
                >
                  {title}
                </div>

                {/* Form Subtitle */}
                <div className="text-center paragraph-small-regular text-content-tertiary mb-3">
                  {subtitle}
                </div>

                <Form
                  noValidate
                  validated={validated}
                  onSubmit={handleFormSubmit}
                >
                  {/* Name Field */}
                  <Form.Group className="" controlId="formName">
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
                  </Form.Group>

                  {/* Email Field */}
                  <Form.Group className="" controlId="formEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  {/* Phone and Pin Code Row */}
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formNumber">
                        <Form.Control
                          type="tel"
                          placeholder="Mobile"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          pattern="[0-9]{10}"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formpincode">
                        <Form.Control
                          type="tel"
                          placeholder="Pin Code"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          required
                          pattern="[0-9]{6}"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Looking For Field (Conditional) */}
                  {showLookingForField && (
                    <FormRadioButton
                      label={lookingForLabel}
                      options={lookingForOptions}
                      name="lookingFor"
                      value={formData.lookingFor}
                      onChange={handleLookingForSelect}
                      controlId="formLookingFor"
                      labelClassName="text-start paragraph-small-regular text-content-secondary"
                      optionClassName="caption-regular text-content-secondary"
                    />
                  )}

                  {/* Experience Field (Conditional) */}
                  {shouldShowExperience && (
                    <FormRadioButton
                      label={experienceLabel}
                      options={experienceOptions}
                      name="experience"
                      value={formData.experience}
                      onChange={handleExperienceSelect}
                      controlId="formExperience"
                      labelClassName="text-start paragraph-small-regular text-content-secondary"
                      optionClassName="caption-regular text-content-secondary"
                    />
                  )}

                  {/* Study Level Field (Conditional) */}
                  {shouldShowStudyLevel && (
                    <FormRadioButton
                      label={studyLevelLabel}
                      options={studyLevelOptions}
                      name="studyLevel"
                      value={formData.studyLevel}
                      onChange={handleStudyLevelSelect}
                      controlId="formStudyLevel"
                      labelClassName="text-start paragraph-small-regular text-content-secondary"
                      optionClassName="caption-regular text-content-secondary"
                    />
                  )}

                  {/* Country Field (Conditional) */}
                  {shouldShowCountry && (
                    <FormRadioButton
                      label={countryLabel}
                      options={countryOptions}
                      name="country"
                      value={formData.country}
                      onChange={handleCountrySelect}
                      controlId="formCountry"
                      labelClassName="text-start paragraph-small-regular text-content-secondary"
                      optionClassName="caption-regular text-content-secondary"
                    />
                  )}

                  <div style={{ marginTop: "12px" }}></div>

                  {/* OTP Section */}
                  {otpVisible && (
                    <Row>
                      <Col lg={8}>
                        <Form.Control
                          type="text"
                          placeholder="Enter OTP - Sent in mail"
                          value={otp}
                          onChange={handleOtpChange}
                          required
                        />
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
                          onClick={handleOtpVerification}
                          disabled={isVerifyingOtp}
                        >
                          {isVerifyingOtp ? (
                            <>
                              <Spinner size="sm" className="me-2" />
                              Verifying...
                            </>
                          ) : (
                            "Verify OTP"
                          )}
                        </button>
                      </Col>
                    </Row>
                  )}

                  {/* Submit Button */}
                  <button
                    className="btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Processing...
                      </>
                    ) : (
                      buttonText
                    )}
                  </button>

                  {/* Terms and Privacy */}
                  <div
                    className="text-center caption-regular text-content-secondary"
                    style={{ marginTop: "8px" }}
                  >
                    By submitting this form, you agree to the Terms of Use and
                    Privacy Policy
                  </div>
                </Form>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>

      {/* Toast Container */}
      <ToastContainer position="top-end" className="p-3">
        <ToastMessage
          showToast={showToast}
          onClose={() => setShowToast(false)}
          toastVariant={toastVariant}
          status={status}
        />
      </ToastContainer>
    </header>
  );
};

export default MainFormComp;
