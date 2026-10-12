import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"

// Live, honest status: each service is probed from the server when the page
// is rendered (cached for 60 s). There is no uptime history behind this page,
// so it shows the current check only and makes no availability claim.
export const revalidate = 60

const SERVICES = [
  { name: "Sovereign MCP (6 tools)", url: "https://delentia-sovereign-mcp.delentia.workers.dev/health" },
  { name: "FDIA gate", url: "https://delentia-fdia-mcp.delentia.workers.dev/health" },
  { name: "RCT-7", url: "https://delentia-rct7-mcp.delentia.workers.dev/health" },
  { name: "Delta compression", url: "https://delentia-delta-mcp.delentia.workers.dev/health" },
  { name: "JITNA", url: "https://delentia-jitna-mcp.delentia.workers.dev/health" },
]

type Probe = { name: string; ok: boolean; status: number | null; latencyMs: number | null; error?: string }

async function probe(name: string, url: string): Promise<Probe> {
  const started = Date.now()
  try {
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(5000) })
    return { name, ok: res.ok, status: res.status, latencyMs: Date.now() - started }
  } catch (err) {
    return { name, ok: false, status: null, latencyMs: null, error: err instanceof Error ? err.name : "error" }
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Status — Live Health of Delentia Services",
    "สถานะระบบ — สุขภาพของบริการ Delentia ตอนนี้",
    "Current health of the deployed Delentia MCP services, checked live. No uptime history or SLA is claimed.",
    "สุขภาพของบริการ Delentia MCP ที่ deploy อยู่ ตรวจแบบสด ไม่อ้างประวัติ uptime หรือ SLA",
    "/status",
    ["status", "health", "uptime", "MCP"]
  )
}

export default async function StatusPage() {
  const locale = await getRequestLocale()
  const isTh = locale === "th"
  const results = await Promise.all(SERVICES.map((s) => probe(s.name, s.url)))
  const checkedAt = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC"
  const allUp = results.every((r) => r.ok)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-3xl px-4 py-24 md:py-32">
        <h1 className="mb-3 text-4xl font-bold text-foreground">{isTh ? "สถานะระบบ" : "Status"}</h1>
        <p className={`mb-8 text-lg font-semibold ${allUp ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}>
          {allUp
            ? isTh ? "ทุกบริการตอบสนองปกติ" : "All services responding"
            : isTh ? "บางบริการไม่ตอบสนอง" : "Some services are not responding"}
        </p>

        <div className="mb-8 divide-y divide-border/70 rounded-2xl border border-border/70 bg-card/90">
          {results.map((r) => (
            <div key={r.name} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${r.ok ? "bg-green-500" : "bg-red-500"}`} />
                <span className="font-medium text-foreground">{r.name}</span>
              </div>
              <span className="font-mono text-sm text-muted-foreground">
                {r.ok ? `${r.latencyMs} ms` : r.status ? `HTTP ${r.status}` : r.error ?? "unreachable"}
              </span>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          {isTh
            ? `ตรวจล่าสุด ${checkedAt} จากเซิร์ฟเวอร์ของเว็บไซต์ (แคช 60 วินาที) หน้านี้แสดงเฉพาะผลตรวจ ณ ตอนนี้ ยังไม่มีประวัติ uptime และยังไม่มี SLA`
            : `Last checked ${checkedAt} from this website's server (cached for 60 seconds). This page shows the current check only: there is no uptime history yet and no SLA is offered.`}
        </p>
      </section>
      <Footer />
    </main>
  )
}
