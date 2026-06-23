import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SITE_URL, SITE_TEST_COUNT, SITE_VERSION } from "@/lib/site-config"
import { 
  BookOpen, 
  FileText, 
  ArrowRight, 
  Layers, 
  CheckCircle,
  Shield, 
  Database, 
  Globe, 
  Terminal, 
  GitBranch,
  Key,
  Workflow
} from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Documentation — Delentia Labs Ecosystem 2026.03 Snapshot",
    "เอกสารประกอบ — Delentia Labs Ecosystem 2026.03 Snapshot",
    "RCT Ecosystem documentation — 10-Layer Architecture, JITNA Protocol RFC-001, 41 Algorithm APIs, RCTDB schema, and deployment guides for enterprise AI governance.",
    "เอกสาร RCT Ecosystem — สถาปัตยกรรม 10 ชั้น, JITNA Protocol RFC-001, 41 Algorithm APIs, RCTDB schema และคู่มือ Deploy สำหรับ AI Governance ระดับองค์กร",
    "/docs",
    ["RCT documentation", "AI architecture docs", "JITNA RFC", "API reference", "deployment guide"]
  )
}

export default async function DocsPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"

  const docsSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Delentia Labs Documentation 2026.03 Snapshot",
    "url": `${SITE_URL}${localePrefix}/docs`,
    "description": "Technical documentation for the RCT Constitutional AI Operating System — 10-Layer Architecture, JITNA Protocol RFC-001, 41 Algorithm APIs, RCTDB schema, and deployment guides for enterprise AI governance.",
    "publisher": { "@type": "Organization", "name": "Delentia Labs", "url": SITE_URL },
    "author": { "@type": "Person", "name": "Ittirit Saengow" }
  }

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}${localePrefix}` },
    { name: "Documentation", url: `${SITE_URL}${localePrefix}/docs` },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(docsSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <main className="min-h-screen bg-background">
        <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-background opacity-30" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 md:py-32">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm font-mono text-warm-amber uppercase tracking-wider">{isTh ? "เอกสารประกอบ" : "Documentation"}</p>
            <h1 className="text-foreground">{isTh ? "เอกสารประกอบ RCT Ecosystem" : "RCT Ecosystem Documentation"}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {isTh
                ? "เอกสารประกอบทางเทคนิคสำหรับ Constitutional AI Operating System — สถาปัตยกรรม, APIs, RFCs, คู่มือการ Deploy และข้อมูลสาธารณะ สอดคล้องกับภาพรวมวิศวกรรมเดือนมีนาคม 2026"
                : "Technical documentation for the Constitutional AI Operating System. Architecture, APIs, RFCs, deployment guides, and public-safe references aligned to the March 2026 engineering snapshot."}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-mono text-warm-amber bg-warm-amber/10 px-2 py-1 rounded">{SITE_VERSION}</span>
              <span className="text-xs font-mono text-muted-foreground">{SITE_TEST_COUNT} {isTh ? "ผลการทดสอบ backend ที่ผ่าน" : "verified backend tests"}</span>
              <span className="text-xs font-mono text-muted-foreground">•</span>
              <span className="text-xs font-mono text-muted-foreground">{isTh ? "สถาปัตยกรรม 10 ชั้น" : "10-Layer Architecture"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Terminal, title: isTh ? "เริ่มต้นใช้งาน" : "Quick Start", desc: isTh ? "เริ่มใช้งาน RCT Ecosystem ได้ภายในไม่กี่นาที" : "Get up and running with RCT Ecosystem in minutes", href: "#quickstart" },
            { icon: Layers, title: isTh ? "สถาปัตยกรรม" : "Architecture", desc: isTh ? "เข้าใจสถาปัตยกรรม 10 ชั้นอย่างลึกซึ้ง" : "10-Layer system architecture deep dive", href: "#architecture" },
            { icon: FileText, title: isTh ? "อ้างอิง API" : "API Reference", desc: isTh ? "OpenAPI 3.1.0 พร้อม 14 endpoints" : "OpenAPI 3.1.0 with 14 endpoints", href: "#api" },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="group bg-card border border-border rounded-lg p-6 hover:border-warm-amber/50 transition-all duration-300 space-y-3"
            >
              <item.icon className="w-6 h-6 text-warm-amber" />
              <h3 className="text-base font-semibold text-foreground group-hover:text-warm-amber transition">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Architecture Overview */}
      <section id="architecture" className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="space-y-10">
            <div className="space-y-3">
              <p className="text-sm font-mono text-warm-amber uppercase tracking-wider">{isTh ? "สถาปัตยกรรม" : "Architecture"}</p>
              <h2 className="text-foreground">{isTh ? "ภาพรวมสถาปัตยกรรม 10 ชั้น" : "10-Layer System Overview"}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { layer: "L10", name: "Enterprise Hardening", icon: Shield, desc: "Security, Validation, Performance, Resilience" },
                { layer: "L9", name: "Control Plane", icon: Key, desc: "JITNA Wire, ED25519 Signing, Replay Engine" },
                { layer: "L8", name: "Regional Language", icon: Globe, desc: "8 markets, compliance frameworks" },
                { layer: "L7", name: "Universal Adapters", icon: Workflow, desc: "13 adapters: Home Assistant, Terraform, n8n..." },
                { layer: "L6", name: "JITNA Protocol", icon: FileText, desc: "RFC-001 v2.0, AI-to-AI communication" },
                { layer: "L5", name: "SignedAI", icon: CheckCircle, desc: "Multi-LLM consensus, 0.3% hallucination" },
                { layer: "L4", name: "RCTDB v2.0", icon: Database, desc: "8D memory, Registry/Vault/Governance" },
                { layer: "L3", name: "41 Algorithms", icon: GitBranch, desc: "9 tiers: Foundation, Intelligence, Consciousness" },
                { layer: "L2", name: "OS Primitives", icon: Terminal, desc: "Process Model, Scheduler, IPC, 6 RFCs" },
                { layer: "L1", name: "7 Genome System", icon: Layers, desc: "Architect, ARTENT, JITNA, Codex, SignedAI, Vault, RCT-7" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-card border border-border rounded-lg p-4 hover:border-warm-amber/30 transition-colors">
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono text-warm-amber w-8">{item.layer}</span>
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kernel RFCs */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="space-y-10">
          <div className="space-y-3">
              <p className="text-sm font-mono text-warm-amber uppercase tracking-wider">{isTh ? "ข้อกำหนด" : "Specifications"}</p>
              <h2 className="text-foreground">{isTh ? "Kernel RFCs" : "Kernel RFCs"}</h2>
              <p className="text-muted-foreground">{isTh ? "ข้อกำหนดทางเทคนิคสำหรับ kernel ของ RCT Ecosystem" : "Formal specifications governing the RCT Ecosystem kernel."}</p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { rfc: "RFC-001", title: "JITNA Protocol v2.0", desc: "Intent specification, negotiation lifecycle, wire schema" },
              { rfc: "RFC-002", title: "Process Model", desc: "Process lifecycle, state management, resource allocation" },
              { rfc: "RFC-003", title: "Scheduler", desc: "Priority scheduling, preemption, fairness guarantees" },
              { rfc: "RFC-004", title: "IPC", desc: "Inter-process communication, message passing, shared memory" },
              { rfc: "RFC-005", title: "Syscall Interface", desc: "System call specification, error handling, permissions" },
              { rfc: "RFC-006", title: "Fault Isolation", desc: "Process isolation, error boundaries, recovery protocols" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-5 space-y-2 hover:border-warm-amber/30 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-warm-amber">{item.rfc}</span>
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section id="api" className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="space-y-10">
            <div className="space-y-3">
              <p className="text-sm font-mono text-warm-amber uppercase tracking-wider">{isTh ? "อ้างอิง API" : "API Reference"}</p>
              <h2 className="text-foreground">OpenAPI 3.1.0 — 14 Endpoints</h2>
              <p className="text-muted-foreground">{isTh ? "RESTful API พร้อม JWT RS256 และการอนุญาต RBAC" : "RESTful API with JWT RS256 authentication and RBAC authorization."}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs font-mono text-warm-amber uppercase">Method</th>
                    <th className="text-left py-3 px-4 text-xs font-mono text-warm-amber uppercase">Endpoint</th>
                    <th className="text-left py-3 px-4 text-xs font-mono text-warm-amber uppercase">{isTh ? "คำอธิบาย" : "Description"}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { method: "POST", endpoint: "/rctlabs/assistant/chat", desc: "Main chat with SignedAI consensus" },
                    { method: "POST", endpoint: "/rctlabs/assistant/chat/stream", desc: "SSE streaming for real-time tokens" },
                    { method: "GET", endpoint: "/health", desc: "Health check with model chain info" },
                    { method: "GET", endpoint: "/metrics", desc: "Analytics + cache statistics" },
                    { method: "GET", endpoint: "/algorithms", desc: "41 algorithm registry + tier breakdown" },
                    { method: "GET", endpoint: "/algorithms/status", desc: "Live service health check" },
                    { method: "GET", endpoint: "/models", desc: "LLM configuration + client stats" },
                    { method: "GET", endpoint: "/cache/stats", desc: "Cache hit/miss rates" },
                    { method: "POST", endpoint: "/cache/clear", desc: "Cache invalidation" },
                    { method: "GET", endpoint: "/context", desc: "Dynamic LLM context builder" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-warm-amber/5 transition-colors">
                      <td className="py-2.5 px-4">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                          row.method === "POST" ? "text-warning bg-warning/10" : "text-success bg-success/10"
                        }`}>
                          {row.method}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-mono text-xs text-foreground">{row.endpoint}</td>
                      <td className="py-2.5 px-4 text-xs text-muted-foreground">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="space-y-10">
          <div className="space-y-3">
              <p className="text-sm font-mono text-warm-amber uppercase tracking-wider">{isTh ? "การติดตั้ง" : "Deployment"}</p>
              <h2 className="text-foreground">{isTh ? "คู่มือโครงสร้างพื้นฐาน" : "Infrastructure Guide"}</h2>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Docker Compose", desc: "31+ services, health checks, 736-line config. Run with docker-compose up.", stat: "33 containers" },
              { title: "Kubernetes", desc: "57 resources: HPA, PDB, NetworkPolicy, ArgoCD GitOps, Backup CronJobs.", stat: "57 resources" },
              { title: "API Gateway", desc: "Bun + Hono TypeScript gateway: JWT RS256 auth, RBAC, rate limiting, 10 routes.", stat: "10 routes" },
              { title: "Monitoring", desc: "Prometheus scrape configs + Grafana dashboards: health, RPS, latency, errors.", stat: "Real-time" },
              { title: "Testing", desc: "Locust + k6 load testing, OWASP security, Chaos (9 scenarios), E2E (7 flows).", stat: `${SITE_TEST_COUNT} verified tests` },
              { title: "Documentation", desc: "C4 Architecture diagrams, Deployment Guide, Runbooks, OpenAPI spec.", stat: "14 endpoints" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <span className="text-xs font-mono text-warm-amber">{item.stat}</span>
                </div>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quickstart" className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="space-y-10">
            <div className="space-y-3">
              <p className="text-sm font-mono text-warm-amber uppercase tracking-wider">{isTh ? "เริ่มต้น" : "Getting Started"}</p>
              <h2 className="text-foreground">{isTh ? "เริ่มต้นใช้งาน" : "Quick Start"}</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">1. {isTh ? "ติดตั้งด้วย Docker" : "Docker Deployment"}</h3>
                <div className="bg-card border border-border rounded-lg p-4">
                  <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
{`# Clone the repository
git clone https://github.com/delentia-labs/delentia-os.git
cd delentia-os

# Start all services
docker-compose up -d

# Verify health
curl http://localhost:8003/health`}
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">2. {isTh ? "การใช้งาน SDK" : "SDK Usage"}</h3>
                <div className="bg-card border border-border rounded-lg p-4">
                  <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
{`import { RCT } from '@delentia/sdk';

const client = new RCT({
  apiKey: process.env.RCT_API_KEY
});

// JITNA Protocol: I/D/Delta/A/R/M
const result = await client.execute({
  I: "analyze",
  D: data,
  A: "summarize",
  verify: true  // SignedAI consensus
});`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="bg-card border border-border rounded-lg p-12 text-center space-y-6">
          <h2 className="text-foreground">{isTh ? "ต้องการความช่วยเหลือ?" : "Need Help?"}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {isTh
              ? "สำรวจสถาปัตยกรรมเต็ม ตรวจสอบ RFCs หรือติดต่อทีมงานของเราสำหรับการสนับสนุนระดับองค์กร"
              : "Explore the full architecture, review the RFCs, or contact our team for enterprise support."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="gap-2 bg-warm-amber hover:bg-warm-amber/90 text-white">
              <Link href={`${localePrefix}/platform`}>
                {isTh ? "ดูแพลตฟอร์ม" : "View Platform"} <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`${localePrefix}/contact`}>{isTh ? "ติดต่อฝ่ายสนับสนุน" : "Contact Support"}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}

