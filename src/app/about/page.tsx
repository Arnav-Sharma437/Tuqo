import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/Icons";
import { CATEGORIES } from "@/constants";

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

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(226,27,35,0.18),transparent_38%)]" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#08090b] via-[#08090b]/90 to-[#08090b]/35" />

        <div className="relative mx-auto grid min-h-[540px] max-w-[1500px] items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:px-10 lg:py-16">

          {/* Hero Content */}

          <div className="relative z-20 lg:col-span-6">

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
              <span>Professional Equipment</span>

              <span className="h-1 w-1 rounded-full bg-[#e21b23]" />

              <span>Genuine Products</span>

              <span className="h-1 w-1 rounded-full bg-[#e21b23]" />

              <span>Technical Support</span>
            </div>

          </div>

          {/* Hero Image */}

          <div className="relative z-10 lg:col-span-6">

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[100px] sm:h-[430px] sm:w-[430px]" />

            <div className="relative mx-auto aspect-[4/3] w-full max-w-[720px]">

              <Image
                src="/images/hero-products.png"
                alt="TUQO Professional Machinery and Power Tools"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.85)] transition-transform duration-700 hover:scale-[1.03]"
              />

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
        className="relative overflow-hidden bg-[#f5f5f5] py-16 sm:py-20 lg:py-24"
      >

        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">

          {/* Image */}

          <div className="relative lg:col-span-6">

            <div className="relative min-h-[380px] overflow-hidden bg-[#08090b] sm:min-h-[480px]">

              <Image
                src="/images/banner-action.png"
                alt="TUQO equipment in action"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#08090b]/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">

                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
                  TUQO TOOLS
                </span>

                <p className="mt-2 max-w-xs text-xl font-black uppercase leading-tight text-white sm:text-2xl">
                  ENGINEERED
                  <br />
                  FOR REAL WORK
                </p>

              </div>

              <div className="absolute bottom-0 left-0 h-1 w-full bg-[#e21b23]" />

            </div>

          </div>


          {/* Content */}

          <div className="lg:col-span-6">

            <div className="mb-3 flex items-center gap-2">

              <span className="h-[3px] w-7 bg-[#e21b23]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23]">
                WHO WE ARE
              </span>

            </div>

            <h2 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl">
              PROFESSIONAL
              <br />
              <span className="text-[#e21b23]">
                EQUIPMENT.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-gray-600 sm:text-base">
              TUQO is focused on providing professional machinery, power tools
              and equipment for businesses, workshops and working professionals.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              Our product range is built around practical requirements —
              equipment that can handle demanding environments while delivering
              the performance professionals expect from their machines.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
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

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3">

            {/* Our History */}

            <div className="px-2 py-6 text-center md:px-10 md:py-2 md:border-r md:border-white/25">

              <h3 className="text-2xl font-medium sm:text-3xl">
                Our History
              </h3>

              <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/90 sm:text-base">
                Tugo Tools started as a small family-owned business with a
                passion for providing high-quality machinery to companies in
                the area. Over the years, we have grown into a leading
                machinery supplier with a reputation for excellence.
              </p>

            </div>


            {/* Our Products */}

            <div className="px-2 py-6 text-center md:px-10 md:py-2 md:border-r md:border-white/25">

              <h3 className="text-2xl font-medium sm:text-3xl">
                Our Products
              </h3>

              <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/90 sm:text-base">
                We specialize in providing machinery for the manufacturing,
                construction, and industrial sectors. Our products include
                everything from heavy machines to DIY tools
              </p>

            </div>


            {/* Our Services */}

            <div className="px-2 py-6 text-center md:px-10 md:py-2">

              <h3 className="text-2xl font-medium sm:text-3xl">
                Our Services
              </h3>

              <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/90 sm:text-base">
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


      {/* ===================================================== */}
      {/* PRODUCT RANGE */}
      {/* ===================================================== */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">

          <div className="mb-10 flex items-end justify-between gap-5">

            <div>

              <div className="mb-3 flex items-center gap-2">

                <span className="h-[3px] w-7 bg-[#e21b23]" />

                <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23]">
                  OUR RANGE
                </span>

              </div>

              <h2 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl">
                PROFESSIONAL
                <span className="text-[#e21b23]"> EQUIPMENT</span>
              </h2>

            </div>

            <Link
              href="/categories"
              className="hidden h-11 w-[175px] items-center justify-center gap-2 rounded-md border border-[#111214] text-[13px] font-bold text-[#111214] transition-all duration-300 hover:border-[#e21b23] hover:bg-[#e21b23] hover:text-white sm:inline-flex"
            >
              <span>View Products</span>
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>

          </div>


          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

            {CATEGORIES.slice(0, 6).map((category) => (

              <Link
                key={category.id}
                href={category.href}
                className="group border border-gray-200 bg-[#f8f8f8] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/40 hover:bg-white hover:shadow-lg"
              >

                <div className="relative h-[110px] w-full">

                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="200px"
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                  />

                </div>

                <div className="mt-3 border-t border-gray-200 pt-3">

                  <h3 className="text-center text-[10px] font-extrabold uppercase leading-tight text-[#111214]">
                    {category.name}
                  </h3>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* ===================================================== */}
      {/* FINAL CTA */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[#08090b] py-16 text-white sm:py-20">

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[120px]" />

        <div className="relative mx-auto max-w-[1100px] px-5 text-center sm:px-8">

          <div className="mb-3 flex items-center justify-center gap-2">

            <span className="h-[3px] w-7 bg-[#e21b23]" />

            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23]">
              READY TO WORK
            </span>

            <span className="h-[3px] w-7 bg-[#e21b23]" />

          </div>

          <h2 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl">
            FIND THE RIGHT
            <br />
            <span className="text-[#e21b23]">
              EQUIPMENT FOR THE JOB.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
            Explore the TUQO range or connect with our team for product
            information, technical assistance and professional equipment
            requirements.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <Link
              href="/categories"
              className="group inline-flex h-11 w-[210px] items-center justify-center gap-2 rounded-md bg-[#e21b23] px-5 text-[13px] font-bold text-white transition-all duration-300 hover:bg-[#ff252d]"
            >
              <span>Explore Products</span>
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/#contact"
              className="inline-flex h-11 w-[210px] items-center justify-center rounded-md border border-white/20 bg-white/[0.03] px-5 text-[13px] font-bold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/[0.08]"
            >
              Contact TUQO
            </Link>

          </div>

        </div>

        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#e21b23]" />

      </section>

    </main>
  );
}
