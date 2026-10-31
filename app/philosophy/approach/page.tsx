import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { ArrowLeft, Zap, FlaskConical, BarChart3, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Approach — How Delentia Labs Designs AI Systems",
    "แนวทาง — วิธีออกแบบระบบ AI ของ Delentia Labs",
    "Delentia Labs engineering approach: reverse component thinking, constraint-as-discipline, FDIA-first design, benchmark-gated delivery, and open protocol philosophy.",
    "แนวทางวิศวกรรมของ Delentia Labs: reverse component thinking, constraint-as-discipline, FDIA-first, benchmark-gated delivery และ open protocol",
    "/philosophy/approach"
  )
}

export default async function ApproachPage() {
  const locale = await getRequestLocale()
  const isEn = locale === "en"
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Philosophy", url: `https://delentia.com${localePrefix}/philosophy` },
    { name: "Approach", url: `https://delentia.com${localePrefix}/philosophy/approach` },
  ])
  const faq = getFAQSchema([
    {
      question: isEn ? "What is Reverse Component Thinking?" : "Reverse Component Thinking คืออะไร?",
      answer: isEn
        ? "It starts from a validated end state and works backward to the minimum components required to deliver that state."
        : "เป็นแนวคิดที่เริ่มจากผลลัพธ์ปลายทางที่ผ่านการยืนยันแล้ว และถอยกลับมาหาชุดคอมโพเนนต์ขั้นต่ำที่จำเป็น",
    },
    {
      question: isEn ? "Why does Delentia Labs use benchmark-gated delivery?" : "ทำไม Delentia Labs ใช้ benchmark-gated delivery?",
      answer: isEn
        ? "To ensure capability claims are tied to measurable evidence before deployment decisions are made."
        : "เพื่อให้การอ้างความสามารถทุกข้อผูกกับหลักฐานที่วัดผลได้ก่อนตัดสินใจปล่อยใช้งาน",
    },
  ])

  const pillars = [
    {
      icon: ArrowLeft,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      titleEn: "Reverse Component Thinking",
      titleTh: "Reverse Component Thinking",
      descEn:
        "We start from the desired future state — a validated, production-ready system — and work backward to the minimal component set required to reach it. This eliminates premature abstraction and keeps the architecture tightly scoped to what has been proven to work.",
      descTh:
        "เราเริ่มจากสถานะในอนาคตที่ต้องการ — ระบบที่ validated และพร้อม production — แล้วทำงานย้อนกลับมาหา component set ขั้นต่ำที่จำเป็น วิธีนี้กำจัด abstraction ก่อนเวลาและทำให้สถาปัตยกรรมมีขอบเขตที่แน่นตามสิ่งที่พิสูจน์แล้วว่าใช้งานได้",
    },
    {
      icon: Zap,
      color: "text-sky-500",
      bg: "bg-sky-500/10",
      titleEn: "Constraint-as-Discipline",
      titleTh: "Constraint-as-Discipline",
      descEn:
        "Mobile-first, zero-dollar infrastructure bootstrap, solo-developer execution — these are not limitations; they are quality probes. If a system cannot be understood and operated by one engineer with no budget, it is too complex. Constraints surface hidden dependencies, force prioritization, and produce leaner, more maintainable systems.",
      descTh:
        "Mobile-first, bootstrap infrastructure ที่ไม่มีค่าใช้จ่าย, solo-developer execution — สิ่งเหล่านี้ไม่ใช่ข้อจำกัด แต่คือตัวตรวจสอบคุณภาพ หากระบบไม่สามารถเข้าใจและดำเนินการโดยวิศวกรคนเดียวโดยไม่มีงบประมาณ แสดงว่าซับซ้อนเกินไป ข้อจำกัดเปิดเผย dependency ที่ซ่อนอยู่ บังคับให้ตั้งลำดับความสำคัญ และสร้างระบบที่ lean กว่า",
    },
    {
      icon: FlaskConical,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      titleEn: "FDIA-First Design",
      titleTh: "การออกแบบ FDIA-First",
      descEn:
        "Every architectural decision maps to the FDIA equation: F = D^I × A. Data quality (D), integration depth (I), and Autonomy coefficient (A) drive component selection, API contracts, and rollout gates. A design that cannot be expressed in FDIA terms has not been sufficiently reasoned about.",
      descTh:
        "ทุกการตัดสินใจเชิงสถาปัตยกรรมสอดคล้องกับสมการ FDIA: F = D^I × A คุณภาพข้อมูล (D) ความลึกของ integration (I) และ Autonomy coefficient (A) เป็นตัวขับ component selection, API contracts และ rollout gates การออกแบบที่ไม่สามารถแสดงออกมาในรูปแบบ FDIA ยังไม่ได้รับการวิเคราะห์อย่างเพียงพอ",
    },
    {
      icon: BarChart3,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      titleEn: "Benchmark-Gated Delivery",
      titleTh: "Delivery ผ่าน Benchmark Gate",
      descEn:
        "No capability claim ships without a passing CI benchmark attached. The public repository CI 9,069-test suite is not a coverage target — it is a deployment gate, while the public SDK verified lane remains separate. 'Projected GAIA benchmark: 84–89%' carries the qualifier 'pending formal leaderboard validation' because evidence-quality standards apply to our own work as much as to our competitors.",
      descTh:
        "ไม่มีการอ้างความสามารถใดที่ปล่อยออกไปโดยไม่มี CI benchmark ที่ผ่านแนบมา โดยชุดทดสอบ 9,069 รายการใน public repository CI ไม่ใช่เป้าหมาย coverage แต่เป็น deployment gate และยังแยกจาก public SDK verified lane อย่างชัดเจน 'Projected GAIA benchmark: 84-89%' มี qualifier 'pending formal leaderboard validation' เพราะมาตรฐานคุณภาพหลักฐานใช้กับงานของเราเองเช่นเดียวกับคู่แข่ง",
    },
    {
      icon: Globe,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      titleEn: "Open Protocol Philosophy",
      titleTh: "Open Protocol Philosophy",
      descEn:
        "JITNA RFC-001 is published. The FDIA specification is documented. Architecture decisions are logged. We default to openness not as a marketing position, but because verifiable systems require externally readable specifications. What cannot be inspected cannot be trusted.",
      descTh:
        "JITNA RFC-001 ถูก publish แล้ว specification ของ FDIA มีเอกสาร การตัดสินใจสถาปัตยกรรมถูกบันทึกไว้ เราเลือก openness เป็นค่าเริ่มต้น ไม่ใช่เป็นจุดยืนการตลาด แต่เพราะระบบที่ verifiable ต้องมี specification ที่อ่านได้จากภายนอก สิ่งที่ตรวจสอบไม่ได้ ไม่สามารถไว้วางใจได้",
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
          {isEn ? "Our Approach" : "แนวทางของเรา"}
        </h1>
        <p className="text-xl text-muted-foreground mb-16 max-w-3xl">
          {isEn
            ? "Five engineering principles that define how Delentia Labs designs, builds, and delivers AI infrastructure."
            : "5 หลักการวิศวกรรมที่กำหนดวิธีที่ Delentia Labs ออกแบบ สร้าง และส่งมอบ AI infrastructure"}
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
            {isEn ? "See the Approach in Action" : "ดูแนวทางในทางปฏิบัติ"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {isEn
              ? "Every principle here is backed by working code, documented specifications, and passing tests."
              : "ทุกหลักการที่นี่มีโค้ดที่ใช้งานได้ specification ที่มีเอกสาร และการทดสอบที่ผ่านรองรับ"}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href={`${localePrefix}/benchmark`}>{isEn ? "View Benchmarks" : "ดู Benchmark"}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`${localePrefix}/philosophy/fdia`}>{isEn ? "FDIA Framework" : "กรอบ FDIA"}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`${localePrefix}/docs`}>{isEn ? "Documentation" : "เอกสาร"}</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
    </>
  )
}

