import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema, getProductOfferSchema } from "@/lib/schema"
import PricingClient from "./PricingClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "How to use Delentia",
    "วิธีใช้ Delentia",
    "Delentia is a free, open-source agent runtime. There are no paid plans and no hosted service yet; design-partner pilots are by invitation.",
    "Delentia เป็นรันไทม์ agent โอเพนซอร์สที่ใช้ได้ฟรี ยังไม่มีแพ็กเกจแบบชำระเงินและยังไม่มีบริการโฮสต์ ส่วน pilot กับ design partner เป็นการเชิญ",
    "/pricing",
    ["open source agent runtime", "Delentia pricing", "design partner pilot", "pip install delentia-os"]
  )
}

export default async function PricingPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "How to use Delentia", url: `https://delentia.com${localePrefix}/pricing` },
  ])
  const productSchema = getProductOfferSchema(locale)

  const faqSchema = getFAQSchema([
    {
      question: "Is Delentia free?",
      answer:
        "The runtime is open source (Apache-2.0) and free to install and run. You pay your own model provider if you use one; with a local model you pay nothing.",
    },
    {
      question: "What is a design-partner pilot?",
      answer:
        "We set Delentia up with you on one real workflow, write the pass rule before the first run, measure it against a plain agent, and report the result per workflow, failures included. We publish it only with your permission. There is no fee for the first partners.",
    },
    {
      question: "Can I run it on-premise or sign a custom SLA?",
      answer:
        "You can run the open-source runtime on your own machines today. There is no managed deployment and no SLA offered. Talk to the founder if you need either.",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <PricingClient />
    </>
  )
}
