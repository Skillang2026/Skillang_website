"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardImg, Container } from "react-bootstrap";
import "./study-abroad-journey.css";
import { useRouter, usePathname } from "next/navigation";

const cardData = [
  {
    title: "Explore Universities and Courses",
    desc: "Experts guide you based on interests and background. Recommendations tailored to fit your budget.",
    img: "https://cms.skillang.com/uploads/s_journey_1_da7f000a8d.jpg",
    id: "study-abroad-card1",
  },
  {
    title: "Personalised counselling",
    desc: "Clarify doubts before finalizing decisions. Multiple sessions ensure thorough understanding.",
    img: "https://cms.skillang.com/uploads/s_journey_2_fde53009eb.jpg",
  },
  {
    title: "Test Preparation",
    desc: "Personalized plans based on your strengths and challenges. Expert guidance for IELTS, TOEFL, and more.",
    img: "https://cms.skillang.com/uploads/s_journey_3_8d0c1e410e.jpg",
  },
  {
    title: "Alumni & University Rep Connect",
    desc: "Connect with alumni for personalized insights. One-on-one discussions with university representatives.",
    img: "https://cms.skillang.com/uploads/s_journey_4_1dac72164d.jpg",
  },
  {
    title: "University Application Process",
    desc: "Our team guides you through the university application process. Real-time tracking of your application status.",
    img: "https://cms.skillang.com/uploads/s_journey_5_f43d4ccc38.jpg",
  },
  {
    title: "Education Loan Assistance",
    desc: "Our Loan team connects you with financial institutions. Assistance provided for seamless loan processing.",
    img: "https://cms.skillang.com/uploads/s_journey_6_31692fb714.jpg",
  },
  {
    title: "Travel and Accommodations",
    desc: "End-to-end guidance for travel and accommodation. Secure and affordable cost options.",
    img: "https://cms.skillang.com/uploads/s_journey_7_21f8312af9.jpg",
  },
  {
    title: "Post Travel Support",
    desc: "Skillang membership grants access to alumni network. Connect, learn, and network in your destination country.",
    img: "https://cms.skillang.com/uploads/s_journey_8_ee608651cb.jpg",
  },
  {
    title: "Job Assistance",
    desc: "Our Career support team assists with job applications. Guidance for part-time and full-time jobs abroad.",
    img: "https://cms.skillang.com/uploads/s_journey_9_bba69c49ba.jpg",
  },
];

export default function StudyAbroad({ showAll = true }) {
  const router = useRouter(); // FIXED: Correct variable name
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Function to handle the subtle scroll animation
    const handleAutoScroll = () => {
      const scrollContainer = scrollContainerRef.current;
      const section = sectionRef.current;

      if (!scrollContainer || !section) return;

      // Create an Intersection Observer to detect when the section is visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // If the section is visible and has scrollable content
            if (
              entry.isIntersecting &&
              scrollContainer.scrollWidth > scrollContainer.clientWidth
            ) {
              // Scroll to show a bit of the next card, then scroll back
              const initialScroll = () => {
                // Scroll to show a hint of the next cards (about 100px)
                scrollContainer.scrollTo({
                  left: 150,
                  behavior: "smooth",
                });

                // After a short delay, scroll back to the beginning
                setTimeout(() => {
                  scrollContainer.scrollTo({
                    left: 0,
                    behavior: "smooth",
                  });
                }, 500);
              };

              // Trigger the scroll animation after a short delay when the section becomes visible
              setTimeout(initialScroll, 100);

              // We only need to observe once
              observer.disconnect();
            }
          });
        },
        { threshold: 0.5 }
      ); // Trigger when 50% of the element is visible

      observer.observe(section);

      // Cleanup on component unmount
      return () => observer.disconnect();
    };

    handleAutoScroll();
  }, []);

  // FIXED: Proper navigation function
  const handleNavigation = () => {
    router.push("/study-abroad");
    // Note: window.scrollTo will happen automatically after navigation
  };

  return (
    <div className="">
      <Container
        ref={sectionRef}
        className="align-items-center justify-content-center study-abroad-bg"
      >
        <div className="text-center my-lg-4 heading-big-medium text-content-primaryInverse">
          Study Abroad Journey
        </div>

        {/* Scrollable Row */}
        <div ref={scrollContainerRef} className="scrollable-container">
          {cardData.map((card, index) => (
            <div key={index} className="card-container">
              <Card className="custom-card my-4 border-0 " id={card.id}>
                {showAll && (
                  <CardImg
                    className="study-abroad-jounrey-card-image bg-primary"
                    src={card.img}
                  />
                )}
                <Card.Body className="">
                  <Card.Title className="subheading-small-medium text-content-primaryInverse mb-1">
                    {card.title}
                  </Card.Title>
                  <Card.Text className="paragraph-small-medium text-content-tertiaryInverse">
                    {card.desc}
                  </Card.Text>
                  {showAll && (
                    <div className="button-container">
                      <button
                        className="btn btn-primary btn-learn-more"
                        onClick={handleNavigation} // FIXED: Use proper function
                      >
                        Learn More
                      </button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
