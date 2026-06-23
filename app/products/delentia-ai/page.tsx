import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { SITE_URL } from "@/lib/site-config"
import DelentiaAIPage from "./DelentiaAIClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Delentia AI — Personal Agent OS | WF00-META 7-Phase Protocol | RCTDB 8-Dimensional",
    "Delentia AI — Personal Agent OS — WF00-META 7-Phase Protocol",
    "Personal Agent OS with L1-L5 intelligence levels, RCTDB 8-Dimensional memory, and WF00-META 7-phase protocol. FDIA Constitutional Scoring, Sovereignty Vault, and Analysearch Mirror Mode integration.",
    "Personal Agent OS พร้อมระดับปัญญา L1-L5, RCTDB 8-Dimensional Memory และ WF00-META Pipeline 7 ขั้นตอน — FDIA Constitutional Scoring, Sovereignty Vault และ Analysearch Integration",
    "/products/delentia-ai",
    ["personal agent OS", "WF00-META protocol", "RCTDB 8-dimensional", "FDIA constitutional AI", "L1-L5 intelligence"]
  )
}

export default async function Page() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Products", url: `/products` },
    { name: "Delentia AI", url: `/products/delentia-ai` },
  ])
  const productSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Delentia AI Personal Agent OS", "applicationCategory": "BusinessApplication", "operatingSystem": "Any", "description": "Personal Agent OS with 7-phase WF00-META protocol, RCTDB 8-Dimensional memory, L1-L5 intelligence levels, and FDIA Constitutional Scoring.", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "featureList": "L1-L5 Intelligence Ladder, FDIA Constitutional Scoring, Sovereignty Vault, Analysearch Integration, WF00-META 7-Phase Protocol, RCTDB 8-Dimensional", "url": `/products/delentia-ai`, "publisher": { "@type": "Organization", "name": "Delentia Labs", "url": SITE_URL } }
  return (
    <>
      <script type={"application/ld+json"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type={"application/ld+json"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <DelentiaAIPage />
    </>
  )
}

