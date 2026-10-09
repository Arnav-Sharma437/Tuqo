import Link from "next/link";

const products = [
  {
    name: "Power Tool",
    image: "/images/cat-power-tools.png",
    description:
      "Professional power tools designed for workshop tasks, maintenance and everyday industrial applications.",
    model: "TUQO PRO",
    href: "/products/power-tools/power-tool-150",
  },
];

export default function PowerToolsPage() {
  return (
    <main className="min-h-screen bg-white text-[#111214]">
      {/* Category Hero */}
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
            <span className="text-white">Power Tools</span>
          </nav>

          <p className="mb-3 text-xs font-extrabold uppercase tracking-[3px] text-[#e21b23]">
            TUQO PRO EQUIPMENT
          </p>

          <h1 className="max-w-3xl text-4xl font-black uppercase leading-tight sm:text-5xl md:text-6xl">
            POWER
            <span className="block text-[#e21b23]">
              TOOLS
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
            Explore our range of power tools for professional
            workshops, maintenance and industrial applications.
          </p>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 md:py-20 lg:px-10">
        <div className="mb-10 border-b border-gray-200 pb-6">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[2px] text-[#e21b23]">
            OUR PRODUCT RANGE
          </p>

          <h2 className="text-3xl font-black uppercase sm:text-4xl">
            Power Tools
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Professional Workshop Equipment
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <article
              key={product.name}
              className="group overflow-hidden border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#e21b23] hover:shadow-xl"
            >
              {/* Clickable Product Image */}
              <Link
                href={product.href}
                aria-label={`View ${product.name} details`}
                className="relative flex h-[280px] items-center justify-center overflow-hidden bg-[#f5f5f5] p-8"
              >
                <span className="absolute left-4 top-4 text-xs font-bold text-gray-400">
                  TUQO PRO
                </span>

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                />
              </Link>

              {/* Product Information */}
              <div className="p-6">
                <p className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#e21b23]">
                  {product.model}
                </p>

                <Link
                  href={product.href}
                  className="mt-3 block text-xl font-black uppercase transition-colors hover:text-[#e21b23]"
                >
                  {product.name}
                </Link>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {product.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wide">
                    Product {String(index + 1).padStart(2, "0")}
                  </span>

                  <Link
                    href={product.href}
                    aria-label={`Open ${product.name}`}
                    className="text-xl text-[#e21b23] transition-transform group-hover:translate-x-1"
                  >
                    â†—
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
