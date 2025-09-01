import EventsIndividualPage from "@/pages/more/events/EventsIndividualpage";
import React from "react";

const EventsIndiPage = async ({ params }) => {
  const { id } = await params;

  return (
    <div>
      <EventsIndividualPage eventSlug={id} />
    </div>
  );
};

export default EventsIndiPage;
