"use client";

import React, { useState } from "react";
import "./EventsDetails.css";
import { Row, Nav } from "react-bootstrap";
import eventsService from "@/services/eventsService";

const EventsDetailsComp = ({ eventId = null, eventSlug = null }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch single event
  React.useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId && !eventSlug) {
        console.error("EventsDetailsComp: No eventId or eventSlug provided");
        setError("Event ID or slug is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log("EventsDetailsComp: Fetching event with:", {
          eventId,
          eventSlug,
        });

        let eventData;

        if (eventId) {
          console.log("EventsDetailsComp: Fetching by ID:", eventId);
          eventData = await eventsService.getEventById(eventId);
        } else if (eventSlug) {
          console.log("EventsDetailsComp: Fetching by slug:", eventSlug);
          eventData = await eventsService.getEventBySlug(eventSlug);
        }

        console.log("EventsDetailsComp: Received event data:", eventData);

        if (!eventData) {
          console.error("EventsDetailsComp: No event data received");
          setError("Event not found");
        } else {
          setEvent(eventData);
        }
      } catch (err) {
        console.error("EventsDetailsComp: Error fetching event:", err);
        setError("Failed to fetch event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, eventSlug]);

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  if (loading) {
    return (
      <div className="mb-5">
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading event details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="mb-5">
        <div className="alert alert-warning">
          Event details not found or failed to load.
        </div>
      </div>
    );
  }

  const { overview, agenda } = event;

  // Check if agenda exists and has items
  const hasAgenda = agenda && agenda.length > 0;

  // Debug log to check image value
  console.log("EventsDetailsComp: Overview image in render:", overview?.image);
  console.log("EventsDetailsComp: Image condition result:", !!overview?.image);

  return (
    <div className="mb-5">
      <Row className="mb-5">
        <Nav
          variant="tabs"
          className="events-nav-tabs"
          activeKey={activeTab}
          onSelect={handleTabSelect}
        >
          <Nav.Item>
            <Nav.Link className="events-nav-link" eventKey="overview">
              Overview
            </Nav.Link>
          </Nav.Item>
          {hasAgenda && (
            <Nav.Item>
              <Nav.Link className="events-nav-link" eventKey="agenda">
                Agenda
              </Nav.Link>
            </Nav.Item>
          )}
        </Nav>
      </Row>

      {activeTab === "overview" && (
        <Row>
          {overview.image && (
            <div className="mb-4">
              <img
                src={overview.image}
                alt="Events Individual overview image"
                className="eventsIndiOverviewImg"
              />
            </div>
          )}
          <div className="heading-small-medium mb-4">Overview</div>
          <div className="mb-4">
            <div className="subheading-big-medium mb-2">Event Description</div>
            <div className="paragraph-big-regular">{overview.description}</div>
          </div>
          {overview.topicsCovered && overview.topicsCovered.length > 0 && (
            <div className="">
              <div className="subheading-big-medium mb-2">Topics Covered</div>
              <div className="paragraph-big-regular">
                <ul>
                  {overview.topicsCovered.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Row>
      )}

      {activeTab === "agenda" && hasAgenda && (
        <Row>
          <div className="heading-small-medium mb-3">Agenda</div>
          <div>
            <table className="event-details-agenda-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Session</th>
                  <th>Speaker</th>
                </tr>
              </thead>
              <tbody>
                {agenda.map((item, index) => (
                  <tr key={index}>
                    <td>{item.time}</td>
                    <td>{item.session}</td>
                    <td>{item.speaker}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Row>
      )}
    </div>
  );
};

export default EventsDetailsComp;
