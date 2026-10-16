import React, { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { WarrantyForm } from "@/components/warranty/WarrantyForm";
import { APP_CONFIG } from "@/constants";
import {
  ShieldCheckIcon,
  QualityDiamondIcon,
  ClockIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/common/Icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Warranty Registration & Activation | TUQO Tools",
  description:
    "Register your TUQO power tools, pressure washers, and machinery bought from authorized dealers. Scan your warranty card QR code to activate official warranty coverage across India.",
};

export default function WarrantyPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-[#0a0b0e] py-14 sm:py-20 text-white border-b border-white/10">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>OFFICIAL WARRANTY PROGRAM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            Warranty <span className="text-[#e21b23]">Registration</span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Bought TUQO equipment from an authorized dealer or retail store? Fill in your details and upload your purchase invoice below to activate 6 months official warranty coverage and priority pan-India service support.
          </p>
        </div>
      </section>

      {/* 2. MAIN FORM CONTAINER */}
      <section className="relative mx-auto max-w-6xl px-5 py-10 sm:py-16 sm:px-8">
        <Suspense
          fallback={
            <div className="p-12 text-center text-sm font-bold text-gray-500">
              Loading warranty registration form...
            </div>
          }
        >
          <WarrantyForm />
        </Suspense>
      </section>

      {/* 3. WARRANTY BENEFITS STRIP */}
      <section className="border-t border-b border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e21b23] text-white shadow-md shadow-red-900/20">
                <ShieldCheckIcon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase text-gray-900">
                  6 Months Genuine Warranty
                </h4>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  Direct manufacturer warranty protection covering core components and authentic factory-spec replacement parts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#111214] text-white shadow-md">
                <QualityDiamondIcon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase text-gray-900">
                  Priority Repair Support
                </h4>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  Fast turnaround service for registered commercial washers, motors, air compressors, and demolition tools.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-black shadow-md shadow-emerald-900/20">
                <WhatsAppIcon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase text-gray-900">
                  Direct WhatsApp Claims Desk
                </h4>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  Fast claims assistance and troubleshooting guidance directly on WhatsApp with our technical engineers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WARRANTY FAQS */}
      <section className="mx-auto max-w-4xl px-5 py-14 sm:py-20 sm:px-8">
        <div className="text-center mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e21b23]">
            NEED HELP?
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-black uppercase text-[#111214]">
            Warranty Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-xs">
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              Why is uploading a purchase invoice mandatory?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
              Your dealer purchase invoice or cash bill acts as legal proof of purchase and establishes the exact start date of your 6-month warranty period.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-xs">
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              What does the 6-month TUQO warranty cover?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
              The standard 6-month manufacturer warranty covers manufacturing defects, motor armature/stator failure.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-xs">
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              What if I bought from a local hardware store or dealer?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
              All machines purchased through our authorized dealers, distributor networks, or retail hardware outlets are fully eligible.
              Simply select your equipment model and upload a clear photo or PDF of your dealer purchase invoice.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
