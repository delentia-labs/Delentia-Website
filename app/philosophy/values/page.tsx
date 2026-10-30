import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { ArrowLeft, Heart, Shield, FlaskConical, Users, Infinity } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Core Values — Delentia Labs",
    "คุณค่าหลัก — Delentia Labs",
    "The five principles that guide every decision at Delentia Labs: Radical Honesty, Survivor's Empathy, Verifiable Truth, Human-Centric Power, and Long-Term Stewardship.",
    "หลักการ 5 ข้อที่นำทางทุกการตัดสินใจของ Delentia Labs: ความซื่อสัตย์อย่างถอนราก, ความเห็นอกเห็นใจผู้รอดชีวิต, ความจริงที่พิสูจน์ได้, พลังยึดมนุษย์เป็นศูนย์กลาง, และการดูแลรักษาระยะยาว",
    "/philosophy/values",
    ["Delentia Labs values", "constitutional AI principles", "AI ethics Thailand"]
  )
}

type ValueItem = {
  icon: React.ComponentType<{ size?: number; className?: string }>
  en: { title: string; subtitle: string; body: string; pill: string }
  th: { title: string; subtitle: string; body: string; pill: string }
  color: string
  iconColor: string
}

const VALUES: ValueItem[] = [
  {
    icon: Heart,
    en: {
      title: "Radical Honesty",
      subtitle: "Acknowledge uncertainty before claiming certainty",
      body: "We never present projections as facts. Every benchmark figure carries its qualifier. Every capability claim is backed by reproducible test evidence. When we do not know something, we say so — publicly and precisely. This is not humility for show; it is the engineering discipline that makes our systems trustworthy.",
      pill: "Foundation",
    },
    th: {
      title: "ความซื่อสัตย์อย่างถอนราก",
      subtitle: "ยอมรับความไม่แน่นอนก่อนอ้างความแน่ใจ",
      body: "เราไม่เคยนำเสนอการคาดการณ์ว่าเป็นข้อเท็จจริง ตัวเลข benchmark ทุกตัวมี qualifier กำกับ ทุกการอ้างสิทธิ์ความสามารถมีหลักฐานจากการทดสอบที่ทำซ้ำได้ เมื่อเราไม่รู้สิ่งใด เราพูดตรงๆ อย่างเปิดเผยและแม่นยำ นี่ไม่ใช่ความถ่อมตนเพื่อการแสดง แต่เป็นวินัยวิศวกรรมที่ทำให้ระบบของเราน่าเชื่อถือ",
      pill: "รากฐาน",
    },
    color: "border-warm-amber/30 bg-warm-amber/5",
    iconColor: "text-warm-amber",
  },
  {
    icon: Users,
    en: {
      title: "Survivor's Empathy",
      subtitle: "Design for those with the least, not the most",
      body: "RCT was built on a single Android phone with zero external capital. That constraint was not a limitation — it was a design requirement. Every system we build must be able to run under resource pressure. If it only works when everything is perfect, it will fail the people who need it most: enterprises in emerging markets, solo founders, teams without cloud budgets.",
      pill: "Design Principle",
    },
    th: {
      title: "ความเห็นอกเห็นใจผู้รอดชีวิต",
      subtitle: "ออกแบบสำหรับผู้มีทรัพยากรน้อยที่สุด ไม่ใช่มากที่สุด",
      body: "RCT ถูกสร้างบนโทรศัพท์ Android เครื่องเดียวด้วยทุนภายนอกเป็นศูนย์ ข้อจำกัดนั้นไม่ใช่อุปสรรค แต่เป็นข้อกำหนดในการออกแบบ ทุกระบบที่เราสร้างต้องทำงานได้ภายใต้แรงกดดันด้านทรัพยากร หากมันทำงานได้เฉพาะเมื่อทุกอย่างสมบูรณ์ มันจะล้มเหลวสำหรับผู้ที่ต้องการมากที่สุด: องค์กรในตลาดเกิดใหม่, ผู้ก่อตั้งคนเดียว, ทีมที่ไม่มีงบประมาณ cloud",
      pill: "หลักการออกแบบ",
    },
    color: "border-sky-400/30 bg-sky-400/5",
    iconColor: "text-sky-400",
  },
  {
    icon: FlaskConical,
    en: {
      title: "Verifiable Truth",
      subtitle: "Evidence first, claim second — always",
      body: "Our public repository CI 8,585-test suite is not a marketing number. It is the gate through which every feature must pass before it is claimed publicly, while the public SDK verified lane remains separate. The FDIA equation F=(D^I)×A is not a metaphor; it is implemented code with measurable outputs. We state only what the public CI measures, and we claim no hallucination rate.",
      pill: "Evidence Culture",
    },
    th: {
      title: "ความจริงที่พิสูจน์ได้",
      subtitle: "หลักฐานก่อน การอ้างสิทธิ์ภายหลัง — เสมอ",
      body: "ชุดทดสอบ 8,585 รายการใน public repository CI ของเราไม่ใช่ตัวเลขการตลาด แต่เป็นประตูที่ทุกฟีเจอร์ต้องผ่านก่อนจะประกาศต่อสาธารณะ และยังแยกจาก public SDK verified lane อย่างชัดเจน สมการ FDIA F=(D^I)×A ไม่ใช่คำอุปมา แต่เป็นโค้ดที่ implement จริงพร้อมผลลัพธ์ที่วัดได้ เราระบุเฉพาะสิ่งที่ CI สาธารณะวัดได้ และไม่ได้อ้างอัตรา hallucination",
      pill: "วัฒนธรรมหลักฐาน",
    },
    color: "border-emerald-500/30 bg-emerald-500/5",
    iconColor: "text-emerald-500",
  },
  {
    icon: Shield,
    en: {
      title: "Human-Centric Power",
      subtitle: "AI is the tool. The human is the director.",
      body: "Constitutional AI means AI that cannot override human intent. The FDIA Action parameter (A) gives humans a mathematical kill switch: A=0 produces zero output regardless of model confidence. We build systems where AI amplifies human judgment, never replaces it. The optional SignedAI jury exists so that a single model need not decide alone, not to automate away human decision points.",
      pill: "Governance",
    },
    th: {
      title: "พลังยึดมนุษย์เป็นศูนย์กลาง",
      subtitle: "AI คือเครื่องมือ มนุษย์คือผู้กำกับ",
      body: "Constitutional AI หมายถึง AI ที่ไม่สามารถล้มล้างเจตนาของมนุษย์ได้ พารามิเตอร์ Action (A) มอบสวิตช์ตัดทางคณิตศาสตร์แก่มนุษย์: A=0 ผลิตผลลัพธ์เป็นศูนย์โดยไม่คำนึงถึงความเชื่อมั่นของโมเดล เราสร้างระบบที่ AI ขยายการตัดสินใจของมนุษย์ ไม่ใช่แทนที่ คณะลูกขุน SignedAI แบบเลือกใช้มีไว้เพื่อไม่ให้โมเดลเดียวตัดสินลำพัง ไม่ใช่เพื่อลบจุดตัดสินใจของมนุษย์",
      pill: "กำกับดูแล",
    },
    color: "border-violet-400/30 bg-violet-400/5",
    iconColor: "text-violet-400",
  },
  {
    icon: Infinity,
    en: {
      title: "Long-Term Stewardship",
      subtitle: "Build for decades, not quarters",
      body: "Every architectural decision is evaluated against a 10-year time horizon. We use open protocols (JITNA RFC-001, Apache 2.0 license) so the knowledge we create cannot be locked away. We document our reasoning, publish what we prove, and design for maintainability by one developer as readily as by a hundred. Quick shortcuts that become long-term liabilities are refused, even when they would accelerate the roadmap.",
      pill: "Long-term",
    },
    th: {
      title: "การดูแลรักษาระยะยาว",
      subtitle: "สร้างเพื่อทศวรรษ ไม่ใช่ไตรมาส",
      body: "ทุกการตัดสินใจด้านสถาปัตยกรรมถูกประเมินตามขอบฟ้าเวลา 10 ปี เราใช้โปรโตคอลเปิด (JITNA RFC-001, ใบอนุญาต Apache 2.0) เพื่อให้ความรู้ที่เราสร้างไม่สามารถถูกล็อคได้ เราบันทึกเหตุผลของเรา เผยแพร่สิ่งที่เราพิสูจน์แล้ว และออกแบบสำหรับการบำรุงรักษาโดยนักพัฒนาหนึ่งคนได้ง่ายเท่ากับร้อยคน ทางลัดที่กลายเป็นหนี้สินระยะยาวถูกปฏิเสธ แม้จะเร่ง roadmap ก็ตาม",
      pill: "ระยะยาว",
    },
    color: "border-rose-400/30 bg-rose-400/5",
    iconColor: "text-rose-400",
  },
]

export default async function ValuesPage() {
  const locale = await getRequestLocale()
  const isTh = locale === "th"
  const localePrefix = isTh ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Philosophy", url: `https://delentia.com${localePrefix}/philosophy` },
    { name: "Values", url: `https://delentia.com${localePrefix}/philosophy/values` },
  ])
  const faq = getFAQSchema([
    {
      question: isTh ? "Core values ถูกนำไปใช้จริงอย่างไร?" : "How are core values applied in practice?",
      answer: isTh
        ? "หลักการแต่ละข้อถูกแปลงเป็นแนวทางในโค้ด การทดสอบ และภาษาที่ใช้สื่อสารต่อสาธารณะ"
        : "Each value is translated into concrete decisions across code, test gates, and public communication standards.",
    },
    {
      question: isTh ? "คุณค่าที่ให้ความสำคัญสูงสุดคืออะไร?" : "What is prioritized most among these values?",
      answer: isTh
        ? "ความโปร่งใสที่ตรวจสอบได้และการยืนยันด้วยหลักฐานคือแกนกลางที่เชื่อมค่าทั้งหมดเข้าด้วยกัน"
        : "Verifiable transparency and evidence-backed delivery are the core principles connecting all values.",
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
              {isTh ? "คุณค่าหลัก" : "Core Values"}
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl">
              {isTh
                ? "หลักการ 5 ข้อที่นำทางทุกการตัดสินใจ ทุกการออกแบบ และทุกการอ้างสิทธิ์ที่ Delentia Labs เผยแพร่ต่อสาธารณะ"
                : "Five principles that guide every decision, every design choice, and every public claim Delentia Labs makes."}
            </p>
          </div>

          <div className="space-y-6">
            {VALUES.map((v, i) => {
              const t = isTh ? v.th : v.en
              const Icon = v.icon
              return (
                <div key={i} className={`p-6 rounded-xl border ${v.color} space-y-3`}>
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 shrink-0 ${v.iconColor}`}>
                      <Icon size={22} />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-bold text-foreground">{t.title}</h3>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${v.color} ${v.iconColor}`}>
                          {t.pill}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground/60">{t.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-foreground/75 leading-relaxed ml-10">{t.body}</p>
                </div>
              )
            })}
          </div>

          <div className="border border-warm-amber/20 bg-warm-amber/5 rounded-xl p-8 space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              {isTh ? "คุณค่าเหล่านี้ไม่ใช่คำพูดบนผนัง" : "These Are Not Wall Posters"}
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              {isTh
                ? "คุณค่าหลักแต่ละข้อมีการนำไปใช้งานที่ตรวจสอบได้ในโค้ด ในการทดสอบ และในการสื่อสารสาธารณะ"
                : "Each core value has a verifiable implementation in code, in tests, and in public communications. If Delentia Labs violates any principle, the public record will show it."}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={`${localePrefix}/benchmark`} className="text-sm text-warm-amber hover:underline">
                {isTh ? "ดู Benchmark →" : "View Benchmark →"}
              </Link>
              <Link href={`${localePrefix}/philosophy/fdia`} className="text-sm text-warm-amber hover:underline">
                {isTh ? "สำรวจ FDIA →" : "Explore FDIA →"}
              </Link>
              <Link href={`${localePrefix}/about`} className="text-sm text-warm-amber hover:underline">
                {isTh ? "เกี่ยวกับ Delentia Labs →" : "About Delentia Labs →"}
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
