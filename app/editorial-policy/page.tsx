import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { Shield, Clock, RefreshCw, Brain, FileText } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Editorial Policy — AI Disclosure, Review Process & Update Cadence",
    "นโยบายบรรณาธิการ — การเปิดเผยการใช้ AI กระบวนการรีวิว และรอบการอัปเดต",
    "Delentia Labs editorial policy: all articles written by verified authors with first-hand expertise. Includes AI disclosure policy, review process, update cadence, and factual accuracy commitment.",
    "นโยบายบรรณาธิการของ Delentia Labs: ทุกบทความเขียนโดยผู้เขียนที่ยืนยันตัวตนและมีประสบการณ์ตรง ครอบคลุมการเปิดเผยการใช้ AI กระบวนการรีวิว รอบการอัปเดต และความมุ่งมั่นด้านความถูกต้องของข้อมูล",
    "/editorial-policy",
    ["editorial policy", "AI disclosure", "review process", "content governance"]
  )
}

export default async function EditorialPolicyPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Editorial Policy", url: `https://delentia.com${localePrefix}/editorial-policy` },
  ])
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Editorial Policy — AI Disclosure, Review Process & Update Cadence",
    description: "Delentia Labs editorial policy: all articles written by verified authors with first-hand expertise. Covers AI disclosure policy, review process, update cadence, and factual accuracy commitment.",
    author: { "@type": "Person", name: "Ittirit Saengow", url: `https://delentia.com${localePrefix}/authors/ittirit-saengow` },
    publisher: { "@type": "Organization", name: "Delentia Labs", logo: { "@type": "ImageObject", url: "https://delentia.com/RCTLogo-horizontal.svg" } },
    url: `https://delentia.com${localePrefix}/editorial-policy`,
    datePublished: "2025-08-11",
    dateModified: "2026-03-01",
    inLanguage: localePrefix === "/th" ? "th" : "en",
    keywords: "editorial policy, AI disclosure, review process, content governance, factual accuracy",
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="min-h-screen bg-background">
        <Navbar />

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(191,160,110,0.07),transparent_55%)] pointer-events-none" />
          <div className="mx-auto max-w-4xl px-4 py-24 md:py-32">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-amber/30 bg-warm-amber/8 text-warm-amber text-sm font-medium mb-6">
              <FileText className="w-4 h-4" /> Editorial Policy
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              How We Write, Review, and Maintain Content
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Delentia Labs is committed to factual accuracy, first-hand expertise, and transparent disclosure on all published content.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-8 space-y-8">

          {/* Authorship */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-warm-amber/15 flex items-center justify-center">
                <Brain className="w-5 h-5 text-warm-amber" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Authorship Standards</h2>
            </div>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                <strong className="text-foreground">All Delentia Labs articles are written by authors with direct, first-hand experience</strong> in the topics they cover. This is not a guest blog platform.
              </p>
              <p>
                <strong className="text-foreground">Ittirit Saengow</strong> (อิทธิฤทธิ์ แซ่โง้ว) authors all core concept articles — FDIA, JITNA, RCT-7, HexaCore, Delta Engine, RCTDB, SignedAI — because these concepts were created by him. Every technical claim is derived from the implementation, not secondary research.
              </p>
              <p className="border-l-2 border-warm-amber/40 pl-4">
                Articles previously attributed to fictional author names (Dr. Alex Patel, Dr. Sarah Chen, Prof. James Wilson) were corrected on 2026-03-28 and reassigned to the verified author.
              </p>
            </div>
          </div>

          {/* AI Disclosure */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-warm-amber/15 flex items-center justify-center">
                <Shield className="w-5 h-5 text-warm-amber" />
              </div>
              <h2 className="text-xl font-bold text-foreground">AI Disclosure Policy</h2>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: "Research synthesis", use: "AI tools may summarize external research. All summaries are human-verified against primary sources." },
                { label: "Technical accuracy", use: "Numbers and metrics are always from system documentation (verified source of truth), never AI-generated estimates." },
                { label: "Writing assistance", use: "AI writing assistance used for structural help. All content reviewed and approved by a human author before publication." },
                { label: "Content ownership", use: "All intellectual content (FDIA, JITNA, RCT-7, etc.) was created by Ittirit Saengow. AI tools are assistants, not the source." },
              ].map(({ label, use }) => (
                <div key={label} className="bg-muted/30 border border-border rounded-lg p-4">
                  <span className="font-semibold text-foreground">{label}:</span>{" "}
                  <span className="text-muted-foreground">{use}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review Process */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-warm-amber/15 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-warm-amber" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Review Process</h2>
            </div>
            <ol className="space-y-3">
              {[
                "Author drafts from first-hand knowledge and verified system documentation",
                "Technical claims cross-checked against internal source of truth (test results, benchmark data)",
                "Reviewed by Delentia Labs Research Desk for accuracy, clarity, and completeness",
                "Approved by primary author before publication",
                "Published with lastReviewed date visible to readers",
              ].map((step, i) => (
                <li key={step} className="flex gap-3 bg-muted/30 border border-border rounded-lg p-4 text-sm text-muted-foreground">
                  <span className="w-6 h-6 rounded-full bg-warm-amber/20 text-warm-amber text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Update Cadence */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-warm-amber/15 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warm-amber" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Update Cadence</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                { category: "Core concept articles (FDIA, JITNA, RCT-7)", cadence: "Reviewed when platform version changes (target: quarterly)" },
                { category: "Compliance/legal articles (PDPA)", cadence: "Reviewed when regulations change or at minimum annually" },
                { category: "Technology comparisons", cadence: "Reviewed semi-annually or when landscape changes significantly" },
                { category: "Platform metrics / benchmarks", cadence: "Updated with each major platform version release" },
              ].map(({ category, cadence }) => (
                <div key={category} className="bg-muted/30 border border-border rounded-lg p-4">
                  <p className="font-semibold text-foreground text-xs mb-1">{category}</p>
                  <p className="text-muted-foreground text-xs">{cadence}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-4">
              Report outdated information to{" "}
              <a href="mailto:founder@delentia.com" className="text-warm-amber hover:underline">founder@delentia.com</a>
            </p>
          </div>

        </section>

        <Footer />
      </main>
    </>
  )
}
