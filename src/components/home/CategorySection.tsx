"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/constants";
import { ArrowRightIcon } from "@/components/common/Icons";

export function CategorySection() {
  // Row 1 items (scrolling Left)
  const row1Items = [...CATEGORIES, ...CATEGORIES];

  // Row 2 items with reversed initial order (scrolling Right)
  const row2Items = [...CATEGORIES.slice().reverse(), ...CATEGORIES.slice().reverse()];

  return (
    <section
      id="categories"
      className="relative w-full overflow-hidden bg-white py-14 sm:py-18 lg:py-20"
    >
      {/* Background Subtle Blueprint Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
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
            className="hidden h-11 w-[185px] shrink-0 items-center justify-center gap-2 rounded-md border border-[#111214] px-4 text-[12px] font-extrabold uppercase tracking-wide text-[#111214] transition-all duration-300 hover:border-[#e21b23] hover:bg-[#e21b23] hover:text-white sm:inline-flex"
          >
            <span>View All Categories</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Contained Two-Row Marquee Box with Edge Fades */}
        <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-50/60 p-4 sm:p-6 backdrop-blur-sm shadow-sm space-y-4">
          {/* Left & Right Container Edge Fade Masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-12 sm:w-20 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-12 sm:w-20 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent" />

          {/* Row 1: Scrolling Left */}
          <div className="fade-mask-x w-full overflow-hidden">
            <div className="animate-marquee flex items-stretch gap-3.5 sm:gap-4">
              {row1Items.map((category, index) => (
                <Link
                  key={`row1-${category.id}-${index}`}
                  href={category.href}
                  className="group relative flex w-[175px] sm:w-[200px] shrink-0 flex-col justify-between rounded-xl border border-gray-200 bg-white p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/50 hover:shadow-lg hover:shadow-black/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-gray-400">
                      TUQO PRO
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300 transition-colors group-hover:bg-[#e21b23]" />
                  </div>

                  <div className="relative mx-auto my-3 h-[105px] w-full sm:h-[115px]">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="200px"
                      className="object-contain p-1 transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="border-t border-gray-100 pt-2.5">
                    <h3 className="flex min-h-[30px] items-center justify-center text-center text-[10px] sm:text-[11px] font-extrabold leading-tight text-gray-900 group-hover:text-[#e21b23] transition-colors">
                      {category.name}
                    </h3>
                    <div className="mt-2.5 flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-[#111214] text-[10px] font-extrabold uppercase tracking-wide text-white transition-colors duration-300 group-hover:bg-[#e21b23]">
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
            <div className="animate-marquee-reverse flex items-stretch gap-3.5 sm:gap-4">
              {row2Items.map((category, index) => (
                <Link
                  key={`row2-${category.id}-${index}`}
                  href={category.href}
                  className="group relative flex w-[175px] sm:w-[200px] shrink-0 flex-col justify-between rounded-xl border border-gray-200 bg-white p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/50 hover:shadow-lg hover:shadow-black/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-gray-400">
                      INDUSTRIAL
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300 transition-colors group-hover:bg-[#e21b23]" />
                  </div>

                  <div className="relative mx-auto my-3 h-[105px] w-full sm:h-[115px]">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="200px"
                      className="object-contain p-1 transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="border-t border-gray-100 pt-2.5">
                    <h3 className="flex min-h-[30px] items-center justify-center text-center text-[10px] sm:text-[11px] font-extrabold leading-tight text-gray-900 group-hover:text-[#e21b23] transition-colors">
                      {category.name}
                    </h3>
                    <div className="mt-2.5 flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-[#111214] text-[10px] font-extrabold uppercase tracking-wide text-white transition-colors duration-300 group-hover:bg-[#e21b23]">
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
            className="inline-flex h-11 w-[185px] items-center justify-center gap-2 rounded-md border border-[#111214] px-4 text-[12px] font-extrabold uppercase tracking-wide text-[#111214] transition-all hover:border-[#e21b23] hover:bg-[#e21b23] hover:text-white"
          >
            <span>View All Categories</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
