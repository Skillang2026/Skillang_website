import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "react-bootstrap";
import "./whySkillangComp.css";
//

/**
 * ReusableWhyComponent - A reusable component for "Why Choose Us" sections
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Main heading text (e.g. "Why Choose")
 * @param {string} props.highlightText - Text to be highlighted with different color (e.g. "Skillang?")
 * @param {string} props.highlightColor - Color for highlighted text (default: "#AC92F5")
 * @param {string} props.subtitle - Subheading text
 * @param {string} props.backgroundColor - CSS class for background (default: "why-skillang-bg")
 * @param {Array} props.cardData - Array of objects with title, text, and image properties
 * @param {boolean} props.showHighlight - Controls whether to highlight part of the title (default: true)
 * @param {boolean} props.showBadge - Controls visibility of the "Empowering Global Careers" badge (default: true)
 * @param {string} props.badgeText - Text to display in the badge (default: "Empowering Global Careers")
 * @returns {JSX.Element}
 */
const ReusableWhyComponent = ({
  title = "Why Choose",
  highlightText = "Skillang?",
  highlightColor = "#AC92F5",
  subtitle = "Discover What Makes Skillang Your Best Path to Success",
  backgroundColor = "why-skillang-bg",
  cardData = [],
  showHighlight = false,
  showBadge = true,
  badgeText = "Empowering Global Careers",
}) => {
  return (
    <div className={`${backgroundColor} text-white py-5 px-2`}>
      <Container>
        {showBadge && (
          <Row className="mb-3">
            <div className="emp-cont caption-bold ms-2">{badgeText}</div>
          </Row>
        )}
        <Row>
          <h1 className="heading-big-medium mb-2">
            {title}{" "}
            {showHighlight && (
              <span style={{ color: highlightColor }}>{highlightText}</span>
            )}
          </h1>
          <div className="paragraph-big-regular">{subtitle}</div>
        </Row>
      </Container>
      <Container className="py-4">
        <Row className="row-equal-height">
          {cardData.map((card, index) => (
            <Col lg={12 / (cardData.length || 1)} key={index} className="mb-4">
              <Card className="lang-why-skill-card">
                {card.img && (
                  <img
                    src={card.img}
                    alt={`${card.title || `why-reason-${index + 1}`}`}
                    className="why-skillang-card-img"
                    style={{ borderRadius: "12px" }}
                  />
                )}
                <CardBody className="px-0">
                  <CardTitle className="subheading-small-medium text-content-primaryInverse">
                    {card.title}
                  </CardTitle>
                  <CardText className="paragraph-small-regular text-content-secondaryInverse">
                    {card.text}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ReusableWhyComponent;
