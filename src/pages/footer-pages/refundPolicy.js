import React from "react";
import "./terms.css";

const RefundPolicyPage = () => {
  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 container">
        <div className="privacy-con mb-5">
          <h1 className="display-medium text-center">Refund Policy</h1>
        </div>

        <p className="text-right text-content-tertiary mb-5">
          Updated: March 14, 2025
        </p>

        <div className="mb-5">
          <p className="paragraph-big-regular text-content-secondary mb-2">
            At Skillang Careers Pvt Ltd ("we", "our", or "us"), this refund
            policy outlines the conditions and procedures for refunds related to
            our German Language Program fees and services.
          </p>
        </div>

        {/* Refund Conditions Section */}
        <div className="border-b border-gray-200 pb-6 mb-2">
          <div className="subheading-small-medium text-primary-color mb-2">
            1. Refund Conditions
          </div>

          <div className="mb-4">
            <p className="paragraph-small-regular text-content-secondary mb-2">
              The German Language Fee will be fully refunded upon the
              fulfillment of the following cumulative conditions:
            </p>
            <ul className="list-disc mb-4 paragraph-small-regular text-content-secondary">
              <li>
                Successful completion of the German language program, evidenced
                by B2 certification (Goethe Institute exam or TestDaF, DSH, and
                telc exams)
              </li>
              <li>
                Migration to Germany through Skillang Careers Pvt Ltd
                organization's placement services or its Authorized Partner
                services
              </li>
              <li>
                Commencement of employment with Skillang Careers Pvt Ltd's
                referral partner
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
              applied by the candidates within 14 working days through official
              mail, and in this case the refund will be processed on completion
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
              No interest shall be payable on the German Language Fee unless
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
              The German Language Program Fee will be forfeited as liquidated
              damages (and not as a penalty) under the following circumstances:
            </p>

            <div className="mb-3">
              <div className="paragraph-big-medium mb-2">
                a. Voluntary Withdrawal
              </div>
              <p className="paragraph-small-regular text-content-secondary mb-3">
                Voluntary withdrawal after completing a minimum of 7 days of
                training
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
                employers.
              </p>
            </div>

            <div className="mb-3">
              <div className="paragraph-big-medium mb-2">
                d. Personal Withdrawal
              </div>
              <p className="paragraph-small-regular text-content-secondary mb-3">
                Withdrawal for personal, financial, or health reasons, except in
                cases of program-approved leave or deferment.
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
                Withdrawal due to dissatisfaction with services after a minimum
                of 7 days of training.
              </p>
            </div>

            <div className="mb-3">
              <div className="paragraph-big-medium mb-2">g. Non-compliance</div>
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
  );
};

export default RefundPolicyPage;
