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
    "Delentia OS Source & Architecture — GitHub Hub",
    "ซอร์สโค้ดและสถาปัตยกรรม Delentia OS — คลังโค้ด GitHub",
    "Deep dive into Delentia OS repository structure, core logic files, and runtime initialization.",
    "เจาะลึกโครงสร้างคลังโค้ด Delentia OS ไฟล์ตรรกะระบบหลัก และการเริ่มต้นใช้งานรันไทม์",
    "/ecosystem/github/delentia-os"
  )
}

export default async function DelentiaOSGithubPage({ params }: LocalePageProps) {
  const { locale } = await params
  const isTH = locale === "th"
  const localePrefix = isTH ? "/th" : "/en"

  // Fetch readme dynamically
  const readme = await fetchGithubReadme("Delentia-OS", locale)

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
        <span className="text-gray-900 dark:text-gray-100 font-medium">Delentia-OS</span>
      </div>

      {/* Header Info */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 space-y-6 bg-white/50 dark:bg-black/10 backdrop-blur-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight">Delentia-OS</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                Public SDK
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              github.com/delentia-labs/delentia-os
            </p>
          </div>
          <a
            href="https://github.com/delentia-labs/delentia-os"
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
            <span className="text-xs text-gray-400 uppercase tracking-wider">{isTH ? "สัญญาอนุญาต" : "License"}</span>
            <p className="font-bold text-sm">Apache 2.0</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-400 uppercase tracking-wider">{isTH ? "เวอร์ชันล่าสุด" : "Latest Tag"}</span>
            <p className="font-bold text-sm">v2.2.6</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-400 uppercase tracking-wider">{isTH ? "ภาษาหลัก" : "Language"}</span>
            <p className="font-bold text-sm">Python / C++</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-400 uppercase tracking-wider">{isTH ? "การครอบคลุมเทส" : "Test Coverage"}</span>
            <p className="font-bold text-sm">94.8% (105k cases)</p>
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
