"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/constants";
import { ArrowRightIcon } from "@/components/common/Icons";

export function CategorySection() {
  // Double categories list for seamless infinite continuous loop
  const marqueeList = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

  return (
    <section
      id="categories"
      className="relative w-full overflow-hidden bg-[#fafbfc] py-16 sm:py-20 lg:py-24"
    >
      {/* Background blueprint subtle dots pattern */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#d1d5db 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end mb-12">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-6 rounded-full bg-[#d31820]" />
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#d31820]">
                OUR CATEGORIES
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-gray-950 sm:text-3xl lg:text-4xl">
              DISCOVER OUR RANGE <br className="hidden sm:inline" />
              OF PRODUCTS
            </h2>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#d31820] transition-all duration-200 hover:bg-[#d31820] hover:text-white hover:border-[#d31820] shadow-xs"
          >
            <span>View All Products</span>
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Infinite Continuous Scroll Container with Left & Right Gradient Fade */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Visual Gradient Fades for fallback / layered effect */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-[#fafbfc] via-[#fafbfc]/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-[#fafbfc] via-[#fafbfc]/80 to-transparent" />

        {/* Marquee Track with fade mask */}
        <div className="fade-mask-x w-full">
          <div className="animate-marquee flex items-stretch gap-5 px-4">
            {marqueeList.map((category, index) => (
              <Link
                key={`${category.id}-${index}`}
                href={category.href}
                className="group relative flex w-[190px] sm:w-[220px] md:w-[230px] shrink-0 flex-col justify-between rounded-2xl border border-gray-200/90 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-red-400 hover:shadow-xl hover:shadow-red-500/10"
              >
                {/* Top Subtle Category Badge */}
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#d31820] transition-colors">
                    TUQO TOOL
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-300 group-hover:bg-[#d31820] transition-colors" />
                </div>

                {/* Product Image Stage */}
                <div className="relative mx-auto my-3 flex h-32 w-full items-center justify-center">
                  <div className="relative h-28 w-28 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="180px"
                      className="object-contain drop-shadow-sm"
                    />
                  </div>
                </div>

                {/* Title & Interactive Bottom Indicator */}
                <div className="pt-2 border-t border-gray-100 flex flex-col justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug group-hover:text-[#d31820] transition-colors min-h-[36px] flex items-center justify-center">
                    {category.name}
                  </h3>

                  <div className="mt-3 flex items-center justify-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-600 transition-all duration-300 group-hover:border-[#d31820] group-hover:bg-[#d31820] group-hover:text-white shadow-xs group-hover:rotate-[-45deg]">
                      <ArrowRightIcon className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
