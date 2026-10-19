import { SITE_PUBLIC_SDK_TESTS } from "@/lib/site-config"

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
      en: `Ittirit Saengow (อิทธิฤทธิ์ แซ่โง้ว) is the founder and architect of Delentia, an open-source agent runtime. He grew up in a Khlong Toei flat community, studied architecture and does not write code: he conceived the FDIA equation (F = (D^I) × A), the JITNA protocol (RFC-001) and the RCT-7 framework, and builds the system by directing AI coding assistants and checking their work with tests. It is an early, one-person project with no customers yet. The public repository CI runs ${SITE_PUBLIC_SDK_TESTS.toLocaleString()} tests; what is and is not measured is on the Benchmark page.`,
      th: `อิทธิฤทธิ์ แซ่โง้ว คือผู้ก่อตั้งและสถาปนิกของ Delentia รันไทม์ agent โอเพนซอร์ส เขาเติบโตในชุมชนแฟลตคลองเตย เรียนสถาปัตยกรรมศาสตร์ และเขียนโค้ดไม่เป็น เขาคิดสมการ FDIA (F = (D^I) × A) โปรโตคอล JITNA (RFC-001) และกรอบ RCT-7 และสร้างระบบด้วยการสั่งงานผู้ช่วยเขียนโค้ด AI พร้อมตรวจงานด้วยชุดทดสอบ เป็นโปรเจกต์ระยะเริ่มต้นของคนคนเดียวและยังไม่มีลูกค้า CI ของรีโพสาธารณะรันการทดสอบ ${SITE_PUBLIC_SDK_TESTS.toLocaleString()} รายการ สิ่งที่วัดแล้วและยังไม่ได้วัดอยู่ในหน้า Benchmark`,
    },
    expertise: [
      "constitutional AI system design",
      "FDIA equation and framework",
      "JITNA protocol specification",
      "agent runtime governance",
      "bilingual documentation",
      "directing AI coding assistants",
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