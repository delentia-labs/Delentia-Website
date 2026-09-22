import type { Metadata } from "next"
import BenchmarkSummaryClient from "./BenchmarkSummaryClient"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import { SITE_PUBLIC_SDK_TESTS } from "@/lib/site-config"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Benchmark Summary — Controlled Benchmark Scope and Method Notes",
    "สรุป Benchmark — Controlled Benchmark Scope และ Method Notes",
    "Detailed explanation of Delentia Labs benchmark methodology with explicit scope. This page separates public SDK verified evidence from enterprise private snapshot evidence and pairs the 0.3% benchmark figure with caveats and method notes.",
    "คำอธิบาย benchmark methodology ของ Delentia Labs พร้อมการระบุ scope อย่างชัดเจน โดยหน้านี้แยก public SDK verified evidence ออกจาก enterprise private snapshot evidence และผูกตัวเลข 0.3% เข้ากับ caveats และ method notes.",
    "/benchmark-summary",
    ["AI benchmark summary", "FDIA accuracy", "hallucination benchmark", "enterprise AI evaluation"]
  )
}

const BENCHMARK_FAQS = [
  {
    question: "What is Delentia Labs' hallucination rate?",
    answer: "Delentia Labs targets a 0.3% hallucination rate on controlled enterprise workloads, compared to an industry average of 12–15%, via SignedAI multi-model consensus verification and the FDIA constitutional gating system. This is a self-reported internal measurement, not yet independently reviewed: the public reproduction (python benchmark/run_benchmark.py --suite signedai --size 100 --seed 42) uses a simulated consensus function and a public 100-prompt subset, while the full 1,000-prompt result runs against a non-public dataset in the enterprise environment. See the full protocol, including these limitations, at docs/benchmark/hallucination-methodology.md in the delentia-os repo.",
  },
  {
    question: "What is the FDIA accuracy score of 0.92?",
    answer: "The FDIA accuracy score of 0.92 is intended to measure how accurately the FDIA equation predicts output quality versus human-evaluated ground truth, on a factual question-answering benchmark (n=1,000). This figure is not yet in our public claim registry (docs/distribution/CLAIM_REGISTRY.md in the delentia-os repo) alongside a runnable reproduction script, unlike the Delta Engine and throughput numbers on this page — treat it as directional pending that verification, not as an independently reproducible result yet. The industry baseline of approximately 0.65 is likewise an approximation, not a cited external source.",
  },
  {
    question: "What does the 4,849/0/0 test result mean?",
    answer: `It refers to an enterprise private snapshot of the broader RCT runtime rather than the public SDK checkpoint. Public readers should use the open SDK checkpoint of ${SITE_PUBLIC_SDK_TESTS} verified tests as the public SDK verified lane and treat the 4,849 figure as separately disclosed enterprise context.`,
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
    question: "How does the 3.74x cost reduction work?",
    answer: "The RCT HexaCore router uses intelligent routing to select the most cost-efficient model appropriate for each task rather than always routing to a premium model like Claude Opus. The 3.74x figure describes comparing HexaCore routing versus always routing to Claude Opus across a production-equivalent mixed workload; it is not yet backed by a runnable public reproduction script the way the Delta Engine and throughput numbers on this page are — treat it as directional pending that verification. Actual savings depend on query mix — complex workloads requiring premium models will show lower savings.",
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
