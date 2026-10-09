import Link from "next/link";

const specifications = [
  { label: "Product Category", value: "Air Compressor" },
  { label: "Brand", value: "TUQO PRO" },
  { label: "Product Type", value: "Compressed Air Equipment" },
  { label: "Application", value: "Workshop and Professional Use" },
];

export default function AirCompressor150Page() {
  return (
    <main className="min-h-screen bg-white text-[#111214]">
      <div className="border-b border-gray-200">
        <nav className="mx-auto max-w-[1400px] px-5 py-5 text-xs text-gray-500 sm:px-8 lg:px-10">
          <Link href="/">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/categories">Categories</Link>
          <span className="mx-2">/</span>
          <Link href="/products/air-compressor">Air Compressors</Link>
          <span className="mx-2">/</span>
          <span className="font-bold text-[#111214]">Air Compressor</span>
        </nav>
      </div>

      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 md:py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex min-h-[350px] items-center justify-center border border-gray-200 bg-[#f5f5f5] p-8 sm:min-h-[500px]">
              <img
                src="/images/cat-air-compressor.png"
                alt="TUQO PRO Air Compressor"
                className="max-h-[440px] w-full object-contain"
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex h-28 items-center justify-center border border-gray-200 bg-[#f5f5f5] p-3"
                >
                  <img
                    src="/images/cat-air-compressor.png"
                    alt={`Air Compressor view ${item}`}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-extrabold uppercase tracking-[3px] text-[#e21b23]">
              TUQO PRO EQUIPMENT
            </p>

            <h1 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl md:text-5xl">
              TUQO PRO
              <span className="mt-2 block text-[#e21b23]">
                AIR COMPRESSOR
              </span>
            </h1>

            <p className="mt-6 text-sm leading-7 text-gray-600 sm:text-base">
              Explore dependable compressed-air equipment designed for
              workshops and professional applications.
            </p>

            <div className="mt-8 border-y border-gray-200 py-6">
              <h2 className="text-lg font-black uppercase">Product Overview</h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                TUQO PRO air compressors support a range of workshop and
                professional requirements. Confirm model-specific performance
                and compatibility using the official product documentation.
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
