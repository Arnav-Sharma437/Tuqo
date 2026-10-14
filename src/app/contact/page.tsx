"use client";

import React from "react";
import { APP_CONFIG } from "@/constants";
import { ClockIcon, ArrowRightIcon } from "@/components/common/Icons";

export default function ContactPage() {
  return (
    <main className="w-full bg-[#f7f7f7] text-[#111214]">
      <section className="w-full border-t-2 border-[#e21b23] py-10 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10">
          {/* WORKING HOURS */}
          <div className="h-fit border border-gray-200 bg-white p-6 sm:p-7 lg:col-span-5">
            <div className="mb-5 flex items-center gap-4 border-b border-gray-100 pb-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#e21b23] text-white">
                <ClockIcon className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#e21b23]">
                  OUR SCHEDULE
                </span>
                <h1 className="mt-1 text-xl font-black uppercase text-[#111214] sm:text-2xl">
                  WORKING HOURS
                </h1>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {APP_CONFIG.businessHours.map((item) => {
                const isClosed = item.hours === "Closed";
                return (
                  <div key={item.day} className="flex items-center justify-between gap-4 py-3">
                    <span className="text-xs font-bold text-gray-700 sm:text-sm">{item.day}</span>
                    <span className={`text-right text-xs font-bold sm:text-sm ${isClosed ? "text-[#e21b23]" : "text-gray-900"}`}>
                      {item.hours}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="border border-gray-200 bg-white p-6 sm:p-8 lg:col-span-7 lg:p-10">
            <div className="mb-7">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-[3px] w-7 bg-[#e21b23]" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
                  SEND A MESSAGE
                </span>
              </div>
              <h2 className="text-3xl font-black uppercase text-[#111214] sm:text-4xl">CONTACT FORM</h2>
              <p className="mt-3 text-sm text-gray-500">
                Fill out the form below and our team will get back to you shortly.
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label htmlFor="full-name" className="mb-2 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700">
                  Full Name *
                </label>
                <input id="full-name" name="name" type="text" required placeholder="Enter your name" className="h-12 w-full border border-gray-300 bg-white px-4 text-sm outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]" />
              </div>
              <div>
                <label htmlFor="phone-number" className="mb-2 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700">
                  Phone Number *
                </label>
                <input id="phone-number" name="phone" type="tel" required placeholder="Enter your phone number" className="h-12 w-full border border-gray-300 bg-white px-4 text-sm outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]" />
              </div>
              <div>
                <label htmlFor="email-address" className="mb-2 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700">
                  Email Address
                </label>
                <input id="email-address" name="email" type="email" placeholder="Enter your email address" className="h-12 w-full border border-gray-300 bg-white px-4 text-sm outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]" />
              </div>
              <div>
                <label htmlFor="enquiry-type" className="mb-2 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700">
                  Enquiry Type *
                </label>
                <select id="enquiry-type" name="enquiryType" required defaultValue="Product Information" className="h-12 w-full border border-gray-300 bg-white px-4 text-sm outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]">
                  <option>Product Information</option>
                  <option>Price / Quotation</option>
                  <option>Technical Support</option>
                  <option>Service &amp; Repair</option>
                  <option>Dealer Enquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-[10px] font-extrabold uppercase tracking-wide text-gray-700">
                  Message *
                </label>
                <textarea id="message" name="message" rows={6} required placeholder="How can we help you?" className="w-full resize-none border border-gray-300 bg-white px-4 py-4 text-sm outline-none transition-all focus:border-[#e21b23] focus:ring-1 focus:ring-[#e21b23]" />
              </div>
              <button type="submit" className="group flex h-12 w-full items-center justify-center gap-2 bg-[#e21b23] text-xs font-extrabold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#b8141a] hover:shadow-lg">
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
