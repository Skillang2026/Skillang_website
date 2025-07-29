"use client";

import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";

const AdmiEntranceComp = ({ country = "uk", countryData }) => {
  const data = countryData[country];
  const [showAll, setShowAll] = useState(false);
  const [activeKey, setActiveKey] = useState("0");
  const [isMobile, setIsMobile] = useState(false); // Initialize with false instead of window check

  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Breakpoint for mobile devices
    };

    // Set initial value after component mounts
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data || !data.admission || !data.admission.entranceExamData) {
    return <div>Admission Entrance Exam data not available</div>;
  }

  const entranceExamData = data.admission.entranceExamData;
  const displayedExams = showAll
    ? entranceExamData
    : entranceExamData.slice(0, 5);

  // Handle accordion toggle
  const handleAccordionToggle = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  // Table view for desktop
  const TableView = () => (
    <div className="table-responsive">
      <table className="edu-ranking-table caption-bold text-content-secondary">
        <thead className="">
          <tr>
            <th className="py-3 px-4" style={{ width: "25%" }}>
              Exam
            </th>
            <th className="py-3 px-4" style={{ width: "40%" }}>
              Requirement Criteria
            </th>
            <th className="py-3 px-4" style={{ width: "35%" }}>
              Required for
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedExams.map((examData) => (
            <tr key={examData.id}>
              <td className="py-3 px-4">
                <strong>{examData.exam}</strong> {examData.fullName}
              </td>
              <td className="py-3 px-4">
                <ul className="list-unstyled mb-0">
                  {examData.criteria.map((criterion, index) => (
                    <li key={index} className="mb-1">
                      <span className="me-2">•</span>
                      {criterion}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="py-3 px-4">{examData.requiredFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Accordion view for mobile
  const AccordionView = () => (
    <Accordion defaultActiveKey="1" activeKey={activeKey} className="">
      {displayedExams.map((examData, index) => (
        <Accordion.Item key={index} eventKey={String(index)}>
          <Accordion.Header
            onClick={() => handleAccordionToggle(String(index))}
            className="d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center justify-content-between w-100">
              <strong className="caption-bold">{examData.exam}</strong>
              {/* {activeKey === String(index) ? (
                <Dash size={24} />
              ) : (
                <Plus size={24} />
              )} */}
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div className="mb-3">
              <div className="caption-medium text-content-primary mb-2">
                Description
              </div>
              <p className="mb-0 paragraph-small-regular text-content-secondary">
                {examData.fullName}
              </p>
            </div>

            <div className="mb-3">
              <div className="caption-medium text-content-primary mb-2">
                Requirement Criteria
              </div>
              <ul className="mb-0 paragraph-small-regular text-content-secondary">
                {examData.criteria.map((criterion, idx) => (
                  <li key={idx} className="mb-1">
                    {criterion}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="caption-medium text-content-primary mb-2">
                Required for
              </div>
              <p className="mb-0 paragraph-small-regular text-content-secondary">
                {examData.requiredFor}
              </p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );

  return (
    <div className="entrance-exam-component">
      <div className="subheading-big-medium text-content-secondary mb-4">
        Entrance Exam Required
      </div>

      {/* Conditionally render table or accordion based on screen size */}
      <div className="d-none d-md-block">
        <TableView />
      </div>

      <div className="d-block d-md-none">
        <AccordionView />
      </div>

      {entranceExamData.length > 5 && (
        <div className="text-center mt-3">
          <button
            className="btn-secondary-outline px-4"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll
              ? "Show Less"
              : isMobile
              ? "View all Exams"
              : "View all Universities"}{" "}
            {showAll ? (
              <ChevronUp className="ms-1" />
            ) : (
              <ChevronDown className="ms-1" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdmiEntranceComp;
