import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProviderById, getProviders } from "@/lib/providers"
import { SITE } from "@/site"
import { ProviderProfile } from "@/components/providers/ProviderProfile"

// Allow dynamic routes beyond generateStaticParams
export const dynamicParams = true

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const provider = await getProviderById(id)

  if (!provider) {
    return {
      title: "Provider Not Found",
    }
  }

  return {
    title: `${provider.name} | ${SITE.course.code} Provider | ${SITE.org}`,
    description: `${provider.name} offers ${SITE.course.code} ${SITE.course.name}. RTO Code: ${provider.rto_code || "N/A"}. View course details, pricing, and contact information.`,
    alternates: {
      canonical: `/providers/${id}`,
    },
    openGraph: {
      title: `${provider.name} - ${SITE.course.code} Training Provider`,
      description: `${provider.name} offers ${SITE.course.code}. MDPA Score: ${provider.mdpa_score}/100. Located in ${provider.state}.`,
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  const providers = await getProviders()
  return providers.slice(0, 50).map((p) => ({ id: p.id }))
}

export default async function ProviderPage({ params }: Props) {
  const { id } = await params
  const provider = await getProviderById(id)

  if (!provider) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <ProviderProfile provider={provider} />

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": provider.name,
            "description": `${provider.name} is a registered training organisation offering ${SITE.course.code} ${SITE.course.name}`,
            "url": provider.website || `https://www.${SITE.domain}/providers/${id}`,
            "telephone": provider.phone,
            "email": provider.email,
            "address": {
              "@type": "PostalAddress",
              "addressRegion": provider.state,
              "addressCountry": "AU"
            },
            ...(provider.rating && {
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": provider.rating,
                "bestRating": 5,
                "worstRating": 1,
                "reviewCount": provider.review_count
              }
            }),
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": `${SITE.course.code} Courses`,
              "itemListElement": [{
                "@type": "Course",
                "name": SITE.course.name,
                "courseCode": SITE.course.code,
                ...(provider.price && {
                  "offers": {
                    "@type": "Offer",
                    "price": provider.price,
                    "priceCurrency": "AUD"
                  }
                })
              }]
            }
          })
        }}
      />
    </main>
  )
}
