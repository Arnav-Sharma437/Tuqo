import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/Icons";

export function FeatureBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#08090b] text-white">
      <div className="grid min-h-[420px] grid-cols-1 lg:grid-cols-2">

        {/* ================= IMAGE ================= */}
        <div className="relative min-h-[300px] overflow-hidden lg:min-h-[500px]">
          <Image
            src="/images/banner-action.png"
            alt="TUQO Professional Tools in Action"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 hover:scale-105"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/10 to-[#08090b]/90 lg:from-transparent lg:via-black/10 lg:to-[#08090b]" />

          {/* Red accent */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-[#e21b23] lg:bottom-auto lg:right-0 lg:left-auto lg:h-full lg:w-1" />
        </div>

        {/* ================= CONTENT ================= */}
        <div className="relative flex items-center bg-[#08090b] px-6 py-14 sm:px-10 lg:px-14 xl:px-20">

          {/* Red glow */}
          <div className="pointer-events-none absolute right-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-red-600/10 blur-[100px]" />

          <div className="relative z-10 max-w-xl">

            {/* Label */}
            <div className="mb-4 flex items-center gap-2">
              <span className="h-[3px] w-7 bg-[#e21b23]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23] sm:text-xs">
                TUQO TOOLS
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-black uppercase leading-[0.95] tracking-tight sm:text-3xl lg:text-4xl">
              <span className="block text-white">
                ENGINEERED
              </span>

              <span className="block text-[#e21b23]">
                FOR REAL WORK
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-lg text-sm leading-6 text-gray-300 sm:text-base sm:leading-7">
              From heavy-duty machines to precision tools, TUQO empowers
              professionals to work smarter, faster and better with
              reliable equipment built for demanding jobs.
            </p>

            {/* Features */}
            <div className="mt-7 grid grid-cols-2 gap-5 border-y border-white/10 py-5">
              <div>
                <p className="text-2xl font-black text-white sm:text-3xl">
                  100%
                </p>

                <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-gray-400 sm:text-[10px]">
                  Copper Motor Units
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-[#e21b23] sm:text-3xl">
                  HEAVY-DUTY
                </p>

                <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-gray-400 sm:text-[10px]">
                  Continuous Duty Cycle
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-7">
              <Link
                href="#categories"
                className="group inline-flex h-11 min-w-[175px] items-center justify-center gap-2 rounded-md bg-[#e21b23] px-6 text-[10px] font-extrabold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#ff252d]"
              >
                Discover Equipment

                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
