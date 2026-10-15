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

          // Use live categories directly so deletions remain permanent
          setCategories(formatted);
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

        {/* Single Slider Row without side fades */}
        <div className="relative w-full overflow-hidden py-2">
          <div className="w-full overflow-hidden">
            <div className="animate-marquee flex w-max items-stretch gap-4 hover:[animation-play-state:paused]">
              {rowItems.map((category, index) => (
                <Link
                  key={`${category.id}-${index}`}
                  href={category.href}
                  className="group relative flex h-[280px] w-[220px] shrink-0 flex-col justify-between rounded-2xl border border-gray-200 bg-[#fcfcfd] p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#e21b23]/50 hover:bg-white hover:shadow-xl hover:shadow-black/5 sm:w-[240px]"
                >
                  {/* Category Image - Large and filling */}
                  <div className="relative mx-auto my-auto flex h-[155px] w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-gray-50 to-[#f3f4f8] p-2">
                    <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="(max-width: 640px) 220px, 240px"
                        className="object-contain p-1 scale-110"
                      />
                    </div>
                  </div>

                  {/* Category Name and Explore Button */}
                  <div className="border-t border-gray-200/80 pt-2.5">
                    <h3 className="truncate text-center text-xs font-black uppercase tracking-tight text-gray-900 transition-colors group-hover:text-[#e21b23]">
                      {category.name}
                    </h3>

                    <div className="mt-2.5 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#111214] text-xs font-bold text-white transition-colors duration-300 group-hover:bg-[#e21b23]">
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
