import React from "react";
import { ShieldCheckIcon, CogIcon, QualityDiamondIcon, UsersSupportIcon } from "@/components/common/Icons";

export function EngineeringAdvantage() {
  const advantages = [
    {
      title: "100% Pure Copper Winding",
      description:
        "High-grade electrolytic copper armatures deliver higher torque output, superior thermal dissipation, and extended motor lifespan under continuous industrial loads.",
      badge: "Thermal Endurance",
      icon: <QualityDiamondIcon className="h-6 w-6 text-[#d31820]" />,
    },
    {
      title: "Die-Cast Alloy & Brass Pumps",
      description:
        "High-pressure components use precision-machined brass heads and anodized aluminum crankcases to withstand extreme bar pressures without cracking or cavitation.",
      badge: "High Pressure Ready",
      icon: <CogIcon className="h-6 w-6 text-[#d31820]" />,
    },
    {
      title: "Dual Overload & Surge Protection",
      description:
        "Integrated thermal sensors and heavy-duty capacitors safeguard motors against voltage spikes, sudden stall conditions, and extended run-time overheating.",
      badge: "Failsafe System",
      icon: <ShieldCheckIcon className="h-6 w-6 text-[#d31820]" />,
    },
    {
      title: "Dedicated Spares & Service Network",
      description:
        "From replacement spray nozzles and seals to pistons and carbon brushes, genuine TUQO spare components are always available for zero downtime.",
      badge: "Zero Downtime",
      icon: <UsersSupportIcon className="h-6 w-6 text-[#d31820]" />,
    },
  ];

  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-6 rounded-full bg-[#d31820]" />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#d31820]">
              ENGINEERING EXCELLENCE
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-gray-950 sm:text-3xl lg:text-4xl">
            BUILT TO OUTLAST THE TOUGHEST JOBSITE
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Every TUQO machine is crafted with heavy-duty components and rigorous quality controls so your workflow never gets interrupted.
          </p>
        </div>

        {/* 4 Feature Columns Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((adv) => (
            <div
              key={adv.title}
              className="group relative flex flex-col justify-between rounded-2xl border border-gray-200/90 bg-[#fafbfc] p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-red-300 hover:bg-white hover:shadow-xl hover:shadow-red-500/5"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-gray-200/80 shadow-xs group-hover:border-red-200 group-hover:bg-red-50/50 transition-colors">
                    {adv.icon}
                  </div>
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-600 group-hover:bg-red-100 group-hover:text-[#d31820] transition-colors">
                    {adv.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-950 leading-snug group-hover:text-[#d31820] transition-colors">
                  {adv.title}
                </h3>

                <p className="mt-2.5 text-xs text-gray-600 leading-relaxed">
                  {adv.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Standard Feature
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
