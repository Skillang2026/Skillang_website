"use client";

import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Form, Button, ToastContainer } from "react-bootstrap";
import "./LeadFormCalendly.css";
import useFormHandler from "../../../../hooks/useFormHandler";
import ToastMessage from "../../../../utils/toast";
import FormRadioButton from "@/components/buttons/from-radio-buttons/FormRadioButton";

const consultationImage = "/assets/images/reusable/consult-popup.jpg";

// Updated component that uses Calendly Popup Widget instead of Inline Widget
const ConsultationModal = ({
  show,
  handleClose,
  showCalendly = true,
  lookingFor = null,
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
    setFormData,
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
  formData.origin = "Calendly Form";
  formData.pincode = "No applicable";
  formData.lookingFor = lookingFor;

  // State to track current step (1: form, 3: Calendly)
  const [currentStep, setCurrentStep] = useState(1);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);

  // Load Calendly script on component mount only if showCalendly is true
  useEffect(() => {
    if (!showCalendly) return; // Skip loading Calendly if not needed

    // Check if Calendly script is already loaded
    if (!document.getElementById("calendly-script")) {
      // Create script element for Calendly
      const script = document.createElement("script");
      script.id = "calendly-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        // console.log("Calendly script loaded successfully");
      };
      script.onerror = () => {
        console.error("Failed to load Calendly script");
      };
      document.body.appendChild(script);
    }

    // Add Calendly stylesheet for direct integration
    if (!document.getElementById("calendly-stylesheet")) {
      const link = document.createElement("link");
      link.id = "calendly-stylesheet";
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // Clean up function - we don't remove the script to avoid issues if
    // other components use Calendly
    return () => {};
  }, [showCalendly]);

  // Set the lookingFor value when the modal opens
  useEffect(() => {
    if (show && lookingFor) {
      handleOptionSelect("lookingFor", lookingFor);
    }
  }, [show, lookingFor]);

  // Watch for successful form submission when showCalendly is false
  useEffect(() => {
    // Check for successful submission by looking at form reset AND toast showing
    const isFormReset = !formData.name && !formData.email && !formData.phone;

    // Debug log - REMOVE THIS AFTER TESTING
    console.log("Debug Modal Submission:", {
      isFormReset,
      showCalendly,
      isSubmitting,
      submissionComplete,
      formData: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
    });

    if (isFormReset && !showCalendly && isSubmitting && !submissionComplete) {
      console.log("SUCCESS: Detected successful submission");

      // Stop the spinner and mark as complete
      setIsSubmitting(false);
      setSubmissionComplete(true);
    }
  }, [
    formData.name,
    formData.email,
    formData.phone,
    showCalendly,
    isSubmitting,
    submissionComplete,
  ]);

  // Separate useEffect for closing modal after submission
  useEffect(() => {
    if (submissionComplete && !showCalendly) {
      console.log("Setting timer to close modal");
      const timer = setTimeout(() => {
        console.log("Timer executing: calling handleClose");
        handleClose();
      }, 3000);

      return () => {
        console.log("Cleaning up close timer");
        clearTimeout(timer);
      };
    }
  }, [submissionComplete, showCalendly]);

  // Modified useEffect to handle different flows based on showCalendly
  useEffect(() => {
    if (formIsValid && isOtpSent && showCalendly) {
      // Only proceed to Calendly if showCalendly is true
      setCurrentStep(3);
    }
  }, [formIsValid, isOtpSent, showCalendly]);

  // Reset states when modal closes
  useEffect(() => {
    if (!show) {
      setIsSubmitting(false);
      setSubmissionComplete(false);
      setCurrentStep(1);
      setFormIsValid(false);
    }
  }, [show]); // Removed handleClose from dependencies

  // Function to open Calendly popup
  const openCalendlyPopup = () => {
    // Make sure Calendly is loaded by checking at interval
    const maxAttempts = 10;
    let attempts = 0;

    const tryOpenCalendly = () => {
      attempts++;
      // console.log(`Attempt ${attempts} to open Calendly`);

      if (window.Calendly) {
        // Calendly is loaded, open the popup
        // console.log("Opening Calendly popup");

        // Initialize Calendly - IMPORTANT: Don't close modal immediately
        window.Calendly.initPopupWidget({
          url: "https://calendly.com/skillang/20min",
          // Optional settings
          prefill: {
            name: formData.name,
            email: formData.email,
            customAnswers: {
              a1: formData.phone,
              a2: formData.lookingFor,
            },
          },
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "#3f62b0", // Adjust to your primary brand color
        });

        // Only close modal after a brief delay to ensure Calendly popup is properly initialized
        setTimeout(() => {
          // console.log("Closing modal after Calendly popup initialization");
          handleClose();
        }, 500);
      } else if (attempts < maxAttempts) {
        // Calendly not loaded yet, try again after a short delay
        // console.log("Calendly not loaded yet, trying again...");
        setTimeout(tryOpenCalendly, 500);
      } else {
        // Max attempts reached, show error
        console.error("Failed to load Calendly after multiple attempts");
        setShowToast(true);
        status.current = {
          message: "Unable to load scheduling system. Please try again later.",
          title: "Error",
        };
        toastVariant.current = "danger";
      }
    };

    // Start trying to open Calendly
    tryOpenCalendly();
  };

  // Modify the form submission handler
  const handleModalFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Check form validity first
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    // Check if all required fields are filled
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.qualification
    ) {
      return;
    }

    setFormIsValid(true);

    if (showCalendly) {
      // Normal flow - call handleSubmit and proceed to Calendly step
      handleSubmit(e);
      setCurrentStep(3);
    } else {
      // Mark as submitting and call handleSubmit
      setIsSubmitting(true);
      handleSubmit(e);

      // Fallback: if form doesn't close in 10 seconds, force close
      setTimeout(() => {
        if (isSubmitting) {
          console.log("Fallback: Force closing modal after 10 seconds");
          handleClose();
        }
      }, 10000);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="modal-90w"
      size="lg"
      aria-labelledby="consultation-modal"
    >
      <Modal.Header closeButton>
        {currentStep !== 1 && showCalendly && (
          <Button
            variant="link"
            className="p-0 me-2 text-dark"
            onClick={() => setCurrentStep(1)}
            aria-label="Go back"
          >
            <i className="bi bi-arrow-left" style={{ fontSize: "1.2rem" }}></i>
          </Button>
        )}
        <Modal.Title className="subheading-medium">
          {currentStep === 1
            ? "Book a Free Consultation"
            : "Schedule Consultation"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Row className="modal-row">
          <Col md={6} className="p-0 d-none d-md-block">
            <img
              src={consultationImage}
              alt="Consultation"
              className="img-fluid h-100 w-100 object-fit-contain"
              style={{ maxHeight: "500px" }}
            />
          </Col>
          <Col md={6} className="p-5" style={{ minHeight: "500px" }}>
            {currentStep === 1 ? (
              /* Step 1: Initial Form */
              <>
                <div className="text-center subheading-big-medium mb-1">
                  Connect with Us!
                </div>
                <div className="paragraph-big-medium text-content-secondary text-center text-muted mb-4">
                  Tell us more about yourself
                </div>

                <Form
                  noValidate
                  validated={validated}
                  onSubmit={handleModalFormSubmit}
                >
                  <Form.Group className="" controlId="formName">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      className="border-0"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      minLength={3}
                      maxLength={40}
                    />
                  </Form.Group>
                  <Form.Group className="border-0">
                    <Form.Control
                      type="tel"
                      placeholder="Mobile"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      minLength={10}
                      maxLength={10}
                      pattern="[0-9]{10}"
                    />
                  </Form.Group>
                  <Form.Group className="">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      className=""
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      minLength={10}
                      maxLength={50}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <FormRadioButton
                      label="Highest Qualification"
                      options={["In Graduation", "Graduate", "Post Graduate"]}
                      name="qualification"
                      value={formData.qualification}
                      onChange={(value) =>
                        handleInputChange({
                          target: { name: "qualification", value: value },
                        })
                      }
                      controlId="formQualification"
                      labelClassName="text-start paragraph-small-regular text-content-secondary"
                      optionClassName=""
                    />
                  </Form.Group>
                  <div className="d-grid">
                    <Button
                      type="submit"
                      className="btn-primary py-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Submitting...
                        </>
                      ) : showCalendly ? (
                        "Get Started"
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                  <div className="text-center text-muted mt-3 small">
                    By submitting this form, you agree to the{" "}
                    <a href="/terms-of-use" className="text-decoration-none">
                      Terms of Use
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" className="text-decoration-none">
                      Privacy Policy
                    </a>
                  </div>
                </Form>
              </>
            ) : showCalendly ? (
              /* Step 3: Calendly Button/Link - only show if showCalendly is true */
              <>
                <div className="text-center">
                  <div className="subheading-big-medium mb-3">
                    You're Almost There!
                  </div>
                  <p className="paragraph-small-medium text-content-secondary mb-4">
                    Click the button below to schedule your consultation with
                    one of our experts.
                  </p>

                  <div className="d-grid gap-3">
                    {/* Alternative: Use Calendly popup if available */}
                    <Button
                      className="btn-outline-primary py-2"
                      onClick={() => {
                        // console.log("Attempting to open Calendly popup");
                        if (
                          window.Calendly &&
                          typeof window.Calendly.initPopupWidget === "function"
                        ) {
                          window.Calendly.initPopupWidget({
                            url: "https://calendly.com/skillang/20min",
                            prefill: {
                              name: formData.name,
                              email: formData.email,
                              customAnswers: {
                                a1: formData.phone,
                                a2: formData.lookingFor,
                              },
                            },
                          });
                          setTimeout(() => handleClose(), 500);
                        } else {
                          console.error(
                            "Calendly popup function not available"
                          );
                          // Fallback to opening in new tab
                          window.open(
                            `https://calendly.com/skillang/20min?name=${encodeURIComponent(
                              formData.name
                            )}&email=${encodeURIComponent(
                              formData.email
                            )}&a1=${encodeURIComponent(
                              formData.phone
                            )}&a2=${encodeURIComponent(
                              formData.lookingFor || ""
                            )}`,
                            "_blank"
                          );
                          setTimeout(() => handleClose(), 500);
                        }
                      }}
                    >
                      Schedule Your Consultation
                    </Button>
                  </div>
                </div>
              </>
            ) : null}
          </Col>
        </Row>
      </Modal.Body>
      <ToastContainer position="top-end" className="p-3">
        <ToastMessage
          showToast={showToast}
          onClose={() => setShowToast(false)}
          toastVariant={toastVariant}
          status={status}
        />
      </ToastContainer>
    </Modal>
  );
};

export default ConsultationModal;
