import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { EcosystemOrbitalMap } from "@/components/ecosystem-orbital-map"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getRequestLocale } from "@/lib/request-locale"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Ecosystem — Adapters & Skills Registry",
    "Ecosystem — รีจิสทรี Adapter & Skill",
    "Browse the Delentia OS ecosystem — channel adapters (LINE, WhatsApp, Telegram, Discord, GitHub, Notion, Slack) and AI skills (Thai NLP, web search, document summary, financial analysis).",
    "เลือกดู ecosystem ของ Delentia OS — channel adapters (LINE, WhatsApp, Telegram, Discord, GitHub, Notion, Slack) และ AI skills (Thai NLP, web search, document summary, financial analysis)",
    "/ecosystem"
  )
}

// ── Static data ───────────────────────────────────────────────────────────────

const ADAPTERS = [
  { id: "line-adapter", name: "LINE", icon: "💬", region: "TH · JP · TW", tag: "messaging", verified: false },
  { id: "slack-adapter", name: "Slack", icon: "⚡", region: "GLOBAL", tag: "messaging", verified: false },
  { id: "whatsapp-adapter", name: "WhatsApp Business", icon: "📱", region: "TH · BR · IN · US", tag: "messaging", verified: true },
  { id: "telegram-adapter", name: "Telegram", icon: "✈️", region: "GLOBAL", tag: "messaging", verified: true },
  { id: "discord-adapter", name: "Discord", icon: "🎮", region: "GLOBAL", tag: "developer", verified: true },
  { id: "github-adapter", name: "GitHub", icon: "🐙", region: "GLOBAL", tag: "ci-cd", verified: true },
  { id: "notion-adapter", name: "Notion", icon: "📝", region: "GLOBAL", tag: "enterprise", verified: true },
]

const SKILLS = [
  { id: "thai-language-skill", name: "Thai Language", icon: "🇹🇭", desc: "PDPA compliance + Thai legal parsing", verified: false },
  { id: "legal-pdpa-skill", name: "Legal PDPA", icon: "⚖️", desc: "Thai PDPA constitutional engine", verified: false },
  { id: "thai-nlp-skill", name: "Thai NLP Advanced", icon: "🧠", desc: "PyThaiNLP + Typhoon v2 ML", verified: true },
  { id: "web-search-skill", name: "Web Search", icon: "🔍", desc: "Real-time search via Tavily API", verified: true },
  { id: "document-summary-skill", name: "Document Summary", icon: "📄", desc: "PDF/DOCX EN/TH summarization", verified: true },
  { id: "financial-analysis-skill", name: "Financial Analysis (TH)", icon: "📊", desc: "Thai GAAP + SET compliance analysis", verified: true },
]

export default async function EcosystemPage() {
  const locale = await getRequestLocale()
  const isTH = locale === "th"

  const verifiedCount = [...ADAPTERS, ...SKILLS].filter((x) => x.verified).length

  return (
    <main className="relative min-h-screen bg-background" id="main-content">
      <Navbar locale={locale} />
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">
            {isTH ? "Ecosystem Registry" : "Ecosystem Registry"}
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            {isTH
              ? "Adapters และ Skills ที่พร้อมใช้งานกับ Delentia OS ผ่าน JITNA v3 channel"
              : "Channel adapters and AI skills ready to connect with Delentia OS via JITNA v3."}
          </p>
        {/* Stats */}
        <div className="flex justify-center gap-6 text-sm text-gray-500 pt-2">
          <span><strong className="text-gray-900 dark:text-gray-100">{ADAPTERS.length}</strong> adapters</span>
          <span><strong className="text-gray-900 dark:text-gray-100">{SKILLS.length}</strong> skills</span>
          <span>
            <strong className="text-green-600 dark:text-green-400">{verifiedCount}</strong> security-verified
          </span>
        </div>
      </div>

      {/* Interactive Ecosystem Orbital Map System */}
      <EcosystemOrbitalMap locale={locale} />

      {/* Adapters */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          {isTH ? "Channel Adapters" : "Channel Adapters"}
        </h2>
        <p className="text-gray-500 text-sm">
          {isTH
            ? "Adapter เชื่อมต่อ Delentia OS กับ messaging และ enterprise platforms ผ่าน webhook"
            : "Adapters connect Delentia OS to messaging and enterprise platforms via webhooks."}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ADAPTERS.map((adapter) => (
            <div
              key={adapter.id}
              className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col gap-2 hover:border-gray-300 dark:hover:border-gray-700 transition"
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl">{adapter.icon}</span>
                {adapter.verified && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700/40">
                    ✓
                  </span>
                )}
              </div>
              <p className="font-semibold text-sm">{adapter.name}</p>
              <p className="text-[11px] text-gray-500">{adapter.region}</p>
              <span className="text-[11px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded w-fit">
                {adapter.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          {isTH ? "AI Skills" : "AI Skills"}
        </h2>
        <p className="text-gray-500 text-sm">
          {isTH
            ? "Skills เพิ่มความสามารถ AI ให้กับ JITNA packet pipeline"
            : "Skills augment the JITNA packet pipeline with specialized AI capabilities."}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {SKILLS.map((skill) => (
            <div
              key={skill.id}
              className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col gap-2 hover:border-gray-300 dark:hover:border-gray-700 transition"
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl">{skill.icon}</span>
                {skill.verified && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700/40">
                    ✓
                  </span>
                )}
              </div>
              <p className="font-semibold text-sm">{skill.name}</p>
              <p className="text-[11px] text-gray-500">{skill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Developer CTA */}
      <section className="border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-xl font-semibold">
          {isTH ? "สร้าง Adapter ของคุณเอง" : "Build Your Own Adapter"}
        </h2>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">
          {isTH
            ? "ใช้ Adapter SDK ในการสร้าง custom adapter สำหรับ platform ใดก็ได้ใน 30 นาที"
            : "Use the Adapter SDK to build a custom adapter for any platform in under 30 minutes."}
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <a
            href="https://github.com/delentia-labs/delentia-ecosystem"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium hover:opacity-90 transition"
          >
            View on GitHub →
          </a>
          <a
            href="https://docs.delentia.com/ecosystem/adapter-sdk"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900/50 transition text-gray-700 dark:text-gray-300"
          >
            Adapter SDK Docs
          </a>
        </div>
      </section>
      </div>
      <Footer locale={locale} />
    </main>
  )
}
