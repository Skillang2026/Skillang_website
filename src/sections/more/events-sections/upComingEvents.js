"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { IoLocationOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import { useRouter } from "next/navigation";
import eventsService from "@/services/eventsService";
import "./UpcomingEvents.css";
import ConsultationModal from "@/sections/resuable/forms/calendly/LeadFormCalendly";

const emptyStateImg = "/assets/images/events/emptyState.png";

const UpcomingEvents = ({ eventSlug = null }) => {
  const [activeCategory, setActiveCategory] = useState("Expos");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState("Upcoming");
  const router = useRouter();

  // State for events data
  const [eventsData, setEventsData] = useState({
    categories: ["Expos", "Webinars", "Seminars", "Workshop"],
    locations: ["All"],
    eventTypes: ["Upcoming", "Past", "All"],
    events: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);
  const handleClose = () => {
    setShowModal(false);
    setSelectedEventForModal(null);
  };
  const handleShow = (eventData = null) => {
    setSelectedEventForModal(eventData);
    setShowModal(true);
  };

  // Fixed: Remove the undefined buttonOnClick reference
  const handleButtonClick = (eventData = null) => {
    handleShow(eventData);
  };

  // Generate lookingFor value based on selected event or general inquiry
  const getLookingForValue = () => {
    if (selectedEventForModal && selectedEventForModal.slug) {
      return `Regarding ${selectedEventForModal.slug} event`;
    }
    if (eventSlug) {
      return `Regarding ${eventSlug} event`;
    }
    return "Event Registration Inquiry";
  };

  // Fetch events data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await eventsService.getAllEvents();
        setEventsData(data);
      } catch (err) {
        setError("Failed to load events. Please try again later.");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on selected filters
  const getFilteredEvents = () => {
    let filtered = eventsData.events;

    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter((event) => event.category === activeCategory);
    }

    // Filter by location (state)
    if (selectedLocation !== "All") {
      filtered = filtered.filter((event) => event.state === selectedLocation);
    }

    // Filter by event status
    if (selectedEvent !== "All") {
      filtered = filtered.filter((event) => event.status === selectedEvent);
    }

    return filtered;
  };

  const filteredEvents = getFilteredEvents();

  // Handle Know More button click
  const handleKnowMore = (eventSlug) => {
    router.push(`/events/${eventSlug}`);
  };

  // Get unique states from events for dropdown
  const getAvailableStates = () => {
    const states = [
      ...new Set(eventsData.events.map((event) => event.state)),
    ].filter(Boolean);
    return ["All", ...states];
  };

  // Get unique categories from events for buttons
  const getAvailableCategories = () => {
    const categories = [
      ...new Set(eventsData.events.map((event) => event.category)),
    ].filter(Boolean);
    return categories.length > 0
      ? categories
      : ["Expos", "Webinars", "Seminars", "Workshop"];
  };

  if (loading) {
    return (
      <div className="upcoming-events-section mb-5 pb-5">
        <Container>
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading events...</span>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="upcoming-events-section mb-5 pb-5">
        <Container>
          <div className="alert alert-warning">{error}</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="upcoming-events-section mb-5 pb-5">
      <Container>
        <Row className="mb-4">
          <Col>
            <div className="subheading-big-medium events-title">
              Join Our Upcoming Events
            </div>
          </Col>
        </Row>

        <Row className="mb-4 align-items-center">
          <Col md={8}>
            <div className="event-categories">
              {getAvailableCategories().map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "dark" : "light"}
                  className={`event-category-btn ${
                    activeCategory === category ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </Col>
          <Col md={4}>
            <div className="event-filters">
              <Dropdown className="location-dropdown">
                <Dropdown.Toggle variant="light" id="location-dropdown">
                  Location: {selectedLocation} <span className="caret"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {getAvailableStates().map((location) => (
                    <Dropdown.Item
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                    >
                      {location}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className="event-dropdown">
                <Dropdown.Toggle variant="light" id="event-dropdown">
                  Event: {selectedEvent} <span className="caret"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {eventsData.eventTypes.map((eventType) => (
                    <Dropdown.Item
                      key={eventType}
                      onClick={() => setSelectedEvent(eventType)}
                    >
                      {eventType}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>

        <Row>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Col md={3} key={event.id} className="mb-4">
                <div className="event-card h-100">
                  <div className="paragraph-big-medium fs-bold">
                    {event.title}
                  </div>
                  <div className="paragraph-big-medium text-content-secondary">
                    <div className="mb-1">
                      <BsCalendar3 className="event-icon" />
                      <span>
                        {event.date} | {event.time}
                      </span>
                    </div>
                    <div className="">
                      <IoLocationOutline className="event-icon" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="event-actions">
                    <button
                      className="btn-secondary-outline"
                      onClick={() => handleKnowMore(event.slug)}
                    >
                      Know More
                    </button>
                    <button
                      className="btn-primary"
                      onClick={() => handleButtonClick(event)}
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <>
              <Col
                xs={6}
                sm={5}
                className="d-flex align-items-center justify-content-end"
              >
                <img
                  src={emptyStateImg}
                  alt="No Events"
                  className="empty-state-img"
                />
              </Col>
              <Col
                xs={6}
                sm={7}
                className="d-flex align-items-center justify-content-start"
              >
                <div className="">
                  <div className="subheading-small-medium">
                    No {activeCategory} Scheduled Yet!
                  </div>
                  <p className="paragraph-big-regular text-content-secondary">
                    Connect with us to get latest updates on our uni-expos and
                    other events
                  </p>
                  <button
                    className="btn-primary"
                    onClick={() => handleButtonClick()}
                  >
                    Connect Now
                  </button>
                </div>
              </Col>
            </>
          )}
        </Row>
      </Container>
      <ConsultationModal
        show={showModal}
        handleClose={handleClose}
        showCalendly={false}
        lookingFor={getLookingForValue()}
      />
    </div>
  );
};

export default UpcomingEvents;
