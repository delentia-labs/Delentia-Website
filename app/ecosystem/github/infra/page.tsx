import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import Link from "next/link"
import { fetchGithubReadme } from "@/lib/github-api"
import { MDXContent } from "@/components/mdx-content"

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
    "Delentia Infra Architecture — GitHub Hub",
    "สถาปัตยกรรมโครงสร้างพื้นฐาน Delentia — คลังโค้ด GitHub",
    "Detailed analysis of Delentia platform orchestration, docker containers, and production infrastructure deployment.",
    "การวิเคราะห์เชิงลึกเกี่ยวกับการควบคุมแพลตฟอร์ม Delentia คอนเทนเนอร์ Docker และการปรับใช้โครงสร้างพื้นฐานเพื่อใช้งานจริง",
    "/ecosystem/github/infra"
  )
}

export default async function DelentiaInfraGithubPage({ params }: LocalePageProps) {
  const { locale } = await params
  const isTH = locale === "th"
  const localePrefix = isTH ? "/th" : "/en"

  // Fetch readme dynamically
  const readme = await fetchGithubReadme("Delentia-Infra-Public", locale)

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href={`${localePrefix}/ecosystem`} className="hover:underline">
          {isTH ? "Ecosystem" : "Ecosystem"}
        </Link>
        <span>/</span>
        <Link href={`${localePrefix}/ecosystem/github`} className="hover:underline">
          GitHub
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">Delentia-Infra</span>
      </div>

      {/* Header Info */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 space-y-6 bg-white/50 dark:bg-black/10 backdrop-blur-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight">Delentia-Infra</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                Infrastructure
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              github.com/delentia-labs/Delentia-Infra-Public
            </p>
          </div>
          <a
            href="https://github.com/delentia-labs/Delentia-Infra-Public"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl text-sm font-semibold hover:opacity-90 transition text-center"
          >
            {isTH ? "เปิดบน GitHub 🐙" : "Open on GitHub 🐙"}
          </a>
        </div>

        {/* Repository Metadata Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 uppercase tracking-wider">{isTH ? "ประเภท" : "Type"}</span>
            <p className="font-bold text-sm">Deployment Orchestrator</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-400 uppercase tracking-wider">{isTH ? "เครื่องมือหลัก" : "Orchestration"}</span>
            <p className="font-bold text-sm">Docker / Swarm / K8s</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-400 uppercase tracking-wider">{isTH ? "ความปลอดภัย" : "Security"}</span>
            <p className="font-bold text-sm">TLS / Signed RPC</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-400 uppercase tracking-wider">{isTH ? "สเตตัสการรัน" : "Uptime Target"}</span>
            <p className="font-bold text-sm">99.99% SLA</p>
          </div>
        </div>
      </div>

      {/* Render fetched README.md using server-side MDXRemote */}
      <article className="prose prose-gray dark:prose-invert max-w-none border-t border-gray-100 dark:border-gray-800 pt-10">
        <MDXContent content={readme} locale={locale} />
      </article>
    </main>
  )
}
