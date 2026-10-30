import type { Metadata } from "next"
import BenchmarkSummaryClient from "./BenchmarkSummaryClient"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Benchmark Summary — Controlled Benchmark Scope and Method Notes",
    "สรุป Benchmark — Controlled Benchmark Scope และ Method Notes",
    "Detailed explanation of Delentia Labs benchmark methodology with explicit scope. This page separates public SDK verified evidence from enterprise private snapshot evidence and lists which figures are measured and which are not, with method notes.",
    "คำอธิบาย benchmark methodology ของ Delentia Labs พร้อมการระบุ scope อย่างชัดเจน โดยหน้านี้แยก public SDK verified evidence ออกจาก enterprise private snapshot evidence และระบุว่าตัวเลขใดวัดแล้วและตัวเลขใดยังไม่ได้วัด พร้อม method notes.",
    "/benchmark-summary",
    ["AI benchmark summary", "FDIA accuracy", "hallucination benchmark", "enterprise AI evaluation"]
  )
}

const BENCHMARK_FAQS = [
  {
    question: "What is Delentia Labs' hallucination rate?",
    answer: "Delentia Labs does not currently claim a hallucination rate (an earlier figure was withdrawn because it could not be reproduced). It offers a safety gate on actions, an answer check against gathered evidence and an optional jury of models, but none of these has been shown to reduce hallucination. Nothing in the public repository reproduces a hallucination rate, so none is quoted.",
  },
  {
    question: "What is the FDIA accuracy?",
    answer: "The only FDIA accuracy measured in the public repository is 11 of 12 cases on a tiny hand-written rank test. It is a smoke test, not a benchmark, and no larger figure is claimed.",
  },
  {
    question: "What does the 8,585 passed / 0 failed test result mean?",
    answer: `It is the result of the public repository's continuous-integration run (Python 3.12, 2026-10-25, commit eb96355): 8,585 passed, 46 skipped, 1 expected failure, 0 failed, 91.79% coverage. Anyone can re-run it from the public repository. The earlier 4,849 figure from a private suite was withdrawn because it could not be independently verified.`,
  },
  {
    question: "What is warm recall and how fast is it?",
    answer: "Warm recall is when the Delta Engine serves a response from its hot-zone semantic cache (similarity threshold 0.95) instead of calling an LLM. Measured from request receipt to response delivery, warm recall achieves under 50 milliseconds. Novel queries always take the cold start path (3–5 seconds). Hot zone capacity is finite; entries migrate to slower zones based on frequency.",
  },
  {
    question: "How does the Delta Engine achieve 74%+ memory compression?",
    answer: "The Delta Engine stores only incremental state changes (deltas) rather than full state snapshots. 74% is the design floor (minimum guarantee); the measured, independently reproducible result is 91.5% (2,000 delta operations, 20 agents x 100 ticks — run `python scripts/benchmark_fdia_delta.py --json` yourself to verify). Compression is lossless — full state can be reconstructed with sub-1ms overhead. Short or highly novel sessions may show lower compression ratios, which is why the floor and the measured result are reported separately rather than as one number.",
  },
  {
    question: "How does cost-aware routing work?",
    answer: "The model is a setting you choose, and a per-episode cost limit refuses a call whose worst case would exceed your budget. No cost-reduction figure is claimed: none has been measured.",
  },
]

export default async function BenchmarkSummaryPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Benchmark Summary", url: `https://delentia.com${localePrefix}/benchmark-summary` },
  ])
  const faq = getFAQSchema(BENCHMARK_FAQS)

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <BenchmarkSummaryClient />
    </>
  )
}
