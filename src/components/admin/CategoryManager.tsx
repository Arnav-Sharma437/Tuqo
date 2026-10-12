"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageUploader } from "./ImageUploader";

export interface CategoryItem {
  _id?: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  order: number;
  featured: boolean;
}

interface CategoryManagerProps {
  categories: CategoryItem[];
  onRefresh: () => void;
}

export function CategoryManager({ categories, onRefresh }: CategoryManagerProps) {
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initialCategory: CategoryItem = {
    name: "",
    slug: "",
    image: "",
    description: "",
    order: 0,
    featured: true,
  };

  const handleNameChange = (name: string) => {
    if (!editingCategory) return;
    const slug = isCreating
      ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      : editingCategory.slug;
    setEditingCategory({ ...editingCategory, name, slug });
  };

  const handleStartCreate = () => {
    setEditingCategory({ ...initialCategory });
    setIsCreating(true);
    setError("");
  };

  const handleStartEdit = (cat: CategoryItem) => {
    setEditingCategory({ ...cat });
    setIsCreating(false);
    setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    if (!editingCategory.name || !editingCategory.slug || !editingCategory.image) {
      setError("Name, Slug, and Image are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const url = isCreating
        ? "/api/admin/categories"
        : `/api/admin/categories/${editingCategory._id}`;
      const method = isCreating ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCategory),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save category");
      }

      setEditingCategory(null);
      setIsCreating(false);
      onRefresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving category";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete category");
      }
      onRefresh();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Equipment Categories</h2>
          <p className="text-xs text-gray-400">
            Create, update, or reorganize categories and thumbnails stored in MongoDB Atlas and Cloudinary
          </p>
        </div>
        {!editingCategory && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-2 rounded-xl bg-[#d31820] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/30 transition hover:bg-[#b0141b]"
          >
            <span>+</span> Add Category
          </button>
        )}
      </div>

      {editingCategory && (
        <form
          onSubmit={handleSave}
          className="rounded-2xl border border-white/10 bg-[#14161a] p-6 space-y-6"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#d31820]">
              {isCreating ? "New Category" : "Edit Category"}
            </h3>
            <button
              type="button"
              onClick={() => setEditingCategory(null)}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Category Name *
              </label>
              <input
                type="text"
                value={editingCategory.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. High Pressure Washers"
                required
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                URL Slug *
              </label>
              <input
                type="text"
                value={editingCategory.slug}
                onChange={(e) =>
                  setEditingCategory({ ...editingCategory, slug: e.target.value })
                }
                placeholder="high-pressure-washer"
                required
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
              />
            </div>
          </div>

          <ImageUploader
            label="Category Thumbnail Image *"
            sublabel="Icon / photo of the equipment category"
            folder="tuqo/categories"
            value={editingCategory.image}
            onChange={(url) => setEditingCategory({ ...editingCategory, image: url })}
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              value={editingCategory.description || ""}
              onChange={(e) =>
                setEditingCategory({ ...editingCategory, description: e.target.value })
              }
              placeholder="e.g. Commercial and industrial high pressure washers for intense cleaning."
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Display Order
              </label>
              <input
                type="number"
                value={editingCategory.order}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    order: Number(e.target.value) || 0,
                  })
                }
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2 text-xs text-white focus:border-[#d31820] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="cat-featured"
                checked={editingCategory.featured}
                onChange={(e) =>
                  setEditingCategory({ ...editingCategory, featured: e.target.checked })
                }
                className="h-4 w-4 rounded accent-[#d31820]"
              />
              <label htmlFor="cat-featured" className="text-xs font-semibold text-gray-300">
                Show in navigation & homepage
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setEditingCategory(null)}
              className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#d31820] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#b0141b] disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Category"}
            </button>
          </div>
        </form>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-white/10 bg-[#14161a] p-12 text-center text-gray-400">
            No categories in database yet. Click "+ Add Category" to create one.
          </div>
        ) : (
          categories.map((c) => (
            <div
              key={c._id}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#14161a] p-4 transition hover:border-[#d31820]/40"
            >
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#181a20]">
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    className="object-contain p-2"
                    sizes="64px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[10px] text-gray-500">
                    No image
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{c.name}</h4>
                <p className="text-[11px] text-gray-400 font-mono truncate">/{c.slug}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(c)}
                    className="rounded-md border border-white/10 px-2 py-0.5 text-[11px] font-semibold text-gray-300 hover:bg-white/10"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
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
