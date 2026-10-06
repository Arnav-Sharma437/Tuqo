import React from "react";
import Link from "next/link";
import { NAV_LINKS, APP_CONFIG } from "@/constants";
import { TuqoLogo } from "@/components/common/TuqoLogo";
import { FacebookIcon, InstagramIcon, PhoneIcon } from "@/components/common/Icons";

export function Footer() {
  return (
    <footer className="w-full bg-[#0a0b0e] text-gray-400 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 pb-10 border-b border-white/10 items-center">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="inline-block transition hover:opacity-90">
              <TuqoLogo variant="white" />
            </Link>
            <p className="mt-3 text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              Engineered for high performance and rugged durability. Premium power tools, industrial cleaning systems, and heavy-duty workshop machinery.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-5">
            <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-300">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition hover:text-[#d31820]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Icons & Direct Phone */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col items-start lg:items-end justify-between lg:justify-center gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-all hover:bg-[#d31820] hover:text-white hover:scale-105 border border-white/10"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-all hover:bg-[#d31820] hover:text-white hover:scale-105 border border-white/10"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>

            <a
              href={`tel:${APP_CONFIG.phoneRaw}`}
              className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white transition"
            >
              <PhoneIcon className="h-3.5 w-3.5 text-[#d31820]" />
              <span>{APP_CONFIG.phone}</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright Row (Clean, GoDaddy removed) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            Copyright &copy; {new Date().getFullYear()} Tuqo Tools. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-gray-400 font-semibold tracking-wide">
              {APP_CONFIG.business.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
