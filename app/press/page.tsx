import type { Metadata } from "next"
export const dynamic = "force-dynamic"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { SITE_VERSION } from "@/lib/site-config"
import Link from "next/link"
import { Mail, Linkedin, Github, ExternalLink, Building2, User, Newspaper } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Press & Media — Delentia, an open-source agent runtime from Thailand",
    "สื่อมวลชนและข่าวประชาสัมพันธ์ — Delentia รันไทม์ agent โอเพนซอร์สจากประเทศไทย",
    "Press kit for Delentia: an early, one-person, open-source agent runtime from Bangkok, built by a founder who does not write code and directs AI coding assistants. Facts, three story angles, and what is and is not measured. No customers, no hosted service, no hallucination rate claimed.",
    "ชุดข้อมูลสื่อของ Delentia: รันไทม์ agent โอเพนซอร์สระยะเริ่มต้นจากกรุงเทพฯ โดยคนคนเดียวที่เขียนโค้ดไม่เป็นและสั่งงานผู้ช่วยเขียนโค้ด AI ข้อเท็จจริง มุมข่าวสามแบบ และสิ่งที่วัดแล้วและยังไม่ได้วัด ยังไม่มีลูกค้า ไม่มีบริการโฮสต์ ไม่อ้างอัตรา hallucination",
    "/press",
    ["press kit", "media contact", "constitutional AI Thailand", "Delentia Labs press"]
  )
}

const facts = [
  { label: "Founded", labelTh: "ก่อตั้ง", value: "June 25, 2025" },
  { label: "What it is", labelTh: "คืออะไร", value: "An open-source agent runtime (Apache 2.0) with a safety gate, human-signed approvals and a signed audit log" },
  { label: "Install", labelTh: "ติดตั้ง", value: `pip install delentia-os (PyPI, ${SITE_VERSION})` },
  { label: "Algorithms", labelTh: "Algorithms", value: "41 in the public repository (a count of modules, not a performance claim)" },
  { label: "Test Suite", labelTh: "ชุดทดสอบ", value: "7,820 passed / 0 failed (public repository CI; coverage 91.37%)" },
  { label: "Measured results", labelTh: "ผลที่วัดแล้ว", value: "Each with its method and limits on the Benchmark page" },
  { label: "With a capable model", labelTh: "กับโมเดลที่เก่งพอ", value: "Not measured yet" },
  { label: "Hallucination rate", labelTh: "อัตรา Hallucination", value: "not claimed (an earlier figure was withdrawn)" },
  { label: "Customers / hosted service / SLA", labelTh: "ลูกค้า / บริการโฮสต์ / SLA", value: "none yet" },
  { label: "Funding", labelTh: "ทุน", value: "none outside" },
  { label: "Team", labelTh: "ทีม", value: "1: the founder, who does not write code and builds by directing AI coding assistants" },
  { label: "Location", labelTh: "ที่ตั้ง", value: "Bangkok, Thailand" },
  { label: "License", labelTh: "ใบอนุญาต", value: "Apache 2.0" },
]

const storyAngles = [
  {
    headline: "A non-coder from a Khlong Toei flat builds an open-source agent runtime with AI assistants",
    headlineTh: "คนเขียนโค้ดไม่เป็นจากแฟลตคลองเตยสร้างรันไทม์ agent โอเพนซอร์สด้วยผู้ช่วย AI",
    angle: "Human interest",
    angleTh: "ความสนใจมนุษย์",
    hook: "Ittirit Saengow studied architecture and cannot write code. He directs AI coding assistants and checks their work with tests, which is why the project publishes its measurements, its limits and the claims it withdrew.",
    hookTh: "อิทธิฤทธิ์ แซ่โง้ว เรียนสถาปัตยกรรมและเขียนโค้ดไม่เป็น เขาสั่งงานผู้ช่วยเขียนโค้ด AI และตรวจงานด้วยชุดทดสอบ นั่นคือเหตุผลที่โปรเจกต์เผยแพร่ผลที่วัด ข้อจำกัด และข้ออ้างที่ถอนแล้ว",
    badgeClass: "border-warm-amber/30 bg-warm-amber/10 text-warm-amber",
    cardClass: "border-warm-amber/20",
  },
  {
    headline: "An AI agent whose risky actions wait for a human signature, with a log anyone can check",
    headlineTh: "AI agent ที่การกระทำเสี่ยงต้องรอลายเซ็นมนุษย์ พร้อมบันทึกที่ใครก็ตรวจได้",
    angle: "Technology / AI safety",
    angleTh: "เทคโนโลยี / ความปลอดภัย AI",
    hook: "Every action passes a gate outside the model; risky ones wait for an Ed25519 signature from a person; every episode leaves a hash-chained, signed record. A model-free demo runs in about five seconds. It has not yet been shown with a capable model.",
    hookTh: "ทุกการกระทำผ่านด่านที่อยู่นอกโมเดล การกระทำที่เสี่ยงรอลายเซ็น Ed25519 จากคน และทุกรอบทิ้งบันทึกที่เชื่อม hash และลงนาม เดโมที่ไม่ต้องมีโมเดลรันได้ราว 5 วินาที ยังไม่เคยแสดงผลกับโมเดลที่เก่งพอ",
    badgeClass: "border-sky-400/30 bg-sky-400/10 text-sky-400",
    cardClass: "border-sky-400/20",
  },
  {
    headline: "A project that publishes its own corrections",
    headlineTh: "โปรเจกต์ที่เผยแพร่คำแก้ไขของตัวเอง",
    angle: "Transparency",
    angleTh: "ความโปร่งใส",
    hook: "Delentia withdrew a hallucination figure, a test count and a service count it could not reproduce, and lists each correction on its own page. It states what each measurement does not show.",
    hookTh: "Delentia ถอนตัวเลข hallucination จำนวนการทดสอบ และจำนวนบริการที่ทำซ้ำไม่ได้ และแจกแจงทุกการแก้ไขในหน้าของตัวเอง พร้อมบอกว่าแต่ละการวัดไม่ได้แสดงอะไร",
    badgeClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    cardClass: "border-emerald-500/20",
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
    description: "Open-source agent runtime from Bangkok, Thailand, built by a founder who directs AI coding assistants; 7,820 passing tests in the public repository CI; no hallucination rate is claimed.",
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
                : "Fact sheet, story angles, and media contact for journalists covering AI agents, open source, and Thailand's technology ecosystem."}
            </p>

            {/* Hero stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { value: "41", label: isTh ? "Algorithms ในรีโพสาธารณะ" : "Algorithms in the public repository" },
                { value: "7,820", label: isTh ? "Tests ผ่าน (public repository, CI-verified)" : "Tests Passing (public repository, CI-verified)" },
                { value: "not claimed", label: isTh ? "เป้าหมาย Benchmark Hallucination" : "Benchmark Hallucination Target" },
                { value: "no SLA", label: isTh ? "เป้าหมาย Design SLA" : "Uptime Design SLA Target" },
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
                  {isTh ? "ผู้ก่อตั้งและสถาปนิกระบบ, Delentia Labs · กรุงเทพฯ, ประเทศไทย" : "Founder & Architect, Delentia Labs · Bangkok, Thailand"}
                </p>
                <p className="text-muted-foreground leading-relaxed max-w-3xl mb-4">
                  {isTh
                    ? "อิทธิฤทธิ์ แซ่โง้ว เติบโตในชุมชนแฟลตคลองเตย กรุงเทพฯ เรียนสถาปัตยกรรมศาสตร์ (หลักสูตร 4 ปีที่ใช้เวลา 6 ปีครึ่ง) ทำธุรกิจมา 4 อย่างก่อนโปรเจกต์นี้ และเขียนโค้ดไม่เป็น เรื่องส่วนตัวเหล่านี้เป็นคำบอกเล่าของเขาเอง ตรวจจากเว็บนี้ไม่ได้ ส่วนโค้ด รุ่นที่เผยแพร่ และการทดสอบตรวจได้ เขาคิดแนวคิด FDIA, JITNA และ RCT-7 และสร้าง Delentia ด้วยการสั่งงานผู้ช่วยเขียนโค้ด AI โดยตรวจงานด้วยชุดทดสอบ จุดเริ่มต้นของโปรเจกต์คือวันที่ 25 มิถุนายน 2025 เป็นโปรเจกต์ระยะเริ่มต้นของคนคนเดียว ไม่มีทุนภายนอกและยังไม่มีลูกค้า"
                    : "Ittirit Saengow grew up in a flat community in Khlong Toei, Bangkok, studied architecture (a four-year programme that took him six and a half years), ran four businesses before this project, and does not write code. These personal facts are his own account and cannot be checked from this site; the code, releases and tests can. He conceived the FDIA, JITNA and RCT-7 ideas and builds Delentia by directing AI coding assistants and checking their work with tests. The project began on 25 June 2025. It is an early, one-person project with no outside funding and no customers yet."}
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
              { label: "7,820 Tests Methodology", labelTh: "วิธีการทดสอบ 7,820 รายการ", href: `${localePrefix}/blog/rct-ecosystem-4849-tests-methodology` },
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

