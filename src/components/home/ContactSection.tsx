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
    <section id="contact" className="relative w-full bg-white py-14 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Heading & WhatsApp CTA */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#d71920]">
                GET IN TOUCH
              </span>
              <h2 className="mt-1 text-3xl font-black uppercase tracking-tight text-gray-950 sm:text-4xl">
                CONTACT US
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base max-w-md">
                We love our customers, so feel free to visit during normal business hours or reach out on WhatsApp.
              </p>
            </div>

            <div className="mt-8">
              <a
                href={APP_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-lg bg-[#d71920] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:bg-[#b8141a] hover:shadow-lg active:scale-95"
              >
                <WhatsAppIcon className="h-5 w-5 text-white transition-transform group-hover:scale-110" />
                <span>Message us on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Address, Phone & Business Hours */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-7">
            {/* Address & Phone Block */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="flex items-start gap-3.5">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#d71920]">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase text-gray-900">
                    {APP_CONFIG.business.name}
                  </h3>
                  <address className="mt-1 text-xs leading-relaxed text-gray-600 not-italic">
                    {APP_CONFIG.business.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#d71920]">
                  <PhoneIcon className="h-4 w-4" />
                </div>
                <a
                  href={`tel:${APP_CONFIG.phoneRaw}`}
                  className="text-sm font-bold text-gray-900 transition hover:text-[#d71920]"
                >
                  {APP_CONFIG.phone}
                </a>
              </div>
            </div>

            {/* Business Hours Block */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
                <ClockIcon className="h-4 w-4 text-[#d71920]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Business Hours
                </h3>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-600">
                {APP_CONFIG.businessHours.map((item) => (
                  <li key={item.day} className="flex justify-between items-center py-0.5">
                    <span className="font-medium text-gray-700">{item.day}</span>
                    <span
                      className={
                        item.hours === "Closed"
                          ? "font-semibold text-red-600"
                          : "text-gray-600"
                      }
                    >
                      {item.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
