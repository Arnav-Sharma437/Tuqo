
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_CONFIG, NAV_LINKS } from "@/constants";
import { TuqoLogo } from "@/components/common/TuqoLogo";
import {
  PhoneIcon,
  MenuIcon,
  XIcon,
} from "@/components/common/Icons";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-[#111214] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex min-h-[76px] max-w-[1500px] items-center gap-5 px-5 sm:px-8 lg:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center transition-opacity duration-200 hover:opacity-80"
          >
            <div className="rounded-sm bg-[#111214] px-3 py-2">
              <TuqoLogo variant="white" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="ml-auto hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex h-11 items-center rounded-md px-3 text-[13px] font-bold transition-all duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e21b23] ${
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
              className="flex h-10 w-10 items-center justify-center rounded-md bg-[#e21b23] text-white transition-colors hover:bg-[#b8141a]"
              aria-label="Call TUQO Tools"
            >
              <PhoneIcon className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-[#111214] transition-colors hover:border-[#e21b23] hover:text-[#e21b23]"
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
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex h-12 items-center border-b border-gray-100 text-[13px] font-bold transition-colors ${
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
                className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#e21b23] text-[13px] font-bold text-white transition-colors hover:bg-[#b8141a]"
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
