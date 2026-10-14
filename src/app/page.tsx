import React from "react";
import {
  HeroSection,
  BestSellerSection,
  CatalogCTA,
  CategorySection,
  FaqSection,
  ContactSection,
} from "@/components/home";
import {
  getLiveBanners,
  getLiveCategories,
  getLiveProducts,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [banners, categories, products] = await Promise.all([
    getLiveBanners(),
    getLiveCategories(),
    getLiveProducts(),
  ]);

  return (
    <div className="flex w-full flex-col">
      {/* 1. HERO SECTION */}
      <HeroSection initialBanners={banners} />

      {/* 2. OUR BEST SELLERS SLIDER (JUST BELOW BANNER) */}
      <BestSellerSection initialProducts={products} />

      {/* 3. E-CATALOG DOWNLOAD CTA STRIP */}
      <CatalogCTA />

      {/* 4. EXPLORE OUR RANGE (POSITIONED DIRECTLY ABOVE FAQ) */}
      <CategorySection initialCategories={categories} />

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <FaqSection />

      {/* 6. CONTACT SECTION (WORKING HOURS) */}
      <ContactSection />
    </div>
  );
}
