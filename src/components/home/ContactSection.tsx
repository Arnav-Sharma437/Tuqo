"use client";

import React from "react";
import { APP_CONFIG } from "@/constants";
import { ClockIcon } from "@/components/common/Icons";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#08090b] py-16 text-white sm:py-20 lg:py-24"
    >
      {/* Background machinery image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-banner-bg.png')",
        }}
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/85"
      />

      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      {/* Red glow effect */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* ================= HEADER ================= */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="mb-3 inline-flex items-center gap-2">
            <span className="h-[3px] w-7 bg-[#e21b23]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23] sm:text-xs">
              WORKING HOURS &amp; SCHEDULE
            </span>
            <span className="h-[3px] w-7 bg-[#e21b23]" />
          </div>

          <h2 className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            HAVE A QUESTION?
            <br />
            <span className="text-[#e21b23]">WE&apos;RE HERE TO HELP.</span>
          </h2>

          <p className="mt-4 text-xs leading-6 text-gray-300 sm:text-sm sm:leading-7">
            Our engineering desk and technical service support operate during standard industrial IST hours.
          </p>
        </div>

        {/* ================= WORKING HOURS CARD ================= */}
        <div className="rounded-3xl border border-white/10 bg-[#101114]/95 p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          {/* Working Hours Card Header */}
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e21b23] text-white shadow-lg shadow-red-900/40">
                <ClockIcon className="h-7 w-7" />
              </div>

              <div>
                <h3 className="text-lg font-black uppercase tracking-wide text-white sm:text-xl">
                  Standard Operating Hours
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  Indian Standard Time (IST &bull; UTC +5:30)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Technical Desk</span>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {APP_CONFIG.businessHours.map((item) => {
              const isClosed = item.hours.toLowerCase().includes("closed");

              return (
                <div
                  key={item.day}
                  className={`flex min-h-[64px] items-center justify-between rounded-xl border px-5 py-3.5 transition-all duration-200 ${
                    isClosed
                      ? "border-red-500/20 bg-red-500/10 text-gray-400"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isClosed ? "bg-red-500" : "bg-emerald-500"
                      }`}
                    />
                    <span className="text-xs font-black uppercase tracking-wider text-white sm:text-sm">
                      {item.day}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-bold sm:text-sm ${
                      isClosed ? "text-[#ff4b51]" : "text-gray-200"
                    }`}
                  >
                    {item.hours}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom Note */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-gray-400">
            <p>
              Service requests and quotation inquiries submitted after business hours are attended to first thing next working morning.
            </p>
            <span className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-[#e21b23]">
              TUQO Industrial Standard
            </span>
          </div>
        </div>
      </div>

      {/* Bottom red line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#e21b23]" />
    </section>
  );
}
