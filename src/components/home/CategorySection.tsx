"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/constants";
import { ArrowRightIcon } from "@/components/common/Icons";

export function CategorySection() {
  return (
    <section
      id="categories"
      className="relative w-full overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
    >
      {/* Subtle background */}
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

          <Link
            href="/products"
            className="group hidden items-center gap-2 text-[10px] font-extrabold uppercase tracking-wide text-[#e21b23] sm:flex"
          >
            View All Categories

            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ================= CATEGORY GRID ================= */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

          {CATEGORIES.slice(0, 5).map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden rounded-lg border border-gray-200 bg-[#f8f8f8] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/40 hover:bg-white hover:shadow-xl hover:shadow-black/10 sm:p-4"
            >

              {/* Top label */}
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-bold uppercase tracking-wider text-gray-400 sm:text-[9px]">
                  TUQO PRO
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-gray-300 transition-colors group-hover:bg-[#e21b23]" />
              </div>

              {/* Product Image */}
              <div className="relative mx-auto my-3 flex h-[130px] w-full items-center justify-center sm:h-[155px]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Bottom */}
              <div className="border-t border-gray-200 pt-3">

                <h3 className="min-h-[32px] text-center text-[11px] font-extrabold leading-tight text-gray-900 sm:text-xs">
                  {category.name}
                </h3>

                <div className="mt-3 flex items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-wide text-[#e21b23]">
                  View Products

                  <ArrowRightIcon className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
                </div>

              </div>

            </Link>
          ))}

        </div>

        {/* Mobile View All */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-[#e21b23] px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-wide text-[#e21b23]"
          >
            View All Categories
            <ArrowRightIcon className="h-3 w-3" />
          </Link>
        </div>

      </div>
    </section>
  );
}
