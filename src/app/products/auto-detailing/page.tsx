```tsx
import Link from "next/link";
import { getProductsByCategory } from "@/constants/products";

export const metadata = {
  title: "Auto Detailing | TUQO Tools",
  description:
    "Explore professional auto detailing equipment and cleaning solutions from TUQO.",
};

export default function AutoDetailingPage() {
  const products = getProductsByCategory("auto-detailing");

  return (
    <main className="min-h-screen bg-[#f8f9fc] text-[#111214]">
      <section className="border-b border-gray-200 bg-[#0c0d10] text-white">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 md:py-16 lg:px-10">
          <nav className="mb-6 flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white">
              Categories
            </Link>
            <span>/</span>
            <span className="font-bold text-white">Auto Detailing</span>
          </nav>

          <div className="mb-2 flex items-center gap-2">
            <span className="h-[3px] w-7 bg-[#e21b23]" />
            <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#e21b23]">
              PROFESSIONAL CAR CARE
            </span>
          </div>

          <h1 className="text-3xl font-black uppercase sm:text-4xl md:text-5xl">
            AUTO <span className="text-[#e21b23]">DETAILING</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-300">
            Explore equipment and solutions for professional vehicle cleaning
            and detailing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 md:py-16 lg:px-10">
        <div className="mb-8 border-b border-gray-200 pb-6">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#e21b23]">
            OUR RANGE
          </span>
          <h2 className="mt-1 text-2xl font-black uppercase sm:text-3xl">
            AUTO DETAILING PRODUCTS ({products.length})
          </h2>
        </div>

        {products.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <h3 className="text-lg font-bold">Products Coming Soon</h3>
            <p className="mt-2 text-sm text-gray-600">
              Product details will be added once the product list is available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.categorySlug}/${product.slug}`}
                className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-[#e21b23]"
              >
                <h3 className="font-bold">{product.name}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  {product.shortDesc}
                </p>
                <p className="mt-4 text-sm font-bold text-[#e21b23]">
                  View Specifications →
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
```
