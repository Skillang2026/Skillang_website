"use client";

import React, { useState, useRef, useEffect } from "react";
import { Container, Col, Row, Card, CardBody, CardImg } from "react-bootstrap";
import "./TypesAndEligiblity.css";

const loan1 =
  "../../../../assets/images/education-loan/TypesOfEduLoan/loan1.svg";
const loan2 =
  "../../../../assets/images/education-loan/TypesOfEduLoan/loan2.svg";
const loan3 =
  "../../../../assets/images/education-loan/TypesOfEduLoan/loan3.svg";
const loan4 =
  "../../../../assets/images/education-loan/TypesOfEduLoan/loan4.svg";

const TypesEduLoanData = [
  {
    title: "Secured Loans",
    desc: "Lower interest rates with collateral requirements (e.g., property or fixed deposits).",
    img: loan1,
    color: "#FFFBFB",
  },
  {
    title: "Unsecured Loans",
    desc: " No collateral needed, but higher interest rates and stricter eligibility.",
    img: loan2,
    color: "#FFFBF3",
  },
  {
    title: "Government Loans",
    desc: " Subsidized rates with repayment deferment options until after graduation.",
    img: loan3,
    color: "#F8FAFF",
  },
  {
    title: "International Student Loans",
    desc: " Specialized loans for students studying abroad, often requiring a co-signer from the host country.",
    img: loan4,
    color: "#F9F7FF",
  },
];

const TypesAndEligiblity = () => {
  return (
    <div>
      <Container>
        <Row>
          <div className="heading-big-medium text-content-primary text-center mb-4">
            Types of Education Loans
          </div>
        </Row>
        <Row>
          {TypesEduLoanData.map((card, index) => (
            <Col
              key={index}
              className="px-3 mb-4"
              lg={3}
              md={6}
              sm={12}
              xs={12}
            >
              <Card
                className={`why-nurse-card border-0 h-100 `}
                style={{ backgroundColor: card.color }}
              >
                <div className="p-lg-3 p-2 text-start">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="why-nurse-card-img"
                  />
                </div>
                <CardBody className="d-flex flex-column py-0">
                  <div className="subheading-small-medium text-content-secondary mb-1">
                    {card.title}
                  </div>
                  <div className="paragraph-small-medium text-content-secondary">
                    {card.desc}
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default TypesAndEligiblity;
