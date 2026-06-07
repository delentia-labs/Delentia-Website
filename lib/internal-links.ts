export type InternalLink = {
  href: string
  label: string
  labelTh?: string
  description?: string
  descriptionTh?: string
}

export const PROTOCOL_LINKS: InternalLink[] = [
  {
    href: "/solutions",
    label: "Enterprise AI Solutions",
    labelTh: "โซลูชัน AI สำหรับองค์กร",
    description: "See how RCT protocols translate into production solutions.",
    descriptionTh: "ดูว่า RCT protocols แปลงเป็นโซลูชันระดับ production อย่างไร",
  },
  {
    href: "/research",
    label: "Research & Publications",
    labelTh: "งานวิจัยและสิ่งพิมพ์",
    description: "Peer into the published research behind the protocols.",
    descriptionTh: "เข้าถึงงานวิจัยที่ตีพิมพ์เบื้องหลัง protocols",
  },
  {
    href: "/architecture",
    label: "10-Layer Architecture",
    labelTh: "สถาปัตยกรรม 10 ชั้น",
    description: "Understand where each protocol fits in the full stack.",
    descriptionTh: "ทำความเข้าใจว่า protocol แต่ละตัวอยู่ที่ใดใน full stack",
  },
]

export const SOLUTION_LINKS: InternalLink[] = [
  {
    href: "/protocols",
    label: "Protocol Specifications",
    labelTh: "ข้อกำหนด Protocol",
    description: "Explore the technical protocols that power each solution.",
    descriptionTh: "สำรวจ protocols ทางเทคนิคที่ขับเคลื่อนแต่ละโซลูชัน",
  },
  {
    href: "/architecture",
    label: "10-Layer Architecture",
    labelTh: "สถาปัตยกรรม 10 ชั้น",
    description: "See the architectural foundation beneath each solution.",
    descriptionTh: "ดูรากฐานสถาปัตยกรรมเบื้องหลังแต่ละโซลูชัน",
  },
  {
    href: "/pricing",
    label: "Pricing & Plans",
    labelTh: "ราคาและแผน",
    description: "Get custom enterprise pricing for your deployment.",
    descriptionTh: "รับราคาสำหรับองค์กรแบบกำหนดเองสำหรับการ deploy ของคุณ",
  },
]

export const RESEARCH_LINKS: InternalLink[] = [
  {
    href: "/protocols",
    label: "Protocol Specifications",
    labelTh: "ข้อกำหนด Protocol",
    description: "The technical specifications backing our research claims.",
    descriptionTh: "ข้อกำหนดทางเทคนิคที่รองรับข้ออ้างงานวิจัยของเรา",
  },
  {
    href: "/whitepaper",
    label: "Whitepaper",
    labelTh: "เอกสาร Whitepaper",
    description: "Download the full architectural whitepaper.",
    descriptionTh: "ดาวน์โหลด whitepaper สถาปัตยกรรมฉบับสมบูรณ์",
  },
  {
    href: "/benchmark-summary",
    label: "Benchmark Summary",
    labelTh: "สรุป Benchmark",
    description: "Review the benchmark data and evaluation methodology.",
    descriptionTh: "ทบทวนข้อมูล benchmark และวิธีการประเมิน",
  },
]

// ── Ecosystem Platform Hub — cross-links for new developer pages ─────────────

export const ECOSYSTEM_LINKS: InternalLink[] = [
  {
    href: "/ecosystem",
    label: "Ecosystem Registry",
    labelTh: "รีจิสทรี Ecosystem",
    description: "Browse channel adapters, AI skills, and platform connectors.",
    descriptionTh: "สำรวจ channel adapters, AI skills และการเชื่อมต่อแพลตฟอร์ม",
  },
  {
    href: "/ecosystem/github",
    label: "GitHub Hub",
    labelTh: "GitHub Hub",
    description: "Explore open-source repositories powering the Delentia stack.",
    descriptionTh: "สำรวจ repositories โอเพนซอร์สที่ขับเคลื่อน Delentia Stack",
  },
  {
    href: "/models",
    label: "AI Models Hub",
    labelTh: "คลัง AI Models",
    description: "Explore fine-tuned Delentia SLMs with JITNA compliance scores.",
    descriptionTh: "สำรวจ Delentia SLMs ที่ผ่านการ fine-tune พร้อมคะแนน JITNA",
  },
  {
    href: "/packages",
    label: "Packages Hub",
    labelTh: "แหล่งรวมแพ็กเกจนักพัฒนา",
    description: "Install the Delentia OS SDK for Python or Node.js.",
    descriptionTh: "ติดตั้ง Delentia OS SDK สำหรับ Python หรือ Node.js",
  },
  {
    href: "/playground",
    label: "Playground & Sandbox",
    labelTh: "ห้องทดลองออนไลน์",
    description: "Run Delentia notebooks on Colab and Kaggle datasets.",
    descriptionTh: "รัน Delentia notebooks บน Colab และ Kaggle datasets",
  },
]

export const DEVELOPER_HUB_LINKS: InternalLink[] = [
  {
    href: "/ecosystem/github/delentia-os",
    label: "Delentia OS (SDK Source)",
    labelTh: "Delentia OS (ซอร์สโค้ด SDK)",
    description: "The Apache 2.0 kernel — read the source, raise issues, contribute.",
    descriptionTh: "Kernel Apache 2.0 — อ่านซอร์สโค้ด ตั้งประเด็น มีส่วนร่วม",
  },
  {
    href: "/packages/pypi",
    label: "Python SDK (PyPI)",
    labelTh: "Python SDK (PyPI)",
    description: "pip install delentia-os — full JITNA v3 stack for Python 3.10+.",
    descriptionTh: "pip install delentia-os — JITNA v3 stack ครบชุดสำหรับ Python 3.10+",
  },
  {
    href: "/packages/npm",
    label: "Node.js SDK (NPM)",
    labelTh: "Node.js SDK (NPM)",
    description: "npm install @delentia/delentia-os — TypeScript channel adapter builder.",
    descriptionTh: "npm install @delentia/delentia-os — สร้าง channel adapter ด้วย TypeScript",
  },
  {
    href: "/models/delentia-slm-v0.2.9-toon",
    label: "Delentia SLM v0.2.9-toon",
    labelTh: "Delentia SLM v0.2.9-toon",
    description: "Latest stable SLM — JITNA 94.8%, FDIA 0.89, Hallucination 1.9%.",
    descriptionTh: "SLM เสถียรล่าสุด — JITNA 94.8%, FDIA 0.89, Hallucination 1.9%",
  },
  {
    href: "/downloads",
    label: "Downloads",
    labelTh: "ดาวน์โหลด",
    description: "Download Delentia Desk GUI and pre-built binary packages.",
    descriptionTh: "ดาวน์โหลด Delentia Desk GUI และแพ็กเกจ binary สำเร็จรูป",
  },
]

