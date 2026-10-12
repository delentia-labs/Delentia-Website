import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CompressionChart } from "@/components/delta-trace/compression-chart"
import Link from "next/link"
import { SITE_URL } from "@/lib/site-config"
import {
  Database,
  Zap,
  RotateCcw,
  Terminal,
  ExternalLink,
  GitBranch,
  TrendingDown,
} from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Delta Engine Compression — RCT Platform",
    "Delta Engine Compression — RCT Platform",
    "Visualize how the Delta Engine stores only what changed. The Delta Engine stores only state changes — not full snapshots — enabling sub-millisecond rollback to any past agent state.",
    "ดู RCT Delta Engine บีบอัด Memory 74% จริง — เก็บเฉพาะ state changes ไม่ใช่ full snapshots ทำให้ rollback ทุก tick ได้ใน <1ms",
    "/docs/delta-trace",
    [
      "delta engine compression",
      "RCT memory optimization",
      "agent state rollback",
      "delta storage",
      "constitutional AI memory",
    ]
  )
}

const KEY_CLAIMS = [
  {
    icon: TrendingDown,
    color: "#10b981",
    value: "74%",
    label: "Memory Compression",
    labelTh: "บีบอัด Memory",
    desc: "Delta storage uses 26% of the memory that naive full-snapshot storage requires.",
    descTh: "Delta storage ใช้เพียง 26% ของ memory เมื่อเทียบกับการเก็บ full snapshot ทุก tick",
  },
  {
    icon: Zap,
    color: "#f59e0b",
    value: "<1ms",
    label: "State Reconstruction",
    labelTh: "สร้าง State ใหม่",
    desc: "Replay any agent to any past tick from the nearest checkpoint via delta chain.",
    descTh: "Replay agent ทุกตัวกลับไปทุก tick ที่ผ่านมาจาก checkpoint ที่ใกล้ที่สุด",
  },
  {
    icon: RotateCcw,
    color: "#3b82f6",
    value: "Any tick",
    label: "Rollback Depth",
    labelTh: "ความลึก Rollback",
    desc: "Checkpoints every 50 ticks guarantee O(1) lookup + O(k) replay for any k-tick range.",
    descTh: "Checkpoint ทุก 50 ticks รับประกัน O(1) lookup + O(k) replay สำหรับทุก k-tick range",
  },
  {
    icon: Database,
    color: "#8b5cf6",
    value: "JSONL",
    label: "Trace Format",
    labelTh: "รูปแบบ Trace",
    desc: "Every delta event logged as structured JSONL for audit, replay, and visualization.",
    descTh: "ทุก delta event บันทึกเป็น JSONL แบบ structured เพื่อ audit, replay, และ visualization",
  },
]

export default async function DeltaTracePage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}${localePrefix}` },
    { name: "Documentation", url: `${SITE_URL}${localePrefix}/docs` },
    { name: "Delta Engine Trace", url: `${SITE_URL}${localePrefix}/docs/delta-trace` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Navbar />

      <main className="min-h-screen bg-background pt-20 pb-16">
        {/* Hero */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          {/* Breadcrumb / Section label */}
          <div className="mb-4 flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span>Docs</span>
            <span className="opacity-40">/</span>
            <span className="text-warm-amber">Delta Engine</span>
          </div>
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-warm-amber border border-warm-amber/30 bg-warm-amber/8 px-3 py-1 rounded-full uppercase tracking-widest">
              Delta Engine
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 leading-tight">
            {isTh ? "Memory Compression Trace" : "Memory Compression Trace"}
          </h1>
          <p className="text-warm-amber font-mono text-xl font-semibold mb-4">
            Δ = store only what changed
          </p>
          <p className="text-muted-foreground text-lg max-w-2xl mb-8 leading-relaxed">
            {isTh
              ? "RCT Delta Engine เก็บเฉพาะ state ที่เปลี่ยนแปลงใน simulation แต่ละ tick แทนที่จะเก็บ full snapshot — ลดขนาดหน่วยความจำลง 74% และยังสามารถ replay กลับไปทุก tick ได้ใน <1ms"
              : "Instead of storing a full agent state snapshot every tick, the RCT Delta Engine records only what changed. This makes storage 39–90% smaller than full snapshots (measured in bytes) while retaining full rollback capability to any past tick."}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm" className="font-mono text-xs">
              <Link
                href="https://github.com/delentia-labs/delentia-os/blob/main/tools/generate_delta_trace.py"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Terminal className="w-3 h-3 mr-1.5" />
                generate_delta_trace.py
                <ExternalLink className="w-3 h-3 ml-1.5 opacity-60" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="font-mono text-xs">
              <Link
                href="https://github.com/delentia-labs/delentia-os/blob/main/core/delta_engine/memory_delta.py"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitBranch className="w-3 h-3 mr-1.5" />
                memory_delta.py
                <ExternalLink className="w-3 h-3 ml-1.5 opacity-60" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="font-mono text-xs">
              <Link href={`${localePrefix}/docs/live-trace`}>
                <Zap className="w-3 h-3 mr-1.5" />
                {isTh ? "ดู JITNA Trace" : "JITNA Live Trace"}
              </Link>
            </Button>
          </div>
        </section>

        {/* Key Claims */}
        <section className="px-6 pb-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {KEY_CLAIMS.map((claim) => {
              const Icon = claim.icon
              return (
                <div
                  key={claim.label}
                  className="bg-card border border-border rounded-xl p-5 hover:border-warm-amber/30 transition-colors duration-200"
                >
                  <Icon className="w-5 h-5 mb-3" style={{ color: claim.color }} />
                  <div
                    className="text-2xl font-bold font-mono mb-1"
                    style={{ color: claim.color }}
                  >
                    {claim.value}
                  </div>
                  <div className="text-foreground text-sm font-semibold mb-1.5">
                    {isTh ? claim.labelTh : claim.label}
                  </div>
                  <div className="text-muted-foreground text-xs leading-relaxed">
                    {isTh ? claim.descTh : claim.desc}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Interactive Chart */}
        <section className="px-6 pb-12 max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground mb-2">
              {isTh ? "การจำลอง: 60 Ticks, 3 Agents" : "Simulation: 60 Ticks, 3 Agents"}
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              {isTh
                ? "กราฟด้านล่างสร้างจาก generate_delta_trace.py — เลื่อน slider เพื่อ replay agent state กลับไปทุก tick ที่ผ่านมา"
                : "Charts below are generated from generate_delta_trace.py — drag the slider to replay any agent's full state at any past tick."}
            </p>
          </div>
          <CompressionChart />
        </section>

        {/* How it works */}
        <section className="px-6 pb-12 max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-foreground mb-6">
            {isTh ? "วิธีการทำงาน" : "How It Works"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Record Delta Only",
                titleTh: "บันทึกเฉพาะ Delta",
                body: "Each tick, only changed fields are stored (resources gained/lost, relationship shifts, action outcome). Unchanged fields are absent — zero bytes.",
                bodyTh: "แต่ละ tick เก็บเฉพาะ field ที่เปลี่ยนแปลง (resources, relationships, outcomes) — field ที่ไม่เปลี่ยนไม่ถูกเก็บเลย",
                code: 'record_delta(agent_id, tick,\n  resource_changes={"gold": +5})',
                color: "#10b981",
              },
              {
                step: "02",
                title: "Checkpoint Every 50 Ticks",
                titleTh: "Checkpoint ทุก 50 Ticks",
                body: "Full state snapshots are saved every 50 ticks as recovery anchors. This bounds worst-case replay cost to O(50) delta applications.",
                bodyTh: "Full state snapshot บันทึกทุก 50 ticks เพื่อเป็น anchor ของ recovery — จำกัด worst-case replay ไว้ที่ O(50)",
                code: "checkpoint_interval = 50\n# auto-saved by engine",
                color: "#3b82f6",
              },
              {
                step: "03",
                title: "Replay from Nearest Checkpoint",
                titleTh: "Replay จาก Checkpoint ที่ใกล้สุด",
                body: "To reconstruct state at tick T: find nearest checkpoint ≤ T, apply deltas forward. Result in < 1ms regardless of total history length.",
                bodyTh: "สร้าง state ที่ tick T: หา checkpoint ≤ T ที่ใกล้ที่สุด แล้ว apply deltas ไปข้างหน้า — เสร็จใน <1ms ไม่ว่า history จะยาวแค่ไหน",
                code: "state = engine.get_state_at_tick(\n  agent_id, tick=47)",
                color: "#8b5cf6",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-card border border-border rounded-xl p-5 hover:border-warm-amber/20 transition-colors duration-200"
              >
                <div
                  className="text-xs font-mono font-bold mb-3"
                  style={{ color: item.color, opacity: 0.8 }}
                >
                  STEP {item.step}
                </div>
                <h3 className="text-foreground font-semibold mb-2 text-base">
                  {isTh ? item.titleTh : item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {isTh ? item.bodyTh : item.body}
                </p>
                <pre className="bg-[#0f172a] border border-[#334155] rounded-lg p-3 text-xs font-mono overflow-x-auto">
                  <code style={{ color: item.color }}>{item.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* Run It Yourself */}
        <section className="px-6 pb-12 max-w-6xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-1">
              {isTh ? "รันด้วยตัวเอง" : "Run It Yourself"}
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              {isTh
                ? "Clone รีโพ แล้วรัน demo simulation ที่สร้าง trace จริงๆ"
                : "Clone the repo and run the demo simulation that generates a real trace."}
            </p>
            <pre className="bg-[#0f172a] border border-[#334155] rounded-lg p-4 text-xs font-mono overflow-x-auto text-[#10b981] leading-relaxed">
              {`# Clone and install
git clone https://github.com/delentia-labs/delentia-os.git
cd delentia-os
pip install -e .

# Run the 60-tick demo simulation
python tools/generate_delta_trace.py --demo

# Open the generated HTML trace
# tools/delta_trace_view.html

# Run with custom parameters
python tools/generate_delta_trace.py --demo --ticks 200 --output my_trace.html`}
            </pre>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

