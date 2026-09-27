import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { SITE_URL, SITE_HALLUCINATION_RATE } from "@/lib/site-config"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "JITNA RFC-001 Whitepaper | Agent Communication Protocol | Delentia Labs",
    "JITNA RFC-001 เอกสารทางเทคนิค | โปรโตคอลสื่อสาร Agent | Delentia Labs",
    "JITNA RFC-001 specification — the universal AI agent communication protocol. Just-In-Time Nodal Assembly with 6 primitives, Ed25519 signing, and PROPOSE→COUNTER→ACCEPT negotiation flow.",
    "JITNA RFC-001 specification — โปรโตคอลสื่อสาร AI Agent แบบสากล Just-In-Time Nodal Assembly พร้อม 6 primitives, Ed25519 signing และ PROPOSE→COUNTER→ACCEPT negotiation flow",
    "/whitepaper/jitna-rfc-001",
    ["JITNA RFC-001", "AI agent communication protocol", "multi-agent negotiation", "Ed25519 signing", "agentic AI protocol", "HTTP of agentic AI"]
  )
}

export default async function JitnaRFC001Page() {
  const locale = await getRequestLocale()
  const isEn = locale !== "th"
  const localePrefix = isEn ? "/en" : "/th"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isEn ? "Home" : "หน้าหลัก", url: SITE_URL },
    { name: "Whitepaper", url: `${SITE_URL}/whitepaper` },
    { name: "JITNA RFC-001", url: `${SITE_URL}/whitepaper/jitna-rfc-001` },
  ])

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "JITNA RFC-001 — Universal AI Agent Communication Protocol",
    "description": "Just-In-Time Nodal Assembly (JITNA) RFC-001 v2.0 — the open standard for AI agent-to-agent communication. Defines 6 primitives (I/D/Δ/A/R/M), PROPOSE→COUNTER→ACCEPT negotiation, and Ed25519 cryptographic verification.",
    "author": { "@type": "Organization", "name": "Delentia Labs", "url": SITE_URL },
    "datePublished": "2026-02-01",
    "keywords": ["JITNA", "RFC-001", "agentic AI", "multi-agent", "Ed25519", "open protocol"],
  }

  const sections = isEn ? [
    {
      title: "Abstract",
      body: "Just-In-Time Nodal Assembly (JITNA) RFC-001 is an open standard for AI agent-to-agent communication. It defines a universal packet structure that any AI system can adopt, enabling interoperability across models, platforms, and vendors. JITNA is often described as 'the HTTP of the Agentic AI world' because it standardizes the intent-carrying layer that generative AI agents need to cooperate at scale.",
    },
    {
      title: "The Six Primitives",
      body: "Every JITNA packet carries six primitives: I (Intent) — the original goal or query; D (Data) — crystallized keywords and structured facts; Δ (Delta) — compressed synthesis and the emergent insight; A (Approach) — the execution strategy and method selection; R (Reflection) — self-assessment of whether the intent was achieved; M (Memory) — context that should persist to future interactions. Together, these primitives make JITNA packets self-describing, verifiable, and context-aware.",
    },
    {
      title: "Negotiation Flow",
      body: "JITNA defines a three-state negotiation loop: PROPOSE → COUNTER → ACCEPT. In PROPOSE, the initiating agent emits a packet with its intent and constraints. In COUNTER, the receiving agent may revise parameters, add constraints, or request clarification. In ACCEPT, both agents confirm the final specification before work begins. Each transition is logged as a signed reasoning step, making the entire negotiation path auditable.",
    },
    {
      title: "Cryptographic Verification",
      body: "All JITNA packets are signed with Ed25519 (RFC 8032) at the point of emission. The signature covers the full packet body including all six primitives and the negotiation state. This allows any participant to verify that the packet has not been modified in transit and to confirm the identity of the originating agent. Signature verification is performed at ACCEPT time before any action is executed.",
    },
    {
      title: "Version 2 Additions",
      body: "RFC-001 v2.0 introduces the JITNA Normalizer preprocessing layer that strips known prompt-injection patterns before LLM processing, adds the 4-zone geopolitical routing extension (3 Western / 3 Eastern / 1 Regional) used by SignedAI, and formalizes the Memory primitive TTL (time-to-live) semantics for PDPA-compliant context expiry.",
    },
    {
      title: "Performance Targets",
      body: `JITNA targets a full packet round-trip latency of under 200ms at the 99th percentile. Consensus accuracy across multi-agent deployments is an internal design target of 96.1% (self-reported, not yet independently benchmarked). The hallucination rate targeted for responses produced through JITNA's Reflection primitive is ${SITE_HALLUCINATION_RATE}, compared to an estimated 12–15% industry average for single-model deployments without verification.`,
    },
  ] : [
    {
      title: "บทคัดย่อ",
      body: "Just-In-Time Nodal Assembly (JITNA) RFC-001 คือ open standard สำหรับการสื่อสาร AI agent-to-agent กำหนดโครงสร้าง packet สากลที่ระบบ AI ใดก็ตามสามารถนำไปใช้ได้ ทำให้เกิด interoperability ข้ามโมเดล แพลตฟอร์ม และผู้จำหน่าย JITNA มักถูกเรียกว่า 'HTTP ของโลก Agentic AI' เพราะทำให้ intent-carrying layer ที่ AI agents ต้องการเพื่อทำงานร่วมกันเป็นมาตรฐาน",
    },
    {
      title: "6 Primitives",
      body: "ทุก JITNA packet บรรจุ 6 primitives: I (Intent) — เป้าหมายหรือคำถามเดิม; D (Data) — keywords และข้อเท็จจริงที่มีโครงสร้าง; Δ (Delta) — การสังเคราะห์ที่บีบอัดและ insight ที่เกิดขึ้น; A (Approach) — กลยุทธ์การดำเนินการ; R (Reflection) — การประเมินตัวเองว่าบรรลุ intent หรือไม่; M (Memory) — context ที่ควรคงอยู่ในการโต้ตอบในอนาคต primitives เหล่านี้ทำให้ packet อธิบายตัวเอง ยืนยันได้ และตระหนักถึง context",
    },
    {
      title: "Negotiation Flow",
      body: "JITNA กำหนด negotiation loop 3 สถานะ: PROPOSE → COUNTER → ACCEPT ใน PROPOSE agent ต้นทางส่ง packet พร้อม intent และ constraints ใน COUNTER agent ปลายทางอาจแก้ไข parameter เพิ่ม constraints หรือขอ clarification ใน ACCEPT ทั้งสอง agent ยืนยัน specification สุดท้ายก่อนเริ่มงาน แต่ละการเปลี่ยนสถานะถูกบันทึกเป็น signed reasoning step ทำให้ audit ได้ทั้งกระบวนการเจรจา",
    },
    {
      title: "Cryptographic Verification",
      body: "ทุก JITNA packet ถูก sign ด้วย Ed25519 (RFC 8032) ตั้งแต่จุดส่ง ลายเซ็นครอบคลุม packet body ทั้งหมดรวมถึง 6 primitives และสถานะ negotiation ทุกคนสามารถตรวจสอบว่า packet ไม่ถูกแก้ไขระหว่างส่งและยืนยัน identity ของ agent ต้นทาง การยืนยันลายเซ็นทำที่ ACCEPT ก่อนดำเนินการใด ๆ",
    },
    {
      title: "การเพิ่มเติมใน Version 2",
      body: "RFC-001 v2.0 เพิ่ม JITNA Normalizer preprocessing layer ที่ strip prompt-injection patterns ก่อนประมวลผล LLM เพิ่ม 4-zone geopolitical routing extension (3 Western / 3 Eastern / 1 Regional) ที่ใช้ใน SignedAI และกำหนด Memory primitive TTL semantics สำหรับ PDPA-compliant context expiry",
    },
    {
      title: "Performance Targets",
      body: `JITNA มี latency เป้าหมายต่ำกว่า 200ms ที่ percentile ที่ 99 ความแม่นยำ consensus ในการ deploy multi-agent เป็นเป้าหมายภายในที่ 96.1% (self-reported ยังไม่ผ่านการ benchmark อิสระ) อัตรา hallucination ที่เป็นเป้าหมายสำหรับ response ที่ผ่าน Reflection primitive อยู่ที่ ${SITE_HALLUCINATION_RATE} เทียบกับค่าเฉลี่ยอุตสาหกรรมประมาณ 12–15% สำหรับการ deploy โมเดลเดียวโดยไม่มี verification`,
    },
  ]

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background">
        <section className="mx-auto max-w-4xl px-4 py-20">
          <Link href={`${localePrefix}/whitepaper`} className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft size={16} />
            {isEn ? "Back to Whitepaper Hub" : "กลับไป Whitepaper Hub"}
          </Link>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-warm-amber/30 bg-warm-amber/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-warm-amber">
            <span>Protocol Specification · Feb 2026</span>
          </div>

          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
            JITNA <span className="text-warm-amber">RFC-001</span>
          </h1>
          <p className="mb-4 text-base font-semibold text-warm-sage">Just-In-Time Nodal Assembly — v2.0</p>
          <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
            {isEn
              ? "The open standard for AI agent-to-agent communication. 6 primitives, Ed25519 cryptographic verification, and PROPOSE→COUNTER→ACCEPT negotiation."
              : "Open standard สำหรับการสื่อสาร AI agent-to-agent — 6 primitives, Ed25519 signing และ PROPOSE→COUNTER→ACCEPT negotiation"}
          </p>

          <div className="mb-12 grid gap-4 sm:grid-cols-4">
            {[
              { label: isEn ? "Primitives" : "Primitives", value: "6" },
              { label: isEn ? "Accuracy (design target)" : "ความแม่นยำ (เป้าหมาย)", value: "96.1%" },
              { label: isEn ? "Latency" : "Latency", value: "<200ms" },
              { label: isEn ? "Signing" : "Signing", value: "Ed25519" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-black/10 bg-black/2 px-5 py-3 dark:border-white/10 dark:bg-white/4">
                <div className="text-2xl font-bold text-warm-amber">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            {sections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-black/8 p-6 dark:border-white/8">
                <h2 className="mb-3 text-lg font-bold text-foreground">{section.title}</h2>
                <p className="leading-relaxed text-muted-foreground">{section.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-warm-amber/25 bg-warm-amber/4 p-8">
            <h2 className="mb-4 text-xl font-bold">
              {isEn ? "Explore the JITNA Protocol" : "สำรวจ JITNA Protocol"}
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={`${localePrefix}/protocols/jitna-rfc-001`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-warm-amber px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c39a44]">
                {isEn ? "Interactive JITNA Diagram" : "JITNA Diagram แบบโต้ตอบ"} <ArrowRight size={16} />
              </Link>
              <Link href={`${localePrefix}/whitepaper/fdia-equation-v2`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-warm-amber/40 px-6 py-3 text-sm font-semibold text-warm-amber transition-colors hover:bg-warm-amber/8">
                {isEn ? "FDIA Equation v2 →" : "FDIA Equation v2 →"}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

