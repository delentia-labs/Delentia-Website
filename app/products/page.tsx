import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import ProductsClient from "./ProductsClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "What you can install today",
    "สิ่งที่ติดตั้งและใช้ได้ตอนนี้",
    "Three open-source pieces: the Delentia OS agent runtime (pip install delentia-os), Delentia Guard (an MCP proxy with a signed audit log) and the Delentia MCP connector. No hosted service, no price, no enterprise customers yet.",
    "สามชิ้นโอเพนซอร์ส: รันไทม์ agent Delentia OS (pip install delentia-os), Delentia Guard (MCP proxy พร้อมบันทึกตรวจสอบที่ลงนาม) และตัวเชื่อม Delentia MCP ไม่มีบริการโฮสต์ ไม่มีราคา และยังไม่มีลูกค้าองค์กร",
    "/products",
    ["agent runtime", "MCP proxy", "delentia-os", "delentia-guard", "open source"]
  )
}

export default async function ProductsPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Products", url: `https://delentia.com${localePrefix}/products` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "What can I install today?",
      answer:
        "Three open-source pieces: the Delentia OS agent runtime (pip install delentia-os), Delentia Guard (an MCP proxy that gates tool calls and signs an audit log) and the Delentia MCP connector (npx delentia-mcp). There is no hosted service, no price and no SLA.",
    },
    {
      question: "What happened to Delentia Platform and Delentia AI?",
      answer:
        "Those two product pages described offerings that were not available as written and have been withdrawn. Their ideas live on inside the open-source runtime.",
    },
  ])

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "What you can install today",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Delentia OS", url: "https://github.com/delentia-labs/delentia-os" },
      { "@type": "ListItem", position: 2, name: "Delentia Guard", url: "https://www.npmjs.com/package/delentia-guard" },
      { "@type": "ListItem", position: 3, name: "Delentia MCP", url: "https://www.npmjs.com/package/delentia-mcp" },
    ],
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <ProductsClient />
    </>
  )
}

