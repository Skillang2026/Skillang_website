// @/data/eventsData.js

export const eventsData = {
  // Categories for filtering
  categories: ["Expos", "Webinars", "Seminars", "Workshop"],

  // Location options
  locations: ["Telangana", "Karnataka", "Maharashtra"],

  // Event status options
  eventTypes: ["Upcoming", "Past", "All"],

  // All events data
  events: [
    {
      id: 1,
      slug: "international-uni-expo-may-2",
      title: "International Uni Expo",
      date: "Mar 23, 2025",
      time: "10:00 AM Onward",
      location: "ITP Tower, Gachibawli, Hyderabad",
      city: "Hyderabad",
      state: "Telangana",
      category: "Expos",
      status: "Upcoming",

      // Header information
      headerInfo: {
        title: "International Uni Expo",
        date: "Mar 23, 2025",
        time: "10:00 AM Onward",
        location: "ITP Tower, Gachibawli, Hyderabad",
      },

      // Overview details
      overview: {
        image: "/assets/images/events/overviewIndividualImg.png",
        description:
          "Join us for an interactive session on how remote teams powered by AI are changing the face of modern work. Learn from experts leading distributed AI-first companies.",
        topicsCovered: [
          "Hiring across time zones",
          "AI in daily workflows",
          "Performance tracking in remote environments",
          "Building team culture virtually",
        ],
      },

      // Agenda details
      agenda: [
        {
          time: "10:00 AM",
          session: "Welcome & Opening Remarks",
          speaker: "Maya Kapoor, COO",
        },
        {
          time: "10:15 AM",
          session: "Panel: Hiring Remote AI Talent",
          speaker: "Ajay Nair, CTO",
        },
        {
          time: "11:00 AM",
          session: "AI Tools Workshop",
          speaker: "Sarah Chen, Lead Developer",
        },
      ],
    },
    {
      id: 2,
      slug: "international-uni-expo-may-15",
      title: "International Uni Expo",
      date: "15 May 2025",
      time: "10:00 AM Onward",
      location: "Tech Park, Bangalore",
      city: "Bangalore",
      state: "Karnataka",
      category: "Expos",
      status: "Upcoming",

      headerInfo: {
        title: "International Uni Expo",
        date: "15 May 2025",
        time: "10:00 AM Onward",
        location: "Tech Park, Bangalore",
      },

      overview: {
        image: "/assets/images/events/overviewIndividualImg.png",
        description:
          "Discover opportunities in international education and connect with top universities from around the world.",
        topicsCovered: [
          "University selection process",
          "Scholarship opportunities",
          "Application guidance",
          "Career prospects abroad",
        ],
      },

      agenda: [
        {
          time: "10:00 AM",
          session: "Registration & Welcome",
          speaker: "Event Team",
        },
        {
          time: "10:30 AM",
          session: "University Fair",
          speaker: "University Representatives",
        },
        {
          time: "12:00 PM",
          session: "Scholarship Panel",
          speaker: "Financial Advisors",
        },
      ],
    },
    {
      id: 3,
      slug: "ai-webinar-series",
      title: "AI Innovation Webinar",
      date: "22 May 2025",
      time: "2:00 PM Onward",
      location: "Online Event",
      city: "Online",
      state: "All",
      category: "Webinars",
      status: "Upcoming",

      headerInfo: {
        title: "AI Innovation Webinar",
        date: "22 May 2025",
        time: "2:00 PM Onward",
        location: "Online Event",
      },

      overview: {
        image: "/assets/images/events/overviewIndividualImg.png",
        description:
          "Explore the latest trends in AI technology and its impact on various industries.",
        topicsCovered: [
          "Machine Learning trends",
          "AI in healthcare",
          "Future of automation",
          "Ethics in AI development",
        ],
      },

      agenda: [
        {
          time: "2:00 PM",
          session: "Opening & Introductions",
          speaker: "Dr. Priya Sharma",
        },
        {
          time: "2:15 PM",
          session: "AI Trends Presentation",
          speaker: "Tech Experts Panel",
        },
        {
          time: "3:00 PM",
          session: "Q&A Session",
          speaker: "All Speakers",
        },
      ],
    },
  ],

  // Helper functions
  getEventById: (id) => {
    return eventsData.events.find((event) => event.id === id);
  },

  getEventBySlug: (slug) => {
    return eventsData.events.find((event) => event.slug === slug);
  },

  getEventsByCategory: (category) => {
    if (category === "All") return eventsData.events;
    return eventsData.events.filter((event) => event.category === category);
  },

  getEventsByLocation: (state) => {
    if (state === "All") return eventsData.events;
    return eventsData.events.filter((event) => event.state === state);
  },

  getEventsByStatus: (status) => {
    if (status === "All") return eventsData.events;
    return eventsData.events.filter((event) => event.status === status);
  },
};
