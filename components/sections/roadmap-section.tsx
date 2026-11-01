"use client"

import { m } from "framer-motion"
import { ArrowRight, CheckCircle2, Circle, Clock, Heart, Users, Scale, Target, Trophy, CalendarClock } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import RoadmapMilestoneCalendar from "@/components/diagrams/roadmap-milestone-calendar"
import SectionHeading from "@/components/section-heading"
import { useMounted } from "@/hooks/use-mounted"
import { pixelIcons } from "@/lib/pixel-icons"

const PIXEL_ROCKET = pixelIcons.rocket

const roadmapData = {
  en: [
    {
      phase: "Phase 1", title: "Foundations", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "The ideas were written down before anything was built.",
      tasks: ["The FDIA equation, the JITNA packet format and RCT-7 defined", "41 algorithm modules written, with tests"],
    },
    {
      phase: "Phase 2", title: "The governed runtime", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "A runtime in which the model proposes and a gate decides.",
      tasks: ["Agent loop, tool gate, signed approvals and a rule for untrusted text", "A hash-chained, signed audit log, a notary and witnesses (built; the witness is not yet independent of the author)"],
    },
    {
      phase: "Phase 3", title: "Public release", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "Something a stranger can install and run on their own machine.",
      tasks: ["pip install delentia-os (PyPI), a Windows installer and the Desk web pages", "A model-free demo that shows the gate stopping a hijacked model; release 2.4.1 (1 Nov 2026)"],
    },
    {
      phase: "Phase 4", title: "Honest evidence", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "What is claimed is what can be checked.",
      tasks: ["Withdrawn claims listed; the test count on this site comes from public CI", "A threat model, known limitations and a comparison with other runtimes published"],
    },
    {
      phase: "Phase 5", title: "First measurements with strong hosted models", status: "in-progress" as const,
      color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15",
      summary: "No strong hosted model has driven the runtime yet; this phase changes that.",
      tasks: ["A capability screen of models from many vendors against rules written before the run", "Every result goes into a public register, whether good or poor"],
    },
    {
      phase: "Phase 6", title: "Public Technical Preview 0.1", status: "planned" as const,
      color: "#C4745B", bg: "#FEE2E2", darkBg: "#3A1E15",
      summary: "The stage is declared only after it has been earned.",
      tasks: ["A real Windows Hello test and an install on a second computer", "A handful of outside testers, with their reports counted"],
    },
    {
      phase: "Phase 7", title: "Independent verification", status: "planned" as const,
      color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A",
      summary: "Evidence that does not depend on the author.",
      tasks: ["A witness for the audit log that the author does not control", "Code-signing for the Windows installer; someone else reproducing a measurement"],
    },
    {
      phase: "Phase 8", title: "Design-partner pilots", status: "planned" as const,
      color: "#B8A9C9", bg: "#EDE9FE", darkBg: "#2A1E3A",
      summary: "A real workflow, measured against a plain agent.",
      tasks: ["One workflow per partner, with the pass rule written before the first run", "Results published with the partner's permission, failures included"],
    },
    {
      phase: "Phase 9", title: "Not planned unless a partner asks", status: "planned" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "Said plainly so nobody plans around it.",
      tasks: ["A hosted service, accounts, billing and multi-tenant isolation", "A marketplace of adapters"],
    },
  ],
  th: [
    {
      phase: "Phase 1", title: "รากฐาน", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "เขียนแนวคิดไว้ก่อนสร้างอะไร",
      tasks: ["นิยามสมการ FDIA, รูปแบบแพ็กเก็ต JITNA และ RCT-7", "เขียนโมดูลอัลกอริทึม 41 ตัวพร้อมเทสต์"],
    },
    {
      phase: "Phase 2", title: "รันไทม์ที่มีการกำกับ", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "รันไทม์ที่โมเดลเป็นฝ่ายเสนอและประตูเป็นฝ่ายตัดสิน",
      tasks: ["วงจร agent ประตูเครื่องมือ ลายเซ็นอนุมัติ และกฎสำหรับข้อความที่ไว้ใจไม่ได้", "audit log ที่เชื่อมด้วยแฮชและลงลายเซ็น notary และ witness (สร้างแล้ว แต่ witness ยังไม่อิสระจากผู้เขียน)"],
    },
    {
      phase: "Phase 3", title: "เปิดให้ใช้สาธารณะ", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "สิ่งที่คนแปลกหน้าติดตั้งและรันบนเครื่องตัวเองได้",
      tasks: ["pip install delentia-os (PyPI) ตัวติดตั้ง Windows และหน้าเว็บ Desk", "เดโมที่ไม่ต้องมีโมเดล แสดงประตูหยุดโมเดลที่ถูกยึด รุ่น 2.4.1 (1 พ.ย. 2026)"],
    },
    {
      phase: "Phase 4", title: "หลักฐานที่ซื่อสัตย์", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "สิ่งที่อ้างคือสิ่งที่ตรวจสอบได้",
      tasks: ["ลิสต์ข้ออ้างที่ถอนแล้ว จำนวนเทสต์บนเว็บนี้มาจาก CI สาธารณะ", "เผยแพร่ threat model ข้อจำกัดที่ทราบ และการเทียบกับ runtime อื่น"],
    },
    {
      phase: "Phase 5", title: "วัดผลกับโมเดลโฮสต์ที่เก่งเป็นครั้งแรก", status: "in-progress" as const,
      color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15",
      summary: "ยังไม่มีโมเดลโฮสต์ที่เก่งขับรันไทม์นี้ ระยะนี้คือการเปลี่ยนข้อนั้น",
      tasks: ["คัดกรองความสามารถของโมเดลจากหลายค่ายด้วยกฎที่เขียนไว้ก่อนรัน", "ทุกผลลงทะเบียนสาธารณะ ไม่ว่าดีหรือไม่ดี"],
    },
    {
      phase: "Phase 6", title: "Public Technical Preview 0.1", status: "planned" as const,
      color: "#C4745B", bg: "#FEE2E2", darkBg: "#3A1E15",
      summary: "ประกาศระยะนี้เมื่อได้มาจริงแล้วเท่านั้น",
      tasks: ["ทดสอบ Windows Hello จริงและติดตั้งบนเครื่องที่สอง", "ผู้ทดสอบภายนอกจำนวนหนึ่ง และนับรายงานของพวกเขา"],
    },
    {
      phase: "Phase 7", title: "การตรวจสอบโดยอิสระ", status: "planned" as const,
      color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A",
      summary: "หลักฐานที่ไม่ขึ้นกับผู้เขียน",
      tasks: ["witness ของ audit log ที่ผู้เขียนควบคุมไม่ได้", "ลงลายเซ็นโค้ดให้ตัวติดตั้ง Windows และมีคนอื่นทำซ้ำการวัด"],
    },
    {
      phase: "Phase 8", title: "pilot กับ design partner", status: "planned" as const,
      color: "#B8A9C9", bg: "#EDE9FE", darkBg: "#2A1E3A",
      summary: "งานจริงหนึ่งงาน วัดเทียบกับ agent ธรรมดา",
      tasks: ["หนึ่ง workflow ต่อหนึ่งพาร์ตเนอร์ โดยเขียนกฎผ่าน/ไม่ผ่านก่อนรันครั้งแรก", "เผยแพร่ผลเมื่อพาร์ตเนอร์อนุญาต รวมถึงความล้มเหลว"],
    },
    {
      phase: "Phase 9", title: "ไม่ได้วางแผน เว้นแต่มีพาร์ตเนอร์ขอ", status: "planned" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      summary: "บอกตรง ๆ เพื่อไม่ให้ใครวางแผนตามนี้",
      tasks: ["บริการโฮสต์ บัญชีผู้ใช้ การเรียกเก็บเงิน และการแยกผู้เช่า", "ตลาด adapter"],
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
      title: "Community Feedback",
      description: "Install reports, bug reports and people who try to break the gate are the most useful input there is. There is no paid plan and no funding programme.",
      impact: "Accelerator",
      impactType: "positive" as const,
      highlight: true,
    },
    {
      icon: Users,
      title: "Team Growth",
      description: "One author, directing AI coding assistants. More contributors and design partners would speed things up, and would also add review the project lacks today.",
      impact: "Accelerator",
      impactType: "positive" as const,
      highlight: false,
    },
    {
      icon: Scale,
      title: "Compliance: not claimed",
      description: "Nothing here is certified for PDPA, GDPR or anything else, and no compliance work is promised. A design partner who needs it would set the scope.",
      impact: "Risk Factor",
      impactType: "neutral" as const,
      highlight: false,
    },
  ],
  th: [
    {
      icon: Heart,
      title: "ผลตอบรับจากชุมชน",
      description: "รายงานการติดตั้ง รายงานบั๊ก และคนที่พยายามเจาะประตู คือข้อมูลที่มีประโยชน์ที่สุด ไม่มีแผนแบบชำระเงินและไม่มีโครงการระดมทุน",
      impact: "ตัวเร่ง",
      impactType: "positive" as const,
      highlight: true,
    },
    {
      icon: Users,
      title: "การขยายทีม",
      description: "ผู้เขียนคนเดียว สั่งงานผู้ช่วยเขียนโค้ด AI ผู้ร่วมพัฒนาและ design partner เพิ่มจะเร่งงานได้ และเพิ่มการรีวิวที่โครงการยังขาดอยู่",
      impact: "ตัวเร่ง",
      impactType: "positive" as const,
      highlight: false,
    },
    {
      icon: Scale,
      title: "การปฏิบัติตามกฎหมาย: ไม่ได้อ้าง",
      description: "ไม่มีอะไรที่นี่ที่ผ่านการรับรอง PDPA, GDPR หรืออื่น ๆ และไม่ได้สัญญางานด้านนี้ design partner ที่ต้องการจะเป็นผู้กำหนดขอบเขต",
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
            ? "The phases of the work in the order they are happening, with what is done, what is in progress and what is not promised. Last reviewed 1 Nov 2026."
            : "ระยะของงานตามลำดับที่กำลังเกิดขึ้น พร้อมสิ่งที่เสร็จแล้ว กำลังทำ และไม่ได้สัญญา ตรวจล่าสุด 1 พ.ย. 2026"}
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
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-warm-amber">Public releases (PyPI: delentia-os)</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>2.4.1 — 2026-11-01 (Setup assistant, bilingual stage label, demo reset)</li>
              <li>2.4.0 — 2026-10-26 (Desk pages in the package, Windows installer)</li>
              <li>2.3.1 — 2026-10-16</li>
              <li>2.3.0 — 2026-10-13 (agent runtime, model-free demo)</li>
              <li>2.2.x — 2026-06-06</li>
              <li>2.0.0 — 2026-05-28</li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">Earlier timelines that showed internal versions 4.x to 8.x and test counts were withdrawn: they could not be verified.</p>
          </div>
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

