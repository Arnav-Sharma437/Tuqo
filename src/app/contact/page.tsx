"use client";

import React from "react";
import { APP_CONFIG } from "@/constants";
import {
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/common/Icons";

export default function ContactPage() {
  return (
    <main className="w-full bg-[#f9fafc] min-h-screen text-[#111214]">
      {/* PAGE BANNER */}
      <section className="w-full bg-[#cf0000] px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-[1360px]">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Contact Us
          </h1>

          <nav
            aria-label="Breadcrumb"
            className="mt-3 flex items-center gap-3 text-sm"
          >
            <a
              href="/"
              className="text-white transition-opacity hover:opacity-80"
            >
              Home
            </a>
            <span aria-hidden="true" className="text-white/80">
              ›
            </span>
            <span className="text-white/80">Contact Us</span>
          </nav>
        </div>
      </section>

      {/* UNIFIED CONTAINER FOR ENTIRE CONTACT PAGE */}
      <div className="mx-auto max-w-[1360px] px-5 py-12 sm:px-8 lg:px-10 space-y-12">
        {/* ================= 1. LOCATION SECTION ================= */}
        <section>
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-[3px] w-7 bg-[#e21b23]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
                OUR LOCATION
              </span>
            </div>

            <h2 className="text-2xl font-black uppercase text-[#111214] sm:text-3xl">
              FIND US HERE
            </h2>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
            {/* Address Card (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-[#0d0f12] p-8 text-white shadow-md border border-white/10 min-h-[340px]">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e21b23] shadow-md shadow-red-900/30">
                  <MapPinIcon className="h-6 w-6 text-white" />
                </div>

                <span className="mt-6 block text-[10px] font-extrabold uppercase tracking-widest text-[#e21b23]">
                  CORPORATE &amp; MANUFACTURING FACILITY
                </span>

                <h3 className="mt-2 text-2xl font-black uppercase tracking-tight text-white">
                  {APP_CONFIG.business.name}
                </h3>

                <address className="mt-3 text-sm leading-6 text-gray-300 not-italic">
                  {APP_CONFIG.business.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <span>Pan-India Equipment Supply</span>
                <span className="text-[#e21b23] font-bold">Tamil Nadu, India</span>
              </div>
            </div>

            {/* Google Map (7 Cols) */}
            <div className="lg:col-span-7 h-[340px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  APP_CONFIG.business.addressLines.join(", ")
                )}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="TUQO Tools Location Map"
              />
            </div>
          </div>
        </section>

        {/* ================= 2. WORKING HOURS & CONTACT FORM ================= */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* LEFT COLUMN: WORKING HOURS + DIRECT ASSISTANCE (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Working Hours Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 shadow-sm">
              <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e21b23] text-white shadow-sm">
                    <ClockIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#e21b23]">
                      OUR SCHEDULE
                    </span>
                    <h3 className="text-lg font-black uppercase text-[#111214]">
                      WORKING HOURS
                    </h3>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                  IST Timezone
                </span>
              </div>

              <div className="divide-y divide-gray-100 text-xs sm:text-sm">
                {APP_CONFIG.businessHours.map((item) => {
                  const isClosed = item.hours.toLowerCase().includes("closed");

                  return (
                    <div
                      key={item.day}
                      className="flex items-center justify-between py-2.5"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isClosed ? "bg-red-400" : "bg-emerald-500"
                          }`}
                        />
                        <span className="font-bold text-gray-800">{item.day}</span>
                      </div>

                      <span
                        className={`font-extrabold ${
                          isClosed
                            ? "text-[#e21b23] bg-red-50 px-2 py-0.5 rounded text-xs"
                            : "text-gray-900"
                        }`}
                      >
                        {item.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Helpline & Fast Contact Card (Eliminates the empty space) */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 shadow-sm space-y-4">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#e21b23]">
                  INSTANT CONNECT
                </span>
                <h3 className="text-lg font-black uppercase text-[#111214] mt-0.5">
                  DIRECT ASSISTANCE
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Need quick equipment consultation, quotation or spare part availability?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Phone */}
                <a
                  href={`tel:${APP_CONFIG.phoneRaw}`}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-[#f9fafc] p-3.5 transition-all hover:border-[#e21b23] hover:bg-white group"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e21b23] text-white">
                    <PhoneIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase text-gray-400 block">Call Desk</span>
                    <span className="text-xs font-black text-gray-900 group-hover:text-[#e21b23]">{APP_CONFIG.phone}</span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={APP_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-[#f9fafc] p-3.5 transition-all hover:border-[#25D366] hover:bg-white group"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-black">
                    <WhatsAppIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase text-gray-400 block">WhatsApp</span>
                    <span className="text-xs font-black text-gray-900 group-hover:text-emerald-600">Quick Reply</span>
                  </div>
                </a>

                {/* WhatsApp Channel */}
                <a
                  href={APP_CONFIG.social.whatsappChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:col-span-2 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-50/70 p-3 transition-all hover:bg-emerald-100/60 group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-black">
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-bold text-gray-900">
                      Follow the TUQO TOOLS channel on WhatsApp
                    </span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 group-hover:underline">
                    Follow →
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-gray-200 bg-white p-7 sm:p-9 shadow-sm">
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-[3px] w-7 bg-[#e21b23]" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
                  SEND A MESSAGE
                </span>
              </div>

              <h2 className="text-2xl font-black uppercase text-[#111214] sm:text-3xl">
                CONTACT FORM
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-gray-500">
                Fill out the form below and our technical desk will get back to you promptly.
              </p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700"
                  >
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                    className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    required
                    className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="enquiryType"
                    className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700"
                  >
                    Enquiry Type *
                  </label>
                  <select
                    id="enquiryType"
                    name="enquiryType"
                    defaultValue="Product Information"
                    required
                    className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]"
                  >
                    <option>Product Information</option>
                    <option>Price / Quotation</option>
                    <option>Technical Support</option>
                    <option>Service &amp; Repair</option>
                    <option>Dealer Enquiry</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="How can our equipment desk help you?"
                  className="w-full resize-none rounded-xl border border-gray-300 bg-white p-3.5 text-xs outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]"
                />
              </div>

              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#e21b23] text-xs font-extrabold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#b8141a] hover:shadow-lg"
              >
                <span>Send Enquiry</span>
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
