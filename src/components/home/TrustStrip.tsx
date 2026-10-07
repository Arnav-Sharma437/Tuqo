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
        return <ShieldCheckIcon className="h-7 w-7 text-white" />;
      case "cog":
        return <CogIcon className="h-7 w-7 text-white" />;
      case "diamond":
        return <QualityDiamondIcon className="h-7 w-7 text-white" />;
      case "support":
        return <UsersSupportIcon className="h-7 w-7 text-white" />;
      default:
        return <ShieldCheckIcon className="h-7 w-7 text-white" />;
    }
  };

  return (
    <section className="w-full border-y border-white/10 bg-[#101114] text-white">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-white/10">

          {TRUST_FEATURES.map((item) => (
            <div
              key={item.title}
              className="group flex items-center gap-4 px-4 py-6 transition-all duration-300 hover:bg-white/[0.03] sm:px-6 lg:py-7"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#e21b23]/40 bg-[#e21b23]/10 transition-all duration-300 group-hover:border-[#e21b23] group-hover:bg-[#e21b23]">
                {getIcon(item.icon)}
              </div>

              {/* Content */}
              <div className="min-w-0">
                <h3 className="text-xs font-extrabold uppercase tracking-wide text-white sm:text-sm">
                  {item.title}
                </h3>

                <p className="mt-1 text-[10px] leading-4 text-gray-400 sm:text-[11px]">
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
