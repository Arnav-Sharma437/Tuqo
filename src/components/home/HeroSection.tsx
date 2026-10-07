import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/Icons";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#08090b] text-white">

      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_50%,rgba(226,27,35,0.16),transparent_42%)]" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#08090b] via-[#08090b]/90 to-[#08090b]/35" />

      <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[420px] w-[420px] rounded-full bg-red-600/10 blur-[140px]" />


      {/* ================= MAIN HERO ================= */}

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">

        <div className="grid min-h-[540px] items-center gap-4 py-12 sm:min-h-[580px] sm:py-14 lg:grid-cols-12 lg:py-16">


          {/* ================= LEFT CONTENT ================= */}

          <div className="relative z-20 lg:col-span-6">

            {/* Label */}

            <div className="mb-4 flex items-center gap-2.5">

              <span className="h-[3px] w-7 bg-[#e21b23]" />

              <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23] sm:text-[10px]">
                PROFESSIONAL MACHINERY & POWER TOOLS
              </span>

            </div>


            {/* Main Heading */}

            <h1 className="max-w-[650px] text-4xl font-black uppercase leading-[0.93] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-[60px] xl:text-[64px]">

              <span className="block text-white">
                POWERING
              </span>

              <span className="block text-white">
                EVERY JOB.
              </span>

              <span className="mt-1 block text-[#e21b23]">
                BUILT FOR
              </span>

              <span className="block text-[#e21b23]">
                PERFORMANCE.
              </span>

            </h1>


            {/* Description */}

            <p className="mt-6 max-w-[610px] text-xs leading-5 text-gray-400 sm:text-sm sm:leading-6">

              High Pressure Washers, Vacuum Cleaners, Air Compressors,
              Power Tools and Accessories — professional equipment built
              for demanding work.

            </p>


            {/* ================= BUTTONS ================= */}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              <Link
                href="#categories"
                className="group inline-flex h-11 w-[210px] min-w-[210px] items-center justify-center gap-2 rounded-md bg-[#e21b23] px-5 text-[12px] font-extrabold uppercase tracking-wider text-white shadow-[0_8px_25px_rgba(226,27,35,0.20)] transition-all duration-300 hover:bg-[#ff252d] hover:shadow-[0_10px_30px_rgba(226,27,35,0.30)]"
              >
                <span>
                  Explore Products
                </span>

                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>


              <Link
                href="#catalog"
                className="inline-flex h-11 w-[210px] min-w-[210px] items-center justify-center gap-2 rounded-md border border-white/25 bg-white/[0.03] px-5 text-[12px] font-extrabold uppercase tracking-wider text-white transition-all duration-300 hover:border-white/50 hover:bg-white/[0.08]"
              >
                Download Catalog
              </Link>

            </div>


            {/* ================= TRUST POINTS ================= */}

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">

              <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-gray-500 sm:text-[9px]">
                Genuine Products
              </span>

              <span className="h-1 w-1 rounded-full bg-[#e21b23]" />

              <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-gray-500 sm:text-[9px]">
                Pan-India Delivery
              </span>

              <span className="h-1 w-1 rounded-full bg-[#e21b23]" />

              <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-gray-500 sm:text-[9px]">
                Technical Support
              </span>

            </div>

          </div>


          {/* ================= RIGHT PRODUCT IMAGE ================= */}

          <div className="relative z-10 lg:col-span-6">

            {/* Product Glow */}

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[100px] sm:h-[460px] sm:w-[460px]" />


            {/* Product Image */}

            <div className="relative mx-auto w-full max-w-[720px]">

              <div className="relative aspect-[4/3] w-full">

                <Image
                  src="/images/hero-products.png"
                  alt="TUQO Professional Cleaning and Power Tools"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain object-center drop-shadow-[0_30px_60px_rgba(0,0,0,0.85)] transition-transform duration-700 hover:scale-[1.03]"
                />

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ================= RED BOTTOM LINE ================= */}

      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#e21b23]" />

    </section>
  );
}
