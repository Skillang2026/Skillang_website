import React from "react";
import "./CourseFeeInfoComp.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CashStack } from "react-bootstrap-icons";
import { FaExternalLinkAlt } from "react-icons/fa";

// Fixed paths - corrected based on your actual file structure
const CourseInfoNurseImage =
  "assets/images/nursing/nurse-course-info-image.png";
const ArrowIcon = "assets/icons/nurse/ArrowIcon.svg";
const OnlineIcon = "assets/icons/nurse/online.svg";
const OfflineIcon = "assets/icons/nurse/offline.svg";
const AdditionalIcons = "assets/icons/nurse/additionalServices.svg";

const CourseFeeInfoComp = () => {
  return (
    <div>
      <Container className="course-fee-info-card d-flex justify-content-center">
        <Row className="d-flex justify-content-center">
          <Col
            sm={12}
            xs={12}
            md={12}
            lg={7}
            className="d-flex flex-column justify-content-center px-lg-5 p-3 py-lg-5"
          >
            <div className="heading-small-medium mb-3">
              German Language Program for Nurses
            </div>
            <div className="subheading-small-medium comfeeinfo-badge mb-2 d-flex flex-row gap-2 ">
              <CashStack />
              <span className="text-primary-inverse caption-medium">
                Full Fee Reimbursement *
              </span>
            </div>
            <div className="mb-3 text-content-secondary">
              Your dream deserves support, not stress - get your German Language
              Program fee reimbursed on successful migration to Germany via
              Skillang Careers and our trusted partners.
            </div>
            <div className="courseinfo-box">
              <img src={ArrowIcon} alt="Arrow Icon" />
              <div className="d-flex align-items-end justify-content-between">
                <div>
                  <span className="subheading-big-medium">
                    Pay fees of Rs 99,000{" "}
                    <span className="caption-regular">( Excluding GST )</span>
                  </span>
                  <div className="paragraph-small-medium">
                    Installment and Loan options available.
                  </div>
                </div>
                {/* <div className="">
                  <Button className="d-flex align-items-center gap-2">
                    <FaExternalLinkAlt />
                    Pay Now
                  </Button>
                </div> */}
              </div>
            </div>
            <div className="mb-2">
              <Row className="g-2">
                <Col md={6} xs={12} sm={12}>
                  <div className="courseinfo-box d-flex">
                    <img src={OnlineIcon} alt="Online Icon" />
                    <div className="subheading-big-medium">
                      A1 - A2{" "}
                      <span className="caption-regular">
                        ( Online: 3 Months )
                      </span>
                    </div>
                  </div>
                </Col>
                <Col md={6} xs={12} sm={12}>
                  <div className="courseinfo-box d-flex">
                    <img src={OfflineIcon} alt="Offline Icon" />
                    <div className="subheading-big-medium">
                      B1 - B2{" "}
                      <span className="caption-regular">
                        ( Offline: 6 to 8 Months )
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="comfeeinfo-box w-100">
              <div className="d-flex align-items-center justify-content-start mb-1">
                <img
                  src={AdditionalIcons}
                  alt="Additional Services Icon"
                  className="me-2"
                />
                <span className="subheading-small-medium ">
                  Additional Assistance service for free.
                </span>
              </div>
              <div className="paragraph-small-regular text-content-tertiaryInverse">
                Pedagogy, LMS access, interactive live sessions, mock
                interviews, flashcards, gamified learning, medical terminology,
                cultural integration, recruiter interactions, Job matching,
                document management, visa assistance, skill recognition, housing
                support, guided tours, career mentorship
              </div>
            </div>
            <div className="caption-regular mt-4 text-content-secondary">
              * T&C apply
            </div>
          </Col>
          <Col
            sm={0}
            xs={0}
            md={0}
            lg={5}
            className="d-none d-lg-flex align-items-end justify-content-end "
          >
            <img
              src={CourseInfoNurseImage}
              alt="German Language Program for Nurses"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CourseFeeInfoComp;
