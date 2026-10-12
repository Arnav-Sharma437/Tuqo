"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES as DEFAULT_CATEGORIES } from "@/constants";
import { ArrowRightIcon } from "@/components/common/Icons";

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  href: string;
}

export function CategorySection({
  initialCategories,
}: {
  initialCategories?: CategoryItem[];
}) {
  const [categories, setCategories] = useState<CategoryItem[]>(
    initialCategories && initialCategories.length > 0 ? initialCategories : DEFAULT_CATEGORIES
  );

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
          const formatted: CategoryItem[] = data.categories.map((c: any) => ({
            id: c.slug || c._id,
            name: c.name,
            image: c.image,
            href: `/products/${c.slug}`,
          }));

          // Merge: ensure standard categories and any new backend-added categories are both present
          const map = new Map<string, CategoryItem>();
          DEFAULT_CATEGORIES.forEach((cat) => map.set(cat.href, cat));
          formatted.forEach((cat) => map.set(cat.href, cat));

          setCategories(Array.from(map.values()));
        }
      })
      .catch((err) => {
        console.error("Could not fetch live categories:", err);
      });
  }, []);

  // Repeat categories for continuous horizontal scrolling
  const rowItems = [...categories, ...categories, ...categories];

  return (
    <section
      id="categories"
      className="relative w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20"
    >
      {/* Background Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Main Container */}
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-[3px] w-7 bg-[#e21b23]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23] sm:text-xs">
                OUR PRODUCT RANGE
              </span>
            </div>

            <h2 className="text-2xl font-black uppercase leading-none tracking-tight text-[#111214] sm:text-3xl lg:text-4xl">
              EXPLORE OUR RANGE
            </h2>
          </div>

          <Link
            href="/categories"
            className="hidden h-11 w-[185px] shrink-0 items-center justify-center gap-2 rounded-md border border-[#111214] px-4 text-[13px] font-bold text-[#111214] transition-all duration-300 hover:border-[#e21b23] hover:bg-[#e21b23] hover:text-white sm:inline-flex"
          >
            <span>View All Categories</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Single Slider Row */}
        <div className="relative w-full overflow-hidden py-2">
          {/* Left Edge Fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-20" />

          {/* Right Edge Fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-20" />

          <div className="fade-mask-x w-full overflow-hidden">
            <div className="animate-marquee flex w-max items-stretch gap-4">
              {rowItems.map((category, index) => (
                <Link
                  key={`${category.id}-${index}`}
                  href={category.href}
                  className="group relative flex h-[255px] w-[205px] shrink-0 flex-col justify-between rounded-xl border border-gray-200 bg-[#fbfbfb] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/50 hover:bg-white hover:shadow-xl hover:shadow-black/5 sm:w-[225px]"
                >
                  {/* Top Label */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      TUQO PRO
                    </span>

                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300 transition-colors group-hover:bg-[#e21b23]" />
                  </div>

                  {/* Category Image */}
                  <div className="relative mx-auto my-2 flex h-[110px] w-full items-center justify-center">
                    <div className="relative h-[95px] w-[95px] transition-transform duration-500 group-hover:scale-110 sm:h-[105px] sm:w-[105px]">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="(max-width: 640px) 205px, 225px"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Category Name and Explore Button */}
                  <div className="border-t border-gray-200/80 pt-2.5">
                    <h3 className="truncate text-center text-xs font-black uppercase tracking-tight text-gray-900 transition-colors group-hover:text-[#e21b23]">
                      {category.name}
                    </h3>

                    <div className="mt-2.5 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#111214] text-xs font-bold text-white transition-colors duration-300 group-hover:bg-[#e21b23]">
                      <span>Explore</span>
                      <ArrowRightIcon className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View All Button */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/categories"
            className="inline-flex h-11 w-[185px] items-center justify-center gap-2 rounded-md border border-[#111214] px-4 text-[13px] font-bold text-[#111214] transition-all hover:border-[#e21b23] hover:bg-[#e21b23] hover:text-white"
          >
            <span>View All Categories</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
