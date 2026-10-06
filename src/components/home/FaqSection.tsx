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
    <section className="relative w-full bg-[#f8f9fc] py-16 sm:py-20 lg:py-24 border-b border-gray-200/80">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2">
            <span className="h-1.5 w-6 rounded-full bg-[#d31820]" />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#d31820]">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-gray-950 sm:text-3xl lg:text-4xl">
            EVERYTHING YOU NEED TO KNOW
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Answers to common questions regarding machinery specifications, spares, and commercial support.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-5 text-left transition hover:bg-gray-50/50"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-gray-900 pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-red-50 text-[#d31820]" : ""
                    }`}
                  >
                    <ChevronDownIcon className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 px-5 pb-5 pt-3 text-xs sm:text-sm leading-relaxed text-gray-600">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
