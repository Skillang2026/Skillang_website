import React from "react";
const desktopBackground = "/assets/images/education-loan/headerbg.jpg";
// import mobileBackground from "/assets/images/education-loan/headerbg.jpg";
import MorePageHeader from "../../../resuable/common-header/morePageHeader";

const Header = () => {
  return (
    <div className="">
      <MorePageHeader
        desktopBgImage={desktopBackground}
        mobileBgImage={desktopBackground} // Optional: same as desktop if not provided
        title="Education Loan Assistance at Skillang"
        description="Secure the funding needed to realize your academic dreams abroad."
        buttonText="Schedule a Free Consultation"
        altText="Education Loan For Abroad Without Collateral"
      />
    </div>
  );
};

export default Header;
