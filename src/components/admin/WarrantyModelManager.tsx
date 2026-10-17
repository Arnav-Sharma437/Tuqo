"use client";

import { useState, useMemo } from "react";

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

export interface WarrantyModelItem {
  _id: string;
  name: string;
  code?: string;
  category?: string;
  warrantyMonths?: number;
  order: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface WarrantyModelManagerProps {
  models: WarrantyModelItem[];
  onRefresh: () => void;
}

export function WarrantyModelManager({ models, onRefresh }: WarrantyModelManagerProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<WarrantyModelItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("Power Tools");
  const [warrantyMonths, setWarrantyMonths] = useState(6);
  const [order, setOrder] = useState(0);
  const [active, setActive] = useState(true);

  const openAddModal = () => {
    setEditingModel(null);
    setName("");
    setCode("");
    setCategory("Power Tools");
    setWarrantyMonths(6);
    setOrder(models.length + 1);
    setActive(true);
    setStatusMsg(null);
    setModalOpen(true);
  };

  const openEditModal = (item: WarrantyModelItem) => {
    setEditingModel(item);
    setName(item.name);
    setCode(item.code || "");
    setCategory(item.category || "Power Tools");
    setWarrantyMonths(item.warrantyMonths || 6);
    setOrder(item.order || 0);
    setActive(item.active);
    setStatusMsg(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    setStatusMsg(null);

    try {
      if (editingModel) {
        // PUT update
        const res = await fetch(`/api/admin/warranty-models/${editingModel._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            code: code.trim(),
            category: category.trim(),
            warrantyMonths,
            order,
            active,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update model");
      } else {
        // POST create
        const res = await fetch("/api/admin/warranty-models", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            code: code.trim(),
            category: category.trim(),
            warrantyMonths,
            order,
            active,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to add model");
      }

      setModalOpen(false);
      setCurrentPage(1);
      onRefresh();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to save" });
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (item: WarrantyModelItem) => {
    try {
      const res = await fetch(`/api/admin/warranty-models/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !item.active }),
      });
      if (res.ok) {
        onRefresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update status");
      }
    } catch (err) {
      console.error("Toggle active error:", err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete model "${name}"? Customers will no longer see it in the warranty form.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/warranty-models/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        onRefresh();
      } else {
        alert(data.error || "Failed to delete model");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete model. Please check network connection.");
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete ALL equipment models? You will start with a clean empty list.")) {
      return;
    }

    setDeletingAll(true);
    try {
      const res = await fetch("/api/admin/warranty-models", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_all" }),
      });
      const data = await res.json();
      if (res.ok) {
        onRefresh();
      } else {
        alert(data.error || "Failed to delete all models.");
      }
    } catch (err) {
      console.error("Delete all error:", err);
      alert("Failed to delete models. Please try again.");
    } finally {
      setDeletingAll(false);
    }
  };

  const handleRestoreDefaults = async () => {
    if (!window.confirm("Do you want to restore the sample default equipment models?")) {
      return;
    }

    setRestoring(true);
    try {
      const res = await fetch("/api/admin/warranty-models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "restore_defaults" }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Default models restored successfully!");
        onRefresh();
      } else {
        alert(data.error || "Failed to restore defaults.");
      }
    } catch (err) {
      console.error("Restore defaults error:", err);
      alert("Failed to restore default models.");
    } finally {
      setRestoring(false);
    }
  };

  const handleSyncFromCatalog = async () => {
    if (!window.confirm("Do you want to import all active products from the Product Catalog into Warranty Models? Existing models will not be duplicated.")) {
      return;
    }

    setSyncing(true);
    try {
      const res = await fetch("/api/admin/warranty-models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync_from_products" }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Sync completed successfully!");
        onRefresh();
      } else {
        alert(data.error || "Sync failed");
      }
    } catch (err) {
      console.error("Sync error:", err);
    } finally {
      setSyncing(false);
    }
  };

  const filtered = models.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      (m.code && m.code.toLowerCase().includes(q)) ||
      (m.category && m.category.toLowerCase().includes(q))
    );
  });

  const totalPages = pageSize === -1 ? 1 : Math.max(1, Math.ceil(filtered.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedModels = useMemo(() => {
    if (pageSize === -1) return filtered;
    const start = (safeCurrentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safeCurrentPage, pageSize]);

  const activeCount = models.filter((m) => m.active).length;

  return (
    <div className="space-y-6">
      {/* Top Banner / Controls */}
      <div className="rounded-2xl border border-white/10 bg-[#121418] p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚙️</span>
              <div>
                <h2 className="text-lg font-black uppercase tracking-wider text-white">
                  Equipment Models Management
                </h2>
                <p className="text-xs text-gray-400">
                  Control which machine & equipment models appear in the customer Warranty Registration dropdown.
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3 text-xs">
              <span className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1 font-semibold text-gray-300">
                Total Models: <strong className="text-white">{models.length}</strong>
              </span>
              <span className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 font-semibold text-emerald-400">
                Active in Form: <strong>{activeCount}</strong>
              </span>
              <span className="rounded-md bg-red-500/10 border border-red-500/20 px-2.5 py-1 font-semibold text-red-400">
                Hidden: <strong>{models.length - activeCount}</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {models.length > 0 && (
              <button
                onClick={handleDeleteAll}
                disabled={deletingAll}
                className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/20 transition disabled:opacity-50 cursor-pointer"
                title="Delete all models to start with a clean list"
              >
                <span>{deletingAll ? "⏳ Deleting..." : "🗑 Clear All"}</span>
              </button>
            )}
            <button
              onClick={handleRestoreDefaults}
              disabled={restoring}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-white/10 hover:text-white transition disabled:opacity-50 cursor-pointer"
              title="Restore sample default models"
            >
              <span>{restoring ? "⏳ Restoring..." : "↺ Restore Defaults"}</span>
            </button>
            <button
              onClick={handleSyncFromCatalog}
              disabled={syncing}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-200 hover:bg-white/10 transition disabled:opacity-50 cursor-pointer"
              title="Import active products from products catalog"
            >
              <span>{syncing ? "⏳ Syncing..." : "📥 Import from Catalog"}</span>
            </button>
            <button
              onClick={openAddModal}
              className="flex items-center gap-1.5 rounded-xl bg-[#d31820] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/30 hover:bg-[#b5141a] transition cursor-pointer"
            >
              <span>+ Add New Model</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-5 border-t border-white/5 pt-4">
          <div className="relative max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by model name, code (e.g. HW2020), or category..."
              className="w-full rounded-xl border border-white/10 bg-black/40 py-2 pl-9 pr-4 text-xs font-semibold text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Models Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121418]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/5 uppercase tracking-wider text-gray-400 font-bold">
              <tr>
                <th className="px-4 py-3.5">Order</th>
                <th className="px-4 py-3.5">Model Name & Code</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Coverage</th>
                <th className="px-4 py-3.5 text-center">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto space-y-3">
                      <span className="text-3xl">📦</span>
                      <p className="text-sm font-bold text-gray-300">
                        {search ? "No matching models found for this search." : "No equipment models configured yet."}
                      </p>
                      <p className="text-xs text-gray-500">
                        {search
                          ? "Try a different search term or clear the search filter."
                          : "Add your equipment models using '+ Add New Model', import from your product catalog, or restore defaults."}
                      </p>
                      {!search && (
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                          <button
                            onClick={openAddModal}
                            className="rounded-xl bg-[#d31820] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#b5141a] cursor-pointer"
                          >
                            + Add Model
                          </button>
                          <button
                            onClick={handleSyncFromCatalog}
                            disabled={syncing}
                            className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-white/10 cursor-pointer"
                          >
                            📥 Import Catalog
                          </button>
                          <button
                            onClick={handleRestoreDefaults}
                            disabled={restoring}
                            className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-white/10 cursor-pointer"
                          >
                            ↺ Restore Defaults
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedModels.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.02] transition">
                    <td className="px-4 py-3.5 font-mono text-gray-400">
                      #{item.order}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-white text-sm">
                        {item.name}
                      </div>
                      {item.code && (
                        <div className="mt-0.5 font-mono text-[11px] text-gray-400">
                          SKU / Code: {item.code}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="rounded-md bg-white/5 border border-white/10 px-2 py-1 font-semibold text-gray-300">
                        {item.category || "General"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-emerald-400">
                      {item.warrantyMonths || 6} Months
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <button
                        onClick={() => toggleActive(item)}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold transition ${
                          item.active
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                            : "bg-gray-500/20 text-gray-400 border border-gray-500/40 hover:bg-gray-500/30"
                        }`}
                        title="Click to toggle visibility in warranty form"
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${item.active ? "bg-emerald-400" : "bg-gray-400"}`} />
                        <span>{item.active ? "Active" : "Hidden"}</span>
                      </button>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id, item.name)}
                          className="rounded-lg border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Models Pagination Footer */}
        {filtered.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 px-4 py-3 bg-[#15181f]">
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
              <span>
                Showing{" "}
                <strong className="text-white">
                  {pageSize === -1 ? 1 : (safeCurrentPage - 1) * pageSize + 1}
                </strong>{" "}
                to{" "}
                <strong className="text-white">
                  {pageSize === -1 ? filtered.length : Math.min(safeCurrentPage * pageSize, filtered.length)}
                </strong>{" "}
                of <strong className="text-white">{filtered.length}</strong> models
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
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={-1}>All ({filtered.length})</option>
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
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#16181f] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-black uppercase tracking-wider text-white">
                {editingModel ? "Edit Equipment Model" : "Add Equipment Model"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            {statusMsg && (
              <div
                className={`mt-4 rounded-xl p-3 text-xs font-bold ${
                  statusMsg.type === "error"
                    ? "bg-red-500/20 text-red-300 border border-red-500/30"
                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                }`}
              >
                {statusMsg.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Model Name * (As Shown in Dropdown)
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. HW2020 (145 Bar / 1750W Induction High Pressure Washer)"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Model Code / SKU
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. HW2020"
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. High Pressure Washers"
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Warranty Period (Months)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={warrantyMonths}
                    onChange={(e) => setWarrantyMonths(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-[#d31820] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Display Order (Ascending)
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-[#d31820] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="activeToggle"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#d31820]"
                />
                <label htmlFor="activeToggle" className="text-xs font-bold text-gray-300 cursor-pointer">
                  Active (Show this model in customer warranty form)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-gray-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#d31820] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/30 hover:bg-[#b5141a] transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingModel ? "Update Model" : "Create Model"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
