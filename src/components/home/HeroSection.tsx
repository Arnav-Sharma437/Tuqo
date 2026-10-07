import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/Icons";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#08090b] text-white">
      {/* Background image / industrial atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(225,29,38,0.20),transparent_42%)]" />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#08090b] via-[#08090b]/85 to-[#08090b]/20" />

      {/* Subtle red glow */}
      <div className="absolute right-[5%] top-[20%] h-[350px] w-[350px] rounded-full bg-red-600/10 blur-[110px]" />

      {/* Main Hero */}
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">

        <div className="grid min-h-[560px] items-center lg:grid-cols-12 lg:gap-6 xl:min-h-[650px]">

          {/* ================= LEFT CONTENT ================= */}
          <div className="relative z-20 py-14 text-center lg:col-span-6 lg:py-20 lg:text-left">

            {/* Eyebrow */}
            <div className="mb-5 flex items-center justify-center gap-3 lg:justify-start">
              <span className="h-[2px] w-8 bg-[#e21b23]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#ef2b32] sm:text-xs">
                PROFESSIONAL CLEANING & POWER SOLUTIONS
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl font-black uppercase leading-[0.92] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-6xl xl:text-[78px]">

              <span className="block text-white">
                POWERING
              </span>

              <span className="block text-white">
                EVERY JOB.
              </span>

              <span className="block text-[#e21b23]">
                BUILT FOR
              </span>

              <span className="block text-[#e21b23]">
                PERFORMANCE.
              </span>

            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-gray-300 sm:text-base sm:leading-7 lg:mx-0">
              High Pressure Washers, Vacuum Cleaners, Air Compressors,
              Power Tools and Accessories for a cleaner, faster and more
              productive tomorrow.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">

              <Link
                href="#categories"
                className="group inline-flex min-w-[175px] items-center justify-center gap-2 rounded-md bg-[#e21b23] px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-[0_10px_30px_rgba(226,27,35,0.25)] transition-all duration-300 hover:bg-[#ff252d] hover:shadow-[0_12px_35px_rgba(226,27,35,0.40)]"
              >
                Explore Products

                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="#catalog"
                className="inline-flex min-w-[175px] items-center justify-center gap-2 rounded-md border border-white/30 bg-white/[0.04] px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10"
              >
                Download Catalog
              </Link>

            </div>

          </div>

          {/* ================= RIGHT PRODUCT IMAGE ================= */}
          <div className="relative z-10 lg:col-span-6">

            {/* Glow behind products */}
            <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[90px] sm:h-[450px] sm:w-[450px]" />

            <div className="relative mx-auto w-full max-w-[760px]">

              <div className="relative aspect-[4/3] w-full">

                <Image
                  src="/images/hero-products.png"
                  alt="TUQO Professional Cleaning and Power Tools"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain object-center drop-shadow-[0_30px_55px_rgba(0,0,0,0.85)]"
                />

              </div>

            </div>
          </div>
        </div>

        {/* ================= TRUST BAR ================= */}
        <div className="relative z-30 border-t border-white/10">

          <div className="grid grid-cols-2 lg:grid-cols-4">

            {/* Item 1 */}
            <div className="flex items-center gap-3 border-b border-white/10 px-3 py-5 sm:px-5 lg:border-b-0 lg:border-r">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-lg">
                ⚙
              </div>

              <div>
                <h3 className="text-[10px] font-extrabold uppercase tracking-wide text-white sm:text-xs">
                  Wide Range
                </h3>

                <p className="mt-1 text-[8px] text-gray-400 sm:text-[9px]">
                  Professional & home use
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-3 border-b border-white/10 px-3 py-5 sm:px-5 lg:border-b-0 lg:border-r">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-lg">
                ◇
              </div>

              <div>
                <h3 className="text-[10px] font-extrabold uppercase tracking-wide text-white sm:text-xs">
                  Reliable Performance
                </h3>

                <p className="mt-1 text-[8px] text-gray-400 sm:text-[9px]">
                  Built for tough conditions
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-3 px-3 py-5 sm:px-5 lg:border-r lg:border-white/10">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-lg">
                ♧
              </div>

              <div>
                <h3 className="text-[10px] font-extrabold uppercase tracking-wide text-white sm:text-xs">
                  Expert Support
                </h3>

                <p className="mt-1 text-[8px] text-gray-400 sm:text-[9px]">
                  Assistance before & after purchase
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center gap-3 px-3 py-5 sm:px-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-lg">
                🚚
              </div>

              <div>
                <h3 className="text-[10px] font-extrabold uppercase tracking-wide text-white sm:text-xs">
                  Pan India Availability
                </h3>

                <p className="mt-1 text-[8px] text-gray-400 sm:text-[9px]">
                  Get your tools wherever you are
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom red line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#e21b23]" />
    </section>
  );
}
