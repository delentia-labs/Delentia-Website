"use client"

/*
 * UserProfileMenu — Auth shell for the Navbar
 * Currently shows Sign In / Early Access CTAs (Supabase auth in Phase 8)
 * Props: isAuthenticated, user for when auth is wired
 */
import { useEffect, useState } from "react"
import { User, LogOut, Settings, ChevronDown, ArrowRight } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { buildContactHref } from "@/lib/funnel"
import { resolveLocale, getLocalePrefix } from "@/lib/i18n"

interface UserProfileMenuProps {
  /** Future: pass user object when Supabase Auth is wired */
  user?: { name?: string; email?: string; avatarUrl?: string } | null
  isAuthenticated?: boolean
}

export function UserProfileMenu({ user = null, isAuthenticated = false }: UserProfileMenuProps) {
  const [open, setOpen] = useState(false)
  const [resolvedUser, setResolvedUser] = useState<UserProfileMenuProps["user"]>(user)
  const [resolvedAuth, setResolvedAuth] = useState(isAuthenticated)
  const { language } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    let active = true
    let unsubscribe: (() => void) | null = null

    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return () => {
        active = false
      }
    }

    void (async () => {
      // Lazy-import: defers the @supabase/auth-js bundle (~50 KB) until after mount
      // so it does not block the initial page parse/eval on the homepage.
      const { getSupabaseBrowserClient } = await import("@/lib/auth/browser-client")
      if (!active) return

      const supabase = getSupabaseBrowserClient()

      void supabase.auth.getUser().then(({ data }) => {
        if (!active) return

        if (!data.user) {
          setResolvedAuth(isAuthenticated)
          setResolvedUser(user)
          return
        }

        setResolvedAuth(true)
        setResolvedUser({
          name:
            (typeof data.user.user_metadata?.full_name === "string" && data.user.user_metadata.full_name) ||
            (typeof data.user.user_metadata?.name === "string" && data.user.user_metadata.name) ||
            undefined,
          email: data.user.email,
          avatarUrl:
            typeof data.user.user_metadata?.avatar_url === "string"
              ? data.user.user_metadata.avatar_url
              : undefined,
        })
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!active) return

        if (!session?.user) {
          setResolvedAuth(false)
          setResolvedUser(null)
          return
        }

        setResolvedAuth(true)
        setResolvedUser({
          name:
            (typeof session.user.user_metadata?.full_name === "string" && session.user.user_metadata.full_name) ||
            (typeof session.user.user_metadata?.name === "string" && session.user.user_metadata.name) ||
            undefined,
          email: session.user.email,
          avatarUrl:
            typeof session.user.user_metadata?.avatar_url === "string"
              ? session.user.user_metadata.avatar_url
              : undefined,
        })
      })

      if (!active) {
        subscription.unsubscribe()
        return
      }
      unsubscribe = () => subscription.unsubscribe()
    })()

    return () => {
      active = false
      unsubscribe?.()
    }
  }, [isAuthenticated, user])

  const copy = language === "th"
    ? {
        contact: "ติดต่อทีมงาน",
        requestAccess: "ขอสิทธิ์เข้าถึง",
        settings: "ตั้งค่า",
        signOut: "ออกจากระบบ",
      }
    : {
        contact: "Contact",
        requestAccess: "Request Access",
        settings: "Settings",
        signOut: "Sign out",
      }

  const localePrefix = getLocalePrefix(resolveLocale(pathname, language))
  const contactHref = `${localePrefix}/contact`

  // ── Authenticated state (Phase 8) ──────────────────────────────────────
  if (resolvedAuth && resolvedUser) {
    return (
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          aria-expanded={open}
          aria-haspopup="menu"
        >
          {resolvedUser.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={resolvedUser.avatarUrl} alt="avatar" className="h-6 w-6 rounded-full object-cover" />
          ) : (
            <User className="h-4 w-4" />
          )}
          <span className="hidden sm:block max-w-30 truncate">{resolvedUser.name ?? resolvedUser.email}</span>
          <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-full mt-2 z-50 w-48 rounded-xl border border-border bg-popover shadow-lg p-1">
              <Link
                href="/studio/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors"
              >
                <Settings className="h-4 w-4" /> {copy.settings}
              </Link>
              <div className="my-1 h-px bg-border" />
              <button
                onClick={async () => {
                  setOpen(false)
                  const { getSupabaseBrowserClient } = await import("@/lib/auth/browser-client")
                  const supabase = getSupabaseBrowserClient()
                  await supabase.auth.signOut()
                  router.push("/auth/signin")
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="h-4 w-4" /> {copy.signOut}
              </button>
            </div>
          </>
        )}
      </div>
    )
  }

  const handleRequestAccessClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-waitlist"))
    }
  }

  // ── Unauthenticated state — current live state ─────────────────────────
  return (
    <div className="flex items-center gap-3">
      <Link
        href={contactHref}
        className="hidden lg:inline-flex items-center text-[13px] font-medium text-warm-gray/80 transition-colors hover:text-warm-charcoal dark:text-white/55 dark:hover:text-white"
      >
        {copy.contact}
      </Link>
      <button
        onClick={handleRequestAccessClick}
        className="inline-flex items-center gap-1.5 rounded-full bg-warm-amber px-4 py-1.5 text-[13px] font-semibold text-warm-charcoal transition-all duration-200 hover:bg-warm-amber/90 hover:scale-105 active:scale-95 whitespace-nowrap"
        type="button"
      >
        {copy.requestAccess}
        <ArrowRight size={12} />
      </button>
    </div>
  )
}

export default UserProfileMenu
