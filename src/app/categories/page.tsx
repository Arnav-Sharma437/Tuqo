
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/Icons";

export const metadata = {
  title: "Product Categories | TUQO Tools",
  description:
    "Explore TUQO professional machinery, power tools and accessories.",
};

const categories = [
  {
    no: "01",
    title: "High Pressure Washer",
    desc: "Professional high-pressure cleaning machines for powerful and reliable performance.",
    image: "/images/cat-pressure-washer.png",
    href: "/products/high-pressure-washer",
  },
  {
    no: "02",
    title: "Air Compressor",
    desc: "Reliable compressed-air equipment for workshops and professional applications.",
    image: "/images/cat-air-compressor.png",
    href: "/products/air-compressor",
  },
  {
    no: "03",
    title: "Power Tools",
    desc: "Professional power tools designed for demanding workshop tasks.",
    image: "/images/cat-power-tools.png",
    href: "/products/power-tools",
  },
  {
    no: "04",
    title: "High Pressure Washer Accessories",
    desc: "Accessories and attachments for high-pressure cleaning equipment.",
    image: "/images/cat-accessories.png",
    href: "/products/high-pressure-washer-accessories",
  },
  {
    no: "05",
    title: "Auto Detailing",
    desc: "Equipment and accessories for professional vehicle cleaning and detailing.",
    image: "/images/cat-foam-dispenser.png",
    href: "/products/auto-detailing",
  },
  {
    no: "06",
    title: "Power Tools Accessories",
    desc: "Accessories and components for professional power tools.",
    image: "/images/cat-accessories.png",
    href: "/products/power-tools-accessories",
  },
];

const benefits = [
  {
    no: "01",
    title: "Premium Quality",
    desc: "Quality-focused equipment",
  },
  {
    no: "02",
    title: "Professional Range",
    desc: "Built for demanding work",
  },
  {
    no: "03",
    title: "Wide Product Range",
    desc: "Tools and accessories",
  },
  {
    no: "04",
    title: "Expert Support",
    desc: "Help with product enquiries",
  },
];

const faqs = [
  {
    q: "What product categories does TUQO offer?",
    a: "TUQO categories include high pressure washers, air compressors, power tools and their accessories, along with auto detailing products.",
  },
  {
    q: "How can I find products in a category?",
    a: "Select View Products on a category card to open its dedicated product page.",
  },
  {
    q: "Can I request product information?",
    a: "Yes. Contact the TUQO team for product details and catalogue information.",
  },
  {
    q: "Are bulk enquiries accepted?",
    a: "Contact the TUQO team to discuss your product and bulk requirements.",
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-r from-gray-100 to-white">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 md:py-16 lg:px-10">
          <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-[#e21b23]">
              Home
            </Link>
            <span>/</span>
            <span className="font-bold text-black">Categories</span>
          </nav>

          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-[#e21b23]">
              EXPLORE OUR RANGE
            </p>

            <h1 className="text-3xl font-black uppercase leading-tight sm:text-4xl md:text-6xl">
              OUR <span className="text-[#e21b23]">PRODUCT RANGE</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              Explore TUQO professional machinery, power tools and accessories
              designed for performance, reliability and everyday professional use.
            </p>

            <a
              href="#category-grid"
              className="mt-6 inline-flex items-center gap-3 border-b-2 border-[#e21b23] pb-2 text-sm font-bold"
            >
              Explore Categories
              <span className="text-[#e21b23]">↓</span>
            </a>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 right-5 hidden text-[180px] font-black text-black/[0.035] md:block"
        >
          TUQO
        </span>
      </section>

      {/* BENEFITS */}
      <section className="border-b border-gray-200">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-4 px-5 py-5 sm:px-8 md:grid-cols-4 lg:px-10">
          {benefits.map((item) => (
            <div key={item.no} className="flex gap-3">
              <span className="text-xl font-black text-[#e21b23]">
                {item.no}
              </span>
              <div>
                <h2 className="text-sm font-bold">{item.title}</h2>
                <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPACT CATEGORY CARDS */}
      <section
        id="category-grid"
        className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 md:py-10 lg:px-10"
      >
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
              FIND THE RIGHT EQUIPMENT
            </p>

            <h2 className="text-2xl font-black tracking-tight md:text-3xl">
              Explore Our <span className="text-[#e21b23]">Products</span>
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Select a category to explore its product range.
            </p>
          </div>

          <span className="text-xs font-bold tracking-widest text-gray-500">
            06 CATEGORIES
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <article
              key={cat.no}
              className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/50 hover:shadow-lg"
            >
              <Link
                href={cat.href}
                className="relative flex h-[135px] items-center justify-center bg-gray-50 p-3"
                aria-label={`View ${cat.title} products`}
              >
                <span className="absolute left-3 top-3 z-10 bg-white px-2 py-1 text-[10px] font-bold">
                  {cat.no}
                </span>

                <div className="relative h-24 w-full transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain"
                  />
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-2.5">
                <p className="text-[9px] font-extrabold uppercase tracking-widest text-[#e21b23]">
                  TUQO PROFESSIONAL RANGE
                </p>

                <h3 className="mt-1.5 text-sm font-black uppercase leading-5">
                  {cat.title}
                </h3>

                <p className="mt-1.5 flex-1 text-xs leading-5 text-gray-500">
                  {cat.desc}
                </p>

                <Link
                  href={cat.href}
                  className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2.5 text-[10px] font-bold uppercase tracking-wider"
                >
                  <span className="text-gray-600 transition-colors group-hover:text-black">
                    View Products
                  </span>

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 transition-all group-hover:translate-x-1 group-hover:bg-[#e21b23] group-hover:text-white">
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* E-CATALOG */}
      <section className="mx-auto max-w-[1400px] px-5 pb-10 sm:px-8 lg:px-10">
        <div className="grid overflow-hidden border border-gray-200 md:grid-cols-2">
          <div className="flex min-h-56 items-center bg-gradient-to-br from-red-800 via-red-600 to-red-900 p-7 text-white md:p-10">
            <div>
              <p className="text-xs font-bold tracking-[4px]">
                TUQO / RESOURCES
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                E-CATALOG
              </h2>

              <p className="mt-3 text-sm text-red-100">
                Professional equipment. One complete range.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center bg-gray-50 p-7 md:p-10">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#e21b23]">
              EXPLORE OUR COMPLETE RANGE
            </p>

            <h2 className="mt-3 text-2xl font-black">
              TUQO <span className="text-[#e21b23]">E-CATALOG</span>
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Contact our team to request product information and the latest catalogue.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-5 bg-[#e21b23] px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              Request E-Catalog <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE TUQO */}
      <section className="border-y border-gray-200 bg-[#f6f6f6] py-10 md:py-14">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 sm:px-8 md:grid-cols-2 md:gap-12 lg:px-10">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#e21b23]">
              WHY CHOOSE TUQO
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              BUILT FOR <span className="text-[#e21b23]">PROFESSIONALS.</span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-gray-600">
              Explore practical machinery, power tools and accessories for
              professional cleaning and workshop requirements.
            </p>

            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-3 text-sm font-bold text-[#e21b23]"
            >
              Talk to Our Team <span>→</span>
            </Link>
          </div>

          <div>
            {[
              ["01", "Performance Focus", "Equipment for demanding tasks."],
              ["02", "Product Variety", "Six categories in one place."],
              ["03", "Customer Support", "Help with product enquiries."],
            ].map(([no, title, desc]) => (
              <div
                key={no}
                className="flex items-center gap-4 border-b border-gray-300 py-4"
              >
                <span className="text-sm font-bold text-[#e21b23]">
                  {no}
                </span>

                <div className="flex-1">
                  <h3 className="text-sm font-bold">{title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{desc}</p>
                </div>

                <span className="text-xl text-[#e21b23]">↗</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto grid max-w-[1400px] gap-7 px-5 py-10 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12 md:py-14 lg:px-10">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#e21b23]">
            NEED HELP?
          </p>

          <h2 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
            FREQUENTLY ASKED <span className="text-[#e21b23]">QUESTIONS</span>
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-500">
            Find answers about our categories and product information.
          </p>

          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-3 text-sm font-bold text-[#e21b23]"
          >
            Contact Us <span>→</span>
          </Link>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <details
              key={faq.q}
              open={index === 0}
              className="border-b border-gray-200 py-4"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold">
                {faq.q}
                <span className="text-xl text-[#e21b23]">+</span>
              </summary>

              <p className="mt-3 pr-8 text-sm leading-6 text-gray-500">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-[#171717] py-8 text-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-5 px-5 sm:px-8 md:flex-row md:items-center lg:px-10">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#e21b23]">
              LET&apos;S GET STARTED
            </p>

            <h2 className="mt-2 text-xl font-black md:text-2xl">
              Looking for the right equipment?
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Talk to our team about your product requirements.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-5 bg-[#e21b23] px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Get in Touch <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
