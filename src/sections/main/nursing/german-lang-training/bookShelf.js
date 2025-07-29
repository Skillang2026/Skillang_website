"use client";

import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./nurseLangSection.css"; // Import the CSS file

const nurseBookBg1 =
  "https://cms.skillang.com/uploads/nurse_Book1_6d8d4df324.png";
const nurseBookBg2 =
  "https://cms.skillang.com/uploads/nurse_Book2_7724d05782.png";
const nurseBookBg3 =
  "https://cms.skillang.com/uploads/nurse_Book3_ffe89030b7.png";
const nurseBookBg4 =
  "https://cms.skillang.com/uploads/nurse_Book4_7ee2b9cf33.png";
const nurseBookBg5 =
  "https://cms.skillang.com/uploads/nurse_Book5_dbb798a520.png";

const BookShelf = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Data for books
  const rectangles = [
    {
      title: "Free Language Courses",
      content:
        "Free German and other language courses tailored for international nurses",
      img: nurseBookBg1,
      color: "#131313",
    },
    {
      title: "Expert Training",
      content:
        "Access to online and in-person training options from highly qualified trainers",
      img: nurseBookBg2,
      color: "#F34E4E",
    },
    {
      title: "Flexible Schedules",
      content: "Flexible learning schedules to fit work commitments",
      img: nurseBookBg3,
      color: "#F2AB0D",
    },
    {
      title: "Healthcare Integration",
      content: "Support for integration into the German healthcare system",
      img: nurseBookBg4,
      color: "#131313",
    },
    {
      title: "Certification",
      content: "Certification upon course completion",
      img: nurseBookBg5,
      color: "#F34E4E",
    },
  ];

  return (
    <div className="bookshelf-container m-0">
      {rectangles.map((rectangle, index) => (
        <div
          key={index}
          className={`book-item ${
            activeIndex === index ? "active" : "inactive"
          }`}
          onClick={() => setActiveIndex(index)}
          style={{
            backgroundImage: `url(${rectangle.img})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom end",
            backgroundColor: rectangle.color,
            backgroundRepeat: "no-repeat",
          }}
        >
          <Row>
            <Col lg={6} sm={8} xs={8}>
              {/* Title */}
              <div
                className={`subheading-big-medium book-title ${
                  activeIndex === index ? "" : "inactive"
                }`}
              >
                {rectangle.title}
              </div>

              {/* Description */}
              <div
                className={`paragraph-big-medium book-content ${
                  activeIndex === index ? "active" : "inactive"
                }`}
              >
                {rectangle.content}
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};

export default BookShelf;
