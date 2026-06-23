"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { m } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { Globe, ArrowRight } from "lucide-react"
import RelatedContent from "@/components/related-content"
import AuthorBlock from "@/components/author-block"

const regionalModels = [
  { region: "Thailand", flag: "🇹🇭", model: "Typhoon v2 70B", provider: "SCB10X", id: "G38 / Pluggable", proficiency: "0.99", status: "Active", color: "#D4A853" },
  { region: "Japan", flag: "🇯🇵", model: "Rakuten AI 3.0 / LLM-jp-4", provider: "Rakuten / NII", id: "Regional", proficiency: "0.98", status: "Pluggable", color: "#89B4C8" },
  { region: "Korea", flag: "🇰🇷", model: "HyperCLOVA X / Solar Pro 2", provider: "NAVER / Upstage", id: "Regional", proficiency: "0.98", status: "Pluggable", color: "#7B9E87" },
  { region: "Vietnam", flag: "🇻🇳", model: "ViGPT / Vistral", provider: "VinAI / Open Source", id: "Regional", proficiency: "0.95", status: "Pluggable", color: "#C4745B" },
  { region: "Indonesia", flag: "🇮🇩", model: "SEA-LION / Qwen-2.5-7B", provider: "AI Singapore", id: "Regional", proficiency: "0.95", status: "Pluggable", color: "#B8A9C9" },
  { region: "India", flag: "🇮🇳", model: "Krutrim / Sarvam AI", provider: "Ola / Sarvam", id: "Regional", proficiency: "0.96", status: "Pluggable", color: "#9B7BB8" },
  { region: "Saudi Arabia", flag: "🇸🇦", model: "ALLaM / Jais", provider: "SDAIA / G42", id: "Regional", proficiency: "0.96", status: "Pluggable", color: "#D4A853" },
  { region: "China", flag: "🇨🇳", model: "Kimi K2.5 / MiniMax", provider: "Moonshot / MiniMax", id: "G2/G3", proficiency: "0.98", status: "Active", color: "#C4745B" },
]

const pluginSteps = [
  { step: "1", title: "Configure Model Entry", descEn: "Define your model metadata, including context window size, input/output cost, and national compliance tags (e.g. APPI, PDPA).", descTh: "กำหนดรายละเอียดเมทาดาต้าของโมเดล ขนาดของ Context หน้าต่างรับคำสั่ง และแท็กกฎหมายความเป็นส่วนตัวเฉพาะประเทศ" },
  { step: "2", title: "Register Regional LLM", descEn: "Call register_regional_llm(language, region, model_id, model_name, ...) dynamically at runtime.", descTh: "เรียกใช้ฟังก์ชัน register_regional_llm(language, region, ...) เพื่อลงทะเบียนโมเดลเฉพาะพื้นที่ในรันไทม์โดยไม่ต้องรีสตาร์ตระบบ" },
  { step: "3", title: "Automatic JITNA Routing", descEn: "JITNA automatically detects the user's language and region and routes calls to your custom LLM adapter.", descTh: "โปรโตคอล JITNA ตรวจจับภาษาและภูมิภาคจากข้อความค้นหา แล้วเปลี่ยนเส้นทางไปยังโมเดลของคุณโดยอัตโนมัติ" },
]

export default function RegionalAIClient() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isTh = locale === "th"
  const localePrefix = isTh ? "/th" : ""

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      {/* Answer-first — screen-reader + crawler accessible; not shown visually */}
      <section className="sr-only">
        <p>
          {isTh
            ? "Regional AI รวม LLM ภูมิภาคเช่น Typhoon, HyperCLOVA X, Rakuten AI เข้ากับโครงสร้างประสาน JITNA + SignedAI + RCTDB เพื่อมอบ Sovereign AI ที่สอดรับกับ PDPA และข้อกำหนดด้านความเป็นอธิปไตย์ของข้อมูลในเอเชียและภูมิภาคต่างๆ ทั่วโลก"
            : "Regional AI integrates sovereign regional LLMs like Typhoon, HyperCLOVA X, and Rakuten AI into JITNA + SignedAI + RCTDB — delivering local compliance, regulatory context, and cultural nuance for Asia and global deployments."}
        </p>
      </section>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium"
            style={{ backgroundColor: "#D4A85315", borderColor: "#D4A85330", color: "#D4A853" }}>
            <Globe className="w-4 h-4" /> {isTh ? "Regional AI" : "Regional AI"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            {isTh ? "Sovereign AI สำหรับทุกภูมิภาค" : "Sovereign AI for Every Region"}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isTh
              ? "โครงสร้างระบบปฏิบัติการ AI แบบเปิดที่ให้คุณสามารถ 'ถอดเสียบ' (Pluggable) โมเดลภาษาประจำชาติของแต่ละประเทศเข้ามาประสานร่วมกับระบบความปลอดภัย FDIA ได้อย่างอิสระ"
              : "A pluggable AI OS infrastructure that allows developers to dynamically hot-swap national/sovereign LLMs to enforce local data laws, compliance, and cultural nuances."}
          </p>
        </div>
      </section>

      {/* Typhoon Spotlight */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🇹🇭</span>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-bold text-foreground">
                    {isTh ? "Standard Package — Typhoon v2" : "Standard Package — Typhoon v2"}
                  </h2>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-green-500/10 text-green-600">Active</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {isTh
                    ? "โมเดล Typhoon v2 70B โดย SCB10X ถูกติดตั้งมาเป็นแพ็คเกจเริ่มต้นสำหรับภาษาไทย อย่างไรก็ดี คุณสามารถสลับเปลี่ยนไปใช้โมเดลประจำภูมิภาคอื่นๆ ผ่าน API การลงทะเบียนแบบ plug-in ได้ทันทีโดยไม่ต้องรีสตาร์ตระบบ"
                    : "Typhoon v2 70B by SCB10X is bundled as the default standard package for Thailand. However, the system is fully pluggable and lets developers register other native models at runtime."}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Model ID", value: "G38 / Pluggable" },
                    { label: "Provider", value: "SCB10X" },
                    { label: "Proficiency TH", value: "0.99" },
                    { label: "Role", value: "regional_core" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-xl bg-muted text-center">
                      <div className="text-sm font-bold text-foreground">{item.value}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional LLM Map */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground text-center mb-4">
          {isTh ? "แผนที่ Regional LLMs ที่รองรับ" : "Supported Regional LLMs"}
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-10 max-w-xl mx-auto">
          {isTh
            ? "โมเดลมาตรฐานได้รับการติดตั้งมาแล้ว และแบบ 'Pluggable' สามารถเสียบเพิ่มเข้ามาได้ง่ายๆ ใน 3 ขั้นตอน"
            : "Active standard packages are pre-installed. 'Pluggable' models can be registered in 3 simple steps."}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {regionalModels.map((_item, i) => (
            <m.div key={_item.region} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
               className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{_item.flag}</span>
                <div>
                  <div className="text-sm font-bold text-foreground">{_item.region}</div>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${_item.status === "Active" ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}>
                    {_item.status}
                  </span>
                </div>
              </div>
              <div className="text-xs font-medium text-foreground mb-0.5">{_item.model}</div>
              <div className="text-xs text-muted-foreground mb-2">{_item.provider}</div>
              <div className="text-xs" style={{ color: _item.color }}>Proficiency: {_item.proficiency}</div>
            </m.div>
          ))}
        </div>
      </section>

      {/* Plug-in Architecture */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-4">
            {isTh ? "Plug-in ใน 3 ขั้นตอน" : "How to Plug in Your Regional LLM"}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            {isTh
              ? "ระบบ Registry รองรับการลงทะเบียนและสลับโมเดลแบบ Hot-swap ในรันไทม์ได้ทันที"
              : "The model registry supports hot-swapping and registering regional models dynamically at runtime."}
          </p>
          <div className="space-y-4">
            {pluginSteps.map((s, i) => (
              <m.div key={s.step} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-warm-amber/10 text-warm-amber">{s.step}</span>
                <div>
                  <div className="text-sm font-bold text-foreground mb-1 font-mono">{s.title}</div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{isTh ? s.descTh : s.descEn}</p>
                </div>
              </m.div>
            ))}
          </div>

          {/* Code snippet */}
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 overflow-x-auto">
            <pre className="text-xs font-mono text-muted-foreground">{`# Register custom Japanese regional LLM dynamically at runtime
register_regional_llm(
    language="ja",
    region="JP",
    model_id="rakuten/Rakuten-AI-3.0-MoE-700B",
    model_name="Rakuten AI 3.0",
    proficiency=0.98,
    cost_input=0.40,
    cost_output=1.20,
    specialties=["Japanese legal", "Business documentation"],
    compliance_tags=["APPI"]
)`}</pre>
          </div>
        </div>
      </section>

      {/* Why Regional + RCT */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">
          {isTh ? "ทำไม Typhoon + RCT = ไม่ใช่คู่แข่ง?" : "Why Typhoon + RCT = Complementary, Not Competing"}
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="font-bold text-foreground mb-2">{isTh ? "Typhoon ฝึกโมเดล" : "Typhoon trains models"}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isTh
                ? "SCB10X ฝึก LLMs สำหรับภาษาไทยและบริบทท้องถิ่น — สร้างโมเดลที่เข้าใจภาษาไทยลึกกว่าโมเดลทั่วไป"
                : "SCB10X trains LLMs specifically for Thai language and local context — producing models that understand Thai nuances better than general-purpose models."}
            </p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="text-2xl mb-3">🔗</div>
            <h3 className="font-bold text-foreground mb-2">{isTh ? "RCT ประสานโมเดล" : "RCT orchestrates models"}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isTh
                ? "RCT ใช้ JITNA + SignedAI + RCTDB ในการ Route, Verify และ Persist ผลลัพธ์จากโมเดล Typhoon — ทำให้ปัญญา AI ภาษาไทยอยู่ใน Enterprise-grade Infrastructure"
                : "RCT uses JITNA + SignedAI + RCTDB to route, verify, and persist results from Typhoon — putting Thai-language AI intelligence inside enterprise-grade infrastructure."}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            {isTh ? "พร้อม Deploy Regional AI?" : "Ready to Deploy Your Regional AI?"}
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`${localePrefix}/contact`} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-warm-amber text-white font-medium text-sm hover:bg-[#C49A48] transition-colors">
              {isTh ? "ติดต่อเรา" : "Contact Us"} <ArrowRight size={16} />
            </Link>
            <Link href={`${localePrefix}/solutions/dynamic-ai-routing`} className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors">
              {isTh ? "JITNA Dynamic Routing" : "JITNA Dynamic Routing"}
            </Link>
          </div>
        </div>
      </section>

      {/* E-E-A-T + Internal Links */}
      <section className="py-14 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto space-y-10">
          <RelatedContent
            title={isTh ? "แหล่งข้อมูลที่เกี่ยวข้อง" : "Related Resources"}
            items={[
              {
                title: isTh ? "JITNA RFC-001 Protocol" : "JITNA RFC-001 Protocol",
                description: isTh
                  ? "โปรโตคอลสื่อสาร Intent ที่กำหนดว่า JITNA Route ไปยัง Typhoon G38 หรือ LLM ภูมิภาคอื่นๆ อย่างไร"
                  : "The intent communication protocol that defines how JITNA routes to Typhoon G38 and other regional LLMs.",
                href: "/protocols/jitna-rfc-001",
                category: isTh ? "โปรโตคอล" : "Protocol",
              },
              {
                title: isTh ? "Dynamic AI Routing" : "Dynamic AI Routing",
                description: isTh
                  ? "ระบบ 9-Tier Routing ที่เลือก Typhoon G38 โดยอัตโนมัติสำหรับ Query ภาษาไทย"
                  : "9-tier routing that automatically selects Typhoon G38 for Thai-language queries using proficiency scores.",
                href: "/solutions/dynamic-ai-routing",
                category: isTh ? "โซลูชัน" : "Solution",
              },
              {
                title: isTh ? "สถาปัตยกรรม RCT" : "RCT Architecture",
                description: isTh
                  ? "ภาพรวมสถาปัตยกรรม 10 ชั้นที่รวม Regional Models เข้ากับ HexaCore G1–G38"
                  : "10-layer architecture overview showing how Regional Models integrate into HexaCore G1–G38.",
                href: "/architecture",
                category: isTh ? "เทคนิค" : "Technical",
              },
            ]}
          />
          <AuthorBlock authorSlug="ittirit-saengow" locale={(isTh ? "th" : "en") as "en" | "th"} />
        </div>
      </section>

      <Footer />
    </main>
  )
}

