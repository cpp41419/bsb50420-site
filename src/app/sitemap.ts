import { MetadataRoute } from 'next'
import { getAllQuestions } from '@/lib/questions'
import { SITE } from '@/site'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || `https://www.${SITE.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
    const questions = getAllQuestions()

    const questionEntries = questions.map((q) => ({
        url: `${SITE_URL}/question/${q.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${SITE_URL}/course-info`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/units`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/compare`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${SITE_URL}/faq`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...questionEntries,
    ]
}
