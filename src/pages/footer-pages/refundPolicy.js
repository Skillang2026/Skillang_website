import React from "react";
import "./terms.css";

const RefundPolicyPage = () => {
  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-5xl mx-auto p-0 container">
        <div className="privacy-cont ">
          <h1 className="heading-big-medium text-center">Refund Policy</h1>
        </div>

        <div className="px-3">
          <p className="text-right text-content-tertiary mb-3">
            Updated: March 14, 2025
          </p>

          <div className="mb-3">
            <p className="paragraph-big-regular text-content-secondary mb-2">
              The refund policy governing the Language training program are as
              detailed below. Skillang Careers Pvt Ltd, is hereinafter referred
              to as “Company”, German Language Program, is hereinafter referred
              to as” Program”, any/all amounts paid towards receiving training
              in the said program, is hereinafter referred to as “Fees” and the
              trainee undergoing the Program, is hereinafter referred to as
              “Candidate”.
            </p>
            <p className="paragraph-big-regular text-content-secondary">
              This refund policy outlines the conditions and procedures for
              refunds related to our Program fees and services.
            </p>
          </div>

          {/* Refund Conditions Section */}
          <div className="border-b border-gray-200 pb-6 mb-2">
            <div className="subheading-small-medium text-primary-color mb-2">
              1. Refund Conditions
            </div>

            <div className="mb-4">
              <p className="paragraph-small-regular text-content-secondary mb-2">
                The Program Fee will be fully refunded upon the fulfilment of
                the following cumulative conditions:
              </p>
              <ul className="list-disc mb-4 paragraph-small-regular text-content-secondary">
                <li>
                  Successful completion of the Program, evidenced by B2
                  certification (Goethe Institute exam or TestDaF, DSH, and Telc
                  exams).
                </li>
                <li>
                  Migration to Germany through the Company's placement services
                  or its Authorized Partner services.
                </li>
                <li>
                  Commencement of employment with the Company's referral
                  partner.
                </li>
              </ul>
            </div>
          </div>

          {/* Refund Initiation Section */}
          <div className="border-b border-gray-200 pb-6 mb-2">
            <div className="subheading-small-medium text-primary-color mb-4">
              2. Refund Initiation
            </div>

            <div className="mb-4">
              <p className="paragraph-small-regular text-content-secondary mb-4">
                Upon migration of the candidate to Germany, the refund to be
                applied by the candidates within 14 working days through
                official mail (
                <a
                  href="mailto:support@skillang.com"
                  className="text-content-primary-accent hover:text-primary-variant"
                >
                  support@skillang.com
                </a>
                ), and in this case the refund will be processed on completion
                of 6 months in the Job from the date of joining.
              </p>
            </div>
          </div>

          {/* Interest on Fee Payment Section */}
          <div className="border-b border-gray-200 pb-6 mb-2">
            <div className="subheading-small-medium text-primary-color mb-4">
              3. Interest on the Fee Payment
            </div>

            <div className="mb-4">
              <p className="paragraph-small-regular text-content-secondary mb-4">
                No interest shall be payable on the Program Fee unless
                specifically agreed upon in writing between both parties.
              </p>
            </div>
          </div>

          {/* Forfeiture Conditions Section */}
          <div className="border-b border-gray-200 pb-6 mb-2">
            <div className="subheading-small-medium text-primary-color mb-4">
              4. Forfeiture Conditions
            </div>

            <div className="mb-4">
              <p className="paragraph-small-regular text-content-secondary mb-3">
                The Program Fee will be forfeited under the following
                circumstances:
              </p>

              <div className="mb-3">
                <div className="paragraph-big-medium mb-2">
                  a. Voluntary Withdrawal
                </div>
                <p className="paragraph-small-regular text-content-secondary mb-3">
                  Voluntary withdrawal after completing a minimum of 5 sessions
                  of training or one week from the time of admission.
                </p>
              </div>

              <div className="mb-3">
                <div className="paragraph-big-medium mb-2">
                  b. Dismissal Due to Violations
                </div>
                <p className="paragraph-small-regular text-content-secondary mb-3">
                  Dismissal due to disciplinary issues, misconduct, inadequate
                  participation, or attendance violations (not maintaining 90%
                  attendance).
                </p>
              </div>

              <div className="mb-3">
                <div className="paragraph-big-medium mb-2">
                  c. Declining Placement Offers
                </div>
                <p className="paragraph-small-regular text-content-secondary mb-3">
                  Declining placement offers from organization's partner
                  employers, justifiable reasoning.
                </p>
              </div>

              <div className="mb-3">
                <div className="paragraph-big-medium mb-2">
                  d. Personal Withdrawal
                </div>
                <p className="paragraph-small-regular text-content-secondary mb-3">
                  Withdrawal for personal, financial, or health reasons, except
                  in cases of program-approved leave or deferment. All other
                  deferments have to be intimated to the company in writing and
                  prior approvals obtained.
                </p>
              </div>

              <div className="mb-3">
                <div className="paragraph-big-medium mb-2">
                  e. Program Termination Due to Failure
                </div>
                <p className="paragraph-small-regular text-content-secondary mb-3">
                  Program termination due to failure in language assessments or
                  examinations.
                </p>
              </div>

              <div className="mb-3">
                <div className="paragraph-big-medium mb-2">
                  f. Service Dissatisfaction
                </div>
                <p className="paragraph-small-regular text-content-secondary mb-3">
                  Withdrawal due to dissatisfaction with services after a
                  maximum of 5 sessions of training or one week from the time of
                  admission.
                </p>
              </div>

              <div className="mb-3">
                <div className="paragraph-big-medium mb-2">
                  g. Non-compliance
                </div>
                <p className="paragraph-small-regular text-content-secondary mb-3">
                  Non-compliance with any program requirements.
                </p>
              </div>

              <div className="mb-3">
                <div className="paragraph-big-medium mb-2">h. Visa Issues</div>
                <p className="paragraph-small-regular text-content-secondary mb-3">
                  Visa application rejection or voluntary withdrawal of the visa
                  application.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="border-b border-gray-200 pb-6 mb-5">
            <div className="subheading-small-medium text-primary-color mb-2">
              5. Contact Information
            </div>

            <p className="paragraph-small-regular text-content-secondary mb-4">
              For any questions regarding this refund policy or to initiate a
              refund request, please contact us at{" "}
              <a
                href="mailto:support@skillang.com"
                className="text-content-primary-accent hover:text-primary-variant"
              >
                support@skillang.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
