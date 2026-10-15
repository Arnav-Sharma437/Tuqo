"use client";

import { useState } from "react";

export interface FaqItem {
  _id?: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
}

interface FaqManagerProps {
  faqs: FaqItem[];
  onRefresh: () => void;
}

export function FaqManager({ faqs, onRefresh }: FaqManagerProps) {
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initialFaq: FaqItem = {
    question: "",
    answer: "",
    order: faqs.length + 1,
    active: true,
  };

  const handleStartCreate = () => {
    setEditingFaq({ ...initialFaq });
    setIsCreating(true);
    setError("");
  };

  const handleStartEdit = (faq: FaqItem) => {
    setEditingFaq({ ...faq });
    setIsCreating(false);
    setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    if (!editingFaq.question.trim() || !editingFaq.answer.trim()) {
      setError("Both question and answer are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const url = isCreating
        ? "/api/admin/faqs"
        : `/api/admin/faqs/${editingFaq._id}`;
      const method = isCreating ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingFaq),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save FAQ");
      }

      setEditingFaq(null);
      setIsCreating(false);
      onRefresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving FAQ";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to permanently delete this FAQ?")) return;

    try {
      const res = await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete FAQ");
      }
      onRefresh();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete FAQ");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-gray-400">
            Manage FAQs displayed on the homepage. Questions and answers can be updated or reorganized anytime.
          </p>
        </div>
        {!editingFaq && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-2 rounded-xl bg-[#d31820] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/30 transition hover:bg-[#b0141b]"
          >
            <span>+</span> Add FAQ
          </button>
        )}
      </div>

      {/* Editor Modal / Panel */}
      {editingFaq && (
        <form
          onSubmit={handleSave}
          className="rounded-2xl border border-white/10 bg-[#14161a] p-6 space-y-6"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#d31820]">
              {isCreating ? "New FAQ" : "Edit FAQ"}
            </h3>
            <button
              type="button"
              onClick={() => setEditingFaq(null)}
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

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Question *
            </label>
            <input
              type="text"
              value={editingFaq.question}
              onChange={(e) =>
                setEditingFaq({ ...editingFaq, question: e.target.value })
              }
              placeholder="e.g. What warranty is provided with TUQO equipment?"
              required
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#181a20] px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#d31820] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Answer *
            </label>
            <textarea
              rows={4}
              value={editingFaq.answer}
              onChange={(e) =>
                setEditingFaq({ ...editingFaq, answer: e.target.value })
              }
              placeholder="Detailed answer for customers..."
              required
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
                value={editingFaq.order}
                onChange={(e) =>
                  setEditingFaq({
                    ...editingFaq,
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
                id="faq-active"
                checked={editingFaq.active}
                onChange={(e) =>
                  setEditingFaq({ ...editingFaq, active: e.target.checked })
                }
                className="h-4 w-4 rounded accent-[#d31820]"
              />
              <label htmlFor="faq-active" className="text-xs font-semibold text-gray-300 cursor-pointer">
                Active / Visible on public website
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-white/5">
            <button
              type="button"
              onClick={() => setEditingFaq(null)}
              className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#d31820] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#b0141b] disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save FAQ"}
            </button>
          </div>
        </form>
      )}

      {/* FAQs List */}
      <div className="space-y-3">
        {faqs.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#14161a] p-12 text-center text-gray-400">
            No FAQs found. Click &quot;+ Add FAQ&quot; to create one.
          </div>
        ) : (
          faqs.map((faq, idx) => (
            <div
              key={faq._id || idx}
              className="rounded-2xl border border-white/10 bg-[#14161a] p-5 transition hover:border-[#d31820]/30"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-xs font-extrabold text-[#d31820]">
                    Q
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-white">
                      {faq.question}
                    </h4>
                    <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      faq.active
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {faq.active ? "Active" : "Hidden"}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Order: <strong className="text-gray-300">{faq.order}</strong>
                  </span>
                  <button
                    onClick={() => handleStartEdit(faq)}
                    className="rounded-lg border border-white/10 px-3 py-1 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(faq._id)}
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

export default FaqManager;
