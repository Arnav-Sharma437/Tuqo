import React from "react";
import { TRUST_FEATURES } from "@/constants";
import {
  ShieldCheckIcon,
  CogIcon,
  QualityDiamondIcon,
  UsersSupportIcon,
} from "@/components/common/Icons";

export function TrustStrip() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "shield":
        return <ShieldCheckIcon className="h-6 w-6 text-gray-900" />;
      case "cog":
        return <CogIcon className="h-6 w-6 text-gray-900" />;
      case "diamond":
        return <QualityDiamondIcon className="h-6 w-6 text-gray-900" />;
      case "support":
        return <UsersSupportIcon className="h-6 w-6 text-gray-900" />;
      default:
        return <ShieldCheckIcon className="h-6 w-6 text-gray-900" />;
    }
  };

  return (
    <section className="w-full border-y border-gray-200 bg-white py-6 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {TRUST_FEATURES.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3.5 px-2 py-1 transition hover:translate-x-0.5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-50 border border-gray-100 shadow-sm">
                {getIcon(item.icon)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-bold uppercase tracking-tight text-gray-900 sm:text-sm">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-[11px] text-gray-500 leading-tight">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
