"use client";

import React from "react";
import { APP_CONFIG } from "@/constants";
import {
  WhatsAppIcon,
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
} from "@/components/common/Icons";

export function ContactSection() {
  return (
    <section id="contact" className="relative w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Top Header */}
        <div className="mb-12 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-6 rounded-full bg-[#d31820]" />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#d31820]">
              GET IN TOUCH
            </span>
          </div>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
            CONTACT US
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            We love our customers, so feel free to visit during normal business hours or reach out directly on WhatsApp.
          </p>
        </div>

        {/* Custom Redesigned Industrial Layout Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-stretch">
          {/* Left Column: Direct WhatsApp & Phone Action Card */}
          <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#0e0f14] via-[#14161d] to-[#0c0d11] p-8 sm:p-10 text-white shadow-xl ring-1 ring-white/10 lg:col-span-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Customer Support Active
              </div>

              <h3 className="mt-6 text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                Quick Assistance &amp; Inquiries
              </h3>

              <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                Connect directly with our technical support and sales team for product catalogs, quotes, and authorized dealer inquiries.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={APP_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black shadow-lg shadow-emerald-950/40 transition-all duration-200 hover:bg-[#20bd5a] hover:scale-[1.02] active:scale-95"
                >
                  <WhatsAppIcon className="h-5 w-5 text-black" />
                  <span>Message on WhatsApp</span>
                </a>

                <a
                  href={`tel:${APP_CONFIG.phoneRaw}`}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/40 active:scale-95"
                >
                  <PhoneIcon className="h-4 w-4 text-[#d31820] group-hover:scale-110 transition-transform" />
                  <span>{APP_CONFIG.phone}</span>
                </a>
              </div>
            </div>

            {/* Bottom trust footnote */}
            <div className="mt-8 border-t border-white/10 pt-6 flex items-center justify-between text-xs text-gray-400">
              <span className="font-medium">Direct Industrial Line</span>
              <span className="font-semibold text-white tracking-wide">Fast Response</span>
            </div>
          </div>

          {/* Right Column: Office Location & Business Hours */}
          <div className="flex flex-col justify-between gap-6 lg:col-span-6">
            {/* Location Card */}
            <div className="rounded-3xl border border-gray-200/90 bg-[#fafbfc] p-6 sm:p-8 shadow-sm transition-all hover:border-gray-300">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#d31820] text-white shadow-md shadow-red-600/20">
                  <MapPinIcon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#d31820]">
                    CORPORATE &amp; MANUFACTURING FACILITY
                  </span>
                  <h3 className="mt-1 text-lg sm:text-xl font-bold uppercase tracking-tight text-gray-950">
                    {APP_CONFIG.business.name}
                  </h3>
                  <address className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-600 not-italic font-medium">
                    {APP_CONFIG.business.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="rounded-3xl border border-gray-200/90 bg-[#fafbfc] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200/80 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white">
                    <ClockIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-950">
                      Working Hours
                    </h3>
                    <p className="text-[11px] text-gray-500">Standard IST Timezone</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  Mon - Fri
                </span>
              </div>

              {/* Hours Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {APP_CONFIG.businessHours.map((item) => {
                  const isClosed = item.hours === "Closed";
                  return (
                    <div
                      key={item.day}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                        isClosed
                          ? "bg-red-50/60 text-red-700"
                          : "bg-white border border-gray-100 text-gray-800"
                      }`}
                    >
                      <span className="font-bold">{item.day}</span>
                      <span className={isClosed ? "font-bold text-red-600" : "font-medium text-gray-600"}>
                        {item.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
