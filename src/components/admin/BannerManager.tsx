"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageUploader } from "./ImageUploader";

export interface BannerItem {
  _id?: string;
  title?: string;
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
    desktopImage: "",
    mobileImage: "",
    active: true,
    order: banners.length + 1,
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

    if (!editingBanner.desktopImage) {
      setError("Desktop Banner Image is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        ...editingBanner,
        title: editingBanner.title || `Banner Slide ${editingBanner.order || 1}`,
        mobileImage: editingBanner.mobileImage || editingBanner.desktopImage,
      };

      const url = isCreating
        ? "/api/admin/banners"
        : `/api/admin/banners/${editingBanner._id}`;
      const method = isCreating ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
            Upload clean full-width hero banner images for desktop and mobile displays (no text overlay needed)
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
              {isCreating ? "New Banner Image" : "Edit Banner Image"}
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

          {/* Cloudinary Separate Desktop and Mobile Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl border border-white/5 bg-[#101215] p-4">
            <ImageUploader
              label="Desktop Banner Image *"
              sublabel="High-resolution landscape image (1920x650 or 21:9 recommended)"
              aspectHint="1920 × 650"
              folder="tuqo/banners"
              value={editingBanner.desktopImage}
              onChange={(url) =>
                setEditingBanner({ ...editingBanner, desktopImage: url })
              }
            />

            <ImageUploader
              label="Mobile Banner Image (Optional)"
              sublabel="Portrait / mobile crop image (leave empty to reuse desktop image)"
              aspectHint="800 × 800"
              folder="tuqo/banners"
              value={editingBanner.mobileImage}
              onChange={(url) =>
                setEditingBanner({ ...editingBanner, mobileImage: url })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                min={0}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2 text-xs text-white focus:border-[#d31820] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="banner-active"
                checked={editingBanner.active}
                onChange={(e) =>
                  setEditingBanner({ ...editingBanner, active: e.target.checked })
                }
                className="h-4 w-4 rounded accent-[#d31820]"
              />
              <label htmlFor="banner-active" className="text-xs font-semibold text-gray-300 cursor-pointer">
                Active / Visible on homepage slider
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-white/5">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {banners.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-white/10 bg-[#14161a] p-12 text-center text-gray-400">
            No banners created yet. Click &quot;+ Add New Banner&quot; to upload your first desktop &amp; mobile banner image.
          </div>
        ) : (
          banners.map((b, idx) => (
            <div
              key={b._id || idx}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#14161a] transition hover:border-[#d31820]/40"
            >
              <div className="relative h-48 w-full bg-[#181a20]">
                {b.desktopImage ? (
                  <Image
                    src={b.desktopImage}
                    alt={`Banner ${idx + 1}`}
                    fill
                    unoptimized={b.desktopImage.startsWith("http")}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-500">
                    No image uploaded
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      b.active
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {b.active ? "Active" : "Hidden"}
                  </span>
                  <span className="rounded-full bg-black/60 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold uppercase text-gray-300 border border-white/10">
                    Slide #{idx + 1}
                  </span>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between text-xs text-gray-400">
                <span className="font-semibold text-gray-300">
                  Display Order: <strong className="text-white">{b.order}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(b)}
                    className="rounded-lg border border-white/10 px-3 py-1 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 hover:bg-red-500/20"
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
