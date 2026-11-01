import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema, getFAQSchema, getOrganizationSchema, getSoftwareApplicationSchema } from "@/lib/schema"
import HomePageClient from "../HomePageClient"
import { HeroServer } from "@/components/sections/hero-server"
import { Navbar } from "@/components/navbar"
import { SITE_ENTERPRISE_EVIDENCE_LABEL, SITE_PUBLIC_SDK_EVIDENCE_LABEL } from "@/lib/site-config"

// ISR: cache the homepage for 1 hour, then regenerate in the background.
// No headers() call here — root layout is also headers()-free → statically renderable.
export const revalidate = 3600

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "th" }]
}

type LocalePageProps = {
  params: Promise<{ locale: "en" | "th" }>
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  return createBilingualMetadata(
    locale,
    "Delentia OS — a governed AI agent runtime you install yourself",
    "Delentia OS — ระบบรัน AI Agent ที่คุมสิทธิ์และตรวจสอบย้อนหลังได้ ติดตั้งเอง",
    `Delentia OS is an open-source, experimental AI agent runtime you run on your own machine. Every tool call is judged before it runs, risky actions wait for a human signature, text from outside cannot move anything on its own, and the audit log can be verified offline. Windows installer and pip; no hosted service; no results with a strong model yet.`,
    `Delentia OS เป็นรันไทม์ AI agent โอเพนซอร์สแบบทดลองที่รันบนเครื่องของคุณเอง ทุกการเรียกเครื่องมือถูกตัดสินก่อนทำงาน งานเสี่ยงต้องรอลายเซ็นของมนุษย์ ข้อความจากภายนอกสั่งงานเองไม่ได้ และตรวจ audit log ย้อนหลังแบบออฟไลน์ได้ มีตัวติดตั้ง Windows และ pip ไม่มีบริการโฮสต์ และยังไม่มีผลกับโมเดลที่เก่ง`,
    "/",
    locale === "th"
      ? ["AI agent runtime", "ติดตั้งเอง", "ลายเซ็นอนุมัติ", "audit log", "FDIA Equation", "Agentic AI Security"]
      : ["AI agent runtime", "self-hosted AI agent", "human approval for AI actions", "audit log", "FDIA equation", "agentic AI security"]
  )
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params
  const localePrefix = locale === "th" ? "/th" : "/en"

  const breadcrumbSchema = getBreadcrumbSchema([{ name: "Home", url: `https://delentia.com${localePrefix}` }])
  const orgSchema = getOrganizationSchema(locale)
  const softwareSchema = getSoftwareApplicationSchema(locale)

  const faqSchema = getFAQSchema(
    locale === "th"
      ? [
          {
            question: "Delentia OS คืออะไร และแก้ปัญหาอะไร?",
            answer:
              "Delentia OS เป็นรันไทม์ AI agent โอเพนซอร์สที่รันบนเครื่องของคุณ ปัญหาที่มันตั้งใจแก้คือเมื่อให้ agent ทำงานแทน คุณจะคุมได้ว่ามันทำอะไรได้บ้างและตรวจย้อนหลังได้ว่าทำอะไรไปจริง: ทุกการเรียกเครื่องมือถูกตัดสินก่อน งานเสี่ยงต้องรอลายเซ็นของคุณ และบันทึกการทำงานเชื่อมกันด้วย hash และตรวจแบบออฟไลน์ได้ มันไม่ได้ทำให้โมเดลถูกต้องขึ้น และไม่ได้ตรวจว่าคำตอบเป็นจริง",
          },
          {
            question: "ลองใช้ได้อย่างไร และต้องมีโมเดลหรือไม่?",
            answer:
              "ติดตั้งด้วยตัวติดตั้ง Windows หรือ pip install delentia-os แล้วรัน delentia demo init --lang en ตามด้วย delentia demo run compare --scripted ใช้เวลาราวสองนาทีและไม่ต้องมีโมเดลหรือคีย์ โปรแกรมสคริปต์ทำหน้าที่แทนโมเดลเท่านั้น ส่วนเครื่องมือ ด่านความปลอดภัย การรอลายเซ็น และ audit log เป็นของจริง",
          },
          {
            question: "พร้อมใช้งานจริงหรือยัง?",
            answer:
              "ยัง เป็นงานทดลองที่ผู้พัฒนาคนเดียวสร้าง ยังไม่มีผลที่วัดกับโมเดลโฮสต์ที่เก่ง ยังไม่มีผู้ใช้ภายนอก ไม่มีบริการโฮสต์ และไม่มีการรับรองด้านความปลอดภัยหรือการปฏิบัติตามกฎหมายใด ๆ ดูหน้า Known limitations และ Threat model ในเอกสาร",
          },
        ]
      : [
          {
            question: "What is Delentia OS and what problem does it address?",
            answer:
              "Delentia OS is an open-source AI agent runtime that runs on your own machine. It addresses one problem: when an agent acts for you, can you control what it may do and check afterwards what it actually did? Every tool call is judged first, risky actions wait for your signature, and the record is hash-chained and can be verified offline. It does not make a model more correct, and it does not check that an answer is true.",
          },
          {
            question: "How do I try it, and do I need a model?",
            answer:
              "Install the Windows installer or run pip install delentia-os, then delentia demo init --lang en and delentia demo run compare --scripted. It takes about two minutes and needs no model and no key. A fixed program stands in for the model only; the tools, the safety gate, the wait for a signature and the audit log are real.",
          },
          {
            question: "Is it ready for production?",
            answer:
              "No. It is experimental software built by one person. There are no results yet with a strong hosted model, no outside users, no hosted service, and no security or compliance certification. See the Known limitations and Threat model pages in the documentation.",
          },
        ]
  )

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: locale === "th" ? "Delentia Labs หน้าแรก" : "Delentia Labs Homepage",
    url: `https://delentia.com${localePrefix}`,
    inLanguage: locale,
    description:
      locale === "th"
        ? "หน้าแรกของ Delentia Labs สำหรับสำรวจสถาปัตยกรรม เอกสารวิจัย โซลูชัน ราคา และแนวทางการใช้งาน AI ระดับองค์กร"
        : "Homepage for exploring Delentia Labs architecture, whitepapers, solutions, pricing, and enterprise AI evaluation paths.",
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <HomePageClient locale={locale} navSlot={<Navbar locale={locale} />} heroSlot={<HeroServer locale={locale} />} />
    </>
  )
}
