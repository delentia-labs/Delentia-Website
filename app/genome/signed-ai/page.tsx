import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import Link from "next/link"
import { ArrowLeft, Dna } from "lucide-react"
import { Button } from "@/components/ui/button"

// Round 87 (claims review). This page used to describe eight scoring dimensions, a seven-model "HexaCore" pipeline,
// per-tier prices and a "Tier-4 consensus pipeline" as if they ran. In the code there is a jury runner (independent
// votes, signed verdict), tested with scripted voters; the eight-dimension scoring, the model roster and the prices
// are design ideas. This page separates the two.

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "G5 — SignedAI Genome: verification by independent votes",
    "G5 — SignedAI Genome: การตรวจสอบด้วยการลงคะแนนอิสระ",
    "G5 in the Delentia design is verification by independent votes. What is built: a jury runner with a signed verdict, tested with scripted voters. What is only a design idea: eight scoring dimensions, a fixed model roster and tier prices.",
    "G5 ในการออกแบบของ Delentia คือการตรวจสอบด้วยการลงคะแนนอิสระ สิ่งที่สร้างแล้ว: ตัวรันคณะลูกขุนพร้อมคำตัดสินที่ลงนาม ทดสอบกับผู้ลงคะแนนแบบสคริปต์ สิ่งที่เป็นเพียงแนวคิด: การให้คะแนน 8 มิติ รายชื่อโมเดลตายตัว และราคาตามระดับ",
    "/genome/signed-ai",
    ["SignedAI", "genome G5", "independent votes", "signed verdict"]
  )
}

type Row = { en: string; th: string }

const built: Row[] = [
  { en: "A jury runner: independent members vote agree, disagree or abstain; abstentions never help a proposal pass.", th: "ตัวรันคณะลูกขุน: สมาชิกอิสระลงคะแนนเห็นด้วย ไม่เห็นด้วย หรืองดออกเสียง การงดออกเสียงไม่ช่วยให้ข้อเสนอผ่าน" },
  { en: "A verdict record with a SHA-256 digest, optionally signed with Ed25519, that anyone can re-check.", th: "ระเบียนคำตัดสินพร้อม SHA-256 ลงนามด้วย Ed25519 ได้ และใครก็ตรวจซ้ำได้" },
  { en: "A rule that one model voting several times is one opinion, not a jury.", th: "กติกาว่าโมเดลเดียวลงคะแนนหลายครั้งนับเป็นความเห็นเดียว ไม่ใช่คณะลูกขุน" },
]

const designOnly: Row[] = [
  { en: "Scoring each answer on eight dimensions (accuracy, relevance, coherence and so on). Not implemented.", th: "การให้คะแนนคำตอบ 8 มิติ (ความถูกต้อง ความเกี่ยวข้อง ความสอดคล้อง ฯลฯ) ยังไม่ได้สร้าง" },
  { en: "A fixed roster of seven models spread over geopolitical zones. No such roster runs; you choose your own members.", th: "รายชื่อโมเดลตายตัว 7 ตัวกระจายตามเขตภูมิรัฐศาสตร์ ไม่มีรายชื่อดังกล่าวทำงานอยู่ ผู้ใช้เลือกสมาชิกเอง" },
  { en: "Per-review prices by tier. There is no hosted service and no price.", th: "ราคาต่อการรีวิวตามระดับ ไม่มีบริการโฮสต์และไม่มีราคา" },
  { en: "Any claim that voting reduces hallucination. No such measurement exists.", th: "ข้ออ้างว่าการลงคะแนนลด hallucination ไม่มีการวัดใด ๆ ที่รองรับ" },
]

export default async function SignedAIGenomePage() {
  const locale = await getRequestLocale()
  const isTh = locale === "th"
  const localePrefix = isTh ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Genome", url: `https://delentia.com${localePrefix}/genome` },
    { name: "G5 SignedAI", url: `https://delentia.com${localePrefix}/genome/signed-ai` },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <main className="min-h-screen bg-background">
        <Navbar />

        <section className="mx-auto max-w-4xl px-4 py-24">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href={`${localePrefix}/genome`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isTh ? "กลับไป 7 Genome System" : "Back to 7 Genome System"}
            </Link>
          </Button>

          <article className="space-y-10">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-400/10 border border-rose-400/30 text-rose-400 text-xs font-medium">
                <Dna className="w-3 h-3" /> G5
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {isTh ? "SignedAI: การตรวจสอบด้วยการลงคะแนนอิสระ" : "SignedAI: verification by independent votes"}
              </h1>
              <p className="text-muted-foreground">
                {isTh
                  ? "ในการออกแบบของ Delentia G5 คือแนวคิดว่าคำตอบสำคัญควรผ่านการตรวจจากหลายผู้ตัดสินอิสระ และมีคำตัดสินที่ลงนามไว้ตรวจซ้ำ หน้านี้แยกสิ่งที่สร้างแล้วออกจากสิ่งที่ยังเป็นแนวคิด"
                  : "In the Delentia design, G5 is the idea that an important answer should be checked by several independent judges and leave a signed verdict that can be re-checked. This page separates what is built from what is still an idea."}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-lg font-bold mb-4 text-foreground">{isTh ? "สร้างและทดสอบแล้ว" : "Built and tested"}</h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {built.map((row) => (
                    <li key={row.en}>{isTh ? row.th : row.en}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  {isTh
                    ? "ทดสอบกับผู้ลงคะแนนแบบสคริปต์เท่านั้น ยังไม่เคยลงคะแนนจริงข้ามผู้ให้บริการ"
                    : "Tested with scripted voters only; no real multi-vendor vote has been run."}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-lg font-bold mb-4 text-foreground">{isTh ? "เป็นเพียงแนวคิด / ยังไม่ได้สร้าง" : "Design idea only / not built"}</h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {designOnly.map((row) => (
                    <li key={row.en}>{isTh ? row.th : row.en}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href={`${localePrefix}/products/signed-ai`}>{isTh ? "ดูตัวรันคณะลูกขุน" : "See the jury runner"}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`${localePrefix}/benchmark`}>{isTh ? "ดูสิ่งที่วัดแล้ว" : "See what is measured"}</Link>
              </Button>
            </div>
          </article>
        </section>

        <Footer />
      </main>
    </>
  )
}
