import { SITE_ENTERPRISE_EVIDENCE_LABEL, SITE_PUBLIC_SDK_EVIDENCE_LABEL, SITE_PUBLIC_SDK_TESTS } from "@/lib/site-config"

export type AuthorProfile = {
  id: string
  name: string
  nameLocal?: string
  role: {
    en: string
    th: string
  }
  bio: {
    en: string
    th: string
  }
  expertise: string[]
  sameAs?: string[]
  profileType: "person" | "organization"
  isSoleDeveloper?: boolean
  foundingYear?: string
}

export const authorProfiles: AuthorProfile[] = [
  {
    id: "ittirit-saengow",
    name: "Ittirit Saengow",
    nameLocal: "อิทธิฤทธิ์ แซ่โง้ว",
    role: {
      en: "Founder and Architect, Delentia Labs",
      th: "ผู้ก่อตั้งและสถาปนิกระบบ, Delentia Labs",
    },
    bio: {
      en: `Ittirit Saengow (อิทธิฤทธิ์ แซ่โง้ว) is the founder, sole developer, and primary author of Delentia Labs — a constitutional AI operating system platform built independently from architecture through publication. He conceived and developed the FDIA equation (F = (D^I) × A), the JITNA protocol specification (RFC-001), the 10-layer architecture, the 7-Genome system, and the RCT-7 process framework. Public-facing proof uses ${SITE_PUBLIC_SDK_EVIDENCE_LABEL.toLowerCase()} at ${SITE_PUBLIC_SDK_TESTS.toLocaleString()} tests, while the broader runtime footprint is disclosed separately as an ${SITE_ENTERPRISE_EVIDENCE_LABEL.toLowerCase()}.`,
      th: `อิทธิฤทธิ์ แซ่โง้ว คือผู้ก่อตั้ง นักพัฒนาเพียงคนเดียว และผู้เขียนหลักของ Delentia Labs — แพลตฟอร์มระบบปฏิบัติการ AI แบบ constitutional ที่สร้างขึ้นอย่างอิสระตั้งแต่สถาปัตยกรรมจนถึงการเผยแพร่ เขาคิดค้นสมการ FDIA (F = (D^I) × A) ข้อกำหนดโปรโตคอล JITNA (RFC-001) สถาปัตยกรรม 10 ชั้น ระบบ 7-Genome และกระบวนการ RCT-7 โดยหลักฐานสาธารณะใช้ ${SITE_PUBLIC_SDK_EVIDENCE_LABEL.toLowerCase()} ที่ ${SITE_PUBLIC_SDK_TESTS.toLocaleString()} tests ส่วน footprint ของ runtime ที่กว้างกว่าถูกเปิดเผยแยกเป็น ${SITE_ENTERPRISE_EVIDENCE_LABEL.toLowerCase()}`,
    },
    expertise: [
      "constitutional AI system design",
      "FDIA equation and framework",
      "JITNA protocol specification",
      "enterprise AI governance",
      "full-stack Next.js development",
      "bilingual AI platform architecture",
      "AI operating systems",
      "Thailand enterprise AI deployment",
    ],
    sameAs: [
      "https://www.linkedin.com/in/ittirit-saengow/",
      "https://github.com/ittirit720",
      "https://github.com/delentia-labs",
      "https://x.com/ittirit_rct",
      "https://www.reddit.com/user/WindLate5307/",
      "https://ittiritsaengow.link",
      "https://delentia-labs.github.io/Delentia-OS/",
    ],
    profileType: "person",
    isSoleDeveloper: true,
    foundingYear: "2025",
  },
  {
    id: "rct-research-desk",
    name: "Delentia Labs Research Desk",
    role: {
      en: "Platform Research and Editorial",
      th: "งานวิจัยและบรรณาธิการของแพลตฟอร์ม",
    },
    bio: {
      en: "The Delentia Labs Research Desk is the editorial voice for platform research, protocol documentation, and enterprise evaluation guidance. All content is produced and reviewed by Ittirit Saengow, founder of Delentia Labs.",
      th: "Delentia Labs Research Desk คือเสียงด้านบรรณาธิการสำหรับงานวิจัย เอกสารโปรโตคอล และแนวทางการประเมินระดับองค์กร เนื้อหาทั้งหมดจัดทำและตรวจทานโดย อิทธิฤทธิ์ แซ่โง้ว ผู้ก่อตั้ง Delentia Labs",
    },
    expertise: ["AI governance", "editorial review", "benchmark framing", "enterprise evaluation"],
    sameAs: [
      "https://delentia.com/research",
      "https://delentia.com/about",
    ],
    profileType: "organization",
  },
]

const authorById = new Map(authorProfiles.map((profile) => [profile.id, profile]))
const authorIdByName = new Map(authorProfiles.map((profile) => [profile.name, profile.id]))

export function getAuthorProfileById(id?: string | null) {
  if (!id) return null
  return authorById.get(id) ?? null
}

export function getAuthorProfileByName(name?: string | null) {
  if (!name) return null
  const id = authorIdByName.get(name)
  if (!id) return null
  return getAuthorProfileById(id)
}

export function getAllAuthorProfiles() {
  return authorProfiles
}