"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Form,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import useFormHandler from "../../../../hooks/useFormHandler";
import ToastMessage from "../../../../utils/toast";
import "./partnerWithUsPopUp.css";

const consultationImage = "/assets/images/reusable/partner-popup.jpg";

// Added defaultType as a prop with "Institution" as the fallback default
const PartnerWithUsPopUpModal = ({
  show,
  handleClose,
  defaultType = "Institution",
}) => {
  const {
    partnerFormData,
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
    handlePartnerSubmit,
    handlePartnerInputChange,
    handleOtpChange,
    handleVerifyOtp,
    handleResendOtp,
    submitPartnershipInquiry,
    setOtp,
    setShowToast,
    setFormType,
  } = useFormHandler();

  const [currentStep, setCurrentStep] = useState(1);

  // Set the form type to 'partner' on component mount
  useEffect(() => {
    if (show) {
      setFormType("partner");
      handlePartnerInputChange({
        target: {
          name: "type",
          value: defaultType, // Use the default type from props
        },
      });
    }

    // Reset state when modal is closed
    return () => {
      if (!show) {
        setCurrentStep(1);
        setOtp("");
      }
    };
  }, [show, setFormType, defaultType]); // Added defaultType to dependencies

  // Move to step 2 when OTP is sent
  useEffect(() => {
    if (isOtpSent) {
      setCurrentStep(2);
    }
  }, [isOtpSent]);

  // Function to handle option selection
  const handleOptionClick = (option) => {
    handlePartnerInputChange({
      target: {
        name: "type",
        value: option,
      },
    });
  };

  // Handle modal close with cleanup
  const onModalClose = () => {
    setCurrentStep(1);
    handleClose();
  };

  // Only render the component when show is true
  if (!show) {
    return null;
  }

  return (
    <Modal
      show={show}
      onHide={onModalClose}
      centered
      dialogClassName="modal-90w"
      size="lg"
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        {currentStep !== 1 && (
          <Button
            variant="link"
            className="p-0 me-2 text-dark"
            onClick={() => setCurrentStep(1)}
            aria-label="Go back"
          >
            <i className="bi bi-arrow-left" style={{ fontSize: "1.2rem" }}></i>
          </Button>
        )}
        <Modal.Title className="subheading- -medium">
          {currentStep === 1 ? "Book a Free Consultation" : "Verify Email"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Row>
          <Col md={6} className="p-0 d-none d-md-block">
            <img
              src={consultationImage}
              alt="Consultation"
              className="img-fluid h-100 w-100 object-fit-contain"
              style={{ maxHeight: "500px" }}
            />
          </Col>
          <Col md={6} className="px-5">
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
                  onSubmit={handlePartnerSubmit}
                >
                  <Form.Group className="mb-3 text-center d-flex justify-content-center">
                    <div className="d-flex gap-2 flex-wrap">
                      {["Institution", "Company", "Recruiter"].map(
                        (option, index) => (
                          <div
                            key={index}
                            className={`experience-option ${
                              partnerFormData.type === option ? "selected" : ""
                            }`}
                            onClick={() => handleOptionClick(option)}
                          >
                            <label
                              className="w-100 m-0 caption-regular"
                              style={{ cursor: "pointer" }}
                            >
                              {option}
                            </label>
                            <input
                              type="radio"
                              id={`looking-for-${index}`}
                              name="type"
                              value={option}
                              checked={partnerFormData.type === option}
                              onChange={handlePartnerInputChange}
                              hidden
                              required
                            />
                          </div>
                        )
                      )}
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      className="border-0"
                      value={partnerFormData.name}
                      onChange={handlePartnerInputChange}
                      required
                      minLength={3}
                      maxLength={40}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your name (3-40 characters)
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="tel"
                      placeholder="Mobile"
                      name="phone"
                      value={partnerFormData.phone}
                      onChange={handlePartnerInputChange}
                      required
                      pattern="[0-9]{10}"
                      title="Please enter a valid 10-digit phone number"
                      maxLength={10}
                    />
                    <Form.Control.Feedback type="invalid" className="m-0 p-0">
                      Please enter a valid 10-digit phone number
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={partnerFormData.email}
                      onChange={handlePartnerInputChange}
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      title="Please enter a valid email address"
                      maxLength={50}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formCompany">
                    <Form.Control
                      type="text"
                      placeholder="Company/Institution Name"
                      name="companyName"
                      className="border-0"
                      value={partnerFormData.companyName}
                      onChange={handlePartnerInputChange}
                      required
                      minLength={3}
                      maxLength={40}
                    />
                    <Form.Control.Feedback type="invalid">
                      Company name must be between 3-40 characters
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Select
                      aria-label="Select Designation"
                      name="designation"
                      value={partnerFormData.designation}
                      className="custom-select"
                      onChange={handlePartnerInputChange}
                      required
                    >
                      <option value="">Select Designation</option>
                      {[
                        "Chief Executive Officer",
                        "Chief Financial Officer",
                        "Chief Operating Officer",
                        "Chief Technology Officer",
                        "Chief Marketing Officer",
                        "Vice president",
                        "General counsel",
                        "Managing director",
                        "Manager",
                        "Project manager",
                        "Senior management",
                        "Assistant Manager",
                        "Chief compliance officer",
                        "General Manager",
                        "HR Manager",
                        "Account Executive",
                        "Android Developer",
                        "Associate",
                        "Business Analyst",
                        "Business Development Manager",
                        "Chief digital officer",
                        "Director of Operations",
                        "Head Of Legal Affairs (Clo)",
                      ].map((designation, index) => (
                        <option key={index} value={designation}>
                          {designation}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <div className="d-grid">
                    <Button type="submit" className="btn-primary py-2">
                      Get Started
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
            ) : (
              /* Step 2: OTP Verification */
              <>
                <div className="text-center subheading-big-medium mb-1">
                  We've sent you an OTP on
                </div>
                <div className="d-flex justify-content-center align-items-center mb-4">
                  <div className="text-center paragraph-small-medium">
                    {partnerFormData.email}
                  </div>
                  <Button
                    variant="link"
                    className="text-decoration-none p-0 ms-2"
                    onClick={() => setCurrentStep(1)}
                  >
                    <div className="text-content-primary-accent">Edit</div>
                  </Button>
                </div>

                <Form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const success = await handleVerifyOtp();
                    if (success) {
                      await submitPartnershipInquiry();
                      setTimeout(() => {
                        setCurrentStep(1);
                        onModalClose();
                      }, 2000);
                    }
                  }}
                >
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter your OTP"
                      value={otp}
                      onChange={handleOtpChange}
                      required
                      maxLength={4}
                    />
                  </Form.Group>

                  <div className="text-center mb-4">
                    <div className="mb-2 text-content-secondary">
                      Didn't receive an OTP?
                    </div>
                    <Button
                      variant="link"
                      className={`text-decoration-none p-0 ${
                        resendDisabled
                          ? "text-muted"
                          : "text-content-primary-accent"
                      }`}
                      onClick={!resendDisabled ? handleResendOtp : undefined}
                      disabled={resendDisabled}
                    >
                      {resendDisabled
                        ? `Resend in ${countdown} sec`
                        : "Resend OTP"}
                    </Button>
                  </div>

                  <div className="d-grid">
                    <Button type="submit" className="btn-primary py-2">
                      Submit
                    </Button>
                  </div>
                </Form>
              </>
            )}
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

export default PartnerWithUsPopUpModal;
