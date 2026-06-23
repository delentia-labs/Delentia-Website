"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { m } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Palette, ShieldCheck, ArrowRight, Layers, Cpu, Zap } from "lucide-react"
import OptimizedImage from "@/components/ui/optimized-image"
import { getLocaleFromPathname } from "@/lib/i18n"
import { pixelIcons } from "@/lib/pixel-icons"
import { SITE_ENTERPRISE_EVIDENCE_LABEL, SITE_PUBLIC_SDK_EVIDENCE_LABEL, SITE_PUBLIC_SDK_TESTS } from "@/lib/site-config"

const PIXEL_LABS = pixelIcons.algorithms
const PIXEL_ARTENT = pixelIcons.brain
const PIXEL_SIGNED = pixelIcons.shield

const products = [
  {
    id: "delentia-platform",
    href: "/products/delentia-platform",
    icon: Cpu,
    color: "#D4A853",
    titleEn: "Delentia Platform",
    titleTh: "Delentia Platform",
    tagEn: "AI Operating Environment",
    tagTh: "AI Operating Environment",
    descEn: `Constitutional AI Operating Environment where 7 Genomes converge. Public pages use ${SITE_PUBLIC_SDK_EVIDENCE_LABEL.toLowerCase()} for ${SITE_PUBLIC_SDK_TESTS} open-release tests and keep the broader runtime under ${SITE_ENTERPRISE_EVIDENCE_LABEL.toLowerCase()}.`,
    descTh: `AI Operating Environment ที่ 7 Genome บรรจบกัน โดยหน้า public ใช้ ${SITE_PUBLIC_SDK_EVIDENCE_LABEL.toLowerCase()} สำหรับ ${SITE_PUBLIC_SDK_TESTS} tests ของ open release path และเก็บ runtime ที่กว้างกว่าไว้ภายใต้ ${SITE_ENTERPRISE_EVIDENCE_LABEL.toLowerCase()}`,
    features: [
      { en: `${SITE_PUBLIC_SDK_TESTS} ${SITE_PUBLIC_SDK_EVIDENCE_LABEL}`, th: `${SITE_PUBLIC_SDK_TESTS} ${SITE_PUBLIC_SDK_EVIDENCE_LABEL}` },
      { en: "41 Production Algorithms", th: "41 Production Algorithms" },
      { en: "FDIA Constitutional Scoring", th: "FDIA Constitutional Scoring" },
      { en: "7 Genome System", th: "7 Genome System" },
    ],
    accentSrc: PIXEL_LABS,
  },
  {
    id: "delentia-ai",
    href: "/products/delentia-ai",
    icon: Palette,
    color: "#B8A9C9",
    titleEn: "Delentia AI",
    titleTh: "Delentia AI",
    tagEn: "Personal Agent OS",
    tagTh: "Personal Agent OS",
    descEn: "Personal Agent OS powered by L1-L5 Intelligence Ladder, RCTDB 8-Dimensional memory, and WF00-META 7-phase protocol — FDIA constitutional scoring on every output.",
    descTh: "Personal Agent OS ขับเคลื่อนด้วย L1-L5 Intelligence Ladder, RCTDB 8-Dimensional Memory และ WF00-META 7-Phase Protocol พร้อม FDIA Constitutional Scoring",
    features: [
      { en: "L1-L5 Intelligence Ladder", th: "L1-L5 Intelligence Ladder" },
      { en: "RCTDB 8-Dimensional Memory", th: "RCTDB 8-Dimensional Memory" },
      { en: "WF00-META 7-Phase Protocol", th: "WF00-META 7-Phase Protocol" },
      { en: "FDIA Constitutional Scoring", th: "FDIA Constitutional Scoring" },
    ],
    accentSrc: PIXEL_ARTENT,
  },
  {
    id: "signedai",
    href: "/products/signed-ai",
    icon: ShieldCheck,
    color: "#7B9E87",
    titleEn: "SignedAI",
    titleTh: "SignedAI",
    tagEn: "5th Genome · Verification API",
    tagTh: "5th Genome · Verification API",
    descEn: "5th Genome in the RCT 7-Genome System. HexaCore 7-Model consensus with ED25519 RFC 8032 signing, 4 voting methods, and Constitutional Accuracy AI governance.",
    descTh: "Genome ที่ 5 ใน RCT 7-Genome System — HexaCore 7-Model Consensus, ED25519 RFC 8032 Signing, 4 Voting Methods และ Constitutional Accuracy",
    features: [
      { en: "HexaCore 7-Model Consensus", th: "HexaCore 7-Model Consensus" },
      { en: "ED25519 RFC 8032 Signing", th: "ED25519 RFC 8032 Signing" },
      { en: "Constitutional Accuracy", th: "Constitutional Accuracy" },
      { en: "4 Geopolitical Voting Zones", th: "4 Geopolitical Voting Zones" },
    ],
    accentSrc: PIXEL_SIGNED,
  },
]

export default function ProductsPage() {
  const { language } = useLanguage()
  const pathname = usePathname()
  const isTh = language === "th"
  const locale = getLocaleFromPathname(pathname) || language
  const localePrefix = locale === "th" ? "/th" : "/en"
  const localHref = (href: string) => `${localePrefix}${href}`

  const productMetrics = [
    { value: `${SITE_PUBLIC_SDK_TESTS}`, labelEn: SITE_PUBLIC_SDK_EVIDENCE_LABEL, labelTh: SITE_PUBLIC_SDK_EVIDENCE_LABEL, color: "#D4A853" },
    { value: "99.7%", labelEn: "Verified Accuracy", labelTh: "ความแม่นยำที่ตรวจสอบได้", color: "#7B9E87" },
    { value: "3", labelEn: "Core Products", labelTh: "ผลิตภัณฑ์หลัก", color: "#B8A9C9" },
  ]
  const faqs = isTh
    ? [
        {
          question: "ถ้าจะเริ่มจากผลิตภัณฑ์เดียว ควรเริ่มตัวไหนก่อน",
          answer:
            "เริ่มจาก Delentia Platform หากโจทย์หลักคือการทดสอบและ benchmark ระบบ AI เริ่มจาก SignedAI หากกังวลเรื่อง hallucination, trust หรือ auditability และเริ่มจาก Delentia AI หากโจทย์หลักคือ creative workflow ที่ต้องคุมทิศทางให้ตรง intent",
        },
        {
          question: "ผลิตภัณฑ์เหล่านี้แชร์ infrastructure ร่วมกันหรือไม่",
          answer:
            "ใช่ ทั้งสามผลิตภัณฑ์ใช้ operating system layer เดียวกันของ RCT เช่น 10-layer architecture, JITNA Protocol, FDIA Equation และ shared trust infrastructure จึงต่อยอดกันได้ง่ายและควบคุมมาตรฐานได้สม่ำเสมอ",
        },
        {
          question: "Products ต่างจาก Solutions อย่างไร",
          answer:
            "Solutions อธิบาย pain point ที่ระบบช่วยแก้ ส่วน Products คือผิวหน้าการใช้งานหรือ service layer ที่นำ infrastructure ของ RCT ไปใช้งานในรูปแบบเฉพาะมากขึ้น",
        },
      ]
    : [
        {
          question: "If a team starts with one product, which should it choose first?",
          answer:
            "Start with Delentia Platform if the main need is testing and benchmarking AI systems. Start with SignedAI if hallucination, trust, or auditability is the blocker. Start with Delentia AI if the main challenge is creative workflow execution aligned to intent.",
        },
        {
          question: "Do the products share the same infrastructure foundation?",
          answer:
            "Yes. All three products run on the same Delentia OS foundation, including the 10-layer architecture, FDIA Equation, JITNA Protocol, and shared trust infrastructure.",
        },
        {
          question: "How are Products different from Solutions?",
          answer:
            "Solutions describe the problem categories RCT addresses. Products describe the concrete interfaces or services built on top of the shared RCT infrastructure for specific workflows.",
        },
      ]
  const relatedResources = [
    {
      href: localHref("/solutions"),
      title: isTh ? "เริ่มจากฝั่ง Solutions" : "Start from Solutions",
      description: isTh ? "ย้อนกลับไปดู pain points และปัญหาที่ระบบช่วยแก้" : "Map products back to the problem categories they solve.",
    },
    {
      href: localHref("/platform"),
      title: isTh ? "ดู Platform Foundation" : "Review the Platform Foundation",
      description: isTh ? "เข้าใจ infrastructure และ architecture ที่รองรับ products ทั้งหมด" : "Understand the architecture and infrastructure behind all products.",
    },
    {
      href: localHref("/whitepaper"),
      title: isTh ? "อ่าน Whitepaper เพิ่มเติม" : "Read the Whitepapers",
      description: isTh ? "เจาะลึก protocol, architecture และวิธีคิดของระบบ" : "Go deeper into protocols, architecture, and evaluation material.",
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
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
      <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top,rgba(123,158,135,0.10),transparent_42%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-[minmax(0,1.15fr)_minmax(320px,420px)] md:py-28">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-warm-amber/30 bg-warm-amber/10 px-4 py-1.5 text-sm font-medium text-warm-amber">
              🚀 {isTh ? "ผลิตภัณฑ์" : "Products"}
            </span>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {isTh ? "ผลิตภัณฑ์ AI ที่สร้างบนระบบปฏิบัติการ RCT โดยตรง" : "Purpose-Built AI Products Running on the RCT Operating System"}
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {isTh
                  ? "ทุกผลิตภัณฑ์ต่อยอดจากสถาปัตยกรรม 10 ชั้น, 41 algorithms, FDIA Equation และ JITNA Protocol เพื่อให้แต่ละ use case ได้ UX เฉพาะทางโดยไม่เสียความน่าเชื่อถือระดับองค์กร"
                  : "Each product is built on the same 10-layer architecture, 41 algorithms, FDIA Equation, and JITNA Protocol, translating core infrastructure into task-specific user experiences without sacrificing enterprise trust."}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {productMetrics.map((metric) => (
                <div key={metric.labelEn} className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm">
                  <div className="text-2xl font-bold" style={{ color: metric.color }}>{metric.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{isTh ? metric.labelTh : metric.labelEn}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={localHref("/contact")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-warm-amber px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#C49A48]">
                {isTh ? "ขอ Early Access" : "Request Early Access"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={localHref("/pricing")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                {isTh ? "ดูแผนราคา" : "Explore Pricing"}
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link href={localHref("/solutions")} className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted">
                {isTh ? "เริ่มจากปัญหาที่ต้องการแก้" : "Start from Your Use Case"}
              </Link>
              <Link href={localHref("/whitepaper")} className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted">
                {isTh ? "อ่าน Whitepaper" : "Read the Whitepaper"}
              </Link>
              <Link href={localHref("/architecture")} className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted">
                {isTh ? "ดูสถาปัตยกรรมเบื้องหลัง" : "See the Architecture"}
              </Link>
            </div>
          </div>
          <div className="relative rounded-[28px] border border-border bg-card p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="pointer-events-none absolute right-5 top-5 h-12 w-12 opacity-60">
              <OptimizedImage src={PIXEL_LABS} alt="" pixelated showErrorFallback={false} containerClassName="h-full w-full" objectFit="contain" width={48} height={48} />
            </div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-warm-sage">
              {isTh ? "Product Stack" : "Product Stack"}
            </div>
            <div className="space-y-4">
              {[
                { title: "Delentia Platform", body: isTh ? "แพลตฟอร์มทดสอบ, benchmark, regression และ certification สำหรับ workflow AI" : "Testing, benchmarking, regression, and certification platform for AI workflows." },
                { title: "Delentia AI", body: isTh ? "creative engine ที่แปลง intent ให้เป็น output ที่ยังคุมทิศทางเชิงกลยุทธ์ได้" : "A creative engine that turns intent into output without losing strategic direction." },
                { title: "SignedAI", body: isTh ? "verification layer สำหรับกรณีใช้ AI ในงานที่ต้องมี trust, traceability และ auditability" : "A verification layer for AI use cases that require trust, traceability, and auditability." },
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

      {/* OS Foundation Banner */}
      <section className="mx-auto max-w-5xl px-4 pb-12">
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-warm-amber/10">
              <Layers size={32} className="text-warm-amber" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
                {isTh ? "สร้างบนระบบปฏิบัติการ RCT" : "Built on the RCT Operating System"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isTh
                  ? "ทุกผลิตภัณฑ์ใช้ประโยชน์จากสถาปัตยกรรม 10 Layers, สมการ FDIA, JITNA Protocol และ 41 Algorithms — รับประกันความน่าเชื่อถือระดับ Enterprise"
                  : "Every product leverages the full 10-layer architecture, FDIA equation, JITNA Protocol, and 41 algorithms — ensuring enterprise-grade reliability."}
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              {[
                { icon: Cpu, label: "10 Layers" },
                { icon: Zap, label: "41 Algos" },
              ].map((item, i) => (
                <div key={i} className="px-4 py-2 rounded-lg text-center bg-muted">
                  <item.icon size={18} className="text-warm-amber mx-auto mb-1" />
                  <span className="text-xs font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-amber">Answer-First Summary</div>
              <h2 className="mt-3 text-2xl font-bold text-foreground">
                {isTh ? "สรุปสั้นที่สุด: หน้า Products นี้ตอบอะไร" : "Short Answer: What This Products Page Answers"}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {isTh
                  ? "หน้านี้ตอบว่าผลิตภัณฑ์หลักของ RCT มีอะไรบ้าง แต่ละตัวเหมาะกับ use case แบบไหน และแต่ละตัวใช้ operating system foundation เดียวกันอย่างไรเพื่อรักษามาตรฐานด้าน trust, verification และ deployment discipline"
                  : "This page explains which core RCT products are available, what use cases each one fits, and how they all inherit the same operating system foundation for trust, verification, and disciplined deployment."}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background/70 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-warm-sage">{isTh ? "Buyer Signals" : "Buyer Signals"}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>{isTh ? "แยก product positioning ชัดเจน" : "Clear product positioning by workflow."}</li>
                <li>{isTh ? "เชื่อม products กลับไปยัง platform foundation" : "Maps products back to the shared platform foundation."}</li>
                <li>{isTh ? "มี CTA ต่อไปยัง pricing, contact และ technical material" : "Connects products to pricing, contact, and technical material."}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Product Cards */}
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <m.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Link href={localHref(product.href)}>
                <div className="group relative h-full cursor-pointer rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
                  <div className="pointer-events-none absolute right-5 top-5 h-12 w-12 opacity-55">
                    <OptimizedImage src={product.accentSrc} alt="" pixelated showErrorFallback={false} containerClassName="h-full w-full" objectFit="contain" width={48} height={48} className="transition duration-200 group-hover:brightness-75 group-hover:contrast-125" />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${product.color}15` }}
                    >
                      <product.icon size={24} style={{ color: product.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-warm-amber transition-colors">
                        {isTh ? product.titleTh : product.titleEn}
                      </h3>
                      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: product.color }}>
                        {isTh ? product.tagTh : product.tagEn}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-5 text-muted-foreground">
                    {isTh ? product.descTh : product.descEn}
                  </p>

                  <div className="space-y-2 mb-5">
                    {product.features.map((feat, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: product.color }} />
                        <span className="text-xs text-muted-foreground">{isTh ? feat.th : feat.en}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all" style={{ color: product.color }}>
                    {isTh ? "เรียนรู้เพิ่มเติม" : "Learn More"}
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </m.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            {isTh ? "สนใจผลิตภัณฑ์ของเรา?" : "Interested in Our Products?"}
          </h2>
          <p className="text-muted-foreground">
            {isTh
              ? "ขอ Early Access สำหรับ Delentia Platform, Delentia AI หรือ SignedAI ทีมงานจะจัด Onboarding ส่วนตัวให้คุณ"
              : "Request early access to Delentia Platform, Delentia AI, or SignedAI. We'll set up a personalized onboarding experience."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={localHref("/contact")} className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-warm-amber hover:bg-[#C49A48] text-white font-medium text-sm transition-colors">
              {isTh ? "ติดต่อเรา" : "Contact Us"} <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link href={localHref("/docs")} className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border hover:bg-muted text-foreground font-medium text-sm transition-colors">
              {isTh ? "อ่านเอกสาร" : "View Documentation"}
            </Link>
          </div>
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">
            {isTh ? "ถ้าไม่แน่ใจว่าจะเริ่มจากตัวไหน" : "If you are unsure where to start"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {isTh
              ? "เลือก Delentia Platform หากคุณต้องการ platform สำหรับทดสอบและ benchmark AI เลือก Delentia AI หากโจทย์หลักคือ creative workflow และเลือก SignedAI หากคุณต้องการ verification, audit trail และการลด hallucination ในงานที่มีความเสี่ยงสูง"
              : "Choose Delentia Platform if you need a platform for testing and benchmarking AI systems. Choose Delentia AI if your main challenge is creative workflow execution. Choose SignedAI if you need verification, audit trails, and hallucination reduction for high-risk AI outputs."}
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href={localHref("/pricing")} className="inline-flex items-center justify-center rounded-xl bg-warm-amber px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#C49A48]">
              {isTh ? "เปรียบเทียบแผนราคา" : "Compare Pricing Plans"}
            </Link>
            <Link href={localHref("/contact")} className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              {isTh ? "คุยกับทีมเพื่อเลือกผลิตภัณฑ์" : "Talk to the Team"}
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-5xl grid gap-6 px-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-amber">FAQ</div>
            <h2 className="mt-3 text-2xl font-bold text-foreground">{isTh ? "คำถามที่ผู้ประเมินผลิตภัณฑ์มักถาม" : "Questions Product Evaluators Usually Ask"}</h2>
            <div className="mt-4 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-xl border border-border bg-background/70 p-4">
                  <summary className="list-none cursor-pointer font-semibold text-foreground">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-amber">Related Resources</div>
            <h2 className="mt-3 text-2xl font-bold text-foreground">{isTh ? "ลำดับอ่านต่อที่แนะนำ" : "Recommended Next Reading"}</h2>
            <div className="mt-4 space-y-3">
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

      <Footer />
      </main>
    </>
  )
}

