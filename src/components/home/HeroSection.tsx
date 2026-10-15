"use client";

import React, { useEffect, useState } from "react";
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
    }, 5500);

    return () => window.clearInterval(timer);
  }, [banners.length]);

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0b0e] h-[320px] sm:h-[450px] md:h-[540px] lg:h-[600px] xl:h-[640px]">
      {/* Background Slider - Pure Images Only */}
      <div className="absolute inset-0 z-0">
        {banners.map((slide, index) => (
          <div
            key={slide._id || `${slide.desktopImage}-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden={activeSlide !== index}
          >
            {/* Desktop Image */}
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

            {/* Mobile Image */}
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

      {/* Bottom Red Accent Line */}
      <div className="absolute bottom-0 left-0 z-10 h-[2.5px] w-full bg-[#e21b23]" />
    </section>
  );
}

export default HeroSection;
