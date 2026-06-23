// Schema.org structured data for SEO
import type { Locale } from './i18n'
import {
  SITE_ALGORITHM_COUNT,
  SITE_HALLUCINATION_RATE,
  SITE_LAYER_COUNT,
  SITE_MICROSERVICE_COUNT,
  SITE_NAME,
  SITE_UPTIME,
  SITE_URL,
  SITE_VERSION,
  SOCIAL_LINKS,
} from './site-config'
import { GENERAL_CONTACT_EMAIL } from './contact'

export function getOrganizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Delentia Labs',
    alternateName: 'Delentia OS',
    url: `https://delentia.com/${locale}`,
    logo: 'https://delentia.com/RCTLogo-horizontal.svg',
    description: locale === 'th'
      ? 'ระบบปฏิบัติการ AI แบบรัฐธรรมนูญ — สถาปัตยกรรม 10 ชั้น, การตรวจสอบแบบหลาย LLM, และความเป็นเจ้าของข้อมูลอย่างสมบูรณ์'
      : 'Constitutional AI Operating System — 10-Layer architecture, multi-LLM consensus, and absolute data sovereignty',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Ittirit Saengow',
      jobTitle: 'The Architect',
    },
    sameAs: [
      SOCIAL_LINKS.github,
      SOCIAL_LINKS.twitter,
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.discord,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Technical Support',
      email: GENERAL_CONTACT_EMAIL,
      availableLanguage: ['en', 'th'],
    },
    dateModified: '2026-06-07',
  }
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function getArticleSchema(article: {
  title: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  image: string
  url: string
  locale: Locale
  articleBody?: string
  keywords?: string[]
  wordCount?: number
  authorUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    ...(article.articleBody && { articleBody: article.articleBody }),
    ...(article.keywords && { keywords: article.keywords.join(',') }),
    ...(article.wordCount && { wordCount: article.wordCount }),
    author: {
      '@type': 'Person',
      name: article.author,
      ...(article.authorUrl && { url: article.authorUrl }),
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    image: article.image,
    url: article.url,
    publisher: {
      '@type': 'Organization',
      name: 'Delentia Labs',
      logo: {
        '@type': 'ImageObject',
        url: 'https://delentia.com/RCTLogo-horizontal.svg',
      },
    },
    inLanguage: article.locale,
  }
}

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function getWebSiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    description: locale === 'th'
      ? 'ระบบปฏิบัติการสำหรับปัญญาประดิษฐ์ที่ขับเคลื่อนด้วยเจตนา'
      : 'The Operating System for Intent-Driven Intelligence',
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    dateModified: '2026-05-19',
  }
}

export function getSoftwareApplicationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: locale === 'th'
      ? 'Delentia OS - ระบบปฏิบัติการ AI แบบรัฐธรรมนูญ'
      : 'Delentia OS - Constitutional AI Operating System',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: locale === 'th'
      ? `โปรแกรมสถาปัตยกรรม AI แบบรัฐธรรมนูญพร้อมสถาปัตยกรรม 10 ชั้น, footprint ระดับ ${SITE_MICROSERVICE_COUNT}+ runtime components, และหลักฐาน benchmark hallucination ${SITE_HALLUCINATION_RATE}`
      : `Constitutional AI architecture program with a 10-layer model, a ${SITE_MICROSERVICE_COUNT}+ runtime-component footprint, and ${SITE_HALLUCINATION_RATE} hallucination evidence on benchmarked workloads.`,
    featureList: [
      '10-Layer Architecture',
      `${SITE_MICROSERVICE_COUNT}+ Runtime Components`,
      'Multi-LLM Consensus',
      'SignedAI Verification',
      'RCTDB v2.0',
      'JITNA Protocol',
      `${SITE_UPTIME} Availability Target`,
      'Bilingual Support (EN/TH)',
    ].join(', '),
    softwareVersion: SITE_VERSION,
    releaseNotes: `${SITE_URL}/en/changelog`,
    url: SITE_URL,
    codeRepository: "https://github.com/delentia-labs/delentia-os",
    license: "https://opensource.org/licenses/Apache-2.0",
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

/** Structured data for Pricing page — Product + multi-tier Offers */
export function getProductOfferSchema(locale: Locale) {
  const name = locale === 'th' ? 'Delentia OS — แพลตฟอร์ม AI ระดับองค์กร' : 'Delentia OS — Constitutional AI Enterprise Platform'
  const description = locale === 'th'
    ? `ระบบปฏิบัติการ AI สถาปัตยกรรม ${SITE_LAYER_COUNT} ชั้น พร้อม ${SITE_ALGORITHM_COUNT} อัลกอริทึม, Multi-LLM Consensus, FDIA equation และ hallucination ${SITE_HALLUCINATION_RATE}`
    : `${SITE_LAYER_COUNT}-layer Constitutional AI Operating System with ${SITE_ALGORITHM_COUNT} algorithms, Multi-LLM Consensus, FDIA equation, and ${SITE_HALLUCINATION_RATE} hallucination`
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    brand: { '@type': 'Organization', name: 'Delentia Labs', url: SITE_URL },
    url: `${SITE_URL}/${locale}/pricing`,
    image: `${SITE_URL}/opengraph-image`,
    offers: [
      {
        '@type': 'Offer',
        name: locale === 'th' ? 'แผน Starter' : 'Starter',
        description: locale === 'th' ? 'สำรวจสถาปัตยกรรม Delentia OS โดยไม่มีค่าใช้จ่าย' : 'Explore the Delentia OS architecture for free',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/${locale}/pricing`,
      },
      {
        '@type': 'Offer',
        name: locale === 'th' ? 'แผน Enterprise' : 'Enterprise',
        description: locale === 'th' ? 'แพลตฟอร์ม AI ระดับองค์กรพร้อมการติดตั้งแบบกำหนดเองและ SLA' : 'Full enterprise AI platform with custom deployment and SLA',
        priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'USD', description: 'Custom — contact sales' },
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/${locale}/pricing`,
      },
    ],
  }
}

export function getDefinedTermSchema(term: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    description: description,
    url: url,
    inDefinedTermSet: 'https://delentia.com/glossary'
  }
}

export function getPersonSchema(
  name: string,
  jobTitle: string,
  url: string,
  description?: string,
  sameAs?: string[],
  alternateName?: string,
  knowsAbout?: string[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    ...(alternateName && { alternateName }),
    jobTitle,
    url,
    ...(description && { description }),
    ...(sameAs && { sameAs }),
    ...(knowsAbout && { knowsAbout }),
    nationality: {
      '@type': 'Country',
      name: 'Thailand',
    },
    affiliation: {
      '@type': 'Organization',
      name: 'Delentia Labs',
      url: 'https://delentia.com',
    },
  }
}

export function getMLModelSchema(model: {
  name: string
  description: string
  version: string
  hfRepo: string
  license: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: model.name,
    description: model.description,
    softwareVersion: model.version,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Machine Learning Model',
    downloadUrl: `https://huggingface.co/${model.hfRepo}`,
    license: model.license,
    author: {
      '@type': 'Organization',
      name: 'Delentia Labs',
      url: 'https://delentia.com',
    },
  }
}

export function getSoftwarePackageSchema(pkg: {
  name: string
  description: string
  version: string
  installCommand: string
  repository: string
  license: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: pkg.name,
    description: pkg.description,
    softwareVersion: pkg.version,
    applicationCategory: 'DeveloperApplication',
    downloadUrl: pkg.name.startsWith('@') 
      ? `https://www.npmjs.com/package/${pkg.name}`
      : `https://pypi.org/project/${pkg.name}`,
    license: pkg.license,
    codeRepository: pkg.repository,
    author: {
      '@type': 'Organization',
      name: 'Delentia Labs',
      url: 'https://delentia.com',
    },
  }
}

export function getLearningResourceSchema(resource: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: resource.name,
    description: resource.description,
    url: resource.url,
    learningResourceType: 'Interactive Tutorial',
    author: {
      '@type': 'Organization',
      name: 'Delentia Labs',
      url: 'https://delentia.com',
    },
  }
}

export function getSoftwareSourceCodeSchema(code: {
  name: string
  description: string
  codeRepository: string
  programmingLanguage: string
  license: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: code.name,
    description: code.description,
    codeRepository: code.codeRepository,
    programmingLanguage: code.programmingLanguage,
    license: code.license,
    author: {
      '@type': 'Organization',
      name: 'Delentia Labs',
      url: 'https://delentia.com',
    },
  }
}
