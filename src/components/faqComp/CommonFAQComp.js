"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Accordion, Button } from "react-bootstrap";
import { Plus, X } from "react-bootstrap-icons";
import "./CommonFAQComp.css";

const CommonFAQComp = ({ faqData, showButtons = false }) => {
  const [activeKey, setActiveKey] = useState(null); // Changed from "1" to null
  const [activeFilter, setActiveFilter] = useState("");

  // Extract unique categories from FAQ data
  const categories = [
    ...new Set(faqData.map((faq) => faq.category).filter(Boolean)),
  ];

  // Filter FAQs based on selected category
  const filteredFaqs = activeFilter
    ? faqData.filter((faq) => faq.category === activeFilter)
    : faqData;

  const handleAccordionToggle = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  const handleFilterClick = (category) => {
    setActiveFilter(activeFilter === category ? "" : category);
    setActiveKey(null); // Close any open accordion when changing filter
  };

  useEffect(() => {
    // If categories exist but no filter is selected, show all FAQs by default
    if (categories.length > 0 && !activeFilter) {
      setActiveFilter("");
    }
  }, [categories, activeFilter]);

  return (
    <div>
      <Container className="d-flex flex-column align-items-center p-0">
        <Row className="text-center mb-4">
          <h1 className="heading-big-medium">Frequently Asked Questions</h1>
        </Row>

        {/* Category Filter Buttons */}
        {showButtons && categories.length > 0 && (
          <Row className="mb-4 justify-content-center">
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    activeFilter === category ? "dark" : "outline-secondary"
                  }
                  className="rounded-pill px-4"
                  onClick={() => handleFilterClick(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </Row>
        )}

        <Row className="faq-container">
          <Accordion
            activeKey={activeKey}
            onSelect={handleAccordionToggle}
            className="w-100"
          >
            {filteredFaqs.map((faq) => (
              <Accordion.Item
                key={faq.eventKey}
                eventKey={faq.eventKey}
                className={`faq-item ${
                  activeKey === faq.eventKey ? "active" : ""
                }`}
              >
                <Accordion.Header className="faq-question">
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <span>{faq.question}</span>
                    {activeKey === faq.eventKey ? (
                      <X size={24} />
                    ) : (
                      <Plus size={20} />
                    )}
                  </div>
                </Accordion.Header>
                <Accordion.Body className="faq-answer">
                  {faq.answer}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Row>
      </Container>
    </div>
  );
};

CommonFAQComp.propTypes = {
  faqData: PropTypes.arrayOf(
    PropTypes.shape({
      eventKey: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
      category: PropTypes.string,
    })
  ).isRequired,
  showButtons: PropTypes.bool,
};

export default CommonFAQComp;
