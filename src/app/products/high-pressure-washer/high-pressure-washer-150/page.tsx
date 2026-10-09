import Link from "next/link";

const specifications = [
  { label: "Product Category", value: "High Pressure Washer" },
  { label: "Brand", value: "TUQO PRO" },
  { label: "Product Type", value: "Professional Cleaning Equipment" },
  { label: "Application", value: "Commercial and Workshop Cleaning" },
];

const gallery = [
  "/images/cat-pressure-washer.png",
  "/images/cat-pressure-washer.png",
  "/images/cat-pressure-washer.png",
];

export default function HighPressureWasher150Page() {
  return (
    <main className="min-h-screen bg-white text-[#111214]">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200">
        <nav className="mx-auto max-w-[1400px] px-5 py-5 text-xs text-gray-500 sm:px-8 lg:px-10">
          <Link href="/" className="hover:text-[#e21b23]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/categories" className="hover:text-[#e21b23]">
            Categories
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/products/high-pressure-washer"
            className="hover:text-[#e21b23]"
          >
            High Pressure Washers
          </Link>
          <span className="mx-2">/</span>
          <span className="font-bold text-[#111214]">
            High Pressure Washer
          </span>
        </nav>
      </div>

      {/* Product Showcase */}
      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 md:py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product Images */}
          <div>
            <div className="flex min-h-[350px] items-center justify-center border border-gray-200 bg-[#f5f5f5] p-8 sm:min-h-[500px]">
              <img
                src={gallery[0]}
                alt="TUQO PRO High Pressure Washer"
                className="max-h-[440px] w-full object-contain"
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              {gallery.map((image, index) => (
                <div
                  key={index}
                  className="flex h-28 items-center justify-center border border-gray-200 bg-[#f5f5f5] p-3"
                >
                  <img
                    src={image}
                    alt={`High Pressure Washer view ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-extrabold uppercase tracking-[3px] text-[#e21b23]">
              TUQO PRO EQUIPMENT
            </p>

            <h1 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl md:text-5xl">
              TUQO PRO
              <span className="mt-2 block text-[#e21b23]">
                HIGH PRESSURE WASHER
              </span>
            </h1>

            <p className="mt-6 text-sm leading-7 text-gray-600 sm:text-base">
              Explore professional high pressure cleaning equipment designed
              for demanding cleaning applications. Refer to the official
              product catalogue for the exact model name and technical details.
            </p>

            <div className="mt-8 border-y border-gray-200 py-6">
              <h2 className="text-lg font-black uppercase">
                Product Overview
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                TUQO PRO cleaning equipment is intended for professional
                cleaning requirements. Product-specific performance and
                compatibility details should be confirmed from the official
                model documentation.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-lg font-black uppercase">
                Specifications
              </h2>

              <div className="divide-y divide-gray-200 border-y border-gray-200">
                {specifications.map((specification) => (
                  <div
                    key={specification.label}
                    className="grid grid-cols-2 gap-4 py-4 text-sm"
                  >
                    <span className="font-semibold text-gray-500">
                      {specification.label}
                    </span>
                    <span className="font-bold text-[#111214]">
                      {specification.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
