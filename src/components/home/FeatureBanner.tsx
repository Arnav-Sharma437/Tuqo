import React from "react";
import Image from "next/image";

export function FeatureBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0c0d10] text-white">
      {/* Full width container */}
      <div className="relative mx-auto max-w-7xl">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[260px] md:min-h-[290px]">
          {/* Left Action Visual Column */}
          <div className="relative h-64 sm:h-72 lg:h-auto lg:col-span-7 overflow-hidden">
            <Image
              src="/images/feature-banner.jpg"
              alt="TUQO Power Tool in Action"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-left md:object-center"
            />
            {/* Dark gradient overlay for smooth blend on small screens */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-transparent to-transparent lg:hidden" />
          </div>

          {/* Right Brand Content Column with dynamic red/black styling */}
          <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 lg:col-span-5 lg:py-12 bg-[#0c0d10] lg:bg-transparent">
            {/* Red accent bar on large screens */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-3 bg-[#d71920] -skew-x-12" />

            <div className="lg:pl-6">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#d71920]">
                TUQO TOOLS
              </span>

              <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl lg:text-4xl leading-[1.1]">
                ENGINEERED
                <br />
                FOR REAL WORK
              </h2>

              <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed max-w-md">
                From heavy-duty machines to precision tools, TUQO empowers you to work smarter, faster and better.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
