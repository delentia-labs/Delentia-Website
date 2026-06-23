export type SupabaseRuntime = "browser" | "server" | "admin"

export type SupabaseConfig = {
  url: string
  key: string
}

function getSupabaseUrl(): string {
  let url = (
    process.env.SUPABASE_URL ||
    process.env.supabase_url ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.next_public_supabase_url ||
    ""
  ).trim().replace(/^['"]|['"]$/g, "")

  // Strip trailing /rest/v1 and trailing slashes
  url = url.replace(/\/rest\/v1\/?$/, "")
  url = url.replace(/\/$/, "")
  return url
}

function getRequiredEnv(name: string): string {
  const value = process.env[name] || process.env[name.toLowerCase()] || process.env[name.toUpperCase()]
  if (!value) {
    // During `next build` on CI without env vars, return placeholder so build succeeds.
    // At runtime the real env vars must be set; the auth guard will redirect if Supabase
    // returns an auth error.
    if (process.env.NODE_ENV === "production" && process.env.CI) {
      return `placeholder-${name}`
    }
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value.trim().replace(/^['"]|['"]$/g, "")
}

export function getSupabaseConfig(runtime: SupabaseRuntime): SupabaseConfig {
  const url = getSupabaseUrl()
  if (!url) {
    // Allow build to proceed on CI without Supabase env vars.
    // Studio pages are force-dynamic so they won't be prerendered.
    if (process.env.CI) {
      return { url: "https://placeholder.supabase.co", key: "placeholder-key" }
    }
    throw new Error("Missing required environment variable: SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL")
  }

  if (runtime === "admin") {
    return {
      url,
      key: getRequiredEnv("SUPABASE_SERVICE_KEY"),
    }
  }

  // IMPORTANT: NEXT_PUBLIC_* variables must be accessed via static property syntax
  // (process.env.NEXT_PUBLIC_FOO) NOT dynamic bracket notation (process.env["NEXT_PUBLIC_FOO"])
  // because Next.js/webpack only inlines static accesses during build.
  const staticAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  let anonKey = staticAnonKey || process.env.supabase_anonkey || process.env.SUPABASE_ANON_KEY || process.env.supabase_anon_key
  if (!anonKey) {
    throw new Error("Missing required environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }
  anonKey = anonKey.trim().replace(/^['"]|['"]$/g, "")

  return { url, key: anonKey }
}

export function hasPublicSupabaseEnv() {
  return Boolean(getSupabaseUrl() && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
