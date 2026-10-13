"use client"

import { m } from "framer-motion"
import { useState } from "react"
import { SITE_HALLUCINATION_RATE, SITE_MICROSERVICE_COUNT, SITE_TEST_COUNT, SITE_UPTIME } from "@/lib/site-config"
import { cn } from "@/lib/utils"

interface Metric {
  id: string
  name: string
  nameTh: string
  rctValue: string
  industryValue: string
  improvement: string
  unit: string
  icon: string
  color: string
}

const metrics: Metric[] = [
  {
    id: "hallucination",
    name: "Hallucination Rate",
    nameTh: "อัตราการ Hallucination",
    rctValue: SITE_HALLUCINATION_RATE.replace("% benchmark", ""),
    industryValue: "12-15",
    improvement: "Benchmark",
    unit: "%",
    icon: "Target",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "compression",
    name: "Data Compression",
    nameTh: "การบีบอัดข้อมูล",
    rctValue: "74",
    industryValue: "30-40",
    improvement: "185%",
    unit: "% lossless",
    icon: "Minimize2",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "latency",
    name: "Response Latency",
    nameTh: "ความล่าช้าในการตอบสนอง",
    rctValue: "0.07-1.5",
    industryValue: "2-5",
    improvement: "70%",
    unit: "s",
    icon: "Zap",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: "uptime",
    name: "Availability Target",
    nameTh: "เป้าหมายความพร้อมใช้งาน",
    rctValue: SITE_UPTIME.replace(" target", ""),
    industryValue: "99.5",
    improvement: "Target",
    unit: "%",
    icon: "Activity",
    color: "from-purple-500 to-violet-500"
  },
  {
    id: "coverage",
    name: "Verified Tests",
    nameTh: "การทดสอบที่ยืนยันแล้ว",
    rctValue: String(SITE_TEST_COUNT),
    industryValue: "70-80",
    improvement: "Snapshot",
    unit: "tests",
    icon: "Shield",
    color: "from-red-500 to-pink-500"
  },
  {
    id: "cost",
    name: "Cost Efficiency",
    nameTh: "ประสิทธิภาพต้นทุน",
    rctValue: "not measured",
    industryValue: "1",
    improvement: "274%",
    unit: "x reduction",
    icon: "TrendingDown",
    color: "from-teal-500 to-green-500"
  }
]

export function PerformanceMetricsComparison({ locale = "en" }: { locale?: "en" | "th" }) {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)
  const t = (en: string, th: string) => locale === "th" ? th : en

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
          {t("Performance Metrics", "ตัวชี้วัดประสิทธิภาพ")}
        </h2>
        <p className="text-muted-foreground">
          {t(
            "How RCT Ecosystem compares to industry standards",
            "เปรียบเทียบ RCT Ecosystem กับมาตรฐานอุตสาหกรรม"
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <m.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "rounded-lg border bg-card p-6 transition-all duration-300",
              hoveredMetric === metric.id 
                ? "border-accent shadow-lg shadow-accent/10" 
                : "border-border hover:border-accent/50"
            )}
            onMouseEnter={() => setHoveredMetric(metric.id)}
            onMouseLeave={() => setHoveredMetric(null)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">
                  {t(metric.name, metric.nameTh)}
                </h3>
                <p className="text-xs text-muted-foreground">{metric.unit}</p>
              </div>
              <div className={cn(
                "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center",
                metric.color
              )}>
                <span className="text-white text-lg">{metric.icon[0]}</span>
              </div>
            </div>

            {/* Comparison Bars */}
            <div className="space-y-3">
              {/* RCT Value */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-warm-amber font-medium">RCT</span>
                  <span className="text-foreground font-bold">{metric.rctValue}{metric.unit}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <m.div
                    className={cn("h-full rounded-full bg-gradient-to-r", metric.color)}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  />
                </div>
              </div>

              {/* Industry Value */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{t("Industry Avg", "ค่าเฉลี่ยอุตสาหกรรม")}</span>
                  <span className="text-muted-foreground">{metric.industryValue}{metric.unit}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-muted-foreground/30 rounded-full"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
            </div>

            {/* Improvement Badge */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("Improvement", "การปรับปรุง")}</span>
                <span className={cn(
                  "px-2 py-1 rounded-full text-sm font-medium",
                  "bg-green-500/20 text-green-500"
                )}>
                  {metric.improvement} {!["Enterprise", "Tier-1", "Benchmark", "Target", "Snapshot"].includes(metric.improvement) && "better"}
                </span>
              </div>
            </div>
          </m.div>
        ))}
      </div>

      {/* Summary Stats */}
      <m.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 rounded-lg border bg-card p-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-warm-amber">{SITE_TEST_COUNT}</p>
            <p className="text-sm text-muted-foreground">{t("Verified Tests", "การทดสอบที่ยืนยันแล้ว")}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-warm-amber">41</p>
            <p className="text-sm text-muted-foreground">{t("Algorithms", "อัลกอริทึม")}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-warm-amber">{SITE_MICROSERVICE_COUNT}+</p>
            <p className="text-sm text-muted-foreground">{t("Runtime Components", "องค์ประกอบ Runtime")}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-warm-amber">8</p>
            <p className="text-sm text-muted-foreground">{t("Regional Markets", "ตลาดภูมิภาค")}</p>
          </div>
        </div>
      </m.div>
    </div>
  )
}
