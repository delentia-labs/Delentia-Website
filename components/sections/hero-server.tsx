import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowDown } from "lucide-react"
import { getLocalePrefix } from "@/lib/i18n"
import { pixelIcons } from "@/lib/pixel-icons"
import { SITE_ALGORITHM_COUNT, SITE_LAYER_COUNT, SITE_HEXACORE_COUNT, SITE_UPTIME } from "@/lib/site-config"
import { HeroArchitectureIsland } from "@/components/sections/hero-architecture-island"
import { HeroOrbActivator } from "@/components/sections/hero-orb-activator"

type HeroServerProps = {
  locale: "en" | "th"
}

export function HeroServer({ locale }: HeroServerProps) {
  const localePrefix = getLocalePrefix(locale)
  const isThai = locale === "th"
  const copy = isThai
    ? {
        badge: "Delentia OS",
        titleLine1: "Delentia OS: ระบบปฏิบัติการ AI",
        titleLine2: "Intent-Centric",
        titleLine3: "อันดับ 1 ของโลก",
        subtitle:
          "โครงการสถาปัตยกรรม AI ระดับองค์กรที่สร้างบนโมเดล 10 ชั้น กรอบอัลกอริทึม 41 รายการ 7 Genome Subsystems สมการ FDIA และ JITNA Protocol",
        ctaExplore: "สำรวจสถาปัตยกรรม",
        ctaDemo: "ดู Live Demo",
        statAlgorithms: "Algorithms",
        statLayers: "Layers",
        statGenomes: "Genomes",
        statUptime: "Uptime",
        scroll: "เลื่อนเพื่อสำรวจ",
      }
    : {
        badge: "Delentia OS",
        titleLine1: "Delentia OS: The World's 1st",
        titleLine2: "Intent-Centric",
        titleLine3: "AI Operating System",
        subtitle:
          "Enterprise AI architecture program built around a 10-layer model, a 41-algorithm framework, 7 Genome subsystems, the FDIA equation, and the JITNA Protocol.",
        ctaExplore: "Explore Architecture",
        ctaDemo: "View Live Demo",
        statAlgorithms: "Algorithms",
        statLayers: "Layers",
        statGenomes: "Genomes",
        statUptime: "Uptime",
        scroll: "Scroll to explore",
      }

  const stats = [
    { value: String(SITE_ALGORITHM_COUNT), label: copy.statAlgorithms, iconSrc: pixelIcons.brain },
    { value: String(SITE_LAYER_COUNT), label: copy.statLayers, iconSrc: pixelIcons.layers },
    { value: String(SITE_HEXACORE_COUNT), label: copy.statGenomes, iconSrc: pixelIcons.genome },
    { value: SITE_UPTIME.replace(" SLA", ""), sublabel: "SLA", label: copy.statUptime, iconSrc: pixelIcons.cpu },
  ]

  return (
    <section id="hero" data-main-section="hero" aria-label="Hero" className="relative flex min-h-[max(44rem,100svh)] items-center overflow-hidden">
      <HeroOrbActivator>
        <div className="hero-orb-field__mesh" />
        <div className="hero-orb-field__grid" />
        <div className="hero-orb-field__beam hero-orb-field__beam--top" />
        <div className="hero-orb-field__beam hero-orb-field__beam--bottom" />
        <div className="hero-orb-field__ring hero-orb-field__ring--one" />
        <div className="hero-orb-field__ring hero-orb-field__ring--two" />
        <div className="hero-orb-field__orb hero-orb-field__orb--amber" />
        <div className="hero-orb-field__orb hero-orb-field__orb--sage" />
        <div className="hero-orb-field__orb hero-orb-field__orb--blue" />
        <div className="hero-orb-field__wash" />
      </HeroOrbActivator>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(247,241,235,0.86),rgba(247,241,235,0.72)_50%,rgba(247,241,235,0.42)),linear-gradient(to_bottom,transparent_60%,rgba(247,241,235,0.78)_85%,#f7f1eb_100%)] dark:bg-[linear-gradient(to_right,rgba(13,13,13,0.92),rgba(13,13,13,0.80)_50%,rgba(13,13,13,0.54)),linear-gradient(to_bottom,transparent_60%,rgba(13,13,13,0.72)_85%,#0D0D0D_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-300 px-4 pt-20 pb-14 sm:px-6 sm:pb-16 lg:px-8 lg:pt-24 lg:pb-20">
        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(374px,484px)] lg:gap-8 xl:grid-cols-[minmax(0,1.01fr)_minmax(394px,484px)]">
          <div className="space-y-7 lg:space-y-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#e6ddd0] bg-white/96 px-3 py-1.5 shadow-[0_10px_24px_rgba(84,61,31,0.05)] dark:border-border dark:bg-card/80">
              <Image src="/RCTicon-lightVer.svg" alt="Delentia OS Logo" width={20} height={20} className="h-5 w-5 object-contain dark:hidden" priority />
              <Image src="/RCTicon.svg" alt="Delentia OS Logo" width={20} height={20} className="hidden h-5 w-5 object-contain dark:block" priority />
              <span className="text-xs font-medium text-warm-gray dark:text-warm-muted">{copy.badge}</span>
              <div className="h-1.5 w-1.5 rounded-full bg-warm-sage" />
            </div>

            <div className="space-y-4">
              <h1
                className={`text-4xl font-bold tracking-[-0.03em] leading-[1.12] sm:text-5xl lg:text-[56px] xl:text-[58px] ${isThai ? "font-thai" : ""} text-warm-charcoal dark:text-warm-light-gray`}
                style={isThai ? { fontSynthesis: "none" } : undefined}
              >
                {copy.titleLine1}
                <br />
                <span className="font-semibold text-warm-amber">{copy.titleLine2}</span>
                <br />
                {copy.titleLine3}
              </h1>

              <p
                className={`max-w-xl text-lg leading-relaxed sm:text-xl ${isThai ? "subtitle-th" : ""} text-warm-charcoal/72 dark:text-warm-pale/82`}
                style={isThai ? { fontSynthesis: "none" } : undefined}
              >
                {copy.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              <a
                href="#overview"
                className="group inline-flex items-center gap-2 rounded-xl bg-warm-charcoal px-6 py-3 text-sm font-medium text-white shadow-sm transition-[background-color,box-shadow,transform] duration-200 hover:bg-[#333333] hover:shadow-lg dark:bg-warm-amber dark:text-dark-900 dark:hover:bg-[#E0B96A]"
              >
                {copy.ctaExplore}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                href={`${localePrefix}/demo/fdia`}
                className="inline-flex items-center gap-2 rounded-xl border border-[#e6ddd0] bg-white px-6 py-3 text-sm font-medium text-warm-charcoal transition-[background-color,box-shadow] duration-200 hover:bg-[#fffdfa] hover:shadow-sm dark:border-border dark:bg-card/78 dark:text-warm-pale dark:hover:bg-secondary"
              >
                {copy.ctaDemo}
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-7 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[#e6ddd0] bg-white px-3 py-3 transition-all duration-300 hover:border-warm-amber/25 dark:border-border dark:bg-card/72">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e6ddd0] bg-white shadow-sm dark:border-border dark:bg-card/80">
                      <Image src={stat.iconSrc} alt="" width={18} height={18} className="object-contain" style={{ imageRendering: "pixelated" }} priority />
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold leading-none text-warm-charcoal dark:text-warm-light-gray">{stat.value}</div>
                      {"sublabel" in stat && stat.sublabel ? (
                        <div className="mt-0.5 text-[10px] font-medium text-warm-gray dark:text-warm-subtle">{stat.sublabel}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="text-xs font-medium leading-snug text-warm-secondary dark:text-warm-dim">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="group relative mx-auto w-full max-w-105 lg:-mr-2 lg:ml-0 lg:max-w-none">
            <HeroArchitectureIsland />
          </div>
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
          <a
            href="#overview"
            className="group flex flex-col items-center gap-2 rounded-full px-4 py-3 text-warm-gray transition-colors hover:text-warm-charcoal dark:text-warm-subtle dark:hover:text-warm-pale"
          >
            <span className="text-xs font-medium uppercase tracking-widest">{copy.scroll}</span>
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}