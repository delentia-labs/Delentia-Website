"use client"

import { m } from "framer-motion"
import { ArrowRight, CheckCircle2, Circle, Clock, Heart, Users, Scale, Target, Trophy, CalendarClock } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import VersionTimelineGraph from "@/components/diagrams/version-timeline-graph"
import RoadmapMilestoneCalendar from "@/components/diagrams/roadmap-milestone-calendar"
import SectionHeading from "@/components/section-heading"
import { useMounted } from "@/hooks/use-mounted"
import { pixelIcons } from "@/lib/pixel-icons"

const PIXEL_ROCKET = pixelIcons.rocket

const roadmapData = {
  en: [
    {
      phase: "Phase 1", title: "Foundations, FDIA, and Core Documentation", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "The constitutional base layer was defined before productization began.",
      tasks: ["FDIA equation defined", "10-layer architecture + 7 Genome references published"],
    },
    {
      phase: "Phase 2", title: "HexaCore Infrastructure", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "Core infrastructure moved from concept into verifiable runtime foundations.",
      tasks: ["Key manager, registry, routing, and consensus shipped", "53 targeted tests passed at 100%"],
    },
    {
      phase: "Phase 3", title: "Content, Schema & SEO Hardening", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "Trust, explainability, and discovery surfaces were hardened for public review.",
      tasks: ["22 research articles + author system published", "Schema, glossary, editorial policy, and methodology hardened"],
    },
    {
      phase: "Phase 4", title: "Website Content-Complete & Pre-Launch Hardening", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "Launch-facing surfaces are being refined to look, read, and rank like an enterprise platform.",
      tasks: ["Enterprise blog + compare surfaces refined", "Schema normalization and domain cutover completed"],
    },
    {
      phase: "Phase 5", title: "Production Launch & SEO Warmup", status: "in-progress" as const,
      color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15",
      summary: "The public launch window focuses on discovery, monetization, and first feedback loops.",
      tasks: ["DNS, Search Console, and SEO warmup go live", "Early Access, Lifetime Plan, and public feedback loop open"],
    },
    {
      phase: "Phase 6", title: "Backend Phase 1 — Full Delentia OS", status: "planned" as const,
      color: "#C4745B", bg: "#FEE2E2", darkBg: "#3A1E15",
      summary: "This phase converts the public narrative into a real backend operating state.",
      tasks: ["DelentiaAI connects to live HexaCore backend", "Typhoon integration and GitHub public documentation wave launch"],
    },
    {
      phase: "Phase 7", title: "Product Launches & Adoption", status: "planned" as const,
      color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A",
      summary: "Productization shifts from system readiness to adoption readiness.",
      tasks: ["DelentiaAI and SignedAI platforms launch", "Enterprise onboarding and adoption optimization begin"],
    },
    {
      phase: "Phase 8", title: "API Layer & Scale-Out", status: "planned" as const,
      color: "#B8A9C9", bg: "#EDE9FE", darkBg: "#2A1E3A",
      summary: "The platform expands from product delivery into API, cloud, and deployment scale.",
      tasks: ["v6 API layer + OpenAPI hardening", "v7 Helm charts and multi-cloud runway"],
    },
    {
      phase: "Phase 9", title: "Developer Ecosystem & Marketplace", status: "planned" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "The final layer broadens the ecosystem around developers, adapters, and marketplace motion.",
      tasks: ["TUI/CLI beta and power-user toolchain mature", "v8 marketplace + 20+ adapters target within 2027"],
    },
  ],
  th: [
    {
      phase: "Phase 1", title: "Foundation, FDIA และเอกสารแกนหลัก", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "ชั้นรัฐธรรมนูญของระบบถูกกำหนดให้ชัดก่อนเริ่ม productization จริง",
      tasks: ["กำหนด FDIA และโครงสร้าง 10 ชั้น", "เผยแพร่เอกสาร 7 Genome และ JITNA แกนหลัก"],
    },
    {
      phase: "Phase 2", title: "HexaCore Infrastructure", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "โครงสร้างพื้นฐานหลักขยับจากแนวคิดไปสู่ runtime ที่ตรวจสอบได้จริง",
      tasks: ["ส่งมอบ key manager, registry, routing และ consensus", "targeted tests 53 รายการผ่าน 100%"],
    },
    {
      phase: "Phase 3", title: "Content, Schema และการเสริมความแข็งแกร่ง SEO", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "ผิวหน้า trust, explainability และ discovery ถูกเสริมให้พร้อมต่อการตรวจสอบภายนอก",
      tasks: ["บทความวิจัย 22 ชิ้น + ระบบผู้เขียนเผยแพร่แล้ว", "schema, glossary, editorial policy และ methodology ถูก harden"],
    },
    {
      phase: "Phase 4", title: "เว็บไซต์ Content-Complete และ Pre-Launch Hardening", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "พื้นผิวก่อนเปิดตัวกำลังถูกเก็บให้ดูและอ่านแบบ enterprise platform มากขึ้น",
      tasks: ["blog และ compare surfaces ถูกยกระดับ", "schema normalization และ domain cutover เสร็จแล้ว"],
    },
    {
      phase: "Phase 5", title: "เปิดตัว Production & SEO Warmup", status: "in-progress" as const,
      color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15",
      summary: "ช่วงเปิดตัวสาธารณะจะเน้น discovery, monetization และ feedback loop ชุดแรก",
      tasks: ["DNS, Search Console และ SEO warmup เปิดใช้งาน", "Early Access, Lifetime Plan และ public feedback loop เริ่มทำงาน"],
    },
    {
      phase: "Phase 6", title: "Backend Phase 1 — Full Delentia OS", status: "planned" as const,
      color: "#C4745B", bg: "#FEE2E2", darkBg: "#3A1E15",
      summary: "เฟสนี้คือการย้ายระบบจาก narrative สาธารณะไปสู่ backend operating state ที่ทำงานจริง",
      tasks: ["DelentiaAI เชื่อมต่อ HexaCore backend จริง", "Typhoon integration และคลื่นเอกสาร GitHub Public เปิดตัว"],
    },
    {
      phase: "Phase 7", title: "Product Launches & Adoption", status: "planned" as const,
      color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A",
      summary: "น้ำหนักงานขยับจาก system readiness ไปสู่ adoption readiness",
      tasks: ["เปิดตัว DelentiaAI และ SignedAI Platform", "เริ่ม onboarding และ adoption optimization"],
    },
    {
      phase: "Phase 8", title: "API Layer & Scale-Out", status: "planned" as const,
      color: "#B8A9C9", bg: "#EDE9FE", darkBg: "#2A1E3A",
      summary: "แพลตฟอร์มจะขยายจาก product delivery ไปสู่ API และ deployment scale",
      tasks: ["v6 API layer + OpenAPI hardening", "v7 Helm charts และ multi-cloud runway"],
    },
    {
      phase: "Phase 9", title: "Developer Ecosystem & Marketplace", status: "planned" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "ชั้นสุดท้ายคือการขยาย ecosystem รอบนักพัฒนา adapter และ marketplace motion",
      tasks: ["TUI/CLI beta และ power-user toolchain โตเต็มขึ้น", "เป้า v8 marketplace + 20+ adapters ภายในปี 2027"],
    },
  ],
}

const statusIcons = { done: CheckCircle2, "in-progress": Clock, planned: Circle }
const statusLabelsData = {
  en: { done: "Completed", "in-progress": "In Progress", planned: "Planned" },
  th: { done: "เสร็จสิ้น", "in-progress": "กำลังดำเนินการ", planned: "วางแผนไว้" },
}

const devFactors = {
  en: [
    {
      icon: Heart,
      title: "Community Feedback & Funding",
      description: "Early Access and Lifetime Plan support directly translates to operational capital — accelerating development, enabling new tools, and growing the team sooner.",
      impact: "Accelerator",
      impactType: "positive" as const,
      highlight: true,
    },
    {
      icon: Users,
      title: "Team Growth",
      description: "Solo development now. Future team additions — whether through collaboration, hiring, or community contributors — can multiply delivery speed significantly.",
      impact: "Accelerator",
      impactType: "positive" as const,
      highlight: false,
    },
    {
      icon: Scale,
      title: "Legal & Compliance",
      description: "Post-launch legal processes (entity formation, contracts, compliance review) may run in parallel with development. Legal timelines can occasionally shift product launch dates.",
      impact: "Risk Factor",
      impactType: "neutral" as const,
      highlight: false,
    },
  ],
  th: [
    {
      icon: Heart,
      title: "ผลตอบรับและเงินทุนจากชุมชน",
      description: "การสนับสนุนผ่าน Early Access และ Lifetime Plan แปลงเป็นทุนหมุนเวียนโดยตรง — เร่งการพัฒนา เปิดใช้เครื่องมือใหม่ และขยายทีมได้เร็วขึ้น",
      impact: "ตัวเร่ง",
      impactType: "positive" as const,
      highlight: true,
    },
    {
      icon: Users,
      title: "การขยายทีม",
      description: "ปัจจุบันพัฒนาโดยคนเดียว การเพิ่มสมาชิกทีมในอนาคต ไม่ว่าจะเป็นผู้ร่วมงาน นักพัฒนาที่จ้างมา หรือ contributor จากชุมชน สามารถเพิ่มความเร็วการพัฒนาได้หลายเท่า",
      impact: "ตัวเร่ง",
      impactType: "positive" as const,
      highlight: false,
    },
    {
      icon: Scale,
      title: "กฎหมายและการปฏิบัติตามข้อกำหนด",
      description: "กระบวนการทางกฎหมายหลังเปิดตัว (จัดตั้งนิติบุคคล สัญญา การตรวจสอบ compliance) อาจดำเนินควบคู่กับการพัฒนา และอาจส่งผลต่อกำหนดการเปิดตัวผลิตภัณฑ์",
      impact: "ปัจจัยเสี่ยง",
      impactType: "neutral" as const,
      highlight: false,
    },
  ],
}

export default function RoadmapSection() {
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const mounted = useMounted()
  const isDark = mounted && resolvedTheme === "dark"
  const roadmap = roadmapData[language as keyof typeof roadmapData] || roadmapData.en
  const statusLabels = statusLabelsData[language as keyof typeof statusLabelsData] || statusLabelsData.en
  const factors = devFactors[language as keyof typeof devFactors] || devFactors.en
  const isEn = language === "en"

  return (
    <section id="roadmap" aria-label="Development Roadmap" className={`py-16 md:py-24 transition-colors duration-300 ${isDark ? "bg-dark-900" : "bg-warm-cream"}`}>
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag={isEn ? "Roadmap" : "เส้นทางการพัฒนา"}
          tagColor="gold"
          title="Development Roadmap"
          italicWord="Roadmap"
          description={isEn
            ? "Strategic phases aligned to the actual March 2026 engineering state, not an abstract marketing roadmap."
            : "ภาพรวมระยะการพัฒนาที่ยึดตามสถานะงานจริงของเดือนมีนาคม 2026 ไม่ใช่ roadmap เชิงการตลาดแบบตัดบริบท"}
          pixelIcon={PIXEL_ROCKET}
        />

        {/* Phase progress chain */}
        <m.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-6 flex items-center justify-center gap-2 flex-wrap"
        >
          {roadmap.map((item, index) => {
            const StatusIcon = statusIcons[item.status]
            return (
              <div key={item.phase} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-lg px-3 py-1.5" style={{ backgroundColor: isDark ? item.darkBg : item.bg }}>
                  <StatusIcon size={14} style={{ color: item.color }} />
                  <span className="text-xs font-semibold" style={{ color: item.color }}>{item.phase.replace("Phase ", "P")}</span>
                </div>
                {index < roadmap.length - 1 && <ArrowRight size={14} className={isDark ? "text-warm-subtle" : "text-muted-foreground/40"} />}
              </div>
            )
          })}
        </m.div>

        {/* Version Evolution Diagram */}
        <m.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <VersionTimelineGraph />
        </m.div>

        {/* Monthly Milestone Calendar */}
        <m.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8"
        >
          <RoadmapMilestoneCalendar />
        </m.div>

        {/* Phase Cards Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {roadmap.map((item, index) => {
            const StatusIcon = statusIcons[item.status]
            const statusTone = item.status === "done"
              ? isDark ? "border-warm-sage/30 bg-warm-sage/10 text-warm-sage" : "border-warm-sage/25 bg-warm-sage/10 text-warm-sage"
              : item.status === "in-progress"
                ? isDark ? "border-warm-amber/30 bg-warm-amber/10 text-warm-amber" : "border-warm-amber/25 bg-warm-amber/10 text-[#9a6d1e]"
                : isDark ? "border-[#27445a] bg-[#162633] text-[#89B4C8]" : "border-[#d8e5ee] bg-[#f4f9fc] text-[#4f7284]"

            return (
              <m.div
                key={item.phase}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.5, delay: index * 0.06 }}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-6 sm:p-7 transition-all duration-300 ${
                  isDark
                    ? "border-border/80 bg-card/90 shadow-[0_14px_36px_rgba(0,0,0,0.2)] hover:border-warm-amber/20 hover:shadow-[0_22px_48px_rgba(0,0,0,0.26)]"
                    : "border-[#e6ddd0] bg-white shadow-[0_12px_32px_rgba(84,61,31,0.05)] hover:border-warm-amber/30 hover:shadow-[0_20px_44px_rgba(84,61,31,0.08)]"
                } ${item.status === "in-progress" ? "ring-1 ring-warm-amber/25" : ""}`}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-warm-amber/30 to-transparent opacity-70" />
                <div className="pointer-events-none absolute inset-0 bg-radial from-warm-amber/6 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border text-xs font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]" style={{ backgroundColor: isDark ? item.darkBg : item.bg, color: item.color, borderColor: `${item.color}33` }}>
                    {item.phase.replace("Phase ", "P")}
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${statusTone}`}>
                    {statusLabels[item.status]}
                  </span>
                </div>

                <div className="relative min-w-0 flex-1">
                  <div className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-warm-subtle" : "text-warm-muted"}`}>
                    {isEn ? "Delivery phase" : "ช่วงส่งมอบ"}
                  </div>
                  <h3 className={`mt-2 text-xl font-bold leading-tight transition ${isDark ? "text-warm-light-gray group-hover:text-warm-amber" : "text-warm-charcoal group-hover:text-warm-amber"}`}>
                    {item.title}
                  </h3>
                  <p className={`mt-3 text-sm leading-7 ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>
                    {item.summary}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium" style={{ color: item.color, borderColor: `${item.color}2E`, backgroundColor: isDark ? `${item.color}14` : `${item.color}10` }}>
                    <StatusIcon size={12} />
                    <span>{item.phase}</span>
                  </div>
                </div>

                <div className="mt-5 space-y-2.5">
                  {item.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className={`flex items-start gap-2.5 rounded-xl border px-3 py-3 ${isDark ? "border-border/70 bg-background/20" : "border-[#eee2d6] bg-[#fffaf6]"}`}>
                      {item.status === "done"
                        ? <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-warm-sage" />
                        : <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                      }
                      <span className={`text-sm leading-relaxed sm:text-[15px] ${
                        item.status === "done"
                          ? isDark ? "text-warm-dim line-through" : "text-warm-gray line-through"
                          : isDark ? "text-warm-dim" : "text-warm-secondary"
                      }`}>{task}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <div className={`flex items-center justify-between border-t pt-4 text-sm font-semibold ${isDark ? "border-border/80 text-warm-light-gray" : "border-[#eee2d6] text-warm-charcoal"}`}>
                    <span className="inline-flex items-center gap-2">
                      <span>{isEn ? "Key deliverables" : "สิ่งส่งมอบหลัก"}</span>
                      <ArrowRight size={16} className="text-warm-amber" />
                    </span>
                    <span className={`text-[10px] uppercase tracking-[0.18em] ${isDark ? "text-warm-subtle" : "text-warm-muted"}`}>
                      {item.tasks.length} {isEn ? "items" : "รายการ"}
                    </span>
                  </div>
                </div>
              </m.div>
            )
          })}
        </div>

        {/* Development Velocity Factors */}
        <m.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-14"
        >
          <div className="mb-6 text-center">
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
              isDark ? "bg-dark-amber-bg text-warm-amber border-warm-amber/20" : "tag-amber"
            }`}>
              {isEn ? "Velocity Factors" : "ปัจจัยความเร็ว"}
            </span>
            <h2 className={`mt-3 text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
              {isEn ? "Development Velocity" : "ความเร็วในการพัฒนา"}
            </h2>
            <p className={`mt-2 text-sm sm:text-base max-w-2xl mx-auto ${isEn ? "" : "subtitle-th"} ${isDark ? "text-warm-muted" : "text-warm-secondary"}`}>
              {isEn
                ? "Development speed may vary month-to-month. These are the primary factors that can accelerate or shift the timeline."
                : "ความเร็วการพัฒนาอาจเปลี่ยนแปลงรายเดือน ปัจจัยเหล่านี้คือสิ่งที่สามารถเร่งหรือเลื่อนกำหนดการได้"}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {factors.map((factor, index) => {
              const Icon = factor.icon
              const badgeTone = factor.impactType === "positive"
                ? isDark ? "border-warm-amber/30 bg-warm-amber/10 text-warm-amber" : "border-warm-amber/25 bg-warm-amber/10 text-[#9a6d1e]"
                : isDark ? "border-border bg-background/60 text-warm-dim" : "border-[#e6ddd0] bg-[#fffaf6] text-warm-gray"
              return (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.08 }}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-5 sm:p-6 transition-all duration-300 ${
                    isDark
                      ? "border-border/80 bg-card/90 shadow-[0_12px_30px_rgba(0,0,0,0.18)] hover:border-warm-amber/20 hover:shadow-[0_18px_38px_rgba(0,0,0,0.24)]"
                      : "border-[#e6ddd0] bg-white shadow-[0_12px_28px_rgba(84,61,31,0.045)] hover:border-warm-amber/30 hover:shadow-[0_18px_36px_rgba(84,61,31,0.075)]"
                  } ${factor.highlight ? "ring-1 ring-warm-amber/25" : ""}`}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-warm-amber/30 to-transparent opacity-70" />
                  <div className="pointer-events-none absolute inset-0 bg-radial from-warm-amber/6 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-[18px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] ${
                      factor.impactType === "positive"
                        ? isDark ? "border-warm-amber/25 bg-dark-amber-bg" : "border-[#eee2d6] bg-[#fffaf6]"
                        : isDark ? "border-border bg-background/70" : "border-[#eee2d6] bg-[#fffaf6]"
                    }`}>
                      <Icon size={18} className={factor.impactType === "positive" ? "text-warm-amber" : isDark ? "text-warm-dim" : "text-warm-gray"} />
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${badgeTone}`}>
                      {factor.impact}
                    </span>
                  </div>

                  <div className="relative flex-1">
                    <div className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-warm-subtle" : "text-warm-muted"}`}>
                      {isEn ? "Timeline variable" : "ตัวแปรของไทม์ไลน์"}
                    </div>
                    <h3 className={`mt-2 text-xl font-bold leading-tight transition ${isDark ? "text-warm-light-gray group-hover:text-warm-amber" : "text-warm-charcoal group-hover:text-warm-amber"}`}>
                      {factor.title}
                    </h3>
                  </div>

                  <p className={`mt-4 text-sm leading-7 ${isEn ? "" : "subtitle-th"} ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>
                    {factor.description}
                  </p>

                  <div className="mt-auto pt-6">
                    <div className={`flex items-center justify-between border-t pt-4 text-sm font-semibold ${isDark ? "border-border/80 text-warm-light-gray" : "border-[#eee2d6] text-warm-charcoal"}`}>
                      <span className="inline-flex items-center gap-2">
                        <span>{isEn ? "Timeline influence" : "ผลต่อไทม์ไลน์"}</span>
                        <ArrowRight size={16} className="text-warm-amber" />
                      </span>
                      <span className={`text-[10px] uppercase tracking-[0.18em] ${isDark ? "text-warm-subtle" : "text-warm-muted"}`}>
                        {factor.impactType === "positive" ? (isEn ? "accelerator" : "ตัวเร่ง") : (isEn ? "risk factor" : "ปัจจัยเสี่ยง")}
                      </span>
                    </div>
                  </div>
                </m.div>
              )
            })}
          </div>
        </m.div>

        {/* Founder Commitment Banner */}
        <m.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10"
        >
          <div className={`relative overflow-hidden rounded-3xl border p-7 sm:p-8 ${
            isDark
              ? "bg-warm-charcoal border-warm-amber/20 shadow-[0_0_60px_rgba(212,168,83,0.06)]"
              : "bg-white border-warm-amber/30 shadow-[0_8px_40px_rgba(212,168,83,0.08)]"
          }`}>
            {/* Amber left accent bar */}
            <div className="absolute bottom-0 left-0 top-0 w-1 rounded-l-3xl bg-linear-to-b from-warm-amber/80 via-warm-amber to-warm-amber/40" />

            <div className="pl-2">
              <div className="mb-4 flex items-center gap-2">
                <CalendarClock size={16} className="text-warm-amber" />
                <span className={`text-xs font-semibold uppercase tracking-wider text-warm-amber`}>
                  {isEn ? "Solo Development Commitment" : "คำมั่นสัญญาการพัฒนาโดยคนเดียว"}
                </span>
              </div>

              <blockquote className={`mb-6 text-base sm:text-lg font-medium italic leading-relaxed ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                {isEn
                  ? "\"Regardless of external support, funding, or feedback — this project will be completed. The target is within 2027, even as a fully solo endeavour.\""
                  : "\"ไม่ว่าจะมีใครสนับสนุนหรือไม่ ไม่ว่าจะมีเสียงตอบรับหรือเปล่า — งานนี้จะแล้วเสร็จ เป้าหมายคือภายในปี 2027 แม้จะพัฒนาคนเดียวทั้งหมด\""}
              </blockquote>

              <div className={`grid gap-4 sm:grid-cols-2 mb-6 p-4 rounded-2xl border ${isDark ? "bg-dark-900/50 border-border" : "bg-warm-cream border-warm-light-gray"}`}>
                <div className="flex items-start gap-3">
                  <Target size={16} className="mt-0.5 shrink-0 text-warm-amber" />
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-warm-dim" : "text-warm-gray"}`}>
                      {isEn ? "Initial Goal" : "เป้าหมายเบื้องต้น"}
                    </div>
                    <p className={`text-sm ${isEn ? "" : "subtitle-th"} ${isDark ? "text-warm-muted" : "text-warm-secondary"}`}>
                      {isEn
                        ? "Publish the creator's work, build a personal portfolio, and establish SEO presence through this website."
                        : "เผยแพร่ผลงานของผู้สร้าง สร้าง portfolio ส่วนตัว และสร้างฐาน SEO ผ่านเว็บไซต์นี้"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Trophy size={16} className="mt-0.5 shrink-0 text-warm-amber" />
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-warm-dim" : "text-warm-gray"}`}>
                      {isEn ? "Ultimate Goal" : "เป้าหมายสูงสุด"}
                    </div>
                    <p className={`text-sm ${isEn ? "" : "subtitle-th"} ${isDark ? "text-warm-muted" : "text-warm-secondary"}`}>
                      {isEn
                        ? "Delentia OS 100% complete. All products launched. A fully operational Constitutional AI ecosystem."
                        : "Delentia OS สำเร็จ 100% ผลิตภัณฑ์ทุกตัวเปิดตัวแล้ว Ecosystem AI แบบ Constitutional พร้อมใช้งานเต็มรูปแบบ"}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`flex items-center gap-2 text-xs ${isDark ? "text-warm-dim" : "text-warm-gray"}`}>
                <div className="h-1.5 w-1.5 rounded-full bg-warm-amber/60" />
                <span className={isEn ? "" : "subtitle-th"}>
                  {isEn
                    ? "The schedule already accounts for legal, staffing, and external variables — the completion target remains within 2027."
                    : "กำหนดการคำนวณจากปัจจัยกฎหมาย ทีม และสิ่งแวดล้อมภายนอกแล้ว — เป้าหมายการปิดงานยังอยู่ภายในปี 2027"}
                </span>
              </div>
            </div>
          </div>
        </m.div>

      </div>
    </section>
  )
}

