import { Metadata } from "next"
import Link from "next/link"
import { getQualifications, groupByIndustry, getLevelColor } from "@/lib/qualifications"
import { SITE } from "@/site"
import { cn } from "@/lib/utils"
import { GraduationCap, Building2, Users, ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: `All Qualifications | Provider Directory | ${SITE.org}`,
  description: "Browse all VET qualifications and find training providers. Compare RTOs by course, price, and location across Australia.",
  alternates: {
    canonical: "/qualifications",
  },
}

export default async function QualificationsPage() {
  const qualifications = await getQualifications()
  const byIndustry = groupByIndustry(qualifications)

  const industries = Object.keys(byIndustry).sort()

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-medium mb-4">
              <GraduationCap className="w-4 h-4" />
              Qualification Directory
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              All Qualifications
            </h1>
            <p className="text-lg text-slate-300">
              Browse VET qualifications and find training providers across Australia.
              Compare RTOs by price, location, and quality scores.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 -mt-8">
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl">
          <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
            <div className="text-3xl font-bold">{qualifications.length}</div>
            <div className="text-sm text-muted-foreground">Qualifications</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
            <div className="text-3xl font-bold">{industries.length}</div>
            <div className="text-sm text-muted-foreground">Industries</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
            <div className="text-3xl font-bold">
              {qualifications.reduce((sum, q) => sum + q.provider_count, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Provider Listings</div>
          </div>
        </div>
      </section>

      {/* By Industry */}
      <section className="container mx-auto px-4 py-12">
        <div className="space-y-12">
          {industries.map((industry) => (
            <div key={industry}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                {industry}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {byIndustry[industry].map((qual) => (
                  <Link
                    key={qual.id}
                    href={`/qualifications/${qual.code.toLowerCase()}`}
                    className="group block bg-card border border-border rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-mono text-sm font-semibold text-primary">
                        {qual.code}
                      </span>
                      <span className={cn(
                        "px-2 py-0.5 rounded text-xs font-medium text-white shrink-0",
                        getLevelColor(qual.level)
                      )}>
                        {qual.level}
                      </span>
                    </div>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3">
                      {qual.name}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {qual.provider_count} providers
                      </span>
                      <span className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        View <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
