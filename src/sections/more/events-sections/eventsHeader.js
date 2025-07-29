import React from "react";
import MorePageHeader from "../../resuable/common-header/morePageHeader";
const desktopBackground = "/assets/images/events/EventsBg.png";

const EventsHeader = () => {
  return (
    <div>
      <MorePageHeader
        desktopBgImage={desktopBackground}
        mobileBgImage={desktopBackground} // Optional: same as desktop if not provided
        title="Events at Skillang"
        description="Join us for engaging events to help you navigate studying and working abroad. Connect with university reps and get practical application advice!"
        buttonText="Schedule a Free Consultation"
        // Optional: custom onClick handler
        altText="Upcoming Events & Webinars"
      />
    </div>
  );
};

export default EventsHeader;
