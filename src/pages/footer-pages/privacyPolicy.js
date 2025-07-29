import React from "react";
import "./terms.css";

const PrivacyPolicyPage = () => {
  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 container">
        <div className="privacy-con mb-5">
          <h1 className="display-medium text-center">Privacy Policy</h1>
          {/* <div className="w-50 text-center">
            At TestMySkills.ai, we are committed to protecting your privacy.
            This policy outlines how we collect, use, and safeguard your
            personal information.
          </div> */}
        </div>

        <p className="text-right text-content-tertiary mb-5">
          Updated: March 13, 2025
        </p>

        <div className="mb-5">
          <p className="paragraph-big-regular text-content-secondary mb-2">
            At Skillang ("we", "our", or "us"), we respect your privacy and are
            committed to protecting your personal information. This Privacy
            Policy explains how we collect, use, and safeguard your information
            when you visit our website{" "}
            <a
              href="https://www.skillang.com"
              className="text-content-primary-accent hover:text-primary-variant"
            >
              skillang.com
            </a>{" "}
            or use our services.
          </p>
        </div>

        {/* Introduction Section */}
        <div className="border-b border-gray-200 pb-6 mb-2">
          <div className="subheading-small-medium text-primary-color mb-4">
            1. Information Collection
          </div>

          <div className="mb-4">
            <div className="paragraph-big-medium text-content-primary-accent mb-2">
              1.1 Personal Information
            </div>
            <p className="paragraph-small-regular text-content-secondary mb-2">
              We collect personal information that you voluntarily provide to us
              when you:
            </p>
            <ul className="list-disc  mb-4 paragraph-small-regular text-content-secondary">
              <li>Register for an account</li>
              <li>Fill out contact forms</li>
              <li>Sign up for newsletters</li>
              <li>Book consultations</li>
              <li>Apply for programs</li>
            </ul>
            <p className="paragraph-small-regular text-content-secondary mb-4">
              This information may include your name, email address, phone
              number, location, education history, professional experience, and
              other details relevant to your inquiries about work abroad, study
              abroad, nursing programs, or language test preparation.
            </p>
          </div>

          <div className="mb-4">
            <div className="paragraph-big-medium text-content-primary-accent mb-2">
              1.2 Assessment Data
            </div>
            <p className="paragraph-small-regular text-content-secondary mb-4">
              When you use our skill assessment tools or language tests, we
              collect your responses, results, and progression data to provide
              personalized guidance and recommendations.
            </p>
          </div>

          <div>
            <div className="paragraph-big-medium text-content-primary-accent mb-2">
              1.3 Automatically Collected Information
            </div>
            <p className="paragraph-small-regular text-content-secondary mb-4">
              When you access our website, we may automatically collect certain
              information about your device, including your IP address, browser
              type, operating system, referring URLs, device information,
              location information, and site usage data. We collect this
              information using cookies and similar tracking technologies.
            </p>
          </div>
        </div>

        {/* Purpose Section */}
        <div className="border-b border-gray-200 pb-6 mb-2">
          <div className="subheading-small-medium text-primary-color mb-4">
            2. Purpose of Data Collection
          </div>

          <div className="mb-4">
            <div className="paragraph-big-medium text-content-primary-accent mb-2">
              2.1 Service Delivery
            </div>
            <p className="paragraph-small-regular text-content-secondary mb-2">
              We use your personal and assessment data to provide and improve
              our services, including:
            </p>
            <ul className="list-disc  mb-4 paragraph-small-regular text-content-secondary">
              <li>Personalized career guidance and recommendations</li>
              <li>
                Customized study abroad or work abroad program suggestions
              </li>
              <li>Tailored language test preparation</li>
              <li>Nursing program application support</li>
              <li>Improving and customizing user experience</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="paragraph-big-medium text-content-primary-accent mb-2">
              2.2 Communication
            </div>
            <p className="paragraph-small-regular text-content-secondary mb-2">
              We use your contact information to:
            </p>
            <ul className="list-disc  mb-4 paragraph-small-regular text-content-secondary">
              <li>Respond to your inquiries and support requests</li>
              <li>Send consultation confirmations and follow-ups</li>
              <li>Provide program updates and important notices</li>
              <li>
                Share newsletters, promotional content, and educational
                resources (with your consent)
              </li>
            </ul>
          </div>

          <div>
            <div className="paragraph-big-medium text-content-primary-accent mb-2">
              2.3 Analytics
            </div>
            <p className="paragraph-small-regular text-content-secondary mb-4">
              We analyze usage data to understand how users interact with our
              platform, identify areas for improvement, and optimize our
              services and content.
            </p>
          </div>
        </div>

        {/* Data Sharing Section */}
        <div className="border-b border-gray-200 pb-6 mb-2">
          <div className="subheading-small-medium text-primary-color mb-4">
            3. Data Sharing
          </div>

          <div className="mb-4">
            <div className="paragraph-big-medium text-content-primary-accent mb-2">
              3.1 Third-Party Service Providers
            </div>
            <p className="paragraph-small-regular text-content-secondary mb-4">
              We may share your information with trusted third-party service
              providers who assist us in operating our website, conducting our
              business, or providing services to you. These providers have
              access to your personal information only to perform specific tasks
              on our behalf and are obligated to maintain its confidentiality.
            </p>
            <p className="paragraph-small-regular text-content-secondary mb-2">
              Our third-party service providers may include:
            </p>
            <ul className="list-disc  mb-4 paragraph-small-regular text-content-secondary">
              <li>Payment processors</li>
              <li>Email marketing platforms</li>
              <li>Customer relationship management systems</li>
              <li>Analytics services</li>
              <li>Educational institutions and partners (with your consent)</li>
            </ul>
          </div>

          <div>
            <div className="paragraph-big-medium text-content-primary-accent mb-2">
              3.2 Legal Requirements
            </div>
            <p className="paragraph-small-regular text-content-secondary mb-4">
              We may disclose your information if required to do so by law or in
              response to valid requests by public authorities (e.g., a court or
              government agency). We may also disclose your information to
              protect our rights, privacy, safety, or property, and that of our
              users or others.
            </p>
          </div>
        </div>

        {/* Data Security Section */}
        <div className="border-b border-gray-200 pb-6 mb-2">
          <div className="subheading-small-medium text-primary-color mb-4">
            4. Data Security
          </div>

          <div className="mb-4">
            <div className="paragraph-big-medium text-content-primary-accent mb-2">
              4.1 Security Measures
            </div>
            <p className="paragraph-small-regular text-content-secondary mb-2">
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. These measures
              include:
            </p>
            <ul className="list-disc  mb-4 paragraph-small-regular text-content-secondary">
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication procedures</li>
              <li>Secure data storage practices</li>
            </ul>
          </div>

          <div>
            <div className="paragraph-big-medium text-content-primary-accent mb-2">
              4.2 Data Storage
            </div>
            <p className="paragraph-small-regular text-content-secondary mb-4">
              We store your data on secure servers protected by firewalls and
              other security technologies. We retain your personal information
              only for as long as necessary to fulfill the purposes outlined in
              this Privacy Policy, unless a longer retention period is required
              or permitted by law.
            </p>
          </div>
        </div>

        {/* Cookies Section */}
        <div className="border-b border-gray-200 pb-6 mb-2">
          <div className="subheading-small-medium text-primary-color mb-4">
            5. Cookies and Tracking Technologies
          </div>

          <div className="mb-4">
            <div className="paragraph-big-medium text-content-primary-accent mb-2">
              5.1 Usage of Cookies
            </div>
            <p className="paragraph-small-regular text-content-secondary mb-2">
              We use cookies and similar tracking technologies to collect and
              track information about your browsing activities on our website.
              Cookies help us to:
            </p>
            <ul className="list-disc  mb-2 paragraph-small-regular text-content-secondary">
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our website</li>
              <li>Improve your user experience</li>
              <li>Personalize content and recommendations</li>
              <li>Analyze the performance of our website</li>
            </ul>
          </div>

          <div>
            <div className="paragraph-big-medium text-content-primary-accent mb-2">
              5.2 User Control
            </div>
            <p className="paragraph-small-regular text-content-secondary mb-4">
              Most web browsers are set to accept cookies by default. However,
              you can choose to set your browser to remove or reject cookies.
              Please note that certain features of our website may not function
              properly without cookies.
            </p>
          </div>
        </div>

        {/* User Rights Section */}
        <div className="border-b border-gray-200 pb-6 mb-2">
          <div className="subheading-small-medium text-primary-color mb-2">
            6. Your Rights and Choices
          </div>

          <p className="paragraph-small-regular text-content-secondary mb-2">
            You have certain rights regarding your personal data, including:
          </p>
          <ul className="list-disc  mb-4 paragraph-small-regular text-content-secondary">
            <li>The right to access, correct, or delete your personal data</li>
            <li>The right to withdraw consent for data processing</li>
            <li>The right to object to certain types of processing</li>
            <li>The right to data portability</li>
          </ul>
          <p className="paragraph-small-regular text-content-secondary mb-4">
            To exercise these rights, please contact us at{" "}
            <a
              href="mailto:support@skillang.com"
              className="text-content-primary-accent hover:text-primary-variant"
            >
              support@skillang.com
            </a>
            .
          </p>
        </div>

        {/* Children's Privacy Section */}
        <div className="border-b border-gray-200 pb-6 mb-2">
          <div className="subheading-small-medium text-primary-color mb-2">
            7. Children's Privacy
          </div>

          <p className="paragraph-small-regular text-content-secondary mb-4">
            Our services are not intended for children under the age of 16. We
            do not knowingly collect personal data from children. If we discover
            that a child has provided us with personal information, we will take
            steps to delete such data.
          </p>
        </div>

        {/* Updates to Privacy Policy Section */}
        <div className="border-b border-gray-200 pb-6 mb-5">
          <div className="subheading-small-medium text-primary-color mb-2">
            8. Updates to This Policy
          </div>

          <p className="paragraph-small-regular text-content-secondary mb-4">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated "Last Updated" date.
          </p>
        </div>

        {/* Contact Information Section - Uncomment if needed */}
        {/* <div>
          <div className="subheading-small-medium text-primary-color mb-4">9. Contact Us</div>
          
          <p className="paragraph-small-regular text-content-secondary mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="paragraph-small-regular text-content-secondary mb-4">
            Email: <a href="mailto:support@skillang.com" className="text-primary-color hover:text-primary-variant">support@skillang.com</a>
          </p>
          <p className="paragraph-small-regular text-content-secondary mb-4">
            Address: 123 Skillang Street, City, Country
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
