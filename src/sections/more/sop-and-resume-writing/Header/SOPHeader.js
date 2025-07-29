import React from "react";
import MorePageHeader from "../../../resuable/common-header/morePageHeader";
const desktopBackground = "/assets/images/sop=desktop-bg.png";
const mobileBackground = "/assets/images/SOP/sop-mobile-header.jpg";

const SOPHeaderComp = () => {
  return (
    <div>
      <MorePageHeader
        desktopBgImage={desktopBackground}
        mobileBgImage={mobileBackground} // Optional: same as desktop if not provided
        title="SOP & Resume Writing Services at Skillang"
        description="Craft a compelling SOP and a professional resume that opens doors to prestigious international universities and scholarship programs."
        buttonText="Schedule a Free Consultation"
      />
    </div>
  );
};

export default SOPHeaderComp;
