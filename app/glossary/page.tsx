import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getDefinedTermSchema } from "@/lib/schema"

const glossaryTerms = [
  // ─── Core RCT Concepts ───────────────────────────────────────────
  {
    term: "FDIA Equation",
    termTh: "สมการ FDIA",
    definition: "F = (D^I) × A — A constitutional equation where Future output (F) is determined by Data quality (D) raised to the power of Intent (I), multiplied by Architect authorization (A). When A=0, F=0 always.",
    definitionTh: "F = (D^I) × A — สมการรัฐธรรมนูญที่กำหนดคุณภาพผลลัพธ์ (F) จากคุณภาพข้อมูล (D) ยกกำลัง Intent (I) คูณด้วยการอนุมัติของ Architect (A) เมื่อ A=0 ผลลัพธ์จะเป็นศูนย์เสมอ",
    entityHref: "/en/entity/fdia-equation",
  },
  {
    term: "JITNA Protocol",
    termTh: "โปรโตคอล JITNA",
    definition: "Just In Time Nodal Assembly — an open agent-to-agent communication protocol (RFC-001 v2.0) often called 'the HTTP of Agentic AI.' Defines PROPOSE → COUNTER → ACCEPT negotiation flow with Ed25519 signatures.",
    definitionTh: "Just In Time Nodal Assembly — โปรโตคอลสื่อสารระหว่าง AI Agents แบบ open standard (RFC-001 v2.0) มักเรียกว่า 'HTTP ของ Agentic AI' กำหนด flow PROPOSE → COUNTER → ACCEPT พร้อมลายเซ็น Ed25519",
    entityHref: "/en/entity/jitna-protocol",
  },
  {
    term: "SignedAI",
    termTh: "SignedAI",
    definition: "The multi-LLM consensus verification system of the RCT Ecosystem. Routes critical queries through 4–8 models simultaneously and requires agreement before releasing results. Achieves 0.3% hallucination rate vs 12–15% industry average.",
    definitionTh: "ระบบตรวจสอบ consensus หลาย LLM ของ RCT Ecosystem ส่งคำถามสำคัญผ่าน 4–8 โมเดลพร้อมกัน และต้องการ agreement ก่อนส่งผลลัพธ์ ลด hallucination rate เหลือ 0.3%",
    entityHref: "/en/entity/governance-layer",
  },
  {
    term: "RCTDB",
    termTh: "RCTDB (ฐานข้อมูลหน่วยความจำ AI)",
    definition: "Universal memory schema with 8 dimensions: query_hash, fdia_scores, subject_uuid, model_chain, consensus_result, delta_chain, timestamp, provenance. Enables PDPA-compliant right to erasure via UUID tombstone pattern.",
    definitionTh: "Schema หน่วยความจำ AI ที่ครอบคลุม 8 มิติ: query_hash, fdia_scores, subject_uuid, model_chain, consensus_result, delta_chain, timestamp, provenance รองรับ right to erasure ตาม PDPA",
    entityHref: "/en/entity/memory-architecture",
  },
  {
    term: "Delta Engine",
    termTh: "Delta Engine (เครื่องยนต์เดลต้า)",
    definition: "Memory compression system that stores only incremental state changes (deltas) rather than full state snapshots. Achieves 74% average lossless compression with sub-1ms reconstruction, enabling warm recall under 50ms.",
    definitionTh: "ระบบบีบอัดหน่วยความจำที่เก็บเฉพาะการเปลี่ยนแปลง (deltas) แทนสถานะเต็ม บีบอัดได้ 74% แบบ lossless พร้อม warm recall ต่ำกว่า 50ms",
    entityHref: "/en/entity/memory-architecture",
  },
  {
    term: "HexaCore",
    termTh: "HexaCore (โครงสร้าง 7 โมเดล AI)",
    definition: "The 7-model AI infrastructure of the RCT Ecosystem: 3 Western models + 3 Eastern models + 1 Thai regional model (Typhoon v2). Provides 3.74x cost reduction vs single-model deployments through intelligent task routing.",
    definitionTh: "โครงสร้าง AI 7 โมเดลของ RCT Ecosystem: โมเดลตะวันตก 3 ตัว + ตะวันออก 3 ตัว + ไทย 1 ตัว (Typhoon v2) ลดต้นทุน 3.74 เท่าด้วย intelligent routing",
    entityHref: "/en/entity/governance-layer",
  },
  {
    term: "HexaCore Consensus",
    termTh: "HexaCore Consensus (กลไกฉันทามติ HexaCore)",
    definition: "The agreement mechanism within the HexaCore 7-model system where multiple AI models evaluate the same query simultaneously and a constitutional threshold (Tier 4: 50%, Tier 6: 67%, Tier 8: 75%, Tier S: 100%) must be met before any output is released. Prevents model-specific bias from reaching enterprise systems.",
    definitionTh: "กลไก agreement ภายในระบบ 7 โมเดล HexaCore ที่โมเดลหลายตัวประเมิน query พร้อมกัน และต้องผ่าน threshold รัฐธรรมนูญ (Tier 4: 50%, Tier 6: 67%, Tier 8: 75%, Tier S: 100%) ก่อนปล่อยผลลัพธ์ ป้องกัน model-specific bias เข้าสู่ระบบองค์กร",
    entityHref: "/en/entity/governance-layer",
  },
  {
    term: "MEE (Multi-Expert Evaluator)",
    termTh: "MEE (Multi-Expert Evaluator — ผู้ประเมินหลายผู้เชี่ยวชาญ)",
    definition: "A constitutional AI evaluation framework where multiple domain-specific expert models assess a single output from independent perspectives. Unlike SignedAI's consensus-by-agreement, MEE uses weighted scoring across specialized evaluators (accuracy, safety, compliance, domain-knowledge) before a final verdict is issued. Designed for high-stakes enterprise decisions where a single evaluator's blind spots are unacceptable.",
    definitionTh: "Framework การประเมิน AI แบบรัฐธรรมนูญที่โมเดล expert หลายตัวประเมิน output เดียวจากมุมมองอิสระ ต่างจาก SignedAI ที่ใช้ consensus-by-agreement — MEE ใช้ weighted scoring จาก evaluators เฉพาะทาง (accuracy, safety, compliance, domain-knowledge) ก่อนออก verdict สุดท้าย ออกแบบสำหรับการตัดสินใจระดับองค์กรที่ blind spots ของ evaluator เดียวยอมรับไม่ได้",
    entityHref: "/en/entity/governance-layer",
  },
  // ─── Reliability & Fault Tolerance ────────────────────────────
  {
    term: "Circuit Breaker Pattern",
    termTh: "Circuit Breaker Pattern (รูปแบบตัวตัดวงจร)",
    definition: "A fault-tolerance design pattern borrowed from electrical engineering that prevents cascade failures in distributed AI systems. Has three states: CLOSED (normal operation — requests flow through), OPEN (failure threshold exceeded — requests blocked and fallback providers used), HALF-OPEN (test mode — limited traffic checks recovery). In the RCT Platform, the FDIA score acts as the trip signal: when F drops below 0.7 the breaker opens. RFC-006 Fault Isolation implements this across all 62 microservices with 7 fallback LLM providers.",
    definitionTh: "รูปแบบ fault-tolerance ที่ยืมมาจากวิศวกรรมไฟฟ้า ป้องกัน cascade failures ใน AI systems แบบ distributed มี 3 สถานะ: CLOSED (ปกติ), OPEN (บล็อก failures ใช้ fallback), HALF-OPEN (ทดสอบ recovery) ใน RCT Platform คะแนน FDIA ทำหน้าที่เป็น trip signal: เมื่อ F < 0.7 breaker จะ open — RFC-006 Fault Isolation ใช้งานทั่ว 62 microservices พร้อม 7 fallback LLM providers",
    entityHref: "/en/blog/circuit-breaker-pattern-ai-systems",
  },
  {
    term: "Fault Isolation Layer",
    termTh: "Fault Isolation Layer (ชั้นแยกความผิดพลาด)",
    definition: "RFC-006 of the RCT Platform — an architectural boundary that contains failures within a single service or agent, preventing them from propagating across the entire system. When a component's FDIA score drops below threshold, the isolation layer automatically routes around the failing component and activates a fallback provider. Combined with the Circuit Breaker Pattern, this enables the RCT Ecosystem to maintain 99.9% uptime SLA across 62 microservices.",
    definitionTh: "RFC-006 ของ RCT Platform — ขอบเขตสถาปัตยกรรมที่กักความผิดพลาดไว้ใน service หรือ agent เดียว ป้องกันไม่ให้แพร่กระจายทั่วระบบ เมื่อคะแนน FDIA ของส่วนประกอบต่ำกว่า threshold ชั้นนี้จะ route อัตโนมัติข้ามส่วนที่ล้มเหลวและเปิดใช้ fallback provider ทำให้ RCT Ecosystem รักษา uptime SLA 99.9% ทั่ว 62 microservices",
    entityHref: "/en/blog/circuit-breaker-pattern-ai-systems",
  },
  // ─── Constitutional AI Concepts ────────────────────────────────
  {
    term: "Constitutional AI",
    termTh: "Constitutional AI (AI แบบรัฐธรรมนูญ)",
    definition: "A governance-oriented approach where model behavior and system operation are shaped by explicit rules, review logic, and safety boundaries rather than by output generation alone.",
    definitionTh: "แนวทางการออกแบบระบบ AI ที่กำหนดพฤติกรรมผ่านกฎ ขอบเขตความปลอดภัย และตรรกะการตรวจทานอย่างชัดเจน",
  },
  {
    term: "Constitutional Kill Switch",
    termTh: "Constitutional Kill Switch (สวิตช์หยุดรัฐธรรมนูญ)",
    definition: "In the RCT Ecosystem, when the FDIA Architect variable (A) is set to 0, all AI output is unconditionally blocked — F=0 regardless of input quality. This is implemented as a hard mathematical gate, not a soft preference.",
    definitionTh: "ในระบบ RCT เมื่อตัวแปร Architect (A) ถูกตั้งเป็น 0 ผลลัพธ์ AI จะถูกบล็อกโดยสมบูรณ์ F=0 เสมอ ไม่ว่าคุณภาพข้อมูลจะเป็นเท่าไร",
    entityHref: "/en/entity/fdia-equation",
  },
  {
    term: "Deterministic AI",
    termTh: "Deterministic AI (AI แบบกำหนดได้แน่นอน)",
    definition: "An AI system property where identical inputs always produce identical outputs, or where safety constraints hold unconditionally regardless of model behavior. In the RCT Ecosystem, constitutional constraints (A=0→F=0) are deterministic.",
    definitionTh: "คุณสมบัติของระบบ AI ที่ input เดิมให้ output เดิม หรือ safety constraints ถูกบังคับใช้โดยไม่มีเงื่อนไข ใน RCT Ecosystem, A=0→F=0 เป็น deterministic",
  },
  {
    term: "Intent Operating System",
    termTh: "Intent Operating System (ระบบปฏิบัติการ Intent)",
    definition: "An AI orchestration layer that functions like an operating system — managing resource allocation (model routing), access control (FDIA gate), state management (RCTDB), and audit trails (provenance). The RCT Ecosystem is an Intent OS.",
    definitionTh: "ชั้น orchestration ของ AI ที่ทำหน้าที่เหมือน OS — จัดการ resource allocation, access control (FDIA), state management (RCTDB), และ audit trails",
  },
  // ─── AI Architecture Concepts ──────────────────────────────────
  {
    term: "Agentic AI",
    termTh: "Agentic AI (AI แบบมีตัวแทน)",
    definition: "AI systems that can autonomously plan, execute, and iterate on multi-step tasks without requiring step-by-step human instruction. Agentic AI requires inter-agent communication standards like JITNA.",
    definitionTh: "ระบบ AI ที่สามารถวางแผน ดำเนินการ และทำซ้ำในงานหลายขั้นตอนได้โดยอัตโนมัติ โดยไม่ต้องการคำสั่งมนุษย์ทีละขั้น",
    entityHref: "/en/entity/jitna-protocol",
  },
  {
    term: "Multi-LLM Consensus",
    termTh: "Multi-LLM Consensus (ฉันทามติหลาย LLM)",
    definition: "The practice of routing a query to multiple LLM providers simultaneously and requiring agreement between outputs before accepting results. Reduces hallucination by catching model-specific biases. Used in SignedAI (Tier 4/6/8).",
    definitionTh: "การส่ง query ไปยัง LLM หลายตัวพร้อมกัน และต้องการ agreement ระหว่างผลลัพธ์ก่อนยอมรับ ลด hallucination โดยตรวจจับ model-specific bias ใช้ใน SignedAI",
    entityHref: "/en/entity/governance-layer",
  },
  {
    term: "Dynamic Routing",
    termTh: "Dynamic Routing (การจัดเส้นทางแบบพลวัต)",
    definition: "Choosing different model or workflow paths depending on risk, complexity, cost, latency, or evaluation requirements rather than sending every request through the same path.",
    definitionTh: "การเลือกโมเดลหรือ workflow คนละเส้นทางตามระดับความเสี่ยง ความซับซ้อน ต้นทุน latency หรือเงื่อนไขการประเมิน",
  },
  {
    term: "Hallucination Control",
    termTh: "Hallucination Control (การควบคุมการหลอนของ AI)",
    definition: "The system-level discipline of reducing unsupported or overconfident outputs through retrieval quality, memory design, routing, verification, and evaluation loops. RCT achieves 0.3% vs 12–15% industry average.",
    definitionTh: "วินัยระดับระบบในการลดผลลัพธ์ที่ไร้หลักฐานหรือมั่นใจเกินจริง ผ่าน retrieval quality, memory design, routing, verification และ evaluation loops — RCT ทำได้ 0.3%",
  },
  {
    term: "Verification Layer",
    termTh: "Verification Layer (ชั้นการตรวจสอบ)",
    definition: "A step that checks generated outputs against references, policies, rules, schemas, or second-pass evaluators before high-value actions are accepted.",
    definitionTh: "ขั้นตอนที่นำผลลัพธ์ไปตรวจเทียบกับแหล่งอ้างอิง policy rules schemas หรือ evaluator รอบที่สองก่อนยอมรับการใช้งานในงานมูลค่าสูง",
    entityHref: "/en/entity/governance-layer",
  },
  {
    term: "Intent Operations",
    termTh: "Intent Operations (ปฏิบัติการที่ขับเคลื่อนด้วยเจตนา)",
    definition: "A framing for AI behavior that emphasizes understanding goals, context, and constraints before deciding what actions or outputs should follow.",
    definitionTh: "กรอบคิดสำหรับ AI ที่ให้ความสำคัญกับการเข้าใจเป้าหมาย บริบท และข้อจำกัดก่อนตัดสินใจว่าจะตอบหรือกระทำอะไรต่อ",
  },
  {
    term: "Intent Farming",
    termTh: "Intent Farming (การเพาะปลูกเจตนา)",
    definition: "The systematic practice of accumulating, organizing, and enriching AI context over time across sessions. Rather than starting cold with every interaction, Intent Farming stores user goals, constraints, domain preferences, and conversation history in RCTDB and recalls them via the Delta Engine warm recall mechanism (under 50ms). A well-farmed context reduces LLM cost by up to 3× and improves response relevance by building on established understanding rather than re-deriving it each time.",
    definitionTh: "การสะสม จัดระเบียบ และเพิ่มคุณค่า AI context อย่างเป็นระบบข้ามหลาย sessions แทนที่จะเริ่มต้น cold ทุกครั้ง Intent Farming เก็บเป้าหมาย ข้อจำกัด domain preferences และ conversation history ใน RCTDB และเรียกคืนผ่าน Delta Engine warm recall ในเวลาต่ำกว่า 50ms ลด LLM cost ได้ถึง 3 เท่าและเพิ่ม relevance โดยใช้ความเข้าใจที่สะสมแล้วแทนการ derive ใหม่",
    entityHref: "/en/blog/intent-farming-grow-ai-context",
  },
  {
    term: "Intent Signal",
    termTh: "Intent Signal (สัญญาณเจตนา)",
    definition: "Any observable indicator of a user's underlying goal, preference, or constraint that can be captured and stored to improve future AI interactions. Intent Signals include explicit statements ('I need a PDPA-compliant response'), implicit patterns (frequently queried topics), and behavioral cues (which answers the user expands or dismisses). These signals are the raw material of Intent Farming and the fuel for RCTDB's 8-dimensional memory schema.",
    definitionTh: "ตัวบ่งชี้ที่สังเกตได้ของเป้าหมาย preferences หรือข้อจำกัดพื้นฐานของผู้ใช้ที่สามารถจับและเก็บไว้เพื่อปรับปรุง AI interactions ในอนาคต ได้แก่ คำชัดเจน ('ต้องการคำตอบที่ PDPA compliant'), รูปแบบ implicit (หัวข้อที่ query บ่อย) และ behavioral cues เหล่านี้คือวัตถุดิบของ Intent Farming",
    entityHref: "/en/blog/intent-farming-grow-ai-context",
  },
  {
    term: "Genome System",
    termTh: "Genome System (ระบบ 7 Genome)",
    definition: "The biological metaphor describing how the RCT Ecosystem's seven core modules (G1–G7) form a closed, circular architecture. Each genome expresses from a shared foundational blueprint (G1), meaning all modules operate on the same data primitives (FDIA score, intent vector, RCTDB memory state). The circular loop — G1 Architect → G2 Codex → G3 JITNA → G4 ARTENT → G5 SignedAI → G6 Vault → G7 RCT-7 → back to G1 — means performance signals from each completed operation feed back to improve the system's future routing, algorithm selection, and domain understanding continuously.",
    definitionTh: "Metaphor ทางชีวภาพที่อธิบายวิธีที่ 7 Module หลักของ RCT Ecosystem (G1–G7) ก่อตัวเป็น Architecture แบบวงกลมปิด แต่ละ Genome แสดงออกจาก Blueprint พื้นฐานร่วมกัน (G1) หมายความว่า Module ทั้งหมดทำงานบน Data Primitives เดียวกัน (FDIA Score, Intent Vector, RCTDB Memory State) Loop แบบวงกลม — G1 → G2 → G3 → G4 → G5 → G6 → G7 → กลับ G1 — หมายความว่าสัญญาณ Performance จากการดำเนินงานแต่ละครั้งป้อนกลับเพื่อปรับปรุง Routing, การเลือก Algorithm และความเข้าใจ Domain ในอนาคตอย่างต่อเนื่อง",
    entityHref: "/en/blog/rct-7-genome-system",
  },
  {
    term: "RCT Control Plane",
    termTh: "RCT Control Plane (ระนาบควบคุม RCT)",
    definition: "A governance enforcement layer that sits between your application and every AI component — LLM calls, vector searches, tool invocations, and agent-to-agent handoffs. It runs in four sequential phases for every request: (1) FDIA intent validation, (2) DSL module policy evaluation across 15 governance dimensions, (3) signed execution authorization via ED25519 token, and (4) append-only audit logging. The result is 100% policy enforcement coverage with zero unmanaged LLM calls and 2.4ms average overhead.",
    definitionTh: "ชั้นบังคับใช้การกำกับดูแลที่อยู่ระหว่าง Application ของคุณกับทุก Component AI — การเรียก LLM, vector search, tool invocations และ agent-to-agent handoffs ทำงาน 4 เฟสต่อเนื่องทุก request: (1) FDIA intent validation, (2) การประเมิน policy ผ่าน DSL module 15 มิติ, (3) Signed execution authorization ผ่าน token ED25519, (4) Append-only audit logging ผลคือ coverage การบังคับใช้ policy 100% โดยไม่มี unmanaged LLM calls และ overhead เฉลี่ยเพียง 2.4ms",
    entityHref: "/en/blog/rct-control-plane-governance-at-runtime",
  },
  {
    term: "Runtime Policy Enforcement",
    termTh: "Runtime Policy Enforcement (การบังคับใช้นโยบาย ณ Runtime)",
    definition: "Constitutional constraints applied at query execution time, not at configuration time. Unlike role-based access control (which can be reconfigured by an administrator), Runtime Policy Enforcement in the RCT Control Plane's 15-module DSL enforces A=0 constitutional prohibitions at the genome expression level — meaning no routing path, no model call, and no privileged escalation can produce an output that violates a constitutional rule. This is distinct from preference-based guardrails, which can be overridden by sufficiently confident model outputs.",
    definitionTh: "ข้อจำกัด Constitutional ที่บังคับใช้ ณ เวลา Execute Query ไม่ใช่เวลา Configuration ต่างจาก Role-based Access Control (ที่ผู้ดูแลระบบสามารถกำหนดค่าใหม่ได้) Runtime Policy Enforcement ใน RCT Control Plane DSL 15 โมดูล บังคับใช้ Constitutional Prohibitions A=0 ที่ระดับ Genome Expression — หมายความว่าไม่มีเส้นทาง Routing ไม่มีการเรียกโมเดล และไม่มีการยกระดับสิทธิ์ใดที่สร้าง Output ที่ละเมิดกฎ Constitutional ได้ สิ่งนี้แตกต่างจาก Guardrails แบบ Preference ที่สามารถถูก Override โดย Output ของโมเดลที่มีความมั่นใจเพียงพอ",
    entityHref: "/en/blog/rct-7-genome-system",
  },
  {
    term: "Regional Language Adapter",
    termTh: "Regional Language Adapter (ตัวปรับภาษาภูมิภาค)",
    definition: "A pre-processing module in delentia-os that normalizes text input for ASEAN languages before FDIA scoring. For Thai, it performs dictionary-based word segmentation (65,000-word lexicon), PDPA-sensitive PII masking (names, national ID numbers, phone patterns, medical terms), and code-switch boundary detection for mixed Thai/English enterprise text. The adapter ensures Thai-language inputs receive equivalent FDIA scoring fidelity to English inputs, eliminating invisible language bias in the governance pipeline. Covers 8 ASEAN language pairs: Thai, English, Simplified Chinese, Traditional Chinese, Japanese, Indonesian, Vietnamese, and Malay.",
    definitionTh: "โมดูล Pre-processing ใน delentia-os ที่ Normalize Input ข้อความสำหรับภาษา ASEAN ก่อน FDIA scoring สำหรับภาษาไทย ดำเนินการ Word Segmentation แบบ Dictionary-based (Lexicon 65,000 คำ), PDPA PII Masking (ชื่อ หมายเลข ID โทรศัพท์ ข้อมูลการแพทย์) และการตรวจจับขอบเขต Code-Switch สำหรับข้อความ Enterprise ที่ผสม Thai/English Adapter ให้ความแม่นยำ FDIA Scoring สำหรับ Input ภาษาไทยเทียบเท่ากับภาษาอังกฤษ กำจัด Language Bias ที่มองไม่เห็นใน Governance Pipeline ครอบคลุม 8 คู่ภาษา ASEAN",
    entityHref: "/en/blog/regional-language-adapter-thai-nlp",
  },
  {
    term: "Thai Governance Boundary",
    termTh: "Thai Governance Boundary (ขอบเขต Governance ไทย)",
    definition: "The jurisdictional enforcement perimeter applied to AI interactions involving Thai personal data, as defined by PDPA B.E. 2562 and enforced by the RCT Control Plane's governance configuration. Within this boundary, four rules are non-negotiable: (1) No PII transmitted to external LLMs without masking, (2) Explicit consent required for automated profiling decisions, (3) Sensitive data (race, health, religion) requires Explicit Consent record before processing, (4) Data subject erasure requests must be fulfilled within 30 days across all storage layers including vector stores and embedding indexes. The boundary is expressed as a jurisdiction block in rct_governance.yaml, not as application code.",
    definitionTh: "ขอบเขตการบังคับใช้ตามเขตอำนาจศาลสำหรับ AI Interactions ที่เกี่ยวข้องกับข้อมูลส่วนบุคคลไทย ตาม PDPA พ.ศ. 2562 และบังคับใช้โดย Governance Configuration ของ RCT Control Plane ภายในขอบเขตนี้ กฎ 4 ข้อที่ไม่สามารถยกเว้นได้: (1) ไม่มีการส่ง PII ไปยัง LLM ภายนอกโดยไม่ Mask (2) ต้องมีความยินยอมอย่างชัดแจ้งสำหรับการตัดสินใจ Automated Profiling (3) ข้อมูลอ่อนไหวต้องมี Explicit Consent Record ก่อนประมวลผล (4) คำขอลบข้อมูลต้องดำเนินการภายใน 30 วันใน Storage ทุกชั้น รวมถึง Vector Store และ Embedding Indexes",
    entityHref: "/en/blog/pdpa-ai-compliance-thailand",
  },
  {
    term: "ASEAN AI Governance",
    termTh: "ASEAN AI Governance (การกำกับดูแล AI ระดับ ASEAN)",
    definition: "The multi-jurisdiction governance challenge of deploying enterprise AI across ASEAN's 10 member states, which operate under 7 different data protection frameworks (Thailand PDPA, Singapore PDPA, Philippines DPA, Indonesia PDP Law, Malaysia PDPA, Vietnam Decree 13, Cambodia draft law) and 4 AI-specific regulatory frameworks. The core problem: an AI system compliant with Thailand's automated profiling consent rules may not satisfy Indonesia's PDP Law electronic accountability requirements. The RCT Platform addresses ASEAN AI Governance through jurisdiction-specific configuration blocks in rct_governance.yaml, allowing a single deployment to apply different governance rules per user's data residency jurisdiction without separate engineering builds per country.",
    definitionTh: "ความท้าทายด้าน Governance หลายเขตอำนาจศาลในการ Deploy Enterprise AI ทั่ว 10 ประเทศสมาชิก ASEAN ซึ่งดำเนินการภายใต้กรอบการคุ้มครองข้อมูล 7 ฉบับที่แตกต่างกัน และกรอบกฎหมาย AI เฉพาะ 4 ฉบับ ปัญหาหลัก: ระบบ AI ที่สอดคล้องกับกฎ Consent สำหรับ Automated Profiling ของไทยอาจไม่ตรงตามข้อกำหนด Accountability ทางอิเล็กทรอนิกส์ของ PDP Law อินโดนีเซีย RCT Platform แก้ไขปัญหา ASEAN AI Governance ผ่าน Configuration Blocks เฉพาะเขตอำนาจใน rct_governance.yaml ทำให้ Deploy เดียวสามารถใช้กฎ Governance ที่แตกต่างกันต่อ Jurisdiction ของแต่ละ User โดยไม่ต้องสร้าง Engineering Build แยกต่อประเทศ",
    entityHref: "/en/blog/asean-enterprise-ai-deployment-guide",
  },
  {
    term: "Prompt Injection",
    termTh: "Prompt Injection (การฉีดคำสั่ง)",
    definition: "A security attack where malicious text in user input attempts to override the system's intended behavior. RCT's JITNA Normalizer automatically strips known injection patterns on every request before LLM processing.",
    definitionTh: "การโจมตีที่ใช้ข้อความอันตรายใน input เพื่อ override พฤติกรรมที่ตั้งใจ JITNA Normalizer ของ RCT จะ strip injection patterns ทุกครั้งก่อนประมวลผล",
  },
  {
    term: "Consensus Threshold",
    termTh: "Consensus Threshold (เกณฑ์ฉันทามติ)",
    definition: "The minimum percentage of model agreement required before a SignedAI result is accepted. Tier 4 = 50%, Tier 6 = 67%, Tier 8 = 75%, Tier S = 100%. Higher consensus thresholds are used for higher-stakes decisions.",
    definitionTh: "เปอร์เซ็นต์ขั้นต่ำของ agreement ระหว่างโมเดลก่อนยอมรับผลลัพธ์ใน SignedAI: Tier 4 = 50%, Tier 6 = 67%, Tier 8 = 75%, Tier S = 100%",
    entityHref: "/en/entity/governance-layer",
  },
  // ─── Memory Concepts ───────────────────────────────────────────
  {
    term: "Warm Recall",
    termTh: "Warm Recall (การเรียกคืนแบบอุ่น)",
    definition: "Serving an AI response from the Delta Engine hot-zone semantic cache (similarity threshold 0.95) without calling an LLM. Achieves under 50 milliseconds response time. Only possible for queries semantically similar to cached responses.",
    definitionTh: "การตอบ query จาก hot-zone semantic cache ของ Delta Engine (similarity ≥ 0.95) โดยไม่ต้องเรียก LLM ตอบกลับได้ภายใน 50ms เท่านั้น",
    entityHref: "/en/entity/memory-architecture",
  },
  {
    term: "Cold Start",
    termTh: "Cold Start (การเริ่มต้นแบบเย็น)",
    definition: "A novel AI query that cannot be served from cache and must be fully processed through the LLM pipeline. Cold start time in the RCT Ecosystem is 3–5 seconds, compared to under 50ms for warm recall.",
    definitionTh: "Query ใหม่ที่ไม่พบใน cache และต้องประมวลผลผ่าน LLM pipeline ทั้งหมด Cold start ใน RCT ใช้เวลา 3–5 วินาที เทียบกับ warm recall ที่ต่ำกว่า 50ms",
    entityHref: "/en/entity/memory-architecture",
  },
  {
    term: "UUID Tombstone Pattern",
    termTh: "UUID Tombstone Pattern (รูปแบบ tombstone สำหรับ UUID)",
    definition: "A PDPA-compliant data erasure method where a subject's uuid is marked as 'tombstoned' rather than physically deleted, ensuring no data is retrievable while maintaining referential integrity. Used in RCTDB for right-to-erasure requests.",
    definitionTh: "วิธีลบข้อมูลแบบ PDPA compliant ที่ mark UUID ว่า tombstoned แทนการลบจริง ทำให้ไม่สามารถ retrieve ข้อมูลได้ แต่ยังคง referential integrity ใช้ใน RCTDB",
    entityHref: "/en/entity/memory-architecture",
  },
  {
    term: "Semantic Similarity",
    termTh: "Semantic Similarity (ความคล้ายคลึงทางความหมาย)",
    definition: "A numerical measure (typically 0.0–1.0) of how similar two text inputs are in meaning, regardless of exact wording. The Delta Engine uses a 0.95 similarity threshold to determine if cached responses can be served for new queries.",
    definitionTh: "ตัวเลขวัดความคล้ายของ 2 ข้อความในเชิงความหมาย Delta Engine ใช้ threshold 0.95 เพื่อตัดสินว่า query ใหม่สามารถใช้ผลลัพธ์ที่ cached ไว้ได้",
  },
  {
    term: "Hot Zone",
    termTh: "Hot Zone (โซนร้อน — หน่วยความจำเร็ว)",
    definition: "The fastest-access tier of the RCTDB memory hierarchy. Keeps most-frequently-accessed semantic cache entries in-memory for under 1ms access. Capacity-limited; entries migrate to warm and cold zones based on access frequency.",
    definitionTh: "ชั้นเข้าถึงเร็วที่สุดในลำดับชั้นหน่วยความจำ RCTDB เก็บ semantic cache ที่ใช้บ่อยไว้ใน memory เข้าถึงได้ในเวลาต่ำกว่า 1ms",
    entityHref: "/en/entity/memory-architecture",
  },
  // ─── Testing & Quality Concepts ────────────────────────────────
  {
    term: "Property-Based Testing",
    termTh: "Property-Based Testing (การทดสอบเชิงคุณสมบัติ)",
    definition: "A testing methodology where mathematical properties (invariants) are specified, and a framework like Python Hypothesis automatically generates thousands of test cases to find edge cases that violate those properties.",
    definitionTh: "วิธีทดสอบที่ระบุ mathematical properties (invariants) และ framework เช่น Hypothesis จะสร้าง test cases โดยอัตโนมัติเพื่อหา edge cases",
  },
  {
    term: "Chaos Engineering",
    termTh: "Chaos Engineering (วิศวกรรมความวุ่นวาย)",
    definition: "A testing discipline where controlled failure scenarios (server outage, network partition, service timeout) are deliberately injected into a system to discover failure modes before they occur in production.",
    definitionTh: "วินัยการทดสอบที่จงใจ inject failure scenarios เช่น server outage, network partition เพื่อค้นหา failure modes ก่อนจะเกิดใน production",
  },
  {
    term: "Vibe Testing",
    termTh: "Vibe Testing (การทดสอบแบบรู้สึก)",
    definition: "The informal practice of evaluating an AI system's quality by looking at its outputs and judging whether they 'feel right.' Not sufficient for enterprise AI deployments — formal evaluation harnesses are required.",
    definitionTh: "วิธีประเมินระบบ AI แบบไม่เป็นทางการโดยดูผลลัพธ์แล้วตัดสินว่า 'รู้สึกถูก' ไม่เพียงพอสำหรับ enterprise AI — ต้องใช้ formal evaluation harness",
  },
  {
    term: "Evaluation Harness",
    termTh: "Evaluation Harness (ชุดประเมินอัตโนมัติ)",
    definition: "A systematic, automated set of quality gates that an AI system must pass before deployment. The RCT Ecosystem runs 4,849 tests across 8 levels (Unit, Integration, Service, Contract, Performance, Security, Chaos, Property).",
    definitionTh: "ชุดทดสอบอัตโนมัติที่ระบบ AI ต้องผ่านก่อน deploy RCT Ecosystem รัน 4,849 tests ใน 8 ระดับ (Unit, Integration, Service, Contract, Performance, Security, Chaos, Property)",
  },
  {
    term: "Mathematical Invariant",
    termTh: "Mathematical Invariant (ค่าคงที่ทางคณิตศาสตร์)",
    definition: "A property that must hold unconditionally for all valid inputs, regardless of edge cases. Example: FDIA invariant — when A=0, F must equal exactly 0 for all possible D and I values.",
    definitionTh: "คุณสมบัติที่ต้องถือว่าจริงเสมอสำหรับ input ที่ถูกต้องทั้งหมด ตัวอย่าง: FDIA invariant — เมื่อ A=0, F ต้องเท่ากับ 0 สำหรับ D และ I ทุกค่า",
    entityHref: "/en/entity/fdia-equation",
  },
  // ─── PDPA & Compliance Concepts ────────────────────────────────
  {
    term: "PDPA Section 33",
    termTh: "PDPA มาตรา 33 (สิทธิ์ขอคำอธิบาย)",
    definition: "Thailand's Personal Data Protection Act Section 33 grants data subjects the right to request an explanation of automated decisions made about them. RCT's RCTDB provenance trail (dimension 8) automatically satisfies this requirement.",
    definitionTh: "มาตรา 33 ของ PDPA ไทย ให้สิทธิ์เจ้าของข้อมูลขอคำอธิบายสำหรับการตัดสินใจอัตโนมัติ RCTDB dimension 8 (provenance) ตอบสนองข้อกำหนดนี้โดยอัตโนมัติ",
  },
  {
    term: "PDPA Right to Erasure",
    termTh: "PDPA สิทธิ์ลบข้อมูล",
    definition: "The right of data subjects under PDPA (and GDPR) to request permanent deletion of their personal data. In RCTDB, this is implemented via the UUID tombstone pattern — marking subject data as erased without breaking referential integrity.",
    definitionTh: "สิทธิ์ของเจ้าของข้อมูลตาม PDPA (และ GDPR) ในการขอลบข้อมูลส่วนบุคคลถาวร ใน RCTDB ใช้ UUID tombstone pattern ที่ mark ข้อมูลว่าถูกลบโดยไม่ทำลาย referential integrity",
    entityHref: "/en/entity/memory-architecture",
  },
  {
    term: "Audit Trail",
    termTh: "Audit Trail (เส้นทางการตรวจสอบ)",
    definition: "A chronological record of all AI decisions, with sufficient detail to reconstruct what happened, when, and why. RCTDB's 8-dimensional schema automatically generates audit trails for every RCT Ecosystem query.",
    definitionTh: "บันทึกลำดับเวลาของการตัดสินใจ AI ทั้งหมด พร้อมรายละเอียดเพียงพอสำหรับ reconstruct ว่าเกิดอะไร เมื่อไร และทำไม RCTDB ทำสิ่งนี้โดยอัตโนมัติ",
    entityHref: "/en/entity/memory-architecture",
  },
  // ─── SEO & Authority Concepts ──────────────────────────────────
  {
    term: "E-E-A-T",
    termTh: "E-E-A-T (ประสบการณ์ ความเชี่ยวชาญ อำนาจ ความน่าเชื่อถือ)",
    definition: "Google's quality signal framework: Experience, Expertise, Authoritativeness, Trustworthiness. For AI content, E-E-A-T requires first-hand experience, verifiable credentials, transparent authorship, and fact-checked claims.",
    definitionTh: "กรอบ quality signal ของ Google: Experience, Expertise, Authoritativeness, Trustworthiness สำหรับ AI content ต้องมี first-hand experience, credentials ที่ verify ได้ authorship โปร่งใส และ claim ที่ตรวจสอบแล้ว",
  },
  {
    term: "Topical Authority",
    termTh: "Topical Authority (อำนาจเชิงหัวข้อ)",
    definition: "The degree to which a website is recognized by search engines as a comprehensive, reliable source on a specific subject. Built through content depth, internal linking between related articles, and entity-level structured data.",
    definitionTh: "ระดับที่ search engines ยอมรับ website ว่าเป็นแหล่งความรู้เชิงลึกและน่าเชื่อถือในหัวข้อเฉพาะ สร้างขึ้นผ่าน content depth, internal linking และ entity-level structured data",
  },
  {
    term: "AEO (Answer Engine Optimization)",
    termTh: "AEO (การปรับแต่งสำหรับ Answer Engine)",
    definition: "The practice of structuring content to be selected as direct answers by AI systems (ChatGPT, Perplexity, Google AI Overviews). Requires FAQPage JSON-LD schema, clear question-answer format, and verified factual claims.",
    definitionTh: "การออกแบบเนื้อหาเพื่อให้ถูกเลือกเป็นคำตอบโดย AI systems เช่น ChatGPT, Perplexity, Google AI Overviews ต้องใช้ FAQPage JSON-LD, Q&A format ชัดเจน และ claims ที่ verified",
  },
  {
    term: "FAQPage Schema",
    termTh: "FAQPage Schema (โครงสร้าง schema ถามตอบ)",
    definition: "A JSON-LD structured data format that marks up question-and-answer content with schema.org/FAQPage markup. Eligible for Google Featured Snippets and rich results, significantly improving click-through rates.",
    definitionTh: "รูปแบบ JSON-LD ที่ mark up เนื้อหา Q&A ด้วย schema.org/FAQPage มีสิทธิ์ได้ Google Featured Snippets และ rich results ทำให้ click-through rate เพิ่มขึ้นมาก",
  },
  {
    term: "DefinedTerm Schema",
    termTh: "DefinedTerm Schema (โครงสร้าง schema คำนิยาม)",
    definition: "A JSON-LD structured data type (schema.org/DefinedTerm) used to mark up glossary entries and technical terms. Helps search engines understand proprietary concepts and enables Knowledge Graph entity recognition.",
    definitionTh: "ประเภท JSON-LD (schema.org/DefinedTerm) สำหรับ mark up คำศัพท์และคำนิยามทางเทคนิค ช่วย search engines เข้าใจ proprietary concepts และ Knowledge Graph entity recognition",
  },
  {
    term: "Internal Linking",
    termTh: "Internal Linking (การเชื่อมโยงภายใน)",
    definition: "Hyperlinks between pages on the same website that distribute PageRank, help search engines discover content, and guide users through related topics. High-quality internal links include descriptive anchor text.",
    definitionTh: "ลิงก์ระหว่างหน้าในเว็บเดียวกัน กระจาย PageRank ช่วย search engines ค้นพบเนื้อหา และนำผู้ใช้ผ่านหัวข้อที่เกี่ยวข้อง ลิงก์ที่ดีมี anchor text อธิบายชัดเจน",
  },
  // ─── The 7 Genome System ──────────────────────────────────────
  {
    term: "Architect Genome",
    termTh: "Architect Genome (จีโนมสถาปนิก)",
    definition: "Creator's DNA — the foundational design genome of the RCT 7-Genome System. Encodes the architectural vision and structural patterns of the RCT Ecosystem.",
    definitionTh: "DNA ของผู้สร้าง — genome พื้นฐานของระบบ 7 Genome ของ RCT เข้ารหัสวิสัยทัศน์สถาปนิกและรูปแบบโครงสร้างของ RCT Ecosystem",
  },
  {
    term: "ARTENT Genome",
    termTh: "ARTENT Genome (จีโนมปัญญาการสร้างสรรค์)",
    definition: "Creation intelligence — the generative intelligence genome of the RCT 7-Genome System responsible for creative AI output capabilities.",
    definitionTh: "ปัญญาการสร้างสรรค์ — genome ปัญญาเชิงสร้างสรรค์ของระบบ 7 Genome ของ RCT ดูแลความสามารถในการสร้าง AI output เชิงสร้างสรรค์",
  },
  {
    term: "JITNA Genome",
    termTh: "JITNA Genome (จีโนมชั้น Protocol)",
    definition: "Protocol layer — the communication genome of the RCT 7-Genome System. Implements the JITNA Protocol standard for agent-to-agent communication.",
    definitionTh: "ชั้น Protocol — genome การสื่อสารของระบบ 7 Genome ของ RCT ใช้งาน JITNA Protocol standard สำหรับการสื่อสารระหว่าง agent",
    entityHref: "/en/entity/jitna-protocol",
  },
  {
    term: "Codex Genome",
    termTh: "Codex Genome (จีโนมคลังความรู้)",
    definition: "Knowledge vault — the long-term knowledge store genome of the RCT 7-Genome System. Manages structured knowledge retrieval and organization.",
    definitionTh: "คลังความรู้ — genome เก็บความรู้ระยะยาวของระบบ 7 Genome ของ RCT จัดการการดึงและจัดระเบียบความรู้เชิงโครงสร้าง",
  },
  {
    term: "SignedAI Genome",
    termTh: "SignedAI Genome (จีโนมชั้นการตรวจสอบ)",
    definition: "Verification layer — the trust and consensus genome of the RCT 7-Genome System. Implements multi-model consensus and cryptographic verification of all system outputs.",
    definitionTh: "ชั้นการตรวจสอบ — genome ความไว้วางใจและ consensus ของระบบ 7 Genome ของ RCT ใช้งาน multi-model consensus และการตรวจสอบแบบ cryptographic",
    entityHref: "/en/entity/governance-layer",
  },
  {
    term: "RCT-KnowledgeVault Genome",
    termTh: "RCT-KnowledgeVault Genome (จีโนมสถาปัตยกรรมหน่วยความจำ)",
    definition: "Memory architecture — the persistent storage genome of the RCT 7-Genome System. Manages the RCTDB schema, Delta Engine compression, and the hot/warm/cold zone memory hierarchy.",
    definitionTh: "สถาปัตยกรรมหน่วยความจำ — genome จัดเก็บข้อมูลถาวรของระบบ 7 Genome ของ RCT จัดการ RCTDB schema, Delta Engine compression และลำดับชั้นหน่วยความจำ",
    entityHref: "/en/entity/memory-architecture",
  },
  {
    term: "RCT-7 Genome",
    termTh: "RCT-7 Genome (จีโนมพัฒนาต่อเนื่อง)",
    definition: "Continuous improvement — the meta-learning genome of the RCT 7-Genome System. Monitors system performance, identifies improvement opportunities, and governs the evolution of the entire ecosystem.",
    definitionTh: "การปรับปรุงต่อเนื่อง — genome meta-learning ของระบบ 7 Genome ของ RCT ตรวจสอบประสิทธิภาพระบบ ระบุโอกาสพัฒนา และกำกับดูแลวิวัฒนาการของ ecosystem ทั้งหมด",
  },
  {
    term: "JITNA Assembly",
    termTh: "JITNA Assembly (การประกอบ JITNA)",
    definition: "The nodal assembly process by which the JITNA Protocol constructs a response: Intent Capture → Data Enrichment → Delta Synthesis → Architect Review → Response Delivery. Each step is a discrete gate — assembly halts if any gate returns an insufficient quality score. The assembly tier (1–9) controls how many gates are mandatory and what consensus threshold must be met before a response is released.",
    definitionTh: "กระบวนการ nodal assembly ที่ JITNA Protocol ใช้สร้าง response: Intent Capture → Data Enrichment → Delta Synthesis → Architect Review → Response Delivery แต่ละขั้นตอนคือ gate แยกต่างหาก — การประกอบจะหยุดถ้า gate ใด return คะแนนคุณภาพที่ไม่เพียงพอ Assembly tier (1–9) ควบคุมว่า gate ใดบ้างที่บังคับและต้องผ่าน consensus threshold ระดับใดก่อนจะปล่อย response",
  },
  {
    term: "Constitutional Prohibition",
    termTh: "Constitutional Prohibition (ข้อห้ามตามรัฐธรรมนูญ)",
    definition: "A hard architectural constraint that sets the Architect authorization value A=0 for a specific output class, permanently blocking that output regardless of data quality (D) or intent score (I). Because F = (D^I) × A and A=0 makes F=0 always, constitutional prohibitions are mathematically enforced — not policy suggestions. Examples include blocking output of private data after a PDPA erasure request, blocking high-risk autonomous actions without explicit human approval, and blocking cross-jurisdiction data replication without authorization.",
    definitionTh: "ข้อจำกัดเชิงสถาปัตยกรรมที่เข้มงวด ซึ่ง set ค่า Architect authorization A=0 สำหรับ output class ที่กำหนด บล็อก output นั้นอย่างถาวรโดยไม่คำนึงถึงคุณภาพข้อมูล (D) หรือคะแนน intent (I) เนื่องจาก F = (D^I) × A และ A=0 ทำให้ F=0 เสมอ ข้อห้ามตามรัฐธรรมนูญจึงถูก enforce ทางคณิตศาสตร์ ไม่ใช่แค่ข้อแนะนำด้าน policy ตัวอย่างเช่น การบล็อก output ข้อมูลส่วนตัวหลัง PDPA erasure request การบล็อก high-risk autonomous actions โดยไม่มีการอนุมัติจากมนุษย์ และการบล็อก cross-jurisdiction data replication โดยไม่ได้รับอนุญาต",
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Glossary — Constitutional AI, Routing, Memory, Verification, and Intent Operations",
    "Glossary — Constitutional AI, Routing, Memory, Verification และ Intent Operations",
    "A glossary of the core terms used across the Delentia Labs ecosystem, covering constitutional AI, routing, memory, verification, intent operations, and hallucination control.",
    "คลังคำศัพท์ของแนวคิดหลักที่ใช้ในระบบนิเวศ Delentia Labs ครอบคลุม constitutional AI, routing, memory, verification, intent operations และ hallucination control",
    "/glossary",
    ["AI glossary", "constitutional AI glossary", "enterprise AI terms"]
  )
}

export default async function GlossaryPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isTh ? "หน้าแรก" : "Home", url: `https://delentia.com${localePrefix}` },
    { name: isTh ? "อภิธานศัพท์" : "Glossary", url: `https://delentia.com${localePrefix}/glossary` },
  ])

  const definedTermsSchema = glossaryTerms.map((t) =>
    getDefinedTermSchema(isTh ? t.termTh : t.term, isTh ? t.definitionTh : t.definition, `https://delentia.com${localePrefix}/glossary#${t.term.toLowerCase().replace(/\s+/g, '-')}`)
  )

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermsSchema) }} />
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{isTh ? "อภิธานศัพท์" : "Glossary"}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {isTh ? "หน้าคำศัพท์หลักสำหรับอธิบายระบบแนว Ecosystem / OS ของ RCT ให้ค้นหา เข้าใจ และเชื่อมโยงไปยังหน้า authority อื่นได้ง่ายขึ้น" : "A concept hub for the core terms used across the RCT ecosystem, designed to improve discoverability, comprehension, and internal linking."}
          </p>
        </div>

        <div className="mt-10 grid gap-5">
          {glossaryTerms.map((entry) => (
            <div key={entry.term} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold text-foreground">{isTh ? entry.termTh : entry.term}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{isTh ? entry.definitionTh : entry.definition}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground">{isTh ? "อ่านต่อ" : "Continue exploring"}</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={`${localePrefix}/methodology`} className="rounded-full bg-warm-amber/10 px-4 py-2 font-medium text-warm-amber hover:underline">{isTh ? "วิธีวิทยา" : "Methodology"}</Link>
            <Link href={`${localePrefix}/evaluation`} className="rounded-full bg-warm-amber/10 px-4 py-2 font-medium text-warm-amber hover:underline">{isTh ? "ศูนย์กลางการประเมิน" : "Evaluation"}</Link>
            <Link href={`${localePrefix}/architecture`} className="rounded-full bg-warm-amber/10 px-4 py-2 font-medium text-warm-amber hover:underline">{isTh ? "สถาปัตยกรรม" : "Architecture"}</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
