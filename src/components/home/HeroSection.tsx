
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/Icons";

const slides = [
  {
    image: "/images/cat-pressure-washer.png",
    alt: "TUQO professional high pressure washer",
    label: "01 / POWERFUL CLEANING",
    eyebrow: "ENGINEERED FOR PERFORMANCE",
    title: "POWERING",
    highlight: "EVERY JOB.",
    description:
      "Professional high pressure washers designed for powerful cleaning, reliability and demanding daily use.",
    category: "HIGH PRESSURE WASHERS",
    href: "/products/high-pressure-washer",
  },
  {
    image: "/images/cat-air-compressor.png",
    alt: "TUQO professional air compressor",
    label: "02 / INDUSTRIAL AIR",
    eyebrow: "POWER YOUR WORKSHOP",
    title: "BUILT TO",
    highlight: "PERFORM.",
    description:
      "Dependable compressed-air solutions designed for workshops and professional applications.",
    category: "AIR COMPRESSORS",
    href: "/products/air-compressor",
  },
  {
    image: "/images/cat-power-tools.png",
    alt: "TUQO professional power tools",
    label: "03 / PRECISION TOOLS",
    eyebrow: "MADE FOR THE DEMANDING",
    title: "WORK",
    highlight: "SMARTER.",
    description:
      "Discover professional power tools built to deliver dependable performance on every job.",
    category: "POWER TOOLS",
    href: "/products/power-tools",
  },
  {
    image: "/images/cat-accessories.png",
    alt: "TUQO professional equipment accessories",
    label: "04 / THE RIGHT ACCESSORIES",
    eyebrow: "COMPLETE YOUR SETUP",
    title: "DETAILS",
    highlight: "MATTER.",
    description:
      "Explore practical accessories designed to complement your professional equipment.",
    category: "EQUIPMENT ACCESSORIES",
    href: "/products/power-tools-accessories",
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

  const slide = slides[activeSlide];

  return (
    <section className="relative isolate min-h-[570px] overflow-hidden bg-[#090a0c] text-white sm:min-h-[630px] lg:min-h-[690px]">
      {/* Background design */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(226,27,35,0.17),transparent_48%)]" />

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        <div className="absolute -right-32 top-10 h-[420px] w-[420px] rounded-full border border-white/[0.06] sm:h-[560px] sm:w-[560px]" />

        <div className="absolute -right-16 top-24 h-[320px] w-[320px] rounded-full border border-[#e21b23]/20 sm:h-[450px] sm:w-[450px]" />

        <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Main layout */}
      <div className="relative mx-auto grid min-h-[570px] max-w-[1500px] grid-cols-1 items-center gap-4 px-5 py-12 sm:min-h-[630px] sm:px-8 lg:min-h-[690px] lg:grid-cols-[0.95fr_1.05fr] lg:gap-0 lg:px-12 lg:py-10">
        {/* Left content */}
        <div className="relative z-10 flex flex-col items-start justify-center">
          <div
            key={`eyebrow-${activeSlide}`}
            className="animate-hero-content mb-5 flex items-center gap-3"
          >
            <span className="h-[2px] w-9 bg-[#e21b23]" />

            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#ff4a50] sm:text-xs">
              {slide.eyebrow}
            </span>
          </div>

          <div
            key={`title-${activeSlide}`}
            className="animate-hero-content"
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 sm:text-xs">
              PROFESSIONAL MACHINERY &amp; POWER TOOLS
            </p>

            <h1 className="max-w-[700px] text-[43px] font-black uppercase leading-[0.91] tracking-[-0.055em] sm:text-6xl md:text-7xl xl:text-[82px]">
              <span className="block">{slide.title}</span>

              <span className="mt-2 block text-[#e21b23]">
                {slide.highlight}
              </span>
            </h1>
          </div>

          <p
            key={`description-${activeSlide}`}
            className="animate-hero-content mt-6 max-w-[440px] text-sm leading-6 text-gray-300 sm:text-base sm:leading-7"
          >
            {slide.description}
          </p>

          {/* Buttons */}
          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href={slide.href}
              className="group inline-flex h-12 items-center justify-center gap-4 rounded-sm bg-[#e21b23] px-6 text-xs font-extrabold uppercase tracking-wide text-white shadow-[0_8px_30px_rgba(226,27,35,0.22)] transition duration-300 hover:bg-red-600 hover:shadow-[0_10px_35px_rgba(226,27,35,0.4)] sm:min-w-[190px]"
            >
              Explore Products
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="#catalog"
              className="inline-flex h-12 items-center justify-center gap-3 border border-white/20 bg-white/[0.03] px-6 text-xs font-extrabold uppercase tracking-wide text-white transition duration-300 hover:border-white/50 hover:bg-white/[0.08] sm:min-w-[175px]"
            >
              Download Catalog
              <span className="text-base text-[#e21b23]">↗</span>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-white/10 pt-5 text-[9px] font-bold uppercase tracking-[0.12em] text-gray-400 sm:gap-x-5">
            <span>Genuine Products</span>
            <span className="h-1 w-1 rounded-full bg-[#e21b23]" />
            <span>Pan-India Delivery</span>
            <span className="h-1 w-1 rounded-full bg-[#e21b23]" />
            <span>Technical Support</span>
          </div>
        </div>

        {/* Right product showcase */}
        <div className="relative flex min-h-[270px] items-center justify-center sm:min-h-[350px] lg:min-h-[490px]">
          {/* Decorative circle */}
          <div className="absolute left-1/2 top-1/2 aspect-square w-[78%] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" />

          <div className="absolute left-1/2 top-1/2 aspect-square w-[62%] max-w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e21b23]/20" />

          {/* Red glow behind product */}
          <div className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e21b23]/20 blur-[70px] sm:h-[280px] sm:w-[280px] sm:blur-[100px]" />

          {/* Product image */}
          {slides.map((item, index) => (
            <div
              key={item.image}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                activeSlide === index
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-3 scale-[0.97] opacity-0"
              }`}
              aria-hidden={activeSlide !== index}
            >
              <div className="relative h-[250px] w-full sm:h-[340px] lg:h-[440px]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)]"
                />
              </div>
            </div>
          ))}

          {/* Category label */}
          <div className="absolute bottom-1 right-0 hidden max-w-[240px] border-l-2 border-[#e21b23] bg-black/40 px-5 py-3 backdrop-blur-sm sm:block lg:bottom-5 lg:right-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
              CURRENT COLLECTION
            </p>

            <p
              key={`category-${activeSlide}`}
              className="mt-1 text-xs font-extrabold uppercase tracking-wide text-white"
            >
              {slide.category}
            </p>
          </div>

          {/* Slide number */}
          <div className="absolute right-1 top-1 hidden items-center gap-3 sm:flex lg:right-4 lg:top-4">
            <span className="text-3xl font-black tracking-tighter text-white/90">
              {String(activeSlide + 1).padStart(2, "0")}
            </span>

            <span className="h-px w-10 bg-[#e21b23]" />

            <span className="text-xs font-bold text-white/35">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#e21b23] to-transparent" />
    </section>
  );
}
