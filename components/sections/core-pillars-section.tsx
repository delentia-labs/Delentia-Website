"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, type CSSProperties } from "react"
import { m, useMotionTemplate, useReducedMotion, useSpring } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { getLocalePrefix } from "@/lib/i18n"
import { pixelIcons } from "@/lib/pixel-icons"
import { useCardSpotlight } from "@/hooks/use-card-spotlight"

type CorePillarsSectionProps = {
  locale: "en" | "th"
}

type PillarCardProps = {
  locale: "en" | "th"
  index: number
  pillar: {
    stat: string
    title: string
    desc: string
    color: string
    statClass: string
    bg: string
    darkBg: string
    iconSrc: string
    href: string
  }
}

function PillarCard({ locale, pillar, index }: PillarCardProps) {
  const [hovered, setHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const cardSpotlight = useCardSpotlight<HTMLAnchorElement>()
  const glowX = useSpring(82, { stiffness: 180, damping: 22, mass: 0.4 })
  const glowY = useSpring(16, { stiffness: 180, damping: 22, mass: 0.4 })
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(212,168,83,0.16), transparent 38%)`
  const iconSurfaceStyle = {
    "--pillar-icon-bg": pillar.bg,
    "--pillar-icon-bg-dark": pillar.darkBg,
  } as CSSProperties

  const handleMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    cardSpotlight.onPointerMove(event)
    const bounds = event.currentTarget.getBoundingClientRect()
    glowX.set(((event.clientX - bounds.left) / bounds.width) * 100)
    glowY.set(((event.clientY - bounds.top) / bounds.height) * 100)
  }

  const handleLeave = (event: React.PointerEvent<HTMLAnchorElement>) => {
    cardSpotlight.onPointerLeave(event)
    setHovered(false)
  }

  return (
    <m.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.44, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.007, transition: { type: "spring", stiffness: 260, damping: 22, mass: 0.7 } }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
      className="h-full"
    >
      <Link
        href={pillar.href}
        style={cardSpotlight.style}
        onFocus={cardSpotlight.onFocus}
        onBlur={cardSpotlight.onBlur}
        onPointerMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onPointerLeave={handleLeave}
        onMouseLeave={() => setHovered(false)}
        className="main-page-reactive-card group relative flex min-h-40 h-full overflow-hidden rounded-[28px] border border-border bg-white/90 px-4 py-4 sm:min-h-44 sm:px-5 sm:py-5 transition-[transform,border-color,box-shadow,background-color] duration-300 hover:border-warm-amber/40 hover:bg-white dark:bg-card/90 dark:hover:bg-card"
      >
        <m.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ backgroundImage: glow }} />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.84),rgba(255,248,240,0.12))] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,248,240,0.01))]" />

        <div className="pointer-events-none absolute right-4 top-4 z-10 flex flex-col items-center gap-4 sm:right-5 sm:top-5 sm:gap-5">
          <div
            className="flex h-[3.7rem] w-[3.7rem] items-center justify-center rounded-[1.25rem] border bg-(--pillar-icon-bg) shadow-[0_10px_24px_rgba(84,61,31,0.08)] transition-[transform,box-shadow] duration-300 group-hover:scale-[1.04] group-hover:shadow-[0_14px_28px_rgba(84,61,31,0.12)] dark:bg-(--pillar-icon-bg-dark) sm:h-[4.4rem] sm:w-[4.4rem]"
            style={iconSurfaceStyle}
          >
            <Image
              src={pillar.iconSrc}
              alt=""
              width={35}
              height={35}
              className="object-contain sm:h-10.5 sm:w-10.5"
              style={{ imageRendering: "pixelated" }}
            />
          </div>

          <div className="inline-flex h-10 min-w-[4.45rem] items-center justify-center gap-1 rounded-full border border-warm-amber/18 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7A5910] shadow-[0_8px_18px_rgba(84,61,31,0.06)] transition-transform duration-300 group-hover:-translate-y-0.5 dark:bg-background/75 dark:text-warm-amber sm:min-w-19">
            <span>{locale === "en" ? "Open" : "ดู"}</span>
            <ArrowRight className={`h-3.5 w-3.5 transition-transform duration-300 ${hovered ? "translate-x-0.5" : ""}`} />
          </div>
        </div>

        <div className="relative z-10 flex min-h-full flex-1 flex-col pr-28 sm:pr-[8.2rem]">
          <div className="min-w-0 flex-1">
            <div>
              <div
                className={`mb-2 text-[28px] font-bold leading-none sm:text-[33px] ${locale === "th" ? "font-thai" : "font-display"} ${pillar.statClass}`}
              >
                {pillar.stat}
              </div>
              <div className="mb-2 text-[15px] font-semibold leading-tight text-foreground transition-colors duration-200 group-hover:text-warm-amber sm:text-[17px]">
                {pillar.title}
              </div>
              <p className={`max-w-[28ch] text-[13px] leading-[1.72] text-muted-foreground sm:max-w-[30ch] sm:text-[14px] ${locale === "th" ? "subtitle-th" : ""}`}>
                {pillar.desc}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </m.div>
  )
}

export default function CorePillarsSection({ locale }: CorePillarsSectionProps) {
  const localePrefix = getLocalePrefix(locale)

  const pillars = [
    {
      stat: locale === "en" ? "7 Models" : "7 โมเดล",
      title: "HexaCore AI Engine",
      desc:
        locale === "en"
          ? "Western, Eastern, and Typhoon (Thai) LLMs — each task routed to the optimal model automatically."
          : "LLM Western, Eastern และ Typhoon ภาษาไทย — เลือกโมเดลที่เหมาะกับแต่ละงานอัตโนมัติ",
      color: "#D4A853",
      statClass: "text-[#8A6914] dark:text-warm-amber",
      bg: "#FEF3C7",
      darkBg: "#3D2E0A",
      iconSrc: pixelIcons.brain,
      href: `${localePrefix}/core-systems`,
    },
    {
      stat: "1,500×",
      title: "Intent Loop Engine",
      desc:
        locale === "en"
          ? "7-state pipeline. Cold start 3–5s → warm recall <50ms. Memory-first routing cuts cost 60–75%."
          : "Pipeline 7 สถานะ: cold start 3–5 วินาที → warm recall <50ms ลดต้นทุน 60–75% ด้วย memory-first routing",
      color: "#7B9E87",
      statClass: "text-[#3D6951] dark:text-warm-sage",
      bg: "#D1FAE5",
      darkBg: "#0D2B1E",
      iconSrc: pixelIcons.cpu,
      href: `${localePrefix}/core-systems`,
    },
    {
      stat: locale === "en" ? "4 Modes" : "4 โหมด",
      title: "Analysearch Intent",
      desc:
        locale === "en"
          ? "Quick, Standard, Deep, Mirror — GIGO protection and cross-disciplinary synthesis on every query."
          : "Quick, Standard, Deep, Mirror — GIGO Protection และ Cross-disciplinary Synthesis ทุก query",
      color: "#89B4C8",
      statClass: "text-[#2B5A78] dark:text-warm-sky",
      bg: "#DBEAFE",
      darkBg: "#0D1F2D",
      iconSrc: pixelIcons.network,
      href: `${localePrefix}/core-systems`,
    },
    {
      stat: "74% less",
      title: "Delta Memory Engine",
      desc:
        locale === "en"
          ? "Stores only state changes, not full snapshots. Delta storage that is 39–90% smaller than full snapshots, measured in bytes."
          : "บันทึกเฉพาะสิ่งที่เปลี่ยนแปลง ลดหน่วยความจำ 74% พร้อม reconstruction <1ms",
      color: "#C4745B",
      statClass: "text-warm-terracotta",
      bg: "#FEE2E2",
      darkBg: "#2D0E0A",
      iconSrc: pixelIcons.database,
      href: `${localePrefix}/core-systems`,
    },
  ]

  return (
    <section
      id="core-pillars"
      className="relative overflow-hidden border-y border-border bg-transparent py-14 md:py-20 transition-colors duration-300"
    >
      <div className="homepage-ambient-layer absolute inset-0">
        <div className="homepage-ambient-orb homepage-ambient-orb--amber absolute -left-24 top-8 h-60 w-60 rounded-full" />
        <div className="homepage-ambient-orb homepage-ambient-orb--sage homepage-ambient-orb--slow absolute -right-20 bottom-6 h-72 w-72 rounded-full" />
        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#fbf7f2]/42 to-transparent dark:from-white/6" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,241,235,0.22),transparent_24%,rgba(212,168,83,0.04)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%,rgba(212,168,83,0.028)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
          className="mb-9 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#7A5910] dark:text-warm-amber">
            {locale === "en" ? "Core Intelligence Pillars" : "เสาหลักปัญญาประดิษฐ์"}
          </p>
          <h2 className={`text-2xl font-bold text-foreground sm:text-3xl ${locale === "th" ? "font-thai" : "font-display"}`}>
            {locale === "en" ? "Four Engines. One Unified System." : "4 เครื่องยนต์. ระบบเดียวที่สมบูรณ์."}
          </h2>
        </m.div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} locale={locale} pillar={pillar} index={i} />
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href={`${localePrefix}/core-systems`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7A5910] hover:underline transition-colors dark:text-warm-amber"
          >
            {locale === "en" ? "Explore all core systems" : "สำรวจระบบหลักทั้งหมด"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}