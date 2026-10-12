
import React from "react";
import Link from "next/link";
import { APP_CONFIG } from "@/constants";
import { WhatsAppIcon, ArrowRightIcon } from "@/components/common/Icons";

export const metadata = {
  title: "TUQO E-Catalog | Professional Machinery & Power Tools",
  description:
    "Explore TUQO product catalogues, cleaning equipment accessories and auto detailing products.",
};

const catalogues = [
  {
    number: "01",
    title: "TUQO Product Catalog",
    description:
      "Explore professional machinery, high pressure washers, air compressors and power tools.",
    image: "/images/hero-banner-bg.png",
    year: "2025",
  },
  {
    number: "02",
    title: "Cleaning Equipment Accessories",
    description:
      "Explore high pressure washer accessories, cleaning equipment and car detailing products.",
    image: "/images/cat-accessories.png",
    year: "2025",
  },
  {
    number: "03",
    title: "Auto Detailing & Cleaning",
    description:
      "Discover professional auto detailing and vehicle cleaning equipment from TUQO.",
    image: "/images/cat-foam-dispenser.png",
    year: "2025",
  },
];

const categories = [
  { number: "01", name: "High Pressure Washer", href: "/products/high-pressure-washer" },
  { number: "02", name: "Air Compressor", href: "/products/air-compressor" },
  { number: "03", name: "Power Tools", href: "/products/power-tools" },
  {
    number: "04",
    name: "High Pressure Washer Accessories",
    href: "/products/high-pressure-washer-accessories",
  },
  { number: "05", name: "Auto Detailing", href: "/products/auto-detailing" },
  {
    number: "06",
    name: "Power Tools Accessories",
    href: "/products/power-tools-accessories",
  },
];

export default function ECatalogPage() {
  return (
    <main className="min-h-screen bg-white text-[#111214]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#090a0c] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_45%,rgba(226,27,35,0.22),transparent_50%)]" />

        <div className="relative mx-auto grid max-w-[1300px] items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:px-12 lg:py-24">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[3px] w-8 bg-[#e21b23]" />
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
                TUQO RESOURCES
              </span>
            </div>

            <h1 className="text-4xl font-black uppercase leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl">
              EXPLORE OUR
              <span className="mt-2 block text-[#e21b23]">E-CATALOG</span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-gray-300 sm:text-base">
              Browse our product catalogues for professional machinery,
              cleaning equipment, power tools and accessories. Find the
              right equipment for your business.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#catalogues"
                className="inline-flex h-12 items-center justify-center gap-3 bg-[#e21b23] px-6 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Explore Catalogues
                <ArrowRightIcon className="h-4 w-4" />
              </a>

              <a
                href={APP_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-3 border border-white/30 px-6 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Request Information
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[470px]">
            <div className="absolute -inset-3 border border-white/10" />

            <div className="relative min-h-[300px] overflow-hidden border border-white/10 bg-[#151619] p-7 sm:min-h-[350px] sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e21b23]">
                TUQO / PRODUCT GUIDE
              </p>

              <div className="mt-12">
                <p className="text-4xl font-black uppercase leading-none sm:text-5xl">
                  BUILT FOR
                </p>
                <p className="mt-2 text-4xl font-black uppercase leading-none text-[#e21b23] sm:text-5xl">
                  PERFORMANCE.
                </p>
              </div>

              <div className="mt-8 h-[2px] w-16 bg-[#e21b23]" />

              <p className="mt-5 text-sm leading-6 text-gray-300">
                Professional Machinery
                <br />
                Industrial Tools
                <br />
                Equipment Accessories
              </p>

              <div className="absolute bottom-5 right-6 text-6xl font-black italic text-white/[0.05] sm:text-8xl">
                TUQO
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Cards - Frontend Only */}
      <section
        id="catalogues"
        className="mx-auto max-w-[1300px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20"
      >
        <div className="mb-10">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
            TUQO DOWNLOAD CENTRE
          </p>

          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">
            OUR PRODUCT CATALOGUES
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
            Explore our catalogue collection for product details,
            equipment specifications and accessories.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {catalogues.map((catalogue) => (
            <article
              key={catalogue.number}
              className="group overflow-hidden border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#e21b23] hover:shadow-xl"
            >
              <div className="relative flex h-[220px] items-center justify-center overflow-hidden bg-[#101114] p-8">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(226,27,35,0.25),transparent_60%)]" />

                <div className="relative w-full border border-white/15 bg-[#191a1e] p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e21b23]">
                    TUQO / CATALOGUE {catalogue.number}
                  </p>

                  <h3 className="mt-5 text-2xl font-black uppercase leading-tight text-white">
                    {catalogue.title}
                  </h3>

                  <div className="mt-4 h-[2px] w-12 bg-[#e21b23]" />

                  <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                    Product Guide
                  </p>
                </div>

                <span className="absolute right-4 top-4 bg-[#e21b23] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                  {catalogue.year}
                </span>
              </div>

              <div className="p-6">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
                  CATALOGUE {catalogue.number}
                </p>

                <h3 className="mt-2 text-lg font-black uppercase leading-snug">
                  {catalogue.title}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-500">
                  {catalogue.description}
                </p>

                <button
                  type="button"
                  disabled
                  title="Catalogue download will be connected by the backend team."
                  className="mt-5 inline-flex h-12 w-full cursor-not-allowed items-center justify-center gap-3 bg-gray-200 px-5 text-sm font-bold text-gray-500"
                >
                  <span>Download PDF</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </button>

                <p className="mt-3 text-center text-xs text-gray-400">
                  Download availability coming soon
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Product Categories */}
      <section className="bg-[#f7f7f7]">
        <div className="mx-auto max-w-[1300px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mb-8">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
              EXPLORE THE RANGE
            </p>

            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">
              FIND YOUR EQUIPMENT
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Browse our product categories for more information about
              TUQO equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.number}
                href={category.href}
                className="group flex min-h-[110px] items-center justify-between border border-gray-200 bg-white p-5 transition duration-300 hover:border-[#e21b23] hover:shadow-lg sm:p-6"
              >
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-[#e21b23]">
                    CATEGORY {category.number}
                  </p>

                  <h3 className="mt-3 text-sm font-extrabold uppercase leading-5">
                    {category.name}
                  </h3>
                </div>

                <span className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 transition group-hover:bg-[#e21b23] group-hover:text-white">
                  <ArrowRightIcon className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-[#090a0c] text-white">
        <div className="mx-auto flex max-w-[1300px] flex-col items-start justify-between gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center lg:px-12">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
              NEED PRODUCT INFORMATION?
            </p>

            <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl">
              LET&apos;S FIND THE RIGHT EQUIPMENT.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400">
              Contact our team for catalogue information, product
              specifications and enquiries.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={APP_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 bg-[#e21b23] px-6 text-sm font-bold text-white transition hover:bg-red-700"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Contact on WhatsApp
            </a>

            <a
              href={`tel:${APP_CONFIG.phoneRaw}`}
              className="inline-flex h-12 items-center justify-center border border-white/30 px-6 text-sm font-bold text-white transition hover:border-white"
            >
              Call Our Team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
