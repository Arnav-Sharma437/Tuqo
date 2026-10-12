
import React from "react";
import { APP_CONFIG } from "@/constants";
import {
  WhatsAppIcon,
  ArrowRightIcon,
} from "@/components/common/Icons";

export function CatalogCTA() {
  return (
    <section
      id="catalog"
      className="relative w-full overflow-hidden bg-[#08090b] py-14 text-white sm:py-16 lg:py-20"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden border border-white/10 bg-[#101114]">
          {/* Red top line */}
          <div className="absolute left-0 top-0 h-1 w-full bg-[#e21b23]" />

          <div className="flex flex-col items-center justify-between gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:px-14">
            {/* TEXT */}
            <div className="max-w-2xl text-center lg:text-left">
              <div className="mb-3 flex items-center justify-center gap-2 lg:justify-start">
                <span className="h-[3px] w-7 bg-[#e21b23]" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
                  TUQO E-CATALOG
                </span>
              </div>

              <h2 className="text-2xl font-black uppercase leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                LOOKING FOR THE
                <br />
                <span className="text-[#e21b23]">
                  COMPLETE TUQO CATALOG?
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-xs leading-5 text-gray-400 sm:text-sm sm:leading-6">
                Explore TUQO products, technical specifications and
                professional equipment. Download our catalogue or
                contact our team for product information.
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex w-full shrink-0 flex-col items-center gap-3 sm:w-auto">
              {/* Download PDF */}
              <a
                href="/catalog/tuqo-catalog.pdf"
                download
                className="group inline-flex h-12 w-full min-w-[220px] items-center justify-center gap-2.5 rounded-md bg-[#e21b23] px-6 text-[13px] font-bold text-white transition-all duration-300 hover:bg-[#ff252d] hover:shadow-[0_10px_30px_rgba(226,27,35,0.25)] sm:w-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <path d="m7 10 5 5 5-5" />
                  <path d="M12 15V3" />
                </svg>
                <span>Download E-Catalog PDF</span>
              </a>

              {/* WhatsApp */}
              <a
                href={APP_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-11 w-full min-w-[220px] items-center justify-center gap-2.5 rounded-md bg-[#25D366] px-6 text-[13px] font-bold text-black transition-all duration-300 hover:bg-[#20bd5a] sm:w-auto"
              >
                <WhatsAppIcon className="h-4 w-4 text-black" />
                <span>Request on WhatsApp</span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${APP_CONFIG.phoneRaw}`}
                className="group inline-flex h-11 w-full min-w-[220px] items-center justify-center gap-2 rounded-md border border-white/20 bg-white/[0.03] px-6 text-[13px] font-bold text-white transition-all duration-300 hover:border-[#e21b23] hover:bg-white/[0.06] sm:w-auto"
              >
                <span>Call Technical Desk</span>
                <ArrowRightIcon className="h-3.5 w-3.5 text-[#e21b23] transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
