"use client"

import Link from "next/link"
import { m, useReducedMotion } from "framer-motion"
import { Brain, Network, Shield, Cpu, CheckCircle2, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import SectionPreviewCard from "@/components/section-preview-card"
import SectionHeading from "@/components/section-heading"
import { pixelIcons as pixelIconPaths } from "@/lib/pixel-icons"
import { getLocalePrefix } from "@/lib/i18n"

const PIXEL_ARCH = pixelIconPaths.architecture

const deepDiveCards = [
  {
    iconSrc: pixelIconPaths.architecture,
    title: "10-Layer Architecture",
    titleTh: "สถาปัตยกรรม 10 ชั้น",
    description: "A comprehensive cognitive architecture stack from data ingestion to autonomous improvement.",
    descriptionTh: "สถาปัตยกรรม Cognitive Stack ตั้งแต่ Data Ingestion ถึง Autonomous Improvement",
    href: "/architecture",
    color: "#89B4C8",
    bg: "#DBEAFE",
  },
  {
    iconSrc: pixelIconPaths.genome,
    title: "7 Genome System",
    titleTh: "ระบบ 7 Genome",
    description: "Seven interconnected genomes forming a continuous improvement cycle.",
    descriptionTh: "7 Genomes ที่เชื่อมต่อกันสร้างวงจรปรับปรุงต่อเนื่อง",
    href: "/genome",
    color: "#C4745B",
    bg: "#FEE2E2",
  },
  {
    iconSrc: pixelIconPaths.jitna,
    title: "JITNA Protocol",
    titleTh: "โปรโตคอล JITNA",
    description: "Just-In-Time Nodal Assembly for agent negotiation, routing, and composable workflows.",
    descriptionTh: "Just-In-Time Nodal Assembly สำหรับการเจรจาของ agent, routing และ composable workflows",
    href: "/protocols/jitna-rfc-001",
    color: "#7B9E87",
    bg: "#D1FAE5",
  },
  {
    iconSrc: pixelIconPaths.algorithms,
    title: "Core Systems & Engines",
    titleTh: "ระบบหลักและเอ็นจิน",
    description: "A public-safe overview of HexaCore, Intent Loop, Analysearch, and Delta Memory.",
    descriptionTh: "ภาพรวมแบบ public-safe ของ HexaCore, Intent Loop, Analysearch และ Delta Memory",
    href: "/core-systems",
    color: "#D4A853",
    bg: "#FEF3C7",
  },
  {
    iconSrc: pixelIconPaths.rocket,
    title: "Integration & Deployment",
    titleTh: "การเชื่อมต่อและ Deployment",
    description: "MCP-native integration with multi-provider AI support and deployment infrastructure.",
    descriptionTh: "MCP-native integration พร้อม multi-provider AI support และ deployment infrastructure",
    href: "/integration",
    color: "#B8A9C9",
    bg: "#EDE9FE",
  },
  {
    iconSrc: pixelIconPaths.shield,
    title: "Signed AI & Verification",
    titleTh: "Signed AI และการตรวจสอบ",
    description: "Cryptographic verification, trusted outputs, and governance-ready auditability for enterprise deployment.",
    descriptionTh: "การยืนยันผลลัพธ์ด้วย cryptography ความน่าเชื่อถือของคำตอบ และ auditability สำหรับงานระดับองค์กร",
    href: "/products/signed-ai",
    color: "#7B9E87",
    bg: "#D1FAE5",
  },
]

// ──────────────────────────────────────────────────────────────
// System Flow Pipeline — replaces old 3-D NeuralBlueprint stack
// Mobile: vertical list with step dots
// Desktop: horizontal row of 5 cards with → connectors
// ──────────────────────────────────────────────────────────────
const PIPELINE = [
  {
    Icon: Brain,
    color: "#B8A9C9",
    badge: "FDIA",
    titleEn: "Intent Gate",
    titleTh: "กรองเจตนา",
    descEn: "F=(D^I)×A checks and filters every request at the entry point.",
    descTh: "สมการ FDIA กรองและตรวจสอบทุกคำขอก่อนเข้าระบบ",
    href: "/fdia",
  },
  {
    Icon: Network,
    color: "#D4A853",
    badge: "JITNA",
    titleEn: "Smart Route",
    titleTh: "จัดเส้นทาง",
    descEn: "JITNA assembles the right agents, tools and LLMs for the task.",
    descTh: "JITNA เลือก agent และโมเดลที่เหมาะสมสำหรับแต่ละงาน",
    href: "/protocols/jitna-rfc-001",
  },
  {
    Icon: Cpu,
    color: "#89B4C8",
    badge: "HexaCore",
    titleEn: "7-LLM Consensus",
    titleTh: "Consensus หลาย AI",
    descEn: "7 models (Claude · Gemini · Grok · Kimi · DeepSeek · Typhoon…) vote.",
    descTh: "7 โมเดล AI ร่วมกันลงคะแนนเสียงหาคำตอบที่ดีที่สุด",
    href: "/core-systems",
  },
  {
    Icon: Shield,
    color: "#7B9E87",
    badge: "SignedAI",
    titleEn: "Verify & Sign",
    titleTh: "ยืนยัน & เซ็น",
    descEn: "ED25519 cryptographic signature + RCTDB audit trail.",
    descTh: "ลายเซ็น ED25519 และ audit trail ใน RCTDB",
    href: "/products/signed-ai",
  },
  {
    Icon: CheckCircle2,
    color: "#C4745B",
    badge: "<0.3%* halluc.",
    titleEn: "Trusted Output",
    titleTh: "คำตอบที่เชื่อถือได้",
    descEn: "Auditable, provable enterprise-grade response with full provenance.",
    descTh: "คำตอบองค์กรที่ตรวจสอบและพิสูจน์ได้พร้อม provenance เต็มรูปแบบ",
    href: "/benchmark",
  },
]

const STATS = [
  { value: "5",       labelEn: "Pipeline Stages",  labelTh: "ขั้นตอน Pipeline" },
  { value: "<50ms",  labelEn: "Routing Latency",   labelTh: "ความหน่วง Routing" },
  { value: "ED25519", labelEn: "Signed Outputs",   labelTh: "Output ที่เซ็น" },
  { value: "100%",   labelEn: "Auditable",         labelTh: "ตรวจสอบได้" },
]

type OverviewSectionProps = {
  locale: "en" | "th"
}

export default function OverviewSection({ locale }: OverviewSectionProps) {
  const { language } = useLanguage()
  const isTh = language === "th"
  const prefersReducedMotion = useReducedMotion()
  const localePrefix = getLocalePrefix(locale)

  return (
    <section id="overview" aria-label="System Overview" className="relative overflow-hidden bg-transparent py-16 md:py-24 transition-colors duration-300">
      <div className="homepage-ambient-layer absolute inset-0">
        <div className="homepage-ambient-orb homepage-ambient-orb--amber absolute -left-24 top-12 h-72 w-72 rounded-full" />
        <div className="homepage-ambient-orb homepage-ambient-orb--sage homepage-ambient-orb--slow absolute -right-28 bottom-8 h-80 w-80 rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_26%,rgba(123,158,135,0.04)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%,rgba(123,158,135,0.028)_100%)]" />
      </div>

      <div className="relative max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag={isTh ? "RCT ทำงานอย่างไร" : "How RCT Works"}
          tagColor="sage"
          title={isTh ? "จากเจตนาสู่ Output ที่เชื่อถือได้" : "From Intent to Trusted Output"}
          italicWord={isTh ? "Output" : "Trusted"}
          description={isTh
            ? "ทุกคำขอผ่าน 5 ขั้นตอน — กรอง เส้นทาง ฉันทามติ ลงนาม และส่งมอบคำตอบที่ตรวจสอบได้"
            : "Every request flows through 5 stages — gate, route, consensus, sign, and deliver a verifiable answer."}
          pixelIcon={PIXEL_ARCH}
        />

        {/* ── System Flow Diagram ─────────────────────────────────── */}
        <m.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? undefined : { duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          {/* Desktop: horizontal row */}
          <div className="hidden md:flex items-stretch gap-0">
            {PIPELINE.map(({ Icon, color, badge, titleEn, titleTh, descEn, descTh, href }, i) => (
              <div key={badge} className="group/pipeline flex items-stretch gap-0 flex-1">
                {/* Card */}
                <Link href={`${localePrefix}${href}`} className="flex-1 min-w-0">
                  <m.div
                    whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.008 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.996 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className="relative flex h-full flex-col gap-2 overflow-hidden rounded-2xl border border-border/60 bg-white/90 px-4 py-5 cursor-pointer transition-[border-color,box-shadow] duration-300 hover:border-warm-amber/40 hover:shadow-[0_10px_28px_rgba(84,61,31,0.09)] dark:bg-card/80"
                    style={{ borderTopWidth: "3px", borderTopColor: color }}
                  >
                    {/* Gradient overlay — visible on hover */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/pipeline:opacity-100" aria-hidden="true">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,168,83,0.13),transparent_45%)]" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_30%)]" />
                    </div>
                    {/* Step number badge — top-right */}
                    <span
                      className="absolute right-3 top-3 text-[9px] font-bold tabular-nums opacity-25 transition-opacity duration-300 group-hover/pipeline:opacity-60"
                      style={{ color }}
                    >
                      0{i + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover/pipeline:scale-110"
                        style={{ background: `${color}20` }}
                      >
                        <Icon size={15} style={{ color }} />
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                        style={{ background: `${color}18`, color }}
                      >
                        {badge}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {isTh ? titleTh : titleEn}
                    </p>
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      {isTh ? descTh : descEn}
                    </p>
                  </m.div>
                </Link>
                {/* Arrow connector — lights up when card hovered */}
                {i < PIPELINE.length - 1 && (
                  <div className="flex items-center px-1 shrink-0 self-center">
                    <ArrowRight
                      size={14}
                      className="text-muted-foreground/30 transition-colors duration-200 group-hover/pipeline:text-warm-amber/55"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical numbered list */}
          <div className="flex flex-col gap-0 md:hidden">
            {PIPELINE.map(({ Icon, color, badge, titleEn, titleTh, descEn, descTh, href }, i) => (
              <div key={badge} className="flex gap-3">
                {/* Spine with dot + line */}
                <div className="flex flex-col items-center shrink-0 w-8">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full z-10"
                    style={{ background: `${color}22`, border: `2px solid ${color}60` }}
                  >
                    <Icon size={13} style={{ color }} />
                  </span>
                  {i < PIPELINE.length - 1 && (
                    <div className="w-0.5 flex-1 mt-0.5 mb-0.5" style={{ background: `${color}30` }} />
                  )}
                </div>
                {/* Content */}
                <Link
                  href={`${localePrefix}${href}`}
                  className={`pb-5 flex-1 min-w-0 active:opacity-70 transition-opacity duration-150 ${i === PIPELINE.length - 1 ? "pb-0" : ""}`}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                      style={{ background: `${color}18`, color }}
                    >
                      {badge}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-foreground leading-snug">
                    {isTh ? titleTh : titleEn}
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground mt-0.5">
                    {isTh ? descTh : descEn}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </m.div>

        {/* ── Stats Bar ──────────────────────────────────────────── */}
        <m.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? undefined : { duration: 0.36, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 grid grid-cols-4 divide-x divide-border/50 rounded-2xl border border-border/50 bg-muted/30 px-2 py-4 dark:bg-card/40"
        >
          {STATS.map(({ value, labelEn, labelTh }) => (
            <div key={value} className="flex flex-col items-center gap-0.5 px-2 text-center">
              <span className="text-xl font-bold tabular-nums text-foreground sm:text-2xl">{value}</span>
              <span className="text-[10px] text-muted-foreground sm:text-[11px]">
                {isTh ? labelTh : labelEn}
              </span>
            </div>
          ))}
        </m.div>

        {/* ── Deep-Dive Cards Grid ──────────────────────────────── */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {deepDiveCards.map((card, index) => (
            <SectionPreviewCard
              key={card.href}
              {...card}
              href={`${localePrefix}${card.href}`}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
