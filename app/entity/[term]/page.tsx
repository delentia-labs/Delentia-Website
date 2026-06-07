import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getBreadcrumbSchema } from "@/lib/schema"
import { getRequestLocale } from "@/lib/request-locale"
import Link from "next/link"
import { ArrowRight, BookOpen, ExternalLink } from "lucide-react"

interface EntityPageProps {
  params: Promise<{ term: string }>
}

const entities: Record<string, {
  name: string
  type: string
  definition: string
  description: string
  relatedTerms: string[]
  relatedArticles: { title: string; href: string }[]
  sourceUrl?: string
}> = {
  "fdia-equation": {
    name: "FDIA Equation",
    type: "Mathematical Framework",
    definition: "F = (D^I) × A — a constitutional equation where Future output quality (F) is determined by Data quality (D) raised to the power of Intent clarity (I), multiplied by Architect authorization (A).",
    description: "The FDIA equation is the constitutional foundation of the Delentia OS Ecosystem. It governs every AI decision by quantifying data quality (D), amplifying it non-linearly through intent (I as exponent), and gating the final output through human authorization (A). When A=0, F=0 always — this is the mathematical kill switch that makes constitutional AI deterministic rather than probabilistic. Developed by Ittirit Saengow as part of the Delentia OS design philosophy.",
    relatedTerms: ["JITNA Protocol", "Constitutional AI", "SignedAI", "RCT-7 Process", "Architect Gate"],
    relatedArticles: [
      { title: "The FDIA Equation Explained", href: "/en/blog/fdia-equation-explained" },
      { title: "Constitutional AI vs RAG", href: "/en/compare/constitutional-ai-vs-rag" },
      { title: "Verification vs Prompt Engineering", href: "/en/compare/verification-vs-prompt-engineering" },
    ],
    sourceUrl: "https://delentia.com/en/blog/fdia-equation-explained",
  },
  "jitna-protocol": {
    name: "JITNA Protocol",
    type: "Open Communication Standard",
    definition: "Just In Time Nodal Assembly — an open agent-to-agent communication protocol (RFC-001 v2.0) that defines how AI agents discover, negotiate tasks, execute work, and verify results.",
    description: "JITNA (Just In Time Nodal Assembly) is the protocol layer of the Delentia OS — sometimes described as 'the HTTP of Agentic AI.' It defines a standardized packet format (JITNAPacket) with Ed25519 cryptographic signatures, a negotiation flow (PROPOSE → COUNTER → ACCEPT/REJECT), and a SHA-256 checkpoint replay chain. Unlike tool-calling APIs that treat AI as passive executors, JITNA treats agents as autonomous collaborators who can negotiate and refuse tasks. Defined in RFC-001 v2.0, a 52-page open specification.",
    relatedTerms: ["FDIA Equation", "SignedAI", "DelentiaDB", "HexaCore Consensus", "RFC-001 v2.0"],
    relatedArticles: [
      { title: "JITNA — Just In Time Nodal Assembly", href: "/en/blog/jitna-language-release" },
      { title: "SignedAI Multi-LLM Consensus", href: "/en/blog/signedai-multi-llm-consensus-explained" },
    ],
    sourceUrl: "https://delentia.com/en/blog/jitna-language-release",
  },
  "delentia-os": {
    name: "Delentia OS",
    type: "Constitutional AI Operating System",
    definition: "The world's first intent-centric Constitutional AI Operating System — featuring a 10-layer model, a microservice runtime snapshot, and absolute governance validation.",
    description: "Delentia OS is the core platform governing AI intent execution, persistent memory routing, and cryptographic verification loops. It replaces simple prompt workflows with structured operational layers, mapping every model query to verified data paths, consensus checks, and human authorization bounds. Designed by Ittirit Saengow to bring high predictability and trust to enterprise AI architectures.",
    relatedTerms: ["FDIA Equation", "JITNA Protocol", "SignedAI", "DelentiaDB", "HexaCore Consensus"],
    relatedArticles: [
      { title: "About Delentia Labs", href: "/en/about" },
      { title: "JITNA Protocol Specifications", href: "/en/technology/jitna" },
      { title: "SignedAI Multi-LLM Consensus", href: "/en/blog/signedai-multi-llm-consensus-explained" },
    ],
    sourceUrl: "https://delentia.com/en/about",
  },
  "delentia-slm": {
    name: "Delentia SLM",
    type: "Small Language Model",
    definition: "Fine-tuned reasoning model optimized for JITNA v3 intent execution, low-latency recall, and token compression under the Delentia OS runtime.",
    description: "Delentia SLMs are specialized, locally deployable 8B parameter models based on Llama 3.1, optimized for high JITNA task compliance and minimal hallucination rates. These models are designed to operate under strict resource constraints (running efficiently on local edge devices, mobile setups, or local Ollama instances) without sacrificing safety compliance.",
    relatedTerms: ["JITNA Protocol", "Delentia OS", "TOON Compliance", "Ollama Integration"],
    relatedArticles: [
      { title: "Explore AI Models Hub", href: "/en/models" },
      { title: "Delentia SLM v0.2.9 Benchmarks", href: "/en/models/delentia-slm-v0.2.9-toon" },
    ],
    sourceUrl: "https://delentia.com/en/models",
  },
  "delentia-db": {
    name: "DelentiaDB",
    type: "8-Dimensional Memory Database",
    definition: "An 8-dimensional persistent context and memory database designed specifically to route and recall AI agent intent histories.",
    description: "DelentiaDB stores and indexes agent execution histories across 8 dimensions (including timestamp, intent classification, JITNA signature, and provenance). By utilizing the Delta Engine to only write incremental state changes (deltas), it reduces average storage overhead by 74% and enables warm context recall in under 50 milliseconds.",
    relatedTerms: ["Memory Architecture", "Delta Engine", "Delentia OS", "JITNA Protocol"],
    relatedArticles: [
      { title: "DelentiaDB 8-Dimensional Memory Schema", href: "/en/blog/rctdb-8-dimensional-memory-schema" },
      { title: "Delta Engine 74% Compression", href: "/en/blog/delta-engine-74-percent-compression" },
    ],
    sourceUrl: "https://delentia.com/en/blog/rctdb-8-dimensional-memory-schema",
  },
  "hexacore-consensus": {
    name: "HexaCore Consensus",
    type: "Multi-LLM Validation Protocol",
    definition: "A 6-node consensus protocol that routes and scores AI outputs across multiple models to prevent hallucinations and enforce strict safety standards.",
    description: "HexaCore Consensus uses multiple independent LLM judges (including local SLMs and external APIs) to evaluate generated responses across 8 dimensions (accuracy, relevance, coherence, safety, completeness, timeliness, originality, and intent-alignment). An output is only cryptographically signed and released once it crosses a strict consensus score.",
    relatedTerms: ["SignedAI", "Governance Layer", "FDIA Equation", "Delentia OS"],
    relatedArticles: [
      { title: "SignedAI Multi-LLM Consensus", href: "/en/blog/signedai-multi-llm-consensus-explained" },
      { title: "Constitutional AI vs RAG", href: "/en/compare/constitutional-ai-vs-rag" },
    ],
    sourceUrl: "https://delentia.com/en/blog/signedai-multi-llm-consensus-explained",
  },
  "rct-kernel": {
    name: "RCT Kernel",
    type: "AI Operating System Core",
    definition: "The central orchestration module of the Delentia OS Ecosystem — coordinates the FDIA gating, JITNA protocol, HexaCore routing, SignedAI consensus, and DelentiaDB memory across the broader runtime service graph.",
    description: "The RCT Kernel is the core runtime of the Delentia OS Ecosystem. It implements the 7-State Intent Loop Pipeline (RECEIVED → VALIDATED → MEMORY_CHECK → COMPUTING → VERIFYING → COMMITTING → COMPLETED) and coordinates all subsystems. Built on constitutional constraints — every component of the kernel has defined invariants that cannot be violated. Implemented in Python (`core/kernel/fdia.py`) with 41 algorithms across Tier 1–9 complexity levels.",
    relatedTerms: ["FDIA Equation", "Intent Loop Engine", "Delta Engine", "DelentiaDB", "HexaCore Consensus"],
    relatedArticles: [
      { title: "The RCT-7 Process Explained", href: "/en/blog/rct-7-process-explained" },
      { title: "Enterprise Snapshot Testing Methodology", href: "/en/blog/rct-ecosystem-4849-tests-methodology" },
      { title: "Delta Engine 74% Compression", href: "/en/blog/delta-engine-74-percent-compression" },
    ],
    sourceUrl: "https://delentia.com/en/about",
  },
  "intent-profiles": {
    name: "Intent Profiles",
    type: "AI Classification System",
    definition: "Structured representations of user intent derived from semantic analysis of queries — used by the FDIA equation's Intent variable (I) to determine the required data quality and authorization level for a given request.",
    description: "Intent Profiles are generated by the Intent Loop Engine during the VALIDATED state of the 7-State Pipeline. Each profile includes: domain classification (medical, legal, financial, casual, creative), specificity score, criticality assessment, and an Intent value (I) on a scale of 0.0–2.0. High-criticality intents (I→2) require proportionally higher data quality (D) and stricter authorization gates (A). Intent Profiles enable the FDIA system to treat a medical diagnosis query fundamentally differently from a casual chat query — using the same mathematical framework.",
    relatedTerms: ["FDIA Equation", "RCT Kernel", "JITNA Protocol", "Constitutional AI"],
    relatedArticles: [
      { title: "The FDIA Equation Explained", href: "/en/blog/fdia-equation-explained" },
      { title: "Understanding Intent Operations", href: "/en/blog/understanding-intent-operations" },
    ],
    sourceUrl: "https://delentia.com/en/blog/fdia-equation-explained",
  },
  "governance-layer": {
    name: "Governance Layer",
    type: "Constitutional AI Component",
    definition: "The set of constitutional constraints, authorization policies, and audit trail systems that collectively ensure every AI output in the Delentia OS Ecosystem is authorized, traceable, and compliant.",
    description: "The Governance Layer of the Delentia OS Ecosystem encompasses: the FDIA Architect gate (A variable), SignedAI consensus tiers (S/4/6/8), DelentiaDB provenance tracking (dimension 8: provenance), JITNA jurisdiction zone enforcement, and the PDPA-compliant right-to-erasure mechanism (UUID tombstone pattern). Together, these components ensure that every AI action in the system has a documented lawful basis, a verifiable authorization chain, and a complete audit trail. The Governance Layer is what converts Delentia OS from a capable AI platform into a constitutionally compliant enterprise infrastructure.",
    relatedTerms: ["FDIA Equation", "SignedAI", "DelentiaDB", "PDPA Compliance", "Architect Gate"],
    relatedArticles: [
      { title: "PDPA AI Compliance Thailand", href: "/en/blog/pdpa-ai-compliance-thailand" },
      { title: "Benchmark Summary", href: "/en/benchmark-summary" },
      { title: "Editorial Policy", href: "/en/editorial-policy" },
    ],
    sourceUrl: "https://delentia.com/en/benchmark-summary",
  },
  "memory-architecture": {
    name: "Memory Architecture",
    type: "AI Infrastructure Component",
    definition: "The three-tier persistent memory system of the Delentia OS Ecosystem — comprising DelentiaDB (8-dimensional schema), the Delta Engine (74% compression via delta-only storage), and a Hot/Warm/Cold zone structure enabling sub-50ms warm recall.",
    description: "Delentia OS's memory architecture is composed of three interconnected systems: (1) DelentiaDB v2.0 — an 8-dimensional universal schema that stores every AI decision with full provenance; (2) the Delta Engine — which compresses stored state by 74% by storing only incremental changes (deltas) rather than full state snapshots; and (3) the three-zone storage system (Hot: <1ms, Warm: 1–5ms, Cold: 10ms+) that intelligently places records based on access frequency. This architecture enables warm recall in <50ms for repeated queries, reducing AI inference cost to near-zero for stable patterns over time.",
    relatedTerms: ["DelentiaDB", "Delta Engine", "JITNA Protocol", "FDIA Equation"],
    relatedArticles: [
      { title: "DelentiaDB 8-Dimensional Memory Schema", href: "/en/blog/rctdb-8-dimensional-memory-schema" },
      { title: "Delta Engine 74% Compression", href: "/en/blog/delta-engine-74-percent-compression" },
    ],
    sourceUrl: "https://delentia.com/en/blog/rctdb-8-dimensional-memory-schema",
  },
}

export async function generateStaticParams() {
  return Object.keys(entities).map((term) => ({ term }))
}

export async function generateMetadata({ params }: EntityPageProps): Promise<Metadata> {
  const { term } = await params
  const entity = entities[term]
  if (!entity) return { title: "Entity Not Found" }

  return {
    title: `${entity.name} — Defined`,
    description: entity.definition,
    alternates: { canonical: `https://delentia.com/en/entity/${term}` },
  }
}

export default async function EntityPage({ params }: EntityPageProps) {
  const { term } = await params
  const entity = entities[term]
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"

  if (!entity) notFound()

  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": entity.name,
    "description": entity.definition,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "Delentia Labs Glossary",
      "url": `https://delentia.com${localePrefix}/glossary`,
    },
    "url": `https://delentia.com${localePrefix}/entity/${term}`,
  }

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Glossary", url: `https://delentia.com${localePrefix}/glossary` },
    { name: entity.name, url: `https://delentia.com${localePrefix}/entity/${term}` },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <main className="min-h-screen bg-background">
        <Navbar />

        <article className="mx-auto max-w-4xl px-4 py-24">
          {/* Breadcrumb */}
          <nav className="text-sm text-warm-dim mb-8 flex items-center gap-2">
            <Link href={`${localePrefix}/glossary`} className="hover:text-warm-amber transition">Glossary</Link>
            <span>/</span>
            <span className="text-warm-light-gray">{entity.name}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-warm-amber/30 bg-warm-amber/8 text-warm-amber text-xs font-semibold mb-4">
              <BookOpen className="w-3.5 h-3.5" /> {entity.type}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-warm-light-gray mb-4">{entity.name}</h1>

            {/* Definition box */}
            <div className="rounded-xl border-l-4 border-warm-amber bg-warm-amber/5 px-6 py-4">
              <p className="text-warm-light-gray leading-relaxed font-medium">{entity.definition}</p>
            </div>
          </header>

          {/* Description */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-warm-light-gray mb-4">Detailed Explanation</h2>
            <p className="text-warm-dim leading-relaxed text-base">{entity.description}</p>
          </section>

          {/* Related terms */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-warm-light-gray mb-4">Related Concepts</h2>
            <div className="flex flex-wrap gap-2">
              {entity.relatedTerms.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-warm-dim text-sm hover:border-warm-amber/30 hover:text-warm-amber transition cursor-default">
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Related articles */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-warm-light-gray mb-4">Related Articles</h2>
            <div className="space-y-3">
              {entity.relatedArticles.map(({ title, href }) => {
                // Replace hardcoded /en/ prefix with current locale prefix
                const localizedHref = href.replace(/^\/en\//, `${localePrefix}/`)
                return (
                  <Link key={href} href={localizedHref} className="flex items-center justify-between p-4 rounded-xl border border-white/8 hover:border-warm-amber/30 hover:bg-warm-amber/5 transition group">
                    <span className="text-warm-dim group-hover:text-warm-light-gray text-sm transition">{title}</span>
                    <ArrowRight className="w-4 h-4 text-warm-dim group-hover:text-warm-amber transition" />
                  </Link>
                )
              })}
            </div>
          </section>

          {/* Source */}
          {entity.sourceUrl && (
            <div className="rounded-xl border border-white/8 bg-white/3 p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-warm-dim font-semibold uppercase mb-0.5">Primary Source</p>
                <p className="text-sm text-warm-light-gray">Delentia Labs official documentation</p>
              </div>
              <a href={entity.sourceUrl} className="flex items-center gap-1.5 text-warm-amber text-sm hover:underline">
                View source <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </article>

        <Footer />
      </main>
    </>
  )
}
