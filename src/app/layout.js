import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Script from "next/script";
import WhatsappButtonsComp from "@/components/buttons/whatsapp-button/WhatsappButtons";
import ConditionalLayout from "@/components/ConditionalLayout";
import Head from "next/head";

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
      </body>
    </html>
  );
}
