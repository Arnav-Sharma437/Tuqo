"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

export interface WarrantyProductItem {
  model: string;
  serialNumber?: string;
  productName?: string;
  warrantyMonths?: number;
}

export interface WarrantyItem {
  _id: string;
  registrationId: string;
  customerName: string;
  mobile: string;
  email?: string;
  pincode: string;
  city?: string;
  state?: string;
  address?: string;
  products: WarrantyProductItem[];
  purchaseDate: string;
  source: string;
  dealerName?: string;
  dealerCity?: string;
  invoiceUrl?: string;
  status: "Active" | "Pending" | "Verified" | "Rejected";
  warrantyExpiryDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface WarrantyManagerProps {
  warranties: WarrantyItem[];
  onRefresh: () => void;
}

export function WarrantyManager({ warranties, onRefresh }: WarrantyManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedWarranty, setSelectedWarranty] = useState<WarrantyItem | null>(null);
  const [editingNotes, setEditingNotes] = useState<string>("");
  const [editingStatus, setEditingStatus] = useState<WarrantyItem["status"]>("Active");
  const [actionLoading, setActionLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Filtered warranties
  const filtered = useMemo(() => {
    return warranties.filter((w) => {
      const matchesStatus = statusFilter === "all" || w.status.toLowerCase() === statusFilter.toLowerCase();
      if (!matchesStatus) return false;

      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();

      return (
        w.registrationId.toLowerCase().includes(term) ||
        w.customerName.toLowerCase().includes(term) ||
        w.mobile.includes(term) ||
        (w.dealerName && w.dealerName.toLowerCase().includes(term)) ||
        (w.city && w.city.toLowerCase().includes(term)) ||
        (w.pincode && w.pincode.includes(term)) ||
        w.products.some(
          (p) =>
            (p.serialNumber && p.serialNumber.toLowerCase().includes(term)) ||
            p.model.toLowerCase().includes(term) ||
            (p.productName && p.productName.toLowerCase().includes(term))
        )
      );
    });
  }, [warranties, searchTerm, statusFilter]);

  // Summary Metrics
  const metrics = useMemo(() => {
    const total = warranties.length;
    const active = warranties.filter((w) => w.status === "Active").length;
    const verified = warranties.filter((w) => w.status === "Verified").length;
    const pending = warranties.filter((w) => w.status === "Pending").length;
    const totalUnits = warranties.reduce((acc, curr) => acc + (curr.products?.length || 1), 0);
    return { total, active, verified, pending, totalUnits };
  }, [warranties]);

  // Open inspection modal
  const handleInspect = (item: WarrantyItem) => {
    setSelectedWarranty(item);
    setEditingNotes(item.notes || "");
    setEditingStatus(item.status);
  };

  // Quick status update
  const handleQuickStatusChange = async (id: string, newStatus: WarrantyItem["status"]) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/warranties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Save notes & status inside modal
  const handleSaveModal = async () => {
    if (!selectedWarranty) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/warranties/${selectedWarranty._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editingStatus,
          notes: editingNotes,
        }),
      });
      if (res.ok) {
        onRefresh();
        setSelectedWarranty(null);
      }
    } catch (err) {
      console.error("Failed to update warranty:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete warranty record
  const handleDelete = async (id: string, regId: string) => {
    if (!confirm(`Are you sure you want to permanently delete registration ${regId}?`)) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/warranties/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (selectedWarranty?._id === id) setSelectedWarranty(null);
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to delete warranty:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Export to CSV
  const handleExportCsv = () => {
    if (warranties.length === 0) return;
    const headers = [
      "Registration ID",
      "Registration Date",
      "Customer Name",
      "Mobile",
      "Email",
      "Pincode",
      "City",
      "State",
      "Address",
      "Dealer Name",
      "Dealer City",
      "Purchase Date",
      "Expiry Date",
      "Status",
      "Product Models",
      "Serial Numbers",
      "Invoice URL",
      "Notes",
    ];

    const rows = warranties.map((w) => {
      const models = w.products.map((p) => p.model).join(" | ");
      const serials = w.products.map((p) => p.serialNumber || "").filter(Boolean).join(" | ") || "N/A";
      const dateFormatted = new Date(w.createdAt).toLocaleDateString();

      return [
        `"${w.registrationId}"`,
        `"${dateFormatted}"`,
        `"${(w.customerName || "").replace(/"/g, '""')}"`,
        `"${w.mobile}"`,
        `"${w.email || ""}"`,
        `"${w.pincode || ""}"`,
        `"${(w.city || "").replace(/"/g, '""')}"`,
        `"${(w.state || "").replace(/"/g, '""')}"`,
        `"${(w.address || "").replace(/"/g, '""')}"`,
        `"${(w.dealerName || "").replace(/"/g, '""')}"`,
        `"${(w.dealerCity || "").replace(/"/g, '""')}"`,
        `"${w.purchaseDate || ""}"`,
        `"${w.warrantyExpiryDate || ""}"`,
        `"${w.status}"`,
        `"${models}"`,
        `"${serials}"`,
        `"${w.invoiceUrl || ""}"`,
        `"${(w.notes || "").replace(/"/g, '""')}"`,
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tuqo-warranties-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: WarrantyItem["status"]) => {
    switch (status) {
      case "Verified":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
      case "Active":
        return "bg-blue-500/20 text-blue-400 border-blue-500/40";
      case "Pending":
        return "bg-amber-500/20 text-amber-400 border-amber-500/40";
      case "Rejected":
        return "bg-red-500/20 text-red-400 border-red-500/40";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/40";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Quick Stats */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🛡️</span>
            <span>Warranty Registrations</span>
            <span className="rounded-full bg-[#d31820]/20 border border-[#d31820]/40 px-2.5 py-0.5 text-xs text-[#ff5c62] font-mono">
              Live DB
            </span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Review customer claims, verify dealer invoices, and inspect QR barcode serial numbers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCsv}
            disabled={warranties.length === 0}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white transition disabled:opacity-50"
          >
            <span>📥</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#121418] p-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Registered</div>
          <div className="mt-1 text-2xl font-black text-white">{metrics.total}</div>
          <div className="text-[10px] text-gray-500 mt-0.5">{metrics.totalUnits} registered machine units</div>
        </div>
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Active / Valid</div>
          <div className="mt-1 text-2xl font-black text-emerald-400">{metrics.active}</div>
          <div className="text-[10px] text-emerald-500/70 mt-0.5">Under manufacturer warranty</div>
        </div>
        <div className="rounded-2xl border border-blue-500/20 bg-blue-950/10 p-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Dealer Verified</div>
          <div className="mt-1 text-2xl font-black text-blue-400">{metrics.verified}</div>
          <div className="text-[10px] text-blue-500/70 mt-0.5">Invoice checked & approved</div>
        </div>
        <div className="rounded-2xl border border-amber-500/20 bg-amber-950/10 p-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Pending Review</div>
          <div className="mt-1 text-2xl font-black text-amber-400">{metrics.pending}</div>
          <div className="text-[10px] text-amber-500/70 mt-0.5">Requires invoice check</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-2xl border border-white/10 bg-[#121418] p-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by serial #, model, customer name, mobile, dealer..."
            className="w-full rounded-xl border border-white/10 bg-[#1c1f26] py-2 pl-9 pr-8 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#1c1f26] px-3 py-2 text-xs font-semibold text-white focus:border-[#d31820] focus:outline-none"
          >
            <option value="all">All ({warranties.length})</option>
            <option value="Active">Active</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Warranties Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121418]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-[#181a20] text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
              <tr>
                <th className="px-4 py-3.5">Registration ID</th>
                <th className="px-4 py-3.5">Customer</th>
                <th className="px-4 py-3.5">Products / Serials</th>
                <th className="px-4 py-3.5">Dealer & Purchase</th>
                <th className="px-4 py-3.5">Validity</th>
                <th className="px-4 py-3.5">Invoice</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    <div className="text-3xl mb-2">🔍</div>
                    <div className="font-semibold">No warranty registrations match your criteria.</div>
                    {warranties.length === 0 && (
                      <div className="text-[11px] text-gray-600 mt-1">
                        When customers register via /warranty or scan the QR code on the packaging, records will appear here.
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const regDate = new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <tr key={item._id} className="hover:bg-white/[0.02] transition">
                      {/* Registration ID */}
                      <td className="px-4 py-3 font-mono font-bold text-white whitespace-nowrap">
                        <div className="text-red-400 hover:underline cursor-pointer" onClick={() => handleInspect(item)}>
                          {item.registrationId}
                        </div>
                        <div className="text-[10px] font-sans font-normal text-gray-500">{regDate}</div>
                      </td>

                      {/* Customer Info */}
                      <td className="px-4 py-3">
                        <div className="font-bold text-white">{item.customerName}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <a
                            href={`tel:${item.mobile}`}
                            className="font-mono text-gray-300 hover:text-white hover:underline"
                            title="Call customer"
                          >
                            📞 {item.mobile}
                          </a>
                          <a
                            href={`https://wa.me/91${item.mobile.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#25D366] hover:underline"
                            title="WhatsApp customer"
                          >
                            💬
                          </a>
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">
                          {item.city ? `${item.city}, ` : ""}
                          {item.state ? `${item.state} ` : ""}
                          ({item.pincode})
                        </div>
                      </td>

                      {/* Products */}
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          {item.products.map((p, pIdx) => (
                            <div key={pIdx} className="rounded-lg bg-black/40 border border-white/5 p-1.5">
                              <div className="font-bold text-white text-[11px]">{p.model}</div>
                              {p.serialNumber ? (
                                <div className="font-mono text-[10px] text-amber-300 tracking-wider">
                                  S/N: {p.serialNumber}
                                </div>
                              ) : (
                                <div className="text-[10px] text-gray-500 italic">
                                  Covered under Invoice
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Dealer & Purchase */}
                      <td className="px-4 py-3">
                        <div className="font-semibold text-white">{item.dealerName || "Direct / Online"}</div>
                        {item.dealerCity && (
                          <div className="text-[10px] text-gray-400">{item.dealerCity}</div>
                        )}
                        <div className="text-[10px] text-gray-500 mt-0.5">
                          Purchased: <span className="text-gray-300 font-mono">{item.purchaseDate}</span>
                        </div>
                      </td>

                      {/* Validity */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-mono text-[11px] text-white">
                          {item.warrantyExpiryDate || "6 Months"}
                        </div>
                        <div className="text-[10px] text-gray-500">Standard 6-Month Guarantee</div>
                      </td>

                      {/* Invoice Link */}
                      <td className="px-4 py-3">
                        {item.invoiceUrl ? (
                          <button
                            onClick={() => setPreviewImage(item.invoiceUrl || null)}
                            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-bold text-blue-400 hover:bg-white/10 transition"
                          >
                            <span>🧾</span>
                            <span>View Bill</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-gray-500 italic">No bill</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          value={item.status}
                          disabled={actionLoading}
                          onChange={(e) =>
                            handleQuickStatusChange(item._id, e.target.value as WarrantyItem["status"])
                          }
                          className={`rounded-lg border px-2 py-1 text-[11px] font-bold focus:outline-none ${getStatusBadge(
                            item.status
                          )} bg-[#1c1f26]`}
                        >
                          <option value="Active">Active</option>
                          <option value="Verified">Verified</option>
                          <option value="Pending">Pending</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleInspect(item)}
                            title="Inspect complete details"
                            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-gray-300 hover:bg-white/10 hover:text-white"
                          >
                            Inspect
                          </button>
                          <button
                            onClick={() => handleDelete(item._id, item.registrationId)}
                            title="Delete warranty entry"
                            className="rounded-lg border border-red-500/20 bg-red-500/10 px-2 py-1 text-[11px] font-bold text-red-400 hover:bg-red-500/20"
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Image Fullscreen Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/15 bg-[#121418] p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2 px-3">
              <span className="text-xs font-bold text-white">Purchase Invoice / Tax Bill Preview</span>
              <div className="flex items-center gap-2">
                <a
                  href={previewImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-400 hover:underline"
                >
                  Open in New Tab ↗
                </a>
                <button
                  onClick={() => setPreviewImage(null)}
                  className="rounded-lg bg-white/10 px-2 py-1 text-xs text-white hover:bg-white/20"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="relative mt-2 h-[75vh] w-[80vw] max-w-3xl flex items-center justify-center">
              {previewImage.toLowerCase().endsWith(".pdf") || previewImage.includes("/raw/") ? (
                <iframe
                  src={previewImage}
                  className="w-full h-full rounded-xl border border-white/10"
                  title="PDF Invoice"
                />
              ) : (
                <Image
                  src={previewImage}
                  alt="Warranty Invoice"
                  fill
                  className="object-contain"
                  unoptimized
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Detailed Inspection Modal */}
      {selectedWarranty && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedWarranty(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#121418] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="rounded-full bg-[#d31820]/20 border border-[#d31820]/40 px-2.5 py-0.5 text-[10px] font-mono text-[#ff5c62]">
                  {selectedWarranty.registrationId}
                </span>
                <h3 className="mt-1 text-lg font-black text-white">
                  Warranty Claim & Verification
                </h3>
                <p className="text-xs text-gray-400">
                  Registered on {new Date(selectedWarranty.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedWarranty(null)}
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-6 space-y-6 text-xs">
              {/* Customer Information */}
              <div className="rounded-2xl border border-white/10 bg-[#181a20] p-4">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 mb-3">
                  Customer Profile
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-gray-500 block">Full Name:</span>
                    <span className="font-bold text-white text-sm">{selectedWarranty.customerName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Mobile Phone:</span>
                    <a
                      href={`tel:${selectedWarranty.mobile}`}
                      className="font-bold text-blue-400 hover:underline"
                    >
                      {selectedWarranty.mobile}
                    </a>
                  </div>
                  {selectedWarranty.email && (
                    <div>
                      <span className="text-gray-500 block">Email Address:</span>
                      <span className="text-white font-mono">{selectedWarranty.email}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-500 block">Pincode:</span>
                    <span className="text-white font-mono">{selectedWarranty.pincode}</span>
                  </div>
                  {(selectedWarranty.city || selectedWarranty.state) && (
                    <div className="col-span-2">
                      <span className="text-gray-500 block">City & State:</span>
                      <span className="text-white">
                        {selectedWarranty.city} {selectedWarranty.state ? `, ${selectedWarranty.state}` : ""}
                      </span>
                    </div>
                  )}
                  {selectedWarranty.address && (
                    <div className="col-span-2">
                      <span className="text-gray-500 block">Full Street Address:</span>
                      <span className="text-white">{selectedWarranty.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Registered Units */}
              <div className="rounded-2xl border border-white/10 bg-[#181a20] p-4">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 mb-3">
                  Machine(s) Registered ({selectedWarranty.products.length})
                </h4>
                <div className="space-y-2">
                  {selectedWarranty.products.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-[#121418] p-3"
                    >
                      <div>
                        <div className="font-bold text-white text-sm">{p.model}</div>
                        {p.productName && <div className="text-gray-400 text-xs">{p.productName}</div>}
                        {p.serialNumber && (
                          <div className="mt-1 font-mono text-amber-400 font-bold">
                            Serial: {p.serialNumber}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-2 py-1 text-[10px] font-bold text-emerald-400">
                          {p.warrantyMonths || 6} Mos Warranty
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Purchase & Dealer Information */}
              <div className="rounded-2xl border border-white/10 bg-[#181a20] p-4">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 mb-3">
                  Purchase & Dealer Stamp
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-gray-500 block">Authorized Dealer:</span>
                    <span className="font-bold text-white">{selectedWarranty.dealerName || "Direct / Online"}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Dealer Location:</span>
                    <span className="text-white">{selectedWarranty.dealerCity || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Purchase Date:</span>
                    <span className="font-mono text-white">{selectedWarranty.purchaseDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Warranty Valid Until:</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {selectedWarranty.warrantyExpiryDate || "6 Months from purchase"}
                    </span>
                  </div>
                </div>

                {selectedWarranty.invoiceUrl && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-gray-500 block mb-2">Uploaded Purchase Invoice / Tax Bill:</span>
                    <div
                      onClick={() => setPreviewImage(selectedWarranty.invoiceUrl || null)}
                      className="cursor-pointer relative h-36 w-full max-w-sm rounded-xl overflow-hidden border border-white/15 bg-black"
                    >
                      <Image
                        src={selectedWarranty.invoiceUrl}
                        alt="Invoice Bill"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                        <span className="text-xs font-bold text-white bg-black/70 px-3 py-1.5 rounded-lg">
                          Click to enlarge 🔍
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Status & Admin Notes */}
              <div className="rounded-2xl border border-white/10 bg-[#181a20] p-4 space-y-4">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                  Update Verification Status & Notes
                </h4>

                <div>
                  <label className="text-gray-400 block mb-1">Status:</label>
                  <select
                    value={editingStatus}
                    onChange={(e) => setEditingStatus(e.target.value as WarrantyItem["status"])}
                    className="w-full rounded-xl border border-white/10 bg-[#121418] px-3 py-2 text-xs font-bold text-white focus:border-[#d31820] focus:outline-none"
                  >
                    <option value="Active">Active (Default active claim)</option>
                    <option value="Verified">Verified (Dealer bill & serial approved)</option>
                    <option value="Pending">Pending (Needs customer or dealer check)</option>
                    <option value="Rejected">Rejected (Invalid bill or duplicate serial)</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Internal Admin Notes:</label>
                  <textarea
                    rows={3}
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    placeholder="e.g. Checked with Sidco Tools dealer on 15 Oct, invoice verified..."
                    className="w-full rounded-xl border border-white/10 bg-[#121418] p-3 text-xs text-white placeholder-gray-600 focus:border-[#d31820] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => handleDelete(selectedWarranty._id, selectedWarranty.registrationId)}
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/20"
              >
                Delete Record
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedWarranty(null)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={handleSaveModal}
                  className="rounded-xl bg-[#d31820] px-5 py-2 text-xs font-bold text-white shadow-lg shadow-red-900/30 hover:bg-[#b0141a] disabled:opacity-50"
                >
                  {actionLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
