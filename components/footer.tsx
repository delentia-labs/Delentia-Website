"use client"

/*
 * Footer — Warm Enterprise design
 * Adapted from manus-frontend-design; Next.js-compatible
 * Newsletter form → POST /api/newsletter with Supabase backend
 */
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Globe, ChevronDown } from "lucide-react"
import { AnimatePresence, m } from "framer-motion"
import { useMounted } from "@/hooks/use-mounted"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"
import { SITE_VERSION, SOCIAL_LINKS } from "@/lib/site-config"

const LOGO_PNG = "/DelentiaLogo-horizontal.svg"

type FooterProps = {
  locale?: "en" | "th"
}

export function Footer({ locale: forcedLocale }: FooterProps) {
  const { language, toggleLanguage, t } = useLanguage()
  const pathname = usePathname()
  const mounted = useMounted()
  const isTh = language === "th"
  const locale = forcedLocale ?? resolveLocale(pathname, language)

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const localePrefix = getLocalePrefix(locale)
  const lh = (href: string) => `${localePrefix}${href}`

  const toggleSection = (title: string) => setOpenSections(prev => ({ ...prev, [title]: !prev[title] }))

  const footerLinks = {
    [isTh ? "โซลูชัน" : "Solutions"]: [
      { label: isTh ? "โซลูชันทั้งหมด" : "All Solutions", href: "/solutions" },
      { label: isTh ? "ป้องกัน Hallucination" : "Hallucination Prevention", href: "/solutions/ai-hallucination-prevention" },
      { label: "Enterprise AI Memory", href: "/solutions/enterprise-ai-memory" },
      { label: "Dynamic AI Routing", href: "/solutions/dynamic-ai-routing" },
    ],
    [isTh ? "ผลิตภัณฑ์" : "Products"]: [
      { label: "Delentia Platform", href: "/products/delentia-platform" },
      { label: "DelentiaAI", href: "/products/delentia-ai" },
      { label: "SignedAI", href: "/products/signed-ai" },
      { label: isTh ? "ราคา" : "Pricing", href: "/pricing" },
    ],
    [isTh ? "เทคโนโลยี" : "Technology"]: [
      { label: isTh ? "ระบบหลัก" : "Core Systems", href: "/core-systems" },
      { label: isTh ? "สถาปัตยกรรม" : "Architecture", href: "/architecture" },
      { label: "JITNA Protocol", href: "/technology/jitna" },
      { label: "RCT-7 Mental OS", href: "/technology/rct-7" },
      { label: isTh ? "Constitutional AI" : "Constitutional AI", href: "/technology/constitutional-ai" },
      { label: isTh ? "Open SDK (Apache 2.0)" : "Open SDK (Apache 2.0)", href: SOCIAL_LINKS.platformGithub, external: true },
      { label: isTh ? "SDK Documentation" : "SDK Documentation", href: SOCIAL_LINKS.platformDocs, external: true },
    ],
    [isTh ? "ทรัพยากร" : "Resources"]: [
      { label: "Whitepaper", href: "/whitepaper" },
      { label: isTh ? "บทความ" : "Blog", href: "/blog" },
      { label: isTh ? "แผนงาน" : "Roadmap", href: "/roadmap", badge: "NEW" as const },
      { label: isTh ? "Benchmark" : "Benchmark Summary", href: "/benchmark-summary" },
      { label: isTh ? "งานวิจัย" : "Research", href: "/research" },
      { label: isTh ? "บันทึกการเปลี่ยนแปลง" : "Changelog", href: "/changelog", badge: "NEW" as const },
      { label: isTh ? "Ecosystem Registry" : "Ecosystem Registry", href: "/ecosystem", badge: "NEW" as const },
      { label: isTh ? "คลัง AI Models" : "AI Models Hub", href: "/models", badge: "NEW" as const },
      { label: isTh ? "แพ็กเกจนักพัฒนา" : "Packages Hub", href: "/packages", badge: "NEW" as const },
      { label: isTh ? "Playground & Sandbox" : "Playground & Sandbox", href: "/playground", badge: "NEW" as const },
      {
        label: isTh ? "NotebookLM Architecture Guide" : "NotebookLM Architecture Guide",
        href: "https://notebooklm.google.com/notebook/094c48f4-0f95-4c59-9962-55ef8a7e3199?authuser=1",
        external: true,
        badge: "NEW" as const,
        icon: (
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="w-3.5 h-3.5 shrink-0">
            <rect x="3" y="1" width="10" height="14" rx="1.5" fill="#E8B84B" fillOpacity="0.9" />
            <rect x="2" y="2.5" width="3" height="11" rx="1" fill="#C4922A" />
            <path d="M7 5.5h4.5M7 8h4.5M7 10.5h3" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="13" cy="3" r="2.5" fill="#4285F4" />
            <path d="M13 1.5v3M11.5 3h3" stroke="white" strokeWidth="0.9" strokeLinecap="round" />
          </svg>
        ),
      },
    ],
    [isTh ? "บริษัท" : "Company"]: [
      { label: isTh ? "เกี่ยวกับเรา" : "About Us", href: "/about" },
      { label: isTh ? "ติดต่อเรา" : "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "__div1__", href: "", divider: true as const },
      { label: "GitHub (delentia-labs)", href: SOCIAL_LINKS.github, external: true },
      { label: isTh ? "GitHub Discussions" : "GitHub Discussions", href: "https://github.com/orgs/delentia-labs/discussions", external: true, badge: "LIVE" as const },
      { label: "__div2__", href: "", divider: true as const },
      { label: isTh ? "นโยบายความเป็นส่วนตัว" : "Privacy Policy", href: "/privacy" },
      { label: isTh ? "ข้อกำหนด" : "Terms", href: "/terms" },
    ],
  }

  const socialLinks = [
    {
      label: "GitHub (Org)",
      href: SOCIAL_LINKS.github,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: SOCIAL_LINKS.linkedin,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "X (Twitter)",
      href: SOCIAL_LINKS.twitter,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "Reddit",
      href: SOCIAL_LINKS.reddit,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      ),
    },
    {
      label: "NotebookLM Architecture Guide",
      href: "https://notebooklm.google.com/notebook/094c48f4-0f95-4c59-9962-55ef8a7e3199?authuser=1",
      icon: (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="w-4 h-4">
          <rect x="3" y="1" width="10" height="14" rx="1.5" fill="#E8B84B" fillOpacity="0.9" />
          <rect x="2" y="2.5" width="3" height="11" rx="1" fill="#C4922A" />
          <path d="M7 5.5h4.5M7 8h4.5M7 10.5h3" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="13" cy="3" r="2.5" fill="#4285F4" />
          <path d="M13 1.5v3M11.5 3h3" stroke="white" strokeWidth="0.9" strokeLinecap="round" />
        </svg>
      ),
    },
  ]

  return (
    <>
      <footer
        className="relative overflow-hidden border-t transition-colors duration-300 bg-[#f7f1eb] dark:bg-[#151515] border-warm-light-gray dark:border-[#2A2A2A]"
        role="contentinfo"
      >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="footer-ambient-orb footer-ambient-orb--amber absolute left-[6%] top-10 h-64 w-64" />
        <div className="footer-ambient-orb footer-ambient-orb--sage absolute right-[8%] top-20 h-72 w-72" />
        <div className="footer-ambient-orb footer-ambient-orb--terra absolute left-[38%] -bottom-20 h-60 w-60" />
        <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-white/14 to-transparent dark:from-white/3" />
      </div>

      <div className="relative z-10 max-w-300 mx-auto px-4 sm:px-6 lg:px-8">


        {/* Main footer grid */}
        <div className="py-8">
          {/* Logo centered */}
          <div className="flex flex-col items-center mb-8 text-center">
            <Link href={lh("/")} className="inline-block">
              <Image
                src={LOGO_PNG}
                alt="Delentia OS"
                width={96}
                height={32}
                unoptimized
                className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
              />
            </Link>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-sm mt-2 text-center text-warm-secondary dark:text-[#888] ${isTh ? "subtitle-th" : ""}`}>
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xs px-2 py-0.5 rounded-full font-medium tag-sage dark:bg-[rgba(123,158,135,0.12)] dark:text-warm-sage">{SITE_VERSION}</span>
              <span className="text-2xs px-2 py-0.5 rounded-full font-medium tag-amber dark:bg-[rgba(212,168,83,0.1)] dark:text-warm-amber">
                {isTh ? "สแนปช็อตสถานะสาธารณะ" : "Public Status Snapshot"}
              </span>
            </div>
          </div>

          {/* Link columns — mobile: collapsible accordion, desktop: always visible */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-6 text-center sm:text-left">
            {Object.entries(footerLinks).map(([title, links]) => (
              <nav key={title} aria-label={title}>
                {/* Mobile: Framer Motion animated accordion */}
                <div className="sm:hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection(title)}
                    className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider mb-2.5 text-warm-charcoal dark:text-[#CCC]"
                  >
                    {title}
                    <m.span
                      animate={{ rotate: openSections[title] ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </m.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openSections[title] && (
                      <m.ul
                        key={title}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden space-y-1.5 pb-3"
                      >
                        {links.map((link) => (
                          <li key={link.label}>
                            {"divider" in link && link.divider ? (
                              <div className="border-t border-warm-light-gray/40 dark:border-[#2A2A2A] my-1.5" />
                            ) : "external" in link && link.external ? (
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 py-1 text-xs sm:text-sm transition-colors hover:underline underline-offset-2 text-warm-secondary hover:text-warm-charcoal dark:text-[#777] dark:hover:text-[#DDD]"
                              >
                                {"icon" in link && link.icon ? link.icon : null}
                                {link.label}
                                {"badge" in link && link.badge ? (
                                  <span className="inline-flex items-center rounded-full bg-warm-amber/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#7A5910] dark:text-warm-amber">
                                    {link.badge}
                                  </span>
                                ) : null}
                              </a>
                            ) : (
                              <Link
                                href={lh(link.href)}
                                className="inline-flex items-center gap-1.5 py-1 text-xs sm:text-sm transition-colors hover:underline underline-offset-2 text-warm-secondary hover:text-warm-charcoal dark:text-[#777] dark:hover:text-[#DDD]"
                              >
                                {link.label}
                                {"badge" in link && link.badge ? (
                                  <span className="inline-flex items-center rounded-full bg-warm-amber/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#7A5910] dark:text-warm-amber">
                                    {link.badge}
                                  </span>
                                ) : null}
                              </Link>
                            )}
                          </li>
                        ))}
                      </m.ul>
                    )}
                  </AnimatePresence>
                </div>
                {/* Desktop: always visible */}
                <div className="hidden sm:block">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-2.5 text-[#595959] dark:text-warm-light-gray/60">
                    {title}
                  </p>
                  <ul className="space-y-1.5">
                    {links.map((link) => (
                      <li key={link.label}>
                        {"divider" in link && link.divider ? (
                          <div className="border-t border-warm-light-gray/40 dark:border-[#2A2A2A] my-1.5" />
                        ) : "external" in link && link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 py-1 text-xs sm:text-sm transition-colors hover:underline underline-offset-2 text-warm-secondary hover:text-warm-charcoal dark:text-[#777] dark:hover:text-[#DDD]"
                          >
                            {"icon" in link && link.icon ? link.icon : null}
                            {link.label}
                            {"badge" in link && link.badge ? (
                              <span className="inline-flex items-center rounded-full bg-warm-amber/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#7A5910] dark:text-warm-amber">
                                {link.badge}
                              </span>
                            ) : null}
                          </a>
                        ) : (
                          <Link
                            href={lh(link.href)}
                            className="inline-flex items-center gap-1.5 py-1 text-xs sm:text-sm transition-colors hover:underline underline-offset-2 text-warm-secondary hover:text-warm-charcoal dark:text-[#777] dark:hover:text-[#DDD]"
                          >
                            {link.label}
                            {"badge" in link && link.badge ? (
                              <span className="inline-flex items-center rounded-full bg-warm-amber/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#7A5910] dark:text-warm-amber">
                                {link.badge}
                              </span>
                            ) : null}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom bar — 3-column: social | copyright | language toggle (Mistral pattern) */}
        <div className="py-4 border-t border-warm-light-gray dark:border-[#2A2A2A]">
          <div className="flex flex-wrap items-center justify-between gap-3">

            {/* Left: social icons + status */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg border flex items-center justify-center transition-all duration-200 bg-white border-warm-light-gray text-warm-gray hover:text-warm-charcoal hover:border-warm-amber/40 hover:shadow-sm dark:bg-[#222] dark:border-[#333] dark:text-[#777] dark:hover:text-[#DDD] dark:hover:border-warm-amber/40 dark:hover:shadow-none"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
              </div>
              <a
                href="https://status.delentia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-[11px] transition-colors text-warm-secondary hover:text-warm-charcoal dark:text-[#555] dark:hover:text-[#888]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-warm-sage" aria-hidden="true" />
                {isTh ? "ระบบปกติ" : "All systems nominal"}
              </a>
            </div>

            {/* Center: copyright */}
            <p className="text-[11px] text-center text-warm-secondary dark:text-[#555]">
              &copy; {mounted ? new Date().getFullYear() : 2026} Delentia Labs — Delentia OS.{" "}
              {t("footer.rights")}
            </p>

            {/* Right: language toggle (Mistral pattern) */}
            <button
              onClick={toggleLanguage}
              suppressHydrationWarning
              className="flex items-center gap-1.5 px-2.5 py-1 min-h-11 min-w-11 rounded-lg border text-[11px] font-semibold transition-colors text-warm-secondary hover:text-warm-charcoal border-warm-light-gray hover:border-warm-gray/40 bg-white hover:bg-warm-sand/60 dark:text-[#777] dark:hover:text-[#DDD] dark:border-[#333] dark:hover:border-[#555] dark:bg-[#1a1a1a] dark:hover:bg-[#222]"
              aria-label={language === "en" ? "EN – Switch to Thai / เปลี่ยนภาษา" : "TH – Switch to English"}
            >
              <Globe size={11} className="shrink-0" />
              <span className="tracking-wide">{language === "en" ? "EN" : "TH"}</span>
            </button>

          </div>
        </div>
      </div>
    </footer>
    </>
  )
}
