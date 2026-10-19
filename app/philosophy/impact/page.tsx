import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { User2, FlaskConical, Award, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Impact — What Delentia Labs Has Proven",
    "ผลกระทบ — สิ่งที่ Delentia Labs พิสูจน์แล้ว",
    "Delentia Labs real-world impact: a solo-developer constitutional AI program, separated public SDK verified and enterprise private snapshot evidence lanes, and Thailand-to-global governance standards.",
    "ผลกระทบจริงของ Delentia Labs: โครงการ Constitutional AI โดยนักพัฒนาคนเดียว พร้อมการแยก evidence lane ระหว่าง public SDK verified และ enterprise private snapshot และมาตรฐาน governance จากไทยสู่โลก",
    "/philosophy/impact"
  )
}

export default async function ImpactPage() {
  const locale = await getRequestLocale()
  const isEn = locale === "en"
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Philosophy", url: `https://delentia.com${localePrefix}/philosophy` },
    { name: "Impact", url: `https://delentia.com${localePrefix}/philosophy/impact` },
  ])
  const faq = getFAQSchema([
    {
      question: isEn ? "Are benchmark numbers formally validated?" : "ตัวเลข benchmark ผ่านการรับรองอย่างเป็นทางการหรือยัง?",
      answer: isEn
        ? "Projected ranges are labeled explicitly as pending formal leaderboard validation until official submission is complete."
        : "ช่วงคะแนนที่เป็น projection จะระบุชัดเจนว่า pending formal leaderboard validation จนกว่าจะส่งอย่างเป็นทางการ",
    },
    {
      question: isEn ? "What makes the impact claims verifiable?" : "อะไรทำให้ impact claims ตรวจสอบได้?",
      answer: isEn
        ? "Claims are tied to documented tests, release records, and publicly inspectable architecture decisions."
        : "ทุกคำอ้างผูกกับเอกสารทดสอบ ประวัติรีลีส และการตัดสินใจสถาปัตยกรรมที่ตรวจสอบได้สาธารณะ",
    },
  ])

  const pillars = [
    {
      icon: User2,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      titleEn: "Solo-Developer Proof of Possibility",
      titleTh: "Solo-Developer Proof of Possibility",
      descEn:
        "One person who does not write code, directing AI coding assistants. The result so far: an open-source agent runtime whose public repository CI runs 7,820 automated tests. What it shows is narrow: one person can build and test a governed agent runtime this way. It does not show that the runtime works well with a capable model or for other people; that has not been measured yet.",
      descTh:
        "คนคนเดียวที่เขียนโค้ดไม่เป็น สั่งงานผู้ช่วยเขียนโค้ด AI ผลลัพธ์จนถึงตอนนี้: รันไทม์ agent โอเพนซอร์สที่ CI ของรีโพสาธารณะรันการทดสอบอัตโนมัติ 7,820 รายการ สิ่งที่แสดงได้แคบ: คนคนเดียวสร้างและทดสอบรันไทม์ agent ที่มีธรรมาภิบาลด้วยวิธีนี้ได้ ไม่ได้แสดงว่ารันไทม์ทำงานดีกับโมเดลที่เก่งพอหรือสำหรับคนอื่น ซึ่งยังไม่ได้วัด",
    },
    {
      icon: FlaskConical,
      color: "text-sky-500",
      bg: "bg-sky-500/10",
      titleEn: "Evidence-Culture Discipline",
      titleTh: "วัฒนธรรม Evidence-Culture",
      descEn:
        "The public repository CI covers 7,820 automated tests across unit, integration, and end-to-end layers. Backend-validated coverage sits at 66.7% with a public 100% target. The test count is not a vanity metric — it is the organization's commitment to evidence culture, visible and trackable from day one.",
      descTh:
        "public repository CI ครอบคลุมการทดสอบอัตโนมัติ 7,820 รายการในชั้น unit, integration และ end-to-end โดยมี backend-validated coverage 66.7% และเป้าหมายสาธารณะ 100% จำนวนการทดสอบไม่ใช่ตัวชี้วัดความภาคภูมิใจ — มันคือความมุ่งมั่นขององค์กรต่อ evidence culture ที่มองเห็นและติดตามได้ตั้งแต่วันแรก",
    },
    {
      icon: Award,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      titleEn: "GAIA Benchmark Performance",
      titleTh: "ประสิทธิภาพ GAIA Benchmark",
      descEn:
        "No GAIA or other leaderboard score is claimed. An earlier version of this page quoted a projected range, which had no measurement behind it and has been removed. A result will be published only after it has been measured and submitted.",
      descTh:
        "ไม่อ้างคะแนน GAIA หรือ leaderboard ใด ๆ หน้านี้เคยอ้างช่วงคะแนนที่คาดการณ์ ซึ่งไม่มีการวัดรองรับและถูกถอนแล้ว จะเผยแพร่ผลก็ต่อเมื่อวัดและส่งอย่างเป็นทางการแล้ว",
    },
    {
      icon: Globe,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      titleEn: "Thailand → Global Constitutional AI Standard",
      titleTh: "จากไทย → มาตรฐาน Constitutional AI ระดับโลก",
      descEn:
        "Delentia began in Bangkok. The aim is a governance layer whose rules the owner writes (a data-residency policy, who signs what), so that the same runtime can be used under different national rules. It does not know any country's law and certifies no compliance; that remains the owner's and their counsel's job.",
      descTh:
        "Delentia เริ่มต้นในกรุงเทพฯ เป้าหมายคือชั้นธรรมาภิบาลที่เจ้าของเขียนกฎเอง (นโยบายที่เก็บข้อมูล ใครลงนามอะไร) เพื่อให้รันไทม์เดียวกันใช้ภายใต้กฎของแต่ละประเทศได้ ระบบไม่รู้กฎหมายของประเทศใดและไม่รับรองการปฏิบัติตามกฎหมาย นั่นยังเป็นหน้าที่ของเจ้าของและที่ปรึกษากฎหมายของเขา",
    },
  ]

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <main className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-5xl px-4 py-24">
        <Link
          href={`${localePrefix}/philosophy`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition"
        >
          <span>←</span>
          <span>{isEn ? "Back to Philosophy" : "กลับสู่ Philosophy"}</span>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {isEn ? "Impact at Delentia Labs" : "ผลกระทบของ Delentia Labs"}
        </h1>
        <p className="text-xl text-muted-foreground mb-16 max-w-3xl">
          {isEn
            ? "What Delentia Labs has already proven — in working code, passing tests, and documented benchmarks."
            : "สิ่งที่ Delentia Labs พิสูจน์แล้ว — ในโค้ดที่ใช้งานได้ การทดสอบที่ผ่าน และ benchmark ที่มีเอกสาร"}
        </p>

        <div className="grid gap-8 md:gap-10">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <article key={i} className="flex gap-6">
                <div className={`shrink-0 w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${p.color}`} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">{isEn ? p.titleEn : p.titleTh}</h2>
                  <p className="text-muted-foreground leading-relaxed">{isEn ? p.descEn : p.descTh}</p>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-20 p-8 rounded-2xl bg-muted/40 border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {isEn ? "Review the Evidence" : "ตรวจสอบหลักฐาน"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {isEn
              ? "Every claim on this page is backed by documented benchmarks, test suites, and public specifications."
              : "ทุกข้อเรียกร้องในหน้านี้มี benchmark ที่มีเอกสาร test suite และ specification สาธารณะรองรับ"}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href={`${localePrefix}/benchmark`}>{isEn ? "View Benchmarks" : "ดู Benchmark"}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`${localePrefix}/philosophy/fdia`}>{isEn ? "FDIA Framework" : "กรอบ FDIA"}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`${localePrefix}/whitepaper`}>{isEn ? "Whitepaper" : "Whitepaper"}</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
    </>
  )
}

