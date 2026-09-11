import Image from "next/image"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { getLocalePrefix } from "@/lib/i18n"
import { pixelIcons } from "@/lib/pixel-icons"
import { SITE_MCP_LIVE_TOOL_COUNT, SITE_MCP_TEST_COUNT, SITE_HEXACORE_COUNT } from "@/lib/site-config"
import { AsciinemaTerminalPlayer } from "@/components/ui/asciinema-terminal-player"
import { HeroOrbActivator } from "@/components/sections/hero-orb-activator"
import { WaitlistCtaButton } from "@/components/sections/waitlist-cta-button"

type HeroServerProps = {
  locale: "en" | "th"
}

export function HeroServer({ locale }: HeroServerProps) {
  const localePrefix = getLocalePrefix(locale)
  const isThai = locale === "th"
  const copy = isThai
    ? {
        badge: "Live on Cloudflare Workers · npx delentia-mcp",
        titleLine1: "Delentia OS:",
        titleLine2: "Deterministic AI",
        titleLine3: "Guardrails",
        titleLine4: "สำหรับ Agentic Systems",
        subtitle:
          "MCP gateway ที่ใช้งานจริงวันนี้ — บังคับ authorization ด้วยสมการคณิตศาสตร์ (FDIA), reasoning แบบมีโครงสร้าง (RCT-7) และ policy control สำหรับ AI agent ติดตั้งผ่าน npx ได้ทันที ส่วนหนึ่งของสถาปัตยกรรม constitutional AI ที่กำลังพัฒนาต่อเนื่อง",
        ctaExplore: "สำรวจสถาปัตยกรรม",
        ctaDemo: "ดู Live MCP Terminal",
        statAlgorithms: "Live Tools",
        statLayers: "Tests Passing",
        statGenomes: "HexaCore Models",
        statUptime: "Deployed",
        scroll: "เลื่อนเพื่อสำรวจ",
      }
    : {
        badge: "Live on Cloudflare Workers · npx delentia-mcp",
        titleLine1: "Delentia OS:",
        titleLine2: "Deterministic AI",
        titleLine3: "Guardrails",
        titleLine4: "for Agentic Systems",
        subtitle:
          "A live MCP gateway enforcing mathematical authorization (FDIA), structured reasoning (RCT-7), and policy control for AI agents — installable via npx today. Part of a broader constitutional AI architecture still in active development.",
        ctaExplore: "Explore Architecture",
        ctaDemo: "View Live MCP Terminal",
        statAlgorithms: "Live Tools",
        statLayers: "Tests Passing",
        statGenomes: "HexaCore Models",
        statUptime: "Deployed",
        scroll: "Scroll to explore",
      }

  const stats = [
    { value: String(SITE_MCP_LIVE_TOOL_COUNT), label: copy.statAlgorithms, iconSrc: pixelIcons.brain },
    { value: String(SITE_MCP_TEST_COUNT), sublabel: "CI", label: copy.statLayers, iconSrc: pixelIcons.layers },
    { value: String(SITE_HEXACORE_COUNT), label: copy.statGenomes, iconSrc: pixelIcons.genome },
    { value: "Cloudflare", sublabel: "Workers", label: copy.statUptime, iconSrc: pixelIcons.cpu },
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

      <div className="relative z-10 mx-auto w-full max-w-300 px-4 pt-28 pb-14 sm:px-6 sm:pt-32 sm:pb-16 lg:px-8 lg:pt-36 lg:pb-20">
        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(374px,484px)] lg:gap-8 xl:grid-cols-[minmax(0,1.01fr)_minmax(394px,484px)]">
          <div className="space-y-7 lg:space-y-8">

            <div className="space-y-4">
              <h1
                className="text-4xl font-bold tracking-[-0.03em] leading-[1.12] sm:text-5xl lg:text-[56px] xl:text-[58px] font-display text-warm-charcoal dark:text-warm-light-gray"
              >
                <span className="font-display">{copy.titleLine1}</span>
                <br />
                <span className="font-display">{copy.titleLine2}</span>
                <br />
                <span className="font-display font-semibold text-warm-amber">{copy.titleLine3}</span>
                <br />
                <span className={isThai ? "font-thai text-3xl sm:text-4xl lg:text-[46px] font-semibold text-foreground/95" : "font-display"}>
                  {copy.titleLine4}
                </span>
              </h1>

              <p
                className={`max-w-xl text-lg leading-relaxed sm:text-xl ${isThai ? "font-thai" : "font-sans"} text-neutral-700 dark:text-neutral-200`}
                style={isThai ? { fontSynthesis: "none" } : undefined}
              >
                {copy.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              <WaitlistCtaButton
                locale={locale}
                className="group inline-flex items-center gap-2 rounded-xl bg-warm-charcoal px-6 py-3 text-sm font-semibold text-white shadow-md transition-[background-color,box-shadow,transform] duration-200 hover:bg-[#333333] hover:shadow-lg dark:bg-amber-400 dark:text-neutral-950 dark:hover:bg-amber-300 cursor-pointer"
              />
              <Link
                href={`${localePrefix}/demo/fdia`}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-[background-color,box-shadow,transform] duration-200 hover:bg-neutral-50 hover:shadow-sm dark:border-neutral-700 dark:bg-neutral-800/90 dark:text-white dark:hover:bg-neutral-700 dark:shadow-md cursor-pointer"
              >
                {copy.ctaDemo}
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-7 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[#e6ddd0] bg-white/90 px-3 py-3 transition-all duration-300 hover:border-amber-400/40 shadow-sm dark:border-neutral-800 dark:bg-[#14151b] dark:shadow-lg">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e6ddd0] bg-[#faf6f0] shadow-xs dark:border-neutral-700 dark:bg-[#1f2029]">
                      <Image src={stat.iconSrc} alt="" width={18} height={18} className="object-contain" style={{ imageRendering: "pixelated" }} priority />
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold leading-none text-neutral-900 dark:text-white">{stat.value}</div>
                      {"sublabel" in stat && stat.sublabel ? (
                        <div className="mt-0.5 text-[10px] font-medium text-neutral-500 dark:text-neutral-400">{stat.sublabel}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="text-xs font-medium leading-snug text-neutral-600 dark:text-neutral-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="group relative mx-auto w-full max-w-105 lg:-mr-2 lg:ml-0 lg:max-w-none">
            <AsciinemaTerminalPlayer />
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