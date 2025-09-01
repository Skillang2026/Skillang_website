import React from "react";
import { Card, CardBody, CardImg, CardTitle, CardText } from "react-bootstrap";
import "./blueIconCards.css";

const BlueIconCard = ({ img, title, text }) => {
  return (
    <>
      <Card className="blue-icon-cards">
        <CardImg src={img} alt={title} className="blue-icon-img" />
        <CardBody className="p-0">
          <CardTitle className="small-medium">{title}</CardTitle>
          <CardText className="blue-icon-cards-text paragraph-small-medium text-content-secondary">
            {text}
          </CardText>
        </CardBody>
      </Card>
    </>
  );
};

export default BlueIconCard;
