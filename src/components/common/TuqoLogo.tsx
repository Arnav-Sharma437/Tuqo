import React from "react";
import Image from "next/image";

interface TuqoLogoProps {
  className?: string;
  variant?: "white" | "dark" | "default";
  width?: number;
  height?: number;
}

export function TuqoLogo({
  className = "",
  variant = "white",
  width = 160,
  height = 42,
}: TuqoLogoProps) {
  return (
    <div className={`flex flex-col items-start select-none ${className}`}>
      <div className="flex items-center">
        <span
          className={`font-black italic tracking-wider text-2xl md:text-3xl uppercase font-sans ${
            variant === "white"
              ? "text-white drop-shadow-sm"
              : variant === "dark"
              ? "text-gray-950"
              : "text-red-600"
          }`}
          style={{
            fontStyle: "italic",
            fontWeight: 900,
            letterSpacing: "0.05em",
          }}
        >
          TUQO
        </span>
      </div>

      <span
        className={`text-[7px] md:text-[8px] font-bold tracking-widest uppercase -mt-1 ${
          variant === "white" ? "text-red-100" : "text-gray-400"
        }`}
        style={{ letterSpacing: "0.18em" }}
      >
        BE PROUD OF YOUR WORK
      </span>
    </div>
  );
}
