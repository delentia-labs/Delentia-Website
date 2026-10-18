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
    "Community Forums — Coming Soon | Delentia Labs",
    "ฟอรัมชุมชน — เร็วๆ นี้ | Delentia Labs",
    "Delentia Labs community forums are under construction. A space for developers and researchers to discuss AI infrastructure, FDIA, and the Delentia agent runtime.",
    "ฟอรัมชุมชนของ Delentia Labs อยู่ระหว่างการพัฒนา พื้นที่สำหรับนักพัฒนาและนักวิจัยสนทนาเรื่อง AI infrastructure, FDIA และรันไทม์ agent ของ Delentia",
    "/community/forums"
  )
}

export default async function CommunityForumsPage() {
  const locale = await getRequestLocale()
  const isEn = locale === "en"
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Community", url: `https://delentia.com${localePrefix}/community` },
    { name: "Forums", url: `https://delentia.com${localePrefix}/community/forums` },
  ])
  const faq = getFAQSchema([
    {
      question: isEn ? "What can I discuss in the forum?" : "ในฟอรัมคุยเรื่องอะไรได้บ้าง?",
      answer: isEn
        ? "Architecture topics, implementation questions, benchmark interpretation, and integration practices are all welcome."
        : "สามารถพูดคุยเรื่องสถาปัตยกรรม, ปัญหา implementation, การตีความ benchmark และแนวทาง integration ได้ทั้งหมด",
    },
    {
      question: isEn ? "Is the forum public?" : "ฟอรัมเปิดสาธารณะไหม?",
      answer: isEn
        ? "The initial release is moderated and invite-based while quality and governance guidelines are finalized."
        : "ช่วงแรกจะเป็นแบบ moderated และเชิญเข้าร่วมก่อน ขณะทีมสรุปแนวทางคุณภาพและ governance",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
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
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center">
            <Clock className="w-8 h-8 text-sky-500" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-4">
          {isEn ? "Community Forums" : "ฟอรัมชุมชน"}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          {isEn ? "Pilot Access Active" : "เปิดใช้งานแบบนำร่องแล้ว"}
        </p>
        <p className="text-muted-foreground max-w-lg mx-auto mb-12">
          {isEn
            ? "The forum now runs as a moderated pilot for developers, researchers, and engineers building with FDIA, JITNA, and the Delentia runtime."
            : "ฟอรัมเปิดแบบนำร่องภายใต้การดูแลสำหรับนักพัฒนา นักวิจัย และวิศวกรที่ทำงานกับ FDIA, JITNA และรันไทม์ของ Delentia"}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href={`${localePrefix}/community`}>{isEn ? "Community Hub" : "ศูนย์ชุมชน"}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`${localePrefix}/docs`}>{isEn ? "Documentation" : "เอกสาร"}</Link>
          </Button>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">{isEn ? "Forum Scope" : "ขอบเขตฟอรัมนำร่อง"}</h2>
          <ul className="grid gap-3 md:grid-cols-2 text-sm text-muted-foreground">
            <li>{isEn ? "Implementation troubleshooting threads" : "เธรดช่วยแก้ปัญหา implementation"}</li>
            <li>{isEn ? "Architecture review discussions" : "การสนทนาทบทวนสถาปัตยกรรม"}</li>
            <li>{isEn ? "Benchmark and evaluation interpretation" : "การตีความผล benchmark และ evaluation"}</li>
            <li>{isEn ? "Governance and compliance Q&A" : "ถามตอบด้าน governance และ compliance"}</li>
          </ul>
        </div>
      </section>
      <Footer />
    </main>
    </>
  )
}

