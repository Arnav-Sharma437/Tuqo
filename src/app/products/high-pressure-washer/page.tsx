import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductsByCategory } from "@/constants/products";
import { ArrowRightIcon } from "@/components/common/Icons";

export const metadata = {
  title: "High Pressure Washers | TUQO Tools",
  description:
    "Explore high-performance commercial and industrial induction pressure washers from TUQO.",
};

export default function HighPressureWasherPage() {
  const products = getProductsByCategory("high-pressure-washer");

  return (
    <main className="min-h-screen bg-[#f8f9fc] text-[#111214]">
      {/* Category Hero Header */}
      <section className="border-b border-gray-200 bg-[#0c0d10] text-white">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 md:py-16 lg:px-10">
          <nav className="mb-6 flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white transition-colors">
              Categories
            </Link>
            <span>/</span>
            <span className="text-white font-bold">High Pressure Washers</span>
          </nav>

          <div className="flex items-center gap-2 mb-2">
            <span className="h-[3px] w-7 bg-[#e21b23]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23] sm:text-xs">
              COMMERCIAL CLEANING RANGE
            </span>
          </div>

          <h1 className="max-w-3xl text-3xl font-black uppercase leading-tight sm:text-4xl md:text-5xl text-white">
            HIGH PRESSURE <span className="text-[#e21b23]">WASHERS</span>
          </h1>

          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-gray-300 sm:text-sm">
            Engineered with 100% pure copper induction motors and heavy forged brass pumps for commercial car washes, detailing studios, factories, and heavy machinery wash bays.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 md:py-16 lg:px-10">
        <div className="mb-8 flex flex-col justify-between gap-3 border-b border-gray-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
              ALL MODELS
            </span>
            <h2 className="text-2xl font-black uppercase text-gray-900 sm:text-3xl">
              AVAILABLE MACHINERY ({products.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.categorySlug}/${product.slug}`}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#e21b23]/50 hover:shadow-xl hover:shadow-black/5"
            >
              <div className="relative flex h-[240px] items-center justify-center overflow-hidden bg-gradient-to-b from-[#f8f8f8] to-gray-50 p-6">
                <span className="absolute left-4 top-4 rounded-md bg-[#111214] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white">
                  {product.tag}
                </span>

                <div className="relative h-44 w-44 transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="220px"
                    className="object-contain"
                  />
                </div>

                <span className="absolute bottom-3 right-4 text-[10px] font-bold text-gray-400">
                  0{index + 1}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#e21b23]">
                    {product.model}
                  </span>

                  <h3 className="mt-1 text-base font-black uppercase tracking-tight text-gray-900 transition-colors group-hover:text-[#e21b23]">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-gray-600 line-clamp-2">
                    {product.shortDesc}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {product.specs.slice(0, 2).map((s) => (
                      <span
                        key={s.label}
                        className="rounded-md bg-gray-100 px-2 py-1 text-[9px] font-bold text-gray-700"
                      >
                        {s.value}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-500 group-hover:text-gray-900 transition-colors">
                    View Specifications
                  </span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all duration-300 group-hover:bg-[#e21b23] group-hover:text-white group-hover:translate-x-1">
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
