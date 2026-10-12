
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/Icons";

const slides = [
  {
    image: "/images/hero-banner-bg.png",
    alt: "TUQO Professional Machinery and Power Tools",
  },
  {
    image: "/images/hero-bg.jpg",
    alt: "TUQO Industrial Machinery Banner",
  },
  {
    image: "/images/hero-products.png",
    alt: "TUQO Professional Product Range",
  },
];

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate flex min-h-[540px] w-full items-center overflow-hidden bg-[#08090b] text-white sm:min-h-[600px] lg:min-h-[660px]">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={activeSlide !== index}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center sm:object-bottom brightness-90 contrast-105"
            />
          </div>
        ))}

        {/* Original dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-black/40" />
      </div>

      {/* Original Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl text-left">
          {/* Eyebrow */}
          <div className="mb-4 flex items-center gap-2.5">
            <span className="h-[3px] w-7 bg-[#e21b23]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23] sm:text-xs">
              PROFESSIONAL MACHINERY &amp; POWER TOOLS
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl font-black uppercase leading-[0.94] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[62px]">
            <span className="block text-white drop-shadow-md">
              POWERING
            </span>
            <span className="block text-white drop-shadow-md">
              EVERY JOB.
            </span>
            <span className="mt-1 block text-[#e21b23] drop-shadow-md">
              BUILT FOR
            </span>
            <span className="block text-[#e21b23] drop-shadow-md">
              PERFORMANCE.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-xs font-medium leading-5 text-gray-200 drop-shadow-sm sm:text-sm sm:leading-6">
            High Pressure Washers, Air Compressors, Power Tools and
            Accessories — professional equipment built for demanding work.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-start gap-3.5 sm:flex-row">
            <Link
              href="#categories"
              className="group inline-flex h-12 w-[210px] min-w-[210px] items-center justify-center gap-2 rounded-md bg-[#e21b23] px-5 text-[14px] font-bold text-white shadow-[0_8px_25px_rgba(226,27,35,0.4)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#ff252d] hover:shadow-[0_12px_32px_rgba(226,27,35,0.5)] active:scale-95"
            >
              <span>Explore Products</span>
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="#catalog"
              className="inline-flex h-12 w-[210px] min-w-[210px] items-center justify-center gap-2 rounded-md border border-white/30 bg-black/40 px-5 text-[14px] font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-white/70 hover:bg-black/60 active:scale-95"
            >
              Download Catalog
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[9px] font-bold uppercase tracking-[0.16em] text-gray-300">
            <span>Genuine Products</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#e21b23]" />
            <span>Pan-India Delivery</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#e21b23]" />
            <span>Technical Support</span>
          </div>
        </div>
      </div>

      {/* Original Bottom Red Accent */}
      <div className="absolute bottom-0 left-0 z-10 h-[2px] w-full bg-[#e21b23]" />
    </section>
  );
}
