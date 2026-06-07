"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { getLocalePrefix } from "@/lib/i18n"

interface EcosystemOrbitalMapProps {
  locale: "en" | "th"
}

export function EcosystemOrbitalMap({ locale }: EcosystemOrbitalMapProps) {
  const isTH = locale === "th"
  const localePrefix = getLocalePrefix(locale)
  const [hoveredOrbit, setHoveredOrbit] = useState<string | null>(null)

  const orbits = [
    {
      id: "github",
      name: isTH ? "GitHub Source & Logic" : "GitHub Source & Logic",
      href: "/ecosystem/github",
      color: "border-blue-300 dark:border-blue-800 bg-blue-500",
      description: isTH
        ? "ซอร์สโค้ดตรรกะระบบ JITNA v3 / RCT v5"
        : "Core logic files, protocol rules, and SDK codebases.",
      positionClass: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
      size: "h-32 w-32 md:h-48 md:w-48",
    },
    {
      id: "packages",
      name: isTH ? "NPM / PyPI Packages" : "NPM / PyPI Packages",
      href: "/packages",
      color: "border-purple-300 dark:border-purple-800 bg-purple-500",
      description: isTH
        ? "ดาวน์โหลดและติดตั้ง SDK ผ่านคำสั่งโค้ดใน 1 บรรทัด"
        : "Downloadable developer SDKs for JS and Python runtimes.",
      positionClass: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
      size: "h-48 w-48 md:h-72 md:w-72",
    },
    {
      id: "models",
      name: isTH ? "Hugging Face Models" : "Hugging Face Models",
      href: "/models",
      color: "border-amber-300 dark:border-amber-800 bg-amber-500",
      description: isTH
        ? "คะแนนคุณภาพและสเปกโมเดลภาษาขนาดเล็ก (SLMs)"
        : "Custom fine-tuned SLM checkpoints with benchmark gates.",
      positionClass: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
      size: "h-64 w-64 md:h-96 md:w-96",
    },
    {
      id: "playground",
      name: isTH ? "Colab & Kaggle Sandbox" : "Colab & Kaggle Sandbox",
      href: "/playground",
      color: "border-green-300 dark:border-green-800 bg-green-500",
      description: isTH
        ? "ทรายทดลองความปลอดภัยและชุดข้อมูลทดสอบประสิทธิภาพ"
        : "Interactive playgrounds and evaluation datasets on the cloud.",
      positionClass: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
      size: "h-80 w-80 md:h-[120px] md:w-[120px] lg:h-120 lg:w-120",
    },
  ]

  return (
    <div className="relative border border-gray-150 dark:border-gray-850 rounded-3xl p-6 md:p-12 space-y-8 bg-gray-50/20 dark:bg-black/5 backdrop-blur-xs overflow-hidden min-h-[450px] flex flex-col items-center justify-center">
      {/* Center Star representing Delentia OS Kernel */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 h-28 w-28 md:h-36 md:w-36 rounded-full shadow-lg">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-amber-500/10 blur-md pointer-events-none"
        />
        <span className="text-2xl mb-1">🧠</span>
        <span className="text-xs font-bold leading-tight uppercase tracking-wide">Delentia OS</span>
        <span className="text-[9px] text-gray-400 font-mono mt-0.5">Kernel</span>
      </div>

      {/* Orbit Rings (Desktop Only) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gray-200 dark:border-gray-800 h-48 w-48" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gray-200 dark:border-gray-800 h-72 w-72" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gray-200 dark:border-gray-800 h-96 w-96" />
      </div>

      {/* Interactive Orbit Targets */}
      <div className="relative w-full max-w-lg grid grid-cols-2 gap-4 md:absolute md:inset-0 md:max-w-none md:block">
        {orbits.map((orbit) => (
          <div
            key={orbit.id}
            className={`relative md:absolute ${orbit.positionClass} z-20 flex flex-col items-center justify-center text-center p-4`}
          >
            <Link
              href={`${localePrefix}${orbit.href}`}
              onMouseEnter={() => setHoveredOrbit(orbit.id)}
              onMouseLeave={() => setHoveredOrbit(null)}
              className="flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`h-10 w-10 md:h-12 md:w-12 rounded-full border-4 flex items-center justify-center text-white font-bold cursor-pointer shadow-md transition-colors ${orbit.color}`}
              >
                {orbit.id === "github" ? "🐙" : orbit.id === "packages" ? "📦" : orbit.id === "models" ? "🤖" : "🧪"}
              </motion.div>
              <span className="text-xs font-bold mt-2 hover:underline text-gray-800 dark:text-gray-200">
                {orbit.name}
              </span>
            </Link>
          </div>
        ))}
      </div>

      {/* Interactive Detail Card Overlay */}
      <div className="relative z-30 min-h-[60px] text-center max-w-sm pt-4 md:pt-0">
        {hoveredOrbit ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-xl shadow-md text-xs space-y-1"
          >
            <p className="font-bold text-gray-950 dark:text-white">
              {orbits.find((o) => o.id === hoveredOrbit)?.name}
            </p>
            <p className="text-gray-500">
              {orbits.find((o) => o.id === hoveredOrbit)?.description}
            </p>
          </motion.div>
        ) : (
          <p className="text-xs text-gray-400 italic">
            {isTH
              ? "*เอาเมาส์ชี้วงโคจรดาวเคราะห์เพื่อสำรวจการเชื่อมโยงระบบนิเวศ JITNA Pipeline"
              : "*Hover over orbits to explore JITNA ecosystem pipeline routes."}
          </p>
        )}
      </div>
    </div>
  )
}
