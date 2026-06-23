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
    "Community Members — Coming Soon | Delentia Labs",
    "สมาชิกชุมชน — เร็วๆ นี้ | Delentia Labs",
    "Delentia Labs community member directory is under construction. Connect with developers and researchers building on the Delentia Labs platform.",
    "ไดเรกทอรีสมาชิกชุมชนของ Delentia Labs อยู่ระหว่างการพัฒนา เชื่อมต่อกับนักพัฒนาและนักวิจัยที่สร้างบน Delentia Labs platform",
    "/community/members"
  )
}

export default async function CommunityMembersPage() {
  const locale = await getRequestLocale()
  const isEn = locale === "en"
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Community", url: `https://delentia.com${localePrefix}/community` },
    { name: "Members", url: `https://delentia.com${localePrefix}/community/members` },
  ])
  const faq = getFAQSchema([
    {
      question: isEn ? "Who should join the member directory?" : "ใครควรเข้าร่วม member directory?",
      answer: isEn
        ? "Engineers, researchers, product builders, and technical operators active in the Delentia Labs ecosystem."
        : "วิศวกร นักวิจัย นักสร้างผลิตภัณฑ์ และผู้ปฏิบัติการเทคนิคที่ทำงานในระบบนิเวศ Delentia Labs",
    },
    {
      question: isEn ? "What does early access include?" : "early access จะได้อะไรบ้าง?",
      answer: isEn
        ? "Profile listing, interest tags, and early invitations to technical sessions and collaboration calls."
        : "ได้สิทธิ์ลงโปรไฟล์ ใส่แท็กความสนใจ และรับเชิญรอบต้นสำหรับ technical session และ collaboration call",
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
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
            <Clock className="w-8 h-8 text-emerald-500" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-4">
          {isEn ? "Community Members" : "สมาชิกชุมชน"}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          {isEn ? "Early Access Enrollment" : "เปิดรับ Early Access"}
        </p>
        <p className="text-muted-foreground max-w-lg mx-auto mb-12">
          {isEn
            ? "The member directory is now open in minimum production mode for early ecosystem contributors and cross-team collaborators."
            : "ไดเรกทอรีสมาชิกเปิดใช้งานในโหมดขั้นต่ำสำหรับโปรดักชันแล้ว สำหรับผู้ร่วมพัฒนาระบบนิเวศและผู้ร่วมงานข้ามทีม"}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href={`${localePrefix}/community`}>{isEn ? "Community Hub" : "ศูนย์ชุมชน"}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`${localePrefix}/contact`}>{isEn ? "Register Interest" : "ลงทะเบียนความสนใจ"}</Link>
          </Button>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold text-foreground mb-2">{isEn ? "Builder Profile" : "โปรไฟล์นักพัฒนา"}</h2>
            <p className="text-sm text-muted-foreground">{isEn ? "Highlight your current stack, domain focus, and collaboration preferences." : "ระบุ stack ที่ใช้งาน, domain focus และรูปแบบการร่วมงานที่ต้องการ"}</p>
          </article>
          <article className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold text-foreground mb-2">{isEn ? "Research Interest Tags" : "แท็กความสนใจวิจัย"}</h2>
            <p className="text-sm text-muted-foreground">{isEn ? "Map members by FDIA, JITNA, RCTDB, and governance themes." : "จัดกลุ่มสมาชิกตามหัวข้อ FDIA, JITNA, RCTDB และ governance"}</p>
          </article>
          <article className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold text-foreground mb-2">{isEn ? "Collaboration Match" : "การจับคู่ความร่วมมือ"}</h2>
            <p className="text-sm text-muted-foreground">{isEn ? "Connect contributors with complementary skills for practical delivery tracks." : "เชื่อมต่อผู้ร่วมพัฒนาที่มีทักษะเสริมกันเพื่อเดินงานเชิงปฏิบัติ"}</p>
          </article>
        </div>
      </section>
      <Footer />
    </main>
    </>
  )
}

