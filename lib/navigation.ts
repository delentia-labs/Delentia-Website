import type { Locale } from "@/lib/i18n"

export interface LocalizedCopy {
  en: string
  th: string
}

export interface NavLeafItem {
  id: string
  href: string
  label: LocalizedCopy
  description: LocalizedCopy
  badge?: string
}

export interface NavFeature {
  href: string
  eyebrow: LocalizedCopy
  title: LocalizedCopy
  description: LocalizedCopy
}

export type NavColumnStyle = "primary" | "secondary"

export interface NavColumn {
  header: LocalizedCopy
  style: NavColumnStyle
  items: NavLeafItem[]
  viewAll?: { href: string; label: LocalizedCopy }
}

export interface NavGroup {
  id: "solutions" | "products" | "technology" | "resources" | "company"
  label: LocalizedCopy
  summary: LocalizedCopy
  dropdownAlign: "left" | "right"
  desktopColumns: NavColumn[]
  feature?: NavFeature
  items: NavLeafItem[]
}

export interface ResourceTrack {
  id: "learn" | "validate" | "evaluate" | "build" | "track" | "adopt"
  label: LocalizedCopy
  summary: LocalizedCopy
  overview: LocalizedCopy
  items: NavLeafItem[]
}

export interface SearchIndexEntry {
  title: string
  description: string
  href: string
  category: string
}

const solutionsItems: NavLeafItem[] = [
  {
    id: "hallucination",
    href: "/solutions/ai-hallucination-prevention",
    label: { en: "AI Hallucination Prevention", th: "ป้องกัน AI Hallucination" },
    description: {
      en: "Verification-first controls for high-risk enterprise workflows.",
      th: "ชั้นควบคุมแบบ verification-first สำหรับ workflow องค์กรที่มีความเสี่ยงสูง",
    },
  },
  {
    id: "memory",
    href: "/solutions/enterprise-ai-memory",
    label: { en: "Enterprise AI Memory", th: "Enterprise AI Memory" },
    description: {
      en: "Persistent memory architecture beyond large context windows.",
      th: "สถาปัตยกรรม memory ถาวรที่ลึกกว่า context window ขนาดใหญ่",
    },
  },
  {
    id: "routing",
    href: "/solutions/dynamic-ai-routing",
    label: { en: "Dynamic AI Routing", th: "Dynamic AI Routing" },
    description: {
      en: "Route tasks across model capabilities, policy, and runtime state.",
      th: "กำหนดเส้นทางงานตามความสามารถของโมเดล นโยบาย และสถานะ runtime",
    },
  },
  {
    id: "regional-ai",
    href: "/solutions/regional-ai",
    label: { en: "Regional AI", th: "Regional AI" },
    description: {
      en: "Plug in Typhoon v2 and other regional LLMs for Thai and Southeast Asian workloads.",
      th: "เชื่อมต่อ Typhoon v2 และ LLM ระดับภูมิภาคอื่นๆ สำหรับงาน Thai และ SEA",
    },
  },
]

const productsItems: NavLeafItem[] = [
  {
    id: "delentia-platform",
    href: "/products/delentia-platform",
    label: { en: "Delentia Labs Platform", th: "Delentia Labs Platform" },
    description: {
      en: "The governed AI operating layer for enterprise deployment.",
      th: "ชั้นปฏิบัติการ AI แบบ governed สำหรับการนำไปใช้งานระดับองค์กร",
    },
  },
  {
    id: "delentiaai",
    href: "/products/delentia-ai",
    label: { en: "DelentiaAI", th: "DelentiaAI" },
    description: {
      en: "Autonomous reasoning surfaces for workflow execution.",
      th: "พื้นผิวการใช้เหตุผลอัตโนมัติสำหรับงาน execution ของทีม",
    },
  },
  {
    id: "signed-ai",
    href: "/products/signed-ai",
    label: { en: "Signed AI", th: "Signed AI" },
    description: {
      en: "Cryptographic execution traces for trust-sensitive operations.",
      th: "ร่องรอยการทำงานแบบ cryptographic สำหรับงานที่ต้องการความน่าเชื่อถือสูง",
    },
  },
  {
    id: "pricing",
    href: "/pricing",
    label: { en: "Pricing", th: "ราคา" },
    description: {
      en: "Commercial models and rollout paths for enterprise teams.",
      th: "รูปแบบเชิงพาณิชย์และเส้นทาง rollout สำหรับทีมองค์กร",
    },
  },
]

const technologyItems: NavLeafItem[] = [
  {
    id: "genome",
    href: "/genome",
    label: { en: "7 Genome System", th: "7 Genome System" },
    description: {
      en: "The subsystem model behind reasoning specialization.",
      th: "โมเดล subsystem ที่อยู่เบื้องหลังการแยกความสามารถด้าน reasoning",
    },
  },
  {
    id: "algorithms",
    href: "/algorithms",
    label: { en: "41 Algorithms", th: "41 Algorithms" },
    description: {
      en: "Production-oriented algorithm framework for governed AI systems.",
      th: "กรอบ algorithm เชิง production สำหรับระบบ AI แบบ governed",
    },
  },
  {
    id: "benchmark",
    href: "/benchmark",
    label: { en: "Benchmark", th: "Benchmark" },
    description: {
      en: "Multi-dimensional performance framing across trust and runtime factors.",
      th: "กรอบ performance แบบหลายมิติครอบคลุม trust และ runtime factor",
    },
  },
  {
    id: "protocols",
    href: "/protocols",
    label: { en: "Protocols", th: "โปรโตคอล" },
    description: {
      en: "Open protocol surfaces including JITNA, FDIA, and RCT-7.",
      th: "พื้นผิวโปรโตคอลเปิด เช่น JITNA, FDIA และ RCT-7",
    },
  },
  {
    id: "fdia-demo",
    href: "/demo/fdia",
    label: { en: "FDIA Live Demo", th: "FDIA Demo" },
    description: {
      en: "Interactive walkthrough of the falsifiability-driven workflow.",
      th: "เดโมแบบโต้ตอบของ workflow ที่ขับด้วย falsifiability",
    },
  },
  {
    id: "jitna",
    href: "/technology/jitna",
    label: { en: "JITNA Protocol", th: "JITNA Protocol" },
    description: {
      en: "The intelligent routing engine that selects models, algorithms, and voting methods per task.",
      th: "Routing Engine อัจฉริยะที่เลือกโมเดล อัลกอริทึม และ Voting Method ต่องาน",
    },
  },
  {
    id: "rct-7",
    href: "/technology/rct-7",
    label: { en: "RCT-7 Mental OS", th: "RCT-7 Mental OS" },
    description: {
      en: "The 7-state IntentLoop engine governing every agent action in Delentia OS.",
      th: "Intloop Engine 7 สถานะที่ควบคุมทุก Action ของ Agent ใน Delentia OS",
    },
  },
  {
    id: "rct-7-thinking",
    href: "/technology/rct-7-thinking",
    label: { en: "RCT-7 Thinking", th: "RCT-7 Thinking" },
    description: {
      en: "The 7-step cognitive reasoning protocol: Observe → Analyze → Deconstruct → Reverse Reason → Identify Intent → Reconstruct → Compare.",
      th: "Cognitive Reasoning Protocol 7 ขั้นตอน: Observe → Analyze → Deconstruct → Reverse Reason → Identify Intent → Reconstruct → Compare",
    },
  },
  {
    id: "constitutional-ai",
    href: "/technology/constitutional-ai",
    label: { en: "Constitutional AI", th: "Constitutional AI" },
    description: {
      en: "The FDIA equation F=(D^I)×A — when A=0, output collapses regardless of capability.",
      th: "สมการ FDIA F=(D^I)×A — เมื่อ A=0 Output จะเป็น 0 โดยไม่คำนึงถึงความสามารถ",
    },
  },
]

const companyItems: NavLeafItem[] = [
  {
    id: "about",
    href: "/about",
    label: { en: "About", th: "เกี่ยวกับ" },
    description: {
      en: "Mission, positioning, and why Delentia OS exists.",
      th: "ภารกิจ ตำแหน่งทางการตลาด และเหตุผลที่ Delentia OS ถูกสร้างขึ้น",
    },
  },
  {
    id: "press",
    href: "/press",
    label: { en: "Press", th: "ข่าวสารองค์กร" },
    description: {
      en: "Announcements, external mentions, and press materials.",
      th: "ประกาศ ข่าวภายนอก และเอกสารสำหรับสื่อมวลชน",
    },
  },
  {
    id: "faq",
    href: "/faq",
    label: { en: "FAQ", th: "คำถามที่พบบ่อย" },
    description: {
      en: "Quick answers for evaluation, deployment, and policy questions.",
      th: "คำตอบสั้นสำหรับคำถามด้านการประเมิน การ deploy และ policy",
    },
  },
  {
    id: "contact",
    href: "/contact",
    label: { en: "Contact", th: "ติดต่อทีมงาน" },
    description: {
      en: "Talk to the team about access, adoption, or procurement.",
      th: "คุยกับทีมเรื่องการเข้าถึง การนำไปใช้ หรือ procurement",
    },
  },
]

const resourceItems = {
  blog: {
    id: "blog",
    href: "/blog",
    label: { en: "Blog", th: "บทความ" },
    description: {
      en: "Research notes, explainers, and long-form editorial work.",
      th: "research notes, explainers และบทความยาวเชิงบรรณาธิการ",
    },
  },
  glossary: {
    id: "glossary",
    href: "/glossary",
    label: { en: "Glossary", th: "Glossary" },
    description: {
      en: "Shared definitions for governance, routing, memory, and verification.",
      th: "คลังคำจำกัดความร่วมสำหรับ governance, routing, memory และ verification",
    },
  },
  methodology: {
    id: "methodology",
    href: "/methodology",
    label: { en: "Methodology", th: "Methodology" },
    description: {
      en: "How public claims are reviewed, bounded, and disclosed.",
      th: "อธิบายว่าการอ้างอิงสาธารณะถูก review, bound และ disclose อย่างไร",
    },
  },
  benchmarkSummary: {
    id: "benchmark-summary",
    href: "/benchmark-summary",
    label: { en: "Benchmark Summary", th: "Benchmark Summary" },
    description: {
      en: "Public-safe benchmark framing with caveats and measurement notes.",
      th: "สรุป benchmark แบบ public-safe พร้อม caveat และ measurement note",
    },
  },
  leaderboard: {
    id: "leaderboard",
    href: "/benchmark/leaderboard",
    label: { en: "Industry Leaderboard", th: "Industry Leaderboard" },
    description: {
      en: "Delentia OS vs GPT-4 vs Claude-3 — measured FDIA, HaluEval, adversarial benchmark comparison.",
      th: "Delentia OS vs GPT-4 vs Claude-3 — เปรียบเทียบ FDIA, HaluEval, adversarial ที่วัดจริง",
    },
  },
  deltaTrace: {
    id: "delta-trace",
    href: "/docs/delta-trace",
    label: { en: "Delta Compression", th: "Delta Compression" },
    description: {
      en: "Interactive 74% memory compression visualizer — drag the slider to replay agent states.",
      th: "Visualizer บีบอัด memory 74% แบบ interactive — ลาก slider เพื่อ replay agent states",
    },
  },
  thailandTrust: {
    id: "thailand-enterprise-trust",
    href: "/thailand-enterprise-trust",
    label: { en: "Thailand Enterprise Trust", th: "Thailand Enterprise Trust" },
    description: {
      en: "Institutional trust context for Thai enterprise evaluation.",
      th: "บริบทความเชื่อมั่นเชิงสถาบันสำหรับการประเมินในไทย",
    },
  },
  evaluation: {
    id: "evaluation",
    href: "/evaluation",
    label: { en: "Evaluation Hub", th: "Evaluation Hub" },
    description: {
      en: "Buyer-side routes for comparison, procurement, and governance review.",
      th: "เส้นทางฝั่ง buyer สำหรับ comparison, procurement และ governance review",
    },
  },
  whitepaper: {
    id: "whitepaper",
    href: "/whitepaper",
    label: { en: "Whitepaper", th: "Whitepaper" },
    description: {
      en: "Curated technical dossiers for pre-procurement and architecture review.",
      th: "dossier เชิงเทคนิคสำหรับ pre-procurement และ architecture review",
    },
  },
  docs: {
    id: "docs",
    href: "/docs",
    label: { en: "Docs", th: "Docs" },
    description: {
      en: "Operational implementation references for teams shipping real systems.",
      th: "เอกสาร implementation สำหรับทีมที่ต้องลงระบบจริง",
    },
  },
  integration: {
    id: "integration",
    href: "/integration",
    label: { en: "Integration", th: "Integration" },
    description: {
      en: "Build routes for adapters, deployment, and operational controls.",
      th: "เส้นทาง build สำหรับ adapter, deployment และ operational control",
    },
  },
  roadmap: {
    id: "roadmap",
    href: "/roadmap",
    label: { en: "Roadmap", th: "Roadmap" },
    description: {
      en: "Current and planned delivery phases across platform and ecosystem work.",
      th: "เฟสการส่งมอบปัจจุบันและถัดไปของแพลตฟอร์มและ ecosystem",
    },
    badge: "NEW",
  },
  changelog: {
    id: "changelog",
    href: "/changelog",
    label: { en: "Changelog", th: "บันทึกการเปลี่ยนแปลง" },
    description: {
      en: "Version history and public change tracking.",
      th: "ประวัติเวอร์ชันและการติดตามการเปลี่ยนแปลงฝั่ง public",
    },
    badge: "NEW",
  },
  downloads: {
    id: "downloads",
    href: "/downloads",
    label: { en: "Downloads", th: "ดาวน์โหลด" },
    description: {
      en: "Download Delentia Desk GUI and SDK packages.",
      th: "ดาวน์โหลด Delentia Desk GUI และ SDK แพ็กเกจ",
    },
    badge: "NEW",
  },
  ecosystem: {
    id: "ecosystem",
    href: "/ecosystem",
    label: { en: "Ecosystem Registry", th: "รีจิสทรี Ecosystem" },
    description: {
      en: "Explore registered channel adapters and skills.",
      th: "สำรวจ channel adapters และ skills ที่ลงทะเบียนไว้",
    },
    badge: "NEW",
  },
  research: {
    id: "research",
    href: "/research",
    label: { en: "Research Archive", th: "คลังงานวิจัย" },
    description: {
      en: "Release notes, papers, and evidence archives.",
      th: "คลัง release notes, papers และหลักฐานเชิงเทคนิค",
    },
  },
  useCases: {
    id: "use-cases",
    href: "/use-cases",
    label: { en: "Use Case Library", th: "คลัง Use Case" },
    description: {
      en: "Adoption scenarios that connect theory, risk, and operations.",
      th: "ตัวอย่างการนำไปใช้ที่เชื่อมทฤษฎี ความเสี่ยง และงานปฏิบัติการ",
    },
  },
  community: {
    id: "community",
    href: "/community",
    label: { en: "Community", th: "ชุมชน" },
    description: {
      en: "Collaboration surfaces for builders, operators, and researchers.",
      th: "พื้นที่เชื่อม builders, operators และ researchers เข้าด้วยกัน",
    },
  },
  models: {
    id: "models",
    href: "/models",
    label: { en: "AI Models Hub", th: "คลัง AI Models" },
    description: {
      en: "Fine-tuned Delentia SLMs — JITNA compliance scores and benchmark data.",
      th: "Delentia SLMs ที่ fine-tune แล้ว พร้อมคะแนน JITNA และข้อมูล benchmark",
    },
    badge: "NEW",
  },
  packages: {
    id: "packages",
    href: "/packages",
    label: { en: "Packages Hub", th: "แหล่งรวมแพ็กเกจนักพัฒนา" },
    description: {
      en: "Install the Delentia OS SDK for Python or Node.js in minutes.",
      th: "ติดตั้ง Delentia OS SDK สำหรับ Python หรือ Node.js ในไม่กี่นาที",
    },
    badge: "NEW",
  },
  playground: {
    id: "playground",
    href: "/playground",
    label: { en: "Playground & Sandbox", th: "ห้องทดลองออนไลน์" },
    description: {
      en: "Run Delentia SLMs in Google Colab and Kaggle Notebooks.",
      th: "รัน Delentia SLMs บน Google Colab และ Kaggle Notebooks",
    },
    badge: "NEW",
  },
} satisfies Record<string, NavLeafItem>

export const navigationGroups: NavGroup[] = [
  {
    id: "solutions",
    label: { en: "Solutions", th: "โซลูชัน" },
    dropdownAlign: "left",
    desktopColumns: [
      {
        header: { en: "Solutions", th: "โซลูชัน" },
        style: "primary",
        items: solutionsItems,
        viewAll: { href: "/solutions", label: { en: "View all solutions", th: "ดูโซลูชันทั้งหมด" } },
      },
    ],
    summary: {
      en: "Outcome-oriented paths for preventing failures and shipping governed AI.",
      th: "เส้นทางเชิงผลลัพธ์สำหรับลดความเสี่ยงและส่งมอบ governed AI",
    },
    feature: {
      href: "/solutions",
      eyebrow: { en: "Primary Path", th: "เส้นทางหลัก" },
      title: { en: "Explore Solutions", th: "สำรวจโซลูชัน" },
      description: {
        en: "Start with business problems, not model features.",
        th: "เริ่มจากโจทย์ธุรกิจ ไม่ใช่เริ่มจาก feature ของโมเดล",
      },
    },
    items: solutionsItems,
  },
  {
    id: "products",
    label: { en: "Products", th: "ผลิตภัณฑ์" },
    dropdownAlign: "left",
    desktopColumns: [
      {
        header: { en: "Platform", th: "แพลตฟอร์ม" },
        style: "primary",
        items: productsItems.slice(0, 3),
        viewAll: { href: "/products", label: { en: "View all products", th: "ดูผลิตภัณฑ์ทั้งหมด" } },
      },
      {
        header: { en: "Commercial", th: "เชิงพาณิชย์" },
        style: "secondary",
        items: productsItems.slice(3),
      },
    ],
    summary: {
      en: "Platform surfaces for deployment, execution, and commercial rollout.",
      th: "พื้นผิวผลิตภัณฑ์สำหรับ deployment, execution และ commercial rollout",
    },
    feature: {
      href: "/products",
      eyebrow: { en: "Platform Surface", th: "พื้นผิวแพลตฟอร์ม" },
      title: { en: "Browse Products", th: "ดูผลิตภัณฑ์" },
      description: {
        en: "See which operating surface fits your rollout model.",
        th: "ดูว่าพื้นผิวผลิตภัณฑ์ใดเหมาะกับรูปแบบ rollout ของคุณ",
      },
    },
    items: productsItems,
  },
  {
    id: "technology",
    label: { en: "Technology", th: "เทคโนโลยี" },
    dropdownAlign: "left",
    desktopColumns: [
      {
        header: { en: "Core Systems", th: "ระบบหลัก" },
        style: "primary",
        items: [technologyItems[0], technologyItems[1], technologyItems[3]],
        viewAll: { href: "/architecture", label: { en: "View architecture", th: "ดูสถาปัตยกรรม" } },
      },
      {
        header: { en: "Deep Dive", th: "เจาะลึก" },
        style: "secondary",
        items: [technologyItems[5], technologyItems[6], technologyItems[7], technologyItems[2], technologyItems[4]],
      },
    ],
    summary: {
      en: "Architecture, algorithms, and protocol surfaces behind the system.",
      th: "สถาปัตยกรรม อัลกอริทึม และพื้นผิวโปรโตคอลที่อยู่เบื้องหลังระบบ",
    },
    feature: {
      href: "/architecture",
      eyebrow: { en: "System Core", th: "แกนระบบ" },
      title: { en: "10-Layer Architecture", th: "10-Layer Architecture" },
      description: {
        en: "Understand the constitutional stack before drilling into protocols.",
        th: "ทำความเข้าใจ constitutional stack ก่อนลงรายละเอียดระดับโปรโตคอล",
      },
    },
    items: technologyItems,
  },
  {
    id: "resources",
    label: { en: "Resources", th: "ทรัพยากร" },
    dropdownAlign: "left",
    desktopColumns: [
      {
        header: { en: "Learn & Validate", th: "เรียนรู้ & ตรวจสอบ" },
        style: "secondary",
        items: [resourceItems.blog, resourceItems.glossary, resourceItems.methodology, resourceItems.benchmarkSummary, resourceItems.leaderboard],
      },
      {
        header: { en: "Evaluate", th: "ประเมิน" },
        style: "secondary",
        items: [resourceItems.whitepaper, resourceItems.evaluation, resourceItems.thailandTrust],
      },
      {
        header: { en: "Build & Track", th: "สร้าง & ติดตาม" },
        style: "secondary",
        items: [resourceItems.docs, resourceItems.downloads, resourceItems.ecosystem, resourceItems.deltaTrace, resourceItems.integration, resourceItems.roadmap, resourceItems.changelog],
      },
      {
        header: { en: "Developer Hub", th: "แพลตฟอร์มนักพัฒนา" },
        style: "secondary",
        items: [resourceItems.models, resourceItems.packages, resourceItems.playground, resourceItems.useCases, resourceItems.community],
      },
    ],
    summary: {
      en: "Task-based guidance for learning, evaluating, building, and adoption.",
      th: "เส้นทางแบบ task-based สำหรับการเรียนรู้ ประเมิน ลงมือสร้าง และนำไปใช้",
    },
    items: [],
  },

  {
    id: "company",
    label: { en: "Company", th: "บริษัท" },
    dropdownAlign: "left",
    desktopColumns: [
      {
        header: { en: "Who We Are", th: "เราคือใคร" },
        style: "primary",
        items: companyItems.slice(0, 2),
        viewAll: { href: "/company", label: { en: "View company", th: "ดูบริษัท" } },
      },
      {
        header: { en: "Connect", th: "ติดต่อ" },
        style: "secondary",
        items: companyItems.slice(2),
      },
    ],
    summary: {
      en: "Company context, trust signals, and ways to work with the team.",
      th: "บริบทของบริษัท สัญญาณความน่าเชื่อถือ และช่องทางทำงานร่วมกับทีม",
    },
    feature: {
      href: "/company",
      eyebrow: { en: "Who We Are", th: "เราคือใคร" },
      title: { en: "Company Overview", th: "ภาพรวมบริษัท" },
      description: {
        en: "Understand the company before moving into procurement or contact flows.",
        th: "ทำความเข้าใจบริษัทก่อนเข้าสู่ procurement หรือ contact flow",
      },
    },
    items: companyItems,
  },
]

export const resourceTracks: ResourceTrack[] = [
  {
    id: "learn",
    label: { en: "Learn", th: "เรียนรู้" },
    summary: {
      en: "Shared language and editorial primers.",
      th: "ภาษากลางและจุดเริ่มต้นเชิงบรรณาธิการ",
    },
    overview: {
      en: "Start here if you need context, definitions, or the mental model behind the ecosystem.",
      th: "เริ่มที่นี่เมื่อคุณต้องการบริบท คำจำกัดความ หรือ mental model ของ ecosystem",
    },
    items: [resourceItems.blog, resourceItems.glossary],
  },
  {
    id: "validate",
    label: { en: "Validate", th: "ยืนยัน" },
    summary: {
      en: "Evidence framing and disclosure boundaries.",
      th: "กรอบหลักฐานและขอบเขตการเปิดเผย",
    },
    overview: {
      en: "Use this path when reviewing whether public claims are bounded, measured, and safe to disclose.",
      th: "ใช้เส้นทางนี้เมื่อกำลังตรวจว่าการอ้างอิงสาธารณะถูก bound, measured และ disclose อย่างปลอดภัยหรือไม่",
    },
    items: [resourceItems.methodology, resourceItems.benchmarkSummary, resourceItems.thailandTrust],
  },
  {
    id: "evaluate",
    label: { en: "Evaluate", th: "ประเมิน" },
    summary: {
      en: "Buyer-side evaluation and technical review.",
      th: "การประเมินฝั่ง buyer และ technical review",
    },
    overview: {
      en: "Follow this path for procurement framing, architecture review, and comparison-led decisions.",
      th: "ใช้เส้นทางนี้สำหรับ procurement framing, architecture review และการตัดสินใจแบบ comparison-led",
    },
    items: [resourceItems.evaluation, resourceItems.whitepaper],
  },
  {
    id: "build",
    label: { en: "Build", th: "ลงมือสร้าง" },
    summary: {
      en: "Implementation routes and operational references.",
      th: "เส้นทาง implementation และเอกสารเชิงปฏิบัติการ",
    },
    overview: {
      en: "Use this track when your team is integrating systems, connecting tooling, or preparing rollout work.",
      th: "ใช้ track นี้เมื่อทีมกำลังเชื่อมระบบ ต่อเครื่องมือ หรือเตรียม rollout จริง",
    },
    items: [resourceItems.docs, resourceItems.downloads, resourceItems.ecosystem, resourceItems.integration],
  },
  {
    id: "track",
    label: { en: "Track", th: "ติดตาม" },
    summary: {
      en: "Roadmap movement and system change history.",
      th: "ความเคลื่อนไหวของ roadmap และประวัติการเปลี่ยนแปลงของระบบ",
    },
    overview: {
      en: "Stay current on release movement, roadmap milestones, and the evidence archive behind changes.",
      th: "ติดตาม release, milestone และหลักฐานประกอบการเปลี่ยนแปลงของระบบ",
    },
    items: [resourceItems.roadmap, resourceItems.changelog, resourceItems.research],
  },
  {
    id: "adopt",
    label: { en: "Adopt", th: "นำไปใช้" },
    summary: {
      en: "Use cases and community paths for active rollout.",
      th: "use case และเส้นทางชุมชนสำหรับการนำไปใช้จริง",
    },
    overview: {
      en: "Use this path when your team is mapping adoption scenarios or finding collaborators.",
      th: "ใช้เส้นทางนี้เมื่อทีมกำลัง map adoption scenario หรือกำลังหาคนร่วมงาน",
    },
    items: [resourceItems.useCases, resourceItems.community],
  },
]

export const primaryNavOrder = navigationGroups.map((group) => group.id)

export function localizeCopy(copy: LocalizedCopy, locale: Locale): string {
  return copy[locale]
}

export function findActiveResourceTrack(pathname: string): ResourceTrack["id"] {
  const normalizedPath = pathname.replace(/^\/(en|th)/, "") || "/"
  const match = resourceTracks.find((track) =>
    track.items.some((item) => normalizedPath === item.href || (item.href !== "/" && normalizedPath.startsWith(item.href)))
  )

  return match?.id ?? "learn"
}

export function buildSearchIndex(locale: Locale): SearchIndexEntry[] {
  const entries = new Map<string, SearchIndexEntry>()

  for (const group of navigationGroups) {
    if (group.feature) {
      entries.set(group.feature.href, {
        title: localizeCopy(group.feature.title, locale),
        description: localizeCopy(group.feature.description, locale),
        href: group.feature.href,
        category: localizeCopy(group.label, locale),
      })
    }

    for (const item of group.items) {
      entries.set(item.href, {
        title: localizeCopy(item.label, locale),
        description: localizeCopy(item.description, locale),
        href: item.href,
        category: localizeCopy(group.label, locale),
      })
    }
  }

  for (const track of resourceTracks) {
    for (const item of track.items) {
      entries.set(item.href, {
        title: localizeCopy(item.label, locale),
        description: localizeCopy(item.description, locale),
        href: item.href,
        category: localizeCopy(track.label, locale),
      })
    }
  }

  return Array.from(entries.values())
}