import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk, Space_Mono, Kanit } from "next/font/google"
import { LocaleLangSync } from "@/components/locale-lang-sync"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/schema"
import { AppProviders } from "@/components/app-providers"
import { DeferredGlobalBackground } from "@/components/performance/deferred-global-background"
import { DeferredAnalytics } from "@/components/performance/deferred-analytics"
import { Toaster } from "sonner"
import { SITE_OG_IMAGE, SITE_URL, SOCIAL_LINKS } from "@/lib/site-config"

const themeBootstrapScript = `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = stored === 'dark' || stored === 'light' ? stored : system;
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
  } catch {}
})();`

// Inline script: set html[lang] from URL pathname BEFORE hydration to prevent
// the flash where Thai text renders with Inter font (happens because root layout
// defaults to lang="en" for ISR compatibility and LocaleLangSync patches it
// client-side after hydration — this script closes the gap).
const localeBootstrapScript = `(()=>{try{var p=window.location.pathname;document.documentElement.setAttribute('lang',p.startsWith('/th')?'th':'en');}catch(e){}})();`

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION
const bingSiteVerification = process.env.BING_SITE_VERIFICATION
const enableVercelRuntimeInsights = process.env.VERCEL === "1"
const gtmId = process.env.NEXT_PUBLIC_GTM_ID
const ga4Id = process.env.NEXT_PUBLIC_GA4_ID

const verification = googleSiteVerification || bingSiteVerification
  ? {
      google: googleSiteVerification,
      other: bingSiteVerification
        ? {
            "msvalidate.01": bingSiteVerification,
          }
        : undefined,
    }
  : undefined

/* Display: Space Grotesk (headings) — preload=true, optional: commits to
   size-adjusted fallback at 100ms with NO swap. Same fix as Kanit (06 May 2026):
   with "fallback" the 3000ms swap window caused Lighthouse to measure LCP at the
   font-swap repaint (~5s on throttled 4G) rather than at first paint.
   "optional" eliminates swap repaint; first-time EN visitors see "Space Grotesk
   Fallback" (Arial size-adjusted via adjustFontFallback); on cached loads the real
   font renders correctly. Manual <link rel="preload"> in <head> below bypasses the
   missing preload bug in Next.js 16 variable-mode fonts. */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
})

/* Body: Inter — preload=true for clean first render */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
})

/* Mono: Space Mono */
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
})

/* Thai: Kanit (matches geometric style) — display: swap for instant clean typography */
const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--rct-font-thai",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
})



export async function generateMetadata(): Promise<Metadata> {
  // NOTE: No headers() call here — keeps root layout ISR-compatible.
  // Locale-specific metadata is provided by each page's generateMetadata.
  const title = "Delentia Labs - Intent-Driven AI Operating System"
  const description = "Constitutional AI infrastructure with 10-layer architecture, multi-LLM consensus, and data sovereignty for enterprise deployment."

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s | Delentia Labs",
    },
    description,
    keywords: [
      "intent-driven AI",
      "AI alignment",
      "constitutional AI",
      "intent operating system",
      "FDIA formula",
      "JITNA protocol",
      "multi-LLM consensus",
      "AI verification",
      "SignedAI",
      "RCT-7 process",
      "deterministic AI",
      "enterprise AI governance",
      "AI hallucination prevention",
    ],
    authors: [{ name: "Ittirit Saengow", url: `${SITE_URL}/authors/ittirit-saengow` }],
    creator: "Ittirit Saengow",
    publisher: "Delentia Labs",
    formatDetection: {
      email: false,
      telephone: false,
    },
    alternates: {
      canonical: `${SITE_URL}/en`,
      languages: {
        en: `${SITE_URL}/en`,
        th: `${SITE_URL}/th`,
        "x-default": `${SITE_URL}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["th_TH"],
      url: `${SITE_URL}/en`,
      siteName: "Delentia Labs",
      title,
      description,
      images: [
        {
          url: `${SITE_OG_IMAGE}`,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: SOCIAL_LINKS.twitterHandle,
      site: SOCIAL_LINKS.twitterHandle,
      images: [`${SITE_OG_IMAGE}`],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    verification,
    icons: {
      icon: [
        { url: "/icon.svg?v=2", type: "image/svg+xml" },
        { url: "/favicon.ico?v=2", sizes: "any" },
        { url: "/favicon.png?v=2", type: "image/png", sizes: "32x32" },
      ],
      shortcut: "/favicon.ico?v=2",
      apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.webmanifest",
    // Note: generator field removed — do not expose internal tooling
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // NOTE: No headers() call — keeps root layout ISR-compatible.
  // <html lang> defaults to "en" and is patched client-side by <LocaleLangSync />
  // based on the URL pathname (e.g. /th/* → lang="th").
  const organizationSchema = getOrganizationSchema("en")
  const websiteSchema = getWebSiteSchema("en")

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="color-scheme" content="light dark" />
        {/* Locale bootstrap: set html[lang] immediately from URL to prevent Thai→Inter font flash */}
        <script dangerouslySetInnerHTML={{ __html: localeBootstrapScript }} />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        {/* Preconnect to image CDN for faster LCP */}
        <link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://d2xsxph8kpxj0f.cloudfront.net" />
        {/* Preconnect to analytics domains so DNS+TCP+TLS is warm when GTM/GA loads
            after the deferred idle gate fires. Keeps analytics latency low without
            blocking first-paint (preconnect only establishes connections; scripts
            are still loaded by DeferredAnalytics in the body after user interaction
            or requestIdleCallback). */}
        {gtmId && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          </>
        )}
        {(gtmId ?? ga4Id) && (
          <>
            <link rel="preconnect" href="https://www.google-analytics.com" />
            <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          </>
        )}
        {/* Third-party analytics scripts are intentionally deferred in body
            to avoid competing with above-the-fold rendering and LCP. */}
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable} ${kanit.variable} antialiased`}
      >
        {/* GTM noscript fallback */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-warm-charcoal focus:text-white focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg"
        >
          Skip to main content
        </a>
        <AppProviders>
          <LocaleLangSync />
          <DeferredGlobalBackground />
          <DeferredAnalytics ga4Id={ga4Id} gtmId={gtmId} />
          <div id="main-content" className="relative z-10" tabIndex={-1}>
            {children}
          </div>
          {enableVercelRuntimeInsights ? <Analytics /> : null}
          {enableVercelRuntimeInsights ? <SpeedInsights /> : null}
          <Toaster richColors position="bottom-right" />
        </AppProviders>
      </body>
    </html>
  )
}
