import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import Link from "next/link"
import { fetchNPMPackageInfo } from "@/lib/github-api"
import { getSoftwarePackageSchema } from "@/lib/schema"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getRequestLocale } from "@/lib/request-locale"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "NPM SDK Quick Start — @delentia/delentia-os",
    "เริ่มต้นการใช้งาน NPM SDK — @delentia/delentia-os",
    "Step-by-step guide to installing and running the TypeScript SDK for Delentia OS.",
    "คู่มือและขั้นตอนการติดตั้งและเริ่มทำงานด้วย TypeScript SDK สำหรับ Delentia OS",
    "/packages/npm"
  )
}

export default async function NpmPackagePage() {
  const locale = await getRequestLocale()
  const isTH = locale === "th"
  const localePrefix = isTH ? "/th" : "/en"

  const npmInfo = await fetchNPMPackageInfo("@delentia/delentia-os")

  const schema = getSoftwarePackageSchema({
    name: "@delentia/delentia-os",
    description: "TypeScript SDK for JavaScript Runtimes (Node.js / Bun / Deno)",
    version: npmInfo.version,
    installCommand: "npm install @delentia/delentia-os",
    repository: "https://github.com/delentia-labs/delentia-os",
    license: npmInfo.license
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
            <span className="text-gray-900 dark:text-gray-100 font-medium">NPM</span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h1 className="text-3xl font-extrabold tracking-tight">@delentia/delentia-os</h1>
                <p className="text-gray-500 text-sm">
                  TypeScript SDK for JavaScript Runtimes (Node.js / Bun / Deno)
                </p>
              </div>
              <div className="text-right text-xs font-mono text-gray-400 space-y-1">
                <p>v{npmInfo.version}</p>
                <p>{npmInfo.downloads.toLocaleString()} downloads/mo</p>
              </div>
            </div>
          </div>

          {/* Step 1: Install */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold">1. {isTH ? "การติดตั้งแพ็กเกจ" : "Installation"}</h2>
            <div className="bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-2xl p-4 font-mono text-sm">
              <p className="text-gray-400"># Install via npm</p>
              <p className="text-gray-800 dark:text-gray-200">npm install @delentia/delentia-os</p>
            </div>
          </section>

          {/* Step 2: Initialize */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold">2. {isTH ? "ตัวอย่างการตั้งค่าใช้งาน" : "Code Example"}</h2>
            <p className="text-gray-500 text-sm">
              {isTH
                ? "สร้างการเชื่อมต่อกับ JITNA v3 routing engine เพื่อส่งและตรวจสอบ Intent:"
                : "Establish connection with JITNA v3 routing engine to submit and evaluate intents:"}
            </p>
            <div className="bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-2xl p-4 font-mono text-xs leading-relaxed text-gray-800 dark:text-gray-200 overflow-x-auto">
              <pre>{`import { JITNAClient, RCTState } from "@delentia/delentia-os";

// Initialize client
const client = new JITNAClient({
  apiKey: process.env.DELENTIA_API_KEY,
  endpoint: "https://api.delentia.com"
});

async function run() {
  // Dispatch Intent
  const result = await client.dispatch({
    intent: "Query PDPA consent status for user 8829",
    priority: "high"
  });

  console.log("JITNA Status:", result.status);
  console.log("Delta changes:", result.delta);
}

run();`}</pre>
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
