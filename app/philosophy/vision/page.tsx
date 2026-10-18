import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { ArrowLeft, Globe, Zap, Building2, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Vision 2030 — Delentia Labs",
    "วิสัยทัศน์ 2030 — Delentia Labs",
    "Delentia Labs vision: Thailand AI infrastructure independence by 2030, creating 50-100B THB in national value. Constitutional AI as the verifiable global standard for enterprise AI governance.",
    "วิสัยทัศน์ Delentia Labs: ความเป็นอิสระด้านโครงสร้างพื้นฐาน AI ของไทยภายในปี 2030 สร้างมูลค่าแห่งชาติ 5 หมื่น-1 แสนล้านบาท Constitutional AI เป็นมาตรฐานสากลที่ตรวจสอบได้",
    "/philosophy/vision",
    ["Thailand AI 2030", "constitutional AI vision", "Delentia Labs roadmap", "AI independence Thailand"]
  )
}

const pillars = [
  {
    icon: Globe,
    color: "border-sky-400/30 bg-sky-400/5",
    iconColor: "text-sky-400",
    en: {
      title: "Thailand AI Infrastructure Independence",
      subtitle: "End foreign API dependency by 2030",
      body: "Thailand currently sends billions of baht per year in AI API fees to foreign cloud vendors. Every enterprise query leaks sensitive domestic data to servers outside Thai jurisdiction. Our vision is a sovereign AI operating layer — running on Thai infrastructure, governed by Thai constitutional law, explainable to Thai regulators — that creates 50–100 billion THB in national economic value by 2030.",
    },
    th: {
      title: "ความเป็นอิสระด้านโครงสร้างพื้นฐาน AI ของไทย",
      subtitle: "ยุติการพึ่งพา API ต่างประเทศภายในปี 2030",
      body: "ปัจจุบันไทยส่งเงินหลายพันล้านบาทต่อปีเป็นค่า AI API ให้ผู้ให้บริการ cloud ต่างประเทศ ทุก query ขององค์กรรั่วไหลข้อมูลที่ละเอียดอ่อนไปยังเซิร์ฟเวอร์นอกเขตอำนาจไทย วิสัยทัศน์ของเราคือชั้น AI OS ที่มีอธิปไตย — ทำงานบนโครงสร้างพื้นฐานไทย อยู่ภายใต้กฎหมายรัฐธรรมนูญไทย ชี้แจงได้ต่อหน่วยงานกำกับดูแลไทย — สร้างมูลค่าทางเศรษฐกิจแห่งชาติ 5 หมื่น–1 แสนล้านบาทภายในปี 2030",
    },
  },
  {
    icon: Award,
    color: "border-warm-amber/30 bg-warm-amber/5",
    iconColor: "text-warm-amber",
    en: {
      title: "Constitutional AI as the Global Verifiable Standard",
      subtitle: "Replace unverifiable AI claims with provable guarantees",
      body: "The AI industry is full of claims that cannot be independently verified. Our vision is a global standard where AI systems must publish their constitutional constraints — the rules they cannot break — enforced by FDIA-class architectures, not just policy documents. When any enterprise asks what this AI cannot do, the answer must be mathematically verifiable, not a terms-of-service PDF.",
    },
    th: {
      title: "Constitutional AI เป็นมาตรฐานสากลที่ตรวจสอบได้",
      subtitle: "แทนที่การอ้างสิทธิ์ที่ตรวจสอบไม่ได้ด้วยการรับประกันที่พิสูจน์ได้",
      body: "อุตสาหกรรม AI เต็มไปด้วยการอ้างสิทธิ์ที่ไม่สามารถตรวจสอบได้อย่างอิสระ วิสัยทัศน์ของเราคือมาตรฐานสากลที่ระบบ AI ต้องเผยแพร่ข้อจำกัดตามรัฐธรรมนูญของตน และข้อจำกัดเหล่านั้นถูกบังคับใช้โดยสถาปัตยกรรม FDIA ไม่ใช่แค่เอกสารนโยบาย เมื่อองค์กรใดถามว่า AI นี้ทำอะไรไม่ได้ คำตอบต้องตรวจสอบได้ทางคณิตศาสตร์ ไม่ใช่ PDF ข้อกำหนดการให้บริการ",
    },
  },
  {
    icon: Zap,
    color: "border-emerald-500/30 bg-emerald-500/5",
    iconColor: "text-emerald-500",
    en: {
      title: "Solo-Developer Proof of Possibility",
      subtitle: "Enterprise AI without enterprise capital",
      body: "Delentia Labs is proof that a single developer without external funding can build a production-grade constitutional AI operating system. That proof matters because it changes what emerging-market teams believe is possible. Our 30-day bootstrap — 41 algorithms, and the public repository CI with 7,109 passing tests — is not a tech demo. It is a reproducible blueprint for AI sovereignty at any resource level.",
    },
    th: {
      title: "การพิสูจน์ความเป็นไปได้ของนักพัฒนาคนเดียว",
      subtitle: "Enterprise AI โดยไม่ต้องมีทุน Enterprise",
      body: "Delentia Labs คือหลักฐานว่านักพัฒนาคนเดียวโดยไม่มีเงินทุนภายนอกสามารถสร้าง Constitutional AI OS ระดับ production ได้ การ bootstrap 30 วันของเรา — 41 algorithms และ public repository CI ที่มี 7,109 passing tests — ไม่ใช่การสาธิตเทคโนโลยี แต่เป็นแบบพิมพ์เขียวที่ทำซ้ำได้สำหรับ AI sovereignty ในทุกระดับทรัพยากร",
    },
  },
  {
    icon: Building2,
    color: "border-violet-400/30 bg-violet-400/5",
    iconColor: "text-violet-400",
    en: {
      title: "PDPA-Native AI for the Asia-Pacific Enterprise",
      subtitle: "Compliance built in, not bolted on",
      body: "APAC enterprises face a structural compliance problem: generic AI platforms were designed for GDPR, not PDPA. Section 33 explainability, right-to-erasure mechanisms, cross-border transfer documentation — these are afterthoughts in Western AI stacks. Our vision is AI infrastructure where PDPA compliance is an architectural property, not a compliance team's problem.",
    },
    th: {
      title: "AI ที่รองรับ PDPA โดยกำเนิดสำหรับองค์กร Asia-Pacific",
      subtitle: "Compliance ถูกสร้างมา ไม่ใช่ต่อเติมทีหลัง",
      body: "องค์กรใน APAC เผชิญปัญหา compliance เชิงโครงสร้าง: แพลตฟอร์ม AI ทั่วไปออกแบบมาสำหรับ GDPR ไม่ใช่ PDPA ความสามารถในการอธิบายตามมาตรา 33, กลไก right-to-erasure, เอกสารการโอนข้อมูลข้ามประเทศ — สิ่งเหล่านี้เป็นความคิดทีหลังใน AI stack ของตะวันตก วิสัยทัศน์ของเราคือโครงสร้างพื้นฐาน AI ที่เครื่องมือด้านความเป็นส่วนตัว (ลบรายบุคคล นโยบายที่เก็บข้อมูล) เป็นส่วนของสถาปัตยกรรม ไม่ได้อ้างว่าทำให้ปฏิบัติตามกฎหมายได้เอง",
    },
  },
]

export default async function VisionPage() {
  const locale = await getRequestLocale()
  const isTh = locale === "th"
  const localePrefix = isTh ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Philosophy", url: `https://delentia.com${localePrefix}/philosophy` },
    { name: "Vision", url: `https://delentia.com${localePrefix}/philosophy/vision` },
  ])
  const faq = getFAQSchema([
    {
      question: isTh ? "Vision 2030 มีเป้าหมายหลักอะไร?" : "What is the primary goal of Vision 2030?",
      answer: isTh
        ? "เป้าหมายหลักคือสร้างความเป็นอิสระด้านโครงสร้างพื้นฐาน AI ของไทยและยกระดับ governance ที่ตรวจสอบได้"
        : "The primary goal is Thai AI infrastructure independence with verifiable constitutional governance standards.",
    },
    {
      question: isTh ? "ทำไมต้องเน้น constitutional AI?" : "Why focus on constitutional AI?",
      answer: isTh
        ? "เพราะช่วยเปลี่ยนการอ้างความสามารถที่ตรวจสอบไม่ได้ให้เป็นข้อจำกัดและหลักฐานที่พิสูจน์ได้เชิงระบบ"
        : "Because it converts unverifiable capability claims into system-level constraints and evidence that can be audited.",
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
          <Link href={`${localePrefix}/philosophy`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isTh ? "กลับไปปรัชญา" : "Back to Philosophy"}
          </Link>
        </Button>

        <article className="space-y-12">
          <div className="space-y-4">
            <p className="text-sm font-medium text-warm-amber uppercase tracking-widest">
              {isTh ? "ปรัชญา" : "Philosophy"}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {isTh ? "วิสัยทัศน์ 2030" : "Vision 2030"}
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl">
              {isTh
                ? "สิ่งที่ Delentia Labs กำลังสร้างและเหตุผลที่มันสำคัญสำหรับ AI ของประเทศไทยและ Asia-Pacific"
                : "What Delentia Labs is building and why it matters for Thailand and Asia-Pacific AI sovereignty."}
            </p>
          </div>

          <div className="space-y-6">
            {pillars.map((p, i) => {
              const t = isTh ? p.th : p.en
              const Icon = p.icon
              return (
                <div key={i} className={`p-6 rounded-xl border ${p.color} space-y-3`}>
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 shrink-0 ${p.iconColor}`}>
                      <Icon size={22} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-foreground">{t.title}</h3>
                      <p className="text-sm font-medium text-foreground/60">{t.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-foreground/75 leading-relaxed ml-10">{t.body}</p>
                </div>
              )
            })}
          </div>

          <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-8 space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              {isTh ? "วิสัยทัศน์นี้กำลังดำเนินการอยู่" : "This Vision Is Already in Motion"}
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              {isTh
                ? "สแนปช็อต enterprise private snapshot ล่าสุดคือการพิสูจน์แนวคิดที่ทำงานได้จริง และ public SDK verified lane ยังคงเป็นจุดอ้างอิงสาธารณะหลัก"
                : "The latest enterprise private snapshot is the working proof of concept, while the public SDK verified lane remains the primary public checkpoint. Next: running the agent runtime with a capable model on a real host, design-partner pilots, and the controlled study described on the Benchmark page."}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={`${localePrefix}/roadmap`} className="text-sm text-emerald-500 hover:underline">
                {isTh ? "ดู Roadmap →" : "View Roadmap →"}
              </Link>
                <Link href={`${localePrefix}/benchmark`} className="text-sm text-emerald-500 hover:underline">
                {isTh ? "ดู Benchmark Performance →" : "View Benchmark Performance →"}
              </Link>
            </div>
          </div>
        </article>
      </section>

      <Footer />
    </main>
    </>
  )
}

