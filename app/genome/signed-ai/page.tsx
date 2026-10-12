import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { ArrowLeft, ShieldCheck, Dna } from "lucide-react"
import AuthorBlock from "@/components/author-block"
import RelatedContent from "@/components/related-content"
import { Button } from "@/components/ui/button"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "G5 — SignedAI Genome: 8D Verification & Consensus",
    "G5 — SignedAI Genome: การตรวจสอบ 8 มิติและฉันทามติ",
    "SignedAI Genome verifies AI output through 8-dimensional scoring and a 7-model HexaCore consensus pipeline. No hallucination rate is claimed.",
    "SignedAI Genome ให้การตรวจสอบ Output AI ผ่านการให้คะแนน 8 มิติและ Pipeline ฉันทามติ HexaCore 7 โมเดล (ไม่ได้อ้างอัตรา hallucination)",
    "/genome/signed-ai",
    ["SignedAI", "AI verification", "8D scoring", "HexaCore consensus", "hallucination reduction", "AI attestation"]
  )
}

const DIMENSIONS = [
  { id: "D1", en: { name: "Accuracy", desc: "Is the output factually correct against verifiable sources?" }, th: { name: "ความถูกต้อง", desc: "Output ถูกต้องตามข้อเท็จจริงเทียบกับแหล่งที่ตรวจสอบได้หรือไม่?" }, color: "text-warm-amber" },
  { id: "D2", en: { name: "Relevance", desc: "Does the output address exactly what was asked — no more, no less?" }, th: { name: "ความเกี่ยวข้อง", desc: "Output ตอบสนองสิ่งที่ถูกถามอย่างแม่นยำ — ไม่มากไม่น้อย?" }, color: "text-sky-400" },
  { id: "D3", en: { name: "Coherence", desc: "Is the reasoning internally consistent? Does the conclusion follow from the premises?" }, th: { name: "ความสอดคล้อง", desc: "การให้เหตุผลสอดคล้องภายในหรือไม่? บทสรุปติดตามจาก Premises หรือไม่?" }, color: "text-emerald-500" },
  { id: "D4", en: { name: "Completeness", desc: "Does the output address all specified Delta requirements without silent omission?" }, th: { name: "ความสมบูรณ์", desc: "Output ตอบสนองข้อกำหนด Delta ทั้งหมดที่ระบุโดยไม่มีการละเว้นอย่างเงียบๆ หรือไม่?" }, color: "text-violet-400" },
  { id: "D5", en: { name: "Safety", desc: "Does the output comply with constitutional constraints (A-parameter, Codex prohibitions)?" }, th: { name: "ความปลอดภัย", desc: "Output ปฏิบัติตามข้อจำกัดตามรัฐธรรมนูญ (A-parameter, ข้อห้าม Codex) หรือไม่?" }, color: "text-rose-400" },
  { id: "D6", en: { name: "Creativity", desc: "For open-ended tasks: does the output add non-trivial value beyond obvious answers?" }, th: { name: "ความคิดสร้างสรรค์", desc: "สำหรับ Task แบบปลายเปิด: Output เพิ่มมูลค่าที่ไม่ใช่ Trivial นอกเหนือจากคำตอบที่ชัดเจนหรือไม่?" }, color: "text-orange-400" },
  { id: "D7", en: { name: "Structure", desc: "Is the output formatted correctly per the Delta specification (format, length, organization)?" }, th: { name: "โครงสร้าง", desc: "Output มีรูปแบบถูกต้องตามข้อกำหนด Delta (รูปแบบ ความยาว การจัดระเบียบ) หรือไม่?" }, color: "text-cyan-400" },
  { id: "D8", en: { name: "Efficiency", desc: "Is the output produced within the declared cost (A-parameter max_cost) and latency bounds?" }, th: { name: "ประสิทธิภาพ", desc: "Output ถูกผลิตภายในต้นทุนที่ประกาศ (A-parameter max_cost) และขอบเขต Latency หรือไม่?" }, color: "text-pink-400" },
]

const PIPELINE_STEPS = [
  {
    id: "01",
    en: { step: "RECEIVE", desc: "Raw input validated against JITNA I-primitive schema. Malformed intent rejected at gate." },
    th: { step: "RECEIVE", desc: "Input ดิบถูกตรวจสอบเทียบกับ Schema JITNA I-Primitive Intent ที่มีรูปแบบผิดถูกปฏิเสธที่ประตู" },
  },
  {
    id: "02",
    en: { step: "BROADCAST", desc: "Task distributed to all 7 HexaCore LLMs simultaneously. No result sharing before independent completion." },
    th: { step: "BROADCAST", desc: "Task ถูกกระจายไปยัง HexaCore LLMs ทั้ง 7 ตัวพร้อมกัน ไม่มีการแบ่งปัน Result ก่อนการเสร็จสิ้นอิสระ" },
  },
  {
    id: "03",
    en: { step: "GENERATE", desc: "Each of the 7 models produces an independent response without knowledge of other models' outputs." },
    th: { step: "GENERATE", desc: "แต่ละโมเดลใน 7 ตัวผลิตการตอบสนองอิสระโดยไม่รู้ Output ของโมเดลอื่น" },
  },
  {
    id: "04",
    en: { step: "AGGREGATE", desc: "All 7 outputs collected in a response matrix. Pairwise similarity scoring begins." },
    th: { step: "AGGREGATE", desc: "Output ทั้ง 7 ถูกรวบรวมใน Response Matrix การให้คะแนน Pairwise Similarity เริ่มต้น" },
  },
  {
    id: "05",
    en: { step: "SCORE", desc: "Each output scored across all 8D dimensions. Outputs below threshold in D5 (Safety) are immediately disqualified." },
    th: { step: "SCORE", desc: "Output แต่ละตัวถูกให้คะแนนใน 8D ทั้งหมด Output ที่ต่ำกว่าเกณฑ์ใน D5 (ความปลอดภัย) ถูกตัดสิทธิ์ทันที" },
  },
  {
    id: "06",
    en: { step: "CONSENSUS", desc: "Consensus algorithm applied. 75% agreement required for Tier-4 attestation. Minority outputs flagged, not discarded — they feed D6 (Creativity) scoring." },
    th: { step: "CONSENSUS", desc: "อัลกอริทึมฉันทามติถูก Apply ต้องการความเห็นด้วย 75% สำหรับ Tier-4 Attestation Output ส่วนน้อยถูกตั้งธง ไม่ถูกทิ้ง — พวกมันป้อนการให้คะแนน D6 (ความคิดสร้างสรรค์)" },
  },
  {
    id: "07",
    en: { step: "ATTEST", desc: "Surviving output cryptographically attested with: model roster, scores per dimension, consensus level, timestamp, and cost. This is the SignedAI signature." },
    th: { step: "ATTEST", desc: "Output ที่รอดชีวิตถูก Attest ด้วย Cryptography พร้อม: Model Roster, คะแนนต่อมิติ, ระดับฉันทามติ, Timestamp และต้นทุน นี่คือลายเซ็น SignedAI" },
  },
  {
    id: "08",
    en: { step: "DELIVER", desc: "Attested output delivered to ARTENT WF-04 Scribe phase. No output reaches users without passing all 8D dimensions." },
    th: { step: "DELIVER", desc: "Output ที่ Attest แล้วถูกส่งไปยัง ARTENT WF-04 Scribe Phase ไม่มี Output ใดถึงผู้ใช้โดยไม่ผ่านมิติ 8D ทั้งหมด" },
  },
]

const TIERS = [
  { tier: "Tier 1", en: { models: "1 model", cost: "~$0.10", consensus: "Single attestation" }, th: { models: "1 โมเดล", cost: "~$0.10", consensus: "Single Attestation" } },
  { tier: "Tier 2", en: { models: "3 models", cost: "~$0.50", consensus: "67% consensus" }, th: { models: "3 โมเดล", cost: "~$0.50", consensus: "ฉันทามติ 67%" } },
  { tier: "Tier 3", en: { models: "5 models", cost: "~$1.50", consensus: "60% consensus" }, th: { models: "5 โมเดล", cost: "~$1.50", consensus: "ฉันทามติ 60%" } },
  { tier: "Tier 4", en: { models: "7 models (HexaCore)", cost: "~$5.00", consensus: "75% consensus" }, th: { models: "7 โมเดล (HexaCore)", cost: "~$5.00", consensus: "ฉันทามติ 75%" } },
]

export default async function GenomeSignedAIPage() {
  const locale = await getRequestLocale()
  const isTh = locale === "th"
  const localePrefix = isTh ? "/th" : "/en"

  const breadcrumb = getBreadcrumbSchema([
    { name: isTh ? "หน้าหลัก" : "Home", url: `https://delentia.com${localePrefix}` },
    { name: "7 Genome System", url: `https://delentia.com${localePrefix}/genome` },
    { name: "SignedAI Genome", url: `https://delentia.com${localePrefix}/genome/signed-ai` },
  ])

  const faq = getFAQSchema([
    {
      question: isTh ? "SignedAI ลด Hallucination ได้อย่างไร?" : "How does SignedAI reduce hallucination?",
      answer: isTh
        ? "โดยการรัน Task บนโมเดลอิสระ 7 ตัวพร้อมกัน (แทนที่จะเป็น 1 ตัว) และต้องการฉันทามติ 75% ก่อนการส่งมอบ Hallucinations มักเกิดจากโมเดลเดียว เมื่อ 6 จาก 7 โมเดลไม่เห็นด้วย Output นั้นถูกตั้งธงโดยอัตโนมัติ"
        : "By running tasks across 7 independent models simultaneously (instead of 1) and requiring 75% consensus before delivery. Hallucinations are typically single-model artifacts. When 6 of 7 models disagree, that output is automatically flagged.",
    },
    {
      question: isTh ? "SignedAI Signature คืออะไร?" : "What is the SignedAI Signature?",
      answer: isTh
        ? "SignedAI Signature คือระเบียน Cryptographic ที่แนบกับทุก Output ที่ผ่านการตรวจสอบ มันบันทึก: โมเดลใดที่ถูกใช้, คะแนนใน 8D ทุกมิติ, ระดับฉันทามติ, Timestamp และต้นทุนในการผลิต Output นั้น"
        : "The SignedAI Signature is a cryptographic record attached to every verified output. It records: which models were used, the 8D scores across all dimensions, consensus level, timestamp, and cost to produce that output.",
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
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-400/10 border border-rose-400/30 text-rose-400 text-xs font-medium">
                  <Dna className="w-3 h-3" /> G5 — {isTh ? "The Verification" : "The Verification"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">SignedAI Genome</h1>
              <p className="text-xl text-foreground/70 max-w-2xl">
                {isTh
                  ? "การตรวจสอบ 8 มิติและฉันทามติ HexaCore 7 โมเดล (ไม่ได้อ้างอัตรา hallucination)"
                  : "8-dimensional scoring and 7-model HexaCore consensus. No hallucination rate is claimed."}
              </p>
            </div>

            {/* Benchmark Stat */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="p-6 rounded-xl border border-rose-400/30 bg-rose-400/5 space-y-2">
                <p className="text-xs font-semibold text-rose-400 uppercase tracking-widest">
                  {isTh ? "Benchmark Hallucination Target" : "Benchmark Hallucination Target"}
                </p>
                <p className="text-4xl font-bold text-foreground">not claimed</p>
                <p className="text-sm text-foreground/60">{isTh ? "ผ่าน SignedAI Tier-4 Consensus Pipeline" : "via SignedAI Tier-4 Consensus Pipeline"}</p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card space-y-2">
                <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">
                  {isTh ? "ค่าเฉลี่ยอุตสาหกรรม" : "Industry Average"}
                </p>
                <p className="text-4xl font-bold text-foreground/40">12–15%</p>
                <p className="text-sm text-foreground/40">{isTh ? "โมเดล LLM เดี่ยวที่ไม่มีการตรวจสอบ" : "Single LLM without verification"}</p>
              </div>
            </div>

            {/* 8D Scoring */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-foreground">
                {isTh ? "การให้คะแนน 8 มิติ (8D)" : "8-Dimensional Scoring (8D)"}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {DIMENSIONS.map((d) => {
                  const t = isTh ? d.th : d.en
                  return (
                    <div key={d.id} className="p-4 rounded-xl border border-border bg-card flex gap-3">
                      <span className={`font-mono text-sm font-bold shrink-0 ${d.color}`}>{d.id}</span>
                      <div>
                        <p className={`text-sm font-bold ${d.color}`}>{t.name}</p>
                        <p className="text-xs text-foreground/60 mt-1 leading-relaxed">{t.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 8-Step Protocol */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-foreground">
                {isTh ? "โปรโตคอล 8 ขั้นตอน" : "8-Step Protocol"}
              </h2>
              <div className="space-y-3">
                {PIPELINE_STEPS.map((step) => {
                  const t = isTh ? step.th : step.en
                  return (
                    <div key={step.id} className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                      <div className="flex flex-col items-center">
                        <span className="font-mono text-xs font-bold text-foreground/40 w-6 text-center">{step.id}</span>
                        <div className="w-px flex-1 bg-border mt-2" />
                      </div>
                      <div className="space-y-1 pb-2">
                        <p className="font-mono text-sm font-bold text-warm-amber">{t.step}</p>
                        <p className="text-sm text-foreground/70 leading-relaxed">{t.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Verification Tiers */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-foreground">
                {isTh ? "4 Verification Tiers" : "4 Verification Tiers"}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {TIERS.map((tier, i) => {
                  const t = isTh ? tier.th : tier.en
                  return (
                    <div
                      key={tier.tier}
                      className={`p-4 rounded-xl border space-y-2 ${i === 3 ? "border-warm-amber/30 bg-warm-amber/5" : "border-border bg-card"}`}
                    >
                      <p className="text-xs font-mono font-bold text-foreground/40">{tier.tier}</p>
                      <p className="font-bold text-foreground text-sm">{t.models}</p>
                      <p className="text-xs text-foreground/60">{t.consensus}</p>
                      <p className={`text-lg font-bold ${i === 3 ? "text-warm-amber" : "text-foreground"}`}>{t.cost}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* SafeGuard */}
            <div className="border border-border bg-card rounded-xl p-6 flex gap-4">
              <ShieldCheck className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground mb-1">{isTh ? "ไม่มี Output ผ่านโดยไม่ได้รับการตรวจสอบ" : "No Output Passes Unverified"}</p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {isTh
                    ? "ซึ่งต่างจากระบบ AI ที่ใช้การตรวจสอบแบบ Optional หรือ Post-hoc ใน SignedAI การตรวจสอบเป็น Gate ที่ Mandatory Output ใดก็ตามที่ล้มเหลวในมิติ D5 (ความปลอดภัย) ถูกปฏิเสธโดยสิ้นเชิง — ไม่ผ่านพร้อม Warning ไม่บันทึกและส่งต่อ ปฏิเสธ"
                    : "Unlike AI systems that use optional or post-hoc verification, in SignedAI verification is a mandatory gate. Any output that fails D5 (Safety) is rejected entirely — not passed with warnings, not logged and forwarded. Rejected."}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="border-t border-border pt-10 grid sm:grid-cols-2 gap-4">
              <Link
                href={`${localePrefix}/genome/codex`}
                className="flex items-center gap-3 p-5 rounded-xl border border-border bg-card hover:border-warm-amber/40 transition-all group"
              >
                <ArrowLeft className="w-4 h-4 text-foreground/30 group-hover:text-warm-amber transition-colors" />
                <div>
                  <p className="text-xs font-mono text-foreground/40">G4</p>
                  <p className="font-bold text-foreground text-sm">RCT Codex Genome</p>
                </div>
              </Link>
              <Link
                href={`${localePrefix}/genome/vault`}
                className="flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-warm-amber/40 transition-all group"
              >
                <div>
                  <p className="text-xs font-mono text-foreground/40">G6</p>
                  <p className="font-bold text-foreground text-sm">RCT Knowledge Vault Genome</p>
                  <p className="text-xs text-foreground/50">{isTh ? "The Knowledge Base — 1,010 Files" : "The Knowledge Base — 1,010 Files"}</p>
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

