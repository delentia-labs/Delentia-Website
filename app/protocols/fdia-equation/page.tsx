"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { m } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "@/components/theme-provider"
import { useMounted } from "@/hooks/use-mounted"
import { getLocaleFromPathname } from "@/lib/i18n"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { Compass, Database, Target, User, ArrowRight, FlaskConical } from "lucide-react"
import AuthorBlock from "@/components/author-block"
import RelatedContent from "@/components/related-content"
import { PROTOCOL_LINKS } from "@/lib/internal-links"
import { SITE_HALLUCINATION_RATE } from "@/lib/site-config"

const components = [
  {
    letter: "F", color: "#C4745B", icon: Compass,
    name: { en: "Future", th: "อนาคต/ผลลัพธ์" },
    role: { en: "Output", th: "ผลลัพธ์" },
    formula: "F = (D^I) × A",
    desc: {
      en: "The constructed outcome — not a prediction, but a result consciously designed and built through the entire FDIA pipeline.",
      th: "ผลลัพธ์ที่ถูกสร้างขึ้น ไม่ใช่การทำนาย แต่เป็นผลลัพธ์ที่ออกแบบและสร้างอย่างมีเจตนา"
    },
    formulaDesc: {
      en: "F is the output — the Future that emerges when Data is amplified by Intent and guided by the Architect.",
      th: "F คือผลลัพธ์ อนาคตที่เกิดขึ้นเมื่อข้อมูลถูกขยายด้วยเจตนาและนำโดยสถาปนิก"
    }
  },
  {
    letter: "D", color: "#2DD4BF", icon: Database,
    name: { en: "Data", th: "ข้อมูล" },
    role: { en: "Base (foundation)", th: "ฐาน (รากฐาน)" },
    formula: "D = Base",
    desc: {
      en: "The knowledge base — vault of experiments, code, documentation, real-time signals, and historical context.",
      th: "ฐานความรู้ — คลังการทดลอง โค้ด เอกสาร สัญญาณเรียลไทม์ และบริบทประวัติศาสตร์"
    },
    formulaDesc: {
      en: "D is the base of the exponential — the foundation that Intent amplifies. More quality data = exponentially better outcomes.",
      th: "D คือฐานของเลขยกกำลัง รากฐานที่เจตนาขยาย ข้อมูลคุณภาพมากขึ้น = ผลลัพธ์ที่ดีขึ้นแบบทวีคูณ"
    }
  },
  {
    letter: "I", color: "#D4A853", icon: Target,
    name: { en: "Intent", th: "เจตนา" },
    role: { en: "Exponent (amplifier)", th: "เลขชี้กำลัง (ตัวขยาย)" },
    formula: "I = Exponent",
    desc: {
      en: "The explicit human instruction and specification — the understood purpose behind every request.",
      th: "คำสั่งและข้อกำหนดที่ชัดเจนของมนุษย์ จุดประสงค์ที่เข้าใจเบื้องหลังทุกคำขอ"
    },
    formulaDesc: {
      en: "I is the exponent — it determines how powerfully Data is amplified. Weak intent = linear results. Strong intent = exponential results.",
      th: "I คือเลขชี้กำลัง กำหนดว่าข้อมูลจะถูกขยายมากแค่ไหน เจตนาอ่อน = ผลลัพธ์เชิงเส้น เจตนาแรง = ผลลัพธ์ทวีคูณ"
    }
  },
  {
    letter: "A", color: "#89B4C8", icon: User,
    name: { en: "Architect", th: "สถาปนิก" },
    role: { en: "Multiplier (human-in-loop)", th: "ตัวคูณ (มนุษย์ในวงจร)" },
    formula: "A = Multiplier",
    desc: {
      en: "The Human-in-the-Loop decision maker — the Architect who ensures ethical, strategic AI governance.",
      th: "ผู้ตัดสินใจแบบ Human-in-the-Loop สถาปนิกที่รับประกันการกำกับดูแล AI อย่างมีจริยธรรมและกลยุทธ์"
    },
    formulaDesc: {
      en: "A is the multiplier — the Architect's judgment scales the entire output. Without human oversight (A→0), the system produces nothing meaningful.",
      th: "A คือตัวคูณ วิจารณญาณของสถาปนิกขยายผลลัพธ์ทั้งหมด หากไม่มีมนุษย์กำกับ (A→0) ระบบจะไม่สร้างสิ่งที่มีความหมาย"
    }
  }
]

// Example scenarios showing how the equation behaves
const examples = [
  { scenario: { en: "Enterprise Chatbot", th: "แชทบอทองค์กร" }, d: 85, i: 90, a: 75, f: 67, grade: "A", note: { en: "Strong intent amplification", th: "Intent ขยายผลแรง" } },
  { scenario: { en: "Perfect Data, Weak Intent", th: "ข้อมูลดีแต่ Intent อ่อน" }, d: 95, i: 40, a: 80, f: 73, grade: "A", note: { en: "Good data doesn't overcome vague intent", th: "ข้อมูลดีไม่เอาชนะ intent ที่คลุมเครือได้" } },
  { scenario: { en: "No Architect (A=0)", th: "ไม่มี Architect" }, d: 99, i: 99, a: 0, f: 0, grade: "F", note: { en: "Zero oversight = zero trusted output", th: "ไม่มีการกำกับดูแล = ผลลัพธ์ที่ไม่น่าเชื่อถือ" } },
  { scenario: { en: "Medical Diagnosis AI", th: "AI วินิจฉัยทางการแพทย์" }, d: 98, i: 92, a: 95, f: 90, grade: "A+", note: { en: "High rigor across all dimensions", th: "ความเข้มงวดสูงในทุกมิติ" } },
  { scenario: { en: "Early Stage Startup", th: "สตาร์ทอัพระยะแรก" }, d: 50, i: 60, a: 55, f: 36, grade: "C", note: { en: "All dimensions need improvement", th: "ทุกมิติต้องพัฒนา" } },
]

const gradeColor = (grade: string) => {
  if (grade === "A+") return "#7B9E87"
  if (grade === "A") return "#2DD4BF"
  if (grade === "B") return "#D4A853"
  if (grade === "C") return "#C4745B"
  return "#999"
}

const principles = [
  {
    titleEn: "Data Without Intent Is Potential",
    titleTh: "ข้อมูลไร้เจตนาคือศักยภาพ",
    descEn: "High-quality data with weak intent (I→0) produces mediocre results — (D^0) = 1 regardless of D's quality. Intent unlocks data's value.",
    descTh: "ข้อมูลคุณภาพสูงพร้อม Intent อ่อน (I→0) ให้ผลลัพธ์ปานกลาง — (D^0) = 1 โดยไม่คำนึงถึงคุณภาพ D เจตนาปลดล็อคคุณค่าของข้อมูล",
    color: "#2DD4BF"
  },
  {
    titleEn: "Intent Is an Exponential Lever",
    titleTh: "Intent คือคันโยกทวีคูณ",
    descEn: "Intent acts as an exponent on Data. High intent with good data = explosive growth in outcome quality. This is why clear specifications matter.",
    descTh: "Intent ทำหน้าที่เป็นเลขชี้กำลังของข้อมูล Intent สูง + ข้อมูลดี = การเติบโตของคุณภาพผลลัพธ์อย่างก้าวกระโดด นี่คือเหตุผลว่าทำไม Spec ที่ชัดเจนจึงสำคัญ",
    color: "#D4A853"
  },
  {
    titleEn: "The Architect Is Non-Negotiable",
    titleTh: "สถาปนิกไม่สามารถละเว้นได้",
    descEn: "When A = 0, the entire equation collapses to 0. Human oversight isn't optional — it's the final gate that gives AI outputs their meaning and accountability.",
    descTh: "เมื่อ A = 0 สมการทั้งหมดพังทลายเป็น 0 การกำกับดูแลของมนุษย์ไม่ใช่ตัวเลือก — มันคือประตูสุดท้ายที่ให้ความหมายและความรับผิดชอบแก่ output ของ AI",
    color: "#89B4C8"
  },
]

export default function FDIAEquationPage() {
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const isDark = (mounted ? resolvedTheme : "light") === "dark"
  const locale = getLocaleFromPathname(pathname) ?? "en"
  const isEn = locale === "en"
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isEn ? "Home" : "หน้าหลัก", url: `https://delentia.com/${locale}` },
    { name: isEn ? "Protocols" : "โปรโตคอล", url: `https://delentia.com/${locale}/protocols` },
    { name: isEn ? "FDIA Equation" : "สมการ FDIA", url: `https://delentia.com/${locale}/protocols/fdia-equation` },
  ])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "FDIA Equation — Intent-Centric AI Decision Model",
    description:
      "F = (D^I) × A — the mathematical foundation for intent-centric AI where Future emerges from Data amplified by Intent and governed by the Architect.",
    author: { "@type": "Organization", name: "RCT Ecosystem" },
  }

  const faqSchema = getFAQSchema([
    {
      question: "What does FDIA stand for?",
      answer: "FDIA stands for Future, Data, Intent, Architect — the four variables in the equation F = (D^I) × A that governs intent-centric AI decision making at Delentia Labs.",
    },
    {
      question: "Why is the Architect variable non-negotiable in FDIA?",
      answer: "When A = 0 the entire equation collapses to 0. Human oversight is not optional — it is the final gate that gives AI outputs their meaning and accountability. FDIA enforces human-in-the-loop governance at the mathematical level.",
    },
    {
      question: "How does FDIA prevent AI hallucination?",
      answer: `FDIA evaluates eight quality dimensions — Data quality (D), Intent clarity (I) and Architect approval (A) — before any output is accepted. Outputs that fall below the threshold are rejected and re-routed, targeting a hallucination rate of ${SITE_HALLUCINATION_RATE}.`,
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background">

        {/* Hero */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{ borderColor: "#C4745B", color: "#C4745B", background: "rgba(196,116,91,0.08)" }}
            >
              {isEn ? "RCT Protocol" : "RCT Protocol"}
            </m.div>
            <m.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              {isEn ? "The FDIA Equation" : "สมการ FDIA"}
            </m.h1>
            <m.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              {isEn
                ? "F = (D^I) × A — Mathematical foundation for intent-centric AI. Future equals Data raised to the power of Intent, multiplied by the Architect."
                : "F = (D^I) × A — รากฐานคณิตศาสตร์ของ AI ที่ขับเคลื่อนด้วยเจตนา อนาคตเท่ากับข้อมูลยกกำลังเจตนา คูณสถาปนิก"}
            </m.p>

            {/* Equation Display */}
            <m.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 sm:gap-4 mb-4"
            >
              <span className="text-5xl sm:text-6xl font-bold" style={{ color: "#C4745B" }}>F</span>
              <span className="text-3xl text-muted-foreground">=</span>
              <span className="text-3xl text-muted-foreground">(</span>
              <span className="text-5xl sm:text-6xl font-bold" style={{ color: "#2DD4BF" }}>D</span>
              <sup className="text-2xl font-bold -mt-6" style={{ color: "#D4A853" }}>I</sup>
              <span className="text-3xl text-muted-foreground">)</span>
              <span className="text-3xl text-muted-foreground">×</span>
              <span className="text-5xl sm:text-6xl font-bold" style={{ color: "#89B4C8" }}>A</span>
            </m.div>
            <m.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-sm text-muted-foreground font-mono"
            >
              Future = (Data<sup>Intent</sup>) × Architect
            </m.p>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="px-4 pb-8">
          <div className="max-w-3xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {components.map(c => {
                const Icon = c.icon
                return (
                  <div key={c.letter} className="text-center p-4 rounded-2xl border"
                    style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
                    <div className="flex justify-center mb-2">
                      <Icon size={20} style={{ color: c.color }} />
                    </div>
                    <div className="text-3xl font-bold mb-1" style={{ color: c.color }}>{c.letter}</div>
                    <div className="text-xs text-muted-foreground">{isEn ? c.name.en : c.name.th}</div>
                    <div className="text-xs font-medium mt-1" style={{ color: c.color }}>{isEn ? c.role.en : c.role.th}</div>
                  </div>
                )
              })}
            </m.div>
          </div>
        </section>

        {/* Component Breakdown */}
        <section className="px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <m.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl font-bold text-center mb-8"
            >
              {isEn ? "Component Deep Dive" : "วิเคราะห์แต่ละส่วนประกอบ"}
            </m.h2>
            <div className="space-y-5">
              {components.map((comp, i) => {
                const Icon = comp.icon
                return (
                  <m.div
                    key={comp.letter}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="p-6 rounded-2xl border"
                    style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${comp.color}18` }}>
                        <Icon size={22} style={{ color: comp.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="text-2xl font-bold" style={{ color: comp.color }}>{comp.letter}</span>
                          <span className="font-bold">{isEn ? comp.name.en : comp.name.th}</span>
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full"
                            style={{ background: `${comp.color}15`, color: comp.color }}>
                            {comp.formula}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                          {isEn ? comp.desc.en : comp.desc.th}
                        </p>
                        <div className="p-3 rounded-xl text-xs leading-relaxed"
                          style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", borderLeft: `3px solid ${comp.color}` }}>
                          <span className="font-semibold">{isEn ? "In the equation: " : "ในสมการ: "}</span>
                          {isEn ? comp.formulaDesc.en : comp.formulaDesc.th}
                        </div>
                      </div>
                    </div>
                  </m.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Key Principles */}
        <section className="px-4 py-16" style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
          <div className="max-w-5xl mx-auto">
            <m.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl font-bold text-center mb-10"
            >
              {isEn ? "Three Key Principles" : "หลักการสำคัญสามข้อ"}
            </m.h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {principles.map((p, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl border"
                  style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
                >
                  <div className="w-10 h-10 rounded-xl mb-4" style={{ background: `${p.color}18` }} />
                  <h3 className="font-bold mb-2" style={{ color: p.color }}>{isEn ? p.titleEn : p.titleTh}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{isEn ? p.descEn : p.descTh}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Examples Table */}
        <section className="px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <m.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl font-bold text-center mb-10"
            >
              {isEn ? "Real-World Examples" : "ตัวอย่างในโลกจริง"}
            </m.h2>
            <m.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
            >
              {/* Table header */}
              <div className="grid grid-cols-6 gap-0 text-xs font-semibold uppercase tracking-wider px-4 py-3"
                style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
                <div className="col-span-2 text-muted-foreground">{isEn ? "Scenario" : "สถานการณ์"}</div>
                <div className="text-center" style={{ color: "#2DD4BF" }}>D</div>
                <div className="text-center" style={{ color: "#D4A853" }}>I</div>
                <div className="text-center" style={{ color: "#89B4C8" }}>A</div>
                <div className="text-center" style={{ color: "#C4745B" }}>F / Grade</div>
              </div>
              {examples.map((ex, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="grid grid-cols-6 gap-0 px-4 py-4 items-center"
                  style={{
                    background: i % 2 === 0 ? "transparent" : (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"),
                    borderTop: i > 0 ? `1px solid ${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}` : undefined
                  }}
                >
                  <div className="col-span-2">
                    <div className="text-sm font-medium">{isEn ? ex.scenario.en : ex.scenario.th}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{isEn ? ex.note.en : ex.note.th}</div>
                  </div>
                  <div className="text-center text-sm font-mono font-semibold" style={{ color: "#2DD4BF" }}>{ex.d}%</div>
                  <div className="text-center text-sm font-mono font-semibold" style={{ color: "#D4A853" }}>{ex.i}%</div>
                  <div className="text-center text-sm font-mono font-semibold" style={{ color: "#89B4C8" }}>{ex.a}%</div>
                  <div className="text-center">
                    <span className="text-sm font-mono font-bold" style={{ color: gradeColor(ex.grade) }}>
                      {ex.f} / {ex.grade}
                    </span>
                  </div>
                </m.div>
              ))}
            </m.div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              {isEn ? "Note: F = round(Math.pow(D/100, I/100) × (A/100) × 100). When A=0, output=0 regardless of D and I." : "หมายเหตุ: F = round(Math.pow(D/100, I/100) × (A/100) × 100) เมื่อ A=0 ผลลัพธ์=0 โดยไม่คำนึงถึง D และ I"}
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16" style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
          <div className="max-w-2xl mx-auto text-center">
            <m.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-10 rounded-3xl border"
              style={{ borderColor: "rgba(196,116,91,0.25)", background: isDark ? "rgba(196,116,91,0.05)" : "rgba(196,116,91,0.04)" }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <FlaskConical size={20} style={{ color: "#C4745B" }} />
                <span className="text-sm font-semibold" style={{ color: "#C4745B" }}>
                  {isEn ? "Try It Yourself" : "ลองด้วยตัวเอง"}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-3">
                {isEn ? "Interactive FDIA Demo" : "ทดลองสมการ FDIA แบบอินเทอร์แอคทีฟ"}
              </h2>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                {isEn
                  ? "Adjust Data, Intent, and Architect sliders to see real-time FDIA scores. Load preset scenarios and get AI recommendations."
                  : "ปรับ Slider ของ Data, Intent และ Architect เพื่อดูคะแนน FDIA แบบ Real-time โหลดสถานการณ์ตัวอย่างและรับคำแนะนำจาก AI"}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/demo/fdia"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                  style={{ background: "#C4745B", color: "#fff" }}>
                  {isEn ? "Open FDIA Demo" : "เปิด FDIA Demo"}
                  <ArrowRight size={16} />
                </Link>
                <Link href="/protocols/rct-7-mental-model"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all"
                  style={{ borderColor: "rgba(196,116,91,0.4)", color: "#C4745B" }}>
                  {isEn ? "RCT-7 Mental Model" : "RCT-7 Mental Model"}
                </Link>
              </div>
            </m.div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 pb-12">
          <RelatedContent
            title={isEn ? "Related Content" : "เนื้อหาที่เกี่ยวข้อง"}
            items={PROTOCOL_LINKS.map(link => ({
              href: `/${locale}${link.href}`,
              title: isEn ? link.label : (link.labelTh ?? link.label),
              description: isEn ? link.description : (link.descriptionTh ?? link.description),
              category: "Protocol",
            }))}
          />
          <AuthorBlock authorSlug="ittirit-saengow" locale={locale as "en" | "th"} />
        </div>
      </main>
      <Footer />
    </>
  )
}

