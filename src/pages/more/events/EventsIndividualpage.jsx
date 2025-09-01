import React from "react";
import EventsIndiHeader from "@/sections/more/events-sections/events-individuals/header/EventsIndiHeader";
import EventsDetailsComp from "@/sections/more/events-sections/events-individuals/details/EventsDetails";
import UniContactComp from "@/sections/resuable/uni-contact/UniContact";
import { Container } from "react-bootstrap";

const EventsIndividualPage = ({ eventSlug, eventId }) => {
  return (
    <Container className="mb-5">
      <EventsIndiHeader eventSlug={eventSlug} eventId={eventId} />
      <EventsDetailsComp eventSlug={eventSlug} eventId={eventId} />
      <UniContactComp
        heading="Lost in Your University Search?"
        description="Join us at our international university fare and get all your questions answered by our study abroad experts."
        buttonText="Register for Free"
      />
    </Container>
  );
};

export default EventsIndividualPage;
