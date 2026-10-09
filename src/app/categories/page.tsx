
const categories = [
  {
    no: "01",
    title: "TUQO PRO High Pressure Washers",
    desc: "Powerful cleaning solutions for professional washing and demanding cleaning tasks.",
    image: "/images/high-pressure-washers.webp",
    href: "/products",
  },
  {
    no: "02",
    title: "TUQO PRO Vacuum Cleaners",
    desc: "Reliable wet and dry vacuum cleaning for workshops and commercial spaces.",
    image: "/images/vacuum-cleaners.webp",
    href: "/products",
  },
  {
    no: "03",
    title: "TUQO PRO Air Compressors",
    desc: "Dependable compressed-air solutions for professional applications.",
    image: "/images/air-compressors.webp",
    href: "/products",
  },
  {
    no: "04",
    title: "TUQO PRO Foam Dispensers",
    desc: "Professional foam dispensing equipment for efficient cleaning.",
    image: "/images/foam-dispensers.webp",
    href: "/products",
  },
  {
    no: "05",
    title: "TUQO PRO Power Tools",
    desc: "Performance-focused tools for workshops and everyday professional work.",
    image: "/images/power-tools.webp",
    href: "/products",
  },
  {
    no: "06",
    title: "TUQO PRO Power Tools Accessories",
    desc: "Useful accessories and compatible components for your equipment.",
    image: "/images/accessories.webp",
    href: "/products",
  },
];

const benefits = [
  ["01", "Premium Quality", "Reliable products"],
  ["02", "Professional Grade", "Made for demanding work"],
  ["03", "Wide Product Range", "Equipment and accessories"],
  ["04", "Expert Support", "Help when you need it"],
];

const faqs = [
  {
    q: "What products do you offer?",
    a: "We offer professional cleaning equipment, high-pressure washers, vacuum cleaners, air compressors, foam dispensers, power tools and accessories.",
  },
  {
    q: "Do you provide warranty?",
    a: "Warranty coverage depends on the product. Contact our team to confirm the applicable terms.",
  },
  {
    q: "Are bulk orders available?",
    a: "Contact our sales team to discuss bulk requirements and product quotations.",
  },
  {
    q: "How can I enquire about a product?",
    a: "Visit our Contact page to reach the TUQO team for product information and assistance.",
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <style>{`
        .cat-container {
          width: min(1240px, calc(100% - 48px));
          margin: auto;
        }
        .cat-eyebrow {
          color: #e52222;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
        }
        .cat-title {
          font-size: clamp(32px, 4vw, 52px);
          line-height: 1.08;
          font-weight: 900;
          letter-spacing: -1.5px;
        }
        .cat-title span { color: #e52222; }
        .cat-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(110deg, #f4f4f4, #fff 72%);
          border-bottom: 1px solid #e9e9e9;
        }
        .cat-hero:after {
          content: "TUQO";
          position: absolute;
          right: 2%;
          bottom: -32px;
          font-size: clamp(80px, 16vw, 190px);
          font-weight: 900;
          color: rgba(0,0,0,.035);
          pointer-events: none;
        }
        .cat-card {
          border: 1px solid #e7e7e7;
          border-radius: 5px;
          overflow: hidden;
          background: white;
          transition: transform .3s, box-shadow .3s;
        }
        .cat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 32px #00000010;
        }
        .cat-image {
          height: 210px;
          overflow: hidden;
          background: #f0f0f0;
        }
        .cat-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .5s;
        }
        .cat-card:hover .cat-image img { transform: scale(1.05); }
        .cat-link {
          color: #e52222;
          font-size: 13px;
          font-weight: 700;
        }
        .cat-link span { display: inline-block; transition: transform .2s; }
        .cat-link:hover span { transform: translateX(5px); }
        .cat-benefit {
          border-right: 1px solid #dedede;
          padding: 8px 18px;
        }
        .cat-benefit:last-child { border-right: 0; }
        .cat-faq details {
          border-bottom: 1px solid #e5e5e5;
          padding: 19px 0;
        }
        .cat-faq summary {
          cursor: pointer;
          font-size: 14px;
          font-weight: 700;
          list-style: none;
          display: flex;
          justify-content: space-between;
          gap: 16px;
        }
        .cat-faq summary::-webkit-details-marker { display: none; }
        .cat-faq summary:after {
          content: "+";
          color: #e52222;
          font-size: 21px;
        }
        .cat-faq details[open] summary:after { content: "−"; }
        @media(max-width: 700px) {
          .cat-container { width: calc(100% - 32px); }
          .cat-image { height: 220px; }
          .cat-benefit { border-right: 0; padding: 10px 0; }
        }
      `}</style>

      {/* HERO */}
      <section className="cat-hero">
        <div className="cat-container relative z-10 py-12 md:py-16">
          <div className="mb-7 text-sm text-gray-500">
            <a href="/">Home</a>
            <span className="mx-3">›</span>
            <span className="text-black">Categories</span>
          </div>

          <div className="max-w-2xl">
            <p className="cat-eyebrow mb-3">EXPLORE OUR RANGE</p>
            <h1 className="cat-title mb-5">
              OUR <span>CATEGORIES</span>
            </h1>
            <p className="max-w-xl text-sm leading-7 text-gray-600 md:text-base">
              Explore our range of professional cleaning systems and
              workshop equipment, designed for powerful performance
              and long-lasting reliability.
            </p>
            <a
              href="#category-grid"
              className="mt-6 inline-flex items-center gap-3 border-b-2 border-red-600 pb-2 text-sm font-bold"
            >
              Explore Categories <span className="text-red-600">↘</span>
            </a>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-b border-gray-200">
        <div className="cat-container grid grid-cols-2 gap-4 py-6 md:grid-cols-4">
          {benefits.map(([no, title, desc]) => (
            <div className="cat-benefit flex gap-3" key={no}>
              <span className="text-xl font-bold text-red-600">
                {no}
              </span>
              <div>
                <h2 className="text-sm font-bold">{title}</h2>
                <p className="mt-1 text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section id="category-grid" className="cat-container py-16 md:py-20">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="cat-eyebrow mb-3">FIND THE RIGHT EQUIPMENT</p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Explore Our <span className="text-red-600">Products</span>
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-500">
              Discover equipment and accessories for your professional needs.
            </p>
          </div>
          <span className="text-xs font-bold tracking-widest text-gray-500">
            06 CATEGORIES
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item) => (
            <article className="cat-card" key={item.no}>
              <a href={item.href} className="cat-image relative block">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 bg-white px-3 py-2 text-xs font-bold">
                  {item.no}
                </span>
              </a>
              <div className="p-5">
                <p className="cat-eyebrow !text-[9px]">
                  PROFESSIONAL EQUIPMENT
                </p>
                <h3 className="mt-3 text-base font-extrabold leading-6">
                  {item.title}
                </h3>
                <p className="mt-3 min-h-12 text-sm leading-6 text-gray-500">
                  {item.desc}
                </p>
                <a href={item.href} className="cat-link mt-4 inline-flex gap-3">
                  View Products <span>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* E-CATALOG */}
      <section className="cat-container pb-16">
        <div className="grid overflow-hidden border border-gray-200 md:grid-cols-2">
          <div className="flex min-h-64 items-center justify-center bg-gradient-to-br from-red-800 via-red-600 to-red-900 p-10 text-white">
            <div>
              <p className="text-xs font-bold tracking-[4px]">TUQO / RESOURCES</p>
              <p className="mt-5 text-5xl font-black tracking-tight">E-CATALOG</p>
              <p className="mt-3 text-sm text-red-100">
                Professional equipment. One complete range.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center bg-gray-50 p-8 md:p-12">
            <p className="cat-eyebrow">EXPLORE OUR COMPLETE RANGE</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              TUQO <span className="text-red-600">E-CATALOG</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-gray-600">
              Want to know more about our products? Contact our team
              to request the latest catalogue and product information.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-5 bg-red-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-red-700"
            >
              Request E-Catalog <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* WHY TUQO */}
      <section className="border-y border-gray-200 bg-[#f6f6f6] py-16 md:py-20">
        <div className="cat-container grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="cat-eyebrow">WHY CHOOSE TUQO</p>
            <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
              BUILT FOR <span className="text-red-600">PROFESSIONALS.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-gray-600">
              Find practical cleaning equipment and workshop solutions
              built around performance, durability and your daily needs.
            </p>
            <a href="/contact" className="cat-link mt-5 inline-flex gap-3">
              Talk to Our Team <span>→</span>
            </a>
          </div>

          <div>
            {[
              ["01", "Performance Focus", "Equipment for demanding tasks."],
              ["02", "Product Variety", "Multiple categories in one place."],
              ["03", "Customer Support", "Help with product enquiries."],
            ].map(([no, title, desc]) => (
              <div className="flex items-center gap-5 border-b border-gray-300 py-6" key={no}>
                <span className="text-sm font-bold text-red-600">{no}</span>
                <div className="flex-1">
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{desc}</p>
                </div>
                <span className="text-xl text-red-600">↗</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="cat-container grid gap-8 py-16 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:py-20">
        <div>
          <p className="cat-eyebrow">NEED HELP?</p>
          <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
            FREQUENTLY ASKED <span className="text-red-600">QUESTIONS</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-gray-500">
            Have questions about our products? Find useful information here
            or contact our team for assistance.
          </p>
          <a href="/contact" className="cat-link mt-5 inline-flex gap-3">
            Contact Us <span>→</span>
          </a>
        </div>

        <div className="cat-faq">
          {faqs.map((faq, i) => (
            <details key={faq.q} open={i === 0}>
              <summary>{faq.q}</summary>
              <p className="mt-4 pr-8 text-sm leading-7 text-gray-500">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-[#171717] py-10 text-white">
        <div className="cat-container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="cat-eyebrow">LET'S GET STARTED</p>
            <h2 className="mt-3 text-2xl font-black md:text-3xl">
              Looking for the right equipment?
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Talk to our team about your product requirements.
            </p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-5 bg-red-600 px-6 py-4 text-sm font-bold text-white hover:bg-red-700"
          >
            Get in Touch <span>→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
