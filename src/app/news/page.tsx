import { Metadata } from "next"
import Link from "next/link"
import { getArticles, CATEGORY_META, type ArticleCategory } from "@/lib/news"
import { SITE } from "@/site"
import { cn } from "@/lib/utils"
import { Calendar, Eye, ArrowRight, Newspaper, TrendingUp, AlertTriangle, Building2 } from "lucide-react"

export const metadata: Metadata = {
  title: `Tribune | VET Sector Intelligence | ${SITE.org}`,
  description: "Market intelligence, provider analysis, and regulatory updates for Australian vocational education and training.",
  alternates: {
    canonical: "/news",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
}

// Category icons
const CATEGORY_ICONS: Record<ArticleCategory, typeof Newspaper> = {
  "market-intelligence": TrendingUp,
  "provider-spotlight": Building2,
  "regulatory-update": Newspaper,
  "compliance-alert": AlertTriangle,
  "sector-analysis": TrendingUp,
  "ranking-movement": TrendingUp,
}

function ArticleCard({ article }: { article: any }) {
  const category = article.category as ArticleCategory
  const CategoryIcon = CATEGORY_ICONS[category]
  const meta = CATEGORY_META[category]

  return (
    <Link
      href={`/news/${article.slug}`}
      className="group block bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg"
    >
      {article.featured_image && (
        <div className="aspect-video bg-muted overflow-hidden">
          <img
            src={article.featured_image}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={cn("px-2 py-0.5 rounded text-xs font-medium text-white", meta.color)}>
            {meta.label}
          </span>
          {article.related_qualification && (
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-muted text-muted-foreground">
              {article.related_qualification}
            </span>
          )}
        </div>

        <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
          {article.title}
        </h2>

        {article.subtitle && (
          <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
            {article.subtitle}
          </p>
        )}

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.published_at || article.created_at).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            {article.view_count > 0 && (
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {article.view_count.toLocaleString()}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Read <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default async function NewsPage() {
  const articles = await getArticles({ limit: 20 })

  // Group by category for featured sections
  const featured = articles.slice(0, 3)
  const rest = articles.slice(3)

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-medium mb-4">
              <Newspaper className="w-4 h-4" />
              VETIntel Tribune
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              The Tribune
            </h1>
            <p className="text-lg text-slate-300 mb-6">
              Market intelligence, provider analysis, and regulatory updates for Australian vocational education and training.
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(CATEGORY_META).map(([key, meta]) => (
                <span
                  key={key}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium text-white/90",
                    meta.color
                  )}
                >
                  {meta.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <Newspaper className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-xl font-semibold text-muted-foreground mb-2">
              Tribune Coming Soon
            </h2>
            <p className="text-muted-foreground">
              Market intelligence and sector analysis articles will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Articles */}
            {featured.length > 0 && (
              <section className="mb-12">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                  Latest Intelligence
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {featured.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}

            {/* All Articles */}
            {rest.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                  All Articles
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* RSS Link */}
      <section className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Subscribe via{" "}
            <Link href="/rss.xml" className="text-primary hover:underline">
              RSS Feed
            </Link>{" "}
            for updates
          </p>
        </div>
      </section>
    </main>
  )
}
