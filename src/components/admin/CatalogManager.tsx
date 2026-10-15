"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageUploader } from "./ImageUploader";
import { PdfUploader } from "./PdfUploader";

export interface CatalogItem {
  _id?: string;
  title: string;
  description?: string;
  pdfUrl: string;
  coverImage?: string;
  fileSize?: string;
  category?: string;
  order: number;
  active: boolean;
  createdAt?: string;
}

interface CatalogManagerProps {
  catalogs: CatalogItem[];
  onRefresh: () => void;
}

const EMPTY_CATALOG: CatalogItem = {
  title: "",
  description: "",
  pdfUrl: "",
  coverImage: "",
  fileSize: "",
  category: "General",
  order: 0,
  active: true,
};

export function CatalogManager({ catalogs, onRefresh }: CatalogManagerProps) {
  const [editingCatalog, setEditingCatalog] = useState<CatalogItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStartCreate = () => {
    setEditingCatalog({
      ...EMPTY_CATALOG,
      order: catalogs.length + 1,
    });
    setIsCreating(true);
    setError("");
  };

  const handleStartEdit = (cat: CatalogItem) => {
    setEditingCatalog({ ...cat });
    setIsCreating(false);
    setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCatalog) return;

    if (!editingCatalog.title) {
      setError("Please provide a title for the catalogue");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const isNew = isCreating || !editingCatalog._id;
      const url = isNew
        ? "/api/admin/catalogs"
        : `/api/admin/catalogs/${editingCatalog._id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCatalog),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save catalogue");
      }

      setEditingCatalog(null);
      setIsCreating(false);
      onRefresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving catalogue";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this catalogue?")) return;

    try {
      const res = await fetch(`/api/admin/catalogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete catalogue");
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
          <h2 className="text-xl font-bold tracking-tight text-white">E-Catalogues & Brochures</h2>
          <p className="text-xs text-gray-400">
            Upload PDF catalogues, spec sheets, and brochures for customers to download from the website
          </p>
        </div>
        {!editingCatalog && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-2 rounded-xl bg-[#d31820] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/30 transition hover:bg-[#b0141b]"
          >
            <span className="text-base leading-none">+</span>
            <span>Add New Catalogue</span>
          </button>
        )}
      </div>

      {/* Edit / Create Form */}
      {editingCatalog && (
        <form
          onSubmit={handleSave}
          className="rounded-2xl border border-white/10 bg-[#14161a] p-6 space-y-6 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {isCreating ? "New E-Catalogue" : `Edit Catalogue: ${editingCatalog.title}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingCatalog(null)}
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
                Catalogue Title *
              </label>
              <input
                type="text"
                required
                value={editingCatalog.title}
                onChange={(e) =>
                  setEditingCatalog({ ...editingCatalog, title: e.target.value })
                }
                placeholder="e.g. TUQO PRODUCT CATALOG 2025"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2 text-xs text-white focus:border-[#d31820] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Category / Section
              </label>
              <input
                type="text"
                value={editingCatalog.category || ""}
                onChange={(e) =>
                  setEditingCatalog({ ...editingCatalog, category: e.target.value })
                }
                placeholder="e.g. Machinery, Power Tools, Cleaning Accessories"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2 text-xs text-white focus:border-[#d31820] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Description
            </label>
            <textarea
              rows={2}
              value={editingCatalog.description || ""}
              onChange={(e) =>
                setEditingCatalog({ ...editingCatalog, description: e.target.value })
              }
              placeholder="e.g. Complete range of professional machinery, high pressure washers, and air compressors."
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2 text-xs text-white focus:border-[#d31820] focus:outline-none"
            />
          </div>

          {/* PDF Uploader Section */}
          <div className="rounded-xl border border-white/10 bg-[#101215] p-4">
            <PdfUploader
              label="Upload Catalogue PDF *"
              sublabel="Official PDF specification sheet or catalogue document"
              folder="tuqo/catalogs"
              value={editingCatalog.pdfUrl}
              fileSize={editingCatalog.fileSize}
              maxSizeMB={25}
              onChange={(url, fileSize) =>
                setEditingCatalog({
                  ...editingCatalog,
                  pdfUrl: url,
                  fileSize: fileSize || editingCatalog.fileSize,
                })
              }
            />
          </div>

          {/* Cover Image Upload */}
          <div className="rounded-xl border border-white/10 bg-[#101215] p-4">
            <ImageUploader
              label="Catalogue Cover Thumbnail"
              sublabel="Portrait brochure cover preview shown on the /e-catalog download page"
              recommendedResolution="800 × 1100 px (A4 Portrait)"
              aspectHint="3:4 or 1:1.38 Portrait"
              maxSizeMB={3}
              folder="tuqo/catalogs"
              value={editingCatalog.coverImage || ""}
              onChange={(url) =>
                setEditingCatalog({ ...editingCatalog, coverImage: url })
              }
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="w-32">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Display Order
              </label>
              <input
                type="number"
                value={editingCatalog.order}
                onChange={(e) =>
                  setEditingCatalog({
                    ...editingCatalog,
                    order: Number(e.target.value),
                  })
                }
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-3 py-2 text-xs text-white focus:border-[#d31820] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="cat-active"
                checked={editingCatalog.active}
                onChange={(e) =>
                  setEditingCatalog({
                    ...editingCatalog,
                    active: e.target.checked,
                  })
                }
                className="h-4 w-4 rounded border-white/20 bg-[#181a20] text-[#d31820] focus:ring-0"
              />
              <label htmlFor="cat-active" className="text-xs text-gray-300 font-semibold cursor-pointer">
                Active on Website
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setEditingCatalog(null)}
              className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#d31820] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#b0141b] disabled:opacity-50 shadow-md shadow-red-900/30"
            >
              {loading ? "Saving..." : "Save Catalogue"}
            </button>
          </div>
        </form>
      )}

      {/* Catalogues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {catalogs.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-white/10 bg-[#14161a] p-12 text-center text-gray-400">
            No catalogues in database yet. Click &quot;+ Add New Catalogue&quot; to create one.
          </div>
        ) : (
          catalogs.map((c) => (
            <div
              key={c._id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#14161a] transition hover:border-[#d31820]/40 p-5"
            >
              <div>
                {/* Header row with badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-300">
                    {c.category || "General"}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {c.pdfUrl ? (
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                        ✓ PDF Ready {c.fileSize ? `(${c.fileSize})` : ""}
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/30">
                        No PDF Attached
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        c.active ? "bg-white/10 text-white" : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {c.active ? "Active" : "Hidden"}
                    </span>
                  </div>
                </div>

                {/* Cover image or PDF preview banner */}
                <div className="relative h-40 w-full overflow-hidden rounded-xl border border-white/10 bg-[#181a20] mb-4 flex items-center justify-center">
                  {c.coverImage ? (
                    <Image
                      src={c.coverImage}
                      alt={c.title}
                      fill
                      unoptimized={c.coverImage.startsWith("http")}
                      className="object-contain p-2"
                      sizes="300px"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <div className="h-10 w-10 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center mb-1">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-[11px]">PDF Document</span>
                    </div>
                  )}
                </div>

                <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                  {c.title}
                </h4>
                {c.description && (
                  <p className="mt-1 text-xs text-gray-400 line-clamp-2">
                    {c.description}
                  </p>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-5 border-t border-white/5 pt-3 flex items-center justify-between">
                <div className="text-[11px] text-gray-500 font-mono">
                  Order: {c.order}
                </div>
                <div className="flex items-center gap-2">
                  {c.pdfUrl && (
                    <a
                      href={c.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:text-white"
                      title="Open PDF file"
                    >
                      View PDF ↗
                    </a>
                  )}
                  <button
                    onClick={() => handleStartEdit(c)}
                    className="rounded-lg border border-white/10 px-2.5 py-1 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400 hover:bg-red-500/20"
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
