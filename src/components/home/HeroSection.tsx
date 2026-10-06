import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/Icons";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0c0d10] text-white">
      {/* Background industrial ambience & glow elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(220,38,38,0.18),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0d10_0%,rgba(12,13,16,0.85)_50%,transparent_100%)] pointer-events-none z-10 hidden lg:block" />

      {/* Main Container */}
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-24 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Content Column */}
          <div className="z-20 text-center lg:col-span-6 lg:text-left">
            {/* Red Eyebrow Badge */}
            <div className="inline-block mb-3">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#e01e2b] sm:text-sm">
                PROFESSIONAL TOOLS FOR
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl leading-[1.05]">
              HIGHER
              <br />
              <span className="text-white">PERFORMANCE</span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-5 text-sm leading-relaxed text-gray-300 sm:text-base sm:leading-relaxed max-w-xl mx-auto lg:mx-0">
              Powerful. Reliable. Built for every challenge. Explore TUQO&apos;s range of high-quality tools designed for professionals and DIY enthusiasts.
            </p>

            {/* CTA Button */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <Link
                href="#categories"
                className="group inline-flex items-center gap-2 rounded bg-[#d71920] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-200 hover:bg-[#b8141a] hover:shadow-red-900/30 hover:shadow-xl active:scale-95"
              >
                <span>EXPLORE PRODUCTS</span>
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Product Showcase Column */}
          <div className="relative z-10 flex items-center justify-center lg:col-span-6">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Product composite visual with subtle drop shadow and lighting */}
              <div className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-2 shadow-2xl backdrop-blur-sm sm:p-4">
                <div className="relative aspect-[16/10] w-full sm:aspect-[16/9] lg:aspect-[4/3] max-h-[380px]">
                  <Image
                    src="/images/hero-products.png"
                    alt="TUQO Industrial Tools Collection"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-contain object-center drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
