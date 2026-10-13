"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  label: string;
  sublabel?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  aspectHint?: string;
}

export function ImageUploader({
  label,
  sublabel,
  value,
  onChange,
  folder = "tuqo/general",
  aspectHint,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      // 1. Try direct upload to Cloudinary (avoids Vercel 4.5MB payload limit)
      const signRes = await fetch("/api/admin/cloudinary-sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });

      if (signRes.ok) {
        const signData = await signRes.json();
        if (signData.success && signData.signature && signData.cloudName) {
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
            onChange(result.secure_url);
            return;
          }
        }
      }

      // 2. Fallback: Proxy upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        let errMsg = "Failed to upload image";
        try {
          const parsed = JSON.parse(text);
          errMsg = parsed.error || errMsg;
        } catch {
          errMsg = `Upload error (${res.status})`;
        }
        throw new Error(errMsg);
      }

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to upload image");
      }

      onChange(data.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setError(msg);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
          {label}
        </label>
        {aspectHint && (
          <span className="text-[11px] text-gray-500 font-mono">{aspectHint}</span>
        )}
      </div>

      {sublabel && <p className="text-[11px] text-gray-400">{sublabel}</p>}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {value ? (
          <div className="relative h-24 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#181a20]">
            <Image
              src={value}
              alt="Preview"
              fill
              unoptimized={value.startsWith("http")}
              className="object-cover"
              sizes="160px"
            />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-1 top-1 rounded-md bg-black/70 p-1 text-white hover:bg-red-600 transition"
              title="Remove image"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex h-24 w-40 flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-[#14161a] text-gray-500">
            <svg className="h-6 w-6 mb-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[10px]">No image uploaded</span>
          </div>
        )}

        <div className="flex-1 space-y-2 w-full">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10 hover:border-white/30 disabled:opacity-50"
            >
              {uploading ? "Uploading to Cloudinary..." : "Choose Image File"}
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Or paste image URL"
              className="w-full rounded-lg border border-white/10 bg-[#16181d] px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:border-[#d31820] focus:outline-none"
            />
          </div>

          {error && <p className="text-[11px] text-red-400 font-medium">{error}</p>}
        </div>
      </div>
    </div>
  );
}
