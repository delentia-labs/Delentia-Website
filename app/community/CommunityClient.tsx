"use client"

import { usePathname } from "next/navigation"
import { BookOpen, FileText, Github, MessageCircle, Sparkles, Users } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ResourceCardGrid, ResourcePageShell, ResourceSection } from "@/components/resource/resource-shell"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"

export default function CommunityClient() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const localePrefix = getLocalePrefix(resolveLocale(pathname, language))

  const channels = [
    {
      title: "GitHub",
      description: language === "th" ? "รีโพสาธารณะ ตัวอย่างโค้ด การสนทนาเรื่อง implementation และ issue workflow สำหรับทีมเทคนิค." : "Public repositories, implementation examples, issue workflows, and technical discussion for builders.",
      href: "https://github.com/delentia-labs",
      icon: Github,
      badge: language === "th" ? "Open source" : "Open source",
      meta: language === "th" ? "Code, issues, discussions" : "Code, issues, discussions",
      external: true,
      tags: ["Repositories", "Examples", "Discussions"],
    },
    {
      title: "Discord",
      description: language === "th" ? "ช่องสนทนาแบบ real-time สำหรับถามตอบ implementation, routing, protocol และ deployment patterns." : "Real-time discussion for implementation questions, routing, protocol, and deployment patterns.",
      href: "https://discord.gg/delentia",
      icon: MessageCircle,
      badge: language === "th" ? "Live" : "Live",
      meta: language === "th" ? "Real-time support and discussion" : "Real-time support and discussion",
      external: true,
      tags: ["Support", "Realtime", "Builders"],
    },
    {
      title: language === "th" ? "Community forum" : "Community forum",
      description: language === "th" ? "พื้นที่สำหรับคำถามเชิงลึก การออกแบบระบบ และบทสนทนาที่ต้องการบริบทยาวกว่าการแชตสด GitHub Discussions เปิดให้บริการแล้ว ร่วมสนทนาได้ที่ github.com/orgs/delentia-labs/discussions" : "A place for deeper questions, system design discussion, and conversations that need more context than live chat. GitHub Discussions are now live — join the conversation at github.com/orgs/delentia-labs/discussions.",
      href: "https://github.com/orgs/delentia-labs/discussions",
      icon: Users,
      badge: language === "th" ? "Live" : "Live",
      meta: language === "th" ? "Long-form discussion" : "Long-form discussion",
      external: true,
      tags: ["Q&A", "Design", "Knowledge sharing"],
    },
  ]

  const paths = [
    {
      title: language === "th" ? "เข้าฝั่ง research และ releases" : "Enter through research and releases",
      description: language === "th" ? "เหมาะกับนักวิจัยหรือทีม architecture ที่ต้องการอ่านหลักฐานก่อนเข้าชุมชน." : "Best for researchers and architecture teams who want the evidence trail before joining the conversation.",
      href: `${localePrefix}/research`,
      icon: FileText,
      tags: language === "th" ? ["Research", "Archive", "Evidence"] : ["Research", "Archive", "Evidence"],
    },
    {
      title: language === "th" ? "เข้าฝั่ง docs และ integration" : "Enter through docs and integration",
      description: language === "th" ? "เหมาะกับทีม implement ที่ต้องการเชื่อม MCP tools หรือ deployment patterns เข้าระบบจริง." : "Best for implementation teams integrating MCP tools or deployment patterns into real systems.",
      href: `${localePrefix}/integration`,
      icon: BookOpen,
      tags: language === "th" ? ["Docs", "MCP", "Deployment"] : ["Docs", "MCP", "Deployment"],
    },
    {
      title: language === "th" ? "เข้าฝั่ง evaluation และ use cases" : "Enter through evaluation and use cases",
      description: language === "th" ? "เหมาะกับ buyer, operator และ stakeholder ที่ต้องการ context เชิงตัดสินใจก่อนเริ่มทดลอง." : "Best for buyers, operators, and stakeholders who need decision context before trial work begins.",
      href: `${localePrefix}/evaluation`,
      icon: Sparkles,
      tags: language === "th" ? ["Evaluation", "Adoption", "Buyer path"] : ["Evaluation", "Adoption", "Buyer path"],
    },
  ]

  return (
    <ResourcePageShell
      eyebrow={language === "th" ? "Adopt / Community" : "Adopt / Community"}
      title={language === "th" ? "ชุมชนสำหรับนักพัฒนา นักวิจัย และทีม AI ระดับองค์กร" : "A community for developers, researchers, and enterprise AI teams"}
      description={language === "th" ? "หน้า Community ไม่ใช่ landing page ทั่วไป แต่เป็นจุดเชื่อมระหว่าง evidence, implementation และ adoption paths ของ RCT ecosystem." : "The community page is not a generic landing page. It connects evidence, implementation, and adoption paths across the RCT ecosystem."}
      taxonomy={language === "th" ? ["Developer community", "Research discussion", "Implementation support", "Adoption path"] : ["Developer community", "Research discussion", "Implementation support", "Adoption path"]}
      accent="amber"
      actions={[
        { href: `${localePrefix}/docs`, label: language === "th" ? "เปิด docs" : "Open docs", variant: "primary" },
        { href: "https://github.com/delentia-labs", label: "GitHub", variant: "secondary", external: true },
        { href: `${localePrefix}/contact`, label: language === "th" ? "ติดต่อทีม" : "Contact the team", variant: "secondary" },
      ]}
      stats={[
        { label: language === "th" ? "Primary mode" : "Primary mode", value: language === "th" ? "Builder support" : "Builder support", detail: language === "th" ? "implementation and knowledge exchange" : "implementation and knowledge exchange" },
        { label: language === "th" ? "Discussion surfaces" : "Discussion surfaces", value: "3", detail: language === "th" ? "GitHub, Discord, forum" : "GitHub, Discord, forum" },
        { label: language === "th" ? "Adjacent routes" : "Adjacent routes", value: "Research / Docs / Eval", detail: language === "th" ? "narrative handoff across the resource system" : "narrative handoff across the resource system" },
        { label: language === "th" ? "Audience" : "Audience", value: language === "th" ? "Dev + Research + Ops" : "Dev + Research + Ops", detail: language === "th" ? "multi-role enterprise path" : "multi-role enterprise path" },
      ]}
      footerTitle={language === "th" ? "ใช้ community เป็น operational layer ของ resource system" : "Use community as the operational layer of the resource system"}
      footerDescription={language === "th" ? "เริ่มจาก community เพื่อถามและเชื่อมทีม แล้วไปต่อที่ docs, research, evaluation หรือ contact ตามบทบาทของคุณ." : "Start in the community to connect with the right people, then continue into docs, research, evaluation, or contact based on your role."}
      footerActions={[
        { href: `${localePrefix}/research`, label: language === "th" ? "ไปหน้า research" : "Go to research", variant: "primary" },
        { href: `${localePrefix}/whitepaper`, label: language === "th" ? "อ่าน whitepaper" : "Read whitepaper", variant: "secondary" },
      ]}
    >
      <ResourceSection
        eyebrow={language === "th" ? "Channels" : "Channels"}
        title={language === "th" ? "ช่องทางหลักที่ควรใช้ตามลักษณะงาน" : "The primary channels to use based on the work you are doing"}
        description={language === "th" ? "แยกบทบาทของแต่ละช่องให้ชัด เพื่อไม่ให้ Community กลายเป็นเพียงหน้ารวมลิงก์." : "Each channel has a distinct role so the community page does not collapse into a generic link directory."}
      >
        <ResourceCardGrid cards={channels} />
      </ResourceSection>

      <ResourceSection
        eyebrow={language === "th" ? "Entry routes" : "Entry routes"}
        title={language === "th" ? "ถ้าจะเริ่มจาก resource อื่นก่อน ควรเริ่มที่ไหน" : "If you need another resource before joining, start in one of these routes"}
        description={language === "th" ? "ชุมชนทำงานได้ดีที่สุดเมื่อเชื่อมกับ archive, docs และ evaluation flows ที่ชัดเจน." : "The community works best when connected to clear archive, docs, and evaluation flows."}
      >
        <ResourceCardGrid cards={paths} />
      </ResourceSection>
    </ResourcePageShell>
  )
}
