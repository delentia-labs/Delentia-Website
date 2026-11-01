"use client"

import { usePathname } from "next/navigation"
import { FileText, GitBranch, Users } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ResourceCardGrid, ResourcePageShell, ResourceSection } from "@/components/resource/resource-shell"
import RoadmapSection from "@/components/sections/roadmap-section"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"

export default function RoadmapClient() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const localePrefix = getLocalePrefix(resolveLocale(pathname, language))

  const routes = [
    {
      title: language === "th" ? "เชื่อมกับ changelog" : "Connect it to changelog",
      description: language === "th" ? "ใช้ changelog เพื่อตามว่ารายการใน roadmap ถูกส่งมอบแล้วอย่างไรในระบบจริง." : "Use the changelog to see how roadmap items have actually landed in the live system.",
      href: `${localePrefix}/changelog`,
      icon: GitBranch,
      badge: language === "th" ? "Track" : "Track",
      meta: language === "th" ? "Delivery history" : "Delivery history",
      tags: ["Changelog", "Milestones", "History"],
    },
    {
      title: language === "th" ? "เชื่อมกับ research archive" : "Connect it to research archive",
      description: language === "th" ? "ใช้ research archive เพื่อดู release notes และหลักฐานทางเทคนิคที่รองรับเฟสสำคัญของ roadmap." : "Use the research archive to review the release notes and technical evidence behind important roadmap phases.",
      href: `${localePrefix}/research`,
      icon: FileText,
      badge: language === "th" ? "Evidence" : "Evidence",
      meta: language === "th" ? "Release evidence" : "Release evidence",
      tags: ["Research", "Releases", "Evidence"],
    },
    {
      title: language === "th" ? "เชื่อมกับ community" : "Connect it to community",
      description: language === "th" ? "ใช้ community route เมื่อต้องการเชื่อม roadmap กับ feedback loop และการนำไปใช้จริงจากผู้ใช้." : "Use the community route when roadmap work needs to connect with feedback loops and real adoption paths.",
      href: `${localePrefix}/community`,
      icon: Users,
      badge: language === "th" ? "Adopt" : "Adopt",
      meta: language === "th" ? "Feedback loop" : "Feedback loop",
      tags: ["Community", "Feedback", "Adoption"],
    },
  ]

  return (
    <ResourcePageShell
      eyebrow={language === "th" ? "Track / Roadmap" : "Track / Roadmap"}
      title={language === "th" ? "Roadmap สาธารณะที่เชื่อม phase การพัฒนาเข้ากับการส่งมอบจริง" : "A public roadmap that connects development phases to real delivery"}
      description={language === "th" ? "หน้า Roadmap ถูกวางใหม่ให้เป็น track layer ของ resource system โดยเชื่อม phase plan, release evidence, changelog history และ community feedback เข้าหากัน." : "The roadmap now sits in the track layer of the resource system, connecting phase planning, release evidence, changelog history, and community feedback."}
      taxonomy={language === "th" ? ["Public roadmap", "Delivery phases", "Milestones", "Launch tracking"] : ["Public roadmap", "Delivery phases", "Milestones", "Launch tracking"]}
      accent="sky"
      actions={[
        { href: `${localePrefix}/changelog`, label: language === "th" ? "เปิด changelog" : "Open changelog", variant: "primary" },
        { href: `${localePrefix}/research`, label: language === "th" ? "ไปหน้า research archive" : "Go to research archive", variant: "secondary" },
        { href: `${localePrefix}/community`, label: language === "th" ? "ไปหน้า community" : "Go to community", variant: "secondary" },
      ]}
      stats={[
        { label: language === "th" ? "Planned phases" : "Planned phases", value: "9", detail: language === "th" ? "public roadmap sequence" : "public roadmap sequence" },
        { label: language === "th" ? "Current emphasis" : "Current emphasis", value: language === "th" ? "Phase 5" : "Phase 5", detail: language === "th" ? "การวัดผลกับโมเดลโฮสต์ที่เก่งเป็นครั้งแรก" : "the first measurements with strong hosted models" },
        { label: language === "th" ? "Primary role" : "Primary role", value: language === "th" ? "Track" : "Track", detail: language === "th" ? "movement and milestones" : "movement and milestones" },
        { label: language === "th" ? "Connected layers" : "Connected layers", value: "Research / Changelog / Community", detail: language === "th" ? "evidence, history, feedback" : "evidence, history, feedback" },
      ]}
      footerTitle={language === "th" ? "Roadmap ควรถูกอ่านคู่กับ changelog และ release evidence" : "The roadmap should be read alongside changelog and release evidence"}
      footerDescription={language === "th" ? "ใช้ roadmap เพื่อดูทิศทาง ใช้ changelog เพื่อตามการส่งมอบ และใช้ research archive เพื่ออ่านหลักฐานเชิงเทคนิคของแต่ละช่วงสำคัญ." : "Use the roadmap for direction, the changelog for delivery history, and the research archive for the technical evidence behind key phases."}
      footerActions={[
        { href: `${localePrefix}/changelog`, label: language === "th" ? "ไปหน้า changelog" : "Go to changelog", variant: "primary" },
        { href: `${localePrefix}/research`, label: language === "th" ? "ไปหน้า research" : "Go to research", variant: "secondary" },
      ]}
    >
      <ResourceSection
        eyebrow={language === "th" ? "Connected routes" : "Connected routes"}
        title={language === "th" ? "หน้าที่ควรเปิดคู่กับ roadmap" : "The pages that make the roadmap more useful"}
        description={language === "th" ? "Roadmap มีค่ามากขึ้นเมื่อดูร่วมกับประวัติการส่งมอบ หลักฐานรีลีส และ feedback จากชุมชน ส่วน card ชุดนี้ถูกยกระดับให้เป็น pattern ตั้งต้นสำหรับ resource cards ชุดอื่นต่อไปด้วย" : "The roadmap becomes more useful when paired with delivery history, release evidence, and community feedback. This card set is also upgraded as the starting pattern for broader resource-card reuse."}
      >
        <ResourceCardGrid cards={routes} />
      </ResourceSection>

      <ResourceSection
        eyebrow={language === "th" ? "Detailed timeline" : "Detailed timeline"}
        title={language === "th" ? "timeline และ phase view แบบละเอียด" : "The detailed timeline and phase view"}
        description={language === "th" ? "คง component เดิมไว้เพื่อรักษา phase cards, graphs และ milestone calendar ที่มีอยู่แล้ว." : "The existing component is preserved here to keep the phase cards, graphs, and milestone calendar already in place."}
      >
        <div className="overflow-hidden rounded-3xl border border-border/70 bg-card/90 shadow-[0_12px_32px_rgba(0,0,0,0.04)]">
          <RoadmapSection />
        </div>
      </ResourceSection>
    </ResourcePageShell>
  )
}