import React from "react";
import {
  HeroSection,
  TrustStrip,
  CategorySection,
  FeatureBanner,
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

      {/* 4. BRAND / FEATURE BANNER */}
      <FeatureBanner />

      {/* 5. CONTACT SECTION */}
      <ContactSection />
    </div>
  );
}
