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
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#08090b] py-16 text-white sm:py-20 lg:py-24"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      {/* Red glow */}
      <div className="pointer-events-none absolute right-[-150px] top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-red-600/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">

        {/* ================= HEADER ================= */}
        <div className="mb-10 max-w-3xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-[3px] w-7 bg-[#e21b23]" />

            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23] sm:text-xs">
              GET IN TOUCH
            </span>
          </div>

          <h2 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl">
            HAVE A QUESTION?
            <br />
            <span className="text-[#e21b23]">
              WE&apos;RE HERE TO HELP.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
            Connect directly with our technical support and sales team for
            product catalogs, quotes, service assistance, and dealer inquiries.
          </p>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">

          {/* ================= SUPPORT CARD ================= */}
          <div className="relative flex flex-col justify-between overflow-hidden border border-white/10 bg-[#101114] p-7 sm:p-9 lg:col-span-6">

            {/* Red corner */}
            <div className="absolute right-0 top-0 h-1 w-24 bg-[#e21b23]" />

            <div>

              {/* Status */}
              <div className="inline-flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Customer Support Active
              </div>

              <h3 className="mt-6 text-2xl font-black uppercase leading-tight tracking-tight text-white sm:text-3xl">
                QUICK ASSISTANCE
                <br />
                <span className="text-[#e21b23]">&amp; INQUIRIES</span>
              </h3>

              <p className="mt-4 max-w-lg text-sm leading-6 text-gray-400">
                Get in touch with our team for product information, technical
                support, quotations, catalogs, and authorized dealer inquiries.
              </p>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                {/* WhatsApp */}
                <a
                  href={APP_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-11 w-[210px] min-w-[210px] items-center justify-center gap-2.5 rounded-md bg-[#25D366] px-6 text-[10px] font-extrabold uppercase tracking-wider text-black transition-all duration-300 hover:bg-[#20bd5a] hover:shadow-[0_10px_30px_rgba(37,211,102,0.18)]"
                >
                  <WhatsAppIcon className="h-4 w-4 text-black" />
                  <span>Message on WhatsApp</span>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${APP_CONFIG.phoneRaw}`}
                  className="group inline-flex h-11 w-[210px] min-w-[210px] items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.03] px-6 text-[10px] font-extrabold uppercase tracking-wider text-white transition-all duration-300 hover:border-[#e21b23] hover:bg-white/[0.06]"
                >
                  <PhoneIcon className="h-4 w-4 text-[#e21b23]" />
                  <span>{APP_CONFIG.phone}</span>
                </a>

              </div>
            </div>

            {/* Bottom info */}
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500">
                Direct Industrial Line
              </span>

              <span className="text-[9px] font-extrabold uppercase tracking-wider text-white">
                Fast Response
              </span>
            </div>

          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex flex-col gap-4 lg:col-span-6">

            {/* Location */}
            <div className="border border-white/10 bg-[#101114] p-6 sm:p-8">
              <div className="flex items-start gap-5">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#e21b23] text-white">
                  <MapPinIcon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
                    CORPORATE &amp; MANUFACTURING FACILITY
                  </span>

                  <h3 className="mt-2 text-lg font-black uppercase tracking-tight text-white sm:text-xl">
                    {APP_CONFIG.business.name}
                  </h3>

                  <address className="mt-2 text-xs leading-5 text-gray-400 not-italic sm:text-sm">
                    {APP_CONFIG.business.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>

              </div>
            </div>

            {/* ================= WORKING HOURS ================= */}
            <div className="border border-white/10 bg-[#101114] p-7 sm:p-9">

              {/* Working Hours Header */}
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#e21b23] text-white">
                    <ClockIcon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="text-base font-black uppercase tracking-wide text-white sm:text-lg">
                      Working Hours
                    </h3>

                    <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                      Standard IST Timezone
                    </p>
                  </div>

                </div>

                <span className="hidden border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-emerald-400 sm:block">
                  Mon - Fri
                </span>

              </div>

              {/* Hours */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {APP_CONFIG.businessHours.map((item) => {
                  const isClosed = item.hours === "Closed";

                  return (
                    <div
                      key={item.day}
                      className={`flex min-h-[58px] items-center justify-between border px-5 py-3.5 transition-all duration-200 ${
                        isClosed
                          ? "border-red-500/20 bg-red-500/5"
                          : "border-white/5 bg-white/[0.025] hover:border-white/15"
                      }`}
                    >

                      <span className="text-xs font-extrabold uppercase tracking-wide text-gray-200 sm:text-sm">
                        {item.day}
                      </span>

                      <span
                        className={`text-xs font-bold sm:text-sm ${
                          isClosed
                            ? "text-[#e21b23]"
                            : "text-gray-300"
                        }`}
                      >
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

      {/* Bottom red line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#e21b23]" />
    </section>
  );
}
