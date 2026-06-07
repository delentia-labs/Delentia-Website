import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import Link from "next/link"
import { fetchPyPIPackageInfo } from "@/lib/github-api"
import { getSoftwarePackageSchema } from "@/lib/schema"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getRequestLocale } from "@/lib/request-locale"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "PyPI SDK Quick Start — delentia-os",
    "เริ่มต้นการใช้งาน PyPI SDK — delentia-os",
    "Step-by-step guide to installing and running the Python SDK for Delentia OS.",
    "คู่มือและขั้นตอนการติดตั้งและเริ่มทำงานด้วย Python SDK สำหรับ Delentia OS",
    "/packages/pypi"
  )
}

export default async function PypiPackagePage() {
  const locale = await getRequestLocale()
  const isTH = locale === "th"
  const localePrefix = isTH ? "/th" : "/en"

  const pypiInfo = await fetchPyPIPackageInfo("delentia-os")

  const schema = getSoftwarePackageSchema({
    name: "delentia-os",
    description: "Python SDK for AI Engineers & Data Scientists (Python 3.10+)",
    version: pypiInfo.version,
    installCommand: "pip install delentia-os",
    repository: "https://github.com/delentia-labs/delentia-os",
    license: pypiInfo.license
  })

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="relative min-h-screen bg-background" id="main-content">
        <Navbar locale={locale} />
        <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">
          {/* Navigation Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href={`${localePrefix}/ecosystem`} className="hover:underline">
              {isTH ? "Ecosystem" : "Ecosystem"}
            </Link>
            <span>/</span>
            <Link href={`${localePrefix}/packages`} className="hover:underline">
              Packages
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">PyPI</span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h1 className="text-3xl font-extrabold tracking-tight">delentia-os</h1>
                <p className="text-gray-500 text-sm">
                  Python SDK for AI Engineers & Data Scientists (Python 3.10+)
                </p>
              </div>
              <div className="text-right text-xs font-mono text-gray-400 space-y-1">
                <p>v{pypiInfo.version}</p>
                <p>{pypiInfo.downloads.toLocaleString()} downloads/mo</p>
              </div>
            </div>
          </div>

          {/* Step 1: Install */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold">1. {isTH ? "การติดตั้งแพ็กเกจ" : "Installation"}</h2>
            <div className="bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-2xl p-4 font-mono text-sm">
              <p className="text-gray-400"># Install via pip</p>
              <p className="text-gray-800 dark:text-gray-200">pip install delentia-os</p>
            </div>
          </section>

          {/* Step 2: Initialize */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold">2. {isTH ? "ตัวอย่างการตั้งค่าใช้งาน" : "Code Example"}</h2>
            <p className="text-gray-500 text-sm">
              {isTH
                ? "เริ่มต้นลูปการประเมิน Intent และรันลอจิกตัวกรอง FDIA บนคอมพิวเตอร์ของคุณ:"
                : "Initialize intent processing and apply local FDIA evaluation logic on your workspace:"}
            </p>
            <div className="bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-2xl p-4 font-mono text-xs leading-relaxed text-gray-800 dark:text-gray-200 overflow-x-auto">
              <pre>{`from delentia_os.core.loop import JITNALoop
from delentia_os.core.fdia import FDIAScorer

# Initialize scoring engine
scorer = FDIAScorer()

# Run intent loop
with JITNALoop(config="rct_config.yaml") as loop:
    # Process intent
    response = loop.process(
        intent="Trigger backup container and sync keys",
        context={"actor": "admin"}
    )
    
    # Calculate score F = D^I * A
    score = scorer.score(intent=loop.intent, response=response)
    print(f"FDIA F-Score: {score.F:.3f} (Passed: {score.F >= 0.87})")`}</pre>
            </div>
          </section>

          {/* Deep Linking Section */}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-500">
            <div>
              {isTH ? "อ่านสเปกโปรโตคอลหลัก:" : "Explore protocol specifications:"}{" "}
              <Link href={`${localePrefix}/protocols`} className="text-blue-600 dark:text-blue-400 hover:underline">
                JITNA v3 / RCT-7
              </Link>
            </div>
            <div>
              {isTH ? "คลังโค้ดต้นทาง:" : "Repository source:"}{" "}
              <Link href={`${localePrefix}/ecosystem/github/delentia-os`} className="text-blue-600 dark:text-blue-400 hover:underline">
                Delentia-OS Repo
              </Link>
            </div>
          </div>
        </div>
        <Footer locale={locale} />
      </main>
    </>
  )
}
