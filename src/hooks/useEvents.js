// @/hooks/useEvents.js

import { useState, useEffect, useCallback } from "react";
import eventsService from "@/services/eventsService";

export const useEvents = () => {
  const [eventsData, setEventsData] = useState({
    categories: ["Expos", "Webinars", "Seminars", "Workshop"],
    locations: ["Telangana", "Karnataka", "Maharashtra", "Online"],
    eventTypes: ["Upcoming", "Past", "All"],
    events: [],
    getEventById: () => null,
    getEventBySlug: () => null,
    getEventsByCategory: () => [],
    getEventsByLocation: () => [],
    getEventsByStatus: () => [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await eventsService.getAllEvents();
      setEventsData(data);
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch events";
      console.error("Error in fetchAllEvents:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllEvents();
  }, [fetchAllEvents]);

  return {
    eventsData,
    loading,
    error,
    refetch: fetchAllEvents,
  };
};

export const useEvent = (id = null, slug = null) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvent = useCallback(async () => {
    if (!id && !slug) return;

    setLoading(true);
    setError(null);

    try {
      let eventData;
      if (id) {
        eventData = await eventsService.getEventById(id);
      } else if (slug) {
        eventData = await eventsService.getEventBySlug(slug);
      }

      setEvent(eventData);
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch event";
      console.error("Error in fetchEvent:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id, slug]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return {
    event,
    loading,
    error,
    refetch: fetchEvent,
  };
};
