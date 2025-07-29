import React from "react";
import Header from "../../sections/more/education-loan/header/header";
import EduLoanOurServices from "../../sections/more/education-loan/ourservices/ourservices";
import TypesAndEligiblity from "../../sections/more/education-loan/typesandeligblity/TypesAndEligiblity";
import LoanEligiblity from "../../sections/more/education-loan/typesandeligblity/Eligiblity";
import WhySkillangEdu from "../../sections/more/education-loan/whyskillangEdu/WhySkillangEdu";
import GetStart from "../../sections/more/education-loan/gettingstarted/GetStart";
import LangContactUs from "../../sections/main/lang-test/lang-connect/LangContactUs";

const EducationLoanPage = () => {
  return (
    <>
      <div className="section-spacing">
        <Header />
      </div>
      <div className="section-spacing">
        <EduLoanOurServices />
      </div>
      <div>
        <TypesAndEligiblity />
      </div>
      <div>
        <LoanEligiblity />
      </div>
      <div className="section-spacing">
        <WhySkillangEdu />
      </div>
      <div className="section-spacing">
        <GetStart />
      </div>
      <div className="section-spacing">
        <LangContactUs />
      </div>
    </>
  );
};

export default EducationLoanPage;
