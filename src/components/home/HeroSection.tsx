"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/Icons";

interface HeroBanner {
  _id?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  desktopImage: string;
  mobileImage: string;
  buttonText?: string;
  buttonLink?: string;
}

const defaultSlides: HeroBanner[] = [
  {
    title: "POWERING EVERY JOB. BUILT FOR PERFORMANCE.",
    subtitle: "High Pressure Washers, Air Compressors, Power Tools and Accessories — professional equipment built for demanding work.",
    badge: "PROFESSIONAL MACHINERY & POWER TOOLS",
    desktopImage: "/images/hero-banner-bg.png",
    mobileImage: "/images/hero-banner-bg.png",
    buttonText: "Explore Products",
    buttonLink: "#categories",
  },
  {
    title: "BUILT FOR A STRONGER TOMORROW.",
    subtitle: "Engineered with 100% pure copper induction motors and heavy-duty brass pumps.",
    badge: "COMMERCIAL & INDUSTRIAL GRADE",
    desktopImage: "/images/hero-bg.jpg",
    mobileImage: "/images/hero-bg.jpg",
    buttonText: "Explore Products",
    buttonLink: "#categories",
  },
];

export function HeroSection({
  initialBanners,
}: {
  initialBanners?: HeroBanner[];
}) {
  const [banners, setBanners] = useState<HeroBanner[]>(
    initialBanners && initialBanners.length > 0 ? initialBanners : defaultSlides
  );
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    // Fetch live banners from API
    fetch("/api/admin/banners")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.banners) && data.banners.length > 0) {
          const activeOnes = data.banners.filter((b: any) => b.active !== false);
          if (activeOnes.length > 0) {
            setBanners(activeOnes);
          }
        }
      })
      .catch((err) => {
        console.error("Could not fetch live banners:", err);
      });
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % banners.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [banners.length]);

  const currentBanner = banners[activeSlide] || banners[0] || defaultSlides[0];

  return (
    <section className="relative isolate flex min-h-[540px] w-full items-center overflow-hidden bg-[#08090b] text-white sm:min-h-[600px] lg:min-h-[660px]">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        {banners.map((slide, index) => (
          <div
            key={slide._id || `${slide.desktopImage}-${index}`}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={activeSlide !== index}
          >
            {/* Desktop Image */}
            <div className="hidden sm:block absolute inset-0">
              <Image
                src={slide.desktopImage}
                alt={slide.title || "TUQO Banner"}
                fill
                priority={index === 0}
                unoptimized={slide.desktopImage.startsWith("http")}
                sizes="100vw"
                className="object-cover object-center brightness-90 contrast-105"
              />
            </div>

            {/* Mobile Image */}
            <div className="block sm:hidden absolute inset-0">
              <Image
                src={slide.mobileImage || slide.desktopImage}
                alt={slide.title || "TUQO Banner"}
                fill
                priority={index === 0}
                unoptimized={(slide.mobileImage || slide.desktopImage).startsWith("http")}
                sizes="100vw"
                className="object-cover object-center brightness-90 contrast-105"
              />
            </div>
          </div>
        ))}

        {/* Dark overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl text-left">
          {/* Eyebrow / Badge */}
          <div className="mb-4 flex items-center gap-2.5">
            <span className="h-[3px] w-7 bg-[#e21b23]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23] sm:text-xs">
              {currentBanner.badge || "PROFESSIONAL MACHINERY & POWER TOOLS"}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl font-black uppercase leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-6xl text-white drop-shadow-md">
            {currentBanner.title}
          </h1>

          {/* Description */}
          {currentBanner.subtitle && (
            <p className="mt-5 max-w-xl text-xs font-medium leading-5 text-gray-200 drop-shadow-sm sm:text-sm sm:leading-6">
              {currentBanner.subtitle}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-start gap-3.5 sm:flex-row">
            <Link
              href={currentBanner.buttonLink || "#categories"}
              className="group inline-flex h-12 w-[210px] min-w-[210px] items-center justify-center gap-2 rounded-md bg-[#e21b23] px-5 text-[14px] font-bold text-white shadow-[0_8px_25px_rgba(226,27,35,0.4)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#ff252d] hover:shadow-[0_12px_32px_rgba(226,27,35,0.5)] active:scale-95"
            >
              <span>{currentBanner.buttonText || "Explore Products"}</span>
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/e-catalog"
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

          {/* Dots Indicator if multiple banners */}
          {banners.length > 1 && (
            <div className="mt-6 flex items-center gap-2">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    activeSlide === idx
                      ? "w-8 bg-[#e21b23]"
                      : "w-2 bg-white/40 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Red Accent */}
      <div className="absolute bottom-0 left-0 z-10 h-[2px] w-full bg-[#e21b23]" />
    </section>
  );
}

export default HeroSection;
