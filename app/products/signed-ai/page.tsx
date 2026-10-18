import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { SITE_URL, SOCIAL_LINKS } from "@/lib/site-config"
import SignedAIPage from "./SignedAIClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "SignedAI jury — independent model votes with a signed verdict",
    "คณะลูกขุน SignedAI — ผลโหวตจากโมเดลอิสระพร้อมคำตัดสินที่ลงนาม",
    "SignedAI is the open-source jury runner in Delentia: independent models vote agree, disagree or abstain, abstentions never help a proposal pass, and the verdict is signed with Ed25519. Tested with scripted voters; no real multi-vendor vote has been run yet. No hosted API.",
    "SignedAI คือตัวรันคณะลูกขุนโอเพนซอร์สใน Delentia: โมเดลอิสระลงคะแนนเห็นด้วย ไม่เห็นด้วย หรืองดออกเสียง การงดออกเสียงไม่ช่วยให้ข้อเสนอผ่าน และคำตัดสินลงนามด้วย Ed25519 ทดสอบกับผู้ลงคะแนนแบบสคริปต์ ยังไม่เคยลงคะแนนจริงข้ามผู้ให้บริการ ไม่มี API แบบโฮสต์",
    "/products/signed-ai",
    ["SignedAI", "model jury", "Ed25519 signed verdict", "open source", "multi-model vote"]
  )
}

export default async function Page() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Products", url: `/products` },
    { name: "SignedAI jury", url: `/products/signed-ai` },
  ])
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SignedAI jury (part of Delentia OS)",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    description:
      "Open-source jury runner: independent models vote agree, disagree or abstain; the verdict is a canonical record signed with Ed25519. Tested with scripted voters only.",
    codeRepository: SOCIAL_LINKS.platformGithub,
    license: "https://opensource.org/licenses/Apache-2.0",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  }
  return (
    <>
      <script type={"application/ld+json"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type={"application/ld+json"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <SignedAIPage />
    </>
  )
}
