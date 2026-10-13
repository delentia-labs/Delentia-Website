"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Brain, Database, Network, Shield } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getLocaleFromPathname } from "@/lib/i18n"

const systems = {
  en: [
    {
      name: "HexaCore AI Engine",
      stat: "7 model families",
      description: "Routes work across global, regional, and Thai-capable model surfaces so each task can use the right reasoning profile.",
      accent: "#D4A853",
      icon: Network,
    },
    {
      name: "Intent Loop Engine",
      stat: "7-state pipeline",
      description: "Maintains continuity between cold start, warm recall, decisioning, and memory updates so workflows improve over time.",
      accent: "#7B9E87",
      icon: Brain,
    },
    {
      name: "Analysearch Intent",
      stat: "4 analysis modes",
      description: "Lets teams move from quick answers to deep synthesis while keeping reasoning depth matched to the business question.",
      accent: "#89B4C8",
      icon: Shield,
    },
    {
      name: "Delta Memory Engine",
      stat: "39–90% smaller†",
      description: "Stores state changes rather than full snapshots, giving enterprise memory continuity without runaway storage costs.",
      accent: "#C4745B",
      icon: Database,
    },
  ],
  th: [
    {
      name: "HexaCore AI Engine",
      stat: "7 ตระกูลโมเดล",
      description: "กำหนดเส้นทางงานข้าม model surfaces ระดับโลก ระดับภูมิภาค และที่รองรับภาษาไทย เพื่อให้แต่ละงานได้ reasoning profile ที่เหมาะสม",
      accent: "#D4A853",
      icon: Network,
    },
    {
      name: "Intent Loop Engine",
      stat: "pipeline 7 สถานะ",
      description: "รักษาความต่อเนื่องตั้งแต่ cold start, warm recall, decisioning ไปจนถึง memory updates เพื่อให้ workflow ฉลาดขึ้นตามการใช้งาน",
      accent: "#7B9E87",
      icon: Brain,
    },
    {
      name: "Analysearch Intent",
      stat: "4 โหมดการวิเคราะห์",
      description: "ช่วยให้ทีมเลือกได้ตั้งแต่คำตอบเร็วไปจนถึงการสังเคราะห์เชิงลึก โดยรักษาระดับ reasoning ให้เหมาะกับคำถามธุรกิจ",
      accent: "#89B4C8",
      icon: Shield,
    },
    {
      name: "Delta Memory Engine",
      stat: "compression 74%†",
      description: "จัดเก็บเฉพาะ state changes แทน full snapshots ทำให้ memory continuity ระดับองค์กรไม่สร้างต้นทุน storage เกินจำเป็น",
      accent: "#C4745B",
      icon: Database,
    },
  ],
}

const workflows = {
  en: [
    "Route tasks to the right model family, including regional Thai support where it adds value.",
    "Carry intent and context forward instead of resetting every session.",
    "Scale analysis depth from quick triage to research-grade synthesis.",
    "Keep memory efficient enough for production workloads and governed retention.",
  ],
  th: [
    "กำหนดเส้นทางงานไปยัง model family ที่เหมาะที่สุด รวมถึง Thai support เมื่อมีประโยชน์จริง",
    "พา intent และ context เดินหน้าต่อได้แทนการเริ่มใหม่ทุก session",
    "ขยายระดับการวิเคราะห์จาก quick triage ไปจนถึง research-grade synthesis",
    "รักษา memory ให้มีประสิทธิภาพพอสำหรับ production workloads และ governed retention",
  ],
}

export default function CoreSystemsClient() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname) === "th" ? "th" : "en"
  const isTh = locale === "th"
  const items = systems[locale]
  const workflowItems = workflows[locale]

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Navbar />

      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-warm-amber">
            {isTh ? "Core Systems" : "Core Systems"}
          </p>
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            {isTh ? "เอ็นจินหลักที่ขับเคลื่อน RCT" : "The Engines Behind RCT"}
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {isTh
              ? "หน้านี้สรุประบบหลักในมุมที่เปิดเผยต่อสาธารณะ: การเลือกโมเดล การต่อ intent และ memory การวิเคราะห์หลายระดับ และการบีบอัดสถานะสำหรับงานระดับองค์กร"
              : "This page explains the public-facing system core: model routing, intent and memory continuity, multi-depth analysis, and state-efficient storage for enterprise AI workflows."}
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-card/30 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: `${item.accent}18` }}>
                  <item.icon className="h-6 w-6" style={{ color: item.accent }} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: item.accent }}>
                  {item.stat}
                </span>
              </div>
              <h2 className="text-lg font-bold text-foreground">{item.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground/60 text-center">
          {isTh ? "† วัดผลบน 10,000 เซสชันสแบบต่อเนื่องในสภาพแวดล้อม benchmark" : "† Measured on 10,000 sequential query sessions in benchmark environment"}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-warm-sage">
              {isTh ? "How They Work Together" : "How They Work Together"}
            </p>
            <h2 className="text-3xl font-bold text-foreground">
              {isTh ? "สี่ระบบนี้คือ public layer ของ platform intelligence" : "These four systems form the public layer of platform intelligence"}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {isTh
                ? "เราเปิดเผย capability และ outcome ที่ลูกค้าใช้ตัดสินใจได้ โดยไม่จำเป็นต้องเปิด internal implementation detail ทั้งหมด หน้านี้จึงเป็นสะพานจาก marketing ไปสู่ architecture, pricing และ solution pages"
                : "We publish the capability and outcome layer that helps teams evaluate the platform, without exposing every internal implementation detail. This page bridges marketing, architecture, pricing, and solution discovery."}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <ul className="space-y-4">
              {workflowItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-warm-amber" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 md:pb-24">
        <div className="rounded-3xl border border-border bg-card p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold text-foreground">
            {isTh ? "ไปต่อที่หน้าที่ลึกขึ้น" : "Go Deeper from Here"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {isTh
              ? "ถ้าต้องการดูโครงสร้างระบบทั้งหมด ไปที่ architecture ถ้ากำลังประเมิน commercial fit ไปที่ pricing และถ้าต้องการ map use case จริง ไปคุยกับทีม"
              : "Continue to architecture for the full system stack, pricing for commercial evaluation, or contact the team to map a real enterprise workflow."}
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/architecture" className="inline-flex items-center justify-center gap-2 rounded-xl bg-warm-amber px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C49A48]">
              {isTh ? "ดู Architecture" : "View Architecture"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
              {isTh ? "ดู Pricing" : "View Pricing"}
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
              {isTh ? "ติดต่อทีม" : "Talk to the Team"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
