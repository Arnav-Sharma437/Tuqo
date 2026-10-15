"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { APP_CONFIG } from "@/constants";
import { TuqoLogo } from "@/components/common/TuqoLogo";
import {
  PhoneIcon,
  WhatsAppIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  ArrowRightIcon,
} from "@/components/common/Icons";

export interface NavCategoryItem {
  name: string;
  href: string;
  image: string;
  desc: string;
}

const DEFAULT_CATEGORY_DROPDOWN: NavCategoryItem[] = [
  {
    name: "High Pressure Washers",
    href: "/products/high-pressure-washer",
    image: "/images/cat-pressure-washer.png",
    desc: "Commercial induction & brass pump washers",
  },
  {
    name: "Air Compressors",
    href: "/products/air-compressor",
    image: "/images/cat-air-compressor.png",
    desc: "Heavy-duty workshop & industrial compressors",
  },
  {
    name: "Power Tools",
    href: "/products/power-tools",
    image: "/images/cat-power-tools.png",
    desc: "Drills, angle grinders & demolition tools",
  },
  {
    name: "Washer Accessories",
    href: "/products/high-pressure-washer-accessories",
    image: "/images/cat-accessories.png",
    desc: "Hoses, guns, foam cannons & brass nozzles",
  },
  {
    name: "Auto Detailing Range",
    href: "/products/auto-detailing",
    image: "/images/cat-foam-dispenser.png",
    desc: "Professional vehicle washing & detailing units",
  },
  {
    name: "Power Tool Accessories",
    href: "/products/power-tools-accessories",
    image: "/images/cat-accessories.png",
    desc: "Discs, blades, bits & spare components",
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categoryItems, setCategoryItems] = useState<NavCategoryItem[]>(
    DEFAULT_CATEGORY_DROPDOWN
  );

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Handle sticky scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch live categories from backend
  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
          const mapped: NavCategoryItem[] = data.categories.map((c: any) => ({
            name: c.name,
            href: `/products/${c.slug}`,
            image: c.image || "/images/cat-accessories.png",
            desc: c.description || "Explore products & specifications",
          }));
          setCategoryItems(mapped);
        }
      })
      .catch(() => {});
  }, []);

  // Close menus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
    setMobileCategoriesOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setCategoriesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setCategoriesDropdownOpen(false);
    }, 180);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200"
          : "bg-white border-b border-gray-100 shadow-xs"
      }`}
    >
      <div className="mx-auto flex h-[72px] sm:h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* ================= 1. BRAND LOGO ================= */}
        <div className="flex shrink-0 items-center">
          <Link
            href="/"
            className="flex items-center py-2 transition-opacity duration-200 hover:opacity-85"
            aria-label="TUQO Tools Home"
          >
            <TuqoLogo variant="black" width={150} priority />
          </Link>
        </div>

        {/* ================= 2. DESKTOP CENTER NAVIGATION ================= */}
        <nav className="hidden items-center gap-1 xl:gap-2 lg:flex">
          {/* Home */}
          <Link
            href="/"
            className={`relative flex h-14 items-center px-3.5 text-[13px] font-bold uppercase tracking-wider transition-colors duration-200 ${
              pathname === "/"
                ? "text-[#e21b23]"
                : "text-[#111214] hover:text-[#e21b23]"
            }`}
          >
            <span>Home</span>
            {pathname === "/" && (
              <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-[#e21b23]" />
            )}
          </Link>

          {/* Categories with Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/categories"
              className={`relative flex h-14 items-center gap-1.5 px-3.5 text-[13px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                pathname.startsWith("/categories") || pathname.startsWith("/products")
                  ? "text-[#e21b23]"
                  : "text-[#111214] hover:text-[#e21b23]"
              }`}
            >
              <span>Products</span>
              <ChevronDownIcon
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  categoriesDropdownOpen ? "rotate-180 text-[#e21b23]" : "text-gray-400"
                }`}
              />
              {(pathname.startsWith("/categories") || pathname.startsWith("/products")) && (
                <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-[#e21b23]" />
              )}
            </Link>

            {/* Dropdown Menu */}
            {categoriesDropdownOpen && (
              <div className="absolute left-0 top-full w-[420px] rounded-2xl border border-gray-200 bg-white p-3 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="mb-2 px-3 pt-2 text-[10px] font-black uppercase tracking-wider text-[#e21b23]">
                  MACHINERY &amp; EQUIPMENT
                </div>

                <div className="space-y-1">
                  {categoryItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-center gap-3.5 rounded-xl px-2.5 py-2 transition-all hover:bg-gray-50"
                    >
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-[#f8f9fa] p-1 shadow-2xs group-hover:border-[#e21b23]/30 transition-colors">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="44px"
                          className="object-contain p-0.5 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-[#111214] group-hover:text-[#e21b23] transition-colors truncate">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-gray-500 mt-0.5 truncate">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-2 border-t border-gray-100 pt-2 px-1">
                  <Link
                    href="/categories"
                    className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-gray-800 transition hover:bg-[#e21b23] hover:text-white"
                  >
                    <span>View All Categories</span>
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* E-Catalog */}
          <Link
            href="/e-catalog"
            className={`relative flex h-14 items-center gap-1.5 px-3.5 text-[13px] font-bold uppercase tracking-wider transition-colors duration-200 ${
              pathname === "/e-catalog"
                ? "text-[#e21b23]"
                : "text-[#111214] hover:text-[#e21b23]"
            }`}
          >
            <span>E-Catalog</span>
            <span className="rounded bg-red-100 px-1.5 py-0.5 text-[9px] font-black uppercase text-[#e21b23]">
              PDF
            </span>
            {pathname === "/e-catalog" && (
              <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-[#e21b23]" />
            )}
          </Link>

          {/* About */}
          <Link
            href="/about"
            className={`relative flex h-14 items-center px-3.5 text-[13px] font-bold uppercase tracking-wider transition-colors duration-200 ${
              pathname === "/about"
                ? "text-[#e21b23]"
                : "text-[#111214] hover:text-[#e21b23]"
            }`}
          >
            <span>About Us</span>
            {pathname === "/about" && (
              <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-[#e21b23]" />
            )}
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className={`relative flex h-14 items-center px-3.5 text-[13px] font-bold uppercase tracking-wider transition-colors duration-200 ${
              pathname === "/contact"
                ? "text-[#e21b23]"
                : "text-[#111214] hover:text-[#e21b23]"
            }`}
          >
            <span>Contact</span>
            {pathname === "/contact" && (
              <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-[#e21b23]" />
            )}
          </Link>
        </nav>

        {/* ================= 3. RIGHT ACTIONS ================= */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Desktop Helpline */}
          <a
            href={`tel:${APP_CONFIG.phoneRaw}`}
            className="hidden xl:flex items-center gap-2.5 text-xs font-bold text-gray-700 hover:text-[#e21b23] transition-colors pr-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[#e21b23] border border-red-100">
              <PhoneIcon className="h-4 w-4" />
            </div>
            <div className="text-left">
              <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-400">
                Direct Desk
              </span>
              <span className="font-extrabold text-[#111214] tracking-tight">
                {APP_CONFIG.phone}
              </span>
            </div>
          </a>

          {/* Direct WhatsApp CTA Button */}
          <a
            href={APP_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#e21b23] px-4 text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-red-900/20 transition-all hover:bg-[#b8141a] hover:scale-[1.02] active:scale-95"
          >
            <WhatsAppIcon className="h-4 w-4 text-white" />
            <span>Quick Inquiry</span>
          </a>

          {/* Mobile Phone Call Button */}
          <a
            href={`tel:${APP_CONFIG.phoneRaw}`}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[#e21b23] border border-red-200 transition-colors sm:hidden"
            aria-label="Call TUQO"
          >
            <PhoneIcon className="h-4 w-4" />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-[#111214] transition-colors hover:border-[#e21b23] hover:text-[#e21b23] lg:hidden"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* ================= 4. MOBILE MENU DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-5 py-6 shadow-2xl lg:hidden max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {/* Home */}
            <Link
              href="/"
              className={`flex h-12 items-center justify-between border-b border-gray-100 text-sm font-bold uppercase tracking-wider ${
                pathname === "/" ? "text-[#e21b23]" : "text-[#111214]"
              }`}
            >
              <span>Home</span>
              {pathname === "/" && <span className="h-2 w-2 rounded-full bg-[#e21b23]" />}
            </Link>

            {/* Categories Accordion */}
            <div className="border-b border-gray-100">
              <button
                type="button"
                onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                className="flex h-12 w-full items-center justify-between text-sm font-bold uppercase tracking-wider text-[#111214]"
              >
                <span>Products &amp; Categories</span>
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${
                    mobileCategoriesOpen ? "rotate-180 text-[#e21b23]" : "text-gray-400"
                  }`}
                />
              </button>

              {mobileCategoriesOpen && (
                <div className="pb-3 pl-1 space-y-1.5">
                  {categoryItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 rounded-xl p-2 text-xs font-semibold text-gray-700 hover:text-[#e21b23] hover:bg-gray-50 transition-all"
                    >
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-[#f8f9fa] p-1">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="36px"
                          className="object-contain"
                        />
                      </div>
                      <span className="truncate">{item.name}</span>
                    </Link>
                  ))}
                  <Link
                    href="/categories"
                    className="block pt-2 text-xs font-bold uppercase text-[#e21b23] pl-2"
                  >
                    View All Categories &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* E-Catalog */}
            <Link
              href="/e-catalog"
              className={`flex h-12 items-center justify-between border-b border-gray-100 text-sm font-bold uppercase tracking-wider ${
                pathname === "/e-catalog" ? "text-[#e21b23]" : "text-[#111214]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>E-Catalog</span>
                <span className="rounded bg-red-100 px-1.5 py-0.2 text-[9px] font-black text-[#e21b23]">
                  PDF
                </span>
              </div>
              {pathname === "/e-catalog" && (
                <span className="h-2 w-2 rounded-full bg-[#e21b23]" />
              )}
            </Link>

            {/* About */}
            <Link
              href="/about"
              className={`flex h-12 items-center justify-between border-b border-gray-100 text-sm font-bold uppercase tracking-wider ${
                pathname === "/about" ? "text-[#e21b23]" : "text-[#111214]"
              }`}
            >
              <span>About Us</span>
              {pathname === "/about" && (
                <span className="h-2 w-2 rounded-full bg-[#e21b23]" />
              )}
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={`flex h-12 items-center justify-between border-b border-gray-100 text-sm font-bold uppercase tracking-wider ${
                pathname === "/contact" ? "text-[#e21b23]" : "text-[#111214]"
              }`}
            >
              <span>Contact Us</span>
              {pathname === "/contact" && (
                <span className="h-2 w-2 rounded-full bg-[#e21b23]" />
              )}
            </Link>

            {/* Action Buttons */}
            <div className="pt-6 space-y-3">
              <a
                href={APP_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] text-xs font-extrabold uppercase tracking-wider text-black shadow-md"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${APP_CONFIG.phoneRaw}`}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#111214] text-xs font-extrabold uppercase tracking-wider text-white"
              >
                <PhoneIcon className="h-4 w-4" />
                <span>Call {APP_CONFIG.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
