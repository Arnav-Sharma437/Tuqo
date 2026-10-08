import React from "react";
import {
  HeroSection,
  CategorySection,
  FlagshipSpotlight,
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

      {/* 3. FLAGSHIP SPOTLIGHT */}
      <FlagshipSpotlight />

      {/* 4. E-CATALOG DOWNLOAD CTA STRIP */}
      <CatalogCTA />

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <FaqSection />

      {/* 6. CONTACT SECTION */}
      <ContactSection />

    </div>
  );
}
