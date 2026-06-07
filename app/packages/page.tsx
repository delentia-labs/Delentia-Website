import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import Link from "next/link"
import { fetchNPMPackageInfo, fetchPyPIPackageInfo } from "@/lib/github-api"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getRequestLocale } from "@/lib/request-locale"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Packages Hub — PyPI & NPM SDKs",
    "แหล่งรวมแพ็กเกจนักพัฒนา — คลัง SDK บน PyPI และ NPM",
    "Install the Delentia OS SDK to build governed AI integrations, intent memory loops, and signed RPC processes.",
    "ติดตั้ง Delentia OS SDK เพื่อรัน Intent Memory Loops ระบบ AI ควบคุมความปลอดภัย และการทำเซ็นหลักฐานข้อมูล",
    "/packages"
  )
}

export default async function PackagesHubPage() {
  const locale = await getRequestLocale()
  const isTH = locale === "th"
  const localePrefix = isTH ? "/th" : "/en"

  const [npmInfo, pypiInfo] = await Promise.all([
    fetchNPMPackageInfo("@delentia/delentia-os"),
    fetchPyPIPackageInfo("delentia-os")
  ])

  const packages = [
    {
      id: "pypi",
      name: "delentia-os (PyPI)",
      command: "pip install delentia-os",
      version: pypiInfo.version,
      downloads: pypiInfo.downloads,
      desc: isTH
        ? "SDK สำหรับภาษา Python ในการเขียนโปรโตคอล JITNA v3, การประเมินคะแนน FDIA และระบบหน่วยความจำ DelentiaDB"
        : "Python SDK to initialize JITNA v3 protocols, compute FDIA scores, and interact with DelentiaDB memory.",
      tags: ["Python 3.10+", "PyPI", "AI Engineers", "Data Science"],
      href: "/packages/pypi",
    },
    {
      id: "npm",
      name: "@delentia/delentia-os (NPM)",
      command: "npm install @delentia/delentia-os",
      version: npmInfo.version,
      downloads: npmInfo.downloads,
      desc: isTH
        ? "SDK สำหรับ Node.js/TypeScript ในการสร้าง JITNA v3 Channel Adapters (LINE, Slack, Discord)"
        : "TypeScript SDK designed for JS runtimes to build webhook channel adapters and connect intents.",
      tags: ["Node.js 18+", "TypeScript", "NPM", "Web Developers"],
      href: "/packages/npm",
    },
  ]

  return (
    <main className="relative min-h-screen bg-background" id="main-content">
      <Navbar locale={locale} />
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            {isTH ? "Packages Hub" : "Packages Hub"}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {isTH
              ? "ดาวน์โหลดและเริ่มใช้งาน Delentia OS SDK สำหรับคอมพิวเตอร์และเซิร์ฟเวอร์ของคุณได้ทันที"
              : "Download and deploy the Delentia OS SDK on your local machine or server."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="border border-gray-200 dark:border-gray-800 rounded-3xl p-6 flex flex-col justify-between hover:border-gray-300 dark:hover:border-gray-700 transition space-y-6 bg-white/50 dark:bg-black/10 backdrop-blur-xs"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold">{pkg.name}</h2>
                    <div className="flex gap-2 text-2xs text-gray-400 font-mono">
                      <span>v{pkg.version}</span>
                      <span>•</span>
                      <span>{pkg.downloads.toLocaleString()} {isTH ? "ดาวน์โหลด/เดือน" : "downloads/mo"}</span>
                    </div>
                  </div>
                  <span className="text-xs uppercase text-gray-400 font-mono font-semibold">{pkg.id}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{pkg.desc}</p>
                
                {/* Copy Command Box */}
                <div className="bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-xl p-3 flex items-center justify-between font-mono text-xs text-gray-800 dark:text-gray-200">
                  <span>{pkg.command}</span>
                  <span className="text-[10px] text-gray-400">copy</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {pkg.tags.map((tag) => (
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
                href={`${localePrefix}${pkg.href}`}
                className="w-full text-center px-4 py-2.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl text-sm font-semibold hover:opacity-90 transition"
              >
                {isTH ? "อ่านคู่มือ Quick Start" : "View Quick Start Guide"}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer locale={locale} />
    </main>
  )
}
