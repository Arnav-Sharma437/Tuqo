```tsx
import Link from "next/link";
import Image from "next/image";

const products = [
  {
    name: "TUQO PRO High Pressure Washer Accessories",
    description:
      "Accessories and attachments designed for high pressure cleaning equipment.",
    image: "/images/cat-accessories.png",
    model: "HPW Accessory Range",
  },
];

export default function HighPressureWasherAccessoriesPage() {
  return (
    <main className="min-h-screen bg-white text-[#111214]">
      <section className="bg-[#f5f5f5] px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm text-gray-500">
            <Link href="/">Home</Link> /{" "}
            <Link href="/categories">Categories</Link> / Accessories
          </p>

          <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-red-600">
            TUQO PROFESSIONAL RANGE
          </p>

          <h1 className="text-3xl font-bold md:text-5xl">
            HIGH PRESSURE WASHER{" "}
            <span className="text-red-600">ACCESSORIES</span>
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Explore accessories and attachments for professional high pressure
            cleaning applications.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Our Accessories Range</h2>
          <p className="mt-2 text-gray-600">
            Discover accessories for cleaning equipment.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.model}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
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
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {product.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
```
