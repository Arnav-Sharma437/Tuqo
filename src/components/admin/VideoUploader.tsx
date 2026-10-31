"use client";

import { useState, useRef } from "react";
import { parseVideoUrl } from "@/lib/videoUtils";

interface VideoUploaderProps {
  label?: string;
  sublabel?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export function VideoUploader({
  label = "Product Demonstration Video",
  sublabel = "Add a YouTube, Vimeo, or direct MP4 video link showing the machine in action",
  value = "",
  onChange,
  folder = "tuqo/videos",
}: VideoUploaderProps) {
  const [inputValue, setInputValue] = useState(value);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync internal input value if prop changes
  const parsed = parseVideoUrl(value);

  const handleApplyUrl = (newVal: string) => {
    setInputValue(newVal);
    setError("");
    onChange(newVal.trim());
  };

  const handleClear = () => {
    setInputValue("");
    setError("");
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Direct video file upload to Cloudinary (resource_type: video)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate video type
    if (!file.type.startsWith("video/") && !file.name.match(/\.(mp4|webm|mov|mkv)$/i)) {
      setError("Please select a valid video file (.mp4, .webm, .mov)");
      return;
    }

    // Limit to 50MB
    const maxBytes = 50 * 1024 * 1024;
    if (file.size > maxBytes) {
      setError("Video file is too large. Max size is 50MB. We recommend hosting larger demo videos on YouTube for 4K streaming.");
      return;
    }

    setUploading(true);
    setUploadProgress(10);
    setError("");

    try {
      // 1. Request signed token from backend
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

      setUploadProgress(30);

      // 2. Direct upload to Cloudinary video/upload endpoint
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", file);
      cloudinaryFormData.append("api_key", signData.apiKey);
      cloudinaryFormData.append("timestamp", String(signData.timestamp));
      cloudinaryFormData.append("signature", signData.signature);
      cloudinaryFormData.append("folder", signData.folder);

      const uploadUrl = `https://api.cloudinary.com/v1_1/${signData.cloudName}/video/upload`;

      // Upload with progress simulation
      setUploadProgress(50);
      const directRes = await fetch(uploadUrl, {
        method: "POST",
        body: cloudinaryFormData,
      });

      const directData = await directRes.json();
      if (!directRes.ok || !directData.secure_url) {
        throw new Error(directData.error?.message || "Cloudinary video upload failed");
      }

      setUploadProgress(100);
      handleApplyUrl(directData.secure_url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Video upload failed";
      setError(msg);
    } finally {
      setUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#181a20] p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e21b23] text-white text-[10px] font-black">
              ▶
            </span>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-200">
              {label}
            </label>
            {value && (
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-400">
                Attached
              </span>
            )}
          </div>
          {sublabel && <p className="text-[11px] text-gray-400 mt-1">{sublabel}</p>}
        </div>

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="self-start sm:self-auto rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[11px] font-semibold text-red-400 hover:bg-red-500/20 transition"
          >
            ✕ Remove Video
          </button>
        )}
      </div>

      {/* URL Input Box & Upload Trigger */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="url"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                onChange(e.target.value.trim());
              }}
              placeholder="Paste YouTube link (https://www.youtube.com/watch?v=...) or MP4 video URL"
              className="w-full rounded-xl border border-white/10 bg-[#121316] px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#e21b23] focus:outline-none"
            />
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Direct File Upload button */}
          <div className="shrink-0 flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-xs font-bold text-gray-200 transition disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <span className="animate-spin text-sm">⏳</span>
                  <span>Uploading {uploadProgress ? `${uploadProgress}%` : "..."}</span>
                </>
              ) : (
                <>
                  <span>📁 Upload MP4 File</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Format Guidance Pills */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-400">
          <span className="font-semibold text-gray-300">Supported:</span>
          <span className="rounded bg-red-950/40 border border-red-500/30 px-2 py-0.5 text-red-300 font-mono">
            YouTube / Shorts
          </span>
          <span className="rounded bg-sky-950/40 border border-sky-500/30 px-2 py-0.5 text-sky-300 font-mono">
            Vimeo
          </span>
          <span className="rounded bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 text-emerald-300 font-mono">
            Direct MP4 / WebM / Cloudinary
          </span>
        </div>

        {/* Error message if any */}
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
            {error}
          </div>
        )}

        {/* Live Video Preview Box */}
        {value && parsed && (
          <div className="rounded-xl border border-white/10 bg-[#121316] p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-gray-300 flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">●</span>
                <span>
                  {parsed.type === "youtube"
                    ? "YouTube Video Preview"
                    : parsed.type === "vimeo"
                    ? "Vimeo Video Preview"
                    : "Direct MP4 Video Preview"}
                </span>
              </span>
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e21b23] hover:underline flex items-center gap-1"
              >
                <span>Open Link</span>
                <span>↗</span>
              </a>
            </div>

            <div className="relative aspect-video w-full max-w-xl mx-auto overflow-hidden rounded-lg bg-black border border-white/10 shadow-lg">
              {parsed.type === "youtube" || parsed.type === "vimeo" ? (
                <iframe
                  src={parsed.embedUrl}
                  title="Video Preview"
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={parsed.embedUrl}
                  controls
                  className="h-full w-full object-contain"
                  preload="metadata"
                >
                  Your browser does not support HTML5 video preview.
                </video>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
