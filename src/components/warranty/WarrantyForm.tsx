"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  ShieldCheckIcon,
  QualityDiamondIcon,
  ClockIcon,
  PhoneIcon,
  WhatsAppIcon,
  ArrowRightIcon,
} from "@/components/common/Icons";

export interface WarrantyProductItem {
  model: string;
  serialNumber?: string;
  productName?: string;
  warrantyMonths: number;
}

const COMMON_MODELS = [
  "HW2020 (145 Bar / 1750W Induction High Pressure Washer)",
  "HW2200 (160 Bar / 2200W Commercial Pressure Washer)",
  "HW2500 (180 Bar / 2500W Heavy Industrial Washer)",
  "AC-50L (2.5 HP Direct Drive Air Compressor)",
  "AC-100L (3.0 HP Belt Driven Industrial Compressor)",
  "PT-AG100 (100mm 850W Heavy Angle Grinder)",
  "PT-HD26 (26mm 800W Rotary Hammer Drill)",
  "PT-DM0810 (1100W Demolition Breaker Machine)",
  "VC-30L (Stainless Steel Wet & Dry Industrial Vacuum)",
  "Other / Custom TUQO Equipment",
];

// Dedicated Public Invoice Uploader Component
function PublicInvoiceUploader({
  value,
  onChange,
  onUploadingChange,
}: {
  value: string;
  onChange: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [zoomModalOpen, setZoomModalOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);
    onUploadingChange?.(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/warranty/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload invoice.");
      }

      onChange(data.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed.";
      setError(msg);
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const isPdf =
    value?.toLowerCase().endsWith(".pdf") ||
    value?.includes("/raw/") ||
    value?.includes(".pdf");

  const handleDownload = async () => {
    if (!value) return;
    try {
      const res = await fetch(value);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      const isPdfDoc = isPdf || blob.type === "application/pdf";
      link.download = `tuqo-purchase-invoice-${Date.now()}.${isPdfDoc ? "pdf" : "jpg"}`;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch {
      window.open(value, "_blank");
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        capture="environment"
        className="hidden"
        onChange={handleFile}
      />

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
          ⚠ {error}
        </div>
      )}

      {value ? (
        <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/30 p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Click to Zoom Thumbnail */}
              <div
                onClick={() => {
                  setZoomScale(1);
                  setZoomModalOpen(true);
                }}
                className="group relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border-2 border-emerald-300 bg-white cursor-pointer shadow-sm hover:border-[#e21b23] transition-all"
                title="Click to Zoom & View Fullscreen"
              >
                {isPdf ? (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-red-50 text-red-600 font-bold text-xs">
                    <span className="text-xl">📄</span>
                    <span>PDF BILL</span>
                  </div>
                ) : (
                  <Image
                    src={value}
                    alt="Uploaded Invoice"
                    fill
                    className="object-contain transition-transform duration-200 group-hover:scale-105"
                    unoptimized
                  />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-bold text-white">
                    🔍 Zoom
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                    ✓ Invoice Attached
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-gray-800">
                  Purchase Invoice / Tax Bill Verified
                </p>
                <div className="mt-1 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setZoomScale(1);
                      setZoomModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    <span>🔍 Click to Zoom</span>
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
                  >
                    <span>📥 Download Copy</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => {
                  setZoomScale(1);
                  setZoomModalOpen(true);
                }}
                className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100 transition"
              >
                🔍 Zoom In
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="rounded-xl border border-emerald-300 bg-emerald-100/70 px-3 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-200 transition"
              >
                📥 Download
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-xs"
              >
                Change Photo / PDF
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="rounded-xl border border-red-200 bg-red-50 px-2.5 py-2 text-xs font-bold text-red-600 hover:bg-red-100"
                title="Remove uploaded bill"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
            uploading
              ? "border-[#e21b23] bg-red-50/30"
              : "border-gray-300 bg-gray-50/50 hover:border-[#e21b23] hover:bg-white"
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center justify-center gap-2 py-4">
              <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#e21b23] border-t-transparent" />
              <p className="text-xs font-bold text-gray-700">Uploading & attaching your invoice...</p>
              <p className="text-[11px] text-gray-400">Please wait a moment</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-gray-200 text-2xl shadow-xs">
                🧾
              </div>
              <div className="text-xs font-bold text-gray-900">
                Tap to Take a Photo or Upload Invoice
              </div>
              <p className="text-[11px] text-gray-500 max-w-sm">
                Upload your dealer tax invoice, GST bill, or cash receipt (JPG, PNG, WebP or PDF, Max 10MB)
              </p>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-[#111214] px-4 py-2 text-[11px] font-bold text-white shadow-xs">
                📷 Open Camera / Choose File
              </span>
            </div>
          )}
        </div>
      )}

      {/* FULLSCREEN ZOOM MODAL */}
      {zoomModalOpen && value && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          onClick={() => setZoomModalOpen(false)}
        >
          <div
            className="relative flex flex-col w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl border border-white/20 bg-[#121418] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#181a20] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-base">🧾</span>
                <span className="text-xs font-bold text-white">
                  Purchase Invoice / Tax Bill
                </span>
              </div>

              {/* Zoom In / Out Controls (for images) */}
              <div className="flex items-center gap-2">
                {!isPdf && (
                  <div className="flex items-center gap-1 rounded-xl bg-white/10 px-2 py-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setZoomScale((prev) => Math.max(0.5, prev - 0.25))}
                      className="h-6 w-6 rounded bg-white/10 text-white font-bold hover:bg-white/20 transition flex items-center justify-center"
                      title="Zoom Out (-)"
                    >
                      −
                    </button>
                    <span className="min-w-12 text-center font-mono text-[11px] font-bold text-gray-200">
                      {Math.round(zoomScale * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setZoomScale((prev) => Math.min(3, prev + 0.25))}
                      className="h-6 w-6 rounded bg-white/10 text-white font-bold hover:bg-white/20 transition flex items-center justify-center"
                      title="Zoom In (+)"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomScale(1)}
                      className="ml-1 rounded px-1.5 py-0.5 text-[10px] text-gray-400 hover:text-white"
                      title="Reset Zoom"
                    >
                      Reset
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition shadow-sm"
                >
                  <span>📥 Download Copy</span>
                </button>

                <button
                  type="button"
                  onClick={() => setZoomModalOpen(false)}
                  className="rounded-xl border border-white/15 bg-white/10 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-white/20 transition"
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body / Canvas */}
            <div className="relative flex-1 overflow-auto p-4 flex items-center justify-center min-h-[60vh] max-h-[78vh] bg-black/60">
              {isPdf ? (
                <iframe
                  src={value}
                  className="h-[74vh] w-full rounded-2xl border border-white/10 bg-white"
                  title="Invoice PDF Preview"
                />
              ) : (
                <div className="overflow-auto max-h-full max-w-full flex items-center justify-center">
                  <img
                    src={value}
                    alt="Zoomed Invoice"
                    style={{
                      transform: `scale(${zoomScale})`,
                      transformOrigin: "center center",
                    }}
                    className="max-h-[72vh] max-w-full object-contain select-none transition-transform duration-200 rounded-lg shadow-2xl"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function WarrantyForm() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"register" | "check">("register");

  // Step 1 to 4
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form Fields
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");

  const [availableModels, setAvailableModels] = useState<string[]>(COMMON_MODELS);

  // Fetch dynamic models configured by Admin in CMS
  useEffect(() => {
    async function fetchModels() {
      try {
        const res = await fetch("/api/warranty/models");
        if (res.ok) {
          const data = await res.json();
          if (data.models && data.models.length > 0) {
            const names: string[] = data.models.map((m: any) => m.name);
            if (!names.includes("Other / Custom TUQO Equipment")) {
              names.push("Other / Custom TUQO Equipment");
            }
            setAvailableModels(names);
          }
        }
      } catch (err) {
        console.warn("Using fallback warranty models:", err);
      }
    }
    fetchModels();
  }, []);

  const [products, setProducts] = useState<WarrantyProductItem[]>([
    {
      model: COMMON_MODELS[0],
      serialNumber: "",
      productName: "",
      warrantyMonths: 6,
    },
  ]);

  const [purchaseDate, setPurchaseDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [source, setSource] = useState("Authorized Dealer / Retail Store");
  const [dealerName, setDealerName] = useState("");
  const [dealerCity, setDealerCity] = useState("");
  const [invoiceUrl, setInvoiceUrl] = useState("");

  // Submission & Result States
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [registeredData, setRegisteredData] = useState<any>(null);

  // Check Status States
  const [checkQuery, setCheckQuery] = useState("");
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<any>(null);
  const [checkError, setCheckError] = useState("");

  // Pre-fill from URL parameters (e.g. ?model=...&dealer=...)
  useEffect(() => {
    const urlModel = searchParams.get("model") || searchParams.get("m");
    const urlDealer = searchParams.get("dealer") || searchParams.get("d");
    const urlSerial = searchParams.get("serial") || searchParams.get("s");

    if (urlModel || urlDealer || urlSerial) {
      if (urlDealer) setDealerName(urlDealer);
      setProducts([
        {
          model: urlModel || (availableModels[0] || COMMON_MODELS[0]),
          serialNumber: urlSerial || "",
          productName: "",
          warrantyMonths: 6,
        },
      ]);
    }
  }, [searchParams, availableModels]);

  // Product Row Management
  const addProductRow = () => {
    setProducts((prev) => [
      ...prev,
      {
        model: availableModels[0] || COMMON_MODELS[0],
        serialNumber: "",
        productName: "",
        warrantyMonths: 6,
      },
    ]);
  };

  const removeProductRow = (idx: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateProductRow = (idx: number, field: keyof WarrantyProductItem, val: any) => {
    setProducts((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  // Step Navigations with Validation
  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!customerName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    const cleanMobile = mobile.replace(/\D/g, "");
    if (cleanMobile.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!pincode.trim() || pincode.trim().length < 6) {
      setErrorMsg("Please enter a valid 6-digit postal pincode.");
      return;
    }
    if (!city.trim()) {
      setErrorMsg("Please enter your City / District.");
      return;
    }
    if (!state.trim()) {
      setErrorMsg("Please enter your State.");
      return;
    }
    setStep(2);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleProceedToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    for (let i = 0; i < products.length; i++) {
      if (!products[i].model.trim()) {
        setErrorMsg(`Please select the Equipment Model for Item #${i + 1}.`);
        return;
      }
      if (
        products[i].model === "Other / Custom TUQO Equipment" &&
        !products[i].productName?.trim()
      ) {
        setErrorMsg(`Please enter the Custom Equipment / Model Name for Item #${i + 1}.`);
        return;
      }
    }
    setStep(3);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleProceedToStep4 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!purchaseDate) {
      setErrorMsg("Please select your date of purchase.");
      return;
    }
    if (!dealerName.trim()) {
      setErrorMsg("Please enter the Dealer / Store Name.");
      return;
    }
    if (!dealerCity.trim()) {
      setErrorMsg("Please enter the Dealer City / Location.");
      return;
    }
    if (!invoiceUrl || !invoiceUrl.trim()) {
      setErrorMsg("Invoice upload is mandatory. Please attach a photo or PDF of your purchase bill to proceed.");
      return;
    }
    setStep(4);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  // Submit to backend
  const handleActivateWarranty = async () => {
    setSubmitting(true);
    setErrorMsg("");
    try {
      const payload = {
        customerName: customerName.trim(),
        mobile: mobile.trim(),
        email: email.trim(),
        pincode: pincode.trim(),
        city: city.trim(),
        state: state.trim(),
        address: address.trim(),
        products: products.map((p) => ({
          model:
            p.model === "Other / Custom TUQO Equipment" && p.productName?.trim()
              ? p.productName.trim()
              : p.model,
          serialNumber: (p.serialNumber || "").trim().toUpperCase(),
          warrantyMonths: 6,
        })),
        purchaseDate,
        source,
        dealerName: dealerName.trim(),
        dealerCity: dealerCity.trim(),
        invoiceUrl: invoiceUrl.trim(),
      };

      const res = await fetch("/api/warranty/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to activate warranty");
      }

      setRegisteredData(data.warranty);
      setStep(5); // Success step
      window.scrollTo({ top: 200, behavior: "smooth" });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  // Check Warranty Handler
  const handleCheckWarranty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkQuery.trim()) return;
    setChecking(true);
    setCheckError("");
    setCheckResult(null);

    try {
      const res = await fetch(`/api/warranty/check?query=${encodeURIComponent(checkQuery.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.success || !data.found) {
        throw new Error(data.message || data.error || "No warranty record found.");
      }
      setCheckResult(data.warranty);
    } catch (err: unknown) {
      setCheckError(err instanceof Error ? err.message : "Unable to verify warranty.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="w-full">
      {/* Tab Switcher: Register vs Status */}
      <div className="mx-auto max-w-xl mb-10 flex rounded-2xl bg-gray-100 p-1.5 border border-gray-200">
        <button
          type="button"
          onClick={() => {
            setActiveTab("register");
            setErrorMsg("");
          }}
          className={`flex-1 py-3 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all ${
            activeTab === "register"
              ? "bg-[#111214] text-white shadow-md"
              : "text-gray-600 hover:text-black"
          }`}
        >
          📝 Register New Product
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("check");
            setCheckError("");
          }}
          className={`flex-1 py-3 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all ${
            activeTab === "check"
              ? "bg-[#111214] text-white shadow-md"
              : "text-gray-600 hover:text-black"
          }`}
        >
          🔍 Check Warranty Status
        </button>
      </div>

      {/* ================= SECTION A: CHECK WARRANTY STATUS ================= */}
      {activeTab === "check" && (
        <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
          <div className="text-center mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e21b23]">
              VERIFY PROTECTION
            </span>
            <h3 className="mt-1 text-2xl font-black uppercase text-[#111214]">
              Check Warranty Status
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              Enter your Registered Mobile Number or Registration ID (e.g. TUQO-WR-2026-XXXX).
            </p>
          </div>

          <form onSubmit={handleCheckWarranty} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={checkQuery}
                onChange={(e) => setCheckQuery(e.target.value)}
                placeholder="e.g. 9342466860 or TUQO-WR-2026-XXXX"
                className="w-full rounded-2xl border-2 border-gray-300 bg-gray-50/50 py-3.5 pl-4 pr-28 text-sm font-bold text-gray-900 placeholder-gray-400 focus:border-[#e21b23] focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={checking}
                className="absolute right-2 top-2 bottom-2 rounded-xl bg-[#e21b23] px-5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#b8141a] transition-all disabled:opacity-50"
              >
                {checking ? "Checking..." : "Verify"}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {checkError && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
              <div className="font-bold mb-1">⚠ Verification Notice</div>
              {checkError}
            </div>
          )}

          {/* Verification Result */}
          {checkResult && (
            <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-50/20 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                    STATUS: ACTIVE
                  </span>
                  <h4 className="text-lg font-black text-gray-900">
                    TUQO 6-Month Official Warranty
                  </h4>
                </div>
                <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-black text-white">
                  ✓ Protected
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-400 block">Registration ID:</span>
                  <span className="font-mono font-bold text-gray-900">{checkResult.registrationId}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Customer:</span>
                  <span className="font-bold text-gray-900">{checkResult.customerName} ({checkResult.mobile})</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Purchase Date:</span>
                  <span className="font-bold text-gray-900">{checkResult.purchaseDate}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Valid Until:</span>
                  <span className="font-bold text-emerald-800">{checkResult.warrantyExpiryDate || "6 Months from Purchase"}</span>
                </div>
                {checkResult.dealerName && (
                  <div className="col-span-2">
                    <span className="text-gray-400 block">Authorized Dealer:</span>
                    <span className="font-bold text-gray-900">{checkResult.dealerName}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-emerald-500/20">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600 block mb-2">
                  Covered Equipment:
                </span>
                <div className="space-y-1.5">
                  {checkResult.products?.map((p: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between rounded-xl bg-white p-2.5 border border-emerald-200 text-xs">
                      <span className="font-bold text-gray-900">{p.model}</span>
                      <span className="text-emerald-700 font-semibold text-[11px]">6 Months Warranty</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= SECTION B: REGISTER PRODUCT FLOW ================= */}
      {activeTab === "register" && (
        <div className="mx-auto max-w-3xl">
          {/* Multi-step progress indicator */}
          {step < 5 && (
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[
                  { num: 1, label: "Customer Info" },
                  { num: 2, label: "Equipment" },
                  { num: 3, label: "Invoice & Dealer" },
                  { num: 4, label: "Review & Activate" },
                ].map((s, idx) => (
                  <div key={s.num} className="flex-1 flex flex-col items-center relative">
                    {/* Connecting line */}
                    {idx > 0 && (
                      <div
                        className={`absolute top-4 -left-1/2 w-full h-[3px] -z-0 transition-all ${
                          step >= s.num ? "bg-[#e21b23]" : "bg-gray-200"
                        }`}
                      />
                    )}
                    <div
                      className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-black transition-all ${
                        step === s.num
                          ? "bg-[#e21b23] text-white ring-4 ring-red-100 shadow-md"
                          : step > s.num
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step > s.num ? "✓" : s.num}
                    </div>
                    <span
                      className={`mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center ${
                        step === s.num ? "text-[#e21b23]" : "text-gray-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-6 rounded-2xl border border-red-300 bg-red-50 p-4 text-xs font-bold text-red-700 flex items-center gap-2">
              <span>⚠</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: CUSTOMER CONTACT */}
          {step === 1 && (
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e21b23]">
                  STEP 1 OF 4
                </span>
                <h3 className="mt-1 text-2xl font-black uppercase text-[#111214]">
                  Customer Information
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Please enter your contact information to bind warranty ownership.
                </p>
              </div>

              <form onSubmit={handleProceedToStep2} className="space-y-4">
                <div>
                  <label className="flex items-center text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5 h-5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar / Precision Auto Workshop"
                    className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#e21b23] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5 h-5">
                      <span>Mobile Number *</span>
                      <span className="text-[10px] font-medium text-gray-400 normal-case">(For SMS & Status)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                        placeholder="9876543210"
                        className="w-full rounded-xl border border-gray-300 bg-gray-50/50 py-3 pl-12 pr-4 text-xs sm:text-sm font-bold text-gray-900 focus:border-[#e21b23] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5 h-5">
                      <span>Email Address</span>
                      <span className="text-[10px] font-medium text-gray-400 normal-case">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#e21b23] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="flex items-center text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5 h-5">
                      Postal Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                      placeholder="e.g. 641021"
                      className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm font-bold text-gray-900 focus:border-[#e21b23] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5 h-5">
                      City / District *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Coimbatore"
                      className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#e21b23] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5 h-5">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Tamil Nadu"
                      className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#e21b23] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#e21b23] py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-md shadow-red-900/20 transition-all hover:bg-[#b8141a]"
                  >
                    <span>Continue to Equipment Details</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: EQUIPMENT TO REGISTER */}
          {step === 2 && (
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e21b23]">
                  STEP 2 OF 4
                </span>
                <h3 className="mt-1 text-2xl font-black uppercase text-[#111214]">
                  Equipment to Register
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Select your TUQO equipment model. All eligible models receive 6 months official warranty coverage.
                </p>
              </div>

              <form onSubmit={handleProceedToStep3} className="space-y-6">
                {products.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-2xl border border-gray-200 bg-gray-50/40 p-5 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-gray-700">
                        Equipment #{idx + 1}
                      </span>
                      {products.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProductRow(idx)}
                          className="text-xs font-bold text-red-600 hover:underline"
                        >
                          ✕ Remove
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5 h-5">
                          Select Machine / Equipment Model *
                        </label>
                        <select
                          value={item.model}
                          onChange={(e) => updateProductRow(idx, "model", e.target.value)}
                          className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#e21b23] focus:outline-none"
                        >
                          {availableModels.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>

                      {item.model === "Other / Custom TUQO Equipment" && (
                        <div className="pt-1">
                          <label className="flex items-center text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5 h-5">
                            Specify Equipment / Model Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={item.productName || ""}
                            onChange={(e) => updateProductRow(idx, "productName", e.target.value)}
                            placeholder="e.g. TUQO High Speed Sander 1200W"
                            className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#e21b23] focus:outline-none"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-700 font-semibold">
                      <span>🛡️</span>
                      <span>Eligible for 6 Months Official Manufacturer Warranty</span>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addProductRow}
                  className="w-full rounded-xl border-2 border-dashed border-gray-300 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 hover:border-[#e21b23] hover:text-[#e21b23] transition"
                >
                  + Add Another Equipment (Shared Invoice)
                </button>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-xl border border-gray-300 bg-gray-50 px-6 py-3.5 text-xs font-bold uppercase text-gray-700 hover:bg-gray-100"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#e21b23] py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-md shadow-red-900/20 transition-all hover:bg-[#b8141a]"
                  >
                    <span>Continue to Invoice & Dealer</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: PURCHASE, DEALER & MANDATORY INVOICE UPLOAD */}
          {step === 3 && (
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e21b23]">
                  STEP 3 OF 4
                </span>
                <h3 className="mt-1 text-2xl font-black uppercase text-[#111214]">
                  Invoice & Dealer Details
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Uploading your purchase invoice is mandatory to validate your 6-month warranty claim.
                </p>
              </div>

              <form onSubmit={handleProceedToStep4} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5 h-5">
                      Date of Purchase *
                    </label>
                    <input
                      type="date"
                      required
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
                      max={new Date().toISOString().split("T")[0]}
                      className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#e21b23] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5 h-5">
                      Source of Purchase *
                    </label>
                    <select
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#e21b23] focus:bg-white focus:outline-none"
                    >
                      <option value="Authorized Dealer / Retail Store">
                        Authorized Dealer / Hardware Store
                      </option>
                      <option value="Direct from Factory / Representative">
                        Direct from TUQO Representative
                      </option>
                      <option value="Online Marketplace (Amazon / Flipkart)">
                        Online Marketplace
                      </option>
                      <option value="Industrial Supply Contractor">
                        Industrial Supply Contractor
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5 h-5">
                      Dealer / Store Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={dealerName}
                      onChange={(e) => setDealerName(e.target.value)}
                      placeholder="e.g. Sidco Industrial Tools"
                      className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#e21b23] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5 h-5">
                      Dealer City / Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={dealerCity}
                      onChange={(e) => setDealerCity(e.target.value)}
                      placeholder="e.g. Coimbatore / Chennai"
                      className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#e21b23] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* MANDATORY INVOICE UPLOAD */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-900">
                      Upload Purchase Invoice / Tax Bill * (Mandatory)
                    </label>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                      Required
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mb-3">
                    Please upload a clear photo or PDF of your purchase invoice or cash bill from the dealer.
                  </p>

                  <PublicInvoiceUploader
                    value={invoiceUrl}
                    onChange={(url) => setInvoiceUrl(url)}
                  />
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="rounded-xl border border-gray-300 bg-gray-50 px-6 py-3.5 text-xs font-bold uppercase text-gray-700 hover:bg-gray-100"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#e21b23] py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-md shadow-red-900/20 transition-all hover:bg-[#b8141a]"
                  >
                    <span>Review & Activate</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 4: QUICK REVIEW & ACTIVATE */}
          {step === 4 && (
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e21b23]">
                  STEP 4 OF 4
                </span>
                <h3 className="mt-1 text-2xl font-black uppercase text-[#111214]">
                  Quick Review
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Please review your details before activating your 6-month official warranty.
                </p>
              </div>

              {/* Review Cards */}
              <div className="space-y-4">
                <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
                    <span className="text-xs font-black uppercase text-gray-800">
                      Customer Profile
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-bold text-[#e21b23] hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-400 block">Name:</span>
                      <span className="font-bold text-gray-900">{customerName}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Mobile:</span>
                      <span className="font-bold text-gray-900">+91 {mobile}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Pincode:</span>
                      <span className="font-bold text-gray-900">{pincode}</span>
                    </div>
                    {email && (
                      <div>
                        <span className="text-gray-400 block">Email:</span>
                        <span className="font-bold text-gray-900">{email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
                    <span className="text-xs font-black uppercase text-gray-800">
                      Registered Equipment ({products.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs font-bold text-[#e21b23] hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="space-y-2 text-xs">
                    {products.map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded-xl bg-white p-3 border border-gray-200">
                        <div>
                          <div className="font-bold text-gray-900">
                            {p.model === "Other / Custom TUQO Equipment" && p.productName ? p.productName : p.model}
                          </div>
                          {p.model === "Other / Custom TUQO Equipment" && (
                            <div className="text-gray-400 text-[11px]">Custom Equipment</div>
                          )}
                        </div>
                        <span className="text-emerald-700 font-bold text-[11px]">6 Months Warranty</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
                    <span className="text-xs font-black uppercase text-gray-800">
                      Purchase & Invoice
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="text-xs font-bold text-[#e21b23] hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-400 block">Purchase Date:</span>
                      <span className="font-bold text-gray-900">{purchaseDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Warranty Period:</span>
                      <span className="font-bold text-emerald-700">6 Months Official Coverage</span>
                    </div>
                    {dealerName && (
                      <div className="col-span-2">
                        <span className="text-gray-400 block">Dealer / Store:</span>
                        <span className="font-bold text-gray-900">
                          {dealerName} {dealerCity ? `(${dealerCity})` : ""}
                        </span>
                      </div>
                    )}
                    <div className="col-span-2 pt-2 border-t border-gray-200">
                      <span className="text-gray-400 block mb-1">Attached Invoice:</span>
                      <a
                        href={invoiceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline"
                      >
                        <span>🧾 View Attached Invoice Bill</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="rounded-xl border border-gray-300 bg-gray-50 px-6 py-3.5 text-xs font-bold uppercase text-gray-700 hover:bg-gray-100"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleActivateWarranty}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#e21b23] py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-red-900/30 transition-all hover:bg-[#b8141a] disabled:opacity-50"
                >
                  <span>{submitting ? "Activating Warranty..." : "Activate 6-Month Warranty Now"}</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS & DIGITAL WARRANTY CERTIFICATE */}
          {step === 5 && registeredData && (
            <div className="rounded-3xl border-2 border-emerald-500/40 bg-white p-6 sm:p-10 shadow-xl space-y-6">
              {/* Top Banner */}
              <div className="text-center pb-6 border-b border-gray-200">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
                  🛡️
                </div>
                <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-800">
                  WARRANTY ACTIVATED SUCCESSFULLY
                </span>
                <h3 className="mt-2 text-2xl sm:text-3xl font-black uppercase text-[#111214]">
                  Digital Warranty Certificate
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Your official 6-month TUQO manufacturer warranty is now live in our system.
                </p>
              </div>

              {/* Certificate Box */}
              <div
                id="printable-certificate"
                className="relative overflow-hidden rounded-2xl border-2 border-[#111214] bg-[#0a0b0e] p-6 text-white"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-[#e21b23] uppercase">
                      OFFICIAL TUQO WARRANTY CERTIFICATE
                    </span>
                    <div className="text-xs font-bold text-gray-400">
                      REGISTRATION ID:
                    </div>
                    <div className="font-mono text-xl font-black text-white tracking-wider">
                      {registeredData.registrationId}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="rounded bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 text-[11px] font-black text-emerald-400">
                      ✓ ACTIVE
                    </span>
                    <span className="text-emerald-400 block text-[11px] mt-0.5">6 Months Coverage</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-b border-white/10 text-xs">
                  <div>
                    <span className="text-gray-500 block">Customer Name:</span>
                    <span className="font-bold text-white">{registeredData.customerName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Mobile Phone:</span>
                    <span className="font-mono font-bold text-white">+91 {registeredData.mobile}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Purchase Date:</span>
                    <span className="font-mono text-white">{registeredData.purchaseDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Warranty Valid Until:</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {registeredData.warrantyExpiryDate || "6 Months from purchase"}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-gray-500 block">Authorized Dealer:</span>
                    <span className="text-white font-semibold">
                      {registeredData.dealerName || "Direct / Authorized Dealer"}
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Registered Equipment Units:
                  </span>
                  <div className="space-y-1.5">
                    {registeredData.products?.map((p: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 p-2 text-xs"
                      >
                        <span className="font-bold text-white">{p.model}</span>
                        <span className="text-emerald-400 text-[10px] font-bold">6 Mos Warranty</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Certificate Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:flex-1 rounded-xl bg-[#111214] py-3 text-xs font-black uppercase tracking-wider text-white hover:bg-black transition shadow-md"
                >
                  🖨️ Print / Download Certificate
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setCustomerName("");
                    setMobile("");
                    setInvoiceUrl("");
                    setProducts([
                      {
                        model: COMMON_MODELS[0],
                        serialNumber: "",
                        productName: "",
                        warrantyMonths: 6,
                      },
                    ]);
                    setRegisteredData(null);
                  }}
                  className="w-full sm:w-auto rounded-xl border border-gray-300 bg-white px-5 py-3 text-xs font-bold uppercase text-gray-700 hover:bg-gray-100"
                >
                  Register Another Product
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
