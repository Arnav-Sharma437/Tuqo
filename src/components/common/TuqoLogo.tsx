import React from "react";
import Image from "next/image";

export interface TuqoLogoProps {
  className?: string;
  variant?: "white" | "black" | "dark" | "red" | "default";
  width?: number;
  height?: number;
  priority?: boolean;
}

export function TuqoLogo({
  className = "",
  variant = "white",
  width = 160,
  height = 32,
  priority = false,
}: TuqoLogoProps) {
  // Select official logo based on background / color scheme:
  // - "white": for dark backgrounds (navbar, footer, hero, admin)
  // - "black" / "dark": for light / white backgrounds
  // - "red" / "default": for bold red accent branding
  let src = "/brand/tuqo-logo-white.png";
  if (variant === "black" || variant === "dark") {
    src = "/brand/tuqo-logo-black.png";
  } else if (variant === "red" || variant === "default") {
    src = "/brand/tuqo-logo-red.png";
  }

  // Exact aspect ratio of official logo is 1024 x 205 (~ 5 : 1)
  const calculatedHeight = height || Math.round(width / 5);

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <Image
        src={src}
        alt="TUQO Tools"
        width={width}
        height={calculatedHeight}
        priority={priority}
        className="h-auto w-auto object-contain transition-transform duration-200"
        sizes={`${width}px`}
      />
    </div>
  );
}
