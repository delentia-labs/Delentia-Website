import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { ArrowRight, CheckCircle, XCircle, MinusCircle } from "lucide-react"

// Round 87 (claims review). This page used to compare "RCTDB" (an "8-dimensional" PDPA-compliant memory with 74%
// compression and Section 33 evidence) with Pinecone and Weaviate. Those are not the same kind of thing and the
// claims were not measured. What was measured is a comparison of the agent memory with LangGraph's checkpointer and
// mem0 on one workload (Benchmark page). This page now says what a vector database is for, what Delentia's memory
// does differently, and what it does not do better.

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Delentia memory vs vector databases — different jobs",
    "หน่วยความจำของ Delentia เทียบกับ vector database — คนละหน้าที่",
    "A vector database finds similar items fast. Delentia's agent memory is a hash-chained event log with revocation, time travel and per-person erasure. They do different jobs; Delentia's recall by meaning is opt-in and was measured against mem0 (24 of 30 for mem0, 22 of 30 for Delentia with embeddings, 7 of 30 for its default word matching).",
    "vector database ทำหน้าที่หาของที่คล้ายกันให้เร็ว หน่วยความจำของ agent ใน Delentia เป็นบันทึกเหตุการณ์ที่เชื่อม hash มีการเพิกถอน การย้อนดู และการลบรายบุคคล คนละหน้าที่ การเรียกคืนตามความหมายของ Delentia เป็นแบบเลือกเปิดและวัดเทียบ mem0 แล้ว (mem0 24 จาก 30, Delentia ที่ใช้ embedding 22 จาก 30, การจับคำเริ่มต้น 7 จาก 30)",
    "/compare/rctdb-vs-vector-databases",
    ["vector database", "agent memory", "event log", "memory erasure"]
  )
}

function CompareIcon({ value }: { value: "yes" | "no" | "partial" }) {
  if (value === "yes") return <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
  if (value === "no") return <XCircle className="w-5 h-5 text-red-400/70 mx-auto" />
  return <MinusCircle className="w-5 h-5 text-warm-amber/60 mx-auto" />
}

const FAQS = [
  {
    question: "Is Delentia's memory a replacement for a vector database?",
    answer: "No. A vector database (Pinecone, Weaviate) stores embeddings and finds similar items quickly at scale. Delentia's agent memory is a small per-person store whose point is history and control: every change is an event in a hash-chained log, a memory can be revoked with a reason, the store can be viewed as it was earlier, and one person can be erased. If you need similarity search at scale, use a vector database.",
  },
  {
    question: "Can it search by meaning?",
    answer: "Optionally. With a local embedding model switched on, Delentia found the right memory in the top three for 22 of 30 paraphrased questions, against 24 of 30 for mem0 and 7 of 30 for Delentia's default word matching. So it does not beat the alternatives at recall; its difference is the history and the erasure.",
  },
  {
    question: "Does it make me compliant with the PDPA?",
    answer: "No. Software cannot make an organisation compliant. Delentia gives you tools: one person's memory text is sealed under a key that is destroyed on erasure (checked in the raw database file), and every change is an auditable event. Erasure does not yet cover the separate skills database or audit rows written before sealing was added.",
  },
  {
    question: "What happened to the '8-dimensional schema' and the 74% compression?",
    answer: "They were design ideas and a formula, not measured results, and are withdrawn. Measured in bytes, storing changes saves 39% to 90% against full snapshots, and ordinary compression of snapshots does about as well.",
  },
]

const rows: { feature: string; vector: "yes" | "no" | "partial"; delentia: "yes" | "no" | "partial" }[] = [
  { feature: "Fast similarity search at scale", vector: "yes", delentia: "no" },
  { feature: "Recall by meaning (opt-in, local embedding model)", vector: "yes", delentia: "partial" },
  { feature: "Append-only, hash-chained history of every change", vector: "no", delentia: "yes" },
  { feature: "View the store as it was at an earlier point", vector: "no", delentia: "yes" },
  { feature: "Revoke a memory with a written reason", vector: "no", delentia: "yes" },
  { feature: "Erase one person's text by destroying its key", vector: "no", delentia: "yes" },
  { feature: "Detects an edited record", vector: "no", delentia: "yes" },
  { feature: "Multi-tenant isolation in a shared service", vector: "yes", delentia: "partial" },
  { feature: "Hosted, managed service", vector: "yes", delentia: "no" },
]

export default async function RCTDBvsVectorDBs() {
  const locale = await getRequestLocale()
  const isTh = locale === "th"
  const localePrefix = isTh ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Compare", url: `https://delentia.com${localePrefix}/compare` },
    { name: "Memory vs vector databases", url: `https://delentia.com${localePrefix}/compare/rctdb-vs-vector-databases` },
  ])
  const faq = getFAQSchema(FAQS)

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <main className="min-h-screen bg-background">
        <Navbar />

        <section className="mx-auto max-w-4xl px-4 pt-28 pb-10">
          <h1 className="text-4xl font-bold text-foreground leading-tight mb-4">
            {isTh ? "หน่วยความจำของ Delentia เทียบกับ vector database" : "Delentia memory vs vector databases"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {isTh
              ? "คนละหน้าที่ vector database หาของที่คล้ายกันให้เร็ว หน่วยความจำของ agent ใน Delentia มีไว้เพื่อประวัติและการควบคุม ไม่ได้อ้างว่าเรียกคืนแม่นกว่า"
              : "They do different jobs. A vector database finds similar items fast. Delentia's agent memory exists for history and control. It does not claim to recall better."}
          </p>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-10">
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-card text-left">
                  <th className="p-3 font-semibold text-foreground">{isTh ? "ความสามารถ" : "Capability"}</th>
                  <th className="p-3 text-center font-semibold text-foreground">{isTh ? "Vector database" : "Vector database"}</th>
                  <th className="p-3 text-center font-semibold text-foreground">{isTh ? "หน่วยความจำ Delentia" : "Delentia memory"}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.feature} className="border-t border-border">
                    <td className="p-3 text-muted-foreground">{row.feature}</td>
                    <td className="p-3"><CompareIcon value={row.vector} /></td>
                    <td className="p-3"><CompareIcon value={row.delentia} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {isTh
              ? "ตารางนี้เป็นการประเมินคุณสมบัติของผู้เขียน ไม่ใช่ผลวัด ผลวัดอยู่ในหน้า Benchmark (เทียบ LangGraph และ mem0 บนภาระงานเดียว)"
              : "This table is the author's reading of features, not a measurement. The measurement (against LangGraph and mem0 on one workload) is on the Benchmark page."}
          </p>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-10 space-y-4">
          {FAQS.map((item) => (
            <div key={item.question} className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-semibold text-foreground">{item.question}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-20">
          <Link href={`${localePrefix}/solutions/enterprise-ai-memory`} className="inline-flex items-center gap-2 rounded-xl bg-warm-amber px-6 py-3 text-sm font-semibold text-white hover:bg-[#C49A48] transition-colors">
            {isTh ? "ดูหน่วยความจำของ agent โดยละเอียด" : "The agent memory in detail"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <Footer />
      </main>
    </>
  )
}
