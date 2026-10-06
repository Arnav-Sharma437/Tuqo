import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/Icons";

export function IndustriesServed() {
  const industries = [
    {
      title: "Automotive & Car Detailing",
      description: "Heavy-duty high-pressure washers, snow foam dispensers, and wet extractors built for non-stop wash bay operations.",
      icon: "🚗",
      badge: "High Demand",
    },
    {
      title: "Metal Fabrication & Welding",
      description: "High-torque angle grinders, heavy core drills, and pneumatic power lines for structural metal work.",
      icon: "⚙️",
      badge: "Industrial Heavy",
    },
    {
      title: "Construction & Masonry",
      description: "Continuous-duty air compressors, demolition tools, and rugged cutting equipment for jobsite demands.",
      icon: "🏗️",
      badge: "Rugged Build",
    },
    {
      title: "Manufacturing & Facilities",
      description: "Plant maintenance equipment, heavy industrial cleaning drums, and high-volume compressed air supply.",
      icon: "🏭",
      badge: "24/7 Duty",
    },
  ];

  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-6 rounded-full bg-[#d31820]" />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#d31820]">
              APPLICATIONS
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-gray-950 sm:text-3xl lg:text-4xl">
            INDUSTRIES POWERED BY TUQO
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Trusted by commercial workshops, detailing studios, factories, and contractors across India.
          </p>
        </div>

        {/* 4 Industry Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind) => (
            <div
              key={ind.title}
              className="group relative flex flex-col justify-between rounded-2xl border border-gray-200/90 bg-[#fafbfc] p-6 transition-all duration-300 hover:border-red-300 hover:bg-white hover:shadow-xl hover:shadow-red-500/5 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2 rounded-xl bg-white border border-gray-200/70 shadow-xs">
                    {ind.icon}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full group-hover:bg-red-50 group-hover:text-[#d31820] transition-colors">
                    {ind.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-950 leading-snug group-hover:text-[#d31820] transition-colors">
                  {ind.title}
                </h3>

                <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                  {ind.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-gray-950 transition-colors">
                  View Matching Gear
                </span>
                <div className="h-6 w-6 rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#d31820] group-hover:translate-x-1 transition-all">
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
