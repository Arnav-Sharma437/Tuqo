
import Link from "next/link";
import Image from "next/image";
import { getProductsByCategory } from "@/constants/products";

export const metadata = {
  title: "Auto Detailing Equipment | TUQO Tools",
  description:
    "Explore professional auto detailing equipment, foam dispensers and car cleaning solutions from TUQO Tools.",
};

export default function AutoDetailingPage() {
  // Reuse existing Foam Dispenser products.
  // The same products will remain available on their original category page.
  const products = getProductsByCategory("foam-dispenser");

  return (
    <main className="min-h-screen bg-[#f8f9fc] text-[#111214]">
      {/* HERO SECTION */}
      <section className="border-b border-gray-200 bg-[#0c0d10] text-white">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 md:py-16 lg:px-10">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/categories"
              className="transition hover:text-white"
            >
              Categories
            </Link>
            <span>/</span>
            <span className="font-bold text-white">Auto Detailing</span>
          </nav>

          <div className="mb-3 flex items-center gap-2">
            <span className="h-[3px] w-7 bg-[#e21b23]" />
            <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#e21b23]">
              PROFESSIONAL CAR CARE
            </span>
          </div>

          <h1 className="text-3xl font-black uppercase sm:text-4xl md:text-5xl">
            AUTO <span className="text-[#e21b23]">DETAILING</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
            Explore professional foam dispensing equipment and cleaning
            solutions for car washes, detailing studios and vehicle care.
          </p>

          <a
            href="https://wa.me/919342466860"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 bg-[#e21b23] px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Enquire Now <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* BENEFITS STRIP */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 px-5 py-6 sm:grid-cols-3 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-[#e21b23]">✓</span>
            <div>
              <h2 className="text-sm font-bold">Professional Equipment</h2>
              <p className="mt-1 text-xs text-gray-500">
                Solutions for vehicle cleaning
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl text-[#e21b23]">✓</span>
            <div>
              <h2 className="text-sm font-bold">Foam Dispensing Range</h2>
              <p className="mt-1 text-xs text-gray-500">
                Explore available equipment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl text-[#e21b23]">✓</span>
            <div>
              <h2 className="text-sm font-bold">Direct Enquiries</h2>
              <p className="mt-1 text-xs text-gray-500">
                Contact our team for assistance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 md:py-16 lg:px-10">
        <div className="mb-8 border-b border-gray-200 pb-6">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
            OUR RANGE
          </span>

          <h2 className="mt-2 text-2xl font-black uppercase sm:text-3xl">
            AUTO DETAILING EQUIPMENT ({products.length})
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
            Discover foam dispensing solutions suitable for vehicle washing
            and professional cleaning applications.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <h3 className="text-lg font-bold">Products Coming Soon</h3>
            <p className="mt-2 text-sm text-gray-600">
              Our auto detailing product range is being updated.
              Please contact us for product information.
            </p>

            <a
              href="https://wa.me/919342466860"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex bg-[#e21b23] px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              Enquire on WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#e21b23] hover:shadow-lg"
              >
                <Link
                  href={`/products/${product.categorySlug}/${product.slug}`}
                  className="block"
                >
                  <div className="relative h-64 bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-6 transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    <span className="absolute left-4 top-4 bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#e21b23] shadow-sm">
                      {product.tag}
                    </span>
                  </div>

                  <div className="p-5">
                    <p className="mb-2 text-xs font-bold tracking-wider text-[#e21b23]">
                      {product.model}
                    </p>

                    <h3 className="text-lg font-bold transition group-hover:text-[#e21b23]">
                      {product.name}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {product.shortDesc}
                    </p>

                    {product.specs.length > 0 && (
                      <div className="mt-4 border-t border-gray-100 pt-4">
                        {product.specs.slice(0, 3).map((spec) => (
                          <div
                            key={spec.label}
                            className="flex justify-between gap-3 py-1.5 text-xs"
                          >
                            <span className="text-gray-500">
                              {spec.label}
                            </span>
                            <span className="text-right font-semibold text-gray-800">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                      <span className="text-sm font-bold text-[#e21b23]">
                        View Specifications
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-lg transition group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CONTACT CTA */}
      <section className="bg-[#0c0d10] px-5 py-12 text-white sm:px-8 md:py-16 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
              NEED HELP CHOOSING?
            </p>
            <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl">
              FIND THE RIGHT CLEANING EQUIPMENT
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300">
              Contact TUQO Tools for information about our products and
              professional cleaning solutions.
            </p>
          </div>

          <a
            href="https://wa.me/919342466860"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#e21b23] px-7 py-4 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Contact Us <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
