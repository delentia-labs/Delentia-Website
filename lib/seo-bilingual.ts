import { Metadata } from "next"

/*
 * seo-bilingual.ts — Bilingual (EN/TH) metadata and schema utilities
 *
 * Relationship with lib/schema.ts:
 * - lib/schema.ts is the SINGLE SOURCE OF TRUTH for all Schema.org structured data.
 *   Use it directly for non-locale-specific schemas (getBreadcrumbSchema, getFAQSchema, etc.).
 * - This file extends schema.ts with LOCALE-AWARE variants:
 *   - getBreadcrumbSchema here accepts a `locale` param and is renamed
 *     getBilingualBreadcrumbSchema to avoid confusion.
 *   - getFAQSchema here accepts a `locale` param and is renamed
 *     getBilingualFAQSchema to avoid confusion.
 * - createBilingualMetadata is unique to this file and has no equivalent in schema.ts.
 *
 * Import guide:
 * - For locale-agnostic schemas → import from "@/lib/schema"
 * - For bilingual metadata or locale-specific schemas → import from "@/lib/seo-bilingual"
 */

export type Locale = "en" | "th"

function resolveLocale(locale: Locale | string | null | undefined): Locale {
  return locale === "th" ? "th" : "en"
}

function normalizeLocalePath(locale: Locale, path: string) {
  return path === "/" ? `https://delentia.com/${locale}` : `https://delentia.com/${locale}${path}`
}

export const baseKeywords: Record<Locale, string[]> = {
  en: [
    "constitutional AI",
    "multi-LLM consensus",
    "AI verification",
    "SignedAI",
    "intent-driven AI",
    "AI operating system",
    "JITNA protocol",
    "RCTDB",
    "enterprise AI platform",
    "10-layer architecture",
    "AI hallucination prevention",
    "Thailand AI",
    "Delentia Labs",
    "AI infrastructure",
    "data sovereignty",
    "AI compliance",
    "PDPA AI",
    "production algorithms",
    "41 algorithms",
    "availability target",
    "reduce AI hallucination",
    "AI governance framework",
    "constitutional AI platform",
    "enterprise AI governance",
    "AI quality control",
    "multi-model AI orchestration",
    "AI cost optimization",
    "AI memory system",
    "FDIA equation",
    "reverse component thinking",
    "AI for enterprise Thailand",
    "low hallucination AI",
    "AI audit trail",
    "signed AI verification",
    "sovereign AI infrastructure"
  ],
  th: [
    "ปัญญาประดิษฐ์แบบรัฐธรรมนูญ",
    "ระบบ AI ตรวจสอบได้",
    "AI ระดับองค์กร",
    "แพลตฟอร์ม AI ไทย",
    "ระบบปฏิบัติการ AI",
    "AI สำหรับธุรกิจ",
    "AI อัตราการหลอนต่ำ",
    "AI ที่ปลอดภัย",
    "SignedAI",
    "JITNA",
    "RCTDB",
    "Delentia Labs",
    "Constitutional AI",
    "Multi-LLM",
    "Enterprise AI",
    "Data Sovereignty",
    "PDPA",
    "AI ประเทศไทย",
    "41 อัลกอริทึม",
    "10 ชั้นสถาปัตยกรรม",
    "ลด AI Hallucination",
    "สมการ FDIA",
    "AI สำหรับองค์กรไทย",
    "ระบบ AI อัจฉริยะ",
    "AI กำกับดูแล",
    "ระบบ AI ธุรกิจไทย",
    "availability target สำหรับ enterprise programs"
  ]
}

export const createBilingualMetadata = (
  locale: Locale | string | null | undefined,
  titleEN: string,
  titleTH: string,
  descEN: string,
  descTH: string,
  path: string,
  additionalKeywords?: string[]
): Metadata => {
  const safeLocale = resolveLocale(locale)
  const title = safeLocale === "th" ? titleTH : titleEN
  const description = safeLocale === "th" ? descTH : descEN
  const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION
  const bingSiteVerification = process.env.BING_SITE_VERIFICATION
  const keywords = [
    ...(baseKeywords[safeLocale] ?? []),
    ...(additionalKeywords ?? [])
  ]

  const verification = googleSiteVerification || bingSiteVerification
    ? {
        google: googleSiteVerification,
        other: bingSiteVerification
          ? {
              "msvalidate.01": bingSiteVerification,
            }
          : undefined,
      }
    : undefined

  return {
    title: title,
    description,
    keywords,
    alternates: {
      canonical: normalizeLocalePath(safeLocale, path),
      languages: {
        "en": normalizeLocalePath("en", path),
        "th": normalizeLocalePath("th", path),
        "x-default": normalizeLocalePath("en", path),
      }
    },
    openGraph: {
      title: `${title} | Delentia Labs`,
      description,
      url: normalizeLocalePath(safeLocale, path),
      siteName: "Delentia Labs",
      locale: safeLocale === "th" ? "th_TH" : "en_US",
      alternateLocale: safeLocale === "th" ? ["en_US"] : ["th_TH"],
      type: "website",
      images: [
        {
          url: "https://delentia.com/opengraph-image",
          width: 1200,
          height: 630,
          alt: title,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Delentia Labs`,
      description,
      images: ["https://delentia.com/opengraph-image"],
      creator: "@delentialabs",
      site: "@delentialabs"
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      }
    },
    verification,
  }
}

export const getBilingualBreadcrumbSchema = (
  locale: Locale,
  items: Array<{ name: string; url: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  }
}

export const getBilingualFAQSchema = (
  locale: Locale,
  faqs: Array<{ question: string; answer: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  }
}

// Re-export for backwards compatibility — prefer getBilingualBreadcrumbSchema / getBilingualFAQSchema
/** @deprecated Use getBilingualBreadcrumbSchema (locale-aware) or getBreadcrumbSchema from lib/schema.ts (locale-agnostic) */
export const getBreadcrumbSchema = getBilingualBreadcrumbSchema
/** @deprecated Use getBilingualFAQSchema (locale-aware) or getFAQSchema from lib/schema.ts (locale-agnostic) */
export const getFAQSchema = getBilingualFAQSchema

// SoftwareApplicationSchema — use getSoftwareApplicationSchema from lib/schema.ts (single source of truth)
export { getSoftwareApplicationSchema } from './schema'
