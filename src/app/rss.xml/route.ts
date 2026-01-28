import { generateRSSFeed } from "@/lib/news"
import { SITE } from "@/site"

export const dynamic = "force-dynamic"
export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  const siteUrl = `https://www.${SITE.domain}`
  const feed = await generateRSSFeed(siteUrl, SITE.org)

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
