import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { SITE_PUBLIC_SDK_TESTS } from "@/lib/site-config"
import BenchmarkClient from "./BenchmarkClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Measured results",
    "ผลที่วัดได้จริง",
    "What Delentia Labs has actually measured, each result with the script or CI run that produced it, why it is weaker than it looks, and a list of what has not been measured. No independent audit.",
    "ผลที่ Delentia Labs วัดได้จริง แต่ละผลมีสคริปต์หรือการรัน CI ที่สร้างมัน เหตุผลว่าทำไมจึงอ่อนกว่าที่เห็น และรายการสิ่งที่ยังไม่ได้วัด ไม่มีการตรวจสอบอิสระ",
    "/benchmark",
    ["measured results", "agent runtime tests", "prompt injection test", "audit log verification", "AI agent governance"]
  )
}

export default async function BenchmarkPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"

  const benchmarkSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Delentia Labs measured results",
    "description": "Results measured by Delentia Labs on its public agent runtime, each with the script or CI run that produced it, its limits, and a list of what has not been measured. Not an independent audit.",
    "url": `https://delentia.com${localePrefix}/benchmark`,
    "creator": { "@type": "Organization", "name": "Delentia Labs", "url": "https://delentia.com" },
    "license": "https://www.apache.org/licenses/LICENSE-2.0",
    "variableMeasured": [
      { "@type": "PropertyValue", "name": "Public test suite passed", "value": SITE_PUBLIC_SDK_TESTS, "unitText": "count" }
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

