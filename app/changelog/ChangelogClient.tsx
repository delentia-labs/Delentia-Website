"use client"

import { usePathname } from "next/navigation"
import { BarChart3, BookOpen, Globe, Layers, Rocket, Sparkles, Terminal, Zap } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ResourcePageShell, ResourceSection } from "@/components/resource/resource-shell"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"

interface ReleaseEntry {
  version: string
  date: string
  title: string
  description: string
  icon: typeof Rocket
  highlights: string[]
  tone: string
}

export default function ChangelogClient() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const localePrefix = getLocalePrefix(resolveLocale(pathname, language))

  const releases: ReleaseEntry[] = [
    {
      version: "SDK v1.0.4b2",
      date: "2026-05-23",
      title: language === "th" ? "Interactive Terminal Simulator & Complete Bilingual Synced Release" : "Interactive Terminal Simulator & Complete Bilingual Synced Release",
      description: language === "th" ? "เปิดตัวเวอร์ชัน v1.0.4b2 โดดเด่นด้วย Interactive Terminal Simulator หน้าแรกของเว็บไซต์จำลองการบูตเครื่องและคำนวณสมการ FDIA (F = D^I * A) ด้วยแถบสไลด์ปรับเปลี่ยนค่าแบบเรียลไทม์ พร้อมการออกแบบเชิง Glassmorphism หรูหรา ไร้รอยต่อ และรองรับทั้งภาษาไทยและภาษาอังกฤษอย่างสมบูรณ์แบบ 100%" : "Released version v1.0.4b2 featuring an Interactive Terminal Simulator built with elegant CSS Glassmorphism directly on the homepage hero fold. Simulates the CLI boot sequence and processes the Constitutional FDIA formula (F = D^I * A) in real-time via interactive sliders, complete with visual threat meters and bilingual support.",
      icon: Terminal,
      highlights: language === "th" ? ["Interactive Terminal Simulator (CSS Glassmorphism) ✅", "Real-time FDIA Calculator (F = D^I * A) ✅", "Architect Veto alarm & warning indicator states ✅", "Staggered boot-up logs (1,297/1,297 tests verified) ✅", "Complete bilingual alignment (TH/EN parity) ✅", "System version bump to v1.0.4b2 across ecosystem ✅"] : ["Interactive Terminal Simulator (CSS Glassmorphism) ✅", "Real-time FDIA Calculator (F = D^I * A) ✅", "Architect Veto alarm & warning indicator states ✅", "Staggered boot-up logs (1,297/1,297 tests verified) ✅", "Complete bilingual alignment (TH/EN parity) ✅", "System version bump to v1.0.4b2 across ecosystem ✅"],
      tone: "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      version: "SDK v1.0.4b1",
      date: "2026-05-23",
      title: language === "th" ? "Beta Release — 3D Drop Shadow · Rounded Version Badge · --no-animation flag · rct.config.json support · PyPI Description Refreshed" : "Beta Release — 3D Drop Shadow · Rounded Version Badge · --no-animation flag · rct.config.json support · PyPI Description Refreshed",
      description: language === "th" ? "เปิดตัวเวอร์ชัน v1.0.4b1 บน PyPI ยกระดับความพรีเมียมของ CLI ในทุกมิติ: เพิ่ม 3D Drop Shadow offset เยื้อง 1 คอลัมน์สร้างความลึก, ระบบกรอบแสดงผลเวอร์ชันแบบขอบโค้งมน (Pill Box) พร้อม Glowing Active Indicator, เพิ่มสวิตช์ --no-animation และไฟล์คอนฟิก rct.config.json เพื่อปรับเปลี่ยน thresholds/ความเร็วตามต้องการ และอัปเดตหน้าแสดงผลบน PyPI ให้ถูกต้อง 100%" : "Released version v1.0.4b1 on PyPI, bringing next-gen CLI enhancements: 3D offset drop shadows for immersive depth, rounded pill-box version badges with active glowing status indicators, `--no-animation` performance flags, `rct.config.json` threshold overrides, and a fully refreshed PyPI project description.",
      icon: Rocket,
      highlights: language === "th" ? ["pypi.org/project/delentia-os v1.0.4b1 ✅", "3D Drop Shadow column-shifted offset ✅", "Rounded modern Pill-Box version badge ✅", "--no-animation switch (zero latency) ✅", "rct.config.json local configuration overrides ✅", "PyPI Description render fix (CSP-compliant) ✅", "1,297 tests verified passed (100% green) ✅"] : ["pypi.org/project/delentia-os v1.0.4b1 ✅", "3D Drop Shadow column-shifted offset ✅", "Rounded modern Pill-Box version badge ✅", "--no-animation switch (zero latency) ✅", "rct.config.json local configuration overrides ✅", "PyPI Description render fix (CSP-compliant) ✅", "1,297 tests verified passed (100% green) ✅"],
      tone: "border-violet-500/25 bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },
    {
      version: "SDK v1.0.4b0",
      date: "2026-05-23",
      title: language === "th" ? "Beta Preview Release — Enterprise CLI Design System · FDIA Formula Card · Boot Sound · 1297 tests · PyPI Live" : "Beta Preview Release — Enterprise CLI Design System · FDIA Formula Card · Boot Sound · 1297 tests · PyPI Live",
      description: language === "th" ? "เปิดตัวเวอร์ชัน v1.0.4b0 บน PyPI พร้อมระบบ CLI ดีไซน์ใหม่ล่าสุด (Enterprise Wordmark, Per-row Gradient, 3D Shadow Row, Tier-aware Colors, Boot Sequence Animation, completion sound) ผ่านการรันทดสอบ 1,297 automated tests ครบ 100% เต็ม บน CI/CD pipeline และใช้ Trusted Publishing OIDC อัปโหลดตรงไปยัง PyPI" : "Released version v1.0.4b0 on PyPI featuring our brand new CLI Design System (Enterprise Wordmark, Per-row Gradient, 3D Shadow Row, Tier-aware Colors, Boot Sequence Animation, and boot completion audio). Verified via 1,297 passing automated tests on the CI/CD pipeline. Published securely using PyPI OIDC Trusted Publishing.",
      icon: Rocket,
      highlights: language === "th" ? ["pypi.org/project/delentia-os v1.0.4b0 ✅", "1,297 tests passed (pytest + Hypothesis) ✅", "Enterprise Unicode block wordmark (49x6) ✅", "3D Drop Shadow character grid ✅", "Tier-aware gradient (Cyan/Gold) ✅", "Constitutional Formula FDIA card ✅", "Boot sequence audio bell \\a ✅", "Ruff formatting & lint clean ✅"] : ["pypi.org/project/delentia-os v1.0.4b0 ✅", "1,297 tests passed (pytest + Hypothesis) ✅", "Enterprise Unicode block wordmark (49x6) ✅", "3D Drop Shadow character grid ✅", "Tier-aware gradient (Cyan/Gold) ✅", "Constitutional Formula FDIA card ✅", "Boot sequence audio bell \\a ✅", "Ruff formatting & lint clean ✅"],
      tone: "border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      version: "Website v3.12.0",
      date: "2026-05-23",
      title: language === "th" ? "Phase 3 Content Cluster: Regional/ASEAN/DelentiaAI/PDPA 2567 · Benchmark Leaderboard · Delta Trace · TruthfulQA Proxy · Composite 73.45 · Glossary +3 · FAQ +2" : "Phase 3 Content Cluster: Regional/ASEAN/DelentiaAI/PDPA 2567 · Benchmark Leaderboard · Delta Trace · TruthfulQA Proxy · Composite 73.45 · Glossary +3 · FAQ +2",
      description: language === "th" ? "เผยแพร่ 4 บทความ Phase 3: regional-language-adapter-thai-nlp EN+TH (Thai tokenization, PDPA patterns, word segmentation), pdpa-compliance-checklist-2567 EN+TH (compliance checklist พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล 2562), asean-enterprise-ai-deployment-guide EN (10 regimes, 8 languages, 6 cloud sovereignty requirements), delentiaai-autonomous-enterprise-agent EN (FDIA-gated intent routing, JITNA-bounded execution, SignedAI-verified decision chains) เพิ่ม /benchmark/leaderboard page (industry comparison: Claude-3 #1 77.2, RCT #2 73.45, GPT-4 #3 72.6) เพิ่ม /docs/delta-trace page (Delta Engine compression chart, live JSONL trace viewer, light+dark mode) รัน TruthfulQA proxy: mc2=0.4703 (n=100, heuristic) แก้ไข composite score จาก 95.84 → 73.45 (4-metric honest baseline) เพิ่ม navbar links: Industry Leaderboard + Delta Compression เพิ่ม footer: NotebookLM Architecture Guide link เพิ่ม Glossary +3 terms: Regional Language Adapter, Thai Governance Boundary, ASEAN AI Governance เพิ่ม FAQ +2 Q&As: Thai NLP deployment + regional compliance" : "Published 4 Phase 3 articles: regional-language-adapter-thai-nlp EN+TH (Thai tokenization, PDPA patterns, word segmentation), pdpa-compliance-checklist-2567 EN+TH (PDPA compliance checklist), asean-enterprise-ai-deployment-guide EN (10 regimes, 8 languages, 6 cloud sovereignty requirements), delentiaai-autonomous-enterprise-agent EN (FDIA-gated intent routing, JITNA-bounded execution, SignedAI-verified decision chains). Added /benchmark/leaderboard page (industry comparison: Claude-3 #1 77.2, RCT #2 73.45, GPT-4 #3 72.6). Added /docs/delta-trace page (Delta Engine compression chart, live JSONL trace viewer, light+dark mode). Ran TruthfulQA proxy: mc2=0.4703 (n=100, heuristic). Fixed composite score from 95.84 → 73.45 (4-metric honest baseline). Added navbar links: Industry Leaderboard + Delta Compression. Added footer: NotebookLM Architecture Guide link. Added Glossary +3 terms: Regional Language Adapter, Thai Governance Boundary, ASEAN AI Governance. Added FAQ +2 Q&As: Thai NLP deployment + regional compliance.",
      icon: Sparkles,
      highlights: language === "th" ? ["regional-language-adapter-thai-nlp EN+TH ✅ (Thai tokenization, PDPA patterns)", "pdpa-compliance-checklist-2567 EN+TH ✅ (พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล checklist)", "asean-enterprise-ai-deployment-guide EN ✅ (10 regimes, 8 languages, 14 min)", "delentiaai-autonomous-enterprise-agent EN ✅ (FDIA+JITNA+SignedAI, 13 min)", "/benchmark/leaderboard ✅ Claude-3 #1 · RCT #2 73.45 · GPT-4 #3", "/docs/delta-trace ✅ compression chart + JSONL trace viewer", "TruthfulQA proxy: mc2=0.4703 (n=100) ✅", "Composite: 95.84 → 73.45 (4-metric honest) ✅", "Navbar: Industry Leaderboard + Delta Compression links ✅", "Footer: NotebookLM Architecture Guide ✅", "Glossary: Regional Language Adapter + Thai Governance Boundary + ASEAN AI Governance ✅ (49+ terms)", "FAQ: Thai NLP deployment + regional compliance ✅"] : ["regional-language-adapter-thai-nlp EN+TH ✅ (Thai tokenization, PDPA patterns)", "pdpa-compliance-checklist-2567 EN+TH ✅ (PDPA compliance checklist)", "asean-enterprise-ai-deployment-guide EN ✅ (10 regimes, 8 languages, 14 min)", "delentiaai-autonomous-enterprise-agent EN ✅ (FDIA+JITNA+SignedAI, 13 min)", "/benchmark/leaderboard ✅ Claude-3 #1 · RCT #2 73.45 · GPT-4 #3", "/docs/delta-trace ✅ compression chart + JSONL trace viewer", "TruthfulQA proxy: mc2=0.4703 (n=100) ✅", "Composite: 95.84 → 73.45 (4-metric honest) ✅", "Navbar: Industry Leaderboard + Delta Compression links ✅", "Footer: NotebookLM Architecture Guide ✅", "Glossary: Regional Language Adapter + Thai Governance Boundary + ASEAN AI Governance ✅ (49+ terms)", "FAQ: Thai NLP deployment + regional compliance ✅"],
      tone: "border-violet-500/25 bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },
    {
      version: "Website v3.11.0",
      date: "2026-05-18",
      title: language === "th" ? "RCT Control Plane Runtime Article · lastReviewed Batch 5 · FAQ +2 · Glossary RCT Control Plane · GitHub Discussions Live · Test Count 1,272" : "RCT Control Plane Runtime Article · lastReviewed Batch 5 · FAQ +2 · Glossary RCT Control Plane · GitHub Discussions Live · Test Count 1,272",
      description: language === "th" ? "เผยแพร่ rct-control-plane-governance-at-runtime.mdx (Phase 2 Article 3) อธิบาย runtime policy enforcement, constitutional enforcement at every LLM call, JITNA gating และ audit trail generation อัปเดต lastReviewed batch 5 ครอบคลุม 6 ไฟล์ (thai-ai, pdpa, constitutional-ai EN+TH → 2026-05-14) เพิ่ม FAQ +2 Q&As: zero-unmanaged-LLM calls + Specialist Studio industry adaptation เพิ่ม Glossary: RCT Control Plane (46+ terms total) อัปเดต GitHub Discussions status จาก Coming May 2026 → Live อัปเดต public SDK test count จาก 1,193 → 1,272 (CI clean: 0 skipped · 0 warnings · mypy clean · ruff clean) อัปเดต roadmap-preview EN+TH + open-source-launch article ให้ตรงกับสถานะจริง" : "Published rct-control-plane-governance-at-runtime.mdx (Phase 2 Article 3) explaining runtime policy enforcement, constitutional enforcement at every LLM call, JITNA gating, and audit trail generation. Updated lastReviewed batch 5 across 6 files (thai-ai, pdpa, constitutional-ai EN+TH → 2026-05-14). Added FAQ +2 Q&As: zero-unmanaged-LLM calls + Specialist Studio industry adaptation. Added Glossary: RCT Control Plane (46+ terms total). Updated GitHub Discussions status from Coming May 2026 → Live. Updated public SDK test count from 1,193 → 1,272 (CI clean: 0 skipped · 0 warnings · mypy clean · ruff clean). Updated roadmap-preview EN+TH + open-source-launch article to reflect actual current state.",
      icon: Zap,
      highlights: language === "th" ? ["rct-control-plane-governance-at-runtime.mdx EN ✅ (Phase 2 Article 3)", "lastReviewed batch 5: thai-ai + pdpa + constitutional-ai EN+TH → 2026-05-14 ✅", "FAQ technical: zero-unmanaged-LLM calls ✅", "FAQ technical: Specialist Studio industry adaptation ✅", "Glossary: RCT Control Plane ✅ (46+ terms total)", "GitHub Discussions: Coming May 2026 → Live ✅", "SDK test count: 1,193 → 1,272 · CI clean · mypy OK · ruff OK ✅", "roadmap-preview EN+TH: test counts + status synced ✅", "open-source-launch: Discussions status updated ✅", "specialist-studio-explained: lastReviewed 2026-05-11 → 2026-05-18 ✅"] : ["rct-control-plane-governance-at-runtime.mdx EN ✅ (Phase 2 Article 3)", "lastReviewed batch 5: thai-ai + pdpa + constitutional-ai EN+TH → 2026-05-14 ✅", "FAQ technical: zero-unmanaged-LLM calls ✅", "FAQ technical: Specialist Studio industry adaptation ✅", "Glossary: RCT Control Plane ✅ (46+ terms total)", "GitHub Discussions: Coming May 2026 → Live ✅", "SDK test count: 1,193 → 1,272 · CI clean · mypy OK · ruff OK ✅", "roadmap-preview EN+TH: test counts + status synced ✅", "open-source-launch: Discussions status updated ✅", "specialist-studio-explained: lastReviewed 2026-05-11 → 2026-05-18 ✅"],
      tone: "border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      version: "Website v3.10.0",
      date: "2026-05-13",
      title: language === "th" ? "TH Bilingual Parity +7 บทความ · FAQ JITNA Tiers + PDPA · Glossary JITNA Assembly + Constitutional Prohibition · 44 terms" : "TH Bilingual Parity +7 articles · FAQ JITNA Tiers + PDPA · Glossary JITNA Assembly + Constitutional Prohibition · 44 terms",
      description: language === "th" ? "เพิ่ม TH variants 7 บทความที่ค้างอยู่: constitutional-ai-vs-rag-comparison, evaluation-harnesses-enterprise-llm, rct-ecosystem-4849-tests-methodology, designing-low-hallucination-ai-systems, enterprise-ai-memory-systems-explained, how-to-evaluate-enterprise-ai-platforms, v2-7-enterprise-integration-suite — bilingual parity ครบ 35/35 คู่ เพิ่ม FAQ +2 Q&As: Tier 3 vs Tier 9 JITNA Protocol (technical) และ PDPA data residency (deployment) เพิ่ม Glossary +2 terms: JITNA Assembly + Constitutional Prohibition (44 terms total)" : "Added TH variants for 7 pending articles: constitutional-ai-vs-rag-comparison, evaluation-harnesses-enterprise-llm, rct-ecosystem-4849-tests-methodology, designing-low-hallucination-ai-systems, enterprise-ai-memory-systems-explained, how-to-evaluate-enterprise-ai-platforms, v2-7-enterprise-integration-suite — bilingual parity now 35/35 pairs. Added FAQ +2 Q&As: Tier 3 vs Tier 9 JITNA Protocol (technical) and PDPA data residency (deployment). Added Glossary +2 terms: JITNA Assembly + Constitutional Prohibition (44 terms total).",
      icon: Globe,
      highlights: language === "th" ? ["constitutional-ai-vs-rag-comparison.th.mdx ✅ (11 min)", "evaluation-harnesses-enterprise-llm.th.mdx ✅ (12 min)", "rct-ecosystem-4849-tests-methodology.th.mdx ✅ (7 min)", "designing-low-hallucination-ai-systems.th.mdx ✅ (9 min)", "enterprise-ai-memory-systems-explained.th.mdx ✅ (9 min)", "how-to-evaluate-enterprise-ai-platforms.th.mdx ✅ (8 min)", "v2-7-enterprise-integration-suite.th.mdx ✅ (5 min)", "FAQ technical: Tier 3 vs Tier 9 JITNA ✅", "FAQ deployment: PDPA data residency ✅", "Glossary: JITNA Assembly ✅", "Glossary: Constitutional Prohibition ✅ (44 terms total)", "Bilingual parity 35/35 pairs ✅"] : ["constitutional-ai-vs-rag-comparison.th.mdx ✅ (11 min)", "evaluation-harnesses-enterprise-llm.th.mdx ✅ (12 min)", "rct-ecosystem-4849-tests-methodology.th.mdx ✅ (7 min)", "designing-low-hallucination-ai-systems.th.mdx ✅ (9 min)", "enterprise-ai-memory-systems-explained.th.mdx ✅ (9 min)", "how-to-evaluate-enterprise-ai-platforms.th.mdx ✅ (8 min)", "v2-7-enterprise-integration-suite.th.mdx ✅ (5 min)", "FAQ technical: Tier 3 vs Tier 9 JITNA ✅", "FAQ deployment: PDPA data residency ✅", "Glossary: JITNA Assembly ✅", "Glossary: Constitutional Prohibition ✅ (44 terms total)", "Bilingual parity 35/35 pairs ✅"],
      tone: "border-blue-500/25 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      version: "Website v3.9.0",
      date: "2026-05-12",
      title: language === "th" ? "7 Genome System + Knowledge Vault + Platform Roadmap + Trading Case Study EN+TH · FAQ +2 · Glossary +2" : "7 Genome System + Knowledge Vault + Platform Roadmap + Trading Case Study EN+TH · FAQ +2 · Glossary +2",
      description: language === "th" ? "เผยแพร่ 4 บทความ Phase 2 ที่ค้างอยู่พร้อมกัน: rct-7-genome-system EN+TH (11 min) อธิบาย G1–G7 circular architecture; knowledge-vault-architecture EN+TH (10 min) อธิบาย Vault-1068 constitutional static knowledge store; delentia-os-roadmap-preview EN+TH (9 min) จาก v1.0.2a0 ถึง ASEAN Expansion 2027; institutional-grade-ai-trading-delentia-os EN+TH (14 min) blueprint FDIA+SignedAI+Delta Engine สำหรับ institutional trading เพิ่ม FAQ +2 Q&As: Specialist Studio + 7 Genome System เพิ่ม Glossary +2 terms: Genome System + Runtime Policy Enforcement (42 terms total) เพิ่ม delentia-os docs cross-links: genome-system.md, vault-1068.md, trading-agent-architecture.md" : "Published 4 pending Phase 2 articles simultaneously: rct-7-genome-system EN+TH (11 min) explaining G1–G7 circular architecture; knowledge-vault-architecture EN+TH (10 min) explaining Vault-1068 constitutional static knowledge store; delentia-os-roadmap-preview EN+TH (9 min) from v1.0.2a0 to ASEAN Expansion 2027; institutional-grade-ai-trading-delentia-os EN+TH (14 min) FDIA+SignedAI+Delta Engine blueprint for institutional trading. Added FAQ +2 Q&As: Specialist Studio + 7 Genome System. Added Glossary +2 terms: Genome System + Runtime Policy Enforcement (42 terms total). Added delentia-os docs cross-links: genome-system.md, vault-1068.md, trading-agent-architecture.md.",
      icon: Layers,
      highlights: language === "th" ? ["rct-7-genome-system EN+TH ✅ (G1–G7 circular loop, 11 min)", "knowledge-vault-architecture EN+TH ✅ (Vault-1068, constitutional store, 10 min)", "delentia-os-roadmap-preview EN+TH ✅ (v1.0.2a0→2027, 9 min)", "institutional-grade-ai-trading EN+TH ✅ (FDIA+SignedAI+Delta, 14 min)", "FAQ technical: Specialist Studio Q&A ✅", "FAQ technical: 7 Genome System Q&A ✅", "Glossary: Genome System ✅", "Glossary: Runtime Policy Enforcement ✅ (42 terms total)", "delentia-os docs: genome-system.md, vault-1068.md, trading-agent-architecture.md ✅"] : ["rct-7-genome-system EN+TH ✅ (G1–G7 circular loop, 11 min)", "knowledge-vault-architecture EN+TH ✅ (Vault-1068, constitutional store, 10 min)", "delentia-os-roadmap-preview EN+TH ✅ (v1.0.2a0→2027, 9 min)", "institutional-grade-ai-trading EN+TH ✅ (FDIA+SignedAI+Delta, 14 min)", "FAQ technical: Specialist Studio Q&A ✅", "FAQ technical: 7 Genome System Q&A ✅", "Glossary: Genome System ✅", "Glossary: Runtime Policy Enforcement ✅ (42 terms total)", "delentia-os docs: genome-system.md, vault-1068.md, trading-agent-architecture.md ✅"],
      tone: "border-purple-500/25 bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      version: "Website v3.8.0",
      date: "2026-05-11",
      title: language === "th" ? "specialist-studio-explained EN+TH · FAQ 2 Q&As · Glossary Intent Farming + Intent Signal" : "specialist-studio-explained EN+TH · FAQ 2 Q&As · Glossary Intent Farming + Intent Signal",
      description: language === "th" ? "เผยแพร่ specialist-studio-explained EN+TH (deadline 17 พ.ค.) อธิบาย Domain-Specific AI Orchestration ผ่าน 7-Genome System, FDIA calibration, Verification Tiers และ 3.74× efficiency gain เพิ่ม FAQ 2 Q&As: Circuit Breaker (FDIA score <0.7, 7 fallback providers, 3 states) และ Intent Farming (RCTDB, Delta Engine warm recall <50ms, 3× cost reduction) ใน technical category เพิ่ม Glossary 2 terms: Intent Farming และ Intent Signal รวม Glossary 40 terms" : "Published specialist-studio-explained EN+TH (deadline 17 May) explaining Domain-Specific AI Orchestration via 7-Genome System, FDIA calibration, Verification Tiers, and 3.74× efficiency gain. Added FAQ 2 Q&As: Circuit Breaker (FDIA score <0.7, 7 fallback providers, 3 states) and Intent Farming (RCTDB, Delta Engine warm recall <50ms, 3× cost reduction) in technical category. Added Glossary 2 terms: Intent Farming and Intent Signal — total 40 terms.",
      icon: BookOpen,
      highlights: language === "th" ? ["specialist-studio-explained.mdx EN ✅ (13 min read)", "specialist-studio-explained.th.mdx TH ✅", "7-Genome orchestration · FDIA per-domain calibration · Verification Tiers", "3.74× efficiency: pre-filtering 40% + right-sizing 35% + retry 25%", "FAQ technical: Circuit Breaker Q&A ✅", "FAQ technical: Intent Farming Q&A ✅", "Glossary: Intent Farming ✅", "Glossary: Intent Signal ✅ (40 terms total)"] : ["specialist-studio-explained.mdx EN ✅ (13 min read)", "specialist-studio-explained.th.mdx TH ✅", "7-Genome orchestration · FDIA per-domain calibration · Verification Tiers", "3.74× efficiency: pre-filtering 40% + right-sizing 35% + retry 25%", "FAQ technical: Circuit Breaker Q&A ✅", "FAQ technical: Intent Farming Q&A ✅", "Glossary: Intent Farming ✅", "Glossary: Intent Signal ✅ (40 terms total)"],
      tone: "border-blue-500/25 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      version: "Website v3.7.0",
      date: "2026-05-07",
      title: language === "th" ? "README overhaul 15-point · rct-control-plane EN+TH · LCP Space Grotesk fix · lastReviewed Batch 4" : "README overhaul 15-point · rct-control-plane EN+TH · LCP Space Grotesk fix · lastReviewed Batch 4",
      description: language === "th" ? "เขียน README.md ใหม่ทั้งหมด 240 → 593 บรรทัด คะแนน 13/200 → 175/200 พร้อม 19 sections, FDIA equation, Key Metrics table, Architecture diagram เผยแพร่ rct-control-plane-governance-layer EN+TH (8 วันก่อนกำหนด) แก้ไข Space Grotesk display:optional + font preload hints → LCP EN 5,056ms → 4,589ms อัปเดต lastReviewed batch 4 ครอบคลุม 22 ไฟล์ทั้งหมดที่ค้างอยู่" : "Complete README.md rewrite from 240 → 593 lines, score 13/200 → 175/200 with 19 sections, FDIA equation, Key Metrics table, Architecture ASCII diagram. Published rct-control-plane-governance-layer EN+TH (8 days early). Fixed Space Grotesk display:optional + font preload hints → LCP EN 5,056ms → 4,589ms. Applied lastReviewed batch 4 to 22 files.",
      icon: Rocket,
      highlights: language === "th" ? ["README.md 240 → 593 บรรทัด · คะแนน 13 → 175/200", "19 sections: FDIA equation, Key Metrics, Architecture diagram", "rct-control-plane-governance-layer EN+TH (8 วันก่อนกำหนด)", "Space Grotesk display:optional + font preload", "LCP EN 5,056ms → 4,589ms ✅", "lastReviewed batch 4: 22 ไฟล์ → 2026-05-07"] : ["README.md 240 → 593 lines · score 13 → 175/200", "19 sections: FDIA equation, Key Metrics, Architecture diagram", "rct-control-plane-governance-layer EN+TH (8 days early)", "Space Grotesk display:optional + font preload", "LCP EN 5,056ms → 4,589ms ✅", "lastReviewed batch 4: 22 files → 2026-05-07"],
      tone: "border-green-500/25 bg-green-500/10 text-green-600 dark:text-green-400",
    },
    {
      version: "Website v3.6.1",
      date: "2026-05-06",
      title: language === "th" ? "lastReviewed Batch 3 · TH variants 3 บทความ · rct-7, intent-ops, verification" : "lastReviewed Batch 3 · 3 new TH variants · rct-7, intent-ops, verification",
      description: language === "th" ? "อัปเดต lastReviewed rolling batch 3: 12 ไฟล์ Priority A (fdia, jitna, mee, moip, intent-OS, evaluation-harnesses) จาก 2026-04-16/17/22/23 → 2026-05-06 เพิ่มความแข็งแกร่งของ dateModified freshness signal สำหรับ core protocol cluster เพิ่ม TH variants 3 บทความใหม่: rct-7-process-explained, understanding-intent-operations, verification-vs-prompt-engineering — เพิ่ม bilingual coverage เป็น 22/29 คู่" : "Applied lastReviewed rolling batch 3 to 12 Priority A files (fdia, jitna, mee, moip, intent-OS, evaluation-harnesses) from 2026-04-16/17/22/23 → 2026-05-06, strengthening dateModified freshness signal for core protocol cluster. Added 3 new TH variants: rct-7-process-explained, understanding-intent-operations, verification-vs-prompt-engineering — bilingual coverage now 22/29 pairs.",
      icon: BookOpen,
      highlights: language === "th" ? ["lastReviewed batch 3: 12 ไฟล์ Priority A → 2026-05-06", "fdia-equation EN+TH (2026-04-17 → 05-06)", "jitna-language EN+TH (04-17/22 → 05-06)", "mee-meta-evolution EN+TH (04-22 → 05-06)", "moip EN+TH (04-23 → 05-06)", "intent-OS EN+TH (04-16 → 05-06, เก่าสุด)", "rct-7-process-explained.th.mdx ✅ ใหม่", "understanding-intent-operations.th.mdx ✅ ใหม่", "verification-vs-prompt-engineering.th.mdx ✅ ใหม่"] : ["lastReviewed batch 3: 12 Priority A files → 2026-05-06", "fdia-equation EN+TH (2026-04-17 → 05-06)", "jitna-language EN+TH (04-17/22 → 05-06)", "mee-meta-evolution EN+TH (04-22 → 05-06)", "moip EN+TH (04-23 → 05-06)", "intent-OS EN+TH (04-16 → 05-06, oldest)", "rct-7-process-explained.th.mdx ✅ new", "understanding-intent-operations.th.mdx ✅ new", "verification-vs-prompt-engineering.th.mdx ✅ new"],
      tone: "border-green-500/25 bg-green-500/10 text-green-600 dark:text-green-400",
    },
    {
      version: "Website v3.6.0",
      date: "2026-05-05",
      title: language === "th" ? "Phase 2 blog batch · TH variants 5 บทความ · circuit-breaker EN+TH · intent-farming EN+TH · lastReviewed rolling" : "Phase 2 blog batch · 5 TH variants · circuit-breaker EN+TH · intent-farming EN+TH · lastReviewed rolling",
      description: language === "th" ? "เผยแพร่ Phase 2 blog batch ล่วงหน้าแผน 3–19 วัน: circuit-breaker-pattern EN+TH, intent-farming EN+TH, reverse-component TH, delentia-os-launch TH, intent-OS TH รวม 7 บทความใหม่ อัปเดต lastReviewed rolling batch 10 ไฟล์ (signedai, delta-engine, RCTDB, hexacore, multi-agent) เป็น 2026-05-05 เพื่อเพิ่ม dateModified freshness signal" : "Published Phase 2 blog batch 3–19 days ahead of schedule: circuit-breaker-pattern EN+TH, intent-farming EN+TH, reverse-component TH, delentia-os-launch TH, intent-OS TH — 7 new articles total. Applied lastReviewed rolling batch to 10 files (signedai, delta-engine, RCTDB, hexacore, multi-agent) → 2026-05-05 for dateModified freshness signal.",
      icon: Rocket,
      highlights: language === "th" ? ["circuit-breaker-pattern EN+TH (ล่วงหน้า 3 วัน)", "intent-farming EN+TH (ล่วงหน้า 6 วัน)", "reverse-component TH (ล่วงหน้า 12 วัน)", "delentia-os-launch TH (ล่วงหน้า 19 วัน)", "intent-OS TH (ล่วงหน้า 9 วัน)", "lastReviewed rolling 10 ไฟล์ → 2026-05-05", "dateModified freshness signal เพิ่มขึ้น"] : ["circuit-breaker-pattern EN+TH (3 days early)", "intent-farming EN+TH (6 days early)", "reverse-component TH (12 days early)", "delentia-os-launch TH (19 days early)", "intent-OS TH (9 days early)", "lastReviewed rolling 10 files → 2026-05-05", "dateModified freshness signal strengthened"],
      tone: "border-green-500/25 bg-green-500/10 text-green-600 dark:text-green-400",
    },
    {
      version: "Website v3.5.0",
      date: "2026-05-04",
      title: language === "th" ? "Ecosystem link hardening · platformDocs · /docs redirect · E-E-A-T sameAs · MkDocs canonical fix" : "Ecosystem link hardening · platformDocs · /docs redirect · E-E-A-T sameAs · MkDocs canonical fix",
      description: language === "th" ? "แก้ไข critical SEO bug ใน mkdocs.yml (site_url ชี้ผิดโดเมน) เพิ่ม platformDocs ใน SOCIAL_LINKS เพิ่มลิงก์ SDK Documentation ใน footer เพิ่ม redirect /docs → GitHub Pages ขยาย authors.ts sameAs จาก 3 เป็น 7 platforms เพิ่ม social icons LinkedIn + X/Twitter ใน MkDocs footer และอัปเดต README.md ด้วย Docs badge + author table ครบถ้วน" : "Fixed critical SEO canonical bug in mkdocs.yml (site_url was pointing to non-existent delentia.com/docs). Added platformDocs to SOCIAL_LINKS, SDK Documentation link in footer Technology column, /docs+/en/docs+/th/docs → GitHub Pages redirects, expanded authors.ts sameAs from 3 to 7 platforms for E-E-A-T, LinkedIn+X social icons in MkDocs footer, and README.md Docs badge + full author table.",
      icon: Globe,
      highlights: language === "th" ? ["mkdocs.yml site_url → GitHub Pages (critical fix)", "platformDocs ใน SOCIAL_LINKS", "SDK Documentation ใน footer Technology", "/docs redirect → delentia-labs.github.io/delentia-os", "sameAs ขยาย 3 → 7 platforms (E-E-A-T)", "MkDocs footer: LinkedIn + X icons", "SITE_VERSION → 2026.05 Snapshot"] : ["mkdocs.yml site_url → GitHub Pages (critical fix)", "platformDocs in SOCIAL_LINKS", "SDK Documentation in footer Technology column", "/docs redirect → delentia-labs.github.io/delentia-os", "sameAs expanded 3 → 7 platforms (E-E-A-T)", "MkDocs footer: LinkedIn + X icons", "SITE_VERSION → 2026.05 Snapshot"],
      tone: "border-green-500/25 bg-green-500/10 text-green-600 dark:text-green-400",
    },
    {
      version: "Website v3.4.0",
      date: "2026-04-30",
      title: language === "th" ? "MEE + MOIP blog batch · lcp-trace.mjs CI fix · SDK public launch" : "MEE + MOIP blog batch · lcp-trace.mjs CI fix · SDK public launch",
      description: language === "th" ? "เผยแพร่บทความ MEE และ MOIP (EN + TH) พร้อม article delentia-os open-source launch แก้ไข lcp-trace.mjs hang บน Linux CI ด้วย process group kill และอัปเดต sitemap lastmod เป็น hardcoded date" : "Published MEE and MOIP articles (EN + TH), delentia-os open-source launch article, fixed lcp-trace.mjs Linux CI hang via process group kill, and hardcoded SITE_LAST_DEPLOY for stable sitemap lastmod.",
      icon: Rocket,
      highlights: language === "th" ? ["MEE + MOIP articles EN + TH", "delentia-os launch article", "lcp-trace.mjs CI fix (process group kill)", "SITE_LAST_DEPLOY hardcoded", "hallucinationRate card ใน /benchmark"] : ["MEE + MOIP articles EN + TH", "delentia-os launch article", "lcp-trace.mjs CI fix (process group kill)", "SITE_LAST_DEPLOY hardcoded", "hallucinationRate card in /benchmark"],
      tone: "border-green-500/25 bg-green-500/10 text-green-600 dark:text-green-400",
    },
    {
      version: "SDK v1.0.2a0",
      date: "2026-04-30",
      title: language === "th" ? "Public Alpha Launch — 1,193 tests · 94% coverage · Apache 2.0" : "Public Alpha Launch — 1,193 tests · 94% coverage · Apache 2.0",
      description: language === "th" ? "เปิดตัว delentia-os public SDK บน GitHub (Apache 2.0) พร้อม 1,193 tests ผ่าน 94% coverage, 41 algorithms, 7 HexaCore models, GitHub Pages docs, Discussions, Milestones และ distribution docs ครบชุด" : "Launched delentia-os public SDK on GitHub (Apache 2.0) with 1,193 passing tests, 94% coverage, 41 algorithms, 7 HexaCore models, GitHub Pages docs, Discussions, Milestones, and full distribution docs.",
      icon: BookOpen,
      highlights: language === "th" ? ["1,193 tests · 94% coverage · 0 skips", "github.com/delentia-labs/delentia-os public", "41 algorithms · 7 HexaCore models", "GitHub Pages + Discussions + Milestones live", "CLAIM_REGISTRY + PLATFORM_KITS docs"] : ["1,193 tests · 94% coverage · 0 skips", "github.com/delentia-labs/delentia-os public", "41 algorithms · 7 HexaCore models", "GitHub Pages + Discussions + Milestones live", "CLAIM_REGISTRY + PLATFORM_KITS docs"],
      tone: "border-teal-500/25 bg-teal-500/10 text-teal-600 dark:text-teal-400",
    },
    {
      version: "Website v3.3.0",
      date: "2026-04-16",
      title: language === "th" ? "Mobile optimization + FAQ/Speakable schema + BLOG_RELATED_MAP 72 edges" : "Mobile optimization + FAQ/Speakable schema + BLOG_RELATED_MAP 72 edges",
      description: language === "th" ? "แก้ไข mobile layout บน 3 หน้า (genome, rct-7, rct-7-thinking) เพิ่ม FAQPage JSON-LD schema อัตโนมัติจาก H2 และ Speakable schema ใน BlogPosting JSON-LD เพิ่ม BLOG_RELATED_MAP 72 edges พร้อม Semantic Related Articles UI และแก้ไข GA4 CSP" : "Fixed mobile hero padding on 3 article pages, added FAQPage JSON-LD auto-extracted from H2 headings, Speakable schema in BlogPosting, BLOG_RELATED_MAP with 72 cluster edges, Semantic Related Articles UI, and GA4 CSP fix. Lighthouse mobile: 87–92 / 96 / 100 / 100.",
      icon: Rocket,
      highlights: language === "th" ? ["Mobile hero padding แก้ไขแล้ว 3 หน้า", "FAQPage JSON-LD จาก H2 headings", "Speakable schema ใน BlogPosting", "BLOG_RELATED_MAP 72 edges + Related Articles UI", "GA4 CSP fix (www.google.com)", "Lighthouse mobile 87–92/96/100/100"] : ["Mobile hero padding fixed on 3 pages", "FAQPage JSON-LD auto-extracted from H2", "Speakable schema in BlogPosting", "BLOG_RELATED_MAP 72 edges + Related Articles UI", "GA4 CSP fix (www.google.com added)", "Lighthouse mobile 87–92/96/100/100"],
      tone: "border-indigo-500/25 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    },
    {
      version: "Website v3.2.0",
      date: "2026-04-15",
      title: language === "th" ? "BLOG_HERO_METRICS 24/24 + getPostJourney() 11 rules + E-E-A-T evidence badges" : "BLOG_HERO_METRICS 24/24 + getPostJourney() 11 rules + E-E-A-T evidence badges",
      description: language === "th" ? "ขยาย BlogHeroMetric interface เป็น 8 fields พร้อม evidenceType, evidenceRef, evidenceNote และ verifiedAt เพิ่ม validateMetricSet() enforcement เพิ่ม evidence badges ใน article-hero.tsx และ StatGrid เพิ่ม 72 metric cards ครบทั้ง 24 slugs และ getPostJourney() 11 rules ครอบคลุม 23/24 blog cluster" : "Expanded BlogHeroMetric interface to 8 fields with evidence taxonomy (evidenceType, evidenceRef, evidenceNote, verifiedAt). Added validateMetricSet() enforcement, evidence badges in article-hero.tsx and StatGrid. All 24/24 BLOG_HERO_METRICS complete. getPostJourney() now has 11 specific rules covering 23/24 blog clusters. Lighthouse 77/100/100/100.",
      icon: BarChart3,
      highlights: language === "th" ? ["BlogHeroMetric interface 8 fields", "validateMetricSet() enforcement", "Evidence badges ใน article-hero + StatGrid", "BLOG_HERO_METRICS 24/24 slugs ✅", "getPostJourney() 11 rules", "Lighthouse 77/100/100/100"] : ["BlogHeroMetric interface 8 fields", "validateMetricSet() enforcement", "Evidence badges in article-hero + StatGrid", "BLOG_HERO_METRICS 24/24 slugs complete ✅", "getPostJourney() 11 rules", "Lighthouse 77/100/100/100"],
      tone: "border-blue-500/25 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      version: "Ecosystem v5.4.5",
      date: "2026-03-21",
      title: language === "th" ? "Backend Ecosystem v5.4.5 — 4,849 tests ผ่าน, Tier 8-9 algorithms สมบูรณ์" : "Backend Ecosystem v5.4.5 — 4,849 passing tests, Tier 8-9 algorithms complete",
      description: language === "th" ? "ระบบ backend ecosystem ผ่าน 4,849 automated tests บน CI/CD pipeline — Tier 8 (Synthesis) และ Tier 9 (Autonomy) algorithm tiers สมบูรณ์ครบถ้วน GitHub Actions pipeline ทำงานบนทุก PR" : "The backend ecosystem reached 4,849 passing automated tests across the CI/CD pipeline. Tier 8 (Synthesis) and Tier 9 (Autonomy) algorithm tiers are now complete, with GitHub Actions running on every PR.",
      icon: BookOpen,
      highlights: language === "th" ? ["4,849 tests (pytest + Hypothesis)", "Tier 8-9 algorithm rollout สมบูรณ์", "GitHub Actions CI/CD", "v5.4.5 released Mar 21, 2026"] : ["4,849 tests (pytest + Hypothesis)", "Tier 8-9 algorithm rollout complete", "GitHub Actions CI/CD", "v5.4.5 released Mar 21, 2026"],
      tone: "border-teal-500/25 bg-teal-500/10 text-teal-600 dark:text-teal-400",
    },
    {
      version: "v3.1.0",
      date: "2026-03-14",
      title: language === "th" ? "8-bit identity และการจัดระบบ navigation ใหม่" : "8-bit identity and navigation restructuring",
      description: language === "th" ? "เพิ่ม visual identity ใหม่ จัด navigation ใหม่ และทำให้ resource discovery ชัดขึ้นทั่วระบบ." : "Introduced the new visual identity, navigation overhaul, and clearer resource discovery across the site.",
      icon: Sparkles,
      highlights: language === "th" ? ["new identity system", "navigation overhaul", "resource discovery"] : ["new identity system", "navigation overhaul", "resource discovery"],
      tone: "border-violet-500/25 bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },
    {
      version: "v3.0.0",
      date: "2026-03-14",
      title: language === "th" ? "AI assistant v3 และ interactive FDIA demo" : "AI assistant v3 and interactive FDIA demo",
      description: language === "th" ? "ยกระดับ AI assistant ให้รู้จักโครงสร้างเว็บและเพิ่ม FDIA interaction surfaces สำหรับการสาธิต." : "Upgraded the AI assistant with site knowledge and added richer FDIA interaction surfaces for demonstration.",
      icon: Zap,
      highlights: language === "th" ? ["site-aware assistant", "interactive FDIA", "research evidence cards"] : ["site-aware assistant", "interactive FDIA", "research evidence cards"],
      tone: "border-sky-500/25 bg-sky-500/10 text-sky-600 dark:text-sky-400",
    },
    {
      version: "v2.7.0",
      date: "2026-03-13",
      title: language === "th" ? "ระบบฟอนต์ใหม่และการปรับประสิทธิภาพ" : "Font system overhaul and performance tuning",
      description: language === "th" ? "เปลี่ยนระบบ typography และจัดการการโหลดฟอนต์ให้สอดคล้องกับการใช้งานสองภาษา." : "Rebuilt the typography system and tuned font loading for bilingual usage.",
      icon: Globe,
      highlights: language === "th" ? ["Space Grotesk + Kanit", "Thai subtitle tuning", "font preloading"] : ["Space Grotesk + Kanit", "Thai subtitle tuning", "font preloading"],
      tone: "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      version: "v2.5.0",
      date: "2026-03-12",
      title: language === "th" ? "benchmark dashboard แบบ interactive" : "Interactive benchmark dashboard",
      description: language === "th" ? "เพิ่ม benchmark surfaces ที่เปรียบเทียบประสิทธิภาพและคุณภาพได้ชัดขึ้นสำหรับคนประเมินระบบ." : "Added richer benchmark surfaces for teams evaluating performance and quality trade-offs.",
      icon: BarChart3,
      highlights: language === "th" ? ["radar and bar charts", "animated metrics", "platform comparison"] : ["radar and bar charts", "animated metrics", "platform comparison"],
      tone: "border-orange-500/25 bg-orange-500/10 text-orange-600 dark:text-orange-400",
    },
    {
      version: "v2.0.0",
      date: "2026-03-11",
      title: language === "th" ? "multi-page SEO architecture" : "Multi-page SEO architecture",
      description: language === "th" ? "ขยายจากหน้าเดี่ยวไปสู่ระบบหลายหน้า พร้อม hubs สำหรับ solutions, products และ protocols." : "Expanded from a single experience into a multi-page system with hubs for solutions, products, and protocols.",
      icon: Layers,
      highlights: language === "th" ? ["resource hubs", "SEO silos", "protocol and product routes"] : ["resource hubs", "SEO silos", "protocol and product routes"],
      tone: "border-warm-amber/25 bg-warm-amber/10 text-warm-amber",
    },
  ]

  return (
    <ResourcePageShell
      eyebrow={language === "th" ? "Track / Changelog" : "Track / Changelog"}
      title={language === "th" ? "ประวัติเวอร์ชันและการเปลี่ยนแปลงเชิงระบบของ RCT" : "Version history and system-level change tracking for RCT"}
      description={language === "th" ? "Changelog ถูกจัดใหม่ให้เป็น track layer ของ resource system ใช้ดูการเปลี่ยนแปลงของ product, IA และ technical direction แบบตามลำดับเวลา." : "The changelog is restructured as the track layer of the resource system so teams can follow product, IA, and technical direction changes over time."}
      taxonomy={language === "th" ? ["Release history", "Feature milestones", "Platform evolution", "Track layer"] : ["Release history", "Feature milestones", "Platform evolution", "Track layer"]}
      accent="terracotta"
      actions={[
        { href: `${localePrefix}/research`, label: language === "th" ? "เปิด research archive" : "Open research archive", variant: "primary" },
        { href: `${localePrefix}/roadmap`, label: language === "th" ? "เปิด roadmap" : "Open roadmap", variant: "secondary" },
        { href: `${localePrefix}/docs`, label: language === "th" ? "เปิด docs" : "Open docs", variant: "secondary" },
      ]}
      stats={[
        { label: language === "th" ? "Tracked milestones" : "Tracked milestones", value: String(releases.length), detail: language === "th" ? "curated major changes" : "curated major changes" },
        { label: language === "th" ? "Current release" : "Current release", value: releases[0].version, detail: language === "th" ? "latest public version marker" : "latest public version marker" },
        { label: language === "th" ? "Neighbor routes" : "Neighbor routes", value: "Roadmap / Research", detail: language === "th" ? "context around forward and backward change" : "context around forward and backward change" },
        { label: language === "th" ? "Primary audience" : "Primary audience", value: language === "th" ? "Operators + Evaluators" : "Operators + Evaluators", detail: language === "th" ? "teams tracking release movement" : "teams tracking release movement" },
      ]}
      footerTitle={language === "th" ? "อ่าน changelog คู่กับ roadmap และ research" : "Read the changelog together with roadmap and research"}
      footerDescription={language === "th" ? "Changelog บอกว่าอะไรเปลี่ยน Roadmap บอกว่าจะไปไหน และ Research บอกว่าทำไมการเปลี่ยนแปลงนั้นสำคัญในเชิงระบบ." : "The changelog shows what changed, the roadmap shows where the platform is heading, and research explains why those changes matter at the system level."}
      footerActions={[
        { href: `${localePrefix}/roadmap`, label: language === "th" ? "ไปหน้า roadmap" : "Go to roadmap", variant: "primary" },
        { href: `${localePrefix}/research`, label: language === "th" ? "ไปหน้า research" : "Go to research", variant: "secondary" },
      ]}
    >
      <ResourceSection
        eyebrow={language === "th" ? "Recent milestones" : "Recent milestones"}
        title={language === "th" ? "การเปลี่ยนแปลงหลักที่ควรอ่านก่อน" : "The primary milestones worth reading first"}
        description={language === "th" ? "สรุปเฉพาะ milestone ที่ขยับโครงสร้าง product หรือเปลี่ยนประสบการณ์ของผู้ใช้และทีม implement อย่างมีนัยสำคัญ." : "This view focuses on the milestones that materially changed product structure or the experience of users and implementation teams."}
      >
        <div className="space-y-5">
          {releases.map((release) => {
            const Icon = release.icon

            return (
              <article key={release.version} className="rounded-3xl border border-border/70 bg-card/90 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.04)] md:p-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${release.tone}`}>
                        {release.version}
                      </span>
                      <span className="text-sm text-muted-foreground">{release.date}</span>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-foreground md:text-3xl">{release.title}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">{release.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {release.highlights.map((highlight) => (
                        <span key={highlight} className="rounded-full border border-border bg-background/75 px-3 py-1 text-xs text-muted-foreground">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-background/75 text-warm-amber">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </ResourceSection>

      <ResourceSection
        eyebrow={language === "th" ? "Operational follow-up" : "Operational follow-up"}
        title={language === "th" ? "หน้าที่ควรใช้ประกอบหลังจากเห็นการเปลี่ยนแปลง" : "The pages to pair with the changelog after you see a platform change"}
        description={language === "th" ? "ช่วยแยกว่าควรไป research เพื่อดูรากฐานทางเทคนิค หรือไป roadmap เพื่อดูทิศทางถัดไป." : "This helps separate whether you should continue into research for technical grounding or into roadmap for forward direction."}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            {
              title: language === "th" ? "จับคู่กับ research archive" : "Pair it with the research archive",
              description: language === "th" ? "ใช้เมื่อ release ที่เห็นมีผลต่อ protocol, runtime, benchmark หรือ trust layer และต้องการหลักฐานเชิงลึกเพิ่ม." : "Use this when a release affects protocol, runtime, benchmark, or trust layers and you need deeper technical grounding.",
              href: `${localePrefix}/research`,
              icon: BookOpen,
            },
            {
              title: language === "th" ? "จับคู่กับ roadmap" : "Pair it with the roadmap",
              description: language === "th" ? "ใช้เมื่ออยากรู้ว่าสิ่งที่เปลี่ยนล่าสุดกำลังพา platform ไปทางไหนในรอบต่อไป." : "Use this when you want to see what the latest changes imply for the next platform direction.",
              href: `${localePrefix}/roadmap`,
              icon: Rocket,
            },
          ].map((item) => {
            const Icon = item.icon

            return (
              <a key={item.href} href={item.href} className="group rounded-3xl border border-border/70 bg-card/90 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.04)] transition hover:border-warm-amber/35 hover:shadow-[0_18px_42px_rgba(0,0,0,0.06)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background/75 text-warm-amber">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground transition group-hover:text-warm-amber">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </a>
            )
          })}
        </div>
      </ResourceSection>
    </ResourcePageShell>
  )
}
