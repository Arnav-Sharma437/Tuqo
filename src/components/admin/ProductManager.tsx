"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageUploader } from "./ImageUploader";
import { CategoryItem } from "./CategoryManager";
import { SubcategoryItem } from "./SubcategoryManager";

export interface ProductSpecItem {
  label: string;
  value: string;
}

export interface ProductItem {
  _id?: string;
  name: string;
  slug: string;
  model: string;
  category: string;
  categorySlug: string;
  subcategory?: string;
  subcategorySlug?: string;
  image: string;
  shortDesc: string;
  description: string;
  tag: string;
  features: string[];
  specs: ProductSpecItem[];
  applications: string[];
  inStock: boolean;
  featured: boolean;
  order: number;
}

interface ProductManagerProps {
  products: ProductItem[];
  categories: CategoryItem[];
  subcategories?: SubcategoryItem[];
  onRefresh: () => void;
}

export function ProductManager({
  products,
  categories,
  subcategories = [],
  onRefresh,
}: ProductManagerProps) {
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const initialProduct: ProductItem = {
    name: "",
    slug: "",
    model: "",
    category: categories[0]?.name || "High Pressure Washer",
    categorySlug: categories[0]?.slug || "high-pressure-washer",
    subcategory: "",
    subcategorySlug: "",
    image: "",
    shortDesc: "",
    description: "",
    tag: "",
    features: [""],
    specs: [{ label: "", value: "" }],
    applications: [""],
    inStock: true,
    featured: false,
    order: 0,
  };

  const handleStartCreate = () => {
    setEditingProduct({
      ...initialProduct,
      category: categories[0]?.name || "High Pressure Washer",
      categorySlug: categories[0]?.slug || "high-pressure-washer",
      subcategory: "",
      subcategorySlug: "",
    });
    setIsCreating(true);
    setError("");
  };

  const handleStartEdit = (prod: ProductItem) => {
    setEditingProduct({
      ...prod,
      features: prod.features?.length ? prod.features : [""],
      specs: prod.specs?.length ? prod.specs : [{ label: "", value: "" }],
      applications: prod.applications?.length ? prod.applications : [""],
    });
    setIsCreating(false);
    setError("");
  };

  const handleNameChange = (name: string) => {
    if (!editingProduct) return;
    const slug = isCreating
      ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      : editingProduct.slug;
    setEditingProduct({ ...editingProduct, name, slug });
  };

  const handleCategorySelect = (slug: string) => {
    if (!editingProduct) return;
    const found = categories.find((c) => c.slug === slug);
    if (found) {
      setEditingProduct({
        ...editingProduct,
        category: found.name,
        categorySlug: found.slug,
        subcategory: "",
        subcategorySlug: "",
      });
    }
  };

  // Spec rows management
  const addSpec = () => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      specs: [...editingProduct.specs, { label: "", value: "" }],
    });
  };

  const updateSpec = (index: number, field: "label" | "value", val: string) => {
    if (!editingProduct) return;
    const updated = [...editingProduct.specs];
    updated[index][field] = val;
    setEditingProduct({ ...editingProduct, specs: updated });
  };

  const removeSpec = (index: number) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      specs: editingProduct.specs.filter((_, i) => i !== index),
    });
  };

  // Features list
  const addFeature = () => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      features: [...editingProduct.features, ""],
    });
  };

  const updateFeature = (index: number, val: string) => {
    if (!editingProduct) return;
    const updated = [...editingProduct.features];
    updated[index] = val;
    setEditingProduct({ ...editingProduct, features: updated });
  };

  const removeFeature = (index: number) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      features: editingProduct.features.filter((_, i) => i !== index),
    });
  };

  // Applications list
  const addApplication = () => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      applications: [...editingProduct.applications, ""],
    });
  };

  const updateApplication = (index: number, val: string) => {
    if (!editingProduct) return;
    const updated = [...editingProduct.applications];
    updated[index] = val;
    setEditingProduct({ ...editingProduct, applications: updated });
  };

  const removeApplication = (index: number) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      applications: editingProduct.applications.filter((_, i) => i !== index),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (
      !editingProduct.name ||
      !editingProduct.slug ||
      !editingProduct.category ||
      !editingProduct.categorySlug ||
      !editingProduct.image
    ) {
      setError("Name, Slug, Category, and Main Image are required.");
      return;
    }

    setLoading(true);
    setError("");

    // Filter out empty rows
    const cleanedProduct = {
      ...editingProduct,
      features: editingProduct.features.filter((f) => f.trim() !== ""),
      specs: editingProduct.specs.filter((s) => s.label.trim() && s.value.trim()),
      applications: editingProduct.applications.filter((a) => a.trim() !== ""),
    };

    try {
      const url = isCreating
        ? "/api/admin/products"
        : `/api/admin/products/${editingProduct._id}`;
      const method = isCreating ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedProduct),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save product");
      }

      setEditingProduct(null);
      setIsCreating(false);
      onRefresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving product";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete product");
      }
      onRefresh();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  const filteredProducts =
    filterCategory === "all"
      ? products
      : products.filter((p) => p.categorySlug === filterCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Equipment Catalog</h2>
          <p className="text-xs text-gray-400">
            Add, update, or remove machinery and specifications saved directly in MongoDB
          </p>
        </div>
        {!editingProduct && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-2 rounded-xl bg-[#d31820] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/30 transition hover:bg-[#b0141b]"
          >
            <span>+</span> Add Product
          </button>
        )}
      </div>

      {/* Product Form Modal / Section */}
      {editingProduct && (
        <form
          onSubmit={handleSave}
          className="rounded-2xl border border-white/10 bg-[#14161a] p-6 space-y-6"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#d31820]">
              {isCreating ? "New Product" : "Edit Product"}
            </h3>
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="text-xs text-gray-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs font-semibold text-red-400">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Product Title / Name *
              </label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="TUQO PRO 180 Bar Induction Pressure Washer"
                required
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Model Number
              </label>
              <input
                type="text"
                value={editingProduct.model}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, model: e.target.value })
                }
                placeholder="TUQO-HPW-180PRO"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Category *
              </label>
              <select
                value={editingProduct.categorySlug}
                onChange={(e) => handleCategorySelect(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2.5 text-xs text-white focus:border-[#d31820] focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Subcategory (Optional)
              </label>
              <select
                value={editingProduct.subcategorySlug || ""}
                onChange={(e) => {
                  const slug = e.target.value;
                  const matched = subcategories.find(
                    (s) => s.categorySlug === editingProduct.categorySlug && s.slug === slug
                  );
                  setEditingProduct({
                    ...editingProduct,
                    subcategorySlug: slug,
                    subcategory: matched ? matched.name : "",
                  });
                }}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2.5 text-xs text-white focus:border-[#d31820] focus:outline-none"
              >
                <option value="">None / General</option>
                {subcategories
                  .filter((s) => s.categorySlug === editingProduct.categorySlug)
                  .map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                URL Slug *
              </label>
              <input
                type="text"
                value={editingProduct.slug}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, slug: e.target.value })
                }
                placeholder="high-pressure-washer-180"
                required
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Badge / Tag (Optional)
              </label>
              <input
                type="text"
                value={editingProduct.tag}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, tag: e.target.value })
                }
                placeholder="Best Seller / Heavy Duty"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
              />
            </div>
          </div>

          <ImageUploader
            label="Product Main Image *"
            sublabel="High quality transparent PNG or workshop photograph"
            folder="tuqo/products"
            value={editingProduct.image}
            onChange={(url) => setEditingProduct({ ...editingProduct, image: url })}
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Short Summary
            </label>
            <input
              type="text"
              value={editingProduct.shortDesc}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, shortDesc: e.target.value })
              }
              placeholder="Commercial grade induction motor pressure washer for demanding tasks."
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Full Description
            </label>
            <textarea
              rows={3}
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, description: e.target.value })
              }
              placeholder="Detailed engineering overview, motor construction, pressure ratings..."
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
            />
          </div>

          {/* Key Features */}
          <div className="space-y-2 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Key Features
              </label>
              <button
                type="button"
                onClick={addFeature}
                className="text-xs font-semibold text-[#d31820] hover:underline"
              >
                + Add Feature
              </button>
            </div>
            {editingProduct.features.map((feat, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={feat}
                  onChange={(e) => updateFeature(idx, e.target.value)}
                  placeholder="e.g. 100% Pure Copper Induction Motor"
                  className="w-full rounded-lg border border-white/10 bg-[#181a20] px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:border-[#d31820] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(idx)}
                  className="rounded-lg border border-red-500/20 px-2 text-xs text-red-400 hover:bg-red-500/10"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Technical Specs */}
          <div className="space-y-2 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Technical Specifications
              </label>
              <button
                type="button"
                onClick={addSpec}
                className="text-xs font-semibold text-[#d31820] hover:underline"
              >
                + Add Spec
              </button>
            </div>
            {editingProduct.specs.map((spec, idx) => (
              <div key={idx} className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <input
                  type="text"
                  value={spec.label}
                  onChange={(e) => updateSpec(idx, "label", e.target.value)}
                  placeholder="Spec Name (e.g. Max Pressure)"
                  className="sm:col-span-2 rounded-lg border border-white/10 bg-[#181a20] px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:border-[#d31820] focus:outline-none"
                />
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => updateSpec(idx, "value", e.target.value)}
                  placeholder="Value (e.g. 180 BAR / 2600 PSI)"
                  className="sm:col-span-2 rounded-lg border border-white/10 bg-[#181a20] px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:border-[#d31820] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeSpec(idx)}
                  className="rounded-lg border border-red-500/20 px-2 text-xs text-red-400 hover:bg-red-500/10"
                >
                  ✕ Remove
                </button>
              </div>
            ))}
          </div>

          {/* Applications */}
          <div className="space-y-2 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Applications / Recommended Industries
              </label>
              <button
                type="button"
                onClick={addApplication}
                className="text-xs font-semibold text-[#d31820] hover:underline"
              >
                + Add Application
              </button>
            </div>
            {editingProduct.applications.map((app, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={app}
                  onChange={(e) => updateApplication(idx, e.target.value)}
                  placeholder="e.g. Commercial Car Wash Studios & Fleet Maintenance"
                  className="w-full rounded-lg border border-white/10 bg-[#181a20] px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:border-[#d31820] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeApplication(idx)}
                  className="rounded-lg border border-red-500/20 px-2 text-xs text-red-400 hover:bg-red-500/10"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="prod-instock"
                checked={editingProduct.inStock}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, inStock: e.target.checked })
                }
                className="h-4 w-4 rounded accent-[#d31820]"
              />
              <label htmlFor="prod-instock" className="text-xs font-semibold text-gray-300">
                In Stock & Ready to Quote
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="prod-featured"
                checked={editingProduct.featured}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, featured: e.target.checked })
                }
                className="h-4 w-4 rounded accent-[#d31820]"
              />
              <label htmlFor="prod-featured" className="text-xs font-semibold text-gray-300">
                Featured Product (Homepage)
              </label>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400">
                Order
              </label>
              <input
                type="number"
                value={editingProduct.order}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    order: Number(e.target.value) || 0,
                  })
                }
                className="mt-1 w-full rounded-lg border border-white/10 bg-[#181a20] px-3 py-1.5 text-xs text-white focus:border-[#d31820] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#d31820] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#b0141b] disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      )}

      {/* Filter Category & Products Grid */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            Filter:
          </span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-lg border border-white/10 bg-[#14161a] px-3 py-1.5 text-xs text-white focus:border-[#d31820] focus:outline-none"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-white/10 bg-[#14161a] p-12 text-center text-gray-400">
            No products found in this category. Click "+ Add Product" to add machinery.
          </div>
        ) : (
          filteredProducts.map((p) => (
            <div
              key={p._id}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#14161a] p-4 transition hover:border-[#d31820]/40"
            >
              <div>
                <div className="relative mb-3 h-36 w-full overflow-hidden rounded-xl bg-[#181a20]">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      unoptimized={p.image.startsWith("http")}
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                  {p.tag && (
                    <span className="absolute top-2 left-2 rounded-full bg-[#d31820] px-2 py-0.5 text-[9px] font-bold uppercase text-white">
                      {p.tag}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#d31820] font-semibold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5 truncate">
                    <span>{p.category}</span>
                    {p.subcategory && (
                      <span className="text-gray-400 font-normal">/ {p.subcategory}</span>
                    )}
                  </div>
                  {p.model && <span className="font-mono text-gray-400">{p.model}</span>}
                </div>

                <h4 className="mt-1 text-sm font-bold text-white line-clamp-2">{p.name}</h4>
                {p.shortDesc && (
                  <p className="mt-1 text-xs text-gray-400 line-clamp-2">{p.shortDesc}</p>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                <span
                  className={`text-[10px] font-bold uppercase ${
                    p.inStock ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  {p.inStock ? "● In Stock" : "○ Pre-Order"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(p)}
                    className="rounded-md border border-white/10 px-2.5 py-1 text-xs font-semibold text-gray-300 hover:bg-white/10"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
