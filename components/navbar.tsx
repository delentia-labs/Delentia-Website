"use client"

import dynamic from "next/dynamic"
import { useEffect, useMemo, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DesktopNav } from "@/components/navigation/desktop-nav"
import { UtilityActions } from "@/components/navigation/utility-actions"
import { useNavAnalytics } from "@/components/navigation/use-nav-analytics"
import { useLanguage } from "@/components/language-provider"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"
import { buildSearchIndex, findActiveResourceTrack, navigationGroups, resourceTracks } from "@/lib/navigation"
import { useTheme } from "@/components/theme-provider"

import { LiveStreamTicker } from "@/components/sections/live-stream-ticker"

const SearchModal = dynamic(() => import("@/components/search/search-modal"), {
  ssr: false,
  loading: () => null,
})

const KeyboardShortcutsDialog = dynamic(
  () => import("@/components/keyboard-shortcuts-dialog").then((module) => module.KeyboardShortcutsDialog),
  { ssr: false, loading: () => null },
)

const MobileNavDrawer = dynamic(
  () => import("@/components/navigation/mobile-nav-drawer").then((module) => module.MobileNavDrawer),
  { ssr: false, loading: () => null },
)

interface NavbarProps {
  variant?: "default" | "article"
  locale?: "en" | "th"
}

export function Navbar({ variant = "default", locale: forcedLocale }: NavbarProps) {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()
  const { trackGroupOpen, trackLeafClick, trackResourceTrack, trackUtility } = useNavAnalytics()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const [searchPrepared, setSearchPrepared] = useState(false)
  const [openGroupId, setOpenGroupId] = useState<(typeof navigationGroups)[number]["id"] | null>(null)
  const [activeResourceTrackId, setActiveResourceTrackId] = useState(resourceTracks[0].id)
  const closeGroupTimeoutRef = useRef<number | null>(null)
  const scrollFrameRef = useRef<number | null>(null)
  const lastScrolledRef = useRef(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const localePath = pathname?.replace(/^\/(en|th)/, "") || "/"
  const locale = forcedLocale ?? resolveLocale(pathname, language)
  const localePrefix = getLocalePrefix(locale)
  const localHref = (href: string) => `${localePrefix}${href}`
  const isDark = resolvedTheme === "dark"
  const searchData = useMemo(() => (searchPrepared ? buildSearchIndex(locale) : []), [locale, searchPrepared])

  const prepareAndOpenSearch = () => {
    setSearchPrepared(true)
    setSearchOpen(true)
  }

  useEffect(() => {
    const updateScrolled = () => {
      const nextScrolled = window.scrollY > 20
      if (nextScrolled !== lastScrolledRef.current) {
        lastScrolledRef.current = nextScrolled
        setScrolled(nextScrolled)
      }
      scrollFrameRef.current = null
    }

    const onScroll = () => {
      if (scrollFrameRef.current !== null) return
      scrollFrameRef.current = window.requestAnimationFrame(updateScrolled)
    }

    updateScrolled()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current)
      }
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (closeGroupTimeoutRef.current !== null) {
          window.clearTimeout(closeGroupTimeoutRef.current)
          closeGroupTimeoutRef.current = null
        }
        setOpenGroupId(null)
        setMobileOpen(false)
        setShortcutsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  useEffect(() => {
    const handleOpenSearch = () => prepareAndOpenSearch()

    window.addEventListener("rct-open-search", handleOpenSearch as EventListener)
    return () => window.removeEventListener("rct-open-search", handleOpenSearch as EventListener)
  }, [])

  useEffect(() => {
    const handleKeyboardShortcuts = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const tagName = target?.tagName
      const isEditing = tagName === "INPUT" || tagName === "TEXTAREA" || Boolean(target?.isContentEditable)

      if (isEditing) {
        return
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        prepareAndOpenSearch()
        return
      }

      if (event.key === "?" && !event.ctrlKey && !event.metaKey) {
        event.preventDefault()
        setShortcutsOpen((current) => !current)
        return
      }

      if (event.key === "/" && !event.ctrlKey && !event.metaKey) {
        event.preventDefault()
        prepareAndOpenSearch()
      }
    }

    document.addEventListener("keydown", handleKeyboardShortcuts)
    return () => document.removeEventListener("keydown", handleKeyboardShortcuts)
  }, [])

  useEffect(() => {
    // Track full pathname so locale-only changes (e.g. /th/about → /en/about) also close the drawer.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- route changes should immediately collapse transient nav UI state.
    setMobileOpen(false)
    setOpenGroupId(null)
    setShortcutsOpen(false)
    setActiveResourceTrackId(findActiveResourceTrack(localePath))
  }, [localePath])

  useEffect(() => {
    return () => {
      if (closeGroupTimeoutRef.current !== null) {
        window.clearTimeout(closeGroupTimeoutRef.current)
      }
    }
  }, [])

  const isActive = (href: string) => {
    if (href === "/") {
      return localePath === "/"
    }

    return localePath === href || localePath.startsWith(`${href}/`)
  }
  const isHomeRoute = localePath === "/"
  const darkHeroRoutes = ["/about", "/case-studies"]
  const isArticleVariant = variant === "article"
  const isOnDarkHero = !isArticleVariant && !scrolled && darkHeroRoutes.some((route) => localePath.startsWith(route))

  const navTextClass = isArticleVariant
    ? isDark
      ? "text-warm-light-gray/80"
      : "text-warm-charcoal/75"
    : isOnDarkHero
      ? "text-white/90"
      : isDark
        ? "text-warm-gray/70"
        : "text-warm-gray"

  const navTextActiveClass = isArticleVariant
    ? "text-foreground"
    : isOnDarkHero
      ? "text-white"
      : isDark
        ? "text-white"
        : "text-warm-charcoal"

  const handleRouteClick = (label: string, href: string, groupId: string) => {
    trackLeafClick(label, href, groupId)
    setMobileOpen(false)
    setOpenGroupId(null)
  }

  const handleOpenGroup = (groupId: (typeof navigationGroups)[number]["id"], trigger: "hover" | "click" | "focus") => {
    if (closeGroupTimeoutRef.current !== null) {
      window.clearTimeout(closeGroupTimeoutRef.current)
      closeGroupTimeoutRef.current = null
    }

    setOpenGroupId((current) => (trigger === "click" && current === groupId ? null : groupId))
    trackGroupOpen(groupId, trigger)
  }

  const handleDesktopNavEnter = () => {
    if (closeGroupTimeoutRef.current !== null) {
      window.clearTimeout(closeGroupTimeoutRef.current)
      closeGroupTimeoutRef.current = null
    }
  }

  const handleDesktopNavLeave = () => {
    if (closeGroupTimeoutRef.current !== null) {
      window.clearTimeout(closeGroupTimeoutRef.current)
    }

    closeGroupTimeoutRef.current = window.setTimeout(() => {
      setOpenGroupId(null)
      closeGroupTimeoutRef.current = null
    }, 180)
  }

  const handleResourceTrackChange = (trackId: (typeof resourceTracks)[number]["id"], trigger: "hover" | "click" | "focus") => {
    setActiveResourceTrackId(trackId)
    trackResourceTrack(trackId, trigger)
  }

  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    trackLeafClick("home", "/", "brand")
    setMobileOpen(false)
    setOpenGroupId(null)

    if (!isHomeRoute) {
      return
    }

    event.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <header role="banner" className="fixed left-0 right-0 top-0 z-50 w-full">
      <LiveStreamTicker locale={locale} />
      <nav
        className={`w-full transition-all duration-300 ${
          isArticleVariant
            ? scrolled
              ? "border-b border-border/70 bg-background/92 shadow-sm backdrop-blur-xl"
              : "border-b border-border/55 bg-background/76 backdrop-blur-xl"
            : scrolled
              ? "border-b bg-background/84 shadow-sm backdrop-blur-xl"
              : isOnDarkHero
                ? "border-b border-transparent bg-linear-to-b from-black/45 to-transparent"
                : "border-b border-transparent bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className={`navbar-ambient-orb navbar-ambient-orb--amber absolute -left-14 -top-11 h-28 w-28 transition-opacity duration-500 ${
              scrolled ? "opacity-45" : isOnDarkHero ? "opacity-35" : "opacity-20"
            }`}
          />
          <div
            className={`navbar-ambient-orb navbar-ambient-orb--sage absolute -right-10 -top-7 h-24 w-24 transition-opacity duration-500 ${
              scrolled ? "opacity-40" : isOnDarkHero ? "opacity-28" : "opacity-16"
            }`}
          />
          <div
            className={`absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-warm-amber/40 to-transparent transition-opacity duration-500 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-8 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
          <div className="relative z-10 flex h-14 items-center justify-between gap-4">
            <Link
              href={localHref("/")}
              onClick={handleBrandClick}
              className="flex shrink-0 items-center gap-2"
              aria-label="RCT Ecosystem Home"
            >
              <Image src="/RCTicon-lightVer.svg" alt="RCT" width={32} height={32} className="h-8 w-8 object-contain dark:hidden" />
              <Image src="/RCTicon.svg" alt="RCT" width={32} height={32} className="hidden h-8 w-8 object-contain dark:block" />
              <span className={`hidden sm:inline-block text-sm font-semibold tracking-tight leading-none ${isDark ? "text-white" : "text-neutral-900"}`}>
                Delentia Labs
              </span>
            </Link>

            <DesktopNav
              locale={locale}
              groups={navigationGroups}
              openGroupId={openGroupId}
              onOpenGroup={handleOpenGroup}
              onNavEnter={handleDesktopNavEnter}
              onNavLeave={handleDesktopNavLeave}
              localHref={localHref}
              isActivePath={isActive}
              onNavigate={handleRouteClick}
              navTextClass={navTextClass}
              navTextActiveClass={navTextActiveClass}
              isDark={isDark}
            />

            <div className="flex items-center gap-2 shrink-0">
              <UtilityActions
                mode="desktop"
                onOpenSearch={prepareAndOpenSearch}
                onTrackedAction={trackUtility}
                isOnDarkHero={isOnDarkHero}
              />

              <button
                type="button"
                onClick={() => setMobileOpen((current) => !current)}
                className={`lg:hidden flex min-h-11 min-w-11 items-center justify-center rounded-full transition-colors ${
                  isDark ? "text-white hover:bg-white/8" : "text-warm-charcoal hover:bg-warm-sand/55"
                }`}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen ? (
          <MobileNavDrawer
            isOpen={mobileOpen}
            locale={locale}
            groups={navigationGroups}
            resourceTracks={resourceTracks}
            activeResourceTrackId={activeResourceTrackId}
            localHref={localHref}
            isActivePath={isActive}
            onNavigate={handleRouteClick}
            onOpenSearch={prepareAndOpenSearch}
            onClose={() => setMobileOpen(false)}
            onResourceTrackChange={handleResourceTrackChange}
            onTrackedUtility={trackUtility}
            isDark={isDark}
          />
        ) : null}
      </nav>

      {searchOpen ? <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} searchData={searchData} /> : null}
      {shortcutsOpen ? <KeyboardShortcutsDialog onOpenSearch={prepareAndOpenSearch} /> : null}
    </header>
  )
}