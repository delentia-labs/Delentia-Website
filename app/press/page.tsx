import type { Metadata } from "next"
export const dynamic = "force-dynamic"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import Link from "next/link"
import { Mail, Linkedin, Github, ExternalLink, Building2, User, Newspaper } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Press & Media — Constitutional AI from Thailand",
    "สื่อมวลชนและข่าวประชาสัมพันธ์ — Constitutional AI จากประเทศไทย",
    "Press kit, fact sheet, story angles, and media contact for Delentia Labs — a constitutional AI operating system built by a solo developer in Bangkok, Thailand. 62 microservices and 4,849 passing tests (enterprise, private snapshot); benchmark hallucination target: 0.3% (internal, pending independent validation).",
    "Press kit, fact sheet, มุมข่าว และข้อมูลติดต่อสื่อสำหรับ Delentia Labs — constitutional AI operating system ที่สร้างโดยผู้พัฒนาคนเดียวจากกรุงเทพฯ ประเทศไทย พร้อม 62 microservices, 4,849 passing tests (enterprise, private snapshot) และ Benchmark Hallucination Target 0.3% (เป้าหมายภายใน รอการตรวจสอบอิสระ)",
    "/press",
    ["press kit", "media contact", "constitutional AI Thailand", "Delentia Labs press"]
  )
}

const facts = [
  { label: "Founded", labelTh: "ก่อตั้ง", value: "June 25, 2025" },
  { label: "First Public Release", labelTh: "เวอร์ชันสาธารณะแรก", value: "August 11, 2025 (30 days)" },
  { label: "Enterprise Version", labelTh: "เวอร์ชัน Enterprise", value: "v5.4.5" },
  { label: "Public SDK", labelTh: "Public SDK (GitHub)", value: "v1.0.2a0 (Apache 2.0)" },
  { label: "Microservices", labelTh: "Microservices", value: "62 (enterprise, private snapshot)" },
  { label: "Algorithms", labelTh: "Algorithms", value: "41 designed (Tier 1–9; public SDK ships a subset)" },
  { label: "AI Models (HexaCore)", labelTh: "โมเดล AI (HexaCore)", value: "9 (3 Western + 3 Eastern + 1 Thai + 1 Local + 1 LPU)" },
  { label: "Test Suite", labelTh: "ชุดทดสอบ", value: "4,849 passed / 0 failed (enterprise, private) — public SDK: 1,791 passed" },
  { label: "Benchmark Hallucination Target", labelTh: "เป้าหมาย Benchmark Hallucination", value: "0.3% target (industry: 12–15%; pending independent validation)" },
  { label: "FDIA Benchmark Accuracy", labelTh: "ความแม่นยำ FDIA (Benchmark)", value: "0.92 vs ~0.65 baseline (internal benchmark)" },
  { label: "Memory Compression", labelTh: "การบีบอัดหน่วยความจำ", value: "up to 74% (internal benchmark; varies per input)" },
  { label: "Uptime Design SLA Target", labelTh: "เป้าหมาย Design SLA", value: "99.98% (design target, not yet independently monitored)" },
  { label: "Warm Recall", labelTh: "Warm Recall", value: "<50ms (internal benchmark target)" },
  { label: "Budget", labelTh: "งบประมาณ", value: "$0 (bootstrapped)" },
  { label: "Team Size", labelTh: "ขนาดทีม", value: "1 (sole developer)" },
  { label: "Location", labelTh: "ที่ตั้ง", value: "Bangkok, Thailand" },
  { label: "License", labelTh: "ใบอนุญาต", value: "Apache 2.0" },
]

const storyAngles = [
  {
    headline: "Thai Solo Developer Builds Enterprise Constitutional AI OS in 30 Days at Zero Cost",
    headlineTh: "นักพัฒนาคนเดียวจากไทยสร้าง Constitutional AI OS ระดับ Enterprise ในเวลา 30 วัน ด้วยต้นทุนศูนย์บาท",
    angle: "Human interest / entrepreneurship",
    angleTh: "ความสนใจมนุษย์ / ผู้ประกอบการ",
    hook: "While Silicon Valley needs $100M and 50 engineers, Ittirit Saengow built an AI operating system with 62 microservices (enterprise, private snapshot) from a single Android phone in Bangkok.",
    hookTh: "ขณะที่ Silicon Valley ต้องใช้เงิน 100 ล้านดอลลาร์และวิศวกร 50 คน อิทธิฤทธิ์ แซ่โง้ว สร้าง AI OS ที่มี 62 microservices (enterprise, private snapshot) จากโทรศัพท์ Android เครื่องเดียวในกรุงเทพฯ",
    badgeClass: "border-warm-amber/30 bg-warm-amber/10 text-warm-amber",
    cardClass: "border-warm-amber/20",
  },
  {
    headline: "Constitutional AI: The Architecture That Provably Prevents Hallucination",
    headlineTh: "Constitutional AI: สถาปัตยกรรมที่พิสูจน์ได้ว่าป้องกัน Hallucination",
    angle: "Technology / AI safety",
    angleTh: "เทคโนโลยี / ความปลอดภัย AI",
    hook: "FDIA equation F = (D^I) × A introduces a mathematical kill switch: when A=0, no AI output is produced — regardless of model, prompt, or context. Benchmark hallucination target: 0.3% vs 12–15% industry average.",
    hookTh: "สมการ FDIA F = (D^I) × A สร้างสวิตช์ตัดทางคณิตศาสตร์: เมื่อ A=0 จะไม่มี AI output เกิดขึ้นเลย ไม่ว่าโมเดล prompt หรือบริบทจะเป็นอะไร Benchmark Hallucination Target: 0.3% เทียบกับค่าเฉลี่ยอุตสาหกรรม 12–15%",
    badgeClass: "border-sky-400/30 bg-sky-400/10 text-sky-400",
    cardClass: "border-sky-400/20",
  },
  {
    headline: "JITNA: The Open Protocol That Could Become the 'HTTP of Agentic AI'",
    headlineTh: "JITNA: โปรโตคอลเปิดที่อาจกลายเป็น 'HTTP ของ Agentic AI'",
    angle: "Technology / standards",
    angleTh: "เทคโนโลยี / มาตรฐาน",
    hook: "Just In Time Nodal Assembly (JITNA RFC-001 v2.0) is the first open-standard communication protocol for AI agents. It defines how agents negotiate, execute, and verify tasks — PROPOSE → COUNTER → ACCEPT.",
    hookTh: "Just In Time Nodal Assembly (JITNA RFC-001 v2.0) คือโปรโตคอลการสื่อสารแบบ open standard ตัวแรกสำหรับ AI Agents กำหนดวิธีที่ agents เจรจา ดำเนินการ และตรวจสอบงาน — PROPOSE → COUNTER → ACCEPT",
    badgeClass: "border-sky-400/30 bg-sky-400/10 text-sky-400",
    cardClass: "border-sky-400/20",
  },
  {
    headline: "50–100 Billion THB: Thailand's Path to AI Infrastructure Independence",
    headlineTh: "5 หมื่น – 1 แสนล้านบาท: เส้นทางของไทยสู่ความเป็นอิสระทางโครงสร้างพื้นฐาน AI",
    angle: "Business / national development",
    angleTh: "ธุรกิจ / การพัฒนาชาติ",
    hook: "Thailand currently sends billions THB/year in AI API fees to foreign cloud vendors. Delentia Labs proposes a constitutional AI infrastructure that generates 50–100B THB in national value by 2030.",
    hookTh: "ปัจจุบันไทยส่งเงินหลายพันล้านบาทต่อปีเป็นค่า AI API ให้ cloud vendors ต่างประเทศ Delentia Labs เสนอโครงสร้างพื้นฐาน AI แบบ constitutional ที่จะสร้างมูลค่าแห่งชาติ 5 หมื่น – 1 แสนล้านบาทภายในปี 2030",
    badgeClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    cardClass: "border-emerald-500/20",
  },
  {
    headline: "The PDPA Compliance Crisis Hidden in Every Enterprise AI Deployment",
    headlineTh: "วิกฤต PDPA ที่ซ่อนอยู่ในทุกการติดตั้ง Enterprise AI",
    angle: "Compliance / risk",
    angleTh: "Compliance / ความเสี่ยง",
    hook: "Most Thai enterprise AI deployments have undocumented cross-border transfers, no right-to-erasure mechanism, and no Section 33 explanation capability. Constitutional AI solves this architecturally.",
    hookTh: "การติดตั้ง Enterprise AI ของไทยส่วนใหญ่มีการโอนข้อมูลข้ามประเทศที่ไม่ได้บันทึก ไม่มีกลไก right-to-erasure และไม่มีความสามารถอธิบายตามมาตรา 33 Constitutional AI แก้ปัญหานี้ในเชิงสถาปัตยกรรม",
    badgeClass: "border-orange-400/30 bg-orange-400/10 text-orange-500 dark:text-orange-400",
    cardClass: "border-orange-400/20",
  },
]

export default async function PressPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Press", url: `https://delentia.com${localePrefix}/press` },
  ])

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Delentia Labs",
    alternateName: "Reverse Component Thinking Labs",
    url: "https://delentia.com",
    logo: "https://delentia.com/RCTLogo-horizontal.svg",
    description: "Constitutional AI Operating System built by a solo developer in Bangkok, Thailand — 62 microservices and 4,849 passing tests (enterprise, private snapshot), 0.3% benchmark hallucination target (internal, pending independent validation).",
    foundingDate: "2024",
    founder: { "@type": "Person", name: "Ittirit Saengow", jobTitle: "The Architect" },
    location: { "@type": "Place", addressLocality: "Bangkok", addressCountry: "TH" },
    contactPoint: { "@type": "ContactPoint", contactType: "Media", email: "hello@delentia.com" },
    sameAs: ["https://github.com/delentia-labs", "https://twitter.com/rctlabs", "https://linkedin.com/company/rctlabs"],
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <main className="min-h-screen bg-background">
        <Navbar locale={locale} />

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(191,160,110,0.08),transparent_55%)] pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 py-24 md:py-32">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-amber/30 bg-warm-amber/8 text-warm-amber text-sm font-medium w-fit mb-6">
              <Newspaper className="w-4 h-4" /> {isTh ? "สื่อมวลชน" : "Press & Media"}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              Delentia Labs Media Kit
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-6">
              {isTh
                ? "Fact sheet, มุมข่าว และข้อมูลติดต่อสำหรับนักข่าวที่รายงานข่าว AI, เทคโนโลยีระดับองค์กร และระบบนิเวศเทคโนโลยีของไทย"
                : "Fact sheet, story angles, and media contact for journalists covering AI, enterprise technology, and Thailand's technology ecosystem."}
            </p>

            {/* Hero stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { value: "62", label: isTh ? "Microservices (enterprise, private)" : "Microservices (enterprise, private)" },
                { value: "4,849", label: isTh ? "Tests ผ่าน (enterprise, private)" : "Tests Passing (enterprise, private)" },
                { value: "0.3%", label: isTh ? "เป้าหมาย Benchmark Hallucination" : "Benchmark Hallucination Target" },
                { value: "99.98%", label: isTh ? "เป้าหมาย Design SLA" : "Uptime Design SLA Target" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-warm-amber/20 bg-warm-amber/5 px-4 py-3">
                  <p className="text-2xl font-bold text-warm-amber">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Media contact */}
            <div className="inline-flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:founder@delentia.com"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-warm-amber text-background font-semibold text-sm hover:bg-warm-amber/90 transition"
              >
                <Mail className="w-4 h-4" /> founder@delentia.com
              </a>
              <a
                href="https://www.linkedin.com/in/ittirit-saengow/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-muted-foreground hover:border-warm-amber/30 hover:text-warm-amber transition text-sm"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn Profile
              </a>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-warm-amber" /> {isTh ? "เกี่ยวกับผู้ก่อตั้ง" : "About the Founder"}
          </h2>
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-warm-amber/20 to-warm-amber/5 border border-warm-amber/30 flex items-center justify-center text-2xl font-bold text-warm-amber shrink-0">IS</div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">Ittirit Saengow (อิทธิฤทธิ์ แซ่โง้ว)</h3>
                <p className="text-warm-amber text-sm font-medium mb-4">
                  {isTh ? "ผู้ก่อตั้งและนักพัฒนาเพียงคนเดียว, Delentia Labs · กรุงเทพฯ, ประเทศไทย" : "Founder & Sole Developer, Delentia Labs · Bangkok, Thailand"}
                </p>
                <p className="text-muted-foreground leading-relaxed max-w-3xl mb-4">
                  {isTh
                    ? "อิทธิฤทธิ์ แซ่โง้ว คือผู้สร้างเพียงคนเดียวของ RCT (Reverse Component Thinking) Ecosystem — Constitutional AI Operating System ที่ประกอบด้วย 62 microservices และ automated tests กว่า 4,849 รายการ (enterprise, private snapshot) 41 algorithms ที่ออกแบบไว้ (public SDK เปิดให้ใช้บางส่วน) และ AI models 9 ตัวในระบบ HexaCore สร้างขึ้นภายใน 30 วัน ในช่วงมิถุนายน–สิงหาคม 2025 โดยไม่มีเงินลงทุนภายนอก จากกรุงเทพฯ ประเทศไทย"
                    : "Ittirit Saengow is the sole creator of the RCT (Reverse Component Thinking) Ecosystem — a constitutional AI operating system comprising 62 microservices and 4,849 automated tests (enterprise, private snapshot), 41 designed algorithms (the public SDK ships a subset), and 9 HexaCore AI models. Built over 30 days in June–August 2025 with zero investment capital, from Bangkok, Thailand. Before Delentia Labs, Ittirit ran four businesses, studied facility management at the Faculty of Architecture (completing a 4-year program in 6.5 years), and developed the FDIA equation, JITNA protocol, and 7-Genome system as conceptual frameworks before implementing them in code."}
                </p>
                <div className="flex gap-3">
                  <a href="https://github.com/ittirit720" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-warm-dim hover:text-warm-amber transition">
                    <Github className="w-4 h-4" /> github.com/ittirit720
                  </a>
                  <a href="https://www.linkedin.com/in/ittirit-saengow/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-warm-dim hover:text-warm-amber transition">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Facts */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-warm-amber" /> {isTh ? "ข้อมูลบริษัท" : "Company Fact Sheet"}
          </h2>
          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {facts.map((fact, i) => (
                <div key={fact.label} className={`px-6 py-4 flex items-center justify-between border-b border-border/50 ${i % 2 === 0 ? "" : "sm:border-l sm:border-border/50"}`}>
                  <span className="text-muted-foreground text-sm">{isTh ? fact.labelTh : fact.label}</span>
                  <span className="font-semibold text-foreground text-sm text-right">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Angles */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-warm-amber" /> {isTh ? "มุมข่าวสำหรับนักข่าว" : "Story Angles for Journalists"}
          </h2>
          <div className="space-y-4">
            {storyAngles.map((story) => (
              <div key={story.headline} className={`rounded-xl border bg-muted/30 p-6 ${story.cardClass}`}>
                <div className="flex items-start gap-4">
                  <span className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold shrink-0 ${story.badgeClass}`}>{isTh ? story.angleTh : story.angle}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mt-3 mb-2">"{isTh ? story.headlineTh : story.headline}"</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{isTh ? story.hookTh : story.hook}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Deep links */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">{isTh ? "ลิงก์อ้างอิง" : "Research Links"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "FDIA Equation Explained", labelTh: "อธิบายสมการ FDIA", href: `${localePrefix}/blog/fdia-equation-explained` },
              { label: "JITNA Protocol Specification", labelTh: "ข้อกำหนด JITNA Protocol", href: `${localePrefix}/blog/jitna-language-release` },
              { label: "4,849 Tests Methodology", labelTh: "วิธีการทดสอบ 4,849 รายการ", href: `${localePrefix}/blog/rct-ecosystem-4849-tests-methodology` },
              { label: "Thai AI Vision 2030", labelTh: "วิสัยทัศน์ AI ไทย 2030", href: `${localePrefix}/blog/thai-ai-platform-vision-2030` },
              { label: "PDPA AI Compliance Guide", labelTh: "คู่มือ PDPA สำหรับ AI", href: `${localePrefix}/blog/pdpa-ai-compliance-thailand` },
              { label: "Author Profile — Ittirit Saengow", labelTh: "ข้อมูลผู้เขียน — อิทธิฤทธิ์ แซ่โง้ว", href: `${localePrefix}/authors/ittirit-saengow` },
            ].map(({ label, labelTh, href }) => (
              <Link key={label} href={href} className="flex items-center justify-between px-5 py-3 rounded-lg border border-border hover:border-warm-amber/30 hover:bg-warm-amber/5 transition group">
                <span className="text-muted-foreground group-hover:text-foreground text-sm transition">{isTh ? labelTh : label}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-warm-amber transition" />
              </Link>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}

