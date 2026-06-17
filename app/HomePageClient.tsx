"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"
import { getLocalePrefix } from "@/lib/i18n"
import { MainPageOrchestrator } from "@/components/main-page/main-page-orchestrator"
import { MainPageSection } from "@/components/main-page/main-page-section"
import { DeferredSection } from "@/components/performance/deferred-section"

const WaitlistModal = dynamic(() => import("@/components/sections/waitlist-modal").then((mod) => mod.WaitlistModal), {
  ssr: false,
})

const OverviewSection = dynamic(() => import("@/components/sections/overview-section"), {
  loading: () => <div className="min-h-195 animate-pulse rounded-[28px] border border-border/60 bg-white/55 dark:bg-card/45" />,
})
const CorePillarsSection = dynamic(() => import("@/components/sections/core-pillars-section"), {
  loading: () => <div className="min-h-180 animate-pulse rounded-[28px] border border-border/60 bg-white/55 dark:bg-card/45" />,
})
const FDIASection = dynamic(() => import("@/components/sections/fdia-section"), {
  loading: () => <div className="min-h-210 animate-pulse rounded-[28px] border border-border/60 bg-white/55 dark:bg-card/45" />,
})
const EvidenceSection = dynamic(() => import("@/components/sections/evidence-section"), {
  loading: () => <div className="min-h-235 animate-pulse rounded-[28px] border border-border/60 bg-white/55 dark:bg-card/45" />,
})
const Footer = dynamic(() => import("@/components/footer").then((module) => module.Footer), {
  loading: () => <div className="min-h-130 border-t border-border/60 bg-[#f7f1eb]/50 dark:bg-card/35" />,
})

type HomePageClientProps = {
  locale: "en" | "th"
  navSlot?: ReactNode
  heroSlot?: ReactNode
}

export default function HomePage({ locale, navSlot, heroSlot }: HomePageClientProps) {
  const localePrefix = getLocalePrefix(locale)
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search)
        if (params.get("waitlist") === "true" || params.get("waitlist") === "1") {
          setIsWaitlistOpen(true)
        }
      }
    }, 0)

    const handleOpenWaitlist = () => {
      setIsWaitlistOpen(true)
    }

    window.addEventListener("open-waitlist", handleOpenWaitlist)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("open-waitlist", handleOpenWaitlist)
    }
  }, [])

  return (
    <MainPageOrchestrator>
      <main id="main-content" className="relative min-h-screen overflow-hidden bg-(--rct-bg-primary) transition-colors duration-300">
        {navSlot}
        <div className="homepage-global-backdrop" aria-hidden="true">
          <div className="homepage-global-backdrop__mesh" />
          <div className="homepage-global-backdrop__orb homepage-global-backdrop__orb--amber" />
          <div className="homepage-global-backdrop__orb homepage-global-backdrop__orb--sage" />
          <div className="homepage-global-backdrop__orb homepage-global-backdrop__orb--terra" />
        </div>
        {heroSlot}

        {/* ── Phase A4: ภาพรวม RCT Ecosystem ขึ้นมาก่อน ──────────── */}
        <MainPageSection sectionId="overview" tone="base">
          <OverviewSection locale={locale} />
        </MainPageSection>

        <MainPageSection sectionId="core-pillars" tone="raised" continuityMode="dense">
          <DeferredSection minHeightClassName="min-h-[720px]">
            <CorePillarsSection locale={locale} />
          </DeferredSection>
        </MainPageSection>

        <MainPageSection sectionId="fdia" tone="raised" continuityMode="dense">
          <DeferredSection minHeightClassName="min-h-[820px]">
            <FDIASection />
          </DeferredSection>
        </MainPageSection>

        <MainPageSection sectionId="evidence" tone="base">
          <DeferredSection minHeightClassName="min-h-[920px]" idleTimeoutMs={2200}>
            <EvidenceSection />
          </DeferredSection>
        </MainPageSection>

        <MainPageSection sectionId="cta" tone="settle" continuityMode="settle">
          <section className="relative overflow-hidden py-16 md:py-24">
            <div className="homepage-ambient-layer absolute inset-0">
              <div className="homepage-ambient-orb homepage-ambient-orb--amber absolute left-[8%] top-6 h-56 w-56 rounded-full" />
              <div className="homepage-ambient-orb homepage-ambient-orb--terra homepage-ambient-orb--slow absolute right-[6%] bottom-0 h-64 w-64 rounded-full" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4">
            <div
              className="main-page-reactive-card main-page-reactive-surface relative overflow-hidden rounded-2xl border border-border bg-white/90 p-10 md:p-16 dark:bg-card/90 transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.004]"
            >
              <div className="absolute inset-0 grid-background opacity-30" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,241,235,0.2),transparent_32%,rgba(212,168,83,0.04)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_32%,rgba(212,168,83,0.03)_100%)]" />
              <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
                <h2 className={`text-foreground ${locale === "th" ? "font-thai" : ""}`}>
                  {locale === "en" ? "Ready to Build with Intent?" : "พร้อมเริ่มต้นสร้างระบบ AI ที่ขับเคลื่อนด้วยเจตนาหรือยัง?"}
                </h2>
                <p className={`text-muted-foreground ${locale === "th" ? "subtitle-th" : ""}`}>
                  {locale === "en"
                    ? "Explore the architecture, read the protocols, or experience the live demo to see how RCT assembles intelligence around purpose."
                    : "สำรวจสถาปัตยกรรม อ่านโปรโตคอล หรือทดลองเดโม เพื่อดูว่า RCT เชื่อมข้อมูล เจตนา และการตัดสินใจเข้าด้วยกันอย่างไรในบริบทระดับองค์กร"}
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    href={`${localePrefix}/whitepaper`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-warm-amber px-6 py-3 font-medium text-warm-charcoal transition-colors hover:bg-[#C49A48]"
                  >
                    {locale === "en" ? "Read the Whitepaper" : "อ่านเอกสาร Whitepaper"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`${localePrefix}/protocols`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {locale === "en" ? "Explore Protocols" : "สำรวจ Protocol Docs"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`${localePrefix}/contact`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {locale === "en" ? "Contact Us" : "ติดต่อทีมงาน"}
                  </Link>
                </div>
              </div>
            </div>
            </div>
          </section>
        </MainPageSection>
        <DeferredSection minHeightClassName="min-h-[520px]" idleTimeoutMs={2600}>
          <Footer locale={locale} />
        </DeferredSection>
        <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} locale={locale} />
      </main>
    </MainPageOrchestrator>
  )
}
