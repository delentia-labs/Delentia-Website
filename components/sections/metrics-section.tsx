"use client"

import Link from "next/link"
import { m, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { LazyPerformanceRadarChart } from "@/components/diagrams/lazy-diagram-wrapper"
import SectionHeading from "@/components/section-heading"
import OptimizedImage from "@/components/ui/optimized-image"
import { useMounted } from "@/hooks/use-mounted"
import { pixelIcons } from "@/lib/pixel-icons"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"
import { SITE_HALLUCINATION_RATE, SITE_MICROSERVICE_COUNT, SITE_UPTIME } from "@/lib/site-config"

const PIXEL_METRICS = pixelIcons.network

const PIXEL_ICONS = [
  pixelIcons.network,
  pixelIcons.algorithms,
  pixelIcons.architecture,
  pixelIcons.genome,
]

const metrics = [
  { label: { en: "Overall Accuracy", th: "ความแม่นยำโดยรวม" }, value: "not measured", bar: 96.1, color: "#7B9E87" },
  { label: { en: "Hallucination Benchmark", th: "Benchmark Hallucination" }, value: SITE_HALLUCINATION_RATE, bar: 99.7, color: "#7B9E87" },
  { label: { en: "Response Latency", th: "Response Latency" }, value: "< 200ms", bar: 80, color: "#D4A853" },
  { label: { en: "Availability Target", th: "Availability Target" }, value: SITE_UPTIME, bar: 99.9, color: "#7B9E87" },
  { label: { en: "Data Quality Score", th: "คะแนน Data Quality" }, value: "85/100", bar: 85, color: "#89B4C8" },
  { label: { en: "Constitutional Compliance", th: "Constitutional Compliance" }, value: "100%", bar: 100, color: "#7B9E87" },
]

const highlightsData = {
  en: [
    { value: SITE_MICROSERVICE_COUNT, suffix: "+", label: "Runtime Components", desc: "Current public snapshot", href: "/integration" },
    { value: 41, suffix: "", label: "Algorithms", desc: "Across 9 tiers", href: "/algorithms" },
    { value: 10, suffix: "", label: "Layers", desc: "Architecture stack", href: "/architecture" },
    { value: 7, suffix: "", label: "Genomes", desc: "Core DNA components", href: "/genome" },
  ],
  th: [
    { value: SITE_MICROSERVICE_COUNT, suffix: "+", label: "Runtime Components", desc: "สแนปช็อตสาธารณะปัจจุบัน", href: "/integration" },
    { value: 41, suffix: "", label: "Algorithms", desc: "ใน 9 Tiers", href: "/algorithms" },
    { value: 10, suffix: "", label: "Layers", desc: "Architecture Stack", href: "/architecture" },
    { value: 7, suffix: "", label: "Genomes", desc: "องค์ประกอบ DNA หลัก", href: "/genome" },
  ],
}

function AnimatedCounter({ target, suffix = "", reducedMotion = false }: { target: number; suffix?: string; reducedMotion?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    if (reducedMotion) {
      const frame = requestAnimationFrame(() => {
        setCount(target)
      })
      return () => cancelAnimationFrame(frame)
    }

    const duration = 1500
    const startTime = Date.now()
    let frame = 0

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isInView, reducedMotion, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function MetricsSection() {
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const pathname = usePathname()
  const mounted = useMounted()
  const isDark = mounted && resolvedTheme === "dark"
  const prefersReducedMotion = useReducedMotion()
  const highlights = highlightsData[language as keyof typeof highlightsData] || highlightsData.en
  const localePrefix = getLocalePrefix(resolveLocale(pathname, language))

  return (
    <section id="metrics" aria-label="Performance Metrics" className={`py-16 md:py-24 transition-colors duration-300 ${isDark ? "bg-dark-900" : "bg-warm-cream"}`}>
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag={language === "en" ? "Performance" : "ประสิทธิภาพ"}
          tagColor="sage"
          title="System Metrics"
          italicWord="Metrics"
          description={language === "en" ? "Public-safe indicators showing benchmark context, current footprint, and operational targets for the platform." : "ตัวชี้วัดแบบ public-safe ที่แสดงบริบท benchmark footprint ปัจจุบัน และเป้าหมายเชิงปฏิบัติการของแพลตฟอร์ม"}
          pixelIcon={PIXEL_METRICS}
        />

        <m.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? undefined : { duration: 0.35 }}
          className="mb-8 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4"
        >
          {highlights.map((highlight, index) => (
            <Link key={highlight.label} href={`${localePrefix}${highlight.href}`} className="block">
              <m.div whileHover={prefersReducedMotion ? undefined : { y: -2 }} className={`group relative overflow-hidden rounded-2xl border p-5 text-center transition-[border-color,box-shadow,transform] duration-200 ${isDark ? "bg-warm-charcoal border-border hover:shadow-[0_8px_30px_rgba(0,0,0,0.22)]" : "bg-white border-warm-light-gray hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)]"}`}>
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(123,158,135,0.12),transparent_46%)]" />
                </div>
                <OptimizedImage src={PIXEL_ICONS[index]} alt="" pixelated showErrorFallback={false} containerClassName="mx-auto mb-2 h-8 w-8" objectFit="contain" width={32} height={32} className="transition duration-200 group-hover:scale-110 group-hover:brightness-95 group-hover:contrast-125" />
                <div className={`text-3xl font-bold ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}><AnimatedCounter target={highlight.value} suffix={highlight.suffix} reducedMotion={prefersReducedMotion ?? undefined} /></div>
                <div className="mt-1 text-sm font-semibold text-warm-amber">{highlight.label}</div>
                <div className={`mt-0.5 text-xs sm:text-sm ${language === "th" ? "subtitle-th" : ""} ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>{highlight.desc}</div>
              </m.div>
            </Link>
          ))}
        </m.div>

        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
          <m.div initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }} viewport={{ once: true }} transition={prefersReducedMotion ? undefined : { duration: 0.4 }} className="md:col-span-2 lg:col-span-1">
            <LazyPerformanceRadarChart />
          </m.div>
          <div className="space-y-3">
            {metrics.map((metric, index) => (
              <m.div key={metric.label.en} initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} transition={prefersReducedMotion ? undefined : { duration: 0.3, delay: index * 0.03 }} className={`rounded-2xl border p-5 transition-[border-color,box-shadow] duration-200 ${isDark ? "bg-warm-charcoal border-border hover:shadow-[0_4px_20px_rgba(0,0,0,0.18)]" : "bg-white border-warm-light-gray hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"}`}>
                <div className="mb-3 flex items-center justify-between">
                  <span className={`text-sm sm:text-base font-semibold ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>{metric.label[language as keyof typeof metric.label] || metric.label.en}</span>
                  <span className="font-mono text-sm font-bold" style={{ color: metric.color }}>{metric.value}</span>
                </div>
                <div className={`h-2 overflow-hidden rounded-full ${isDark ? "bg-[#2A2A2A]" : "bg-warm-sand"}`}>
                  <m.div initial={prefersReducedMotion ? false : { width: 0 }} whileInView={prefersReducedMotion ? undefined : { width: `${metric.bar}%` }} viewport={{ once: true }} transition={prefersReducedMotion ? undefined : { duration: 0.6, delay: 0.12 + index * 0.04 }} className="h-full rounded-full" style={{ width: prefersReducedMotion ? `${metric.bar}%` : undefined, backgroundColor: metric.color }} />
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
