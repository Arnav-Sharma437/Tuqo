import React from "react";
import { APP_CONFIG } from "@/constants";
import { WhatsAppIcon, ArrowRightIcon } from "@/components/common/Icons";

export function CatalogCTA() {
  return (
    <section className="relative w-full bg-[#101217] text-white py-14 sm:py-16 overflow-hidden border-y border-white/10">
      {/* Subtle red accent glow in background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#d31820]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.04] to-transparent p-8 sm:p-12 lg:flex-row">
          {/* Left Text */}
          <div className="max-w-2xl text-center lg:text-left">
            <span className="inline-block rounded-full bg-[#d31820]/20 border border-[#d31820]/40 px-3.5 py-1 text-[11px] font-black uppercase tracking-widest text-red-400 mb-3">
              OFFICIAL 2024 - 2025 PRODUCT SPECIFICATIONS
            </span>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
              LOOKING FOR THE COMPLETE TUQO E-CATALOG?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
              Get comprehensive technical datasheets, machine schematics, and authorized distributor details delivered directly to you.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href={APP_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-emerald-950/50 transition-all hover:bg-[#20bd5a] hover:scale-105 active:scale-95"
            >
              <WhatsAppIcon className="h-4 w-4 text-black" />
              <span>Request on WhatsApp</span>
            </a>

            <a
              href={`tel:${APP_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40"
            >
              <span>Call Technical Desk</span>
              <ArrowRightIcon className="h-3.5 w-3.5 text-[#d31820]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
