import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { SITE_URL, SITE_HALLUCINATION_RATE } from "@/lib/site-config"
import SignedAIPage from "./SignedAIClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "SignedAI — 5th Genome · HexaCore 7-Model Verification API | ED25519 RFC 8032 | Constitutional Accuracy",
    "SignedAI — 5th Genome · HexaCore 7-Model Verification API | Constitutional Accuracy",
    "SignedAI is the 5th Genome in the RCT 7-Genome System. HexaCore 7-Model consensus with ED25519 RFC 8032 signing, 4 geopolitical voting zones (3W/3E/1R), and Constitutional Accuracy AI governance.",
    "SignedAI คือ Genome ที่ 5 ใน RCT 7-Genome System — HexaCore 7-Model Consensus พร้อม ED25519 RFC 8032 Signing, 4 Voting Zones (3W/3E/1R) และ Constitutional Accuracy",
    "/products/signed-ai",
    ["SignedAI", "5th genome", "HexaCore 7 models", "multi-LLM verification", "ED25519 RFC 8032", "constitutional AI", "geopolitical AI balance", "AI consensus API"]
  )
}

export default async function Page() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Products", url: `/products` },
    { name: "SignedAI", url: `/products/signed-ai` },
  ])
  const productSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "SignedAI — 5th Genome Verification API", "applicationCategory": "BusinessApplication", "operatingSystem": "Any", "description": "5th Genome in the RCT 7-Genome System. HexaCore 7-Model consensus with ED25519 RFC 8032 signing, 4 geopolitical voting zones, and Constitutional Accuracy AI governance.", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "featureList": "HexaCore 7-Model Consensus, ED25519 RFC 8032 Signing, Constitutional Accuracy, 4 Geopolitical Voting Zones (3W/3E/1R), Deterministic Replay Engine, 5th Genome in 7-Genome System", "url": `/products/signed-ai`, "publisher": { "@type": "Organization", "name": "Delentia Labs", "url": SITE_URL } }
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How SignedAI Verifies AI Responses",
    "description": `SignedAI uses a 6-stage cryptographic pipeline — INTAKE through REPORT — to produce ED25519-signed, consensus-verified AI responses, targeting a hallucination rate of ${SITE_HALLUCINATION_RATE}.`,
    "totalTime": "PT200MS",
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "INTAKE", "text": "Receive and validate the incoming request. Token normalization and schema validation run before any model is invoked." },
      { "@type": "HowToStep", "position": 2, "name": "ROUTER", "text": "JITNA Protocol selects the optimal subset of HexaCore models based on query complexity, geopolitical balance (3W/3E/1R), and cost constraints." },
      { "@type": "HowToStep", "position": 3, "name": "SIGNERS", "text": "Selected models independently process the request in parallel. Each model produces a signed partial response without seeing other models' outputs." },
      { "@type": "HowToStep", "position": 4, "name": "ATTESTATION", "text": "8-Dimension (8D) scoring evaluates each response on factual accuracy, internal consistency, evidence quality, safety compliance, and four additional dimensions." },
      { "@type": "HowToStep", "position": 5, "name": "CONSENSUS", "text": "Voting protocol (MAJORITY / WEIGHTED / RANKED / UNANIMOUS) aggregates scored responses. Minimum agreement threshold enforced before result is accepted." },
      { "@type": "HowToStep", "position": 6, "name": "REPORT", "text": "Return the ED25519-signed response bundle with SHA-256 checkpoint, full audit trail, and Constitutional Accuracy metadata for deterministic replay." },
    ],
  }
  return (
    <>
      <script type={"application/ld+json"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type={"application/ld+json"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type={"application/ld+json"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <SignedAIPage />
    </>
  )
}

