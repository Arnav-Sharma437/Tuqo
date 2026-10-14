```tsx
import React from "react";
import Link from "next/link";

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
      {/* HERO BANNER - SAME AS CONTACT PAGE */}
      <section className="w-full bg-[#cf0000] px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About TUQO Tools
          </h1>

          <nav
            aria-label="Breadcrumb"
            className="mt-3 flex items-center gap-3 text-sm"
          >
            <Link
              href="/"
              className="text-white transition-opacity hover:opacity-80"
            >
              Home
            </Link>

            <span aria-hidden="true" className="text-white/80">
              ›
            </span>

            <span className="text-white/80">About Us</span>
          </nav>
        </div>
      </section>

      {/* OUR STORY */}
      <section
        id="our-story"
        className="bg-white py-10 text-[#111214] sm:py-14"
      >
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-[3px] w-7 bg-[#e21b23]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23]">
              WHO WE ARE
            </span>
          </div>

          <h2 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl">
            PROFESSIONAL
            <br />
            <span className="text-[#e21b23]">EQUIPMENT.</span>
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
      </section>

      {/* ABOUT TUQO TOOLS */}
      <section className="bg-[#e21b23] py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-[2px] w-8 bg-white/70" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em]">
                ABOUT US
              </span>
              <span className="h-[2px] w-8 bg-white/70" />
            </div>

            <h2 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl">
              ABOUT TUQO TOOLS
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3">
            <div className="border-b border-white/25 px-4 py-6 text-center md:border-b-0 md:border-r md:px-5">
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

            <div className="border-b border-white/25 px-4 py-6 text-center md:border-b-0 md:border-r md:px-5">
              <h3 className="text-2xl font-medium sm:text-3xl">
                Our Products
              </h3>
              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/90 sm:text-base">
                We specialize in providing machinery for the manufacturing,
                construction, and industrial sectors. Our products include
                everything from heavy machines to DIY tools.
              </p>
            </div>

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

      {/* INDUSTRIES WE SERVE */}
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
              INDUSTRIES WE <span className="text-[#e21b23]">SERVE</span>
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
```
