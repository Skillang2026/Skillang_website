import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const SOPOverviewComp = () => {
  return (
    <Container>
      <Row className="mb-5">
        <div className="heading-big-medium">Overview</div>
      </Row>
      <Row>
        <Col md={6} className="text-content-tertiary">
          <div className="subheading-big-medium text-content-secondary">
            1. Statement of Purpose (SOP) Writing
          </div>
          <div className="mb-3">
            <div className="subheading-small-medium text-content-secondary">
              Overview
            </div>
            Your SOP is your chance to speak directly to admissions panels—share
            your story, express your passion, and demonstrate why you're the
            perfect fit for your chosen program.
          </div>
          <div>
            <div className="subheading-small-medium text-content-secondary">
              Our Services Include:
            </div>
            <ul>
              <li>
                Personalized Consultation: In-depth discussions to understand
                your academic background, career goals, and motivations.
              </li>
              <li>
                Tailored Writing: Expert writers craft a unique SOP that
                reflects your voice and personal journey.
              </li>
              <li>
                Revisions and Feedback: Iterative revisions to ensure your
                document meets both your expectations and the university's
                requirements.
              </li>
              <li>
                Final Proofreading: Comprehensive editing to produce a polished,
                error-free final document.
              </li>
            </ul>
          </div>
        </Col>
        <Col md={6} className="text-content-tertiary">
          <div className="subheading-big-medium text-content-secondary">
            2. Resume Writing
          </div>
          <div>
            <div className="subheading-small-medium text-content-secondary">
              Overview
            </div>
            A well-structured resume is key to showcasing your qualifications,
            work experience, and skills, setting you apart in competitive
            international markets.
          </div>
          <div>
            <div className="subheading-small-medium text-content-secondary">
              Our Services Include:
            </div>
            <ul>
              <li>
                Customized Resumes: Tailored to suit your academic field and the
                specific requirements of your target country.
              </li>
              <li>
                Highlighting Key Achievements: Emphasis on your most relevant
                accomplishments and skills.
              </li>
              <li>
                Formatting and Design: Ensuring your resume is both content-rich
                and visually appealing, adhering to international standards.
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SOPOverviewComp;
