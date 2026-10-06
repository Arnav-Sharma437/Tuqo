import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/Icons";

export function FeatureBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#090a0d] text-white">
      {/* Full-width Edge-to-Edge Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[360px] md:min-h-[420px]">
        {/* Left Full-bleed Action Shot */}
        <div className="relative h-72 sm:h-96 lg:h-auto lg:col-span-7 overflow-hidden">
          <Image
            src="/images/banner-action.png"
            alt="TUQO Power Tool in Action"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-center scale-105 transition-transform duration-700 hover:scale-110"
          />

          {/* Full-width dark & red angle transitions */}
          <div className="hidden lg:block absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent via-[#090a0d]/60 to-[#090a0d]" />
          <div className="hidden lg:block absolute inset-y-0 right-16 w-3.5 bg-[#d31820] -skew-x-12 shadow-[0_0_25px_rgba(211,24,32,0.6)]" />

          {/* Mobile Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-transparent to-transparent lg:hidden" />
        </div>

        {/* Right Content Area with Full-width padding align */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-12 md:px-16 lg:col-span-5 lg:py-16 bg-[#090a0d]">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-6 rounded-full bg-[#d31820]" />
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#d31820]">
                TUQO TOOLS
              </span>
            </div>

            <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.08]">
              ENGINEERED
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
                FOR REAL WORK
              </span>
            </h2>

            <p className="mt-5 text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              From heavy-duty machines to precision tools, TUQO empowers you to work smarter, faster and better with industrial-grade reliability.
            </p>

            {/* Industrial Spec Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-y border-white/10 py-5 text-xs">
              <div>
                <span className="block font-bold text-white text-lg sm:text-xl">100%</span>
                <span className="text-gray-400 uppercase tracking-wider text-[11px]">Copper Motor Units</span>
              </div>
              <div>
                <span className="block font-bold text-[#d31820] text-lg sm:text-xl">Heavy-Duty</span>
                <span className="text-gray-400 uppercase tracking-wider text-[11px]">Continuous Duty Cycle</span>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 rounded-lg bg-[#d31820] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-950/40 transition-all duration-200 hover:bg-[#b8141a] hover:scale-105 active:scale-95"
              >
                <span>Discover Equipment</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
