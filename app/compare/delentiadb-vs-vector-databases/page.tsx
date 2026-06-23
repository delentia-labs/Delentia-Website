import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { ArrowRight, CheckCircle, XCircle, MinusCircle, Database, Zap, Shield } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "RCTDB vs Vector Databases โ€” AI Memory vs Semantic Search",
    "RCTDB vs Vector Databases โ€” AI Memory เน€เธ—เธตเธขเธเธเธฑเธ Semantic Search",
    "Pinecone and Weaviate are great for semantic search. RCTDB is designed for AI memory โ€” full PDPA audit trail, 8-dimensional provenance, UUID tombstone erasure, and Delta Engine 74% compression. Here is the architectural difference.",
    "Pinecone เนเธฅเธฐ Weaviate เน€เธซเธกเธฒเธฐเธชเธณเธซเธฃเธฑเธ semantic search เธชเนเธงเธ RCTDB เธ–เธนเธเธญเธญเธเนเธเธเน€เธเธทเนเธญ AI memory เธเธฃเนเธญเธก PDPA audit trail, provenance 8 เธกเธดเธ•เธด, เธเธฒเธฃเธฅเธเนเธเธ UUID tombstone เนเธฅเธฐ Delta Engine compression 74% เธเธตเนเธเธทเธญเธเธงเธฒเธกเธ•เนเธฒเธเน€เธเธดเธเธชเธ–เธฒเธเธฑเธ•เธขเธเธฃเธฃเธก",
    "/compare/rctdb-vs-vector-databases",
    ["RCTDB vs vector databases", "AI memory", "semantic search comparison"]
  )
}

function CompareIcon({ value }: { value: "yes" | "no" | "partial" }) {
  if (value === "yes") return <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
  if (value === "no") return <XCircle className="w-5 h-5 text-red-400/70 mx-auto" />
  return <MinusCircle className="w-5 h-5 text-warm-amber/60 mx-auto" />
}

const RCTDB_FAQS = [
  {
    question: "What is RCTDB and how is it different from a vector database?",
    answer: "RCTDB is an 8-dimensional AI memory schema designed specifically for constitutional AI workloads. A vector database (Pinecone, Weaviate) stores embeddings for semantic similarity search. RCTDB stores AI decision provenance โ€” query hashes, FDIA scores, model chains, consensus results, subject UUIDs, and timestamps. RCTDB enables PDPA right-to-erasure and Section 33 audit trails; vector databases do not.",
  },
  {
    question: "Can RCTDB do semantic search like Pinecone?",
    answer: "Yes. RCTDB includes semantic similarity search via the Delta Engine (similarity threshold 0.95). However, its primary purpose is not retrieval โ€” it is memory with governance. The 8-dimensional schema adds provenance, FDIA scoring, and consent management on top of semantic lookup.",
  },
  {
    question: "How does RCTDB achieve PDPA compliance that vector databases cannot?",
    answer: "RCTDB stores each record with a subject_uuid field. When a data subject requests erasure (PDPA Section 34), the UUID is tombstoned โ€” all future queries that would retrieve data for that subject receive nothing. Vector databases store embedding vectors with no native concept of data subject identity or erasure.",
  },
  {
    question: "What is the 8-dimensional RCTDB schema?",
    answer: "RCTDB stores 8 dimensions per record: (1) query_hash โ€” semantic fingerprint, (2) fdia_scores โ€” D/I/A/F values, (3) subject_uuid โ€” PDPA-compliant subject reference, (4) model_chain โ€” which LLMs were used, (5) consensus_result โ€” SignedAI agreement level, (6) delta_chain โ€” incremental state for 74% compression, (7) timestamp โ€” immutable creation time, (8) provenance โ€” source documentation and access log.",
  },
  {
    question: "What is Delta Engine compression and how does it save 74% storage?",
    answer: "The Delta Engine stores only what changed between consecutive query states rather than full snapshots. For stable enterprise query patterns (the majority of production workloads), this produces 74% average lossless compression versus always storing full state. Full state is reconstructed in sub-1ms when needed.",
  },
]

const rows = [
  { feature: "Semantic similarity search", pinecone: "yes", weaviate: "yes", RCTDB: "yes" },
  { feature: "PDPA subject UUID field (native)", pinecone: "no", weaviate: "no", RCTDB: "yes" },
  { feature: "Right-to-erasure (UUID tombstone)", pinecone: "no", weaviate: "no", RCTDB: "yes" },
  { feature: "Audit trail per query (automatic)", pinecone: "no", weaviate: "no", RCTDB: "yes" },
  { feature: "FDIA score storage (D/I/A/F)", pinecone: "no", weaviate: "no", RCTDB: "yes" },
  { feature: "Model chain provenance", pinecone: "no", weaviate: "no", RCTDB: "yes" },
  { feature: "SignedAI consensus tracking", pinecone: "no", weaviate: "no", RCTDB: "yes" },
  { feature: "Delta compression (74% lossless)", pinecone: "no", weaviate: "no", RCTDB: "yes" },
  { feature: "PDPA Section 33 evidence (auto)", pinecone: "no", weaviate: "no", RCTDB: "yes" },
  { feature: "Warm recall ({"<"}50ms on cache hit)", pinecone: "partial", weaviate: "partial", RCTDB: "yes" },
  { feature: "Multi-tenant data isolation", pinecone: "yes", weaviate: "yes", RCTDB: "yes" },
  { feature: "Graph/relationship traversal", pinecone: "no", weaviate: "yes", RCTDB: "partial" },
]

const useCases = [
  {
    scenario: "Product recommendation engine",
    pinecone: "โ…",
    weaviate: "โ…",
    RCTDB: "โ ๏ธ",
    reason: "Standard semantic retrieval โ€” use Pinecone or Weaviate. RCTDB is overkill unless PDPA compliance is required.",
  },
  {
    scenario: "Enterprise AI with PDPA compliance (Thailand)",
    pinecone: "โ",
    weaviate: "โ",
    RCTDB: "โ…",
    reason: "RCTDB is the only option with native subject_uuid, UUID tombstone erasure, and Section 33 provenance trail.",
  },
  {
    scenario: "Multi-LLM agentic workflow memory",
    pinecone: "โ",
    weaviate: "โ",
    RCTDB: "โ…",
    reason: "RCTDB stores model_chain and consensus_result โ€” enabling full reproducibility of multi-LLM decision chains.",
  },
  {
    scenario: "Knowledge base for RAG system",
    pinecone: "โ…",
    weaviate: "โ…",
    RCTDB: "โ…",
    reason: "All three work. RCTDB adds FDIA scoring and provenance to each retrieval, enabling constitutional AI compliance.",
  },
  {
    scenario: "AI decision audit (regulatory requirement)",
    pinecone: "โ",
    weaviate: "โ",
    RCTDB: "โ…",
    reason: "Only RCTDB automatically generates the audit trail required by financial, healthcare, and legal AI regulations.",
  },
]

export default async function RCTDBvsVectorDBs() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Compare", url: `https://delentia.com${localePrefix}/compare` },
    { name: "RCTDB vs Vector Databases", url: `https://delentia.com${localePrefix}/compare/rctdb-vs-vector-databases` },
  ])
  const faq = getFAQSchema(RCTDB_FAQS)

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
              <Database className="w-4 h-4" /> AI Memory Architecture
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4 text-balance">
              RCTDB vs Vector Databases
            </h1>
            <p className="text-xl text-warm-dim max-w-2xl mx-auto mb-8">
              Pinecone and Weaviate are excellent at semantic search. RCTDB is designed for something different โ€” <strong className="text-foreground">AI memory with constitutional governance</strong>. The 8-dimensional schema stores not just what was retrieved, but who requested it, which models processed it, and whether the data subject has since claimed their right to erasure.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-warm-dim">PDPA Compliance</span>
              <span className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-warm-dim">AI Provenance</span>
              <span className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-warm-dim">74% Compression</span>
            </div>
          </div>
        </section>

        {/* Summary cards */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Database,
                title: "Pinecone / Weaviate (Vector DB)",
                color: "border-blue-400/30 from-blue-400/8",
                titleColor: "text-blue-400",
                points: [
                  "Stores embedding vectors for semantic search",
                  "Optimized for retrieval speed and scale",
                  "No native concept of data subject identity",
                  "No built-in audit trail per retrieval",
                  "PDPA compliance must be built externally",
                  "Cannot store FDIA scores or model chains",
                  "Industry-standard RAG knowledge base tool",
                ],
                verdict: "Best for: RAG retrieval, recommendation, semantic search",
                verdictColor: "text-blue-400",
              },
              {
                icon: Shield,
                title: "RCTDB (AI Memory Schema)",
                color: "border-warm-amber/30 from-warm-amber/8",
                titleColor: "text-warm-amber",
                points: [
                  "8-dimensional schema: query, FDIA, UUID, model chain...",
                  "subject_uuid: native PDPA data subject tracking",
                  "UUID tombstone: PDPA-compliant right to erasure",
                  "Automatic provenance trail (Section 33 evidence)",
                  "Stores consensus_result from SignedAI verification",
                  "Delta Engine: 74% lossless compression",
                  "Warm recall: cached responses served in <50ms",
                ],
                verdict: "Best for: enterprise AI with PDPA/GDPR compliance",
                verdictColor: "text-warm-amber",
              },
              {
                icon: Zap,
                title: "When to Use Both",
                color: "border-green-400/30 from-green-400/8",
                titleColor: "text-green-400",
                points: [
                  "Use Pinecone/Weaviate for external knowledge retrieval",
                  "Use RCTDB for AI decision memory and compliance",
                  "RAG retrieval from vector DB โ’ decision stored in RCTDB",
                  "RCTDB Delta Engine caches retrieval patterns over time",
                  "Result: compliant RAG system with full audit coverage",
                ],
                verdict: "Best for: production enterprise RAG at scale",
                verdictColor: "text-green-400",
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

        {/* Key differentiator */}
        <section className="mx-auto max-w-4xl px-4 py-8">
          <div className="rounded-2xl border border-warm-amber/20 bg-warm-amber/5 p-6">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-warm-amber shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground mb-1">The PDPA Compliance Gap</p>
                <p className="text-warm-dim text-sm leading-relaxed">
                  Under Thailand&apos;s PDPA (and GDPR), when a data subject requests erasure of their data, you must be able to erase it <strong className="text-foreground">from every system</strong> that holds it โ€” including your AI memory. Vector databases store embedding vectors with no concept of data subject identity. When you need to erase a person&apos;s data, you cannot identify which vectors belong to them. RCTDB&apos;s <strong className="text-warm-amber">subject_uuid โ’ tombstone</strong> pattern solves this architecturally, not procedurally.
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
                  <th className="text-center px-4 py-4 text-blue-400 font-semibold">Pinecone</th>
                  <th className="text-center px-4 py-4 text-blue-400/70 font-semibold">Weaviate</th>
                  <th className="text-center px-4 py-4 text-warm-amber font-semibold">RCTDB</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={`row-${i}`} className={`border-b border-white/5 ${i % 2 !== 0 ? "bg-white/2" : ""}`}>
                    <td className="px-6 py-3 text-foreground">{row.feature}</td>
                    <td className="px-4 py-3"><CompareIcon value={row.pinecone as "yes"|"no"|"partial"} /></td>
                    <td className="px-4 py-3"><CompareIcon value={row.weaviate as "yes"|"no"|"partial"} /></td>
                    <td className="px-4 py-3"><CompareIcon value={row.RCTDB as "yes"|"no"|"partial"} /></td>
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
                  <td colSpan={3} />
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
                  <th className="text-center px-4 py-4 text-blue-400 font-semibold">Pinecone</th>
                  <th className="text-center px-4 py-4 text-blue-400/70 font-semibold">Weaviate</th>
                  <th className="text-center px-4 py-4 text-warm-amber font-semibold">RCTDB</th>
                  <th className="text-left px-4 py-4 text-warm-dim font-semibold hidden md:table-cell">Reason</th>
                </tr>
              </thead>
              <tbody>
                {useCases.map((row, i) => (
                  <tr key={row.scenario} className={`border-b border-white/5 ${i % 2 === 0 ? "" : "bg-white/2"}`}>
                    <td className="px-6 py-3 text-foreground">{row.scenario}</td>
                    <td className="px-4 py-3 text-center text-base">{row.pinecone}</td>
                    <td className="px-4 py-3 text-center text-base">{row.weaviate}</td>
                    <td className="px-4 py-3 text-center text-base">{row.RCTDB}</td>
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
              <h2 className="text-xl font-bold text-foreground mb-2">Explore the RCTDB Architecture</h2>
              <p className="text-warm-dim">Read how RCTDB&apos;s 8 dimensions provide both AI memory and PDPA compliance simultaneously</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href={`${localePrefix}/entity/memory-architecture`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-warm-amber text-background font-semibold text-sm hover:bg-warm-amber/90 transition"
              >
                Memory Architecture <ArrowRight className="w-4 h-4" />
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


