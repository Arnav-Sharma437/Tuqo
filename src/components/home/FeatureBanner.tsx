import React from "react";
import Image from "next/image";

export function FeatureBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#090a0d] text-white py-4 sm:py-6">
      {/* Container */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0d0e12] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[300px] md:min-h-[340px]">
            {/* Left Action Image Column */}
            <div className="relative h-64 sm:h-80 lg:h-auto lg:col-span-7 overflow-hidden">
              <Image
                src="/images/banner-action.png"
                alt="TUQO Power Tool in Action"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center scale-105"
              />
              
              {/* Dynamic Angular Red Divider over image for desktop */}
              <div
                className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#0d0e12]"
              />
              <div
                className="hidden lg:block absolute inset-y-0 right-12 w-3 bg-[#d31820] -skew-x-12 opacity-90 shadow-2xl"
              />
              
              {/* Gradient for mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-transparent to-transparent lg:hidden" />
            </div>

            {/* Right Brand Content Column */}
            <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 lg:col-span-5 lg:py-14 bg-[#0d0e12]">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-1.5 w-5 rounded-full bg-[#d31820]" />
                <span className="text-xs font-black uppercase tracking-[0.25em] text-[#d31820]">
                  TUQO TOOLS
                </span>
              </div>

              <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.05]">
                ENGINEERED
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
                  FOR REAL WORK
                </span>
              </h2>

              <p className="mt-5 text-sm sm:text-base text-gray-300 leading-relaxed max-w-md font-normal">
                From heavy-duty machines to precision tools, TUQO empowers you to work smarter, faster and better.
              </p>

              {/* Quality & Performance indicators */}
              <div className="mt-6 flex items-center gap-6 border-t border-white/10 pt-5 text-xs text-gray-400 font-semibold tracking-wider uppercase">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Industrial Grade</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#d31820]" />
                  <span>Max Durability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
