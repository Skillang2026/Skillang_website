import EventsPage from "@/pages/more/events/events-page";

export const metadata = {
  title: "Upcoming Events & Webinars | Skillang",
  description:
    "Join us for engaging events to help you navigate studying and working abroad. Connect with university reps and get practical application advice",
  keywords:
    "upcoming events & webinars, study abroad events, work abroad programs",
  alternates: {
    canonical: "https://www.skillang.com/events", // Add this line
  },
};

export default function Events() {
  return <EventsPage />;
}
