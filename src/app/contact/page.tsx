```tsx
"use client";

import React from "react";
import { APP_CONFIG } from "@/constants";
import {
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@/components/common/Icons";

export default function ContactPage() {
  return (
    <main className="w-full bg-white">
      {/* PAGE BANNER */}
      <section className="w-full bg-[#cf0000] px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
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

      {/* LOCATION SECTION */}
      <section className="w-full bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-[3px] w-7 bg-[#e21b23]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
                OUR LOCATION
              </span>
            </div>

            <h2 className="text-3xl font-black uppercase text-[#111214] sm:text-4xl">
              FIND US HERE
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* ADDRESS CARD */}
            <div className="flex min-h-[260px] flex-col justify-center bg-[#08090b] p-8 text-white sm:p-10">
              <div className="flex h-14 w-14 items-center justify-center bg-[#e21b23]">
                <MapPinIcon className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-2xl font-black uppercase">
                {APP_CONFIG.business.name}
              </h3>

              <address className="mt-3 text-sm leading-6 text-gray-400 not-italic">
                {APP_CONFIG.business.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>

            {/* GOOGLE MAP */}
            <div className="min-h-[260px] overflow-hidden border border-gray-200 bg-[#f3f3f3]">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  APP_CONFIG.business.addressLines.join(", ")
                )}&output=embed`}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  minHeight: "320px",
                }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="TUQO Tools Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WORKING HOURS + CONTACT FORM */}
      <section className="w-full bg-[#f7f7f7] py-10 sm:py-12 lg:py-14">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-start gap-6 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">

          {/* WORKING HOURS - LEFT ON DESKTOP */}
          <div className="w-full border border-gray-200 bg-white p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-4 border-b border-gray-100 pb-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#e21b23] text-white">
                <ClockIcon className="h-5 w-5" />
              </div>

              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#e21b23]">
                  OUR SCHEDULE
                </span>
                <h2 className="mt-1 text-xl font-black uppercase text-[#111214] sm:text-2xl">
                  WORKING HOURS
                </h2>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {APP_CONFIG.businessHours.map((item) => {
                const isClosed = item.hours === "Closed";

                return (
                  <div
                    key={item.day}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <span className="text-sm font-bold text-gray-700">
                      {item.day}
                    </span>

                    <span
                      className={`text-right text-sm font-bold ${
                        isClosed ? "text-[#e21b23]" : "text-gray-900"
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CONTACT FORM - RIGHT ON DESKTOP */}
          <div className="w-full border border-gray-200 bg-white p-6 sm:p-8 lg:p-10">
            <div className="mb-7">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-[3px] w-7 bg-[#e21b23]" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
                  SEND A MESSAGE
                </span>
              </div>

              <h2 className="text-3xl font-black uppercase text-[#111214] sm:text-4xl">
                CONTACT FORM
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                Fill out the form below and our team will get back to you shortly.
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700"
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
                  className="h-12 w-full border border-gray-300 bg-white px-4 text-sm outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700"
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
                  className="h-12 w-full border border-gray-300 bg-white px-4 text-sm outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  className="h-12 w-full border border-gray-300 bg-white px-4 text-sm outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]"
                />
              </div>

              <div>
                <label
                  htmlFor="enquiryType"
                  className="mb-2 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700"
                >
                  Enquiry Type *
                </label>
                <select
                  id="enquiryType"
                  name="enquiryType"
                  defaultValue="Product Information"
                  required
                  className="h-12 w-full border border-gray-300 bg-white px-4 text-sm outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]"
                >
                  <option>Product Information</option>
                  <option>Price / Quotation</option>
                  <option>Technical Support</option>
                  <option>Service &amp; Repair</option>
                  <option>Dealer Enquiry</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="How can we help you?"
                  className="w-full resize-none border border-gray-300 bg-white px-4 py-4 text-sm outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]"
                />
              </div>

              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-2 bg-[#e21b23] text-xs font-extrabold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#b8141a] hover:shadow-lg"
              >
                Send Enquiry
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
```
