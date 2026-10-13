"use client";

import { useState, useRef } from "react";

interface PdfUploaderProps {
  label: string;
  sublabel?: string;
  value?: string;
  fileSize?: string;
  onChange: (url: string, fileSize?: string) => void;
  folder?: string;
}

export function PdfUploader({
  label,
  sublabel,
  value,
  fileSize,
  onChange,
  folder = "tuqo/catalogs",
}: PdfUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      setError("Please select a valid PDF document (.pdf)");
      return;
    }

    setUploading(true);
    setError("");

    // Calculate human-readable size
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    const formattedSize =
      file.size > 1024 * 1024 ? `${sizeInMB} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`;

    try {
      // 1. First get a signed token from our backend (avoids sending large file bytes through Vercel serverless)
      const signRes = await fetch("/api/admin/cloudinary-sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });

      if (signRes.ok) {
        const signData = await signRes.json();
        if (signData.success && signData.signature && signData.cloudName) {
          // 2. Direct upload to Cloudinary (bypasses Vercel 4.5MB payload limit completely!)
          const cloudinaryFormData = new FormData();
          cloudinaryFormData.append("file", file);
          cloudinaryFormData.append("api_key", signData.apiKey);
          cloudinaryFormData.append("timestamp", String(signData.timestamp));
          cloudinaryFormData.append("signature", signData.signature);
          cloudinaryFormData.append("folder", signData.folder);

          const directRes = await fetch(
            `https://api.cloudinary.com/v1_1/${signData.cloudName}/auto/upload`,
            {
              method: "POST",
              body: cloudinaryFormData,
            }
          );

          if (directRes.ok) {
            const result = await directRes.json();
            onChange(result.secure_url, formattedSize);
            return;
          }
        }
      }

      // 3. Fallback: Proxy upload through API route if direct signing wasn't possible
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        let errMsg = "Failed to upload PDF";
        try {
          const parsed = JSON.parse(text);
          errMsg = parsed.error || errMsg;
        } catch {
          if (res.status === 413 || text.includes("Entity Too Large")) {
            errMsg = "File is too large for proxy. Direct upload will be used.";
          } else {
            errMsg = `Upload error (${res.status}): ${text.slice(0, 100)}`;
          }
        }
        throw new Error(errMsg);
      }

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to upload PDF");
      }

      onChange(data.url, data.fileSize || formattedSize);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "PDF upload failed";
      setError(msg);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-200">
          {label}
        </label>
        {fileSize && (
          <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono text-gray-300">
            {fileSize}
          </span>
        )}
      </div>
      {sublabel && <p className="text-[11px] text-gray-400">{sublabel}</p>}

      {value ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#d31820] text-white shadow-md">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate max-w-xs">
                PDF Attached & Ready
              </p>
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-red-400 hover:text-red-300 underline font-mono truncate block"
              >
                View PDF File ↗
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-200 transition hover:bg-white/10 disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Replace PDF"}
            </button>
            <button
              type="button"
              onClick={() => onChange("", "")}
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
              title="Remove PDF"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-[#14161a] p-6 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-400 mb-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
          <p className="text-xs font-medium text-white">No PDF attached yet</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Upload a product or equipment catalogue PDF</p>
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="mt-3 rounded-lg bg-[#d31820] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#b0141b] disabled:opacity-50 shadow-md shadow-red-900/30"
          >
            {uploading ? "Uploading PDF directly to Cloudinary..." : "Upload PDF Document"}
          </button>
        </div>
      )}

      {/* Manual URL input fallback */}
      <div className="pt-1">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value, fileSize)}
          placeholder="Or paste direct PDF URL (https://...)"
          className="w-full rounded-lg border border-white/10 bg-[#16181d] px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:border-[#d31820] focus:outline-none"
        />
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-[11px] font-medium text-red-400">{error}</p>}
    </div>
  );
}
