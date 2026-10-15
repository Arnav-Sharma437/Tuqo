"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  mainImage: string;
  images?: string[];
  productName: string;
}

export function ProductGallery({
  mainImage,
  images = [],
  productName,
}: ProductGalleryProps) {
  // Consolidate images into unique list
  const allImages = React.useMemo(() => {
    const list = Array.isArray(images) && images.length > 0 ? [...images] : [];
    if (mainImage && !list.includes(mainImage)) {
      list.unshift(mainImage);
    }
    return list.length > 0 ? list : [mainImage || "/images/hero-products.png"];
  }, [mainImage, images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = allImages[activeIndex] || allImages[0];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image Stage */}
      <div className="relative flex aspect-square w-full items-center justify-center rounded-2xl bg-[#fafafa] border border-gray-200/80 p-6 sm:p-8 shadow-inner overflow-hidden">
        <div className="relative h-full w-full max-h-[350px] max-w-[350px] flex items-center justify-center transition-transform duration-300 hover:scale-[1.03]">
          <Image
            src={activeImage}
            alt={productName}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-contain p-2"
          />
        </div>

        {allImages.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            {activeIndex + 1} / {allImages.length}
          </span>
        )}
      </div>

      {/* Thumbnails Row if more than 1 image */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
          {allImages.map((img, idx) => (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setActiveIndex(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white p-1 transition-all ${
                activeIndex === idx
                  ? "border-[#e21b23] shadow-md ring-2 ring-[#e21b23]/20 scale-105"
                  : "border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-400"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
