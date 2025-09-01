// src/app/study-abroad/[slug]/page.jsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import CountryPage from "@/pages/main/countryPage";

export default function Country() {
  const params = useParams();
  const slug = params.slug;

  // Pass the slug as the country prop to your existing CountryPage component
  return <CountryPage country={slug} />;
}
