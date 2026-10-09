import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/Icons";

export const metadata = {
  title: "Product Categories | TUQO Tools",
  description:
    "Explore the complete range of TUQO professional machinery and power tools.",
};

const categories = [
  {
    no: "01",
    title: "TUQO PRO High Pressure Washers",
    desc: "Powerful cleaning solutions for professional washing and demanding cleaning tasks.",
    image: "/images/cat-pressure-washer.png",
    href: "/products/high-pressure-washer",
  },
  {
    no: "02",
    title: "TUQO PRO Vacuum Cleaners",
    desc: "Reliable wet and dry vacuum cleaning for workshops and commercial spaces.",
    image: "/images/cat-vacuum-cleaner.png",
    href: "/products/vacuum-cleaner",
  },
  {
    no: "03",
    title: "TUQO PRO Air Compressors",
    desc: "Dependable compressed-air solutions for professional applications.",
    image: "/images/cat-air-compressor.png",
    href: "/products/air-compressor",
  },
  {
    no: "04",
    title: "TUQO PRO Foam Dispensers",
    desc: "Professional foam dispensing equipment for efficient cleaning.",
    image: "/images/cat-foam-dispenser.png",
    href: "/products/foam-dispenser",
  },
  {
    no: "05",
    title: "TUQO PRO Power Tools",
    desc: "Performance-focused tools for workshops and everyday professional work.",
    image: "/images/cat-power-tools.png",
    href: "/products/power-tools",
  },
  {
    no: "06",
    title: "TUQO PRO Power Tools Accessories",
    desc: "Useful accessories and compatible components for your equipment.",
    image: "/images/cat-accessories.png",
    href: "/products/power-tools-accessories",
  },
];

export default function CategoriesPage() {
  return (
    <main className="w-full bg-[#f8f9fc] py-14 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-[3px] w-7 bg-[#e21b23]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23] sm:text-xs">
              ALL CATEGORIES
            </span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#111214] sm:text-4xl lg:text-5xl">
            EXPLORE TUQO MACHINERY &amp; TOOLS
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            Engineered for high performance and durability. Browse our full lineup of commercial-grade machinery and precision tools.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.no}
              href={cat.href}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#e21b23]/50 hover:shadow-xl hover:shadow-black/5"
            >
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-xs font-black tracking-wider text-[#e21b23]">
                    {cat.no}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                    TUQO PRO
                  </span>
                </div>

                <div className="relative mx-auto my-6 flex h-40 w-full items-center justify-center">
                  <div className="relative h-32 w-32 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="160px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <h2 className="text-base font-black uppercase tracking-tight text-gray-900 group-hover:text-[#e21b23] transition-colors">
                  {cat.title}
                </h2>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-gray-900 transition-colors">
                  View Range
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all duration-300 group-hover:bg-[#e21b23] group-hover:text-white group-hover:translate-x-1">
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
