"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/constants";
import { ArrowRightIcon } from "@/components/common/Icons";

export function CategorySection() {
  // Row 1 items (scrolling Left)
  const row1Items = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

  // Row 2 items with reversed order (scrolling Right)
  const row2Items = [
    ...CATEGORIES.slice().reverse(),
    ...CATEGORIES.slice().reverse(),
    ...CATEGORIES.slice().reverse(),
  ];

  return (
    <section
      id="categories"
      className="relative w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20"
    >
      {/* Background Subtle Pattern */}
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
                OUR CATEGORIES
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

        {/* Marquee Area */}
        <div className="relative w-full overflow-hidden space-y-4 py-2">
          {/* Left & Right Clean White Edge Fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-12 sm:w-20 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-12 sm:w-20 bg-gradient-to-l from-white via-white/80 to-transparent" />

          {/* Row 1: Scrolling Left */}
          <div className="fade-mask-x w-full overflow-hidden">
            <div className="animate-marquee flex items-stretch gap-4">
              {row1Items.map((category, index) => (
                <Link
                  key={`row1-${category.id}-${index}`}
                  href={category.href}
                  className="group relative flex h-[255px] w-[205px] sm:w-[225px] shrink-0 flex-col justify-between rounded-xl border border-gray-200 bg-[#fbfbfb] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/50 hover:bg-white hover:shadow-xl hover:shadow-black/5"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      TUQO PRO
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300 transition-colors group-hover:bg-[#e21b23]" />
                  </div>

                  {/* Image */}
                  <div className="relative mx-auto my-2 flex h-[110px] w-full items-center justify-center">
                    <div className="relative h-[95px] w-[95px] sm:h-[105px] sm:w-[105px] transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="160px"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Bottom Text & Button */}
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

          {/* Row 2: Scrolling Right (Opposite Direction) */}
          <div className="fade-mask-x w-full overflow-hidden">
            <div className="animate-marquee-reverse flex items-stretch gap-4">
              {row2Items.map((category, index) => (
                <Link
                  key={`row2-${category.id}-${index}`}
                  href={category.href}
                  className="group relative flex h-[255px] w-[205px] sm:w-[225px] shrink-0 flex-col justify-between rounded-xl border border-gray-200 bg-[#fbfbfb] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/50 hover:bg-white hover:shadow-xl hover:shadow-black/5"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      INDUSTRIAL
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300 transition-colors group-hover:bg-[#e21b23]" />
                  </div>

                  {/* Image */}
                  <div className="relative mx-auto my-2 flex h-[110px] w-full items-center justify-center">
                    <div className="relative h-[95px] w-[95px] sm:h-[105px] sm:w-[105px] transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="160px"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Bottom Text & Button */}
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
