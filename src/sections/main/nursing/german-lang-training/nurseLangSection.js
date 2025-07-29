import React from "react";
import "./nurseLangSection.css";
import { Image } from "react-bootstrap";
import BookShelf from "./bookShelf";
const wood = "https://cms.skillang.com/uploads/woord_54eacdc261.png";

const NurseLangSection = () => {
  return (
    <div className="container text-md-center">
      <div className="heading-big-medium mb-1 text-content-primary">
        German Language Training
      </div>
      <div className="paragraph-big-regular text-content-tertiary mb-4">
        Explore our streamlined recruitment process and timeline, ensuring a
        smooth journey from application to job placement.
      </div>
      <BookShelf />
      <Image fluid src={wood} alt="" className="d-none d-md-block w-100" />
    </div>
  );
};

export default NurseLangSection;
