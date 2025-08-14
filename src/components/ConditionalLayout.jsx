"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import FooterSection from "@/components/footer/footer";
import FreshNavbar from "./nav/new-nav";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Enhanced cleanup for browser extension attributes
  useEffect(() => {
    if (!isClient) return;

    const cleanupExtensionAttributes = () => {
      // More comprehensive list of extension attributes
      const extensionAttributes = [
        "fdprocessedid",
        "data-lastpass-icon-root",
        "data-dashlane-rid",
        "data-bitwarden-watching",
        "data-1password-uuid",
        "data-form-type",
        "data-gtm-form-interact-id",
      ];

      // Clean up all extension attributes
      extensionAttributes.forEach((attr) => {
        const elements = document.querySelectorAll(`[${attr}]`);
        elements.forEach((element) => {
          element.removeAttribute(attr);
        });
      });
    };

    // Initial cleanup
    cleanupExtensionAttributes();

    // Set up mutation observer to catch extensions adding attributes dynamically
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          const target = mutation.target;
          const attrName = mutation.attributeName;

          // Remove problematic attributes as soon as they're added
          if (
            attrName &&
            (attrName.includes("fdprocessedid") ||
              attrName.includes("data-lastpass") ||
              attrName.includes("data-dashlane") ||
              attrName.includes("data-bitwarden") ||
              attrName.includes("data-1password"))
          ) {
            target.removeAttribute(attrName);
          }
        }
      });
    });

    // Observe the entire document for attribute changes
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: [
        "fdprocessedid",
        "data-lastpass-icon-root",
        "data-dashlane-rid",
        "data-bitwarden-watching",
        "data-1password-uuid",
      ],
    });

    // Periodic cleanup as backup
    const interval = setInterval(cleanupExtensionAttributes, 2000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [isClient, pathname]);

  const hideNavbarPaths = [
    "/nursing-in-germany",
    "/study-abroad-form",
    "/work-abroad-form",
    "/nurse-form",
  ];

  const shouldHideNavFooter = hideNavbarPaths.includes(pathname);

  // Don't render until client-side to avoid hydration mismatches
  if (!isClient) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <>
      {!shouldHideNavFooter && <FreshNavbar />}
      {children}
      {!shouldHideNavFooter && <FooterSection />}
    </>
  );
}
