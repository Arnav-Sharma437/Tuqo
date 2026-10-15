"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

interface HeroBanner {
  _id?: string;
  title?: string;
  desktopImage: string;
  mobileImage: string;
}

const defaultSlides: HeroBanner[] = [
  {
    desktopImage: "/images/hero-banner-bg.png",
    mobileImage: "/images/hero-banner-bg.png",
  },
  {
    desktopImage: "/images/hero-bg.jpg",
    mobileImage: "/images/hero-bg.jpg",
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
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  const nextSlide = useCallback(() => {
    setActiveSlide((curr) => (curr + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((curr) => (curr - 1 + banners.length) % banners.length);
  }, [banners.length]);

  // Autoplay with pause on hover
  useEffect(() => {
    if (banners.length <= 1 || isHovered) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [banners.length, isHovered, nextSlide]);

  return (
    <section
      className="group relative w-full overflow-hidden bg-[#0a0b0e] aspect-[2.4/1] sm:aspect-[2.66/1] select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Slides */}
      <div className="absolute inset-0 z-0">
        {banners.map((slide, index) => (
          <div
            key={slide._id || `${slide.desktopImage}-${index}`}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              activeSlide === index ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
            }`}
            aria-hidden={activeSlide !== index}
          >
            {/* Desktop Banner Image */}
            <div className="hidden sm:block absolute inset-0">
              <Image
                src={slide.desktopImage}
                alt="TUQO Banner"
                fill
                priority={index === 0}
                unoptimized={slide.desktopImage.startsWith("http")}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            {/* Mobile Banner Image */}
            <div className="block sm:hidden absolute inset-0">
              <Image
                src={slide.mobileImage || slide.desktopImage}
                alt="TUQO Mobile Banner"
                fill
                priority={index === 0}
                unoptimized={(slide.mobileImage || slide.desktopImage).startsWith("http")}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows (xtrapowertools style: clean square, white -> red on hover, NO DOTS) */}
      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center bg-white text-gray-900 shadow-md transition-all hover:bg-[#d31820] hover:text-white active:scale-95 opacity-80 group-hover:opacity-100"
          >
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center bg-white text-gray-900 shadow-md transition-all hover:bg-[#d31820] hover:text-white active:scale-95 opacity-80 group-hover:opacity-100"
          >
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Signature Red Accent Line */}
      <div className="absolute bottom-0 left-0 z-20 h-[3px] w-full bg-[#d31820]" />
    </section>
  );
}

export default HeroSection;
