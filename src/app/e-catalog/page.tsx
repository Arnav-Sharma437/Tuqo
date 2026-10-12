
import React from "react";
import { APP_CONFIG } from "@/constants";
import { WhatsAppIcon } from "@/components/common/Icons";

export const metadata = {
  title: "E-Catalog | TUQO Tools",
  description:
    "Explore TUQO product catalogues, cleaning equipment accessories and auto detailing products.",
};

const catalogues = [
  {
    id: "product-catalog",
    title: "TUQO PRODUCT CATALOG 2025",
    description:
      "Complete range of professional machinery, high pressure washers, air compressors and power tools.",
    image: "/images/hero-banner-bg.png",
    alt: "TUQO professional machinery",
  },
  {
    id: "cleaning-accessories",
    title: "TUQO CLEANING EQUIPMENT ACCESSORIES 2025",
    description:
      "Explore our range of high pressure washer accessories, cleaning equipment and car detailing products.",
    image: "/images/cat-accessories.png",
    alt: "TUQO cleaning equipment accessories",
  },
  {
    id: "auto-detailing",
    title: "TUQO AUTO DETAILING AND CLEANING 2025",
    description:
      "Discover our professional auto detailing and vehicle cleaning equipment range.",
    image: "/images/cat-foam-dispenser.png",
    alt: "TUQO auto detailing and cleaning equipment",
  },
];

function DownloadButton() {
  return (
    <button
      type="button"
      disabled
      title="PDF download will be connected by the backend team."
      className="mt-4 inline-flex h-11 w-full max-w-[250px] cursor-not-allowed items-center justify-center gap-2 bg-[#e21b23] px-5 text-sm font-bold text-white opacity-90"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8M8 17h5" />
      </svg>
      Download PDF
    </button>
  );
}

function CatalogueItem({
  catalogue,
}: {
  catalogue: (typeof catalogues)[number];
}) {
  return (
    <article className="grid grid-cols-1 items-center gap-5 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-7">
      <div className="flex h-[270px] items-center justify-center overflow-hidden bg-white sm:h-[290px]">
        <img
          src={catalogue.image}
          alt={catalogue.alt}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>

      <div>
        <h3 className="text-lg font-extrabold uppercase leading-snug text-[#111214]">
          {catalogue.title}
        </h3>

        <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">
          {catalogue.description}
        </p>

        <DownloadButton />
      </div>
    </article>
  );
}

export default function ECatalogPage() {
  return (
    <main className="min-h-screen bg-white text-[#111214]">
      {/* Product Catalog */}
      <section className="mx-auto max-w-[1300px] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-[3px] w-10 shrink-0 bg-[#e21b23]" />

          <h1 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
            Product Catalog
          </h1>
        </div>

        <CatalogueItem catalogue={catalogues[0]} />

        <div className="mt-8 border-b border-gray-200" />
      </section>

      {/* Accessories and Car Detailing Catalogues */}
      <section className="mx-auto max-w-[1300px] px-5 pb-12 pt-2 sm:px-8 lg:px-12">
        <div className="mb-7 flex items-start gap-3">
          <span className="mt-3 h-[3px] w-10 shrink-0 bg-[#e21b23]" />

          <h2 className="text-xl font-black uppercase leading-snug tracking-tight sm:text-2xl">
            High Pressure Washer Accessories and Car Detailing Catalog
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-8">
          {catalogues.slice(1).map((catalogue) => (
            <CatalogueItem
              key={catalogue.id}
              catalogue={catalogue}
            />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative overflow-hidden bg-[#090a0c] text-white">
        <div className="mx-auto flex max-w-[1300px] flex-col items-start justify-between gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center lg:px-12">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="h-[3px] w-10 bg-[#e21b23]" />

              <p className="text-xs font-bold uppercase tracking-wider text-[#e21b23]">
                Need More Information?
              </p>
            </div>

            <h2 className="text-3xl font-black uppercase sm:text-4xl">
              Contact Our Team
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-300">
              For detailed product information, bulk enquiries or technical support.
            </p>
          </div>

          <a
            href={APP_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 bg-[#e21b23] px-6 text-sm font-bold text-white transition hover:bg-red-700"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Contact on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
