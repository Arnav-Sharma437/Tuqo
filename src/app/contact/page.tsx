"use client";

import React from "react";
import Image from "next/image";
import { APP_CONFIG } from "@/constants";
import {
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  WhatsAppIcon,
  ArrowRightIcon,
} from "@/components/common/Icons";

export default function ContactPage() {
  return (
    <main className="w-full bg-white">

      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative isolate overflow-hidden bg-[#08090b] text-white">

        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_50%,rgba(226,27,35,0.18),transparent_40%)]" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#08090b] via-[#08090b]/95 to-[#08090b]/40" />

        <div className="pointer-events-none absolute right-[10%] top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-[#e21b23]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
          <div className="grid min-h-[430px] items-center gap-6 py-12 sm:min-h-[480px] sm:py-14 lg:grid-cols-12 lg:py-16">

            {/* LEFT CONTENT */}
            <div className="relative z-20 lg:col-span-6">

              <div className="mb-4 flex items-center gap-2">
                <span className="h-[3px] w-8 bg-[#e21b23]" />

                <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23] sm:text-xs">
                  GET IN TOUCH
                </span>
              </div>

              <h1 className="text-4xl font-black uppercase leading-[0.94] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-[58px]">
                <span className="block text-white">
                  LET&apos;S TALK.
                </span>

                <span className="block text-[#e21b23]">
                  WE&apos;RE HERE
                </span>

                <span className="block text-[#e21b23]">
                  TO HELP.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
                Connect with our team for product information, technical
                support, quotations, catalogs, service assistance, and dealer
                inquiries.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                <a
                  href={APP_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-[210px] items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 text-[10px] font-extrabold uppercase tracking-wider text-black transition-all duration-300 hover:bg-[#20bd5a]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Message on WhatsApp
                </a>

                <a
                  href={`tel:${APP_CONFIG.phoneRaw}`}
                  className="inline-flex h-11 w-[210px] items-center justify-center gap-2 rounded-md border border-white/20 bg-white/[0.03] px-5 text-[10px] font-extrabold uppercase tracking-wider text-white transition-all duration-300 hover:border-[#e21b23] hover:bg-[#e21b23]"
                >
                  <PhoneIcon className="h-4 w-4" />
                  Call {APP_CONFIG.phone}
                </a>

              </div>
            </div>


            {/* RIGHT PRODUCT IMAGE */}
            <div className="relative z-10 lg:col-span-6">

              <div className="relative mx-auto h-[280px] w-full max-w-[650px] sm:h-[340px] lg:h-[390px]">

                <Image
                  src="/images/hero-products.png"
                  alt="TUQO Professional Machinery and Power Tools"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] transition-transform duration-700 hover:scale-[1.03]"
                />

              </div>

            </div>

          </div>
        </div>

        {/* Bottom Red Line */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#e21b23]" />

      </section>


      {/* =========================================================
          CONTACT INFORMATION + FORM
      ========================================================= */}
      <section className="w-full bg-[#f7f7f7] py-14 sm:py-16 lg:py-20">

        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

            {/* LEFT SIDE */}
            <div className="lg:col-span-5">

              <div className="mb-7">

                <div className="mb-2 flex items-center gap-2">
                  <span className="h-[3px] w-7 bg-[#e21b23]" />

                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
                    REACH OUT
                  </span>
                </div>

                <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-[#111214] sm:text-4xl">
                  CONTACT
                  <br />
                  INFORMATION
                </h2>

              </div>


              {/* PHONE */}
              <a
                href={`tel:${APP_CONFIG.phoneRaw}`}
                className="group mb-3 flex items-center gap-4 border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e21b23]/40 hover:shadow-lg"
              >

                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#e21b23] text-white">
                  <PhoneIcon className="h-5 w-5" />
                </div>

                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-gray-500">
                    PHONE
                  </span>

                  <p className="mt-1 text-base font-black text-[#111214] sm:text-lg">
                    {APP_CONFIG.phone}
                  </p>

                  <p className="text-[10px] text-gray-500">
                    Direct Industrial Line
                  </p>
                </div>

              </a>


              {/* WHATSAPP */}
              <a
                href={APP_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mb-3 flex items-center gap-4 border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/50 hover:shadow-lg"
              >

                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#25D366] text-black">
                  <WhatsAppIcon className="h-6 w-6" />
                </div>

                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-gray-500">
                    WHATSAPP
                  </span>

                  <p className="mt-1 text-base font-black text-[#111214] sm:text-lg">
                    {APP_CONFIG.phone}
                  </p>

                  <p className="text-[10px] text-gray-500">
                    Chat with our team
                  </p>
                </div>

              </a>


              {/* ADDRESS */}
              <div className="mb-4 flex gap-4 border border-gray-200 bg-white p-5">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#e21b23] text-white">
                  <MapPinIcon className="h-5 w-5" />
                </div>

                <div>

                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-gray-500">
                    ADDRESS
                  </span>

                  <p className="mt-1 text-base font-black text-[#111214]">
                    {APP_CONFIG.business.name}
                  </p>

                  <address className="mt-1 text-xs leading-5 text-gray-500 not-italic">
                    {APP_CONFIG.business.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>

                </div>

              </div>


              {/* WORKING HOURS */}
              <div className="border border-gray-200 bg-white p-6 sm:p-7">

                <div className="mb-5 flex items-center gap-4 border-b border-gray-100 pb-5">

                  <div className="flex h-12 w-12 items-center justify-center bg-[#e21b23] text-white">
                    <ClockIcon className="h-5 w-5" />
                  </div>

                  <div>

                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#e21b23]">
                      OUR SCHEDULE
                    </span>

                    <h3 className="mt-1 text-xl font-black uppercase text-[#111214]">
                      WORKING HOURS
                    </h3>

                  </div>

                </div>

                <div className="divide-y divide-gray-100">

                  {APP_CONFIG.businessHours.map((item) => {

                    const isClosed = item.hours === "Closed";

                    return (
                      <div
                        key={item.day}
                        className="flex items-center justify-between py-3"
                      >

                        <span className="text-xs font-bold text-gray-700 sm:text-sm">
                          {item.day}
                        </span>

                        <span
                          className={`text-xs font-bold sm:text-sm ${
                            isClosed
                              ? "text-[#e21b23]"
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

            </div>


            {/* RIGHT SIDE - FORM */}
            <div className="lg:col-span-7">

              <div className="border border-gray-200 bg-white p-6 sm:p-8 lg:p-10">

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
                    Fill out the form below and our team will get back to you
                    shortly.
                  </p>

                </div>


                <form className="space-y-5">

                  {/* NAME */}
                  <div>

                    <label className="mb-2 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="h-12 w-full border border-gray-300 bg-white px-4 text-sm outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]"
                    />

                  </div>


                  {/* PHONE */}
                  <div>

                    <label className="mb-2 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700">
                      Phone Number *
                    </label>

                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="h-12 w-full border border-gray-300 bg-white px-4 text-sm outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]"
                    />

                  </div>


                  {/* EMAIL */}
                  <div>

                    <label className="mb-2 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="h-12 w-full border border-gray-300 bg-white px-4 text-sm outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]"
                    />

                  </div>


                  {/* ENQUIRY TYPE */}
                  <div>

                    <label className="mb-2 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700">
                      Enquiry Type *
                    </label>

                    <select
                      defaultValue="Product Information"
                      className="h-12 w-full border border-gray-300 bg-white px-4 text-sm outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]"
                    >
                      <option>Product Information</option>
                      <option>Price / Quotation</option>
                      <option>Technical Support</option>
                      <option>Service & Repair</option>
                      <option>Dealer Enquiry</option>
                      <option>Other</option>
                    </select>

                  </div>


                  {/* MESSAGE */}
                  <div>

                    <label className="mb-2 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700">
                      Message *
                    </label>

                    <textarea
                      rows={6}
                      placeholder="How can we help you?"
                      className="w-full resize-none border border-gray-300 bg-white px-4 py-4 text-sm outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]"
                    />

                  </div>


                  {/* SUBMIT */}
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

          </div>

        </div>

      </section>


      {/* =========================================================
          LOCATION SECTION
      ========================================================= */}
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


      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#08090b] py-14 text-white sm:py-16">

        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#e21b23]/20 to-transparent" />

        <div className="relative mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-7 px-5 sm:px-8 lg:flex-row lg:px-10">

          <div>

            <div className="mb-2 flex items-center gap-2">
              <span className="h-[3px] w-7 bg-[#e21b23]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
                STILL HAVE QUESTIONS?
              </span>
            </div>

            <h2 className="text-3xl font-black uppercase sm:text-4xl">
              NEED PRODUCT DETAILS?
            </h2>

            <p className="mt-3 max-w-xl text-sm text-gray-400">
              Get in touch with our team for catalogs, pricing, dealer
              information, or technical support.
            </p>

          </div>


          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

            <a
              href={APP_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 min-w-[210px] items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 text-xs font-extrabold uppercase tracking-wide text-black transition-all hover:bg-[#20bd5a]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Message on WhatsApp
            </a>

            <a
              href={`tel:${APP_CONFIG.phoneRaw}`}
              className="inline-flex h-12 min-w-[210px] items-center justify-center gap-2 rounded-md border border-white/20 px-6 text-xs font-extrabold uppercase tracking-wide text-white transition-all hover:border-[#e21b23] hover:bg-[#e21b23]"
            >
              <PhoneIcon className="h-4 w-4" />
              Call {APP_CONFIG.phone}
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}
