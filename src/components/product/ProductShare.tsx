"use client";

import React, { useState } from "react";

interface ProductShareProps {
  productName: string;
  productModel?: string;
}

export function ProductShare({ productName, productModel }: ProductShareProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = productModel ? `${productName} (${productModel})` : productName;
    const text = `Check out ${title} from TUQO Tools:`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return;
      } catch (err: unknown) {
        // User cancelled or share rejected — fall back to copy
        if ((err as Error)?.name === "AbortError") return;
      }
    }

    // Fallback: Copy link to clipboard
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        prompt("Copy product link:", url);
      }
    }
  };

  return (
    <div className="relative inline-block w-full sm:w-auto">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-5 text-xs font-extrabold uppercase tracking-wider text-gray-700 transition-all hover:bg-white hover:border-[#e21b23] hover:text-[#e21b23] active:scale-95 shadow-sm"
        title="Share this product"
      >
        {copied ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-emerald-700">Link Copied!</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            <span>Share Product</span>
          </>
        )}
      </button>

      {copied && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2.5 py-1 text-[10px] font-bold text-white shadow-lg animate-bounce">
          Copied to Clipboard!
        </div>
      )}
    </div>
  );
}
