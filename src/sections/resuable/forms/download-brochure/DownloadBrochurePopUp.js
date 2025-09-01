"use client";

import "./DownloadBrochurePopUp.css";
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
import ToastMessage from "../../../../utils/toast";
import useFormHandler from "../../../../hooks/useFormHandler";
import { HiOutlineDownload } from "react-icons/hi";

const consultationImage = "/assets/images/reusable/download-popup.jpg";

const DownloadBrochurePopUp = ({ showModal, handleCloseModal }) => {
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

  // State to track current step (1: form, 3: Calendly)
  const [currentStep, setCurrentStep] = useState(1);
  const [formIsValid, setFormIsValid] = useState(false);

  // Handle modal form submission
  const handleModalFormSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // Move to next step if form is valid
      setCurrentStep(3);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      centered
      dialogClassName="modal-90w"
      size="lg"
      aria-labelledby="consultation-modal"
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
          <Col
            md={6}
            className="p-5 d-flex justify-content-between"
            style={{ minHeight: "500px" }}
          >
            {currentStep === 1 ? (
              /* Step 1: Initial Form */
              <>
                <div>
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
                    <div>
                      <div className="d-grid">
                        <Button type="submit" className="btn-primary py-2">
                          <HiOutlineDownload
                            className="me-2"
                            style={{ width: "24px", height: "auto" }}
                          />
                          Download Brochure
                        </Button>
                      </div>
                      <div className="text-center text-muted mt-3 small">
                        By submitting this form, you agree to the{" "}
                        <a
                          href="/terms-of-use"
                          className="text-decoration-none"
                        >
                          Terms of Use
                        </a>{" "}
                        and{" "}
                        <a
                          href="/privacy-policy"
                          className="text-decoration-none"
                        >
                          Privacy Policy
                        </a>
                      </div>
                    </div>
                  </Form>
                </div>
              </>
            ) : (
              /* Step 3: Calendly Button/Link */
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
                          setTimeout(() => handleCloseModal(), 500);
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
                          setTimeout(() => handleCloseModal(), 500);
                        }
                      }}
                    >
                      Schedule Your Consultation
                    </Button>
                  </div>
                </div>
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

export default DownloadBrochurePopUp;
