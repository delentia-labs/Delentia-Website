"use client"

import { m, useInView, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { useMounted } from "@/hooks/use-mounted"
import { usePathname } from "next/navigation"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"

// ─── Metric data ─────────────────────────────────────────────────────────────

const architectureMetrics = [
  { id: "algorithms",    en: "41 Algorithms",        th: "41 Algorithms",        pct: 82 },
  { id: "layers",        en: "10 Arch Layers",        th: "10 Arch Layers",        pct: 100 },
  { id: "genomes",       en: "7 Genome Subsystems",   th: "7 Genome Subsystems",   pct: 78 },
]

const performanceMetrics = [
  { id: "intent",        en: "Intent Pipeline",      th: "Intent Pipeline",      pct: 94 },
  { id: "verification",  en: "Verification Score",   th: "Verification Score",   pct: 87 },
  { id: "memory",        en: "Memory Compression",   th: "Memory Compression",   pct: 93 },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function ProgressBar({
  label,
  pct,
  delay,
  isDark,
  shouldAnimate,
}: {
  label: string
  pct: number
  delay: number
  isDark: boolean
  shouldAnimate: boolean
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs font-medium">
        <span className={isDark ? "text-warm-pale/80" : "text-warm-secondary"}>{label}</span>
        <span className={`tabular-nums ${isDark ? "text-warm-amber/90" : "text-warm-charcoal"}`}>
          {pct}%
        </span>
      </div>
      <div className={`h-1.5 w-full overflow-hidden rounded-full ${isDark ? "bg-white/8" : "bg-warm-light-gray/60"}`}>
        <m.div
          className={`h-full rounded-full ${
            pct === 100
              ? "bg-warm-sage"
              : isDark
              ? "bg-warm-amber"
              : "bg-warm-charcoal"
          }`}
          initial={shouldAnimate ? { width: 0 } : { width: `${pct}%` }}
          animate={{ width: `${pct}%` }}
          transition={
            shouldAnimate
              ? { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }
              : { duration: 0 }
          }
        />
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function HeroMetricsPanel() {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const pathname = usePathname()
  const locale = resolveLocale(pathname, language)
  const localePrefix = getLocalePrefix(locale)
  const prefersReducedMotion = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(panelRef, { margin: "-60px", once: true })

  const isDark = mounted && resolvedTheme === "dark"
  const shouldAnimate = !prefersReducedMotion && isInView

  const isTH = language === "th"

  return (
    <div
      ref={panelRef}
      className={`relative rounded-[28px] border shadow-[0_14px_32px_rgba(84,61,31,0.07)] ${
        isDark
          ? "border-border bg-card/88"
          : "border-[#eadfce] bg-[#fff7f0]/92"
      } p-4 sm:p-5`}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className={`text-xs font-medium mb-0.5 ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>
            {isTH ? "สถานะระบบ Delentia OS" : "Delentia OS Status"}
          </div>
          <div className={`text-sm font-bold font-mono ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
            Architecture &amp; Performance
          </div>
        </div>

        {/* Live beacon */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="relative flex h-2 w-2">
            <m.span
              className="absolute inline-flex h-full w-full rounded-full bg-warm-sage opacity-75"
              animate={shouldAnimate ? { opacity: [0.35, 0.75, 0.35] } : { opacity: 0.45 }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-warm-sage" />
          </span>
          <span className={`text-[10px] font-semibold uppercase tracking-wide ${isDark ? "text-warm-sage" : "text-warm-sage"}`}>
            Live
          </span>
        </div>
      </div>

      {/* ── Architecture Foundation ─────────────────────────────────── */}
      <div className="mb-4 space-y-2.5">
        <div className={`text-[10px] font-bold uppercase tracking-[0.18em] ${isDark ? "text-warm-subtle" : "text-warm-gray"}`}>
          {isTH ? "รากฐานสถาปัตยกรรม" : "Architecture Foundation"}
        </div>
        {architectureMetrics.map((_item, i) => (
          <ProgressBar
            key={_item.id}
            label={isTH ? _item.th : _item.en}
            pct={_item.pct}
            delay={i * 0.1}
            isDark={isDark}
            shouldAnimate={shouldAnimate}
          />
        ))}
      </div>

      {/* ── Divider ────────────────────────────────────────────────── */}
      <div className={`my-3 h-px ${isDark ? "bg-white/6" : "bg-warm-light-gray/50"}`} />

      {/* ── System Performance ─────────────────────────────────────── */}
      <div className="mb-4 space-y-2.5">
        <div className={`text-[10px] font-bold uppercase tracking-[0.18em] ${isDark ? "text-warm-subtle" : "text-warm-gray"}`}>
          {isTH ? "ประสิทธิภาพระบบ" : "System Performance"}
        </div>
        {performanceMetrics.map((_item, i) => (
          <ProgressBar
            key={_item.id}
            label={isTH ? _item.th : _item.en}
            pct={_item.pct}
            delay={architectureMetrics.length * 0.1 + i * 0.1}
            isDark={isDark}
            shouldAnimate={shouldAnimate}
          />
        ))}
      </div>

      {/* ── Divider ────────────────────────────────────────────────── */}
      <div className={`my-3 h-px ${isDark ? "bg-white/6" : "bg-warm-light-gray/50"}`} />

      {/* ── FDIA Teaser ─────────────────────────────────────────────── */}
      <div className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 ${
        isDark ? "border-border bg-card/60" : "border-[#eadfce] bg-[#fffaf5]"
      }`}>
        <div>
          <div className={`text-[10px] font-semibold uppercase tracking-wide mb-0.5 ${isDark ? "text-warm-amber/80" : "text-warm-gray"}`}>
            FDIA Equation
          </div>
          <div className={`text-sm font-bold font-mono ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
            F = D<sup className="text-warm-terracotta text-[10px]">I</sup> × A
          </div>
          <div className={`text-[11px] mt-0.5 ${isDark ? "text-warm-subtle" : "text-warm-gray"}`}>
            {isTH ? "Intent ขยาย Data สู่อนาคต" : "Intent amplifies Data into Future"}
          </div>
        </div>
        <Link
          href={`${localePrefix}/fdia`}
          className={`shrink-0 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors duration-150 ${
            isDark
              ? "bg-warm-amber/10 text-warm-amber hover:bg-warm-amber/20 border border-warm-amber/20"
              : "bg-warm-charcoal/5 text-warm-charcoal hover:bg-warm-charcoal/10 border border-warm-light-gray"
          }`}
        >
          {isTH ? "เรียนรู้" : "Learn"}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
