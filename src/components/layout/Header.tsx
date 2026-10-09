"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_CONFIG, NAV_LINKS } from "@/constants";
import { TuqoLogo } from "@/components/common/TuqoLogo";
import {
  PhoneIcon,
  ChevronDownIcon,
  MenuIcon,
  XIcon,
} from "@/components/common/Icons";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProductsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    setMobileProductsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-[#111214] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      {/* Main Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex min-h-[76px] max-w-[1500px] items-center gap-5 px-5 sm:px-8 lg:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center transition-opacity duration-200 hover:opacity-80 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e21b23]"
          >
            <div className="rounded-sm bg-[#111214] px-3 py-2">
              <TuqoLogo variant="white" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="ml-auto hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              if (link.subItems) {
                return (
                  <div
                    key={link.label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setProductsDropdownOpen(!productsDropdownOpen)
                      }
                      className={`flex h-11 items-center gap-1.5 rounded-md px-3 text-[11px] font-extrabold uppercase tracking-wide transition-all duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e21b23] ${
                        productsDropdownOpen
                          ? "bg-[#e21b23] text-white"
                          : "text-[#111214] hover:bg-gray-100 hover:text-[#e21b23]"
                      }`}
                      aria-expanded={productsDropdownOpen}
                    >
                      <span>{link.label}</span>
                      <ChevronDownIcon
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          productsDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {productsDropdownOpen && (
                      <div className="absolute left-0 top-full pt-2">
                        <div className="w-64 overflow-hidden rounded-md border border-gray-200 bg-white p-2 text-gray-900 shadow-2xl">
                          {link.subItems.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="block rounded-md px-4 py-3 text-[10px] font-extrabold uppercase tracking-wide text-gray-700 transition-all duration-200 hover:bg-red-50 hover:text-[#e21b23] focus:outline-none focus-visible:bg-red-50 focus-visible:text-[#e21b23]"
                              onClick={() =>
                                setProductsDropdownOpen(false)
                              }
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex h-11 items-center rounded-md px-3 text-[11px] font-extrabold uppercase tracking-wide transition-all duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e21b23] ${
                    isActive
                      ? "bg-[#e21b23] text-white"
                      : "text-[#111214] hover:bg-gray-100 hover:text-[#e21b23]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Actions */}
          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${APP_CONFIG.phoneRaw}`}
              className="flex h-10 w-10 items-center justify-center rounded-md bg-[#e21b23] text-white transition-colors hover:bg-[#b8141a] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e21b23]"
              aria-label="Call Tuqo Tools"
            >
              <PhoneIcon className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-[#111214] transition-colors hover:border-[#e21b23] hover:text-[#e21b23] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e21b23]"
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
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-5 py-5 shadow-xl lg:hidden">
          <div className="flex flex-col">
            {NAV_LINKS.map((link) => {
              if (link.subItems) {
                return (
                  <div
                    key={link.label}
                    className="border-b border-gray-100"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setMobileProductsOpen(!mobileProductsOpen)
                      }
                      className="flex h-12 w-full items-center justify-between text-[11px] font-extrabold uppercase tracking-wide text-[#111214] focus:outline-none focus-visible:text-[#e21b23]"
                      aria-expanded={mobileProductsOpen}
                    >
                      <span>{link.label}</span>
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform ${
                          mobileProductsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {mobileProductsOpen && (
                      <div className="mb-3 ml-3 border-l-2 border-[#e21b23] pl-4">
                        {link.subItems.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="block py-2.5 text-[10px] font-bold uppercase tracking-wide text-gray-600 transition-colors hover:text-[#e21b23] focus:outline-none focus-visible:text-[#e21b23]"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex h-12 items-center border-b border-gray-100 text-[11px] font-extrabold uppercase tracking-wide transition-colors focus:outline-none focus-visible:text-[#e21b23] ${
                    isActive
                      ? "text-[#e21b23]"
                      : "text-[#111214] hover:text-[#e21b23]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-5">
              <a
                href={`tel:${APP_CONFIG.phoneRaw}`}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#e21b23] text-[10px] font-extrabold uppercase tracking-wider text-white transition-colors hover:bg-[#b8141a] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e21b23]"
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
