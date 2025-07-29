import React from "react";
import "./whyLiveInGermany.css";
import {
  Card,
  Container,
  Image,
  Row,
  Col,
  CardImg,
  CardTitle,
} from "react-bootstrap";

const whyLiveGerImg =
  "../../../../assets/images/german-opp-card/WhyLiveGerImg.jpg";
const whyLiveGerIcon1 =
  "../../../../assets/icons/german-opp-card/whyLiveGerIcon1.svg";
const whyLiveGerIcon2 =
  "../../../../assets/icons/german-opp-card/whyLiveGerIcon2.svg";
const whyLiveGerIcon3 =
  "../../../../assets/icons/german-opp-card/whyLiveGerIcon3.svg";

const WhyLiveInGermanyComp = () => {
  const WhyLiveInGermanyCardData = [
    {
      icon: whyLiveGerIcon1,
      title: "Multicultural environment & global job market.",
    },
    {
      icon: whyLiveGerIcon2,
      title: "World-class healthcare & social security benefits",
    },
    {
      icon: whyLiveGerIcon3,
      title: "Strong job market in IT, engineering, healthcare, and more",
    },
  ];

  return (
    <div>
      <Container>
        <Row className="mb-3">
          <div className="heading-big-medium">Why Live & Work in Germany?</div>
        </Row>
        <Row className="mb-4">
          <Image
            src={whyLiveGerImg}
            alt="whyLiveGerImg"
            className="whyLiveGerMainImg"
          />
        </Row>
        <Row>
          {WhyLiveInGermanyCardData.map((card, index) => (
            <Col md={4} key={index}>
              <Card className="whyLiveGerCards">
                <CardImg
                  src={card.icon}
                  alt={`whyLiveGerIcon${index + 1}`}
                  className="whyLiveGerCardsImg"
                />
                <CardTitle className="subheading-small-medium text-content-secondary">
                  {card.title}
                </CardTitle>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default WhyLiveInGermanyComp;
