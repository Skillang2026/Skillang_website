"use client";

import React from "react";
import { usePathname } from "next/navigation";
import "./WhatsappButton.css";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappButtonsComp = () => {
  const pathname = usePathname();

  // Define routes where WhatsApp button should be hidden
  const hideWhatsAppPaths = [
    "/nursing-in-germany",
    "/study-abroad-form",
    "/work-abroad-form",
    "/nurse-form", // 👈 Add your nurse-form route
  ];

  // Don't render if current path should hide WhatsApp button
  if (hideWhatsAppPaths.includes(pathname)) {
    return null;
  }

  return (
    <div>
      <a
        href="https://wa.me/7200630234"
        className="float-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default WhatsappButtonsComp;
