import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLiveCategories, getLiveProducts } from "@/lib/data";
import { ArrowRightIcon } from "@/components/common/Icons";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const categories = await getLiveCategories();
  const cat = categories.find((c) => c.slug === slug);

  return {
    title: cat ? `${cat.name} | TUQO Tools` : "Products | TUQO Tools",
    description: cat?.description || "Explore professional machinery and power tools from TUQO.",
  };
}

export default async function DynamicCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const categories = await getLiveCategories();
  const cat = categories.find((c) => c.slug === slug);

  if (!cat) {
    notFound();
  }

  const products = await getLiveProducts(slug);

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
            <span className="text-white font-bold">{cat.name}</span>
          </nav>

          <div className="flex items-center gap-2 mb-2">
            <span className="h-[3px] w-7 bg-[#e21b23]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23] sm:text-xs">
              COMMERCIAL & INDUSTRIAL RANGE
            </span>
          </div>

          <h1 className="max-w-3xl text-3xl font-black uppercase leading-tight sm:text-4xl md:text-5xl text-white">
            {cat.name}
          </h1>

          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-gray-300 sm:text-sm">
            {cat.description ||
              "Engineered for heavy-duty commercial and industrial applications with high quality standards and dependable service."}
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

        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
            <p className="text-sm font-semibold">No products currently listed under {cat.name}.</p>
            <p className="text-xs text-gray-400 mt-1">You can add products to this category anytime from the Admin Dashboard.</p>
            <Link
              href="/categories"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#e21b23] hover:underline"
            >
              Browse other categories &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <Link
                key={product.slug}
                href={`/products/${product.categorySlug}/${product.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/50 hover:shadow-xl"
              >
                <div>
                  <div className="relative mb-6 flex h-48 w-full items-center justify-center bg-gray-50 rounded-lg p-4">
                    <span className="absolute left-3 top-3 z-10 bg-white/90 px-2 py-0.5 text-[10px] font-bold text-gray-500 rounded">
                      #{index + 1}
                    </span>

                    {product.tag && (
                      <span className="absolute right-3 top-3 z-10 bg-[#e21b23] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white rounded">
                        {product.tag}
                      </span>
                    )}

                    <div className="relative h-40 w-40 transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    <span className="text-[#e21b23]">{product.category}</span>
                    <span className="font-mono">{product.model}</span>
                  </div>

                  <h3 className="text-base font-black uppercase text-gray-900 group-hover:text-[#e21b23] transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {product.shortDesc}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-[11px] font-bold uppercase text-emerald-600">
                    ● In Stock
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#111214] group-hover:text-[#e21b23] transition-colors">
                    View Specs
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
