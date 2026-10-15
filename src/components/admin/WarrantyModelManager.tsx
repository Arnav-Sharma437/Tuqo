"use client";

import { useState } from "react";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<WarrantyModelItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
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
            name,
            code,
            category,
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
            name,
            code,
            category,
            warrantyMonths,
            order,
            active,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to add model");
      }

      setModalOpen(false);
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
      if (res.ok) onRefresh();
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
      if (res.ok) onRefresh();
    } catch (err) {
      console.error("Delete error:", err);
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

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleSyncFromCatalog}
              disabled={syncing}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-200 hover:bg-white/10 transition disabled:opacity-50"
              title="Import active products from products catalog"
            >
              <span>{syncing ? "⏳ Syncing..." : "📥 Import from Catalog"}</span>
            </button>
            <button
              onClick={openAddModal}
              className="flex items-center gap-1.5 rounded-xl bg-[#d31820] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/30 hover:bg-[#b5141a] transition"
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
              onChange={(e) => setSearch(e.target.value)}
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
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                    No equipment models found. Click &quot;+ Add New Model&quot; to create one.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
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
