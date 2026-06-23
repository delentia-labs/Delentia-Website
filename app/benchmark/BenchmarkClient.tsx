"use client"

import { useState, useEffect, useRef } from "react"
import { m, useInView } from "framer-motion"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { useMounted } from "@/hooks/use-mounted"
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, Legend,
} from "recharts"
import {
  ArrowRight, Shield, Clock, DollarSign, TrendingUp, Activity, Zap, CheckCircle, X,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

/* ─── DATA ─── */
const benchmarks = [
  { metricEn: "Accuracy", metricTh: "ความแม่นยำ", rct: "99.7%", single: "85%", rctVal: 99.7, singleVal: 85, color: "#7B9E87", icon: Shield },
  { metricEn: "Hallucination Rate", metricTh: "อัตรา Hallucination", rct: "0.3%", single: "15%", rctVal: 0.3, singleVal: 15, color: "#C4745B", icon: TrendingUp, inverted: true },
  { metricEn: "Warm Recall Latency (p95)", metricTh: "Warm Recall Latency (p95)", rct: "<50ms", single: "~300ms", rctVal: 50, singleVal: 300, color: "#D4A853", icon: Clock, inverted: true },
  { metricEn: "Cost Efficiency", metricTh: "ประสิทธิภาพต้นทุน", rct: "3.74× less", single: "Baseline", rctVal: 73, singleVal: 0, color: "#89B4C8", icon: DollarSign },
  { metricEn: "Audit Trail", metricTh: "Audit Trail", rct: "Full", single: "None", rctVal: 100, singleVal: 0, color: "#B8A9C9", icon: CheckCircle },
  { metricEn: "Cryptographic Signing", metricTh: "Cryptographic Signing", rct: "Yes", single: "No", rctVal: 100, singleVal: 0, color: "#D4A853", icon: Shield },
  { metricEn: "FDIA Protocol Score", metricTh: "FDIA Protocol Score", rct: "0.92", single: "~0.65", rctVal: 92, singleVal: 65, color: "#C4745B", icon: TrendingUp },
  { metricEn: "L4 Virtuoso Benchmark", metricTh: "L4 Virtuoso Benchmark", rct: "389/390", single: "N/A", rctVal: 99.7, singleVal: 0, color: "#B8A9C9", icon: Shield },
  { metricEn: "Uptime SLA", metricTh: "Uptime SLA", rct: "99.98%", single: "No SLA", rctVal: 100, singleVal: 80, color: "#7B9E87", icon: CheckCircle },
]

const radarData = [
  { subject: "Accuracy", rct: 99.7, single: 85, fullMark: 100 },
  { subject: "Safety", rct: 99, single: 70, fullMark: 100 },
  { subject: "Speed", rct: 92, single: 75, fullMark: 100 },
  { subject: "Cost Eff.", rct: 88, single: 40, fullMark: 100 },
  { subject: "Auditability", rct: 100, single: 10, fullMark: 100 },
  { subject: "Memory", rct: 95, single: 20, fullMark: 100 },
]

const barData = [
  { name: "Accuracy", rct: 99.7, single: 85 },
  { name: "Safety", rct: 99, single: 70 },
  { name: "Speed Score", rct: 92, single: 75 },
  { name: "Cost Score", rct: 88, single: 40 },
  { name: "Audit Score", rct: 100, single: 10 },
  { name: "Memory", rct: 95, single: 20 },
]

const featureComparison = [
  { featureEn: "Multi-LLM Orchestration", featureTh: "Multi-LLM Orchestration", rct: true, single: false },
  { featureEn: "Cross-Verification", featureTh: "Cross-Verification", rct: true, single: false },
  { featureEn: "Dynamic Model Routing", featureTh: "Dynamic Model Routing", rct: true, single: false },
  { featureEn: "Persistent Memory (RCTDB)", featureTh: "Persistent Memory (RCTDB)", rct: true, single: false },
  { featureEn: "Cryptographic Signatures", featureTh: "Cryptographic Signatures", rct: true, single: false },
  { featureEn: "Complete Audit Trails", featureTh: "Complete Audit Trails", rct: true, single: false },
  { featureEn: "Intent Understanding (FDIA)", featureTh: "Intent Understanding (FDIA)", rct: true, single: false },
  { featureEn: "Self-Evolution (Genome)", featureTh: "Self-Evolution (Genome)", rct: true, single: false },
  { featureEn: "Basic Text Generation", featureTh: "Basic Text Generation", rct: true, single: true },
  { featureEn: "Single Model API", featureTh: "Single Model API", rct: true, single: true },
]

const counterStats = [
  { value: 99.7, suffix: "%", labelEn: "Accuracy", labelTh: "ความแม่นยำ", color: "#7B9E87", icon: Shield },
  { value: 0.3, suffix: "%", labelEn: "Hallucination Rate", labelTh: "อัตรา Hallucination", color: "#C4745B", icon: Activity },
  { value: 73, suffix: "%", labelEn: "Cost Savings", labelTh: "ประหยัดต้นทุน", color: "#D4A853", icon: DollarSign },
  { value: 50, suffix: "ms", labelEn: "Warm Recall (p95)", labelTh: "Warm Recall (p95)", color: "#89B4C8", icon: Zap, prefix: "<" },
]

const platformRows = [
  { cap: { en: "Hallucination Rate", th: "อัตรา Hallucination" }, rct: { label: "0.3%", type: "good" }, lc: { label: "~12–15%", type: "bad" }, agpt: { label: "~10–20%", type: "bad" } },
  { cap: { en: "Accuracy Rate", th: "ความแม่นยำ" }, rct: { label: "99.7%", type: "good" }, lc: { label: "~85%", type: "mid" }, agpt: { label: "~80%", type: "mid" } },
  { cap: { en: "Cryptographic Audit Trail", th: "Cryptographic Audit Trail" }, rct: { label: "✓ Full", type: "check" }, lc: { label: "✗ None", type: "cross" }, agpt: { label: "✗ None", type: "cross" } },
  { cap: { en: "Multi-LLM Consensus", th: "Multi-LLM Consensus" }, rct: { label: "✓ 7 HexaCore LLMs", type: "check" }, lc: { label: "~ Manual wiring", type: "partial" }, agpt: { label: "✗ Single model", type: "cross" } },
  { cap: { en: "Persistent Memory", th: "Persistent Memory" }, rct: { label: "✓ RCTDB v2.0", type: "check" }, lc: { label: "~ Plugin-based", type: "partial" }, agpt: { label: "~ Limited", type: "partial" } },
  { cap: { en: "Warm Recall (p95)", th: "Warm Recall (p95)" }, rct: { label: "<50ms", type: "good" }, lc: { label: "~350–600ms", type: "bad" }, agpt: { label: "~500ms–2s", type: "bad" } },
  { cap: { en: "Cost per Query", th: "ต้นทุนต่อ Query" }, rct: { label: "3.74× vs all-Claude baseline", type: "good" }, lc: { label: "Baseline", type: "mid" }, agpt: { label: "+20–40% overhead", type: "bad" } },
  { cap: { en: "Enterprise Compliance", th: "Enterprise Compliance" }, rct: { label: "✓ Full audit+sign", type: "check" }, lc: { label: "✗ DIY only", type: "cross" }, agpt: { label: "✗ None", type: "cross" } },
  { cap: { en: "Intent-Centric Processing", th: "Intent-Centric Processing" }, rct: { label: "✓ FDIA equation", type: "check" }, lc: { label: "✗ Prompt-centric", type: "cross" }, agpt: { label: "✗ Goal-decomp only", type: "cross" } },
  { cap: { en: "Self-Evolution (Learning)", th: "Self-Evolution" }, rct: { label: "✓ 7-Genome system", type: "check" }, lc: { label: "✗ Static chains", type: "cross" }, agpt: { label: "~ Experimental", type: "partial" } },
]

/* ─── ANIMATED COUNTER HOOK ─── */
function useAnimatedCounter(target: number, duration: number, isActive: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isActive) return
    let animFrame: number
    const startTime = performance.now()
    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(target * eased)
      if (progress < 1) animFrame = requestAnimationFrame(step)
    }
    animFrame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animFrame)
  }, [target, duration, isActive])
  return count
}

type StatItem = { value: number; suffix: string; labelEn: string; labelTh: string; color: string; icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>; prefix?: string }

function AnimatedStat({ stat, isDark }: { stat: StatItem; isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const count = useAnimatedCounter(stat.value, 2000, isInView)
  const Icon = stat.icon
  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl p-6 border group hover:-translate-y-1 transition-all duration-300 ${
        isDark ? "bg-[#1E1E1E] border-[#2A2A2A] hover:border-[#3A3A3A]" : "bg-white border-warm-light-gray hover:shadow-lg"
      }`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5 -translate-y-8 translate-x-8" style={{ backgroundColor: stat.color }} />
      <Icon size={22} style={{ color: stat.color }} className="mb-3" />
      <div className="text-3xl sm:text-4xl font-bold tracking-tight mb-1" style={{ color: stat.color }}>
        {stat.prefix ?? ""}{stat.value < 1 ? count.toFixed(1) : Math.round(count)}{stat.suffix}
      </div>
      <div className={`text-sm font-medium ${isDark ? "text-[#999]" : "text-warm-gray"}`}>
        {stat.labelEn}
      </div>
    </m.div>
  )
}

type ChartView = "radar" | "bar"

export default function BenchmarkPage() {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const isDark = (mounted ? resolvedTheme : "light") === "dark"
  const isEn = language === "en"
  const [chartView, setChartView] = useState<ChartView>("radar")

  type LiveBenchmarkData = {
    radarData?: typeof radarData
    barData?: typeof barData
    counterStats?: Array<{ value: number; suffix: string; labelEn: string; labelTh: string; prefix?: string }>
    source?: "live" | "static"
    updatedAt?: string
  }
  const [liveData, setLiveData] = useState<LiveBenchmarkData | null>(null)
  useEffect(() => {
    fetch("/api/benchmark")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: LiveBenchmarkData | null) => d && setLiveData(d))
      .catch(() => {})
  }, [])

  type LiveStatsData = {
    testCount?: number
    microserviceCount?: number
    algorithmCount?: number
    hallucinationRate?: string
    source?: "live" | "static"
    updatedAt?: string
  }
  const [sysStats, setSysStats] = useState<LiveStatsData | null>(null)
  useEffect(() => {
    fetch("/api/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: LiveStatsData | null) => d && setSysStats(d))
      .catch(() => {})
  }, [])

  const activeRadarData = liveData?.radarData ?? radarData
  const activeBarData = liveData?.barData ?? barData
  const activeCounterStats = liveData?.counterStats
    ? liveData.counterStats.map((live, i) => ({ ...counterStats[i], ...live }))
    : counterStats

  const chartBg = isDark ? "#1E1E1E" : "#FFFFFF"
  const gridColor = isDark ? "#333" : "#E8E3DC"
  const textColor = isDark ? "#999" : "#6B6B6B"

  const cellCls = (t: string) => {
    if (t === "good" || t === "check") return "text-warm-sage font-semibold"
    if (t === "bad" || t === "cross") return isDark ? "text-[#666]" : "text-[#999]"
    return isDark ? "text-[#AAA]" : "text-[#4A4A4A]"
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#111]" : "bg-warm-cream"}`}>

        {/* Hero */}
        <section className={`py-20 px-4 text-center transition-colors duration-300 ${isDark ? "bg-[#0D0D0D]" : "bg-warm-cream"}`}>
          <div className="max-w-3xl mx-auto space-y-5">
            <m.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-sage/10 border border-warm-sage/30 text-warm-sage text-sm font-medium"
            >
              📊 {isEn ? "Benchmarks" : "เกณฑ์มาตรฐาน"}
            </m.span>
            <m.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl sm:text-5xl font-bold tracking-tight ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}
            >
              {isEn ? "Performance " : "เปรียบเทียบ "}
              <span className="font-display text-warm-sage">{isEn ? "Comparison" : "ประสิทธิภาพ"}</span>
            </m.h1>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-base sm:text-lg max-w-2xl mx-auto ${isDark ? "text-[#888]" : "text-warm-gray"}`}
            >
              {isEn
                ? "RCT SignedAI achieves 99.7% accuracy vs 85% for single LLM, with 60% cost savings, full audit trails, and cryptographic signing."
                : "RCT SignedAI ความแม่นยำ 99.7% เทียบกับ 85% สำหรับ Single LLM พร้อมประหยัดต้นทุน 60% Audit Trails ครบถ้วน และ Cryptographic Signing"}
            </m.p>
          </div>
        </section>

        {/* Animated Counter Stats */}
        <section className={`py-10 lg:py-14 transition-colors duration-300 ${isDark ? "bg-[#111]" : "bg-warm-cream"}`} aria-label="Key Stats">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {activeCounterStats.map((stat) => (
                <AnimatedStat key={stat.labelEn} stat={stat} isDark={isDark} />
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Chart Dashboard */}
        <section className={`py-16 lg:py-20 transition-colors duration-300 ${isDark ? "bg-[#141414]" : "bg-white"}`} aria-label="Interactive Charts">
          <div className="max-w-5xl mx-auto px-4">
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 lg:mb-12"
            >
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                <span className="font-display text-warm-sage">{isEn ? "Interactive" : "แผนภูมิ"}</span>{" "}
                {isEn ? "Dashboard" : "เชิงโต้ตอบ"}
              </h2>
              {/* Live data badge */}
              {liveData?.source === "live" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-warm-sage/15 text-warm-sage border border-warm-sage/25 mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-warm-sage animate-pulse" />
                  {isEn ? "Live Data" : "ข้อมูล Live"}
                </span>
              )}
              <p className={`text-sm max-w-xl mx-auto ${isDark ? "text-[#888]" : "text-warm-gray"}`}>
                {isEn
                  ? "Switch between Radar and Bar views to compare RCT SignedAI against Single LLM across key dimensions."
                  : "สลับระหว่างมุมมอง Radar และ Bar เพื่อเปรียบเทียบ RCT SignedAI กับ Single LLM"}
              </p>
            </m.div>

            {/* Chart Toggle */}
            <div className="flex justify-center mb-8">
              <div className={`inline-flex rounded-xl p-1 border ${isDark ? "bg-[#1E1E1E] border-[#2A2A2A]" : "bg-[#F5F0E8] border-warm-light-gray"}`}>
                {(["radar", "bar"] as ChartView[]).map((view) => (
                  <button
                    key={view}
                    onClick={() => setChartView(view)}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      chartView === view
                        ? "bg-warm-sage text-white shadow-sm"
                        : isDark ? "text-[#888] hover:text-[#CCC]" : "text-warm-gray hover:text-warm-charcoal"
                    }`}
                  >
                    {view === "radar" ? (isEn ? "Radar View" : "มุมมอง Radar") : isEn ? "Bar View" : "มุมมอง Bar"}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Container */}
            <m.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`rounded-2xl border p-4 sm:p-6 lg:p-8 ${isDark ? "bg-[#1E1E1E] border-[#2A2A2A]" : "bg-white border-warm-light-gray"}`}
            >
              <div className="w-full" style={{ height: 420 }}>
                <ResponsiveContainer width="100%" height="100%">
                  {chartView === "radar" ? (
                    <RadarChart data={activeRadarData} cx="50%" cy="50%" outerRadius="75%">
                      <PolarGrid stroke={gridColor} />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: textColor, fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: textColor, fontSize: 10 }} />
                      <Radar name="RCT SignedAI" dataKey="rct" stroke="#7B9E87" fill="#7B9E87" fillOpacity={0.35} strokeWidth={2} />
                      <Radar name="Single LLM" dataKey="single" stroke={isDark ? "#555" : "#CCC"} fill={isDark ? "#555" : "#CCC"} fillOpacity={0.15} strokeWidth={2} />
                      <Legend wrapperStyle={{ fontSize: 13 }} />
                      <Tooltip contentStyle={{ backgroundColor: chartBg, border: `1px solid ${gridColor}`, borderRadius: 12, fontSize: 13 }} labelStyle={{ color: textColor }} />
                    </RadarChart>
                  ) : (
                    <BarChart data={activeBarData} barGap={4} barCategoryGap="20%">
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                      <XAxis dataKey="name" tick={{ fill: textColor, fontSize: 11 }} axisLine={{ stroke: gridColor }} />
                      <YAxis domain={[0, 100]} tick={{ fill: textColor, fontSize: 11 }} axisLine={{ stroke: gridColor }} />
                      <Tooltip contentStyle={{ backgroundColor: chartBg, border: `1px solid ${gridColor}`, borderRadius: 12, fontSize: 13 }} labelStyle={{ color: textColor }} />
                      <Legend wrapperStyle={{ fontSize: 13 }} />
                      <Bar name="RCT SignedAI" dataKey="rct" radius={[6, 6, 0, 0]}>
                        {activeBarData.map((_, i) => <Cell key={i} fill="#7B9E87" />)}
                      </Bar>
                      <Bar name="Single LLM" dataKey="single" radius={[6, 6, 0, 0]}>
                        {activeBarData.map((_, i) => <Cell key={i} fill={isDark ? "#555" : "#CCC"} />)}
                      </Bar>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </m.div>
          </div>
        </section>

        {/* Key Metrics Cards */}
        <section className={`py-16 lg:py-20 transition-colors duration-300 ${isDark ? "bg-warm-charcoal" : "bg-warm-cream"}`} aria-label="Key Metrics">
          <div className="max-w-5xl mx-auto px-4">
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 lg:mb-14"
            >
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                <span className="font-display text-warm-sage">{isEn ? "Performance" : "ประสิทธิภาพ"}</span>{" "}
                {isEn ? "Metrics" : "ตัวชี้วัด"}
              </h2>
            </m.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {benchmarks.map((bm, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={`p-5 sm:p-6 rounded-2xl border transition-shadow hover:shadow-lg ${isDark ? "bg-[#1E1E1E] border-[#2A2A2A]" : "bg-white border-warm-light-gray"}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <bm.icon size={20} style={{ color: bm.color }} />
                    <span className={`text-sm font-semibold ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>{isEn ? bm.metricEn : bm.metricTh}</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium" style={{ color: bm.color }}>RCT SignedAI</span>
                        <span className="text-sm font-bold" style={{ color: bm.color }}>{bm.rct}</span>
                      </div>
                      <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? "bg-[#2A2A2A]" : "bg-warm-light-gray"}`}>
                        <m.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${bm.inverted ? Math.max(5, 100 - bm.rctVal * 3) : Math.min(100, bm.rctVal)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: bm.color }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-medium ${isDark ? "text-[#666]" : "text-[#999]"}`}>Single LLM</span>
                        <span className={`text-sm font-bold ${isDark ? "text-[#666]" : "text-[#999]"}`}>{bm.single}</span>
                      </div>
                      <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? "bg-[#2A2A2A]" : "bg-warm-light-gray"}`}>
                        <m.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${bm.inverted ? Math.min(100, bm.singleVal * 3) : bm.singleVal}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                          className={`h-full rounded-full ${isDark ? "bg-[#444]" : "bg-[#CCC]"}`}
                        />
                      </div>
                    </div>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* System Stats — sourced from /api/stats */}
        {sysStats && (
          <section className={`py-12 transition-colors duration-300 ${isDark ? "bg-[#0D0D0D]" : "bg-[#F5F0E8]"}`} aria-label="System Statistics">
            <div className="max-w-4xl mx-auto px-4">
              <div className="flex items-center gap-3 mb-6">
                <h2 className={`text-lg font-bold ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                  {isEn ? "System Statistics" : "สถิติระบบ"}
                </h2>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${sysStats.source === "live" ? "bg-warm-sage/15 text-warm-sage border border-warm-sage/25" : "bg-muted text-muted-foreground border border-border"}`}>
                  {sysStats.source === "live" && <span className="h-1.5 w-1.5 rounded-full bg-warm-sage animate-pulse" />}
                  {sysStats.source === "live" ? (isEn ? "Live" : "Live") : (isEn ? "Static" : "Static")}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: sysStats.testCount?.toLocaleString() ?? "—", label: isEn ? "Test Cases" : "Test Cases" },
                  { value: sysStats.microserviceCount ?? "—", label: isEn ? "Microservices" : "Microservices" },
                  { value: sysStats.algorithmCount ?? "—", label: isEn ? "Algorithms" : "Algorithms" },
                  { value: sysStats.hallucinationRate ?? "—", label: isEn ? "Hallucination Rate" : "อัตรา Hallucination" },
                ].map((item) => (
                  <div key={item.label} className={`rounded-xl border p-4 ${isDark ? "border-[#2A2A2A] bg-warm-charcoal" : "border-warm-light-gray bg-white"}`}>
                    <div className="text-2xl font-bold text-warm-sage">{item.value}</div>
                    <div className={`text-xs ${isDark ? "text-[#888]" : "text-warm-gray"}`}>{item.label}</div>
                  </div>
                ))}
              </div>
              {sysStats.updatedAt && (
                <p className={`mt-3 text-[11px] ${isDark ? "text-[#666]" : "text-warm-gray"}`}>
                  {isEn ? "Last verified:" : "ตรวจสอบล่าสุด:"} {sysStats.updatedAt}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Feature Comparison Table */}
        <section className={`py-16 lg:py-20 transition-colors duration-300 ${isDark ? "bg-[#141414]" : "bg-white"}`} aria-label="Feature Comparison">
          <div className="max-w-2xl mx-auto px-4">
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 lg:mb-14"
            >
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                <span className="font-display text-warm-amber">{isEn ? "Feature" : "ฟีเจอร์"}</span>{" "}
                {isEn ? "Comparison" : "เปรียบเทียบ"}
              </h2>
            </m.div>
            <p className={`text-xs text-center mb-2 sm:hidden ${isDark ? "text-[#555]" : "text-[#B0A898]"}`}>
              {isEn ? "← scroll to see more →" : "← เลื่อนเพื่อดูเพิ่มเติม →"}
            </p>
            <div className="overflow-x-auto">
              <div className="min-w-100">
                <div className={`rounded-2xl border overflow-hidden ${isDark ? "bg-[#1E1E1E] border-[#2A2A2A]" : "bg-white border-warm-light-gray"}`}>
                  <div className={`grid grid-cols-3 px-5 py-3 border-b ${isDark ? "border-[#2A2A2A] bg-[#252525]" : "border-warm-light-gray bg-[#F5F0E8]"}`}>
                    <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-[#888]" : "text-warm-gray"}`}>{isEn ? "Feature" : "ฟีเจอร์"}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-center text-warm-sage">RCT</span>
                    <span className={`text-xs font-semibold uppercase tracking-wider text-center ${isDark ? "text-[#666]" : "text-[#999]"}`}>Single LLM</span>
                  </div>
                  {featureComparison.map((feat, i) => (
                    <m.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className={`grid grid-cols-3 px-5 py-3 border-b last:border-b-0 transition-colors ${
                        isDark ? "border-[#2A2A2A] hover:bg-[#252525]" : "border-warm-sand hover:bg-warm-cream"
                      }`}
                    >
                      <span className={`text-sm ${isDark ? "text-[#CCC]" : "text-[#333]"}`}>{isEn ? feat.featureEn : feat.featureTh}</span>
                      <span className="text-center">
                        {feat.rct ? <CheckCircle size={18} className="inline text-warm-sage" /> : <X size={18} className="inline text-[#999]" />}
                      </span>
                      <span className="text-center">
                        {feat.single ? <CheckCircle size={18} className="inline text-warm-sage" /> : <X size={18} className={`inline ${isDark ? "text-[#444]" : "text-[#CCC]"}`} />}
                      </span>
                    </m.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Comparison */}
        <section className={`py-16 lg:py-20 transition-colors duration-300 ${isDark ? "bg-warm-charcoal" : "bg-warm-cream"}`} aria-label="Platform Comparison">
          <div className="max-w-4xl mx-auto px-4">
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 lg:mb-14"
            >
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                {isEn ? "Platform" : "เปรียบเทียบ"}{" "}
                <span className="font-display text-warm-amber">{isEn ? "Comparison" : "Platform"}</span>
              </h2>
              <p className={`text-sm max-w-xl mx-auto ${isDark ? "text-[#888]" : "text-warm-gray"}`}>
                {isEn
                  ? "How RCT Ecosystem stacks up against LangChain and AutoGPT across enterprise-critical capabilities."
                  : "วิธีที่ RCT Ecosystem เปรียบเทียบกับ LangChain และ AutoGPT ในความสามารถสำคัญระดับ Enterprise"}
              </p>
            </m.div>

            <p className={`text-xs text-center mb-2 sm:hidden ${isDark ? "text-[#555]" : "text-[#B0A898]"}`}>
              {isEn ? "← scroll to see all platforms →" : "← เลื่อนเพื่อดูทุก Platform →"}
            </p>
            <div className="overflow-x-auto">
              <div className="min-w-140">
                <div className={`rounded-2xl border overflow-hidden ${isDark ? "border-[#2A2A2A]" : "border-warm-light-gray"}`}>
                  <div className={`grid grid-cols-4 items-center px-4 sm:px-6 py-4 border-b text-xs sm:text-sm font-bold uppercase tracking-wider ${isDark ? "bg-[#1E1E1E] border-[#2A2A2A] text-[#888]" : "bg-[#F5F0E8] border-warm-light-gray text-warm-gray"}`}>
                    <div>{isEn ? "Capability" : "ความสามารถ"}</div>
                    <div className="text-center text-warm-sage">RCT Ecosystem</div>
                    <div className="text-center text-warm-sky">LangChain</div>
                    <div className="text-center text-warm-lavender">AutoGPT</div>
                  </div>
                  {platformRows.map((row, i) => (
                    <m.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className={`grid grid-cols-4 items-center gap-2 px-4 sm:px-6 py-3 border-b last:border-b-0 text-xs sm:text-sm transition-colors ${
                        isDark ? "border-[#2A2A2A] hover:bg-[#1E1E1E]" : "border-warm-sand hover:bg-white"
                      } ${i % 2 === 0 ? (isDark ? "bg-[#161616]" : "bg-warm-cream/50") : isDark ? "bg-warm-charcoal" : "bg-white"}`}
                    >
                      <div className={`font-medium ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>{isEn ? row.cap.en : row.cap.th}</div>
                      <div className={`text-center ${cellCls(row.rct.type)}`}>{row.rct.label}</div>
                      <div className={`text-center ${cellCls(row.lc.type)}`}>{row.lc.label}</div>
                      <div className={`text-center ${cellCls(row.agpt.type)}`}>{row.agpt.label}</div>
                    </m.div>
                  ))}
                </div>
              </div>
            </div>
            <p className={`text-xs text-center mt-4 ${isDark ? "text-[#555]" : "text-[#B0A898]"}`}>
              {isEn
                ? "* Data based on internal benchmarks (2025). LangChain and AutoGPT figures based on publicly available research."
                : "* ข้อมูลอ้างอิงจาก Benchmark ภายใน (2025) ข้อมูล LangChain และ AutoGPT อ้างอิงจากงานวิจัยสาธารณะ"}
            </p>
          </div>
        </section>

        {/* v5.4.5 Milestone */}
        <section className={`py-16 px-4 transition-colors duration-300 ${isDark ? "bg-[#141414]" : "bg-warm-cream/50"}`} aria-label="v5.4.5 milestone">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className={`text-3xl font-bold mb-2 ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                {isEn ? "Test Infrastructure v5.4.5" : "Test Infrastructure v5.4.5"}
              </h2>
              <p className={`text-sm ${isDark ? "text-[#888]" : "text-warm-gray"}`}>
                {isEn
                  ? "First ever 0-failure milestone across the entire test suite — March 21, 2026"
                  : "Milestone 0 ความล้มเหลวครั้งแรก ในชุดทดสอบทั้งหมด — 21 มีนาคม 2026"}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: "4,849", label: isEn ? "Passed" : "ผ่าน", color: "#7B9E87" },
                { value: "0", label: isEn ? "Failed" : "ล้มเหลว", color: "#C4745B" },
                { value: "6,738+", label: isEn ? "Total Tests" : "Tests ทั้งหมด", color: "#D4A853" },
                { value: "0.92", label: isEn ? "FDIA Accuracy" : "FDIA Accuracy", color: "#89B4C8" },
              ].map((s, i) => (
                <m.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className={`p-5 rounded-2xl border text-center ${isDark ? "bg-[#1E1E1E] border-[#2A2A2A]" : "bg-white border-warm-light-gray"}`}>
                  <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className={`text-xs uppercase tracking-wider mt-1 ${isDark ? "text-[#888]" : "text-warm-gray"}`}>{s.label}</div>
                </m.div>
              ))}
            </div>
            <div className={`p-5 rounded-xl border text-sm leading-relaxed ${isDark ? "bg-[#1E1E1E] border-[#2A2A2A] text-[#999]" : "bg-white border-warm-light-gray text-[#4A4A4A]"}`}>
              {isEn
                ? "FDIA accuracy 0.92 vs industry average ~0.65. Test pyramid: Unit → Integration → Contract → Component → API → E2E → Performance → Security (8 levels). Zero failures across 6,738+ tests represents the first clean run in project history."
                : "FDIA Accuracy 0.92 เทียบกับอุตสาหกรรมที่ ~0.65 Test Pyramid: Unit→Integration→Contract→Component→API→E2E→Performance→Security (8 ระดับ) ผ่าน 6,738+ Tests โดยไม่มีความล้มเหลวเลย — ครั้งแรกในประวัติศาสตร์โปรเจกต์"}
            </div>
          </div>
        </section>

        {/* Related Research */}
        <section className={`py-14 lg:py-18 transition-colors duration-300 ${isDark ? "bg-[#111]" : "bg-warm-cream/60"}`} aria-label="Related research articles">
          <div className="max-w-4xl mx-auto px-4">
            <h3 className={`text-lg font-semibold mb-6 ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
              {isEn ? "Related Research" : "งานวิจัยที่เกี่ยวข้อง"}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { href: "/en/blog/signedai-multi-llm-consensus-explained", labelEn: "SignedAI: Multi-LLM Consensus to Prevent Hallucination at Scale", labelTh: "SignedAI: Multi-LLM Consensus ป้องกัน Hallucination" },
                { href: "/en/blog/hexacore-7-model-ai-infrastructure", labelEn: "HexaCore 7-Model AI Infrastructure: Cost Reduction at Scale", labelTh: "HexaCore 7 โมเดล AI Infrastructure: ลดต้นทุนในระดับ Scale" },
                { href: "/en/blog/delta-engine-74-percent-compression", labelEn: "Delta Engine: 74% Lossless Memory Compression", labelTh: "Delta Engine: บีบอัดหน่วยความจำ 74% แบบ Lossless" },
                { href: "/en/blog/rct-ecosystem-4849-tests-methodology", labelEn: "4,849 Tests, 0 Failures: How RCT Verifies Everything", labelTh: "4,849 Tests, 0 Failures: วิธีที่ RCT ตรวจสอบทุกอย่าง" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className={`flex items-start gap-3 rounded-xl border p-4 transition-colors hover:-translate-y-0.5 ${isDark ? "border-[#2a2a2a] hover:border-[#444] hover:bg-[#1a1a1a]" : "border-warm-light-gray/50 hover:border-warm-amber/40 hover:bg-white"}`}>
                  <ArrowRight size={14} className="mt-1 shrink-0 text-warm-amber" />
                  <span className={`text-sm leading-relaxed ${isDark ? "text-[#bbb]" : "text-warm-charcoal/80"}`}>{isEn ? item.labelEn : item.labelTh}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`py-16 lg:py-20 transition-colors duration-300 ${isDark ? "bg-[#0D0D0D]" : "bg-white"}`} aria-label="CTA">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <h3 className={`text-xl sm:text-2xl font-bold ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                {isEn ? "Ready to upgrade your AI infrastructure?" : "พร้อมอัปเกรดโครงสร้างพื้นฐาน AI ของคุณ?"}
              </h3>
              <p className={`text-sm max-w-lg mx-auto ${isDark ? "text-[#888]" : "text-warm-gray"}`}>
                {isEn
                  ? "See how RCT SignedAI can transform your enterprise AI with multi-LLM orchestration, cryptographic verification, and complete audit trails."
                  : "ดูว่า RCT SignedAI สามารถเปลี่ยนแปลง Enterprise AI ด้วย Multi-LLM Orchestration, Cryptographic Verification และ Audit Trails ที่สมบูรณ์"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/solutions" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-warm-sage text-white font-semibold text-sm hover:bg-[#6A8D76] transition-all hover:-translate-y-0.5">
                  {isEn ? "Explore Solutions" : "สำรวจ Solutions"} <ArrowRight size={16} />
                </Link>
                <Link href="/products/signed-ai" className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm transition-all hover:-translate-y-0.5 ${isDark ? "border-[#333] text-warm-light-gray hover:bg-[#1E1E1E]" : "border-warm-light-gray text-warm-charcoal hover:bg-warm-cream"}`}>
                  SignedAI Details
                </Link>
              </div>
            </m.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

