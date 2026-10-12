import React from "react";
import {
  HeroSection,
  CategorySection,
  CatalogCTA,
  FaqSection,
  ContactSection,
} from "@/components/home";
import { getLiveBanners, getLiveCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [banners, categories] = await Promise.all([
    getLiveBanners(),
    getLiveCategories(),
  ]);

  return (
    <div className="flex w-full flex-col">

      {/* 1. HERO SECTION */}
      <HeroSection initialBanners={banners} />

      {/* 2. PRODUCT CATEGORIES */}
      <CategorySection initialCategories={categories} />

      {/* 3. E-CATALOG DOWNLOAD CTA STRIP */}
      <CatalogCTA />

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <FaqSection />

      {/* 5. CONTACT SECTION */}
      <ContactSection />

    </div>
  );
}
