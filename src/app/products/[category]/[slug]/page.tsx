
        {/* Detailed Technical Specifications Grid */}
        <div className="mt-10 rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-[3px] w-7 bg-[#e21b23]" />
            <h2 className="text-xl font-black uppercase tracking-tight text-[#111214] sm:text-2xl">
              COMPLETE TECHNICAL SPECIFICATIONS
            </h2>
          </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
            {product.specs.map((spec) => (
              <div
                key={spec.label}
               className="flex items-center justify-start gap-4 py-2 border-b border-gray-100 text-xs sm:text-sm"
              >
                <span className="text-gray-500 font-medium">{spec.label}</span>
                <span className="font-bold text-gray-900 text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Applications & Industry Use Cases */}
        <div className="mt-10 rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-[3px] w-7 bg-[#e21b23]" />
            <h2 className="text-xl font-black uppercase tracking-tight text-[#111214] sm:text-2xl">
              SUITABLE APPLICATIONS &amp; ENVIRONMENTS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {product.applications.map((app, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4 text-xs font-semibold text-gray-800"
              >
                <div className="flex items-center gap-2 mb-1.5 text-[#e21b23]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e21b23]" />
                  <span className="text-[10px] uppercase tracking-wider font-extrabold">Use Case 0{idx + 1}</span>
                </div>
                <p className="leading-snug">{app}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Equipment from Same Category */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e21b23]">
                  COMPATIBLE GEAR
                </span>
                <h2 className="text-2xl font-black uppercase tracking-tight text-[#111214]">
                  OTHER {product.category} MODELS
                </h2>
              </div>
              <Link
                href={`/products/${product.categorySlug}`}
                className="text-xs font-bold uppercase tracking-wider text-[#e21b23] hover:underline"
              >
                View Category Range →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.categorySlug}/${rel.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#e21b23]/50 hover:shadow-xl hover:shadow-black/5"
                >
                  <div className="relative mx-auto my-3 flex h-36 w-full items-center justify-center">
                    <div className="relative h-32 w-32 transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        fill
                        sizes="160px"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#e21b23]">
                      {rel.model}
                    </span>
                    <h3 className="text-sm font-black uppercase tracking-tight text-gray-900 group-hover:text-[#e21b23] transition-colors mt-0.5">
                      {rel.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                      {rel.shortDesc}
                    </p>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-50">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        View Specs
                      </span>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all group-hover:bg-[#e21b23] group-hover:text-white">
                        <ArrowRightIcon className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
