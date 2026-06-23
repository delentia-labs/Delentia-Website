import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { ArrowRight, CheckCircle, XCircle, MinusCircle, Shield, Zap, Database } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Constitutional AI vs RAG โ€” Hallucination Prevention Comparison",
    "Constitutional AI vs RAG โ€” เน€เธเธฃเธตเธขเธเน€เธ—เธตเธขเธเธเธฒเธฃเธฅเธ” Hallucination",
    "RAG grounds AI responses in documents. Constitutional AI constrains what the system can output. This comparison explains the architectural difference, use cases, and why combining both achieves 0.3% hallucination in the RCT Ecosystem.",
    "RAG เธเนเธงเธขเธขเธถเธ”เธเธณเธ•เธญเธเธเธฑเธเน€เธญเธเธชเธฒเธฃ เธชเนเธงเธ Constitutional AI เธเธงเธเธเธธเธกเธชเธดเนเธเธ—เธตเนเธฃเธฐเธเธเธชเธฒเธกเธฒเธฃเธ–เธเธฅเนเธญเธขเธญเธญเธเธกเธฒเนเธ”เน เธซเธเนเธฒเธเธตเนเธญเธเธดเธเธฒเธขเธเธงเธฒเธกเธ•เนเธฒเธเน€เธเธดเธเธชเธ–เธฒเธเธฑเธ•เธขเธเธฃเธฃเธก use cases เนเธฅเธฐเน€เธซเธ•เธธเธเธฅเธ—เธตเนเธเธฒเธฃเธฃเธงเธกเธ—เธฑเนเธเธชเธญเธเนเธเธงเธ—เธฒเธเธเนเธงเธขเนเธซเน RCT Ecosystem เธ—เธณ hallucination เนเธ”เนเน€เธเธตเธขเธ 0.3%",
    "/compare/constitutional-ai-vs-rag",
    ["constitutional AI vs RAG", "hallucination prevention", "AI safety comparison"]
  )
}

const COMPARE_FAQS = [
  {
    question: "What is the difference between Constitutional AI and RAG?",
    answer: "RAG (Retrieval-Augmented Generation) grounds AI responses in retrieved documents but cannot deterministically prevent unsafe outputs. Constitutional AI constrains what the system can output through mathematical rules โ€” in the RCT Ecosystem, the FDIA equation's Architect gate (A=0โ’F=0) ensures output is blocked unconditionally when required. RAG is about knowledge quality; Constitutional AI is about behavioral guarantees.",
  },
  {
    question: "Can you use RAG and Constitutional AI together?",
    answer: "Yes. The RCT Ecosystem combines both approaches. RAG provides factual grounding through RCTDB retrieval, while Constitutional AI (FDIA framework) provides deterministic safety constraints. Together, they achieve a 0.3% hallucination rate โ€” compared to ~3โ€“5% for RAG alone and ~12โ€“15% for unguarded LLMs.",
  },
  {
    question: "Does RAG prevent hallucinations?",
    answer: "RAG reduces hallucination by grounding responses in retrieved documents, but it does not deterministically prevent them. A model can still ignore retrieved context or confabulate. RAG-only systems typically achieve 3โ€“5% hallucination rates. Constitutional AI adds mathematical safety constraints on top of retrieval to reduce this further.",
  },
  {
    question: "What is a constitutional AI kill switch?",
    answer: "In the RCT Ecosystem, the FDIA Architect variable (A) acts as a constitutional kill switch. When A=0, the system mathematically guarantees F=0 โ€” no output is produced regardless of what any LLM would generate. This is implemented as a hard gate in core/kernel/fdia.py, not a soft preference.",
  },
  {
    question: "How does Constitutional AI provide a PDPA audit trail?",
    answer: "Every RCT Ecosystem query writes its full provenance chain to RCTDB โ€” an 8-dimensional memory schema that records the query hash, FDIA scores (D, I, A, F), model chain, consensus result, and provenance trail. This automatically generates the audit evidence required for PDPA Section 33 (right to explanation) and Section 34 (right to object).",
  },
]

function CompareIcon({ value }: { value: "yes" | "no" | "partial" }) {
  if (value === "yes") return <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
  if (value === "no") return <XCircle className="w-5 h-5 text-red-400/70 mx-auto" />
  return <MinusCircle className="w-5 h-5 text-warm-amber/60 mx-auto" />
}

const comparison = [
  { feature: "Factual grounding via documents", rag: "yes", constitutional: "partial", combined: "yes" },
  { feature: "Deterministic safety guarantee", rag: "no", constitutional: "yes", combined: "yes" },
  { feature: "Multi-model consensus", rag: "no", constitutional: "yes", combined: "yes" },
  { feature: "PDPA/GDPR audit trail", rag: "no", constitutional: "yes", combined: "yes" },
  { feature: "Warm recall (<50ms)", rag: "no", constitutional: "yes", combined: "yes" },
  { feature: "Constitutional kill switch", rag: "no", constitutional: "yes", combined: "yes" },
  { feature: "Knowledge base updates without retraining", rag: "yes", constitutional: "partial", combined: "yes" },
  { feature: "Hallucination rate", rag: "partial", constitutional: "partial", combined: "yes" },
  { feature: "Enterprise compliance evidence", rag: "no", constitutional: "yes", combined: "yes" },
  { feature: "Vendor-neutral (any LLM)", rag: "partial", constitutional: "yes", combined: "yes" },
]

export default async function CompareConstitutionalAIvsRAG() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Compare", url: `https://delentia.com${localePrefix}/compare` },
    { name: "Constitutional AI vs RAG", url: `https://delentia.com${localePrefix}/compare/constitutional-ai-vs-rag` },
  ])
  const faq = getFAQSchema(COMPARE_FAQS)

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
              <Shield className="w-4 h-4" /> Architectural Comparison
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4 text-balance">
              Constitutional AI vs RAG
            </h1>
            <p className="text-xl text-warm-dim max-w-2xl mx-auto mb-8">
              Two different approaches to preventing AI hallucination. Understanding the difference determines whether your enterprise AI is compliant โ€” or just confident.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-warm-dim">Hallucination Prevention</span>
              <span className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-warm-dim">Enterprise Compliance</span>
              <span className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-warm-dim">PDPA / GDPR</span>
            </div>
          </div>
        </section>

        {/* TL;DR cards */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Database,
                title: "RAG (Retrieval-Augmented Generation)",
                color: "border-blue-400/30 from-blue-400/8",
                points: [
                  "Grounds responses in retrieved documents",
                  "Updates knowledge without retraining",
                  "Probabilistic safety โ€” model may still ignore context",
                  "No audit trail for automated decisions",
                  "Hallucination rate: ~3โ€“5%",
                ],
                verdict: "Best for: knowledge-intensive retrieval tasks",
                verdictColor: "text-blue-400",
              },
              {
                icon: Shield,
                title: "Constitutional AI (FDIA Framework)",
                color: "border-warm-amber/30 from-warm-amber/8",
                points: [
                  "Mathematical constraints on system output",
                  "Deterministic kill switch (A=0 โ’ F=0, always)",
                  "Multi-model consensus (SignedAI Tiers S/4/6/8)",
                  "Full audit trail โ’ PDPA/GDPR compliance",
                  "Hallucination rate: ~1โ€“2%",
                ],
                verdict: "Best for: regulated industries + compliance",
                verdictColor: "text-warm-amber",
              },
              {
                icon: Zap,
                title: "RAG + Constitutional AI (RCT Ecosystem)",
                color: "border-green-400/30 from-green-400/8",
                points: [
                  "Factual grounding AND structural safety constraints",
                  "0.3% hallucination rate (vs 12โ€“15% industry)",
                  "Warm recall <50ms for repeated patterns",
                  "Complete PDPA audit trail from RCTDB",
                  "Architect gate mandatory for critical decisions",
                ],
                verdict: "Best for: enterprise AI at scale",
                verdictColor: "text-green-400",
              },
            ].map(({ icon: Icon, title, color, points, verdict, verdictColor }) => (
              <div key={title} className={`rounded-2xl border bg-linear-to-br ${color} to-transparent p-6`}>
                <Icon className="w-8 h-8 text-warm-dim mb-4" />
                <h2 className="text-lg font-bold text-foreground mb-4">{title}</h2>
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

        {/* Feature matrix */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">Feature Comparison Matrix</h2>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-4 text-warm-dim font-semibold">Feature</th>
                  <th className="text-center px-4 py-4 text-blue-400 font-semibold">RAG Only</th>
                  <th className="text-center px-4 py-4 text-warm-amber font-semibold">Constitutional AI</th>
                  <th className="text-center px-4 py-4 text-green-400 font-semibold">Combined (RCT)</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-white/5 ${i % 2 === 0 ? "" : "bg-white/2"}`}>
                    <td className="px-6 py-3 text-foreground">{row.feature}</td>
                    <td className="px-4 py-3"><CompareIcon value={row.rag as "yes"|"no"|"partial"} /></td>
                    <td className="px-4 py-3"><CompareIcon value={row.constitutional as "yes"|"no"|"partial"} /></td>
                    <td className="px-4 py-3"><CompareIcon value={row.combined as "yes"|"no"|"partial"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-3 bg-white/3 border-t border-white/10 flex gap-6 text-xs text-warm-dim">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-400" /> Yes</span>
              <span className="flex items-center gap-1.5"><MinusCircle className="w-3.5 h-3.5 text-warm-amber/60" /> Partial</span>
              <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5 text-red-400/70" /> No</span>
            </div>
          </div>
        </section>

        {/* Deep dive link */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="rounded-2xl border border-warm-amber/20 bg-warm-amber/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Read the Full Deep-Dive</h2>
              <p className="text-warm-dim">Complete architectural comparison with implementation examples</p>
            </div>
            <Link
              href={`${localePrefix}/blog/constitutional-ai-vs-rag-comparison`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-warm-amber text-background font-semibold text-sm hover:bg-warm-amber/90 transition shrink-0"
            >
              Read Article <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}


