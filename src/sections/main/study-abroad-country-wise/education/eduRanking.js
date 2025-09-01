"use client";

import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import {
  CaretDownFill,
  CaretUpFill,
  ArrowDown,
  ChevronDown,
  ChevronUp,
} from "react-bootstrap-icons";
import "./education.css";

const EduRankingComp = ({ country = "uk", countryData }) => {
  const [showAll, setShowAll] = useState(false);
  const data = countryData[country];
  if (!data || !data.education || !data.education.universityRankings) {
    return <div>University ranking data not available</div>;
  }
  const universityRankings = data.education.universityRankings;
  const displayedUniversities = showAll
    ? universityRankings
    : universityRankings.slice(0, 6);

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <div className="subheading-big-medium text-content-secondary">
            {data.shortForm} University Rankings
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="table-responsive">
            <table className="edu-ranking-table caption-bold text-content-secondary">
              <thead className="">
                <tr>
                  <th className="py-3 px-4">University</th>
                  <th className="py-3 px-4 text-center">
                    QS World Ranking 2025 <ArrowDown className="ms-1" />
                  </th>
                  <th className="py-3 px-4 text-center d-none d-md-table-cell">
                    QS World Ranking 2024
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedUniversities.map((university, index) => (
                  <tr key={index} className={index % 2 === 0 ? "" : "grey-200"}>
                    <td className="py-3 px-4">{university.name}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="d-flex align-items-center justify-content-center">
                        <div
                          style={{
                            width: "100px",
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div className="me-3 uni-rank-text text-content-secondary">
                            {university.ranking2025}
                          </div>
                          {university.change > 0 && (
                            <span className="rank-success-pill px-2 py-1 rounded">
                              <CaretUpFill className="me-1" />
                              {university.change}
                            </span>
                          )}
                          {university.change < 0 && (
                            <span className="rank-danger-pill px-2 py-1 rounded">
                              <CaretDownFill className="me-1" />
                              {Math.abs(university.change)}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center d-none d-md-table-cell">
                      {university.ranking2024}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-3">
            <button
              className="btn-secondary-outline px-4"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View all Universities"}{" "}
              {showAll ? (
                <ChevronUp className="ms-1" />
              ) : (
                <ChevronDown className="ms-1" />
              )}
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EduRankingComp;
