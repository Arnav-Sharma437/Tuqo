import React from "react";
import {
  HeroSection,
  CategorySection,
  FlagshipSpotlight,
  FeatureBanner,
  CatalogCTA,
  FaqSection,
  ContactSection,
} from "@/components/home";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <HeroSection />

      <CategorySection />

      <FlagshipSpotlight />

      <FeatureBanner />

      <CatalogCTA />

      <FaqSection />

      <ContactSection />
    </div>
  );
}
