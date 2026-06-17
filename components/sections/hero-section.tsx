"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { ArrowRight, ArrowDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { getLocalePrefix } from "@/lib/i18n"
import OptimizedImage from "@/components/ui/optimized-image"
import { useMounted } from "@/hooks/use-mounted"
import { useIdleActivation } from "@/hooks/use-idle-activation"
import { pixelIcons } from "@/lib/pixel-icons"
import { useCardSpotlight } from "@/hooks/use-card-spotlight"
import { SITE_ALGORITHM_COUNT, SITE_LAYER_COUNT, SITE_HEXACORE_COUNT, SITE_UPTIME } from "@/lib/site-config"

const HeroArchitectureVisual = dynamic(() => import("@/components/sections/hero-architecture-visual"), {
  loading: () => (
    <div className="mx-auto w-full max-w-105 sm:max-w-115 lg:ml-auto lg:max-w-121">
      <div className="aspect-[1/1.04] sm:aspect-5/4 w-full rounded-4xl border border-[#e6ddd0] bg-white/50 shadow-[0_20px_48px_rgba(84,61,31,0.08)] dark:border-border dark:bg-card/45" />
    </div>
  ),
})

const HeroAnimatedBackground = dynamic(
  () => import("@/components/ui/hero-animated-background"),
  { loading: () => null },
)

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/rct-hero-human-v2-JuuABknjMqUydZ7t62H8ez.webp"

type HeroSectionProps = {
  locale: "en" | "th"
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const [heroBgError, setHeroBgError] = useState(false)
  const localePrefix = getLocalePrefix(locale)
  const isThai = locale === "th"
  const isDark = mounted && resolvedTheme === "dark"
  const deferredHeroAssetsReady = useIdleActivation({ timeoutMs: 900 })
  const statCardSpotlight = useCardSpotlight<HTMLDivElement>()

  const copy = isThai
    ? {
        badge: "Reverse Component Thinking",
        titleLine1: "Delentia OS:",
        titleLine2: "ระบบปฏิบัติการ AI",
        titleLine3: "Intent-Centric",
        titleLine4: "ลำดับที่ 1 ของโลก",
        subtitle:
          "โครงการสถาปัตยกรรม AI ระดับองค์กรที่สร้างบนโมเดล 10 ชั้น กรอบอัลกอริทึม 41 รายการ 7 Genome Subsystems สมการ FDIA และ JITNA Protocol",
        ctaExplore: "สำรวจสถาปัตยกรรม",
        ctaDemo: "ดู Live Demo",
        ctaEarlyAccess: "เข้าร่วม Early Access",
        statAlgorithms: "Algorithms",
        statLayers: "Layers",
        statGenomes: "Genomes",
        statUptime: "Uptime",
        scroll: "เลื่อนเพื่อสำรวจ",
      }
    : {
        badge: "Reverse Component Thinking",
        titleLine1: "Delentia OS:",
        titleLine2: "The World's 1st",
        titleLine3: "Intent-Centric",
        titleLine4: "AI Operating System",
        subtitle:
          "Enterprise AI architecture program built around a 10-layer model, a 41-algorithm framework, 7 Genome subsystems, the FDIA equation, and the JITNA Protocol.",
        ctaExplore: "Explore Architecture",
        ctaDemo: "View Live Demo",
        ctaEarlyAccess: "Join Early Access",
        statAlgorithms: "Algorithms",
        statLayers: "Layers",
        statGenomes: "Genomes",
        statUptime: "Uptime",
        scroll: "Scroll to explore",
      }

  const scrollTo = (id: string) => {
    document
      .querySelector(id)
      ?.scrollIntoView({ behavior: "smooth" })
  }

  const stats = [
    { value: String(SITE_ALGORITHM_COUNT), label: copy.statAlgorithms, iconSrc: pixelIcons.brain },
    { value: String(SITE_LAYER_COUNT), label: copy.statLayers, iconSrc: pixelIcons.layers },
    { value: String(SITE_HEXACORE_COUNT), label: copy.statGenomes, iconSrc: pixelIcons.genome },
    { value: SITE_UPTIME.replace(" SLA", ""), sublabel: "SLA", label: copy.statUptime, iconSrc: pixelIcons.cpu },
  ]

  return (
    <section id="hero" data-main-section="hero" aria-label="Hero" className="relative flex min-h-[max(44rem,100svh)] items-center overflow-hidden">
      {/* Hero image — priority load bypasses JS gate for LCP (hidden on CDN error) */}
      {!heroBgError && (
        <div className="absolute inset-0">
          <OptimizedImage
            src={HERO_BG}
            alt="Delentia OS Hero Background"
            containerClassName="h-full w-full"
            objectFit="cover"
            priority
            sizes="100vw"
            className={isDark ? "scale-[1.03] opacity-[0.12]" : "scale-[1.02] opacity-[0.24]"}
            onError={() => setHeroBgError(true)}
          />
        </div>
      )}
      {/* Gradient overlay — starts almost fully opaque to prevent flash, settles to full opacity */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-linear-to-r from-[#0D0D0D]/96 via-[#0D0D0D]/84 to-[#0D0D0D]/56"
            : "bg-linear-to-r from-[#f7f1eb]/88 via-[#f7f1eb]/74 to-[#f7f1eb]/42"
        }`}
      />
      <div className="homepage-ambient-layer absolute inset-0" suppressHydrationWarning>
        <div className="homepage-ambient-orb homepage-ambient-orb--amber absolute -left-24 top-[16%] h-72 w-72 rounded-full" />
        <div className="homepage-ambient-orb homepage-ambient-orb--sage homepage-ambient-orb--slow absolute -right-16 top-[34%] h-80 w-80 rounded-full" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent via-[#f7f1eb]/26 to-[#f7f1eb]/84 dark:via-[#121212]/16 dark:to-[#121212]/72" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,241,235,0.12),transparent_24%,rgba(212,168,83,0.04)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_30%,rgba(212,168,83,0.02)_100%)]" />
      </div>
      {/* Structured background layers — rendered immediately; component fades in via initial={{ opacity:0 }} */}
      {deferredHeroAssetsReady ? <HeroAnimatedBackground variant="hero" /> : null}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-3 h-56 bg-[linear-gradient(180deg,transparent_0%,rgba(247,241,235,0.18)_34%,rgba(247,241,235,0.78)_72%,#f7f1eb_100%)] dark:bg-[linear-gradient(180deg,transparent_0%,rgba(13,13,13,0.08)_30%,rgba(13,13,13,0.72)_72%,#0D0D0D_100%)]" />
      {deferredHeroAssetsReady ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[18%] bottom-10 z-3 h-24 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.1),transparent_70%)]"
        />
      ) : null}
      <div className="relative z-10 mx-auto w-full max-w-300 px-4 pt-20 pb-14 sm:px-6 sm:pb-16 lg:px-8 lg:pt-24 lg:pb-20">
        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(374px,484px)] lg:gap-8 xl:grid-cols-[minmax(0,1.01fr)_minmax(394px,484px)]">
          <div className="space-y-7 lg:space-y-8">
            <div
              className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border shadow-sm ${
                isDark ? "bg-card/80 border-border" : "border-[#e6ddd0] bg-white/96 shadow-[0_10px_24px_rgba(84,61,31,0.05)]"
              }`}
            >
              <OptimizedImage
                src={isDark ? "/DelentiaIcon.svg" : "/DelentiaIcon-lightVer.svg"}
                alt="Delentia OS Logo"
                containerClassName="w-5 h-5"
                className=""
                objectFit="contain"
                width={20}
                height={20}
              />
              <span className={`text-xs font-medium ${isDark ? "text-warm-muted" : "text-warm-gray"}`}>{copy.badge}</span>
              <div className="h-1.5 w-1.5 rounded-full bg-warm-sage" />
            </div>

            <div className="space-y-4 lg:space-y-5">
              <div>
                <h1 className={`text-4xl font-bold tracking-[-0.03em] leading-[1.12] sm:text-5xl lg:text-[56px] xl:text-[58px] ${isThai ? "font-thai" : ""} ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                  {copy.titleLine1}
                  <br />
                  {copy.titleLine2}
                  <br />
                  <span className="font-semibold text-warm-amber">{copy.titleLine3}</span>
                  <br />
                  {copy.titleLine4}
                </h1>
              </div>
              <div>
                <p className={`max-w-xl text-lg leading-relaxed sm:text-xl ${isThai ? "subtitle-th" : ""} ${isDark ? "text-warm-pale/82" : "text-warm-charcoal/72"}`}>
                  {copy.subtitle}
                </p>
                <p className="sr-only">
                  {isThai
                    ? "Delentia OS คือระบบปฏิบัติการ AI แบบรัฐธรรมนูญ 10 ชั้น ใช้ FDIA gating, HexaCore 7 โมเดล และ SignedAI consensus มุ่งสู่ hallucination ต่ำกว่า 0.3% บน benchmark workloads สำหรับองค์กร"
                    : "Delentia OS is a 10-layer Constitutional AI Operating System — using FDIA gating, 7-model HexaCore routing, and SignedAI consensus to target under 0.3% hallucination on benchmarked enterprise workloads."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              <button
                onClick={() => scrollTo("#overview")}
                className={`group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-[background-color,box-shadow,transform] shadow-sm hover:shadow-lg duration-200 ${
                  isDark ? "text-dark-900 bg-warm-amber hover:bg-[#E0B96A]" : "text-white bg-warm-charcoal hover:bg-[#333333]"
                }`}
              >
                {copy.ctaExplore}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <div>
                <Link
                href={`${localePrefix}/demo/fdia`}
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border rounded-xl transition-[background-color,box-shadow] hover:shadow-sm duration-200 ${
                  isDark
                    ? "text-warm-pale bg-card/80 border-border hover:bg-secondary"
                    : "text-warm-charcoal border-[#e6ddd0] bg-white hover:bg-[#fffdfa]"
                }`}
                >
                  {copy.ctaDemo}
                </Link>
              </div>
              <div>
                <Link
                  href={`${localePrefix}/community/members`}
                  className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-xl border transition-[background-color,border-color] duration-200 ${
                    isDark
                      ? "text-warm-amber border-warm-amber/25 hover:bg-warm-amber/10 hover:border-warm-amber/40"
                      : "text-[#8B5E10] border-warm-amber/40 hover:bg-warm-amber/8 hover:border-warm-amber/60"
                  }`}
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  {copy.ctaEarlyAccess}
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-7 md:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  {...(deferredHeroAssetsReady ? statCardSpotlight : {})}
                  className={`main-page-reactive-card rounded-2xl border px-3 py-3 transition-all duration-300 hover:-translate-y-1 ${isDark ? "border-border bg-card/72 hover:border-warm-amber/20 hover:bg-card/82" : "border-[#e6ddd0] bg-white hover:border-warm-amber/25 hover:bg-white"}`}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg border shadow-sm ${
                      isDark ? "bg-card/80 border-border" : "border-[#e6ddd0] bg-white"
                    }`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <Image
                        src={stat.iconSrc}
                        alt=""
                        width={18}
                        height={18}
                        className="object-contain"
                        style={{ imageRendering: "pixelated" }}
                      />
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold leading-none ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>{stat.value}</div>
                      {"sublabel" in stat && stat.sublabel && (
                        <div className={`text-[9px] font-medium mt-0.5 ${isDark ? "text-warm-subtle" : "text-warm-gray"}`}>{stat.sublabel}</div>
                      )}
                    </div>
                  </div>
                  <div className={`text-[11px] font-medium leading-snug sm:text-xs ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="group relative mx-auto w-full max-w-105 lg:-mr-2 lg:ml-0 lg:max-w-none"
          >
            {deferredHeroAssetsReady ? <HeroArchitectureVisual /> : (
              <div className="mx-auto w-full max-w-105 sm:max-w-115 lg:ml-auto lg:max-w-121">
                <div className={`aspect-[1/1.04] sm:aspect-5/4 w-full rounded-4xl border shadow-[0_20px_48px_rgba(84,61,31,0.08)] overflow-hidden ${isDark ? "border-border bg-card/45" : "border-[#e6ddd0] bg-white/50"}`}>
                  {/* Skeleton: orbit label hints shown while HeroArchitectureVisual loads */}
                  <div className="flex h-full flex-col items-center justify-center gap-3 px-8 opacity-40">
                    <div className={`h-2 w-24 animate-pulse rounded-full ${isDark ? "bg-warm-amber/30" : "bg-warm-amber/40"}`} />
                    <div className="grid grid-cols-2 gap-2 w-full max-w-50">
                      {["Intent", "Verify", "Memory", "Kernel"].map((label) => (
                        <div key={label} className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 ${isDark ? "border-border/60 bg-card/60" : "border-[#e6ddd0] bg-warm-sand/50"}`}>
                          <div className={`h-1.5 w-1.5 rounded-full bg-warm-amber/60`} />
                          <span className={`text-[10px] font-medium ${isDark ? "text-warm-muted" : "text-warm-gray"}`}>{label}</span>
                        </div>
                      ))}
                    </div>
                    <div className={`h-1.5 w-16 animate-pulse rounded-full ${isDark ? "bg-warm-sage/20" : "bg-warm-sage/30"}`} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
          <button
            onClick={() => scrollTo("#overview")}
            className={`group rounded-full px-4 py-3 flex flex-col items-center gap-2 transition-colors ${isDark ? "text-warm-subtle hover:text-warm-pale" : "text-warm-gray hover:text-warm-charcoal"}`}
          >
            <span className="text-xs font-medium uppercase tracking-widest">{copy.scroll}</span>
            <div className="animate-pulse">
              <ArrowDown className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
