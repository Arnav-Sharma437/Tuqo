import React from "react";
import Link from "next/link";

export default function AboutPage() {
  const industries = [
    "Automotive Workshops",
    "Car Wash & Detailing",
    "Industrial Workshops",
    "Manufacturing Units",
    "Commercial Maintenance",
    "Professional Contractors",
  ];

  return (
    <main className="w-full bg-white text-[#111214]">
      {/* PAGE BANNER */}
      <section className="w-full bg-[#cf0000] px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About
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

            <span className="text-white/80">About</span>
          </nav>
        </div>
      </section>

      {/* OUR STORY */}
      <section
        id="our-story"
        className="bg-white py-10 text-[#111214] sm:py-14"
      >
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-[3px] w-7 bg-[#e21b23]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23]">
              WHO WE ARE
            </span>
          </div>

          <h2 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl">
            PROFESSIONAL
            <br />
            <span className="text-[#e21b23]">EQUIPMENT.</span>
          </h2>

          <p className="mt-6 text-sm leading-7 text-[#333333] sm:text-base">
            TUQO is focused on providing professional machinery, power tools
            and equipment for businesses, workshops and working professionals.
          </p>

          <p className="mt-4 text-sm leading-7 text-[#333333] sm:text-base">
            Our product range is built around practical requirements —
            equipment that can handle demanding environments while delivering
            the performance professionals expect from their machines.
          </p>

          <p className="mt-4 text-sm leading-7 text-[#333333] sm:text-base">
            From cleaning and maintenance equipment to power tools and
            accessories, TUQO aims to make professional-grade equipment
            accessible through a focused and reliable product range.
          </p>

          <div className="mt-7 h-[3px] w-16 bg-[#e21b23]" />
        </div>
      </section>

      {/* ABOUT TUQO TOOLS */}
      <section className="border-y border-gray-200 bg-[#f9fafc] py-16 text-[#111214] sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="mb-3 inline-flex items-center gap-2">
              <span className="h-[3px] w-7 bg-[#e21b23]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23] sm:text-xs">
                CORE PHILOSOPHY
              </span>
              <span className="h-[3px] w-7 bg-[#e21b23]" />
            </div>

            <h2 className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              ABOUT TUQO <span className="text-[#e21b23]">TOOLS</span>
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-gray-500 max-w-lg mx-auto">
              Driven by industrial durability, engineering integrity, and dependable customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: History */}
            <div className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/50 hover:shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="rounded-full bg-red-50 border border-red-200 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#e21b23]">
                    01 / HERITAGE
                  </span>
                  <span className="h-2 w-2 rounded-full bg-gray-300 transition-colors group-hover:bg-[#e21b23]" />
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111214]">
                  Our History
                </h3>

                <p className="mt-4 text-xs leading-6 text-gray-600 sm:text-sm sm:leading-7">
                  TUQO Tools started as a focused machinery business with a
                  passion for providing high-quality equipment to workshops and industries.
                  Over the years, we have grown into a trusted equipment supplier with a
                  reputation for durability and performance.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-[10px] font-black uppercase tracking-wider text-[#e21b23]">
                <span>Proven Workshop Legacy</span>
              </div>
            </div>

            {/* Card 2: Products */}
            <div className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/50 hover:shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="rounded-full bg-red-50 border border-red-200 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#e21b23]">
                    02 / MACHINERY
                  </span>
                  <span className="h-2 w-2 rounded-full bg-gray-300 transition-colors group-hover:bg-[#e21b23]" />
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111214]">
                  Our Products
                </h3>

                <p className="mt-4 text-xs leading-6 text-gray-600 sm:text-sm sm:leading-7">
                  We specialize in machinery and equipment for automotive workshops,
                  cleaning &amp; detailing, construction, and manufacturing units. Our products include
                  high-pressure washers, air compressors, industrial vacuum cleaners, and accessories.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-[10px] font-black uppercase tracking-wider text-[#e21b23]">
                <span>Heavy-Duty Construction</span>
              </div>
            </div>

            {/* Card 3: Services */}
            <div className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/50 hover:shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="rounded-full bg-red-50 border border-red-200 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#e21b23]">
                    03 / SERVICE
                  </span>
                  <span className="h-2 w-2 rounded-full bg-gray-300 transition-colors group-hover:bg-[#e21b23]" />
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111214]">
                  Our Services
                </h3>

                <p className="mt-4 text-xs leading-6 text-gray-600 sm:text-sm sm:leading-7">
                  At TUQO Tools, we offer dedicated technical support to ensure that your
                  machinery stays in top operating condition. Our team provides genuine spare
                  parts, maintenance advice, and prompt pan-India service assistance.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-[10px] font-black uppercase tracking-wider text-[#e21b23]">
                <span>Pan-India Spares &amp; Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE */}
      <section className="bg-[#f5f5f5] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
          <div className="mb-10 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="h-[3px] w-7 bg-[#e21b23]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23]">
                BUILT FOR PROFESSIONALS
              </span>

              <span className="h-[3px] w-7 bg-[#e21b23]" />
            </div>

            <h2 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl">
              INDUSTRIES WE <span className="text-[#e21b23]">SERVE</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <div
                key={industry}
                className="group flex items-center justify-between border border-gray-200 bg-white px-6 py-5 transition-all duration-300 hover:border-[#e21b23]/40 hover:shadow-lg"
              >
                <span className="text-xs font-extrabold uppercase tracking-wide text-[#111214]">
                  {industry}
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111214] text-[10px] font-black text-white transition-colors group-hover:bg-[#e21b23]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
