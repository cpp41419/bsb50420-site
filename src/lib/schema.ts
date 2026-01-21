import { siteConfig } from "@/config/site";
import { QualificationJSON } from "@/types/data";

export function generateOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${siteConfig.url}/#org`,
        "name": siteConfig.name,
        "url": siteConfig.url,
        "logo": {
            "@type": "ImageObject",
            "url": `${siteConfig.url}/logo-square.png`,
            "width": 512,
            "height": 512
        },
        // "sameAs": siteConfig.links ? Object.values(siteConfig.links) : []
    };
}

export function generateWebsiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        "url": siteConfig.url,
        "name": siteConfig.name,
        "publisher": { "@id": `${siteConfig.url}/#org` },
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${siteConfig.url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.item
        }))
    };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(q => ({
            "@type": "Question",
            "name": q.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": q.answer
            }
        }))
    };
}

export function generateCourseSchema(data: QualificationJSON | any, research?: any) {
    // Check if it's our new QualificationJSON structure
    if ('qualification' in data) {
        const { qualification, site_identity, market_snapshot } = data;

        // Pattern 3: Multi-Dimensional Entity Ontology
        const additionalProperties = [];
        if (research) {
            if (research.pricing?.min) {
                additionalProperties.push({
                    "@type": "PropertyValue",
                    "name": "Minimum Pricing",
                    "value": research.pricing.min,
                    "unitText": "AUD",
                    "measurementTechnique": "VetIntel Research Index"
                });
            }
            if (research.duration?.max) {
                additionalProperties.push({
                    "@type": "PropertyValue",
                    "name": "Typical Duration",
                    "value": research.duration.max,
                    "unitText": research.duration.unit || "months",
                    "measurementTechnique": "Course schedule analysis"
                });
            }
            if (research.salary?.median) {
                additionalProperties.push({
                    "@type": "PropertyValue",
                    "name": "Median Salary Outcome",
                    "value": research.salary.median,
                    "unitText": "AUD/Year",
                    "measurementTechnique": "Graduate outcome modelling"
                });
            }
        }

        const entityGraph = (data as any).entity_graph || {};

        return {
            "@context": "https://schema.org",
            "@type": ["Course", "EducationalOccupationalCredential"],
            "@id": entityGraph["@id"] || `${siteConfig.url}/#course`,
            "name": qualification.name,
            "courseCode": qualification.code,
            "description": site_identity?.positioning || qualification.name,
            "educationalCredentialAwarded": qualification.name,
            "credentialCategory": "National Qualification",
            "sameAs": entityGraph["sameAs"] || `https://training.gov.au/Training/Details/${qualification.code}`,
            "additionalProperty": additionalProperties.length > 0 ? additionalProperties : undefined,
            "occupationalCategory": site_identity?.outcomes || undefined,
            "hasCourseInstance": {
                "@type": "CourseInstance",
                "courseMode": ["online", "blended", "face-to-face"],
                "location": {
                    "@type": "Place",
                    "name": "Australia"
                }
            },
            "offers": market_snapshot?.price_range_aud ? {
                "@type": "AggregateOffer",
                "category": "EducationalOccupationalCredential",
                "priceCurrency": "AUD",
                "offerCount": market_snapshot.provider_count || undefined,
                "lowPrice": market_snapshot.price_range_aud.min,
                "highPrice": market_snapshot.price_range_aud.max,
                "availability": "https://schema.org/InStock"
            } : undefined,
            "recognizingAuthority": {
                "@id": `https://training.gov.au/#authority`,
                "@type": "Organization",
                "name": qualification.regulator || "ASQA",
                "url": "https://training.gov.au"
            },
            "publisher": { "@id": `${siteConfig.url}/#org` }
        };
    }

    // Fallback for legacy usage if any
    return {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": data.name,
        "courseCode": data.code,
        "description": data.description,
        "provider": {
            "@type": "Organization",
            "name": data.provider || "Registered Training Organisations (RTOs)",
            "sameAs": "https://training.gov.au"
        },
        "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": ["online", "blended", "face-to-face"],
            "location": "Australia"
        },
        "offers": {
            "@type": "Offer",
            "category": "EducationalOccupationalCredential",
            "priceCurrency": "AUD",
            "availability": "https://schema.org/InStock"
        }
    };
}

export function generateArticleSchema(article: {
    headline: string;
    description: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    authorName?: string;
    slug: string;
    reviewedBy?: {
        name: string;
        jobTitle: string;
        credential?: string;
    };
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.headline,
        "description": article.description,
        "image": article.image ? [article.image] : [`${siteConfig.url}/og.jpg`],
        "datePublished": article.datePublished,
        "dateModified": article.dateModified || article.datePublished,
        "author": {
            "@type": "Person",
            "name": article.authorName || `${siteConfig.name} Team`,
            "url": `${siteConfig.url}/about`
        },
        "reviewedBy": article.reviewedBy ? {
            "@type": "Person",
            "name": article.reviewedBy.name,
            "jobTitle": article.reviewedBy.jobTitle,
            "hasCredential": article.reviewedBy.credential ? {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": article.reviewedBy.credential
            } : undefined
        } : undefined,
        "publisher": {
            "@type": "Organization",
            "name": siteConfig.name,
            "logo": {
                "@type": "ImageObject",
                "url": `${siteConfig.url}/logo-square.png`
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/blog/${article.slug}`
        }
    };
}
