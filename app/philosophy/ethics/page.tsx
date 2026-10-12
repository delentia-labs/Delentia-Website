import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { FileCheck, Shield, Lock, BarChart3, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Ethics — How Delentia Labs Builds Responsibly",
    "จริยธรรม — แนวทางพัฒนา AI อย่างรับผิดชอบของ Delentia Labs",
    "Delentia Labs ethical principles: benchmark-qualified claims, PDPA-native architecture, constitutional AI enforcement, transparent rollout, and no-singularity honesty.",
    "หลักจริยธรรมของ Delentia Labs: ยืนยันด้วย benchmark, สถาปัตยกรรม PDPA-native, Constitutional AI, rollout โปร่งใส และไม่มีการตลาดแบบ singularity",
    "/philosophy/ethics"
  )
}

export default async function EthicsPage() {
  const locale = await getRequestLocale()
  const isEn = locale === "en"
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Philosophy", url: `https://delentia.com${localePrefix}/philosophy` },
    { name: "Ethics", url: `https://delentia.com${localePrefix}/philosophy/ethics` },
  ])
  const faq = getFAQSchema([
    {
      question: isEn ? "How does Delentia Labs keep AI claims credible?" : "Delentia Labs รักษาความน่าเชื่อถือของ AI claims อย่างไร?",
      answer: isEn
        ? "By attaching benchmark qualifiers and validation evidence to public claims rather than using unqualified marketing statements."
        : "โดยผูกทุกคำอ้างสาธารณะกับ benchmark qualifier และหลักฐานการตรวจสอบ แทนการตลาดแบบไม่มีหลักฐาน",
    },
    {
      question: isEn ? "Is compliance handled as a separate layer?" : "compliance ถูกทำเป็นชั้นแยกทีหลังหรือไม่?",
      answer: isEn
        ? "No. PDPA-oriented explainability and governance are treated as architectural constraints from the start."
        : "ไม่ใช่ โดย explainability และ governance ตามแนว PDPA ถูกออกแบบเป็นข้อจำกัดเชิงสถาปัตยกรรมตั้งแต่ต้น",
    },
  ])

  const pillars = [
    {
      icon: FileCheck,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      titleEn: "Benchmark-Honest Claims",
      titleTh: "ยืนยันด้วย Benchmark เสมอ",
      descEn:
        "Every public claim is qualified with evidence. We write 'no hallucination rate is claimed' and 'FDIA rank accuracy: 11 of 12 on a tiny hand-written set (a smoke test)' — never stripped of context. We do not inflate numbers or delete qualifiers under time pressure.",
      descTh:
        "ทุกข้อความสาธารณะต้องมีหลักฐานรองรับ เราเขียน 'ไม่ได้อ้างอัตรา hallucination' และ 'FDIA rank accuracy: 11 จาก 12 ในชุดทดสอบเล็ก (smoke test)' โดยไม่ตัดบริบทออก ไม่ขยายตัวเลขหรือลบ qualifier ใดๆ แม้อยู่ภายใต้แรงกดดัน",
    },
    {
      icon: Shield,
      color: "text-sky-500",
      bg: "bg-sky-500/10",
      titleEn: "PDPA-Native Architecture",
      titleTh: "สถาปัตยกรรม PDPA-Native",
      descEn:
        "Thailand's PDPA Section 33 explainability requirements are built into the system design from day one. Right-to-erasure flows, cross-border transfer documentation, and data-minimization principles are first-class design constraints for every RCT platform.",
      descTh:
        "ข้อกำหนด PDPA มาตรา 33 เรื่อง explainability ถูกฝังอยู่ในการออกแบบระบบตั้งแต่ต้น ไม่ใช่เพิ่มทีหลัง สิทธิลบข้อมูล เอกสาร cross-border transfer และหลัก data-minimization ล้วนเป็น design constraint หลักของทุก RCT platform",
    },
    {
      icon: Lock,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      titleEn: "Constitutional AI Enforcement",
      titleTh: "Constitutional AI บังคับใช้จริง",
      descEn:
        "The FDIA equation (F = D^I × A) includes an Autonomy coefficient (A). When A = 0, the system cannot act unilaterally — a hard architectural kill switch. Anti-prompt-injection layers prevent instruction-override attacks. Constitutional constraints are structural invariants, not configurable toggles.",
      descTh:
        "สมการ FDIA (F = D^I × A) มี Autonomy coefficient (A) เมื่อ A = 0 ระบบไม่สามารถตัดสินใจแทนมนุษย์ได้ — kill switch ระดับสถาปัตยกรรม ชั้นป้องกัน prompt-injection ป้องกันการโจมตีแบบ instruction-override ข้อจำกัด Constitutional คือ invariant เชิงโครงสร้าง ไม่ใช่สวิตช์ตั้งค่าได้",
    },
    {
      icon: BarChart3,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      titleEn: "Transparent Staged Rollout",
      titleTh: "การ Rollout แบบโปร่งใสเป็นขั้นตอน",
      descEn:
        "Delentia Labs does not ship features without validation gates. Backend-validated coverage currently stands at 66.7%, with a public target of 100%. Each stage is documented and rollout metrics are visible. We prefer slower, validated delivery over fast, unverified shipping.",
      descTh:
        "Delentia Labs ไม่ปล่อย feature ใดๆ โดยไม่ผ่าน validation gate ปัจจุบัน backend-validated coverage อยู่ที่ 66.7% โดยมีเป้าหมาย 100% สาธารณะ แต่ละขั้นตอนถูกบันทึก และ rollout metric มองเห็นได้ เราเลือก delivery ที่ช้าแต่ validated มากกว่าการส่งที่รวดเร็วแต่ไม่ตรวจสอบ",
    },
    {
      icon: AlertTriangle,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      titleEn: "No Singularity Marketing",
      titleTh: "ไม่มีการตลาดแบบ Singularity",
      descEn:
        "We build AI systems that augment human judgment, not replace it. We do not claim AGI timelines, use phrases like 'AI will replace all jobs', or issue press releases around inflated capability claims. Our marketing language uses the same qualifier standards as our engineering documentation.",
      descTh:
        "เราสร้างระบบ AI ที่เสริมการตัดสินใจของมนุษย์ ไม่ใช่แทนที่ เราไม่อ้าง AGI timeline ไม่ใช้ประโยค 'AI จะแทนที่งานทุกอย่าง' หรือออก press release ที่อ้างความสามารถเกินจริง ภาษาการตลาดของเราใช้มาตรฐาน qualifier เดียวกับเอกสารวิศวกรรม",
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
          {isEn ? "Ethics at Delentia Labs" : "จริยธรรมของ Delentia Labs"}
        </h1>
        <p className="text-xl text-muted-foreground mb-16 max-w-3xl">
          {isEn
            ? "Building AI systems responsibly means more than following regulations. It means designing honesty, safety, and accountability into the architecture itself."
            : "การสร้างระบบ AI อย่างรับผิดชอบหมายถึงมากกว่าการปฏิบัติตามกฎระเบียบ หมายถึงการออกแบบความซื่อสัตย์ ความปลอดภัย และความรับผิดชอบให้เป็นส่วนหนึ่งของสถาปัตยกรรม"}
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
            {isEn ? "See Our Ethics in Practice" : "ดูจริยธรรมในทางปฏิบัติ"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {isEn
              ? "Our claims, benchmarks, and validation results are publicly documented. Review the evidence behind every number."
              : "ข้อเรียกร้อง benchmark และผลการตรวจสอบของเราถูกบันทึกไว้สาธารณะ ตรวจสอบหลักฐานเบื้องหลังทุกตัวเลข"}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href={`${localePrefix}/benchmark`}>{isEn ? "View Benchmarks" : "ดู Benchmark"}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`${localePrefix}/philosophy/fdia`}>{isEn ? "FDIA Framework" : "กรอบ FDIA"}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`${localePrefix}/contact`}>{isEn ? "Contact Us" : "ติดต่อเรา"}</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
    </>
  )
}

