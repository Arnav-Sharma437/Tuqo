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

        {/* ================= CONTACT DETAILS ================= */}
        <div className="grid grid-cols-1 gap-4">

          {/* ================= LOCATION ================= */}
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


          {/* ================= DIRECT CONTACT ================= */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* WhatsApp */}
            <a
              href={APP_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[90px] items-center gap-4 border border-white/10 bg-[#101114] p-5 transition-all duration-300 hover:border-[#25D366]/40 hover:bg-[#121519]"
            >

              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#25D366] text-black">
                <WhatsAppIcon className="h-5 w-5" />
              </div>

              <div>

                <span className="text-[9px] font-extrabold uppercase tracking-wider text-gray-500">
                  WHATSAPP
                </span>

                <p className="mt-1 text-sm font-black text-white sm:text-base">
                  Message Our Team
                </p>

                <p className="mt-1 text-[10px] text-gray-500">
                  Quick response
                </p>

              </div>

            </a>


            {/* Phone */}
            <a
              href={`tel:${APP_CONFIG.phoneRaw}`}
              className="group flex min-h-[90px] items-center gap-4 border border-white/10 bg-[#101114] p-5 transition-all duration-300 hover:border-[#e21b23]/40 hover:bg-[#121519]"
            >

              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#e21b23] text-white">
                <PhoneIcon className="h-5 w-5" />
              </div>

              <div>

                <span className="text-[9px] font-extrabold uppercase tracking-wider text-gray-500">
                  PHONE
                </span>

                <p className="mt-1 text-sm font-black text-white sm:text-base">
                  {APP_CONFIG.phone}
                </p>

                <p className="mt-1 text-[10px] text-gray-500">
                  Direct Industrial Line
                </p>

              </div>

            </a>

          </div>

        </div>

      </div>

      {/* Bottom red line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#e21b23]" />

    </section>
  );
}
