
import React from "react";
import Link from "next/link";
import { APP_CONFIG } from "@/constants";
import { WhatsAppIcon, ArrowRightIcon } from "@/components/common/Icons";

export const metadata = {
  title: "TUQO E-Catalog | Professional Machinery & Power Tools",
  description:
    "Explore the TUQO professional machinery, power tools and accessories catalogue.",
};

export default function ECatalogPage() {
  return (
    <main className="min-h-screen bg-white text-[#111214]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#090a0c] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_45%,rgba(226,27,35,0.22),transparent_50%)]" />

        <div className="relative mx-auto grid max-w-[1300px] items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:px-12 lg:py-28">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[3px] w-8 bg-[#e21b23]" />
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
                TUQO RESOURCES
              </span>
            </div>

            <h1 className="text-4xl font-black uppercase leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl">
              EXPLORE OUR
              <span className="mt-2 block text-[#e21b23]">
                E-CATALOG
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-gray-300 sm:text-base">
              Discover professional machinery, high pressure washers,
              air compressors, power tools and accessories from TUQO.
              Request our latest catalogue for complete product information.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/catalog/tuqo-catalog.pdf"
                download
                className="inline-flex h-12 items-center justify-center gap-3 bg-[#e21b23] px-6 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Download Catalogue PDF
                <ArrowRightIcon className="h-4 w-4" />
              </a>

              <a
                href={APP_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-3 border border-white/30 px-6 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Request on WhatsApp
              </a>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              Catalogue PDF availability depends on the uploaded file.
            </p>
          </div>

          {/* Catalogue visual */}
          <div className="relative mx-auto w-full max-w-[470px]">
            <div className="absolute -inset-4 border border-white/10" />

            <div className="relative min-h-[300px] overflow-hidden border border-white/10 bg-[#151619] p-7 sm:min-h-[380px] sm:p-10">
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

              <p className="mt-5 max-w-xs text-sm leading-6 text-gray-300">
                Professional machinery
                <br />
                Industrial tools
                <br />
                Equipment accessories
              </p>

              <div className="absolute bottom-5 right-6 text-6xl font-black italic text-white/[0.05] sm:text-8xl">
                TUQO
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-[1300px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
            EXPLORE THE RANGE
          </p>

          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">
            FIND YOUR EQUIPMENT
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
            Browse our product categories or contact our team for catalogue
            and technical information.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              number: "01",
              name: "High Pressure Washer",
              href: "/products/high-pressure-washer",
            },
            {
              number: "02",
              name: "Air Compressor",
              href: "/products/air-compressor",
            },
            {
              number: "03",
              name: "Power Tools",
              href: "/products/power-tools",
            },
            {
              number: "04",
              name: "High Pressure Washer Accessories",
              href: "/products/high-pressure-washer-accessories",
            },
            {
              number: "05",
              name: "Auto Detailing",
              href: "/products/auto-detailing",
            },
            {
              number: "06",
              name: "Power Tools Accessories",
              href: "/products/power-tools-accessories",
            },
          ].map((category) => (
            <Link
              key={category.number}
              href={category.href}
              className="group flex min-h-[110px] items-center justify-between border border-gray-200 p-5 transition duration-300 hover:border-[#e21b23] hover:shadow-lg sm:p-6"
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
      </section>

      {/* Contact CTA */}
      <section className="bg-[#f5f5f5]">
        <div className="mx-auto flex max-w-[1300px] flex-col items-start justify-between gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center lg:px-12">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
              NEED PRODUCT INFORMATION?
            </p>

            <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl">
              LET&apos;S FIND THE RIGHT EQUIPMENT.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Contact our team for the latest catalogue, product
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
              Contact on WhatsApp
              <ArrowRightIcon className="h-4 w-4" />
            </a>

            <a
              href={`tel:${APP_CONFIG.phoneRaw}`}
              className="inline-flex h-12 items-center justify-center border border-gray-300 px-6 text-sm font-bold transition hover:border-[#e21b23]"
            >
              Call Our Team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
