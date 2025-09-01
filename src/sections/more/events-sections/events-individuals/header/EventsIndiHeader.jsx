"use client";

import React, { useState } from "react";
import { Row, Breadcrumb } from "react-bootstrap";
import { Calendar3, Clock, GeoAlt } from "react-bootstrap-icons";
import { useRouter } from "next/navigation"; // For Next.js 13+ App Router
// import { useRouter } from "next/router"; // For Next.js Pages Router
// import { useNavigate } from "react-router-dom"; // For React Router
import eventsService from "@/services/eventsService";
import "./EventsIndiHeader.css";

const EventsIndiHeader = ({ eventId = null, eventSlug = null }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter(); // Next.js
  // const navigate = useNavigate(); // React Router

  // Fetch single event
  React.useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId && !eventSlug) {
        console.error("EventsIndiHeader: No eventId or eventSlug provided");
        setError("Event ID or slug is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log("EventsIndiHeader: Fetching event with:", {
          eventId,
          eventSlug,
        });

        let eventData;

        if (eventId) {
          console.log("EventsIndiHeader: Fetching by ID:", eventId);
          eventData = await eventsService.getEventById(eventId);
        } else if (eventSlug) {
          console.log("EventsIndiHeader: Fetching by slug:", eventSlug);
          eventData = await eventsService.getEventBySlug(eventSlug);
        }

        console.log("EventsIndiHeader: Received event data:", eventData);

        if (!eventData) {
          console.error("EventsIndiHeader: No event data received");
          setError("Event not found");
        } else {
          setEvent(eventData);
        }
      } catch (err) {
        console.error("EventsIndiHeader: Error fetching event:", err);
        setError("Failed to fetch event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, eventSlug]);

  const handleBreadcrumbNavigation = (path) => {
    router.push(path); // Next.js
    // navigate(path); // React Router
  };

  if (loading) {
    return (
      <Row className="mb-5">
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading event...</span>
          </div>
        </div>
      </Row>
    );
  }

  if (error || !event) {
    return (
      <Row className="mb-5">
        <div className="alert alert-warning">
          Event not found or failed to load.
        </div>
      </Row>
    );
  }

  const { headerInfo } = event;

  return (
    <>
      <Row className="mb-5">
        <div className="mb-4">
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => handleBreadcrumbNavigation("/")}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={() => handleBreadcrumbNavigation("/events")}
            >
              Events
            </Breadcrumb.Item>
            <Breadcrumb.Item className="">{headerInfo.title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className="events-heading-box-bg">
          <Row className="mb-4">
            <div className="heading-big-medium">{headerInfo.title}</div>
          </Row>

          <div className="d-flex flex-row  gap-3 w-100">
            <div className="event-info-item">
              <Calendar3 className="event-icon me-2" size={16} />
              <span>{headerInfo.date}</span>
            </div>
            <div className="event-info-item">
              <Clock className="event-icon me-2" size={16} />
              <span>{headerInfo.time} Onwards</span>
            </div>
            <div className="event-info-item">
              <GeoAlt className="event-icon me-2" size={16} />
              <span>{headerInfo.location}</span>
            </div>
          </div>
        </div>
      </Row>
    </>
  );
};

export default EventsIndiHeader;
