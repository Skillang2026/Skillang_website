import React from "react";
import LangTestHeader from "../../sections/main/lang-test/header/LangTestHeader";
import WhyLangTraining from "../../sections/main/lang-test/why-lang/WhyLangTraining";
import LangTestPrepProgs from "../../sections/main/lang-test/prep/LangTestPrepProgs";
import WhySkillangPrep from "../../sections/main/lang-test/why-skillang/WhySkillangPrep";
import LangTestPartners from "../../sections/main/lang-test/lang-partners/LangTestPartners";
import LangContactUs from "../../sections/main/lang-test/lang-connect/LangContactUs";

const LangTestPage = () => {
  return (
    <>
      <div className="section-spacing">
        <LangTestHeader />
      </div>
      <div className="section-spacing">
        <WhyLangTraining />
      </div>
      <div className="section-spacing">
        <LangTestPrepProgs />
      </div>
      <div className="section-spacing">
        <WhySkillangPrep />
      </div>
      <div className="section-spacing">
        <LangTestPartners />
      </div>
      <div className="section-spacing">
        <LangContactUs />
      </div>
    </>
  );
};

export default LangTestPage;
