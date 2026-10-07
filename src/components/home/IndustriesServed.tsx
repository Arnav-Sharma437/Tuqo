import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/Icons";

export function IndustriesServed() {
  const industries = [
    {
      number: "01",
      title: "Automotive & Car Detailing",
      description:
        "Heavy-duty high-pressure washers, snow foam dispensers, and wet extractors built for non-stop wash bay operations.",
      icon: "🚗",
      badge: "High Demand",
    },
    {
      number: "02",
      title: "Metal Fabrication & Welding",
      description:
        "High-torque angle grinders, heavy core drills, and pneumatic power lines for structural metal work.",
      icon: "⚙️",
      badge: "Industrial Heavy",
    },
    {
      number: "03",
      title: "Construction & Masonry",
      description:
        "Continuous-duty air compressors, demolition tools, and rugged cutting equipment for jobsite demands.",
      icon: "🏗️",
      badge: "Rugged Build",
    },
    {
      number: "04",
      title: "Manufacturing & Facilities",
      description:
        "Plant maintenance equipment, heavy industrial cleaning drums, and high-volume compressed air supply.",
      icon: "🏭",
      badge: "24/7 Duty",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#f4f4f4] py-16 sm:py-20 lg:py-24">

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(#c7c7c7 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">

        {/* ================= HEADER ================= */}
        <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

          <div className="max-w-3xl">

            <div className="mb-3 flex items-center gap-2">
              <span className="h-[3px] w-7 bg-[#e21b23]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23] sm:text-xs">
                APPLICATIONS
              </span>
            </div>

            <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-[#111214] sm:text-4xl lg:text-5xl">
              INDUSTRIES
              <br className="sm:hidden" />{" "}
              <span className="text-[#e21b23]">
                POWERED BY TUQO
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
              Trusted by commercial workshops, detailing studios, factories,
              and contractors across India.
            </p>

          </div>

          <div className="hidden lg:block">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-gray-400">
              BUILT FOR EVERY INDUSTRY
            </span>
          </div>

        </div>

        {/* ================= INDUSTRY GRID ================= */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {industries.map((ind) => (
            <Link
              key={ind.title}
              href="#categories"
              className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/50 hover:shadow-2xl hover:shadow-black/10 sm:p-7"
            >

              {/* Large Number */}
              <span className="absolute -right-2 -top-5 text-[90px] font-black leading-none text-gray-100 transition-colors duration-300 group-hover:text-red-50">
                {ind.number}
              </span>

              <div className="relative z-10">

                {/* Icon + Badge */}
                <div className="mb-7 flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center border border-gray-200 bg-[#f7f7f7] text-2xl transition-all duration-300 group-hover:border-[#e21b23] group-hover:bg-[#e21b23]">
                    <span className="grayscale transition-all duration-300 group-hover:grayscale-0">
                      {ind.icon}
                    </span>
                  </div>

                  <span className="border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-[8px] font-extrabold uppercase tracking-wider text-gray-500 transition-colors group-hover:border-[#e21b23]/30 group-hover:text-[#e21b23]">
                    {ind.badge}
                  </span>

                </div>

                {/* Title */}
                <h3 className="max-w-[230px] text-lg font-black uppercase leading-tight tracking-tight text-[#111214] transition-colors duration-300 group-hover:text-[#e21b23]">
                  {ind.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-xs leading-5 text-gray-500 sm:text-[13px]">
                  {ind.description}
                </p>

              </div>

              {/* Bottom CTA */}
              <div className="relative z-10 mt-7 flex items-center justify-between border-t border-gray-100 pt-4">

                <span className="text-[9px] font-extrabold uppercase tracking-wider text-gray-400 transition-colors group-hover:text-[#111214]">
                  View Matching Gear
                </span>

                <span className="flex h-7 w-7 items-center justify-center bg-[#111214] text-white transition-all duration-300 group-hover:bg-[#e21b23] group-hover:translate-x-1">
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>

              </div>

            </Link>
          ))}

        </div>

      </div>

    </section>
  );
}
