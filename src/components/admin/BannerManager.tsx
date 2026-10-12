"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageUploader } from "./ImageUploader";

export interface BannerItem {
  _id?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  desktopImage: string;
  mobileImage: string;
  buttonText?: string;
  buttonLink?: string;
  active: boolean;
  order: number;
}

interface BannerManagerProps {
  banners: BannerItem[];
  onRefresh: () => void;
}

export function BannerManager({ banners, onRefresh }: BannerManagerProps) {
  const [editingBanner, setEditingBanner] = useState<BannerItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initialBanner: BannerItem = {
    title: "",
    subtitle: "",
    badge: "",
    desktopImage: "",
    mobileImage: "",
    buttonText: "Explore Products",
    buttonLink: "/categories",
    active: true,
    order: 0,
  };

  const handleStartCreate = () => {
    setEditingBanner({ ...initialBanner });
    setIsCreating(true);
    setError("");
  };

  const handleStartEdit = (banner: BannerItem) => {
    setEditingBanner({ ...banner });
    setIsCreating(false);
    setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner) return;

    if (!editingBanner.title || !editingBanner.desktopImage || !editingBanner.mobileImage) {
      setError("Title, Desktop Image, and Mobile Image are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const url = isCreating
        ? "/api/admin/banners"
        : `/api/admin/banners/${editingBanner._id}`;
      const method = isCreating ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBanner),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save banner");
      }

      setEditingBanner(null);
      setIsCreating(false);
      onRefresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving banner";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this banner?")) return;

    try {
      const res = await fetch(`/api/admin/banners/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete banner");
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
          <h2 className="text-xl font-bold tracking-tight text-white">Homepage Banners</h2>
          <p className="text-xs text-gray-400">
            Manage full-width hero slides with dedicated desktop and mobile banners uploaded to Cloudinary
          </p>
        </div>
        {!editingBanner && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-2 rounded-xl bg-[#d31820] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/30 transition hover:bg-[#b0141b]"
          >
            <span>+</span> Add New Banner
          </button>
        )}
      </div>

      {/* Editor Modal / Panel */}
      {editingBanner && (
        <form
          onSubmit={handleSave}
          className="rounded-2xl border border-white/10 bg-[#14161a] p-6 space-y-6"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#d31820]">
              {isCreating ? "New Banner" : "Edit Banner"}
            </h3>
            <button
              type="button"
              onClick={() => setEditingBanner(null)}
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
                Banner Headline / Title *
              </label>
              <input
                type="text"
                value={editingBanner.title}
                onChange={(e) =>
                  setEditingBanner({ ...editingBanner, title: e.target.value })
                }
                placeholder="e.g. Engineered For Extreme Industrial Duty"
                required
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Badge / Tag (Optional)
              </label>
              <input
                type="text"
                value={editingBanner.badge || ""}
                onChange={(e) =>
                  setEditingBanner({ ...editingBanner, badge: e.target.value })
                }
                placeholder="e.g. COMMERCIAL & INDUSTRIAL GRADE"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Subtitle / Description (Optional)
            </label>
            <textarea
              rows={2}
              value={editingBanner.subtitle || ""}
              onChange={(e) =>
                setEditingBanner({ ...editingBanner, subtitle: e.target.value })
              }
              placeholder="e.g. Discover high-pressure washers and industrial tools engineered for continuous operation."
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
            />
          </div>

          {/* Cloudinary Separate Desktop and Mobile Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl border border-white/5 bg-[#101215] p-4">
            <ImageUploader
              label="Desktop Banner Image *"
              sublabel="High-resolution landscape image (1920x800 or 16:9 recommended)"
              aspectHint="1920 × 800"
              folder="tuqo/banners"
              value={editingBanner.desktopImage}
              onChange={(url) =>
                setEditingBanner({ ...editingBanner, desktopImage: url })
              }
            />

            <ImageUploader
              label="Mobile Banner Image *"
              sublabel="Portrait / square crop image (800x1000 or 4:5 recommended)"
              aspectHint="800 × 1000"
              folder="tuqo/banners"
              value={editingBanner.mobileImage}
              onChange={(url) =>
                setEditingBanner({ ...editingBanner, mobileImage: url })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Button Text
              </label>
              <input
                type="text"
                value={editingBanner.buttonText || ""}
                onChange={(e) =>
                  setEditingBanner({ ...editingBanner, buttonText: e.target.value })
                }
                placeholder="Explore Products"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2 text-xs text-white focus:border-[#d31820] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Button Target Link
              </label>
              <input
                type="text"
                value={editingBanner.buttonLink || ""}
                onChange={(e) =>
                  setEditingBanner({ ...editingBanner, buttonLink: e.target.value })
                }
                placeholder="/categories"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2 text-xs text-white focus:border-[#d31820] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Display Order
              </label>
              <input
                type="number"
                value={editingBanner.order}
                onChange={(e) =>
                  setEditingBanner({
                    ...editingBanner,
                    order: Number(e.target.value) || 0,
                  })
                }
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2 text-xs text-white focus:border-[#d31820] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="banner-active"
              checked={editingBanner.active}
              onChange={(e) =>
                setEditingBanner({ ...editingBanner, active: e.target.checked })
              }
              className="h-4 w-4 rounded accent-[#d31820]"
            />
            <label htmlFor="banner-active" className="text-xs font-semibold text-gray-300">
              Active / Visible on public site
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setEditingBanner(null)}
              className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#d31820] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#b0141b] disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Banner"}
            </button>
          </div>
        </form>
      )}

      {/* List of existing banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banners.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-white/10 bg-[#14161a] p-12 text-center text-gray-400">
            No banners created yet. Click "+ Add New Banner" to create your first desktop & mobile hero slide.
          </div>
        ) : (
          banners.map((b) => (
            <div
              key={b._id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#14161a] transition hover:border-[#d31820]/40"
            >
              <div className="relative h-44 w-full bg-[#181a20]">
                {b.desktopImage ? (
                  <Image
                    src={b.desktopImage}
                    alt={b.title}
                    fill
                    unoptimized={b.desktopImage.startsWith("http")}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-500">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      b.active ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {b.active ? "Active" : "Hidden"}
                  </span>
                  {b.badge && (
                    <span className="rounded-full bg-[#d31820]/80 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                      {b.badge}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{b.title}</h4>
                  {b.subtitle && (
                    <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{b.subtitle}</p>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500 border-t border-white/5 pt-2">
                  <span>Order: {b.order}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartEdit(b)}
                      className="rounded-lg border border-white/10 px-2.5 py-1 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400 hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
