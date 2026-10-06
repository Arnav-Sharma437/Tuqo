import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/constants";
import { ArrowRightIcon } from "@/components/common/Icons";

export function CategorySection() {
  return (
    <section
      id="categories"
      className="relative w-full bg-[#f8f9fa] py-14 sm:py-18 lg:py-20"
      style={{
        backgroundImage: `radial-gradient(#e5e7eb 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#d71920]">
              OUR CATEGORIES
            </span>
            <h2 className="mt-1 text-2xl font-black uppercase tracking-tight text-gray-950 sm:text-3xl lg:text-4xl">
              DISCOVER OUR RANGE
              <br className="hidden sm:inline" /> OF PRODUCTS
            </h2>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#d71920] transition hover:text-[#b8141a]"
          >
            <span>View All Products</span>
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group flex flex-col justify-between rounded-xl border border-gray-200/80 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
            >
              {/* Product Image Area */}
              <div className="relative mx-auto mb-3 flex h-28 w-full items-center justify-center sm:h-32">
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 120px, 150px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Title & Arrow */}
              <div className="flex flex-1 flex-col justify-between pt-2">
                <h3 className="text-xs font-bold text-gray-900 leading-snug group-hover:text-[#d71920] transition-colors min-h-[32px] flex items-center justify-center">
                  {category.name}
                </h3>

                {/* Circle Arrow Indicator */}
                <div className="mt-3 flex justify-center">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-500 transition-all duration-200 group-hover:border-[#d71920] group-hover:bg-[#d71920] group-hover:text-white shadow-xs">
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
