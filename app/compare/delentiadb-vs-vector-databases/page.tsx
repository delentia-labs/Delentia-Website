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
    "RCTDB vs Vector Databases — AI Memory vs Semantic Search",
    "RCTDB vs Vector Databases — AI Memory เทียบกับ Semantic Search",
    "Pinecone and Weaviate are great for semantic search. RCTDB is designed for AI memory — full PDPA audit trail, 8-dimensional provenance, UUID tombstone erasure, and Delta Engine 74% compression. Here is the architectural difference.",
    "Pinecone และ Weaviate เหมาะสำหรับ semantic search ส่วน RCTDB ถูกออกแบบเพื่อ AI memory พร้อม PDPA audit trail, provenance 8 มิติ, การลบแบบ UUID tombstone และ Delta Engine compression 74% นี่คือความต่างเชิงสถาปัตยกรรม",
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
    answer: "RCTDB is an 8-dimensional AI memory schema designed specifically for constitutional AI workloads. A vector database (Pinecone, Weaviate) stores embeddings for semantic similarity search. RCTDB stores AI decision provenance — query hashes, FDIA scores, model chains, consensus results, subject UUIDs, and timestamps. RCTDB enables PDPA right-to-erasure and Section 33 audit trails; vector databases do not.",
  },
  {
    question: "Can RCTDB do semantic search like Pinecone?",
    answer: "Yes. RCTDB includes semantic similarity search via the Delta Engine (similarity threshold 0.95). However, its primary purpose is not retrieval — it is memory with governance. The 8-dimensional schema adds provenance, FDIA scoring, and consent management on top of semantic lookup.",
  },
  {
    question: "How does RCTDB achieve PDPA compliance that vector databases cannot?",
    answer: "RCTDB stores each record with a subject_uuid field. When a data subject requests erasure (PDPA Section 34), the UUID is tombstoned — all future queries that would retrieve data for that subject receive nothing. Vector databases store embedding vectors with no native concept of data subject identity or erasure.",
  },
  {
    question: "What is the 8-dimensional RCTDB schema?",
    answer: "RCTDB stores 8 dimensions per record: (1) query_hash — semantic fingerprint, (2) fdia_scores — D/I/A/F values, (3) subject_uuid — PDPA-compliant subject reference, (4) model_chain — which LLMs were used, (5) consensus_result — SignedAI agreement level, (6) delta_chain — incremental state for 74% compression, (7) timestamp — immutable creation time, (8) provenance — source documentation and access log.",
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
  { feature: "Warm recall (<50ms on cache hit)", pinecone: "partial", weaviate: "partial", RCTDB: "yes" },
  { feature: "Multi-tenant data isolation", pinecone: "yes", weaviate: "yes", RCTDB: "yes" },
  { feature: "Graph/relationship traversal", pinecone: "no", weaviate: "yes", RCTDB: "partial" },
]

const useCases = [
  {
    scenario: "Product recommendation engine",
    pinecone: "✅",
    weaviate: "✅",
    RCTDB: "⚠️",
    reason: "Standard semantic retrieval — use Pinecone or Weaviate. RCTDB is overkill unless PDPA compliance is required.",
  },
  {
    scenario: "Enterprise AI with PDPA compliance (Thailand)",
    pinecone: "❌",
    weaviate: "❌",
    RCTDB: "✅",
    reason: "RCTDB is the only option with native subject_uuid, UUID tombstone erasure, and Section 33 provenance trail.",
  },
  {
    scenario: "Multi-LLM agentic workflow memory",
    pinecone: "❌",
    weaviate: "❌",
    RCTDB: "✅",
    reason: "RCTDB stores model_chain and consensus_result — enabling full reproducibility of multi-LLM decision chains.",
  },
  {
    scenario: "Knowledge base for RAG system",
    pinecone: "✅",
    weaviate: "✅",
    RCTDB: "✅",
    reason: "All three work. RCTDB adds FDIA scoring and provenance to each retrieval, enabling constitutional AI compliance.",
  },
  {
    scenario: "AI decision audit (regulatory requirement)",
    pinecone: "❌",
    weaviate: "❌",
    RCTDB: "✅",
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
              Pinecone and Weaviate are excellent at semantic search. RCTDB is designed for something different — <strong className="text-foreground">AI memory with constitutional governance</strong>. The 8-dimensional schema stores not just what was retrieved, but who requested it, which models processed it, and whether the data subject has since claimed their right to erasure.
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
                verdict: "Best for: semantic search, recommendation engines",
                verdictColor: "text-blue-400",
              },
              {
                icon: Zap,
                title: "RCTDB (8-Dimensional Memory)",
                color: "border-warm-amber/30 from-warm-amber/8",
                titleColor: "text-warm-amber",
                points: [
                  "8-dimensional schema: provenance + compliance + state",
                  "Native subject_uuid for PDPA right-to-erasure",
                  "UUID tombstone deletes data subject access instantly",
                  "Automatic Section 33 explainability audit evidence",
                  "Delta Engine 74% compression for state changes",
                  "Stores FDIA scores, model chains, and consensus results",
                  "Integrated directly with JITNA protocol and SignedAI",
                ],
                verdict: "Best for: enterprise AI memory, regulated industries",
                verdictColor: "text-warm-amber",
              },
              {
                icon: Shield,
                title: "Vector DB + RCTDB (Combined)",
                color: "border-green-400/30 from-green-400/8",
                titleColor: "text-green-400",
                points: [
                  "Vector DB handles large-scale raw document retrieval",
                  "RCTDB handles query state, provenance, and consent",
                  "Best-of-both: scale of vector DB + governance of RCTDB",
                  "Zero compliance risk for enterprise deployments",
                  "Warm recall path (<50ms) skips vector search on hits",
                ],
                verdict: "Best for: large enterprises with legacy vector DBs",
                verdictColor: "text-green-400",
              },
            ].map(({ icon: Icon, title, color, titleColor, points, verdict, verdictColor }) => (
              <div key={title} className={`rounded-2xl border bg-linear-to-br ${color} to-transparent p-6`}>
                <Icon className={`w-8 h-8 ${titleColor} mb-4`} />
                <h2 className={`text-lg font-bold text-foreground mb-4`}>{title}</h2>
                <ul className="space-y-2 mb-6">
                  {points.map((pt) => (
                    <li key={pt} className="text-sm text-warm-dim flex items-start gap-2">
                      <span className="mt-0.5 shrink-0">•</span> {pt}
                    </li>
                  ))}
                </ul>
                <p className={`text-sm font-semibold ${verdictColor}`}>{verdict}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature comparison table */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">Feature Comparison Table</h2>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-4 text-warm-dim font-semibold">Capability</th>
                  <th className="text-center px-4 py-4 text-blue-400 font-semibold">Pinecone</th>
                  <th className="text-center px-4 py-4 text-purple-400 font-semibold">Weaviate</th>
                  <th className="text-center px-4 py-4 text-warm-amber font-semibold">RCTDB</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-white/5 ${i % 2 === 0 ? "" : "bg-white/2"}`}>
                    <td className="px-6 py-3 text-foreground">{row.feature}</td>
                    <td className="px-4 py-3"><CompareIcon value={row.pinecone as "yes"|"no"|"partial"} /></td>
                    <td className="px-4 py-3"><CompareIcon value={row.weaviate as "yes"|"no"|"partial"} /></td>
                    <td className="px-4 py-3"><CompareIcon value={row.RCTDB as "yes"|"no"|"partial"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-3 bg-white/3 border-t border-white/10 flex gap-6 text-xs text-warm-dim">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-400" /> Fully Supported</span>
              <span className="flex items-center gap-1.5"><MinusCircle className="w-3.5 h-3.5 text-warm-amber/60" /> Partially Supported</span>
              <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5 text-red-400/70" /> Not Supported</span>
            </div>
          </div>
        </section>

        {/* Deep dive link */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="rounded-2xl border border-warm-amber/20 bg-warm-amber/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Explore the RCTDB Memory Schema</h2>
              <p className="text-warm-dim">Learn how the 8-dimensional schema provides constitutional governance for AI memory</p>
            </div>
            <Link
              href={`${localePrefix}/solutions/enterprise-ai-memory`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-warm-amber text-background font-semibold text-sm hover:bg-warm-amber/90 transition shrink-0"
            >
              Explore Memory Solutions <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
