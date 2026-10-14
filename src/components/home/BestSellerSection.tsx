"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product as StaticProduct } from "@/constants/products";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/common/Icons";

export function BestSellerSection({
  initialProducts = [],
}: {
  initialProducts?: StaticProduct[];
}) {
  const [products, setProducts] = useState<StaticProduct[]>(initialProducts);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          const formatted: StaticProduct[] = data.products.map((p: any) => ({
            id: String(p._id),
            slug: p.slug,
            name: p.name,
            model: p.model || "",
            category: p.category,
            categorySlug: p.categorySlug,
            subcategory: p.subcategory || "",
            subcategorySlug: p.subcategorySlug || "",
            image: p.image,
            images: Array.isArray(p.images) ? p.images : [p.image],
            shortDesc: p.shortDesc || "",
            description: p.description || "",
            tag: p.tag || "Best Seller",
            features: Array.isArray(p.features) ? p.features : [],
            specs: Array.isArray(p.specs) ? p.specs : [],
            applications: Array.isArray(p.applications) ? p.applications : [],
            inStock: p.inStock !== false,
          }));
          setProducts(formatted);
        }
      })
      .catch((err) => console.error("Could not fetch products:", err));
  }, []);

  // Filter for best sellers, fallback to all available products
  const bestSellers = React.useMemo(() => {
    const tagged = products.filter(
      (p) =>
        p.tag &&
        (p.tag.toLowerCase().includes("best") ||
          p.tag.toLowerCase().includes("seller") ||
          p.tag.toLowerCase().includes("pro") ||
          p.tag.toLowerCase().includes("heavy"))
    );
    return tagged.length >= 3 ? tagged : products.slice(0, 8);
  }, [products]);

  if (bestSellers.length === 0) return null;

  // Duplicate for seamless infinite horizontal slider
  const sliderItems = [...bestSellers, ...bestSellers, ...bestSellers];

  return (
    <section className="relative w-full overflow-hidden bg-[#fbfbfd] py-14 sm:py-18 lg:py-20 border-b border-gray-200">
      {/* Background Subtle Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-[3px] w-7 bg-[#e21b23]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23] sm:text-xs">
                PROVEN PERFORMANCE
              </span>
            </div>

            <h2 className="text-2xl font-black uppercase leading-tight tracking-tight text-[#111214] sm:text-3xl lg:text-4xl">
              OUR BEST <span className="text-[#e21b23]">SELLERS</span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-gray-600 max-w-xl">
              High-demand commercial machines engineered for relentless daily duty in workshops, factories, and wash stations.
            </p>
          </div>

          <Link
            href="/categories"
            className="hidden sm:inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#111214] px-5 text-xs font-extrabold uppercase tracking-wider text-white transition-all hover:bg-[#e21b23] shadow-md hover:shadow-red-900/20"
          >
            <span>View All Products</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Continuous Continuous Slider */}
        <div className="relative w-full overflow-hidden py-2">
          <div className="animate-marquee flex w-max items-stretch gap-5 hover:[animation-play-state:paused]">
            {sliderItems.map((product, idx) => {
              const productUrl = `/products/${product.categorySlug}/${product.slug}`;
              const whatsappUrl = `https://wa.me/919342466860?text=${encodeURIComponent(
                `Hello TUQO Team, I am interested in inquiring about ${product.name} (Model: ${product.model}).`
              )}`;

              return (
                <div
                  key={`${product.slug}-${idx}`}
                  className="group relative flex h-[410px] w-[275px] sm:w-[305px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#e21b23]/50 hover:shadow-xl hover:shadow-red-950/10"
                >
                  {/* Top Bar with Badge & Category */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-[#e21b23] px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-xs">
                      {product.tag || "Best Seller"}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 truncate max-w-[130px]">
                      {product.category}
                    </span>
                  </div>

                  {/* Product Image Stage */}
                  <Link
                    href={productUrl}
                    className="relative my-3 flex h-[190px] w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#f8f9fc] to-[#f0f2f7] p-3"
                  >
                    <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="300px"
                        className="object-contain p-2"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      {product.model && (
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#e21b23]">
                          {product.model}
                        </p>
                      )}
                      <Link href={productUrl}>
                        <h3 className="mt-1 line-clamp-2 text-sm font-black uppercase leading-snug text-[#111214] transition-colors group-hover:text-[#e21b23]">
                          {product.name}
                        </h3>
                      </Link>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
                      <Link
                        href={productUrl}
                        className="flex-1 flex h-10 items-center justify-center gap-2 rounded-lg bg-[#111214] text-xs font-extrabold uppercase tracking-wider text-white transition-colors duration-300 group-hover:bg-[#e21b23]"
                      >
                        <span>Details</span>
                        <ArrowRightIcon className="h-3 w-3" />
                      </Link>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 transition-all hover:bg-[#25D366] hover:text-white hover:border-[#25D366]"
                        title="Quick WhatsApp Inquiry"
                        aria-label="Inquire on WhatsApp"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View All CTA */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/categories"
            className="inline-flex h-11 w-full max-w-[260px] items-center justify-center gap-2 rounded-xl bg-[#111214] px-5 text-xs font-extrabold uppercase tracking-wider text-white transition-all hover:bg-[#e21b23]"
          >
            <span>View All Products</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
