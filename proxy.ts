import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, detectLocale } from '@/lib/i18n'
import { hasPublicSupabaseEnv } from '@/lib/auth/config'
import { createSupabaseRequestClient } from '@/lib/auth/request-client'
import { isProtectedInternalPath, stripLocalePrefix, type AuthRole } from '@/lib/auth/policy'
import type { Locale } from '@/lib/i18n'

/* ─── Simple sliding-window rate limiter for /api/* ────────── */
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 20
const WINDOW_MS = 60_000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

const roleRank: Record<AuthRole, number> = {
  public: 0,
  member: 1,
  admin: 2,
  owner: 3,
}

function resolveRole(session: { user?: { app_metadata?: Record<string, unknown>; user_metadata?: Record<string, unknown> } } | null): AuthRole {
  const appRole = session?.user?.app_metadata?.role
  if (typeof appRole === 'string' && appRole in roleRank) {
    return appRole as AuthRole
  }

  const userRole = session?.user?.user_metadata?.role
  if (typeof userRole === 'string' && userRole in roleRank) {
    return userRole as AuthRole
  }

  return 'member'
}

function hasRequiredRole(currentRole: AuthRole, requiredRole: Exclude<AuthRole, 'public'>): boolean {
  return roleRank[currentRole] >= roleRank[requiredRole]
}

function safeNextPath(pathname: string, search: string): string {
  const candidate = `${pathname}${search}`
  return candidate.startsWith('/') ? candidate : '/'
}

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const requireSessionAuth = process.env.REQUIRE_SESSION_AUTH !== 'false'
  let authResponse: NextResponse | null = null

  const withAuthCookies = (response: NextResponse) => {
    if (!authResponse) return response

    authResponse.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie)
    })

    return response
  }

  // ─── Analytics dashboard — token-gated (all environments) ──────────────
  // The /analytics page exposes internal cost and performance data.
  // Access requires ANALYTICS_SECRET_TOKEN env var + ?token=... query param.
  if (pathname.startsWith('/analytics') || pathname.match(/^\/[a-z]{2}\/analytics/)) {
    const secret = process.env.ANALYTICS_SECRET_TOKEN
    if (!secret || secret === 'change_this_to_a_long_random_secret') {
      return withAuthCookies(new NextResponse(
        JSON.stringify({ error: 'Analytics dashboard is not configured.' }),
        { status: 503, headers: { 'content-type': 'application/json' } }
      ))
    }
    const tokenFromQuery = searchParams.get('token')
    const tokenFromHeader = request.headers.get('x-analytics-token')
    if (tokenFromQuery !== secret && tokenFromHeader !== secret) {
      return withAuthCookies(new NextResponse(
        `<!doctype html><html><head><title>RCT Analytics — Access Required</title>` +
        `<style>body{font-family:system-ui;display:flex;align-items:center;justify-content:center;` +
        `height:100vh;margin:0;background:#0d1117;color:#ccc;}` +
        `.card{border:1px solid #30363d;border-radius:12px;padding:2rem 2.5rem;text-align:center;max-width:360px;}` +
        `h2{color:#e6edf3;margin-bottom:.5rem}p{font-size:.9rem;margin-bottom:1.5rem}code{background:#21262d;padding:.1em .4em;border-radius:4px}</style>` +
        `</head><body><div class="card">` +
        `<h2>🔒 Analytics Dashboard</h2>` +
        `<p>Access requires a valid token.<br/>Append <code>?token=YOUR_TOKEN</code> to the URL.</p>` +
        `</div></body></html>`,
        { status: 401, headers: { 'content-type': 'text/html' } }
      ))
    }
  }

  const protectedRoute = isProtectedInternalPath(pathname)
  if (protectedRoute && requireSessionAuth) {
    const canUseSessionAuth = hasPublicSupabaseEnv()

    if (!canUseSessionAuth) {
      if (process.env.NODE_ENV === 'production' || process.env.BLOCK_INTERNAL_ROUTES === 'true') {
        const fallbackUrl = request.nextUrl.clone()
        fallbackUrl.pathname = protectedRoute.fallbackHref
        return withAuthCookies(NextResponse.rewrite(fallbackUrl))
      }
    } else {
      authResponse = NextResponse.next()
      const supabase = createSupabaseRequestClient(request, authResponse)
      // Use getUser() — verifies JWT with Supabase Auth server (secure)
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        const signInUrl = request.nextUrl.clone()
        signInUrl.pathname = '/auth/signin'
        signInUrl.searchParams.set('next', safeNextPath(pathname, request.nextUrl.search))
        return withAuthCookies(NextResponse.redirect(signInUrl))
      }

      const userRole = resolveRole({ user })
      if (!hasRequiredRole(userRole, protectedRoute.requiredRole)) {
        const fallbackUrl = request.nextUrl.clone()
        fallbackUrl.pathname = protectedRoute.fallbackHref
        return withAuthCookies(NextResponse.rewrite(fallbackUrl))
      }
    }
  }

  // Rate-limit API routes
  if (pathname.startsWith('/api')) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown'
    if (!checkRateLimit(ip)) {
      return withAuthCookies(new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
        },
      }))
    }
    return withAuthCookies(NextResponse.next())
  }

  // Skip middleware for static files and internal Next.js paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    /\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|otf|mp4|webm|json|webmanifest|map)$/.test(pathname)
  ) {
    return withAuthCookies(NextResponse.next())
  }

  // Check if pathname already has a locale prefix
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  ) as Locale | undefined

  if (pathnameLocale) {
    // For bare locale root paths (/en, /th), do NOT rewrite the URL.
    // These routes are handled by app/[locale]/page.tsx with ISR (revalidate=3600).
    // Rewriting to "/" would hit app/page.tsx which is force-dynamic and breaks ISR.
    const isBareLocale = pathname === `/${pathnameLocale}`

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-locale', pathnameLocale)

    if (isBareLocale) {
      const response = NextResponse.next({ request: { headers: requestHeaders } })
      response.headers.set('x-locale', pathnameLocale)
      return withAuthCookies(response)
    }

    // Strip locale prefix and rewrite to the original page path
    // e.g. /en/about → /about, /th/solutions/ai-hallucination-prevention → /solutions/ai-hallucination-prevention
    const pathnameWithoutLocale = stripLocalePrefix(pathname)
    // IMPORTANT: Use nextUrl.clone() (not `new URL()`) to preserve Next.js internal routing
    // context for Turbopack — new URL() breaks nested route rewrites.
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = pathnameWithoutLocale

    const response = NextResponse.rewrite(rewriteUrl, {
      request: { headers: requestHeaders },
    })
    response.headers.set('x-locale', pathnameLocale)
    return withAuthCookies(response)
  }

  // No locale prefix detected → redirect to add one based on Accept-Language
  const acceptLanguage = request.headers.get('accept-language')
  const locale = detectLocale(acceptLanguage)

  const newUrl = request.nextUrl.clone()
  newUrl.pathname = `/${locale}${pathname}`
  return withAuthCookies(NextResponse.redirect(newUrl))
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|_vercel|favicon.ico|sitemap.xml|robots.txt|opengraph-image|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|otf|mp4|webm|json|webmanifest|map)$).*)',
  ],
}
