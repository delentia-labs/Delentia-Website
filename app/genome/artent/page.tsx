import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { ArrowLeft, Workflow, Dna } from "lucide-react"
import AuthorBlock from "@/components/author-block"
import RelatedContent from "@/components/related-content"
import { Button } from "@/components/ui/button"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "G2 — ARTENT Genome: The 7-Phase Operating Protocol",
    "G2 — ARTENT Genome: โปรโตคอล 7 เฟส",
    "The ARTENT Genome defines RCT's Intent-Driven operating lifecycle — 7 phases from WF-00 Interpreter through WF-04 Scribe to the Meta-Phase. A paradigm shift from process-driven to intent-driven AI.",
    "ARTENT Genome กำหนดวงจรชีวิตการดำเนินงาน Intent-Driven ของ RCT — 7 เฟสตั้งแต่ WF-00 Interpreter ถึง WF-04 Scribe สู่ Meta-Phase",
    "/genome/artent",
    ["ARTENT Genome", "intent-driven AI", "WF-00 interpreter", "7-phase AI protocol", "RCT operating lifecycle"]
  )
}

const PHASES = [
  {
    id: "WF-00",
    en: { title: "Interpreter", body: "Receives raw input — text, voice, structured data — and converts it into a normalized Intent Object. No transformation yet; only faithful representation of what was said. Errors caught here cost 1x. Errors caught later cost 100x." },
    th: { title: "Interpreter — ผู้แปล", body: "รับ Input ในรูปแบบดิบ — ข้อความ เสียง ข้อมูลที่มีโครงสร้าง — และแปลงเป็น Intent Object ที่ Normalized ยังไม่มีการแปลง เพียงการแสดงที่สื่อสัตย์ของสิ่งที่พูดไป ข้อผิดพลาดที่ตรวจพบที่นี่มีต้นทุน 1x ข้อผิดพลาดที่ตรวจพบภายหลังมีต้นทุน 100x" },
    color: "border-warm-amber/30 bg-warm-amber/5",
    accent: "text-warm-amber",
  },
  {
    id: "WF-01",
    en: { title: "Classifier", body: "Routes the Intent Object to the correct genome, algorithm tier, and LLM roster. This is JITNA in action — matching every task to its optimal processing path without human routing decisions. Sub-100ms target." },
    th: { title: "Classifier — ผู้จัดจำแนก", body: "นำ Intent Object ไปยัง Genome, Algorithm Tier และ LLM Roster ที่ถูกต้อง นี่คือ JITNA ในการปฏิบัติงาน — จับคู่ทุก Task กับเส้นทางประมวลผลที่เหมาะสมที่สุดโดยไม่ต้องมีการตัดสินใจ Routing จากมนุษย์ เป้าหมาย Sub-100ms" },
    color: "border-sky-400/30 bg-sky-400/5",
    accent: "text-sky-400",
  },
  {
    id: "WF-02",
    en: { title: "Executor", body: "Runs the task across the selected model(s). When a jury is used, this phase asks each member model independently and collects their votes before any comparison." },
    th: { title: "Executor — ผู้ดำเนินการ", body: "รัน Task บนโมเดลที่เลือก เมื่อใช้คณะลูกขุน เฟสนี้ถามโมเดลสมาชิกแต่ละตัวโดยอิสระและรวบรวมคะแนนโหวตก่อนการเปรียบเทียบใดๆ" },
    color: "border-emerald-500/30 bg-emerald-500/5",
    accent: "text-emerald-500",
  },
  {
    id: "WF-03",
    en: { title: "Verifier", body: "SignedAI's 8D scoring pipeline runs here. Outputs from Executor are attested, scored across 8 dimensions (Accuracy, Relevance, Coherence, Completeness, Safety, Creativity, Structure, Efficiency), and consensus is established. Outputs below threshold are rejected — not passed with warnings." },
    th: { title: "Verifier — ผู้ตรวจสอบ", body: "Pipeline การให้คะแนน 8D ของ SignedAI ทำงานที่นี่ Output จาก Executor ถูก Attest, ให้คะแนนใน 8 มิติ (ความถูกต้อง, ความเกี่ยวข้อง, ความสอดคล้อง, ความสมบูรณ์, ความปลอดภัย, ความคิดสร้างสรรค์, โครงสร้าง, ประสิทธิภาพ) และการสร้างฉันทามติ Output ที่ต่ำกว่าเกณฑ์ถูกปฏิเสธ ไม่ใช่ส่งผ่านพร้อม Warning" },
    color: "border-violet-400/30 bg-violet-400/5",
    accent: "text-violet-400",
  },
  {
    id: "WF-04",
    en: { title: "Scribe", body: "Formats, signs, and delivers the verified output. Includes audit trail generation (who verified, when, with what models, at what confidence), persistent memory write-back (Vault Genome), and user-facing response formatting." },
    th: { title: "Scribe — ผู้บันทึก", body: "จัดรูปแบบ ลงนาม และส่ง Output ที่ผ่านการตรวจสอบ รวม Audit Trail Generation (ใครตรวจสอบ เมื่อไหร่ ด้วยโมเดลอะไร ที่ความมั่นใจระดับใด), Persistent Memory Write-back (Vault Genome) และการจัดรูปแบบการตอบสนองสำหรับผู้ใช้" },
    color: "border-rose-400/30 bg-rose-400/5",
    accent: "text-rose-400",
  },
  {
    id: "WF-05",
    en: { title: "Reflector", body: "Post-delivery analysis. Every completed task feeds data back into the system: latency, accuracy delta, user acceptance signal, exception types. This is the learning loop that improves G1 (Architect) and updates JITNA's routing weights." },
    th: { title: "Reflector — ผู้สะท้อน", body: "การวิเคราะห์หลังการส่ง ทุก Task ที่เสร็จสิ้นป้อนข้อมูลกลับเข้าสู่ระบบ: Latency, Accuracy Delta, สัญญาณการยอมรับของผู้ใช้, ประเภท Exception นี่คือ Learning Loop ที่ปรับปรุง G1 (Architect) และอัปเดต Routing Weights ของ JITNA" },
    color: "border-orange-400/30 bg-orange-400/5",
    accent: "text-orange-400",
  },
  {
    id: "META",
    en: { title: "Meta-Phase", body: "The cross-session, cross-genome coordination layer. Aggregates signals from all WF phases across all users, identifies global patterns, and proposes constitutional updates. Updates require human review before they modify genome-level rules (A=0 parameter)." },
    th: { title: "Meta-Phase — เลเยอร์ข้ามเซสชัน", body: "เลเยอร์การประสานงานข้ามเซสชันและข้าม Genome รวบรวมสัญญาณจากทุกเฟส WF ในทุกผู้ใช้ ระบุรูปแบบระดับโลก และเสนอการอัปเดตตามรัฐธรรมนูญ การอัปเดตต้องได้รับการตรวจสอบจากมนุษย์ก่อนที่จะแก้ไขกฎระดับ Genome (พารามิเตอร์ A=0)" },
    color: "border-cyan-400/30 bg-cyan-400/5",
    accent: "text-cyan-400",
  },
]

export default async function GenomeArtentPage() {
  const locale = await getRequestLocale()
  const isTh = locale === "th"
  const localePrefix = isTh ? "/th" : "/en"

  const breadcrumb = getBreadcrumbSchema([
    { name: isTh ? "หน้าหลัก" : "Home", url: `https://delentia.com${localePrefix}` },
    { name: "7 Genome System", url: `https://delentia.com${localePrefix}/genome` },
    { name: "ARTENT Genome", url: `https://delentia.com${localePrefix}/genome/artent` },
  ])

  const faq = getFAQSchema([
    {
      question: isTh ? "ARTENT Genome แตกต่างจาก AI workflow ทั่วไปอย่างไร?" : "How does the ARTENT Genome differ from standard AI workflows?",
      answer: isTh
        ? "Workflow ทั่วไปกำหนดขั้นตอนล่วงหน้าและบังคับให้ Input ผ่านขั้นตอนเหล่านั้น ARTENT ใช้ Intent-Driven Routing: แต่ละ Task ทำให้เกิด Path WF-00 ถึง WF-04 ที่ไม่ซ้ำกันตาม Intent ไม่ใช่ตาม Template ที่กำหนดไว้"
        : "Standard workflows define steps upfront and force inputs through them. ARTENT uses intent-driven routing: each task generates a unique WF-00 to WF-04 path based on intent, not a predefined template.",
    },
    {
      question: isTh ? "Portable State Container คืออะไร?" : "What is a Portable State Container?",
      answer: isTh
        ? "Portable State Container คือ Snapshot ของ ARTENT Session สมบูรณ์ — Intent History, Model Choices, Verification Results, Memory Writes — บรรจุใน Unit ที่ย้ายได้ ทำให้การกู้คืน Session ข้ามอุปกรณ์ทำได้ใน 2 วินาที"
        : "A Portable State Container is a complete ARTENT session snapshot — intent history, model choices, verification results, memory writes — packaged in a portable unit. Session recovery across devices takes under 2 seconds.",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <main className="min-h-screen bg-background">
        <Navbar />

        <section className="mx-auto max-w-4xl px-4 py-24">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href={`${localePrefix}/genome`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isTh ? "กลับไป 7 Genome System" : "Back to 7 Genome System"}
            </Link>
          </Button>

          <article className="space-y-14">
            {/* Header */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-400/10 border border-sky-400/30 text-sky-400 text-xs font-medium">
                  <Dna className="w-3 h-3" /> G2 — {isTh ? "The Protocol" : "The Protocol"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">ARTENT Genome</h1>
              <p className="text-xl text-foreground/70 max-w-2xl">
                {isTh
                  ? "โปรโตคอลการดำเนินงาน — ระบบปฏิบัติการ Intent-Driven 7 เฟส"
                  : "The Operating Protocol — a 7-Phase Intent-Driven lifecycle for every AI task."}
              </p>
            </div>

            {/* Paradigm Shift */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="p-6 rounded-xl border border-border bg-card space-y-3">
                <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">
                  {isTh ? "แบบดั้งเดิม" : "Traditional"}
                </p>
                <p className="text-sm font-bold text-foreground">Process-Driven AI</p>
                <ul className="text-sm text-foreground/60 space-y-1.5">
                  {(isTh ? [
                    "กำหนด Steps ล่วงหน้า",
                    "บังคับ Input ให้ผ่าน Template",
                    "ข้อผิดพลาดสะสมผ่าน Pipeline",
                    "ไม่มี Learning Loop",
                  ] : [
                    "Steps defined upfront",
                    "Inputs forced through template",
                    "Errors accumulate through pipeline",
                    "No learning loop",
                  ]).map((item, i) => <li key={i} className="flex items-start gap-2"><span className="text-rose-400 mt-0.5">×</span>{item}</li>)}
                </ul>
              </div>
              <div className="p-6 rounded-xl border border-warm-amber/30 bg-warm-amber/5 space-y-3">
                <p className="text-xs font-semibold text-warm-amber uppercase tracking-widest">ARTENT</p>
                <p className="text-sm font-bold text-foreground">Intent-Driven AI</p>
                <ul className="text-sm text-foreground/70 space-y-1.5">
                  {(isTh ? [
                    "Path สร้างจาก Intent ของ Task",
                    "การ Routing ปรับตัวแบบ Real-time",
                    "ข้อผิดพลาดถูก Catch ใน WF-00",
                    "WF-05 Reflector อัปเดต Model weights",
                  ] : [
                    "Path generated from task intent",
                    "Routing adapts in real-time",
                    "Errors caught at WF-00",
                    "WF-05 Reflector updates model weights",
                  ]).map((item, i) => <li key={i} className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span>{item}</li>)}
                </ul>
              </div>
            </div>

            {/* 7 Phases */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                {isTh ? "โปรโตคอล 7 เฟส" : "The 7-Phase Protocol"}
              </h2>
              <div className="space-y-4">
                {PHASES.map((phase) => {
                  const t = isTh ? phase.th : phase.en
                  return (
                    <div key={phase.id} className={`p-5 rounded-xl border ${phase.color} space-y-2`}>
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-sm font-bold px-2 py-0.5 rounded border ${phase.color} ${phase.accent}`}>{phase.id}</span>
                        <h3 className="font-bold text-foreground">{t.title}</h3>
                      </div>
                      <p className="text-sm text-foreground/70 leading-relaxed">{t.body}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Portable State Container */}
            <div className="border border-border bg-card rounded-xl p-8 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Workflow className="w-5 h-5 text-warm-amber" />
                <h2 className="text-xl font-bold text-foreground">
                  {isTh ? "Portable State Container" : "Portable State Container"}
                </h2>
              </div>
              <p className="text-foreground/70 leading-relaxed">
                {isTh
                  ? "แต่ละ ARTENT Session ถูกบรรจุใน Portable State Container: Snapshot ที่สมบูรณ์ของ Intent History, Model Choices, Verification Results และ Memory Writes ที่ย้ายได้ข้ามอุปกรณ์ในเวลาน้อยกว่า 2 วินาที สิ่งนี้ทำให้ ARTENT เป็นตัวแทน AI แรกที่มี True Cross-Device Memory Continuity โดยไม่ต้องพึ่งพา Cloud State Management"
                  : "Every ARTENT session is packaged as a Portable State Container: a complete snapshot of intent history, model choices, verification results, and memory writes that can be transferred across devices in under 2 seconds. This makes ARTENT the first AI agent with true cross-device memory continuity without relying on cloud state management."}
              </p>
            </div>

            {/* Navigation */}
            <div className="border-t border-border pt-10 grid sm:grid-cols-2 gap-4">
              <Link
                href={`${localePrefix}/genome/architect`}
                className="flex items-center gap-3 p-5 rounded-xl border border-border bg-card hover:border-warm-amber/40 transition-all group"
              >
                <ArrowLeft className="w-4 h-4 text-foreground/30 group-hover:text-warm-amber transition-colors" />
                <div>
                  <p className="text-xs font-mono text-foreground/40">G1</p>
                  <p className="font-bold text-foreground text-sm">Architect's Genome</p>
                </div>
              </Link>
              <Link
                href={`${localePrefix}/genome/jitna`}
                className="flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-warm-amber/40 transition-all group"
              >
                <div>
                  <p className="text-xs font-mono text-foreground/40">G3</p>
                  <p className="font-bold text-foreground text-sm">JITNA Genome</p>
                  <p className="text-xs text-foreground/50">{isTh ? "The Language — 6 Primitives" : "The Language — 6 Primitives"}</p>
                </div>
                <ArrowLeft className="w-4 h-4 text-foreground/30 group-hover:text-warm-amber transition-colors rotate-180" />
              </Link>
            </div>

            <RelatedContent
              title={isTh ? "เนื้อหาที่เกี่ยวข้อง" : "Related Content"}
              items={[
                { href: `${localePrefix}/protocols`, title: isTh ? "ข้อกำหนด Protocol" : "Protocol Specifications", description: isTh ? "โปรโตคอลทางเทคนิคที่ขับเคลื่อน RCT Ecosystem" : "The technical protocols powering the RCT Ecosystem.", category: "Protocols" },
                { href: `${localePrefix}/genome`, title: isTh ? "7 Genome System" : "7 Genome System", description: isTh ? "สำรวจ Genome ทั้ง 7 ตัวของ RCT Ecosystem" : "Explore all 7 Genomes of the RCT Ecosystem.", category: "Genome" },
                { href: `${localePrefix}/blog`, title: isTh ? "บทความวิจัย" : "Research & Blog", description: isTh ? "งานวิจัยและบทความเกี่ยวกับ AI จาก Delentia Labs" : "Research papers and AI articles from Delentia Labs.", category: "Research" },
              ]}
            />
            <AuthorBlock authorSlug="ittirit-saengow" locale={locale} />
          </article>
        </section>

        <Footer />
      </main>
    </>
  )
}

