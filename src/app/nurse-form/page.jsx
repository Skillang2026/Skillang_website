"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ProgressBar,
  Toast,
  ToastContainer,
  Spinner,
} from "react-bootstrap";
import FormRadioButton from "../../components/buttons/from-radio-buttons/FormRadioButton";
import useFormHandler from "../../hooks/useFormHandler";
import "./NurseFormPage.css";

// Toast Message Component
const ToastMessage = ({ showToast, onClose, toastVariant, status }) => {
  useEffect(() => {
    if (showToast) {
      const audioPath =
        toastVariant === "success"
          ? "/sounds/success.mp3"
          : "/sounds/rejected.mp3";

      const sound = new Audio(audioPath);
      sound.play().catch((error) => {
        // console.log("Audio play failed:", error);
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

const NurseFormPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Using the form handler hook
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

  const totalSteps = 7;

  // Set default values for nurse form
  useEffect(() => {
    handleOptionSelect("lookingFor", "Nursing Abroad");
    handleOptionSelect("origin", "Nurse Form landing Page");
    handleOptionSelect("pincode", "-");
  }, []);

  // ✅ SIMPLE: Watch for form data reset (which happens on successful submission)
  useEffect(() => {
    // If form data is reset (name is empty) and we're not on step 1, go back to step 1
    if (formData.name === "" && currentStep !== 1) {
      // console.log("✅ Form data reset detected, returning to step 1");
      setCurrentStep(1);
    }
  }, [formData.name, currentStep]);

  const handleNext = () => {
    if (currentStep < totalSteps && isStepValid()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // ✅ SIMPLE: Watch for form data reset (which happens on successful submission)
  useEffect(() => {
    // If form data is reset (name is empty) and we're not on step 1, go back to step 1
    if (formData.name === "" && currentStep !== 1) {
      // console.log("✅ Form data reset detected, returning to step 1");
      setCurrentStep(1);
    }
  }, [formData.name, currentStep]);

  // ✅ CLEAN: handleNurseSubmit
  const handleNurseSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false || !isStepValid()) {
      e.stopPropagation();
      return;
    }

    setIsLoading(true);

    try {
      // Call the hook's handleSubmit function
      // The hook will reset formData on successful submission
      await handleSubmit(e);
    } catch (error) {
      console.error("❌ Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.name.trim() !== "" &&
          formData.phone.trim() !== "" &&
          formData.email.trim() !== ""
        );
      case 2:
        return formData.qualification !== "";
      case 3:
        return formData.experience !== "";
      case 4:
        return formData.age !== "";
      case 5:
        return formData.germanStatus !== "";
      case 6:
        return formData.startPlanning !== "";
      case 7:
        return formData.callBack !== "";
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h4 className="mb-4 text-center text-content-secondary subheading-small-medium">
              Personal Information
            </h4>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                size="md"
                className="rounded-3"
                required
                minLength={3}
                maxLength={40}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Number *</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                size="md"
                className="rounded-3"
                required
                pattern="[0-9]{10}"
                minLength={10}
                maxLength={10}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Email ID *</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                size="md"
                className="rounded-3"
                required
                minLength={3}
                maxLength={50}
              />
            </Form.Group>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h4 className="mb-4 text-center text-content-secondary subheading-small-medium">
              Current Qualification
            </h4>
            <FormRadioButton
              label="What is your Current qualification? *"
              options={[
                "B.sc Nursing",
                "GNM",
                "Msc Nursing",
                "Student",
                "Other",
              ]}
              name="qualification"
              value={formData.qualification}
              onChange={(value) =>
                handleInputChange({
                  target: { name: "qualification", value: value },
                })
              }
              controlId="formQualification"
              labelClassName="fw-bold mb-3"
              optionClassName="fs-6"
            />
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h4 className="mb-4 text-center text-content-secondary subheading-small-medium">
              Years of Experience
            </h4>
            <FormRadioButton
              label="Years of Experience? *"
              options={[
                "No experience",
                "1 - 3 years",
                "3 - 5 years",
                "5+ years",
              ]}
              name="experience"
              value={formData.experience}
              onChange={(value) =>
                handleInputChange({
                  target: { name: "experience", value: value },
                })
              }
              controlId="formExperience"
              labelClassName="fw-bold mb-3"
              optionClassName="fs-6"
            />
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h4 className="mb-4 text-center text-content-secondary subheading-small-medium">
              Age Information
            </h4>
            <FormRadioButton
              label="Age as on date *"
              options={["18 - 25", "25 - 30", "30 - 35", "35+"]}
              name="age"
              value={formData.age}
              onChange={(value) =>
                handleInputChange({
                  target: { name: "age", value: value },
                })
              }
              controlId="formAge"
              labelClassName="fw-bold mb-3"
              optionClassName="fs-6"
            />
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <h4 className="mb-4 text-center text-content-secondary subheading-small-medium">
              German Language Status
            </h4>
            <FormRadioButton
              label="German language Status? *"
              options={["Not yet started", "On going", "Completed"]}
              name="germanStatus"
              value={formData.germanStatus}
              onChange={(value) =>
                handleInputChange({
                  target: { name: "germanStatus", value: value },
                })
              }
              controlId="formGermanStatus"
              labelClassName="fw-bold mb-3"
              optionClassName="fs-6"
            />
          </div>
        );

      case 6:
        return (
          <div className="step-content">
            <h4 className="mb-4 text-center text-content-secondary subheading-small-medium">
              Planning Timeline
            </h4>
            <FormRadioButton
              label="When are you planning to start the process? *"
              options={["Immediately", "After 1 month", "Later"]}
              name="startPlanning"
              value={formData.startPlanning}
              onChange={(value) =>
                handleInputChange({
                  target: { name: "startPlanning", value: value },
                })
              }
              controlId="formStartPlanning"
              labelClassName="fw-bold mb-3"
              optionClassName="fs-6"
            />
          </div>
        );

      case 7:
        return (
          <div className="step-content">
            <h4 className="mb-4 text-center text-content-secondary subheading-small-medium">
              Call Back Preference
            </h4>
            <FormRadioButton
              label="When do you expect a Call Back? *"
              options={["Morning", "Afternoon", "Evening"]}
              name="callBack"
              value={formData.callBack}
              onChange={(value) =>
                handleInputChange({
                  target: { name: "callBack", value: value },
                })
              }
              controlId="formCallBack"
              labelClassName="fw-bold mb-3"
              optionClassName="fs-6"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="form-container">
              <Card.Body className="">
                {/* Header */}
                <div className="text-center mb-4">
                  <h3 className="suheading-big-medium mb-2 text-primary-color">
                    Nursing Application Form
                  </h3>
                  <p className="paragraph-big-medium text-content-tertiary mb-0">
                    Please fill out all the required information
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="text-content-secondary caption-bold">
                      Step {currentStep} of {totalSteps}
                    </small>
                    <small className="text-content-secondary caption-bold">
                      {Math.round((currentStep / totalSteps) * 100)}%
                    </small>
                  </div>
                  <ProgressBar
                    now={(currentStep / totalSteps) * 100}
                    style={{ height: "8px" }}
                    className="mb-3 rounded-pill"
                    variant="primary"
                  />
                </div>

                {/* Step Content */}
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={handleNurseSubmit}
                >
                  <div className="mb-4 step-container">{renderStep()}</div>

                  {/* Navigation Buttons */}
                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <Button
                      variant="outline-secondary"
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className="rounded-4"
                      size="md"
                    >
                      ← Previous
                    </Button>

                    {currentStep < totalSteps ? (
                      <Button
                        variant="primary"
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        className=" rounded-4"
                        size="md"
                      >
                        Next →
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={!isStepValid() || isLoading}
                        className=" rounded-4"
                        size="md"
                      >
                        {isLoading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-2"
                            />
                            Submitting...
                          </>
                        ) : (
                          "Submit ✓"
                        )}
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
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
    </div>
  );
};

export default NurseFormPage;
