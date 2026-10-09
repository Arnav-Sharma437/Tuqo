import Link from "next/link";

const products = [
  {
    name: "Foam Dispenser",
    image: "/images/cat-foam-dispenser.png",
    description:
      "Professional foam dispensing equipment designed for efficient cleaning and everyday commercial applications.",
    model: "TUQO PRO",
  },
];

export default function FoamDispenserPage() {
  return (
    <main className="min-h-screen bg-white text-[#111214]">
      <section className="border-b border-gray-200 bg-[#111214] text-white">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 md:py-20 lg:px-10">
          <nav className="mb-8 text-xs text-gray-400">
            <Link href="/">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/categories">Categories</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Foam Dispensers</span>
          </nav>

          <p className="mb-3 text-xs font-extrabold uppercase tracking-[3px] text-[#e21b23]">
            TUQO PRO EQUIPMENT
          </p>

          <h1 className="max-w-3xl text-4xl font-black uppercase leading-tight sm:text-5xl md:text-6xl">
            FOAM <span className="block text-[#e21b23]">DISPENSERS</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
            Explore professional foam dispensing equipment for efficient
            cleaning applications and reliable everyday performance.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 md:py-20 lg:px-10">
        <div className="mb-10 border-b border-gray-200 pb-6">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[2px] text-[#e21b23]">
            OUR PRODUCT RANGE
          </p>
          <h2 className="text-3xl font-black uppercase sm:text-4xl">
            Foam Dispensers
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            Professional Cleaning Equipment
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <article
              key={product.name}
              className="group overflow-hidden border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#e21b23] hover:shadow-xl"
            >
              <div className="relative flex h-[280px] items-center justify-center overflow-hidden bg-[#f5f5f5] p-8">
                <span className="absolute left-4 top-4 text-xs font-bold text-gray-400">
                  TUQO PRO
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#e21b23]">
                  {product.model}
                </p>
                <h3 className="mt-3 text-xl font-black uppercase">
                  {product.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {product.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wide">
                    Product {String(index + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="text-xl text-[#e21b23]">
                    ↗
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
