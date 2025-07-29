import React, { useEffect, useRef, useState } from "react";
import "./workAbroadJourney.css";
import { Col, Container, Row, Image } from "react-bootstrap";

// import workJor0 from '../../../assets/images/home/workJoureny0.png';
import workJor1 from "../../../../assets/images/home/workJourney1.jpg";
import workJor2 from "../../../../assets/images/home/workJourney2.jpg";
import workJor3 from "../../../../assets/images/home/workJoureny3.jpg";
import workJor4 from "../../../../assets/images/home/workJoureny4.jpg";
import workJor5 from "../../../../assets/images/home/workJoureny5.jpg";

const ParallaxScrollSnap = () => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [activeSection, setActiveSection] = useState(0);
  const [isParallaxVisible, setIsParallaxVisible] = useState(false);

  const sections = [
    // { id: "section0", title: "Our Features", description: "Discover essential features designed to simplify your study abroad journey, from expert guidance to seamless support.", bgClass: "bg-section-0", img: workJor0 },
    {
      id: "section1",
      title: "Job Matching",
      description:
        "We Identify suitable jobs and submit applications in prominent industries",
      bgClass: "bg-section-1",
      img: workJor1,
    },
    {
      id: "section2",
      title: "Language & Test Prep",
      description:
        "Enhance your language skills and test readiness with expert-led training, personalized courses, and flexible study options.",
      bgClass: "bg-section-2",
      img: workJor2,
    },
    {
      id: "section3",
      title: "CV & Application Support",
      description:
        "Receive expert assistance in creating an international-standard CV and stay on track with a transparent application process.",
      bgClass: "bg-section-3",
      img: workJor3,
    },
    {
      id: "section4",
      title: "Application & Interview Support",
      description:
        "Stay on track with our transparent application process and real-time updates. Get expert mentorship and training to ace your interviews.",
      bgClass: "bg-section-4",
      img: workJor4,
    },
    {
      id: "section5",
      title: "Visa & Relocation Support",
      description:
        "We guide you through the visa process for a higher success rate and assist with travel and accommodation.",
      bgClass: "bg-section-5",
      img: workJor5,
    },
  ];

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, sections.length);
  }, [sections]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Function to check if an element is in viewport
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0
      );
    };

    // Function to handle scroll and intersection
    const handleScrollAndIntersection = () => {
      // Check if the container itself is in the viewport
      const containerIsVisible = isInViewport(container);
      setIsParallaxVisible(containerIsVisible);

      // Only process active section if container is visible
      if (containerIsVisible) {
        // Calculate which section is most visible
        const containerHeight = window.innerHeight;
        const containerCenter = containerHeight / 2;

        let closestSection = 0;
        let minDistance = Infinity;

        sectionRefs.current.forEach((section, index) => {
          if (!section) return;

          const sectionRect = section.getBoundingClientRect();
          const sectionCenter = sectionRect.top + sectionRect.height / 2;
          const distanceFromCenter = Math.abs(sectionCenter - containerCenter);

          if (distanceFromCenter < minDistance) {
            minDistance = distanceFromCenter;
            closestSection = index;
          }
        });

        if (closestSection !== activeSection) {
          setActiveSection(closestSection);
        }
      }
    };

    // Set up both window scroll and container scroll listeners
    window.addEventListener("scroll", handleScrollAndIntersection);
    container.addEventListener("scroll", handleScrollAndIntersection);

    // Initial check
    handleScrollAndIntersection();

    return () => {
      window.removeEventListener("scroll", handleScrollAndIntersection);
      container.removeEventListener("scroll", handleScrollAndIntersection);
    };
  }, [activeSection]);

  const scrollToSection = (index) => {
    const container = containerRef.current;
    const section = sectionRefs.current[index];

    if (container && section) {
      container.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="parallax-outer-container bg-primar" ref={containerRef}>
      {isParallaxVisible && (
        <div className="parallax-nav-dots">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`parallax-nav-dot ${
                activeSection === index ? "active" : ""
              }`}
              aria-label={`Scroll to section ${index + 1}`}
            ></button>
          ))}
        </div>
      )}

      {sections.map((section, index) => (
        <Container
          key={section.id}
          id={section.id}
          className={`bg-primar parallax-section ${
            index === activeSection ? "active" : ""
          }`}
          ref={(el) => (sectionRefs.current[index] = el)}
        >
          <Row className="w-100">
            <Col lg={6} md={6} sm={12} xs={12}>
              <Image
                fluid
                src={section.img}
                alt={section.title}
                className="image-fluid"
              />
            </Col>
            <Col
              lg={6}
              md={6}
              sm={12}
              xs={12}
              className="d-flex flex-column align-items-center justify-content-center text-start"
            >
              <div className="work-journey-text-wrap">
                <div className="subheading-big-medium text-content-primary">
                  {section.title}
                </div>
                <div className="paragraph-big-medium text-content-secondary my-2">
                  {section.description}
                </div>
                <button className="btn-secondary">Learn More</button>
              </div>
            </Col>
          </Row>
        </Container>
      ))}
    </div>
  );
};

export default ParallaxScrollSnap;
