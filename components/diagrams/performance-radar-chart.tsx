// UNUSED since Round 87: these six scores (96.1, 92, 99.9, 87, 100, 85) were never measured. Do not render this chart anywhere.
"use client"

import { useState } from "react"
import { m, useReducedMotion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"

const metrics = [
  { key: "accuracy", en: "Accuracy", th: "ความแม่นยำ", value: 96.1, max: 100 },
  { key: "speed", en: "Speed", th: "ความเร็ว", value: 92, max: 100 },
  { key: "reliability", en: "Reliability", th: "ความเชื่อถือได้", value: 99.9, max: 100 },
  { key: "cost", en: "Cost Efficiency", th: "ประหยัดต้นทุน", value: 87, max: 100 },
  { key: "security", en: "Security", th: "ความปลอดภัย", value: 100, max: 100 },
  { key: "scalability", en: "Scalability", th: "ขยายได้", value: 85, max: 100 },
]

const cx = 200
const cy = 200
const maxR = 140
const rings = [25, 50, 75, 100]

function polarToCartesian(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) }
}

export default function PerformanceRadarChart() {
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const isDark = resolvedTheme === "dark"
  const prefersReducedMotion = useReducedMotion()
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const angleStep = 360 / metrics.length

  const dataPoints = metrics.map((metric, index) => {
    const angle = index * angleStep
    const radius = (metric.value / metric.max) * maxR
    return polarToCartesian(angle, radius)
  })
  const polygonPath = `${dataPoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")} Z`
  const axisEnds = metrics.map((_, index) => polarToCartesian(index * angleStep, maxR + 10))
  const labelPositions = metrics.map((_, index) => polarToCartesian(index * angleStep, maxR + 30))

  return (
    <div className={`rounded-xl border p-4 ${isDark ? "bg-warm-charcoal border-border" : "bg-white border-warm-light-gray"}`}>
      <div className="mb-3 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-warm-amber" />
        <h3 className={`text-sm font-semibold uppercase tracking-wider ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
          {language === "en" ? "Performance Radar" : "Radar ประสิทธิภาพ"}
        </h3>
      </div>

      <svg viewBox="0 0 400 400" className="mx-auto w-full max-w-100" role="img" aria-label="Performance radar chart">
        {rings.map((pct) => {
          const radius = (pct / 100) * maxR
          return <circle key={pct} cx={cx} cy={cy} r={radius} fill="none" stroke={isDark ? "#2A2A2A" : "#E8E3DC"} strokeWidth={1} strokeDasharray="4 4" />
        })}

        {rings.map((pct) => {
          const radius = (pct / 100) * maxR
          return <text key={`label-${pct}`} x={cx + 4} y={cy - radius + 4} fontSize={9} fill={isDark ? "#555" : "#999"} fontFamily="monospace">{`${pct}%`}</text>
        })}

        {axisEnds.map((end, index) => (
          <line key={index} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke={isDark ? "#333" : "#D4D0C8"} strokeWidth={1} />
        ))}

        <m.path d={polygonPath} fill={isDark ? "rgba(212,168,83,0.15)" : "rgba(212,168,83,0.12)"} stroke="#D4A853" strokeWidth={2} initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }} viewport={{ once: true }} transition={prefersReducedMotion ? undefined : { duration: 0.4, ease: "easeOut" }} style={{ transformOrigin: `${cx}px ${cy}px` }} />

        {dataPoints.map((point, index) => (
          <m.circle key={index} cx={point.x} cy={point.y} r={hoveredIdx === index ? 6 : 4} fill="#D4A853" stroke={isDark ? "#1A1A1A" : "#fff"} strokeWidth={2} className="cursor-pointer" onMouseEnter={() => setHoveredIdx(index)} onMouseLeave={() => setHoveredIdx(null)} initial={prefersReducedMotion ? false : { opacity: 0 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1 }} viewport={{ once: true }} transition={prefersReducedMotion ? undefined : { delay: 0.18 + index * 0.04, duration: 0.2 }} />
        ))}

        {labelPositions.map((position, index) => {
          const metric = metrics[index]
          const isLeft = position.x < cx - 20
          const isRight = position.x > cx + 20
          return (
            <text key={metric.key} x={position.x} y={position.y} textAnchor={isLeft ? "end" : isRight ? "start" : "middle"} dominantBaseline="middle" fontSize={11} fontWeight={hoveredIdx === index ? 700 : 500} fill={hoveredIdx === index ? "#D4A853" : isDark ? "#888" : "#4A4A4A"} className="cursor-pointer transition-colors" onMouseEnter={() => setHoveredIdx(index)} onMouseLeave={() => setHoveredIdx(null)}>
              {language === "en" ? metric.en : metric.th}
            </text>
          )
        })}

        {hoveredIdx !== null && (
          <g>
            <rect x={dataPoints[hoveredIdx].x - 30} y={dataPoints[hoveredIdx].y - 28} width={60} height={20} rx={4} fill={isDark ? "#333" : "#1A1A1A"} />
            <text x={dataPoints[hoveredIdx].x} y={dataPoints[hoveredIdx].y - 15} textAnchor="middle" fontSize={11} fontWeight={700} fontFamily="monospace" fill="#D4A853">{`${metrics[hoveredIdx].value}%`}</text>
          </g>
        )}
      </svg>
    </div>
  )
}
