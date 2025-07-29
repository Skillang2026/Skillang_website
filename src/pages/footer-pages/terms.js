import React from "react";
// import "./terms.css";

const TermsPage = () => {
  return (
    <div>
      <div className="w-full bg-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-3 privacy-wrapper container">
          <div className="privacy-cont ">
            <h1 className="display-medium text-center">Terms of Use</h1>
          </div>
          <p className="text-right text-content-tertiary mb-4">
            Effective Date: March 14, 2025
          </p>

          <div className="mb-4">
            <p className="paragraph-big-regular text-content-secondary mb-4">
              Welcome to{" "}
              <a
                href="https://skillang.com"
                className="text-content-primary-accent hover:text-primary-variant"
              >
                Skillang.com
              </a>{" "}
              ! These Terms and Conditions govern your use of our website and
              services. By accessing or using Skillang.com, you agree to comply
              with these terms. If you do not agree, please do not use our
              platform.
            </p>
          </div>

          {/* Definitions Section */}
          <div className="border-b border-gray-200 pb-6 mb-4">
            <h2 className="subheading-small-medium text-primary-color mb-2">
              1. Definitions
            </h2>

            <ul className="list-disc pl-6 mb-2 paragraph-small-regular text-content-secondary">
              <li>
                "Platform" refers to Skillang.com and its related services.
              </li>
              <li>"User" refers to anyone accessing or using our website.</li>
              <li>
                "Content" includes assessments, learning materials,
                user-generated content, and other resources available on the
                platform.
              </li>
            </ul>
          </div>

          {/* Use of Services Section */}
          <div className="border-b border-gray-200 pb-6 mb-4">
            <h2 className="subheading-small-medium text-primary-color mb-2">
              2. Use of Our Services
            </h2>

            <ul className="list-disc pl-6 mb-2 paragraph-small-regular text-content-secondary">
              <li>
                You must be at least 13 years old to use Skillang.com. If under
                18, you need parental/guardian consent.
              </li>
              <li>
                You agree to provide accurate information when registering or
                using our platform.
              </li>
              <li>
                You may not misuse our services, including hacking, distributing
                malware, or engaging in fraudulent activities.
              </li>
            </ul>
          </div>

          {/* Account Registration Section */}
          <div className="border-b border-gray-200 pb-6 mb-4">
            <h2 className="subheading-small-medium text-primary-color mb-2">
              3. Account Registration & Security
            </h2>

            <ul className="list-disc pl-6 mb-2 paragraph-small-regular text-content-secondary">
              <li>
                Users may need to create an account to access certain features.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                login credentials.
              </li>
              <li>
                We reserve the right to suspend or terminate accounts that
                violate our policies.
              </li>
            </ul>
          </div>

          {/* Intellectual Property Section */}
          <div className="border-b border-gray-200 pb-6 mb-4">
            <h2 className="subheading-small-medium text-primary-color mb-2">
              4. Intellectual Property
            </h2>

            <ul className="list-disc pl-6 mb-2 paragraph-small-regular text-content-secondary">
              <li>
                All content, including text, graphics, logos, and software, is
                owned by Skillang.com or licensed to us.
              </li>
              <li>
                Users may not copy, modify, distribute, or resell any content
                without permission.
              </li>
            </ul>
          </div>

          {/* User-Generated Content Section */}
          <div className="border-b border-gray-200 pb-6 mb-4">
            <h2 className="subheading-small-medium text-primary-color mb-2">
              5. User-Generated Content
            </h2>

            <ul className="list-disc pl-6 mb-2 paragraph-small-regular text-content-secondary">
              <li>
                Users may post content such as reviews, comments, or
                assessments.
              </li>
              <li>
                By submitting content, you grant us a non-exclusive, worldwide
                license to use, reproduce, and display it.
              </li>
              <li>
                You agree not to post offensive, illegal, or infringing content.
              </li>
            </ul>
          </div>

          {/* Payments and Refunds Section */}
          <div className="border-b border-gray-200 pb-6 mb-4">
            <h2 className="subheading-small-medium text-primary-color mb-2">
              6. Payments and Refunds
            </h2>

            <ul className="list-disc pl-6 mb-2 paragraph-small-regular text-content-secondary">
              <li>
                Certain services may require payment. Pricing details are
                available on the website.
              </li>
              <li>
                Payments are processed securely through third-party providers.
              </li>
              <li>
                Refunds, if applicable, will be handled based on our refund
                policy.
              </li>
            </ul>
          </div>

          {/* Limitation of Liability Section */}
          <div className="border-b border-gray-200 pb-6 mb-4">
            <h2 className="subheading-small-medium text-primary-color mb-2">
              7. Limitation of Liability
            </h2>

            <ul className="list-disc pl-6 mb-2 paragraph-small-regular text-content-secondary">
              <li>
                We provide services on an "as-is" basis and do not guarantee
                uninterrupted or error-free use.
              </li>
              <li>
                Skillang.com is not responsible for any loss or damage resulting
                from reliance on platform content.
              </li>
            </ul>
          </div>

          {/* Third-Party Links Section */}
          <div className="border-b border-gray-200 pb-6 mb-4">
            <h2 className="subheading-small-medium text-primary-color mb-2">
              8. Third-Party Links
            </h2>

            <p className="paragraph-small-regular text-content-secondary mb-2">
              Our platform may contain links to third-party websites. We are not
              responsible for their content or practices.
            </p>
          </div>

          {/* Account Termination Section */}
          <div className="border-b border-gray-200 pb-6 mb-4">
            <h2 className="subheading-small-medium text-primary-color mb-2">
              9. Account Termination
            </h2>

            <ul className="list-disc pl-6 mb-2 paragraph-small-regular text-content-secondary">
              <li>
                We reserve the right to suspend or terminate accounts that
                violate our terms.
              </li>
              <li>
                Users may delete their accounts at any time by contacting
                support.
              </li>
            </ul>
          </div>

          {/* Changes to Terms Section */}
          <div className="border-b border-gray-200 pb-6 mb-4">
            <h2 className="subheading-small-medium text-primary-color mb-2">
              10. Changes to Terms
            </h2>

            <p className="paragraph-small-regular text-content-secondary mb-2">
              We may update these Terms and Conditions from time to time. Users
              will be notified of significant changes.
            </p>
          </div>

          {/* Governing Law Section */}
          <div className="border-b border-gray-200 pb-6 mb-4">
            <h2 className="subheading-small-medium text-primary-color mb-2">
              11. Governing Law
            </h2>

            <p className="paragraph-small-regular text-content-secondary mb-2">
              These terms are governed by the laws of Singapore. Disputes will
              be resolved in the courts of Singapore.
            </p>
          </div>

          {/* Contact Information Section */}
          <div className="mb-5">
            <h2 className="subheading-small-medium text-primary-color mb-2">
              12. Contact Information
            </h2>

            <p className="paragraph-small-regular text-content-secondary mb-2">
              For questions regarding these terms, contact us at:
            </p>
            <p className="paragraph-small-regular text-content-secondary mb-2">
              📧 Email:{" "}
              <a
                href="mailto:support@skillang.com"
                className="text-content-primary-accent hover:text-primary-variant"
              >
                support@skillang.com
              </a>
            </p>
            <p className="paragraph-small-regular text-content-secondary mb-2">
              📞 Phone: +91 - 72006 30336
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
