import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getArticleBySlug, getArticles, CATEGORY_META, type ArticleCategory } from "@/lib/news"
import { SITE } from "@/site"
import { cn } from "@/lib/utils"
import { Calendar, Eye, ArrowLeft, Share2, Newspaper, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: article.meta_title || `${article.title} | ${SITE.org}`,
    description: article.meta_description || article.excerpt,
    alternates: {
      canonical: `/news/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.published_at || undefined,
      authors: [article.author],
      images: article.featured_image ? [article.featured_image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  }
}

export async function generateStaticParams() {
  const articles = await getArticles({ limit: 50 })
  return articles.map((article) => ({ slug: article.slug }))
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const category = article.category as ArticleCategory
  const meta = CATEGORY_META[category]

  // Get related articles
  const relatedArticles = (await getArticles({ limit: 4, category }))
    .filter(a => a.id !== article.id)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-muted-foreground/60 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Tribune
            </Link>

            <div className="flex items-center gap-2 mb-4">
              <span className={cn("px-2 py-0.5 rounded text-xs font-medium text-white", meta.color)}>
                {meta.label}
              </span>
              {article.related_qualification && (
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-white/10 text-white/80">
                  {article.related_qualification}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-xl text-slate-300 mb-6">
                {article.subtitle}
              </p>
            )}

            <div className="flex items-center gap-6 text-sm text-muted-foreground/60">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(article.published_at || article.created_at).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              {article.view_count > 0 && (
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  {article.view_count.toLocaleString()} views
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.featured_image && (
        <div className="container mx-auto px-4 -mt-6">
          <div className="max-w-3xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
              <img
                src={article.featured_image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-slate dark:prose-invert max-w-none
              prose-headings:font-semibold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-base prose-p:leading-relaxed prose-p:text-muted-foreground
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ul:my-4 prose-li:text-muted-foreground
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:not-italic"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Published by <span className="font-medium text-foreground">{article.author}</span>
              </p>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-border py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/news/${related.slug}`}
                    className="group block bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all"
                  >
                    <span className={cn("inline-block px-2 py-0.5 rounded text-xs font-medium text-white mb-2", CATEGORY_META[related.category as ArticleCategory].color)}>
                      {CATEGORY_META[related.category as ArticleCategory].label}
                    </span>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            author: {
              "@type": "Organization",
              name: article.author,
            },
            publisher: {
              "@type": "Organization",
              name: SITE.org,
            },
            datePublished: article.published_at,
            dateModified: article.published_at,
            image: article.featured_image,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.${SITE.domain}/news/${article.slug}`,
            },
          }),
        }}
      />
    </main>
  )
}
