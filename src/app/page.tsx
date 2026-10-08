import React from "react";
import {
  HeroSection,
  CategorySection,
  CatalogCTA,
  FaqSection,
  ContactSection,
} from "@/components/home";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">

      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. PRODUCT CATEGORIES */}
      <CategorySection />

      {/* 3. E-CATALOG DOWNLOAD CTA STRIP */}
      <CatalogCTA />

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <FaqSection />

      {/* 5. CONTACT SECTION */}
      <ContactSection />

    </div>
  );
}
