import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Community Events — Coming Soon | Delentia Labs",
    "กิจกรรมชุมชน — เร็วๆ นี้ | Delentia Labs",
    "Delentia Labs community events page is under construction. Join our community to be notified when events are announced.",
    "หน้ากิจกรรมชุมชนของ Delentia Labs อยู่ระหว่างการพัฒนา เข้าร่วมชุมชนเพื่อรับการแจ้งเตือนเมื่อมีการประกาศกิจกรรม",
    "/community/events"
  )
}

export default async function CommunityEventsPage() {
  const locale = await getRequestLocale()
  const isEn = locale === "en"
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Community", url: `https://delentia.com${localePrefix}/community` },
    { name: "Events", url: `https://delentia.com${localePrefix}/community/events` },
  ])
  const faq = getFAQSchema([
    {
      question: isEn ? "When will community events start?" : "กิจกรรมชุมชนจะเริ่มเมื่อไร?",
      answer: isEn
        ? "The event calendar is in pilot mode. Monthly online sessions are prioritized first, followed by local meetups."
        : "ปฏิทินกิจกรรมอยู่ในช่วงทดลอง โดยจะเริ่มจากออนไลน์รายเดือนก่อน และตามด้วยมีตอัปออนไซต์",
    },
    {
      question: isEn ? "How can I get notified?" : "จะรับการแจ้งเตือนได้อย่างไร?",
      answer: isEn
        ? "Use the contact form to register interest and we will send schedule updates and event registration links."
        : "กรอกฟอร์มติดต่อเพื่อลงทะเบียนความสนใจ แล้วทีมงานจะส่งกำหนดการและลิงก์ลงทะเบียนให้",
    },
  ])
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": isEn ? "Community Event Programs" : "รูปแบบกิจกรรมชุมชน",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: isEn ? "Monthly Office Hours" : "Office Hours รายเดือน" },
      { "@type": "ListItem", position: 2, name: isEn ? "Architecture Deep-Dive" : "เซสชันเจาะลึกสถาปัตยกรรม" },
      { "@type": "ListItem", position: 3, name: isEn ? "Regional Meetup" : "มีตอัประดับภูมิภาค" },
    ],
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <main className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-3xl px-4 pt-24 pb-16 text-center">
        <Link
          href={`${localePrefix}/community`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-12 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isEn ? "Back to Community" : "กลับสู่ Community"}</span>
        </Link>

        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center">
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-4">
          {isEn ? "Community Events" : "กิจกรรมชุมชน"}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          {isEn ? "Program Track Now Open" : "เปิดรับเข้าร่วมโปรแกรมแล้ว"}
        </p>
        <p className="text-muted-foreground max-w-lg mx-auto mb-12">
          {isEn
            ? "We now run a minimum production track: monthly office hours, technical deep-dives, and early regional meetup planning for the Delentia Labs ecosystem."
            : "ตอนนี้เราเปิดแทร็กขั้นต่ำสำหรับโปรดักชันแล้ว: office hours รายเดือน, technical deep-dive และแผนมีตอัประดับภูมิภาคสำหรับระบบนิเวศ Delentia Labs"}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href={`${localePrefix}/community`}>{isEn ? "Community Hub" : "ศูนย์ชุมชน"}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`${localePrefix}/contact`}>{isEn ? "Get Notified" : "รับการแจ้งเตือน"}</Link>
          </Button>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold text-foreground mb-2">{isEn ? "Monthly Office Hours" : "Office Hours รายเดือน"}</h2>
            <p className="text-sm text-muted-foreground">{isEn ? "Open Q&A with maintainers on architecture and implementation decisions." : "ช่วงถามตอบกับทีมผู้ดูแลเรื่องสถาปัตยกรรมและการตัดสินใจเชิง implementation"}</p>
          </article>
          <article className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold text-foreground mb-2">{isEn ? "Technical Deep-Dive" : "Technical Deep-Dive"}</h2>
            <p className="text-sm text-muted-foreground">{isEn ? "Focused sessions on FDIA, JITNA, RCTDB, and production readiness patterns." : "เซสชันเฉพาะทางด้าน FDIA, JITNA, RCTDB และแนวทาง production readiness"}</p>
          </article>
          <article className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold text-foreground mb-2">{isEn ? "Regional Meetup" : "Regional Meetup"}</h2>
            <p className="text-sm text-muted-foreground">{isEn ? "Pilot in-person sessions for builders and research collaborators." : "กิจกรรมออนไซต์นำร่องสำหรับนักพัฒนาและผู้ร่วมวิจัย"}</p>
          </article>
        </div>
      </section>
      <Footer />
    </main>
    </>
  )
}

