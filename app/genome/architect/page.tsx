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

// Round 87 (claims review). This page used to tell a five-phase origin story with dates (2019-2021 on one Android
// phone), "Fortune 500 procurement", "enterprise pilots that failed publicly", "73% of enterprise AI failures" and
// "the 7 Genome System is live". None of that could be checked, and it contradicted the founder's own account on
// the About page. It now tells the story the founder gave: a non-coder from a Khlong Toei flat who studied
// architecture and builds with AI assistants. DRAFT WORDING FOR THE FOUNDER TO EDIT: it is his story, not ours.

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "G1 — Architect's Genome: the founder's story",
    "G1 — Architect's Genome: เรื่องราวของผู้ก่อตั้ง",
    "Who is behind Delentia: a person from a Khlong Toei flat who studied architecture, cannot write code, and builds a governed agent runtime by directing AI assistants.",
    "ใครอยู่เบื้องหลัง Delentia: คนจากแฟลตคลองเตยที่เรียนสถาปัตยกรรม เขียนโค้ดไม่เป็น และสร้างรันไทม์ agent ที่มีธรรมาภิบาลด้วยการสั่งงานผู้ช่วย AI",
    "/genome/architect",
    ["Delentia founder", "Architect's Genome", "Khlong Toei", "built with AI assistants"]
  )
}

type Row = { en: string; th: string }

const STORY: { id: string; title: Row; body: Row }[] = [
  {
    id: "1",
    title: { en: "Where it starts", th: "จุดเริ่มต้น" },
    body: {
      en: "I grew up in a flat community in Khlong Toei, Bangkok. Living close together, you learn to read a place by its patterns: who depends on whom, what breaks first, and what holds when pressure comes. I later studied at a Faculty of Architecture. The four-year programme took me six and a half years, and the lesson was similar: a structure has to carry its load before it can be anything else. Before this project I ran four businesses of my own.",
      th: "ผมเติบโตในชุมชนแฟลตคลองเตย กรุงเทพฯ การอยู่ใกล้กันทำให้ได้เรียนรู้การอ่านสถานที่จากรูปแบบ ใครพึ่งใคร อะไรพังก่อน และอะไรยังอยู่เมื่อถูกกดดัน ต่อมาผมเรียนที่คณะสถาปัตยกรรมศาสตร์ หลักสูตร 4 ปีที่ผมใช้เวลา 6 ปีครึ่ง และบทเรียนก็คล้ายกัน คือโครงสร้างต้องรับน้ำหนักของมันได้ก่อนจะเป็นอย่างอื่น ก่อนโปรเจกต์นี้ผมทำธุรกิจของตัวเอง 4 อย่าง",
    },
  },
  {
    id: "2",
    title: { en: "From a life equation to a safety gate", th: "จากสมการชีวิตสู่ด่านความปลอดภัย" },
    body: {
      en: "FDIA began as a way of thinking about my own life, not about software: a future exists only when someone takes responsibility for it. When I started working with AI, the same idea became a rule for machines: if no accountable human has approved an action, the action does not run.",
      th: "FDIA เริ่มจากวิธีคิดเรื่องชีวิตของผมเอง ไม่ใช่เรื่องซอฟต์แวร์ อนาคตจะเกิดขึ้นได้ก็ต่อเมื่อมีใครสักคนรับผิดชอบ เมื่อผมเริ่มทำงานกับ AI แนวคิดเดียวกันกลายเป็นกฎสำหรับเครื่องจักร หากไม่มีมนุษย์ที่รับผิดชอบอนุมัติ การกระทำนั้นก็ไม่รัน",
    },
  },
  {
    id: "3",
    title: { en: "I do not write code", th: "ผมเขียนโค้ดไม่เป็น" },
    body: {
      en: "I cannot write code. Delentia is built by directing AI coding assistants and checking what they produce. That is the reason tests, measurements and a public list of withdrawn claims matter so much here: the person directing the work cannot read every line, so the system has to be checkable by other people. If you can read code, please check it.",
      th: "ผมเขียนโค้ดไม่เป็น Delentia ถูกสร้างด้วยการสั่งงานผู้ช่วยเขียนโค้ด AI และตรวจสิ่งที่พวกมันทำ นี่คือเหตุผลที่การทดสอบ การวัดผล และรายการข้ออ้างที่ถอนแล้วสำคัญมากที่นี่ คนที่สั่งงานอ่านโค้ดได้ไม่ครบทุกบรรทัด ระบบจึงต้องให้คนอื่นตรวจสอบได้ หากคุณอ่านโค้ดเป็น ขอให้ช่วยตรวจ",
    },
  },
  {
    id: "4",
    title: { en: "Where it stands", th: "ตอนนี้อยู่ตรงไหน" },
    body: {
      en: "It is early. One person, no outside funding, no customers yet. There is an open-source agent runtime and a public test suite. What has been measured is on the Benchmark page, and so is what has not: nothing has been shown with a capable model yet. I am looking for design partners who will try it on one real workflow and tell me where it fails.",
      th: "ยังอยู่ในระยะเริ่มต้น คนคนเดียว ไม่มีทุนภายนอก ยังไม่มีลูกค้า มีรันไทม์ agent โอเพนซอร์สและชุดทดสอบสาธารณะ สิ่งที่วัดแล้วอยู่ในหน้า Benchmark และสิ่งที่ยังไม่ได้วัดก็อยู่ที่นั่นด้วย ยังไม่มีผลใดกับโมเดลที่เก่งพอ ผมกำลังมองหา design partner ที่จะลองกับงานจริงหนึ่งงานและบอกว่ามันพังตรงไหน",
    },
  },
]


const CHECKS: { what: Row; how: Row }[] = [
  {
    what: { en: "The code exists, and how much", th: "โค้ดมีอยู่จริงและมากแค่ไหน" },
    how: { en: "github.com/delentia-labs/Delentia-OS: 1,141 commits across 80 days, 11 April to 18 October 2026 (the public history; earlier work lived in a private repository).", th: "github.com/delentia-labs/Delentia-OS: 1,141 คอมมิตใน 80 วัน ตั้งแต่ 11 เม.ย. ถึง 18 ต.ค. 2026 (ประวัติของรีโปสาธารณะ งานก่อนหน้าอยู่ในรีโปส่วนตัว)" },
  },
  {
    what: { en: "That AI assistants wrote much of it", th: "ว่าผู้ช่วย AI เขียนโค้ดจำนวนมาก" },
    how: { en: "At least 423 of those 1,141 commits (37%) carry a Co-Authored-By: Claude line. The line was added late, so the real share is higher.", th: "อย่างน้อย 423 จาก 1,141 คอมมิต (37%) มีบรรทัด Co-Authored-By: Claude บรรทัดนี้เพิ่มมาทีหลัง สัดส่วนจริงจึงสูงกว่านี้" },
  },
  {
    what: { en: "Releases", th: "การเผยแพร่รุ่น" },
    how: { en: "pypi.org/project/delentia-os: 2.0.0 on 28 May 2026 to 2.4.0 on 26 October 2026.", th: "pypi.org/project/delentia-os: 2.0.0 วันที่ 28 พ.ค. 2026 ถึง 2.4.0 วันที่ 26 ต.ค. 2026" },
  },
  {
    what: { en: "That the tests pass", th: "ว่าการทดสอบผ่าน" },
    how: { en: "The CI runs on every pull request in the public repository. The Benchmark page lists each result with its method and limits.", th: "CI รันทุก pull request ในรีโปสาธารณะ หน้า Benchmark แจกแจงแต่ละผลพร้อมวิธีวัดและข้อจำกัด" },
  },
  {
    what: { en: "Models I published", th: "โมเดลที่ผมเผยแพร่" },
    how: { en: "huggingface.co/Delentia: the v0.4 repository holds weights; the model cards are my own scripts' results and were not independently reproduced.", th: "huggingface.co/Delentia: รีโป v0.4 มีน้ำหนักโมเดล ส่วนการ์ดโมเดลเป็นผลจากสคริปต์ของผมเองและยังไม่มีผู้ใดทำซ้ำอย่างอิสระ" },
  },
  {
    what: { en: "Where I grew up, my education, the four businesses", th: "ที่ที่ผมโต การศึกษา ธุรกิจทั้งสี่" },
    how: { en: "Only my word. I have not published documents for them and you cannot check them here.", th: "เป็นคำของผมเท่านั้น ผมยังไม่ได้เผยแพร่เอกสารยืนยัน และคุณตรวจจากที่นี่ไม่ได้" },
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
      question: isTh ? "ใครสร้าง Delentia" : "Who builds Delentia?",
      answer: isTh
        ? "อิทธิฤทธิ์ แซ่โง้ว คนจากแฟลตคลองเตยที่เรียนสถาปัตยกรรม เขียนโค้ดไม่เป็น และสร้าง Delentia ด้วยการสั่งงานผู้ช่วยเขียนโค้ด AI เป็นโปรเจกต์ของคนคนเดียวในระยะเริ่มต้น ยังไม่มีลูกค้าและไม่มีทุนภายนอก"
        : "Ittirit Saengow, a person from a Khlong Toei flat who studied architecture, cannot write code, and builds Delentia by directing AI coding assistants. It is an early, one-person project with no customers and no outside funding.",
    },
    {
      question: isTh ? "ทำไมผู้สร้างที่เขียนโค้ดไม่เป็นจึงสำคัญกับระบบนี้" : "Why does it matter that the builder does not write code?",
      answer: isTh
        ? "เพราะผู้สั่งงานอ่านโค้ดได้ไม่ครบ ระบบจึงถูกออกแบบให้คนอื่นตรวจสอบได้: มีชุดทดสอบสาธารณะ หน้า Benchmark ที่ระบุข้อจำกัดของทุกผล และรายการข้ออ้างที่ถอนแล้ว"
        : "Because the person directing the work cannot read every line, the system is designed to be checkable by others: a public test suite, a Benchmark page that states the limits of every result, and a list of withdrawn claims.",
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
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-amber/10 border border-warm-amber/30 text-warm-amber text-xs font-medium">
                  <Dna className="w-3 h-3" /> G1 — WHY
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">{isTh ? "เรื่องราวของผู้ก่อตั้ง" : "The founder's story"}</h1>
              <p className="text-xl text-foreground/70 max-w-2xl">
                {isTh ? "ใครอยู่เบื้องหลัง Delentia และทำไมระบบนี้จึงต้องตรวจสอบได้โดยคนอื่น" : "Who is behind Delentia, and why the system has to be checkable by other people."}
              </p>
            </div>

            <div className="border border-warm-amber/30 bg-warm-amber/5 rounded-xl p-8 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-warm-amber" />
                <span className="text-sm font-semibold text-warm-amber uppercase tracking-widest">{isTh ? "หลักการ" : "Principle"}</span>
              </div>
              <blockquote className="text-lg leading-relaxed text-foreground/85 italic">
                {isTh
                  ? "\"ถ้าไม่มีมนุษย์ที่รับผิดชอบอนุมัติ การกระทำนั้นก็ไม่รัน\""
                  : "\"If no accountable human has approved an action, the action does not run.\""}
              </blockquote>
            </div>

            <div className="space-y-5">
              {STORY.map((item) => (
                <div key={item.id} className="p-6 rounded-xl border border-border bg-card space-y-3">
                  <h2 className="text-lg font-bold text-foreground">{isTh ? item.title.th : item.title.en}</h2>
                  <p className="text-foreground/75 leading-relaxed">{isTh ? item.body.th : item.body.en}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">{isTh ? "สิ่งที่คุณตรวจเองได้ และสิ่งที่เป็นแค่คำของผม" : "What you can check yourself, and what is only my word"}</h2>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-card text-left">
                      <th className="p-3 font-semibold text-foreground">{isTh ? "เรื่อง" : "Claim"}</th>
                      <th className="p-3 font-semibold text-foreground">{isTh ? "ตรวจได้อย่างไร" : "How to check it"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CHECKS.map((row) => (
                      <tr key={row.what.en} className="border-t border-border align-top">
                        <td className="p-3 text-foreground/80">{isTh ? row.what.th : row.what.en}</td>
                        <td className="p-3 text-muted-foreground">{isTh ? row.how.th : row.how.en}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground">
                {isTh ? "ตัวเลขนับ ณ วันที่ 18 ต.ค. 2026 จากประวัติ git ของรีโปสาธารณะ ประวัติ git ไม่ได้แยกงานคนกับงาน AI ทีละบรรทัด" : "Counted on 18 October 2026 from the public repositories' git history. Git history does not separate human work from AI work line by line."}
              </p>
            </div>

            <div className="border-t border-border pt-10">
              <h2 className="text-sm font-semibold text-foreground/50 uppercase tracking-widest mb-5">{isTh ? "Genome ถัดไป" : "Next Genome"}</h2>
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
                { href: `${localePrefix}/about`, title: isTh ? "เกี่ยวกับเรา" : "About", description: isTh ? "เส้นทางของผู้ก่อตั้งและโปรเจกต์" : "The founder's path and the project.", category: "About" },
                { href: `${localePrefix}/benchmark`, title: isTh ? "สิ่งที่วัดแล้ว" : "What is measured", description: isTh ? "ทุกผลพร้อมวิธีวัดและข้อจำกัด" : "Every result with its method and limits.", category: "Evidence" },
                { href: `${localePrefix}/genome`, title: isTh ? "7 Genome System" : "7 Genome System", description: isTh ? "สำรวจ Genome ทั้ง 7 ตัว" : "Explore all 7 Genomes.", category: "Genome" },
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
