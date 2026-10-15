import React from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_CONFIG } from "@/constants";
import { WhatsAppIcon } from "@/components/common/Icons";
import { getLiveCatalogs, UnifiedCatalog } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "E-Catalog | TUQO Tools",
  description:
    "Explore official TUQO product catalogues, technical brochures and equipment specifications.",
};

const DEFAULT_CATALOGS: UnifiedCatalog[] = [
  {
    id: "default-1",
    title: "TUQO Industrial Equipment & Machinery Catalog 2026",
    category: "Machinery Range",
    description: "Complete catalogue of high pressure washers, industrial air compressors, and power tools.",
    coverImage: "/images/hero-banner-bg.png",
    order: 1,
  },
  {
    id: "default-2",
    title: "TUQO High Pressure Washers & Auto Detailing 2026",
    category: "Cleaning Systems",
    description: "Commercial copper induction washers, brass pumps, foam cannons and industrial hoses.",
    coverImage: "/images/cat-pressure-washer.png",
    order: 2,
  },
  {
    id: "default-3",
    title: "TUQO Power Tools & Spare Parts Price List 2026",
    category: "Power Tools Range",
    description: "Heavy-duty drills, angle grinders, demolition hammers, and replacement spares catalog.",
    coverImage: "/images/cat-power-tools.png",
    order: 3,
  },
];

function CatalogueCard({ catalogue }: { catalogue: UnifiedCatalog }) {
  const cover = catalogue.coverImage || "/images/hero-banner-bg.png";
  const isDefault = catalogue.id && catalogue.id.startsWith("default-");
  const downloadHref = isDefault
    ? "/catalog/tuqo-catalog.pdf"
    : `/api/catalogs/${catalogue.id}/download`;

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-gray-300">
      <div>
        {/* Cover Image Stage (A4 Portrait Brochure preview as in reference) */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#f8f9fa] border border-gray-100 flex items-center justify-center mb-4">
          <Image
            src={cover}
            alt={catalogue.title}
            fill
            unoptimized={cover.startsWith("http")}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Title */}
        <h2 className="text-base font-bold text-gray-900 group-hover:text-[#e21b23] transition-colors line-clamp-2 leading-snug">
          {catalogue.title}
        </h2>

        {/* Date / Metadata info */}
        <div className="mt-2.5 mb-5 flex items-center gap-1.5 text-xs text-gray-500 font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>
            {catalogue.category || "Official Catalogue"} &bull; 2026 Edition
          </span>
        </div>
      </div>

      {/* Red Download PDF Button */}
      <a
        href={downloadHref}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="mt-auto flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#e21b23] px-4 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-[#b8141a] hover:scale-[1.01] active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span>Download PDF</span>
      </a>
    </article>
  );
}

export default async function ECatalogPage() {
  const dbCatalogs = await getLiveCatalogs();
  const displayCatalogs = dbCatalogs.length > 0 ? dbCatalogs : DEFAULT_CATALOGS;

  return (
    <main className="min-h-screen bg-[#fafafb] text-[#111214]">
      {/* HERO BANNER */}
      <section className="w-full bg-[#cf0000] px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            E-Catalog
          </h1>

          <nav
            aria-label="Breadcrumb"
            className="mt-3 flex items-center gap-3 text-sm"
          >
            <Link
              href="/"
              className="text-white transition-opacity hover:opacity-80"
            >
              Home
            </Link>

            <span aria-hidden="true" className="text-white/80">
              ›
            </span>

            <span className="text-white/80">E-Catalog</span>
          </nav>
        </div>
      </section>

      {/* Grid of Catalogues (Matching Reference Design) */}
      <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayCatalogs.map((cat) => (
            <CatalogueCard key={cat.id} catalogue={cat} />
          ))}
        </div>
      </section>

      {/* Contact Sales / Dealership CTA */}
      <section className="relative overflow-hidden bg-[#090a0c] text-white py-12 border-t border-white/5">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-5 sm:px-8 md:flex-row md:items-center lg:px-10">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="h-[3px] w-8 bg-[#e21b23]" />
              <p className="text-xs font-bold uppercase tracking-wider text-[#e21b23]">
                Need Custom Catalogues or Bulk Quotations?
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase">
              Contact Our Sales &amp; Technical Desk
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-300 max-w-xl">
              For dealership inquiries, OEM machinery specs, bulk procurement, or immediate technical support.
            </p>
          </div>

          <a
            href={APP_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 text-xs font-extrabold uppercase tracking-wider text-black shadow-lg transition hover:bg-[#20bd5a]"
          >
            <WhatsAppIcon className="h-4 w-4 text-black" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>
    </main>
  );
}
