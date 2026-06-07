import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getRequestLocale } from "@/lib/request-locale"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Downloads — Delentia OS GUI & SDK",
    "ดาวน์โหลด — Delentia OS GUI & SDK",
    "Download Delentia Desk GUI installer, TypeScript SDK, and CLI tools for Windows, macOS, and Linux.",
    "ดาวน์โหลด Delentia Desk GUI, TypeScript SDK และ CLI สำหรับ Windows, macOS และ Linux",
    "/downloads"
  )
}

// ── Release data (static — updated each release via revalidate) ───────────────

const RELEASES = [
  {
    version: "v1.0.1",
    date: "June 2026",
    stable: true,
    assets: [
      { label: "Windows Installer (.exe)", filename: "delentia-desk_1.0.1_x64-setup.exe", platform: "windows" },
      { label: "macOS Apple Silicon (.dmg)", filename: "delentia-desk_1.0.1_aarch64.dmg", platform: "mac" },
      { label: "macOS Intel (.dmg)", filename: "delentia-desk_1.0.1_x64.dmg", platform: "mac" },
      { label: "Linux AppImage (.AppImage)", filename: "delentia-desk_1.0.1_amd64.AppImage", platform: "linux" },
      { label: "Linux Debian (.deb)", filename: "delentia-desk_1.0.1_amd64.deb", platform: "linux" },
    ],
    changelog: [
      "Version sync 1.0.1 across Tauri + Cargo",
      "4 new navigation pages: Ecosystem, Models, Workflow, Monitor",
      "Ollama SLM manager with model pull & inference testing",
      "Helix-TTD system health monitor",
      "JITNA Visual Workflow Builder (Phase 2 skeleton)",
    ],
  },
]

const SDK_PACKAGES = [
  {
    name: "@delentia/delentia-os",
    description: "TypeScript edge SDK — JITNA v3 intent execution, FDIA scoring, WebSocket streaming",
    install: "npm install @delentia/delentia-os",
    docs: "https://docs.delentia.com/sdk/delentia-os",
    badge: "npm",
  },
  {
    name: "fdia-wasm",
    description: "FDIA equation WebAssembly module — runs in browser or Node.js",
    install: "npm install fdia-wasm",
    docs: "https://docs.delentia.com/sdk/fdia-wasm",
    badge: "npm",
  },
  {
    name: "delentia-os",
    description: "Python SDK — JITNA v3, Delta Engine compression, SignedAI HexaCore client",
    install: "pip install delentia-os",
    docs: "https://docs.delentia.com/sdk/python",
    badge: "pypi",
  },
]

const PLATFORM_ICONS: Record<string, string> = {
  windows: "🪟",
  mac: "🍎",
  linux: "🐧",
}

const RELEASE_BASE = "https://github.com/delentia-labs/delentia-gui/releases/download"

export default async function DownloadsPage() {
  const locale = await getRequestLocale()
  const isTH = locale === "th"

  return (
    <main className="relative min-h-screen bg-background" id="main-content">
      <Navbar locale={locale} />
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">
            {isTH ? "ดาวน์โหลด" : "Downloads"}
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            {isTH
              ? "Delentia Desk GUI, SDK TypeScript, และ CLI ครบทุก platform"
              : "Delentia Desk GUI, TypeScript SDK, Python SDK, and CLI — all platforms."}
          </p>
        </div>

      {/* GUI Releases */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          {isTH ? "Delentia Desk GUI" : "Delentia Desk GUI"}
        </h2>
        {RELEASES.map((rel) => (
          <div
            key={rel.version}
            className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold font-mono">{rel.version}</span>
              {rel.stable && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700/40">
                  Latest Stable
                </span>
              )}
              <span className="text-sm text-gray-500 ml-auto">{rel.date}</span>
            </div>

            <ul className="text-sm text-gray-500 space-y-1 list-disc list-inside">
              {rel.changelog.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {rel.assets.map((asset) => (
                <a
                  key={asset.filename}
                  href={`${RELEASE_BASE}/${rel.version}/${asset.filename}`}
                  className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition group"
                >
                  <span className="text-xl">{PLATFORM_ICONS[asset.platform]}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition truncate">
                      {asset.label}
                    </p>
                    <p className="text-[11px] text-gray-400 font-mono truncate">{asset.filename}</p>
                  </div>
                  <span className="ml-auto text-gray-400 group-hover:text-blue-500">↓</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* SDK packages */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          {isTH ? "SDK และ Package" : "SDK Packages"}
        </h2>
        <div className="space-y-3">
          {SDK_PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1 space-y-1">
                <p className="font-semibold font-mono text-sm">{pkg.name}</p>
                <p className="text-sm text-gray-500">{pkg.description}</p>
                <code className="block text-xs font-mono bg-gray-100 dark:bg-gray-900 px-3 py-1.5 rounded-lg text-gray-700 dark:text-gray-300">
                  {pkg.install}
                </code>
              </div>
              <a
                href={pkg.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition text-gray-600 dark:text-gray-400"
              >
                Docs →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CLI */}
      <section className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-3">
        <h2 className="text-xl font-semibold">CLI</h2>
        <p className="text-sm text-gray-500">
          {isTH
            ? "ติดตั้ง CLI สำหรับรัน JITNA workflow, deploy adapter, และจัดการ Delentia OS"
            : "Install the CLI to run JITNA workflows, deploy adapters, and manage Delentia OS."}
        </p>
        <code className="block text-sm font-mono bg-gray-100 dark:bg-gray-900 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300">
          pip install delentia-os[cli]
        </code>
        <p className="text-xs text-gray-400">
          {isTH
            ? "รองรับ Python 3.11+ บน Windows, macOS, Linux"
            : "Requires Python 3.11+ on Windows, macOS, Linux."}
        </p>
      </section>
      </div>
      <Footer locale={locale} />
    </main>
  )
}
