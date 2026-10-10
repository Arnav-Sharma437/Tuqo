
import Link from "next/link";
import Image from "next/image";
import { getProductsByCategory } from "@/constants/products";

export const metadata = {
  title: "High Pressure Washer Accessories | TUQO Tools",
  description:
    "Explore TUQO high pressure washer accessories and attachments for professional cleaning.",
};

export default function HighPressureWasherAccessoriesPage() {
  const products = getProductsByCategory(
    "high-pressure-washer-accessories"
  );

  return (
    <main className="min-h-screen bg-white text-[#111214]">
      <section className="bg-[#f5f5f5] px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-red-600">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/categories" className="hover:text-red-600">
              Categories
            </Link>{" "}
            / High Pressure Washer Accessories
          </p>

          <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-red-600">
            TUQO PROFESSIONAL RANGE
          </p>

          <h1 className="text-3xl font-bold md:text-5xl">
            HIGH PRESSURE WASHER{" "}
            <span className="text-red-600">ACCESSORIES</span>
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Explore accessories and attachments for professional high
            pressure cleaning applications.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            Our Accessories Range
          </h2>
          <p className="mt-2 text-gray-600">
            Discover accessories designed for professional cleaning equipment.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-lg border border-gray-200 px-6 py-12 text-center">
            <h3 className="text-xl font-bold">
              Products Coming Soon
            </h3>
            <p className="mt-3 text-gray-600">
              Products for this category are being added. Please contact our
              team for assistance.
            </p>
            <a
              href="https://wa.me/919342466860"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
            >
              Enquire on WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-64 bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-5"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="p-5">
                  <p className="mb-2 text-xs font-semibold tracking-wider text-red-600">
                    {product.model}
                  </p>
                  <h3 className="text-lg font-bold group-hover:text-red-600">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {product.shortDesc}
                  </p>
                  <p className="mt-4 font-semibold text-red-600">
                    View Details →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
