"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { m } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowRight, Shield, Brain, GitBranch, AlertTriangle, Target, Zap, CheckCircle,
  Building2, Code2, Briefcase, Lock, Users
} from "lucide-react"
import OptimizedImage from "@/components/ui/optimized-image"
import { getLocaleFromPathname } from "@/lib/i18n"
import { pixelIcons } from "@/lib/pixel-icons"
import { SITE_ENTERPRISE_EVIDENCE_LABEL } from "@/lib/site-config"

const PIXEL_SHIELD = pixelIcons.shield
const PIXEL_BRAIN = pixelIcons.brain
const PIXEL_ROUTING = pixelIcons.network

const solutions = [
  {
    id: "hallucination",
    href: "/solutions/ai-hallucination-prevention",
    icon: Shield,
    color: "#C4745B",
    titleEn: "AI Hallucination Prevention",
    titleTh: "การป้องกัน AI Hallucination",
    descEn: "Target hallucination below 0.3% with Multi-LLM consensus verification via SignedAI — benchmarked at 99.7% accuracy through cryptographic audit trails.",
    descTh: "ลดเป้าหมาย Hallucination ให้ต่ำกว่า 0.3% ด้วย Multi-LLM Consensus Verification ผ่าน SignedAI — ความแม่นยำ 99.7% ในการทดสอบ Benchmark",
    stats: [
      { label: "Accuracy", value: "99.7%" },
      { label: "Hallucination", value: "0.3%" },
      { label: "LLMs Verified", value: "Up to 7" },
    ],
    features: [
      { en: "Multi-LLM Consensus Mechanism", th: "Multi-LLM Consensus Mechanism" },
      { en: "Cryptographic Audit Trails", th: "Cryptographic Audit Trails" },
      { en: "Real-time Hallucination Detection", th: "Real-time Hallucination Detection" },
    ],
    accentSrc: PIXEL_SHIELD,
  },
  {
    id: "memory",
    href: "/solutions/enterprise-ai-memory",
    icon: Brain,
    color: "#7B9E87",
    titleEn: "Enterprise AI Memory",
    titleTh: "Enterprise AI Memory",
    descEn: "Overcome context window limitations with RCTDB v2.0 — a 3-layer hybrid database (Vector + Graph + SQL) with 8D Schema for complete contextual memory.",
    descTh: "เอาชนะข้อจำกัด Context Window ด้วย RCTDB v2.0 — ฐานข้อมูล Hybrid 3 ชั้น พร้อม 8D Schema",
    stats: [
      { label: "Compression", value: "74%" },
      { label: "DB Layers", value: "3" },
      { label: "Schema Dims", value: "8D" },
    ],
    features: [
      { en: "Vector + Graph + SQL Hybrid", th: "Vector + Graph + SQL Hybrid" },
      { en: "8-Dimensional Schema", th: "8-Dimensional Schema" },
      { en: "Persistent Cross-Session Memory", th: "Persistent Cross-Session Memory" },
    ],
    accentSrc: PIXEL_BRAIN,
  },
  {
    id: "routing",
    href: "/solutions/dynamic-ai-routing",
    icon: GitBranch,
    color: "#D4A853",
    titleEn: "Dynamic AI Routing",
    titleTh: "Dynamic AI Routing",
    descEn: "Intelligent Multi-LLM routing across 9 tiers of algorithms — ensuring optimal model selection for every task with cost optimization.",
    descTh: "Intelligent Multi-LLM Routing ข้าม 9 Tiers ของ Algorithms — รับประกันการเลือก Model ที่เหมาะสมที่สุด",
    stats: [
      { label: "Tiers", value: "9" },
      { label: "Algorithms", value: "41" },
      { label: "Routing", value: "<50ms" },
    ],
    features: [
      { en: "9-Tier Algorithm Architecture", th: "9-Tier Algorithm Architecture" },
      { en: "Dynamic Model Selection", th: "Dynamic Model Selection" },
      { en: "Cost-Optimized Routing", th: "Cost-Optimized Routing" },
    ],
    accentSrc: PIXEL_ROUTING,
  },
]

const problems = [
  { icon: AlertTriangle, en: "AI Hallucination (15% error rate)", th: "AI Hallucination (อัตราผิดพลาด 15%)" },
  { icon: Target, en: "Intent Misalignment", th: "Intent Misalignment" },
  { icon: Brain, en: "Context Window Limits", th: "ข้อจำกัด Context Window" },
  { icon: Zap, en: "Single-LLM Bottleneck", th: "คอขวด Single-LLM" },
]

export default function SolutionsPage() {
  const { language } = useLanguage()
  const pathname = usePathname()
  const isTh = language === "th"
  const locale = getLocaleFromPathname(pathname) || language
  const localePrefix = locale === "th" ? "/th" : "/en"
  const localHref = (href: string) => `${localePrefix}${href}`

  const proofPoints = [
    { value: "0.3%", labelEn: "Hallucination", labelTh: "Hallucination", color: "#C4745B" },
    { value: "99.7%", labelEn: "Verified Accuracy", labelTh: "ความแม่นยำที่ตรวจสอบได้", color: "#7B9E87" },
    { value: "7", labelEn: "HexaCore Models", labelTh: "HexaCore Models", color: "#D4A853" },
  ]
  const faqs = isTh
    ? [
        {
          question: "ควรเริ่มจากโซลูชันไหนก่อน",
          answer:
            "ถ้าปัญหาหลักคือ hallucination, trust หรือ compliance ให้เริ่มจาก AI Hallucination Prevention ก่อน ถ้าปัญหาหลักคือ context loss หรือ workflow ที่ต้องจำต่อเนื่อง ให้เริ่มจาก Enterprise AI Memory และถ้าต้องคุมต้นทุนหรือเลือก model ให้เหมาะกับงาน ให้เริ่มจาก Dynamic AI Routing",
        },
        {
          question: "โซลูชันเหล่านี้ใช้ร่วมกันได้หรือไม่",
          answer:
            "ได้ และจริง ๆ แล้วถูกออกแบบให้ทำงานร่วมกัน SignedAI จัดการ verification, RCTDB จัดการ memory และ routing layer จัดการ model orchestration ทำให้ได้ระบบที่เสถียรและตรวจสอบย้อนหลังได้มากกว่าใช้เครื่องมือเดี่ยว",
        },
        {
          question: "เหมาะกับ use case แบบใด",
          answer:
            "เหมาะกับ enterprise copilots, regulated workflows, multilingual support, retrieval-heavy operations, document intelligence และระบบที่ผลลัพธ์ของ AI ต้องตรวจสอบย้อนหลังได้",
        },
      ]
    : [
        {
          question: "Which solution should a team evaluate first?",
          answer:
            "Start with AI Hallucination Prevention if trust, compliance, or accuracy risk is the main blocker. Start with Enterprise AI Memory if context loss and repeated workflow memory are the bottleneck. Start with Dynamic AI Routing if model selection, speed, and cost efficiency are the main concerns.",
        },
        {
          question: "Do these solutions work together?",
          answer:
            "Yes. They are designed to work as a system: SignedAI handles verification, RCTDB handles persistent memory, and the routing layer selects the right model and policy path for each task.",
        },
        {
          question: "What kinds of use cases fit these solutions?",
          answer:
            "They fit enterprise copilots, regulated workflows, multilingual support operations, retrieval-heavy document intelligence, and any environment where AI outputs need to be auditable and repeatable.",
        },
      ]
  const relatedResources = [
    {
      href: localHref("/platform"),
      title: isTh ? "ดู Platform ทั้งระบบ" : "Explore the Full Platform",
      description: isTh ? "เข้าใจว่าโซลูชันเหล่านี้เชื่อมกับ architecture ใหญ่ของ RCT อย่างไร" : "Understand how these solutions connect to the larger RCT architecture.",
    },
    {
      href: localHref("/protocols"),
      title: isTh ? "อ่าน Open Protocols" : "Read the Open Protocols",
      description: isTh ? "ดู JITNA, FDIA และแนวคิดที่ใช้รองรับ solution layer" : "Review JITNA, FDIA, and the protocol layer behind the solution stack.",
    },
    {
      href: localHref("/benchmark"),
      title: isTh ? "ดู Benchmark และผลการตรวจสอบ" : "See Benchmark and Validation",
      description: isTh ? "เปรียบเทียบตัวเลข hallucination, latency และ performance" : "Compare hallucination, latency, and performance metrics.",
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top,rgba(212,168,83,0.10),transparent_42%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-[minmax(0,1.2fr)_minmax(320px,420px)] md:py-28">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-warm-terracotta/30 bg-warm-terracotta/10 px-4 py-1.5 text-sm font-medium text-warm-terracotta">
              🛡️ {isTh ? "โซลูชัน" : "Solutions"}
            </span>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {isTh ? "โซลูชัน AI สำหรับองค์กรที่ต้องการความเชื่อถือได้จริง" : "Enterprise AI Solutions Built for Verifiable Outcomes"}
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {isTh
                  ? "RCT Ecosystem แก้ pain point ที่ Prompt Engineering แก้ไม่ได้: hallucination, intent drift, memory loss และ single-model bottlenecks ด้วย constitutional AI infrastructure ที่ตรวจสอบย้อนหลังได้"
                  : "RCT Ecosystem solves the architectural failures prompt engineering cannot: hallucination, intent drift, context loss, and single-model bottlenecks through constitutional AI infrastructure with auditability built in."}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {proofPoints.map((point) => (
                <div key={point.labelEn} className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm">
                  <div className="text-2xl font-bold" style={{ color: point.color }}>{point.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{isTh ? point.labelTh : point.labelEn}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={localHref("/contact")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-warm-amber px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#C49A48]">
                {isTh ? "คุยกับทีมงาน" : "Talk to the Team"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={localHref("/pricing")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                {isTh ? "ดูราคา" : "View Pricing"}
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link href={localHref("/products")} className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted">
                {isTh ? "ดูผลิตภัณฑ์ที่เกี่ยวข้อง" : "Explore Related Products"}
              </Link>
              <Link href={localHref("/whitepaper")} className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted">
                {isTh ? "อ่าน Whitepaper เชิงเทคนิค" : "Read Technical Whitepapers"}
              </Link>
              <Link href={localHref("/architecture")} className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted">
                {isTh ? "ดูสถาปัตยกรรมทั้งหมด" : "See Full Architecture"}
              </Link>
            </div>
          </div>
          <div className="relative rounded-[28px] border border-border bg-card p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="pointer-events-none absolute right-5 top-5 h-12 w-12 opacity-60">
              <OptimizedImage src={PIXEL_SHIELD} alt="" pixelated showErrorFallback={false} containerClassName="h-full w-full" objectFit="contain" width={48} height={48} />
            </div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-warm-amber">
              {isTh ? "Deployment Snapshot" : "Deployment Snapshot"}
            </div>
            <div className="space-y-5">
              {[
                {
                  title: isTh ? "Verification Layer" : "Verification Layer",
                  body: isTh ? "SignedAI consensus พร้อม audit trail ระดับ cryptographic" : "SignedAI consensus with cryptographic audit trails.",
                },
                {
                  title: isTh ? "Memory Layer" : "Memory Layer",
                  body: isTh ? "RCTDB v2.0 ทำ persistent context ข้าม session และข้าม workflow" : "RCTDB v2.0 preserves context across sessions and workflows.",
                },
                {
                  title: isTh ? "Routing Layer" : "Routing Layer",
                  body: isTh ? "9-tier orchestration เพื่อเลือก model, algorithm และ policy ที่เหมาะกับ intent" : "9-tier orchestration selects the right model, algorithm, and policy for each intent.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="text-sm font-semibold text-foreground">{item.title}</div>
                  <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            {isTh ? "ทำไมระบบ AI ปัจจุบันยังไม่เพียงพอ" : "Why Current AI Systems Fall Short"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isTh
              ? "การ Deploy AI ระดับ Enterprise เผชิญข้อจำกัดเชิงสถาปัตยกรรมที่ Prompt Engineering เพียงอย่างเดียวไม่สามารถแก้ไขได้"
              : "Enterprise AI deployments face fundamental architectural limitations that prompt engineering alone cannot solve."}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((p, i) => (
            <m.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -4, scale: 1.006, transition: { duration: 0.24 } }}
              className="p-5 rounded-2xl border border-border bg-card text-center main-page-reactive-card group hover:border-warm-amber/40 hover:shadow-[0_12px_28px_rgba(212,168,83,0.09)] transition-[border-color,box-shadow] duration-300">
              <p.icon className="mx-auto mb-3 text-warm-terracotta" size={28} />
              <p className="text-sm font-semibold text-foreground">{isTh ? p.th : p.en}</p>
            </m.div>
          ))}
        </div>
      </section>

      {/* Solution Cards */}
      <section className="bg-muted/30 py-20">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          {solutions.map((sol) => (
            <m.div key={sol.id} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} whileHover={{ y: -4, scale: 1.006, transition: { duration: 0.24 } }}
              className="rounded-2xl border border-border bg-card overflow-hidden main-page-reactive-card hover:border-warm-amber/40 hover:shadow-[0_16px_36px_rgba(212,168,83,0.09)] transition-[border-color,box-shadow] duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="p-6 sm:p-8 lg:col-span-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5" style={{ backgroundColor: `${sol.color}10`, borderColor: `${sol.color}30` }}>
                    <sol.icon size={14} style={{ color: sol.color }} />
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: sol.color }}>{isTh ? sol.titleTh : sol.titleEn}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">{isTh ? sol.titleTh : sol.titleEn}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-6">{isTh ? sol.descTh : sol.descEn}</p>
                  <div className="space-y-2 mb-6">
                    {sol.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <CheckCircle size={16} style={{ color: sol.color }} className="shrink-0" />
                        <span className="text-sm text-muted-foreground">{isTh ? f.th : f.en}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={localHref(sol.href)} className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:gap-3" style={{ color: sol.color }}>
                    {isTh ? `สำรวจ ${sol.titleTh}` : `Explore ${sol.titleEn}`} <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="relative flex flex-col justify-center bg-muted/30 p-6 sm:p-8 lg:col-span-2">
                  <div className="pointer-events-none absolute right-5 top-5 h-12 w-12 opacity-55">
                    <OptimizedImage src={sol.accentSrc} alt="" pixelated showErrorFallback={false} containerClassName="h-full w-full" objectFit="contain" width={48} height={48} />
                  </div>
                  <div className="space-y-6">
                    {sol.stats.map((stat, j) => (
                      <div key={j} className="text-center">
                        <div className="text-3xl sm:text-4xl font-bold" style={{ color: sol.color }}>{stat.value}</div>
                        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </section>

      {/* By Audience - Enterprise / Developers / SMEs */}
      <section className="mx-auto max-w-5xl px-4 py-20 space-y-16">
        {/* Enterprise */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-warm-amber/10"><Building2 className="w-6 h-6 text-warm-amber" /></div>
              <span className="text-xs font-semibold uppercase tracking-wider text-warm-amber">{isTh ? "Enterprise" : "Enterprise"}</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">{isTh ? "สำหรับ Enterprise" : "For Enterprise"}</h2>
            <p className="text-muted-foreground">{isTh ? "Deploy AI ด้วยความมั่นใจ — Audit Trails ครบถ้วน, Compliance Frameworks และ Enterprise Security" : "Deploy AI with confidence — full audit trails, compliance frameworks, and enterprise-grade security."}</p>
            <ul className="space-y-2">
              {[
                { icon: Shield, t: "0.3% benchmark evidence with SignedAI" },
                { icon: Lock, t: "ED25519 + JWT RS256 + RBAC" },
                { icon: Users, t: "Availability target for enterprise programs" },
                { icon: Zap, t: `${SITE_ENTERPRISE_EVIDENCE_LABEL}: 62 runtime components` },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground"><item.icon className="w-4 h-4 text-warm-amber shrink-0" />{item.t}</li>
              ))}
            </ul>
            <Link href={localHref("/contact")} className="inline-flex items-center px-5 py-2.5 rounded-lg bg-warm-amber text-white text-sm font-medium hover:bg-[#C49A48] transition-colors">
              {isTh ? "ติดต่อฝ่ายขาย" : "Contact Sales"}
            </Link>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-semibold text-foreground mb-4">Enterprise Features</h3>
            {["10-Layer architecture with Enterprise Hardening", "RCTDB v2.0 — 8D universal memory (74% compression)", "8 regional markets (PDPA, APPI, PIPA, PIPL)", "Prometheus + Grafana monitoring", "OpenAPI 3.1.0 (14 endpoints)", "13 Universal Adapters"].map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" />{f}</div>
            ))}
          </div>
        </div>

        {/* Developers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1 bg-card border border-border rounded-xl p-6 overflow-x-auto">
            <pre className="text-xs font-mono text-muted-foreground">{`import { RCT } from '@delentia/sdk';

const client = new RCT({
  apiKey: process.env.RCT_API_KEY
});

const result = await client.execute({
  I: "analyze", D: documentData,
  A: "summarize", verify: true
});

// { algo: "ED25519", verified: true,
//   consensus: ["GPT-4", "Claude", "Gemini"] }`}</pre>
          </div>
          <div className="order-1 lg:order-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-warm-amber/10"><Code2 className="w-6 h-6 text-warm-amber" /></div>
              <span className="text-xs font-semibold uppercase tracking-wider text-warm-amber">Developers</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">{isTh ? "สำหรับ Developers" : "For Developers"}</h2>
            <p className="text-muted-foreground">{isTh ? "สร้าง Intent-Driven Applications ด้วย SDK — TypeScript-first, fully typed" : "Build intent-driven applications with our SDK. TypeScript-first, fully typed."}</p>
            <ul className="space-y-2">
              {["TypeScript SDK + OpenAPI 3.1.0", "JITNA Protocol RFC-001 v2.0", "6 Kernel RFCs + docs", "41 algorithms across 9 tiers"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground"><CheckCircle className="w-4 h-4 text-warm-amber shrink-0" />{item}</li>
              ))}
            </ul>
            <Link href={localHref("/docs")} className="inline-flex items-center px-5 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">
              {isTh ? "อ่านเอกสาร" : "View Documentation"}
            </Link>
          </div>
        </div>

        {/* SMEs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-warm-amber/10"><Briefcase className="w-6 h-6 text-warm-amber" /></div>
              <span className="text-xs font-semibold uppercase tracking-wider text-warm-amber">SMEs</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">{isTh ? "สำหรับ SMEs" : "For SMEs"}</h2>
            <p className="text-muted-foreground">{isTh ? "Enterprise-grade AI ในราคาที่เข้าถึงได้ — 3.74x cost reduction ผ่าน RCTDB compression" : "Enterprise-grade AI without enterprise costs — 3.74x cost reduction through RCTDB compression."}</p>
            <Link href={localHref("/pricing")} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-warm-amber text-white text-sm font-medium hover:bg-[#C49A48] transition-colors">
              {isTh ? "ดูราคา" : "View Pricing"} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Cost Savings</h3>
            <div className="flex items-baseline justify-between">
              <span className="text-muted-foreground text-sm">Traditional AI APIs</span>
              <span className="text-lg font-mono text-muted-foreground line-through">$0.12/query</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-foreground font-semibold text-sm">With Loop Intent Memory</span>
              <span className="text-2xl font-mono text-green-500">$0.003/query</span>
            </div>
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">3.74x cost reduction through RCTDB compression and intelligent caching.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-amber">FAQ</div>
              <h2 className="mt-2 text-2xl font-bold text-foreground">{isTh ? "คำถามที่ผู้ประเมินโซลูชันมักถาม" : "Questions Enterprise Evaluators Usually Ask"}</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-xl border border-border bg-background/70 p-4">
                  <summary className="cursor-pointer list-none font-semibold text-foreground">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-amber">Related Resources</div>
              <h2 className="mt-2 text-2xl font-bold text-foreground">{isTh ? "เส้นทางอ่านต่อที่แนะนำ" : "Recommended Next Reading Path"}</h2>
            </div>
            <div className="space-y-3">
              {relatedResources.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-xl border border-border bg-background/70 p-4 transition-colors hover:border-warm-amber/40 hover:bg-warm-amber/5">
                  <div className="text-sm font-semibold text-foreground">{item.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{item.description}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">{isTh ? "ค้นหาโซลูชันของคุณ" : "Find Your Solution"}</h2>
          <p className="text-muted-foreground">{isTh ? "ไม่แน่ใจว่าแผนใดเหมาะกับคุณ? ติดต่อทีมงาน" : "Not sure which plan is right? Talk to our team."}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={localHref("/contact")} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-warm-amber text-white font-medium text-sm hover:bg-[#C49A48] transition-colors">
              {isTh ? "ติดต่อเรา" : "Contact Us"} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={localHref("/docs")} className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors">
              {isTh ? "อ่านเอกสาร" : "View Documentation"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}

