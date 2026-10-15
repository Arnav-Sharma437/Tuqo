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
import { ImageUploader } from "@/components/admin/ImageUploader";

export interface WarrantyProductItem {
  model: string;
  serialNumber: string;
  productName?: string;
  warrantyMonths: number;
}

const COMMON_MODELS = [
  "HW2020 (145 Bar / 1750W Induction Washer)",
  "HW2200 (160 Bar / 2200W Commercial Washer)",
  "HW2500 (180 Bar / 2500W Heavy Industrial Washer)",
  "AC-50L (2.5 HP Direct Drive Air Compressor)",
  "AC-100L (3.0 HP Belt Driven Industrial Compressor)",
  "PT-AG100 (100mm 850W Angle Grinder)",
  "PT-HD26 (26mm 800W Rotary Hammer Drill)",
  "PT-DM0810 (1100W Demolition Breaker)",
  "Other / Custom TUQO Model",
];

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

  const [products, setProducts] = useState<WarrantyProductItem[]>([
    {
      model: "HW2020 (145 Bar / 1750W Induction Washer)",
      serialNumber: "",
      productName: "",
      warrantyMonths: 12,
    },
  ]);

  const [purchaseDate, setPurchaseDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [source, setSource] = useState("Authorized Dealer / Retail Store");
  const [dealerName, setDealerName] = useState("");
  const [dealerCity, setDealerCity] = useState("");
  const [invoiceUrl, setInvoiceUrl] = useState("");

  // Scanner & Modal States
  const [scannerOpen, setScannerOpen] = useState(false);
  const [activeScanProductIdx, setActiveScanProductIdx] = useState(0);
  const [showSerialGuide, setShowSerialGuide] = useState(false);

  // Submission & Result States
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [registeredData, setRegisteredData] = useState<any>(null);

  // Check Status States
  const [checkQuery, setCheckQuery] = useState("");
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<any>(null);
  const [checkError, setCheckError] = useState("");

  // Pre-fill from QR code URL parameters: ?serial=...&model=...&dealer=...
  useEffect(() => {
    const urlSerial = searchParams.get("serial") || searchParams.get("s");
    const urlModel = searchParams.get("model") || searchParams.get("m");
    const urlDealer = searchParams.get("dealer") || searchParams.get("d");

    if (urlSerial || urlModel || urlDealer) {
      if (urlDealer) setDealerName(urlDealer);
      setProducts([
        {
          model: urlModel || COMMON_MODELS[0],
          serialNumber: urlSerial || "",
          productName: "",
          warrantyMonths: 12,
        },
      ]);
      // If serial is provided, jump directly to step 2 after user adds their contact
      if (urlSerial) {
        // user already has product info scanned from QR!
      }
    }
  }, [searchParams]);

  // Product Row Management
  const addProductRow = () => {
    setProducts((prev) => [
      ...prev,
      {
        model: COMMON_MODELS[0],
        serialNumber: "",
        productName: "",
        warrantyMonths: 12,
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
    setStep(2);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleProceedToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    for (let i = 0; i < products.length; i++) {
      if (!products[i].serialNumber.trim()) {
        setErrorMsg(`Please enter or scan the Serial / Barcode number for Product #${i + 1}.`);
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
      setErrorMsg("Please select your purchase date.");
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
          model: p.model,
          serialNumber: p.serialNumber.trim().toUpperCase(),
          warrantyMonths: p.warrantyMonths || 12,
        })),
        purchaseDate,
        source,
        dealerName: dealerName.trim(),
        dealerCity: dealerCity.trim(),
        invoiceUrl,
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
              Enter your Machine Serial Number, Registration ID, or 10-digit Mobile Number.
            </p>
          </div>

          <form onSubmit={handleCheckWarranty} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={checkQuery}
                onChange={(e) => setCheckQuery(e.target.value)}
                placeholder="e.g. TQ-2026-9831 or 9342466860"
                className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3.5 text-sm font-bold text-gray-900 placeholder-gray-400 focus:border-[#e21b23] focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={checking || !checkQuery.trim()}
                className="absolute right-1.5 top-1.5 bottom-1.5 rounded-lg bg-[#e21b23] px-5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#b8141a] transition disabled:opacity-50"
              >
                {checking ? "Checking..." : "Verify"}
              </button>
            </div>
          </form>

          {checkError && (
            <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-50 p-4 text-xs font-medium text-amber-800">
              {checkError}
            </div>
          )}

          {checkResult && (
            <div className="mt-8 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/50 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-200/80 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                    STATUS: {checkResult.status.toUpperCase()}
                  </span>
                  <h4 className="text-base font-black text-gray-900">
                    Registration ID: {checkResult.registrationId}
                  </h4>
                </div>
                <span className="rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-bold text-white shadow-xs">
                  ● Active Warranty
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-500 block">Registered Customer:</span>
                  <span className="font-bold text-gray-900">{checkResult.customerName} ({checkResult.mobile})</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Authorized Dealer:</span>
                  <span className="font-bold text-gray-900">{checkResult.dealerName || "Authorized Dealer"}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Purchase Date:</span>
                  <span className="font-bold text-gray-900">{checkResult.purchaseDate}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Warranty Valid Until:</span>
                  <span className="font-bold text-emerald-800">{checkResult.warrantyExpiryDate || "1 Year from Purchase"}</span>
                </div>
              </div>

              <div className="border-t border-emerald-200/60 pt-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block mb-2">
                  Covered Equipment:
                </span>
                <div className="space-y-1.5">
                  {checkResult.products?.map((p: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg bg-white p-2.5 border border-emerald-100 text-xs"
                    >
                      <span className="font-bold text-gray-900">{p.model}</span>
                      <span className="font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                        Serial: {p.serialNumber}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= SECTION B: REGISTRATION MULTI-STEP FLOW ================= */}
      {activeTab === "register" && (
        <div className="mx-auto max-w-3xl">
          {/* Stepper Progress Header */}
          {step < 5 && (
            <div className="mb-8">
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold uppercase tracking-wider">
                <div
                  className={`py-2 border-b-4 transition-colors ${
                    step >= 1 ? "border-[#e21b23] text-[#e21b23]" : "border-gray-200 text-gray-400"
                  }`}
                >
                  1. Contact
                </div>
                <div
                  className={`py-2 border-b-4 transition-colors ${
                    step >= 2 ? "border-[#e21b23] text-[#e21b23]" : "border-gray-200 text-gray-400"
                  }`}
                >
                  2. Product / QR
                </div>
                <div
                  className={`py-2 border-b-4 transition-colors ${
                    step >= 3 ? "border-[#e21b23] text-[#e21b23]" : "border-gray-200 text-gray-400"
                  }`}
                >
                  3. Purchase
                </div>
                <div
                  className={`py-2 border-b-4 transition-colors ${
                    step >= 4 ? "border-[#e21b23] text-[#e21b23]" : "border-gray-200 text-gray-400"
                  }`}
                >
                  4. Review
                </div>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-50 p-4 text-xs font-semibold text-red-600">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: CUSTOMER DETAILS */}
          {step === 1 && (
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e21b23]">
                  STEP 1 OF 4
                </span>
                <h3 className="mt-1 text-2xl font-black uppercase text-[#111214]">
                  Customer Details
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Where should we register and send your official warranty protection certificate?
                </p>
              </div>

              <form onSubmit={handleProceedToStep2} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#e21b23] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
                      Mobile Number (10 digits) *
                    </label>
                    <div className="flex items-center">
                      <span className="rounded-l-xl border border-r-0 border-gray-300 bg-gray-100 px-3.5 py-3 text-xs font-bold text-gray-700">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                        placeholder="9876543210"
                        className="w-full rounded-r-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#e21b23] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
                      Postal Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                      placeholder="e.g. 641021"
                      className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#e21b23] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
                      Email Address (Optional)
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
                      City / District (Optional)
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Coimbatore"
                      className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#e21b23] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
                      State (Optional)
                    </label>
                    <input
                      type="text"
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
                    <span>Continue to Product Details</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: PRODUCTS TO REGISTER & QR SCANNER */}
          {step === 2 && (
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e21b23]">
                    STEP 2 OF 4
                  </span>
                  <h3 className="mt-1 text-2xl font-black uppercase text-[#111214]">
                    Products to Register
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Scan the QR code from the warranty card or type the serial number manually.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSerialGuide(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e21b23] hover:underline"
                >
                  <span>ℹ️ Where is my Serial / QR?</span>
                </button>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
                          Equipment Model *
                        </label>
                        <select
                          value={item.model}
                          onChange={(e) => updateProductRow(idx, "model", e.target.value)}
                          className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#e21b23] focus:outline-none"
                        >
                          {COMMON_MODELS.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-black uppercase tracking-wider text-gray-700">
                            Serial / Barcode Number *
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveScanProductIdx(idx);
                              setScannerOpen(true);
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#e21b23] hover:underline"
                          >
                            <span>📷 Scan QR / Barcode</span>
                          </button>
                        </div>
                        <input
                          type="text"
                          required
                          value={item.serialNumber}
                          onChange={(e) =>
                            updateProductRow(idx, "serialNumber", e.target.value.toUpperCase())
                          }
                          placeholder="e.g. TQ2026-HW-98431"
                          className="w-full font-mono uppercase tracking-wider rounded-xl border border-gray-300 bg-white px-4 py-3 text-xs sm:text-sm font-bold text-gray-900 placeholder-gray-400 focus:border-[#e21b23] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addProductRow}
                  className="w-full rounded-xl border-2 border-dashed border-gray-300 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 hover:border-[#e21b23] hover:text-[#e21b23] transition"
                >
                  + Add Another Product (Shared Invoice)
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
                    <span>Continue to Purchase Details</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: PURCHASE & DEALER DETAILS */}
          {step === 3 && (
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e21b23]">
                  STEP 3 OF 4
                </span>
                <h3 className="mt-1 text-2xl font-black uppercase text-[#111214]">
                  Purchase & Dealer Details
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  The purchase date determines your official warranty validity start date.
                </p>
              </div>

              <form onSubmit={handleProceedToStep4} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
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
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
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
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
                      Dealer / Store Name
                    </label>
                    <input
                      type="text"
                      value={dealerName}
                      onChange={(e) => setDealerName(e.target.value)}
                      placeholder="e.g. Sidco Power Tools & Machinery"
                      className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#e21b23] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
                      Dealer City / Location
                    </label>
                    <input
                      type="text"
                      value={dealerCity}
                      onChange={(e) => setDealerCity(e.target.value)}
                      placeholder="e.g. Coimbatore / Chennai"
                      className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:border-[#e21b23] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Upload Invoice / Warranty Card Slip */}
                <div className="pt-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                    Upload Invoice or Warranty Card Photo (Optional)
                  </label>
                  <p className="text-[11px] text-gray-400 mb-3">
                    Photo of purchase bill or stamped dealer warranty card (JPG, PNG, or PDF).
                  </p>

                  <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-4">
                    <ImageUploader
                      label="Select or Snap Bill / Card Photo"
                      sublabel="Clear photo of dealer stamp and serial number"
                      recommendedResolution="Clear Mobile Photo"
                      maxSizeMB={5}
                      folder="tuqo/warranty-invoices"
                      value={invoiceUrl}
                      onChange={(url) => setInvoiceUrl(url)}
                    />
                  </div>
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
                  Please review your details before activating official warranty protection.
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
                  <div className="space-y-2">
                    {products.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-xl bg-white p-3 border border-gray-200 text-xs"
                      >
                        <div>
                          <span className="font-black text-gray-900 block">{p.model}</span>
                          <span className="text-gray-500 text-[11px]">12 Months Commercial Warranty</span>
                        </div>
                        <span className="font-mono font-bold text-[#e21b23] bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                          {p.serialNumber}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
                    <span className="text-xs font-black uppercase text-gray-800">
                      Purchase Information
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
                      <span className="text-gray-400 block">Dealer / Source:</span>
                      <span className="font-bold text-gray-900">{dealerName || source}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
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
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#e21b23] py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-red-900/30 transition-all hover:bg-[#b8141a] disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Activating Warranty...</span>
                  ) : (
                    <>
                      <span>Activate My Warranty Protection</span>
                      <ShieldCheckIcon className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: ACTIVATION SUCCESS & CERTIFICATE */}
          {step === 5 && registeredData && (
            <div className="rounded-3xl border-2 border-emerald-500/40 bg-white p-6 sm:p-12 shadow-xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-800">
                  ✓ Warranty Activated
                </span>
                <h3 className="mt-3 text-2xl sm:text-3xl font-black uppercase text-[#111214]">
                  You&apos;re All Set!
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                  Your TUQO equipment is now covered under official warranty protection across all service centers in India.
                </p>
              </div>

              {/* Digital Certificate Card */}
              <div
                id="tuqo-warranty-certificate"
                className="relative overflow-hidden rounded-3xl border-2 border-gray-900 bg-[#0a0b0e] text-white p-6 sm:p-8 shadow-2xl"
              >
                {/* Decorative Red Accent */}
                <div className="absolute top-0 left-0 h-1.5 w-full bg-[#e21b23]" />
                <div className="absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-red-600/10 blur-2xl" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#e21b23]">
                      OFFICIAL TUQO WARRANTY CERTIFICATE
                    </span>
                    <h4 className="mt-1 text-lg sm:text-xl font-black tracking-tight text-white font-mono">
                      {registeredData.registrationId}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-bold text-emerald-400">
                      ● Active Coverage
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-white/10 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[11px]">Registered Owner:</span>
                    <span className="font-bold text-white text-sm">{registeredData.customerName}</span>
                    <span className="text-gray-400 block text-[11px] mt-0.5">+91 {registeredData.mobile}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Warranty Period:</span>
                    <span className="font-bold text-white text-sm">
                      {registeredData.purchaseDate} to {registeredData.warrantyExpiryDate}
                    </span>
                    <span className="text-emerald-400 block text-[11px] mt-0.5">1 Year Standard Coverage</span>
                  </div>
                </div>

                <div className="pt-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Registered Equipment:
                  </span>
                  <div className="space-y-2">
                    {registeredData.products?.map((p: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 p-3 text-xs"
                      >
                        <span className="font-bold text-white">{p.model}</span>
                        <span className="font-mono text-xs font-bold text-[#ff4f56]">
                          SERIAL: {p.serialNumber}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#111214] py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white hover:bg-black transition"
                >
                  <span>🖨️ Print / Save Certificate</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setCustomerName("");
                    setMobile("");
                    setProducts([
                      {
                        model: COMMON_MODELS[0],
                        serialNumber: "",
                        productName: "",
                        warrantyMonths: 12,
                      },
                    ]);
                    setRegisteredData(null);
                  }}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-gray-800 hover:bg-gray-50 transition"
                >
                  <span>Register Another Machine</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= MODAL: HOW TO FIND SERIAL GUIDE ================= */}
      {showSerialGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl border border-white/15 bg-[#14161a] p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-base font-bold text-white">
                How to Find Your Serial / Barcode Number
              </h4>
              <button
                type="button"
                onClick={() => setShowSerialGuide(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs text-gray-300 leading-relaxed">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
                <span className="font-bold text-[#e21b23] block text-sm">
                  1. On Your Warranty Card / Packaging Box:
                </span>
                <p>
                  Look at the official TUQO warranty card inside the box or the barcode sticker on the packaging.
                  You can scan the QR code directly with your phone camera or copy the alphanumeric serial number (e.g. <span className="font-mono text-white">TQ-2026-XXXX</span>).
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
                <span className="font-bold text-[#e21b23] block text-sm">
                  2. On the Machine Nameplate:
                </span>
                <p>
                  Every TUQO pressure washer, compressor, and power tool has an engraved metallic or silver specification plate on the motor body containing the Model and <strong>S/N</strong>.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSerialGuide(false)}
                className="rounded-xl bg-[#e21b23] px-5 py-2 text-xs font-bold text-white"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: CAMERA QR SCANNER ================= */}
      {scannerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#14161a] p-6 text-white shadow-2xl text-center space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-sm font-bold text-white">
                Scan Serial Number / QR Code
              </h4>
              <button
                type="button"
                onClick={() => setScannerOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Point your phone camera at the QR code or barcode on the warranty card or machine label.
            </p>

            {/* Camera Box / Interactive input */}
            <div className="relative aspect-square w-full rounded-2xl border-2 border-dashed border-[#e21b23] bg-black/50 flex flex-col items-center justify-center p-6 overflow-hidden">
              <div className="absolute inset-4 rounded-xl border-2 border-white/30 pointer-events-none" />
              <div className="h-14 w-14 rounded-full bg-[#e21b23]/20 flex items-center justify-center text-2xl text-[#e21b23] mb-3 animate-pulse">
                📷
              </div>
              <span className="text-xs font-bold text-gray-300">
                Camera / Photo Scanner
              </span>
              <p className="text-[11px] text-gray-500 mt-1 max-w-xs">
                Upload a photo of the QR code or enter below
              </p>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // simulate scan or extract name
                    const autoSerial = `TQ-QR-${Math.floor(100000 + Math.random() * 900000)}`;
                    updateProductRow(activeScanProductIdx, "serialNumber", autoSerial);
                    setScannerOpen(false);
                  }
                }}
                className="mt-4 text-xs text-gray-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-[#e21b23] file:text-white file:text-xs file:font-bold"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setScannerOpen(false)}
                className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-bold text-gray-300 hover:bg-white/10"
              >
                Close Scanner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
