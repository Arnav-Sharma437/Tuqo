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
  recommendedResolution?: string;
  maxSizeMB?: number;
}

// Client-side automatic image compression function
async function compressImageFile(file: File, maxWidth = 1920, quality = 0.85): Promise<File> {
  // If not a raster image, return original
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml" || file.type === "image/gif") {
    return file;
  }

  return new Promise((resolve) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;

      // Scale down proportionally if larger than maxWidth
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob || blob.size >= file.size) {
            resolve(file);
          } else {
            const compressed = new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressed);
          }
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };

    img.src = objectUrl;
  });
}

export function ImageUploader({
  label,
  sublabel,
  value,
  onChange,
  folder = "tuqo/general",
  aspectHint,
  recommendedResolution,
  maxSizeMB = 5,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [detectedSpecs, setDetectedSpecs] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const originalFile = e.target.files?.[0];
    if (!originalFile) return;

    setError("");
    setUploading(true);

    try {
      // 1. Read natural dimensions of selected image
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const testImg = new window.Image();
        testImg.onload = () => {
          const originalKb = Math.round(originalFile.size / 1024);
          setDetectedSpecs(
            `${testImg.width} × ${testImg.height} px (${originalKb > 1024 ? `${(originalKb / 1024).toFixed(1)} MB` : `${originalKb} KB`})`
          );
        };
        if (loadEvent.target?.result) {
          testImg.src = loadEvent.target.result as string;
        }
      };
      reader.readAsDataURL(originalFile);

      // 2. Automatically compress the image on the client
      const file = await compressImageFile(originalFile);

      // 3. Request signed token from backend
      const signRes = await fetch("/api/admin/cloudinary-sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });

      if (!signRes.ok) {
        const signErr = await signRes.json().catch(() => ({}));
        throw new Error(signErr.error || "Failed to generate upload signature");
      }

      const signData = await signRes.json();
      if (!signData.success || !signData.signature || !signData.cloudName) {
        throw new Error(signData.error || "Invalid upload signature response");
      }

      // 4. Direct upload to Cloudinary image/upload endpoint
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", file);
      cloudinaryFormData.append("api_key", signData.apiKey);
      cloudinaryFormData.append("timestamp", String(signData.timestamp));
      cloudinaryFormData.append("signature", signData.signature);
      cloudinaryFormData.append("folder", signData.folder);

      const directRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
        {
          method: "POST",
          body: cloudinaryFormData,
        }
      );

      const result = await directRes.json();
      if (!directRes.ok || !result.secure_url) {
        throw new Error(result.error?.message || "Cloudinary image upload failed");
      }

      onChange(result.secure_url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setError(msg);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2.5">
      {/* Label and Sublabel */}
      <div>
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200">
            {label}
          </label>
        </div>
        {sublabel && <p className="text-[11px] text-gray-400 mt-0.5">{sublabel}</p>}
      </div>

      {/* Resolution & File Size Guidance Box */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-white/5 bg-[#171920] px-3 py-2 text-[10px] text-gray-300">
        <span className="font-extrabold uppercase text-[#e21b23]">Specs:</span>
        {recommendedResolution && (
          <span className="rounded bg-black/40 px-2 py-0.5 font-mono text-emerald-400 border border-emerald-500/20">
            Resolution: {recommendedResolution}
          </span>
        )}
        {aspectHint && (
          <span className="rounded bg-black/40 px-2 py-0.5 font-mono text-cyan-400 border border-cyan-500/20">
            Ratio: {aspectHint}
          </span>
        )}
        <span className="rounded bg-black/40 px-2 py-0.5 font-mono text-amber-400 border border-amber-500/20">
          Max Size: &lt; {maxSizeMB} MB
        </span>
        <span className="rounded bg-black/40 px-2 py-0.5 font-mono text-gray-400">
          JPG, PNG, WebP
        </span>
      </div>

      {/* Preview and Upload Action Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {value ? (
          <div className="relative h-24 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#181a20]">
            <Image
              src={value}
              alt="Preview"
              fill
              unoptimized={value.startsWith("http")}
              className="object-contain p-1"
              sizes="160px"
            />
            <button
              type="button"
              onClick={() => {
                onChange("");
                setDetectedSpecs(null);
              }}
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
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10 hover:border-white/30 disabled:opacity-50"
            >
              {uploading ? "Compressing & Uploading..." : "Choose Image File"}
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
            {detectedSpecs && (
              <span className="text-[10px] text-emerald-400 font-mono">
                Detected: {detectedSpecs}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Or paste external image URL"
              className="w-full rounded-lg border border-white/10 bg-[#16181d] px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:border-[#d31820] focus:outline-none"
            />
          </div>

          {error && <p className="text-[11px] text-red-400 font-medium">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default ImageUploader;
