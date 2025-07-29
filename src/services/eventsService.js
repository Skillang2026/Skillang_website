// @/services/eventsService.js

const STRAPI_BASE_URL = "https://cms.skillang.com/api";

class EventsService {
  // Helper function to extract text from rich text description
  extractTextFromRichText(richTextArray) {
    if (!Array.isArray(richTextArray)) return "";

    return richTextArray
      .map((block) => {
        if (block.type === "paragraph" && block.children) {
          return block.children.map((child) => child.text || "").join("");
        }
        return "";
      })
      .join(" ")
      .trim();
  }

  // Helper function to format date
  formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  // Helper function to format time
  formatTime(timeString) {
    if (!timeString) return "";

    // Handle both full datetime and time-only formats
    let date;
    if (timeString.includes("T")) {
      // Full datetime format
      date = new Date(timeString);
    } else if (timeString.includes(":")) {
      // Time-only format like "10:00:00.000"
      const timePart = timeString.split(".")[0]; // Remove milliseconds
      date = new Date(`1970-01-01T${timePart}`);
    } else {
      return timeString; // Return as-is if unknown format
    }

    const options = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  }

  // Transform single Strapi event to eventsData format
  transformEvent(strapiEvent) {
    const {
      id,
      documentId,
      title,
      slug,
      description,
      eventStatus, // Your field: eventStatus (not status)
      eventCategory, // Your field: eventCategory (not category)
      eventDateTime, // Your field: eventDateTime (not eventDate + eventTime)
      eventType, // Your field: eventType
      eventVenue, // Your field: eventVenue (not venue)
      eventCity, // Your field: eventCity (not city)
      eventState, // Your field: eventState (not state)
      eventLocality, // Your field: eventLocality (new field)
      eventMeetingLink, // Your field: eventMeetingLink (not meetingLink)
      overviewImage, // Your field: overviewImage
      eventTopic, // Your field: eventTopic (not topicsCovered)
      agendaItem, // Your field: agendaItem (not agenda)
    } = strapiEvent;

    // Debug log to check what overviewImage contains
    // console.log("TRANSFORM DEBUG: overviewImage from API:", overviewImage);
    // console.log("TRANSFORM DEBUG: overviewImage?.url:", overviewImage?.url);

    // Format location based on event type
    let location = "";
    if (eventType === "Online") {
      location = "Online Event";
    } else if (eventType === "Physical" || eventType === "Hybrid") {
      const parts = [eventVenue, eventLocality, eventCity].filter(Boolean);
      location = parts.join(", ");
    }

    // Format date and time from eventDateTime
    const eventDate = new Date(eventDateTime);
    const formattedDate = this.formatDate(eventDateTime);
    const formattedTime = this.formatTime(eventDateTime);

    // CRITICAL: Set image URL - only if overviewImage exists and has url
    let imageUrl = null;
    if (overviewImage && overviewImage.url) {
      imageUrl = `https://cms.skillang.com${overviewImage.url}`;
    }
    // console.log("TRANSFORM DEBUG: Final image URL:", imageUrl);

    const transformedEvent = {
      id: id,
      documentId: documentId,
      slug: slug,
      title: title,
      date: formattedDate,
      time: formattedTime,
      location: location,
      city: eventCity || "Online",
      state: eventState || "Online",
      category: eventCategory,
      status: eventStatus,

      // Header information
      headerInfo: {
        title: title,
        date: formattedDate,
        time: formattedTime,
        location: location,
      },

      // Overview details
      overview: {
        image: imageUrl, // This will be null if no image
        description: this.extractTextFromRichText(description),
        topicsCovered: eventTopic?.map((topic) => topic.topic) || [],
      },

      // Agenda details
      agenda:
        agendaItem?.map((item) => ({
          time: this.formatTime(item.time),
          session: item.sessionTitle, // Your field: sessionTitle (not session)
          speaker: item.speakerName, // Your field: speakerName (not speaker)
        })) || [],
    };

    // console.log(
    //   "TRANSFORM DEBUG: Final transformed event overview.image:",
    //   transformedEvent.overview.image
    // );
    return transformedEvent;
  }

  // Transform Strapi response to eventsData format
  transformEventsData(strapiResponse) {
    const { data } = strapiResponse;

    if (!Array.isArray(data)) {
      console.error("Invalid Strapi response format");
      return {
        categories: ["Expos", "Webinars", "Seminars", "Workshop"],
        locations: ["All"],
        eventTypes: ["Upcoming", "Past", "All"],
        events: [],
      };
    }

    const transformedEvents = data.map((event) => this.transformEvent(event));

    // Extract unique categories and states from data
    const categories = [
      ...new Set(transformedEvents.map((event) => event.category)),
    ].filter(Boolean);
    const locations = [
      ...new Set(transformedEvents.map((event) => event.state)),
    ].filter(Boolean);

    return {
      categories:
        categories.length > 0
          ? categories
          : ["Expos", "Webinars", "Seminars", "Workshop"],
      locations: locations.length > 0 ? ["All", ...locations] : ["All"],
      eventTypes: ["Upcoming", "Past", "All"],
      events: transformedEvents,

      // Helper functions (same as original eventsData.js)
      getEventById: (id) => {
        return transformedEvents.find((event) => event.id === id);
      },

      getEventBySlug: (slug) => {
        return transformedEvents.find((event) => event.slug === slug);
      },

      getEventsByCategory: (category) => {
        if (category === "All") return transformedEvents;
        return transformedEvents.filter((event) => event.category === category);
      },

      getEventsByLocation: (state) => {
        if (state === "All") return transformedEvents;
        return transformedEvents.filter((event) => event.state === state);
      },

      getEventsByStatus: (status) => {
        if (status === "All") return transformedEvents;
        return transformedEvents.filter((event) => event.status === status);
      },
    };
  }

  // Fetch all events from Strapi
  async getAllEvents() {
    try {
      const response = await fetch(`${STRAPI_BASE_URL}/events?populate=*`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const strapiData = await response.json();
      return this.transformEventsData(strapiData);
    } catch (error) {
      console.error("Error fetching events:", error);

      // Return empty structure on error
      return {
        categories: ["Expos", "Webinars", "Seminars", "Workshop"],
        locations: ["All"],
        eventTypes: ["Upcoming", "Past", "All"],
        events: [],
        getEventById: () => null,
        getEventBySlug: () => null,
        getEventsByCategory: () => [],
        getEventsByLocation: () => [],
        getEventsByStatus: () => [],
      };
    }
  }

  // Fetch single event by ID
  async getEventById(id) {
    try {
      const response = await fetch(
        `${STRAPI_BASE_URL}/events/${id}?populate=*`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const strapiData = await response.json();
      return this.transformEvent(strapiData.data);
    } catch (error) {
      console.error("Error fetching event by ID:", error);
      return null;
    }
  }

  // Fetch single event by slug
  async getEventBySlug(slug) {
    try {
      console.log("EventsService: Fetching event by slug:", slug);
      const url = `${STRAPI_BASE_URL}/events?filters[slug][$eq]=${slug}&populate=*`;
      console.log("EventsService: API URL:", url);

      const response = await fetch(url);

      console.log("EventsService: Response status:", response.status);
      console.log("EventsService: Response ok:", response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const strapiData = await response.json();
      console.log("EventsService: Raw Strapi response:", strapiData);

      if (strapiData.data && strapiData.data.length > 0) {
        const transformedEvent = this.transformEvent(strapiData.data[0]);
        console.log("EventsService: Transformed event:", transformedEvent);
        return transformedEvent;
      }

      console.log("EventsService: No event found with slug:", slug);
      return null;
    } catch (error) {
      console.error("EventsService: Error fetching event by slug:", error);
      return null;
    }
  }
}

export default new EventsService();
