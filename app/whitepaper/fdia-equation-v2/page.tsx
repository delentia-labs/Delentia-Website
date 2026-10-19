import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { SITE_URL } from "@/lib/site-config"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "FDIA Equation v2 Whitepaper | F = (D^I) × A | Delentia Labs",
    "FDIA Equation v2 เอกสารทางเทคนิค | F = (D^I) × A | Delentia Labs",
    "The FDIA Equation v2 whitepaper — formal specification of the constitutional AI decision model where Future output is governed by Data quality, Intent, and Architect authorization.",
    "เอกสารทางเทคนิค FDIA Equation v2 — สมการ AI แบบรัฐธรรมนูญที่กำหนดผลลัพธ์จากคุณภาพข้อมูล Intent และการอนุมัติของ Architect",
    "/whitepaper/fdia-equation-v2",
    ["FDIA equation whitepaper", "constitutional AI", "F = D^I × A", "intent-centric AI", "deterministic AI governance"]
  )
}

export default async function FDIAEquationV2Page() {
  const locale = await getRequestLocale()
  const isEn = locale !== "th"
  const localePrefix = isEn ? "/en" : "/th"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isEn ? "Home" : "หน้าหลัก", url: SITE_URL },
    { name: "Whitepaper", url: `${SITE_URL}/whitepaper` },
    { name: "FDIA Equation v2", url: `${SITE_URL}/whitepaper/fdia-equation-v2` },
  ])

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "FDIA Equation v2 — Constitutional AI Decision Model",
    "description": "Formal specification of the FDIA Equation: F = (D^I) × A. Covers Data quality scaling, Intent amplification, Architect authorization gate, and Constitutional Kill Switch (A=0→F=0).",
    "author": { "@type": "Organization", "name": "Delentia Labs", "url": SITE_URL },
    "datePublished": "2026-01-01",
    "keywords": ["FDIA", "constitutional AI", "deterministic AI", "intent operating system"],
  }

  const sections = isEn ? [
    {
      title: "Abstract",
      body: "The FDIA Equation (F = (D^I) × A) is a constitutional AI governance model that makes human authorization a hard mathematical gate rather than a soft preference. This second-version specification formalizes the four variables, proves the kill-switch invariant (A=0→F=0), and documents the operational semantics used by the RCT Ecosystem in production.",
    },
    {
      title: "The Four Variables",
      body: "F (Future) is the constructed output — not a prediction, but a deliberately designed result. D (Data) is the quality-weighted knowledge base and serves as the exponential base, so higher data quality produces exponentially better outcomes. I (Intent) is the exponent: explicit human specification that determines how powerfully data is amplified. A (Architect) is the human-in-the-loop multiplier — the constitutional gate that gives AI outputs their meaning and accountability.",
    },
    {
      title: "The Constitutional Kill Switch",
      body: "When A = 0, the equation collapses to F = 0 regardless of data quality or intent strength. This is not a preference or a soft guideline — it is a hard mathematical invariant. The RCT Ecosystem enforces this with deterministic replay: given the same inputs and A=0, the output is always zero. This property makes the system auditable and safe by construction.",
    },
    {
      title: "Operational Semantics",
      body: "In production, the FDIA pipeline evaluates each request against all four variables before invoking any model. Data quality scores are computed from provenance metadata and retrieval confidence. Intent strength is assessed from specification completeness and goal disambiguation. Architect authorization is a runtime token that can be revoked at any time. The pipeline is fully observable: all four variable scores are returned in the audit trail.",
    },
    {
      title: "Version 2 Changes",
      body: "Version 2 formalizes the 8-Dimension scoring model for D and I variables, proposes a geopolitical balance constraint for model juries (a design idea; not implemented), and adds the PDPA-compliant provenance dimension (dimension 8) to the Data variable. The kill-switch invariant remains unchanged from v1.",
    },
  ] : [
    {
      title: "บทคัดย่อ",
      body: "FDIA Equation (F = (D^I) × A) คือโมเดล constitutional AI governance ที่ทำให้การอนุมัติของมนุษย์เป็นประตูทางคณิตศาสตร์แบบแข็ง ไม่ใช่ค่าเริ่มต้นหรือข้อแนะนำ เอกสารฉบับที่สองนี้กำหนดตัวแปรทั้งสี่อย่างเป็นทางการ พิสูจน์ kill-switch invariant (A=0→F=0) และบันทึก operational semantics ที่ใช้ใน RCT Ecosystem จริง",
    },
    {
      title: "ตัวแปรทั้งสี่",
      body: "F (Future) คือผลลัพธ์ที่ออกแบบขึ้นอย่างมีเจตนา D (Data) คือฐานความรู้ที่ถ่วงน้ำหนักด้วยคุณภาพและทำหน้าที่เป็นฐานของเลขยกกำลัง I (Intent) คือเลขชี้กำลัง: ระดับความชัดเจนของ specification ที่กำหนดว่าข้อมูลจะถูกขยายมากน้อยแค่ไหน A (Architect) คือตัวคูณ Human-in-the-Loop ที่เป็นประตูรัฐธรรมนูญให้ผลลัพธ์ AI มีความหมายและรับผิดชอบได้",
    },
    {
      title: "Constitutional Kill Switch",
      body: "เมื่อ A = 0 สมการจะยุบตัวเป็น F = 0 โดยไม่คำนึงถึงคุณภาพข้อมูลหรือความแข็งแกร่งของ intent นี่ไม่ใช่การตั้งค่าหรือข้อแนะนำ แต่เป็น mathematical invariant แบบแข็ง RCT Ecosystem บังคับใช้ด้วย deterministic replay: input เดิมและ A=0 ให้ output เป็นศูนย์เสมอ",
    },
    {
      title: "Operational Semantics",
      body: "ใน production FDIA pipeline ประเมินคำขอแต่ละรายการบนตัวแปรทั้งสี่ก่อนเรียก model ใด ๆ คะแนนคุณภาพข้อมูลคำนวณจาก provenance metadata ความแข็งแกร่งของ intent ประเมินจากความสมบูรณ์ของ specification การอนุมัติ Architect เป็น runtime token ที่สามารถเพิกถอนได้ทุกเมื่อ และตัวแปรทั้งสี่จะถูกส่งกลับในรูปแบบ audit trail ทุกครั้ง",
    },
    {
      title: "การเปลี่ยนแปลงใน Version 2",
      body: "Version 2 กำหนด 8-Dimension scoring model สำหรับตัวแปร D และ I อย่างเป็นทางการ เสนอข้อจำกัดความสมดุลทางภูมิรัฐศาสตร์สำหรับคณะลูกขุนของโมเดล (แนวคิด ยังไม่ได้สร้าง) และเพิ่ม PDPA-compliant provenance dimension (dimension 8) ใน Data variable — kill-switch invariant ยังคงเหมือนเดิมจาก v1",
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
            <span>Technical Dossier · Jan 2026</span>
          </div>

          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
            FDIA Equation <span className="text-warm-amber">v2</span>
          </h1>
          <p className="mb-4 font-mono text-2xl font-bold text-warm-sage">F = (D^I) × A</p>
          <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
            {isEn
              ? "Constitutional AI decision model — formal specification of the four-variable equation governing all RCT Ecosystem outputs."
              : "โมเดลตัดสินใจ AI แบบรัฐธรรมนูญ — ข้อกำหนดทางการของสมการสี่ตัวแปรที่ควบคุม output ทั้งหมดของ RCT Ecosystem"}
          </p>

          <div className="mb-12 grid gap-4 sm:grid-cols-4">
            {[
              { label: isEn ? "Variables" : "ตัวแปร", value: "4" },
              { label: isEn ? "Kill-switch" : "Kill-switch", value: "A=0→F=0" },
              { label: isEn ? "Dimensions" : "มิติ", value: "8D" },
              { label: isEn ? "Published" : "เผยแพร่", value: "Jan 2026" },
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
              {isEn ? "Explore the FDIA Implementation" : "สำรวจการ Implement FDIA"}
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={`${localePrefix}/protocols/fdia-equation`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-warm-amber px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c39a44]">
                {isEn ? "Interactive FDIA Diagram" : "FDIA Diagram แบบโต้ตอบ"} <ArrowRight size={16} />
              </Link>
              <Link href={`${localePrefix}/whitepaper/jitna-rfc-001`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-warm-amber/40 px-6 py-3 text-sm font-semibold text-warm-amber transition-colors hover:bg-warm-amber/8">
                {isEn ? "JITNA RFC-001 →" : "JITNA RFC-001 →"}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

