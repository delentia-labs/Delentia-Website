import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogPostBySlug, getAllBlogPosts, getBlogCategoryLabel, getBlogHeroMetrics, getBlogPublicationType, getPostJourney, getPostReviewDate, getResolvedAuthorProfile, getResolvedReviewerProfile, slugifyHeading, getRelatedPosts } from "@/lib/blog"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { ClaimsCorrectionNotice, containsWithdrawnClaim } from "@/components/claims-correction-notice"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { UserRound } from "lucide-react"
import { MDXContent } from "@/components/mdx-content"
import { SITE_URL } from "@/lib/site-config"
import { getBreadcrumbSchema } from "@/lib/schema"
import { ArticleTrustSummary } from "@/components/blog/article-trust-summary"
import { ArticleCtaPanel } from "@/components/blog/article-cta-panel"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { ShareStrip } from "@/components/blog/share-strip"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { ArticleHero } from "@/components/blog/article-hero"
import { StatGrid } from "@/components/blog/mdx-article-components"

function AuthorAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase()
  return (
    <div className="w-16 h-16 bg-linear-to-br from-warm-amber/30 to-warm-amber/10 border border-warm-amber/20 rounded-full shrink-0 flex items-center justify-center font-bold text-warm-amber text-lg">
      {initials}
    </div>
  )
}

function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^#{2,3}\s+(.+)$/gm
  const matches: { id: string; text: string; level: number }[] = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const raw = match[0]
    const level = raw.startsWith("###") ? 3 : 2
    const text = match[1].replace(/\*\*/g, "").replace(/`/g, "").trim()
    const id = slugifyHeading(text)
    matches.push({ id, text, level })
  }
  return matches
}

function findHeadingId(headings: { id: string; text: string; level: number }[], candidates: string[]) {
  const normalizedCandidates = candidates.map((candidate) => candidate.toLowerCase())
  return headings.find((heading) => normalizedCandidates.some((candidate) => heading.text.toLowerCase().includes(candidate)))?.id
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts("en")
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const locale = await getRequestLocale()
  const post = getBlogPostBySlug(slug, locale)

  if (!post) {
    return createBilingualMetadata(locale, "Post Not Found", "ไม่พบบทความ", "The blog post you're looking for doesn't exist.", "ไม่พบบทความที่คุณกำลังค้นหา", "/blog")
  }

  const metaDescription = post.excerpt && post.excerpt.length < 150
    ? `${post.excerpt} Read the full article for practical strategies, examples, and best practices from Delentia Labs.`
    : post.excerpt

  return createBilingualMetadata(
    locale,
    post.title,
    post.title,
    metaDescription || post.title,
    metaDescription || post.title,
    `/blog/${slug}`,
    ["AI blog", "Delentia Labs article"]
  )
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const locale = await getRequestLocale()
  const post = getBlogPostBySlug(slug, locale)
  const localePrefix = locale === "th" ? "/th" : ""

  if (!post) {
    notFound()
  }

  const allPosts = getAllBlogPosts(locale)
  const author = getResolvedAuthorProfile(post)
  const reviewer = getResolvedReviewerProfile(post)
  const reviewedDate = getPostReviewDate(post)
  const postJourney = getPostJourney(post)
  const relatedPosts = getRelatedPosts(slug, locale)
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const headings = extractHeadings(post.content)
  const categoryLabel = getBlogCategoryLabel(post.category, locale)
  const publicationType = getBlogPublicationType(post.category, locale)
  const heroMetrics = getBlogHeroMetrics(post.slug)
  const articleUrl = `${SITE_URL}${localePrefix}/blog/${slug}`
  const summaryId = findHeadingId(headings, ["summary", "executive summary", "what this means"])
  const resourcesId = findHeadingId(headings, ["related resources", "additional links", "sources"])
  const citation = `${author?.name ?? post.author} (${new Date(post.date).getFullYear()}). ${post.title}. Delentia Labs. ${articleUrl}`

  // --- FAQ schema: extract question-formatted H2 headings for AEO/AI search ---
  // Headings that read as questions (start with What, How, Why, When, Which, Can, Is, Are, Does, Should)
  // or end with "?" are surfaced as FAQPage JSON-LD for AI/voice search retrieval.
  const faqItems = headings
    .filter((h) => h.level === 2 && /^(what|how|why|when|which|can|is|are|does|should|\w+.*\?)/i.test(h.text))
    .slice(0, 5)
    .map((h) => ({
      "@type": "Question",
      "name": h.text,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": post.excerpt,
        "url": `${articleUrl}#${h.id}`,
      },
    }))
  const faqSchema = faqItems.length >= 2 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems,
  } : null

  // --- BlogPosting Schema for SEO ---
  // Enhanced with image, about, isPartOf, citation, speakable for maximum E-E-A-T and AIO signals
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt && post.excerpt.length < 150
      ? `${post.excerpt} Read the full article for practical strategies, examples, and best practices from Delentia Labs.`
      : post.excerpt,
    "url": `${SITE_URL}${localePrefix}/blog/${slug}`,
    "datePublished": post.date,
    "dateModified": reviewedDate,
    "wordCount": post.content.split(/\\s+/).length,
    "keywords": post.tags?.join(", "),
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".article-hero-headline", ".article-hero-excerpt", "h2", "h3"],
    },
    "image": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/blog/${slug}/opengraph-image`,
      "width": 1200,
      "height": 630,
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}${localePrefix}/blog/${slug}`
    },
    "isPartOf": {
      "@type": "Blog",
      "@id": `${SITE_URL}${localePrefix}/blog`,
      "name": "Delentia Labs Blog",
    },
    "about": post.tags?.map((tag: string) => ({
      "@type": "DefinedTerm",
      "name": tag,
      "inDefinedTermSet": `${SITE_URL}/glossary`,
    })),
    "author": {
      "@type": author?.profileType === "organization" ? "Organization" : "Person",
      "name": author?.name ?? post.author,
      ...(author ? { "url": `${SITE_URL}${localePrefix}/authors/${author.id}` } : {}),
      ...(author?.sameAs ? { "sameAs": author.sameAs } : {}),
    },
    "editor": reviewer ? {
      "@type": reviewer.profileType === "organization" ? "Organization" : "Person",
      "name": reviewer.name,
      ...(reviewer ? { "url": `${SITE_URL}${localePrefix}/authors/${reviewer.id}` } : {})
    } : undefined,
    ...(post.references?.length ? {
      "citation": post.references.map((ref: string) => ({
        "@type": "CreativeWork",
        "url": ref,
      })),
    } : {}),
    "publisher": {
      "@type": "Organization",
      "name": "Delentia Labs",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    }
  }
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}${localePrefix || "/en"}` },
    { name: "Blog", url: `${SITE_URL}${localePrefix}/blog` },
    { name: post.title, url: `${SITE_URL}${localePrefix}/blog/${slug}` },
  ])

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema ? (
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}
      <Navbar variant="article" />
      <ReadingProgress />

      <section className="article-safe-top border-b border-border/70 bg-linear-to-b from-background via-background to-muted/25">
        <div className="mx-auto max-w-6xl px-4 pb-10 md:pb-14">
          <ArticleHero
            locale={locale}
            localePrefix={localePrefix}
            post={post}
            categoryLabel={categoryLabel}
            publicationType={publicationType}
            reviewedDate={reviewedDate}
            authorName={author?.name ?? post.author}
            reviewerName={reviewer?.name ?? (locale === "th" ? "ทีมบรรณาธิการ" : "Editorial review")}
            authorityHref={postJourney.authorityHref}
            authorityLabel={postJourney.authorityLabel}
            metrics={heroMetrics}
          />
        </div>
      </section>

      <section className="border-b border-border/70 bg-background/95">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <ArticleTrustSummary
            locale={locale}
            localePrefix={localePrefix}
            reviewer={reviewer}
            reviewedDate={reviewedDate}
            references={post.references ?? []}
            authorityHref={postJourney.authorityHref}
            authorityLabel={postJourney.authorityLabel}
          />
        </div>
      </section>

      {/* Article — 2 column layout on desktop */}
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-12">
          {/* Main content */}
          <article className="min-w-0">
            <div className="max-w-[75ch]">
              <div className="rounded-4xl border border-border/70 bg-card/88 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.05)] md:p-10">
                {containsWithdrawnClaim(post.content) ? <ClaimsCorrectionNotice locale={locale} localePrefix={localePrefix} /> : null}
                <MDXContent content={post.content} locale={locale} />
              </div>

              <section className="mt-10 rounded-[28px] border border-border/70 bg-card/90 p-6 md:p-8">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {locale === "th" ? "Executive takeaway" : "Executive takeaway"}
                </div>
                <h2 className="mt-3 text-2xl font-bold text-foreground md:text-3xl">
                  {locale === "th" ? "สิ่งที่องค์กรควรสรุปจากบทความนี้" : "What enterprise teams should retain from this briefing"}
                </h2>
                <p className={`mt-4 text-base leading-8 text-muted-foreground ${locale === "th" ? "subtitle-th" : ""}`}>
                  {post.excerpt}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="rounded-full border border-border bg-background/75 px-3 py-1.5 text-sm text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              <div className="mt-10">
                <ShareStrip locale={locale} title={post.title} url={articleUrl} citation={citation} />
              </div>

              <ArticleCtaPanel
                locale={locale}
                localePrefix={localePrefix}
                solutionHref={postJourney.solutionHref}
                solutionLabel={postJourney.solutionLabel}
                authorityHref={postJourney.authorityHref}
                authorityLabel={postJourney.authorityLabel}
                conversionContext={postJourney.conversionContext}
                conversionLabel={postJourney.conversionLabel}
              />

              {/* Article Navigation */}
              <div className="border-t border-border pt-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {prevPost ? (
                  <Link href={`${localePrefix}/blog/${prevPost.slug}`} className="group">
                    <div className="rounded-3xl border border-border/70 bg-card/80 p-5 transition group-hover:border-warm-amber/35 group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)]">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">{locale === "th" ? "บทความก่อนหน้า" : "Previous Post"}</p>
                      <h3 className="mt-2 text-lg font-bold text-foreground transition group-hover:text-warm-amber">
                        {prevPost.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{prevPost.excerpt}</p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost ? (
                  <Link href={`${localePrefix}/blog/${nextPost.slug}`} className="group md:text-right">
                    <div className="rounded-3xl border border-border/70 bg-card/80 p-5 transition group-hover:border-warm-amber/35 group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)]">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">{locale === "th" ? "บทความถัดไป" : "Next Post"}</p>
                      <h3 className="mt-2 text-lg font-bold text-foreground transition group-hover:text-warm-amber">
                        {nextPost.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{nextPost.excerpt}</p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
              </div>

              {/* Author Section */}
              <div className="mt-12 rounded-[1.75rem] border border-border/70 bg-card/90 p-6 md:p-8">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {locale === "th" ? "Author credibility" : "Author credibility"}
                </div>
                <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-start">
                  <AuthorAvatar name={author?.name ?? post.author} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-bold text-foreground">{author?.name ?? post.author}</h3>
                      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        <UserRound className="h-3.5 w-3.5" />
                        {locale === "th" ? "Primary author" : "Primary author"}
                      </span>
                    </div>
                    <p className={`mt-3 text-sm leading-7 text-muted-foreground ${locale === "th" ? "subtitle-th" : ""}`}>
                      {author?.bio[locale] ?? `${post.author} contributes to the public research and editorial library at Delentia Labs.`}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {author ? (
                      <Link href={`${localePrefix}/authors/${author.id}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-warm-amber">
                        <span>{locale === "th" ? "ดูโปรไฟล์ผู้เขียน" : "View author profile"}</span>
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* TOC sidebar — desktop only */}
          <aside className="hidden lg:block">
            <TableOfContents
              locale={locale}
              headings={headings}
              evidenceCount={post.references?.length ?? 0}
              reviewedDate={reviewedDate}
              summaryId={summaryId}
              resourcesId={resourcesId}
            />
          </aside>
        </div>
      </div>

      {/* Related Articles — semantic cluster-based (SET A Day 2) */}
      {relatedPosts.length > 0 ? (
        <section className="border-t border-border/70 bg-muted/20">
          <div className="mx-auto max-w-6xl px-4 py-14 md:py-18">
            <div className="mb-8 flex items-baseline gap-4">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                {locale === "th" ? "บทความที่เกี่ยวข้อง" : "Related Articles"}
              </h2>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {locale === "th" ? "จากกลุ่มเนื้อหาเดียวกัน" : "from the same knowledge cluster"}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedPosts.map((relPost) => (
                <Link key={relPost.slug} href={`${localePrefix}/blog/${relPost.slug}`} className="group">
                  <article className="flex h-full flex-col rounded-3xl border border-border/70 bg-card/80 p-6 transition duration-200 group-hover:border-warm-amber/40 group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
                    <div className="mb-3">
                      <span className="inline-block rounded-full border border-border/60 bg-background/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {getBlogCategoryLabel(relPost.category, locale)}
                      </span>
                    </div>
                    <h3 className="flex-1 text-base font-bold leading-7 text-foreground transition group-hover:text-warm-amber line-clamp-3">
                      {relPost.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground line-clamp-2">{relPost.excerpt}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-warm-amber opacity-0 transition-opacity group-hover:opacity-100">
                      <span>{locale === "th" ? "อ่านบทความ" : "Read article"}</span>
                      <span aria-hidden>→</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Footer />
    </main>
  )
}
