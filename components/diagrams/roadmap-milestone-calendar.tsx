"use client"

import { m } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { MapPin } from "lucide-react"
import { useMounted } from "@/hooks/use-mounted"

interface Milestone {
  label: string
  labelTh: string
  type: "launch" | "feature" | "community" | "product" | "dev"
}

interface TimelineWindow {
  periodEn: string
  periodTh: string
  yearLabelEn: string
  yearLabelTh: string
  isCurrent: boolean
  milestones: Milestone[]
}

const milestoneTypeColors: Record<Milestone["type"], { color: string; bg: string; darkBg: string }> = {
  launch:    { color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15" },
  feature:   { color: "#C4745B", bg: "#FEE2E2", darkBg: "#3A1E15" },
  community: { color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A" },
  product:   { color: "#B8A9C9", bg: "#EDE9FE", darkBg: "#2A1E3A" },
  dev:       { color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25" },
}

const calendarData: TimelineWindow[] = [
  {
    periodEn: "May",
    periodTh: "พ.ค.",
    yearLabelEn: "2026",
    yearLabelTh: "2569",
    isCurrent: false,
    milestones: [
      { label: "delentia-os 2.0.0 on PyPI (28 May)", labelTh: "delentia-os 2.0.0 บน PyPI (28 พ.ค.)", type: "launch" },
    ],
  },
  {
    periodEn: "Sep",
    periodTh: "ก.ย.",
    yearLabelEn: "2026",
    yearLabelTh: "2569",
    isCurrent: false,
    milestones: [
      { label: "The agent runtime built; unmeasured claims withdrawn", labelTh: "สร้างรันไทม์ agent ถอนข้ออ้างที่ไม่ได้วัด", type: "dev" },
      { label: "MCP connector and Delentia Guard on npm", labelTh: "MCP connector และ Delentia Guard บน npm", type: "product" },
    ],
  },
  {
    periodEn: "Oct",
    periodTh: "ต.ค.",
    yearLabelEn: "2026",
    yearLabelTh: "2569",
    isCurrent: false,
    milestones: [
      { label: "2.3.0: the agent runtime on PyPI (13 Oct)", labelTh: "2.3.0: รันไทม์ agent บน PyPI (13 ต.ค.)", type: "launch" },
      { label: "2.4.0: the Desk and a Windows installer (26 Oct)", labelTh: "2.4.0: Desk และตัวติดตั้ง Windows (26 ต.ค.)", type: "launch" },
    ],
  },
  {
    periodEn: "Nov",
    periodTh: "พ.ย.",
    yearLabelEn: "2026",
    yearLabelTh: "2569",
    isCurrent: true,
    milestones: [
      { label: "2.4.1: English demo, hijacked-model demo (1 Nov)", labelTh: "2.4.1: เดโมภาษาอังกฤษ และเดโมโมเดลที่ถูกยึด (1 พ.ย.)", type: "launch" },
      { label: "First measurements with strong hosted models", labelTh: "วัดผลกับโมเดลโฮสต์ที่เก่งเป็นครั้งแรก", type: "feature" },
      { label: "A real Windows Hello test; an install on a second computer", labelTh: "ทดสอบ Windows Hello จริง และติดตั้งบนเครื่องที่สอง", type: "dev" },
    ],
  },
  {
    periodEn: "Next",
    periodTh: "ถัดไป",
    yearLabelEn: "",
    yearLabelTh: "",
    isCurrent: false,
    milestones: [
      { label: "Public Technical Preview 0.1, declared once earned", labelTh: "ประกาศ Public Technical Preview 0.1 เมื่อได้มาจริง", type: "community" },
      { label: "Outside testers; a witness the author does not control", labelTh: "ผู้ทดสอบภายนอก และ witness ที่ผู้เขียนควบคุมไม่ได้", type: "community" },
      { label: "Code-signing for the installer", labelTh: "ลงลายเซ็นโค้ดให้ตัวติดตั้ง", type: "dev" },
    ],
  },
  {
    periodEn: "Later",
    periodTh: "ภายหลัง",
    yearLabelEn: "",
    yearLabelTh: "",
    isCurrent: false,
    milestones: [
      { label: "Design-partner pilots, by invitation", labelTh: "pilot กับ design partner โดยเชิญ", type: "product" },
      { label: "No hosted service, billing or marketplace is planned unless a partner asks", labelTh: "ไม่มีแผนบริการโฮสต์ การเรียกเก็บเงิน หรือ marketplace เว้นแต่มีพาร์ตเนอร์ขอ", type: "product" },
    ],
  },
]

export default function RoadmapMilestoneCalendar() {
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const mounted = useMounted()
  const isDark = mounted && resolvedTheme === "dark"
  const isEn = language === "en"

  return (
    <div className={`rounded-[24px] border p-4 sm:p-5 lg:p-6 ${isDark ? "bg-warm-charcoal border-border shadow-[0_12px_40px_rgba(0,0,0,0.22)]" : "bg-white border-warm-light-gray shadow-[0_12px_36px_rgba(84,61,31,0.06)]"}`}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-warm-amber" />
          <h3 className={`text-sm font-semibold uppercase tracking-wider ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
            {isEn ? "Milestone calendar: what happened, what is next" : "ปฏิทินหมุดหมาย: สิ่งที่เกิดแล้ว และสิ่งถัดไป"}
          </h3>
        </div>
        <span className={`text-xs ${isDark ? "text-warm-dim" : "text-warm-gray"}`}>
          {isEn ? "May 2026 — next" : "พ.ค. 2569 — ถัดไป"}
        </span>
      </div>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-3">
        {(["launch", "feature", "community", "product", "dev"] as Milestone["type"][]).map((type) => {
          const c = milestoneTypeColors[type]
          const labels: Record<Milestone["type"], { en: string; th: string }> = {
            launch:    { en: "Launch", th: "เปิดตัว" },
            feature:   { en: "Feature", th: "ฟีเจอร์" },
            community: { en: "Community", th: "Community" },
            product:   { en: "Product", th: "Product" },
            dev:       { en: "Dev Tools", th: "Dev Tools" },
          }
          return (
            <div key={type} className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
              <span className={`text-[10px] ${isDark ? "text-warm-dim" : "text-warm-gray"}`}>
                {isEn ? labels[type].en : labels[type].th}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mb-4 max-w-3xl text-sm leading-7 text-muted-foreground">
        {isEn
          ? "The milestone calendar is reorganized into stronger windows so long Thai and English labels stay readable, time horizons are clearer, and the roadmap reads more like an executive operating plan than a narrow strip calendar."
          : "ปฏิทินถูกจัดใหม่เป็นช่วงเวลาที่ชัดขึ้น เพื่อให้ข้อความไทยและอังกฤษอ่านได้เต็ม ไม่โดนตัด และทำให้ภาพรวม roadmap ดูเป็น executive operating plan มากกว่าปฏิทินแถบแคบ"}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {calendarData.map((month, monthIdx) => (
            <m.div
              key={`${month.periodEn}-${month.yearLabelEn}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: monthIdx * 0.06 }}
              whileHover={{ y: -4 }}
              className={`relative flex h-full flex-col rounded-[22px] border p-4 transition-colors
                ${month.isCurrent
                  ? isDark
                    ? "border-warm-amber/50 bg-dark-amber-bg shadow-[0_8px_28px_rgba(212,168,83,0.12)]"
                    : "border-warm-amber/40 bg-amber-50/60 shadow-[0_8px_28px_rgba(212,168,83,0.10)]"
                  : isDark
                    ? "border-border bg-warm-charcoal/50 hover:border-warm-amber/25"
                    : "border-warm-light-gray bg-white hover:border-warm-amber/20"
                }`}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-warm-amber/25 to-transparent" />

              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <div
                    className={`text-sm font-bold ${
                      month.isCurrent
                        ? "text-warm-amber"
                        : isDark
                          ? "text-warm-light-gray"
                          : "text-warm-charcoal"
                    }`}
                  >
                    {isEn ? month.periodEn : month.periodTh}
                  </div>
                  <div className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-warm-subtle" : "text-warm-muted"}`}>
                    {isEn ? month.yearLabelEn : month.yearLabelTh}
                  </div>
                </div>
                {month.isCurrent && (
                  <div className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 bg-warm-amber/20 border border-warm-amber/30">
                    <MapPin size={8} className="text-warm-amber" />
                    <span className="text-[8px] font-bold text-warm-amber">NOW</span>
                  </div>
                )}
              </div>

              <div className="space-y-2.5">
                {month.milestones.map((milestone, mIdx) => {
                  const c = milestoneTypeColors[milestone.type]
                  return (
                    <div key={mIdx} className={`rounded-xl border px-3 py-2.5 ${isDark ? "border-border/80 bg-background/25" : "border-warm-light-gray/80 bg-background/70"}`}>
                      <div className="flex items-start gap-2">
                        <div
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: c.color }}
                        />
                        <span
                          className={`text-[13px] leading-6 ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}
                        >
                          {isEn ? milestone.label : milestone.labelTh}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-auto pt-4">
                <div className={`flex items-center justify-between border-t pt-3 text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? "border-border/80 text-warm-subtle" : "border-warm-light-gray text-warm-muted"}`}>
                  <span>{month.milestones.length} {isEn ? "items" : "รายการ"}</span>
                  <span>{month.isCurrent ? (isEn ? "current window" : "ช่วงปัจจุบัน") : (isEn ? "planned window" : "ช่วงแผนงาน")}</span>
                </div>
              </div>
            </m.div>
        ))}
      </div>
    </div>
  )
}
