import React from "react";
import {
  ShieldCheckIcon,
  CogIcon,
  QualityDiamondIcon,
  UsersSupportIcon,
} from "@/components/common/Icons";

export function EngineeringAdvantage() {
  const advantages = [
    {
      number: "01",
      title: "100% Pure Copper Winding",
      description:
        "High-grade electrolytic copper armatures deliver higher torque output, superior thermal dissipation, and extended motor lifespan under continuous industrial loads.",
      badge: "Thermal Endurance",
      icon: <QualityDiamondIcon className="h-6 w-6 text-white" />,
    },
    {
      number: "02",
      title: "Die-Cast Alloy & Brass Pumps",
      description:
        "High-pressure components use precision-machined brass heads and anodized aluminum crankcases to withstand extreme bar pressures without cracking or cavitation.",
      badge: "High Pressure Ready",
      icon: <CogIcon className="h-6 w-6 text-white" />,
    },
    {
      number: "03",
      title: "Dual Overload & Surge Protection",
      description:
        "Integrated thermal sensors and heavy-duty capacitors safeguard motors against voltage spikes, sudden stall conditions, and extended run-time overheating.",
      badge: "Failsafe System",
      icon: <ShieldCheckIcon className="h-6 w-6 text-white" />,
    },
    {
      number: "04",
      title: "Dedicated Spares & Service Network",
      description:
        "From replacement spray nozzles and seals to pistons and carbon brushes, genuine TUQO spare components are always available for zero downtime.",
      badge: "Zero Downtime",
      icon: <UsersSupportIcon className="h-6 w-6 text-white" />,
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#0b0c0f] py-16 text-white sm:py-20 lg:py-24">

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Red glow */}
      <div className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-red-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">

        {/* ================= HEADER ================= */}
        <div className="mb-10 max-w-3xl lg:mb-12">

          <div className="mb-3 flex items-center gap-2">
            <span className="h-[3px] w-7 bg-[#e21b23]" />

            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#e21b23] sm:text-xs">
              ENGINEERING EXCELLENCE
            </span>
          </div>

          <h2 className="text-3xl font-black uppercase leading-[1] tracking-tight sm:text-4xl lg:text-5xl">
            BUILT TO OUTLAST
            <br />
            <span className="text-[#e21b23]">
              THE TOUGHEST JOBSITE
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
            Every TUQO machine is crafted with heavy-duty components and
            rigorous quality controls so your workflow never gets interrupted.
          </p>

        </div>

        {/* ================= ADVANTAGES ================= */}
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">

          {advantages.map((adv) => (
            <div
              key={adv.title}
              className="group relative flex min-h-[330px] flex-col justify-between bg-[#101114] p-6 transition-all duration-300 hover:bg-[#15161a] sm:p-7"
            >

              {/* Number */}
              <div className="absolute right-5 top-5 text-4xl font-black text-white/[0.05] transition-colors duration-300 group-hover:text-[#e21b23]/10">
                {adv.number}
              </div>

              <div>

                {/* Icon */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-sm bg-[#e21b23] shadow-[0_8px_25px_rgba(226,27,35,0.2)] transition-transform duration-300 group-hover:-translate-y-1">
                  {adv.icon}
                </div>

                {/* Badge */}
                <span className="inline-flex border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-wider text-gray-400 transition-colors group-hover:border-[#e21b23]/40 group-hover:text-[#e21b23]">
                  {adv.badge}
                </span>

                {/* Title */}
                <h3 className="mt-4 text-base font-black uppercase leading-tight tracking-tight text-white transition-colors group-hover:text-[#e21b23] sm:text-lg">
                  {adv.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-xs leading-5 text-gray-500 sm:text-[13px]">
                  {adv.description}
                </p>

              </div>

              {/* Bottom */}
              <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4">

                <span className="h-1.5 w-1.5 rounded-full bg-[#e21b23]" />

                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500">
                  TUQO Engineering Standard
                </span>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Bottom red line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#e21b23]" />

    </section>
  );
}
