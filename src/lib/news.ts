import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

export type ArticleCategory =
  | "market-intelligence"
  | "provider-spotlight"
  | "regulatory-update"
  | "compliance-alert"
  | "sector-analysis"
  | "ranking-movement"

export interface NewsArticle {
  id: string
  slug: string
  title: string
  subtitle: string | null
  category: ArticleCategory
  featured_image: string | null
  excerpt: string
  content: string
  source_type: string | null
  source_rto_id: string | null
  related_qualification: string | null
  meta_title: string | null
  meta_description: string | null
  published_at: string | null
  author: string
  view_count: number
  created_at: string
}

export interface RankingSnapshot {
  id: string
  snapshot_date: string
  rto_id: string
  rank_position: number
  mdpa_score: number
  previous_rank: number | null
  rank_change: number | null
  provider?: {
    name: string
    rto_code: string | null
    type: string
  }
}

// Category display metadata
export const CATEGORY_META: Record<ArticleCategory, { label: string; color: string }> = {
  "market-intelligence": { label: "Market Intelligence", color: "bg-primary/80" },
  "provider-spotlight": { label: "Provider Spotlight", color: "bg-amber-500" },
  "regulatory-update": { label: "Regulatory Update", color: "bg-purple-500" },
  "compliance-alert": { label: "Compliance Alert", color: "bg-red-500" },
  "sector-analysis": { label: "Sector Analysis", color: "bg-emerald-500" },
  "ranking-movement": { label: "Ranking Movement", color: "bg-muted-foreground" },
}

// Fetch published articles
export async function getArticles(options?: {
  limit?: number
  category?: ArticleCategory
  offset?: number
}): Promise<NewsArticle[]> {
  if (!supabase) return [];

  let query = supabase
    .from("news_articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })

  if (options?.category) {
    query = query.eq("category", options.category)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching articles:", error)
    return []
  }

  return data || []
}

// Fetch single article by slug
export async function getArticleBySlug(slug: string): Promise<NewsArticle | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("news_articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (error || !data) {
    console.error("Error fetching article:", error)
    return null
  }

  // Increment view count (fire and forget)
  supabase
    .from("news_articles")
    .update({ view_count: (data.view_count || 0) + 1 })
    .eq("id", data.id)
    .then(() => {})

  return data
}

// Fetch latest ranking snapshot
export async function getLatestRankings(limit = 20): Promise<RankingSnapshot[]> {
  if (!supabase) return [];

  // Get the most recent snapshot date
  const { data: latestDate } = await supabase
    .from("ranking_snapshots")
    .select("snapshot_date")
    .order("snapshot_date", { ascending: false })
    .limit(1)
    .single()

  if (!latestDate) {
    return []
  }

  const { data, error } = await supabase
    .from("ranking_snapshots")
    .select(`
      *,
      provider:rto_providers(name, rto_code, type)
    `)
    .eq("snapshot_date", latestDate.snapshot_date)
    .order("rank_position", { ascending: true })
    .limit(limit)

  if (error) {
    console.error("Error fetching rankings:", error)
    return []
  }

  return (data || []).map((r: any) => ({
    ...r,
    provider: r.provider,
  }))
}

// Get ranking history for a provider
export async function getProviderRankingHistory(
  rtoId: string,
  days = 30
): Promise<RankingSnapshot[]> {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  if (!supabase) return [];

  const { data, error } = await supabase
    .from("ranking_snapshots")
    .select("*")
    .eq("rto_id", rtoId)
    .gte("snapshot_date", startDate.toISOString().split("T")[0])
    .order("snapshot_date", { ascending: true })

  if (error) {
    console.error("Error fetching ranking history:", error)
    return []
  }

  return data || []
}

// Generate RSS feed content
export async function generateRSSFeed(siteUrl: string, siteName: string): Promise<string> {
  const articles = await getArticles({ limit: 20 })

  const items = articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteUrl}/news/${article.slug}</link>
      <description><![CDATA[${article.excerpt}]]></description>
      <pubDate>${new Date(article.published_at || article.created_at).toUTCString()}</pubDate>
      <guid isPermaLink="true">${siteUrl}/news/${article.slug}</guid>
      <category>${CATEGORY_META[article.category].label}</category>
      <author>${article.author}</author>
    </item>
  `).join("")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>VETIntel Tribune</title>
    <link>${siteUrl}</link>
    <description>Market intelligence, provider analysis, and regulatory updates for Australian vocational education</description>
    <language>en-AU</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`
}
