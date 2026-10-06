import React from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";
import { TuqoLogo } from "@/components/common/TuqoLogo";
import { FacebookIcon, InstagramIcon } from "@/components/common/Icons";

export function Footer() {
  return (
    <footer className="w-full bg-[#111215] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="flex flex-col items-center justify-between gap-6 border-b border-gray-800 pb-8 md:flex-row">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link href="/" className="inline-block transition hover:opacity-90">
              <TuqoLogo variant="white" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold uppercase tracking-wider text-gray-400 sm:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition hover:bg-red-600 hover:text-white"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition hover:bg-red-600 hover:text-white"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Credit Row */}
        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-xs text-gray-500 sm:flex-row">
          <p>
            Copyright &copy; {new Date().getFullYear()} Tuqo Tools - All Rights Reserved.
          </p>
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>Powered by</span>
            <span className="font-semibold text-gray-300">GoDaddy Airo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
