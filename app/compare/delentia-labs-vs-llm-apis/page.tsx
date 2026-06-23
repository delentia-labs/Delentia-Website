import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { ArrowRight, CheckCircle, XCircle, MinusCircle, Globe, Shield, DollarSign } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Delentia Labs vs LLM APIs โ€” Constitutional AI vs Bare API Access",
    "Delentia Labs vs LLM APIs โ€” Constitutional AI เน€เธ—เธตเธขเธเธเธฑเธ Bare API",
    "Bare LLM API access gives you raw model power with no governance, no compliance, and no memory. Delentia Labs adds constitutional AI constraints, multi-model consensus, PDPA-compliant memory, and deterministic safety guarantees.",
    "เธเธฒเธฃเนเธเน LLM API เธ•เธฃเธเนเธซเนเธเธฅเธฑเธเธเธญเธเนเธกเน€เธ”เธฅเธ”เธดเธเนเธ”เธขเนเธกเนเธกเธต governance, compliance เนเธฅเธฐ memory เธชเนเธงเธ Delentia Labs เน€เธเธดเนเธก constitutional AI, multi-model consensus, memory เธ—เธตเนเธฃเธญเธเธฃเธฑเธ PDPA เนเธฅเธฐ deterministic safety guarantee",
    "/compare/delentia-labs-vs-llm-apis",
    ["Delentia Labs vs LLM APIs", "constitutional AI platform", "enterprise AI governance"]
  )
}

const LLM_API_FAQS = [
  {
    question: "What is the difference between Delentia Labs and a bare LLM API?",
    answer: "A bare LLM API (OpenAI, Claude, Gemini) gives you raw model access with no governance, no persistent memory, and no compliance guarantees. You are responsible for all safety, audit, and PDPA compliance yourself. Delentia Labs is a constitutional AI operating system that adds the FDIA framework (deterministic safety), RCTDB (PDPA-compliant persistent memory), JITNA Protocol (agent orchestration), and HexaCore routing (cost optimization) on top of any LLM.",
  },
  {
    question: "Does Delentia Labs replace the LLM API or sit on top of it?",
    answer: "Delentia Labs sits on top of multiple LLM APIs. The HexaCore router includes 7 models (Claude Opus, Kimi K2.5, MiniMax, Gemini Flash, Grok, DeepSeek, and Typhoon v2 for Thai). Delentia Labs intelligently routes each query to the appropriate model โ€” you do not need to manage individual API calls. This produces a 3.74x cost reduction compared to always using a premium model.",
  },
  {
    question: "How does Delentia Labs achieve PDPA compliance that bare LLM APIs cannot?",
    answer: "Bare LLM APIs are stateless โ€” they process a request and forget it. PDPA compliance requires persistence: the ability to prove what data was used, when, and why (Section 33), and the ability to permanently delete a person's data on request (Section 34). RCTDB stores every query as an 8-dimensional record with full provenance. When a data subject requests erasure, their subject_uuid is tombstoned โ€” ensuring no retrievable data remains.",
  },
  {
    question: "What is the 3.74x cost reduction from HexaCore routing?",
    answer: "Instead of routing every query to Claude Opus (the most expensive model), HexaCore analyzes each task and selects the optimal model. Simple retrieval tasks go to faster, cheaper models. Complex synthesis tasks go to premium models only when required. Over a 10,000-query enterprise workload, this produces a 3.74x average cost reduction versus always using Claude Opus.",
  },
  {
    question: "Is vendor lock-in a concern with Delentia Labs?",
    answer: "No. Delentia Labs is vendor-neutral by design. The HexaCore router abstracts all 7 models behind a unified interface. If you want to swap Claude Opus for a new model, you update the router configuration โ€” no application code changes required. This is in contrast to building directly on a single LLM API, where switching providers requires significant refactoring.",
  },
]

function CompareIcon({ value }: { value: "yes" | "no" | "partial" }) {
  if (value === "yes") return <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
  if (value === "no") return <XCircle className="w-5 h-5 text-red-400/70 mx-auto" />
  return <MinusCircle className="w-5 h-5 text-warm-amber/60 mx-auto" />
}

const rows = [
  { feature: "Hallucination prevention (deterministic)", llm: "no", rct: "yes" },
  { feature: "PDPA/GDPR audit trail (auto-generated)", llm: "no", rct: "yes" },
  { feature: "Multi-model consensus verification", llm: "no", rct: "yes" },
  { feature: "Persistent memory across sessions", llm: "no", rct: "yes" },
  { feature: "Warm recall (\u003c50ms)", llm: "no", rct: "yes" },
  { feature: "Constitutional kill switch (A=0 โ’ F=0)", llm: "no", rct: "yes" },
  { feature: "Thai-language model support (Typhoon v2)", llm: "partial", rct: "yes" },
  { feature: "Vendor-neutral (swap models freely)", llm: "no", rct: "yes" },
  { feature: "Cost optimization (3.74x vs single model)", llm: "no", rct: "yes" },
  { feature: "ISO/PDPA compliance documentation", llm: "no", rct: "yes" },
  { feature: "Direct API access (no middleware)", llm: "yes", rct: "partial" },
  { feature: "Open source components (Apache 2.0)", llm: "no", rct: "yes" },
  { feature: "Custom fine-tuning support", llm: "yes", rct: "partial" },
]

const useCases = [
  {
    scenario: "Enterprise regulated AI (PDPA, finance, healthcare)",
    llm: "โ",
    rct: "โ…",
    reason: "Requires audit trail, right to erasure, and Section 33 explainability โ€” all provided by RCT's RCTDB + JITNA.",
  },
  {
    scenario: "Quick prototyping / developer experiments",
    llm: "โ…",
    rct: "โ ๏ธ",
    reason: "Raw LLM API is simpler for one-off experiments. RCT Ecosystem is designed for production-grade deployments.",
  },
  {
    scenario: "Agentic workflows with multiple AI agents",
    llm: "โ",
    rct: "โ…",
    reason: "JITNA Protocol provides standardized agent negotiation. LLM APIs have no concept of multi-agent orchestration.",
  },
  {
    scenario: "Thai enterprise AI deployment",
    llm: "โ ๏ธ",
    rct: "โ…",
    reason: "HexaCore includes Typhoon v2 (Thai model). PDPA compliance is built-in. Delentia Labs is Thailand-native.",
  },
  {
    scenario: "Research / academic use",
    llm: "โ…",
    rct: "โ…",
    reason: "Both work. RCT adds reproducibility via signed, verifiable outputs (SignedAI + RCTDB).",
  },
]

export default async function RCTvsLLMAPIs() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Compare", url: `https://delentia.com${localePrefix}/compare` },
    { name: "Delentia Labs vs LLM APIs", url: `https://delentia.com${localePrefix}/compare/delentia-labs-vs-llm-apis` },
  ])
  const faq = getFAQSchema(LLM_API_FAQS)

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <main className="min-h-screen bg-background">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(191,160,110,0.07),transparent_60%)] pointer-events-none" />
          <div className="mx-auto max-w-4xl px-4 py-24 md:py-32 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-amber/30 bg-warm-amber/8 text-warm-amber text-sm font-medium mb-6">
              <Globe className="w-4 h-4" /> Platform Comparison
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4 text-balance">
              Delentia Labs vs Bare LLM APIs
            </h1>
            <p className="text-xl text-warm-dim max-w-2xl mx-auto mb-8">
              A bare LLM API is a model. Delentia Labs is a constitutional AI operating system. The difference is not performance โ€” it is governance, compliance, and memory.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-warm-dim">Enterprise Governance</span>
              <span className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-warm-dim">PDPA Compliance</span>
              <span className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-warm-dim">Constitutional AI</span>
            </div>
          </div>
        </section>

        {/* Summary cards */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Globe,
                title: "Bare LLM APIs (OpenAI, Claude, Gemini, etc.)",
                color: "border-blue-400/30 from-blue-400/8",
                titleColor: "text-blue-400",
                points: [
                  "Raw access to one model at a time",
                  "No persistent memory โ€” context window only",
                  "Probabilistic output โ€” model may hallucinate",
                  "No audit trail, no right-to-erasure mechanism",
                  "PDPA compliance left entirely to you",
                  "No agent-to-agent communication standard",
                  "Vendor lock-in โ€” switch provider = rewrite code",
                  "Cost: always paying premium model rates",
                ],
                verdict: "Best for: rapid prototyping, research, simple tasks",
                verdictColor: "text-blue-400",
              },
              {
                icon: Shield,
                title: "Delentia Labs Constitutional AI Ecosystem",
                color: "border-warm-amber/30 from-warm-amber/8",
                titleColor: "text-warm-amber",
                points: [
                  "7 HexaCore models, intelligently routed",
                  "RCTDB: 8-dimensional persistent memory across sessions",
                  "FDIA kill switch: A=0 โ’ output=0, always",
                  "Full audit trail: every decision cryptographically logged",
                  "PDPA compliance: UUID tombstone right-to-erasure",
                  "JITNA Protocol: open agent-to-agent standard",
                  "Vendor-neutral: swap models without code changes",
                  "Cost: 3.74x reduction via intelligent routing",
                ],
                verdict: "Best for: enterprise AI at scale, regulated industries",
                verdictColor: "text-warm-amber",
              },
            ].map(({ icon: Icon, title, color, titleColor, points, verdict, verdictColor }) => (
              <div key={title} className={`rounded-2xl border bg-linear-to-br ${color} to-transparent p-6`}>
                <Icon className="w-8 h-8 text-warm-dim mb-4" />
                <h2 className={`text-lg font-bold ${titleColor} mb-4`}>{title}</h2>
                <ul className="space-y-2 mb-6">
                  {points.map((pt) => (
                    <li key={pt} className="text-sm text-warm-dim flex items-start gap-2">
                      <span className="mt-0.5 shrink-0">โ€ข</span>{pt}
                    </li>
                  ))}
                </ul>
                <p className={`text-sm font-semibold ${verdictColor}`}>{verdict}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key insight */}
        <section className="mx-auto max-w-4xl px-4 py-8">
          <div className="rounded-2xl border border-warm-amber/20 bg-warm-amber/5 p-6">
            <div className="flex items-start gap-4">
              <DollarSign className="w-6 h-6 text-warm-amber shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground mb-1">The Hidden Cost of Bare API Access</p>
                <p className="text-warm-dim text-sm leading-relaxed">
                  A bare LLM API charges you premium rates for every token โ€” even tokens that retrieve information you already paid for last week. RCT&apos;s Delta Engine + RCTDB warm recall ({"<"}50ms) means repeated queries are served from memory, not from an LLM API call. Over a typical enterprise workload, this produces a <strong className="text-warm-amber">3.74x cost reduction</strong> vs always calling Claude Opus directly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature matrix */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">Feature Comparison Matrix</h2>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-4 text-warm-dim font-semibold">Feature</th>
                  <th className="text-center px-4 py-4 text-blue-400 font-semibold">Bare LLM API</th>
                  <th className="text-center px-4 py-4 text-warm-amber font-semibold">RCT Ecosystem</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-white/5 ${i % 2 === 0 ? "" : "bg-white/2"}`}>
                    <td className="px-6 py-3 text-foreground">{row.feature}</td>
                    <td className="px-4 py-3"><CompareIcon value={row.llm as "yes"|"no"|"partial"} /></td>
                    <td className="px-4 py-3"><CompareIcon value={row.rct as "yes"|"no"|"partial"} /></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-white/3">
                  <td className="px-6 py-3 text-warm-dim text-xs flex gap-4">
                    <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-400" /> Yes</span>
                    <span className="flex items-center gap-1.5"><MinusCircle className="w-3.5 h-3.5 text-warm-amber/60" /> Partial</span>
                    <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5 text-red-400/70" /> No</span>
                  </td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* Use case matrix */}
        <section className="mx-auto max-w-7xl px-4 py-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">When to Use Which</h2>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-4 text-warm-dim font-semibold">Scenario</th>
                  <th className="text-center px-4 py-4 text-blue-400 font-semibold">Bare LLM API</th>
                  <th className="text-center px-4 py-4 text-warm-amber font-semibold">Delentia Labs</th>
                  <th className="text-left px-4 py-4 text-warm-dim font-semibold hidden md:table-cell">Reason</th>
                </tr>
              </thead>
              <tbody>
                {useCases.map((row, i) => (
                  <tr key={row.scenario} className={`border-b border-white/5 ${i % 2 === 0 ? "" : "bg-white/2"}`}>
                    <td className="px-6 py-3 text-foreground">{row.scenario}</td>
                    <td className="px-4 py-3 text-center text-base">{row.llm}</td>
                    <td className="px-4 py-3 text-center text-base">{row.rct}</td>
                    <td className="px-4 py-3 text-warm-dim text-xs hidden md:table-cell">{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="rounded-2xl border border-warm-amber/20 bg-warm-amber/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Explore the Architecture</h2>
              <p className="text-warm-dim">Read how FDIA, JITNA, and RCTDB work together to provide constitutional AI guarantees</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href={`${localePrefix}/blog/fdia-equation-explained`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-warm-amber text-background font-semibold text-sm hover:bg-warm-amber/90 transition"
              >
                FDIA Deep-Dive <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`${localePrefix}/benchmark-summary`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 text-warm-dim hover:border-warm-amber/30 hover:text-warm-amber transition text-sm"
              >
                Benchmarks
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}


