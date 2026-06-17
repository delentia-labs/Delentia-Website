// next.config.mjs
/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production"
const isPreview = process.env.VERCEL_ENV === "preview"

const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  poweredByHeader: false,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2xsxph8kpxj0f.cloudfront.net",
      },
    ],
  },
  compress: true,
  experimental: {
    optimizeCss: true,
    cssChunking: true,
    // Disable client-side Router Cache for dynamically rendered pages (pages that
    // use headers(), cookies(), etc.). This ensures locale-switching via
    // /en/* ↔ /th/* always triggers a fresh RSC fetch — not a cached payload.
    staleTimes: { dynamic: 0 },
    optimizePackageImports: [
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
      "lucide-react",      "recharts",
      "embla-carousel-react",      // NOTE: framer-motion intentionally excluded — its `motion` factory uses a
      // dynamic Proxy/function pattern that Turbopack's tree-shaking mishandles,
      // causing `motion.div` etc. to become `undefined` after HMR invalidation.
    ],
  },
  async redirects() {
    return [
      // Locale-prefixed static asset redirects to prevent Next.js i18n routing interference
      {
        source: "/th/assets/whitepaper-th.pdf",
        destination: "/assets/technical-whitepaper-th.pdf",
        permanent: false,
      },
      {
        source: "/th/assets/whitepaper.pdf",
        destination: "/assets/technical-whitepaper-th.pdf",
        permanent: false,
      },
      {
        source: "/en/assets/whitepaper.pdf",
        destination: "/assets/technical-whitepaper-en.pdf",
        permanent: false,
      },
      {
        source: "/th/assets/technical-whitepaper.pdf",
        destination: "/assets/technical-whitepaper-th.pdf",
        permanent: false,
      },
      {
        source: "/en/assets/technical-whitepaper.pdf",
        destination: "/assets/technical-whitepaper-en.pdf",
        permanent: false,
      },
      // General fallback for all other assets to strip locale prefixes
      {
        source: "/th/assets/:path*",
        destination: "/assets/:path*",
        permanent: false,
      },
      {
        source: "/en/assets/:path*",
        destination: "/assets/:path*",
        permanent: false,
      },
      // Next.js file-based metadata for app/apple-icon.tsx generates
      // <link href="/apple-icon.png"> but the actual route is /apple-icon.
      // Redirect the .png URL to the dynamic edge route.
      {
        source: "/apple-icon.png",
        destination: "/apple-icon",
        permanent: false,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      {
        source: "/technology/jitna-rfc-001",
        destination: "/protocols/jitna-rfc-001",
        permanent: true,
      },
      {
        source: "/en/technology/jitna-rfc-001",
        destination: "/en/protocols/jitna-rfc-001",
        permanent: true,
      },
      {
        source: "/technology/fdia-equation-explained",
        destination: "/blog/fdia-equation-explained",
        permanent: true,
      },
      {
        source: "/en/technology/fdia-equation-explained",
        destination: "/en/blog/fdia-equation-explained",
        permanent: true,
      },
      // SDK docs redirect — /docs and /th/docs both point to GitHub Pages
      {
        source: "/docs",
        destination: "https://delentia-labs.github.io/delentia-os/",
        permanent: false,
      },
      {
        source: "/en/docs",
        destination: "https://delentia-labs.github.io/delentia-os/",
        permanent: false,
      },
      {
        source: "/th/docs",
        destination: "https://delentia-labs.github.io/delentia-os/",
        permanent: false,
      },
      // Product page redirects: old brand URLs → new brand URLs
      {
        source: "/products/artent-ai",
        destination: "/products/delentia-ai",
        permanent: true,
      },
      {
        source: "/en/products/artent-ai",
        destination: "/en/products/delentia-ai",
        permanent: true,
      },
      {
        source: "/th/products/artent-ai",
        destination: "/th/products/delentia-ai",
        permanent: true,
      },
      {
        source: "/products/rctlabs",
        destination: "/products/delentia-platform",
        permanent: true,
      },
      {
        source: "/en/products/rctlabs",
        destination: "/en/products/delentia-platform",
        permanent: true,
      },
      {
        source: "/th/products/rctlabs",
        destination: "/th/products/delentia-platform",
        permanent: true,
      },
      // Compare page redirects
      {
        source: "/compare/rctdb-vs-vector-databases",
        destination: "/compare/delentiadb-vs-vector-databases",
        permanent: true,
      },
      {
        source: "/compare/rct-labs-vs-llm-apis",
        destination: "/compare/delentia-labs-vs-llm-apis",
        permanent: true,
      },

    ]
  },
  async headers() {
    const headers = [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "0" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // GA4 (gtag/js) and GTM (gtm.js) both served from googletagmanager.com
              // unsafe-eval: React dev mode needs it for callstack reconstruction; Vercel Live Preview also needs it.
              // Production builds (NODE_ENV=production) never use eval — React strips it at build time.
              `script-src 'self' ${!isProduction || isPreview ? "'unsafe-eval' " : ""}'unsafe-inline' https://vercel.live https://va.vercel-scripts.com https://www.googletagmanager.com`,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              // www.google.com needed for GA4 attribution pixel (1×1 tracking image)
              "img-src 'self' data: blob: https://d2xsxph8kpxj0f.cloudfront.net https://delentia.com https://www.googletagmanager.com https://www.google.com",
              // stats.g.doubleclick.net needed for GA4 attribution and conversion tracking
              "connect-src 'self' https://*.supabase.co https://vercel.live wss://*.supabase.co https://api.delentia.com https://vitals.vercel-insights.com https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://region1.google-analytics.com https://region1.analytics.google.com https://stats.g.doubleclick.net https://www.google.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ]

    if (isProduction) {
      headers.push({
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      })
    }

    return headers
  },
}

export default nextConfig;
