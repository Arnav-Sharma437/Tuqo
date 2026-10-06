import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/Icons";

export function FlagshipSpotlight() {
  const flagships = [
    {
      title: "Commercial High-Pressure Washer",
      category: "Heavy Duty Cleaning",
      image: "/images/cat-pressure-washer.png",
      href: "/products/high-pressure-washer",
      specs: [
        { label: "Operating Pressure", value: "Up to 220 BAR" },
        { label: "Motor Spec", value: "100% Induction Copper" },
        { label: "Flow Capacity", value: "14 L / Min" },
        { label: "Pump Type", value: "Heavy Brass Crankshaft" },
      ],
      tag: "Top Industrial Seller",
    },
    {
      title: "Direct-Drive Air Compressor System",
      category: "Pneumatic Power",
      image: "/images/cat-air-compressor.png",
      href: "/products/air-compressor",
      specs: [
        { label: "Tank Capacity", value: "50L / 100L High Volume" },
        { label: "Delivery Pressure", value: "8 - 10 BAR" },
        { label: "Piston Unit", value: "Cast Iron Twin Cylinders" },
        { label: "Safety System", value: "Dual Auto Pressure Switch" },
      ],
      tag: "Workshop Standard",
    },
    {
      title: "Stainless Wet & Dry Industrial Vacuum",
      category: "Extraction & Cleaning",
      image: "/images/cat-vacuum-cleaner.png",
      href: "/products/vacuum-cleaner",
      specs: [
        { label: "Tank Build", value: "304 Stainless Steel Drum" },
        { label: "Motor Power", value: "Heavy Multi-Stage Turbine" },
        { label: "Filtration", value: "Washable HEPA + Foam" },
        { label: "Portability", value: "360° Reinforced Castor Base" },
      ],
      tag: "Garages & Detailing",
    },
  ];

  return (
    <section className="relative w-full bg-[#f6f7fb] py-16 sm:py-20 lg:py-24 border-b border-gray-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end mb-12">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-6 rounded-full bg-[#d31820]" />
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#d31820]">
                FLAGSHIP SPOTLIGHT
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-gray-950 sm:text-3xl lg:text-4xl">
              HEAVY-DUTY MACHINERY BUILT FOR PROS
            </h2>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d31820] hover:text-[#b8141a]"
          >
            <span>Explore All Machinery</span>
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Flagship Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {flagships.map((machine) => (
            <div
              key={machine.title}
              className="group flex flex-col justify-between rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-red-300 hover:shadow-2xl hover:shadow-red-500/10"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    {machine.category}
                  </span>
                  <span className="rounded-full bg-red-50 border border-red-200/60 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#d31820]">
                    {machine.tag}
                  </span>
                </div>

                {/* Machine Image Preview */}
                <div className="relative mx-auto my-6 flex h-48 w-full items-center justify-center rounded-2xl bg-gradient-to-b from-gray-50 to-transparent p-4">
                  <div className="relative h-40 w-40 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={machine.image}
                      alt={machine.title}
                      fill
                      sizes="220px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-black uppercase tracking-tight text-gray-950 group-hover:text-[#d31820] transition-colors">
                  {machine.title}
                </h3>

                {/* Technical Specs List */}
                <div className="mt-5 space-y-2 rounded-xl bg-gray-50/80 p-4 border border-gray-100 text-xs">
                  {machine.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between py-1 border-b border-gray-200/40 last:border-0"
                    >
                      <span className="text-gray-500 font-medium">{spec.label}</span>
                      <span className="font-bold text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Link */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-gray-950 transition-colors">
                  View Technical Spec Sheet
                </span>
                <Link
                  href={machine.href}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition-all duration-300 group-hover:bg-[#d31820] group-hover:scale-110 shadow-sm"
                  aria-label={`View ${machine.title}`}
                >
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
