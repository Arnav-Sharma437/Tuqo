"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ImageUploader } from "./ImageUploader";
import { CategoryItem } from "./CategoryManager";
import { SubcategoryItem } from "./SubcategoryManager";

function getPageNumbers(current: number, total: number): (number | string)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }
  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export interface ProductSpecItem {
  label: string;
  value: string;
}

export const SPEC_PRESETS = [
  "Input Power",
  "Voltage",
  "Frequency",
  "No Load Speed",
  "Max Working Pressure",
  "Working Pressure",
  "Flow Rate",
  "Motor Type",
  "Power Source Type",
  "Colour",
  "Chuck / Rod Diameter",
  "Tank Capacity",
  "Net Weight",
  "Hose Length",
  "Warranty",
];

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
  images?: string[];
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
  const [managingSpecsProduct, setManagingSpecsProduct] = useState<ProductItem | null>(null);
  const [specsModalList, setSpecsModalList] = useState<ProductSpecItem[]>([]);
  const [specsModalSaving, setSpecsModalSaving] = useState(false);
  const [specsModalError, setSpecsModalError] = useState("");

  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  const initialProduct: ProductItem = {
    name: "",
    slug: "",
    model: "",
    category: categories[0]?.name || "High Pressure Washer",
    categorySlug: categories[0]?.slug || "high-pressure-washer",
    subcategory: "",
    subcategorySlug: "",
    image: "",
    images: [],
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
      images: Array.isArray(prod.images) && prod.images.length > 0 ? prod.images : (prod.image ? [prod.image] : []),
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
  const addSpec = (label = "", value = "") => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      specs: [...editingProduct.specs, { label, value }],
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

  const openSpecsModal = (prod: ProductItem) => {
    setManagingSpecsProduct(prod);
    setSpecsModalList(
      prod.specs?.length
        ? prod.specs.map((s) => ({ ...s }))
        : [{ label: "", value: "" }]
    );
    setSpecsModalError("");
  };

  const handleSaveSpecsModal = async () => {
    if (!managingSpecsProduct?._id) return;
    setSpecsModalSaving(true);
    setSpecsModalError("");
    try {
      const cleaned = specsModalList.filter(
        (s) => s.label.trim() && s.value.trim()
      );
      const res = await fetch(`/api/admin/products/${managingSpecsProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ specs: cleaned }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update specifications");
      }
      setManagingSpecsProduct(null);
      onRefresh();
    } catch (err: unknown) {
      setSpecsModalError(
        err instanceof Error ? err.message : "Failed to update specifications"
      );
    } finally {
      setSpecsModalSaving(false);
    }
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

    const gallery = Array.isArray(editingProduct.images) ? [...editingProduct.images] : [];
    if (editingProduct.image && !gallery.includes(editingProduct.image)) {
      gallery.unshift(editingProduct.image);
    }

    // Filter out empty rows
    const cleanedProduct = {
      ...editingProduct,
      images: gallery.filter((img) => img && img.trim() !== ""),
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

  const totalPages = pageSize === -1 ? 1 : Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedProducts = useMemo(() => {
    if (pageSize === -1) return filteredProducts;
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, safeCurrentPage, pageSize]);

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
            sublabel="High quality transparent PNG cutout or crisp workshop photograph"
            recommendedResolution="800 × 800 px or 1000 × 1000 px"
            aspectHint="1:1 Square (Square ratio)"
            maxSizeMB={4}
            folder="tuqo/products"
            value={editingProduct.image}
            onChange={(url) => {
              const currentList = editingProduct.images || [];
              const updated = url && !currentList.includes(url) ? [url, ...currentList] : currentList;
              setEditingProduct({ ...editingProduct, image: url, images: updated });
            }}
          />

          {/* Multiple Images Gallery */}
          <div className="rounded-2xl border border-white/10 bg-[#181a20] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-200">
                  Product Gallery (Multiple Images)
                </label>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Upload multiple angles, close-ups, and in-use workshop photos for this product.
                </p>
              </div>
              <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-bold text-[#d31820]">
                {editingProduct.images?.length || 0} images in gallery
              </span>
            </div>

            <ImageUploader
              label="Add Image to Gallery"
              sublabel="Upload an additional image or enter URL to add to the product gallery"
              recommendedResolution="800 × 800 px or 1000 × 1000 px"
              aspectHint="1:1 Square"
              maxSizeMB={4}
              folder="tuqo/products"
              value=""
              onChange={(newUrl) => {
                if (newUrl) {
                  const currentList = editingProduct.images || [];
                  if (!currentList.includes(newUrl)) {
                    const updated = [...currentList, newUrl];
                    setEditingProduct({
                      ...editingProduct,
                      images: updated,
                      image: editingProduct.image || newUrl,
                    });
                  }
                }
              }}
            />

            {/* Gallery Thumbnails List */}
            {editingProduct.images && editingProduct.images.length > 0 ? (
              <div className="pt-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                  Current Gallery Images ({editingProduct.images.length})
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {editingProduct.images.map((imgUrl, idx) => {
                    const isMain = editingProduct.image === imgUrl;
                    return (
                      <div
                        key={`${imgUrl}-${idx}`}
                        className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border p-2 bg-[#121316] transition-all ${
                          isMain
                            ? "border-[#d31820] ring-2 ring-[#d31820]/40 shadow-lg shadow-red-900/20"
                            : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black/30">
                          <Image
                            src={imgUrl}
                            alt={`Gallery image ${idx + 1}`}
                            fill
                            className="object-contain p-1"
                            sizes="140px"
                          />
                          {isMain && (
                            <span className="absolute top-1.5 left-1.5 rounded bg-[#d31820] px-1.5 py-0.5 text-[8px] font-black uppercase text-white shadow">
                              Cover
                            </span>
                          )}
                        </div>

                        <div className="mt-2.5 flex items-center justify-between gap-1 border-t border-white/5 pt-2">
                          {!isMain ? (
                            <button
                              type="button"
                              onClick={() =>
                                setEditingProduct({ ...editingProduct, image: imgUrl })
                              }
                              className="rounded bg-white/5 hover:bg-[#d31820] hover:text-white px-2 py-1 text-[9px] font-bold text-gray-300 transition"
                            >
                              Make Cover
                            </button>
                          ) : (
                            <span className="text-[9px] font-extrabold text-[#d31820] uppercase">
                              Main Image
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              const remaining = (editingProduct.images || []).filter(
                                (_, i) => i !== idx
                              );
                              setEditingProduct({
                                ...editingProduct,
                                images: remaining,
                                image:
                                  isMain && remaining.length > 0
                                    ? remaining[0]
                                    : isMain
                                    ? ""
                                    : editingProduct.image,
                              });
                            }}
                            className="rounded p-1 text-[11px] text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"
                            title="Remove from gallery"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

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

          {/* Technical Specs Table Builder */}
          <div className="space-y-3 border-t border-white/10 pt-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-200">
                  Technical Specifications Table
                </label>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Parameters and values displayed in the clean 2-column table on the live product details page.
                </p>
              </div>
              <button
                type="button"
                onClick={() => addSpec()}
                className="self-start rounded-lg bg-[#d31820] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#b0141b] transition"
              >
                + Add Custom Spec
              </button>
            </div>

            {/* Quick Suggestions Chips */}
            <div className="rounded-xl border border-white/5 bg-[#121418] p-3 space-y-1.5">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#d31820]">
                Quick Add Common Parameters:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SPEC_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => addSpec(preset, "")}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-gray-300 hover:bg-[#d31820] hover:text-white hover:border-[#d31820] transition"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Header and Rows */}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#14161a]">
              <div className="grid grid-cols-12 gap-2 bg-[#1a1d24] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-white/10">
                <span className="col-span-5">Parameter / Label (e.g. Voltage)</span>
                <span className="col-span-6">Value / Rating (e.g. 220V - 240V)</span>
                <span className="col-span-1 text-center">Action</span>
              </div>
              <div className="p-2 space-y-2">
                {editingProduct.specs.map((spec, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      type="text"
                      value={spec.label}
                      onChange={(e) => updateSpec(idx, "label", e.target.value)}
                      placeholder="Spec Label (e.g. Input Power)"
                      className="col-span-5 rounded-lg border border-white/10 bg-[#181a20] px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:border-[#d31820] focus:outline-none"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => updateSpec(idx, "value", e.target.value)}
                      placeholder="Spec Value (e.g. 1200 Watts)"
                      className="col-span-6 rounded-lg border border-white/10 bg-[#181a20] px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:border-[#d31820] focus:outline-none font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => removeSpec(idx)}
                      className="col-span-1 flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 text-xs text-red-400 hover:bg-red-500/10 mx-auto transition"
                      title="Delete spec row"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
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
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setCurrentPage(1);
            }}
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
          paginatedProducts.map((p) => (
            <div
              key={p._id}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#14161a] p-4 transition hover:border-[#d31820]/40"
            >
              <div>
                <div className="relative mb-3 h-36 w-full overflow-hidden rounded-xl bg-[#181a20]">
                  {p.image ? (
                    <a
                      href={p.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/img relative block h-full w-full cursor-zoom-in"
                      title="Click to view full image in new tab"
                    >
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        unoptimized={p.image.startsWith("http")}
                        className="object-contain p-2 group-hover/img:scale-105 transition-transform"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <span className="absolute bottom-1.5 right-1.5 rounded bg-black/75 px-1.5 py-0.5 text-[9px] font-bold text-white opacity-0 group-hover/img:opacity-100 transition-opacity">
                        🔍 View
                      </span>
                    </a>
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

                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  <button
                    type="button"
                    onClick={() => openSpecsModal(p)}
                    className="rounded-md border border-[#d31820]/40 bg-[#d31820]/10 px-2 py-1 text-xs font-semibold text-[#ff5c62] hover:bg-[#d31820]/20 transition flex items-center gap-1"
                    title="Manage Technical Specifications"
                  >
                    <span>⚙ Specs ({p.specs?.length || 0})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStartEdit(p)}
                    className="rounded-md border border-white/10 px-2 py-1 text-xs font-semibold text-gray-300 hover:bg-white/10"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p._id)}
                    className="rounded-md border border-red-500/30 bg-red-500/10 px-2 py-1 text-xs font-semibold text-red-400 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Product Catalog Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#14161a] p-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
            <span>
              Showing{" "}
              <strong className="text-white">
                {pageSize === -1 ? 1 : (safeCurrentPage - 1) * pageSize + 1}
              </strong>{" "}
              to{" "}
              <strong className="text-white">
                {pageSize === -1 ? filteredProducts.length : Math.min(safeCurrentPage * pageSize, filteredProducts.length)}
              </strong>{" "}
              of <strong className="text-white">{filteredProducts.length}</strong> products
            </span>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Per Page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded-lg border border-white/10 bg-[#1c1f26] px-2 py-1 text-xs font-semibold text-white focus:border-[#d31820] focus:outline-none"
              >
                <option value={9}>9</option>
                <option value={18}>18</option>
                <option value={36}>36</option>
                <option value={-1}>All ({filteredProducts.length})</option>
              </select>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                disabled={safeCurrentPage === 1}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                title="First Page"
              >
                «
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                title="Previous Page"
              >
                ‹ Prev
              </button>

              <div className="flex items-center gap-1">
                {getPageNumbers(safeCurrentPage, totalPages).map((pNum, idx) =>
                  pNum === "..." ? (
                    <span key={`dots-${idx}`} className="px-1.5 text-xs text-gray-400 font-bold">
                      ...
                    </span>
                  ) : (
                    <button
                      key={`page-${pNum}`}
                      type="button"
                      onClick={() => setCurrentPage(pNum as number)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                        safeCurrentPage === pNum
                          ? "bg-[#d31820] text-white shadow-md shadow-red-950/50"
                          : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {pNum}
                    </button>
                  )
                )}
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                title="Next Page"
              >
                Next ›
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(totalPages)}
                disabled={safeCurrentPage === totalPages}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                title="Last Page"
              >
                »
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quick Specs Management Modal */}
      {managingSpecsProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/15 bg-[#14161a] p-6 shadow-2xl my-8">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#d31820]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#ff5c62]">
                    Technical Specifications
                  </span>
                  {managingSpecsProduct.model && (
                    <span className="font-mono text-xs text-gray-400">
                      [{managingSpecsProduct.model}]
                    </span>
                  )}
                </div>
                <h3 className="mt-1 text-lg font-bold text-white">
                  {managingSpecsProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setManagingSpecsProduct(null)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            {specsModalError && (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                {specsModalError}
              </div>
            )}

            {/* Presets Chips */}
            <div className="mt-4 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Quick Add Common Parameters:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SPEC_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() =>
                      setSpecsModalList([...specsModalList, { label: preset, value: "" }])
                    }
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-gray-300 hover:border-[#d31820] hover:text-white transition"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Spec rows table */}
            <div className="mt-4 max-h-[350px] space-y-2 overflow-y-auto pr-1">
              <div className="grid grid-cols-12 gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1">
                <span className="col-span-5">Parameter Name</span>
                <span className="col-span-6">Value / Specification</span>
                <span className="col-span-1 text-center">Del</span>
              </div>
              {specsModalList.map((spec, idx) => (
                <div key={idx} className="grid grid-cols-12 items-center gap-2">
                  <input
                    type="text"
                    value={spec.label}
                    placeholder="e.g. Input Power"
                    onChange={(e) => {
                      const updated = [...specsModalList];
                      updated[idx].label = e.target.value;
                      setSpecsModalList(updated);
                    }}
                    className="col-span-5 rounded-lg border border-white/10 bg-[#181a20] px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    placeholder="e.g. 1800W or 140 Bar"
                    onChange={(e) => {
                      const updated = [...specsModalList];
                      updated[idx].value = e.target.value;
                      setSpecsModalList(updated);
                    }}
                    className="col-span-6 rounded-lg border border-white/10 bg-[#181a20] px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setSpecsModalList(specsModalList.filter((_, i) => i !== idx))
                    }
                    className="col-span-1 rounded-lg border border-red-500/20 bg-red-500/10 py-1.5 text-center text-xs text-red-400 hover:bg-red-500/20"
                    title="Remove specification"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() =>
                  setSpecsModalList([...specsModalList, { label: "", value: "" }])
                }
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-300 hover:bg-white/10"
              >
                + Add Empty Row
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setManagingSpecsProduct(null)}
                  className="rounded-lg border border-white/10 px-4 py-1.5 text-xs font-semibold text-gray-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveSpecsModal}
                  disabled={specsModalSaving}
                  className="rounded-lg bg-[#d31820] px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#b0141b] disabled:opacity-50"
                >
                  {specsModalSaving ? "Saving..." : "Save Specifications"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
