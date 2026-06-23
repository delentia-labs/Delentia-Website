"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChevronDown, BookOpen, Zap, Tag, History, HelpCircle } from "lucide-react"

type FAQClientProps = {
  locale: "en" | "th"
}

const faqCategories = [
  {
    id: "general",
    labelEn: "General",
    labelTh: "ทั่วไป",
    icon: BookOpen,
    items: [
      {
        qEn: "What is the RCT Ecosystem?",
        qTh: "RCT Ecosystem คืออะไร?",
        aEn: "RCT (Reverse Component Thinking) is a sovereign AI governance framework that combines the FDIA equation (F=D^I×A), JITNA Protocol, 10-Layer Cognitive Architecture, 41 Algorithms, and 7 Genome Subsystems to create enterprise-grade AI infrastructure.",
        aTh: "RCT (Reverse Component Thinking) คือ Framework สำหรับการกำกับดูแล AI ที่ผสมผสาน FDIA Equation (F=D^I×A), JITNA Protocol, สถาปัตยกรรม 10 ชั้น, 41 Algorithms และ 7 Genome Subsystems เพื่อสร้าง Enterprise AI Infrastructure",
      },
      {
        qEn: "Who created the RCT Ecosystem?",
        qTh: "ใครเป็นผู้สร้าง RCT Ecosystem?",
        aEn: "RCT was created by 'The Architect' — Ittirit Saengow (อิทธิฤทธิ์ แซ่โง้ว), a systems thinker who grew up in a Khlong Toei flat community in Bangkok. As a solo developer with no external funding, working from a small apartment with mobile devices and later a ROG Ally X setup, the system evolved from personal problem-solving into a comprehensive enterprise platform through AI-assisted development and intensive iteration.",
        aTh: "RCT ถูกสร้างโดย 'The Architect' — อิทธิฤทธิ์ แซ่โง้ว นักคิดเชิงระบบที่เติบโตในชุมชนแฟลตคลองเตย กรุงเทพฯ ในฐานะ Solo Developer ที่ไม่มีเงินทุนภายนอก ระบบพัฒนาจากการแก้ปัญหาส่วนตัวจนกลายเป็นแพลตฟอร์ม Enterprise ที่ครบวงจร",
      },
      {
        qEn: "What makes RCT different from LangChain or AutoGPT?",
        qTh: "RCT แตกต่างจาก LangChain หรือ AutoGPT อย่างไร?",
        aEn: "RCT is a complete ecosystem, not just a framework. It includes its own equation (FDIA), protocol (JITNA), database (RCTDB), 41 algorithms, and 7 genome subsystems. While LangChain focuses on chaining LLM calls and AutoGPT on autonomous agents, RCT provides end-to-end AI governance with built-in quality control (0.3% hallucination rate vs industry 12-15%), cost optimization, and evolutionary improvement.",
        aTh: "RCT เป็น Ecosystem ที่สมบูรณ์ ไม่ใช่แค่ Framework มี Equation (FDIA), Protocol (JITNA), Database (RCTDB), 41 Algorithms และ 7 Genome Subsystems พร้อม Hallucination Rate เพียง 0.3% เทียบกับ Industry 12-15%",
      },
      {
        qEn: "Is RCT open source?",
        qTh: "RCT เป็น open source หรือไม่?",
        aEn: "RCT follows an 85/15 marketplace model — 85% of the core framework is open for community use, while 15% consists of premium enterprise features. The JITNA Protocol is published as an open standard (RFC-001) under Apache 2.0 license.",
        aTh: "RCT ใช้โมเดล 85/15 Marketplace — 85% ของ Core Framework เปิดให้ชุมชนใช้งาน ส่วน 15% เป็น Premium Enterprise Features โดย JITNA Protocol เผยแพร่เป็น Open Standard (RFC-001) ภายใต้ Apache 2.0",
      },
    ],
  },
  {
    id: "technical",
    labelEn: "Technical",
    labelTh: "เทคนิค",
    icon: Zap,
    items: [
      {
        qEn: "What is the FDIA Equation?",
        qTh: "FDIA Equation คืออะไร?",
        aEn: "F = D^I × A — Future equals Data raised to the power of Intent, multiplied by Architect. It is the core philosophical and mathematical foundation that governs how the system processes information, makes decisions, and evolves. This is not just an AI formula — it is a life equation.",
        aTh: "F = D^I × A — Future เท่ากับ Data ยกกำลัง Intent คูณด้วย Architect เป็นรากฐานทางปรัชญาและคณิตศาสตร์หลักที่กำกับวิธีที่ระบบประมวลผลข้อมูล ตัดสินใจ และวิวัฒนาการ",
      },
      {
        qEn: "How does the JITNA Protocol work?",
        qTh: "JITNA Protocol ทำงานอย่างไร?",
        aEn: "JITNA (Just-In-Time Nodal Assembly) operates in 5 phases: Intent Capture → Data Enrichment → Delta Synthesis → Architect Review → Response Delivery. Each phase has quality gates and can be executed at 9 different tiers of complexity.",
        aTh: "JITNA (Just-In-Time Nodal Assembly) ทำงาน 5 เฟส: Intent Capture → Data Enrichment → Delta Synthesis → Architect Review → Response Delivery แต่ละเฟสมี Quality Gates และสามารถทำงานได้ 9 ระดับความซับซ้อน",
      },
      {
        qEn: "What are the 41 Algorithms?",
        qTh: "41 Algorithms คืออะไร?",
        aEn: "The 41 algorithms span across the 10-layer architecture, covering everything from data ingestion (Layer 1) to autonomous improvement (Layer 10). They include algorithms for intent classification, context compression (74% lossless), hallucination detection, and cost optimization (3.74x reduction). The current public engineering snapshot reports 4,849 passing tests across the platform.",
        aTh: "41 Algorithms กระจายอยู่ใน 10 ชั้นของสถาปัตยกรรม ครอบคลุมตั้งแต่ Data Ingestion ถึง Autonomous Improvement รวมถึง Intent Classification, Context Compression (74% lossless), Hallucination Detection และ Cost Optimization (3.74x reduction) โดย public engineering snapshot ปัจจุบันรายงานผลการทดสอบที่ผ่านทั้งหมด 4,849 รายการทั่วทั้งแพลตฟอร์ม",
      },
      {
        qEn: "What LLM providers are supported?",
        qTh: "รองรับ LLM Providers อะไรบ้าง?",
        aEn: "RCT is LLM-agnostic and supports OpenAI, Anthropic Claude, Google Gemini, local Ollama models, and any OpenAI-compatible API. The Intent Loop Engine automatically selects the optimal model based on task complexity and cost constraints.",
        aTh: "RCT เป็น LLM-agnostic รองรับ OpenAI, Anthropic Claude, Google Gemini, Ollama models ในเครื่อง และ API ที่เข้ากันได้กับ OpenAI ทุกตัว Intent Loop Engine จะเลือก Model ที่เหมาะสมที่สุดอัตโนมัติ",
      },
      {
        qEn: "What is the RCT HexaCore 7-model architecture?",
        qTh: "สถาปัตยกรรม HexaCore 7 โมเดลของ RCT คืออะไร?",
        aEn: "HexaCore is the 7-model AI infrastructure: 3 Western LLMs + 3 Eastern LLMs + 1 Thai regional model (Typhoon v2). For critical queries, all 7 models process in parallel through the HexaCore Consensus mechanism, which enforces constitutional agreement thresholds (50–100% by tier) before any output is released. This achieves 3.74x cost reduction vs single-model deployments while reducing hallucination to 0.3%.",
        aTh: "HexaCore คือโครงสร้าง AI 7 โมเดล: LLM ตะวันตก 3 ตัว + ตะวันออก 3 ตัว + โมเดลไทย 1 ตัว (Typhoon v2) สำหรับ query สำคัญ ทั้ง 7 โมเดลประมวลผลพร้อมกันผ่านกลไก HexaCore Consensus ที่บังคับ threshold รัฐธรรมนูญ (50–100% ตาม Tier) ก่อนปล่อยผลลัพธ์ ทำให้ลดต้นทุน 3.74 เท่าและ hallucination เหลือ 0.3%",
      },
      {
        qEn: "How does SignedAI reduce hallucination to 0.3%?",
        qTh: "SignedAI ลด hallucination เหลือ 0.3% ได้อย่างไร?",
        aEn: "SignedAI routes critical queries through 4–8 models simultaneously and requires constitutional consensus: Tier 4 = 50% agreement, Tier 6 = 67%, Tier 8 = 75%, Tier S = 100%. If consensus is not reached, the system escalates rather than releasing an unverified output. The industry average hallucination rate is 12–15%; RCT achieves 0.3% through this multi-model verification layer combined with Ed25519 cryptographic signatures on all consensus decisions.",
        aTh: "SignedAI ส่ง query สำคัญผ่าน 4–8 โมเดลพร้อมกันและต้องการ consensus รัฐธรรมนูญ: Tier 4 = 50%, Tier 6 = 67%, Tier 8 = 75%, Tier S = 100% ถ้าไม่ถึง threshold ระบบจะ escalate ไม่ใช่ปล่อยผลลัพธ์ที่ยังไม่ verified อุตสาหกรรม hallucinate ที่ 12–15% แต่ RCT ทำได้ 0.3% ผ่าน multi-model verification layer พร้อมลายเซ็น Ed25519",
      },
      {
        qEn: "What is the Delta Engine's 74% compression capability?",
        qTh: "Delta Engine บีบอัด 74% ทำงานอย่างไร?",
        aEn: "The Delta Engine stores only incremental state changes (deltas) rather than full state snapshots. This achieves 74% average lossless compression with sub-1ms reconstruction, enabling warm recall under 50ms compared to a full cold-start LLM call of 3–5 seconds. It is what allows RCT to maintain deep context across long sessions without proportional memory cost or latency increase.",
        aTh: "Delta Engine เก็บเฉพาะการเปลี่ยนแปลง (deltas) แทนสถานะเต็ม บีบอัดได้ 74% แบบ lossless พร้อม reconstruction ต่ำกว่า 1ms ทำให้ warm recall ต่ำกว่า 50ms เทียบกับ cold-start LLM call 3–5 วินาที นี่คือสิ่งที่ทำให้ RCT รักษา context ยาวได้โดยไม่เพิ่มต้นทุนหน่วยความจำหรือ latency ตามสัดส่วน",
      },
      {
        qEn: "How does RCT's Circuit Breaker prevent cascading AI failures?",
        qTh: "RCT Circuit Breaker ป้องกัน cascading AI failures ได้อย่างไร?",
        aEn: "RCT's Circuit Breaker (RFC-006 Fault Isolation) monitors each component's FDIA score in real time. When a component's F score drops below 0.7 — indicating degraded data quality, misaligned intent, or reduced Architect authorization — the breaker opens immediately and routes traffic to one of 7 fallback LLM providers. The three states are: CLOSED (normal operation), OPEN (failure isolated, fallback active), and HALF-OPEN (test mode for recovery). This prevents a single failing model or service from poisoning dependent agents downstream — the worst failure mode in multi-agent AI because it is invisible in standard output without explicit fault isolation.",
        aTh: "Circuit Breaker ของ RCT (RFC-006 Fault Isolation) ตรวจสอบคะแนน FDIA ของแต่ละ component แบบ real-time เมื่อคะแนน F ต่ำกว่า 0.7 (แสดงว่า data quality ต่ำ, intent ไม่ตรง หรือ Architect authorization ลดลง) breaker จะเปิดทันทีและ route traffic ไปยัง fallback LLM providers 7 ตัว มี 3 สถานะ: CLOSED (ปกติ), OPEN (failure ถูก isolate, fallback ทำงาน), HALF-OPEN (ทดสอบ recovery) ป้องกัน model หรือ service เดียวที่ล้มเหลวจากการทำให้ agents ที่พึ่งพาได้รับ input เสีย — failure mode ที่เลวร้ายที่สุดใน multi-agent AI เพราะไม่เห็นได้จาก output ปกติ",
      },
      {
        qEn: "What is Intent Farming in enterprise AI?",
        qTh: "Intent Farming ในระบบ enterprise AI คืออะไร?",
        aEn: "Intent Farming is the systematic practice of accumulating, organizing, and enriching AI context over time — converting one-shot queries into progressively smarter sessions. Instead of starting cold with every interaction, RCT's RCTDB memory layer stores intent signals (user goals, constraints, preferences, domain context) and recalls them through the Delta Engine's warm recall mechanism in under 50ms. A fully farmed context can reduce LLM processing costs by up to 3× and improve response relevance by building on established understanding rather than re-deriving it each time.",
        aTh: "Intent Farming คือการสะสม จัดระเบียบ และเพิ่มคุณค่า AI context อย่างเป็นระบบตลอดเวลา แปลง one-shot queries เป็น sessions ที่ฉลาดขึ้นเรื่อยๆ แทนที่จะเริ่มต้น cold ทุกครั้ง RCTDB ของ RCT เก็บ intent signals (เป้าหมาย, ข้อจำกัด, preferences, domain context) และเรียกคืนผ่าน Delta Engine warm recall ในเวลาต่ำกว่า 50ms Context ที่ farm มาอย่างดีลด LLM cost ได้ถึง 3 เท่า และเพิ่ม relevance โดยใช้ความเข้าใจที่สะสมไว้แทนการ derive ใหม่ทุกครั้ง",
      },
      {
        qEn: "What is the RCT Specialist Studio?",
        qTh: "RCT Specialist Studio คืออะไร?",
        aEn: "The Specialist Studio is RCT's domain orchestration layer — a configuration framework that adapts the core platform (FDIA scoring, SignedAI verification, JITNA routing) to the specific requirements of a vertical domain such as legal, medical, financial, or compliance. Each Specialist Studio deployment includes domain-specific FDIA calibration (what counts as 'desirable' or 'authorized' in that domain), custom Verification Tier assignments (e.g. TIER_6 mandatory for all medical dosing decisions), and constitutional prohibitions specific to that field. The result is a 3.74× efficiency improvement over generic AI deployments, because every routing decision, memory schema, and verification threshold is tuned to domain reality rather than generic defaults.",
        aTh: "Specialist Studio คือ Domain Orchestration Layer ของ RCT — Framework การกำหนดค่าที่ปรับแต่ง Platform หลัก (FDIA Scoring, SignedAI Verification, JITNA Routing) ให้ตรงกับความต้องการเฉพาะของ Vertical Domain เช่น กฎหมาย การแพทย์ การเงิน หรือ Compliance การ Deploy Specialist Studio แต่ละครั้งรวม FDIA Calibration เฉพาะ Domain (อะไรนับว่า 'น่าต้องการ' หรือ 'ได้รับอนุญาต' ใน Domain นั้น), การกำหนด Verification Tier แบบกำหนดเอง (เช่น TIER_6 บังคับสำหรับการตัดสินใจเรื่องยาทุกครั้ง) และ Constitutional Prohibitions เฉพาะสาขา ผลลัพธ์คือการปรับปรุงประสิทธิภาพ 3.74 เท่าเมื่อเทียบกับการ Deploy AI แบบทั่วไป เพราะทุก Routing Decision, Memory Schema และ Verification Threshold ถูก Tune ตามความเป็นจริงของ Domain",
      },
      {
        qEn: "What is the RCT 7 Genome System?",
        qTh: "RCT 7 Genome System คืออะไร?",
        aEn: "The 7 Genome System is the biological metaphor that describes how the RCT Ecosystem's seven core modules interconnect. Just as DNA is a complete, self-referencing blueprint for an organism, the 7 Genome System is a complete, circular architecture for an intelligent AI operating system — G1 (Architect's Blueprint) → G2 (Codex Algorithms) → G3 (JITNA Routing) → G4 (ARTENT Personal Agent OS) → G5 (SignedAI Attestation) → G6 (Vault Sovereignty) → G7 (RCT-7 Mental OS), where G7 feeds performance signals back to G1 for continuous improvement. The key architectural property: all seven genomes share the same data primitives (FDIA score, intent vector, RCTDB memory state), so adding a new capability requires expressing a new genome within an already-understood schema rather than negotiating new integration contracts.",
        aTh: "7 Genome System คือ Metaphor ทางชีวภาพที่อธิบายวิธีที่ 7 Module หลักของ RCT Ecosystem เชื่อมต่อกัน เช่นเดียวกับที่ DNA มี Blueprint สมบูรณ์สำหรับสิ่งมีชีวิต ระบบ 7 Genome มี Architecture แบบวงกลมสมบูรณ์สำหรับระบบปฏิบัติการ AI อัจฉริยะ — G1 (Architect's Blueprint) → G2 (Codex Algorithms) → G3 (JITNA Routing) → G4 (ARTENT Personal Agent OS) → G5 (SignedAI Attestation) → G6 (Vault Sovereignty) → G7 (RCT-7 Mental OS) โดย G7 ป้อนสัญญาณ Performance กลับไป G1 เพื่อการปรับปรุงต่อเนื่อง คุณสมบัติสถาปัตยกรรมที่สำคัญ: Genome ทั้งเจ็ดแชร์ Data Primitives เดียวกัน (FDIA Score, Intent Vector, RCTDB Memory State) ดังนั้นการเพิ่มความสามารถใหม่ต้องการการแสดงออก Genome ใหม่ภายใน Schema ที่เข้าใจแล้ว ไม่ใช่การเจรจา Integration Contract ใหม่",
      },
      {
        qEn: "What is the difference between Tier 3 and Tier 9 in the JITNA Protocol?",
        qTh: "Tier 3 กับ Tier 9 ใน JITNA Protocol ต่างกันอย่างไร?",
        aEn: "JITNA operates across 9 tiers of assembly complexity. Tier 3 is designed for lightweight, single-domain tasks — one intent capture phase, no external knowledge enrichment, no multi-model consensus. It is fast (warm recall <50ms) and cheap, suitable for FAQ-style responses, structured data lookups, and low-risk conversational queries. Tier 9 is the full assembly path — all 5 JITNA phases execute sequentially (Intent Capture → Data Enrichment → Delta Synthesis → Architect Review → Response Delivery), multi-agent consensus is required across all 7 HexaCore models, FDIA gating enforces the highest quality threshold (D>0.9), and a constitutional approval is required before any output is released. Tier 9 is used for decisions with legal, financial, medical, or irreversible implications. The practical rule: use the lowest tier that satisfies the quality requirement for the query — never over-tier routine tasks.",
        aTh: "JITNA ทำงาน 9 ระดับความซับซ้อน Tier 3 ออกแบบสำหรับงานเบาๆ ที่เป็น single-domain — Intent Capture เพียงเฟสเดียว ไม่มี external knowledge enrichment ไม่มี multi-model consensus รวดเร็ว (warm recall <50ms) และต้นทุนต่ำ เหมาะสำหรับ FAQ-style responses, structured data lookups และ conversational queries ความเสี่ยงต่ำ Tier 9 คือเส้นทาง assembly เต็มรูปแบบ — ทั้ง 5 เฟส JITNA ทำงานตามลำดับ (Intent Capture → Data Enrichment → Delta Synthesis → Architect Review → Response Delivery) ต้องการ multi-agent consensus ครบ 7 โมเดล HexaCore, FDIA gating บังคับ threshold คุณภาพสูงสุด (D>0.9) และต้องได้รับ constitutional approval ก่อนปล่อย output ใดๆ Tier 9 ใช้สำหรับการตัดสินใจที่มีผลทางกฎหมาย การเงิน การแพทย์ หรือไม่สามารถย้อนกลับได้ กฎเชิงปฏิบัติ: ใช้ tier ต่ำสุดที่ตอบสนองข้อกำหนดคุณภาพของ query เสมอ อย่า over-tier งาน routine",
      },
      {
        qEn: "What does 'zero unmanaged LLM calls' mean in practice?",
        qTh: "'Zero unmanaged LLM calls' หมายความว่าอะไรในทางปฏิบัติ?",
        aEn: "In most enterprise AI deployments, applications call LLM provider APIs directly — the only governance is the system prompt, which the model may or may not follow. In the RCT Control Plane, every LLM call must carry a cryptographically signed execution token issued by the Control Plane after the request passed FDIA scoring and all 15 DSL policy modules. Without this token, no model call is permitted. This means every LLM interaction in the system has a verifiable audit record: which model was called, under which authorization, with which input, producing which output, at what latency and cost. If a call produces a policy violation, you can trace it to the exact authorization context that permitted it — and know with certainty whether any calls occurred outside that governance envelope.",
        aTh: "ใน enterprise AI deployment ส่วนใหญ่ application เรียก LLM API โดยตรง — การกำกับดูแลมีเพียง system prompt ที่โมเดลอาจปฏิบัติตามหรือไม่ก็ได้ ใน RCT Control Plane ทุกการเรียก LLM ต้องมี token การอนุญาตที่ลงลายเซ็นด้วย cryptography ซึ่งออกโดย Control Plane หลังจาก request ผ่าน FDIA scoring และ DSL policy modules ทั้ง 15 ตัวแล้ว ถ้าไม่มี token จะไม่อนุญาตการเรียกโมเดลใดๆ ซึ่งหมายความว่าทุก LLM interaction ในระบบมี audit record ที่ตรวจสอบได้: เรียก model ไหน ภายใต้การอนุญาตใด ด้วย input อะไร ให้ output อะไร ใช้เวลาและต้นทุนเท่าไร ถ้าการเรียกสร้าง policy violation คุณสามารถ trace กลับไปยัง authorization context ที่อนุญาตมันได้ — และรู้ด้วยความแน่นอนว่ามีการเรียกใดๆ นอก governance envelope นี้หรือไม่",
      },
      {
        qEn: "How does the RCT Specialist Studio adapt to specific industries?",
        qTh: "RCT Specialist Studio ปรับตัวให้เหมาะกับแต่ละอุตสาหกรรมอย่างไร?",
        aEn: "The Specialist Studio works through three customization layers stacked on top of the core RCT Platform. First, domain-specific FDIA calibration: what counts as 'desirable' (high D score) or 'authorized' (A gate open) is defined per vertical — in medical, explicit drug dosing recommendations require Tier 8 consensus; in legal, jurisdiction-specific statutory citations require provenance verification. Second, custom Verification Tier assignments: a medical Specialist Studio might mandate TIER_6 verification for all clinical summaries regardless of input confidence, while a financial studio mandates TIER_8 for all trade recommendations. Third, constitutional prohibitions specific to that field: a PDPA-configured studio cannot return Thai personal data without explicit consent markers in the RCTDB memory record. The result is a platform that behaves like a domain expert system — not because it has been fine-tuned on domain data, but because its routing, verification, and policy layers have been calibrated to domain reality.",
        aTh: "Specialist Studio ทำงานผ่าน 3 ชั้นการปรับแต่งที่ซ้อนทับ Platform หลักของ RCT ชั้นแรก — FDIA calibration เฉพาะ domain: อะไรนับว่า 'น่าต้องการ' (D score สูง) หรือ 'ได้รับอนุญาต' (A gate เปิด) ถูกกำหนดต่อ vertical — ในการแพทย์ คำแนะนำยาที่ชัดเจนต้องการ Tier 8 consensus; ในกฎหมาย การอ้างอิงกฎหมายเฉพาะเขตอำนาจศาลต้องการการตรวจสอบ provenance ชั้นสอง — การกำหนด Verification Tier แบบกำหนดเอง: Specialist Studio ทางการแพทย์อาจบังคับ TIER_6 สำหรับ clinical summary ทั้งหมด ชั้นสาม — Constitutional Prohibitions เฉพาะสาขา: Studio ที่กำหนดค่า PDPA ไม่สามารถส่งคืนข้อมูลส่วนบุคคลไทยโดยไม่มี consent markers ใน RCTDB ผลลัพธ์คือ platform ที่ทำงานเหมือนระบบ expert เฉพาะ domain — ไม่ใช่เพราะ fine-tune บนข้อมูล domain แต่เพราะ routing, verification และชั้น policy ถูก calibrate ตาม domain reality แล้ว",
      },
      {
        qEn: "How does RCT handle Thai-language NLP in enterprise deployments?",
        qTh: "RCT จัดการ Thai NLP ในการ Deploy ระดับ Enterprise อย่างไร?",
        aEn: "Thai presents three structural challenges that most AI infrastructure fails to address: (1) No word boundaries in the script — Thai is written without spaces between words, making naive tokenization produce semantically meaningless fragments. RCT uses a dictionary-based maximum matching segmenter seeded with a 65,000-word lexicon, including modern technical and ASEAN government vocabulary. (2) PDPA-sensitive PII embedded in names — Thai names carry cultural and religious markers that constitute personal data under PDPA Section 24. The Regional Language Adapter detects and masks these patterns before any text is transmitted to an external LLM. (3) Code-switching in enterprise communication — Thai enterprise teams routinely mix Thai and English in a single message. The adapter handles this as a first-class pattern with bidirectional segmentation and independent FDIA scoring for each language segment. The net result: Thai inputs receive equivalent FDIA scoring fidelity to English, with 98.7% PII detection recall and <12ms latency overhead per 1,000 tokens.",
        aTh: "ภาษาไทยมีความท้าทายเชิงโครงสร้าง 3 ประการที่ Infrastructure AI ส่วนใหญ่ไม่ได้แก้ไข: (1) ไม่มีขอบเขตคำในตัวอักษร — ภาษาไทยเขียนโดยไม่มีช่องว่างระหว่างคำ ทำให้การ Tokenize แบบ Naive สร้าง Fragment ที่ไม่มีความหมาย RCT ใช้ Segmenter แบบ Dictionary-based Maximum Matching ที่ Seed ด้วย Lexicon 65,000 คำ (2) PII ตาม PDPA ฝังอยู่ในชื่อ — ชื่อไทยมีตัวบ่งชี้ทางวัฒนธรรมและศาสนาที่ถือเป็นข้อมูลส่วนบุคคลตาม PDPA มาตรา 24 Regional Language Adapter ตรวจจับและ Mask รูปแบบเหล่านี้ก่อนส่งข้อความไปยัง LLM ภายนอก (3) Code-switching ในการสื่อสารขององค์กร — ทีม Enterprise ไทยผสม Thai และ English ในข้อความเดียวเป็นประจำ Adapter จัดการสิ่งนี้เป็นรูปแบบ First-class ด้วย Bidirectional Segmentation และการให้คะแนน FDIA อิสระสำหรับแต่ละ Language Segment ผลสุทธิ: Input ภาษาไทยได้รับความแม่นยำ FDIA Scoring เทียบเท่ากับภาษาอังกฤษ PII Detection Recall 98.7% และ Latency Overhead <12ms ต่อ 1,000 tokens",
      },
      {
        qEn: "What makes ASEAN enterprise AI deployment different from global deployments?",
        qTh: "การ Deploy Enterprise AI ในระดับ ASEAN แตกต่างจาก Global Deployments อย่างไร?",
        aEn: "ASEAN deployments face three compounding challenges that single-jurisdiction global deployments do not: (1) Regulatory fragmentation — 10 member states operate under 7 different data protection frameworks with incompatible requirements. Thailand's PDPA requires explicit consent for automated profiling; Indonesia's PDP Law requires electronic system accountability documentation; Singapore's framework treats these as best practices rather than legal obligations. A compliant system in one jurisdiction may be non-compliant in another for the same AI feature. (2) Language diversity with governance implications — ASEAN enterprises commonly operate in Thai, Indonesian, Vietnamese, and English simultaneously. Each language requires adapted tokenization, and Thai requires PDPA-specific PII masking before LLM transmission. (3) Data residency conflicts — Indonesia mandates in-country processing for strategic sectors; Thailand requires audit logs with 7-year retention; Singapore has cross-border transfer rules. RCT handles this through jurisdiction-specific configuration blocks in rct_governance.yaml, allowing a single deployment to apply different governance rules per user's data residency without separate engineering builds per country.",
        aTh: "การ Deploy ระดับ ASEAN เผชิญความท้าทาย 3 ประการที่ Global Deployments ประเทศเดียวไม่ต้องเผชิญ: (1) Regulatory Fragmentation — 10 ประเทศสมาชิกดำเนินการภายใต้กรอบการคุ้มครองข้อมูล 7 ฉบับที่มีข้อกำหนดไม่เข้ากัน PDPA ไทยต้องการความยินยอมอย่างชัดแจ้งสำหรับ Automated Profiling; PDP Law อินโดนีเซียต้องการเอกสาร Accountability ระบบอิเล็กทรอนิกส์; กรอบ Singapore ถือว่าสิ่งเหล่านี้เป็น Best Practices ไม่ใช่ข้อบังคับทางกฎหมาย ระบบที่ปฏิบัติตามกฎหมายในเขตอำนาจหนึ่งอาจไม่ปฏิบัติตามในอีกเขตหนึ่งสำหรับฟีเจอร์ AI เดียวกัน (2) Language Diversity ที่มีผลด้าน Governance — Enterprise ASEAN มักดำเนินการเป็นภาษาไทย อินโดนีเซีย เวียดนาม และอังกฤษพร้อมกัน แต่ละภาษาต้องการ Tokenization ที่ปรับตาม และภาษาไทยต้องการ PDPA PII Masking ก่อนส่ง LLM (3) Data Residency Conflicts — อินโดนีเซียบังคับ In-country Processing สำหรับภาค Strategic; ไทยต้องการ Audit Logs เก็บ 7 ปี; Singapore มีกฎ Cross-border Transfer RCT จัดการสิ่งนี้ผ่าน Configuration Blocks เฉพาะเขตอำนาจใน rct_governance.yaml ทำให้ Deploy เดียวสามารถใช้กฎ Governance ที่แตกต่างกันต่อ Data Residency ของแต่ละ User โดยไม่ต้องสร้าง Engineering Build แยกต่อประเทศ",
      },
    ],
  },
  {
    id: "deployment",
    labelEn: "Deployment & Integration",
    labelTh: "การ Deploy และ Integration",
    icon: Tag,
    items: [
      {
        qEn: "What infrastructure does RCT require?",
        qTh: "RCT ต้องการ Infrastructure อะไรบ้าง?",
        aEn: "RCT runs across a 62-microservice architecture with PostgreSQL, Redis, and optional Ollama for local LLM inference. Minimum local evaluation setups can start smaller, while enterprise deployments can scale into containerized runtime boundaries and Kubernetes-style orchestration.",
        aTh: "RCT ทำงานบนสถาปัตยกรรม 62 microservices พร้อม PostgreSQL, Redis และ Ollama (optional) สำหรับ local LLM inference โดยการประเมินในเครื่องเริ่มจากสเกลเล็กได้ และการ deploy ระดับองค์กรสามารถขยายไปยัง containerized runtime boundaries และ Kubernetes-style orchestration",
      },
      {
        qEn: "Does RCT support external integrations?",
        qTh: "RCT รองรับ External Integrations หรือไม่?",
        aEn: "Yes. RCT supports multiple integration surfaces including REST APIs, MCP (Model Context Protocol), Slack-style workflow bridges, and governed runtime adapters. The integration model is designed around policy, verification, and enterprise routing rather than a single connector style.",
        aTh: "ใช่ RCT รองรับ integration surfaces หลายรูปแบบ เช่น REST APIs, MCP (Model Context Protocol), workflow bridges แบบ Slack และ governed runtime adapters โดยออกแบบรอบ policy, verification และ enterprise routing ไม่ได้ยึดติดกับ connector แบบเดียว",
      },
      {
        qEn: "How does RCT handle PDPA data residency requirements in Thailand?",
        qTh: "RCT จัดการข้อกำหนด PDPA Data Residency ในประเทศไทยอย่างไร?",
        aEn: "RCT's PDPA compliance is architectural, not procedural. RCTDB enforces data residency at the storage layer: personal data tagged with Thai jurisdiction remains within designated hot/warm zones and cannot be replicated to foreign infrastructure without explicit Architect-level authorization (A gate). Erasure requests are processed within 200ms and propagate through all delta chain tiers — not just the primary record but every cached, derived, and warm-recalled copy. This is verified by L6 Security Tests that run on every commit. The governance memory tier maintains a PDPA audit trail (what was stored, why, who accessed it, and when it was erased) in a format exportable for regulatory review without requiring technical staff assistance.",
        aTh: "การ comply PDPA ของ RCT เป็นสถาปัตยกรรม ไม่ใช่แค่ขั้นตอน RCTDB บังคับ data residency ที่ระดับ storage: ข้อมูลส่วนบุคคลที่ tagged ด้วย Thai jurisdiction จะอยู่ใน hot/warm zones ที่กำหนดไว้และไม่สามารถ replicate ไปยัง foreign infrastructure ได้โดยไม่มีการอนุญาตระดับ Architect (A gate) การ erasure request ประมวลผลภายใน 200ms และ propagate ผ่านทุก tier ของ delta chain — ไม่ใช่แค่ record หลัก แต่รวมถึงทุก cached, derived และ warm-recalled copy ยืนยันโดย L6 Security Tests ที่รันทุก commit Governance memory tier รักษา PDPA audit trail (อะไรถูกเก็บ, ทำไม, ใครเข้าถึง และเมื่อไรที่ถูกลบ) ในรูปแบบที่ export ได้สำหรับการตรวจสอบโดย regulator โดยไม่ต้องขอความช่วยเหลือจาก technical staff",
      },
    ],
  },
  {
    id: "pricing",
    labelEn: "Pricing & Plans",
    labelTh: "ราคาและแผน",
    icon: History,
    items: [
      {
        qEn: "What are the pricing tiers?",
        qTh: "มีแผนราคาอะไรบ้าง?",
        aEn: "Delentia Labs offers three tiers: Delentia Platform Core (open source, free), DelentiaAI Enterprise (commercial, contact for pricing), and SignedAI Governance (enterprise contract). The JITNA Protocol and core 41 algorithms are always free under Apache 2.0.",
        aTh: "Delentia Labs มี 3 Tier: Delentia Platform Core (open source, ฟรี), DelentiaAI Enterprise (เชิงพาณิชย์ ติดต่อสอบถาม) และ SignedAI Governance (Enterprise Contract) โดย JITNA Protocol และ 41 Algorithms หลักฟรีตลอดภายใต้ Apache 2.0",
      },
      {
        qEn: "Is there a free trial for enterprise features?",
        qTh: "มี free trial สำหรับ enterprise features หรือไม่?",
        aEn: "Yes — you can run the full RCT stack locally with Docker. Enterprise features like multi-tenant management, SLA-backed support, and managed cloud hosting are available through a paid plan. Contact us via the contact form for an enterprise demo.",
        aTh: "ใช่ — คุณสามารถรัน RCT Stack ทั้งหมดในเครื่องด้วย Docker ได้ Enterprise Features เช่น Multi-tenant Management, SLA-backed Support และ Managed Cloud Hosting มีให้ผ่านแผนที่ต้องชำระเงิน ติดต่อผ่านแบบฟอร์มสำหรับ Enterprise Demo",
      },
    ],
  },
] as const

const versions = [
  { ver: "5.4.5", name: "Full Suite Green — 4,849 Tests", date: "2026-03-21", status: "LATEST" },
  { ver: "2.7.0", name: "Enterprise Integration Suite", date: "2026-03-10", status: "PRODUCTION" },
  { ver: "2.1.0", name: "Enterprise Refactor Edition", date: "2026-02-15", status: "PRODUCTION" },
  { ver: "8.0", name: "Universal Integration & Open Standard", date: "2026-02-02", status: "PRODUCTION" },
  { ver: "7.0", name: "Complete Ecosystem Edition", date: "2026-01-31", status: "PRODUCTION" },
  { ver: "6.0", name: "Ultimate Testing & Integration", date: "2026-01-20", status: "PRODUCTION" },
  { ver: "5.0", name: "Genome Edition", date: "2026-01-15", status: "STABLE" },
  { ver: "3.0", name: "Cross-chat Integration", date: "2026-01-10", status: "STABLE" },
  { ver: "1.0", name: "Foundation", date: "2025-12-01", status: "STABLE" },
] as const

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-4 text-left transition-colors hover:text-warm-amber"
      >
        <span className="text-sm font-medium leading-relaxed text-foreground">{q}</span>
        <ChevronDown size={18} className={`mt-0.5 shrink-0 text-warm-amber transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="pb-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{a}</p>
        </div>
      ) : null}
    </div>
  )
}

export function FAQClient({ locale }: FAQClientProps) {
  const isTh = locale === "th"
  const [activeCategory, setActiveCategory] = useState("general")

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar locale={locale} />
      <section className="mx-auto max-w-7xl px-4 py-20 text-center md:py-28">
        <div className="mx-auto max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-warm-amber/30 bg-warm-amber/10 px-4 py-1.5 text-sm font-medium text-warm-amber">
            <HelpCircle className="h-4 w-4" />
            {isTh ? "คำถามที่พบบ่อย" : "FAQ & Knowledge Base"}
          </div>
          <h1 className="text-5xl font-bold text-foreground">{isTh ? "คำถามที่พบบ่อย" : "Frequently Asked Questions"}</h1>
          <p className="text-lg text-muted-foreground">
            {isTh
              ? "ทุกสิ่งที่คุณต้องรู้เกี่ยวกับ RCT Ecosystem — ตั้งแต่พื้นฐานถึงเทคนิคเชิงลึก"
              : "Everything you need to know about the RCT Ecosystem — from basics to technical deep-dives."}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="flex flex-col gap-8 md:flex-row">
          <aside className="shrink-0 md:w-48">
            <nav className="sticky top-24 space-y-1">
              {faqCategories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeCategory === cat.id ? "border border-warm-amber/30 bg-warm-amber/10 text-warm-amber" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0" />
                      {isTh ? cat.labelTh : cat.labelEn}
                    </span>
                  </button>
                )
              })}
            </nav>
          </aside>
          <div className="flex-1 space-y-8">
            <div className="rounded-2xl border border-border bg-card/70 p-6">
              {faqCategories.filter((cat) => cat.id === activeCategory).map((cat) => (
                <div key={cat.id}>
                  <h2 className="mb-5 text-2xl font-bold text-foreground">{isTh ? cat.labelTh : cat.labelEn}</h2>
                  {cat.items.map((item) => (
                    <AccordionItem key={item.qEn} q={isTh ? item.qTh : item.qEn} a={isTh ? item.aTh : item.aEn} />
                  ))}
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-warm-amber">
                {isTh ? "ประวัติเวอร์ชัน" : "Version History"}
              </div>
              <div className="space-y-3">
                {versions.map((version) => (
                  <div key={version.ver} className="flex flex-col gap-2 rounded-xl border border-border/70 bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="font-semibold text-foreground">{version.ver} — {version.name}</div>
                      <div className="text-sm text-muted-foreground">{version.date}</div>
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-warm-amber">{version.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
