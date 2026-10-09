import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_PRODUCTS, getProductBySlug, getProductsByCategory } from "@/constants/products";
import { APP_CONFIG } from "@/constants";
import {
  WhatsAppIcon,
  PhoneIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  QualityDiamondIcon,
  ClockIcon,
} from "@/components/common/Icons";

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    category: product.categorySlug,
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | TUQO Tools",
    };
  }

  return {
    title: `${product.name} | TUQO Tools`,
    description: product.shortDesc,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: categorySlug, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(categorySlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const whatsappInquiryUrl = `https://wa.me/919342466860?text=${encodeURIComponent(
    `Hello TUQO Team, I am interested in inquiring about ${product.name} (Model: ${product.model}). Please provide technical specifications and pricing/availability details.`
  )}`;

  return (
    <main className="w-full bg-[#f8f9fc] py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 sm:text-xs">
          <Link href="/" className="hover:text-[#e21b23] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-[#e21b23] transition-colors">
            Categories
          </Link>
          <span>/</span>
          <Link
            href={`/products/${product.categorySlug}`}
            className="hover:text-[#e21b23] transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Main Product Hero Box */}
        <div className="overflow-hidden rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-center">
            {/* Left Image Stage */}
            <div className="lg:col-span-5">
              <div className="relative flex aspect-square w-full items-center justify-center rounded-2xl bg-gradient-to-b from-[#f8f8f8] to-gray-50 border border-gray-100 p-8 shadow-inner">
                {/* Badges */}
                <div className="absolute left-4 top-4 z-10 flex flex-col gap-1.5">
                  <span className="rounded-md bg-[#111214] px-3 py-1 text-[9px] font-black uppercase tracking-wider text-white">
                    {product.category}
                  </span>
                  <span className="rounded-md bg-[#e21b23] px-3 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-xs">
                    {product.tag}
                  </span>
                </div>

                <div className="absolute right-4 top-4 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[9px] font-extrabold uppercase tracking-wider text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Available
                  </span>
                </div>

                <div className="relative h-64 w-64 sm:h-80 sm:w-80 transition-transform duration-500 hover:scale-105">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Right Product Summary & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e21b23]">
                    MODEL: {product.model}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#111214] leading-tight">
                  {product.name}
                </h1>

                <p className="mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {product.description}
                </p>

                {/* Key Features Checklist */}
                <div className="mt-6 border-t border-b border-gray-100 py-5">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-3">
                    Key Performance Highlights:
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-700 font-medium">
                    {product.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#e21b23] text-[10px] font-bold">
                          ✓
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Inquiry Action Buttons (No Cart / No E-commerce) */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 flex-1 items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 text-xs font-extrabold uppercase tracking-wider text-black shadow-lg shadow-emerald-950/20 transition-all hover:bg-[#20bd5a] hover:scale-[1.02] active:scale-95"
                >
                  <WhatsAppIcon className="h-4 w-4 text-black" />
                  <span>Inquire on WhatsApp</span>
                </a>

                <a
                  href={`tel:${APP_CONFIG.phoneRaw}`}
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2.5 rounded-xl border border-gray-300 bg-white px-6 text-xs font-extrabold uppercase tracking-wider text-[#111214] transition-all hover:border-[#e21b23] hover:bg-red-50 hover:text-[#e21b23] active:scale-95"
                >
                  <PhoneIcon className="h-4 w-4 text-[#e21b23]" />
                  <span>Call Technical Desk</span>
                </a>
              </div>

              {/* Trust Footer */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheckIcon className="h-4 w-4 text-[#e21b23]" />
                  <span>Genuine TUQO Machine</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <QualityDiamondIcon className="h-4 w-4 text-[#e21b23]" />
                  <span>Pan-India Spares Supply</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ClockIcon className="h-4 w-4 text-[#e21b23]" />
                  <span>Commercial Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Technical Specifications Grid */}
        <div className="mt-10 rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-[3px] w-7 bg-[#e21b23]" />
            <h2 className="text-xl font-black uppercase tracking-tight text-[#111214] sm:text-2xl">
              COMPLETE TECHNICAL SPECIFICATIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {product.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between py-3 border-b border-gray-100 text-xs sm:text-sm"
              >
                <span className="text-gray-500 font-medium">{spec.label}</span>
                <span className="font-bold text-gray-900 text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Applications & Industry Use Cases */}
        <div className="mt-10 rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-[3px] w-7 bg-[#e21b23]" />
            <h2 className="text-xl font-black uppercase tracking-tight text-[#111214] sm:text-2xl">
              SUITABLE APPLICATIONS &amp; ENVIRONMENTS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {product.applications.map((app, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4 text-xs font-semibold text-gray-800"
              >
                <div className="flex items-center gap-2 mb-1.5 text-[#e21b23]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e21b23]" />
                  <span className="text-[10px] uppercase tracking-wider font-extrabold">Use Case 0{idx + 1}</span>
                </div>
                <p className="leading-snug">{app}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Equipment from Same Category */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e21b23]">
                  COMPATIBLE GEAR
                </span>
                <h2 className="text-2xl font-black uppercase tracking-tight text-[#111214]">
                  OTHER {product.category} MODELS
                </h2>
              </div>
              <Link
                href={`/products/${product.categorySlug}`}
                className="text-xs font-bold uppercase tracking-wider text-[#e21b23] hover:underline"
              >
                View Category Range →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.categorySlug}/${rel.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/50 hover:shadow-xl hover:shadow-black/5"
                >
                  <div className="relative mx-auto my-3 flex h-36 w-full items-center justify-center">
                    <div className="relative h-32 w-32 transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        fill
                        sizes="160px"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#e21b23]">
                      {rel.model}
                    </span>
                    <h3 className="text-sm font-black uppercase tracking-tight text-gray-900 group-hover:text-[#e21b23] transition-colors mt-0.5">
                      {rel.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                      {rel.shortDesc}
                    </p>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-50">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        View Specs
                      </span>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all group-hover:bg-[#e21b23] group-hover:text-white">
                        <ArrowRightIcon className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
