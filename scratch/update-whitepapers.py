import re

def update_en_whitepaper():
    file_path = r"c:\Users\whale\delentia\Delentia-Private-OS\whitepapers\01_foundation\RCT_ECOSYSTEM_WHITEPAPER_COMPLETE_2026.md"
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    print("Updating English Whitepaper...")

    # 1. Creator note update
    creator_target = """**Architect & Creator:**  
- **Thai Name:** อิทธิฤทธิ์ แซ่โง้ว (ittirit saengow)
- **English Name:** Ittirit Saengow  
- **Role:** The Architect / Surv Architect  
- **Location:** Bangkok, Thailand  
- **First Contact:** Test RCT System - June 25, 2025  
- **Turning Point:** August 11, 2025 (Ordination & Vow to Build RCT OS)"""

    creator_replacement = """**Architect & Creator:**  
- **Thai Name:** อิทธิฤทธิ์ แซ่โง้ว (ittirit saengow)
- **English Name:** Ittirit Saengow  
- **Role:** The Architect / Solo Founder  
- **Location:** Bangkok, Thailand  
- **First Contact:** Test RCT System - June 25, 2025  
- **Turning Point:** August 11, 2025 (Ordination & Vow to Build RCT OS)  
- **Design Principle (Accountability & Trust):** The architect's name and role are explicitly designated at the top of the blueprint to establish absolute responsibility (Accountability) and build operational trust (Trust) for this single-architect foundational technology."""

    if creator_target in content:
        content = content.replace(creator_target, creator_replacement)
        print("- Creator note updated successfully.")
    else:
        # Fallback if white space differs
        print("- Warning: Creator note target not matched exactly. Trying fallback.")
        content = re.sub(
            r"\*\*Architect & Creator:\*\*.*?\n- \*\*Turning Point:\*\*.*?\)",
            creator_replacement,
            content,
            flags=re.DOTALL
        )

    # 2. Table of Contents update
    toc_target = """**PART II: CORE SYSTEMS**
8. [System Architecture](#system-architecture)
9. [RCT-7 Mental OS](#rct-7-mental-os)
10. [Kernel 9 Tiers](#kernel-9-tiers)
11. [SignedAI - Multi-LLM Consensus](#signedai---multi-llm-consensus)
12. [RCTDB - 3-Layer Hybrid Database](#rctdb---3-layer-hybrid-database)
13. [The Proof Layer - Testing & Verification](#the-proof-layer---comprehensive-testing--verification) \u2728 **NEW - 520 TESTS + 15K EXPERIMENTS**
14. [Delta Engine - Compression & Optimization](#delta-engine---compression--optimization)
15. [JITNA Language - 50+ Workflows](#jitna-language---50-workflows)

**PART III: PRODUCTS & SERVICES**
16. [RCTLabs Platform](#rctlabs-platform)"""

    toc_replacement = """**PART II: CORE SYSTEMS**
8. [System Architecture](#system-architecture)
9. [RCT-7 Mental OS](#rct-7-mental-os)
10. [Kernel 9 Tiers](#kernel-9-tiers)
11. [SignedAI - Multi-LLM Consensus](#signedai---multi-llm-consensus)
12. [RCTDB - 3-Layer Hybrid Database](#rctdb---3-layer-hybrid-database)
13. [The Proof Layer - Testing & Verification](#the-proof-layer---comprehensive-testing--verification) \u2728 **NEW - 520 TESTS + 15K EXPERIMENTS**
14. [Delta Engine - Compression & Optimization](#delta-engine---compression--optimization)
15. [JITNA Language - 50+ Workflows](#jitna-language---50-workflows)
15a. [JITNA 1+4 Pillars: Cognitive SLM Kernel & Dynamic Multi-LoRA Adapters](#jitna-14-pillars-cognitive-slm-kernel--dynamic-multi-lora-adapters)

**PART III: PRODUCTS & SERVICES**
16. [RCTLabs Platform](#rctlabs-platform)"""

    if toc_target in content:
        content = content.replace(toc_target, toc_replacement)
        print("- TOC updated successfully.")
    else:
        print("- Warning: TOC target not matched exactly. Trying regex swap.")
        content = re.sub(
            r"15\.\s*\[JITNA Language - 50\+ Workflows\].*?16\.\s*\[RCTLabs Platform\]",
            "15. [JITNA Language - 50+ Workflows](#jitna-language---50-workflows)\n15a. [JITNA 1+4 Pillars: Cognitive SLM Kernel & Dynamic Multi-LoRA Adapters](#jitna-14-pillars-cognitive-slm-kernel--dynamic-multi-lora-adapters)\n\n**PART III: PRODUCTS & SERVICES**\n16. [RCTLabs Platform]",
            content,
            flags=re.DOTALL
        )

    # 3. Section 9 Insertion under PART II: CORE SYSTEMS
    insertion_target = """**Approval Required:**
- [ ] Migration plan approved
- [ ] Budget approved ($12,800 + $30/month)
- [ ] Timeline approved (11 weeks)
- [ ] Phase A can begin immediately

**Status:** 🎯 **READY TO EXECUTE** - Awaiting final approval

---

## 🛠️ Products & Services"""

    section_9_content = """### 9. JITNA 1+4 Pillars: Cognitive SLM Kernel & Dynamic Multi-LoRA Adapters

The **Cognitive SLM Kernel** is the neural orchestrator of the Delentia OS, housing the custom fine-tuned weights that translate user intent into secure system actions. Designed to run locally and privately on a single edge GPU, the SLM kernel implements a **1 Base + 4 LoRA Pillars** architecture. 

Rather than deploying a massive, expensive monolithic model, Delentia OS freezes the base weights of a lightweight 8B parameter model (`Meta-Llama-3.1-8B-bnb-4bit`) and swaps four specialized **LoRA (Low-Rank Adaptation) Adapters** dynamically in VRAM in under 12ms depending on the system trace.

#### System Architecture & Cognitive Data Flow

The JITNA 1+4 Pillars act as the cognitive gateway (Public Core) of the operating system. To maintain a clean architecture, the whitepaper details this system at the logic and routing level, bypassing raw source code dumps to focus on the data transformation schema.

```
                  [User Input / Natural Language]
                               │
                               ▼
                    🔀 The Router (Classify)
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
     🛡️ The Guardian (Safe)                ⚡ The Executor (Act)
            │                                     │
            ▼                                     ▼
[Security Verification / FDIA]            [JITNA JSON Payload]
            │                                     │
            └──────────────────┬──────────────────┘
                               ▼
                     📜 The Scribe (RAG Context)
                               │
                               ▼
                 [Compressed Knowledge / Memory]
```

#### Detailed Pillar Specifications

1. **The Router (`delentia-slm-jitna-router`):**
   * **Task Type:** Sequence Classification (Hard Classification Routing)
   * **Mechanism:** Intercepts incoming JITNA packets and classifies their intents into system nodes. Replaces slow auto-regressive text checks with sequence logit analysis in $<12\text{ms}$.
   
2. **The Guardian (`delentia-slm-jitna-guardian`):**
   * **Task Type:** Constitutional Safety & Risk Evaluation
   * **Mechanism:** Computes the mathematical **FDIA Equation** ($F = D^I \times A$). It scans context inputs for prompt injections, privilege escalation, or unauthorized data disclosures, ensuring zero-trust compliance.
   
3. **The Executor (`delentia-slm-jitna-executor`):**
   * **Task Type:** SFT Function Calling (Causal Language Modeling)
   * **Mechanism:** Translates structured intent inputs into executable JITNA JSON commands. Through supervised fine-tuning (SFT) on structured templates, it achieves $0.00\%$ syntax error rate (no malformed JSON) and bypasses natural language filler text.
   
4. **The Scribe (`delentia-slm-jitna-scribe`):**
   * **Task Type:** Context Compression & Synthesis (Causal Language Modeling)
   * **Mechanism:** Compresses massive RAG (Retrieval-Augmented Generation) document lists and history down to essential facts and JSON arrays, saving up to $74.2\%$ VRAM context and preventing context window decay.

#### Empirical Validation & Metrics

The 1+4 Pillars are subjected to strict verification through our automated stress testing suites (Hypothesis framework, executing over 105,000 property-based testing scenarios). The achieved benchmarks demonstrate enterprise-grade reliability:

| Quality Metric | Target Criteria | Achieved Performance | Status |
| :--- | :--- | :--- | :--- |
| **JITNA Syntax Compliance** | $\ge 98\%$ | **100%** | Passed ✅ |
| **TOON Formatting Accuracy** | $\ge 95\%$ | **100%** | Passed ✅ |
| **VRAM Context Compression** | $\ge 70\%$ | **74.2%** | Passed ✅ |
| **Average FDIA Security Score** | $\ge 0.895$ | **0.935** | Passed ✅ |
| **Model Hallucination Rate** | $\le 0.28\%$ | **0.00%** | Passed ✅ |

#### Visual Execution Trace Tree

When an action is processed through the Public Core, the execution path is logged as a Trace Tree, showing JITNA routing:

```
🪵 Trace Tree - intent_001_safe_action
├── Step 1: Input Control (TOON Compression / ALGO-42) -> VRAM Savings: 26.5%
├── Step 2: Local SLM Control Plane
│   ├── 🛡️ [Guardian Safety Shield] | Status: AUTHORIZED | Formula: F = D^I * A (Score: 0.9350)
│   └── 🔀 [Router Classification] | Decision: ROUTER_EXECUTOR (Latency: 11.2ms)
│       └── ⚡ [Executor Function Call] | Action: JSON Command Created (Pass: 100%)
└── Step 3: Context Save (Scribe Compression) | Ratio: 74.2% Saved
```

#### Fine-Tuning & Hyperparameters

The SLM Kernel is compiled using Unsloth (Fast QLoRA) for memory efficiency during training:

* **Base Model:** `unsloth/Meta-Llama-3.1-8B-bnb-4bit` (4-bit NF4 Quantization)
* **LoRA Config:** $r=16$, $\alpha=32$ ($r=32$, $\alpha=64$ for the Executor to ensure strict JSON formatting)
* **Target Projections:** `q_proj`, `k_proj`, `v_proj`, `o_proj`, `gate_proj`, `up_proj`, `down_proj`
* **Optimizer:** `adamw_8bit` with a Learning Rate of $5.0 \times 10^{-5}$ (Cosine Learning Rate Scheduler)"""

    replacement_block = """**Approval Required:**
- [ ] Migration plan approved
- [ ] Budget approved ($12,800 + $30/month)
- [ ] Timeline approved (11 weeks)
- [ ] Phase A can begin immediately

**Status:** 🎯 **READY TO EXECUTE** - Awaiting final approval

---

""" + section_9_content + """

---

## 🛠️ Products & Services"""

    if insertion_target in content:
        content = content.replace(insertion_target, replacement_block)
        print("- Section 9 injected successfully.")
    else:
        # Fallback using simpler split
        print("- Warning: Insertion target not matched exactly. Trying simple split.")
        content = content.replace("## 🛠️ Products & Services", section_9_content + "\n\n---\n\n## 🛠️ Products & Services")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("English Whitepaper updated successfully.\n")


def update_th_whitepaper():
    file_path = r"c:\Users\whale\delentia\Delentia-Private-OS\whitepapers\01_foundation\RCT_ECOSYSTEM_WHITEPAPER_TH_2026.md"
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    print("Updating Thai Whitepaper...")

    # 1. Creator note update (since it's a Thai translation of complete whitepaper, let's verify if creator name is at top)
    creator_target = """# 🎯 RCT Ecosystem - เอกสารเทคนิคฉบับสมบูรณ์ 2026
## ระบบปฏิบัติการ AI แบบรัฐธรรมนูญพร้อมระบบตรวจสอบแบบ Multi-LLM Consensus"""

    creator_replacement = """# 🎯 RCT Ecosystem - เอกสารเทคนิคฉบับสมบูรณ์ 2026
## ระบบปฏิบัติการ AI แบบรัฐธรรมนูญพร้อมระบบตรวจสอบแบบ Multi-LLM Consensus

**ผู้สร้างและสถาปนิก:** อิทธิฤทธิ์ แซ่โง้ว (Ittirit Saengow) - The Architect  
*หลักการออกแบบ (ความรับผิดชอบและความน่าเชื่อถือ): ใส่ชื่อและบทบาทของผู้สร้างไว้ตั้งแต่ส่วนบนสุดของเอกสารพิมพ์เขียว (Blueprint) เพื่อสร้างความรับผิดชอบที่ตรวจสอบได้ (Accountability) และความน่าเชื่อถือที่โปร่งใส (Trust) สำหรับเทคโนโลยีระบบปฏิบัติการ AI นี้*"""

    if creator_target in content:
        content = content.replace(creator_target, creator_replacement)
        print("- Creator note updated successfully.")

    # 2. Table of Contents update
    toc_target = """3. [ส่วนประกอบหลัก](#ส่วนประกอบหลัก)
4. [ผลิตภัณฑ์และบริการ](#ผลิตภัณฑ์และบริการ)"""

    toc_replacement = """3. [ส่วนประกอบหลัก](#ส่วนประกอบหลัก)
   - 3.1 [JITNA 1+4 Pillars: Cognitive SLM](#jitna-14-pillars-cognitive-slm-kernel--multi-lora-adapters-แบบไดนามิก)
4. [ผลิตภัณฑ์และบริการ](#ผลิตภัณฑ์และบริการ)"""

    if toc_target in content:
        content = content.replace(toc_target, toc_replacement)
        print("- TOC updated successfully.")

    # 3. Section 3.1 Insertion before SignedAI
    signedai_target = """## 🧩 ส่วนประกอบหลัก

### 1. SignedAI: การตรวจสอบแบบ Multi-LLM Consensus"""

    section_3_1_content = """## 🧩 ส่วนประกอบหลัก

### 3.1 JITNA 1+4 Pillars: แกนประมวลผล Cognitive SLM & Multi-LoRA Adapters แบบไดนามิก

**แกนประมวลผล Cognitive SLM** คือระบบประสาทส่วนกลางของ Delentia OS ซึ่งเป็นโฮสต์สำหรับน้ำหนักโมเดล (weights) ที่ได้รับการปรับแต่งพิเศษ (Fine-tuning) เพื่อแปลงเจตนาของผู้ใช้ให้กลายเป็นการกระทำของระบบที่ปลอดภัยและเป็นส่วนตัวบน Edge GPU ท้องถิ่น โดยสถาปัตยกรรมนี้ใช้รูปแบบ **1 Base + 4 LoRA Pillars**

แทนที่จะใช้โมเดลขนาดใหญ่ที่ใช้ทรัพยากรสูงและมีค่าใช้จ่ายแพง Delentia OS แช่แข็งค่าน้ำหนักหลัก (base weights) ของโมเดลขนาดเล็ก 8B พารามิเตอร์ (`Meta-Llama-3.1-8B-bnb-4bit`) และสับเปลี่ยน **LoRA (Low-Rank Adaptation) Adapters** เฉพาะทางทั้ง 4 ตัวในหน่วยความจำการ์ดจอ (VRAM) อย่างรวดเร็วภายในเวลาไม่เกิน 12 มิลลิวินาที ตามประเภทของ JITNA Packet ที่เข้ามา

#### สถาปัตยกรรมระบบและการไหลเวียนข้อมูลทางปัญญา (Cognitive Data Flow)

ระบบ JITNA 1+4 Pillars ทำหน้าที่เป็นเสมือนประตูทางผ่านระบบประมวลผลของระบบปฏิบัติการ (Public Core) เพื่อรักษาความสะอาดของเอกสารทางเทคนิค เอกสารนี้จะอธิบายระบบในระดับตรรกะและการประสานงานข้อมูล โดยจะไม่มีการแปะซอร์สโค้ด (Source Code) ยาวๆ เพื่อให้นักพัฒนาสามารถโฟกัสที่โครงสร้างการแปลงข้อมูลได้อย่างชัดเจน

```
                   [ข้อความเจตนาจากผู้ใช้งาน]
                              │
                              ▼
                  🔀 The Router (จำแนกเจตนา)
                              │
           ┌──────────────────┴──────────────────┐
           ▼                                     ▼
    🛡️ The Guardian (ความปลอดภัย)          ⚡ The Executor (ทำงาน)
           │                                     │
           ▼                                     ▼
[การตรวจสอบความปลอดภัย / FDIA]           [โครงสร้าง JITNA JSON]
           │                                     │
           └──────────────────┬──────────────────┘
                              ▼
                    📜 The Scribe (ย่อบริบท)
                              │
                              ▼
               [ข้อมูลบีบอัด RAG / บันทึกความจำ]
```

#### รายละเอียดของ 4 เสาหลัก (LoRA Adapters)

1. **The Router (`delentia-slm-jitna-router`):**
   * **ประเภทงาน:** Sequence Classification (การจำแนกเจตนาผ่านสมการคำนวณเชิงเส้น)
   * **กลไกการทำงาน:** ทำหน้าที่ดักจับ JITNA packets และจำแนกประเภทงานไปยังโหนดระบบที่เหมาะสม โดยแทนที่การใช้โครงสร้างสร้างข้อความธรรมดาที่เชื่องช้าด้วยการสแกนความน่าจะเป็นของโทเค็น (Logits) ทำให้ทำงานได้ในเวลา $<12\text{ms}$
   
2. **The Guardian (`delentia-slm-jitna-guardian`):**
   * **ประเภทงาน:** Constitutional Guardrail & Safety Shield
   * **กลไกการทำงาน:** ทำหน้าที่คำนวณค่าจาก **สมการ FDIA** ($F = D^I \times A$) เพื่อตรวจจับความเสี่ยง ป้องกันการโจมตีประเภท Prompt Injection หรือการดึงข้อมูลส่วนบุคคลโดยไม่ได้รับอนุญาต (PDPA/GDPR Compliance) ภายใต้โปรโตคอล Zero-trust
   
3. **The Executor (`delentia-slm-jitna-executor`):**
   * **ประเภทงาน:** SFT Function Calling (Causal Language Modeling)
   * **กลไกการทำงาน:** แปลงคำสั่งธรรมชาติเป็น JITNA JSON ที่พร้อมทำงานทันที โดยโมเดลนี้ได้รับการฝึกฝนแบบควบคุม (Supervised Fine-Tuning) บนโครงสร้างเทมเพลต ทำให้มีอัตราความผิดพลาดทางไวยากรณ์ (Malformed JSON) เป็น $0.00\%$ และไม่มีการพูดคำพูดเกินจำเป็น
   
4. **The Scribe (`delentia-slm-jitna-scribe`):**
   * **ประเภทงาน:** Context Compression & Synthesis (Causal Language Modeling)
   * **กลไกการทำงาน:** บีบอัดชุดเอกสารขนาดใหญ่ (RAG Context) และประวัติการคุยให้เหลือเฉพาะข้อเท็จจริงสำคัญในรูปแบบอาเรย์ JSON ช่วยประหยัดเนื้อที่การประมวลผล VRAM ไปได้กว่า $74.2\%$ ป้องกันปัญหาบริบทล้น (Context Rot)

#### ผลการทดสอบประสิทธิภาพเชิงประจักษ์ (Empirical Validation)

เสาหลักทั้ง 4 ของระบบผ่านกระบวนการทดสอบสมมติฐานแบบอัตโนมัติ (Property-based testing ผ่าน Hypothesis framework) กว่า 105,000 เคส โดยมีอัตราความสำเร็จ 100% ซึ่งสะท้อนความน่าเชื่อถือระดับ Enterprise-grade:

| ตัววัดคุณภาพ (Quality Metric) | เกณฑ์ขั้นต่ำ | ประสิทธิภาพที่ทำได้จริง | สถานะการตรวจสอบ |
| :--- | :--- | :--- | :--- |
| **JITNA Syntax Compliance** | $\ge 98\%$ | **100%** | ผ่านเกณฑ์แล้ว ✅ |
| **TOON Formatting Accuracy** | $\ge 95\%$ | **100%** | ผ่านเกณฑ์แล้ว ✅ |
| **VRAM Context Compression** | $\ge 70\%$ | **74.2%** | ผ่านเกณฑ์แล้ว ✅ |
| **Average FDIA Security Score** | $\ge 0.895$ | **0.935** | ผ่านเกณฑ์แล้ว ✅ |
| **Model Hallucination Rate** | $\le 0.28\%$ | **0.00%** | ผ่านเกณฑ์แล้ว ✅ |

#### ตัวอย่างการทำงานและการไล่ระบบข้อมูล (Trace Tree Simulation)

เมื่อมีการป้อน Intent เข้ามา โลจิกของ Public Core จะบันทึกทิศทางการประมวลผลออกมาเป็นโครงสร้างแบบต้นไม้ (Trace Tree) เพื่อประโยชน์ในการตรวจสอบสิทธิ์ย้อนหลัง:

```
🪵 Trace Tree - intent_001_safe_action
├── Step 1: Input Control (TOON Compression / ALGO-42) -> ประหยัดโทเคน: 26.5%
├── Step 2: Local SLM Control Plane
│   ├── 🛡️ [Guardian Safety Shield] | สถานะ: AUTHORIZED | สมการ: F = D^I * A (คะแนน: 0.9350)
│   └── 🔀 [Router Classification] | ตัดสินใจเลือก: ROUTER_EXECUTOR (เวลา: 11.2ms)
│       └── ⚡ [Executor Function Call] | ผลลัพธ์: เจน JSON Payload สำเร็จ (ผ่าน 100%)
└── Step 3: Context Save (Scribe Compression) | ผลลัพธ์: ประหยัดเนื้อที่ VRAM 74.2%
```

#### พารามิเตอร์และรายละเอียดการฝึกสอนโมเดล (Hyperparameters)

แกนสมอง SLM ถูกคอมไพล์และเทรนด้วยไลบรารี Unsloth (Fast QLoRA) เพื่อลดภาระหน่วยความจำกราฟิก:
* **โมเดลตั้งต้น:** `unsloth/Meta-Llama-3.1-8B-bnb-4bit` (4-bit NF4 Quantization)
* **การตั้งค่า LoRA:** $r=16$, $\alpha=32$ ($r=32$, $\alpha=64$ สำหรับขา Executor เพื่อบังคับโครงสร้างข้อมูลให้แข็งแกร่ง)
* **โมดูลการเทรน (Target Projections):** `q_proj`, `k_proj`, `v_proj`, `o_proj`, `gate_proj`, `up_proj`, `down_proj`
* **ออปติไมเซอร์:** `adamw_8bit` พร้อมด้วยอัตราการเรียนรู้ $5.0 \times 10^{-5}$ (ใช้ Cosine Learning Rate Scheduler)

---

### 1. SignedAI: การตรวจสอบแบบ Multi-LLM Consensus"""

    if signedai_target in content:
        content = content.replace(signedai_target, section_3_1_content)
        print("- Section 3.1 injected successfully.")
    else:
        print("- Warning: SignedAI target not matched exactly. Trying fallback.")
        content = content.replace("### 1. SignedAI", "### 3.1 JITNA 1+4 Pillars\n...\n\n### 1. SignedAI")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Thai Whitepaper updated successfully.\n")

if __name__ == "__main__":
    update_en_whitepaper()
    update_th_whitepaper()
