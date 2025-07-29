"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import useFormHandler from "../../../../hooks/useFormHandler";
import "./ContactUsHeader.css";

const ToastMessage = ({ showToast, onClose, toastVariant, status }) => {
  useEffect(() => {
    if (showToast) {
      // ✅ NEW - Using public folder paths directly
      const audioPath =
        toastVariant === "success"
          ? "/sounds/success.mp3" // Public folder path
          : "/sounds/rejected.mp3"; // Public folder path

      const sound = new Audio(audioPath);

      // ✅ IMPROVED - Added error handling for audio play
      sound.play().catch((error) => {
        // console.log("Audio play failed:", error);
        // This is normal - browsers require user interaction before playing audio
      });
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

const ContactUsHeader = () => {
  // Local state to manage the query/lookingFor field
  const [query, setQuery] = useState("");

  const {
    formData,
    showToast,
    toastVariant,
    status,
    validated,
    handleInputChange,
    handleOptionSelect,
    handleSubmit,
    setShowToast,
  } = useFormHandler();

  useEffect(() => {
    // Initialize required form fields with their default values
    handleOptionSelect("experience", "Not Applicable");
    handleOptionSelect("county", "Not Applicable ");
    handleOptionSelect("origin", "Contact Us Form");
    handleOptionSelect("pincode", "Not Applicable ");

    // Important: Initialize lookingFor with empty string
    // to avoid undefined errors during validation
    handleOptionSelect("lookingFor", "");
  }, []);

  // Handle all input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for textarea query to map to lookingFor
    if (name === "query") {
      setQuery(value); // Update local state
      handleOptionSelect("lookingFor", value); // Update in form handler
    } else {
      handleInputChange(e);
    }
  };

  // Form submission handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Update lookingFor one more time to ensure it's set
    handleOptionSelect("lookingFor", query);
    // Call the handleSubmit function from the hook
    handleSubmit(e);
  };

  return (
    <div>
      <Container className="pt-3">
        <Row>
          <Col md={8} xs={12} sm={12}>
            <h1 className="heading-big-medium mb-3">Contact Us</h1>
            <div className="paragraph-big-medium text-content-secondary">
              <div>
                Email, call or complete the form to learn how we can help you.
              </div>
              <div>support@skillang.com</div>
              <div>+91 - 7200 630 336</div>
            </div>
            <Row className="mt-5">
              <Col sm={12} xs={12} md={4}>
                <h4 className="paragraph-big-medium">Customer Support</h4>
                <div className="text-content-secondary">
                  Our support team is available around the clock to address any
                  concerns or queries you may have.
                </div>
              </Col>
              <Col sm={12} xs={12} md={4} className="my-4 my-md-0">
                <h4 className="paragraph-big-medium">Feedback & Suggestions</h4>
                <div className="text-content-secondary">
                  We value your feedback & are continuously working to improve
                  us. Your input is crucial in shaping the our future.
                </div>
              </Col>
              <Col sm={12} xs={12} md={4}>
                <h4 className="paragraph-big-medium">Study Abroad Inquiry</h4>
                <div className="text-content-secondary">
                  If you have questions about studying abroad, our team is here
                  to help.
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={4} xs={12} sm={12}>
            <Container className="d-flex align-items-center justify-content-center flex-column mt-4 mt-md-0 p-0">
              <div className="form-container m-0">
                <div
                  className="subheading-small-medium text-center"
                  style={{ marginBottom: "8px" }}
                >
                  Get in Touch
                </div>
                <div className="text-center paragraph-small-regular text-content-tertiary mb-3">
                  You can reach us anytime.
                </div>

                <Form
                  noValidate
                  validated={validated}
                  onSubmit={handleFormSubmit}
                >
                  <Form.Group className="" controlId="formName">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleChange}
                      required
                      minLength={3}
                      maxLength={40}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your name (3-40 characters).
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="" controlId="formEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      required
                      minLength={3}
                      maxLength={50}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formNumber">
                    <Form.Control
                      type="tel"
                      placeholder="Mobile"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{10}"
                      minLength={10}
                      maxLength={10}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid 10-digit mobile number.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="" controlId="formQuery">
                    <Form.Control
                      as="textarea"
                      placeholder="Tell us how we can help..."
                      rows={3}
                      name="query"
                      value={query}
                      onChange={handleChange}
                      required
                      minLength={3}
                      maxLength={100}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please describe how we can help you (3-100 characters).
                    </Form.Control.Feedback>
                  </Form.Group>

                  <button className="btn-primary" type="submit">
                    Submit
                  </button>
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

export default ContactUsHeader;
