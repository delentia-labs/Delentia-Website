import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { getAuthorProfileById, getAuthorProfileByName } from "@/lib/authors"
import { SITE_ENTERPRISE_EVIDENCE_LABEL, SITE_HALLUCINATION_RATE, SITE_PUBLIC_SDK_COVERAGE, SITE_PUBLIC_SDK_EVIDENCE_LABEL, SITE_PUBLIC_SDK_TESTS, SITE_PUBLIC_SDK_VERSION, SITE_TEST_COUNT } from "@/lib/site-config"

const postsDirectory = path.join(process.cwd(), "content/blog")

export type BlogLocale = "en" | "th"
export type BlogCategory = "release" | "research" | "philosophy" | "news" | "tutorial" | "case_study"

// --- Metric taxonomy types (SET A Day 2 — 16 Apr 2026) ---
// Each blog article must have exactly 3 metric cards in order:
//   1. "outcome"    — measurable business/quality result visible to buyers
//   2. "mechanism"  — the architectural mechanism that produces the outcome
//   3. "operational"— the runtime/ops signal that engineers monitor in production
//
// Evidence quality rules:
//   "source"            — tied to a cited reference (URL, RFC, or internal doc)
//   "benchmark-assumption" — stated baseline/assumption with clear context; must include detail
//
// Validation enforced by validateMetricSet() below.
export type BlogMetricType = "outcome" | "mechanism" | "operational"
export type BlogMetricEvidenceType = "source" | "benchmark-assumption"

export interface BlogHeroMetric {
  value: string
  label: string
  detail?: string
  type: BlogMetricType
  evidenceType: BlogMetricEvidenceType
  evidenceRef?: string   // URL, RFC number, or internal doc id
  evidenceNote?: string  // limitation or interpretation caveat
  verifiedAt?: string    // ISO date of last verification
}

/**
 * Validates a set of 3 metrics against the SET A Day 2 quality rules:
 * 1. Exactly 3 metrics
 * 2. One of each type: outcome, mechanism, operational
 * 3. All have evidenceType set
 * 4. benchmark-assumption must have a non-empty detail
 * Returns empty array when valid; array of error strings when invalid.
 */
export function validateMetricSet(slug: string, metrics: BlogHeroMetric[]): string[] {
  const errors: string[] = []
  if (metrics.length !== 3) {
    errors.push(`[${slug}] expected 3 metrics, got ${metrics.length}`)
  }
  const types = metrics.map((m) => m.type)
  for (const t of ["outcome", "mechanism", "operational"] as BlogMetricType[]) {
    if (!types.includes(t)) errors.push(`[${slug}] missing type: ${t}`)
  }
  for (const m of metrics) {
    if (!m.evidenceType) errors.push(`[${slug}] metric "${m.label}" missing evidenceType`)
    if (m.evidenceType === "benchmark-assumption" && !m.detail) {
      errors.push(`[${slug}] metric "${m.label}" is benchmark-assumption but has no detail`)
    }
  }
  return errors
}

const BLOG_VARIANT_SUFFIX = ".th.mdx"
const BLOG_CATEGORY_LABELS: Record<BlogCategory, Record<BlogLocale, string>> = {
  release: { en: "Release", th: "รีลีส" },
  research: { en: "Research", th: "งานวิจัย" },
  philosophy: { en: "Philosophy", th: "ปรัชญา" },
  news: { en: "News", th: "ข่าวสาร" },
  tutorial: { en: "Tutorial", th: "คู่มือ" },
  case_study: { en: "Case Study", th: "กรณีศึกษา" },
}

const BLOG_PUBLICATION_TYPES: Record<BlogCategory, Record<BlogLocale, string>> = {
  release: { en: "Platform Release Note", th: "บันทึกการออกรุ่นแพลตฟอร์ม" },
  research: { en: "Enterprise Research Briefing", th: "สรุปวิจัยระดับองค์กร" },
  philosophy: { en: "Executive Thinking Note", th: "บันทึกแนวคิดเชิงบริหาร" },
  news: { en: "Enterprise Market Update", th: "อัปเดตข่าวสารระดับองค์กร" },
  tutorial: { en: "Applied Implementation Guide", th: "คู่มือการนำไปใช้จริง" },
  case_study: { en: "Case Study Briefing", th: "บทสรุปกรณีศึกษา" },
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOG_HERO_METRICS — SET A Day 2 (16 Apr 2026)
// Template per article: [Outcome, Mechanism, Operational Signal]
// Evidence types: "source" (traceable URL/RFC/doc) | "benchmark-assumption" (stated baseline)
// ─────────────────────────────────────────────────────────────────────────────
const BLOG_HERO_METRICS: Partial<Record<string, BlogHeroMetric[]>> = {
  // ── GOVERNANCE / HALLUCINATION CLUSTER ─────────────────────────────────────
  "constitutional-ai-vs-rag-comparison": [
    {
      value: "0.3%", label: "Hallucination rate",
      detail: "RCT dual-layer: RAG + constitutional controls in production",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
    {
      value: "Dual-layer", label: "Recommended architecture",
      detail: "Retrieval-Augmented Generation plus constitutional verification layer",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/methodology", verifiedAt: "2026-04-15",
    },
    {
      value: "<50ms", label: "Warm recall path",
      detail: "Delta Engine semantic cache hit (cosine ≥0.95)",
      type: "operational", evidenceType: "benchmark-assumption",
      evidenceNote: "Measured on warm path only; cold-start varies 150–400ms", verifiedAt: "2026-04-15",
    },
  ],
  "enterprise-ai-governance-playbook-2026": [
    {
      value: "3 frameworks", label: "Compliance coverage",
      detail: "NIST AI RMF + OECD AI Principles + EU AI Act Annex III",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://www.nist.gov/system/files/documents/2023/01/26/AI_RMF_1.0.pdf", verifiedAt: "2026-04-15",
    },
    {
      value: "5 layers", label: "Governance depth",
      detail: "Policy → Orchestration → Verification → Audit → Runtime enforcement",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/architecture", verifiedAt: "2026-04-15",
    },
    {
      value: SITE_HALLUCINATION_RATE, label: "Benchmark hallucination scope",
      detail: "Controlled-workload benchmark framing, not a blanket production guarantee",
      type: "operational", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
  ],
  "how-to-reduce-ai-hallucination": [
    {
      value: "0.92", label: "FDIA accuracy score",
      detail: "RCT measured vs ~0.65 industry baseline (Stanford HAI 2023)",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://hai.stanford.edu/", verifiedAt: "2026-04-15",
    },
    {
      value: "7 stages", label: "Verification pipeline",
      detail: "FDIA-governed: Input → Classify → Retrieve → Verify → Constrain → Sign → Output",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/protocols/fdia-equation", verifiedAt: "2026-04-15",
    },
    {
      value: SITE_HALLUCINATION_RATE, label: "Benchmark hallucination scope",
      detail: "Controlled benchmark framing disclosed with methodology notes",
      type: "operational", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
  ],
  "verification-vs-prompt-engineering": [
    {
      value: "Deterministic", label: "Constitutional AI model",
      detail: "Policy-enforced rules fire every inference, not probabilistically",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback", verifiedAt: "2026-04-15",
    },
    {
      value: "100%", label: "Policy enforcement rate",
      detail: "Constitutional constraints applied to every output, no bypass path",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/methodology", verifiedAt: "2026-04-15",
    },
    {
      value: SITE_HALLUCINATION_RATE, label: "Benchmark hallucination scope",
      detail: "Public benchmark framing with caveats; deployment outcomes vary by workload",
      type: "operational", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
  ],
  "designing-low-hallucination-ai-systems": [
    {
      value: "0.3%", label: "Target hallucination rate",
      detail: "Systems-design approach: Retrieve + Verify + Sign architecture",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
    {
      value: "3 defense layers", label: "Architecture pattern",
      detail: "Retrieval accuracy → Constitutional verification → Ed25519 signing",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/architecture", verifiedAt: "2026-04-15",
    },
    {
      value: "<50ms", label: "Overhead budget",
      detail: "Constitutional AI latency overhead — warm path, measured in-process",
      type: "operational", evidenceType: "benchmark-assumption",
      evidenceNote: "Target budget; actual overhead depends on policy complexity", verifiedAt: "2026-04-15",
    },
  ],

  // ── FDIA / EQUATION CLUSTER ─────────────────────────────────────────────────
  "fdia-equation-explained": [
    {
      value: "0.92", label: "Measured FDIA accuracy",
      detail: "F=(D^I)×A framework — vs ~0.65 industry baseline (Stanford HAI 2023)",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://hai.stanford.edu/", verifiedAt: "2026-04-15",
    },
    {
      value: "F=(D^I)×A", label: "Constitutional equation",
      detail: "Intent acts as exponent on Data — amplifies quality, not just scale",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/protocols/fdia-equation", verifiedAt: "2026-04-15",
    },
    {
      value: "7 states", label: "Intent loop pipeline",
      detail: "Governed flow: Validate → Parse → Classify → Route → Execute → Verify → Audit",
      type: "operational", evidenceType: "source",
      evidenceRef: "https://delentia.com/protocols/fdia-equation", verifiedAt: "2026-04-15",
    },
  ],

  // ── SIGNEAI / HEXACORE CLUSTER ──────────────────────────────────────────────
  "signedai-multi-llm-consensus-explained": [
    {
      value: "0.3%", label: "Consensus hallucination rate",
      detail: "7-model HexaCore consensus; each model independently verifies before signing",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
    {
      value: "7 models", label: "HexaCore consensus roster",
      detail: "3 Western + 3 Eastern + 1 Thai — geopolitical balance in verification",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/products/signed-ai", verifiedAt: "2026-04-15",
    },
    {
      value: "Ed25519", label: "Signing algorithm",
      detail: "RFC 8032 — cryptographic audit trail per output, tamper-evident",
      type: "operational", evidenceType: "source",
      evidenceRef: "https://www.rfc-editor.org/rfc/rfc8032", verifiedAt: "2026-04-15",
    },
  ],
  "hexacore-7-model-ai-infrastructure": [
    {
      value: "3.74×", label: "Cost reduction vs single-LLM",
      detail: "HexaCore parallel inference vs single-model baseline deployment cost",
      type: "outcome", evidenceType: "benchmark-assumption",
      evidenceNote: "Internal benchmark; assumes comparable hardware allocation per model", verifiedAt: "2026-04-15",
    },
    {
      value: "7 models", label: "Parallel consensus layer",
      detail: "Geopolitically balanced: 3W + 3E + 1TH — independent inference before merge",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/products/signed-ai", verifiedAt: "2026-04-15",
    },
    {
      value: "99.7%", label: "Consensus accuracy",
      detail: "HexaCore consensus vs ~85% single-LLM — measured on constitutional AI eval set",
      type: "operational", evidenceType: "benchmark-assumption",
      evidenceNote: "Eval set: RCT internal synthetic + production edge cases; external audit pending", verifiedAt: "2026-04-15",
    },
  ],
  // ── MEMORY / RCTDB CLUSTER ──────────────────────────────────────────────────
  "delta-engine-74-percent-compression": [
    {
      value: "74%", label: "Lossless compression rate",
      detail: "Delta-only state storage — only changed tokens stored, full recall guaranteed",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com/solutions/enterprise-ai-memory", verifiedAt: "2026-04-15",
    },
    {
      value: "Δ-only writes", label: "Delta Engine mechanism",
      detail: "Content-addressed diff storage: baseline + delta chain, not full snapshots",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/solutions/enterprise-ai-memory", verifiedAt: "2026-04-15",
    },
    {
      value: "<50ms", label: "Warm recall latency",
      detail: "Semantic match threshold ≥0.95 — hot tier Qdrant cache hit",
      type: "operational", evidenceType: "benchmark-assumption",
      evidenceNote: "Warm path only; cold-start from PostgreSQL: 150–400ms", verifiedAt: "2026-04-15",
    },
  ],
  "rctdb-8-dimensional-memory-schema": [
    {
      value: "8 dimensions", label: "Universal schema depth",
      detail: "D1–D8: Episodic, Semantic, Procedural, Temporal, Social, Emotional, Spatial, Predictive",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com/solutions/enterprise-ai-memory", verifiedAt: "2026-04-15",
    },
    {
      value: "3 storage layers", label: "Hybrid stack",
      detail: "Qdrant (vector) + Neo4j (graph) + PostgreSQL (relational) — query-routed by dimension",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/architecture", verifiedAt: "2026-04-15",
    },
    {
      value: "74%", label: "Delta compression active",
      detail: "Delta Engine lossless compression — write amplification <1.3×",
      type: "operational", evidenceType: "source",
      evidenceRef: "https://delentia.com/solutions/enterprise-ai-memory", verifiedAt: "2026-04-15",
    },
  ],
  "enterprise-ai-memory-systems-explained": [
    {
      value: "3 memory zones", label: "Tiered architecture",
      detail: "Hot (Redis/Qdrant) → Warm (Neo4j) → Cold (PostgreSQL) — automated tiering",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com/solutions/enterprise-ai-memory", verifiedAt: "2026-04-15",
    },
    {
      value: "74%", label: "Delta compression rate",
      detail: "Delta Engine: only diffs written; 0% data loss on arbitrary rollback",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/solutions/enterprise-ai-memory", verifiedAt: "2026-04-15",
    },
    {
      value: "<50ms", label: "Warm recall latency",
      detail: "Hot-tier cache hit; measured at p95 on synthetic enterprise workload",
      type: "operational", evidenceType: "benchmark-assumption",
      evidenceNote: "p95 on internal synthetic workload; production p95 varies by payload", verifiedAt: "2026-04-15",
    },
  ],

  // ── JITNA / PROTOCOL CLUSTER ────────────────────────────────────────────────
  "jitna-language-release": [
    {
      value: "Open standard", label: "Agent-to-agent protocol",
      detail: "RFC-001: first versioned, openly published agent communication specification",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com/protocols/jitna-rfc-001", verifiedAt: "2026-04-15",
    },
    {
      value: "6-field packet", label: "JITNA structure",
      detail: "Intent (I), Data (D), Delta (Δ), Authority (A), Response (R), Metadata (M)",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/protocols/jitna-rfc-001", verifiedAt: "2026-04-15",
    },
    {
      value: "50ms", label: "Target negotiation latency",
      detail: "Warm agent-to-agent JITNA handshake — both agents pre-loaded in context",
      type: "operational", evidenceType: "benchmark-assumption",
      evidenceNote: "Target SLO; actual performance depends on agent model and payload size", verifiedAt: "2026-04-15",
    },
  ],
  "multi-agent-ai-systems-guide": [
    {
      value: "7-model consensus", label: "HexaCore multi-agent result",
      detail: "Each model assigned specific role via JITNA RFC-001 task dispatch",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com/products/signed-ai", verifiedAt: "2026-04-15",
    },
    {
      value: "JITNA RFC-001", label: "Agent communication protocol",
      detail: "Structured 6-field packet governs all inter-agent data and authority delegation",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/protocols/jitna-rfc-001", verifiedAt: "2026-04-15",
    },
    {
      value: SITE_HALLUCINATION_RATE, label: "Consensus benchmark scope",
      detail: "Multi-agent verification layer benchmark — all agents must agree before signing",
      type: "operational", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
  ],
  "intent-operating-system-explained": [
    {
      value: "Intent OS", label: "Enterprise AI governance layer",
      detail: "Manages resources, enforces policy, routes tasks and maintains state across LLMs",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com/architecture", verifiedAt: "2026-04-15",
    },
    {
      value: "9-tier kernel", label: "Constitutional OS architecture",
      detail: "Input → Classify → Route → Execute → Verify → Constrain → Sign → Audit → Output",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/architecture", verifiedAt: "2026-04-15",
    },
    {
      value: SITE_ENTERPRISE_EVIDENCE_LABEL, label: "Runtime scope",
      detail: "The broader runtime footprint is disclosed separately from the public SDK proof lane",
      type: "operational", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
  ],
  "understanding-intent-operations": [
    {
      value: "F=(D^I)×A", label: "Intent operations formula",
      detail: "Function = (Data^Intent) × Action — intent amplifies data quality exponentially",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com/protocols/fdia-equation", verifiedAt: "2026-04-15",
    },
    {
      value: "7 states", label: "Intent processing loop",
      detail: "Observe → Parse → Classify → Route → Execute → Verify → Audit",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/protocols/fdia-equation", verifiedAt: "2026-04-15",
    },
    {
      value: SITE_ENTERPRISE_EVIDENCE_LABEL, label: "RCT runtime scope",
      detail: "Intent OS governance spans the broader runtime, which is disclosed separately from public SDK proof",
      type: "operational", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
  ],

  // ── ROUTING / EVALUATION CLUSTER ────────────────────────────────────────────
  "how-to-evaluate-enterprise-ai-platforms": [
    {
      value: "7 evaluation questions", label: "Procurement framework",
      detail: "Buyer-side checklist: coverage, fallback, audit trail, latency, compliance, cost, sovereignty",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com/methodology", verifiedAt: "2026-04-15",
    },
    {
      value: `${SITE_PUBLIC_SDK_TESTS} tests`, label: SITE_PUBLIC_SDK_EVIDENCE_LABEL,
      detail: `Use the public SDK checkpoint as the open proof lane; ${SITE_TEST_COUNT.toLocaleString()} tests remain a separate ${SITE_ENTERPRISE_EVIDENCE_LABEL.toLowerCase()}`,
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
    {
      value: SITE_HALLUCINATION_RATE, label: "Hallucination benchmark scope",
      detail: "Benchmark-scoped rate used in evaluation criteria, paired with methodology disclosures",
      type: "operational", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
  ],
  "evaluation-harnesses-enterprise-llm": [
    {
      value: `${SITE_TEST_COUNT.toLocaleString()} tests`, label: "Enterprise snapshot suite",
      detail: `Broader runtime evaluation across the enterprise-private snapshot; public SDK checkpoint is ${SITE_PUBLIC_SDK_TESTS} tests`,
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
    {
      value: "9 algorithm tiers", label: "Evaluation coverage",
      detail: "Tier 1–9: from input validation through output signing — all governed by FDIA",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/methodology", verifiedAt: "2026-04-15",
    },
    {
      value: "0.92", label: "FDIA benchmark score",
      detail: `RCT measured accuracy vs ~0.65 industry baseline — enterprise evaluation set disclosed separately from the ${SITE_PUBLIC_SDK_EVIDENCE_LABEL.toLowerCase()}`,
      type: "operational", evidenceType: "source",
      evidenceRef: "https://hai.stanford.edu/", verifiedAt: "2026-04-15",
    },
  ],
  "rct-ecosystem-4849-tests-methodology": [
    {
      value: `${SITE_TEST_COUNT.toLocaleString()}`, label: "Tests in enterprise snapshot",
      detail: `0 failures, 0 errors across the larger suite, disclosed separately from the ${SITE_PUBLIC_SDK_EVIDENCE_LABEL.toLowerCase()}`,
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
    {
      value: SITE_ENTERPRISE_EVIDENCE_LABEL, label: "Test matrix scope",
      detail: "Broader runtime coverage with multi-layer checks, disclosed as enterprise context rather than public SDK proof",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
    {
      value: "v5.4.5", label: "Verified platform version",
      detail: "Enterprise baseline — full test suite passes on every commit",
      type: "operational", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
  ],
  "rct-7-process-explained": [
    {
      value: "41 algorithms", label: "Algorithm coverage",
      detail: "9 tiers fully mapped — complete RCT-7 improvement loop",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com/algorithms", verifiedAt: "2026-04-15",
    },
    {
      value: "7 stages", label: "RCT-7 pipeline",
      detail: "Observe → Analyze → Design → Implement → Test → Deploy → Monitor",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/methodology", verifiedAt: "2026-04-15",
    },
    {
      value: `${SITE_TEST_COUNT.toLocaleString()}`, label: "Enterprise test gates per cycle",
      detail: "0 failures allowed to proceed to next stage in the enterprise snapshot; public SDK uses its own smaller verified checkpoint",
      type: "operational", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
  ],

  // ── THAILAND / COMPLIANCE CLUSTER ───────────────────────────────────────────
  "pdpa-ai-compliance-thailand": [
    {
      value: "PDPA-compliant", label: "Thai enterprise AI requirement",
      detail: "พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 — mandatory for all Thai enterprises with personal data",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://www.pdpa.go.th/", verifiedAt: "2026-04-15",
    },
    {
      value: "3 frameworks", label: "Compliance coverage",
      detail: "PDPA (TH) + NIST AI RMF (US) + EU AI Act Annex III — unified policy enforcement",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://www.nist.gov/system/files/documents/2023/01/26/AI_RMF_1.0.pdf", verifiedAt: "2026-04-15",
    },
    {
      value: "0.3%", label: "Hallucination ceiling",
      detail: "Constitutional runtime controls — required to satisfy PDPA accuracy obligations",
      type: "operational", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
  ],
  "constitutional-ai-thailand-enterprise-guide": [
    {
      value: "1,000+ enterprises", label: "Thai market target",
      detail: "National AI adoption vision 2030 — SET A prioritised market",
      type: "outcome", evidenceType: "benchmark-assumption",
      evidenceNote: "Based on BOT + NECTEC enterprise digitisation roadmap 2025–2030; not yet independently verified", verifiedAt: "2026-04-15",
    },
    {
      value: "PDPA-native", label: "Constitutional design approach",
      detail: "Compliance enforced by architecture — not post-hoc auditing",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://www.pdpa.go.th/", verifiedAt: "2026-04-15",
    },
    {
      value: "8 language pairs", label: "SEA adapter coverage",
      detail: "EN/TH/MY/ID/VN/MM/KH/LA — regional linguistic compliance built-in",
      type: "operational", evidenceType: "benchmark-assumption",
      evidenceNote: "Target adapter count; active pairs in v5.4.5: EN+TH; others on roadmap", verifiedAt: "2026-04-15",
    },
  ],
  "thai-ai-platform-vision-2030": [
    {
      value: "50–100B THB", label: "National AI economic vision",
      detail: "Thai enterprise AI infrastructure value by 2030 — BOT + NECTEC roadmap",
      type: "outcome", evidenceType: "benchmark-assumption",
      evidenceNote: "Published government estimate range; actual growth depends on policy execution", verifiedAt: "2026-04-15",
    },
    {
      value: "Constitutional OS", label: "Platform architecture approach",
      detail: "Intent OS layer governs all national enterprise AI — not model-by-model deployment",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/architecture", verifiedAt: "2026-04-15",
    },
    {
      value: "<4 months", label: "Foundation build time",
      detail: "Zero external capital, one person — from first prototype to v5.4.5 in under 4 months",
      type: "operational", evidenceType: "source",
      evidenceRef: "https://delentia.com/products/delentia-platform", verifiedAt: "2026-04-20",
    },
  ],

  // ── STRATEGY / ARCHITECTURE CLUSTER ─────────────────────────────────────────
  "reverse-component-thinking-explained": [
    {
      value: "30-day build", label: "Full constitutional AI OS",
      detail: "RCT Ecosystem v5.4.5 — zero capital bootstrap from concept to production",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com/products/delentia-platform", verifiedAt: "2026-04-15",
    },
    {
      value: "Reverse-component", label: "Architecture methodology",
      detail: "Define governance contract first, then build components to satisfy it",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/methodology", verifiedAt: "2026-04-15",
    },
    {
      value: `${SITE_TEST_COUNT.toLocaleString()} / 0 fail`, label: "Enterprise quality gate result",
      detail: `Enterprise snapshot passes the larger suite, while ${SITE_PUBLIC_SDK_EVIDENCE_LABEL.toLowerCase()} remains the public proof lane`,
      type: "operational", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
  ],
  "v2-7-enterprise-integration-suite": [
    {
      value: "153 static pages", label: "Website delivery scale",
      detail: "Full Next.js static generation — 0 SSR roundtrips on standard pages",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com", verifiedAt: "2026-04-15",
    },
    {
      value: "TypeScript strict", label: "Integration quality standard",
      detail: "0 errors, 0 lint violations — enterprise integration suite v2.7",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
    {
      value: "2026.03", label: "Platform snapshot version",
      detail: "Baseline for all integration contracts — versioned for enterprise SLA reference",
      type: "operational", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-15",
    },
  ],

  // ── ALGORITHM / EVOLUTION CLUSTER (SET A Day 3 — 21 Apr 2026) ────────────────
  "mee-meta-evolution-engine-explained": [
    {
      value: "96%", label: "MEE accuracy score",
      detail: "Meta Evolution Engine — measured accuracy on ALGO-07 evaluation set (Score: 9.5/10)",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com/algorithms", verifiedAt: "2026-04-21",
    },
    {
      value: "G: 50→90", label: "Intelligence evolution range",
      detail: "dG/dt = α · Δ(M, Π, R(t)) — adaptive evolution from baseline to target G-level",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/algorithms", verifiedAt: "2026-04-21",
    },
    {
      value: ">0.5 dG/dt", label: "Evolution rate target",
      detail: "Target per-step evolution rate; range 0.05–0.8 depending on feedback quality",
      type: "operational", evidenceType: "benchmark-assumption",
      evidenceNote: "Internal benchmark target; rate varies with memory quality and feedback richness", verifiedAt: "2026-04-21",
    },
  ],

  // ── MOIP / PARETO CLUSTER (SET A — 23 Apr 2026) ──────────────────────────────
  "moip-multi-objective-intent-planning": [
    {
      value: "100%", label: "Pareto accuracy",
      detail: "All Pareto-optimal solutions correctly identified — MOIP benchmark set (Score: 9.1/10)",
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://delentia.com/algorithms", verifiedAt: "2026-04-23",
    },
    {
      value: "O(n²)", label: "Pareto detection complexity",
      detail: "Deterministic frontier discovery — scales to 50+ solution candidates per planning cycle",
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://delentia.com/algorithms", verifiedAt: "2026-04-23",
    },
    {
      value: "<100ms", label: "Ranking speed",
      detail: "50-solution Pareto ranking with weighted preference scoring — embedded in FDIA intent pipeline",
      type: "operational", evidenceType: "source",
      evidenceRef: "https://delentia.com/benchmark", verifiedAt: "2026-04-23",
    },
  ],
  "delentia-os-open-source-launch": [
    {
      value: `${SITE_PUBLIC_SDK_TESTS}`, label: "Passing tests",
      detail: `${SITE_PUBLIC_SDK_TESTS} tests pass on the current public SDK checkpoint with ${SITE_PUBLIC_SDK_COVERAGE} coverage`,
      type: "outcome", evidenceType: "source",
      evidenceRef: "https://github.com/delentia-labs/delentia-os", verifiedAt: "2026-04-22",
    },
    {
      value: SITE_PUBLIC_SDK_COVERAGE, label: "Code coverage",
      detail: `${SITE_PUBLIC_SDK_COVERAGE} line coverage across the current public SDK release path`,
      type: "mechanism", evidenceType: "source",
      evidenceRef: "https://github.com/delentia-labs/delentia-os", verifiedAt: "2026-04-22",
    },
    {
      value: SITE_PUBLIC_SDK_VERSION, label: "Public SDK version",
      detail: "Apache 2.0 licensed developer SDK — separate from the broader enterprise runtime",
      type: "operational", evidenceType: "source",
      evidenceRef: "https://choosealicense.com/licenses/apache-2.0/", verifiedAt: "2026-04-22",
    },
  ],
}

export interface BlogPostMetadata {
  title: string
  author: string
  authorId?: string
  reviewerId?: string
  date: string
  lastReviewed?: string
  category: BlogCategory
  excerpt: string
  tags: string[]
  readTime: number
  references?: string[]
  /**
   * draft: true = hidden from all public listings and direct URLs.
   * Use for articles being written or awaiting editorial approval.
   * Set GATE_FUTURE_POSTS=true in env to also hide future-dated posts until their publish date.
   */
  draft?: boolean
}

export interface BlogPost extends BlogPostMetadata {
  slug: string
  content: string
  isLocalized: boolean
  availableLocales: BlogLocale[]
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/&[^;]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function mapMarkdownLinesOutsideFences(
  content: string,
  transform: (line: string, inFence: boolean) => string
) {
  const lines = content.split("\n")
  let inFence = false

  return lines
    .map((line) => {
      if (/^```/.test(line.trim())) {
        const nextLine = transform(line, inFence)
        inFence = !inFence
        return nextLine
      }

      return transform(line, inFence)
    })
    .join("\n")
}

function stripLeadingMarkdownTitle(content: string) {
  return content.replace(/^\s*#\s+.+?\r?\n(?:\r?\n)*/, "").trimStart()
}

function demoteMarkdownBodyH1(content: string) {
  return mapMarkdownLinesOutsideFences(content, (line, inFence) => {
    if (inFence) {
      return line
    }

    return line.replace(/^#\s+(.*)$/, "## $1")
  })
}

function getCanonicalBlogFileNames() {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx") && !fileName.endsWith(BLOG_VARIANT_SUFFIX))
}

function parseBlogPostFile(filePath: string, slug: string) {
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    ...(data as Partial<BlogPostMetadata>),
  }
}

function getLocalizedVariantPath(slug: string, locale: BlogLocale) {
  if (locale === "en") return null

  const localizedPath = path.join(postsDirectory, `${slug}.${locale}.mdx`)
  return fs.existsSync(localizedPath) ? localizedPath : null
}

function escapeComparisonOperators(content: string) {
  return mapMarkdownLinesOutsideFences(content, (line, inFence) => {
    if (inFence) {
      return line
    }

    return line.replace(/(^|[^\\w`])<(?=\d)/g, "$1&lt;")
  })
}

function localizeInlineLinks(content: string, locale: BlogLocale) {
  return content.replace(/\]\(\/(?:en|th)(\/[^)]+)\)/g, (_, suffix: string) => {
    const localizedHref = locale === "th" ? `/th${suffix}` : suffix
    return `](${localizedHref})`
  })
}

function normalizeBlogContent(content: string, locale: BlogLocale) {
  return demoteMarkdownBodyH1(
    stripLeadingMarkdownTitle(
      escapeComparisonOperators(localizeInlineLinks(content, locale))
    )
  )
}

function buildBlogPost(slug: string, locale: BlogLocale): BlogPost {
  const basePath = path.join(postsDirectory, `${slug}.mdx`)
  const basePost = parseBlogPostFile(basePath, slug)
  const variantPath = getLocalizedVariantPath(slug, locale)
  const localizedPost = variantPath ? parseBlogPostFile(variantPath, slug) : null

  const merged = {
    ...basePost,
    ...localizedPost,
    slug,
    content: localizedPost?.content?.trim() ? localizedPost.content : basePost.content,
  }

  return {
    ...(merged as BlogPostMetadata),
    slug,
    content: normalizeBlogContent(merged.content, locale),
    isLocalized: locale === "en" || Boolean(localizedPost),
    availableLocales: localizedPost ? ["en", locale] : ["en"],
  }
}

export function hasLocalizedBlogVariant(slug: string, locale: BlogLocale) {
  return Boolean(getLocalizedVariantPath(slug, locale))
}

export function getBlogCategoryLabel(category: BlogCategory, locale: BlogLocale) {
  return BLOG_CATEGORY_LABELS[category]?.[locale] ?? category.replace(/_/g, " ")
}

export function getBlogPublicationType(category: BlogCategory, locale: BlogLocale) {
  return BLOG_PUBLICATION_TYPES[category]?.[locale] ?? BLOG_PUBLICATION_TYPES.research[locale]
}

export function getBlogHeroMetrics(slug: string) {
  return BLOG_HERO_METRICS[slug] ?? []
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOG_RELATED_MAP — semantic cluster cross-links (SET A Day 2 — 16 Apr 2026)
// Each slug maps to exactly 3 semantically related slugs (not just same category).
// Rules: prefer cross-cluster bridging over same-cluster echo; never self-link.
// ─────────────────────────────────────────────────────────────────────────────
const BLOG_RELATED_MAP: Record<string, [string, string, string]> = {
  // ── Governance / Constitutional ──────────────────────────────────────────────
  "constitutional-ai-vs-rag-comparison": [
    "designing-low-hallucination-ai-systems",
    "enterprise-ai-governance-playbook-2026",
    "verification-vs-prompt-engineering",
  ],
  "designing-low-hallucination-ai-systems": [
    "constitutional-ai-vs-rag-comparison",
    "fdia-equation-explained",
    "verification-vs-prompt-engineering",
  ],
  "enterprise-ai-governance-playbook-2026": [
    "constitutional-ai-vs-rag-comparison",
    "pdpa-ai-compliance-thailand",
    "how-to-reduce-ai-hallucination",
  ],
  "verification-vs-prompt-engineering": [
    "designing-low-hallucination-ai-systems",
    "fdia-equation-explained",
    "signedai-multi-llm-consensus-explained",
  ],
  "how-to-reduce-ai-hallucination": [
    "fdia-equation-explained",
    "verification-vs-prompt-engineering",
    "constitutional-ai-vs-rag-comparison",
  ],

  // ── FDIA / Equation ──────────────────────────────────────────────────────────
  "fdia-equation-explained": [
    "understanding-intent-operations",
    "intent-operating-system-explained",
    "how-to-reduce-ai-hallucination",
  ],
  "understanding-intent-operations": [
    "fdia-equation-explained",
    "intent-operating-system-explained",
    "jitna-language-release",
  ],

  // ── JITNA / Protocol ─────────────────────────────────────────────────────────
  "jitna-language-release": [
    "intent-operating-system-explained",
    "multi-agent-ai-systems-guide",
    "fdia-equation-explained",
  ],
  "intent-operating-system-explained": [
    "jitna-language-release",
    "fdia-equation-explained",
    "multi-agent-ai-systems-guide",
  ],

  // ── SignedAI / HexaCore / Multi-Agent ────────────────────────────────────────
  "signedai-multi-llm-consensus-explained": [
    "hexacore-7-model-ai-infrastructure",
    "multi-agent-ai-systems-guide",
    "verification-vs-prompt-engineering",
  ],
  "hexacore-7-model-ai-infrastructure": [
    "signedai-multi-llm-consensus-explained",
    "multi-agent-ai-systems-guide",
    "how-to-reduce-ai-hallucination",
  ],
  "multi-agent-ai-systems-guide": [
    "signedai-multi-llm-consensus-explained",
    "jitna-language-release",
    "hexacore-7-model-ai-infrastructure",
  ],

  // ── Memory / RCTDB ───────────────────────────────────────────────────────────
  "delta-engine-74-percent-compression": [
    "rctdb-8-dimensional-memory-schema",
    "enterprise-ai-memory-systems-explained",
    "rct-7-process-explained",
  ],
  "rctdb-8-dimensional-memory-schema": [
    "delta-engine-74-percent-compression",
    "enterprise-ai-memory-systems-explained",
    "rct-ecosystem-4849-tests-methodology",
  ],
  "enterprise-ai-memory-systems-explained": [
    "delta-engine-74-percent-compression",
    "rctdb-8-dimensional-memory-schema",
    "intent-operating-system-explained",
  ],

  // ── Evaluation / Testing ─────────────────────────────────────────────────────
  "evaluation-harnesses-enterprise-llm": [
    "rct-ecosystem-4849-tests-methodology",
    "how-to-evaluate-enterprise-ai-platforms",
    "rct-7-process-explained",
  ],
  "rct-ecosystem-4849-tests-methodology": [
    "evaluation-harnesses-enterprise-llm",
    "how-to-evaluate-enterprise-ai-platforms",
    "rct-7-process-explained",
  ],
  "how-to-evaluate-enterprise-ai-platforms": [
    "evaluation-harnesses-enterprise-llm",
    "rct-ecosystem-4849-tests-methodology",
    "fdia-equation-explained",
  ],
  "rct-7-process-explained": [
    "rct-ecosystem-4849-tests-methodology",
    "evaluation-harnesses-enterprise-llm",
    "reverse-component-thinking-explained",
  ],

  // ── Thailand / Compliance ────────────────────────────────────────────────────
  "pdpa-ai-compliance-thailand": [
    "constitutional-ai-thailand-enterprise-guide",
    "thai-ai-platform-vision-2030",
    "enterprise-ai-governance-playbook-2026",
  ],
  "constitutional-ai-thailand-enterprise-guide": [
    "pdpa-ai-compliance-thailand",
    "thai-ai-platform-vision-2030",
    "constitutional-ai-vs-rag-comparison",
  ],
  "thai-ai-platform-vision-2030": [
    "pdpa-ai-compliance-thailand",
    "constitutional-ai-thailand-enterprise-guide",
    "reverse-component-thinking-explained",
  ],

  // ── Strategy / Philosophy ────────────────────────────────────────────────────
  "reverse-component-thinking-explained": [
    "rct-7-process-explained",
    "v2-7-enterprise-integration-suite",
    "thai-ai-platform-vision-2030",
  ],
  "v2-7-enterprise-integration-suite": [
    "reverse-component-thinking-explained",
    "rct-ecosystem-4849-tests-methodology",
    "rct-7-process-explained",
  ],

  // ── Algorithm / Evolution ─────────────────────────────────────────────
  "mee-meta-evolution-engine-explained": [
    "fdia-equation-explained",
    "signedai-multi-llm-consensus-explained",
    "evaluation-harnesses-enterprise-llm",
  ],

  // ── MOIP / Pareto cluster ─────────────────────────────────────────────
  "moip-multi-objective-intent-planning": [
    "fdia-equation-explained",
    "intent-operating-system-explained",
    "evaluation-harnesses-enterprise-llm",
  ],

  // ── Open Source SDK launch ────────────────────────────────────────────
  "delentia-os-open-source-launch": [
    "rct-ecosystem-4849-tests-methodology",
    "evaluation-harnesses-enterprise-llm",
    "rct-7-process-explained",
  ],
}

/**
 * Returns up to 3 semantically related blog posts for a given slug.
 * Uses BLOG_RELATED_MAP first; falls back to same-category posts if slug not mapped.
 */
export function getRelatedPosts(slug: string, locale: BlogLocale = "en"): BlogPost[] {
  const relatedSlugs = BLOG_RELATED_MAP[slug]
  if (relatedSlugs) {
    return relatedSlugs
      .map((s) => getBlogPostBySlug(s, locale))
      .filter((p): p is BlogPost => p !== null)
  }
  // Fallback: same category, exclude self
  return getAllBlogPosts(locale)
    .filter((p) => {
      const current = getBlogPostBySlug(slug, locale)
      return p.slug !== slug && current && p.category === current.category
    })
    .slice(0, 3)
}

/**
 * Returns false if the post is a draft, or (when GATE_FUTURE_POSTS=true) if its
 * publish date is still in the future. Safe to call in both SSG and server contexts.
 *
 * GATE_FUTURE_POSTS env var:
 *   - Not set / false (default): future-dated posts are visible immediately after push.
 *   - true: future-dated posts are hidden until the date arrives (requires a new build/deploy on that date).
 *
 * Recommended Vercel workflow for scheduled publishing:
 *   1. Set GATE_FUTURE_POSTS=true in Vercel environment variables.
 *   2. Set up a daily Vercel Deploy Hook triggered by a cron service (e.g. cron-job.org).
 *   3. Write article with future date and push — it won't appear until that date's build runs.
 */
function isPublishable(post: BlogPost): boolean {
  if (post.draft === true) return false
  if (process.env.GATE_FUTURE_POSTS === "true") {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const postDate = new Date(post.date)
    postDate.setHours(0, 0, 0, 0)
    if (postDate > today) return false
  }
  return true
}

export function getAllBlogPosts(locale: BlogLocale = "en"): BlogPost[] {
  const posts = getCanonicalBlogFileNames().map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "")
    return buildBlogPost(slug, locale)
  })

  // Filter drafts and (optionally) future-dated posts, then sort by date descending
  return posts
    .filter(isPublishable)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPostBySlug(slug: string, locale: BlogLocale = "en"): BlogPost | null {
  try {
    const post = buildBlogPost(slug, locale)
    if (!isPublishable(post)) return null
    return post
  } catch {
    return null
  }
}

export function getBlogPostsByCategory(category: BlogPostMetadata["category"], locale: BlogLocale = "en"): BlogPost[] {
  return getAllBlogPosts(locale).filter((post) => post.category === category)
}

export function getResolvedAuthorProfile(post: BlogPost) {
  return getAuthorProfileById(post.authorId) ?? getAuthorProfileByName(post.author)
}

export function getResolvedReviewerProfile(post: BlogPost) {
  return getAuthorProfileById(post.reviewerId) ?? getAuthorProfileById("rct-research-desk")
}

export function getPostReviewDate(post: BlogPost) {
  return post.lastReviewed || post.date
}

export function getPostJourney(post: BlogPost) {
  // Memory cluster: rctdb | delta (before generic memory check)
  if (post.slug.includes("rctdb") || post.slug.includes("delta")) {
    return {
      solutionHref: "/solutions/enterprise-ai-memory",
      solutionLabel: "Explore Enterprise AI Memory",
      authorityHref: "/benchmark",
      authorityLabel: "Review Benchmark Data",
      conversionContext: "pricing:delentia:sales",
      conversionLabel: "Request enterprise evaluation",
    }
  }

  if (post.slug.includes("memory")) {
    return {
      solutionHref: "/solutions/enterprise-ai-memory",
      solutionLabel: "Explore Enterprise AI Memory",
      authorityHref: "/benchmark-summary",
      authorityLabel: "Review Benchmark Summary",
      conversionContext: "pricing:delentia:sales",
      conversionLabel: "Request enterprise evaluation",
    }
  }

  // FDIA cluster: equation-first before hallucination rule
  if (post.slug.includes("fdia") || post.slug.includes("equation") || post.slug.includes("kernel")) {
    return {
      solutionHref: "/protocols/fdia-equation",
      solutionLabel: "Explore the FDIA Equation",
      authorityHref: "/whitepaper/fdia-equation-v2",
      authorityLabel: "Read FDIA Whitepaper v2",
      conversionContext: "whitepaper:fdia:request",
      conversionLabel: "Request the FDIA evaluation pack",
    }
  }

  // ── Intent OS / Operating System cluster ────────────────────────────────────
  // Must appear BEFORE the JITNA rule — both slugs contain "intent-operat" as
  // a substring, which would otherwise incorrectly route them to JITNA RFC-001.
  if (
    post.slug === "intent-operating-system-explained" ||
    post.slug === "understanding-intent-operations" ||
    post.slug.includes("intent-os") ||
    post.slug.includes("intent-operation")
  ) {
    return {
      solutionHref: "/architecture",
      solutionLabel: "Explore RCT Architecture",
      authorityHref: "/protocols/fdia-equation",
      authorityLabel: "Open FDIA Equation",
      conversionContext: "pricing:delentia:evaluation",
      conversionLabel: "Request architecture evaluation",
    }
  }

  // JITNA / Protocol cluster
  if (post.slug.includes("jitna") || post.slug.includes("intent-operat") || post.slug.includes("protocol") || post.slug.includes("rfc")) {
    return {
      solutionHref: "/protocols/jitna-rfc-001",
      solutionLabel: "Explore JITNA RFC-001",
      authorityHref: "/technology/jitna",
      authorityLabel: "Read JITNA RFC-001 Specification",
      conversionContext: "whitepaper:jitna:request",
      conversionLabel: "Request the JITNA specification",
    }
  }

  // SignedAI / HexaCore / Consensus / Verification cluster
  if (post.slug.includes("signedai") || post.slug.includes("hexacore") || post.slug.includes("consensus") || post.slug.startsWith("verification-vs")) {
    return {
      solutionHref: "/products/signed-ai",
      solutionLabel: "Explore SignedAI",
      authorityHref: "/benchmark",
      authorityLabel: "Review Benchmark Results",
      conversionContext: "pricing:signedai:sales",
      conversionLabel: "Talk to the SignedAI team",
    }
  }

  // Multi-Agent / Agentic cluster — updated to SignedAI (HexaCore consensus context)
  if (post.slug.includes("multi-agent") || post.slug.includes("agentic")) {
    return {
      solutionHref: "/products/signed-ai",
      solutionLabel: "Explore SignedAI",
      authorityHref: "/protocols/jitna-rfc-001",
      authorityLabel: "Open JITNA Protocol Spec",
      conversionContext: "whitepaper:multiagent:request",
      conversionLabel: "Request multi-agent evaluation",
    }
  }

  // Thai-AI / Vision 2030 cluster — must appear before the generic "thailand" rule
  if (post.slug.startsWith("thai-ai") || post.slug.includes("vision-2030")) {
    return {
      solutionHref: "/thailand-enterprise-trust",
      solutionLabel: "Explore Thailand Enterprise Trust",
      authorityHref: "/solutions/regional-ai",
      authorityLabel: "Open Regional AI Solutions",
      conversionContext: "whitepaper:evaluation-pack:request",
      conversionLabel: "Request the Thailand evaluation path",
    }
  }

  // PDPA / Compliance / Regional / ASEAN cluster — must appear before generic "thailand" rule
  if (post.slug.includes("pdpa") || post.slug.includes("compliance") || post.slug.includes("regional") || post.slug.includes("asean")) {
    return {
      solutionHref: "/solutions/regional-ai",
      solutionLabel: "Explore Regional AI Solutions",
      authorityHref: "/solutions/ai-hallucination-prevention",
      authorityLabel: "Explore AI Hallucination Prevention",
      conversionContext: "whitepaper:evaluation-pack:request",
      conversionLabel: "Request the compliance evaluation path",
    }
  }

  // Constitutional + Thailand enterprise — specific before generic thailand rule
  // "constitutional-ai-thailand-enterprise-guide" must route to Thailand trust
  // cluster, not to generic Hallucination Prevention.
  if (
    (post.slug.includes("thailand") && post.slug.includes("constitutional")) ||
    (post.slug.includes("thailand") && post.slug.includes("enterprise-guide"))
  ) {
    return {
      solutionHref: "/thailand-enterprise-trust",
      solutionLabel: "Explore Thailand Enterprise Trust",
      authorityHref: "/solutions/regional-ai",
      authorityLabel: "Open Regional AI Solutions",
      conversionContext: "whitepaper:evaluation-pack:request",
      conversionLabel: "Request Thailand enterprise evaluation",
    }
  }

  if (post.slug.includes("thailand")) {
    return {
      solutionHref: "/solutions/ai-hallucination-prevention",
      solutionLabel: "Explore AI Hallucination Prevention",
      authorityHref: "/thailand-enterprise-trust",
      authorityLabel: "Open Thailand Enterprise Trust Layer",
      conversionContext: "whitepaper:evaluation-pack:request",
      conversionLabel: "Request the Thailand evaluation path",
    }
  }

  // Tutorial / How-to hallucination guides — implementation-focused CTA, not sales evaluation
  // Must appear BEFORE the generic hallucination rule.
  if (post.slug.includes("how-to-reduce") || post.slug.includes("designing-low")) {
    return {
      solutionHref: "/solutions/ai-hallucination-prevention",
      solutionLabel: "Explore AI Hallucination Prevention",
      authorityHref: "/methodology",
      authorityLabel: "Review Methodology",
      conversionContext: "whitepaper:implementation:download",
      conversionLabel: "Get the implementation guide",
    }
  }

  // Governance Playbook — specific before generic hallucination|governance rule
  // Playbook articles are methodology/compliance guides, not hallucination tutorials.
  if (post.slug.includes("governance-playbook")) {
    return {
      solutionHref: "/methodology",
      solutionLabel: "Review Methodology",
      authorityHref: "/evaluation",
      authorityLabel: "Open Evaluation Hub",
      conversionContext: "whitepaper:evaluation-pack:request",
      conversionLabel: "Request the governance evaluation pack",
    }
  }

  if (post.slug.includes("hallucination") || post.slug.includes("governance") || post.slug.includes("constitutional")) {
    return {
      solutionHref: "/solutions/ai-hallucination-prevention",
      solutionLabel: "Explore AI Hallucination Prevention",
      authorityHref: "/methodology",
      authorityLabel: "Review Methodology",
      conversionContext: "whitepaper:evaluation-pack:request",
      conversionLabel: "Request the evaluation pack",
    }
  }

  // RCT-7 process model — specific before generic evaluation-harness rule
  // rct-7-process-explained describes the methodology (solution), benchmark is the evidence.
  if (post.slug === "rct-7-process-explained") {
    return {
      solutionHref: "/methodology",
      solutionLabel: "Review RCT Methodology",
      authorityHref: "/benchmark",
      authorityLabel: "Review Benchmark Data",
      conversionContext: "pricing:delentia:evaluation",
      conversionLabel: "Request a platform evaluation",
    }
  }

  // Evidence / Testing cluster: evaluation harnesses, test methodology, RCT-7
  if (post.slug.includes("evaluation-harness") || post.slug.includes("4849") || post.slug.includes("rct-7")) {
    return {
      solutionHref: "/benchmark",
      solutionLabel: "Open Benchmark Summary",
      authorityHref: "/methodology",
      authorityLabel: "Review Methodology",
      conversionContext: "pricing:delentia:evaluation",
      conversionLabel: "Request a platform evaluation",
    }
  }

  // Evaluation guide articles — specific before generic evaluate|routing rule
  // "how-to-evaluate-enterprise-ai-platforms" is a procurement checklist;
  // it should route to Benchmark, not Dynamic AI Routing.
  if (
    post.slug.startsWith("how-to-evaluate") ||
    post.slug.includes("evaluation-platform") ||
    post.slug.includes("evaluate-enterprise")
  ) {
    return {
      solutionHref: "/benchmark",
      solutionLabel: "Open Benchmark Summary",
      authorityHref: "/evaluation",
      authorityLabel: "Open Evaluation Hub",
      conversionContext: "pricing:delentia:evaluation",
      conversionLabel: "Request a platform evaluation",
    }
  }

  if (post.slug.includes("evaluate") || post.slug.includes("routing")) {
    return {
      solutionHref: "/solutions/dynamic-ai-routing",
      solutionLabel: "Explore Dynamic AI Routing",
      authorityHref: "/evaluation",
      authorityLabel: "Open Evaluation Hub",
      conversionContext: "pricing:delentia:sales",
      conversionLabel: "Talk to the platform team",
    }
  }

  // Open Source SDK launch — route to GitHub/products
  // Must appear BEFORE the algorithm cluster rule.
  if (post.slug.includes("open-source-launch") || post.slug.includes("delentia-os") || (post.slug.includes("sdk") && post.slug.includes("open"))) {
    return {
      solutionHref: "/products/delentia-platform",
      solutionLabel: "Explore RCT Platform SDK",
      authorityHref: "https://github.com/delentia-labs/delentia-os",
      authorityLabel: "View on GitHub",
      conversionContext: "pricing:delentia:evaluation",
      conversionLabel: "Request enterprise evaluation",
    }
  }

  // MOIP / Pareto / Multi-Objective cluster — SET A Apr 23 2026
  // Must appear BEFORE the Algorithm cluster to capture moip-specific context.
  if (post.slug.includes("moip") || post.slug.includes("pareto") || post.slug.includes("multi-objective")) {
    return {
      solutionHref: "/solutions/dynamic-ai-routing",
      solutionLabel: "Explore Dynamic AI Routing",
      authorityHref: "/protocols/fdia-equation",
      authorityLabel: "Open FDIA Equation",
      conversionContext: "pricing:delentia:evaluation",
      conversionLabel: "Request MOIP evaluation",
    }
  }

  // Algorithm cluster — Phase 4 deep-dive articles (MEE, Analysearch, MCTR, Reflexion, ABV, ALBAS, Halting)
  if (post.slug.startsWith("mee-") || post.slug.includes("algorithm") || post.slug.includes("analysearch") || post.slug.includes("mctr") || post.slug.includes("reflexion") || post.slug.includes("abv") || post.slug.includes("albas") || post.slug.includes("halting")) {
    return {
      solutionHref: "/algorithms",
      solutionLabel: "Explore All 41 Algorithms",
      authorityHref: "/benchmark",
      authorityLabel: "Review Benchmark Results",
      conversionContext: "pricing:delentia:evaluation",
      conversionLabel: "Request algorithm evaluation",
    }
  }

  // Genome / Vault / Codex cluster — Phase 2 deep-dive articles
  if (post.slug.includes("genome") || post.slug.includes("vault") || post.slug.includes("codex")) {
    return {
      solutionHref: "/genome",
      solutionLabel: "Explore the 7 Genome System",
      authorityHref: "/architecture",
      authorityLabel: "Open RCT Architecture",
      conversionContext: "launch:request-access",
      conversionLabel: "Request genome architecture briefing",
    }
  }

  // Strategy / Architecture cluster
  if (post.slug.includes("reverse-component") || post.slug.includes("v2-7")) {
    return {
      solutionHref: "/architecture",
      solutionLabel: "Explore RCT Architecture",
      authorityHref: "/methodology",
      authorityLabel: "Review Methodology",
      conversionContext: "launch:request-access",
      conversionLabel: "View the full platform roadmap",
    }
  }

  return {
    solutionHref: "/solutions",
    solutionLabel: "Explore Solutions",
    authorityHref: "/glossary",
    authorityLabel: "Open Glossary",
    conversionContext: "launch:request-access",
    conversionLabel: "Request guided evaluation",
  }
}
