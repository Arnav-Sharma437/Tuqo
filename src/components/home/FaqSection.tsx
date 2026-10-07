"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "@/components/common/Icons";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What warranty and service coverage is provided with TUQO equipment?",
      a: "All TUQO industrial machines undergo rigorous multi-stage quality control checks and come with standard manufacturer warranty covering core motor assemblies and manufacturing defects. Our technical service center in Coimbatore supplies genuine spares and servicing.",
    },
    {
      q: "Are genuine replacement parts and accessories easily available?",
      a: "Yes. We maintain a complete inventory of OEM spare parts including brass pump seals, induction armatures, high-pressure reinforced hoses, foam cannon head units, HEPA filters, and carbon brushes for immediate dispatch.",
    },
    {
      q: "Can I use TUQO high-pressure washers for commercial car wash bays?",
      a: "Absolutely. Our commercial-grade washers are engineered with heavy-duty induction copper motors and high-flow brass pump heads designed specifically for extended duty cycles in professional automotive detailing centers and workshops.",
    },
    {
      q: "How can I become an authorized dealer or place bulk industrial orders?",
      a: "You can reach our corporate desk at A.H HOLDINGS directly via WhatsApp (+91 93424 66860) or visit our facility in Sidco Industrial Estate, Coimbatore to discuss distributorship terms and bulk machinery procurement.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#f5f5f5] py-16 sm:py-20 lg:py-24">

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(#c7c7c7 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">

        {/* ================= HEADER ================= */}
        <div className="mb-10 text-center">

          <div className="mb-3 flex items-center justify-center gap-2">

            <span className="h-[3px] w-7 bg-[#e21b23]" />

            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23] sm:text-xs">
              FREQUENTLY ASKED QUESTIONS
            </span>

            <span className="h-[3px] w-7 bg-[#e21b23]" />

          </div>

          <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-[#111214] sm:text-4xl lg:text-5xl">
            EVERYTHING YOU NEED
            <br />
            <span className="text-[#e21b23]">
              TO KNOW
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
            Answers to common questions regarding machinery specifications,
            spares, warranty, and commercial support.
          </p>

        </div>

        {/* ================= FAQ ================= */}
        <div className="space-y-3">

          {faqs.map((faq, index) => {

            const isOpen = openIndex === index;

            return (
              <div
                key={faq.q}
                className={`overflow-hidden border bg-white transition-all duration-300 ${
                  isOpen
                    ? "border-[#e21b23]/40 shadow-lg shadow-black/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >

                {/* Question */}
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7 sm:py-6"
                  aria-expanded={isOpen}
                >

                  <div className="flex items-start gap-4">

                    {/* Number */}
                    <span
                      className={`hidden pt-0.5 text-[10px] font-black tracking-wider sm:block ${
                        isOpen
                          ? "text-[#e21b23]"
                          : "text-gray-300"
                      }`}
                    >
                      0{index + 1}
                    </span>

                    <span
                      className={`text-sm font-extrabold leading-5 transition-colors sm:text-base ${
                        isOpen
                          ? "text-[#e21b23]"
                          : "text-[#111214]"
                      }`}
                    >
                      {faq.q}
                    </span>

                  </div>

                  {/* Arrow */}
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? "border-[#e21b23] bg-[#e21b23] text-white"
                        : "border-gray-200 bg-gray-50 text-gray-500"
                    }`}
                  >
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>

                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">

                    <div className="border-t border-gray-100 px-5 pb-6 pt-4 sm:px-7">

                      <div className="border-l-2 border-[#e21b23] pl-4">

                        <p className="text-xs leading-6 text-gray-600 sm:text-sm sm:leading-7">
                          {faq.a}
                        </p>

                      </div>

                    </div>

                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#e21b23]" />

    </section>
  );
}
