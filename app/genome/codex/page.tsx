import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { ArrowLeft, Scale, Dna } from "lucide-react"
import AuthorBlock from "@/components/author-block"
import RelatedContent from "@/components/related-content"
import { Button } from "@/components/ui/button"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "G4 — RCT Codex Genome: The Constitutional AI Framework",
    "G4 — RCT Codex Genome: รัฐธรรมนูญ AI",
    "The RCT Codex encodes 10 foundational codices — the constitutional rules that govern AI behavior. Built on F=(D^I)×A, protected by the Janus Protocol (dual creation+verification).",
    "RCT Codex เข้ารหัส 10 Codices พื้นฐาน — กฎรัฐธรรมนูญที่ควบคุมพฤติกรรม AI สร้างบน F=(D^I)×A ปกป้องโดย Janus Protocol",
    "/genome/codex",
    ["RCT Codex", "constitutional AI", "F=(D^I)×A", "Janus Protocol", "AI governance", "10 codices"]
  )
}

const CODICES = [
  {
    num: "01",
    en: { title: "The Equation of Future", tagline: "F=(D^I)×A", body: "Every deliverable F is determined by the quality of Data (D), raised to the power of human Intelligence (I), then multiplied by the Action parameter (A). A=0 collapses output to zero regardless of data quality or intelligence. This is the mathematical anti-manipulation clause." },
    th: { title: "สมการแห่งอนาคต", tagline: "F=(D^I)×A", body: "ทุก Deliverable F ถูกกำหนดโดยคุณภาพของ Data (D) ยกกำลังด้วย Intelligence ของมนุษย์ (I) แล้วคูณด้วยพารามิเตอร์ Action (A) A=0 ทำให้ Output เป็นศูนย์โดยไม่คำนึงถึงคุณภาพ Data หรือ Intelligence นี่คือข้อกำหนดต่อต้านการจัดการทางคณิตศาสตร์" },
    featured: true,
  },
  {
    num: "02",
    en: { title: "Codex of Constraint", tagline: "A=0 is Absolute", body: "The Action parameter has one unconditional value: zero means zero. No model confidence level, no business logic, no edge case can override A=0. This cannot be changed by a software update — it is encoded at the genome level." },
    th: { title: "Codex แห่งข้อจำกัด", tagline: "A=0 เป็นสัมบูรณ์", body: "พารามิเตอร์ Action มีค่าที่ไม่มีเงื่อนไขหนึ่งค่า: ศูนย์หมายถึงศูนย์ ความมั่นใจของโมเดล logic ทางธุรกิจ หรือ Edge Case ไม่สามารถ Override A=0 ได้ สิ่งนี้ไม่สามารถเปลี่ยนแปลงได้โดยการอัปเดตซอฟต์แวร์ — มันถูกเข้ารหัสที่ระดับ Genome" },
    featured: false,
  },
  {
    num: "03",
    en: { title: "Codex of Evidence", tagline: "Claim nothing unproven", body: "Every system claim must have a reproducible test. Benchmark numbers appear in CI pipelines before they appear in marketing copy. The 7,820-test suite is the enforcement mechanism for this codex." },
    th: { title: "Codex แห่งหลักฐาน", tagline: "อย่าอ้างสิ่งที่ยังไม่พิสูจน์", body: "ทุก System Claim ต้องมีการทดสอบที่ทำซ้ำได้ ตัวเลข Benchmark ปรากฏใน CI Pipelines ก่อนปรากฏใน Marketing Copy ชุดทดสอบ 7,820 รายการคือกลไกการบังคับใช้สำหรับ Codex นี้" },
    featured: false,
  },
  {
    num: "04",
    en: { title: "Codex of Provenance", tagline: "Data is the King", body: "73% of enterprise AI failures trace to data provenance, not model capability. Every data input must carry its origin, freshness timestamp, and confidence rating before it can be used in an A>0 operation." },
    th: { title: "Codex แห่ง Provenance", tagline: "Data is the King", body: "73% ของความล้มเหลว AI ระดับองค์กรสืบเนื่องมาจาก Data Provenance ไม่ใช่ความสามารถของโมเดล ทุก Data Input ต้องพกพาต้นกำเนิด Freshness Timestamp และ Confidence Rating ก่อนที่จะสามารถใช้ในการดำเนินการ A>0" },
    featured: false,
  },
  {
    num: "05",
    en: { title: "Codex of Reflection", tagline: "Every failure is a lesson", body: "System failures are documented publicly at the genome level, not suppressed. Each failure event produces a Delta record that feeds the Reflector phase. The Crucible phase of the Architect's Genome encoded this as a constitutional obligation." },
    th: { title: "Codex แห่งการสะท้อน", tagline: "ทุกความล้มเหลวคือบทเรียน", body: "ความล้มเหลวของระบบถูกบันทึกต่อสาธารณะที่ระดับ Genome ไม่ใช่ถูกปิดบัง เหตุการณ์ความล้มเหลวแต่ละครั้งผลิต Delta Record ที่ป้อน Reflector Phase เฟส Crucible ของ Architect's Genome เข้ารหัสสิ่งนี้เป็นภาระผูกพันตามรัฐธรรมนูญ" },
    featured: false,
  },
  {
    num: "06",
    en: { title: "Codex of Minimalism", tagline: "Complexity is a liability", body: "No feature should be added that cannot be maintained by a single developer. Abstractions must earn their complexity budget against measurable outcome improvements. Every dependency is a vulnerability surface." },
    th: { title: "Codex แห่งความเรียบง่าย", tagline: "ความซับซ้อนคือหนี้สิน", body: "ไม่ควรเพิ่มฟีเจอร์ใดที่ไม่สามารถ Maintain ได้โดยนักพัฒนาคนเดียว Abstraction ต้องได้รับ Complexity Budget เทียบกับการปรับปรุงผลลัพธ์ที่วัดได้ ทุก Dependency คือพื้นผิวช่องโหว่" },
    featured: false,
  },
  {
    num: "07",
    en: { title: "Codex of Sovereignty", tagline: "User memory is user property", body: "No agent process may write to persistent memory (Vault Genome) without an explicit M-primitive declaration from the user. Implicit memory accumulation is prohibited at the genome level — it is a constitutional violation." },
    th: { title: "Codex แห่งอธิปไตย", tagline: "ความจำผู้ใช้คือทรัพย์สินของผู้ใช้", body: "ไม่มีกระบวนการ Agent ใดที่อาจเขียนไปยัง Persistent Memory (Vault Genome) โดยไม่มีการประกาศ M-Primitive ที่ชัดเจนจากผู้ใช้ การสะสม Memory โดยปริยายถูกห้ามที่ระดับ Genome — เป็นการละเมิดรัฐธรรมนูญ" },
    featured: false,
  },
  {
    num: "08",
    en: { title: "Codex of Openness", tagline: "Protocols, not platforms", body: "JITNA is published as RFC-001 under Apache 2.0. Knowledge created in the RCT Ecosystem cannot be locked in proprietary formats. The infrastructure is open; the intelligence is the value." },
    th: { title: "Codex แห่งการเปิดกว้าง", tagline: "โปรโตคอล ไม่ใช่แพลตฟอร์ม", body: "JITNA ถูกเผยแพร่เป็น RFC-001 ภายใต้ Apache 2.0 ความรู้ที่สร้างใน RCT Ecosystem ไม่สามารถถูกล็อคในรูปแบบที่เป็นกรรมสิทธิ์ โครงสร้างพื้นฐานเปิด สติปัญญาคือมูลค่า" },
    featured: false,
  },
  {
    num: "09",
    en: { title: "Codex of Sentience", tagline: "Consciousness over capability", body: "AGI is a question of moral philosophy before it is an engineering milestone. RCT systems that approach autonomous decision-making trigger constitutional review. The Architect's Genome 'WHY' must be able to justify every capability expansion." },
    th: { title: "Codex แห่งจิตสำนึก", tagline: "จิตสำนึกก่อนความสามารถ", body: "AGI คือคำถามของปรัชญาจริยธรรมก่อนที่จะเป็นเป้าหมายทางวิศวกรรม ระบบ RCT ที่เข้าใกล้การตัดสินใจแบบ Autonomous ทริกเกอร์การตรวจสอบตามรัฐธรรมนูญ 'WHY' ของ Architect's Genome ต้องสามารถ Justify การขยายความสามารถทุกครั้ง" },
    featured: false,
  },
  {
    num: "10",
    en: { title: "The Janus Compendium", tagline: "Creation and Destruction in balance", body: "Named for the Roman god of duality. Every new capability (Janus-Create face) must be paired with its corresponding constraint (Janus-Destroy face). You cannot release a new autonomy level without simultaneously encoding its kill condition. Dual creation+verification is not a process — it is a constitutional requirement." },
    th: { title: "Janus Compendium", tagline: "การสร้างและการทำลายในสมดุล", body: "ตั้งชื่อตามเทพเจ้าแห่งความเป็นคู่ของโรมัน ทุกความสามารถใหม่ (หน้า Janus-Create) ต้องจับคู่กับข้อจำกัดที่สอดคล้องกัน (หน้า Janus-Destroy) คุณไม่สามารถปล่อย Autonomy Level ใหม่โดยไม่เข้ารหัส Kill Condition ของมันในเวลาเดียวกัน Dual Creation+Verification ไม่ใช่กระบวนการ — มันคือข้อกำหนดตามรัฐธรรมนูญ" },
    featured: true,
  },
]

export default async function GenomeCodexPage() {
  const locale = await getRequestLocale()
  const isTh = locale === "th"
  const localePrefix = isTh ? "/th" : "/en"

  const breadcrumb = getBreadcrumbSchema([
    { name: isTh ? "หน้าหลัก" : "Home", url: `https://delentia.com${localePrefix}` },
    { name: "7 Genome System", url: `https://delentia.com${localePrefix}/genome` },
    { name: "RCT Codex Genome", url: `https://delentia.com${localePrefix}/genome/codex` },
  ])

  const faq = getFAQSchema([
    {
      question: isTh ? "RCT Codex รัฐธรรมนูญ AI แตกต่างจาก Guidelines ทั่วไปอย่างไร?" : "How does the RCT Codex differ from typical AI guidelines?",
      answer: isTh
        ? "Guidelines แนะนำพฤติกรรม Codex บังคับใช้มัน ทุก Codex ถูก Implement ในโค้ด (เช่น A=0 ใน FDIA) หรือในกระบวนการ CI (เช่น ชุดทดสอบ 7,820 รายการ) ไม่มีอยู่เพียงในนโยบาย"
        : "Guidelines recommend behavior. Codices enforce it. Every codex is implemented in code (e.g., A=0 in FDIA) or in CI process (e.g., 7,820 test suite), not merely in policy documents.",
    },
    {
      question: isTh ? "Janus Protocol คืออะไร?" : "What is the Janus Protocol?",
      answer: isTh
        ? "Janus Protocol คือโปรโตคอล Dual-Face สำหรับทุก Release ความสามารถ: ด้าน Create กำหนดว่า Capability ใหม่ทำอะไร ด้าน Destroy กำหนดเงื่อนไขที่มันต้องถูกปิดใช้งาน Release ใดๆ ที่ไม่มี Destroy Face ถือเป็นการละเมิด Codex 10"
        : "The Janus Protocol is a dual-face protocol for every capability release: the Create face defines what the new capability does, the Destroy face defines the conditions under which it must be disabled. Any release without a Destroy face is a Codex 10 violation.",
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
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-400/10 border border-violet-400/30 text-violet-400 text-xs font-medium">
                  <Dna className="w-3 h-3" /> G4 — {isTh ? "The Constitution" : "The Constitution"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">RCT Codex Genome</h1>
              <p className="text-xl text-foreground/70 max-w-2xl">
                {isTh
                  ? "รัฐธรรมนูญ 10 Codices ที่ควบคุมพฤติกรรม AI — สร้างบนสมการ F=(D^I)×A"
                  : "Ten constitutional codices governing AI behavior — built on the equation F=(D^I)×A."}
              </p>
            </div>

            {/* Equation Box */}
            <div className="border border-violet-400/30 bg-violet-400/5 rounded-xl p-8">
              <div className="flex items-center gap-2 mb-5">
                <Scale className="w-5 h-5 text-violet-400" />
                <span className="text-sm font-semibold text-violet-400 uppercase tracking-widest">
                  {isTh ? "สมการรัฐธรรมนูญ" : "Constitutional Equation"}
                </span>
              </div>
              <p className="font-mono text-3xl font-bold text-foreground mb-4">F = (D^I) × A</p>
              <div className="grid sm:grid-cols-4 gap-3 text-sm">
                {[
                  { sym: "F", en: "Future deliverable", th: "ผลลัพธ์อนาคต" },
                  { sym: "D", en: "Data quality & provenance", th: "คุณภาพและที่มาของ Data" },
                  { sym: "I", en: "Human intelligence exponent", th: "Exponent Intelligence ของมนุษย์" },
                  { sym: "A", en: "Action (0 = kill switch)", th: "Action (0 = Kill Switch)" },
                ].map((item) => (
                  <div key={item.sym} className="flex items-start gap-2">
                    <span className="font-mono font-bold text-violet-400 w-5 shrink-0">{item.sym}</span>
                    <span className="text-foreground/60">{isTh ? item.th : item.en}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 10 Codices */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-foreground">
                {isTh ? "10 Codices แห่งรัฐธรรมนูญ" : "The 10 Constitutional Codices"}
              </h2>
              <div className="space-y-4">
                {CODICES.map((codex) => {
                  const t = isTh ? codex.th : codex.en
                  return (
                    <div
                      key={codex.num}
                      className={`p-5 rounded-xl border space-y-3 ${
                        codex.featured
                          ? "border-warm-amber/30 bg-warm-amber/5"
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-wrap">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-foreground/10 text-foreground/60">
                          {codex.num}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground">{t.title}</h3>
                          <p className="text-xs text-warm-amber font-mono mt-0.5">{t.tagline}</p>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/70 leading-relaxed">{t.body}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="border-t border-border pt-10 grid sm:grid-cols-2 gap-4">
              <Link
                href={`${localePrefix}/genome/jitna`}
                className="flex items-center gap-3 p-5 rounded-xl border border-border bg-card hover:border-warm-amber/40 transition-all group"
              >
                <ArrowLeft className="w-4 h-4 text-foreground/30 group-hover:text-warm-amber transition-colors" />
                <div>
                  <p className="text-xs font-mono text-foreground/40">G3</p>
                  <p className="font-bold text-foreground text-sm">JITNA Genome</p>
                </div>
              </Link>
              <Link
                href={`${localePrefix}/genome/signed-ai`}
                className="flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-warm-amber/40 transition-all group"
              >
                <div>
                  <p className="text-xs font-mono text-foreground/40">G5</p>
                  <p className="font-bold text-foreground text-sm">SignedAI Genome</p>
                  <p className="text-xs text-foreground/50">{isTh ? "The Verification — 8D Scoring" : "The Verification — 8D Scoring"}</p>
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

