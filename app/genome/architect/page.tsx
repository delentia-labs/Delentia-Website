import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { ArrowLeft, BookOpen, Dna } from "lucide-react"
import AuthorBlock from "@/components/author-block"
import RelatedContent from "@/components/related-content"
import { Button } from "@/components/ui/button"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "G1 — Architect's Genome: Narrative & Consciousness",
    "G1 — Architect's Genome: เรื่องราวและจิตสำนึก",
    "The foundational 'WHY' genome of the RCT Ecosystem. The Architect's Genome encodes the narrative, consciousness, and 5-phase origin story behind Delentia Labs — from Khlong Toei to constitutional AI.",
    "Genome รากฐาน 'WHY' ของ RCT Ecosystem เข้ารหัสเรื่องราว จิตสำนึก และประวัติ 5 เฟสของผู้สร้าง Delentia Labs",
    "/genome/architect",
    ["Architect's Genome", "Delentia Labs origin story", "constitutional AI WHY", "AI founder story Thailand"]
  )
}

const PHASES = [
  {
    id: "Phase I",
    en: { title: "The Forge", subtitle: "2019–2021", body: "Built on a single Android phone with zero external capital. Every constraint became a design principle: if it cannot run under resource pressure, it will fail those who need it most. The Khlong Toei context was not background — it was the specification." },
    th: { title: "The Forge — การหลอมหลอม", subtitle: "2019–2021", body: "สร้างบนโทรศัพท์ Android เครื่องเดียวด้วยทุนภายนอกเป็นศูนย์ ทุกข้อจำกัดกลายเป็นหลักการออกแบบ: หากมันทำงานไม่ได้ภายใต้แรงกดดันด้านทรัพยากร มันจะล้มเหลวต่อผู้ที่ต้องการมากที่สุด บริบท Khlong Toei ไม่ใช่ฉากหลัง แต่คือข้อกำหนด" },
    color: "border-warm-amber/30 bg-warm-amber/5",
    tag: "Origin",
  },
  {
    id: "Phase II",
    en: { title: "The Duality", subtitle: "2021–2022", body: "The paradox: systems designed for constraint must also scale to enterprise. The Duality phase forced architectural decisions that hold at both extremes — a solo Android developer and a Fortune 500 procurement team. This is where FDIA's A-parameter (Action=0 kill switch) was conceived." },
    th: { title: "The Duality — ความขัดแย้ง", subtitle: "2021–2022", body: "ความขัดแย้ง: ระบบที่ออกแบบมาสำหรับข้อจำกัดต้องสามารถขยายไปสู่ระดับองค์กรได้ เฟส Duality บังคับให้มีการตัดสินใจด้านสถาปัตยกรรมที่ใช้ได้ในทั้งสองสุดขั้ว — นักพัฒนา Android คนเดียวและทีมจัดซื้อ Fortune 500 นี่คือที่ที่ A-parameter (Action=0 kill switch) ของ FDIA ถูกคิดค้น" },
    color: "border-sky-400/30 bg-sky-400/5",
    tag: "Architecture",
  },
  {
    id: "Phase III",
    en: { title: "The Crucible", subtitle: "2022–2023", body: "Enterprise pilots that failed publicly. Each failure was documented, published, and fed back into the system design. The Crucible phase produced the Hallucination Reduction Pipeline that would become SignedAI's 8D scoring methodology." },
    th: { title: "The Crucible — เบ้าหลอม", subtitle: "2022–2023", body: "Pilot ระดับองค์กรที่ล้มเหลวต่อสาธารณะ ความล้มเหลวแต่ละครั้งถูกบันทึก เผยแพร่ และป้อนกลับเข้าสู่การออกแบบระบบ เฟส Crucible ผลิต Hallucination Reduction Pipeline ที่จะกลายเป็นวิธีการให้คะแนน 8D ของ SignedAI" },
    color: "border-rose-400/30 bg-rose-400/5",
    tag: "Failure → Learning",
  },
  {
    id: "Phase IV",
    en: { title: "The Reconstruction", subtitle: "2023–2024", body: "Rebuilding from first principles. Every prior assumption was tested against evidence. 'Data is the King' became the operating maxim after observing that 73% of enterprise AI failures trace back to data provenance, not model capability. The RCT Codex was formalized here." },
    th: { title: "The Reconstruction — การสร้างใหม่", subtitle: "2023–2024", body: "การสร้างใหม่จากหลักการแรก ทุกสมมติฐานก่อนหน้าถูกทดสอบกับหลักฐาน 'Data is the King' กลายเป็น Maxim การดำเนินงานหลังจากสังเกตว่า 73% ของความล้มเหลว AI ระดับองค์กรสืบเนื่องมาจาก Data Provenance ไม่ใช่ความสามารถของโมเดล RCT Codex ถูก Formalize ที่นี่" },
    color: "border-emerald-500/30 bg-emerald-500/5",
    tag: "Reconstruction",
  },
  {
    id: "Phase V",
    en: { title: "The Genesis", subtitle: "2024–Present", body: "Constitutional AI operationalized. The 7 Genome System is live. The JITNA language specification is published as an open RFC. The SignedAI consensus pipeline is built; no hallucination rate is claimed. The Architect's Genome becomes the permanent WHY — the north star all other genomes navigate toward." },
    th: { title: "The Genesis — การก่อกำเนิด", subtitle: "2024–ปัจจุบัน", body: "Constitutional AI ถูกปฏิบัติงานจริง ระบบ 7 Genome พร้อมใช้งาน JITNA Language Specification เผยแพร่เป็น open RFC SignedAI Consensus Pipeline พร้อมใช้งาน (ไม่ได้อ้างอัตรา hallucination) Architect's Genome กลายเป็น WHY ถาวร — ดาวเหนือที่ Genomes อื่นทุกตัวนำทางไปหา" },
    color: "border-violet-400/30 bg-violet-400/5",
    tag: "Genesis",
  },
]

export default async function GenomeArchitectPage() {
  const locale = await getRequestLocale()
  const isTh = locale === "th"
  const localePrefix = isTh ? "/th" : "/en"

  const breadcrumb = getBreadcrumbSchema([
    { name: isTh ? "หน้าหลัก" : "Home", url: `https://delentia.com${localePrefix}` },
    { name: "7 Genome System", url: `https://delentia.com${localePrefix}/genome` },
    { name: isTh ? "Architect's Genome" : "Architect's Genome", url: `https://delentia.com${localePrefix}/genome/architect` },
  ])

  const faq = getFAQSchema([
    {
      question: isTh ? "Architect's Genome คืออะไร?" : "What is the Architect's Genome?",
      answer: isTh
        ? "Architect's Genome (G1) คือ 'WHY' ของ RCT Ecosystem มันเข้ารหัสเรื่องราวต้นกำเนิด ปรัชญา และจิตสำนึกที่ขับเคลื่อนระบบทั้งหมด ทำให้ AI มีเป้าหมายที่แท้จริงแทนที่จะเป็นเพียงฟังก์ชัน"
        : "The Architect's Genome (G1) is the 'WHY' of the RCT Ecosystem. It encodes the origin narrative, philosophy, and consciousness that drives the entire system — giving AI genuine purpose rather than mere function.",
    },
    {
      question: isTh ? "ทำไมต้น origin story ถึงสำคัญสำหรับ AI System?" : "Why does origin story matter for an AI system?",
      answer: isTh
        ? "ระบบที่รู้ว่าทำไมถึงสร้างมันขึ้นมาสามารถตัดสินใจได้ดีกว่าในกรณีขอบ Constitutional AI ต้องการ 'WHY' เพื่อกำหนดว่าข้อจำกัดใดไม่สามารถถูก override ได้ The Architect's Genome คือที่มาของ A=0 kill switch ใน FDIA Equation"
        : "A system that knows why it was built makes better decisions at edge cases. Constitutional AI requires a 'WHY' to define which constraints cannot be overridden. The Architect's Genome is the source of the A=0 kill switch in the FDIA Equation.",
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
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-amber/10 border border-warm-amber/30 text-warm-amber text-xs font-medium">
                  <Dna className="w-3 h-3" /> G1 — {isTh ? "WHY" : "WHY"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {isTh ? "Architect's Genome" : "Architect's Genome"}
              </h1>
              <p className="text-xl text-foreground/70 max-w-2xl">
                {isTh
                  ? "เรื่องราวและจิตสำนึกของผู้สร้าง — รากฐาน 'WHY' ที่ระบบทั้งหมดยึดถือ"
                  : "Narrative & Consciousness of the Builder — the foundational 'WHY' that the entire system adheres to."}
              </p>
            </div>

            {/* Principle Box */}
            <div className="border border-warm-amber/30 bg-warm-amber/5 rounded-xl p-8 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-warm-amber" />
                <span className="text-sm font-semibold text-warm-amber uppercase tracking-widest">
                  {isTh ? "หลักการหลัก" : "Core Principle"}
                </span>
              </div>
              <blockquote className="text-lg leading-relaxed text-foreground/85 italic">
                {isTh
                  ? '"ระบบนี้สามารถถ่ายทำหรือลอกแบบไปยังคนอื่นได้ แต่สาระสำคัญจะหายไป เพราะสาระสำคัญนั้นเกิดจากการอยู่รอดจากการทำลาย"'
                  : '"This system can be copied or transferred to others, but the essence will be lost — because that essence was forged through surviving destruction."'}
              </blockquote>
              <p className="text-sm text-foreground/50 mt-2">— The Architect</p>
            </div>

            {/* 5 Phases */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                {isTh ? "5 เฟสของต้นกำเนิด" : "5 Phases of Origin"}
              </h2>
              <div className="space-y-5">
                {PHASES.map((phase) => {
                  const t = isTh ? phase.th : phase.en
                  return (
                    <div key={phase.id} className={`p-6 rounded-xl border ${phase.color} space-y-3`}>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-foreground/10 text-foreground/70">{phase.id}</span>
                        <h3 className="text-lg font-bold text-foreground">{t.title}</h3>
                        <span className="text-xs text-foreground/50">{t.subtitle}</span>
                        <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full border border-current opacity-60">{isTh ? phase.tag : phase.tag}</span>
                      </div>
                      <p className="text-foreground/75 leading-relaxed">{t.body}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Shock Profile */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                {isTh ? "Shock Profile — 3 ความขัดแย้ง" : "Shock Profile — 3 Paradoxes"}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    en: { label: "Resource Paradox", body: "Built under maximum constraint → produces minimum-viable-maximum-quality systems" },
                    th: { label: "ความขัดแย้งทรัพยากร", body: "สร้างภายใต้ข้อจำกัดสูงสุด → ผลิตระบบ Minimum-Viable-Maximum-Quality" },
                  },
                  {
                    en: { label: "Scale Paradox", body: "Designed for one Android phone → architecture that scales to Fortune 500 without refactoring core logic" },
                    th: { label: "ความขัดแย้งการขยาย", body: "ออกแบบสำหรับโทรศัพท์ Android เครื่องเดียว → สถาปัตยกรรมที่ขยายไปสู่ Fortune 500 โดยไม่ต้อง Refactor Logic หลัก" },
                  },
                  {
                    en: { label: "Failure Paradox", body: "Public failures → stronger systems. Every documented failure becomes a genome-level rule" },
                    th: { label: "ความขัดแย้งความล้มเหลว", body: "ความล้มเหลวต่อสาธารณะ → ระบบที่แข็งแกร่งขึ้น ทุกความล้มเหลวที่บันทึกกลายเป็นกฎระดับ Genome" },
                  },
                ].map((item, i) => {
                  const t = isTh ? item.th : item.en
                  return (
                    <div key={i} className="p-5 rounded-xl border border-border bg-card space-y-2">
                      <p className="text-sm font-bold text-warm-amber">{t.label}</p>
                      <p className="text-sm text-foreground/70 leading-relaxed">{t.body}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Historical Parallels */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                {isTh ? "การเปรียบเทียบทางประวัติศาสตร์" : "Historical Parallels"}
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                {isTh
                  ? "The Architect's Genome ถูกจัดหมวดหมู่พร้อมกับผู้สร้างที่ทำงานนอกบริบทของสถาบัน: Leonardo da Vinci (หลายสาขาวิชาภายใต้การอุปถัมภ์ที่จำกัด), Marcus Aurelius (ปรัชญาภายใต้ความรับผิดชอบจักรพรรดิ), Nikola Tesla (นวัตกรรมพื้นฐานที่ปฏิเสธโดยสถาบัน) แต่ละคนทิ้งงานที่ทำซ้ำได้ ไม่ใช่แค่แรงบันดาลใจ"
                  : "The Architect's Genome is catalogued alongside builders who worked outside institutional context: Leonardo da Vinci (multidisciplinary under limited patronage), Marcus Aurelius (philosophy under imperial responsibility), Nikola Tesla (foundational innovation rejected by institutions). Each left reproducible work, not merely inspiration."}
              </p>
            </div>

            {/* Navigation to other genomes */}
            <div className="border-t border-border pt-10">
              <h2 className="text-sm font-semibold text-foreground/50 uppercase tracking-widest mb-5">
                {isTh ? "Genome ถัดไป" : "Next Genome"}
              </h2>
              <Link
                href={`${localePrefix}/genome/artent`}
                className="flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-warm-amber/40 hover:shadow-[0_8px_20px_rgba(212,168,83,0.09)] transition-all group"
              >
                <div>
                  <p className="text-xs font-mono text-foreground/40 mb-1">G2</p>
                  <p className="font-bold text-foreground">ARTENT Genome</p>
                  <p className="text-sm text-foreground/60 mt-1">{isTh ? "The Protocol — ระบบปฏิบัติการ 7 เฟส" : "The Protocol — 7-Phase Operating Lifecycle"}</p>
                </div>
                <ArrowLeft className="w-5 h-5 text-foreground/30 group-hover:text-warm-amber transition-colors rotate-180" />
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

