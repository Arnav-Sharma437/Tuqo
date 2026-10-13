import React from "react";
import Image from "next/image";
import { APP_CONFIG } from "@/constants";
import { WhatsAppIcon } from "@/components/common/Icons";
import { getLiveCatalogs, UnifiedCatalog } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "E-Catalog | TUQO Tools",
  description:
    "Explore TUQO product catalogues, cleaning equipment accessories and auto detailing products.",
};

function DownloadButton({
  pdfUrl,
  id,
}: {
  pdfUrl?: string;
  fileSize?: string;
  title: string;
  id?: string;
}) {
  if (pdfUrl) {
    const downloadHref = id ? `/api/catalogs/${id}/download` : pdfUrl;
    return (
      <a
        href={downloadHref}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="mt-4 inline-flex h-11 w-full max-w-[260px] items-center justify-center gap-2.5 bg-[#e21b23] px-6 text-sm font-bold text-white transition hover:bg-[#b8141a] shadow-lg shadow-red-900/20 rounded-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M8 13h8M8 17h5" />
        </svg>
        <span>Download PDF</span>
      </a>
    );
  }

  return (
    <div className="mt-4 inline-flex h-11 w-full max-w-[250px] items-center justify-center gap-2 rounded-sm bg-gray-100 px-5 text-xs font-bold uppercase tracking-wider text-gray-500 border border-gray-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <span>PDF Coming Soon</span>
    </div>
  );
}

function CatalogueCard({ catalogue }: { catalogue: UnifiedCatalog }) {
  const cover = catalogue.coverImage || "/images/hero-banner-bg.png";

  return (
    <article className="grid grid-cols-1 items-center gap-5 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-7 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="relative flex h-[240px] items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:h-[260px] border border-gray-100">
        <Image
          src={cover}
          alt={catalogue.title}
          fill
          unoptimized={cover.startsWith("http")}
          className="object-contain p-3"
          sizes="(max-width: 640px) 100vw, 220px"
        />
      </div>

      <div>
        {catalogue.category && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#e21b23]">
            {catalogue.category}
          </span>
        )}

        <h3 className="mt-1 text-lg font-extrabold uppercase leading-snug text-[#111214]">
          {catalogue.title}
        </h3>

        {catalogue.description && (
          <p className="mt-2.5 max-w-lg text-sm leading-6 text-gray-500">
            {catalogue.description}
          </p>
        )}

        <DownloadButton
          id={catalogue.id}
          pdfUrl={catalogue.pdfUrl}
          title={catalogue.title}
        />
      </div>
    </article>
  );
}

export default async function ECatalogPage() {
  const catalogues = await getLiveCatalogs();

  const mainCatalog = catalogues[0];
  const otherCatalogs = catalogues.slice(1);

  return (
    <main className="min-h-screen bg-white text-[#111214]">
      {/* Product Catalog */}
      <section className="mx-auto max-w-[1300px] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-[3px] w-10 shrink-0 bg-[#e21b23]" />
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
              Official Product Catalogues & Brochures
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Download high-resolution product specs, user guides, and machinery catalogs
            </p>
          </div>
        </div>

        {mainCatalog && <CatalogueCard catalogue={mainCatalog} />}

        <div className="mt-10 border-b border-gray-200" />
      </section>

      {/* Additional Catalogues */}
      {otherCatalogs.length > 0 && (
        <section className="mx-auto max-w-[1300px] px-5 pb-14 pt-2 sm:px-8 lg:px-12">
          <div className="mb-8 flex items-start gap-3">
            <span className="mt-3 h-[3px] w-10 shrink-0 bg-[#e21b23]" />
            <div>
              <h2 className="text-xl font-black uppercase leading-snug tracking-tight sm:text-2xl">
                Equipment & Accessories Catalogues
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Detailed spare parts, accessories, and application catalogues
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {otherCatalogs.map((cat) => (
              <CatalogueCard key={cat.id} catalogue={cat} />
            ))}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="relative overflow-hidden bg-[#090a0c] text-white">
        <div className="mx-auto flex max-w-[1300px] flex-col items-start justify-between gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center lg:px-12">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="h-[3px] w-10 bg-[#e21b23]" />
              <p className="text-xs font-bold uppercase tracking-wider text-[#e21b23]">
                Need Custom Catalogues or Bulk Orders?
              </p>
            </div>

            <h2 className="text-3xl font-black uppercase sm:text-4xl">
              Contact Our Sales Team
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-300">
              For dealership inquiries, OEM solutions, bulk machinery orders, or technical support.
            </p>
          </div>

          <a
            href={APP_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded bg-[#e21b23] px-7 text-sm font-bold text-white transition hover:bg-red-700 shadow-xl shadow-red-900/30"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Contact on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
