import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLiveCategories, getLiveProducts, getLiveSubcategories } from "@/lib/data";
import { ArrowRightIcon } from "@/components/common/Icons";

export const dynamic = "force-dynamic";

interface DynamicCategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ subcategory?: string; view?: string }>;
}

export async function generateMetadata({ params, searchParams }: DynamicCategoryPageProps) {
  const { category: slug } = await params;
  const { subcategory: subSlug } = await searchParams;
  const categories = await getLiveCategories();
  const cat = categories.find((c) => c.slug === slug);

  if (!cat) {
    return {
      title: "Products | TUQO Tools",
      description: "Explore professional machinery and power tools from TUQO.",
    };
  }

  if (subSlug) {
    const subcategories = await getLiveSubcategories(slug);
    const sub = subcategories.find((s) => s.slug === subSlug);
    if (sub) {
      return {
        title: `${sub.name} - ${cat.name} | TUQO Tools`,
        description: sub.description || cat.description,
      };
    }
  }

  return {
    title: `${cat.name} | TUQO Tools`,
    description: cat.description || "Explore professional machinery and power tools from TUQO.",
  };
}

export default async function DynamicCategoryPage({
  params,
  searchParams,
}: DynamicCategoryPageProps) {
  const { category: slug } = await params;
  const { subcategory: selectedSubSlug, view } = await searchParams;

  const categories = await getLiveCategories();
  const cat = categories.find((c) => c.slug === slug);

  if (!cat) {
    notFound();
  }

  const allProducts = await getLiveProducts(slug);
  const subcategories = await getLiveSubcategories(slug);

  const hasSubcategories = subcategories.length > 0;
  const activeSubcategory = selectedSubSlug
    ? subcategories.find((s) => s.slug === selectedSubSlug)
    : null;

  // RULE:
  // If the category has subcategories, and user has NOT picked a specific subcategory,
  // and has NOT requested 'view=all', SHOW THE SUBCATEGORIES HUB PAGE FIRST!
  const showSubcategoriesHub = hasSubcategories && !activeSubcategory && view !== "all";

  // Filter products if a subcategory is selected
  const displayedProducts = activeSubcategory
    ? allProducts.filter(
        (p) =>
          p.subcategorySlug === activeSubcategory.slug ||
          p.subcategory?.toLowerCase() === activeSubcategory.name.toLowerCase()
      )
    : allProducts;

  return (
    <main className="min-h-screen bg-[#f8f9fc] text-[#111214]">
      {/* Category Hero Header */}
      <section className="border-b border-gray-200 bg-[#0c0d10] text-white">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 md:py-16 lg:px-10">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white transition-colors">
              Categories
            </Link>
            <span>/</span>
            {activeSubcategory ? (
              <>
                <Link
                  href={`/products/${cat.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {cat.name}
                </Link>
                <span>/</span>
                <span className="text-white font-bold">{activeSubcategory.name}</span>
              </>
            ) : (
              <span className="text-white font-bold">{cat.name}</span>
            )}
          </nav>

          <div className="flex items-center gap-2 mb-2">
            <span className="h-[3px] w-7 bg-[#e21b23]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23] sm:text-xs">
              {showSubcategoriesHub
                ? "SELECT EQUIPMENT SUBCATEGORY"
                : "COMMERCIAL & INDUSTRIAL RANGE"}
            </span>
          </div>

          <h1 className="max-w-3xl text-3xl font-black uppercase leading-tight sm:text-4xl md:text-5xl text-white">
            {activeSubcategory ? activeSubcategory.name : cat.name}
          </h1>

          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-gray-300 sm:text-sm">
            {activeSubcategory?.description ||
              cat.description ||
              "Engineered for heavy-duty commercial and industrial applications with high quality standards and dependable service."}
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CASE 1: SUBCATEGORIES HUB PAGE (When category has subcategories) */}
      {/* ========================================================= */}
      {showSubcategoriesHub ? (
        <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 md:py-16 lg:px-10">
          <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
                SUBCATEGORIES
              </span>
              <h2 className="text-2xl font-black uppercase text-gray-900 sm:text-3xl">
                Choose Equipment Type ({subcategories.length})
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Select a subcategory below to explore dedicated models and technical specs.
              </p>
            </div>

            <Link
              href={`/products/${cat.slug}?view=all`}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-700 shadow-sm transition hover:border-[#e21b23] hover:text-[#e21b23]"
            >
              <span>View All Products ({allProducts.length})</span>
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Subcategories Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subcategories.map((sub) => {
              // Count products in this subcategory
              const subCount = allProducts.filter(
                (p) =>
                  p.subcategorySlug === sub.slug ||
                  p.subcategory?.toLowerCase() === sub.name.toLowerCase()
              ).length;

              return (
                <Link
                  key={sub.id}
                  href={`/products/${cat.slug}?subcategory=${sub.slug}`}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23] hover:shadow-xl"
                >
                  <div>
                    {/* Thumbnail banner */}
                    <div className="relative mb-5 flex h-48 w-full items-center justify-center rounded-xl bg-gray-50 p-4 border border-gray-100 group-hover:bg-red-50/30 transition-colors">
                      {sub.image ? (
                        <div className="relative h-40 w-40 transition-transform duration-300 group-hover:scale-105">
                          <Image
                            src={sub.image}
                            alt={sub.name}
                            fill
                            unoptimized={sub.image.startsWith("http")}
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, 300px"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <span className="text-xl font-black text-gray-300">TUQO</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider mt-1">
                            Equipment Subcategory
                          </span>
                        </div>
                      )}

                      <span className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-gray-700 shadow-sm">
                        {subCount > 0 ? `${subCount} Products` : "Browse"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#e21b23]" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#e21b23]">
                        {cat.name}
                      </span>
                    </div>

                    <h3 className="text-lg font-black uppercase text-[#111214] group-hover:text-[#e21b23] transition-colors leading-snug">
                      {sub.name}
                    </h3>

                    {sub.description && (
                      <p className="mt-2 text-xs leading-relaxed text-gray-500 line-clamp-2">
                        {sub.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-xs font-bold text-gray-500 group-hover:text-gray-900 transition-colors">
                      Explore Models
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[#111214] transition-all duration-300 group-hover:bg-[#e21b23] group-hover:text-white group-hover:translate-x-1">
                      <ArrowRightIcon className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : (
        /* ========================================================= */
        /* CASE 2: PRODUCTS LISTING (Filtered by Subcategory or No Subcategories) */
        /* ========================================================= */
        <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 md:py-16 lg:px-10">
          {/* Subcategories Filter Pills (If category has subcategories) */}
          {hasSubcategories && (
            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-3 border-b border-gray-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
                    Filter by Subcategory:
                  </span>
                  {activeSubcategory && (
                    <Link
                      href={`/products/${cat.slug}`}
                      className="text-xs font-bold text-[#e21b23] hover:underline"
                    >
                      ← Back to Subcategories Hub
                    </Link>
                  )}
                </div>

                <Link
                  href={`/products/${cat.slug}?view=all`}
                  className={`text-xs font-bold transition ${
                    view === "all" ? "text-[#e21b23] underline" : "text-gray-400 hover:text-gray-800"
                  }`}
                >
                  View All ({allProducts.length})
                </Link>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <Link
                  href={`/products/${cat.slug}?view=all`}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition ${
                    view === "all"
                      ? "bg-[#e21b23] text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Products ({allProducts.length})
                </Link>
                {subcategories.map((sub) => {
                  const isActive = activeSubcategory?.slug === sub.slug;
                  const count = allProducts.filter(
                    (p) =>
                      p.subcategorySlug === sub.slug ||
                      p.subcategory?.toLowerCase() === sub.name.toLowerCase()
                  ).length;

                  return (
                    <Link
                      key={sub.id}
                      href={`/products/${cat.slug}?subcategory=${sub.slug}`}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition ${
                        isActive
                          ? "bg-[#e21b23] text-white shadow-md shadow-red-900/20"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span>{sub.name}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                          isActive ? "bg-black/30 text-white" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {count}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section Header */}
          <div className="mb-8 flex flex-col justify-between gap-3 border-b border-gray-200 pb-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
                {activeSubcategory ? activeSubcategory.name : "AVAILABLE MACHINERY"}
              </span>
              <h2 className="text-2xl font-black uppercase text-gray-900 sm:text-3xl">
                {activeSubcategory
                  ? `${activeSubcategory.name} (${displayedProducts.length})`
                  : `MODELS IN ${cat.name} (${displayedProducts.length})`}
              </h2>
            </div>
          </div>

          {/* Empty State */}
          {displayedProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
              <p className="text-sm font-semibold">
                No products currently listed under {activeSubcategory ? activeSubcategory.name : cat.name}.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                You can tag or add products to this subcategory anytime in the Admin Dashboard.
              </p>
              <div className="mt-4 flex justify-center gap-3">
                {activeSubcategory && (
                  <Link
                    href={`/products/${cat.slug}?view=all`}
                    className="rounded-lg bg-[#e21b23] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#b8141a]"
                  >
                    View All {cat.name} Products ({allProducts.length})
                  </Link>
                )}
                <Link
                  href="/categories"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50"
                >
                  Browse other categories
                </Link>
              </div>
            </div>
          ) : (
            /* Products Grid */
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayedProducts.map((product, index) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.categorySlug}/${product.slug}`}
                  className="group flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/50 hover:shadow-xl"
                >
                  <div>
                    <div className="relative mb-6 flex h-56 sm:h-64 w-full items-center justify-center bg-gradient-to-b from-gray-50 to-[#f0f2f7] rounded-xl p-3 sm:p-4 overflow-hidden">
                      <span className="absolute left-3 top-3 z-10 bg-white/90 px-2 py-0.5 text-[10px] font-bold text-gray-500 rounded">
                        #{index + 1}
                      </span>

                      {product.tag && (
                        <span className="absolute right-3 top-3 z-10 bg-[#e21b23] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white rounded shadow-xs">
                          {product.tag}
                        </span>
                      )}

                      <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-110">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          unoptimized={product.image.startsWith("http")}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain p-2 scale-105 sm:scale-110"
                        />
                      </div>
                    </div>

                    <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
                      <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                        <span className="text-[#e21b23]">{product.category}</span>
                        {product.subcategory && (
                          <span className="text-gray-500 font-normal">/ {product.subcategory}</span>
                        )}
                      </div>
                      <span className="font-mono">{product.model}</span>
                    </div>

                    <h3 className="text-base font-extrabold uppercase leading-snug text-[#111214] group-hover:text-[#e21b23] transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-gray-500 line-clamp-2">
                      {product.shortDesc || product.description}
                    </p>

                    {/* Key Specs Preview */}
                    {product.specs && product.specs.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
                        {product.specs.slice(0, 2).map((spec, i) => (
                          <div key={i} className="text-[11px]">
                            <span className="block text-gray-400 uppercase text-[9px] font-bold">
                              {spec.label}
                            </span>
                            <span className="font-bold text-gray-800 truncate block">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-xs font-bold text-gray-500 group-hover:text-gray-900 transition-colors">
                      View Technical Specs
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[#111214] transition-all duration-300 group-hover:bg-[#e21b23] group-hover:text-white group-hover:translate-x-1">
                      <ArrowRightIcon className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
