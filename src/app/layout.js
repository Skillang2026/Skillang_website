import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Script from "next/script";
import WhatsappButtonsComp from "@/components/buttons/whatsapp-button/WhatsappButtons";
import ConditionalLayout from "@/components/ConditionalLayout";
// import { Toaster, toast } from "sonner";

export const metadata = {
  title: "Best Abroad Consultancy In Chennai",
  description:
    "Looking for the best abroad consultancy in Chennai? We provide expert guidance for overseas education, work, and German language, IELTS coaching.",
  keywords:
    "abroad consultancy, best abroad consultancy in chennai, overseas consultancy, best overseas consultancy, chennai best consultancy for abroad",
  icons: {
    icon: "/assets/images/logos/logo.png",
  },
  verification: {
    google: "cQGHnU-2eR0roFYKweyj7Z91YqBnLUaKgjne8sWNCqs",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google site */}
        <meta
          name="google-site-verification"
          content="-VICBophpmm2uIkWMB4GMrQg7Yvr3aFeVsoTOvZA33o"
        />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "Skillang Careers Private Limited",
                  alternateName: "Skillang Careers",
                  url: "https://www.skillang.com",
                  logo: "https://www.skillang.com/logo.png",
                  foundingDate: "2025",
                  description:
                    "Skillang Careers Private Limited specializes in nursing recruitment to Germany, as well as study abroad and work abroad opportunities. We help students and professionals build international careers with trusted guidance and placement support.",
                  slogan:
                    "Empowering Global Careers in Nursing, Study Abroad & Work Abroad",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress:
                      "The Executive Zone, 766, Anna Salai, Shakti Tower-1, Thousand Lights",
                    addressLocality: "Chennai",
                    addressRegion: "Tamil Nadu",
                    postalCode: "600002",
                    addressCountry: "IN",
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+91-7200630336",
                    contactType: "customer support",
                    areaServed: ["IN", "DE", "EU"],
                    availableLanguage: ["English", "German", "Tamil", "Hindi"],
                  },
                  sameAs: [
                    "https://www.instagram.com/skillang_careers/",
                    "https://in.linkedin.com/company/skillang",
                    "https://www.facebook.com/people/Skillang/61567723155875/",
                  ],
                  knowsAbout: [
                    "Nursing Recruitment to Germany",
                    "Study Abroad Programs",
                    "Work Abroad Opportunities",
                    "Overseas Education Consulting",
                  ],
                  serviceOffered: [
                    {
                      "@type": "Service",
                      name: "Nursing Recruitment to Germany",
                      serviceType: "Healthcare Recruitment",
                      areaServed: "Germany",
                    },
                    {
                      "@type": "Service",
                      name: "Study Abroad",
                      serviceType: "Overseas Education Consulting",
                      areaServed: ["Germany", "Europe", "Worldwide"],
                    },
                    {
                      "@type": "Service",
                      name: "Work Abroad",
                      serviceType: "International Career Placement",
                      areaServed: ["Germany", "Europe", "Worldwide"],
                    },
                  ],
                },
                {
                  "@type": "LocalBusiness",
                  name: "Skillang Careers Private Limited",
                  image: "https://www.skillang.com/logo.png",
                  url: "https://www.skillang.com",
                  telephone: "+91-7200630336",
                  priceRange: "₹₹",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress:
                      "The Executive Zone, 766, Anna Salai, Shakti Tower-1, Thousand Lights",
                    addressLocality: "Chennai",
                    addressRegion: "Tamil Nadu",
                    postalCode: "600002",
                    addressCountry: "IN",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: "13.0604",
                    longitude: "80.2508",
                  },
                  openingHoursSpecification: [
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ],
                      opens: "09:30",
                      closes: "18:30",
                    },
                  ],
                  sameAs: [
                    "https://www.instagram.com/skillang_careers/",
                    "https://in.linkedin.com/company/skillang",
                    "https://www.facebook.com/people/Skillang/61567723155875/",
                  ],
                },
              ],
            }),
          }}
        />

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FVV7MB911P"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-FVV7MB911P');`,
          }}
        ></script>

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
                var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l != "dataLayer" ? "&l=" + l : "";
                j.async = true;
                j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
                f.parentNode.insertBefore(j, f);
              })(window, document, "script", "dataLayer", "GTM-PV9TWV79");
            `,
          }}
        />

        {/* <noscript> */}
        {/* <img
            height="1"
            width="1"
            src="https://www.facebook.com/tr?id=1307874014390768&ev=PageView&noscript=1"
          /> */}
        {/* </noscript> */}
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LKWP21DZ9Q"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LKWP21DZ9Q');
            `,
          }}
        />

        {/* Calendly Widget */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />

        {/* <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" /> */}

        {/*  Meta Pixel Code */}

        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1307641273791008');
            fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1307641273791008&ev=PageView&noscript=1"
          />
        </noscript>
      </head>

      <body className="plus-jakarta-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PV9TWV79"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Hidden Verification */}
        <p style={{ display: "none" }}>Verification: 75dd3f6386e86235</p>

        {/* Main Layout */}
        <ConditionalLayout>
          <main id="skillang-app">{children}</main>
        </ConditionalLayout>

        {/* WhatsApp Button */}
        <WhatsappButtonsComp />
        {/* <Toaster
          position="top-center"
          richColors
          closeButton
          duration={4000}
          expand={false}
          visibleToasts={3}
          toastOptions={{
            style: {
              zIndex: 999999, // Higher than Bootstrap modal z-index
            },
          }}
        /> */}
      </body>
    </html>
  );
}
