import { Metadata } from "next"
import Link from "next/link"
import { getProviders } from "@/lib/providers"
import { getLatestRankings } from "@/lib/news"
import { SITE } from "@/site"
import { cn } from "@/lib/utils"
import { Trophy, TrendingUp, TrendingDown, Minus, Building2, Star, MapPin, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: `MDPA Rankings | ${SITE.course.code} Provider Leaderboard | ${SITE.org}`,
  description: `Live rankings of ${SITE.course.code} training providers by Market Digital Performance Audit (MDPA) score. Updated regularly.`,
  alternates: {
    canonical: "/rankings",
  },
}

function RankBadge({ position }: { position: number }) {
  if (position === 1) {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
        <Trophy className="w-4 h-4 text-white" />
      </div>
    )
  }
  if (position === 2) {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center shadow">
        <span className="text-sm font-bold text-white">2</span>
      </div>
    )
  }
  if (position === 3) {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow">
        <span className="text-sm font-bold text-white">3</span>
      </div>
    )
  }
  return (
    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
      <span className="text-sm font-medium text-muted-foreground">{position}</span>
    </div>
  )
}

function RankChange({ change }: { change: number | null }) {
  if (change === null || change === 0) {
    return (
      <span className="flex items-center gap-0.5 text-muted-foreground text-xs">
        <Minus className="w-3 h-3" />
      </span>
    )
  }
  if (change > 0) {
    return (
      <span className="flex items-center gap-0.5 text-emerald-600 text-xs font-medium">
        <TrendingUp className="w-3 h-3" />
        +{change}
      </span>
    )
  }
  return (
    <span className="flex items-center gap-0.5 text-red-500 text-xs font-medium">
      <TrendingDown className="w-3 h-3" />
      {change}
    </span>
  )
}

function ScoreBar({ score, maxScore = 100 }: { score: number; maxScore?: number }) {
  const percentage = (score / maxScore) * 100
  const getColor = (s: number) => {
    if (s >= 80) return "bg-emerald-500"
    if (s >= 60) return "bg-amber-500"
    return "bg-muted-foreground/60"
  }

  return (
    <div className="flex items-center gap-3 w-full max-w-[200px]">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", getColor(score))}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-bold tabular-nums w-8">{score}</span>
    </div>
  )
}

export default async function RankingsPage() {
  // Try to get ranking snapshots first, fall back to live providers
  const snapshots = await getLatestRankings(50)
  const providers = await getProviders()

  // Use snapshots if available, otherwise calculate from live data
  const rankings = snapshots.length > 0
    ? snapshots.map((s, index) => ({
        position: s.rank_position,
        id: s.rto_id,
        name: s.provider?.name || "Unknown",
        rto_code: s.provider?.rto_code,
        type: s.provider?.type || "Private",
        score: s.mdpa_score,
        previousRank: s.previous_rank,
        change: s.rank_change,
      }))
    : providers
        .sort((a, b) => b.mdpa_score - a.mdpa_score)
        .slice(0, 50)
        .map((p, index) => ({
          position: index + 1,
          id: p.id,
          name: p.name,
          rto_code: p.rto_code,
          type: p.type,
          score: p.mdpa_score,
          state: p.state,
          rating: p.rating,
          previousRank: null,
          change: null,
        }))

  const snapshotDate = snapshots.length > 0 ? snapshots[0].snapshot_date : new Date().toISOString().split("T")[0]

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-medium mb-4">
              <Trophy className="w-4 h-4" />
              MDPA Leaderboard
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {SITE.course.code} Provider Rankings
            </h1>
            <p className="text-lg text-slate-300 mb-6">
              Live rankings based on Market Digital Performance Audit (MDPA) scores. Updated regularly from automated audits.
            </p>
            <p className="text-sm text-muted-foreground/60">
              Last updated: {new Date(snapshotDate).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Top 3 Podium */}
      {rankings.length >= 3 && (
        <section className="container mx-auto px-4 -mt-8">
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {/* Silver */}
            <div className="md:order-1 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 shadow-lg border border-border dark:border-slate-700 md:mt-8">
              <div className="text-center">
                <RankBadge position={2} />
                <h3 className="font-bold text-lg mt-3 line-clamp-1">{rankings[1].name}</h3>
                {rankings[1].rto_code && (
                  <p className="text-xs text-muted-foreground font-mono">RTO {rankings[1].rto_code}</p>
                )}
                <div className="mt-4 flex justify-center">
                  <ScoreBar score={rankings[1].score} />
                </div>
              </div>
            </div>

            {/* Gold */}
            <div className="md:order-2 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 rounded-xl p-6 shadow-xl border-2 border-amber-300 dark:border-amber-700">
              <div className="text-center">
                <RankBadge position={1} />
                <h3 className="font-bold text-xl mt-3 line-clamp-1">{rankings[0].name}</h3>
                {rankings[0].rto_code && (
                  <p className="text-xs text-muted-foreground font-mono">RTO {rankings[0].rto_code}</p>
                )}
                <div className="mt-4 flex justify-center">
                  <ScoreBar score={rankings[0].score} />
                </div>
                <Link
                  href={`/providers/${rankings[0].id}`}
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-3"
                >
                  View Profile <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Bronze */}
            <div className="md:order-3 bg-gradient-to-br from-amber-100/50 to-orange-100/50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-amber-800 md:mt-12">
              <div className="text-center">
                <RankBadge position={3} />
                <h3 className="font-bold text-lg mt-3 line-clamp-1">{rankings[2].name}</h3>
                {rankings[2].rto_code && (
                  <p className="text-xs text-muted-foreground font-mono">RTO {rankings[2].rto_code}</p>
                )}
                <div className="mt-4 flex justify-center">
                  <ScoreBar score={rankings[2].score} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Full Rankings Table */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
            Full Rankings
          </h2>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Rank</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Provider</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">MDPA Score</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Change</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rankings.map((r: any) => (
                    <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <RankBadge position={r.position} />
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium">{r.name}</p>
                          {r.rto_code && (
                            <p className="text-xs text-muted-foreground font-mono">RTO {r.rto_code}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-xs font-medium",
                          r.type === "TAFE" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                          r.type === "Private" && "bg-muted/50 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
                          r.type === "University" && "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
                          r.type === "Industry" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                        )}>
                          {r.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <ScoreBar score={r.score} />
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <RankChange change={r.change} />
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/providers/${r.id}`}
                          className="text-xs text-primary hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="border-t border-border py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">About MDPA Scores</h2>
            <p className="text-muted-foreground mb-4">
              The Market Digital Performance Audit (MDPA) score is a composite metric measuring
              provider quality across seven dimensions:
            </p>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Intent Fulfillment
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                UX Engineering
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Regulatory Bedrock
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Performance Stability
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Accessibility
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Commercial Integrity
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Institutional Authority
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Scores are generated through automated audits using Playwright browser testing,
              Lighthouse performance analysis, and compliance verification.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
