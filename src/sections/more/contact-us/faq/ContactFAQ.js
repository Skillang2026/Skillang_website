import React from "react";
import CommonFAQComp from "../../../../components/faqComp/CommonFAQComp";

const ContactFAQComp = () => {
  const contactFaqData = [
    {
      eventKey: "0",
      question: "Who can apply for your study abroad programs?",
      answer:
        "Anyone interested in pursuing higher education abroad can apply. We cater to students from various academic backgrounds and levels.",
      category: "Study Abroad",
    },
    {
      eventKey: "1",
      question: "Do you provide assistance with visas and documentation?",
      answer:
        "Yes! We offer complete visa assistance, including documentation support, application filing, and interview preparation.",
      category: "General",
    },
    {
      eventKey: "2",
      question: "Can I work while studying abroad?",
      answer:
        "Yes, many countries allow students to work part-time while studying.",
      category: "Work Abroad",
    },
    {
      eventKey: "3",
      question: "Do you offer language preparation courses?",
      answer:
        "Yes, we provide language preparation courses to help students meet the language requirements of their chosen programs.",
      category: "Test & Language Prep",
    },
    {
      eventKey: "4",
      question: "What nursing programs do you offer abroad?",
      answer:
        "We offer various nursing programs including BSN, MSN, and specialized nursing certifications in multiple countries.",
      category: "Nursing",
    },
  ];
  return (
    <div>
      <CommonFAQComp faqData={contactFaqData} showButtons={false} />
    </div>
  );
};

export default ContactFAQComp;
