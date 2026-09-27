import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { SITE_ENTERPRISE_EVIDENCE_LABEL, SITE_PUBLIC_SDK_EVIDENCE_LABEL, SITE_PUBLIC_SDK_TESTS, SITE_RESEARCH_EVIDENCE_LABEL } from "@/lib/site-config"
import BenchmarkClient from "./BenchmarkClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "AI Benchmark Results",
    "ผลลัพธ์ Benchmark AI",
    `Benchmark framing for Delentia Labs vs common orchestration patterns. This page should be read with methodology disclosures and separates ${SITE_RESEARCH_EVIDENCE_LABEL.toLowerCase()} from ${SITE_PUBLIC_SDK_EVIDENCE_LABEL.toLowerCase()} and ${SITE_ENTERPRISE_EVIDENCE_LABEL.toLowerCase()}.`,
    `หน้าสรุป benchmark ของ Delentia Labs เทียบกับแนวทาง orchestration ทั่วไป โดยต้องอ่านคู่กับ methodology disclosures และแยก ${SITE_RESEARCH_EVIDENCE_LABEL.toLowerCase()} ออกจาก ${SITE_PUBLIC_SDK_EVIDENCE_LABEL.toLowerCase()} และ ${SITE_ENTERPRISE_EVIDENCE_LABEL.toLowerCase()}.`,
    "/benchmark",
    ["AI benchmark", "LangChain vs RCT", "LlamaIndex comparison", "hallucination benchmark", "AI accuracy benchmark", "enterprise AI performance"]
  )
}

export default async function BenchmarkPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"

  const benchmarkSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Delentia Labs AI Reliability Benchmark — 2025 Results",
    "description": `Benchmark framing that explains how Delentia Labs evaluates hallucination, accuracy, latency, and routing quality. Public readers should distinguish ${SITE_RESEARCH_EVIDENCE_LABEL.toLowerCase()} from ${SITE_PUBLIC_SDK_EVIDENCE_LABEL.toLowerCase()} and larger ${SITE_ENTERPRISE_EVIDENCE_LABEL.toLowerCase()} statements.`,
    "url": `https://delentia.com${localePrefix}/benchmark`,
    "creator": { "@type": "Organization", "name": "Delentia Labs", "url": "https://delentia.com" },
    "license": "https://www.apache.org/licenses/LICENSE-2.0",
    "variableMeasured": [
      { "@type": "PropertyValue", "name": "Hallucination Rate (design target, self-reported)", "value": "<0.3%", "unitText": "percent" },
      { "@type": "PropertyValue", "name": "Public SDK Verified Tests", "value": SITE_PUBLIC_SDK_TESTS, "unitText": "count" },
      { "@type": "PropertyValue", "name": "Validation Tiers", "value": 9, "unitText": "count" }
    ]
  }

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Benchmark", url: `https://delentia.com${localePrefix}/benchmark` },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(benchmarkSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <BenchmarkClient />
    </>
  )
}

