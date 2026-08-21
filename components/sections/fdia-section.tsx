"use client"

import React from "react"
import { m, useReducedMotion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import SectionHeading from "@/components/section-heading"
import { FDIAExplorerDialog } from "@/components/sections/fdia-explorer-dialog"
import { pixelIcons } from "@/lib/pixel-icons"
import { useCardSpotlight } from "@/hooks/use-card-spotlight"

const PIXEL_BRAIN = pixelIcons.brain

export default function FDIASection() {
  const { language } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const cardSpotlight = useCardSpotlight<HTMLDivElement>()
  const isEn = language === "en"

  const signalCards = [
    {
      eyebrow: isEn ? "Outcome" : "ผลลัพธ์",
      title: isEn ? "Future is constructed" : "Future คือสิ่งที่ถูกสร้าง",
      body: isEn
        ? "The section should read as a systems blueprint: every visual choice needs to reinforce that F is produced by the full pipeline."
        : "section นี้ควรถูกอ่านเหมือน systems blueprint เพื่อย้ำว่า F เป็นผลลัพธ์ที่เกิดจากทั้ง pipeline",
    },
    {
      eyebrow: isEn ? "Exponent" : "ยกกำลัง",
      title: isEn ? "Intent changes the curve" : "Intent เปลี่ยนเส้นโค้งของผลลัพธ์",
      body: isEn
        ? "Intent is the dramatic lever, so the visual hierarchy now lifts it physically and chromatically above the system."
        : "Intent เป็นคันโยกสำคัญที่สุด จึงถูกยกสถานะขึ้นทั้งทางตำแหน่งและโทนสีในเลย์เอาต์ใหม่",
    },
    {
      eyebrow: isEn ? "Governance" : "การกำกับดูแล",
      title: isEn ? "Architect stays human" : "Architect ยังคงเป็นมนุษย์",
      body: isEn
        ? "Architect is no longer a decorative label. It is the governance multiplier that keeps AI outputs accountable."
        : "Architect ไม่ใช่ label เชิงตกแต่งอีกต่อไป แต่เป็น governance multiplier ที่ทำให้ผลลัพธ์ AI รับผิดชอบได้",
    },
  ]

  const stages = [
    {
      letter: "F",
      name: language === "en" ? "Future" : "Future (อนาคต)",
      desc:
        language === "en"
          ? "The ultimate outcome — the Future that is created and shaped by the entire FDIA pipeline."
          : "ผลลัพธ์สุดท้าย — Future ที่ถูกสร้างและกำหนดโดย FDIA Pipeline ทั้งหมด",
      color: "#D4A853",
      toneClass: "bg-amber-500/15 text-amber-500 border border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/40",
    },
    {
      letter: "D",
      name: language === "en" ? "Data" : "Data (ข้อมูล)",
      desc:
        language === "en"
          ? "Raw data ingestion, validation, and quality scoring — the essential inputs."
          : "การรับข้อมูลดิบ ตรวจสอบ และให้คะแนนคุณภาพ — Input ที่จำเป็น",
      color: "#89B4C8",
      toneClass: "bg-sky-500/15 text-sky-500 border border-sky-500/30 dark:bg-sky-500/20 dark:text-sky-400 dark:border-sky-500/40",
    },
    {
      letter: "I",
      name: language === "en" ? "Intent" : "Intent (เจตนา)",
      desc:
        language === "en"
          ? "The exponential amplifier — clarity of purpose that multiplies Data's power."
          : "ตัวขยายแบบ Exponential — ความชัดเจนของเป้าหมายที่ขยายพลัง Data",
      color: "#C4745B",
      toneClass: "bg-rose-500/15 text-rose-500 border border-rose-500/30 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/40",
    },
    {
      letter: "A",
      name: language === "en" ? "Architect" : "Architect (สถาปนิก)",
      desc:
        language === "en"
          ? "The Human-in-the-Loop — ensuring ethical, strategic application of AI."
          : "Human-in-the-Loop — ผู้กำกับดูแลการใช้ AI อย่างมีจริยธรรม",
      color: "#7B9E87",
      toneClass: "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/40",
    },
  ]

  return (
    <>
    <section
      id="fdia"
      aria-label="FDIA Equation"
      className="relative overflow-hidden border-y border-border bg-transparent py-16 md:py-24 transition-colors duration-300"
    >
      <div className="homepage-ambient-layer absolute inset-0">
        <div className="homepage-ambient-orb homepage-ambient-orb--amber absolute -left-20 top-10 h-64 w-64 rounded-full" />
        <div className="homepage-ambient-orb homepage-ambient-orb--blue homepage-ambient-orb--slow absolute right-[6%] bottom-10 h-72 w-72 rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_24%,rgba(137,180,200,0.04)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%,rgba(137,180,200,0.03)_100%)]" />
      </div>

      <div className="relative max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag={language === "en" ? "Core Equation" : "สมการหลัก"}
          tagColor="gold"
          title={language === "en" ? "The FDIA Equation" : "สมการ FDIA"}
          italicWord="FDIA"
          description={
            language === "en"
              ? "Future = Data^Intent × Architect. This section has been rebuilt as a live system blueprint so it matches the current homepage language, density, and dark-mode finish."
              : "Future = Data^Intent × Architect. ส่วนนี้ถูกจัดใหม่เป็น blueprint แบบโต้ตอบเพื่อให้สอดคล้องกับภาษาดีไซน์ล่าสุดของหน้าแรกทั้งเรื่องความหนาแน่น จังหวะ และ dark mode"
          }
          pixelIcon={PIXEL_BRAIN}
        />

        <div className="mb-7 grid gap-3 md:grid-cols-3 lg:mb-8">
          {signalCards.map((card, index) => (
            <m.div
              key={card.title}
              {...cardSpotlight}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.004 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? undefined : { duration: 0.44, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[20px] border border-amber-900/10 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:border-amber-400/40 hover:shadow-md dark:border-neutral-800 dark:bg-[#13141a] dark:hover:border-amber-400/40 dark:hover:bg-[#181922] dark:shadow-lg"
            >
              <div className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">{card.eyebrow}</div>
              <h3 className="mt-2 text-base font-bold text-neutral-900 dark:text-white sm:text-lg">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-[14px]">{card.body}</p>
            </m.div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-0 mb-8">
          {stages.map((stage, i) => (
            <React.Fragment key={stage.letter}>
              <m.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                {...cardSpotlight}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? undefined : { duration: 0.44, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="group flex-1 rounded-[20px] border border-amber-900/10 bg-white/90 p-4 shadow-sm transition-all duration-300 hover:border-amber-400/40 hover:shadow-md dark:border-neutral-800 dark:bg-[#13141a] dark:hover:border-amber-400/40 dark:hover:bg-[#181922] dark:shadow-lg"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-base transition-transform duration-200 group-hover:scale-105 ${stage.toneClass}`}>
                    {stage.letter}
                  </div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white">
                    {stage.name}
                  </div>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {stage.desc}
                </p>
              </m.div>
              {i < 3 && (
                <div className="flex items-center justify-center shrink-0 px-2">
                  <span className="text-amber-500 dark:text-amber-400 text-xl font-bold">→</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mb-8 lg:hidden">
          {stages.map((stage, i) => (
            <m.div
              key={stage.letter}
              {...cardSpotlight}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? undefined : { duration: 0.44, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-[20px] border border-amber-900/10 bg-white/90 p-4 shadow-sm transition-all duration-300 hover:border-amber-400/40 hover:shadow-md dark:border-neutral-800 dark:bg-[#13141a] dark:hover:border-amber-400/40 dark:hover:bg-[#181922] dark:shadow-lg"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-base transition-transform duration-200 group-hover:scale-105 ${stage.toneClass}`}>
                  {stage.letter}
                </div>
                <div className="text-sm font-bold text-neutral-900 dark:text-white">
                  {stage.name}
                </div>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {stage.desc}
              </p>
            </m.div>
          ))}
        </div>

        <m.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          {...cardSpotlight}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.003 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? undefined : { duration: 0.3 }}
          className="hidden"
        >
          <div className="flex items-start gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-warm-amber/15 bg-[#fff7ef] dark:bg-[#2b2118]">
              <span className="text-lg font-bold font-mono text-warm-amber">!</span>
            </div>
            <div>
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-warm-amber">
                {isEn ? "Design Rationale" : "เหตุผลของดีไซน์"}
              </div>
              <h3 className="text-sm font-bold mb-1.5 text-foreground sm:text-base">
                {language === "en"
                  ? "Why A = Architect, not Analyze?"
                  : "ทำไม A = Architect ไม่ใช่ Analyze?"}
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
                {language === "en"
                  ? "The old art treated A as another decorative node. The redesigned section makes Architect an explicit governance layer so the whole section now speaks the same enterprise language as the rest of the homepage."
                  : "visual เดิมทำให้ A ดูเหมือน node เชิงตกแต่งอีกตัวหนึ่ง แต่เวอร์ชันใหม่ยกระดับ Architect ให้เป็น governance layer อย่างชัดเจน เพื่อให้ทั้ง section พูดภาษาดีไซน์แบบ enterprise เดียวกับส่วนอื่นของหน้าแรก"}
              </p>
            </div>
          </div>
        </m.div>

        <div className="flex justify-center">
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? undefined : { duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-100"
          >
            <FDIAExplorerDialog
              language={language}
              trigger={
                <m.button
                    type="button"
                    whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.02, rotate: -1.4 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                    animate={prefersReducedMotion ? undefined : { y: [0, -8, 0], x: [0, 5, 0] }}
                    transition={prefersReducedMotion ? undefined : { duration: 6.4, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
                    className="group relative flex w-full flex-col overflow-hidden rounded-[30px] border border-warm-amber/25 bg-[linear-gradient(180deg,rgba(255,251,245,0.96),rgba(255,246,233,0.92))] p-5 text-left shadow-[0_20px_48px_rgba(212,168,83,0.18)] transition-[border-color,box-shadow,transform] dark:bg-[linear-gradient(180deg,rgba(38,30,20,0.96),rgba(28,23,18,0.94))]"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,168,83,0.18),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(123,158,135,0.16),transparent_34%)] opacity-80" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-warm-amber/25 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7A5910] dark:text-warm-amber dark:bg-black/12">
                          <Sparkles className="h-3.5 w-3.5" />
                          {isEn ? "Floating FDIA" : "FDIA แบบลอยตัว"}
                        </div>
                        <div className="rounded-full border border-warm-amber/25 bg-warm-amber/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7A5910] dark:text-warm-amber">
                          {isEn ? "Open" : "เปิด"}
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-center">
                        <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-warm-amber/30 bg-[radial-gradient(circle,rgba(255,255,255,0.94),rgba(255,247,236,0.72))] shadow-[0_26px_54px_rgba(212,168,83,0.18)] dark:bg-[radial-gradient(circle,rgba(31,26,22,0.98),rgba(22,18,16,0.88))]">
                          <div className="absolute inset-[12%] rounded-full border border-warm-amber/18" />
                          <div className="absolute inset-[25%] rounded-full border border-warm-sage/20" />
                          <div className="font-mono text-[38px] font-bold tracking-[0.04em] text-foreground transition-transform duration-300 group-hover:scale-[1.04]">
                            <span className="text-[#8A6914] dark:text-warm-amber">F</span>
                            <span className="mx-2 text-muted-foreground">=</span>
                            <span className="text-[#2B5A78] dark:text-warm-sky">D</span>
                            <sup className="text-[0.56em] text-warm-terracotta dark:text-warm-terracotta">I</sup>
                            <span className="mx-2 text-muted-foreground">×</span>
                            <span className="text-[#3D6951] dark:text-warm-sage">A</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 space-y-2">
                        <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                          {isEn ? "Open the FDIA brief and calculator on demand" : "เปิด FDIA brief และ calculator เมื่อจำเป็น"}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                          {isEn
                            ? "The main page keeps FDIA lightweight by default. Open the rebuilt dialog to inspect the blueprint, select each system layer, and run the calculator without layout breakage."
                            : "หน้า main จะเก็บ FDIA ให้เบาและอ่านง่ายไว้ก่อน เมื่อเปิด dialog ใหม่จะดู blueprint เลือกแต่ละชั้นของระบบ และใช้ calculator ได้โดยไม่เกิดปัญหาเลย์เอาต์พัง"}
                        </p>
                      </div>
                    </div>
                  </m.button>
              }
            />
          </m.div>
        </div>
      </div>
    </section>
    </>
  )
}
