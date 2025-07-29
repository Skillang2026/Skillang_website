"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import FooterSection from "@/components/footer/footer";
import FreshNavbar from "./nav/new-nav";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  // Clean up browser extension attributes
  useEffect(() => {
    const cleanupExtensionAttributes = () => {
      // Remove fdprocessedid and other extension attributes
      const elements = document.querySelectorAll(
        "[fdprocessedid], [data-lastpass-icon-root]"
      );
      elements.forEach((element) => {
        element.removeAttribute("fdprocessedid");
        element.removeAttribute("data-lastpass-icon-root");
      });
    };

    // Run cleanup periodically
    const interval = setInterval(cleanupExtensionAttributes, 1000);

    return () => clearInterval(interval);
  }, [pathname]);

  const hideNavbarPaths = [
    "/nursing-in-germany",
    "/study-abroad-form",
    "/work-abroad-form",
    "/nurse-form", // 👈 Add this line
  ];

  const shouldHideNavFooter = hideNavbarPaths.includes(pathname);

  return (
    <>
      {!shouldHideNavFooter && <FreshNavbar />}
      {children}
      {!shouldHideNavFooter && <FooterSection />}
    </>
  );
}
