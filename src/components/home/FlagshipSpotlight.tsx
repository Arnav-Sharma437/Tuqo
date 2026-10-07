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
    <section className="w-full bg-[#f5f5f5] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">

        {/* ================= HEADER ================= */}
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-[3px] w-7 bg-[#e21b23]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23] sm:text-xs">
                POPULAR CHOICES
              </span>
            </div>

            <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-[#111214] sm:text-4xl lg:text-5xl">
              HEAVY-DUTY MACHINERY
              <br className="hidden sm:block" />
              <span className="text-[#e21b23]"> BUILT FOR PROS</span>
            </h2>
          </div>

          {/* Desktop button */}
          <Link
            href="/products"
            className="group hidden h-11 min-w-[175px] items-center justify-center gap-2 border border-[#111214] px-5 text-[10px] font-extrabold uppercase tracking-wide text-[#111214] transition-all duration-300 hover:border-[#e21b23] hover:bg-[#e21b23] hover:text-white sm:inline-flex"
          >
            Explore All Machinery

            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ================= PRODUCT GRID ================= */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {flagships.map((machine) => (
            <article
              key={machine.title}
              className="group flex flex-col overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/40 hover:shadow-xl hover:shadow-black/10"
            >

              {/* Product Image */}
              <div className="relative flex h-[240px] items-center justify-center overflow-hidden bg-[#f8f8f8] sm:h-[260px]">

                {/* Category label */}
                <div className="absolute left-4 top-4 z-10">
                  <span className="rounded-sm bg-[#111214] px-3 py-1.5 text-[8px] font-extrabold uppercase tracking-wider text-white">
                    {machine.category}
                  </span>
                </div>

                {/* Red tag */}
                <div className="absolute right-4 top-4 z-10">
                  <span className="rounded-sm bg-[#e21b23] px-2.5 py-1.5 text-[8px] font-extrabold uppercase tracking-wider text-white">
                    {machine.tag}
                  </span>
                </div>

                <div className="relative h-[190px] w-[85%] transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={machine.image}
                    alt={machine.title}
                    fill
                    sizes="400px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Product Information */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">

                <h3 className="text-base font-black uppercase leading-tight tracking-tight text-[#111214] transition-colors group-hover:text-[#e21b23] sm:text-lg">
                  {machine.title}
                </h3>

                {/* Specs */}
                <div className="mt-5 divide-y divide-gray-100 border-y border-gray-100">
                  {machine.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between gap-4 py-2.5"
                    >
                      <span className="text-[9px] font-medium uppercase tracking-wide text-gray-500">
                        {spec.label}
                      </span>

                      <span className="text-right text-[9px] font-bold text-gray-900">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                    Technical Details
                  </span>

                  <Link
                    href={machine.href}
                    className="group/button inline-flex h-11 min-w-[175px] shrink-0 items-center justify-center gap-2 rounded-sm bg-[#111214] px-5 text-[10px] font-extrabold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#e21b23]"
                  >
                    View Product

                    <ArrowRightIcon className="h-3 w-3 transition-transform group-hover/button:translate-x-1" />
                  </Link>
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-7 flex justify-center sm:hidden">
          <Link
            href="/products"
            className="inline-flex h-11 min-w-[175px] items-center justify-center gap-2 border border-[#111214] px-5 text-[10px] font-extrabold uppercase tracking-wide text-[#111214] transition-all hover:border-[#e21b23] hover:bg-[#e21b23] hover:text-white"
          >
            Explore All Machinery

            <ArrowRightIcon className="h-3 w-3" />
          </Link>
        </div>

      </div>
    </section>
  );
}
