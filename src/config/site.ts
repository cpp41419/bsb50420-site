import { SITE } from "@/site"

export const siteConfig = {
    name: SITE.course.name,
    description: `Comprehensive guide for ${SITE.course.name} (${SITE.course.code}).`,
    url: process.env.NEXT_PUBLIC_SITE_URL || `https://${SITE.domain}`,
    ogImage: `https://${SITE.domain}/og.jpg`,
    links: {
        twitter: SITE.socialLinks?.twitter || "",
        github: SITE.socialLinks?.github || "",
    },
    verticalName: SITE.course.name,
    courseCode: SITE.course.code,
}

export type SiteConfig = typeof siteConfig
