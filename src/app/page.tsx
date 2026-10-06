import React from "react";
import {
  HeroSection,
  TrustStrip,
  CategorySection,
  FlagshipSpotlight,
  FeatureBanner,
  EngineeringAdvantage,
  IndustriesServed,
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

      {/* 3. PRODUCT CATEGORIES (Continuous marquee scroll framed in container with edge fades) */}
      <CategorySection />

      {/* 4. FLAGSHIP SPOTLIGHT (Technical specs & top industrial machines) */}
      <FlagshipSpotlight />

      {/* 5. FULL-WIDTH FEATURE BANNER (Engineered for Real Work) */}
      <FeatureBanner />

      {/* 6. ENGINEERING ADVANTAGES (Why TUQO: Pure copper, brass pump heads, overload failsafe) */}
      <EngineeringAdvantage />

      {/* 7. INDUSTRIES SERVED (Automotive, Fabrication, Construction, Facilities) */}
      <IndustriesServed />

      {/* 8. E-CATALOG DOWNLOAD CTA STRIP */}
      <CatalogCTA />

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <FaqSection />

      {/* 10. CONTACT SECTION */}
      <ContactSection />
    </div>
  );
}
