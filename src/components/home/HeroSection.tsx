
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/Icons";

const slides = [
  {
    image: "/images/hero-banner-bg.png",
    alt: "TUQO professional machinery and power tools",
    eyebrow: "PROFESSIONAL MACHINERY & POWER TOOLS",
    description:
      "High Pressure Washers, Air Compressors, Power Tools and Accessories — professional equipment built for demanding work.",
  },
  {
    image: "/images/cat-pressure-washer.png",
    alt: "TUQO professional high pressure washer",
    eyebrow: "POWERFUL CLEANING SOLUTIONS",
    description:
      "Explore professional high pressure washers engineered for powerful cleaning and reliable performance.",
  },
  {
    image: "/images/cat-air-compressor.png",
    alt: "TUQO professional air compressor",
    eyebrow: "INDUSTRIAL AIR SOLUTIONS",
    description:
      "Discover dependable air compressors designed for workshops and demanding professional applications.",
  },
  {
    image: "/images/cat-power-tools.png",
    alt: "TUQO professional power tools",
    eyebrow: "TOOLS FOR PROFESSIONALS",
    description:
      "Discover professional power tools and accessories built to support demanding jobs.",
  },
];

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [paused]);

  const currentSlide = slides[activeSlide];

  const showPrevious = () => {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  return (
    <section
      className="relative isolate flex min-h-[540px] w-full items-center overflow-hidden bg-[#08090b] text-white sm:min-h-[600px] lg:min-h-[660px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Sliding Background Images */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
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
              className={`object-cover ${
                index === 0
                  ? "object-center brightness-90 contrast-105"
                  : "object-contain p-8 brightness-90 sm:p-12 lg:p-16"
              }`}
            />
          </div>
        ))}

        {/* Readable Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-black/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl text-left">
          {/* Eyebrow */}
          <div className="mb-4 flex items-center gap-2.5">
            <span className="h-[3px] w-7 bg-[#e21b23]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23] sm:text-xs">
              {currentSlide.eyebrow}
            </span>
          </div>

          {/* Main Heading */}
          <h1
            key={activeSlide}
            className="animate-hero-content text-4xl font-black uppercase leading-[0.94] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[62px]"
          >
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
          <p
            key={`description-${activeSlide}`}
            className="mt-5 max-w-xl text-xs font-medium leading-5 text-gray-200 drop-shadow-sm sm:text-sm sm:leading-6"
          >
            {currentSlide.description}
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

      {/* Previous / Next Controls */}
      <div className="absolute bottom-7 right-5 z-20 flex items-center gap-3 sm:bottom-9 sm:right-9">
        <button
          type="button"
          onClick={showPrevious}
          aria-label="Previous slide"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur transition hover:border-[#e21b23] hover:bg-[#e21b23]"
        >
          <span className="text-xl leading-none">‹</span>
        </button>

        <div className="flex items-center gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? "w-7 bg-[#e21b23]"
                  : "w-1.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={showNext}
          aria-label="Next slide"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur transition hover:border-[#e21b23] hover:bg-[#e21b23]"
        >
          <span className="text-xl leading-none">›</span>
        </button>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 z-10 h-[2px] w-full bg-[#e21b23]" />
    </section>
  );
}
