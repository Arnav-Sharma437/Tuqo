```tsx
import Link from "next/link";

const products = [
  {
    name: "TUQO PRO HPW 120",
    image: "/images/cat-pressure-washer.png",
    model: "HPW 120",
    description:
      "Compact cleaning equipment for everyday washing applications.",
    href: "/products/high-pressure-washer/high-pressure-washer-150",
  },
  {
    name: "TUQO PRO HPW 150",
    image: "/images/cat-pressure-washer.png",
    model: "HPW 150",
    description:
      "Professional cleaning equipment for workshops and commercial use.",
    href: "/products/high-pressure-washer/high-pressure-washer-150",
  },
  {
    name: "TUQO PRO HPW 200",
    image: "/images/cat-pressure-washer.png",
    model: "HPW 200",
    description:
      "Powerful cleaning equipment for demanding cleaning applications.",
    href: "/products/high-pressure-washer/high-pressure-washer-150",
  },
  {
    name: "TUQO PRO HPW 250",
    image: "/images/cat-pressure-washer.png",
    model: "HPW 250",
    description:
      "Professional washing equipment for regular cleaning tasks.",
    href: "/products/high-pressure-washer/high-pressure-washer-150",
  },
  {
    name: "TUQO PRO HPW 300",
    image: "/images/cat-pressure-washer.png",
    model: "HPW 300",
    description:
      "Heavy-duty style cleaning equipment for workshop applications.",
    href: "/products/high-pressure-washer/high-pressure-washer-150",
  },
  {
    name: "TUQO PRO HPW 400",
    image: "/images/cat-pressure-washer.png",
    model: "HPW 400",
    description:
      "Professional cleaning equipment for a variety of cleaning needs.",
    href: "/products/high-pressure-washer/high-pressure-washer-150",
  },
];

export default function HighPressureWasherPage() {
  return (
    <main className="min-h-screen bg-white text-[#111214]">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-[#111214] text-white">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 md:py-20 lg:px-10">
          <nav className="mb-8 text-xs text-gray-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:text-white">
              Categories
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">High Pressure Washers</span>
          </nav>

          <p className="mb-3 text-xs font-extrabold uppercase tracking-[3px] text-[#e21b23]">
            TUQO PRO EQUIPMENT
          </p>

          <h1 className="max-w-3xl text-4xl font-black uppercase leading-tight sm:text-5xl md:text-6xl">
            HIGH PRESSURE
            <span className="block text-[#e21b23]">WASHERS</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
            Explore our sample range of pressure washers for
            professional cleaning applications and workshops.
          </p>
        </div>
      </section>

      {/* Product Listing - No Filters */}
      <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 md:py-16 lg:px-10">
        <div className="mb-8 flex flex-col justify-between gap-3 border-b border-gray-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[2px] text-[#e21b23]">
              EXPLORE OUR RANGE
            </p>
            <h2 className="text-3xl font-black uppercase sm:text-4xl">
              High Pressure Washers
            </h2>
          </div>

          <p className="text-sm text-gray-500">
            {products.length} Sample Products
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Link
              key={product.model}
              href={product.href}
              className="group block overflow-hidden border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#e21b23] hover:shadow-xl"
            >
              <div className="relative flex h-[250px] items-center justify-center overflow-hidden bg-[#f5f5f5] p-8">
                <span className="absolute left-4 top-4 text-xs font-bold text-gray-400">
                  TUQO PRO
                </span>

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                />

                <span className="absolute bottom-3 right-4 text-xs font-bold text-gray-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#e21b23]">
                  {product.model}
                </p>

                <h3 className="mt-2 text-lg font-black uppercase transition-colors group-hover:text-[#e21b23]">
                  {product.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {product.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wide">
                    View Product Details
                  </span>
                  <span className="text-xl text-[#e21b23] transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-xs leading-6 text-gray-400">
          Sample product names and images are for layout demonstration only.
          Final products and specifications will be updated after receiving
          the actual product catalogue.
        </p>
      </section>
    </main>
  );
}
```
