"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SearchIcon, XIcon, ArrowRightIcon } from "@/components/common/Icons";

interface SearchProduct {
  id: string;
  name: string;
  model: string;
  slug: string;
  category: string;
  categorySlug: string;
  subcategory?: string;
  image: string;
  shortDesc?: string;
  tag?: string;
  url: string;
}

interface SearchCategory {
  name: string;
  slug: string;
  image: string;
  url: string;
}

interface HeaderSearchProps {
  isMobileDrawer?: boolean;
  onNavigate?: () => void;
}

export function HeaderSearch({ isMobileDrawer = false, onNavigate }: HeaderSearchProps) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [categories, setCategories] = useState<SearchCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const drawerInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Search API fetcher
  const performSearch = useCallback(async (searchQuery: string) => {
    const q = searchQuery.trim();
    if (q.length < 2) {
      setProducts([]);
      setCategories([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=8`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setProducts(data.products || []);
          setCategories(data.categories || []);
        }
      }
    } catch (err) {
      console.error("Search fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle typing with 220ms debounce
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setOpen(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (val.trim().length >= 2) {
      setLoading(true);
      debounceRef.current = setTimeout(() => {
        performSearch(val);
      }, 220);
    } else {
      setProducts([]);
      setCategories([]);
      setLoading(false);
    }
  };

  // Clear query
  const handleClear = () => {
    setQuery("");
    setProducts([]);
    setCategories([]);
    setOpen(false);
    if (mobileExpanded) {
      mobileInputRef.current?.focus();
    } else if (isMobileDrawer) {
      drawerInputRef.current?.focus();
    } else {
      desktopInputRef.current?.focus();
    }
  };

  // Close dropdown on click outside for desktop
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile overlay is open
  useEffect(() => {
    if (mobileExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileExpanded]);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        desktopInputRef.current?.focus();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
        setMobileExpanded(false);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Handle Enter key navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (products.length > 0) {
        handleItemClick(products[0].url);
      } else if (categories.length > 0) {
        handleItemClick(categories[0].url);
      } else if (query.trim().length >= 2) {
        handleItemClick(`/categories`);
      }
    }
  };

  const handleItemClick = (url: string) => {
    setOpen(false);
    setMobileExpanded(false);
    if (onNavigate) onNavigate();
    router.push(url);
  };

  // ================= RENDER FOR MOBILE DRAWER =================
  if (isMobileDrawer) {
    return (
      <div ref={containerRef} className="relative w-full">
        <div className="relative flex items-center">
          <input
            ref={drawerInputRef}
            type="text"
            value={query}
            onChange={handleQueryChange}
            onFocus={() => query.trim().length >= 2 && setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search models, washers, tools..."
            className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 pl-10 pr-9 text-xs text-white placeholder-gray-400 focus:border-[#e21b23] focus:bg-white/10 focus:outline-none"
          />
          <SearchIcon className="absolute left-3.5 h-4 w-4 text-gray-400" />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 text-gray-400 hover:text-white"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Mobile Dropdown Results inside Drawer */}
        {open && query.trim().length >= 2 && (
          <div className="mt-2 w-full rounded-2xl border border-white/15 bg-[#14161a] p-3 shadow-2xl space-y-3 max-h-80 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-6 text-xs text-gray-400 gap-2">
                <span className="animate-spin text-base">⏳</span>
                <span>Searching TUQO equipment catalog...</span>
              </div>
            ) : products.length === 0 && categories.length === 0 ? (
              <div className="py-5 text-center text-xs text-gray-400">
                No matching models or machines found for &quot;<strong className="text-white">{query}</strong>&quot;.
              </div>
            ) : (
              <>
                {categories.length > 0 && (
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">
                      Categories
                    </span>
                    <div className="space-y-1">
                      {categories.map((c) => (
                        <button
                          key={c.slug}
                          type="button"
                          onClick={() => handleItemClick(c.url)}
                          className="flex items-center justify-between w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-bold text-gray-200 hover:bg-white/10 hover:text-white"
                        >
                          <span>{c.name}</span>
                          <ArrowRightIcon className="h-3 w-3 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {products.length > 0 && (
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">
                      Equipment & Models ({products.length})
                    </span>
                    <div className="space-y-1">
                      {products.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleItemClick(p.url)}
                          className="flex items-center gap-3 w-full rounded-xl p-2 text-left hover:bg-white/10 transition group"
                        >
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#1c1f26] p-0.5">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="40px"
                              className="object-contain"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-white group-hover:text-[#e21b23] truncate">
                              {p.name}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              {p.model && (
                                <span className="rounded bg-[#e21b23]/20 px-1.5 py-0.2 text-[9px] font-mono font-bold text-[#ff5c62]">
                                  {p.model}
                                </span>
                              )}
                              <span className="text-[10px] text-gray-400 truncate">
                                {p.category}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  // ================= RENDER FOR DESKTOP & MOBILE HEADER =================
  return (
    <div ref={containerRef} className="flex items-center shrink-0">
      {/* Desktop Search Bar (Fixed constant width - NEVER pushes navbar on focus) */}
      <div className="hidden lg:flex items-center relative shrink-0">
        <div
          className={`flex items-center rounded-xl border transition-colors duration-200 w-40 xl:w-52 2xl:w-60 shrink-0 ${
            open
              ? "border-[#e21b23] bg-[#14161a] shadow-lg shadow-red-950/20"
              : "border-white/15 bg-white/5 hover:border-white/25 hover:bg-white/10"
          }`}
        >
          <SearchIcon className="ml-2.5 xl:ml-3 h-3.5 w-3.5 text-gray-400 shrink-0" />
          <input
            ref={desktopInputRef}
            type="text"
            value={query}
            onChange={handleQueryChange}
            onFocus={() => {
              if (query.trim().length >= 2) setOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search machines..."
            className="w-full bg-transparent px-2 xl:px-2.5 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={handleClear}
              className="mr-2 text-gray-400 hover:text-white shrink-0"
              aria-label="Clear search"
            >
              <XIcon className="h-3.5 w-3.5" />
            </button>
          ) : (
            <span className="mr-2 hidden 2xl:inline-block rounded border border-white/15 bg-white/5 px-1 py-0.5 text-[9px] font-mono text-gray-400 shrink-0">
              /
            </span>
          )}
        </div>

        {/* Desktop Floating Dropdown Results (Floats over page, 0 effect on navbar layout) */}
        {open && query.trim().length >= 2 && (
          <div className="absolute right-0 top-full mt-2 w-[380px] xl:w-[440px] rounded-2xl border border-white/15 bg-[#121418] p-3 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50 max-h-[460px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8 text-xs text-gray-400 gap-2">
                <span className="animate-spin text-base">⏳</span>
                <span>Searching TUQO machinery &amp; models...</span>
              </div>
            ) : products.length === 0 && categories.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-400 space-y-1">
                <div className="text-sm font-bold text-gray-300">
                  No equipment found for &quot;<strong className="text-white">{query}</strong>&quot;
                </div>
                <p className="text-[11px] text-gray-500">
                  Try searching by model number (e.g. HW2020), category, or tool type.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Categories */}
                {categories.length > 0 && (
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2 px-1">
                      Matching Categories
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {categories.map((c) => (
                        <button
                          key={c.slug}
                          type="button"
                          onClick={() => handleItemClick(c.url)}
                          className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-left text-xs font-bold text-gray-200 hover:bg-[#e21b23] hover:text-white hover:border-[#e21b23] transition group"
                        >
                          <span className="truncate">{c.name}</span>
                          <ArrowRightIcon className="h-3 w-3 shrink-0 ml-1 text-gray-400 group-hover:text-white" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products */}
                {products.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between px-1 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                        Equipment Models ({products.length})
                      </span>
                      <span className="text-[10px] text-gray-500">Click to view specs</span>
                    </div>
                    <div className="space-y-1">
                      {products.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleItemClick(p.url)}
                          className="flex items-center gap-3 w-full rounded-xl p-2 text-left hover:bg-white/10 transition group border border-transparent hover:border-white/10"
                        >
                          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#1c1f26] p-1 shadow-2xs group-hover:border-[#e21b23]/50 transition-colors">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="44px"
                              className="object-contain transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-white group-hover:text-[#e21b23] transition-colors truncate">
                              {p.name}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              {p.model && (
                                <span className="rounded bg-[#e21b23]/20 border border-[#e21b23]/40 px-1.5 py-0.2 text-[9px] font-mono font-bold text-[#ff5c62]">
                                  {p.model}
                                </span>
                              )}
                              <span className="text-[11px] text-gray-400 truncate">
                                {p.category}
                              </span>
                            </div>
                          </div>
                          <ArrowRightIcon className="h-3.5 w-3.5 text-gray-500 group-hover:text-white shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* View all footer */}
                <div className="border-t border-white/10 pt-2 px-1">
                  <button
                    type="button"
                    onClick={() => handleItemClick(`/categories`)}
                    className="flex items-center justify-between w-full rounded-lg bg-white/5 px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-gray-300 hover:bg-[#e21b23] hover:text-white transition"
                  >
                    <span>Browse Full Equipment Catalog</span>
                    <ArrowRightIcon className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Header Search Icon Button */}
      <button
        type="button"
        onClick={() => {
          setMobileExpanded(true);
          setTimeout(() => mobileInputRef.current?.focus(), 80);
        }}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-colors hover:border-[#e21b23] hover:text-[#e21b23] lg:hidden shrink-0"
        aria-label="Search TUQO Equipment"
      >
        <SearchIcon className="h-4 w-4" />
      </button>

      {/* Mobile Full-Screen Overlay Search (100% responsive, never clipped, never overflowing) */}
      {mobileExpanded && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#0a0b0e]/98 backdrop-blur-2xl lg:hidden animate-in fade-in duration-200">
          {/* Top Bar with Input & Cancel */}
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-6 shrink-0 bg-[#0d0f14]">
            <div className="relative flex-1">
              <input
                ref={mobileInputRef}
                type="text"
                value={query}
                onChange={handleQueryChange}
                onKeyDown={handleKeyDown}
                placeholder="Search models, machines (e.g. HW2020)..."
                className="w-full rounded-xl border border-white/20 bg-white/5 py-2.5 pl-10 pr-9 text-xs sm:text-sm text-white placeholder-gray-400 focus:border-[#e21b23] focus:bg-white/10 focus:outline-none"
              />
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white"
                  aria-label="Clear query"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileExpanded(false);
                setOpen(false);
              }}
              className="shrink-0 px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition"
            >
              Cancel
            </button>
          </div>

          {/* Body & Live Results */}
          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 space-y-4">
            {/* Quick Suggestions when query is empty */}
            {query.trim().length < 2 && (
              <div className="space-y-2.5">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "High Pressure Washer",
                    "Car Washer",
                    "Cordless",
                    "HW2020",
                    "Foam Cannon",
                    "Heavy Duty",
                    "Industrial",
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setQuery(tag);
                        setOpen(true);
                        performSearch(tag);
                      }}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 hover:border-[#e21b23] hover:text-white hover:bg-white/10 transition"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading Spinner */}
            {loading && (
              <div className="flex items-center justify-center py-12 text-xs sm:text-sm text-gray-400 gap-2">
                <span className="animate-spin text-lg">⏳</span>
                <span>Searching TUQO catalog...</span>
              </div>
            )}

            {/* No Results */}
            {!loading && query.trim().length >= 2 && products.length === 0 && categories.length === 0 && (
              <div className="py-12 text-center text-gray-400 space-y-2">
                <div className="text-sm font-bold text-gray-200">
                  No equipment found matching &quot;{query}&quot;
                </div>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Try searching by model number (e.g. HW2020), machinery category, or specifications.
                </p>
              </div>
            )}

            {/* Results List */}
            {!loading && (products.length > 0 || categories.length > 0) && (
              <div className="space-y-4">
                {/* Categories */}
                {categories.length > 0 && (
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">
                      Categories
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((c) => (
                        <button
                          key={c.slug}
                          type="button"
                          onClick={() => handleItemClick(c.url)}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-left hover:border-[#e21b23] hover:bg-white/10 transition group"
                        >
                          <span className="text-xs font-bold text-white group-hover:text-[#e21b23] truncate">
                            {c.name}
                          </span>
                          <ArrowRightIcon className="h-3.5 w-3.5 text-gray-400 group-hover:text-white shrink-0 ml-1" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products */}
                {products.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                        Equipment Models ({products.length})
                      </span>
                      <span className="text-[10px] text-gray-500">Tap to view</span>
                    </div>
                    <div className="space-y-2">
                      {products.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleItemClick(p.url)}
                          className="flex items-center gap-3 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-left hover:border-[#e21b23] hover:bg-white/10 transition group"
                        >
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#1c1f26] p-1">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="48px"
                              className="object-contain"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-white group-hover:text-[#e21b23] truncate">
                              {p.name}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {p.model && (
                                <span className="rounded bg-[#e21b23]/20 border border-[#e21b23]/40 px-1.5 py-0.2 text-[9px] font-mono font-bold text-[#ff5c62]">
                                  {p.model}
                                </span>
                              )}
                              <span className="text-[10px] text-gray-400 truncate">
                                {p.category}
                              </span>
                            </div>
                          </div>
                          <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-white shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
