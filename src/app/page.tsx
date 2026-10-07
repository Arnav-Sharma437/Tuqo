import React from "react";
import {
  HeroSection,
  TrustStrip,
  CategorySection,
  FlagshipSpotlight,
  FeatureBanner,
  CatalogCTA,
  FaqSection,
  ContactSection,
} from "@/components/home";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">

      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. TRUST / VALUE STRIP */}
      <TrustStrip />

      {/* 3. PRODUCT CATEGORIES */}
      <CategorySection />

      {/* 4. FLAGSHIP SPOTLIGHT */}
      <FlagshipSpotlight />

      {/* 5. FULL-WIDTH FEATURE BANNER */}
      <FeatureBanner />

      {/* 6. E-CATALOG DOWNLOAD CTA STRIP */}
      <CatalogCTA />

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <FaqSection />

      {/* 8. CONTACT SECTION */}
      <ContactSection />

    </div>
  );
}
