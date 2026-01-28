import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getQualificationByCode, getProvidersByQualification, getQualifications, getLevelColor } from "@/lib/qualifications"
import { SITE } from "@/site"
import { cn } from "@/lib/utils"
import { GraduationCap, MapPin, Star, Clock, DollarSign, ExternalLink, ChevronRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  params: Promise<{ code: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  const qual = await getQualificationByCode(code)

  if (!qual) {
    return { title: "Qualification Not Found" }
  }

  return {
    title: `${qual.code} Providers | ${qual.name} | ${SITE.org}`,
    description: `Compare all ${qual.code} ${qual.name} training providers. Find RTOs by price, location, and ratings across Australia.`,
    alternates: {
      canonical: `/qualifications/${code.toLowerCase()}`,
    },
  }
}

export async function generateStaticParams() {
  const qualifications = await getQualifications()
  return qualifications.map((q) => ({ code: q.code.toLowerCase() }))
}

function ProviderCard({ provider }: { provider: any }) {
  const hasPrice = provider.price_min !== null

  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{provider.name}</h3>
          {provider.rto_code && (
            <p className="text-xs text-muted-foreground font-mono">RTO {provider.rto_code}</p>
          )}
        </div>
        <span className={cn(
          "px-2 py-0.5 rounded text-xs font-medium shrink-0",
          provider.type === "TAFE" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
          provider.type === "Private" && "bg-muted/50 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
          provider.type === "University" && "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
          provider.type === "Industry" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
        )}>
          {provider.type}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          {provider.state}
        </div>
        {provider.rating && (
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-medium">{provider.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({provider.review_count})</span>
          </div>
        )}
        {hasPrice && (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            ${provider.price_min.toLocaleString()}
            {provider.price_max && provider.price_max !== provider.price_min && (
              <span>- ${provider.price_max.toLocaleString()}</span>
            )}
          </div>
        )}
        {provider.duration_weeks && (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-4 h-4" />
            {provider.duration_weeks} weeks
          </div>
        )}
      </div>

      {provider.delivery_modes.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {provider.delivery_modes.map((mode: string) => (
            <span key={mode} className="px-2 py-0.5 bg-muted rounded text-xs">
              {mode}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Link href={`/providers/${provider.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full text-xs">
            View Profile
            <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </Link>
        {provider.website && (
          <a href={provider.website} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="text-xs">
              <ExternalLink className="w-3 h-3" />
            </Button>
          </a>
        )}
      </div>
    </div>
  )
}

export default async function QualificationPage({ params }: Props) {
  const { code } = await params
  const qual = await getQualificationByCode(code)

  if (!qual) {
    notFound()
  }

  const providers = await getProvidersByQualification(code)

  // Sort by rating descending
  const sorted = [...providers].sort((a, b) => {
    if (a.rating === null && b.rating === null) return 0
    if (a.rating === null) return 1
    if (b.rating === null) return -1
    return b.rating - a.rating
  })

  // Get price stats
  const prices = providers.map(p => p.price_min).filter((p): p is number => p !== null)
  const minPrice = prices.length > 0 ? Math.min(...prices) : null
  const maxPrice = prices.length > 0 ? Math.max(...prices) : null

  // Get states
  const states = [...new Set(providers.map(p => p.state))].sort()

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/qualifications"
            className="inline-flex items-center gap-2 text-muted-foreground/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Qualifications
          </Link>

          <div className="flex items-start gap-3 mb-4">
            <span className="font-mono text-2xl font-bold text-amber-400">
              {qual.code}
            </span>
            <span className={cn(
              "px-2 py-0.5 rounded text-xs font-medium text-white mt-1",
              getLevelColor(qual.level)
            )}>
              {qual.level}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {qual.name}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <span>{providers.length} providers</span>
            {minPrice && (
              <span>
                From ${minPrice.toLocaleString()}
                {maxPrice && maxPrice !== minPrice && ` to $${maxPrice.toLocaleString()}`}
              </span>
            )}
            <span>{states.length} states</span>
          </div>
        </div>
      </section>

      {/* Providers Grid */}
      <section className="container mx-auto px-4 py-12">
        {providers.length === 0 ? (
          <div className="text-center py-20">
            <GraduationCap className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-xl font-semibold text-muted-foreground mb-2">
              No Providers Listed
            </h2>
            <p className="text-muted-foreground">
              We don't have any providers for this qualification yet.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                All Providers
              </h2>
              <span className="text-sm text-muted-foreground">
                Sorted by rating
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: qual.name,
            courseCode: qual.code,
            provider: providers.slice(0, 10).map(p => ({
              "@type": "EducationalOrganization",
              name: p.name,
            })),
            hasCourseInstance: providers.filter(p => p.price_min).slice(0, 5).map(p => ({
              "@type": "CourseInstance",
              courseMode: p.delivery_modes,
              offers: {
                "@type": "Offer",
                price: p.price_min,
                priceCurrency: "AUD",
              },
            })),
          }),
        }}
      />
    </main>
  )
}
