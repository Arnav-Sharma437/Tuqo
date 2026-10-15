"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageUploader } from "./ImageUploader";
import { CategoryItem } from "./CategoryManager";

export interface SubcategoryItem {
  _id?: string;
  name: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  image?: string;
  description?: string;
  order: number;
  active: boolean;
  createdAt?: string;
}

interface SubcategoryManagerProps {
  subcategories: SubcategoryItem[];
  categories: CategoryItem[];
  onRefresh: () => void;
}

const EMPTY_SUBCATEGORY: SubcategoryItem = {
  name: "",
  slug: "",
  categorySlug: "",
  categoryName: "",
  image: "",
  description: "",
  order: 0,
  active: true,
};

export function SubcategoryManager({
  subcategories,
  categories,
  onRefresh,
}: SubcategoryManagerProps) {
  const [editingSubcategory, setEditingSubcategory] =
    useState<SubcategoryItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("ALL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStartCreate = () => {
    const defaultCat = categories[0];
    setEditingSubcategory({
      ...EMPTY_SUBCATEGORY,
      categorySlug: defaultCat ? defaultCat.slug : "",
      categoryName: defaultCat ? defaultCat.name : "",
      order: subcategories.length + 1,
    });
    setIsCreating(true);
    setError("");
  };

  const handleStartEdit = (sub: SubcategoryItem) => {
    setEditingSubcategory({ ...sub });
    setIsCreating(false);
    setError("");
  };

  const handleNameChange = (name: string) => {
    if (!editingSubcategory) return;
    const autoSlug = isCreating
      ? name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      : editingSubcategory.slug;
    setEditingSubcategory({
      ...editingSubcategory,
      name,
      slug: autoSlug,
    });
  };

  const handleCategorySelect = (categorySlug: string) => {
    if (!editingSubcategory) return;
    const cat = categories.find((c) => c.slug === categorySlug);
    setEditingSubcategory({
      ...editingSubcategory,
      categorySlug,
      categoryName: cat ? cat.name : categorySlug,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubcategory) return;

    if (!editingSubcategory.name || !editingSubcategory.slug || !editingSubcategory.categorySlug) {
      setError("Please fill in Subcategory Name, Slug, and select a Parent Category");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const isNew = isCreating || !editingSubcategory._id;
      const url = isNew
        ? "/api/admin/subcategories"
        : `/api/admin/subcategories/${editingSubcategory._id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingSubcategory),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save subcategory");
      }

      setEditingSubcategory(null);
      setIsCreating(false);
      onRefresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving subcategory";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this subcategory?")) return;

    try {
      const res = await fetch(`/api/admin/subcategories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete subcategory");
      }
      onRefresh();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  // Filter subcategories by chosen category
  const filteredSubcategories =
    selectedCategoryFilter === "ALL"
      ? subcategories
      : subcategories.filter((s) => s.categorySlug === selectedCategoryFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Sub-Categories</h2>
          <p className="text-xs text-gray-400">
            Organize equipment into specific subcategories under primary machinery lines
          </p>
        </div>
        {!editingSubcategory && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-2 rounded-xl bg-[#d31820] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/30 transition hover:bg-[#b0141b]"
          >
            <span className="text-base leading-none">+</span>
            <span>Add Subcategory</span>
          </button>
        )}
      </div>

      {/* Filter Tabs / Pills */}
      {!editingSubcategory && categories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategoryFilter("ALL")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
              selectedCategoryFilter === "ALL"
                ? "bg-white text-black font-bold"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            All Categories ({subcategories.length})
          </button>
          {categories.map((c) => {
            const count = subcategories.filter((s) => s.categorySlug === c.slug).length;
            return (
              <button
                key={c.slug}
                onClick={() => setSelectedCategoryFilter(c.slug)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategoryFilter === c.slug
                    ? "bg-[#d31820] text-white font-bold"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {c.name} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Edit / Create Form */}
      {editingSubcategory && (
        <form
          onSubmit={handleSave}
          className="rounded-2xl border border-white/10 bg-[#14161a] p-6 space-y-6 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {isCreating ? "Create New Subcategory" : `Edit Subcategory: ${editingSubcategory.name}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingSubcategory(null)}
              className="text-gray-400 hover:text-white text-xs font-semibold"
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Parent Category *
              </label>
              <select
                required
                value={editingSubcategory.categorySlug}
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
                Subcategory Name *
              </label>
              <input
                type="text"
                required
                value={editingSubcategory.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Industrial Pressure Washers, Foam Cannons"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2 text-xs text-white focus:border-[#d31820] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={editingSubcategory.slug}
                onChange={(e) =>
                  setEditingSubcategory({ ...editingSubcategory, slug: e.target.value })
                }
                placeholder="e.g. industrial-pressure-washers"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2 text-xs text-white focus:border-[#d31820] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Display Order
              </label>
              <input
                type="number"
                value={editingSubcategory.order}
                onChange={(e) =>
                  setEditingSubcategory({
                    ...editingSubcategory,
                    order: Number(e.target.value),
                  })
                }
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2 text-xs text-white focus:border-[#d31820] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              value={editingSubcategory.description || ""}
              onChange={(e) =>
                setEditingSubcategory({
                  ...editingSubcategory,
                  description: e.target.value,
                })
              }
              placeholder="Short description of products under this subcategory"
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2 text-xs text-white focus:border-[#d31820] focus:outline-none"
            />
          </div>

          {/* Thumbnail Image */}
          <div className="rounded-xl border border-white/10 bg-[#101215] p-4">
            <ImageUploader
              label="Subcategory Thumbnail"
              sublabel="Image shown on category page subcategory cards or navigation"
              recommendedResolution="600 × 600 px (Square)"
              aspectHint="1:1 Square"
              maxSizeMB={2}
              folder="tuqo/subcategories"
              value={editingSubcategory.image || ""}
              onChange={(url) =>
                setEditingSubcategory({ ...editingSubcategory, image: url })
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sub-active"
              checked={editingSubcategory.active}
              onChange={(e) =>
                setEditingSubcategory({
                  ...editingSubcategory,
                  active: e.target.checked,
                })
              }
              className="h-4 w-4 rounded border-white/20 bg-[#181a20] text-[#d31820] focus:ring-0"
            />
            <label htmlFor="sub-active" className="text-xs text-gray-300 font-semibold cursor-pointer">
              Active / Visible on Storefront
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setEditingSubcategory(null)}
              className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#d31820] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#b0141b] disabled:opacity-50 shadow-md shadow-red-900/30"
            >
              {loading ? "Saving..." : "Save Subcategory"}
            </button>
          </div>
        </form>
      )}

      {/* Subcategories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubcategories.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-white/10 bg-[#14161a] p-12 text-center text-gray-400">
            No subcategories found. Click &quot;+ Add Subcategory&quot; to create one.
          </div>
        ) : (
          filteredSubcategories.map((sub) => (
            <div
              key={sub._id}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#14161a] p-4 transition hover:border-[#d31820]/40"
            >
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#181a20]">
                {sub.image ? (
                  <Image
                    src={sub.image}
                    alt={sub.name}
                    fill
                    unoptimized={sub.image.startsWith("http")}
                    className="object-contain p-2"
                    sizes="56px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[10px] text-gray-500 font-bold">
                    TUQO
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-400 truncate max-w-[120px]">
                    {sub.categoryName || sub.categorySlug}
                  </span>
                  <span className="text-[10px] text-gray-500">#{sub.order}</span>
                </div>
                <h4 className="text-sm font-bold text-white truncate mt-0.5">{sub.name}</h4>
                <p className="text-[11px] text-gray-400 font-mono truncate">/{sub.slug}</p>

                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(sub)}
                    className="rounded-md border border-white/10 px-2 py-0.5 text-[11px] font-semibold text-gray-300 hover:bg-white/10"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sub._id)}
                    className="rounded-md border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[11px] font-semibold text-red-400 hover:bg-red-500/20"
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
