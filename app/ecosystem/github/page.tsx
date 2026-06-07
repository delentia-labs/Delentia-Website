import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import Link from "next/link"

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
    "GitHub Repositories — Source & Logic Hub",
    "คลังเก็บโค้ด GitHub — แหล่งรวมซอร์สโค้ดและตรรกะระบบ",
    "Explore Delentia Labs source repositories, codebase architecture, and developer contribution guidelines.",
    "สำรวจคลังโค้ดซอร์สโค้ดของ Delentia Labs โครงสร้างสถาปัตยกรรม และแนวทางการมีส่วนร่วมสำหรับนักพัฒนา",
    "/ecosystem/github"
  )
}

export default async function GitHubHubPage({ params }: LocalePageProps) {
  const { locale } = await params
  const isTH = locale === "th"
  const localePrefix = isTH ? "/th" : "/en"

  const repos = [
    {
      id: "delentia-os",
      name: "Delentia OS",
      description: isTH
        ? "ระบบปฏิบัติการ AI แบบรัฐธรรมนูญตามกรอบกติกา JITNA v3 และ RCT v5 (Public SDK)"
        : "Constitutional AI Operating System runtime under JITNA v3 and RCT v5 protocols (Public SDK).",
      tags: ["Python", "SDK", "JITNA v3", "Kernel"],
      href: "/ecosystem/github/delentia-os",
    },
    {
      id: "infra",
      name: "Delentia Infra",
      description: isTH
        ? "ระบบประสาทและการจัดการ Deployment ของ Intent Loop แบบกระจายศูนย์"
        : "Orchestration and deployment infrastructure for federated JITNA Intent Loops.",
      tags: ["DevOps", "Docker", "Supabase", "Microservices"],
      href: "/ecosystem/github/infra",
    },
  ]

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          {isTH ? "Source & Logic Hub" : "Source & Logic Hub"}
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          {isTH
            ? "คลังซอร์สโค้ดหลักสำหรับระบบปฏิบัติการ Delentia OS และโครงสร้างพื้นฐานในการส่งมอบระบบ AI"
            : "Central repositories for the Delentia OS runtime and deployment infrastructure."}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 pt-6">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="border border-gray-200 dark:border-gray-800 rounded-3xl p-6 flex flex-col justify-between hover:border-gray-300 dark:hover:border-gray-700 transition space-y-6 bg-white/50 dark:bg-black/10 backdrop-blur-xs"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{repo.name}</h2>
                <span className="text-xs text-gray-400 font-mono">github.com</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{repo.description}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {repo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`${localePrefix}${repo.href}`}
              className="w-full text-center px-4 py-2.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl text-sm font-semibold hover:opacity-90 transition"
            >
              {isTH ? "ดูโค้ดและสถาปัตยกรรม" : "View Code & Architecture"}
            </Link>
          </div>
        ))}
      </div>

      {/* Contribution Note */}
      <div className="border border-dashed border-gray-200 dark:border-gray-800 rounded-3xl p-6 text-center space-y-4">
        <h3 className="text-lg font-semibold">{isTH ? "การมีส่วนร่วมกับชุมชน" : "Community Contributions"}</h3>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">
          {isTH
            ? "เราส่งเสริมการสร้างมาตรฐานกลางร่วมกัน สามารถส่ง Pull Requests หรือเปิด Issues เพื่อร่วมปรับปรุง JITNA v3/RCT v5"
            : "We promote open standard-setting. Submit Pull Requests or open Issues to improve JITNA v3 and RCT v5 components."}
        </p>
        <a
          href="https://github.com/delentia-labs"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          {isTH ? "ไปที่ GitHub Organization →" : "Go to GitHub Organization →"}
        </a>
      </div>
    </main>
  )
}
