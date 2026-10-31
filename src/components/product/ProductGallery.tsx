"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { parseVideoUrl } from "@/lib/videoUtils";

interface ProductGalleryProps {
  mainImage: string;
  images?: string[];
  productName: string;
  videoUrl?: string;
}

export function ProductGallery({
  mainImage,
  images = [],
  productName,
  videoUrl,
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
  const [isVideoActive, setIsVideoActive] = useState(false);
  const activeImage = allImages[activeIndex] || allImages[0];

  const parsedVideo = React.useMemo(() => parseVideoUrl(videoUrl), [videoUrl]);

  // Lightbox modal state
  const [isOpen, setIsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsZoomed(false);
    setIsOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setIsZoomed(false);
  }, []);

  const showNext = useCallback(() => {
    setIsZoomed(false);
    setLightboxIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const showPrev = useCallback(() => {
    setIsZoomed(false);
    setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") showNext();
      else if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, closeLightbox, showNext, showPrev]);

  const currentLightboxImage = allImages[lightboxIndex] || allImages[0];

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        {/* Main Stage: Image or Video */}
        {isVideoActive && parsedVideo ? (
          <div className="relative flex aspect-square w-full items-center justify-center rounded-2xl bg-black border border-gray-900 shadow-md overflow-hidden">
            {/* Header / Switch back bar */}
            <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
              <span className="flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md">
                <span>▶</span>
                <span>Video Demo</span>
              </span>

              <button
                type="button"
                onClick={() => setIsVideoActive(false)}
                className="flex items-center gap-1.5 rounded-full bg-black/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white hover:bg-black transition border border-white/20"
              >
                <span>📷 View Photos</span>
              </button>
            </div>

            {/* Video Player */}
            <div className="relative h-full w-full flex items-center justify-center">
              {parsedVideo.type === "youtube" || parsedVideo.type === "vimeo" ? (
                <iframe
                  src={parsedVideo.embedUrl}
                  title={`${productName} Video Demonstration`}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={parsedVideo.embedUrl}
                  controls
                  autoPlay
                  className="h-full w-full object-contain"
                >
                  Your browser does not support HTML5 video.
                </video>
              )}
            </div>
          </div>
        ) : (
          /* Main Image Stage - Click to enlarge */
          <div
            onClick={() => openLightbox(activeIndex)}
            className="group relative flex aspect-square w-full items-center justify-center rounded-2xl bg-[#fafafa] border border-gray-200/80 p-6 sm:p-8 shadow-inner overflow-hidden cursor-zoom-in transition-all hover:border-[#e21b23]/40 hover:shadow-md"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(activeIndex);
              }
            }}
            aria-label={`Click to enlarge ${productName} image`}
          >
            {/* Zoom hint badge */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-gray-700 shadow-sm border border-gray-200/80 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all">
              <svg
                className="h-3.5 w-3.5 text-[#e21b23]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                />
              </svg>
              <span>Click to expand</span>
            </div>

            {/* Quick Watch Video Button on Main Image (if video exists) */}
            {parsedVideo && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVideoActive(true);
                }}
                className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-[11px] font-black uppercase tracking-wider shadow-lg transition-all hover:scale-105"
              >
                <span>▶</span>
                <span>Watch Video</span>
              </button>
            )}

            <div className="relative h-full w-full max-h-[350px] max-w-[350px] flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.04]">
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
              <span className="absolute bottom-3 right-3 z-10 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                {activeIndex + 1} / {allImages.length}
              </span>
            )}
          </div>
        )}

        {/* Thumbnails Row: Images + Video Thumbnail */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
          {/* Photos */}
          {allImages.map((img, idx) => (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => {
                setIsVideoActive(false);
                setActiveIndex(idx);
              }}
              onDoubleClick={() => {
                setIsVideoActive(false);
                openLightbox(idx);
              }}
              aria-label={`View image ${idx + 1}`}
              className={`relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white p-1 transition-all ${
                !isVideoActive && activeIndex === idx
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

          {/* Video Thumbnail Button (if video exists) */}
          {parsedVideo && (
            <button
              type="button"
              onClick={() => setIsVideoActive(true)}
              aria-label="Play product demonstration video"
              className={`group relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-[#121316] transition-all flex flex-col items-center justify-center ${
                isVideoActive
                  ? "border-red-600 shadow-md ring-2 ring-red-500/30 scale-105"
                  : "border-gray-300 opacity-80 hover:opacity-100 hover:border-red-500"
              }`}
            >
              {parsedVideo.thumbnailUrl ? (
                <div className="relative h-full w-full">
                  <Image
                    src={parsedVideo.thumbnailUrl}
                    alt={`${productName} video thumbnail`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white text-xs font-black shadow group-hover:scale-110 transition-transform">
                      ▶
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-1 text-center">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white text-[11px] font-black shadow mb-1">
                    ▶
                  </span>
                  <span className="text-[9px] font-black uppercase text-white tracking-wider">
                    Video
                  </span>
                </div>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-md p-4 sm:p-6 select-none"
          onClick={closeLightbox}
        >
          {/* Top Bar: Title & Controls */}
          <div
            className="flex items-center justify-between text-white border-b border-white/10 pb-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-[#e21b23] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                TUQO
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white truncate max-w-[200px] sm:max-w-md">
                {productName}
              </h4>
              {allImages.length > 1 && (
                <span className="text-xs text-gray-400 font-medium">
                  ({lightboxIndex + 1} of {allImages.length})
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {parsedVideo && (
                <button
                  type="button"
                  onClick={() => {
                    closeLightbox();
                    setIsVideoActive(true);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition"
                >
                  <span>▶ Play Video</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsZoomed((prev) => !prev)}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-white/20 hover:text-white transition"
                title={isZoomed ? "Zoom Out" : "Zoom In"}
              >
                <span>{isZoomed ? "🔍 1x (Fit)" : "🔍 1.5x (Zoom)"}</span>
              </button>

              <a
                href={currentLightboxImage}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-white/20 hover:text-white transition"
                title="Open original high-res image in new tab"
              >
                <span>↗ Fullscreen</span>
              </a>

              <button
                type="button"
                onClick={closeLightbox}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#e21b23] transition-colors"
                aria-label="Close image viewer"
                title="Close (Esc)"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Center Stage: Image and Left/Right Nav */}
          <div
            className="relative flex flex-1 items-center justify-center p-2 sm:p-6 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            {allImages.length > 1 && (
              <button
                type="button"
                onClick={showPrev}
                className="absolute left-2 sm:left-4 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 border border-white/20 text-white hover:bg-[#e21b23] hover:border-[#e21b23] transition shadow-lg text-2xl"
                aria-label="Previous image"
              >
                ‹
              </button>
            )}

            {/* Image Container */}
            <div
              onClick={() => setIsZoomed((prev) => !prev)}
              className={`relative h-full w-full max-h-[75vh] max-w-[85vw] flex items-center justify-center transition-transform duration-300 ${
                isZoomed ? "scale-125 cursor-zoom-out" : "scale-100 cursor-zoom-in"
              }`}
            >
              <Image
                src={currentLightboxImage}
                alt={`${productName} full view ${lightboxIndex + 1}`}
                fill
                unoptimized
                sizes="100vw"
                className="object-contain p-2"
                priority
              />
            </div>

            {/* Next Button */}
            {allImages.length > 1 && (
              <button
                type="button"
                onClick={showNext}
                className="absolute right-2 sm:right-4 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 border border-white/20 text-white hover:bg-[#e21b23] hover:border-[#e21b23] transition shadow-lg text-2xl"
                aria-label="Next image"
              >
                ›
              </button>
            )}
          </div>

          {/* Bottom Thumbnails */}
          {allImages.length > 1 && (
            <div
              className="flex items-center justify-center gap-2 overflow-x-auto pt-2 border-t border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {allImages.map((img, idx) => (
                <button
                  key={`lightbox-${img}-${idx}`}
                  type="button"
                  onClick={() => {
                    setLightboxIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-lg border-2 bg-white p-0.5 transition-all ${
                    lightboxIndex === idx
                      ? "border-[#e21b23] scale-110 ring-2 ring-[#e21b23]/50"
                      : "border-white/20 opacity-50 hover:opacity-100 hover:border-white/60"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="56px"
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
