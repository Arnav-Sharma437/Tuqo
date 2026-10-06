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

  // Close desktop dropdown when clicking outside
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    setMobileProductsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#d31820] text-white shadow-lg transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 transition hover:opacity-95">
          <TuqoLogo variant="white" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
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
                    onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                    className="flex items-center gap-1.5 py-1 text-sm font-semibold tracking-wide text-white transition hover:text-red-100"
                    aria-expanded={productsDropdownOpen}
                  >
                    <span>{link.label}</span>
                    <ChevronDownIcon
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        productsDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {productsDropdownOpen && (
                    <div className="absolute left-0 top-full pt-2">
                      <div className="w-64 rounded-lg bg-white p-2 text-gray-900 shadow-2xl ring-1 ring-black/10 transition-all">
                        <div className="py-1">
                          {link.subItems.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="block rounded-md px-4 py-2.5 text-xs font-semibold text-gray-800 transition hover:bg-red-50 hover:text-red-600"
                              onClick={() => setProductsDropdownOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
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
                className={`relative py-1 text-sm font-semibold tracking-wide transition hover:text-red-100 ${
                  isActive ? "text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-white" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right CTA Phone Button */}
        <div className="hidden items-center md:flex">
          <a
            href={`tel:${APP_CONFIG.phoneRaw}`}
            className="group flex items-center gap-2.5 rounded-full bg-[#111111] px-5 py-2 text-xs font-bold tracking-wide text-white transition-all duration-200 hover:bg-black hover:shadow-md hover:scale-105 active:scale-95"
          >
            <PhoneIcon className="h-3.5 w-3.5 text-white transition-transform group-hover:rotate-12" />
            <span>{APP_CONFIG.phone}</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`tel:${APP_CONFIG.phoneRaw}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"
            aria-label="Call Tuqo Tools"
          >
            <PhoneIcon className="h-4 w-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-red-700 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-red-700/50 bg-[#b9151c] px-4 py-6 md:hidden">
          <div className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => {
              if (link.subItems) {
                return (
                  <div key={link.label} className="border-b border-red-700/40 pb-2">
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className="flex w-full items-center justify-between py-2 text-base font-semibold text-white"
                    >
                      <span>{link.label}</span>
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform ${
                          mobileProductsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileProductsOpen && (
                      <div className="ml-4 mt-2 space-y-2 border-l-2 border-red-400 pl-3">
                        {link.subItems.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="block py-1.5 text-sm text-red-100 hover:text-white"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block border-b border-red-700/40 py-2 text-base font-semibold text-white hover:text-red-100"
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-3">
              <a
                href={`tel:${APP_CONFIG.phoneRaw}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3 text-sm font-bold text-white shadow-md"
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
