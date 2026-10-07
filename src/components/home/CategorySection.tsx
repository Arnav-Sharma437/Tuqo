"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/constants";
import { ArrowRightIcon } from "@/components/common/Icons";

export function CategorySection() {
  const sliderItems = [...CATEGORIES, ...CATEGORIES];

  return (
    <section
      id="categories"
      className="relative w-full overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(#d1d5db 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">

        {/* ================= HEADER ================= */}
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-[3px] w-7 bg-[#e21b23]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23] sm:text-xs">
                OUR CATEGORIES
              </span>
            </div>

            <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-[#111214] sm:text-4xl">
              EXPLORE OUR RANGE
            </h2>
          </div>

          {/* View All Categories */}
          <Link
            href="/products"
            className="hidden h-11 min-w-[175px] items-center justify-center gap-2 rounded-md border border-[#111214] px-5 text-[10px] font-extrabold uppercase tracking-wide text-[#111214] transition-all duration-300 hover:border-[#e21b23] hover:bg-[#e21b23] hover:text-white sm:inline-flex"
          >
            View All Categories
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* ================= CONTINUOUS SLIDER ================= */}
      <div className="relative mt-2 w-full overflow-hidden">

        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-12 bg-gradient-to-r from-white to-transparent sm:w-20" />

        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-12 bg-gradient-to-l from-white to-transparent sm:w-20" />

        <div className="flex w-max animate-[categoryScroll_28s_linear_infinite] hover:[animation-play-state:paused]">
          {sliderItems.map((category, index) => (
            <Link
              key={`${category.id}-${index}`}
              href={category.href}
              className="group mx-2 block w-[220px] shrink-0 overflow-hidden border border-gray-200 bg-[#f8f8f8] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/50 hover:bg-white hover:shadow-xl hover:shadow-black/10 sm:w-[250px] sm:p-5"
            >

              {/* Top */}
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-bold uppercase tracking-wider text-gray-400 sm:text-[9px]">
                  TUQO PRO
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-gray-300 transition-colors group-hover:bg-[#e21b23]" />
              </div>

              {/* Product Image */}
              <div className="relative mx-auto my-4 h-[145px] w-full sm:h-[165px]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="250px"
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Bottom */}
              <div className="border-t border-gray-200 pt-3">

                <h3 className="min-h-[34px] text-center text-[11px] font-extrabold leading-tight text-gray-900 sm:text-xs">
                  {category.name}
                </h3>

                {/* View Products Button */}
                <div className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#111214] text-[10px] font-extrabold uppercase tracking-wide text-white transition-colors duration-300 group-hover:bg-[#e21b23]">
                  View Products
                  <ArrowRightIcon className="h-3 w-3" />
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ================= MOBILE BUTTON ================= */}
      <div className="mt-7 flex justify-center px-5 sm:hidden">
        <Link
          href="/products"
          className="inline-flex h-11 min-w-[175px] items-center justify-center gap-2 rounded-md border border-[#111214] px-5 text-[10px] font-extrabold uppercase tracking-wide text-[#111214] transition-all hover:border-[#e21b23] hover:bg-[#e21b23] hover:text-white"
        >
          View All Categories
          <ArrowRightIcon className="h-3 w-3" />
        </Link>
      </div>

      {/* ================= CONTINUOUS SCROLL ANIMATION ================= */}
      <style jsx>{`
        @keyframes categoryScroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
