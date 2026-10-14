import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/Icons";

export default function AboutPage() {
  const industries = [
    "Automotive Workshops",
    "Car Wash & Detailing",
    "Industrial Workshops",
    "Manufacturing Units",
    "Commercial Maintenance",
    "Professional Contractors",
  ];

  return (
    <main className="w-full bg-white text-[#111214]">

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative isolate overflow-hidden bg-[#08090b] text-white">

        <Image
          src="/images/hero-products.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-black/60" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#08090b]/85 via-[#08090b]/55 to-[#08090b]/20" />

        <div className="relative mx-auto flex min-h-[560px] w-full max-w-[1500px] items-center px-5 py-12 sm:min-h-[620px] sm:px-8 sm:py-14 lg:px-10 lg:py-16">

          {/* Hero Content */}

          <div className="relative z-20 w-full max-w-[680px]">

            <div className="mb-5 flex items-center gap-2.5">
              <span className="h-[3px] w-8 bg-[#e21b23]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23]">
                ABOUT TUQO
              </span>
            </div>

            <h1 className="max-w-[680px] text-4xl font-black uppercase leading-[0.92] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[62px]">
              <span className="block text-white">EQUIPMENT</span>
              <span className="block text-white">BUILT FOR</span>
              <span className="block text-[#e21b23]">REAL WORK.</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
              TUQO brings together professional machinery, power tools and
              equipment designed to help businesses and professionals work
              smarter, faster and with confidence.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/categories"
                className="group inline-flex h-11 w-[210px] items-center justify-center gap-2 rounded-md bg-[#e21b23] px-5 text-[13px] font-bold text-white transition-all duration-300 hover:bg-[#ff252d] hover:shadow-[0_10px_30px_rgba(226,27,35,0.25)]"
              >
                <span>Explore Products</span>
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="#our-story"
                className="inline-flex h-11 w-[210px] items-center justify-center rounded-md border border-white/20 bg-white/[0.04] px-5 text-[13px] font-bold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/[0.08]"
              >
                Our Story
              </Link>

            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500">
              
            </div>

          </div>

        </div>

        <div className="absolute bottom-0 left-0 h-[3px] w-full bg-[#e21b23]" />

      </section>


      {/* ===================================================== */}
      {/* OUR STORY */}
      {/* ===================================================== */}

      <section
        id="our-story"
        className="relative isolate overflow-hidden bg-white py-0 text-[#111214]"
      >
        <div className="relative mx-auto w-full max-w-[1200px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

          {/* Content */}

          <div className="w-full">

            <div className="mb-3 flex items-center gap-2">

              <span className="h-[3px] w-7 bg-[#e21b23]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23]">
                WHO WE ARE
              </span>

            </div>

            <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-[#111214] sm:text-4xl lg:text-5xl">
              PROFESSIONAL
              <br />
              <span className="text-[#e21b23]">
                EQUIPMENT.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#333333] sm:text-base">
              TUQO is focused on providing professional machinery, power tools
              and equipment for businesses, workshops and working professionals.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#333333] sm:text-base">
              Our product range is built around practical requirements —
              equipment that can handle demanding environments while delivering
              the performance professionals expect from their machines.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#333333] sm:text-base">
              From cleaning and maintenance equipment to power tools and
              accessories, TUQO aims to make professional-grade equipment
              accessible through a focused and reliable product range.
            </p>

            <div className="mt-7 h-[3px] w-16 bg-[#e21b23]" />

          </div>

        </div>

      </section>


      {/* ===================================================== */}
      {/* ABOUT TUQO TOOLS */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[#e21b23] py-16 text-white sm:py-20 lg:py-24">

        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">

          {/* Heading */}

          <div className="text-center">

            <div className="mb-4 flex items-center justify-center gap-3">

              <span className="h-[2px] w-8 bg-white/70" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-white">
                ABOUT US
              </span>

              <span className="h-[2px] w-8 bg-white/70" />

            </div>

            <h2 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl">
              ABOUT TUQO TOOLS
            </h2>

          </div>


          {/* Three Columns */}

          <div className="mt-12 grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-0">

            {/* Our History */}

            <div className="border-b border-white/25 px-4 py-6 text-center last:border-b-0 md:border-b-0 md:border-r md:px-5 md:last:border-r-0">

              <h3 className="text-2xl font-medium sm:text-3xl">
                Our History
              </h3>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/90 sm:text-base">
                Tugo Tools started as a small family-owned business with a
                passion for providing high-quality machinery to companies in
                the area. Over the years, we have grown into a leading
                machinery supplier with a reputation for excellence.
              </p>

            </div>


            {/* Our Products */}

            <div className="border-b border-white/25 px-4 py-6 text-center last:border-b-0 md:border-b-0 md:border-r md:px-5 md:last:border-r-0">

              <h3 className="text-2xl font-medium sm:text-3xl">
                Our Products
              </h3>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/90 sm:text-base">
                We specialize in providing machinery for the manufacturing,
                construction, and industrial sectors. Our products include
                everything from heavy machines to DIY tools
              </p>

            </div>


            {/* Our Services */}

            <div className="px-4 py-6 text-center md:px-5">

              <h3 className="text-2xl font-medium sm:text-3xl">
                Our Services
              </h3>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/90 sm:text-base">
                At Tugo Tools, we offer a range of services to ensure that your
                machinery stays in top condition. Our team of experienced
                technicians can provide maintenance, repairs, and even custom
                fabrication to meet your unique needs.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ===================================================== */}
      {/* INDUSTRIES */}
      {/* ===================================================== */}

      <section className="bg-[#f5f5f5] py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">

          <div className="mb-10 text-center">

            <div className="mb-3 flex items-center justify-center gap-2">

              <span className="h-[3px] w-7 bg-[#e21b23]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23]">
                BUILT FOR PROFESSIONALS
              </span>

              <span className="h-[3px] w-7 bg-[#e21b23]" />

            </div>

            <h2 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl">
              INDUSTRIES WE
              <span className="text-[#e21b23]"> SERVE</span>
            </h2>

          </div>


          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {industries.map((industry, index) => (

              <div
                key={industry}
                className="group flex items-center justify-between border border-gray-200 bg-white px-6 py-5 transition-all duration-300 hover:border-[#e21b23]/40 hover:shadow-lg"
              >

                <span className="text-xs font-extrabold uppercase tracking-wide text-[#111214]">
                  {industry}
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111214] text-[10px] font-black text-white transition-colors group-hover:bg-[#e21b23]">
                  {String(index + 1).padStart(2, "0")}
                </span>

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}
