"use client";

import React, { useState, useEffect, useRef } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Container, Image } from "react-bootstrap";

// import wjourney1 from "../../../../assets/images/home/workJourney1.jpg";
// import wjourney2 from "../../../../assets/images/home/workJourney2.jpg";
// import wjourney3 from "../../../../assets/images/home/workJoureny3.jpg";
// import wjourney4 from "../../../../assets/images/home/workJoureny4.jpg";
// import wjourney5 from "../../../../assets/images/home/workJoureny5.jpg";

import "./work-abroad-timeline.css";

const WorkAbroadJourneyTimeline = () => {
  const [isMobile, setIsMobile] = useState(false); // Initialize with false
  const [activeIndex, setActiveIndex] = useState(0);
  const progressValuesRef = useRef(Array(5).fill(0)); // Using ref instead of state
  const timelineRefs = useRef([]);

  // Initialize mobile state and resize event listener
  useEffect(() => {
    // Set initial mobile state after component mounts
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll effect optimization
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.6;
      let newActiveIndex = 0;

      timelineRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top < triggerPoint) {
            newActiveIndex = index;
          }
        }
      });

      // Update activeIndex only if changed
      setActiveIndex((prevIndex) =>
        prevIndex !== newActiveIndex ? newActiveIndex : prevIndex
      );

      // Progress bar calculation
      const newProgressValues = [...progressValuesRef.current];
      timelineRefs.current.forEach((ref, index) => {
        if (ref) {
          const currentRect = ref.getBoundingClientRect();
          const nextRef = timelineRefs.current[index + 1];

          if (nextRef) {
            const nextRect = nextRef.getBoundingClientRect();
            const distanceToNextItem = nextRect.top - triggerPoint;
            const totalDistance = nextRect.top - currentRect.top;

            const progress =
              1 - Math.min(1, Math.max(0, distanceToNextItem / totalDistance));
            newProgressValues[index] = progress;
          } else {
            newProgressValues[index] = index === newActiveIndex ? 1 : 0;
          }
        }
      });

      progressValuesRef.current = newProgressValues; // Update ref, not state
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const timelineData = [
    {
      title: "Explore Opportunities",
      description:
        "Explore the work abroad opportunities that fit your interest, education, and experience background.",
      image: "https://cms.skillang.com/uploads/work_Journey1_c5cb43e438.jpg",
      color: "#E53935",
    },
    {
      title: "Language & Test Prep",
      description:
        "Enhance your language skills and test readiness with expert-led training, personalized courses, and flexible study options for a successful career abroad.",
      image: "https://cms.skillang.com/uploads/work_Journey2_8eb54ad137.jpg",
      color: "#FB8C00",
    },
    {
      title: "CV & Application Support",
      description:
        "Receive expert assistance in creating an international-standard CV and stay on track with a transparent application process, including real-time updates on your offer letter.",
      image: "https://cms.skillang.com/uploads/work_Joureny3_c20ffee9d8.jpg",
      color: "#FDD835",
    },
    {
      title: "Application & Interview Support",
      description:
        "Stay on track with our transparent application process and real-time updates. Get expert mentorship and training to ace your interviews and secure your offer letter.",
      image: "https://cms.skillang.com/uploads/work_Joureny4_6dcba9684b.jpg",
      color: "#1E88E5",
    },
    {
      title: "Visa & Relocation Support",
      description:
        "We guide you through the visa process for a higher success rate and assist with travel and accommodation to ensure a smooth, secure, and affordable transition.",
      image: "https://cms.skillang.com/uploads/work_Joureny5_41d4b3bd04.jpg",
      color: "#8E24AA",
    },
  ];

  return (
    <section>
      <Container>
        <div className="text-center heading-big-medium">
          Work Abroad Journey
        </div>
        <div className="text-center paragraph-big-medium text-content-secondary mb-2 mb-md-5">
          Start your work abroad journey in 5 simple steps
        </div>

        <Timeline
          position={isMobile ? "right" : "alternate"}
          className="p-0 m-0 bg-primar"
        >
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              ref={(el) => (timelineRefs.current[index] = el)}
              className="py-2 p-0 m-0 bg-dar"
            >
              <TimelineOppositeContent
                style={{ flex: isMobile ? "0" : "1" }}
                className=""
              >
                <div className="d-none d-md-block">
                  <Image
                    fluid
                    className="custom-image"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  className={`timeline-dot ${
                    index <= activeIndex ? "active" : ""
                  }`}
                  style={{
                    backgroundColor:
                      index <= activeIndex ? item.color : "white",
                    borderColor: item.color,
                  }}
                />
                {index < timelineData.length && (
                  <div className="timeline-connector-wrapper">
                    <TimelineConnector className="timeline-connector" />
                    <div
                      className="timeline-connector-fill"
                      style={{
                        backgroundColor: item.color,
                        height: `${progressValuesRef.current[index] * 100}%`,
                        top: "0",
                        position: "absolute",
                      }}
                    />
                  </div>
                )}
              </TimelineSeparator>
              <TimelineContent>
                <div className="text-start">
                  <div className="subheading-small-medium">{item.title}</div>
                  <div className="d-block d-md-none">
                    <Image
                      className="custom-image my-2"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
                  <p className="paragraph-big-medium text-content-secondary">
                    {item.description}
                  </p>
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </section>
  );
};

export default WorkAbroadJourneyTimeline;
